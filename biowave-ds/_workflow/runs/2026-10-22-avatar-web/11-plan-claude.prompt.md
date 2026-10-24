# Plan step — avatar (web, tablet, mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds (git worktree on branch `ds/avatar-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The three section READMEs, every Part of `{3-web,4-tablet,5-mobile}-components/components/avatar/avatar.md` (latest Part E round = web Round 1, 2026-10-24), _templates/README.md, 2-foundations/dist/tokens.json.

## Outputs (write only these)
Parts A–D and F of the three avatar.md files (Part A identical on all three except A8), the regenerated contracts and docs pages, the README rows (Plan back to Finished), one CHANGELOG.md entry.

## This step
Plan 1.0 → 1.1 answering the Planner-owned nits of web Review Round 1:
- **#1** B2 asks for `loading="lazy"` on the `img`, but C3's `new Image()` probe fetches every photo at once, so lazy loading never applies. Pick one consistent rule (e.g. render the real `img` with `loading="lazy"` and track its own `load`/`error` events instead of a probe, keeping the initials until it has loaded; or drop lazy loading and say why) and update B2, C3, B9/C6 and C7. Check whether tablet/mobile (`Image` widgets) need a matching note.
- **#2** web header Source code → `src/components/avatar/` (built).
- Add a C7 "Fix round 1 — Executor task list" for any code change this causes, plus the reviewer's Executor nit #3 (the RTL test must assert the badge is on the top-start corner, not only that insets are non-empty).
Bump the version (minor), add Part F entries, set Plan back to Finished (header + README), regenerate all three contracts (`npm run contract` works again — the library index is fresh on `main`).

## Notes from the user
User chose "Plan 1.1, small fix, then merge".

## Checks to run
- npm run component-tokens
- npm run contract -- web avatar && npm run contract -- tablet avatar && npm run contract -- mobile avatar
- npm run docs:build && npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
