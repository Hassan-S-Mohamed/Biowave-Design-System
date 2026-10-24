# Implement step (round 3) — icon-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/icon-button/icon-button-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 4-tablet-components/components/icon-button/icon-button.md. Also: Code status in the icon-button.md header and in 4-tablet-components/README.md (In progress → Built), and one line at the top of CHANGELOG.md.

## This step
Build `icon-button` for tablet (Flutter, package `4-tablet-components`) exactly from the contract: create the files in §9, export from the package entry file, use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG line.

## Notes from the user
After round 2 the orchestrator ran the checks: docs:check ✓, flutter analyze ✓, flutter test ✗ — 1 failure left, everything else passes.
- test/icon_button_test.dart, "accessibility and interaction exposes one label and the selected toggle state": `A SemanticsHandle was active at the end of the test.` The test calls `tester.ensureSemantics()` and disposes it with `addTearDown(semantics.dispose)`, but Flutter verifies handles before tear-downs run. Call `semantics.dispose()` at the end of the test body instead (check every other test that uses `ensureSemantics` the same way). Change nothing else.
flutter test is still not runnable in your sandbox; report it as "orchestrator runs it". Update C8 with one line for this round.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
