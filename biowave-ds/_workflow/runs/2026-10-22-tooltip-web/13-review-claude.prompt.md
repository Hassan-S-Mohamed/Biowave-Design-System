# Review step — tooltip / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-tooltip-web/biowave-ds (git worktree on branch `ds/tooltip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/tooltip/tooltip.md, and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`).

## Outputs (write only these)
A new 'Round 2 — <today's date>' block in Part E of 3-web-components/components/tooltip/tooltip.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 2 for tooltip/web (plan 1.1): check that Round 1 findings #1 (move the pointer slowly from the anchor across the 4 px gap onto the tooltip in a real browser — 1, 2 and 4 px per frame, every placement incl. RTL and flipped — it must stay open; visible gap still `spacing-xs`), #2 (only one element carries the described-by id while closed, entering, open and fading out) and #3 (header) are fixed, AC-7 … AC-10 met, and that Round 1's measurements (timings, keyboard-only focus open, reduced motion, Esc, sizes, colours, names) still hold.

## Notes from the user
User approved: touch display time = MUI defaults; rich tooltips out of 1.0. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
