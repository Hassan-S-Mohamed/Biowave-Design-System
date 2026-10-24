# Plan step — split-button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
5-mobile-components/README.md, every Part of 5-mobile-components/components/split-button/split-button.md, and _templates/README.md. For consistency only (read, never write): the tablet plan 2.1 at /Users/hassansaid/Downloads/Biowave Design System-split-button-tablet/biowave-ds/4-tablet-components/components/split-button/split-button.md (B2 menu tokens + elevation-3 mapping, B3 item states, B4 motion, C3 internal-parameters table, C5) and its built helper in 4-tablet-components/lib/src/components/button/bw_button_style.dart.

## Outputs (write only these)
Parts A–D and F of 5-mobile-components/components/split-button/split-button.md (and its tokens.json only if needed). Part A must stay identical across platforms (rule 10). Plus plan status in the header and README row, and a CHANGELOG entry.

## This step
Fix the Planner-owned findings of Review Round 1 (Part E): #2, #4, #5, #7, #8, #9, #10. Mirror tablet plan 2.1 so both platforms share one API:
- #2 / #7: C3 internal-parameters table and C5 lines for bw_button.dart (`segment`), bw_icon_button.dart (the internal params the mobile build needs, e.g. `segment`, `focusNode`, `expanded`, `iconChild` — or narrow the approach), and bw_button_style.dart (shared helper). Use the SAME names as tablet: `enum BwButtonSegment { start, end }` in the same file as tablet and `BwButtonStyle.segmentBorderRadius(dimensions, segment)`. All `@internal`, hidden from the package export, defaults = today's behaviour. A later Text field (mobile) build will reuse this API unchanged.
- #4: B2 says how `elevation-3` maps (decorated surface, transparent MenuStyle, Clip.none, as tablet); list every menu token; B4 notes the menu has no fade/scale if that is the decision.
- #5: add `5-mobile-components/test/goldens/split_button/ new (generated goldens)` to C5.
- #8: C3 chevron timing "per B4" (open md, close sm).
- #9: B6 states whether menu arrows wrap (tablet build wraps).
- #10: header Source code → lib/src/components/split_button/bw_split_button.dart.
Do not touch Implementer findings. Bump the plan version, set Plan back to `Finished`, run the afterPlan commands.

## Notes from the user
Approved: mirror tablet plan 2.1 and its API names.

## Checks to run
- npm run contract -- mobile split-button
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
