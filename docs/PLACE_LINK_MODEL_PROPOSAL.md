# Source observation → place/entity link model (proposal only)

**Baseline:** `0425ce1cb4ac0dc7e2507ea35d5ee3c03a595f57`, 324 observations / 180 essay URLs.
**Status:** schema proposal, no production data/UI migration or authorization.

## Existing capabilities and limits

- The published `atlasData.items` index can contain many entries from the same essay URL (e.g. #584, 11 entries). Each item has a singular `place`, `article_id`, `article_url`, `author_relation`, `geo_review` and record/type labels.
- `canonical_place_id` and `related_record_indices` represent some reviewed exact-place duplicates. An array index is not a stable independent physical-entity identifier.
- No first-class many-to-many source observation ↔ place entity index, verified journey legs, or venue coordinates is currently supplied by those fields. Country-map selection is only coverage at country scale.

## Minimal proposed logical entities

| Entity | Stable key | Fields that must remain separate |
| --- | --- | --- |
| `source_article` | original Brunch URL + article ID | original author and publication date |
| `source_observation` | stable, new observation ID | assessment, author relation, source note |
| `place_entity` | verified ID distinct from display name | country/admin names, kind: spot/area/route/event; coordinate optional |
| `observation_place_link` | observation ID + place ID + source relation | firsthand, other-person, planned, mentioned, recommended, not-visited, uncertain; source paragraph evidence |
| `journey` and `journey_stop` | source + ordered stop ID | physical port, tender landing, inland excursion, comparison-only, confirmed/uncertain visit |
| `geo_assertion` | place ID + authority/date | country polygon, verified admin, verified site identity, optional exact coordinate |
| `access_policy` | place/source policy | public, anonymized, restricted; hard no-map for protected #396 |

## Important constraints

1. Four child lakes of #584 should not manufacture four more parent essay observations.
2. Visit status belongs to the **source author or attributed other person**, never to the Atlas operator. Negative, mixed and conditional experience remains eligible for review but not repackaged as an endorsement.
3. Geographical verification and disclosure are orthogonal: even a later verified status cannot expose #396 or automatically generate a third-party Maps link.
4. In #421 a visit to Florence/Rome does not locate the ship berth there; parentheses in itinerary lists do not independently verify every internal walk.
5. In #382 Geumsidang (named heritage spot) and Geumsidang-gil (route) need distinct entity identities.
6. Preserve the source observation IDs/links and current UI during any migration, and keep `related_record_indices` temporarily as a compatibility projection.
7. No source Sheet auto-sync should publish entities, pins, access statuses or new observations without editorial approval.

## Future implementation gate (not done here)

Create a read-only pilot index for #114, #421, #584, #382 and #507. Prove unchanged parent counts, privacy and source links; validate filter/search/breadcrumb continuity and 320/390px dialog behavior. Then seek separate approval for any published data/schema or UI change.
