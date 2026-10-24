# Review step (Round 2) — text-field / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/text-field/text-field.md, and the code changed on this branch (`git diff main...HEAD` — main now includes Split button mobile #18).

## Outputs (write only these)
A new 'Round 2 — 2026-10-24' block in Part E of 5-mobile-components/components/text-field/text-field.md, plus the Review column of 5-mobile-components/README.md (and the CHANGELOG line).

## This step
Review Round 2 of BwTextField (mobile): close or keep each Round 1 finding (#1–#10) against Fix round 1 in C8 and plan 1.2, look for new problems, run the checks and give a verdict. Re-probe the 🔴: exactly one text-field semantics node with name (+ required), value, helper/error/counter and tap/focus. Also probe everything the Tablet text field reviews found, so mobile does not repeat them: Form.validate() false while an error shows; Form.reset() clears error text, border and semantic error; affix text never hintText and never read twice; md/lg layout height = control height and label gap = `BwSpacing.sm` with the 48 dp tap target; no tokens as math constants; loading end button paints its spinner and the test would catch an unpainted one. Confirm the end button uses the existing BwButtonSegment / segmentBorderRadius unchanged, no shared button / icon-button / split-button file changed, and lib/biowave_mobile.dart differs from main only by the export line. Look at the four goldens.

## Notes from the user
none

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
