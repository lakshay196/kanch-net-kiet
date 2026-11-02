/**
 * Kanch-Net Simulated Settlement Engine
 * Defined per docs/PRD.md Section 12 & docs/CONTRACT.md
 * Functions are pure and side-effect free.
 * NOTE: All amounts are simulated; no real payment or banking integration exists.
 */

import { QualityLine, SettlementSummary, SupplierSettlementLine } from '@/lib/demo/types';

export const ARTISAN_RATE_PER_PIECE_INR = 8;
export const PLATFORM_FEE_PERCENT = 5;
export const BUYER_PRICE_PER_PIECE_INR = 10;

export interface QualityValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates that all quality lines balance:
 * For each row: collected === accepted + rework + rejected + damaged
 */
export function validateQualityLines(lines: QualityLine[]): QualityValidationResult {
  const errors: string[] = [];

  for (const line of lines) {
    const sum = line.acceptedQty + line.reworkQty + line.rejectedQty + line.damagedQty;
    if (sum !== line.collectedQty) {
      errors.push(
        `Row '${line.rowId}' does not balance: collected ${line.collectedQty.toLocaleString()} pieces, but outcomes sum to ${sum.toLocaleString()} (accepted: ${line.acceptedQty}, rework: ${line.reworkQty}, rejected: ${line.rejectedQty}, damaged: ${line.damagedQty}).`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculates simulated settlement for verified quality inspection lines.
 * Settlement is blocked if any line is unbalanced.
 */
export function calculateSettlement(
  qualityLines: QualityLine[],
  batchDetails: Record<string, { batchId: string; supplierId: string }>
): SettlementSummary {
  // 1. Balance validation
  const validation = validateQualityLines(qualityLines);
  if (!validation.isValid) {
    throw new Error(`SETTLEMENT_BLOCKED: ${validation.errors.join(' ')}`);
  }

  let acceptedQtyTotal = 0;
  let rejectedQtyTotal = 0;
  let damagedQtyTotal = 0;
  let reworkQtyTotal = 0;
  let supplierGrossTotal = 0;
  let platformFeeTotal = 0;
  let supplierNetTotal = 0;

  const lines: SupplierSettlementLine[] = [];

  for (const q of qualityLines) {
    acceptedQtyTotal += q.acceptedQty;
    rejectedQtyTotal += q.rejectedQty;
    damagedQtyTotal += q.damagedQty;
    reworkQtyTotal += q.reworkQty;

    const details = batchDetails[q.rowId] || { batchId: q.rowId, supplierId: 'UNKNOWN' };

    // Line-level arithmetic per PRD Section 12.2
    const grossAmount = q.acceptedQty * ARTISAN_RATE_PER_PIECE_INR;
    const platformFee = Math.round((grossAmount * PLATFORM_FEE_PERCENT) / 100);
    const netAmount = grossAmount - platformFee;

    supplierGrossTotal += grossAmount;
    platformFeeTotal += platformFee;
    supplierNetTotal += netAmount;

    lines.push({
      rowId: q.rowId,
      batchId: details.batchId,
      supplierId: details.supplierId,
      acceptedQty: q.acceptedQty,
      grossAmount,
      platformFee,
      netAmount,
    });
  }

  // Buyer payable calculation per PRD Section 12.3:
  // ₹10 per piece on original order quantity less adjustment for rejected/shortfall pieces
  // Formula: targetOrderQuantity * ₹10 - (rejectedQtyTotal + (targetOrderQuantity - (acceptedQtyTotal + rejectedQtyTotal))) * ₹10
  // Or simply: acceptedQtyTotal * BUYER_PRICE_PER_PIECE_INR
  const buyerPayableTotal = acceptedQtyTotal * BUYER_PRICE_PER_PIECE_INR;

  return {
    acceptedQtyTotal,
    rejectedQtyTotal,
    damagedQtyTotal,
    reworkQtyTotal,
    supplierGrossTotal,
    platformFeeTotal,
    supplierNetTotal,
    buyerPayableTotal,
    lines,
    isBalanced: true,
    isSimulated: true,
  };
}
