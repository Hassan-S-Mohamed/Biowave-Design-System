# Review step — button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-tablet/biowave-ds (a git worktree on `ds/button-tablet`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/button/button.md, and the code changed on this branch since Round 1 (C8 "Fix round 1" entry lists the files; `git diff 593e7d4..HEAD -- 4-tablet-components/lib 4-tablet-components/test`).

## Outputs (write only these)
A new 'Round 2 — 2026-10-20' block in Part E of 4-tablet-components/components/button/button.md (and the E1 summary row), plus the Review column of 4-tablet-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 2. Close or re-open every Round 1 finding (#1–#9) against the Planner response, plan 1.1 (C3, C5, B9) and the C8 Fix round 1 entry, with file:line evidence. Check AC-1 … AC-10. Verify, do not assume: the focus ring sits outside the visible container with a `focusOffset` gap for every size in LTR and RTL and takes no layout space; the goldens now render real Inter / IBM Plex Sans Arabic / Material Symbols glyphs (open the 4 PNGs in `test/goldens/button/`); `loading` with `onPressed: null` stays disabled. Also look at the dark goldens: say whether filled neutral is visible against the dark page background, and whether that matches B3 tokens. Verdict: Approved or Changes requested.

## Notes from the user
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale; fixed on `ds/button-web`, PR #1, not merged). Not findings.
- Test fonts under `test/fonts/` (Inter, IBM Plex Sans Arabic, OFL) are intended by plan 1.1 C5.

## Checks to run
cd 4-tablet-components && flutter analyze && flutter test · npm run component-tokens · npm run sync · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
