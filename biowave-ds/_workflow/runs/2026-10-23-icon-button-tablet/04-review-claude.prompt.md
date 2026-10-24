# Review step — icon-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/icon-button/icon-button.md, and the code changed on this branch (`git diff main...HEAD`).

## Outputs (write only these)
A new 'Round 1 — 2026-10-23' block in Part E of 4-tablet-components/components/icon-button/icon-button.md, plus the Review column of 4-tablet-components/README.md (and the CHANGELOG line).

## This step
Review Round 1 of BwIconButton (tablet) against its acceptance criteria and AGENTS.md. Run the checks yourself. Write the findings table with an owner per finding (Implementer or Planner) and a verdict.
Also answer the open question from C8: contract §10 asks for PNG goldens but §9 lists no golden files — decide whether that is a Planner finding.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
