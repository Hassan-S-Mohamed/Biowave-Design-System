# Plan step (C5 addition) — split-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
C3 and C5 of 4-tablet-components/components/split-button/split-button.md.

## Outputs (write only these)
C5 (and C3 if needed) of 4-tablet-components/components/split-button/split-button.md, F2 row, a CHANGELOG entry; regenerated contracts.

## This step
The user approved review finding #9: add one C5 line `4-tablet-components/lib/src/components/button/bw_button_style.dart  change: shared segment radius helper (internal, used by BwButton and BwIconButton)` and mention it in the C3 internal-parameters table if it fits. Nothing else. Keep Plan `Finished` (plan version 2.1), then run the afterPlan commands.

## Notes from the user
Finding #9 → yes, add bw_button_style.dart to C5.

## Checks to run
- npm run contract -- tablet split-button
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
