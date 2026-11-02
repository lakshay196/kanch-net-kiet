/**
 * Kanch-Net Deterministic Local Order Parser
 * Defined per docs/PRD.md Section 6 & docs/CONTRACT.md
 * Functions are pure and side-effect free.
 */

import { OrderDraft, ParseOrderResponse } from '@/lib/demo/types';
import {
  KNOWN_COLOUR_MAP,
  KNOWN_FINISH_MAP,
  KNOWN_SIZES,
  AMBIGUOUS_UNITS,
} from '@/lib/demo/glossary';

export const DEFAULT_DEMO_YEAR = 2026;

const MONTH_MAP: Record<string, string> = {
  jan: '01',
  january: '01',
  जनवरी: '01',
  feb: '02',
  february: '02',
  फरवरी: '02',
  mar: '03',
  march: '03',
  मार्च: '03',
  apr: '04',
  april: '04',
  अप्रैल: '04',
  may: '05',
  मई: '05',
  jun: '06',
  june: '06',
  जून: '06',
  jul: '07',
  july: '07',
  जुलाई: '07',
  aug: '08',
  august: '08',
  अगस्त: '08',
  sep: '09',
  sept: '09',
  september: '09',
  सितम्बर: '09',
  सितंबर: '09',
  oct: '10',
  october: '10',
  अक्टूबर: '10',
  nov: '11',
  november: '11',
  नवम्बर: '11',
  नवंबर: '11',
  dec: '12',
  december: '12',
  दिसम्बर: '12',
  दिसंबर: '12',
};

/**
 * Deterministically parse raw buyer text into a structured draft.
 * Missing or unconfirmed fields are explicitly null.
 * Unknown or ambiguous local terms are added to clarificationNeeded.
 */
export function parseOrderLocal(text: string, demoYear: number = DEFAULT_DEMO_YEAR): ParseOrderResponse {
  if (!text || typeof text !== 'string') {
    throw new Error('INVALID_INPUT: Text is required');
  }

  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error('INVALID_INPUT: Text must not be empty');
  }
  if (trimmed.length > 500) {
    throw new Error('PAYLOAD_TOO_LARGE: Text must be 500 characters or fewer');
  }

  const lower = trimmed.toLowerCase();
  const words = lower.split(/[\s,;.!?-]+/).filter(Boolean);

  const missing: string[] = [];
  const clarificationNeeded: string[] = [];

  // 1. Product Family
  const bangleKeywords = [
    'bangle',
    'bangles',
    'chudi',
    'choodi',
    'churi',
    'chudiyan',
    'choodiyan',
    'चूड़ी',
    'चूड़ियाँ',
    'चूड़ी',
  ];
  let productFamily: 'glass_bangle' | null = null;
  if (bangleKeywords.some((kw) => lower.includes(kw))) {
    productFamily = 'glass_bangle';
  }

  // 2. Quantity
  let quantityNeeded: number | null = null;
  // Match comma numbers or plain integers like 1,000 or 1000
  const qtyMatch = lower.match(/\b(\d{1,3}(?:,\d{3})+|\d+)\s*(?:piece|pieces|pcs|chudi|choodi|bangles|bangle)?\b/);
  if (qtyMatch) {
    const rawNum = qtyMatch[1].replace(/,/g, '');
    const parsedNum = parseInt(rawNum, 10);
    // Ignore if it matches known sizes like 2 or 4
    if (parsedNum >= 10) {
      quantityNeeded = parsedNum;
    }
  }

  // Check for ambiguous counting units (e.g. toda, muthha, darjan)
  for (const unit of Object.keys(AMBIGUOUS_UNITS)) {
    if (words.includes(unit) || lower.includes(unit)) {
      clarificationNeeded.push(
        `Local unit '${unit}' detected: ${AMBIGUOUS_UNITS[unit].description}. Please confirm exact piece count.`
      );
    }
  }

  // 3. Size
  let size: string | null = null;
  // Explicit size patterns: "size 2.4", "size: 2.4", "साइज़ 2.4", "2.4 size"
  const sizeExplicit = lower.match(/(?:size|साइज़|साइज)\s*[:=-]?\s*(2\.\d{1,2})/);
  if (sizeExplicit && KNOWN_SIZES.includes(sizeExplicit[1])) {
    size = sizeExplicit[1];
  } else {
    // Look for standalone size code
    for (const s of KNOWN_SIZES) {
      const sizeRegex = new RegExp(`(^|[\\s,])(${s.replace('.', '\\.')})([\\s,]|$|\\b)`);
      if (sizeRegex.test(lower)) {
        size = s;
        break;
      }
    }
  }

  // 4. Colour
  let colour: string | null = null;
  for (const [key, canonicalColour] of Object.entries(KNOWN_COLOUR_MAP)) {
    // Word boundary check for colour name
    const colRegex = new RegExp(`(^|[\\s,;])${key}([\\s,;]|$)`);
    if (colRegex.test(lower)) {
      colour = canonicalColour;
      break;
    }
  }

  // 5. Design Finish
  let designFinish: string | null = null;
  for (const [key, canonicalFinish] of Object.entries(KNOWN_FINISH_MAP)) {
    const finRegex = new RegExp(`(^|[\\s,;])${key}([\\s,;]|$)`);
    if (finRegex.test(lower)) {
      designFinish = canonicalFinish;
      break;
    }
  }

  // 6. Delivery Date
  let deliveryDate: string | null = null;
  // Match "15 Nov", "15 November", "15th Nov", "15 नवम्बर"
  const dateMatch = lower.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+([a-zA-Z\u0900-\u097F]+)(?:\s+(\d{4}))?\b/);
  if (dateMatch) {
    const day = dateMatch[1].padStart(2, '0');
    const monthWord = dateMatch[2].toLowerCase();
    const monthCode = MONTH_MAP[monthWord];
    if (monthCode) {
      const year = dateMatch[3] ? parseInt(dateMatch[3], 10) : demoYear;
      deliveryDate = `${year}-${monthCode}-${day}`;
    }
  }

  // 7. Check for unknown or unrecognized terms that look like product modifiers
  const knownIgnoredWords = new Set([
    'mujhe',
    'chahiye',
    'tak',
    'aur',
    'ki',
    'ke',
    'ka',
    'hai',
    'hoga',
    'piece',
    'pieces',
    'pcs',
    'order',
    'size',
    'glass',
    'bangles',
    'bangle',
    'chudi',
    'choodi',
    'by',
    'on',
    'for',
    'with',
    'in',
    'need',
    'want',
    'please',
    'send',
    'deliver',
    'firozabad',
    'mandi',
  ]);

  for (const w of words) {
    // If it's not a known color, finish, size, month, number, or standard stopword
    if (
      !knownIgnoredWords.has(w) &&
      !KNOWN_COLOUR_MAP[w] &&
      !KNOWN_FINISH_MAP[w] &&
      !KNOWN_SIZES.includes(w) &&
      !MONTH_MAP[w] &&
      !bangleKeywords.includes(w) &&
      !/^\d+$/.test(w) &&
      w.length > 3
    ) {
      // Check if it's an unrecognized artisanal term
      if (['meenakari', 'zari', 'velvet', 'kattai', 'ghunghroo'].includes(w)) {
        clarificationNeeded.push(`Unrecognized decorative term '${w}'. Confirmation required.`);
      }
    }
  }

  // Populate missing list for any unconfirmed critical field
  if (!productFamily) missing.push('productFamily');
  if (!quantityNeeded) missing.push('quantityNeeded');
  if (!size) missing.push('size');
  if (!colour) missing.push('colour');
  if (!designFinish) missing.push('designFinish');
  if (!deliveryDate) missing.push('deliveryDate');

  const draft: OrderDraft = {
    productFamily,
    size,
    colour,
    designFinish,
    quantityNeeded,
    deliveryDate,
    missing,
    clarificationNeeded,
  };

  return {
    draft,
    source: 'local',
  };
}
