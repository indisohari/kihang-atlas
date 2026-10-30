# Atlas 324 / 180: full-source staged release review

**Date:** 2026-10-30 KST  
**Status:** Staged on isolated work branch; **not merged and not deployed**.  
**Stack base:** `work/atlas-coverage-popup-20261030` at `c87e32342b4f8531765e4ab5a3e3178c181aeda5`.

## Approved additions

The owner approved adding two original first-person essay records to the source-linked parent experience catalog. They were entered in the private canonical Sheet before public-code staging. No private Sheet URL, row-internal evidence path, login or personal travel record is committed.

| Public article | New record | Editorial scope |
| --- | --- | --- |
| [#29](https://brunch.co.kr/@gosisain/29) | The Empire Brunei, Jerudong | Author's historical 2007 resort stay (~one week); old publicity's “7-star” phrase is **not** an official rating. The current hotel's administrative location is supported by its [official contact page](https://theempirebrunei.com/contact-us/). |
| [#67](https://brunch.co.kr/@gosisain/67) | LEGOLAND Malaysia Theme Park, Johor | Author and son visited; Singapore–Johor bus transfers and missed-last-bus risk describe a **past** trip, not today's timetable. The official venue [confirms Iskandar Puteri, Johor](https://www.legoland.com.my/plan-your-day/before-you-visit/directions/). |

Both records are *author* observations, not the atlas owner's personal visit. All operational access, admission, dates, room hygiene, pest risks, fees and transit are intentionally marked unverified.

## Implementation and verified source-level invariants

- The **original 322 JSON source objects are unchanged**, including every original link, taxonomy, administrative evidence and protected redaction. The only new observations are #29 and #67, yielding **324 records / 180 distinct original article URLs**.
- The new records use the complete existing production record schema and official administrative evidence records. **No exact attraction/room coordinates** were added.
- The existing Natural Earth Brunei SVG path was made selectable for its **country-level** index, added to the Asia filter and given a **polygon-derived viewport center**. This is not a venue pin.
- Header descriptions, count labels and world map header reflect **324 / 180 / 51 country or combined-country labels**. Domestic count stays 141; international increases to 183.
- GitHub contents API post-write re-read verified the new payload cardinality and complete preservation of the prior 322 JSON source objects. Protected #396 remains `몽골 초원의 사적 목장 방문`. Restricted/ambiguous unpublished child places were **not promoted**.

## Must pass before public release

- [ ] **Real full-file browser regression** using this branch's exact `index.html`: 320/390/768/1365 px, keyboard modal Escape/focus, all country/region/facet filters, Brunei SVG selection, maps-search restrictions, original essay links, and duplicate `연홍도` evidence links. Source-level checks are **not** a substitute for this.
- [ ] **Documentation alignment:** public README, place model and classification audit still document the original 322/178 publication baseline. Update as part of final release, retaining the historical baseline.
- [ ] **Automation review:** `automation/Code.gs` and `automation/SETUP.md` were originally designed to sync only the first 322 approved rows. Their safety assumptions must be reviewed against 324 parent records **before owner-side activation**. No trigger, token or credential has been activated.
- [ ] **Stack integration and owner-approved release:** PR #1 contains the accessible modal/Maps search baseline. Review and integrate this staged addition without overwriting another writer, then obtain separate authorization for merge to `main`/GitHub Pages deployment. Confirm the actual deployed page and runtime after publishing.

Not included in this change: 38 unapproved child-place suggestions, precise map pins, current venue opening claims, and unresolved historic venue identities.
