# Plan step — icon-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/.claude/worktrees/icon-button-web/biowave-ds (git worktree on branch `ds/icon-button-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/icon-button/icon-button.md (latest Part E round = Round 1, 2026-10-21), _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/icon-button/icon-button.md (Part A in all three platform files only if it changes), the regenerated web contracts, CHANGELOG.md.

## This step
Fix the Planner-owned findings of Review Round 1: **#6** (record in Part C that the fix round rebases on `ds/button-web` — PR #1, shared per-test speedy Emotion cache — and must drop the raised timeouts) and **#8** (B7: the Biowave `Icon` has shipped, remove the "until the Biowave Icon ships" wording; header Source code → `src/components/icon-button/`). Add a fix list in Part C for the Executor findings #1, #2, #3, #4, #5, #7, #9 (follow how button.md recorded its v1.2 fix list). Bump the version (minor), add a Part F entry, set Plan back to Finished (header + README).

## Notes from the user
Gates pre-approved.

## Checks to run
- npm run contract -- web icon-button
- npm run docs:check (only the 2 known stale tablet/mobile button-group Figma contract errors may remain — those are fixed on another branch)

Do not commit, push or switch branches. End with the Handoff block.
