# Plan step — badge (web, tablet, mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The three section READMEs, every Part of `{3-web,4-tablet,5-mobile}-components/components/badge/badge.md` (latest Part E round = web Round 1, 2026-10-24), _templates/README.md, 2-foundations/dist/tokens.json and the colour/contrast guidelines it links to.

## Outputs (write only these)
Parts A–D and F of the three badge.md files (Part A identical on all three except A8), the regenerated contracts and docs pages, the README rows (Plan back to Finished), one CHANGELOG.md entry.

## This step
Plan 1.0 → 1.1 answering the Planner-owned nits of web Review Round 1:
- **#1** light `count` × `warning`: the indicator measures 2.20:1 against the surface, but B6/A9 require 3:1 for every allowed colour and variant. Resolve it without weakening accessibility: either remove `warning` from `count` (A4.2 already limits warning to count — then warning has no variant left; say what replaces it) or give it a semantic token pair that meets 3:1 in both themes (check `2-foundations/dist/tokens.json`; never a raw value, never a new primitive). Write the reasoning in E2's Planner response and update A4.2 (all three platforms), B3, B6, B9/C6 and D.
- **#2** say in B1/B4 whether a hidden standalone badge keeps its space (decide with the reason; usual expectation: it takes no space).
- **#3** header Source code field (web: `src/components/badge/`, built).
- Add a C7 "Fix round 1 — Executor task list" for any code change this causes, plus the reviewer's Executor nits #4 (unreachable icon token for error/warning) and #5 (three B9 tests check declarations instead of behaviour).
Bump the version (minor), add Part F entries, set Plan back to Finished (header + README), regenerate all three contracts.

## Notes from the user
User chose "Plan 1.1, then merge".

## Checks to run
- npm run component-tokens
- npm run contract -- web badge && npm run contract -- tablet badge && npm run contract -- mobile badge
- npm run docs:build && npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
