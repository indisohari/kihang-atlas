# Kihang Atlas — place-first architecture (2026-10-29)

## 2026-10-31 published expansion — complete source snapshot

Merged PR #2 (following merged PR #1) published only #29 The Empire Brunei (historical first-hand resort stay) and #67 LEGOLAND Malaysia (father/son theme-park visit) in the public-derived source. PR #2 preserved the 322 source objects from the PR #1 baseline. PR #1 itself had added operational-status metadata and made five reviewed place-type corrections without replacing legacy source identities or essay links. The deployed total is **324 parent observations / 180 essay URLs, 51 country/combined labels, Korea 141 / outside Korea 183**.

The published 324-record source was counted independently of the older 322-record taxonomy snapshot retained below:

| Current `record_form` | Staged records |
| --- | ---: |
| `spot` (named candidate) | 197 |
| `area` | 49 |
| `route` | 33 |
| `experience` | 40 |
| `event` | 5 |
| **Total** | **324** |

Brunei's existing *country polygon* is now selectable and has a polygon-derived viewport center; **no venue coordinate/pin** is represented. Hotel and theme-park official pages confirm **administrative locations only**, while prices, operator conditions, opening, cleanliness, pest risks and travel-day transit are unverified. Earlier 322/178/199 statements below are preserved as historic descriptions of the previously documented baseline, not the current published data. See [release gates](ATLAS_324_STAGED_RELEASE.md).

## Public product definition

The public Atlas is a source-linked **discovery index**, not a booking directory or a list of fully geocoded pins. The source-of-truth is a separate private personal Google Sheet. The site's curated publication contains **322 editorial experience records from 178 original Brunch essays**. No personal Notion trip record or private Google Sheet link is included.

### Entity and relationship model

- **Country / source region / administrative area / locality**: a navigational hierarchy, not a claim that all recorded locations have exact boundaries.
- **Place candidate**: a named lodging, restaurant, cultural facility, natural feature, station, bathhouse or other named attraction. `record_form=spot` is editorial, not a verified current business status.
- **Route**: a trail, pilgrimage, railway segment, road journey or multi-point trip; these may appear under two or more administrative regions while retaining one source experience record.
- **Area**: a city, neighborhood, island group, historical district or multi-venue locale; do not invent an individual POI.
- **Event**: a dated festival or program, not a permanently operating venue.
- **Experience**: a contextual food/culture/nature story with insufficient evidence to assert one exact POI.
- **Source observation**: one of the 322 source-backed excerpts, retaining original Brunch article URL and the direct-visit vs suggestion distinction as transcribed.
- **Entity linkage**: `canonical_place_id` and `related_record_indices` combine a *reviewed exact-name duplicate* without deleting source observations. E.g. two '연홍도' entries refer to one geographic place with two distinct source records.

### Current conservative discovery classification

| Record form | Experience records |
|---|---:|
| Individual place candidate | 199 |
| City/district/area | 48 |
| Route/journey | 32 |
| Contextual experience | 38 |
| Dated event | 5 |
| **Total source-backed experiences** | **322** |

These **199 are candidates, not 199 independently verified addresses or active establishments**. Classification was derived from 70 manual rules/reviews, 172 title patterns, 41 title-specific natural features and 39 low-confidence topic hints. Labels must remain visibly qualified as exploration classifications.

Place categories include lodging, dining, hot spring/bathing, monuments/heritage, nature/landscape, routes, city/neighborhood, markets/shops, transit/stations, cultural venues, events and broader narratives. This axis is distinct from the original five thematic editorial categories and the seasonal evidence axis.

## First externally verified locations

| Sheet row | Source record | Administrative hierarchy for site exploration | Authority | Important limitation |
|---|---|---|---|---|
| 285 | 오제습지 야시로산장 | Japan → Fukushima → Hinoemata / Miharashi | [Hinoemata official visitor bureau](https://www.oze-info.jp/ozh_stay/yashirougoya/) | Original essay also identifies 弥四郎小屋. Does not make all of Oze 'Fukushima'. |
| 286 | 오제고야 산장 | Japan → Fukushima → Hinoemata / Miharashi | [Ozegoya operator](https://www.ozegoya.co.jp/ozegoya/) | The property's administrative address is verified, not a specific map pin. |
| 13 | 히라유 온천 | Japan → Gifu → Takayama / Hirayu | [Japan Spa Association](https://www.spa.or.jp/kokumin/1011/) | A hot-spring **town**, not one ryokan or bath business. |
| 29 | 니시오오야마역 | Japan → Kagoshima → Ibusuki | [Kagoshima official tourism](https://www.kagoshima-kankou.com/guide/50904) | A station/landmark; a train ride is not assumed. |
| 40 | Magome–Tsumago Nakasendo | Japan → **Gifu/Nagano** → Nakatsugawa / Nagiso | [Gero City tourism](https://www.city.gero.lg.jp/site/kanko/1224.html) | Route spans two municipalities and prefectures, not one destination. |
| 159 | Gapado Olle / local food | Korea → Jeju → Seogwipo / Gapado | [Visit Jeju](https://www.visitjeju.net/kr/themtour/view?contentsid=CNTS_300000000014180) | One source experience includes route and food. Do not split without article-level evidence. |
| 270 | Niigata Sake no Jin | Japan → Niigata → Niigata City | [Niigata sake association](https://www.niigata-sake.or.jp/en/sakenojin/) | **2026** event venue at Toki Messe, not permanent venue or 2027 schedule. |

Source travel-region wording remains untouched in the `region` field. Official administrative evidence is recorded separately in `geo_review.evidence`. The site displays no invented longitude/latitude or fake venue pins.

## Frontend and source behavior

1. Map: country-level distribution based on existing Natural Earth polygons. It is **not** a collection of literal visit pins.
2. Place browser: choose country → source/admin region → municipality/island/district → source-linked named place/route. Breadcrumbs reverse the drill-down.
3. Spot-type filters and the original theme, activity and seasonal filters compose. Every filter uses the shared state and source record IDs. Mobile has the same interactions without horizontal overflow.
4. Details show the original qualitative observation, first-hand/suggested status text and link to the public Brunch essay. The seven new administrative records also show an official authority link and review date. **No current business-open status** is asserted.
5. The view is a static snapshot; the optional Apps Script synchronizes only previously approved public description fields. Classification, precise locations, new destinations and new source rows require separate editorial review. No live Google/Notion access is exposed in the browser.

## Outstanding verification backlog

- Independently verify names and coordinates before adding precise venue pins or a 'near me' experience. Business closure and ownership changes are not inferred from historical essays.
- Reconcile ambiguous restaurant names (e.g. '이화식당', '호남식당') with source city before creating a distinct geocoded business object.
- Validate more Korean/Japanese localities and multi-region routes; do not geocode multi-site stories as one exact point.
- Review the 39 topic-hint classifications, the 41 title-specific natural candidates and duplicated names with their article source. Preserve the user's private trip log in Notion.
- Official seasonality remains a limited evidence set. Article mention ≠ validated best season. Review each destination separately where seasonal difference materially affects planning.

## Privacy/release checks

- No private Notion/Google Sheet URL, token or original internal evidence location is shipped.
- Public reviews do **not** prove a visit by the site owner; `author_relation` describes the **essay author's** recorded relation.
- Canonical source records are never silently deduplicated. If the same named location appears in two essays, both original observations remain accessible.
