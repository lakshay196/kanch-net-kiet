# Builder A — Cursor frontend guide

## Mission and boundaries

Build the premium, bilingual, responsive `/demo` experience in the imported Next.js app. Own only `app/demo/**`, `components/demo/**`, `public/demo/**`, and UI tests; request edits to shared files from B. Read [PRD v2](PRD.md), [prototype baseline](PROTOTYPE-BASELINE.md), [contract](CONTRACT.md), [ownership](TASK-OWNERSHIP.md), [Git workflow](GIT-WORKFLOW.md), and [integration](INTEGRATION.md). A owns frontend deployment verification, not Vercel configuration or release merge.

Prerequisites: GitHub collaborator access; Cursor; Git; Node version required by the imported app; `npm ci` after B's import PR; local `npm run dev`. No model key needed. Open the shared repository, never the separate legacy checkout. B owns npm dependency additions. Do not change `package.json` yourself: request a package in an issue with purpose, exact usage, and test.

## Visual direction

Product personality: calm, trustworthy craft logistics. Inspect the [live redesign](https://redesign-kench-net.vercel.app/) first. Adapt its maroon/cream/gold palette, craft-led serif display typography, and portal cues so the new `/demo` visibly belongs to Kanch-Net. The imported committed homepage differs from that live design; do not assume its CSS already provides these cues. Use a warm off-white canvas, dark readable type, restrained status colour, generous spacing, crisp dividers, and no generic gradient hero. Put the four stages on one page with a persistent progress rail and clear role labels. The buyer request is the first visual focus; the plan's 1,000-piece coverage and shortfall are the second. Keep dense batch data scannable: visible labels, units, locality, eligibility reason, and a single clear next action. Hindi and English may appear together, with correct Devanagari glyphs and comfortable line height. `/demo` must open directly without old portal login.

Use a small token set in demo-only CSS: background/surface/text/muted/accent/success/warning/error, spacing scale 4/8/12/16/24/32, radii 8/12, and typography scale. Avoid changing global CSS merely for the demo. Use responsive cards or horizontally scrollable data only when labels remain available; do not clip important controls. Use CSS transitions for stage changes and explicit focus/hover/pressed states; respect `prefers-reduced-motion`. Do not animate money or eligibility in a way that hides a change.

The live redesign is the primary visual reference. Secondary research, adapted rather than copied: [Mobbin's dashboard study](https://mobbin.com/blog/what-good-dashboard-design-looks-like) for prioritizing the next decision over raw metrics; [Land-book's store gallery](https://land-book.com/design/website/store) for editorial product hierarchy and imagery restraint; [UP ODOP Firozabad](https://odopup.in/en/districts/firozabad) for product context, **not** government UI imitation. Before coding, A saves 2–3 screenshots or links in an A-owned design note with the exact element to adapt, then reviews the rendered page against them. Awwwards, Godly, Dribbble, and 21st.dev are optional discovery sources; do not add unverified components merely because they look polished.

Use existing Tailwind first. shadcn/ui may supply accessible primitives if a specific dialog/form needs it, but B must approve and install/configure it in shared files; see [AI tooling](AI-TOOLING.md). Lucide React is an optional icon package. Motion is optional for one purposeful transition. Aceternity UI, Magic UI, and 21st.dev are code/registry inspiration, not required dependencies. Do not mix competing component systems.

## State and API rules

A owns a small explicit reducer or state machine: `draft → confirmed → planned/shortfall → approved → inspected → settled`. “Edit requirement” clears downstream plan, approval, and quality. A calls B's pure functions for eligibility, plan, inventory, and money; A never duplicates formulas. API calls are behind one adapter using `CONTRACT.md` shapes. While B's routes are unfinished, return exact typed mock envelopes. Once B merges, switch adapter to same-origin `fetch` with local fallback for offline use. Display `AI assistant` only when `source: 'model'` and `Local fallback` when `source: 'local'`. Loading, empty, invalid, timeout, and retry states must be visible.

## Phase A1: visual system and static shell

**Goal:** Establish coherent page structure and visual tokens. **Responsible builder:** A. **Prerequisites:** B's app import merged; contract approved. **Depends on:** No B implementation. **Can proceed independently:** Static sample labels and layout. **Tools:** Cursor, browser, terminal, GitHub.

**Tasks:** 1. Inspect imported shell and live redesign side by side; record specific palette, typography and portal references and tokens in `docs/GUIDE-A.md` or an A-owned note. 2. Build `app/demo/page.tsx`, `app/demo/demo.css`, `components/demo/StageHeader.tsx` and simple layout components. 3. Show persistent independent-demo/illustrative-data disclaimer, four stages, role names, and stage gates. Keep `/demo` directly accessible. Commands: `npm ci`, `npm run dev`.

**Acceptance checks:** At 390px, 768px, and 1440px, no horizontal page overflow; all stages and disclaimers visible; keyboard focus visible; screenshot each width. Review screenshots against the live redesign's identity and record what was adapted; old grade/escrow UI is absent from `/demo`. `npm run lint` and `npm run build` pass. **Git:** `feat/a-demo-shell`; review only A-owned paths; commit `feat(demo): create visual shell`; push and PR to `develop`. **Integration:** B reviews import/use of contract; no domain logic yet. **STOP HERE:** Report files, commands/results, screenshots, commit, push, blockers, and next prerequisite.

## Phase A2: buyer confirmation and catalogue UI

**Goal:** Make the request and listing drafting usable. **Responsible builder:** A. **Prerequisites:** A1 merged; B's types/fixture available. **Depends on:** Contract types; B API may still be mocked. **Can proceed independently:** Typed local mock. **Tools:** Cursor, browser, terminal.

**Tasks:** 1. Build buyer text, sample button, editable parsed fields including delivery locality, null/missing indicators, visible 2026 date assumption, confirm gate, and “Edit requirement” reset in `components/demo/BuyerStage.tsx`. 2. Offer voice input only as progressive enhancement when supported; retain text input and explicit transcript confirmation. 3. Build supplier facts/catalogue draft box with Hindi/English titles, uncertain-term clarification, and confirmation before use in `CatalogueStage.tsx`. 4. Put route calls behind `components/demo/demo-api.ts` using contract envelopes; do not edit B's routes. Commands: `npm run dev`, `npm run lint`, `npm run build`.

**Acceptance checks:** T1–T3, T16–T18 in browser with API mocked/offline; missing colour and finish block confirmation; invalid draft never changes facts; source label accurate. Test keyboard-only and mobile. **Git:** `feat/a-buyer-catalogue`; commit `feat(demo): add buyer and catalogue steps`; push PR. **Integration:** B reviews adapter shapes. **STOP HERE:** Report evidence and next prerequisites.

## Phase A3: discovery, plan, and approval UI

**Goal:** Explain which physical stock can fill the order. **Responsible builder:** A. **Prerequisites:** A2; B domain types/fixtures. **Depends on:** B eligibility/plan functions for final binding. **Can proceed independently:** Contract-shaped fixture until B's PR merges. **Tools:** Cursor, browser, terminal.

**Tasks:** 1. Build batch rows with supplier/locality/qty/km/illustrative rate and plain-language eligible/excluded reason. 2. Show B-104 size exclusion, B-105 duplicate resolution, optional B-106 tie-break, 300+400+300 plan, filled/shortfall/surplus, and B-102 failure toggle. 3. Disable approval when short and show reason; after approval display reserved stock and cancellation. Files: `components/demo/DiscoveryStage.tsx`, `PlanStage.tsx`, A-owned reducer. Commands: `npm run dev`, `npm run lint`, `npm run build`.

**Acceptance checks:** Browser T4–T8 and T13; B-102 toggle yields 400 short and no approval; no duplicate quantity; no clipped mobile rows. **Git:** `feat/a-plan-ui`; commit `feat(demo): show eligibility and plan`; push PR. **Integration:** B verifies the UI uses domain output without reimplementing rules. **STOP HERE:** Report evidence and next prerequisites.

## Phase A4: quality, inventory, settlement, and final polish

**Goal:** Complete the guided story and rendered quality. **Responsible builder:** A. **Prerequisites:** A3; B inventory/settlement functions. **Depends on:** B domain PR for final binding. **Can proceed independently:** Build UI with typed fixture, then bind. **Tools:** Cursor, browser, terminal.

**Tasks:** 1. Add collected/accepted/rework/rejected/damaged inputs, balancing error, return/re-check and damaged states. 2. Show each supplier's simulated line, ₹7,448 total net, buyer ₹9,800, and clear difference between them. 3. Explain that unselected or returned usable stock can be offered to another compatible buyer only after supplier consent; show no automatic resale action. 4. Add meaningful empty/loading/error states, Hindi/English labels, touch targets, reduced motion, projector layout, and browser screenshot review. Files: `components/demo/QualityStage.tsx`, `SettlementStage.tsx`, A-owned tests/styles. Commands: `npm run dev`, `npm run lint`, `npm run build`.

**Acceptance checks:** Browser T9–T15, T19–T20; settlement blocked when unbalanced; no payment action; refresh reliably resets. Inspect 390/768/1440px and projector width, keyboard and screen-reader labels. **Git:** `feat/a-quality-polish`; commit `feat(demo): complete quality and settlement UI`; push PR. **Integration:** B runs the integrated full suite; A fixes only A-owned defects and signs off actual deployed page. **STOP HERE:** Report files, checks, screenshots, commit, push, blockers, next prerequisite.
