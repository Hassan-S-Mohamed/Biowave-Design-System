# Review step — badge / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/badge/badge.md (plan 1.1), and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`; fix round 2 is the latest commit).

## Outputs (write only these)
A new 'Round 3 — <today's date>' block in Part E of 3-web-components/components/badge/badge.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 3: check that Round 2 findings #1 (a standalone badge shown and hidden again within ~1 frame — 0 ms and ~16 ms — collapses and leaves no gap; `transitioncancel` handled) and #2 (anchor-box test asserts no padding/border) are fixed — reproduce #1 in a real (headless) browser the way you found it — and that Round 2's AC-8 … AC-11 measurements still hold and nothing new broke. This was the last fix round allowed.

## Notes from the user
none. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
