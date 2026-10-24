# Fix step (round 2) — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/split-button/split-button.md (Round 2 — 2026-10-24), and 5-mobile-components/components/split-button/split-button-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 2' entry in C8 (never D11) of 5-mobile-components/components/split-button/split-button.md, Code → Built in the header and 5-mobile-components/README.md, and one CHANGELOG.md entry. Never edit Part E.

## This step
Fix Review Round 2 findings:
- #11 🟡 restore the `main` order in the shared `overlay()` resolver of lib/src/components/button/bw_button_style.dart (focused wins → transparent), so that file differs from `main` only by `segmentBorderRadius` (check with `git diff main -- 5-mobile-components/lib/src/components/button/bw_button_style.dart`). If a split-button test then fails, fix it inside bw_split_button.dart (e.g. its own trigger states), never in the shared style; if that is impossible, write a question for the Planner in C8 and stop.
- #12 🟢 draw the menu-item focus ring once.
- #13 🟢 make `chevronHalfTurn` private (or `@visibleForTesting`) so it is not exported.
This is the last allowed fix round. Change nothing else.

## Notes from the user
none. Run every check yourself until all pass; if goldens change, look at each PNG.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
