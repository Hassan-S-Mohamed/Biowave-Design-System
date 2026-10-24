# Plan step — icon-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/README.md, every Part of 4-tablet-components/components/icon-button/icon-button.md, and _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 4-tablet-components/components/icon-button/icon-button.md and 4-tablet-components/components/icon-button/icon-button.tokens.json. Part A is identical in the web, tablet and mobile files (AGENTS.md rule 10) — do not change Part A unless a finding needs it. Plus the plan status in the header and the README row, and a CHANGELOG line.

## This step
Fix the Planner-owned findings of Review Round 1 (Part E):
- #2 🟡 Add `4-tablet-components/test/goldens/icon_button/ new (generated goldens)` to C5 (as tablet Button's C5 does), so B9's PNG goldens are allowed.
- #4 🟢 Header "Source code" → `lib/src/components/icon_button/bw_icon_button.dart`.
- #5 🟢 C1 "passes C9" → "passes C6 / B9".
Do not touch the Implementer findings (#1, #3). Set Plan back to `Finished`. Then run the afterPlan commands.

## Notes from the user
none

## Checks to run
- npm run contract -- tablet icon-button
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
