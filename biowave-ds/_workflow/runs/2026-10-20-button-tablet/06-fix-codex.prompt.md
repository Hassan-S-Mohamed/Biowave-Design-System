# Fix step — button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-tablet/biowave-ds (a git worktree on `ds/button-tablet`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 4-tablet-components/components/button/button.md (E2 Round 1 — 2026-10-20, and its Planner response), and 4-tablet-components/components/button/button-contract.md (regenerated from plan 1.1).

## Outputs (write only these)
The files in contract §9 (incl. `test/flutter_test_config.dart`, `test/fonts/` with the licence files, and the regenerated `test/goldens/button/`), plus a 'Fix round 1' entry in C8 of 4-tablet-components/components/button/button.md, and one CHANGELOG.md line.

## This step
Fix Review Round 1 findings #1–#9 — the "Fix round 1 — Executor task list" under C7 (AC-1 … AC-10):
- #1 focus ring painted outside the visible container via `ButtonStyle.backgroundBuilder` + `Stack(clipBehavior: Clip.none)`, no `Padding`, layout unchanged; ring-rect vs container-rect test per size in LTR and RTL.
- #2 `loading` never enables a button whose `onPressed` is null (+ test).
- #3 ring appears instantly (no fade) (+ assertion).
- #4 tests measure the container with `tester.getSize`, growth at text scale 2, ring colour/width/offset, full-width container width.
- #5 `pumpBw`: Arabic Material localizations, supportedLocales en/ar, `reduceMotion` flag.
- #6 `test/flutter_test_config.dart` loading Inter, IBM Plex Sans Arabic (static TTFs committed under `test/fonts/` with SIL OFL licences) and Material Symbols Rounded from `material_symbols_icons`; regenerate the 4 goldens on this Mac with `flutter test --update-goldens`, then run again without it.
- #7 `BwFocusRing` takes a caller key and a border radius.
- #8 tap-target and contrast tests in dark too.
- #9 header "Source code" links `lib/src/components/button/`.
Keep Code `Built`. Do not touch web, mobile or any `*-contract.md`.

## Notes from the user
- A previous attempt (Cursor) stopped on a usage limit after downloading the test fonts. `4-tablet-components/test/fonts/` already holds Inter and IBM Plex Sans Arabic 400/500/600 static TTFs plus `OFL-Inter.txt` and `OFL-IBMPlexSansArabic.txt` (verified as real TrueType files). Use them; do not download again unless one is missing or wrong. Nothing else was changed.
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale; fixed on `ds/button-web`, PR #1, not merged). Do not regenerate them; docs:check passes if those 2 are the only errors.
- node_modules in this worktree are symlinks to the main checkout; that is intended.

## Checks to run
cd 4-tablet-components && flutter analyze && flutter test · npm run component-tokens · npm run sync · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
