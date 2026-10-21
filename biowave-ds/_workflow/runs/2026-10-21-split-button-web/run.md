# Run — split-button / web — 2026-10-21

| Field | Value |
|---|---|
| Unit | `split-button` on `web` |
| Unit file | `3-web-components/components/split-button/split-button.md` |
| Branch | `ds/split-button-web` (from `main`, worktree `.claude/worktrees/split-button-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

Orchestrated from a Cowork session (Phase 1 run; gates pre-approved by the user except merge). Plan Finished, Code Built, no review round → **review**.

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | review | claude (wf-reviewer subagent) | done · **Changes requested** — 2 🔴 (#1 menu origins physical `right`, wrong side in AR; #2 full-suite timeouts, needs `ds/button-web` tooling — Executor), 3 🟡 (#3 B4 close motion, #4 B9/B6 test gaps, #5 raised timeouts), 3 🟢 (#6 C3, #7 B6 aria-controls — Planner) | typecheck ✓ · sync ✓ · test:web ✗ 81/87 (timeouts; SplitButton alone 11/11) · docs:check ✗ 2 (stale T/M button-group Figma contracts) | see git log | `01-review-claude.prompt.md` |
| 02 | plan | claude (wf-planner subagent) | done · plan 1.1: #6 B5/C3 menu side from text direction (`end = isRtl ? 'left' : 'right'` for both origins), #7 B6 `aria-controls` only while open; C3 test tooling = shared speedy Emotion cache now on `main` (merged in 371d7f7); C7 AC-7/AC-8 + Fix round 1 task list for #1–#5, #8. Plan Finished | contract web split-button ✓ · docs:check ✓ 0 errors | see git log | `02-plan-claude.prompt.md` |
| 03 | preview | codex | done (12.5 min): `split-button-light-en.jpg`, `split-button-dark-ar.jpg`, README token sheet; RTL menu aligned to the left (inline end) as plan 1.1 #6. ⚠ light menu panel ≈ 8 px past the control's end edge; a JPEG cannot show the scale origin; orchestrator: dark/ar focus columns draw the ring round the whole control (primary) and none on the trigger | previews ✓ | see git log | `03-preview-codex.prompt.md` |
| 04 | fix | codex | done (7 min): Fix round 1 — #1 menu origins `horizontal: end` from the direction, #2 suite green, #3 close motion, #4 tests, #5 raised timeouts removed, #8 C8; #7 under Deviations; Codex: test:web 97/97 ×2 (6.2 s) | docs:check ✓ · typecheck ✓ · test:web ✓ 97/97 in 6.6 s (orchestrator) | see git log | `04-fix-codex.prompt.md` |
| 05 | review | claude (wf-reviewer subagent) | done · **Changes requested** — Round 2: #1 fixed (Chromium: menu end edge = container end in EN, left edges match in AR on 7/7 instances, transform-origin top-end), #2, #4, #5, #8 fixed, #6/#7 closed by plan 1.1; #3 partial. New: #9 🟡 menu `Grow` — fade uses `standard` easing both ways, scale runs 133/67 ms (not tokens); #10 🟡 menu durations inlined as JS numbers, so reduced motion no longer zeroes them — both Executor. Plan stays Finished | docs:check ✓ · typecheck ✓ · test:web ✓ 97/97 8.3 s | see git log | `05-review-claude.prompt.md` |
| 06 | fix | codex | done (5.2 min): Fix round 2 — #9 menu fade + scale each on B4 duration/easing tokens open and close, #10 transition from `--bw-motion-*` CSS variables (reduced motion zeroes it); tests per property + reduced motion; C8 entry; Code Built. Codex: test:web ×3 100/100 | docs:check ✓ · typecheck ✓ · test:web ✓ 100/100 in 10.6 s (orchestrator) | see git log | `06-fix-codex.prompt.md` |
| 07 | review | claude (wf-reviewer subagent) | done · **Approved** — Round 3: #9 fixed (headless Chrome: menu Paper open `opacity/transform 0.2s cubic-bezier(0,0,0,1)`, close `0.1s cubic-bezier(0.3,0,1,1)`, no delay), #10 fixed (reduced motion → 0 s, first frame fully shown/hidden), #1 still holds (EN right, AR left). New 🟢 #11: invisible backdrop catches clicks ≈ 240 ms after close (Grow `auto` timeout) — for the shared Menu (`TODO(menu)`). Code → Approved | docs:check ✓ · typecheck ✓ · test:web ✓ 100/100 7.9 s · sync ✓ | see git log | `07-review-claude.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21, Cowork session) | Merge to `main` stays with the user. 2026-10-21 Code-tab session: `main` merged in after PR #1 + #8 (371d7f7); gates asked again here |
| after-plan | **Approve** (2026-10-21) | Fix round 1 with codex, then review round 2. Preview ⚠ items are drawing faults, not plan changes |
| after-review | **Approve** (2026-10-21) | Fix round 2 (last allowed) with codex for #9, #10 (menu transition from the `--bw-motion-*` CSS variables), then review round 3 |

## Questions raised

- Reviewer: #2 needs `ds/button-web` (PR #1) merged first → Orchestrator: asked the user; the fix branch rebases on it.

## Summary

—
