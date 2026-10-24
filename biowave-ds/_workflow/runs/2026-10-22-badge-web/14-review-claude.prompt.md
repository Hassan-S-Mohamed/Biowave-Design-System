# Review step — badge / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/badge/badge.md (plan 1.1), and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`; fix round 1 is the latest commit).

## Outputs (write only these)
A new 'Round 2 — <today's date>' block in Part E of 3-web-components/components/badge/badge.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 2: check plan 1.1's AC-8 … AC-11 — measure in a real (headless) browser the light and dark `count` × `warning` fill (≥ 3:1 against the surface) and its text, that a hidden standalone badge takes no space after its exit (and instantly under reduced motion, and from first paint), the removed unreachable icon token, and that the three rewritten tests now check behaviour. Confirm Round 1's measurements still hold and nothing new broke.

## Notes from the user
none. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
