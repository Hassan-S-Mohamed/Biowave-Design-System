# Review step — icon-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds (main checkout, on branch `ds/icon-button-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/icon-button/icon-button.md, and the code changed on this branch (`git diff main...HEAD -- 3-web-components/src`; the fix round is commit 836dc9f).

## Outputs (write only these)
A new 'Round 2 — 2026-10-21' block in Part E of 3-web-components/components/icon-button/icon-button.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 2: check that every Round 1 finding (#1–#5 Executor, #6/#8 Planner — closed by plan 1.1, #7/#9 nits) is fixed, AC-7 … AC-11 are met with real numbers in C8, and nothing new broke (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, Biowave `Icon` — no `@mui/icons-material`, default test timeouts, no edits to `src/test/*` or other components). Measure tooltip timing/reduced motion and RTL in a real browser where the spec gives numbers, if you can.

## Notes from the user
none. Other test suites may be running on this machine at the same time (two other worktrees); if test:web fails only by timeouts in files this branch does not touch, re-run it once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
