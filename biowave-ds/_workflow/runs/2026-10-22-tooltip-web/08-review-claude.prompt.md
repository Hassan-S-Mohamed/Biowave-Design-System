# Review step — tooltip / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-tooltip-web/biowave-ds (git worktree on branch `ds/tooltip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/tooltip/tooltip.md, and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`).

## Outputs (write only these)
A new 'Round 1 — <today's date>' block in Part E of 3-web-components/components/tooltip/tooltip.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
First review round for tooltip/web against C7, the B9 test list and AGENTS.md rules (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA incl. 1.4.13 — Esc closes, pointer can move onto it, stays until dismissed — tests through `renderWithBiowave` with default timeouts). Measure in a real (headless) browser: hover delay (`motion-duration-2xl`), keyboard focus opens immediately (and mouse-click focus does not), enter/exit durations and easings, reduced motion, max width `size-container-xxs`, offset, padding, colours in both themes, placement top/bottom/start/end incl. RTL swap, and the label vs description accessible-name behaviour.

## Notes from the user
User approved: touch display time = MUI defaults; rich tooltips out of 1.0. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
