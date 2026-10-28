# 기행 아틀라스 — 공개 웹판

A static, source-linked thematic travel atlas of 322 experiences from 178 public Brunch essays. This is the public-facing **discovery layer**; the personal travel archive and the private canonical Google Sheet remain separate.

## Publishing with GitHub Pages

1. Create a dedicated **public** repository named `kihang-atlas` under the intended GitHub account.
2. Upload `index.html` and `.nojekyll` to the root of the default `main` branch.
3. In repository **Settings → Pages**, choose **Deploy from a branch** and **main → /(root)**, then Save.
4. Verify `https://<owner>.github.io/kihang-atlas/` in a browser, including mobile layouts, search, filters, and original Brunch article links.

No package install, external mapping service, fonts, or API key is required for browsing. The current site is static. An optional bound Google Apps Script can refresh already approved public summary fields; it needs a one-time owner-side setup and is not yet active.

## Content/provenance limits

- Counts: 322 curated parent experiences (Korea 141, international 181), mapped to 178 distinct public Brunch article URLs.
- Country-level distribution and regional tags are a navigation aid, **not** geocoded point locations, actual visited GPS tracks, or public entry permission.
- Activities are editorial classifications; season labels differentiate officially supported source seasonality from mentions in an essay.
- Summary and original author relation are source-backed editorial records, not independent certification of every claim or current operator status.
- The site embeds **no personal Notion travel records**, private Notion URLs, or private Google Sheet links. Internal case/evidence sheet references and private notes are stripped.
- Essays and other external content remain the copyright of their original rights holders; clicking **브런치 원문** takes readers to the source. Do not redistribute the original full essays.
- Public static hosting means anyone can view all data in the public HTML source. Never insert private itinerary details or credentials into this repository.

## Updating the data

For manual changes, regenerate the public `index.html` with the reviewed source-to-public transform, then re-run privacy and browser tests. Do **not** publish the private v4 HTML or raw Notion/Google exports.
## Improvements delivered on 2026-10-29

- Quick themes (walking, cruise/water, railway, onsen), keyword token search, country facets with contextual counts, sorting and reset.
- Editorial correction: a Hawaii jazz venue is no longer tagged as a cruise/water experience solely from the wider trip context; railway is labelled as 'rail and railway stories' rather than guaranteed train rides.
- Explicit activity tags in each source detail. See [classification audit](docs/CONTENT_CLASSIFICATION.md) for coverage and open uncertainties.

## Optional safe source update (requires owner activation)

The [Apps Script](automation/Code.gs) and [activation instructions](automation/SETUP.md) implement one-way daily publication of permitted **public summary edits only** for the existing 322 approved experience rows. Private Notion trips, Google Sheet link IDs, internal operational columns and identifiable private visits are excluded. New rows and location changes require editorial review. **Do not mistake code committed to this repository for a live trigger; setup and OAuth remain outstanding.**
