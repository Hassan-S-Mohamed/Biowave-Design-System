# Implement step — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
5-mobile-components/components/split-button/split-button-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 5-mobile-components/components/split-button/split-button.md. Also: Code status in the split-button.md header and in 5-mobile-components/README.md (In progress → Built), and one entry at the top of CHANGELOG.md in the standard `## [...] — date` / `### Added` shape.

## This step
Build `split-button` for mobile (Flutter, package `5-mobile-components`) exactly from the contract: create the files in §9, export from the package entry file (keep the export list alphabetical, do not reformat anything else), use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`. BwButton, BwIcon and BwIconButton are already built and approved in this package — reuse them; change them only where the contract says so (e.g. an internal parameter it names), and list that change in C8.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG entry. Write your execution log only in C8 (never D11, which belongs to the Figma Agent).

Accessibility lessons from Icon button review: every interactive part must expose one labelled semantics node that carries the tap action and focus state/action (screen readers and keyboard), and tests must prove it (`tester.semantics.tap`, isFocused after Tab).

## Notes from the user
Run every check yourself until all pass. If §9 lists a goldens folder, generate them with `flutter test --update-goldens` and look at each PNG. Keep test/no_legacy_icons_test.dart passing: use Symbols.*_rounded via BwIcon, never Icons.*.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
