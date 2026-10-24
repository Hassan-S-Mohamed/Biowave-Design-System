# Fix step — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 4-tablet-components/components/text-field/text-field.md (Round 1 — 2026-10-24), and 4-tablet-components/components/text-field/text-field-contract.md (plan 1.2).

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 (never D11) of 4-tablet-components/components/text-field/text-field.md, Code → Built in the header and 4-tablet-components/README.md, and one CHANGELOG.md entry at the top in the standard shape. Never edit Part E.

## This step
Fix Review Round 1 Implementer findings, following plan 1.2:
- #1 🔴 pass the validator result through so `FormState.validate()` is false while an error shows; add Form/validator tests.
- #2 🔴 `hintText` comes only from `placeholder`; affixes are described only in the Semantics hint (never visible placeholder, never read twice); add tests.
- #3 🔴 remove `BwFieldEndButtonSquareStart` and all painting-context interception; give the end button square start corners with `BwButton(segment: BwButtonSegment.end)`; add a loading end-button test (spinner paints).
- #6 🟡 affix demo: "Hourly rate" + `SAR` suffix, "Website" + `https://` prefix; regenerate and look at the four goldens.
- #7 🟡 assert Tab skips the disabled field, action and end button; set and assert `helpTapped`; add the tests for #1–#3.
- #8 🟢 one supporting-row start inset for every field; #9 🟢 keep helper text in the label when disabled.
- Plan 1.2 motion: BwFieldLabel / BwFieldAddon / BwFieldSupporting transitions use `BwDuration.sm` + `BwEasing.standard`, `BwDuration.instant` under reduced motion; add the reduced-motion test from C6.

## Notes from the user
`BwButtonSegment` and `BwButtonStyle.segmentBorderRadius(dimensions, segment)` ALREADY EXIST on this branch (merged from Split button, #17): the enum is in lib/src/components/button/bw_button.dart and the helper in bw_button_style.dart. Reuse them unchanged — do not add a second enum or helper and do not edit bw_button.dart / bw_button_style.dart / bw_icon_button.dart / bw_split_button.dart. If plan 1.2 names the helper differently, use the existing one and say so in C8 → Deviations.
Run every check yourself until all pass (`flutter test --update-goldens test/text_field_test.dart` for goldens, then look at each PNG).

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
