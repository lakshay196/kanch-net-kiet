import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as parseOrderHandler } from '@/app/api/parse-order/route';
import { POST as catalogueDraftHandler } from '@/app/api/catalogue-draft/route';

describe('Phase B5: Optional AI Route Handlers with Local Fallback', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.OPENAI_API_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('POST /api/parse-order', () => {
    it('returns 200 with local fallback when no API key is present (T1, T2)', async () => {
      const req = new NextRequest('http://localhost:3000/api/parse-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: '1,000 glass bangles, size 2.4, by 15 Nov',
          demoYear: 2026,
        }),
      });

      const res = await parseOrderHandler(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.source).toBe('local');
      expect(json.draft.quantityNeeded).toBe(1000);
      expect(json.draft.size).toBe('2.4');
      expect(json.draft.deliveryDate).toBe('2026-11-15');
      expect(json.draft.colour).toBeNull();
      expect(json.draft.designFinish).toBeNull();
      expect(json.draft.missing).toContain('colour');
      expect(json.draft.missing).toContain('designFinish');
    });

    it('returns 400 INVALID_INPUT for empty text', async () => {
      const req = new NextRequest('http://localhost:3000/api/parse-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: '   ', demoYear: 2026 }),
      });

      const res = await parseOrderHandler(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.error.code).toBe('INVALID_INPUT');
    });

    it('returns 413 PAYLOAD_TOO_LARGE when text exceeds 500 characters', async () => {
      const req = new NextRequest('http://localhost:3000/api/parse-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'x'.repeat(501), demoYear: 2026 }),
      });

      const res = await parseOrderHandler(req);
      expect(res.status).toBe(413);

      const json = await res.json();
      expect(json.error.code).toBe('PAYLOAD_TOO_LARGE');
    });

    it('gracefully falls back to local parser when OpenAI fetch rejects', async () => {
      process.env.OPENAI_API_KEY = 'test-key-mock';
      global.fetch = vi.fn().mockRejectedValue(new Error('Network connection timeout'));

      const req = new NextRequest('http://localhost:3000/api/parse-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: '1,000 glass bangles, size 2.4, by 15 Nov',
          demoYear: 2026,
        }),
      });

      const res = await parseOrderHandler(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.source).toBe('local');
      expect(json.draft.quantityNeeded).toBe(1000);
      expect(json.draft.size).toBe('2.4');
    });
  });

  describe('POST /api/catalogue-draft', () => {
    it('returns 200 with local fallback when no API key is present (T16)', async () => {
      const req = new NextRequest('http://localhost:3000/api/catalogue-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facts: {
            productFamily: 'glass_bangle',
            sizeCode: '2.4',
            colour: 'Red',
            quantity: 300,
            locality: 'Ramnagar',
          },
          phrase: '2.4 laal chudi, 300 piece',
        }),
      });

      const res = await catalogueDraftHandler(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.source).toBe('local');
      expect(json.draft.hindiTitle).toContain('लाल काँच की चूड़ी');
      expect(json.draft.englishTitle).toContain('Red glass bangles');
      expect(json.draft.tags).toContain('Firozabad');
      expect(json.draft.uncertainTerms).toHaveLength(0);
    });

    it('returns 400 INVALID_INPUT when facts are missing or invalid', async () => {
      const req = new NextRequest('http://localhost:3000/api/catalogue-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facts: {
            productFamily: 'invalid_family',
            sizeCode: '2.4',
          },
          phrase: 'test',
        }),
      });

      const res = await catalogueDraftHandler(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.error.code).toBe('INVALID_INPUT');
    });

    it('falls back to local template when OpenAI returns HTTP 500 error', async () => {
      process.env.OPENAI_API_KEY = 'test-key-mock';
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      const req = new NextRequest('http://localhost:3000/api/catalogue-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facts: {
            productFamily: 'glass_bangle',
            sizeCode: '2.4',
            colour: 'Red',
            quantity: 300,
            locality: 'North',
          },
          phrase: '2.4 laal chudi, 300 piece',
        }),
      });

      const res = await catalogueDraftHandler(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.source).toBe('local');
      expect(json.draft.englishTitle).toContain('Red glass bangles, size 2.4');
    });
  });
});
