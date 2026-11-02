/**
 * Kanch-Net Local Catalogue Assistant Fallback
 * Defined per docs/PRD.md Section 6.2, Section 13 & docs/CONTRACT.md
 * Functions are pure and side-effect free.
 */

import {
  CatalogueDraftRequest,
  CatalogueDraftResponse,
  CatalogueDraft,
} from '@/lib/demo/types';
import { KNOWN_COLOUR_MAP, KNOWN_FINISH_MAP, KNOWN_SIZES } from '@/lib/demo/glossary';

const HINDI_COLOUR_MAP: Record<string, string> = {
  red: 'लाल',
  green: 'हरी',
  blue: 'नीली',
  yellow: 'पीली',
  golden: 'सुनहरी',
};

/**
 * Deterministically produce bilingual titles and tags while preserving confirmed supplier facts.
 * Unrecognized terms in the phrase are placed in uncertainTerms for supplier confirmation.
 */
export function draftCatalogueLocal(
  facts: CatalogueDraftRequest['facts'],
  phrase: string = ''
): CatalogueDraftResponse {
  if (!facts || typeof facts !== 'object') {
    throw new Error('INVALID_INPUT: Facts object is required');
  }

  const { productFamily, sizeCode, colour, quantity, locality } = facts;

  if (!sizeCode || !colour || !productFamily || quantity <= 0) {
    throw new Error('INVALID_INPUT: productFamily, sizeCode, colour, and positive quantity are required');
  }

  const uncertainTerms: string[] = [];
  const phraseLower = (phrase || '').toLowerCase().trim();
  const words = phraseLower.split(/[\s,;.!?]+/).filter(Boolean);

  // Check for unknown or uncertain local terms in the supplier's phrase
  const knownIgnored = new Set([
    'chudi',
    'choodi',
    'bangle',
    'bangles',
    'piece',
    'pieces',
    'pcs',
    'size',
    'kaanch',
    'glass',
    'red',
    'laal',
    'lal',
    'green',
    'hara',
    'blue',
    'neela',
    'yellow',
    'peela',
    'plain',
    'saada',
    'glossy',
    'chamki',
  ]);

  for (const w of words) {
    if (
      !knownIgnored.has(w) &&
      !KNOWN_COLOUR_MAP[w] &&
      !KNOWN_FINISH_MAP[w] &&
      !KNOWN_SIZES.includes(w) &&
      !/^\d+$/.test(w) &&
      w.length > 3
    ) {
      uncertainTerms.push(w);
    }
  }

  // Construct Hindi title preserving facts
  const colourLower = colour.toLowerCase();
  const hindiColour = HINDI_COLOUR_MAP[colourLower] || colour;
  const hindiTitle = `${hindiColour} काँच की चूड़ी, साइज़ ${sizeCode}`;

  // Construct English title preserving facts
  const englishTitle = `${colour} glass bangles, size ${sizeCode}`;

  // Generate standardized search tags
  const tags = [
    'glass bangles',
    colour.toLowerCase(),
    `size ${sizeCode}`,
    'Firozabad',
  ];

  if (locality && locality.trim()) {
    tags.push(locality.trim());
  }

  const draft: CatalogueDraft = {
    hindiTitle,
    englishTitle,
    tags: Array.from(new Set(tags)),
    uncertainTerms,
  };

  return {
    draft,
    source: 'local',
  };
}
