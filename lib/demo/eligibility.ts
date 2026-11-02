/**
 * Kanch-Net Deterministic Batch Eligibility & Duplicate Check
 * Defined per docs/PRD.md Section 5, 11 & docs/CONTRACT.md
 * Pure functions with no side effects.
 */

import { Batch, ProductListing, Order } from '@/lib/demo/types';

export interface EligibilityResult {
  rowId: string;
  batchId: string;
  isEligible: boolean;
  reason: string | null;
}

/**
 * Check deterministic eligibility of a batch row against a confirmed order.
 * Follows PRD Section 5.2 and 11.2 duplicate resolution rules:
 * - When unresolved, ALL rows sharing the physical batchId are excluded.
 * - When verifiedCanonicalRows defines a canonical rowId for that batchId,
 *   only the verified rowId is eligible; duplicate rows are excluded.
 */
export function checkBatchEligibility(
  batch: Batch,
  listing: ProductListing | undefined,
  order: Order,
  verifiedCanonicalRows: Record<string, string> = {},
  allBatches: Batch[] = []
): EligibilityResult {
  const { rowId, batchId } = batch;

  // 1. Enabled check (B-106 is disabled by default for baseline 1,000-piece run)
  if (batch.enabled === false) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Batch ${batchId} is currently disabled in demo configuration.`,
    };
  }

  // 2. Status check
  if (batch.status !== 'available') {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Batch status is '${batch.status}', only 'available' stock may be matched.`,
    };
  }

  // 3. Listing existence check
  if (!listing) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Product listing not found for batch ${batchId}.`,
    };
  }

  // 4. Product family match
  if (listing.productFamily !== order.productFamily) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Product family is '${listing.productFamily}', buyer needs '${order.productFamily}'.`,
    };
  }

  // 5. Size match
  if (order.sizeCode && listing.sizeCode !== order.sizeCode) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Size is ${listing.sizeCode}, buyer wants ${order.sizeCode}.`,
    };
  }

  // 6. Colour match (case-insensitive check against confirmed order)
  if (order.colour && listing.colour.toLowerCase() !== order.colour.toLowerCase()) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Colour is ${listing.colour}, buyer wants ${order.colour}.`,
    };
  }

  // 7. Finish match (mandatory only when confirmed by buyer)
  if (
    order.designFinish &&
    listing.designFinish &&
    listing.designFinish.toLowerCase() !== order.designFinish.toLowerCase()
  ) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `Look/finish is ${listing.designFinish}, buyer wants ${order.designFinish}.`,
    };
  }

  // 8. Available quantity check
  const availableQty = batch.declaredQty - batch.reservedQty;
  if (availableQty <= 0) {
    return {
      rowId,
      batchId,
      isEligible: false,
      reason: `No quantity available for matching (declared: ${batch.declaredQty}, reserved: ${batch.reservedQty}).`,
    };
  }

  // 9. Duplicate physical batchId check (PRD Section 5.2 & Section 11.2)
  const matchingPhysicalBatches = allBatches.filter((b) => b.batchId === batchId);
  if (matchingPhysicalBatches.length > 1) {
    const verifiedRowId = verifiedCanonicalRows[batchId];
    if (!verifiedRowId) {
      // Unresolved duplicate physical ID: BOTH/ALL rows are excluded
      return {
        rowId,
        batchId,
        isEligible: false,
        reason: `Unresolved duplicate physical batch ID '${batchId}'. Both rows excluded until coordinator verifies canonical row.`,
      };
    }

    if (rowId !== verifiedRowId) {
      // This row is the unverified duplicate
      return {
        rowId,
        batchId,
        isEligible: false,
        reason: `Duplicate row for physical batch '${batchId}'. Verified canonical row is '${verifiedRowId}'.`,
      };
    }
  }

  return {
    rowId,
    batchId,
    isEligible: true,
    reason: null,
  };
}

/**
 * Filter and evaluate a collection of batches against an order.
 */
export function evaluateAllBatches(
  batches: Batch[],
  listings: Record<string, ProductListing>,
  order: Order,
  verifiedCanonicalRows: Record<string, string> = {}
): {
  eligibleBatches: Batch[];
  evaluations: EligibilityResult[];
} {
  const evaluations: EligibilityResult[] = [];
  const eligibleBatches: Batch[] = [];

  for (const b of batches) {
    const listing = listings[b.listingId];
    const evalResult = checkBatchEligibility(b, listing, order, verifiedCanonicalRows, batches);
    evaluations.push(evalResult);
    if (evalResult.isEligible) {
      eligibleBatches.push(b);
    }
  }

  return { eligibleBatches, evaluations };
}
