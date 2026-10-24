# Fix step — text-field / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/text-field/text-field.md (Round 1 — 2026-10-24), and 5-mobile-components/components/text-field/text-field-contract.md (plan 1.2).

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 (never D11) of 5-mobile-components/components/text-field/text-field.md, Code → Built in the header and 5-mobile-components/README.md, and one CHANGELOG.md entry at the top in the standard shape. Never edit Part E.

## This step
Fix Review Round 1 Implementer findings and apply plan 1.2:
- #1 🔴 exactly one text-field semantics node carrying the name (+ required), value, helper/error/counter and tap/focus actions — remove the extra `Semantics(container: true, textField: true)` wrapper; helper read once.
- #2 🟡 tests: count text-field nodes (exactly one), `matchesSemantics`, full Tab order, tooltip by real tap and Enter/Space.
- #3 🟡 help icon right after the label with `BwSpacing.xs`; #4 🟡 its 48 dp tap area must not add layout (label gap = `BwSpacing.sm`); add a test.
- #5 🟡 prefix/suffix add-ons inside the outline — default, focus and error borders visible around them; golden covers it.
- #9 🟢 restore the original `BwMobileTheme` formatting in lib/biowave_mobile.dart (only export lines may differ from main); #10 🟢 remove the test-only `labelStyle` and use `''` instead of `String.fromCharCodes(const <int>[])`.
- Plan 1.2: end button with square start corners via `BwButton(segment: BwButtonSegment.end)`; `placeholder` → `hintText` only; label/addon/supporting transitions `BwDuration.sm` + `BwEasing.standard`, `BwDuration.instant` under reduced motion; the C6 tests (radius en/ar, loading end button paints its spinner, default button unchanged, reduced motion).

## Notes from the user
`BwButtonSegment` (in lib/src/components/button/bw_button.dart) and `BwButtonStyle.segmentBorderRadius(dimensions, segment)` (in bw_button_style.dart) ALREADY EXIST on this branch (merged from Split button #18). Reuse them unchanged; do not edit any file under button/, icon/, icon_button/, split_button/ or common/, and no painting-context interception or clipping around the button.
Lessons from the Tablet text field reviews — get these right first time:
- `validator`: the FormField is the only source of the error; `Form.validate()` false while an error shows; `Form.reset()` clears error text, error border and semantic error. Test both.
- Affix text is never `hintText` and never read twice; it goes only in the Semantics hint.
- The md size's 48 dp hit area adds no layout; layout height = control height at md and lg.
- No tokens as math constants (`Offset(0, …)`, `translateByDouble(0, dy, 0, 1)`); spacing tokens only for spacing.
- The loading end-button test asserts the spinner is painted, not only present.
- Demo data: "Hourly rate" + `SAR` suffix, "Website" + `https://` prefix.
Run every check yourself until all pass; regenerate goldens with `flutter test --update-goldens test/text_field_test.dart` and look at each PNG.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
