# Plan step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/.claude/worktrees/button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/button-group/button-group.md (latest Part E round = Round 1, 2026-10-21), _templates/README.md. For #6 only: the tablet and mobile button-group files as needed to regenerate their contracts.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/button-group/button-group.md (Part A in all three platform files if it changes), button-group.tokens.json if needed, the regenerated contracts, CHANGELOG.md.

## This step
Fix the Planner-owned findings of Review Round 1: **#1** (B2/C3: horizontal container is `display: flex` at 100 % of its parent's inline size so `align` works; keep vertical full width), **#6** (regenerate tablet + mobile button-group Figma contracts), **#8** (C3 vs B1: the group's size wins — align C3), **#11** (header Source code → `src/components/button-group/`). Add to the C-part fix list what the Executor must do for #2, #3, #4, #7, #9, #10. #5 (shared speedy Emotion test cache) is on branch `ds/button-web` (PR #1, merge pending) — note in C that the fix rebases on it; don't plan it again. Bump the version (minor), add a Part F entry, set Plan back to Finished (header + README).

## Notes from the user
Gates pre-approved.

## Checks to run
- npm run contract -- web button-group && npm run contract -- tablet button-group && npm run contract -- mobile button-group
- npm run docs:check (must be 0 errors)

Do not commit, push or switch branches. End with the Handoff block.
