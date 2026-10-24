# Review step (Round 3) — text-field / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/text-field/text-field.md, and the code changed on this branch (`git diff main...HEAD`; Fix round 2 is the latest commit).

## Outputs (write only these)
A new 'Round 3 — 2026-10-24' block in Part E of 5-mobile-components/components/text-field/text-field.md, plus the Review column of 5-mobile-components/README.md (and the CHANGELOG line).

## This step
Review Round 3 of BwTextField (mobile): close or keep Round 2 findings #4, #11–#14 against Fix round 2 in C8. Re-probe with real `tapAt` points (not semantics bounds): the help icon's 48 dp area opens the tooltip; and check the regressions Tablet hit in its Round 3 — a scroll drag starting on a field must NOT focus it, tapping the password toggle must not focus the field, and no hit area sits inside a box that drops touches outside its size. Check error colours (outline, add-on dividers, counter) after validate() and after reset(); focus outline width around add-ons; end button flush with the column edge; the spinner test fails for a spinner in a detached layer. Check Round 1 fixes did not regress, look at the four goldens, run the checks and give a verdict. This was the last allowed fix round.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
