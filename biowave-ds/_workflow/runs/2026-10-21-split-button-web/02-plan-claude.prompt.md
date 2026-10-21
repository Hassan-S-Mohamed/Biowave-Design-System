# Plan step — split-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-web/biowave-ds (git worktree on branch `ds/split-button-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/split-button/split-button.md (latest Part E round = Round 1, 2026-10-21), _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/split-button/split-button.md (Part A in all three platform files only if it changes), the regenerated web contracts, CHANGELOG.md.

## This step
Fix the Planner-owned findings of Review Round 1: **#6** (C3: MUI only flips its default origins in RTL, not origins passed in — state that the menu side is chosen from the text direction, B5 `bottom-end` logical) and **#7** (B6: `aria-controls` is set only while the menu is open — adopt the code's behaviour). Record in Part C that the shared per-test speedy Emotion cache from `ds/button-web` (PR #1) is now on `main` and merged into this branch, so the fix round uses it and must drop raised timeouts. Add a Part C fix list for Executor findings #1–#5 and #8 (follow how button.md recorded its v1.2 fix list). Bump the version (minor), add a Part F entry, set Plan back to Finished (header + README).

## Notes from the user
none

## Checks to run
- npm run contract -- web split-button
- npm run docs:check (expected 0 errors: the button-group contract fix is now on `main`)

Do not commit, push or switch branches. End with the Handoff block.
