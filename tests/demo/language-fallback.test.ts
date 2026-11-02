import { describe, it, expect } from 'vitest';
import { CatalogueDraftRequest } from '@/lib/demo/types';
import { parseOrderLocal } from '@/lib/demo/parse-order';
import { draftCatalogueLocal } from '@/lib/demo/catalogue-draft';
import { lookupGlossaryTerm, isAmbiguousCountingUnit } from '@/lib/demo/glossary';

describe('Phase B2: Local Language Parser, Glossary, and Catalogue Fallback', () => {
  describe('parseOrderLocal (T1, T2, T3)', () => {
    it('T1/T2: parses rehearsed sample English text without model key', () => {
      const input = '1,000 glass bangles, size 2.4, by 15 Nov';
      const result = parseOrderLocal(input, 2026);

      expect(result.source).toBe('local');
      expect(result.draft.productFamily).toBe('glass_bangle');
      expect(result.draft.quantityNeeded).toBe(1000);
      expect(result.draft.size).toBe('2.4');
      expect(result.draft.deliveryDate).toBe('2026-11-15');

      // Crucial: colour and finish are null and present in missing
      expect(result.draft.colour).toBeNull();
      expect(result.draft.designFinish).toBeNull();
      expect(result.draft.missing).toContain('colour');
      expect(result.draft.missing).toContain('designFinish');
    });

    it('parses Hindi / Hinglish prompt with colour specified', () => {
      const input = 'Mujhe 1000 laal chudi chahiye, size 2.4, 15 November tak';
      const result = parseOrderLocal(input, 2026);

      expect(result.source).toBe('local');
      expect(result.draft.productFamily).toBe('glass_bangle');
      expect(result.draft.quantityNeeded).toBe(1000);
      expect(result.draft.size).toBe('2.4');
      expect(result.draft.colour).toBe('Red');
      expect(result.draft.deliveryDate).toBe('2026-11-15');

      // Finish is still missing
      expect(result.draft.designFinish).toBeNull();
      expect(result.draft.missing).toContain('designFinish');
      expect(result.draft.missing).not.toContain('colour');
    });

    it('parses prompt with finish specified but colour missing', () => {
      const input = '1000 chudi size 2.4 plain glossy by 15 Nov';
      const result = parseOrderLocal(input, 2026);

      expect(result.draft.designFinish).toBe('Plain glossy');
      expect(result.draft.colour).toBeNull();
      expect(result.draft.missing).toContain('colour');
      expect(result.draft.missing).not.toContain('designFinish');
    });

    it('flags ambiguous counting unit like toda for clarification', () => {
      const input = '10 toda chudi size 2.4 by 15 Nov';
      const result = parseOrderLocal(input, 2026);

      expect(result.draft.clarificationNeeded.length).toBeGreaterThan(0);
      expect(result.draft.clarificationNeeded.some((msg) => msg.includes('toda'))).toBe(true);
    });

    it('flags unrecognized artisanal terms for clarification', () => {
      const input = '1000 chudi size 2.4 meenakari by 15 Nov';
      const result = parseOrderLocal(input, 2026);

      expect(result.draft.clarificationNeeded.some((msg) => msg.includes('meenakari'))).toBe(true);
    });

    it('rejects empty input with INVALID_INPUT error', () => {
      expect(() => parseOrderLocal('')).toThrow('INVALID_INPUT');
      expect(() => parseOrderLocal('   ')).toThrow('INVALID_INPUT');
    });

    it('rejects input over 500 characters with PAYLOAD_TOO_LARGE error', () => {
      const longText = 'a'.repeat(501);
      expect(() => parseOrderLocal(longText)).toThrow('PAYLOAD_TOO_LARGE');
    });
  });

  describe('draftCatalogueLocal (T16, T17)', () => {
    it('T16: drafts bilingual catalogue titles and tags preserving confirmed facts', () => {
      const facts = {
        productFamily: 'glass_bangle' as const,
        sizeCode: '2.4',
        colour: 'Red',
        quantity: 300,
        locality: 'Ramnagar',
      };
      const phrase = '2.4 laal chudi, 300 piece';

      const result = draftCatalogueLocal(facts, phrase);

      expect(result.source).toBe('local');
      expect(result.draft.hindiTitle).toBe('लाल काँच की चूड़ी, साइज़ 2.4');
      expect(result.draft.englishTitle).toBe('Red glass bangles, size 2.4');
      expect(result.draft.tags).toContain('glass bangles');
      expect(result.draft.tags).toContain('red');
      expect(result.draft.tags).toContain('size 2.4');
      expect(result.draft.tags).toContain('Firozabad');
      expect(result.draft.tags).toContain('Ramnagar');
      expect(result.draft.uncertainTerms).toHaveLength(0);
    });

    it('T17: places unfamiliar phrases in uncertainTerms without guessing', () => {
      const facts = {
        productFamily: 'glass_bangle' as const,
        sizeCode: '2.4',
        colour: 'Red',
        quantity: 300,
        locality: 'North',
      };
      const phrase = '2.4 laal chudi, 300 piece, velvet-coating';

      const result = draftCatalogueLocal(facts, phrase);

      expect(result.draft.uncertainTerms).toContain('velvet-coating');
    });

    it('validates facts object input', () => {
      expect(() => draftCatalogueLocal({} as unknown as CatalogueDraftRequest['facts'], 'test')).toThrow('INVALID_INPUT');
    });
  });

  describe('Glossary and Terminology Helpers', () => {
    it('identifies ambiguous counting units like toda and darjan', () => {
      expect(isAmbiguousCountingUnit('toda')).toBe(true);
      expect(isAmbiguousCountingUnit('darjan')).toBe(true);
      expect(isAmbiguousCountingUnit('piece')).toBe(false);
    });

    it('looks up known local aliases', () => {
      const alias = lookupGlossaryTerm('laal');
      expect(alias).toBeDefined();
      expect(alias?.canonicalTerm).toBe('Red');
      expect(alias?.confirmedBySupplier).toBe(true);
    });
  });
});
