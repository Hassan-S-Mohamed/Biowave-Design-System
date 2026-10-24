# Review step — divider / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-divider-web/biowave-ds (git worktree on branch `ds/divider-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/divider/divider.md (plan 1.1), and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`).

## Outputs (write only these)
A new 'Round 2 — <today's date>' block in Part E of 3-web-components/components/divider/divider.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 2 for divider/web: check that Round 1 findings #1 (unlabelled `component="li"` divider inside a plain `<ul>` renders as one 1 px line — no bullet, no line box — in EN and AR, light and dark; measure in a real browser) and #2 (computed-style label padding test) are fixed, #3 (header) closed by the Planner step, and that Round 1's measurements (line, emphasis colours, insets + RTL, vertical, label, accessibility tree, axe) still hold.

## Notes from the user
User approved: `component="li"` is always aria-hidden. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
