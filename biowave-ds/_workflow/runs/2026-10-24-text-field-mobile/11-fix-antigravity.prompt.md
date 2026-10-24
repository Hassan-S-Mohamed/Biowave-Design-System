# Fix step (round 3, approved exception) — text-field / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/text-field/text-field.md (Round 3 — 2026-10-24), and 5-mobile-components/components/text-field/text-field-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 3' entry in C8 (never D11) of 5-mobile-components/components/text-field/text-field.md, Code → Built in the header and 5-mobile-components/README.md, and one CHANGELOG.md entry. Never edit Part E.

## This step
Fix Review Round 3 findings:
- #4 🟡 keep the whole 48 × 48 help area inside BwTextField's own box without changing the layout. Test inside a `ListView` and inside a tight `SizedBox(width: 360)` with NO padding: `tapAt` at corners and edges (centre ± 20, centre + (0, −23)) opens the tooltip and does not focus the field.
- #11 🟡 error colours (outline, divider, counter) come from a value current in the same frame: `widget.errorText` first, otherwise the FormField error after it has built. Remove `_lastKnownErrorText`. Tests: `errorText` on → off → on; focused autovalidate while typing an invalid value; check outline, divider and counter after each step; validate()/reset() still pass.
- #15 🟡 the password show/hide toggle never calls `requestFocus()`; focus stays where it was and the caret is kept. Tests: unfocused field stays unfocused; focused field stays focused.
- #14 🟢 the spinner test must fail for a spinner painted into an orphan layer: assert a `PictureLayer` covering the spinner's global rect is reachable from the root layer (`tester.binding.renderViews.first.debugLayer`), or add a focused golden of a loading end button.
Change nothing else; do not touch shared button / icon-button / split-button files; no raw dp values (named EdgeInsets arguments included).

## Notes from the user
The user allowed this one extra fix round beyond the limit. Order of work: 1) code + tests (+ goldens if they change, look at each PNG), run checks until all pass; 2) THEN write C8 Fix round 3, Code → Built, CHANGELOG entry; 3) end with the Handoff block. Do not stop between 1 and 2.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
