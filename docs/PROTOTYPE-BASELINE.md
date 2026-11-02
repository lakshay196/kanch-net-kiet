# Live prototype baseline and source decision

**Observed on 2 November 2026:** [redesign-kench-net.vercel.app](https://redesign-kench-net.vercel.app/) is the existing Kanch-Net prototype. The user chose the committed [`kanch-net/main`](https://github.com/lakshay196/kanch-net) app as the **code foundation** and the live site as the **visual reference**. Builder B owns the clean source import; Builder A owns visual continuity for the new `/demo`. The authoritative product scope remains [PRD v2](PRD.md).

## What the live site currently shows

| Route | Observed existing flow | Relationship to v2 |
|---|---|---|
| `/` | Maroon/cream/gold landing page with serif “Crafted by Hand, Worn with Pride” heading, portal login, and quick demo accounts | Preserve the recognisable Kanch-Net identity; the new `/demo` must be directly usable without logging into the old tour |
| `/artisan` | Supplier stock entry, buyer demand, and existing piles; includes a quality-grade field | Existing supplier context; v2's new listing flow removes grade and adds confirmation/local-language help |
| `/buyer` | Existing 10,000-piece size 2-6 grade-B demand, matching stock, and an escrow section | Historical tour only; v2's rehearsed order is 1,000 pieces, size 2.4, missing colour/finish until buyer confirms |
| `/matching` | Existing deterministic matched/non-matched pile list and reasons for the 10,000-piece order | Candidate pattern/helper for v2; do not reuse old grade rules, order, or stock values |
| `/pickup` | Collector screen listing existing batches and QC states | Candidate interaction reference; v2 uses its own seed and accepted/rework/rejected/damaged balance |
| `/money` | “Financial Escrow,” deposits, and “released” payout copy | Do **not** link or copy into v2 `/demo`; v2 settlement is simulated, with no transfer or escrow claim |
| `/demo` | 404, route absent | New v2 route to add |

These are observations of public demo screens, not proof of the deployment's underlying Git branch, code, data persistence, payment processing, or operational status. The old tour may remain available as a backup, but the v2 judge path must stay within `/demo` and label all data and money illustrative/simulated.

## Source mismatch found

The source repository's only remote branch was `main` at commit `4fae0a646f86deec20e42e235f8e81e33910704c` when checked. The matching local checkout at `/Users/lakshay/projects/kanch-net` contains an older Next.js app with routes such as `/artisan`, `/buyer`, `/matching`, `/pickup` and helper files `lib/match.ts`, `lib/settlement.ts`, `lib/score.ts`, `lib/places.ts`. Its committed homepage says “Stock. Need. Match.” and its Git history does not contain the live redesign's “Crafted by Hand, Worn with Pride” heading. The local checkout also has uncommitted UI changes. The deployed redesign's exact source revision remains unknown. This does **not** block B0 because the user explicitly selected committed `kanch-net/main` as the code foundation. The imported old shell will not automatically match the deployed redesign.

## Approved import and comparison procedure

1. Builder B checks the source remote and records the exact imported commit SHA in the B0 PR. Use the pinned `4fae0a6` snapshot unless the source `main` has advanced; if it has, inspect the newer commit and record why it is suitable before importing. Export **committed tracked files only** with `git archive` as shown in [Builder B's guide](GUIDE-B.md). Never copy the dirty local working tree.
2. Builder B imports the app into `kanch-net-kiet` on `feat/b-app-import` through a PR to `develop`. Preserve this playbook and agent rules. Exclude generated files, secrets, `.git` and conflicting old instructions. Run install, lint, build, and old route smoke checks.
3. Builder A reviews the imported route inventory and records the live site's maroon/cream/gold palette, craft-led serif typography, and portal styling as visual references. A's new `/demo` should feel part of Kanch-Net while following v2's no-login, four-stage flow. A does not reproduce the live site's old business rules.
4. If Vercel source access later becomes available, B may record the deployed commit for provenance. Any additional code or asset import needs its own reviewed PR and owner check; it is not a prerequisite for B0.

**Decision recorded 2 November 2026:** Use `lakshay196/kanch-net` `main@4fae0a6` as the initial code snapshot and the live redesign as a visual reference. B0 may begin. The exact deployed redesign source remains unverified; visual continuity requires deliberate A-owned work.

## Reuse policy for the new demo

- **Keep:** the imported app shell, brand mark and reusable components, bilingual affordance, and working legacy tour as a separate path.
- **Adapt:** matching explanations, locality display, existing deterministic helpers, and QC presentation only after comparing them with v2 tests and contract.
- **Do not carry into `/demo`:** old 10,000-piece grade-B order, grade controls, 20-batch starter list as the v2 seed, escrow/deposit/released-money language, old QR flows, or any claim of official government integration.
- **Add:** the four-stage, no-login, 1,000-piece v2 demo with confirmation, canonical duplicate handling, shortfall lock, inventory states, and simulated settlement.
