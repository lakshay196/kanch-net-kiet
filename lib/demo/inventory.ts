/**
 * Kanch-Net Pure Inventory Transition Engine
 * Defined per docs/PRD.md Section 10, 18 & docs/CONTRACT.md
 * Functions are pure and side-effect free.
 */

import { Batch, BatchStatus } from '@/lib/demo/types';

/**
 * Reserve stock for a planned order.
 * Only stock currently 'available' may be reserved.
 */
export function reserveBatch(batch: Batch, qty: number): Batch {
  if (qty <= 0) {
    throw new Error('INVALID_QUANTITY: Reservation quantity must be positive');
  }

  const available = batch.declaredQty - batch.reservedQty;
  if (qty > available) {
    throw new Error(
      `INSUFFICIENT_STOCK: Cannot reserve ${qty} pieces from batch ${batch.batchId}; only ${available} available`
    );
  }

  const newReserved = batch.reservedQty + qty;
  const newStatus: BatchStatus = newReserved >= batch.declaredQty ? 'reserved' : 'available';

  return {
    ...batch,
    reservedQty: newReserved,
    status: newStatus,
  };
}

/**
 * Release an uncollected reservation before collection (T13).
 * If stock has already been physically collected, release is prohibited.
 */
export function releaseReservation(batch: Batch, qty?: number): Batch {
  if (batch.status === 'collected' || batch.status === 'quality_checked' || batch.status === 'fulfilled') {
    throw new Error(
      `INVALID_TRANSITION: Cannot release reservation for batch ${batch.batchId} because stock has already been collected (status: '${batch.status}')`
    );
  }

  const releaseAmount = qty !== undefined ? qty : batch.reservedQty;
  if (releaseAmount <= 0) {
    return batch;
  }

  const newReserved = Math.max(0, batch.reservedQty - releaseAmount);

  return {
    ...batch,
    reservedQty: newReserved,
    status: 'available',
  };
}

/**
 * Record physical collection of reserved stock.
 */
export function recordCollection(batch: Batch, collectedQty: number): Batch {
  if (collectedQty <= 0) {
    throw new Error('INVALID_QUANTITY: Collected quantity must be positive');
  }
  if (collectedQty > batch.reservedQty) {
    throw new Error(
      `EXCEEDS_RESERVATION: Cannot collect ${collectedQty} pieces; only ${batch.reservedQty} pieces reserved`
    );
  }

  return {
    ...batch,
    reservedQty: batch.reservedQty - collectedQty,
    collectedQty: batch.collectedQty + collectedQty,
    status: 'collected',
  };
}

/**
 * Record quality inspection outcome for collected stock.
 * Enforces quality balance: accepted + rework + rejected + damaged === collected.
 */
export function recordQualityInspection(
  batch: Batch,
  inspection: {
    acceptedQty: number;
    reworkQty: number;
    rejectedQty: number;
    damagedQty: number;
  }
): Batch {
  const { acceptedQty, reworkQty, rejectedQty, damagedQty } = inspection;
  const sum = acceptedQty + reworkQty + rejectedQty + damagedQty;

  if (sum !== batch.collectedQty) {
    throw new Error(
      `UNBALANCED_QUALITY: Inspection outcomes (${sum} pieces) must equal collected quantity (${batch.collectedQty} pieces)`
    );
  }

  return {
    ...batch,
    acceptedQty,
    reworkQty,
    rejectedQty,
    damagedQty,
    status: 'quality_checked',
  };
}

/**
 * Return rejected usable stock (T14).
 * Stock becomes available ONLY after physical return and re-check.
 */
export function returnUsableStock(
  batch: Batch,
  returnQty: number,
  isPhysicallyRechecked: boolean
): Batch {
  if (returnQty <= 0) {
    throw new Error('INVALID_QUANTITY: Return quantity must be positive');
  }
  if (returnQty > batch.rejectedQty) {
    throw new Error(
      `INVALID_RETURN: Return quantity (${returnQty}) cannot exceed rejected quantity (${batch.rejectedQty})`
    );
  }

  if (!isPhysicallyRechecked) {
    // Returned but not rechecked: stays in unsaleable 'returned' state
    return {
      ...batch,
      status: 'returned',
    };
  }

  // Once physically rechecked, usable stock returns to available pool
  return {
    ...batch,
    declaredQty: batch.declaredQty, // declared capacity maintained
    reservedQty: 0,
    status: 'available',
  };
}

/**
 * Mark stock damaged (T15).
 * Damaged stock is strictly unsaleable and never returns to available pool.
 */
export function markStockDamaged(batch: Batch, damagedQty: number): Batch {
  if (damagedQty <= 0) {
    throw new Error('INVALID_QUANTITY: Damaged quantity must be positive');
  }

  return {
    ...batch,
    damagedQty: batch.damagedQty + damagedQty,
    status: 'damaged',
  };
}

