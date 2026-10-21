# Fix step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/.claude/worktrees/button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/button-group/button-group.md (Round 1, 2026-10-21), and 3-web-components/components/button-group/button-group-contract.md (plan 1.1, incl. the "Fix round 1 — Executor task list").

## Outputs (write only these)
The files in contract §9 (ButtonGroup.tsx, ButtonGroup.test.tsx), plus a 'Fix round 1' entry in C8 of button-group.md and one CHANGELOG.md entry.

## This step
Fix Review Round 1 findings #2, #3, #4, #7, #9, #10 and the Executor half of #8, exactly as the contract's fix list says. Precondition: this branch has `ds/button-web` (shared per-test speedy Emotion cache) merged in — use it and remove the raised timeout.

## Notes from the user
Gates pre-approved.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (all green, default timeouts)

Do not commit, push or switch branches. End with the Handoff block.
