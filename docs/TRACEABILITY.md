# PRD v2 traceability

Each row has one implementation owner. The corresponding visual or domain counterpart has its own row. “Planned” means this package specifies work; the application has not been built in this repository yet. PRD test IDs refer to [`18](PRD.md). B updates status when merging PRs. The v2 PRD itself is the full acceptance source.

| ID / PRD section | Requirement | Owner | Guide phase | Acceptance evidence | Status |
|---|---|---|---|---|---|
| P01 `1 | One bulk order from compatible small suppliers | B | B3 | T4–T8 plan/eligibility | Planned |
| P02 `1, `14 | Independent proposed module disclaimer | A | A1 | Banner visible throughout browser flow | Planned |
| P03 `2 | Accurate ODOP/Firozabad reference; no official claim | A | A1 | Copy matches PRD `2.3, no false partnership | Planned |
| P04 `3 | Explain stock coordination beyond discovery | A | A3 | UI shows reasons, plan and collection flow | Planned |
| P05 `4 | Buyer, supplier, coordinator, collector actions labelled | A | A1–A4 | Each action clearly names actor | Planned |
| P06 `4.1 | Hindi/Hinglish/English, short guided input, large mobile targets | A | A2–A4 | Browser T20 and bilingual review | Planned |
| P07 `4.1, `9 | Optional spoken input with confirmation; text fallback | A | A2 | Unsupported browser still completes T1; transcript editable | Planned |
| P08 `4.2, `8 | Minimum glass-bangle fields only, no grade | B | B1 | Types/seed have no grade; T2/T3 | Planned |
| P09 `4.2 | Simple supplier listing UI with locality, date, optional price | A | A2 | Listing facts visible; no full address | Planned |
| P10 `5 | Sample parse, missing red/finish, visible 2026 assumption | B | B2 | T2 output null missing fields and ISO date | Planned |
| P11 `5 | Buyer edits/confirms missing fields and locality | A | A2 | T3; confirmation gate and reset | Planned |
| P12 `5.2 | B-101/102/103 fictional seed and 1,000 total | B | B1/B3 | T6; 300+400+300 | Planned |
| P13 `5.2, `11 | B-104 incompatible size exclusion | B | B3 | T4 reason says 2.6 vs 2.4 | Planned |
| P14 `5.2, `11.2 | B-105 duplicate underlying ID, canonical resolution | B | B1/B3 | T5; unresolved blocks both; verified original counts once | Planned |
| P15 `5.3, `11.4 | B-106 tied distance/rate ordering | B | B1/B3 | T8; B-103 ranks before B-106 | Planned |
| P16 `6.1 | Model-assisted buyer draft, no invented facts | B | B5 | T18 and route validation | Planned |
| P17 `6.2 | Catalogue Hindi/English wording, preserve confirmed facts | B | B2/B5 | T16; original facts unchanged | Planned |
| P18 `6.3, `7 | Local glossary suggestions, ambiguous quantities confirmed | B | B2 | T17; unknown/darjan not guessed | Planned |
| P19 `6.1–6.3 | Local fallback without key and source label | B | B2/B5 | T1/T18; model failure yields local | Planned |
| P20 `6, `16 | Draft/source/uncertainty displayed and editable | A | A2 | T2/T16/T18 browser | Planned |
| P21 `7.1–7.3 | Preserve original local phrase; aliases confirmed, supplier-specific | B | B2 | Alias tests; no unconfirmed global mapping | Planned |
| P22 `7.2 | Familiar size code shown before optional mm helper | A | A2 | Browser shows 2.4 as code; no decimal conversion required | Planned |
| P23 `8.2 | Human checker enters accepted/rework/rejected/damaged | A | A4 | T9/T12; four outcomes editable | Planned |
| P24 `8.3, `11.1 | Deterministic compatibility, available stock only | B | B3 | T4/T6; first failing reason | Planned |
| P25 `9.2 | Discovery displays eligible/excluded and explanations | A | A3 | T4/T5 browser | Planned |
| P26 `9.3, `11.3–11.5 | Sort, take, shortfall, approval lock | B | B3 | T6–T8 | Planned |
| P27 `9.3 | Coordinator review/approval control | A | A3 | T7; cannot approve 400 short | Planned |
| P28 `9.4, `10 | Reserve, cancel, collect, return/re-check, damaged exclusion | B | B4 | T13–T15 transition tests | Planned |
| P29 `9.4, `10 | Inventory/quality state displayed clearly | A | A3/A4 | T13–T15 browser | Planned |
| P30 `9.5, `12 | Supplier net ₹7,448 and buyer payable ₹9,800 simulated | B | B4 | T9–T12 exact arithmetic | Planned |
| P31 `9.5, `12 | Simulated amounts and no payment action | A | A4 | Browser labels every amount “Simulated” | Planned |
| P32 `10.2–10.3 | Leftover/rework/resale explanation; supplier consent | A | A4 | UI offers concept only, no auto transfer | Planned |
| P33 `11.6 | Rate is illustrative, no verified reputation claim | A | A3 | Visible label on every supplier row | Planned |
| P34 `11.6 | Rate formula and “not enough history” fallback | B | B4 | Unit tests for inspected denominator/empty history | Planned |
| P35 `14 | Four visible stages on one `/demo` page | A | A1–A4 | Browser T1/T20 | Planned |
| P35a `14`; source decision | New `/demo` fits the live Kanch-Net visual identity while keeping v2 flow separate from old tour | A | A1 | Screenshots compared with live reference; no old grade/escrow in `/demo` | Planned |
| P36 `14.3 | No QR, real payment, government login/API, grade, extra categories | B | B0–B5 | Code/diff audit before release | Planned |
| P37 `15, `17 | Seed/module state, no database | B | B1 | No DB connection/migrations | Planned |
| P37a `17–18 | Browser state resets from seed on refresh | A | A4 | T19 | Planned |
| P38 `16, `24 | No phone/full address/Aadhaar/bank data shown or sent to model | B | B1/B5 | Seed/model payload review | Planned |
| P39 `17.3 | Server-only key, timeout, strict schema, validation, fallback | B | B5 | T18, secret scan, API tests | Planned |
| P40 `18 | T1–T20 acceptance suite | B | B6/integration | Test log plus A browser screenshots | Planned |
| P41 `19–20 | 10-minute demo narrative and honest judge answers | A | A4 | Rehearsal within 10 minutes; copy matches PRD | Planned |
| P42 `21, `23 | Prototype success targets, no false impact claim | B | B6/release | Release notes label targets and fictional data | Planned |
| P43 `25 | Complete no-key end-to-end demo | B | B6/integration | Full T1–T20 release gate | Planned |

## Deliberate exclusions and future validation

| PRD section | Decision | Why |
|---|---|---|
| `2.4 | Government-service-style demonstrator and real ODOP integration are future work | Current demo independent; authorization required |
| `7, `8 | Real-world term meanings, size tolerances, and quality standards need local validation | Demo glossary and checks are illustrative |
| `14.3 | QR, actual payments, Aadhaar, government APIs, production ERP, grades, second category, automated resale, model training | Explicitly out of scope |
| `15, `17 | Relational schema, migrations, authenticated roles, concurrent reservations | Prototype uses in-memory seed/state |

Before release, B compares every section of `docs/PRD.md` against this matrix and opens a missing-row issue for any uncovered requirement. A reviews UI-related rows. Neither builder silently treats a future-pilot item as implemented.
