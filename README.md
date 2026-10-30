# 기행 아틀라스 — 공개 웹판

Static, source-linked place and experience atlas of public [Brunch](https://brunch.co.kr/@gosisain) travel writing. This is a **derived public discovery site**, never the personal Google Sheet's complete raw data or a live booking/venue directory.

## Current public release and provenance

**Published on 2026-10-31 (KST).** GitHub owner approved and merged the two stacked release PRs in sequence.

| Target | Source observations | Distinct original essay URLs | Status |
| --- | ---: | ---: | --- |
| GitHub Pages / \`main\` | **324** | **180** | Deployed; live HTTP 200 and public HTML source counts verified |
| [Merged PR #1](https://github.com/indisohari/kihang-atlas/pull/1) | 322 | 178 | Centered accessible modal, cautious Maps text search, status metadata, five reviewed place-type corrections |
| [Merged PR #2](https://github.com/indisohari/kihang-atlas/pull/2) | **324** | **180** | Adds the approved #29 and #67 public source records |

Release commit on \`main\`: \`264e1bab4c507862d75f5a3fbc22678632724fcc\`. Korea 141 / outside Korea 183, with 51 country-or-combined labels. New source observations are **#29 The Empire Brunei** (historical 2007 resort stay) and **#67 LEGOLAND Malaysia** (author-and-son visit). The legacy 322 source identities and essay URLs were preserved; PR #1 also made five targeted place-type corrections and added public operational-status qualification fields.

The source field \`author_relation\` describes **the essay author's** reported visit, not the atlas owner's experience. Map shading is **country coverage only**, not a visited GPS point. Brunei has a selectable country outline; no exact venue coordinates were added. Historical venue opening, prices, transport, accommodation hygiene, pest risk, and other current operational details are not verified.

## Where to browse

- Published site: https://indisohari.github.io/kihang-atlas/
- Merged release: [PR #1](https://github.com/indisohari/kihang-atlas/pull/1) → [PR #2](https://github.com/indisohari/kihang-atlas/pull/2).
- [Place entity model and geographic review](docs/PLACE_MODEL.md); [type/season classification](docs/CONTENT_CLASSIFICATION.md).
- [324-source release gates and provenance](docs/ATLAS_324_STAGED_RELEASE.md); [original audit/resumption ledger](docs/ATLAS_WORK_RESUME.md).

The public website consists of `index.html` and a static map. No API key, application server or npm install is required to **browse** it. Public original article links point to the copyright holder's work; essays are not republished in full.

## Search and interaction

Country → region → locality → named place/route exploration; original thematic categories, conservative place types, activities, seasonal evidence, keyword search, sorting and reset. Individual sources remain accessible even when they refer to a duplicated geographic place (for example, two `연홍도` essays).

The centered source detail dialog supports keyboard focus and Escape, with original Brunch and official administrative references when present. Google Maps **text search links** are offered only for sufficiently specific, publicly usable locations. They are **not verified pins, operating status or current public access**. The protected anonymous Mongolian ranch and ambiguous venue names do not receive a Maps search action.

## QA and publishing

- Public live HTML was fetched with no cache on **2026-10-31** (HTTP 200): **324 source observations / 180 original article links / 51 country labels**. Interactive production checks were targeted; do not conflate this with an exhaustive multi-filter or accessibility audit.
- At the 2026-10-30 staged checkpoint, 19/19 deterministic offline tests and 76/76 full-source browser facet checks passed, with additional responsive, modal keyboard and privacy checks. Those were **pre-deployment** checks, not new CI runs on \`main\`.
- The source-level no-dependency regression remains \`node tests/atlas_release.test.cjs\`. **The proposed CI follow-up PR** adds \`.github/workflows/atlas-verify.yml\` and \`tests/atlas_browser_smoke.cjs\` for repeatable read-only Chromium checks. Treat GitHub Actions as active/passing **only after** this PR is reviewed, merged and actual checks are observed.
- No code path in the tests writes to a private Sheet, triggers synchronization, changes GitHub permissions, or publishes new source rows. Source updates require editorial evidence and a separate review; production changes must use a reviewed PR.
- GitHub PR review submissions and CI status were absent at the initial release checkpoint. An independent final reviewer verdict is not implied by author-run tests or by owner approval.

## Optional source-summary proposals — deliberately inactive

[`automation/Code.gs`](automation/Code.gs) is a **draft-PR-only** optional workflow, **not** direct GitHub Pages publication. It validates all **324** reviewed public rows, proposes changes to source columns **D–F, L of the first 322 only**, and preserves the two newly added records for manual editorial review. New source rows, categories, identities and locations cannot be self-approved.

The script now stages only on a separate review branch and a **public Draft PR** after explicit manual authorization; it cannot merge or write to `main`. Its mocks passed, but Google Apps Script OAuth, personal source binding, fine-grained PAT, a live test and a daily trigger have **not** been configured or verified. Activation needs a **separate, deliberate approval and permissions decision**. See the [safe optional setup](automation/SETUP.md). The static public website operates without it.
