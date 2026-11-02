import { describe, it, expect } from 'vitest';
import {
  reserveBatch,
  releaseReservation,
  recordCollection,
  recordQualityInspection,
  returnUsableStock,
  markStockDamaged,
} from '@/lib/demo/inventory';
import {
  calculateSettlement,
  validateQualityLines,
} from '@/lib/demo/settlement';
import { SEED_BATCHES, SEED_DEFAULT_QUALITY_LINES, EXPECTED_SAMPLE_TOTALS } from '@/data/demo-bangle-order';
import { Batch, QualityLine } from '@/lib/demo/types';

describe('Phase B4: Inventory Transitions and Simulated Settlement (T9–T15)', () => {
  const batchDetails: Record<string, { batchId: string; supplierId: string }> = {
    'ROW-101': { batchId: 'B-101', supplierId: 'SUP-RAMESH' },
    'ROW-102': { batchId: 'B-102', supplierId: 'SUP-SURESH' },
    'ROW-103': { batchId: 'B-103', supplierId: 'SUP-FARIDA' },
  };

  describe('Simulated Settlement and Quality Balance (T9–T12)', () => {
    it('T9 & T10: calculates supplier settlement yielding exactly ₹7,448 for 980 accepted pieces', () => {
      const summary = calculateSettlement(SEED_DEFAULT_QUALITY_LINES, batchDetails);

      expect(summary.acceptedQtyTotal).toBe(980);
      expect(summary.rejectedQtyTotal).toBe(20);
      expect(summary.supplierGrossTotal).toBe(7840);
      expect(summary.platformFeeTotal).toBe(392);
      expect(summary.supplierNetTotal).toBe(7448);
      expect(summary.isSimulated).toBe(true);
      expect(summary.isBalanced).toBe(true);

      // Verify line-level breakdown
      const [line1, line2, line3] = summary.lines;

      // ROW-101: 300 accepted -> Gross: 2400, Fee: 120, Net: 2280
      expect(line1.acceptedQty).toBe(300);
      expect(line1.grossAmount).toBe(2400);
      expect(line1.platformFee).toBe(120);
      expect(line1.netAmount).toBe(2280);

      // ROW-102: 380 accepted -> Gross: 3040, Fee: 152, Net: 2888
      expect(line2.acceptedQty).toBe(380);
      expect(line2.grossAmount).toBe(3040);
      expect(line2.platformFee).toBe(152);
      expect(line2.netAmount).toBe(2888);

      // ROW-103: 300 accepted -> Gross: 2400, Fee: 120, Net: 2280
      expect(line3.acceptedQty).toBe(300);
      expect(line3.grossAmount).toBe(2400);
      expect(line3.platformFee).toBe(120);
      expect(line3.netAmount).toBe(2280);

      // Sum of net amounts
      expect(line1.netAmount + line2.netAmount + line3.netAmount).toBe(7448);
    });

    it('T11: calculates buyer settlement as ₹9,800 after 20 rejected pieces are adjusted out', () => {
      const summary = calculateSettlement(SEED_DEFAULT_QUALITY_LINES, batchDetails);

      expect(summary.buyerPayableTotal).toBe(9800);
      expect(summary.buyerPayableTotal).toBe(EXPECTED_SAMPLE_TOTALS.buyerPayable);
    });

    it('T12: blocks settlement when quality quantities are unbalanced', () => {
      // Unbalanced line: collected is 400, but sum of outcomes is 380 + 10 = 390 (10 missing)
      const unbalancedLines: QualityLine[] = [
        {
          rowId: 'ROW-101',
          collectedQty: 300,
          acceptedQty: 300,
          reworkQty: 0,
          rejectedQty: 0,
          damagedQty: 0,
        },
        {
          rowId: 'ROW-102',
          collectedQty: 400,
          acceptedQty: 380,
          reworkQty: 0,
          rejectedQty: 10, // 10 less than collected!
          damagedQty: 0,
        },
      ];

      const validation = validateQualityLines(unbalancedLines);
      expect(validation.isValid).toBe(false);
      expect(validation.errors[0]).toContain("Row 'ROW-102' does not balance");

      expect(() => calculateSettlement(unbalancedLines, batchDetails)).toThrow('SETTLEMENT_BLOCKED');
    });
  });

  describe('Inventory Transitions (T13–T15)', () => {
    const sampleBatch: Batch = { ...SEED_BATCHES[0] }; // B-101, declaredQty: 300, reservedQty: 0, status: 'available'

    it('T13: releases reservation before collection, returning stock to available', () => {
      // 1. Reserve stock
      const reserved = reserveBatch(sampleBatch, 300);
      expect(reserved.reservedQty).toBe(300);
      expect(reserved.status).toBe('reserved');

      // 2. Cancel / release reservation before physical collection
      const released = releaseReservation(reserved, 300);
      expect(released.reservedQty).toBe(0);
      expect(released.status).toBe('available');
    });

    it('T13: prevents reservation release after stock has already been collected', () => {
      const reserved = reserveBatch(sampleBatch, 300);
      const collected = recordCollection(reserved, 300);
      expect(collected.status).toBe('collected');

      // Cannot release after collection
      expect(() => releaseReservation(collected, 300)).toThrow('INVALID_TRANSITION');
    });

    it('T14: returned usable stock becomes available ONLY after physical return and re-check', () => {
      const reserved = reserveBatch(sampleBatch, 300);
      const collected = recordCollection(reserved, 300);
      const inspected = recordQualityInspection(collected, {
        acceptedQty: 280,
        reworkQty: 0,
        rejectedQty: 20,
        damagedQty: 0,
      });

      // 1. Returned without physical re-check -> stays unsaleable 'returned'
      const returnedNoRecheck = returnUsableStock(inspected, 20, false);
      expect(returnedNoRecheck.status).toBe('returned');

      // 2. Returned with physical re-check -> becomes 'available'
      const returnedWithRecheck = returnUsableStock(inspected, 20, true);
      expect(returnedWithRecheck.status).toBe('available');
    });

    it('T15: marked damaged stock is unsaleable and never returns to available', () => {
      const damaged = markStockDamaged(sampleBatch, 50);
      expect(damaged.status).toBe('damaged');
      expect(damaged.damagedQty).toBe(50);
    });
  });
});
