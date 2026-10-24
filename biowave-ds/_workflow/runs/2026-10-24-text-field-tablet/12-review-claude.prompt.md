# Review step (Round 4) — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/text-field/text-field.md, and the code changed on this branch (`git diff main...HEAD`; Fix round 3 is the latest code commit).

## Outputs (write only these)
A new 'Round 4 — 2026-10-24' block in Part E of 4-tablet-components/components/text-field/text-field.md, plus the Review column of 4-tablet-components/README.md (and the CHANGELOG line).

## This step
Review Round 4 of BwTextField (tablet): close or keep Round 3 findings #13, #15, #16, #17, #18 against Fix round 3 in C8. Re-probe with real `tapAt` points: 3 dp above and below an md outline focuses the field, 3 dp outside an lg outline does not; a scroll drag in a ListView starting on a field leaves it unfocused; tapping the password toggle does not focus the field. Error colours (counter, add-on border) after validate() and after reset(). The spinner test fails for a spinner in a detached layer. Check earlier fixes did not regress, look at the goldens, run the checks and give a verdict. Fix round 3 was an extra round the user allowed beyond the limit; there will be no Fix round 4 without a new user decision.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
