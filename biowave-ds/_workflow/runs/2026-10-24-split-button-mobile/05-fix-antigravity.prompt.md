# Fix step — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/split-button/split-button.md (Round 1 — 2026-10-24), and 5-mobile-components/components/split-button/split-button-contract.md (plan 2).

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 (never D11) of 5-mobile-components/components/split-button/split-button.md, Code → Built in the header and 5-mobile-components/README.md, and one CHANGELOG.md entry at the top in the standard shape. Never edit Part E.

## This step
Fix Review Round 1 Implementer findings and apply plan 2:
- #1 🟡 Tab / Shift+Tab close the menu; add a test.
- #3 🟡 every internal parameter and `BwButtonSegment` is `@internal` and hidden from lib/biowave_mobile.dart (`hide BwButtonSegment` on the button export); list any deviation honestly in C8.
- #6 🟡 chevron half turn is a named `0.5` constant (C3); spacing tokens only for spacing.
- #7 🟡 one shared `BwButtonStyle.segmentBorderRadius(dimensions, segment)` in bw_button_style.dart used by BwButton and BwIconButton (no copies).
- Plan 2 C3: rework BwIconButton's internal parameters to exactly the C3 table (`segment`, `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` for semantics only) — remove `iconChild` and the expanded-driven pressed state. Existing button and icon-button tests must stay unchanged and pass.
- Plan 2 B2/B3/B4/B6: decorated menu surface with `elevation-3` (transparent MenuStyle, Clip.none), item-state tokens, chevron md open / sm close, menu `animated: !context.bw.reduceMotion`, arrows wrap.
- Goldens under test/goldens/split_button/ (now in C5): regenerate with `flutter test --update-goldens test/split_button_test.dart` and look at each PNG.

## Notes from the user
Approved: mirror tablet. Run every check yourself until all pass.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
