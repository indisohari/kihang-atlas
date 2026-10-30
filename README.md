# 기행 아틀라스 — 공개 웹판

Static, source-linked place and experience atlas of public [Brunch](https://brunch.co.kr/@gosisain) travel writing. This is a **derived public discovery site**, never the personal Google Sheet's complete raw data or a live booking/venue directory.

## Release and provenance

**2026-10-30 verified staging checkpoint:**

| Target | Source observations | Distinct original essay URLs | Status |
| --- | ---: | ---: | --- |
| GitHub Pages / `main` at checkpoint | 322 | 178 | Previously published |
| [Draft PR #1](https://github.com/indisohari/kihang-atlas/pull/1) | 322 | 178 | Accessible centered modal and cautious Google Maps text search |
| [Draft PR #2](https://github.com/indisohari/kihang-atlas/pull/2), stacked on #1 | **324** | **180** | Adds two owner-approved original visit records and release checks; not merged at this checkpoint |

The intended next public version is **324 records**: Korea 141 / other countries 183, covering 51 country-or-combined-region labels. It adds **#29 The Empire Brunei** (historical 2007 resort stay) and **#67 LEGOLAND Malaysia** (author and son actually visited). The prior 322 source observations and their links remain unchanged. The two additions are **not** current accommodation/transport/attraction availability certifications.

The source field `author_relation` describes **the essay author's** reported visit, not the atlas owner's experience. Map shading is **country coverage only**, not an actual visited GPS point. Brunei's country outline is now selectable on the staged 324 site; no individual venue coordinates were added.

## Where to browse

- Published site: https://indisohari.github.io/kihang-atlas/
- Working review: [PR #1](https://github.com/indisohari/kihang-atlas/pull/1) → [PR #2](https://github.com/indisohari/kihang-atlas/pull/2).
- [Place entity model and geographic review](docs/PLACE_MODEL.md); [type/season classification](docs/CONTENT_CLASSIFICATION.md).
- [324-source release gates and provenance](docs/ATLAS_324_STAGED_RELEASE.md); [original audit/resumption ledger](docs/ATLAS_WORK_RESUME.md).

The public website consists of `index.html` and a static map. No API key, application server or npm install is required to **browse** it. Public original article links point to the copyright holder's work; essays are not republished in full.

## Search and interaction

Country → region → locality → named place/route exploration; original thematic categories, conservative place types, activities, seasonal evidence, keyword search, sorting and reset. Individual sources remain accessible even when they refer to a duplicated geographic place (for example, two `연홍도` essays).

The centered source detail dialog supports keyboard focus and Escape, with original Brunch and official administrative references when present. Google Maps **text search links** are offered only for sufficiently specific, publicly usable locations. They are **not verified pins, operating status or current public access**. The protected anonymous Mongolian ranch and ambiguous venue names do not receive a Maps search action.

## QA and publishing

- Deterministic offline source and Apps Script mock checks: `node tests/atlas_release.test.cjs` (Node built-ins only). **19 / 19 passed at the staging checkpoint.** These use synthetic fixtures derived from the **public 324 JSON**; the private Sheet's I/J/K data never enters the repo.
- The exact full GitHub 324 HTML underwent real browser tests at **320/390/768/1365 px**: no page JavaScript errors or horizontal overflow. Search, combined filtering, Brunei country click and keyboard Enter, empty/reset states, two additions' official and source links, duplicate source linkage, modal keyboard focus/Escape and sensitive Maps restrictions passed. This is **staged-source QA**, not a claim of Pages deployment.
- **Publication remains a separate owner-only action.** Preserve the branch/PR writer ownership. Review and merge **PR #1 to main first**, then reconcile PR #2's base to the updated `main` and merge only after final-revision review. Verify the real Pages deployment and the delivered 324/180 page in a separate browser check. Do not commit directly to main.
- Never publish private personal Google Sheet links or raw exported columns, Notion trip data, sensitive identities/places, unknown exact map coordinates, original essays, booking status or credentials. Any new places or source-category changes need separate editorial evidence.

## Optional source-summary proposals — deliberately inactive

[`automation/Code.gs`](automation/Code.gs) is a **draft-PR-only** optional workflow, **not** direct GitHub Pages publication. It validates all **324** reviewed public rows, proposes changes to source columns **D–F, L of the first 322 only**, and preserves the two newly added records for manual editorial review. New source rows, categories, identities and locations cannot be self-approved.

The script now stages only on a separate review branch and a **public Draft PR** after explicit manual authorization; it cannot merge or write to `main`. Its mocks passed, but Google Apps Script OAuth, personal source binding, fine-grained PAT, a live test and a daily trigger have **not** been configured or verified. Activation needs a **separate, deliberate approval and permissions decision**. See the [safe optional setup](automation/SETUP.md). The static public website operates without it.
