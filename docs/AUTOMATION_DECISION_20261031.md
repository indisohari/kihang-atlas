# Kihang Atlas — Google Sheets sync activation decision

**Decision review:** 2026-10-31 KST  
**State:** NOT ACTIVATED. Decision record only.  
**Source of truth:** Private canonical Google Sheet remains the editorial original; the public GitHub repository contains only reviewed derived publication.  
**Decision owner:** Repository/Sheet owner. No OAuth authorization, token creation, Sheet edit, trigger, external transfer or GitHub automation test was executed for this review.

## Recommendation — defer recurring synchronization

Do **not** activate daily sync now. The published 324-observation / 180-source-essay Atlas already serves from static GitHub Pages, independently of Apps Script. The next high-value task is to reconcile author relationships, multiple places per essay, physical routes, editorial duplicates and disambiguated geography; the current synchronization code updates only four text fields and cannot adjudicate any of those relationships.

Manual, owner-reviewed source changes followed by deliberate Draft PRs remain the lower-risk default until (a) there is evidence of repeated valuable text-only updates and (b) the public-redistribution scope and writer/security model are accepted.

## Verified implementation (code reading, not live integration)

| Component | Current code contract | Verification state |
| --- | --- | --- |
| Sheet binding | `automation/Code.gs` expects a bound spreadsheet and exact `13_개인여행_참고` 13-column header layout | Code read; actual bound Sheet/account not checked |
| Input extent | First 324 reviewed rows; `pendingNewRows` counts additional rows without adding them | Mock coverage only |
| Permitted derived changes | Existing first 322 items only: `author_assessment`, `editorial_reason`, `verification`, `author_relation` (source columns D/E/F/L) | Mock coverage only; updates can still convey source/private content |
| Exclusions | Source I/J/K are not copied; identities and original article URLs must match; new #29 and #67 remain manual-only | Code and tests read; no live private-source comparison |
| Protected #396 | Explicit redaction path returns unchanged public item; source-private name is not copied | Mock coverage; no guarantee against every future data/schema regression |
| Write path | Optional `syncAtlasNow()` requires opt-in property and fine-grained GitHub token, stages a branch and opens a **public GitHub Draft PR**, never a direct main merge | No real creation tested |
| Cadence | Optional `installDailyTrigger()` sets approximately 09:00 Asia/Seoul | No actual scheduled trigger verified |
| Declared Google scopes | `spreadsheets.currentonly`, `script.external_request`, `script.scriptapp` | Manifest read; real OAuth consent/permissions not verified |
| Test baseline | Main `19/19` Node and `112/112` Chromium before Phase A/B; [Draft PR #4](https://github.com/indisohari/kihang-atlas/pull/4) passed `22/22` and `372/372` | No live Sheet→GitHub end-to-end integration |

### Material risks that the current mock passes do not settle

1. **Public Draft PR is already publication to a public host.** A correct GitHub access token and `draft: true` do not make submitted descriptive text private or owner-only. A forbidden/private fragment could enter a public PR diff before a reviewer notices it.
2. **Regex-based filtering is not a confidentiality guarantee.** The code rejects some URL, phone/contact and Korean private markers, but benign-looking confidential editorial context, aliases, identities and sensitive geography may not match those patterns. Exclusion of source columns I/J/K helps but is insufficient by itself.
3. **Long-lived access creates an additional credential and authority surface.** An Apps Script project holding `GITHUB_FINE_GRAINED_TOKEN` introduces token custody, expiry/rotation, editor privileges, GitHub writer scope and audit requirements. Current branch ownership and retry behavior are designed to fail closed, but real failure recovery was not exercised.
4. **Automated descriptions can change meaning.** Existing row identity checks do not verify whether a newly edited field incorrectly upgrades source hearsay to a firsthand author visit or turns a negative historical lodging account into a positive current recommendation.
5. **Recurring execution adds maintenance obligations.** Triggers run under the creator's Google account and time-driven execution has schedule variability and quotas. Google Apps Script account/share/access conditions need verification in the actual owner context.
6. **Potential future schema mismatch.** A normalized place/route entity model would require changes that this source-summary-only synchronization does not support. Premature activation could increase churn, stale PR branches or manual triage without raising publication quality.

## Bounded alternatives

| Option | Next action | Benefit | Cost/risk | Recommendation |
| --- | --- | --- | --- | --- |
| **A. Keep sync inactive** | Use current static site and evidence-led editorial Draft PR process | No additional credentials, recurring transfers, new writers or accidental public PR content | Human-driven source-summary updates | **Default now** |
| B. Run isolated manual preview | After verifying correct account and binding, review `previewAtlasSync()` read-only output; no token, no PR, no trigger | Measures whether material approved-summary changes exist | Still reads private source within Apps Script and calls GitHub public API; exact auth and storage permissions must be checked first | Only if source-summary change frequency justifies it |
| C. Allow manual Draft PR staging | Separate owner authorization for specific external-public transfer, constrained token, diff review and one real low-risk test | Human review gate while reducing repetitive transfers | Draft PR content public, credential issuance, account custody, rollback/partial write | Defer until B demonstrates value and scope passes security review |
| D. Enable recurring daily trigger | Authorize ongoing public transfer, access/rotation, alerting and owner of failures | Could save manual steps if updates are frequent and routine | Highest unattended publication/exposure risk; routine maintenance and periodic token renewal | Not justified now |

## Conditions before any permission or activation decision

- Document the canonical Sheet/account and authorized reviewer/writer; confirm whether editors can access bound Apps Script project properties and each user-facing or public data surface.
- Define **exact allowed public destination and transfer fields** with explicit owner approval; test synthetic/unclassified summary fragments for leaks and changed author relations. Do not place confidential or protected material into a test Draft PR.
- If a manual test is justified, choose a sandboxed public-only fixture or a dummy repository first, not real unpublished Sheet records. Reconcile GitHub branch ownership, idempotence, expired token behavior and rollback/partial-branch recovery.
- Verify latest Google Apps Script OAuth scopes and owner account, GitHub token permission boundaries and expiration. Use a fine-grained short-lived PAT only where appropriate; GitHub recommends an App for sustained automation, but App installation/permissions add their own approval burden.
- Inspect actual provider terms and compliance for the intended account and source classification; **service terms and protected-source transfer authorization were not verified** by this code audit.
- Establish review cadence, error monitoring/notification owner, and deactivation/revocation procedure before any scheduled trigger.
- Maintain no merge/direct-main writes, no new public place rows, no automatic coordinates or current-operator claims, and hard map-search exclusion for #396.

## Sources and current-state limitations

- Implementation: [Code.gs](../automation/Code.gs), [Apps Script manifest](../automation/appsscript.json), [existing setup safeguards](../automation/SETUP.md).
- [GitHub fine-grained PAT guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) and [GitHub App selection](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/deciding-when-to-build-a-github-app).
- [Google Apps Script installable triggers](https://developers.google.com/apps-script/guides/triggers/installable) and [authorization](https://developers.google.com/apps-script/guides/services/authorization).
- This review did not access personal Google Sheets or activate any Google/GitHub integrations. It records the present **inactive design and authorization decision boundary**, not an assertion that the installation will work in production.

**Unresolved owner choice:** none required to continue read-only Atlas editorial research. Only enabling synchronization or authorizing an external public transfer requires a future explicit decision.
