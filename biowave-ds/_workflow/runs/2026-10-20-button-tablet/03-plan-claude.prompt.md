# Plan step — button / tablet (+ the same fix in button / mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/README.md, every Part of 4-tablet-components/components/button/button.md (Review round 1 — 2026-10-20 in Part E), and _templates/README.md. For the mobile part: 5-mobile-components/README.md and every Part of 5-mobile-components/components/button/button.md.

## Outputs (write only these)
Parts A–D and F of 4-tablet-components/components/button/button.md and 4-tablet-components/components/button/button.tokens.json; the same Parts of 5-mobile-components/components/button/button.md and its button.tokens.json. Part A stays identical in the web, tablet and mobile files (AGENTS.md rule 10). One CHANGELOG.md entry.

## This step
Answer the Planner-owned findings of tablet Review Round 1 — 2026-10-20 with a Planner response under that round, the way earlier units did:
- **#1 🔴 Focus ring geometry.** Rewrite C3 (and B6/B9 where needed) so the ring is painted outside the visible container without changing layout (no `Padding` around the button; e.g. a `Stack` with `Clip.none` and a negative inset, or a foreground painter), gap = `BwBorder.focusOffset`, stroke = `widthFocus`, radius = container radius + offset, never around the padded 48dp touch area. `BwFocusRing` (shared, `lib/src/common/bw_focus_ring.dart`) gets a shape/radius parameter and a caller-supplied key (#7). Add a B9 test that compares the ring rect with the container rect per size, and that the unfocused button's size equals its container.
- **#6 🟡 Real fonts in goldens.** Add to C5 and B9 a shared `test/flutter_test_config.dart` that loads the real Latin + Arabic fonts and the Material Symbols font before goldens, so Arabic shaping and icons are visible. Name the font sources from Foundations; no new tokens unless truly needed.
- Fold the Executor findings (#2, #3, #4, #5, #7, #8, #9) into a "Fix round 1 — Executor task list" under C7, like web Button did, so the fix step has one list.

Then apply **the same focus-ring and test-font changes to the mobile Button plan** (5-mobile-components/components/button/button.md, C3/C5/B6/B9 and the shared `pumpBw` needs from #5: Arabic Material localizations + reduce-motion flag). Mobile is not built yet, so no fix list there — just make its plan correct before it is built. Bump the plan version in F of both files, set Plan back to `Finished` in both headers and both README tables, then run the after-plan commands.

## Notes from the user
- Approved at the after-review gate: fix the mobile Button plan in the same pass so mobile is not built with the same bug.
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale; fixed on `ds/button-web`, PR #1, not merged). Do not regenerate button-group here. docs:check passes if those 2 are the only errors.

## Checks to run
npm run contract -- tablet button · npm run contract -- mobile button · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
