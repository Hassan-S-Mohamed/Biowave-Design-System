# Implement step (continue after Codex time-out) — icon-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
5-mobile-components/components/icon-button/icon-button-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 5-mobile-components/components/icon-button/icon-button.md. Also: Code status in the icon-button.md header and in 5-mobile-components/README.md (In progress → Built), and one line at the top of CHANGELOG.md.

## This step
Build `icon-button` for mobile (Flutter, package `5-mobile-components`) exactly from the contract: create the files in §9, export from the package entry file, use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG line.

## Notes from the user
Step 02 (Codex) hit the 45-minute limit without a Handoff. Its partial work is in the tree — read it, keep what matches the contract, finish the rest. Orchestrator check run: docs:check ✓, flutter analyze ✓, flutter test ✗ — 7 failures in test/icon_button_test.dart, and the full test run took ~10 minutes (look for a hang or a missing pump timeout). Failing tests include:
- "component source contains no raw visual values"
- "golden render matrices {light,dark} {en,ar} variants, states, sizes" (goldens missing or mismatched; generate with `flutter test --update-goldens` only for the files §9 allows, and check them by eye)
Fix the cause in the code (do not loosen tests unless a test contradicts the contract). Run every check yourself until all pass. Also add the missing CHANGELOG.md line and fill C8, Code → Built.
Heads-up from the tablet Icon button review: its first build put `excludeSemantics: true` on the outer Semantics with no `onTap`, so screen readers could not activate the button. Make sure the mobile button exposes one labelled node that carries the tap action, as the contract's accessibility criteria require.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
