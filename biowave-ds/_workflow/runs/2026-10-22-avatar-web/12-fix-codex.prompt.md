# Fix step — avatar / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds (git worktree on branch `ds/avatar-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/avatar/avatar.md (Round 1 — 2026-10-24, with the Planner response for plan 1.1), and 3-web-components/components/avatar/avatar-contract.md (plan 1.1, incl. the "Fix round 1 — Executor task list").

## Outputs (write only these)
`Avatar.tsx`, `useImageLoaded.ts`, `Avatar.test.tsx` in 3-web-components/src/components/avatar/, a "Fix round 1" entry in C8 of 3-web-components/components/avatar/avatar.md (and its header Code field), the web README row, one CHANGELOG.md entry. Code status → Built when done.

## This step
Do the contract's "Fix round 1 — Executor task list" (AC-8 … AC-10): render the real `img` lazily (`loading="lazy"`, `decoding="async"`, `alt=""`, hidden with `visibility` until its own `load`, removed on `error`, never `display: none`; container `position: relative`), `useImageLoaded(src)` returning `{ status, onLoad, onError }` that ignores stale events and handles already-complete images, no `new Image()` probe and no MUI `src` / `slotProps.img`; tests fire `load` / `error` on the rendered `img` (no `window.Image` stub); the RTL test asserts the badge's resolved direction and inline-end / block-start insets in `ar` and `en`. Default timeouts; do not edit `src/test/*`, `vitest.config.ts`, Badge or other components.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.
