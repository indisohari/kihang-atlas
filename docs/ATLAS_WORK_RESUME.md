# Kihang Atlas — Resume ledger

**Updated:** 2026-10-31 KST  
**Verified main:** `0425ce1cb4ac0dc7e2507ea35d5ee3c03a595f57`  
**Published site:** https://indisohari.github.io/kihang-atlas/ (`main`/GitHub Pages; 324 observations, 180 distinct essays at last source verification)  
**Status:** PRs #1/#2/#3 merged; latest `main` [read-only CI](https://github.com/indisohari/kihang-atlas/actions/runs/41133907939) and [Pages workflow](https://github.com/indisohari/kihang-atlas/actions/runs/41133906932) succeeded. This file's 2026-10-30 research notes are preserved as historical snapshots; no Apps Script automation is active.

## Resume contract for any next session

1. Re-read `main`, open and closed Issues/PRs, check runs and the public Pages file before assuming this snapshot remains current; do not recreate merged PR #1/#2/#3 changes.
2. Read `README.md`, `docs/PLACE_MODEL.md`, `docs/CONTENT_CLASSIFICATION.md`, `automation/SETUP.md`, this ledger and any current PR diff. For a concrete editorial evidence claim, check its public original article; private canonical Sheet material stays outside this public repository.
3. Preserve the reviewed published **324 source observations / 180 original essay URLs** and the anonymized #396 Mongolian ranch. Do not confuse public observations with distinct places or source-article coverage.
4. For follow-up work, use a separate branch and Draft PR. Never merge, publish new rows, change permissions, or activate Apps Script without the relevant separate authorization.
5. Keep **source state, code staged, CI run, Pages deployment, live UI verification, editorial review and current operator status** distinct. A successful job does not prove the other stages.

## Historical 2026-10-30 source audit — retained evidence, not current release counts

- 415 source essays were deep-analyzed in the private source; 322 published experience records derive from 178 of them. The other 237 articles are **not automatically omissions**.
- An earlier named-place review ledger has 249 entries: 166 marked included and 83 excluded (68 reasoned exclusions, 15 functional duplicates). This is a different unit from the 322 published observations.
- Essay [#114](https://brunch.co.kr/@gosisain/114) mentions first-hand **백촌막국수** (Goseong) and **실로암메밀국수** (Yangyang). Neither appears among current public records or the earlier 249-place review list; **평창 이조막국수** is already present. New records require article-level evidence and operator/location checks.
- Essay [#421](https://brunch.co.kr/@gosisain/421) describes a Mediterranean cruise with 10 named itinerary places; 3 appear as separate site records. Model remaining ports as linked journey stops rather than duplicating one source essay seven times; do not infer Naples as a visited stop.
- Essay [#256](https://brunch.co.kr/@gosisain/256) has four Kiso walking entries already represented: **no re-extraction needed**.
- Essay [#584](https://brunch.co.kr/@gosisain/584) has four distinct Fuji lakes inside one area record; distinguish child entities from source observations.
- Inspect suspicious existing category tags before editing: `토카이 닭 파프리카시·지역 와인` (transport), `아바나 음악인 묘역` (transport), `김이수 묘역` (transport), `리스본 생선구이` (nature), `해밀턴호텔 뒤 골목` (stay), `남도 항구·무진기행 문학루트` (spot/transport).
- Two similarly named restaurants `이화식당` / `호남식당` remain ambiguous; no automatic venue pin or exact-place Maps action.

## Work queue

1. **Completed in merged PRs #1–#3:** centered responsive modal, cautious Maps search, 324/180 release, read-only CI, base keyboard/filter responsive checks. Do not re-implement the merged features.
2. **Current P0 follow-up:** align old release documentation; test anonymized map links against alternate providers and geo-status changes, country identity beyond count, open mobile modal focus/overflow, and combined filters. Keep the published source objects and visual design stable.
3. **P1 coverage (review only; no new public row without editorial approval):** Re-evaluate all 415 article analysis rows and the 249-name ledger, tracking `existing`, `missing`, `excluded`, `same-place-different-essay`, `mentioned-only`, `reported`, `critical`, `planned`, `restricted` states. Promote nothing from heuristics alone.
4. **P1 priority evidence:** First-hand Baekchon/Siloam (#114), cruise stops (#421), extra place links (#2), heritage facilities (#382), nuance of the older Mogamiya stay (#507).
5. **P2 publication pipeline:** The existing `automation/Code.gs` is staged and supports only edits to 322 previously approved rows/summary fields. Do not treat it as an approved insertion/classification sync.

## Non-goals and protection

- No personal/Notion trips, private Sheet URLs, private source evidence paths, credentials, precise unverified map pins, newly asserted visits, booking availability or claims of current opening in public HTML.
- No direct `main` modifications or merging. A draft PR is staging, not deployment.

## 2026-10-30 follow-on audit tranche — source-first review

**Historical checkpoint, 2026-10-30:** PR #1 was then open/draft and `main` was then `0f165d42`; this is **not** the current PR or publication state. The prior 322 observations were untouched at that checkpoint.

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

## 2026-10-30 exclusion-ledger full-pass checkpoint

Read all **83** excluded rows in the private 249-name ledger, and joined the 415 deep-analysis article IDs to the 178 published article IDs. The 83 exclusion dispositions are **68 `근거 있는 제외` and 15 `실질적 중복`**. These are existing editorial decisions, *not* 83 confirmed missing records. No private raw rows or identifiers have been committed.

### Re-review decisions

1. **#421 Mediterranean cruise**: Eight excluded names/compound names are currently flattened under one article. Need port-of-call vs inland excursion vs non-visited comparison distinction. **Napoli appears in the exclusion ledger but is not established as an actual stop** in the prior source review. Mark `itinerary_conflict / source_check`, not visited.
2. **#584 Fuji lakes**: Four named lakes excluded as duplicates of the umbrella record. They are distinct geographic entities; candidate for searchable child places *without multiplying the original essay observation*. `child_entity_pending`.
3. **#507 Mogamiya**: Excluded for conditional/negative review. A location explorer should preserve author-critical firsthand experiences with a clear `critical` label, not silently treat exclusions as positive-only editorial quality. `critical_experience_pending`.
4. **#382 Tōrori historic village / Millyang Geumsidang trail**: Previously excluded due to selection/duplication; verify independent site geometry and firsthand status, do not automatically add.
5. **#90/#87/#139 North Korea foods, eateries and hot springs**: Prior exclusion for restricted ordinary travel is a valid *accessibility gate*, not proof that locations are fictional. Keep research-only and mark access constraints; no ordinary leisure-booking recommendation.
6. **#109 island routes**: Distinguish actual visited islands, mentioned islands, and ferry connection edges; no blanket conversion to independent spot records.
7. **#367/#501 restaurant criticisms**: Preserve negative editorial evidence in the research corpus; publication should show a criticism label if independently adopted, not imply endorsement.

### Quantified source triage

The 237 article IDs with zero public observations were screened by a **heuristic only**: 66 summaries contain explicit 'no concrete POI' language, 68 mention caveats (metaphor/plans/other sources), and 103 need closer assessment. These categories are overlapping conceptually and depend on a simplistic priority rule; they are *not* final classifications. The previous 167 long-place-summary articles form a separate overlapping priority queue. No verified missing-place count can be computed from either heuristic.

### Operational next steps

- Produce a structured, reviewable evidence queue keyed by article ID and candidate place, with relation and confidence; keep sensitive raw material in the private Sheet, not this public repository.
- Re-read original #114, #421, #584, #507 and sample other source articles to resolve ambiguities; check current official administrative name/municipality before Maps pins.
- Fix clearly miscategorized published records in a separate, reviewed PR only after checking each source record and taxonomy.
- **Historical checkpoint only:** PR #1's popup/Maps change was still staged during this review. PRs #1–#3 have now merged; future revisions require a new, separately reviewed Draft PR.
