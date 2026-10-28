# Kihang Atlas — Activate one-way public summary synchronization

**Current status: Script published and locally simulated. NOT connected to the owner's Google Apps Script account, and no live daily trigger has been installed.**

This is a private Google Sheet → public GitHub Pages *projection*, not a public link to the private Sheet.

## Privacy and publication contract

- Input: the existing **personal** Google Sheet and its tab `13_개인여행_참고`, 13 columns. No private Sheet ID, URL, Notion record, or credential is stored in this repository.
- Approved scope: the **first 322** curated public-essay experience rows. Verify exact source row position, region, place, country, Brunch article ID and URL before publishing anything.
- Fields refreshed: original Sheet columns **C–F and L** only (category, author assessment, editorial rationale, verification-status summary, author relationship). Internal evidence link I, travel decision notes J, source-case pointer K, and any private Notion information are *never* copied.
- Source-derived geography and separately verified seasonal attributes stay intact. Added rows are counted as pending but **never published automatically**. Reordering, renaming, changing geography/article IDs or URLs stops the run for human review.
- The published Mongolian private-ranch account remains redacted. The script explicitly prevents copying that record's original identifying information. A new changed public field containing a private link, contact pattern or known confidential marker is rejected.
- Every update uses GitHub's latest content SHA, so conflicting writes fail rather than silently overwrite one another.

## One-time activation by the owner

1. Open the **private canonical Google Sheet** → **Extensions → Apps Script**. The project MUST be *bound to this Sheet*, not another file. Paste [`Code.gs`](Code.gs) into the script editor.
2. Set the project timezone to **Asia/Seoul**. If you wish to pin OAuth scopes, show the Apps Script manifest and copy [`appsscript.json`](appsscript.json).
3. At [GitHub fine-grained personal access tokens](https://github.com/settings/personal-access-tokens), generate an expiring token for **only** the repository `indisohari/kihang-atlas`. Set **Repository permissions → Contents: Read and write**, with no additional permissions.
4. In the *Apps Script Project Settings → Script properties*, enter key `GITHUB_FINE_GRAINED_TOKEN` and your token as its value. **Never paste tokens in Sheet cells, GitHub files, screenshots or chat.** Script properties can be read by other script editors; do not use this pattern on a Sheet shared with untrusted editors.
5. Run `previewAtlasSync`. On the current unchanged source you should see `approvedRecords:322`, `changedFields:0`, `pendingNewRows:0`. If an identity or field validation fails, stop and inspect the original source; never bypass the safety check.
6. Run `syncAtlasNow` once and approve Google authorizations. With no changes, it reports `no_changes` without a commit. A permitted changed field causes one commit to `main`; GitHub Pages republishes automatically.
7. Run `installDailyTrigger` once. Check **Triggers** and **Executions** in Apps Script to confirm a daily run scheduled around **09:00 Asia/Seoul**. Time-driven triggers may run within a window, not at an exact minute.

## Maintenance and tests

- The token expires; renew/rotate in Script properties. Review execution failures. Never put the token in a public issue or log.
- Changes to a location, original article link, source schema, count, map or seasonal classification require editorial review and an intentional rebuild. The nightly/daily script does not auto-approve new places.
- Changes to allowed public summaries should be reviewed before editing because their new value may become public automatically. The script is an additional privacy guard, not a substitute for editorial controls.
- This setup is free to run at one daily trigger on ordinary Apps Script quotas, subject to current provider limits.
- **Locally simulated (11 checks):** unchanged source, safe field update and commit, repeat no-op, escaping `</script>` payloads, private-link rejection, pending appended rows, geometry/identity changes blocked, missing token, private-ranch redaction, duplicate trigger prevention.
- **Not yet verified:** actual bound Apps Script execution, OAuth consent, real GitHub write from Google, scheduled live run.

References: [Google Apps Script installable triggers](https://developers.google.com/apps-script/guides/triggers/installable), [properties service](https://developers.google.com/apps-script/guides/properties), [GitHub Contents API](https://docs.github.com/en/rest/repos/contents).
