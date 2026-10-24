# Fix step — icon-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 4-tablet-components/components/icon-button/icon-button.md (Round 1 — 2026-10-23), and 4-tablet-components/components/icon-button/icon-button-contract.md (regenerated for plan 1.1).

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 of 4-tablet-components/components/icon-button/icon-button.md, Code status (→ Built) in the header and 4-tablet-components/README.md, and one CHANGELOG.md line. Never edit Part E.

## This step
Fix Review Round 1 findings #1 (🔴) and #3 (🟢), and add the goldens now allowed by finding #2:
- #1: one labelled button node that carries the action — SemanticsAction.tap (and focus) when enabled, none when onPressed is null; label read once; toggled still exposed. Extend the semantics test as the finding says (tap action present/absent, `tester.semantics.tap` fires onPressed, androidTapTargetGuideline and labeledTapTargetGuideline for sm and md).
- #3: keep both children during the AnimatedSwitcher change so the icons cross-fade.
- #2: add the B9 PNG goldens under `test/goldens/icon_button/` with real test fonts.
Findings #4 and #5 were fixed by the Planner.

## Notes from the user
Your sandbox cannot run `flutter test` (loopback blocked), so you cannot run `--update-goldens` either. Write the golden tests with `matchesGoldenFile('goldens/icon_button/<name>.png')` paths and say so in C8; the orchestrator will generate the PNGs with `--update-goldens`, check them and run the suite. Report flutter test as "not runnable in sandbox — orchestrator runs it". Run flutter analyze and docs:check yourself.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
