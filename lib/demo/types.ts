/**
 * Kanch-Net Shared Interface Types (Contract v1)
 * Defined per docs/CONTRACT.md and docs/PRD.md
 */

export type ProductFamily = 'glass_bangle';

export type LanguagePreference = 'hi' | 'hinglish' | 'en';

export type ListingStatus = 'draft' | 'published' | 'paused';

export type BatchStatus =
  | 'available'
  | 'reserved'
  | 'collected'
  | 'quality_checked'
  | 'rework'
  | 'returned'
  | 'damaged'
  | 'fulfilled';

export type OrderStatus =
  | 'draft'
  | 'awaiting_confirmation'
  | 'ready_for_matching'
  | 'planned'
  | 'blocked_shortfall'
  | 'approved'
  | 'quality_checked'
  | 'completed'
  | 'cancelled';

export interface Supplier {
  supplierId: string;
  displayName: string;
  locality: string;
  languagePreference?: LanguagePreference;
}

export interface ProductListing {
  listingId: string;
  supplierId: string;
  productFamily: ProductFamily;
  sizeCode: string;
  colour: string;
  designFinish?: string;
  availableQty: number; // integer >= 0
  readyDate?: string; // ISO date YYYY-MM-DD
  localTerms: string[];
  pricePerPiece?: number;
  status: ListingStatus;
}

export interface Batch {
  rowId: string; // Unique row identifier (e.g. ROW-101)
  batchId: string; // Physical batch identifier (e.g. B-101; can repeat in duplicate rows)
  supplierId: string;
  listingId: string;
  declaredQty: number;
  reservedQty: number;
  collectedQty: number;
  acceptedQty: number;
  reworkQty: number;
  rejectedQty: number;
  damagedQty: number;
  status: BatchStatus;
  duplicateOf?: string;
  distanceKm: number;
  illustrativeAcceptanceRate?: number; // 0-100 percentage
  enabled?: boolean; // Defaults to true; B-106 is false by default
}

export interface Order {
  orderId: string;
  productFamily: ProductFamily;
  quantityNeeded: number;
  sizeCode: string | null;
  colour: string | null;
  designFinish: string | null;
  deliveryDate: string | null; // YYYY-MM-DD
  deliveryLocality: string | null;
  status: OrderStatus;
}

export interface PlanLine {
  rowId: string;
  batchId: string;
  supplierId: string;
  takeQty: number;
}

export interface QualityLine {
  rowId: string;
  collectedQty: number;
  acceptedQty: number;
  reworkQty: number;
  rejectedQty: number;
  damagedQty: number;
}

export interface Alias {
  phrase: string;
  canonicalTerm: string;
  confirmedBySupplier: boolean;
  piecesPerUnit?: number;
}

export interface SupplierSettlementLine {
  rowId: string;
  batchId: string;
  supplierId: string;
  acceptedQty: number;
  grossAmount: number; // ₹ (acceptedQty * 8)
  platformFee: number; // ₹ (5% of gross)
  netAmount: number; // ₹ (gross - fee)
}

export interface SettlementSummary {
  acceptedQtyTotal: number;
  rejectedQtyTotal: number;
  damagedQtyTotal: number;
  reworkQtyTotal: number;
  supplierGrossTotal: number;
  platformFeeTotal: number;
  supplierNetTotal: number; // Target for sample: 7448
  buyerPayableTotal: number; // Target for sample: 9800
  lines: SupplierSettlementLine[];
  isBalanced: boolean;
  isSimulated: true;
}

/* API Envelopes */

export interface ParseOrderRequest {
  text: string;
  demoYear: 2026;
}

export interface OrderDraft {
  productFamily: ProductFamily | null;
  size: string | null;
  colour: string | null;
  designFinish: string | null;
  quantityNeeded: number | null;
  deliveryDate: string | null;
  missing: string[];
  clarificationNeeded: string[];
}

export interface ParseOrderResponse {
  draft: OrderDraft;
  source: 'model' | 'local';
}

export interface CatalogueDraftRequest {
  facts: {
    productFamily: ProductFamily;
    sizeCode: string;
    colour: string;
    quantity: number;
    locality: string;
  };
  phrase: string;
}

export interface CatalogueDraft {
  hindiTitle: string;
  englishTitle: string;
  tags: string[];
  uncertainTerms: string[];
}

export interface CatalogueDraftResponse {
  draft: CatalogueDraft;
  source: 'model' | 'local';
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
  };
}

