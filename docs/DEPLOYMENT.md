# Deploying the independent demo

Builder B owns Vercel setup, environment variables, release merge, deployment, monitoring, and rollback. Builder A signs off rendered UI and checks the live page. Use the shared GitHub repository's imported Next.js app. The PRD's `kanch-net.vercel.app` and the current [live redesign](https://redesign-kench-net.vercel.app/) are background/reference deployments; neither is proven to point at the new repository. Use a clearly named Vercel project for `kanch-net-kiet` unless the team explicitly selects a project it owns for this release. Preserve the existing live redesign URL while the new `/demo` is built and reviewed.

## Environments

- **Local:** Both builders run `npm ci` and `npm run dev`. No key is required. B may keep an optional `OPENAI_API_KEY` in untracked `.env.local`.
- **Preview/staging:** Vercel creates a preview for a PR when linked to GitHub. B checks it against the contract; A inspects the visual page. The optional key may be omitted so fallback remains exercised.
- **Production:** Vercel builds `main` only after B merges the release PR. If model calls are enabled, B stores `OPENAI_API_KEY` and `OPENAI_MODEL` in Vercel Settings → Environment Variables, never in GitHub. If no key, the full demo still works locally.

There is no database deployment, migration, domain requirement, login setup, or storage bucket. A custom domain is optional and not needed for the hackathon. Use Vercel's generated URL unless the team already controls a domain. One GitHub repo should connect to one chosen Vercel project.

## Release procedure

1. B checks clean `develop` and runs `npm ci`, `npm run test:demo`, `npm run lint`, `npm run build`. A completes browser and screenshot QA, including offline/no-key T1 and mobile/projector T20.
2. B opens `develop → main` PR with all T1–T20 evidence, contract version, A approval, and explicit independent-demo/illustrative-data disclosure. A reviews; B merges.
3. In Vercel Dashboard, B imports/connects `lakshay196/kanch-net-kiet` to the selected project, sets framework preset Next.js and root directory `./`, selects `main` as production branch, reviews build settings, then deploys. Check the repository and project names before deployment so the visual-reference site is not overwritten. [Vercel Git deployment guide](https://vercel.com/docs/git).
4. B checks Vercel build logs for success and opens the live `/demo`. A checks actual 390px and desktop rendering. Both run sample order through settlement. B checks `/api/parse-order` fallback with no key and optional model route with key if enabled.
5. B records production commit SHA, Vercel URL, date, test results, and known limitations in `docs/PROGRESS.md`. Do not claim official government integration or real payment.

Vercel's Git integration creates preview deployments for supported PRs and a production deployment from the configured branch; see [deployment docs](https://vercel.com/docs/deployments). B uses Vercel project logs for server errors and browser console for client errors. Avoid logging raw buyer text or personal data. If a model outage occurs, route response should say local fallback and the core demo continues.

## Rollback

If live T1–T20 fails, B stops further merges, captures the failing URL/commit and Vercel logs, and restores the last verified Vercel deployment in the dashboard or opens a reviewed revert PR. A owns any UI fix on A files; B owns API/domain/config fixes. Run the failed test and full release gate again before redeploying. Never force-push `main` or erase Git history.
