# Review step — split-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/split-button/split-button.md, and the code changed on this branch (`git diff main...HEAD`).

## Outputs (write only these)
A new 'Round 1 — 2026-10-24' block in Part E of 4-tablet-components/components/split-button/split-button.md, plus the Review column of 4-tablet-components/README.md (and the CHANGELOG line).

## This step
Review Round 1 of BwSplitButton (tablet) against its acceptance criteria and AGENTS.md. Run the checks yourself. Write the findings table with an owner per finding (Implementer or Planner) and a verdict. In particular:
- The build changed approved BwButton and BwIconButton to add the internal `segment` parameter the contract names — confirm it only changes BorderRadiusDirectional and does not alter their existing behaviour, semantics or tests.
- Round 2 of the build fixed a part-gap test (expected 2.0, got -174.4) and a menu-width test (170 < 227.7). Confirm these were fixed in the code, not by weakening the tests.
- Screen-reader and keyboard: one labelled node per part with tap and focus actions; menu opens/closes by keyboard and returns focus to the trigger.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
