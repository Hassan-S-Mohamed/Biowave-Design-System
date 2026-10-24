# Fix step (Codex usage limit — Antigravity) — split-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 4-tablet-components/components/split-button/split-button.md (Round 1 — 2026-10-24), and 4-tablet-components/components/split-button/split-button-contract.md (regenerated for plan 2.1).

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 of 4-tablet-components/components/split-button/split-button.md (never D11), Code → Built in the header and 4-tablet-components/README.md, and one CHANGELOG.md entry in the standard shape. Never edit Part E.

## This step
Fix Review Round 1 Implementer findings, following plan 2.1:
- #1 🔴 menu end-aligned under the container in LTR and RTL, `BwSpacing.xs` vertical offset; add an LTR + RTL position test.
- #2 🔴 keyboard reaches menu items: on keyboard open focus the first item (ArrowUp: last), arrows move, Enter/Space selects; add a test.
- #3 🟡 Tab / Shift+Tab close the menu; add a test.
- #6 🟡 chevron closes with `BwDuration.sm` (+ accelerate), opens with `md`; test both.
- #9 🟢 move the copied `_borderRadius` into one internal helper in `bw_button_style.dart` used by BwButton and BwIconButton.
- #10 🟢 assert tap + focus on the primary part's semantics node.
Also apply what plan 2 added: the menu tokens and the `elevation-3` mapping (decorated surface, transparent MenuStyle, `Clip.none`), the item-state table, and the B9 goldens under `test/goldens/split_button/`. The internal BwButton / BwIconButton parameters must match C3 exactly.

## Notes from the user
Step 06 (Codex) could not start — usage limit; nothing changed. Run every check yourself until all pass. Generate the goldens with `flutter test --update-goldens test/split_button_test.dart` (real test fonts) and look at every PNG. Keep test/no_legacy_icons_test.dart passing. Finish with C8, status, CHANGELOG and the Handoff block.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
