# Fix step (round 3, approved exception) — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 4-tablet-components/components/text-field/text-field.md (Round 3 — 2026-10-24), and 4-tablet-components/components/text-field/text-field-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 3' entry in C8 (never D11) of 4-tablet-components/components/text-field/text-field.md, Code → Built in the header and 4-tablet-components/README.md, and one CHANGELOG.md entry. Never edit Part E.

## This step
Fix Review Round 3 findings:
- #13 🟡 + #17 🟡 (same code): replace the pointer-up handler and the `MouseRegion`-wrapped hit area. The md field's 48 dp target must receive REAL taps in the 4 dp band above and below the outline (hit area outside any box that drops touches outside its own size), and only a real tap (a `TapGestureRecognizer` / `GestureDetector` limited to that band) focuses the field. Tests: `tapAt` 3 dp above and below an md outline focuses the field; 3 dp outside an lg outline does not; a scroll drag in a ListView that starts on a field leaves it unfocused; tapping the password toggle does not focus the field.
- #16 🟡 rebuild when the FormField error changes (validate and reset), no post-frame copy. Test: a validator error gives the counter and add-on border the B3 error tokens; reset() returns them to default.
- #15 🟢 the spinner test must fail for a spinner drawn into a layer that is not in the shown layer tree (walk up to the root layer), or add a loading end-button golden.
- #18 🟢 no `fontSize ?? BwSize.iconSm` fallbacks (bw_field_action.dart:47, bw_text_field_decoration.dart:602): use `!` or an assert.
Change nothing else; do not touch shared button / icon-button / split-button files.

## Notes from the user
The user allowed this one extra fix round beyond the limit. Order of work: 1) code + tests (+ goldens if they change, look at each PNG), run checks until all pass; 2) THEN write C8 Fix round 3, Code → Built, CHANGELOG entry; 3) end with the Handoff block. Do not stop between 1 and 2.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
