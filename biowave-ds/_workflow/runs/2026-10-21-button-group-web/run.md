# Run — button-group / web — 2026-10-21

| Field | Value |
|---|---|
| Unit | `button-group` on `web` |
| Unit file | `3-web-components/components/button-group/button-group.md` |
| Branch | `ds/button-group-web` (from `main`, worktree `.claude/worktrees/button-group-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

Orchestrated from a Cowork session (Phase 1 run; gates pre-approved by the user except merge). Plan Finished, Code Built, no review round → **review**.

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | review | claude (wf-reviewer subagent) | done · **Changes requested** — 1 🔴 (#1 `align` no-op: container hugs content, Planner), 5 🟡 (#2–#4 Executor, #5 shared test tooling + #6 stale T/M Figma contracts, Planner), 5 🟢 | typecheck ✓ · test:web ✗ 86/87 · 85/87 (flaky, not ButtonGroup: 10/10 every run) · docs:check ✗ 2 (stale T/M button-group Figma contracts) | see git log | `01-review-claude.prompt.md` |
| 02 | plan | claude (wf-planner subagent) | done · plan 1.1: #1 container `flex` + 100 % inline size, #8 group size wins, #11 header, #6 T/M Figma contracts regenerated; B1 clamps `maxVisible`, keeps `href`/submit actions visible; fix list AC-7…AC-11. Plan Finished | contract web/tablet/mobile ✓ · docs:check ✓ 0 errors | see git log | `02-plan-claude.prompt.md` |
| 03 | preview | codex | partial → accepted (not blocking, 12 min): `button-group-light-en.jpg`, `button-group-dark-ar.jpg`, README token sheet; ⚠ `fill` children slightly unequal after two retries; orchestrator: narrow frames make end/start/center hard to tell apart, overflow sketch shows 4 visible actions (limit 3, `href`/submit stay visible) — the fix-round tests are the proof | previews ✓ | see git log | `03-preview-codex.prompt.md` |
| 04 | fix | codex | done (5.7 min): Fix round 1 — #1 container `display: flex` + `inlineSize: 100%`, #2–#4, #7, #9, #10, Executor half of #8, raised timeout removed; C8 entry; Codex: test:web ×3 91/91 | docs:check ✓ · typecheck ✓ · test:web ✓ 91/91 in 8.6 s (orchestrator) | see git log | `04-fix-codex.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21, Cowork session) | Merge to `main` stays with the user. 2026-10-21 Code-tab session: `main` merged in after PR #1 + #8 (4900ed8); gates asked again here |
| after-plan | **Approve** (2026-10-21) | Fix round 1 with codex (`04-fix-codex.prompt.md`; `03-fix-AGENT.prompt.md` from the Cowork session was never sent), then review round 2 |

## Questions raised

- Reviewer: shared speedy Emotion cache missing on `main` → Orchestrator: it is on `ds/button-web` (PR #1, merge pending with the user); #5 closes when PR #1 merges, the fix branch should rebase on it.
- Planner: Part D3 doesn't say the Figma container fills its parent (same issue as #1 in Figma) → Orchestrator: yes, follow-up for the next plan pass; Figma is skipped in this workflow so it doesn't block the code fix.
- Reviewer: stale T/M button-group Figma contracts → kept as 🟡 Planner #6, regenerate in the plan step.

## Summary

—
