import { describe, it, expect } from 'vitest';
import {
  SEED_BATCHES,
  SEED_LISTINGS,
  SAMPLE_CONFIRMED_ORDER,
  SEED_VERIFIED_CANONICAL_ROWS,
} from '@/data/demo-bangle-order';
import { ProductListing } from '@/lib/demo/types';
import { checkBatchEligibility, evaluateAllBatches } from '@/lib/demo/eligibility';
import { planLot, sortEligibleBatches } from '@/lib/demo/plan-lot';
import { explainPlan } from '@/lib/demo/explain-plan';

describe('Phase B3: Eligibility, Duplicate Resolution, Lot Planning (T4–T8)', () => {
  const listingsMap: Record<string, ProductListing> = {};
  for (const l of SEED_LISTINGS) {
    listingsMap[l.listingId] = l;
  }

  it('T4: excludes B-104 due to incompatible size (2.6 vs 2.4)', () => {
    const b104 = SEED_BATCHES.find((b) => b.batchId === 'B-104')!;
    const listing = listingsMap[b104.listingId];

    const result = checkBatchEligibility(
      b104,
      listing,
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS,
      SEED_BATCHES
    );

    expect(result.isEligible).toBe(false);
    expect(result.reason).toContain('Size is 2.6, buyer wants 2.4');
  });

  it('T5: excludes duplicate row ROW-105 while allowing verified canonical ROW-101', () => {
    const row101 = SEED_BATCHES.find((b) => b.rowId === 'ROW-101')!;
    const row105 = SEED_BATCHES.find((b) => b.rowId === 'ROW-105')!;

    const result101 = checkBatchEligibility(
      row101,
      listingsMap[row101.listingId],
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS,
      SEED_BATCHES
    );
    const result105 = checkBatchEligibility(
      row105,
      listingsMap[row105.listingId],
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS,
      SEED_BATCHES
    );

    expect(result101.isEligible).toBe(true);
    expect(result105.isEligible).toBe(false);
    expect(result105.reason).toContain("Duplicate row for physical batch 'B-101'");
  });

  it('excludes BOTH rows when duplicate physical batch is unresolved', () => {
    const row101 = SEED_BATCHES.find((b) => b.rowId === 'ROW-101')!;
    const row105 = SEED_BATCHES.find((b) => b.rowId === 'ROW-105')!;

    // Empty verified map -> Unresolved duplicate!
    const emptyVerifiedMap: Record<string, string> = {};

    const result101 = checkBatchEligibility(
      row101,
      listingsMap[row101.listingId],
      SAMPLE_CONFIRMED_ORDER,
      emptyVerifiedMap,
      SEED_BATCHES
    );
    const result105 = checkBatchEligibility(
      row105,
      listingsMap[row105.listingId],
      SAMPLE_CONFIRMED_ORDER,
      emptyVerifiedMap,
      SEED_BATCHES
    );

    expect(result101.isEligible).toBe(false);
    expect(result105.isEligible).toBe(false);
    expect(result101.reason).toContain("Unresolved duplicate physical batch ID 'B-101'");
    expect(result105.reason).toContain("Unresolved duplicate physical batch ID 'B-101'");
  });

  it('T6: main plan takes 300 (B-101) + 400 (B-102) + 300 (B-103) = 1,000 pieces', () => {
    const plan = planLot(
      SEED_BATCHES,
      listingsMap,
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS
    );

    expect(plan.isFullyCovered).toBe(true);
    expect(plan.approvalLocked).toBe(false);
    expect(plan.orderStatus).toBe('planned');
    expect(plan.totalPlannedQty).toBe(1000);
    expect(plan.shortfallQty).toBe(0);

    expect(plan.lines).toHaveLength(3);
    expect(plan.lines[0]).toEqual({
      rowId: 'ROW-101',
      batchId: 'B-101',
      supplierId: 'SUP-RAMESH',
      takeQty: 300,
    });
    expect(plan.lines[1]).toEqual({
      rowId: 'ROW-102',
      batchId: 'B-102',
      supplierId: 'SUP-SURESH',
      takeQty: 400,
    });
    expect(plan.lines[2]).toEqual({
      rowId: 'ROW-103',
      batchId: 'B-103',
      supplierId: 'SUP-FARIDA',
      takeQty: 300,
    });
  });

  it('T7: simulating B-102 failure yields 600 planned, 400 shortfall, and locks approval', () => {
    const plan = planLot(
      SEED_BATCHES,
      listingsMap,
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS,
      ['B-102'] // Simulate Suresh / B-102 failure
    );

    expect(plan.isFullyCovered).toBe(false);
    expect(plan.approvalLocked).toBe(true);
    expect(plan.orderStatus).toBe('blocked_shortfall');
    expect(plan.totalPlannedQty).toBe(600); // 300 (B-101) + 300 (B-103)
    expect(plan.shortfallQty).toBe(400);

    const explanation = explainPlan(plan, SAMPLE_CONFIRMED_ORDER.quantityNeeded);
    expect(explanation.shortfallWarning).toContain('Order shortfall of 400 pieces');
    expect(explanation.shortfallWarning).toContain('approval is locked');
  });

  it('T8: when enabled, B-103 outranks B-106 at equal 6 km distance due to higher acceptance rate (90 vs 61)', () => {
    // Enable B-106 for the tie-break demo
    const batchesWithB106 = SEED_BATCHES.map((b) =>
      b.batchId === 'B-106' ? { ...b, enabled: true } : b
    );

    const { eligibleBatches } = evaluateAllBatches(
      batchesWithB106,
      listingsMap,
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS
    );

    const sorted = sortEligibleBatches(eligibleBatches);

    // Verify ordering:
    // 1. B-101 (2 km)
    // 2. B-102 (4 km)
    // 3. B-103 (6 km, rate 90)
    // 4. B-106 (6 km, rate 61)
    expect(sorted.map((b) => b.batchId)).toEqual(['B-101', 'B-102', 'B-103', 'B-106']);

    const plan = planLot(
      batchesWithB106,
      listingsMap,
      SAMPLE_CONFIRMED_ORDER,
      SEED_VERIFIED_CANONICAL_ROWS
    );

    // Order of 1,000 is fully satisfied by B-101 (300) + B-102 (400) + B-103 (300); B-106 is not needed
    expect(plan.lines.map((l) => l.batchId)).toEqual(['B-101', 'B-102', 'B-103']);

    const explanation = explainPlan(plan, SAMPLE_CONFIRMED_ORDER.quantityNeeded);
    expect(explanation.tieBreakNotes.some((n) => n.includes('B-103 and B-106 are 6 km away'))).toBe(true);
  });
});
