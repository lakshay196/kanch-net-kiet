import { describe, it, expect } from 'vitest';
import {
  SEED_SUPPLIERS,
  SEED_LISTINGS,
  SEED_BATCHES,
  SEED_VERIFIED_CANONICAL_ROWS,
  SAMPLE_CONFIRMED_ORDER,
  SAMPLE_UNCONFIRMED_ORDER,
  SEED_DEFAULT_QUALITY_LINES,
  EXPECTED_SAMPLE_TOTALS,
  DEMO_YEAR,
} from '@/data/demo-bangle-order';

describe('Phase B1: Seed Data and Contract Alignment', () => {
  it('ensures all batch row IDs are unique and reference valid listings and suppliers', () => {
    const rowIds = SEED_BATCHES.map((b) => b.rowId);
    expect(new Set(rowIds).size).toBe(rowIds.length);

    const supplierIds = new Set(SEED_SUPPLIERS.map((s) => s.supplierId));
    const listingIds = new Set(SEED_LISTINGS.map((l) => l.listingId));

    for (const batch of SEED_BATCHES) {
      expect(supplierIds.has(batch.supplierId)).toBe(true);
      expect(listingIds.has(batch.listingId)).toBe(true);
      expect(batch.declaredQty).toBeGreaterThan(0);
    }
  });

  it('verifies B-105 duplicates physical batch B-101 with unique rowId', () => {
    const row101 = SEED_BATCHES.find((b) => b.rowId === 'ROW-101');
    const row105 = SEED_BATCHES.find((b) => b.rowId === 'ROW-105');

    expect(row101).toBeDefined();
    expect(row105).toBeDefined();

    // Both share underlying physical batchId 'B-101'
    expect(row101?.batchId).toBe('B-101');
    expect(row105?.batchId).toBe('B-101');
    expect(row105?.duplicateOf).toBe('B-101');
    expect(row101?.rowId).not.toBe(row105?.rowId);

    // Initial verified canonical mapping identifies ROW-101 as canonical
    expect(SEED_VERIFIED_CANONICAL_ROWS['B-101']).toBe('ROW-101');
  });

  it('verifies standard sample order covers exactly 1,000 pieces with B-101, B-102, B-103', () => {
    const b101 = SEED_BATCHES.find((b) => b.batchId === 'B-101' && b.rowId === 'ROW-101')!;
    const b102 = SEED_BATCHES.find((b) => b.batchId === 'B-102')!;
    const b103 = SEED_BATCHES.find((b) => b.batchId === 'B-103')!;

    expect(b101.declaredQty + b102.declaredQty + b103.declaredQty).toBe(1000);
    expect(SAMPLE_CONFIRMED_ORDER.quantityNeeded).toBe(1000);
  });

  it('verifies B-104 has incompatible size 2.6 for order size 2.4', () => {
    const b104 = SEED_BATCHES.find((b) => b.batchId === 'B-104')!;
    const listing104 = SEED_LISTINGS.find((l) => l.listingId === b104.listingId)!;

    expect(listing104.sizeCode).toBe('2.6');
    expect(SAMPLE_CONFIRMED_ORDER.sizeCode).toBe('2.4');
  });

  it('verifies B-106 is tied with B-103 at 6 km but has lower rate (61 vs 90) and is disabled by default', () => {
    const b103 = SEED_BATCHES.find((b) => b.batchId === 'B-103')!;
    const b106 = SEED_BATCHES.find((b) => b.batchId === 'B-106')!;

    expect(b106.enabled).toBe(false);
    expect(b106.distanceKm).toBe(6);
    expect(b103.distanceKm).toBe(6);
    expect(b103.illustrativeAcceptanceRate).toBe(90);
    expect(b106.illustrativeAcceptanceRate).toBe(61);
    expect(b103.illustrativeAcceptanceRate!).toBeGreaterThan(b106.illustrativeAcceptanceRate!);
  });

  it('verifies unconfirmed order has missing critical fields and demo year 2026', () => {
    expect(DEMO_YEAR).toBe(2026);
    expect(SAMPLE_UNCONFIRMED_ORDER.colour).toBeNull();
    expect(SAMPLE_UNCONFIRMED_ORDER.designFinish).toBeNull();
    expect(SAMPLE_UNCONFIRMED_ORDER.status).toBe('awaiting_confirmation');
  });

  it('verifies default quality inspection sums and balances to 1,000 collected', () => {
    const collected = SEED_DEFAULT_QUALITY_LINES.reduce((sum, q) => sum + q.collectedQty, 0);
    const accepted = SEED_DEFAULT_QUALITY_LINES.reduce((sum, q) => sum + q.acceptedQty, 0);
    const rejected = SEED_DEFAULT_QUALITY_LINES.reduce((sum, q) => sum + q.rejectedQty, 0);
    const rework = SEED_DEFAULT_QUALITY_LINES.reduce((sum, q) => sum + q.reworkQty, 0);
    const damaged = SEED_DEFAULT_QUALITY_LINES.reduce((sum, q) => sum + q.damagedQty, 0);

    expect(collected).toBe(EXPECTED_SAMPLE_TOTALS.collectedQty);
    expect(accepted).toBe(EXPECTED_SAMPLE_TOTALS.acceptedQty);
    expect(rejected).toBe(EXPECTED_SAMPLE_TOTALS.rejectedQty);
    expect(rework).toBe(0);
    expect(damaged).toBe(0);

    for (const q of SEED_DEFAULT_QUALITY_LINES) {
      expect(q.acceptedQty + q.reworkQty + q.rejectedQty + q.damagedQty).toBe(q.collectedQty);
    }
  });

  it('verifies simulated settlement totals match PRD Section 12', () => {
    const acceptedTotal = EXPECTED_SAMPLE_TOTALS.acceptedQty;
    const gross = acceptedTotal * 8;
    const fee = Math.round(gross * 0.05);
    const net = gross - fee;
    const buyerPayable = 1000 * 10 - 20 * 10;

    expect(gross).toBe(EXPECTED_SAMPLE_TOTALS.supplierGross);
    expect(fee).toBe(EXPECTED_SAMPLE_TOTALS.platformFee);
    expect(net).toBe(EXPECTED_SAMPLE_TOTALS.supplierNet);
    expect(buyerPayable).toBe(EXPECTED_SAMPLE_TOTALS.buyerPayable);

    // Exact PRD amounts: Net supplier ₹7,448, Buyer payable ₹9,800
    expect(net).toBe(7448);
    expect(buyerPayable).toBe(9800);
  });
});
