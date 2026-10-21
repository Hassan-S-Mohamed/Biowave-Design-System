# Fix step — split-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-web/biowave-ds (git worktree on branch `ds/split-button-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/split-button/split-button.md (Round 2 — 2026-10-21), and 3-web-components/components/split-button/split-button-contract.md.

## Outputs (write only these)
`SplitButtonMenu.tsx` and `SplitButton.test.tsx` in 3-web-components/src/components/split-button/ (other contract §9 files only if a finding truly requires it), plus a "Fix round 2" entry in C8 of 3-web-components/components/split-button/split-button.md. One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Fix Review Round 2 findings (both Executor, 🟡):
- **#9** menu motion (rest of #3): the menu's fade **and** scale each use the B4 tokens — open: `motion-duration-md` + `motion-easing-standard-decelerate`; close: `motion-duration-sm` + `motion-easing-standard-accelerate` (check the exact tokens in the contract's B4). MUI `Grow`'s default 2/3 scale duration and delay must not apply. Add a test per property (opacity and transform) for open and close.
- **#10** reduced motion: drive the menu transition from the `--bw-motion-duration-*` / `--bw-motion-easing-*` CSS variables (not JS numbers), so the reduced-motion rule in tokens.css zeroes them; add a reduced-motion test.
Default timeouts only; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
none. This is the last fix round allowed.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (run it 3 times; report passed/total and duration of each)

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.
