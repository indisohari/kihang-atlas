# Kihang Atlas — 2026-10-31 public-source editorial/geography review

**Baseline:** `0425ce1cb4ac0dc7e2507ea35d5ee3c03a595f57` — 324 public observations, 180 original Brunch essay URLs.
**Decision state:** evidence queue ONLY, not editorial approval, not a published data edit.
**Input boundary:** public Brunch essays and official public geographic/operator sources only; no private canonical Sheet rows, identities, source notes or credentials.

## Critical integrity findings

- **Article identifier mismatch:** [Brunch #2](https://brunch.co.kr/@gosisain/2) is an essay about resignation/defeat. The earlier Georgia candidate association to #2 is unsupported. Quarantine Mtskheta, Gergeti and Sighnaghi until the original ID namespace and source URL are reconciled.
- **Source geography vs administered geography:** [#584](https://brunch.co.kr/@gosisain/584) labels Yunoko and Chuzenji as Gunma, but [Tochigi official Yunoko](https://www.pref.tochigi.lg.jp/c05/intro/tochigiken/hakken/shizen3_09.html) and [Chuzenji](https://www.tochigiji.or.jp/spot/s5902) show **Nikko, Tochigi**; current public Atlas already correctly records them. Do **not** change back.
- **Mixed visit evaluation:** [#507](https://brunch.co.kr/@gosisain/507) praises Mogamiya's spring water yet criticizes several lodging conditions; [official Mogamiya contact](https://mogamiya.net/en/contact/) verifies location, not historical or live conditions.
- **False port inference:** [#421](https://brunch.co.kr/@gosisain/421) uses Napoli in a port-access comparison but does not include it among visited cities. No Napoli source-visit record should be created.

## All 28 case dispositions

| Case | Source | Place / scope | Author relation | Existing published record | Proposed action |
| --- | --- | --- | --- | --- | --- |
| R001 | [#114](https://brunch.co.kr/@gosisain/114) | 백촌막국수 | `firsthand_past` | — | `publication_candidate_pending_approval` |
| R002 | [#114](https://brunch.co.kr/@gosisain/114) | 실로암메밀국수 | `firsthand_past` | — | `publication_candidate_pending_approval` |
| R003 | [#114](https://brunch.co.kr/@gosisain/114) | 평창 이조막국수 | `firsthand` | 평창 이조막국수 | `keep_existing` |
| R004 | [#421](https://brunch.co.kr/@gosisain/421) | 지중해 크루즈 10박11일 여정 | `firsthand_group` | 피렌체·피사; 로마 Roma; 베니스 Venezia | `link_journey_candidate` |
| R005 | [#421](https://brunch.co.kr/@gosisain/421) | Napoli | `mentioned_only` | — | `exclude_as_confirmed_visit` |
| R006 | [#421](https://brunch.co.kr/@gosisain/421) | 마르세유·칸느 | `firsthand_group` | — | `link_journey_candidate` |
| R007 | [#421](https://brunch.co.kr/@gosisain/421) | 피렌체·피사 / 로마 | `firsthand_group` | 피렌체·피사; 로마 Roma | `link_existing` |
| R008 | [#584](https://brunch.co.kr/@gosisain/584) | 모토스호 (本栖湖) | `group_visit_unresolved` | 후지산 호수군(모토스·쇼지·사이·가와구치호) | `child_link_candidate` |
| R009 | [#584](https://brunch.co.kr/@gosisain/584) | 쇼지호 (精進湖) | `group_visit_unresolved` | 후지산 호수군(모토스·쇼지·사이·가와구치호) | `child_link_candidate` |
| R010 | [#584](https://brunch.co.kr/@gosisain/584) | 사이호 (西湖) | `group_visit_unresolved` | 후지산 호수군(모토스·쇼지·사이·가와구치호) | `child_link_candidate` |
| R011 | [#584](https://brunch.co.kr/@gosisain/584) | 가와구치호 (河口湖) | `group_visit_unresolved` | 후지산 호수군(모토스·쇼지·사이·가와구치호) | `child_link_candidate` |
| R012 | [#584](https://brunch.co.kr/@gosisain/584) | 유노코 (湯ノ湖) | `firsthand_area_travel` | 유노코 | `retain_verified_geography` |
| R013 | [#584](https://brunch.co.kr/@gosisain/584) | 주젠지호 (中禅寺湖) | `firsthand_area_travel` | 주젠지호 | `retain_verified_geography` |
| R014 | [#507](https://brunch.co.kr/@gosisain/507) | 모가미야 호텔 (最上屋旅館) | `firsthand_past` | — | `publication_candidate_pending_approval` |
| R015 | [#507](https://brunch.co.kr/@gosisain/507) | 나루코 협곡 | `explicitly_not_visited` | — | `exclude_as_confirmed_visit` |
| R016 | [#382](https://brunch.co.kr/@gosisain/382) | 금시당 | `firsthand` | 금시당 | `review_existing_form` |
| R017 | [#382](https://brunch.co.kr/@gosisain/382) | 금시당길 | `recommended_unconfirmed_walk` | 금시당; 월연정; 밀양강 수변 산책 | `child_link_candidate` |
| R018 | [#382](https://brunch.co.kr/@gosisain/382) | 월연정 | `firsthand` | 월연정 | `keep_existing` |
| R019 | [#382](https://brunch.co.kr/@gosisain/382) | 퇴로리 고가 마을 | `firsthand_exterior_only` | — | `hold_access_verification` |
| R020 | [#382](https://brunch.co.kr/@gosisain/382) | 삼랑진역 급수탑 | `mentioned_only` | — | `verify_more` |
| R021 | [#109](https://brunch.co.kr/@gosisain/109) | 낙월도 | `firsthand_past` | — | `publication_candidate_pending_approval` |
| R022 | [#109](https://brunch.co.kr/@gosisain/109) | 연홍도 | `firsthand_past` | 연홍도 | `keep_existing_privacy` |
| R023 | [#109](https://brunch.co.kr/@gosisain/109) | 우이도 | `reported_other_person` | — | `exclude_as_author_visit` |
| R024 | [#109](https://brunch.co.kr/@gosisain/109) | 덕적도-굴업도/문갑도 페리 연결 | `mentioned_only` | — | `verify_more` |
| R025 | [#109](https://brunch.co.kr/@gosisain/109) | 굴업도 개머리언덕 | `recommended_unconfirmed_walk` | 굴업도 개머리언덕 | `keep_existing` |
| R026 | [#501](https://brunch.co.kr/@gosisain/501) | 이화식당 | `firsthand_past` | 이화식당 | `hold_ambiguous_venue` |
| R027 | [#501](https://brunch.co.kr/@gosisain/501) | 호남식당 | `firsthand_past` | 호남식당 | `hold_ambiguous_venue` |
| R028 | [#256](https://brunch.co.kr/@gosisain/256) | 나가센도 마고메주쿠-츠마고주쿠 | `firsthand` | 나가센도 마고메주쿠-츠마고주쿠 | `keep_existing` |

Each case's **source evidence, assessment, administrative context, official evidence link, and remaining uncertainty** is stored in [the machine-readable evidence queue](EDITORIAL_SOURCE_REVIEW_20261031.json). Existing publication matches were checked against the pinned 324-record index. None is approved for new publication.

## Editorial safeguards and next steps

- **Publication candidates only, not yet authorized:** #114 백촌막국수 and 실로암메밀국수, #507 Mogamiya, #109 낙월도. New article-visit assertions need source, venue identity, historical-versus-current qualification and editorial approval.
- **Child links without parent-count inflation:** Four named Fuji lakes under #584; separate named heritage Geumsidang from official [Geumsidang-gil](https://miryang.go.kr/tur/index.do?mnNo=20304000000) walking route; link existing #421 stops as a journey rather than inventing duplicate essays.
- **Do not promote unvisited / other-person experiences:** #421 Napoli, #507 Naruko Gorge, #109 Uido. Exact personal visit to each Fuji lake, to #382 historic interiors or whole Geumsidang route remains unverified.
- **Do not pin common-name restaurants:** #501 이화식당 and 호남식당 lack unique municipality and venue identity in original. No map search provider or exact coordinates.
- **Do not infer transport operations:** #109 ferries and #421 cruise port transfers describe historical context; current routes, service and rules require operator evidence.
- **Preserve private location constraints:** #396 anonymous location cannot be disambiguated or linked to third-party Maps even if geographic status changes.
- Historical queues (415 essay analyses, 249 named candidates, 83 exclusions, 167 long narratives, 237 no-public articles) remain **older private-ledger snapshots**. They were not rejoined to the 180 published essay URLs in this research; do not call those numbers confirmed omissions.
- Before source-data changes, record exact source relation, stable place identity, distinct administrative authority, existing-record link, evaluation polarity and residual uncertainty; obtain separate editorial authorization.

See [proposed place/observation/route model](PLACE_LINK_MODEL_PROPOSAL.md). This PR does not activate Google Sheets automation.
