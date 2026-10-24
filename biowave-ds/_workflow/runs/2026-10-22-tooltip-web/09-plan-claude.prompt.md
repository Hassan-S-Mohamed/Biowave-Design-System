# Plan step — tooltip (web, tablet, mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System-tooltip-web/biowave-ds (git worktree on branch `ds/tooltip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The three section READMEs, every Part of `{3-web,4-tablet,5-mobile}-components/components/tooltip/tooltip.md` (latest Part E round = web Round 1, 2026-10-24), _templates/README.md, 2-foundations/dist/tokens.json.

## Outputs (write only these)
Parts A–D and F of the three tooltip.md files (Part A identical on all three except A8), the regenerated contracts and docs pages, the README rows (Plan back to Finished), one CHANGELOG.md entry.

## This step
Plan 1.0 → 1.1 answering the Planner-owned blocker of web Review Round 1: **#1** the 4 px offset between anchor and tooltip lies outside both hover areas and `leaveDelay` is 0, so the tooltip closes while the pointer moves onto it (WCAG 1.4.13 hoverable, B6, AC-3). Rewrite web C3 so the whole gap is inside the hover area — e.g. popper offset modifier 0 and `tooltipTokens.offset` as the tooltip's margin on the side facing the anchor (inside the popper), or another approach you justify; keep the visual offset at `spacing-xs`. Add a B9/C6 test that moves the pointer from the anchor across the gap onto the tooltip in small steps with timers advanced between events, and asserts it stays open. Check whether tablet/mobile (`RawTooltip`, pointer/hover on tablet) have the same gap problem and say so in their B6/C3 (no change if not). Add a C7 "Fix round 1 — Executor task list" covering #1 and the reviewer's Executor findings #2 (two elements share the `aria-describedby` id during fade-out) and #3 (header Source code). Bump the version (minor), add Part F entries, set Plan back to Finished (header + README), regenerate all three contracts.

## Notes from the user
User approved at the after-review gate.

## Checks to run
- npm run component-tokens
- npm run contract -- web tooltip && npm run contract -- tablet tooltip && npm run contract -- mobile tooltip
- npm run docs:build && npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
