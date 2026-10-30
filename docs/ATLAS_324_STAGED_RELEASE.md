# Atlas 324 / 180: full-source staged release review

**Date:** 2026-10-30 KST  
**Status:** **Published** to GitHub Pages on 2026-10-31 KST, after owner-approved sequential merges. The stages below remain historical test evidence.  
**Stack base:** `work/atlas-coverage-popup-20261030` at `c87e32342b4f8531765e4ab5a3e3178c181aeda5`.

## Approved additions

The owner approved adding two original first-person essay records to the source-linked parent experience catalog. They were entered in the private canonical Sheet before public-code staging. No private Sheet URL, row-internal evidence path, login or personal travel record is committed.

| Public article | New record | Editorial scope |
| --- | --- | --- |
| [#29](https://brunch.co.kr/@gosisain/29) | The Empire Brunei, Jerudong | Author's historical 2007 resort stay (~one week); old publicity's “7-star” phrase is **not** an official rating. The current hotel's administrative location is supported by its [official contact page](https://theempirebrunei.com/contact-us/). |
| [#67](https://brunch.co.kr/@gosisain/67) | LEGOLAND Malaysia Theme Park, Johor | Author and son visited; Singapore–Johor bus transfers and missed-last-bus risk describe a **past** trip, not today's timetable. The official venue [confirms Iskandar Puteri, Johor](https://www.legoland.com.my/plan-your-day/before-you-visit/directions/). |

Both records are *author* observations, not the atlas owner's personal visit. All operational access, admission, dates, room hygiene, pest risks, fees and transit are intentionally marked unverified.

## Implementation and verified source-level invariants

- **Relative to the stacked PR #1 baseline**, its existing 322 JSON source objects were unchanged by PR #2 (including source links, administrative evidence and protected redaction). PR #1 itself had previously corrected five place-type labels and added public operational-status qualification fields; thus the final 322 objects are not byte-identical to the older pre-PR #1 site. The only new observations are #29 and #67, yielding **324 records / 180 distinct original article URLs**.
- The new records use the complete existing production record schema and official administrative evidence records. **No exact attraction/room coordinates** were added.
- The existing Natural Earth Brunei SVG path was made selectable for its **country-level** index, added to the Asia filter and given a **polygon-derived viewport center**. This is not a venue pin.
- Header descriptions, count labels and world map header reflect **324 / 180 / 51 country or combined-country labels**. Domestic count stays 141; international increases to 183.
- GitHub contents API post-write re-read verified the new payload cardinality and complete preservation of the prior 322 JSON source objects. Protected #396 remains `몽골 초원의 사적 목장 방문`. Restricted/ambiguous unpublished child places were **not promoted**.

## Release checklist (staged checkpoints and 2026-10-31 completion)

- [x] **Real full-file browser regression (targeted)** using this branch's exact `index.html` downloaded directly by a browser at 324 records / 180 source links: 320/390/768/1365 px no horizontal overflow or JS page errors; Brunei SVG click updates breadcrumb and yields 1 record; searches find #29 and #67 and open official evidence + original essays; Escape closes modal and restores card focus; protected Mongolian ranch and ambiguous `호남식당` show no map-search action; two `연홍도` observations show related essay linkage; `stay`=21 and source lodging kind=25. Country/region/facet **exhaustive combinations** and full external URL availability were not tested.
- [x] **Documentation alignment (draft scope):** README, place model and classification audit now distinguish published 322/178 baseline from staged 324/180. Pre-release editorial copy can be reviewed before publication.
- [x] **Automation source review and offline mocks:** `automation/Code.gs` validates 324 reviewed public records and an explicit #29 name alias, while restricting proposed text refresh to the original 322 rows. It now creates **only a Draft PR on a separate review branch** (never commits directly to `main`). All 19 offline regression/mock tests passed with synthetic public-only fixtures. `automation/SETUP.md` explicitly separates owner-only PAT/OAuth/trigger authorization. **Real bound Apps Script + token staging integration remains unverified and inactive.**
- [x] **Stack integration and owner-approved release:** PR #1 merged to `main` as `3c81db10ab79ba0d37cadfa8a2bf97c35ea6ac5c`; PR #2 retargeted to that `main` and merged as `264e1bab4c507862d75f5a3fbc22678632724fcc`. Fresh public Pages HTML HTTP 200 independently parsed to 324 observations / 180 original essay URLs. This confirms publication, not exhaustive production UI accessibility.

Not included in this change: 38 unapproved child-place suggestions, precise map pins, current venue opening claims, and unresolved historic venue identities.

## 2026-10-30 real full-file remote browser QA — PASS (targeted)

- Browser downloaded **the exact GitHub Draft PR #2 `index.html`** from raw.githubusercontent.com: HTTP 200; 442,386 characters; parsed 324 complete source observations and 180 distinct public Brunch URLs. This is **not** the earlier seven-field local preview.
- Playwright-driven check: viewport widths **320, 390, 768 and 1365**, no JavaScript page errors and no horizontal document overflow.
- Search `The Empire Brunei` → 1 result; original Brunch #29; hotel official contact; cautious Google Maps **text search**, not a verified pin.
- Search `LEGOLAND` → 1 result; original Brunch #67; official operator directions; cautious Maps text search.
- Brunei SVG country click → 1 result, breadcrumb and country heading updated. `stay` place-type filter → 21 records; original `숙박·온천` kind → 25 records.
- Search `몽골 초원의 사적 목장 방문` → 1 anonymized record and **no Maps search**; ambiguous `호남식당` → **no Maps search**.
- Search `연홍도` → 2 distinct source records; detail #283 links to #109, not merged or discarded.
- Escape closes the detail dialog and returns focus to its trigger card. No new external services or browser write actions activated.

**Still open:** broad exhaustive cross-filter combinations, offline pristine reproducibility (no local complete HTML bytes were exported in this pass), prior launch documentation/Apps Script activation gate, final PR stacking/merge and GitHub Pages runtime verification. **Do not confuse test pass with deployment.**

## 2026-10-30 optional review-only synchronization compatibility

- The current canonical Google Sheet contains exactly 324 published source rows and 180 distinct public Brunch source IDs; a row-by-row comparison of all 324 public records found only the expected reviewed #29 old-name display alias difference in identity fields.
- `previewAtlasSync()` now fails closed against the older live 322 website, which is intended until the owner-approved 324 release is deployed.
- Proposed changes from original 322 public summaries are **never written directly to `main`**; optional explicitly enabled action creates a **public Draft PR** on `work/atlas-summary-review`, or stops when the branch/PR is already pending. Two new source records remain manually reviewed for future changes.
- The test file `tests/atlas_release.test.cjs` passed **19 of 19** tests in a clean temporary Node runtime using complete raw GitHub `index.html` and `automation/Code.gs`. No real GitHub writes, Google authorization, or scheduled jobs were performed.
- The optional integration is **not a blocker for publishing the static website**. Recurring data transfer, new PR permissions and installation remain separate owner-only decisions.

## 2026-10-30 extended browser matrix — 76 / 76 PASS

Using the exact full public HTML fetched from the Draft PR #2 branch, Playwright activated every distinct selectable mapped country (**50**), all place-type options (**12**), all source editorial kinds (**5**) and all season evidence filters (**8**), then confirmed clean reset to 324 (**1**). Each live DOM count was compared to an independent count derived from the 324 JSON records; **zero mismatches**. The map tests include country-level Brunei selection. This adds 76 explicit browser consistency checks to the earlier focused keyboard/privacy/mobile tests, but is not an exhaustive Cartesian product of every combined filter or a claim that external venues are operating.

## 2026-10-31 completed release / remaining verification

- Owner approved a one-release exception to merge the two stacked draft PRs. PR #1 and PR #2 are both closed/merged, and `main` is `264e1bab4c507862d75f5a3fbc22678632724fcc`.
- The actual public website at https://indisohari.github.io/kihang-atlas/ returned HTTP 200 on an uncached fetch, with 324 embedded source observations, 180 distinct original Brunch essay URLs, and 51 country labels; The Empire Brunei #29 and LEGOLAND Malaysia #67 are served.
- Targeted live browser controls (new search, country choice and lodging selection) were exercised. This does **not** make the earlier 76/76 staged matrix into a production matrix. Full production browser/regression completion remains pending a reproducible run and its recorded verdict.
- The follow-up review branch `work/atlas-ci-final-qa-20261031` adds read-only GitHub Actions regression tests. A proposed CI workflow is not proven active until its PR has an actual successful workflow run; merge should follow a separate final review.
- GitHub release PRs #1/#2 had no recorded check statuses or independent submitted review verdict at the initial release verification. Do not mislabel self-checks as independent provider review.
- Optional Google Apps Script integration, OAuth, PAT grant, daily trigger and live Sheet synchronization remain **inactive and unverified**; none is needed to operate the static public site.
