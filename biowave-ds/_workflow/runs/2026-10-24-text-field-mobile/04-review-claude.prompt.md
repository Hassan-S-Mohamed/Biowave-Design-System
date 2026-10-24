# Review step — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/text-field/text-field.md, and the code changed on this branch (`git diff main...HEAD`).

## Outputs (write only these)
A new 'Round 1 — 2026-10-24' block in Part E of 5-mobile-components/components/text-field/text-field.md, plus the Review column of 5-mobile-components/README.md (and the CHANGELOG line).

## This step
Review Round 1 of BwTextField (mobile) against its acceptance criteria and AGENTS.md. Run the checks yourself. Write the findings table with an owner per finding (Implementer or Planner) and a verdict. In particular:
- Screen reader and keyboard: one text-field node named by its label (+ required), helper/error/counter read with it; trailing action, help icon and end button are separate labelled nodes with tap and focus actions; disabled rules; password toggle label "Show password" / "Hide password".
- The build was started by Codex (stopped at a usage limit with 22 analyzer errors in the test file) and finished by Antigravity. Confirm the tests were made to compile without weakening what they check.
- Look at all four goldens in test/goldens/text_field/. In dark-ar the help icon sits at the far end of the label row, while tablet places it next to the label — check help-icon placement against B2/B5.
- Reuse of BwButton / BwIconButton / BwIcon without changing them, unless C5 allows it.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
