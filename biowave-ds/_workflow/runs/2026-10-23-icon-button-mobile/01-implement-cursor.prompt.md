# Implement step — icon-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
5-mobile-components/components/icon-button/icon-button-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 5-mobile-components/components/icon-button/icon-button.md. Also: Code status in the icon-button.md header and in 5-mobile-components/README.md (In progress → Built), and one line at the top of CHANGELOG.md.

## This step
Build `icon-button` for mobile (Flutter, package `5-mobile-components`) exactly from the contract: create the files in §9, export from the package entry file, use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG line.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
