import { NextRequest, NextResponse } from 'next/server';
import { draftCatalogueLocal } from '@/lib/demo/catalogue-draft';
import {
  CatalogueDraftRequest,
  CatalogueDraftResponse,
  CatalogueDraft,
  ApiErrorEnvelope,
} from '@/lib/demo/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<NextResponse<CatalogueDraftResponse | ApiErrorEnvelope>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'INVALID_INPUT', message: 'Request body must be valid JSON.' } },
      { status: 400 }
    );
  }

  const { facts, phrase } = (body as CatalogueDraftRequest) || {};

  if (!facts || typeof facts !== 'object') {
    return NextResponse.json(
      { error: { code: 'INVALID_INPUT', message: 'The facts object is required.' } },
      { status: 400 }
    );
  }

  const { productFamily, sizeCode, colour, quantity, locality } = facts;

  if (
    productFamily !== 'glass_bangle' ||
    typeof sizeCode !== 'string' ||
    typeof colour !== 'string' ||
    typeof quantity !== 'number' ||
    quantity <= 0 ||
    typeof locality !== 'string'
  ) {
    return NextResponse.json(
      { error: { code: 'INVALID_INPUT', message: 'Invalid product facts provided.' } },
      { status: 400 }
    );
  }

  const combinedLength = (phrase || '').length + JSON.stringify(facts).length;
  if (combinedLength > 500) {
    return NextResponse.json(
      { error: { code: 'PAYLOAD_TOO_LARGE', message: 'Request payload exceeds 500 characters limit.' } },
      { status: 413 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // Local fallback if no OpenAI API key configured
  if (!apiKey) {
    try {
      const localResult = draftCatalogueLocal(facts, phrase || '');
      return NextResponse.json(localResult, { status: 200 });
    } catch (err: unknown) {
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message: (err as Error)?.message || 'Error generating local catalogue draft.' } },
        { status: 500 }
      );
    }
  }

  // Model-assisted catalogue drafting with fact preservation guardrails
  try {
    const model = process.env.OPENAI_MODEL || 'gpt-5-mini';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const systemPrompt = `You are a bilingual catalogue drafting assistant for Firozabad glass bangle artisans.
Generate:
- hindiTitle: string (formal Hindi product title, e.g. "लाल काँच की चूड़ी, साइज़ ${sizeCode}")
- englishTitle: string (clear English product title, e.g. "${colour} glass bangles, size ${sizeCode}")
- tags: array of strings for marketplace search (including glass bangles, colour, size, locality)
- uncertainTerms: array of strings for any spoken local term in the phrase that is unfamiliar or ambiguous.
CRITICAL CONSTRAINT: You must NEVER alter the factual size (${sizeCode}), colour (${colour}), quantity (${quantity}), or material. Return strict JSON.`;

    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Facts: ${JSON.stringify(facts)}\nPhrase: ${phrase || ''}` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      }),
    });

    clearTimeout(timeout);

    if (!openAiRes.ok) {
      console.warn(`[catalogue-draft] Model request returned ${openAiRes.status}; using local fallback.`);
      const localResult = draftCatalogueLocal(facts, phrase || '');
      return NextResponse.json(localResult, { status: 200 });
    }

    const json = await openAiRes.json();
    const rawContent = json.choices?.[0]?.message?.content;
    const parsed: CatalogueDraft = JSON.parse(rawContent);

    // Validate that output adheres to required shape
    if (
      typeof parsed !== 'object' ||
      typeof parsed.hindiTitle !== 'string' ||
      typeof parsed.englishTitle !== 'string' ||
      !Array.isArray(parsed.tags) ||
      !Array.isArray(parsed.uncertainTerms)
    ) {
      throw new Error('Invalid model catalogue draft structure');
    }

    return NextResponse.json({ draft: parsed, source: 'model' }, { status: 200 });
  } catch {
    console.warn('[catalogue-draft] Model drafting failed or timed out; using local fallback.');
    const localResult = draftCatalogueLocal(facts, phrase || '');
    return NextResponse.json(localResult, { status: 200 });
  }
}
