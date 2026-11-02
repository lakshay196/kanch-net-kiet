# Shared interface contract v1

**Status:** Proposed; A and B must both approve before coding. B is the primary editor. [PRD v2](PRD.md) controls scope. Choices below that fill PRD gaps are marked [ASSUMPTION].

## Storage and authentication

There are **no database tables, migrations, SQL keys, indexes, login sessions, or real user roles** in this prototype. Seed records live in `data/demo-bangle-order.ts`; demo state lives in the browser and resets on refresh. A future relational database and authentication are [OUT OF SCOPE]. [ASSUMPTION] Role-labelled actions share one guided desk at `/demo`. Neither optional API persists data or requires a token. These boundaries must be visible in the demo and deployment notes.

| Record | Fields and types | Key, relationship, constraints |
|---|---|---|
| Supplier | `supplierId: string`, `displayName: string`, `locality: string`, `languagePreference?: 'hi'|'hinglish'|'en'` | Unique `supplierId`; no phone/full address in browser seed |
| ProductListing | `listingId: string`, `supplierId: string`, `productFamily: 'glass_bangle'`, `sizeCode: string`, `colour: string`, `designFinish?: string`, `availableQty: integer`, `readyDate?: ISO date`, `localTerms: string[]`, `pricePerPiece?: integer`, `status: 'draft'|'published'|'paused'` | Unique `listingId`; supplier reference exists; qty ≥ 0 |
| Batch | `rowId: string`, `batchId: string`, `supplierId: string`, `listingId: string`, `declaredQty/reservedQty/collectedQty/acceptedQty/reworkQty/rejectedQty/damagedQty: integer`, `status`, `duplicateOf?: string`, `distanceKm: number`, `illustrativeAcceptanceRate?: number` | Unique `rowId`; `batchId` is physical identity and may repeat in duplicate rows; quantities ≥ 0; references exist |
| Order | `orderId: string`, `productFamily: 'glass_bangle'`, `quantityNeeded: positive integer`, `sizeCode/colour/designFinish/deliveryDate/deliveryLocality: string|null`, `status` | Unique `orderId`; no matching before critical fields confirmed |
| PlanLine | `rowId, batchId, supplierId: string`, `takeQty: positive integer` | Sum takes ≤ need; one canonical row per physical batch |
| QualityLine | `rowId: string`, `collectedQty, acceptedQty, reworkQty, rejectedQty, damagedQty: integer` | Four outcomes sum to collected qty before settlement |
| Alias | `phrase, canonicalTerm: string`, `confirmedBySupplier: boolean`, `piecesPerUnit?: positive integer` | Ambiguous quantity/term cannot affect stock until confirmed |

Batch status: `available | reserved | collected | quality_checked | rework | returned | damaged | fulfilled`. Order status: `draft | awaiting_confirmation | ready_for_matching | planned | blocked_shortfall | approved | quality_checked | completed | cancelled`. B's pure inventory functions enforce transitions. Reserve only available stock. Cancellation before collection releases it. Returned usable stock becomes available only after physical return and re-check. Rework and damaged stay unsaleable.

## Deterministic contract

For the sample, product, size, colour, finish, available quantity, and duplicate status are checked; finish is mandatory only when buyer confirms it. Unconfirmed fields remain null. The sample “15 Nov” uses visibly stated demo year 2026 [ASSUMPTION]. Dates in data/API use `YYYY-MM-DD`; UI localizes them.

Two rows with the same `batchId` are never counted together. When unresolved, **both are excluded**. The seed includes `verifiedCanonicalRows: Record<string, string>` mapping physical `batchId` to verified `rowId`. It explicitly records coordinator verification of `ROW-101` as canonical physical batch B-101; `ROW-105` displays as B-105 but its underlying `batchId` is also B-101 and is excluded. Clearing verification excludes both until a coordinator resolves it. This reconciles PRD ``5.2 and 11.2.

Eligible batches sort by distance ascending, illustrative acceptance rate descending, available quantity descending, then batch ID ascending. Reliability never makes an incompatible batch eligible. Planner takes `min(remaining, available)`. Main path: 300 + 400 + 300 = 1,000. B-102 failure: 600 filled, 400 short, approval blocked. Optional B-106 is present but disabled by default; when enabled for its separate tie-break example, it is North, 6 km, rate 61, after B-103 at 6 km/rate 90.

## Shared TypeScript functions

B exports typed pure functions under `lib/demo`: `parseOrderLocal`, `checkEligibility`, `planLot`, `reservePlan`, `releaseReservation`, `recordCollection`, `recordQuality`, `returnUsableStock`, `calculateSettlement`, `draftCatalogueLocal`. A imports these; no duplicate business logic in React. Expected validation failures return a typed error code and plain-language message rather than an uncaught exception. B publishes types and fixture examples before A binds real logic. Any signature change needs a contract PR.

## HTTP API

Only two same-origin endpoints are needed. Neither endpoint mutates persistent state. Request bodies have a size cap. No CORS configuration or public API key. Responses use `{ error: { code: string, message: string } }` on failure. Error codes are stable; UI does not parse message text.

### `POST /api/parse-order`

- Body: `{ "text": string, "demoYear": 2026 }`; text 1–500 characters. No query parameters. Purpose: editable buyer draft, never an order or stock change.
- 200: `{ "draft": { "productFamily": "glass_bangle"|null, "size": string|null, "colour": string|null, "designFinish": string|null, "quantityNeeded": integer|null, "deliveryDate": "YYYY-MM-DD"|null, "missing": string[], "clarificationNeeded": string[] }, "source": "model"|"local" }`.
- 400 `INVALID_INPUT`; 413 `PAYLOAD_TOO_LARGE`; 500 `INTERNAL_ERROR` only if both model and local fallback fail. Missing key, timeout, invalid JSON, unknown fields, or invented stock/price/supplier produce a validated local 200 response.
- Validate fixed fields and values; unknown local terms go to `clarificationNeeded`, not an invented mapping.

### `POST /api/catalogue-draft`

- Body: `{ "facts": { "productFamily": "glass_bangle", "sizeCode": string, "colour": string, "quantity": integer, "locality": string }, "phrase": string }`. Combined text ≤ 500 characters. No query parameters.
- 200: `{ "draft": { "hindiTitle": string, "englishTitle": string, "tags": string[], "uncertainTerms": string[] }, "source": "model"|"local" }`. Titles/tags are suggestions; original facts remain unchanged.
- 400/413/500 use the same envelope. Invalid or fact-changing model output falls back to a local template with `source: 'local'`. Supplier must confirm before publication.

[RECOMMENDATION] Use the OpenAI Responses API with strict structured outputs and `gpt-5-mini` when available to the team's account, as documented in [AI-TOOLING](AI-TOOLING.md). If access is unavailable, keep the provider call disabled and use the local fallback; do not silently substitute a different service or model. Secrets remain server-side and out of logs.

## Quality and settlement

Each row must satisfy `accepted + rework + rejected + damaged = collected`. Otherwise settlement is blocked. Supplier gross = accepted × ₹8; fee = 5% of gross; net = gross − fee. The seed totals 980 accepted, 20 rejected, supplier net ₹7,448. Buyer payable = 1,000 × ₹10 − 20 × ₹10 = ₹9,800. Use integer paise or exact fixed integers and line-level rounding. Every amount says **Simulated**. No payment endpoint.

TypeScript fields are camelCase, types PascalCase, files/routes kebab-case. `rowId` is the UI key; `batchId` is physical identity. Store quantities in pieces, distance in km, rate as 0–100 percent. Display plain-language exclusion and disabled-action reasons.

## Change policy

After both builders approve this file, freeze it. Requester opens a GitHub issue with reason, affected types/endpoints/screens/mocks, and new acceptance checks. B authors a contract-only PR; both humans approve. B then changes domain/API; A changes UI/mocks after contract merge. Both agents read the new contract before coding. Neither invents an API, schema, status, or environment variable independently.
