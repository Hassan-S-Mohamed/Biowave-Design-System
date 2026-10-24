# Review step (Round 2) — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/split-button/split-button.md, and the code changed on this branch (`git diff main...HEAD`).

## Outputs (write only these)
A new 'Round 2 — 2026-10-24' block in Part E of 5-mobile-components/components/split-button/split-button.md, plus the Review column of 5-mobile-components/README.md (and the CHANGELOG line).

## This step
Review Round 2 of BwSplitButton (mobile): close or keep each Round 1 finding (#1–#10) against Fix round 1 in C8 and plan 2, look for new problems, run the checks and give a verdict. Re-probe Tab/Shift+Tab closing, menu position (LTR + RTL), keyboard reach, the decorated elevation-3 menu surface and the menu fade under reduced motion. Confirm the BwButton / BwIconButton / bw_button_style.dart changes match C3 exactly (same API names as tablet: BwButtonSegment, segmentBorderRadius), are @internal and hidden from the export, and that existing button / icon-button tests are unchanged. The four goldens in test/goldens/split_button/ show no open-menu state (the tablet goldens do) — check that against B9.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
