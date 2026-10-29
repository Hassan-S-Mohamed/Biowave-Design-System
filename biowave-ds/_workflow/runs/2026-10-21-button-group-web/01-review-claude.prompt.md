# Review step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/.claude/worktrees/button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/button-group/button-group.md, and the code of this unit (it is already on `main`, so review the files listed in contract §9 / C8 as they are, plus `git diff main...HEAD` if any).

## Outputs (write only these)
A new 'Round N — 2026-10-21' block in Part E of 3-web-components/components/button-group/button-group.md, the Review column of 3-web-components/README.md (and the header field it mirrors), and one CHANGELOG.md entry.

## This step
First review round for button-group/web against contract §11 acceptance criteria, the §10 test list and AGENTS.md rules (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, Biowave `Icon` per D-18 — no `@mui/icons-material`). Earlier Button reviews found that tests raised their own timeouts; Button now uses the shared per-test speedy Emotion cache with default timeouts — check whether this unit's tests still raise timeouts and flag it.

## Notes from the user
Gates are pre-approved. Report real results only.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).
