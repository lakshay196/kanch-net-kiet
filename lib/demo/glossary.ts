/**
 * Kanch-Net Local Glossary & Terminology Helper
 * Defined per docs/PRD.md Section 6.2 & docs/CONTRACT.md
 */

import { Alias } from '@/lib/demo/types';
import { SEED_ALIASES } from '@/data/demo-bangle-order';

/**
 * Standard known colour dictionary
 */
export const KNOWN_COLOUR_MAP: Record<string, string> = {
  red: 'Red',
  laal: 'Red',
  lal: 'Red',
  लाल: 'Red',
  green: 'Green',
  hara: 'Green',
  हरा: 'Green',
  blue: 'Blue',
  neela: 'Blue',
  नीला: 'Blue',
  yellow: 'Yellow',
  peela: 'Yellow',
  पीला: 'Yellow',
  golden: 'Golden',
  sunhara: 'Golden',
  सुनहरा: 'Golden',
};

/**
 * Standard known finish dictionary
 */
export const KNOWN_FINISH_MAP: Record<string, string> = {
  'plain glossy': 'Plain glossy',
  plain: 'Plain glossy',
  glossy: 'Plain glossy',
  saada: 'Plain glossy',
  sada: 'Plain glossy',
  सादा: 'Plain glossy',
  glitter: 'Glitter',
  chamki: 'Glitter',
  चमकी: 'Glitter',
  matte: 'Matte',
};

/**
 * Known size codes in Firozabad glass bangle sizing
 */
export const KNOWN_SIZES = ['2.2', '2.4', '2.6', '2.8', '2.10', '2.12'];

/**
 * Ambiguous counting / unit terms that require explicit supplier/buyer confirmation
 */
export const AMBIGUOUS_UNITS: Record<string, { description: string; piecesPerUnit?: number }> = {
  toda: { description: 'Toda bundle (typically 312 pieces, requires confirmation)', piecesPerUnit: 312 },
  टोडा: { description: 'Toda bundle (typically 312 pieces, requires confirmation)', piecesPerUnit: 312 },
  muthha: { description: 'Muthha bundle (varying pieces, requires confirmation)' },
  मुट्ठा: { description: 'Muthha bundle (varying pieces, requires confirmation)' },
  muttha: { description: 'Muthha bundle (varying pieces, requires confirmation)' },
  darjan: { description: 'Darjan (12 or 24 pieces depending on local convention; requires confirmation)' },
  दर्जन: { description: 'Darjan (12 or 24 pieces depending on local convention; requires confirmation)' },
  dozen: { description: 'Dozen (12 or 24 pieces depending on local convention; requires confirmation)' },
};

/**
 * Retrieve current active aliases (initial seed + any dynamic additions)
 */
export function getGlossaryAliases(): Alias[] {
  return [...SEED_ALIASES];
}

/**
 * Look up a local term in the glossary
 */
export function lookupGlossaryTerm(term: string): Alias | undefined {
  const normalized = term.trim().toLowerCase();
  return SEED_ALIASES.find((a) => a.phrase.toLowerCase() === normalized);
}

/**
 * Check whether a word/unit is ambiguous and requires confirmation before affecting stock
 */
export function isAmbiguousCountingUnit(term: string): boolean {
  const normalized = term.trim().toLowerCase();
  return normalized in AMBIGUOUS_UNITS;
}
