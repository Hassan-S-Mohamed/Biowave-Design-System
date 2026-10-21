# Review step — button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-mobile/biowave-ds (a git worktree on `ds/button-mobile`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 5-mobile-components/components/button/button.md, and the code changed since Round 1 (`git diff af0fe5f..HEAD -- 5-mobile-components`; the C8 "Fix round 1" entry lists the files).

## Outputs (write only these)
A new 'Round 2 — 2026-10-21' block in Part E of 5-mobile-components/components/button/button.md (and the E1 summary row), plus the Review column of 5-mobile-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 2. Close or re-open Round 1 findings #1 and #2 with file:line evidence. Verify, do not assume: `BwFocusRing` always returns the same `Stack` so the child's State survives focus changes, and the new test would fail if the ring went back to swapping child ↔ Stack (reason from the code, or check quickly in a scratch copy outside the repo); the ring geometry from Round 1 is unchanged; icon size now comes from one table. Re-check the C7 acceptance criteria only where the diff touches them. Verdict: Approved or Changes requested.

## Notes from the user
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale; fixed on `ds/button-web`, PR #1, not merged). Not findings.
- Earlier review runs were cut off by API errors; keep any probing short and write the round as soon as you have the verdict.

## Checks to run
cd 5-mobile-components && flutter analyze && flutter test · npm run component-tokens · npm run sync · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
