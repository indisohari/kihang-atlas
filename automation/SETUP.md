# Kihang Atlas — private Sheet → human-reviewed public summary proposals

**Revision:** 2026-10-31 public release checkpoint (after merged PRs #1–#3). **Automation status:** source code and offline mocks only; no bound Apps Script, PAT, trigger or actual Sheet→GitHub Draft PR run verified. The published Pages deployment is separate and already completed.

This optional Apps Script reads the personal canonical Google Sheet and **proposes** selected public-summary edits in a **GitHub Draft PR**. A draft PR in a public repository is **public**, not private storage. The script never writes to `main` and never merges.

## Publication versus optional automation

- **Website:** PRs #1 and #2 were merged and published on 2026-10-31 (**324 observations / 180 original Brunch essay URLs**); merged PR #3 added read-only CI. Neither publication nor browsing depends on automation.
- **Automation:** A separate owner-controlled setup for optional recurring public proposals, **not activated by this release**. The code intentionally rejects any site/source count other than 324, including the historical 322-record version; a passing offline mock does not verify a real Sheet binding.

## Exact scope and privacy contract

- Input: bound personal Sheet, exact tab `13_개인여행_참고`, fixed 13-column headers. **Never store the Sheet ID, URL or credentials in this public repo.**
- Current reviewed public source: **324 records**. Records #29 and #67 must remain in the last two positions and retain their original Brunch URLs, administrative hierarchy and source categories.
- Automatically **proposable** edits are limited to the *original 322 records*, source columns **D, E, F, L** (assessment, editorial rationale, verification text, author relation). New records #29 and #67 require separate editorial review for future content changes.
- Source columns **I/J/K are never published**; place/country/region/type/original number/URL, access status, official geographic evidence and place links are immutable in this script.
- Source #29 is explicitly allowed one reviewed display alias: Sheet `The Empire Brunei(구 The Empire Hotel & Country Club)`, public `The Empire Brunei`. Other unexpected names, categories, IDs, URLs, regions or row reordering fail closed.
- Private #396 Mongolian ranch remains public-anonymous `몽골 초원의 사적 목장 방문`; the private original name, relationship, notes and location are never copied. URLs, contacts, personal markers or similar sensitive-looking summary text are rejected.
- Any Sheet row beyond 324 is reported as `pendingNewRows`, never automatically added. A changed public record count, identity or private-data signal aborts the run.

## Optional activation reference — requires a separate owner decision

1. Open the **verified personal original Sheet** → Extensions → Apps Script. Check the intended account and bound file. Copy reviewed [Code.gs](Code.gs), optionally [appsscript.json](appsscript.json) for exact scopes. V8 runtime, time zone Asia/Seoul.
2. Run `previewAtlasSync()` first, without a PAT. Expected on an unchanged 324-source site: `approvedRecords:324`, `autoRefreshRecords:322`, `manualReviewRecords:2`, `changedFields:0`, `pendingNewRows:0`. These results are conditional on the then-current public site and Sheet.
3. **Only with separate authorization for external transfer/public draft PRs**, create an expiring [fine-grained GitHub PAT](https://github.com/settings/personal-access-tokens) restricted to `indisohari/kihang-atlas`, with **Contents: read/write** and **Pull requests: read/write**. GitHub requires PR-write permission to create draft PRs. No other repository permissions are proposed.
4. Set bound Apps Script Project Settings → Script properties: `GITHUB_FINE_GRAINED_TOKEN` (private value) and `ATLAS_REVIEW_PR_SYNC_ENABLED=true`. **Never paste tokens into chat, public files, Sheets, screenshots or logs.** Other script editors may read script properties; do not install on an untrusted shared Sheet.
5. Test `syncAtlasNow()` manually: no changes → `no_changes`, no writes; valid changed summaries → create `work/atlas-summary-review` branch and a **Draft PR against main**. Inspect the resulting publicly visible diff before any approval. If a draft PR is already open, the job returns `pending_review` without overwriting it.
6. To opt into periodic proposals, run `installDailyTrigger()` and verify Google Apps Script Trigger/Executions. The schedule is around **09:00 Asia/Seoul**, not necessarily an exact minute. No real trigger has been installed here.

The script requires **both** an explicit boolean opt-in and the PAT for any new proposal. It will neither commit to `main` nor merge a PR. If a prior branch exists without an open PR, it halts rather than overwriting that branch. If GitHub PR creation fails after a branch write, inspect that partial branch; do **not** blindly retry or delete it. A human must approve cleanup and any final publication.

## Verification and limitations

- Run `node tests/atlas_release.test.cjs`. No npm dependencies. The initial merged-main suite had **19/19 tests**; follow-up Draft PR #4 extended it to **22/22**, [logged at head `d939747`](https://github.com/indisohari/kihang-atlas/actions/runs/41200115953). These tests use only public Atlas JSON-derived synthetic Sheet rows, with placeholder private columns, and mock all GitHub and Apps Script writes. Coverage includes 324 identity/no-op, pending source rows, anonymous #396 protection and a synthetic geographic-status mutation, reviewed alias, category changes, stale site, missing credentials, opt-in, existing PR/branch, and branch-plus-Draft-PR-only staging.
- The authentic 324 HTML underwent prior Playwright-browser QA at 320, 390, 768 and 1365 px; merged [main CI run 41133907939](https://github.com/indisohari/kihang-atlas/actions/runs/41133907939) separately passed 19/19 Node and 112/112 Chromium checks, and Pages deployment workflow succeeded. **Not verified:** real bound Google authentication, PAT permission grants, actual branch/PR creation from Apps Script, scheduled triggers, ongoing source changes, or an independent new full production-browser audit.
- No current venue opening, booking, coordinates, private source documents, full source essays, new children, or access/permissions changes are authorized by this script.

References: [GitHub API versions](https://docs.github.com/en/rest/about-the-rest-api/api-versions) · [Git refs](https://docs.github.com/en/rest/git/refs) · [GitHub draft PR API](https://docs.github.com/en/rest/pulls/pulls) · [Apps Script triggers](https://developers.google.com/apps-script/guides/triggers/installable) · [Apps Script properties](https://developers.google.com/apps-script/guides/properties).
