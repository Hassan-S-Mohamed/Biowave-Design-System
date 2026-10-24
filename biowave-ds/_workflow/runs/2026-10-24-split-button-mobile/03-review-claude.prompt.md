# Review step — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/split-button/split-button.md, and the code changed on this branch (`git diff main...HEAD`).

## Outputs (write only these)
A new 'Round 1 — 2026-10-24' block in Part E of 5-mobile-components/components/split-button/split-button.md, plus the Review column of 5-mobile-components/README.md (and the CHANGELOG line).

## This step
Review Round 1 of BwSplitButton (mobile) against its acceptance criteria and AGENTS.md. Run the checks yourself. Write the findings table with an owner per finding (Implementer or Planner) and a verdict. The tablet build of this component failed Round 1 on: menu opening beside instead of under the container (LTR + RTL), menu items not reachable by keyboard, Tab not closing the menu, chevron close timing, BwIconButton internal parameters beyond `segment` not in C3/C5, elevation-3 not applied to the menu, goldens not listed in C5, copied radius helper. Probe each of these on mobile. Also check that changes to BwButton / BwIconButton only do what the contract allows, and that existing button / icon-button tests are unchanged.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
