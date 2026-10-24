# Fix step (round 2, finish) — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 4-tablet-components/components/text-field/text-field.md (Round 2 — 2026-10-24), and 4-tablet-components/components/text-field/text-field-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 2' entry in C8 (never D11) of 4-tablet-components/components/text-field/text-field.md, Code → Built in the header and 4-tablet-components/README.md, and one CHANGELOG.md entry. Never edit Part E.

## This step
Fix Review Round 2 findings:
- #12 🟡 make the `FormField` the only source of the validator error (drop `_validatorErrorText` and its post-frame setState); test that validate() then reset() removes the error text, the error border and the error from the semantics label.
- #13 🟡 extend the md hit area to 48 dp without adding layout (as `BwFieldTargetBox` does); test label gap == `BwSpacing.sm` and layout height == control height at md and lg, and that the 48 dp tap-target guideline still passes. Regenerate goldens and look at each PNG.
- #14 🟡 no tokens as math constants: `translateByDouble(0, -dy, 0, 1)`, `Offset(0, -dy)` in bw_field_action.dart:274-291; review bw_text_field.dart:629, 638, 820 the same way.
- #15 🟢 the loading end-button test also asserts the spinner is painted (layer attached or golden).
This is the last allowed fix round. Change nothing else; do not touch shared button files.

## Notes from the user
Step 07 (you) made the code, test and golden changes but stopped before finishing. Orchestrator check run: docs:check ✓, flutter test ✓ (text_field_test 36/36), flutter analyze ✗ — 3 issues:
- test/text_field_test.dart:9 unused import of bw_field_label.dart
- test/text_field_test.dart:1492 `layer` used outside a RenderObject subclass (invalid_use_of_protected_member) — assert the spinner is painted another way (e.g. `find.byType(CircularProgressIndicator)` + `tester.renderObject(...).debugNeedsPaint == false` and `attached`, or a golden), without weakening #15
- lib/src/components/text_field/bw_text_field.dart:876 unnecessary getter/setter
Also delete the untracked `4-tablet-components/test/failures/` folder (golden diff output; never committed).
Then: a 'Fix round 2' entry in C8 (never D11) naming #12–#15, what changed in which file:line and the test that proves it; Code → `Built` in the header and README row; one CHANGELOG entry. Change nothing else. Run every check until all pass and end with the Handoff block.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
