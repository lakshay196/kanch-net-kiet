/**
 * Kanch-Net Seed Data & Fixtures (Contract v1)
 * Defined per docs/PRD.md Section 5 & docs/CONTRACT.md
 * NOTE: All names, localities, stock quantities, scores and amounts are
 * fictional demonstration data for the independent prototype.
 */

import {
  Supplier,
  ProductListing,
  Batch,
  Order,
  QualityLine,
  Alias,
} from '@/lib/demo/types';

export const DEMO_YEAR = 2026;

export const SEED_SUPPLIERS: Supplier[] = [
  {
    supplierId: 'SUP-RAMESH',
    displayName: 'Ramesh (Illustrative Supplier)',
    locality: 'Ramnagar',
    languagePreference: 'hi',
  },
  {
    supplierId: 'SUP-SURESH',
    displayName: 'Suresh (Illustrative Supplier)',
    locality: 'Suhag Nagar',
    languagePreference: 'hi',
  },
  {
    supplierId: 'SUP-FARIDA',
    displayName: 'Farida (Illustrative Supplier)',
    locality: 'North',
    languagePreference: 'hi',
  },
  {
    supplierId: 'SUP-IMRAN',
    displayName: 'Imran (Illustrative Supplier)',
    locality: 'South',
    languagePreference: 'hi',
  },
  {
    supplierId: 'SUP-NAZMA',
    displayName: 'Nazma (Illustrative Supplier)',
    locality: 'North',
    languagePreference: 'hi',
  },
];

export const SEED_LISTINGS: ProductListing[] = [
  {
    listingId: 'LIST-101',
    supplierId: 'SUP-RAMESH',
    productFamily: 'glass_bangle',
    sizeCode: '2.4',
    colour: 'Red',
    designFinish: 'Plain glossy',
    availableQty: 300,
    readyDate: '2026-11-10',
    localTerms: ['kaanch chudi', 'laal', 'saada'],
    pricePerPiece: 8,
    status: 'published',
  },
  {
    listingId: 'LIST-102',
    supplierId: 'SUP-SURESH',
    productFamily: 'glass_bangle',
    sizeCode: '2.4',
    colour: 'Red',
    designFinish: 'Plain glossy',
    availableQty: 400,
    readyDate: '2026-11-10',
    localTerms: ['laal chudi', 'glossy'],
    pricePerPiece: 8,
    status: 'published',
  },
  {
    listingId: 'LIST-103',
    supplierId: 'SUP-FARIDA',
    productFamily: 'glass_bangle',
    sizeCode: '2.4',
    colour: 'Red',
    designFinish: 'Plain glossy',
    availableQty: 300,
    readyDate: '2026-11-10',
    localTerms: ['red bangle', 'saada'],
    pricePerPiece: 8,
    status: 'published',
  },
  {
    listingId: 'LIST-104',
    supplierId: 'SUP-IMRAN',
    productFamily: 'glass_bangle',
    sizeCode: '2.6', // Incompatible size for sample order (2.6 vs 2.4)
    colour: 'Red',
    designFinish: 'Plain glossy',
    availableQty: 300,
    readyDate: '2026-11-10',
    localTerms: ['badi chudi', '2.6'],
    pricePerPiece: 8,
    status: 'published',
  },
  {
    listingId: 'LIST-105',
    supplierId: 'SUP-RAMESH',
    productFamily: 'glass_bangle',
    sizeCode: '2.4',
    colour: 'Red',
    designFinish: 'Plain glossy',
    availableQty: 300,
    readyDate: '2026-11-10',
    localTerms: ['duplicate listing'],
    pricePerPiece: 8,
    status: 'published',
  },
  {
    listingId: 'LIST-106',
    supplierId: 'SUP-NAZMA',
    productFamily: 'glass_bangle',
    sizeCode: '2.4',
    colour: 'Red',
    designFinish: 'Plain glossy',
    availableQty: 400,
    readyDate: '2026-11-10',
    localTerms: ['surplus demo', 'north'],
    pricePerPiece: 8,
    status: 'published',
  },
];

export const SEED_BATCHES: Batch[] = [
  {
    rowId: 'ROW-101',
    batchId: 'B-101',
    supplierId: 'SUP-RAMESH',
    listingId: 'LIST-101',
    declaredQty: 300,
    reservedQty: 0,
    collectedQty: 0,
    acceptedQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
    status: 'available',
    distanceKm: 2,
    illustrativeAcceptanceRate: 94,
    enabled: true,
  },
  {
    rowId: 'ROW-102',
    batchId: 'B-102',
    supplierId: 'SUP-SURESH',
    listingId: 'LIST-102',
    declaredQty: 400,
    reservedQty: 0,
    collectedQty: 0,
    acceptedQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
    status: 'available',
    distanceKm: 4,
    illustrativeAcceptanceRate: 88,
    enabled: true,
  },
  {
    rowId: 'ROW-103',
    batchId: 'B-103',
    supplierId: 'SUP-FARIDA',
    listingId: 'LIST-103',
    declaredQty: 300,
    reservedQty: 0,
    collectedQty: 0,
    acceptedQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
    status: 'available',
    distanceKm: 6,
    illustrativeAcceptanceRate: 90,
    enabled: true,
  },
  {
    rowId: 'ROW-104',
    batchId: 'B-104',
    supplierId: 'SUP-IMRAN',
    listingId: 'LIST-104',
    declaredQty: 300,
    reservedQty: 0,
    collectedQty: 0,
    acceptedQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
    status: 'available',
    distanceKm: 7,
    illustrativeAcceptanceRate: 80,
    enabled: true,
  },
  {
    rowId: 'ROW-105',
    batchId: 'B-101', // Underling physical batch ID is B-101
    duplicateOf: 'B-101',
    supplierId: 'SUP-RAMESH',
    listingId: 'LIST-105',
    declaredQty: 300,
    reservedQty: 0,
    collectedQty: 0,
    acceptedQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
    status: 'available',
    distanceKm: 2,
    illustrativeAcceptanceRate: 94,
    enabled: true,
  },
  {
    rowId: 'ROW-106',
    batchId: 'B-106',
    supplierId: 'SUP-NAZMA',
    listingId: 'LIST-106',
    declaredQty: 400,
    reservedQty: 0,
    collectedQty: 0,
    acceptedQty: 0,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
    status: 'available',
    distanceKm: 6, // Tied distance with B-103 (6 km)
    illustrativeAcceptanceRate: 61, // Acceptance rate 61 vs B-103's 90
    enabled: false, // Disabled by default for standard 1,000 piece sample
  },
];

/**
 * Initial verified canonical mapping:
 * ROW-101 is coordinator-verified canonical for physical batch B-101.
 * ROW-105 shares batchId B-101 and is therefore excluded.
 */
export const SEED_VERIFIED_CANONICAL_ROWS: Record<string, string> = {
  'B-101': 'ROW-101',
};

/**
 * Sample confirmed order from PRD Section 5.1
 */
export const SAMPLE_CONFIRMED_ORDER: Order = {
  orderId: 'ORD-2026-001',
  productFamily: 'glass_bangle',
  quantityNeeded: 1000,
  sizeCode: '2.4',
  colour: 'Red',
  designFinish: 'Plain glossy',
  deliveryDate: '2026-11-15',
  deliveryLocality: 'Firozabad mandi',
  status: 'ready_for_matching',
};

/**
 * Sample unconfirmed order draft resulting from prompt:
 * "1,000 glass bangles, size 2.4, by 15 Nov"
 */
export const SAMPLE_BUYER_TEXT = '1,000 glass bangles, size 2.4, by 15 Nov';

export const SAMPLE_UNCONFIRMED_ORDER: Order = {
  orderId: 'ORD-2026-DRAFT',
  productFamily: 'glass_bangle',
  quantityNeeded: 1000,
  sizeCode: '2.4',
  colour: null, // Missing colour must block confirmation
  designFinish: null, // Missing finish must block confirmation
  deliveryDate: '2026-11-15',
  deliveryLocality: 'Firozabad mandi',
  status: 'awaiting_confirmation',
};

/**
 * Default quality inspection outcome lines for T9-T12:
 * ROW-101: 300 accepted, 0 rejected
 * ROW-102: 380 accepted, 20 rejected
 * ROW-103: 300 accepted, 0 rejected
 * Total: 980 accepted, 20 rejected
 */
export const SEED_DEFAULT_QUALITY_LINES: QualityLine[] = [
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
    rejectedQty: 20,
    damagedQty: 0,
  },
  {
    rowId: 'ROW-103',
    collectedQty: 300,
    acceptedQty: 300,
    reworkQty: 0,
    rejectedQty: 0,
    damagedQty: 0,
  },
];

/**
 * Expected sample settlement amounts (PRD Section 12):
 * - Supplier rate: ₹8 per accepted piece
 * - Fee: 5% of gross
 * - Buyer payable: ₹10 per accepted piece = ₹9,800 (1000 * 10 - 20 * 10)
 */
export const EXPECTED_SAMPLE_TOTALS = {
  collectedQty: 1000,
  acceptedQty: 980,
  rejectedQty: 20,
  damagedQty: 0,
  reworkQty: 0,
  supplierGross: 7840,
  platformFee: 392,
  supplierNet: 7448,
  buyerPayable: 9800,
};

/**
 * Common local terms & aliases for Firozabad glass bangle ecosystem
 */
export const SEED_ALIASES: Alias[] = [
  { phrase: 'toda', canonicalTerm: 'toda (unit)', confirmedBySupplier: false, piecesPerUnit: 312 },
  { phrase: 'muthha', canonicalTerm: 'muttha (bundle)', confirmedBySupplier: false },
  { phrase: 'laal', canonicalTerm: 'Red', confirmedBySupplier: true },
  { phrase: 'hara', canonicalTerm: 'Green', confirmedBySupplier: true },
  { phrase: 'neela', canonicalTerm: 'Blue', confirmedBySupplier: true },
  { phrase: 'peela', canonicalTerm: 'Yellow', confirmedBySupplier: true },
  { phrase: 'saada', canonicalTerm: 'Plain glossy', confirmedBySupplier: true },
  { phrase: 'chamki', canonicalTerm: 'Glitter', confirmedBySupplier: true },
];

