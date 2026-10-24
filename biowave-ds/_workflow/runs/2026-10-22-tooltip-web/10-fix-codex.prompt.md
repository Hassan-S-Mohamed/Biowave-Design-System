# Fix step — tooltip / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-tooltip-web/biowave-ds (git worktree on branch `ds/tooltip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/tooltip/tooltip.md (Round 1 — 2026-10-24), and 3-web-components/components/tooltip/tooltip-contract.md (plan 1.1, incl. the "Fix round 1 — Executor task list").

## Outputs (write only these)
The files the contract's fix list allows, plus a "Fix round 1" entry in C8 of 3-web-components/components/tooltip/tooltip.md. One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Do the contract's "Fix round 1 — Executor task list" (AC-7 … AC-10): **#1** the `spacing-xs` gap as the tooltip's own margin on the side facing the anchor (popper offset modifier removed; logical margin keyed on the resolved `data-popper-placement`; the value is the CSS-variable string, not a number), with the step-by-step hover test and its negative control and the gap-geometry test; **#2** the described-by copy returns only from `Fade` `onExited`, with the single-id test; **#3** header Source code. Default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.
