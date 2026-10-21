# Fix step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/button-group/button-group.md (Round 2 — 2026-10-21), and 3-web-components/components/button-group/button-group-contract.md (plan 1.2, incl. the "Fix round 2 — Executor task list").

## Outputs (write only these)
The files in contract §9 (`ButtonGroup.tsx`, `ButtonGroup.test.tsx`), plus a "Fix round 2" entry in C8 of 3-web-components/components/button-group/button-group.md. One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Do the contract's "Fix round 2 — Executor task list" (AC-12 … AC-14): **#12** vertical orientation ignores `align` — `fill` never sets `flex: 1 1 0` on children in vertical; test vertical + `align="fill"` with non-zero heights; **#13** the B1 "Overflow counting" rule exactly as the contract states (always-visible children — `filled` primary, `href`, `type="submit"`, non-Button/IconButton — use slots first; the rest fill what's left, least important first into the menu; dev warning only when always-visible alone exceed `maxVisible`; trigger takes no slot and shows only when the menu has items), with the B9/C6 tests, and update the 1.1 href/submit test to match; **#14** assert `fill` from the rendered style, not the source text. Default timeouts only; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
none. This is the last fix round allowed.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (run it 3 times; report passed/total and duration of each)

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.
