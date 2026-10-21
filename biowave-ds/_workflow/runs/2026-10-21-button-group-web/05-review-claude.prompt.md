# Review step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/button-group/button-group.md, and the code changed on this branch (`git diff main...HEAD -- 3-web-components/src`; the fix round is the latest commit).

## Outputs (write only these)
A new 'Round 2 — 2026-10-21' block in Part E of 3-web-components/components/button-group/button-group.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 2: check that every Round 1 finding is fixed (#1 `align` works because the container fills its parent — measure it in a real browser for `end`, `start`, `center`, `space-between`, `fill` in LTR and RTL; #2–#4, #7, #9, #10, #8 Executor half; #5 shared test tooling and #6 stale Figma contracts closed by `main` / plan 1.1; #11 header), AC-7 … AC-11 are met with real numbers in C8, and nothing new broke (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, overflow limit and `href`/submit actions staying visible, default test timeouts, no edits to `src/test/*` or other components).

## Notes from the user
none. Other test suites may be running on this machine at the same time (two other checkouts); if test:web fails only by timeouts in files this branch does not touch, re-run it once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
