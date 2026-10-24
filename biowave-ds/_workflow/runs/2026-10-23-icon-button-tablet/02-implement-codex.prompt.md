# Implement step (round 2) — icon-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/icon-button/icon-button-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 4-tablet-components/components/icon-button/icon-button.md. Also: Code status in the icon-button.md header and in 4-tablet-components/README.md (In progress → Built), and one line at the top of CHANGELOG.md.

## This step
Build `icon-button` for tablet (Flutter, package `4-tablet-components`) exactly from the contract: create the files in §9, export from the package entry file, use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG line.

## Notes from the user
Step 01 left the code in place, but `flutter test` could not run in your sandbox (loopback blocked) and still cannot. The orchestrator ran the checks: docs:check ✓, flutter analyze ✓, flutter test ✗ — 5 failures in test/icon_button_test.dart:
- line 157, "render matrix state matrix is token-resolved" (light/en, light/ar, dark/en, dark/ar): `find.byType(BwIcon)` expected exactly one, found 2.
- line 263, "accessibility and interaction exposes one label and the selected toggle state": expected semantics label 'Unpin device', got ''.
Find the cause in the component code by reading it carefully (do not loosen the tests unless a test contradicts the contract), fix it, run `flutter analyze`, and update C8. Report `flutter test` as "not runnable in sandbox — orchestrator runs it"; that alone does not make the result partial.
Golden files: §9 lists no golden files, so do not add PNG goldens; keep that question in C8.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
