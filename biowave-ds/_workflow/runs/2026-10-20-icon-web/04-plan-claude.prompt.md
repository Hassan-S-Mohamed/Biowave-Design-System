# Plan step — icon / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/icon/icon.md, and _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/icon/icon.md and 3-web-components/components/icon/icon.tokens.json. Part A is identical in the web, tablet and mobile files (AGENTS.md rule 10) — if you change Part A, change all three in this step. Plus a CHANGELOG.md line.

## This step
Resolve the Planner-owned findings of review Round 1 (Part E2): #1 🟡, #2 🟡 and #5 🟢. Do not touch Executor findings #3 and #4 (the fixer handles them).
- #1: add `3-web-components/src/components/button/Button.tsx` and `3-web-components/src/components/icon-button/IconButton.tsx` to the C5 file list; state in B5/C3 that `prepareIcon` treats Icon's `directional` prop exactly like `mirrorInRtl` (strip it from the icon, mark the wrapper once); add the test for the `directional` prop case to B9; note the Icon.tsx JSDoc must match.
- #2: `push_pin` / `expand_more` vs `@material-symbols/font-400` typings. Decide from the repo facts (icons.md, _sync/figma-icons.json, the installed package's type list and font). Prefer names the package lists; if you keep extra names, record them explicitly in B1 with the reason. Never invent glyphs. If the decision needs a visual check you cannot do, write it in the Questions and stop.
- #5: add to B9/C5 extending `src/test/noLegacyIcons.test.ts` so it fails on `material-symbols-rounded` or `@mui/material/Icon` anywhere outside `src/components/icon/` (the "Google Material Symbols only" rule, D-18, enforced for every web component).
Then set Plan to `Finished` (header + README table) and bump the plan version.

## Notes from the user
Goal of the whole run: every icon used in the design system is a Google Material Symbol. Approved at the after-review gate.

## Checks to run
- npm run contract -- web icon
- npm run docs:check (known pre-existing failure: stale tablet/mobile button-group Figma contracts — not this unit; report it, don't fix)

Do not commit, push or switch branches. End with the Handoff block.
