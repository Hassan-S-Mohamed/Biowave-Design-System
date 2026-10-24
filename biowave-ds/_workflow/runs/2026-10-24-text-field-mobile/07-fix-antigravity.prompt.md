# Fix step (finish bookkeeping) — text-field / mobile

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
Step 06 (you) finished the code, tests and goldens but stopped before the Handoff. Orchestrator check run: docs:check ✓, flutter analyze ✓ (no issues), flutter test ✓ 177/177. Do NOT change code, tests or goldens unless a check fails.
Still missing — do only this:
1. A 'Fix round 1' entry in C8 (never D11) of 5-mobile-components/components/text-field/text-field.md: for each Round 1 finding #1–#5, #9, #10 and each plan-1.2 item (end-button segment, placeholder, motion, C6 tests) say what changed in which file:line and which test proves it; list deviations honestly.
2. Code → `Built` in the text-field.md header and the 5-mobile-components/README.md row.
3. One CHANGELOG.md entry at the top in the standard shape.
Then run the checks once and end with the Handoff block.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
