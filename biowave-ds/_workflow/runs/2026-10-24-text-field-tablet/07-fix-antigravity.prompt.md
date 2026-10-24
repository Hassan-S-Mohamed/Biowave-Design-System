# Fix step (round 2) — text-field / tablet

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
none. Run every check yourself until all pass.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
