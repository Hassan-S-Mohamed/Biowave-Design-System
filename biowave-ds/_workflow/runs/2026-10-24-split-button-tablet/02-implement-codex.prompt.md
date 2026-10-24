# Implement step (round 2) — split-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/split-button/split-button-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 4-tablet-components/components/split-button/split-button.md. Also: Code status in the split-button.md header and in 4-tablet-components/README.md (In progress → Built), and one entry at the top of CHANGELOG.md in the standard `## [...] — date` / `### Added` shape.

## This step
Build `split-button` for tablet (Flutter, package `4-tablet-components`) exactly from the contract: create the files in §9, export from the package entry file (keep the export list alphabetical, do not reformat anything else), use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`. BwButton, BwIcon and BwIconButton are already built and approved in this package — reuse them; change them only where the contract says so (the internal `segment` parameter), and list that change in C8.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG entry. Write your execution log only in C8 (never D11, which belongs to the Figma Agent).

Accessibility lessons from Icon button review: every interactive part must expose one labelled semantics node that carries the tap action and focus state/action (screen readers and keyboard), and tests must prove it (`tester.semantics.tap`, isFocused after Tab).

## Notes from the user
Step 01 code is in the tree. The orchestrator ran the checks: docs:check ✓, flutter analyze ✓, flutter test ✗ — 7 failures:
1. test/no_legacy_icons_test.dart "library code never uses Flutter Material Icons": `lib/src/components/split_button/bw_split_button.dart:202` uses `Icons.expand_more_rounded`. Use `Symbols.expand_more_rounded` (via BwIcon / BwIconButton), never `Icons.*`.
2. Several split_button tests: "A SemanticsHandle was active at the end of the test." — `addTearDown(semantics.dispose)` runs too late; call `semantics.dispose()` at the end of each test body (same fix as Icon button tablet).
3. test/split_button_test.dart:168 (part gap): expected 2.0, got -174.40 — the gap between primary and trigger is measured on the wrong edges for one text direction, or the parts are laid out in the wrong order. Check against B2 (gap `BwSpacing.xxs`, trigger at the end) and fix the code or the measurement, whichever contradicts the contract.
4. test/split_button_test.dart:314 (menu width): menu option width 170.02 < container width 227.66. Check B2's menu min-width rule and fix the MenuStyle.
Fix in code (do not loosen tests unless a test contradicts the contract). Your sandbox still cannot run flutter test — report it as "orchestrator runs it". Update C8.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
