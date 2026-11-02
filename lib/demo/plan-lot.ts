/**
 * Kanch-Net Deterministic Lot Planning Engine
 * Defined per docs/PRD.md Section 5.2, 5.3, 11 & docs/CONTRACT.md
 * Pure functions with no side effects.
 */

import { Batch, ProductListing, Order, PlanLine, OrderStatus } from '@/lib/demo/types';
import { evaluateAllBatches, EligibilityResult } from '@/lib/demo/eligibility';

export interface LotPlanResult {
  lines: PlanLine[];
  totalPlannedQty: number;
  shortfallQty: number;
  isFullyCovered: boolean;
  approvalLocked: boolean;
  orderStatus: OrderStatus;
  sortedEligibleBatches: Batch[];
  evaluations: EligibilityResult[];
}

/**
 * Deterministic sorting order per PRD Section 5.3 & CONTRACT.md:
 * 1. distanceKm ascending (nearest first)
 * 2. illustrativeAcceptanceRate descending (higher acceptance rate first)
 * 3. available quantity descending
 * 4. batchId ascending (stable tie-break)
 */
export function sortEligibleBatches(batches: Batch[]): Batch[] {
  return [...batches].sort((a, b) => {
    // 1. Distance ascending
    if (a.distanceKm !== b.distanceKm) {
      return a.distanceKm - b.distanceKm;
    }
    // 2. Acceptance rate descending
    const rateA = a.illustrativeAcceptanceRate ?? 0;
    const rateB = b.illustrativeAcceptanceRate ?? 0;
    if (rateA !== rateB) {
      return rateB - rateA;
    }
    // 3. Available quantity descending
    const availA = a.declaredQty - a.reservedQty;
    const availB = b.declaredQty - b.reservedQty;
    if (availA !== availB) {
      return availB - availA;
    }
    // 4. Batch ID ascending
    return a.batchId.localeCompare(b.batchId);
  });
}

/**
 * Plan lot allocation across eligible supplier batches.
 * @param batches List of batch candidates in session
 * @param listings Dictionary of product listings keyed by listingId
 * @param order Confirmed buyer order
 * @param verifiedCanonicalRows Mapping of physical batchId to verified canonical rowId
 * @param simulatedFailureBatchIds Optional batchIds to simulate supplier failure (e.g. ['B-102'] for T7)
 */
export function planLot(
  batches: Batch[],
  listings: Record<string, ProductListing>,
  order: Order,
  verifiedCanonicalRows: Record<string, string> = {},
  simulatedFailureBatchIds: string[] = []
): LotPlanResult {
  // Step 1: Evaluate deterministic eligibility
  const { eligibleBatches, evaluations } = evaluateAllBatches(
    batches,
    listings,
    order,
    verifiedCanonicalRows
  );

  // Filter out simulated failure batches (e.g. B-102 offline toggle in T7)
  const activeEligible = eligibleBatches.filter(
    (b) => !simulatedFailureBatchIds.includes(b.batchId)
  );

  // Step 2: Sort eligible batches
  const sorted = sortEligibleBatches(activeEligible);

  // Step 3: Allocation loop
  let remainingNeeded = order.quantityNeeded;
  const lines: PlanLine[] = [];

  for (const b of sorted) {
    if (remainingNeeded <= 0) break;

    const available = Math.max(0, b.declaredQty - b.reservedQty);
    if (available <= 0) continue;

    const takeQty = Math.min(remainingNeeded, available);
    lines.push({
      rowId: b.rowId,
      batchId: b.batchId,
      supplierId: b.supplierId,
      takeQty,
    });

    remainingNeeded -= takeQty;
  }

  const totalPlannedQty = lines.reduce((sum, line) => sum + line.takeQty, 0);
  const shortfallQty = Math.max(0, order.quantityNeeded - totalPlannedQty);
  const isFullyCovered = shortfallQty === 0;
  const approvalLocked = !isFullyCovered;
  const orderStatus: OrderStatus = isFullyCovered ? 'planned' : 'blocked_shortfall';

  return {
    lines,
    totalPlannedQty,
    shortfallQty,
    isFullyCovered,
    approvalLocked,
    orderStatus,
    sortedEligibleBatches: sorted,
    evaluations,
  };
}
