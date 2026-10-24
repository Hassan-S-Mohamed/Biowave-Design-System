# Run — avatar / web — 2026-10-22

| Field | Value |
|---|---|
| Unit | `avatar` on `web` (plan step covers web, tablet and mobile — Part A is shared) |
| Unit file | `3-web-components/components/avatar/avatar.md` |
| Branch | `ds/avatar-web` (from `main` @ 46be11a, worktree `/Users/hassansaid/Downloads/Biowave Design System-avatar-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | plan | claude (wf-planner subagent) | done (2026-10-23, resumed after a network error and the session limit) · Avatar 1.0 on W/T/M: sizes sm–xl on control heights 32/40/48/56 (web `md`, touch `lg`), `circle`/`square`, colour neutral/brand/secondary (≥ 6.39:1), image → initials → `person` glyph; Latin 2 initials, Arabic script 1; optional Badge 1.0; `decorative`; no component tokens. Depends on Icon + Badge 1.0 (code starts after Badge merges) | component-tokens ✓ · contract W/T/M ✓ · docs:build ✓ · docs:check ✓ · sync ✓ READY | see git log | `01-plan-claude.prompt.md` |

| prev | preview ×3 | codex | web, tablet, mobile sheets complete after retries (network disconnects and time limits while another session's Codex jobs ran; retried one at a time) — see the step logs | previews W/T/M ✓ | see git log | `*-preview-codex-*.prompt.md` |
| 07 | implement | codex | stopped at once: Codex usage limit, no edits | — | — | `07-implement-codex.prompt.md` |
| 08 | implement | cursor | stopped at once: Cursor usage limit | — | — | `08-implement-cursor.prompt.md` |
| 09 | implement | codex | done (2026-10-24): web Avatar from contract 1.0 composing the merged Badge (code, initials helper, image-loaded hook, tests, export); C8; Code Built | docs:check ✓ · typecheck ✓ · test:web ✓ 166/166 (orchestrator) | see git log | `09-implement-codex.prompt.md` |
| 10 | review | claude (wf-reviewer subagent) | done (2026-10-24) · **Approved** — Round 1: headless Chrome EN/AR × light/dark: sizes 32/40/48/56, circle 9999 / square 6–12 px, 3 colours (min 6.39:1), image → initials → glyph (loading, 404, src change), initials SA / O / س / custom, Badge via public API (overlap by shape, top-end LTR / top-left RTL), named `role=img` vs decorative, never focusable. 🟢 #1 Planner: B2 `loading="lazy"` vs C3 `new Image()` probe contradict; 🟢 #2 Planner: header Source code; 🟢 #3 Executor: RTL test only checks non-empty insets. Code Approved, Plan → Open | docs:check ✓ · typecheck ✓ · test:web ✓ 166/166 | see git log | `10-review-claude.prompt.md` |
| 11 | plan | claude (wf-planner subagent) | done (2026-10-24) · plan 1.1: #1 keep lazy loading, drop the probe — real `img` (`loading="lazy"`, hidden until its own `load`, removed on `error`, never `display: none`), `useImageLoaded` returns `{status, onLoad, onError}`; tablet/mobile B2 note (no precache); #2 header; B9 RTL corner assertion (#3); C7 AC-8…AC-10 + Fix round 1 list. Plan Finished; Code stays Approved until the fix | contract W/T/M ✓ · docs:check ✓ | see git log | `11-plan-claude.prompt.md` |
| 12 | fix | codex | done (2026-10-24): Fix round 1 — lazy real `img` (hidden until load, removed on error), `useImageLoaded` → `{status, onLoad, onError}`, probe removed, load/error tests on the rendered img, RTL corner assertion EN/AR; C8; Code Built | docs:check ✓ · typecheck ✓ · test:web ✓ 220/220 (orchestrator) | see git log | `12-fix-codex.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| after-plan (1.1) | **Approve** (2026-10-24) | No new previews (no visual change). Fix round 1 with codex → review round 2 → before-merge |
| before-merge | **Plan 1.1 first** (2026-10-24) | Planner: lazy-loading vs image probe (#1), header (#2), C7 fix list incl. Executor nit #3 (RTL test) → small fix → review → before-merge. `main` (Tooltip #22, Divider #21, library #20) merged in first |
| (unblocked) | Badge #19 merged (2026-10-24); `main` merged in (461e266, generated index.json rebuilt) | `npm run contract` refuses (Figma library index stale after Badge's contrast-pair change); Avatar contracts still current (docs:check ✓). User: implement web now from the current contract |
| after-plan | Approve, no 2xl (2026-10-23) | Initials rule (2 Latin, 1 Arabic script) and Flutter BwBadge composition approved; sizes stay sm–xl. Implement after Badge 1.0 is merged |

## Questions raised

- Planner: (1) `person`, `devices` not in `_sync/figma-icons.json` (contracts show not indexed) → `npm run sync:icons:plan` + Figma script. (2) Initials rule: 2 Latin, 1 Arabic-script — confirm. (3) No semantic size above 56: add `2xl` (64/80) for profile headers? Chip's 24 `xs` alias `size-icon-lg` or own token? (4) Flutter `BwAvatar` rebuilds the `BwBadge` from its public fields — approve? (5) Avatar code starts after Badge 1.0 is merged.

## Summary

User (2026-10-22): plan Day 3 + Day 4 components on all platforms. New component, no files yet → **plan** (web, tablet, mobile), then **preview** per platform, then the after-plan gate.
