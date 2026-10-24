# Fix step (round 2) — text-field / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/text-field/text-field.md (Round 2 — 2026-10-24), and 5-mobile-components/components/text-field/text-field-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 2' entry in C8 (never D11) of 5-mobile-components/components/text-field/text-field.md, Code → Built in the header and 5-mobile-components/README.md, and one CHANGELOG.md entry. Never edit Part E.

## This step
Fix Review Round 2 findings (this is the last allowed fix round):
- #4 🟡 the help icon's 48 × 48 area must receive REAL touches, not only semantics: override hit testing at an ancestor that contains the area (help wins over the 6 dp of outline it overlaps), no extra layout. Test with `tester.tapAt(center ± 20)` that the tooltip opens.
- #11 🟡 every error colour (outline, add-on dividers, counter) comes from the FormField's current error and rebuilds when it changes — after validate() AND after reset(). No post-frame copies. Test with `prefixText` + counter: assert divider, counter and outline colours after validate and after reset.
- #12 🟡 add-on inset follows the current outline width (focused → `widthFocus`, matching inner radius); add focused and error fields with add-ons to the goldens.
- #13 🟢 end button meets the column edge exactly (no 1 dp gap) in en and ar.
- #14 🟢 spinner test asserts the spinner's nearest layer is attached to the shown layer tree; radius test resolves the button shape (square start corners, `BwRadius.md` end corners) in en and ar.
Change nothing else; do not touch shared button / icon-button / split-button files.

## Notes from the user
Lessons from the Tablet text field Round 3 (same bugs found there — avoid them):
- An enlarged hit area must not be inside a `MouseRegion` or any box that drops touches outside its own size — test real `tapAt` points, not only semantics bounds.
- Never focus or act on every pointer-up: use a real tap recognizer, so a scroll drag that starts on the field or a tap on a toggle does not trigger it. Add a test that a scroll drag starting on the field leaves it unfocused.
- No token used as an unrelated fallback (e.g. `fontSize ?? BwSize.iconSm`).
Order of work: 1) code + tests + goldens, run checks until all pass; 2) THEN write C8 Fix round 2, set Code → Built, add the CHANGELOG entry; 3) end with the Handoff block. Do not stop between 1 and 2.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
