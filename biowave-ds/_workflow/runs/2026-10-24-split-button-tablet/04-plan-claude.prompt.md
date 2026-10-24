# Plan step — split-button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/README.md, every Part of 4-tablet-components/components/split-button/split-button.md, and _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 4-tablet-components/components/split-button/split-button.md and 4-tablet-components/components/split-button/split-button.tokens.json. Part A is identical in the web, tablet and mobile files (AGENTS.md rule 10) — do not change Part A unless a finding needs it (if it does, change all three files). Plus the plan status in the header and README row, and a CHANGELOG entry.

## This step
Fix the Planner-owned findings of Review Round 1 (Part E):
- #4 🟡 Record in C3/C5 the internal BwIconButton parameters the split button needs (`segment` plus `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded`) — or narrow the approach so fewer are needed — so the contract authorises exactly what the build may change in bw_icon_button.dart / bw_button.dart.
- #5 🟡 Say how `elevation-3` maps on tablet for the menu (MenuStyle cannot take List<BoxShadow>: e.g. a decorated menu surface, or the M3 elevation + shadow colour tokens) and list every menu token in C4 / §4.1. No token gaps.
- #7 🟡 Add `4-tablet-components/test/goldens/split_button/ new (generated goldens)` to C5.
- #8 🟢 Header "Source code" → `lib/src/components/split_button/bw_split_button.dart`.
Do not touch Implementer findings. Bump the plan version, set Plan back to `Finished`, then run the afterPlan commands.

## Notes from the user
none

## Checks to run
- npm run contract -- tablet split-button
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
