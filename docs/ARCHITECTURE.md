# Architecture

## Product boundary

[PRD] The deliverable is an independent glass-bangle demo at `/demo` within the existing Next.js Kanch-Net app. It is not a live ODOP integration, payment service, or production marketplace. Fictional names, quantities, scores, and money must be labelled illustrative. The core path must work without a model key or network.

[DECISION] Use the committed `lakshay196/kanch-net` `main@4fae0a6` app's pinned Next.js 16, React 19, TypeScript, Tailwind 4, and npm lockfile. The live [redesign prototype](https://redesign-kench-net.vercel.app/) is a visual reference; its deployed code has not been mapped to that commit. See [prototype baseline](PROTOTYPE-BASELINE.md). One app is simpler for two beginners than separate services. App Router serves the page and two same-origin route handlers. Use existing `lib/match.ts`, `lib/settlement.ts`, `lib/score.ts`, and `lib/places.ts` only after B checks their behaviour against v2. No new database, ORM, auth provider, queue, or state library.

Builder B exports committed tracked app files from the pinned source commit into this shared repository. B owns the import PR; A reviews. Exclude `node_modules`, `.next`, `.vercel`, secrets, uncommitted edits, and old instructions that conflict with v2.

## Stack choices

| Choice | What/where | Why here and alternative considered | Account or setup |
|---|---|---|---|
| Next.js App Router + React | Page and same-origin server routes | Already in PRD's existing app; a second API server would add deployment and CORS work | Existing npm install; no new account |
| TypeScript | Shared records, functions, API envelopes | One checked contract across A/B; plain JavaScript would hide shape drift | Existing toolchain |
| Tailwind 4 + demo-only CSS | Responsive page and design tokens | Already installed; a second styling system would complicate ownership | Existing toolchain |
| In-memory seed and browser state | Illustrative suppliers, one demo session | PRD explicitly defers database; PostgreSQL/ORM would add unsupported persistence claims | No account or migration |
| Vitest | Pure rule and route tests | Fast focused checks for exact quantities; browser tests alone would be slower to diagnose | B installs dev dependency |
| OpenAI Responses API, optional | Two server-only language routes | Structured outputs fit draft extraction; any hosted provider adds cost/connectivity, so local fallback is mandatory | B alone holds optional API key |
| Vercel | Preview and production of the imported Next.js app | Existing prototype is hosted there; another host would add setup without benefit | B needs Vercel access |

No global state library is needed for one guided page; a local reducer is sufficient. shadcn/ui, Lucide, and Motion are optional targeted additions in [AI-TOOLING](AI-TOOLING.md), not baseline dependencies.

## Runtime flow

`Buyer text → optional POST /api/parse-order with local fallback → editable draft → buyer confirmation → deterministic eligibility and duplicate check → lot plan → coordinator approval and reservation → collection and inspection → simulated settlement.`

Supplier catalogue wording comes from optional `POST /api/catalogue-draft` with local template fallback. AI never controls stock, price, eligibility, approval, inspection, or money. The UI labels the actual model/fallback source.

## Boundaries

- **A, browser/UI:** `app/demo/**` and `components/demo/**` own session state, role-labelled stages, accessible controls, responsive design, and API adapter. Refresh resets the demo. A imports B's pure functions rather than reimplementing rules.
- **B, domain/data:** `data/demo-bangle-order.ts` and `lib/demo/**` own shared types, seeded records, parser fallback, glossary, eligibility, duplicate resolution, ranking, planner, inventory transitions, settlement, and explanations. Functions are side-effect-free.
- **B, server:** `app/api/parse-order/route.ts` and `app/api/catalogue-draft/route.ts` validate input/output, use a short timeout, and fall back locally. The key is server-only. Same-origin calls avoid CORS.
- **B, release:** One GitHub repository and one Vercel project. A signs off visual quality; B merges `develop` into `main` and deploys.

## Proposed source tree

```text
app/demo/page.tsx, app/demo/demo.css, components/demo/**  A
data/demo-bangle-order.ts, lib/demo/**                  B
app/api/parse-order/route.ts                           B
app/api/catalogue-draft/route.ts                       B
```

No SQL tables, migrations, login sessions, or real permissions exist in this prototype. Role names describe actions at one guided desk. A future pilot would require transactional reservations, persistent data, access control, and verified quality standards; those are [OUT OF SCOPE].

## Risks and resolution

- The live redesign's exact deployed source is unverified and `main@4fae0a6` has different homepage text. The user chose committed `main` as code and the deployed site as a visual reference. A must deliberately adapt its identity to `/demo`; B0 is unblocked.
- PRD `11.2 blocks both duplicate rows until a coordinator resolves identity, while `5.2 needs B-101 for the sample. The seeded demo starts with B-101 verified as canonical and B-105 excluded. Clearing that resolution blocks both.
- Imported legacy helpers may encode removed grade or QR behaviour. B adapts them under `lib/demo`; do not reintroduce grade or QR.
- In-memory reservation cannot guarantee safety across real concurrent users. State this limitation in the demo.

Sources: [Next.js App Router](https://nextjs.org/docs/app), [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [environment variables](https://nextjs.org/docs/app/guides/environment-variables).
