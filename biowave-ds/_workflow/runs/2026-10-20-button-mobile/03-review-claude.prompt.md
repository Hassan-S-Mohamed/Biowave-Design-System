# Review step — button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-mobile/biowave-ds (a git worktree on `ds/button-mobile`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/button/button.md, and the code changed on this branch (`git diff origin/main...HEAD -- 5-mobile-components`).

## Outputs (write only these)
A new 'Round 1 — 2026-10-20' block in Part E of 5-mobile-components/components/button/button.md (and the E1 summary row), plus the Review column of 5-mobile-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 1 of the first Flutter mobile component. Check every C7 acceptance criterion with file:line evidence. Mobile was built from plan 1.1, which already includes the fixes from tablet Button review round 1 (focus ring outside the visible container via `backgroundBuilder` + `Stack(Clip.none)`, no `Padding`, no fade; real test fonts; `pumpBw` en/ar localizations + `reduceMotion`; `loading` never enables a null `onPressed`; tests that measure with `tester.getSize`). Verify, do not assume:
- the ring sits `focusOffset` outside the visible container for every size in LTR and RTL and takes no layout space (render it yourself in a scratch copy outside the repo). The implementer's retry changed the RTL `sm` geometry test, saying it measured the 48dp touch target instead of the 42.57dp container — confirm the test now measures the right box and the code, not the test, would catch a real regression;
- the 4 goldens in `test/goldens/button/` show real Inter / shaped IBM Plex Sans Arabic / Material Symbols glyphs;
- the golden page background is not the same token as the filled-neutral container (tablet nit #10).
Compare with the merged tablet implementation (`4-tablet-components/lib/src/…`) only to flag needless differences in the shared pieces. Verdict: Approved or Changes requested.

## Notes from the user
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale; fixed on `ds/button-web`, PR #1, not merged). Not findings.

## Checks to run
cd 5-mobile-components && flutter analyze && flutter test · npm run component-tokens · npm run sync · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
