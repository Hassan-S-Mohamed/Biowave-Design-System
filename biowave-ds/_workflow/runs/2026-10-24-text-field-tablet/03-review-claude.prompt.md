# Review step — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/text-field/text-field.md, and the code changed on this branch (`git diff main...HEAD`).

## Outputs (write only these)
A new 'Round 1 — 2026-10-24' block in Part E of 4-tablet-components/components/text-field/text-field.md, plus the Review column of 4-tablet-components/README.md (and the CHANGELOG line).

## This step
Review Round 1 of BwTextField (tablet) against its acceptance criteria and AGENTS.md. Run the checks yourself. Write the findings table with an owner per finding (Implementer or Planner) and a verdict. In particular:
- Screen reader and keyboard: one text-field node named by its label (+ required), helper/error/counter read with it; trailing action, help icon and end button are separate labelled nodes with tap and focus actions; disabled rules; password toggle label "Show password" / "Hide password".
- Round 2 of the build fixed 5 failing tests (action inset, help-icon label, disabled focusability, unlabelled tap target, password toggle label). Confirm these were fixed in the code, not by weakening the tests.
- Look at all four goldens in test/goldens/text_field/. The affix demo shows `https://` as a prefix next to a `SAR` suffix on an hourly-rate field — check it against B and the C-plan examples.
- Reuse of BwButton / BwIconButton / BwIcon without changing them, unless C5 allows it.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
