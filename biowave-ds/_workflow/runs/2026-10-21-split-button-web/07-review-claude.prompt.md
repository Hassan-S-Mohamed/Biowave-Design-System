# Review step — split-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-web/biowave-ds (git worktree on branch `ds/split-button-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/split-button/split-button.md, and the code changed on this branch (`git diff main...HEAD -- 3-web-components/src`; fix round 2 is the latest commit).

## Outputs (write only these)
A new 'Round 3 — 2026-10-21' block in Part E of 3-web-components/components/split-button/split-button.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 3: check that Round 2 findings #9 (menu fade and scale each use B4's duration and easing tokens, open and close; MUI Grow's 2/3 scale duration and delay gone) and #10 (menu transition zeroed under reduced motion via the `--bw-motion-*` CSS variables) are fixed — measure the computed `transition` of the menu Paper in a real browser for open, close and reduced motion — that #1 (menu side in EN/AR) still holds, and that nothing new broke. Full `test:web` at default timeouts.

## Notes from the user
none. Other test suites may run at the same time in other checkouts; if test:web fails only by timeouts in files this branch does not touch, re-run once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
