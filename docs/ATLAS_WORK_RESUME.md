# Kihang Atlas — Resume ledger

**Updated:** 2026-10-30 KST  
**Work branch:** `work/atlas-coverage-popup-20261030`  
**Main baseline:** `0f165d42fe36c38532ca9e3847c3b13f2349878b`  
**Public service:** https://indisohari.github.io/kihang-atlas/ (tracks `main` only)  
**Status:** IN PROGRESS. Working-branch evidence, tests and proposed UI changes are not a live deployment.

## Resume contract for any next session

1. Check latest `main` SHA, open GitHub PRs and this work branch. Prefer the open PR that includes this file; do not repeat already committed work.
2. Read `README.md`, `docs/PLACE_MODEL.md`, `docs/CONTENT_CLASSIFICATION.md`, `automation/SETUP.md`, this ledger, and the current PR diff. Re-read the private canonical Google Sheet and original articles only when needed for a specific evidence claim; do not copy private source URLs/IDs into this public repo.
3. Keep the approved published baseline `322` observations / `178` essay URLs and the protected anonymous Mongolian ranch record unchanged until an explicitly reviewed publication expansion. The website is a derived public projection, not the private source of truth.
4. Work only on the branch/PR with current file SHAs. Do not merge to `main`, publish private trip records, change permissions or activate Google Apps Script without separate confirmation.
5. Distinguish **code staged**, **tests run**, **merged**, **Pages deployed**, **browser verified**, **source checked**, and **operator currently open**. Never infer one from another.

## Verified baseline and audit findings

- 415 source essays were deep-analyzed in the private source; 322 published experience records derive from 178 of them. The other 237 articles are **not automatically omissions**.
- An earlier named-place review ledger has 249 entries: 166 marked included and 83 excluded (68 reasoned exclusions, 15 functional duplicates). This is a different unit from the 322 published observations.
- Essay [#114](https://brunch.co.kr/@gosisain/114) mentions first-hand **백촌막국수** (Goseong) and **실로암메밀국수** (Yangyang). Neither appears among current public records or the earlier 249-place review list; **평창 이조막국수** is already present. New records require article-level evidence and operator/location checks.
- Essay [#421](https://brunch.co.kr/@gosisain/421) describes a Mediterranean cruise with 10 named itinerary places; 3 appear as separate site records. Model remaining ports as linked journey stops rather than duplicating one source essay seven times; do not infer Naples as a visited stop.
- Essay [#256](https://brunch.co.kr/@gosisain/256) has four Kiso walking entries already represented: **no re-extraction needed**.
- Essay [#584](https://brunch.co.kr/@gosisain/584) has four distinct Fuji lakes inside one area record; distinguish child entities from source observations.
- Inspect suspicious existing category tags before editing: `토카이 닭 파프리카시·지역 와인` (transport), `아바나 음악인 묘역` (transport), `김이수 묘역` (transport), `리스본 생선구이` (nature), `해밀턴호텔 뒤 골목` (stay), `남도 항구·무진기행 문학루트` (spot/transport).
- Two similarly named restaurants `이화식당` / `호남식당` remain ambiguous; no automatic venue pin or exact-place Maps action.

## Work queue

1. **P0 UI:** Replace the right-side full-height detail drawer with an accessible centered responsive modal, preserve existing article detail and focus handling; add a Google Maps **search** action only when editorial geography is sufficiently distinct. Map search is not verified coordinates or proof of an operating business.
2. **P0 code QA:** Compare Git blob SHAs, preserve the exact 322 embedded observations and all 178 essay URLs, search public HTML for private URLs/credentials; run syntax and browser checks at 320/390/768/1365 px, keyboard Escape/Tab, duplicates/related essays, filters, and source links.
3. **P1 coverage:** Re-evaluate all 415 article analysis rows and the 249-name ledger, tracking `existing`, `missing`, `excluded`, `same-place-different-essay`, `mentioned-only`, `reported`, `critical`, `planned`, `restricted` states. Promote nothing from heuristics alone.
4. **P1 priority evidence:** First-hand Baekchon/Siloam (#114), cruise stops (#421), extra place links (#2), heritage facilities (#382), nuance of the older Mogamiya stay (#507).
5. **P2 publication pipeline:** The existing `automation/Code.gs` is staged and supports only edits to 322 previously approved rows/summary fields. Do not treat it as an approved insertion/classification sync.

## Non-goals and protection

- No personal/Notion trips, private Sheet URLs, private source evidence paths, credentials, precise unverified map pins, newly asserted visits, booking availability or claims of current opening in public HTML.
- No direct `main` modifications or merging. A draft PR is staging, not deployment.

## 2026-10-30 follow-on audit tranche — source-first review

The current PR #1 remains open/draft; main is still `0f165d42`. Do not duplicate the completed popup/Maps patch. The original 322 entries are untouched.

### Prioritized editorial decisions (not publication authorization)

| Article | Candidate / scope | Current decision | Next evidence needed |
| --- | --- | --- | --- |
| #114 | 백촌막국수 (Goseong) | `missing / firsthand / high` | Exact official venue name, Goseong administrative locality, source quote and current identity |
| #114 | 실로암메밀국수 (Yangyang) | `missing / firsthand-past / high` | Name, Yangyang locality, distinguish historical visit from current recommendation |
| #114 | 평창 이조막국수 | `existing` | Do not duplicate; retain source linkage |
| #421 | Mediterranean cruise itinerary | `journey / partially represented` | Distinguish actual ports from sightseeing destinations, verify port-city and excursion city separately; link existing Florence/Rome/Venice records |
| #256 | Four Kiso walking routes | `existing / complete-for-identified-four` | No new entries without further source evidence |
| #584 | Four Fuji lakes inside a combined area record | `child-place modeling candidate` | Check four names and individual source support before splitting |
| #2 | Georgian churches and fortress | `candidate / source recheck` | Exact proper nouns and which sites the author visited |
| #382 | Heritage site(s) around Miryang | `candidate / source recheck` | Avoid duplicating existing 월연정 |
| #507 | 모가미야 stay | `existing-or-missing / negative experience` | Verify historical visit, source tone and current property identity; no endorsement inferred |

### Coverage audit methodology

The 249-name review ledger and the 415-essay deep-analysis corpus must be joined by **article ID + normalized candidate name + relation**, not by name alone. A zero-public-entry article is not automatically a miss. Review the 83 previous exclusions separately from names never extracted. For each candidate record: `article_id`, `name_as_written`, `city_or_admin`, `source_evidence`, `author_relation`, `record_form`, `existing_public_record_id`, `status`, `confidence`, `reason`, `reviewed_at`. Treat multiple cruise stops as one journey with linked ports, not duplicated experiences.

### Stop conditions

No private sheet export to this public repo, no new publication row or precise map pin until original-article and provider/administrative evidence are checked. Do not interpret older author visits as operating-status verification. Keep ambiguous names unpinned.

## Source-join tranche 2026-10-30 (read-only canonical Sheet)

Exact tabs re-read: `12_글별_심층분석` (415 article rows), `09_세부장소_실명` (249 named candidates), `13_개인여행_참고` (322 published observations). Public observation IDs cover **178 distinct article IDs**, leaving **237 article IDs with no published observation**. Among those, **167** have an extended place/evidence narrative (more than 80 characters), which is a *review queue*, **not** 167 proven omissions.

New candidate triage from no-public-entry articles:
- **#4**: 보성 장도, 진도 관매도, 철원 한탄강 얼음 트레킹 — article mentions author participation/companionship; re-check whether each is firsthand, context, or an interviewee's work before promotion.
- **#8**: Langtang, Kyanjin Gompa and glacier trail; **Tserko Ri explicitly not summited**, so do not mark it visited. Accident/evacuation framing must not be turned into an unqualified recommendation.
- **#16**: 남원 동편제마을 휴락, 안동 소목화당, 나주 목서원 are performance/production references, while 경주 도봉서당 is **planned**. Distinguish production work from tourism and planned from visited.
- **#2**: Mtskheta Svetitskhoveli, Gergeti Trinity, Sighnaghi fortress appear in the analysis; exact author-visit claims and municipal geography require article evidence. Lucerne Lion Monument is comparative and author visit is unconfirmed.
- **#3/#5/#6/#7**: generic locations, media metaphors, image filenames and recommendations without personal visit must not be promoted as firsthand spots.

The triage is bounded to available analysis summaries, not an independent re-read of every original article. Next: review all 167 high-narrative zero-public articles, plus all 83 prior exclusions, against originals and classify `firsthand / interviewee / planned / cited-only / metaphor / negative-risk`. Do not equate text-length heuristic with missing records.
