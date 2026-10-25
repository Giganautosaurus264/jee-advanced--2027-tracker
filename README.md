# JEE 2027 Study Workspace

A responsive, installable, offline-capable PCM study tracker for GitHub Pages.

[Open the dashboard](https://giganautosaurus264.github.io/jee-advanced--2027-tracker/)

## Navigation and scope

PCM overview → subject → branch → chapter → subtopic → assessment evidence.
Optional child skills can be nested below a subtopic (up to 12 refinement levels). They do not change parent topic counts or independently grant completion. Desktop uses a sidebar and chapter explorer; mobile uses a dismissible menu, breadcrumbs and back links. Search works across all subjects. Chapter groups collapse to keep mobile pages manageable.

Every statistics card, activity view and burndown is derived from its selected scope. Broad legacy sessions with no chapter mapping appear only at branch/subject/PCM level, never attributed to an arbitrary chapter. The combined percentage counts checklist items equally; it is not predicted marks, official syllabus weight, readiness or percentile.

## Frozen syllabus manifest

Manifest: `pcm-2026-reference-v1`, 419 independently grouped study subtopics:

| Branch | Subtopics |
|---|---:|
| Physics | 98 |
| Organic Chemistry | **129 — existing IDs preserved** |
| Physical Chemistry | 52 |
| Inorganic Chemistry | 50 |
| Mathematics | 90 |

Reference: [official 2026 syllabus](https://jeeadv.ac.in/documents/jee-advanced-2026-syllabus.pdf). These are study-organisation counts, not official topic counts. The 2027 syllabus must be checked separately before changing scope. Organic preserves the original Cengage-aligned checklist, including enrichment such as E/Z and R/S. The official 2026 document excludes those configurations from its basic organic stereochemistry scope. Do not silently delete them or change the 129 denominator.

Repository audit:

- `ffc8caa` contained 124 organic checklist items.
- `a5e792f` contained 129 and 15 practice-verified items.
- The inherited head `6ca51cd` contained 129 and 17 practice-verified items.
- The reported 22 October **115/129 remaining** snapshot is preserved as a historical reference. The exact 14 completed IDs cannot be reconstructed from repository data, so the app does not fabricate that mapping.
- The old planner counted browser-only task checkmarks, independently of practice statuses in source. This explains why it could show 129 remaining despite assessed practice.
- Query strings such as `?v=20261022-117` do not retrieve an old Git commit or use separate localStorage; different browsers/profiles/origins and cleared storage can differ.

## Assessment completion

Historical practice is retained. New assessment completion requires a locally reviewed, timed, unaided attempt with at least two challenging integrated questions including a cited PYQ. Every question must require the assessed subtopic plus another known subtopic. A calibrated result also needs an actual score distribution for the same assessment version, subtopic, maximum marks and test conditions, from an appropriate representative cohort.

The app computes the percentage of actual cohort scores **strictly below** the learner’s score, conservatively handling ties. Completion requires at least 99%. A minimum of 100 actual observations is an app policy, not a statistical guarantee. Raw accuracy, a single top score, rank alone, a full-exam distribution applied to an unrelated quiz, or a self-reported percentile cannot supply this calibration. Top performers need not score full marks. No actual distribution ships with the app.

Source validity and grading are reviewed by the user, not independently verified by this static app. This is a locally reviewed cohort-equivalent threshold, never an official JEE percentile or AIR prediction. A lower or uncalibrated retake replaces the active result and can remove completion. Earlier attempts remain in history; older-dated imports do not replace newer attempts. Same-date imports use recorded time as their tie-breaker.

See [assessment import format and integration limits](docs/ASSESSMENTS.md).

## Data preservation

Personal data stays on the device; repository changes never access the user's live browser storage.

- Existing `jee27_study_checkins`, `jee27_progress_history`, `jee27_topic_task_checks_v3`, diagnostic, percentile and theme records are not deleted or overwritten during migration.
- The new workspace uses `jee27_workspace_v1`; the previous saved workspace is backed up to `jee27_workspace_backup_v1` before the next save.
- Loading is read-only. Legacy first-pass checks are mapped to stable organic IDs as practice, not mastery. Confirmed study days from repository history are labelled as historical; other existing dates are retained even if inconsistent with an earlier correction.
- Legacy weighted coverage snapshots remain separately visible. The new burndown never splices those percentages into assessment-completion history.
- Export backs up current in-memory workspace plus original raw keys. Restore validates before merging; existing notes/settings win. Unique attempts/activity are added. Incoming old keys are archived inside the workspace rather than overwriting local keys. Restored assessments need explicit evidence re-review.
- Invalid current workspace data opens recovery mode without clearing anything.
- No public hash-report payload automatically writes localStorage. Notes and imported text are escaped.

## PWA

Relative URLs, manifest scope and service worker are designed for the repository subpath. After a successful online load and service-worker installation, the full app shell, syllabus, notes and record updates work offline. External source links require a connection. This is local persistence, not cloud sync; browser storage can still be cleared or evicted. Keep exports when moving devices.

Install through the browser app-install menu; on iPhone use Share → Add to Home Screen. Available updates are offered explicitly rather than activating over open work. Save any open notes before applying an update. Bump the shell cache version **and** the matching HTML asset query versions when changing app assets. Personal data is never kept in service-worker caches.

## Development and checks

No build step or runtime dependencies. Serve this directory over localhost (or use GitHub Pages); service workers need HTTPS or localhost.

```sh
node --test tests/core.test.cjs
node tests/assets.test.cjs
```

Browser tests use Playwright and an isolated temporary browser profile. Install Playwright and its Chromium browser in your development environment, then:

```sh
node tests/browser.cjs
```

`CHROME_PATH` can select an existing Chrome executable. `PLAYWRIGHT_MODULE` can point to an installed Playwright module. Browser fixtures are explicitly synthetic and are never deployed as user assessment results. Tests cover scope isolation, retakes, no false completion, legacy preservation, notes, child skills, backup recovery, 320/390/768/1440px layouts, mobile navigation, PWA manifest and offline reload/editing.

The `Validate workspace` workflow runs dependency-free rules and shell-asset checks. GitHub Pages continues deploying the root of `main` through its existing configuration.
