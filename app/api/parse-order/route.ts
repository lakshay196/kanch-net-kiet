import { NextRequest, NextResponse } from 'next/server';
import { parseOrderLocal } from '@/lib/demo/parse-order';
import { OrderDraft, ParseOrderResponse, ApiErrorEnvelope } from '@/lib/demo/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<NextResponse<ParseOrderResponse | ApiErrorEnvelope>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'INVALID_INPUT', message: 'Request body must be valid JSON.' } },
      { status: 400 }
    );
  }

  const { text, demoYear } = (body as Record<string, unknown>) || {};

  if (typeof text !== 'string' || text.trim().length === 0) {
    return NextResponse.json(
      { error: { code: 'INVALID_INPUT', message: 'The text field is required and must not be empty.' } },
      { status: 400 }
    );
  }

  if (text.length > 500) {
    return NextResponse.json(
      { error: { code: 'PAYLOAD_TOO_LARGE', message: 'Input text exceeds the 500 character limit.' } },
      { status: 413 }
    );
  }

  const year = typeof demoYear === 'number' ? demoYear : 2026;
  const apiKey = process.env.OPENAI_API_KEY;

  // If no OpenAI key is configured, always use the deterministic local fallback
  if (!apiKey) {
    try {
      const localResult = parseOrderLocal(text, year);
      return NextResponse.json(localResult, { status: 200 });
    } catch (err: unknown) {
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message: (err as Error)?.message || 'Error executing local parser.' } },
        { status: 500 }
      );
    }
  }

  // Model-assisted parsing with timeout and local fallback
  try {
    const model = process.env.OPENAI_MODEL || 'gpt-5-mini';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const systemPrompt = `You are an AI assistant for Kanch-Net extracting glass bangle bulk orders from buyer text.
Extract into strict JSON with fields:
- productFamily: "glass_bangle" or null
- size: string or null (e.g. "2.4", "2.6")
- colour: string or null (e.g. "Red", "Green", or null if not explicitly stated)
- designFinish: string or null (e.g. "Plain glossy", or null if not explicitly stated)
- quantityNeeded: integer or null
- deliveryDate: "YYYY-MM-DD" or null (using demo year ${year})
- missing: array of strings containing names of any null fields among [productFamily, size, colour, designFinish, quantityNeeded, deliveryDate]
- clarificationNeeded: array of strings for ambiguous local terms (e.g. toda, darjan) or unrecognized decorative terms.
Never invent stock, suppliers, prices, colours, or finishes.`;

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
          { role: 'user', content: text },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.1,
      }),
    });

    clearTimeout(timeout);

    if (!openAiRes.ok) {
      // Model call rejected -> fallback
      console.warn(`[parse-order] Model request returned ${openAiRes.status}; falling back to local parser.`);
      const localResult = parseOrderLocal(text, year);
      return NextResponse.json(localResult, { status: 200 });
    }

    const json = await openAiRes.json();
    const rawContent = json.choices?.[0]?.message?.content;
    const parsed: OrderDraft = JSON.parse(rawContent);

    // Validate structure of parsed model output
    if (
      typeof parsed !== 'object' ||
      !Array.isArray(parsed.missing) ||
      !Array.isArray(parsed.clarificationNeeded)
    ) {
      throw new Error('Invalid model output shape');
    }

    return NextResponse.json({ draft: parsed, source: 'model' }, { status: 200 });
  } catch {
    console.warn('[parse-order] Model parsing failed or timed out; falling back to local parser.');
    const localResult = parseOrderLocal(text, year);
    return NextResponse.json(localResult, { status: 200 });
  }
}
