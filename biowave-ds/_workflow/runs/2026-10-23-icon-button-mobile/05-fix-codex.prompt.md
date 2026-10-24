# Fix step — icon-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/icon-button/icon-button.md (Round 1 — 2026-10-23), and 5-mobile-components/components/icon-button/icon-button-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 of 5-mobile-components/components/icon-button/icon-button.md, Code status (→ Built) in the header and 5-mobile-components/README.md, and one CHANGELOG.md line. Never edit Part E.

## This step
Fix Review Round 1 findings #1 (🟡), #2 and #3 (🟢):
- #1: keep one labelled node (button, toggled, enabled, tap) and also expose the focused state and the focus action, as BwButton B6 does. Label read once. Add the test the finding describes (after Tab: isFocused true, focus action present, exactly one labelled node, tester.semantics.tap calls onPressed once).
- #2: header "Source code" → lib/src/components/icon_button/bw_icon_button.dart.
- #3: revert the unrelated BwMobileTheme reformat in lib/biowave_mobile.dart (keep only the BwIconButton export line).

## Notes from the user
Your sandbox may not be able to run `flutter test` (loopback blocked). If so, report it as "not runnable in sandbox — orchestrator runs it". Run flutter analyze and docs:check yourself.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
