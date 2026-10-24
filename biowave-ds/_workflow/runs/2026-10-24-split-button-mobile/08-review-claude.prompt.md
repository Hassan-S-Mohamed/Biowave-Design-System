# Review step (Round 3) — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/split-button/split-button.md, and the code changed on this branch (`git diff main...HEAD`; Fix round 2 is the latest commit).

## Outputs (write only these)
A new 'Round 3 — 2026-10-24' block in Part E of 5-mobile-components/components/split-button/split-button.md, plus the Review column of 5-mobile-components/README.md (and the CHANGELOG line).

## This step
Review Round 3 of BwSplitButton (mobile): close or keep Round 2 findings #11–#13 against Fix round 2 in C8. Confirm `git diff main -- 5-mobile-components/lib/src/components/button/bw_button_style.dart` adds only `segmentBorderRadius`, re-probe focused+pressed overlay on a standalone BwButton (transparent, as on main), check nothing else regressed, run the checks and give a verdict. This was the last allowed fix round.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
