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

## Gates

| Gate | Decision | Notes |
|---|---|---|
| (unblocked) | Badge #19 merged (2026-10-24); `main` merged in (461e266, generated index.json rebuilt) | `npm run contract` refuses (Figma library index stale after Badge's contrast-pair change); Avatar contracts still current (docs:check ✓). User: implement web now from the current contract |
| after-plan | Approve, no 2xl (2026-10-23) | Initials rule (2 Latin, 1 Arabic script) and Flutter BwBadge composition approved; sizes stay sm–xl. Implement after Badge 1.0 is merged |

## Questions raised

- Planner: (1) `person`, `devices` not in `_sync/figma-icons.json` (contracts show not indexed) → `npm run sync:icons:plan` + Figma script. (2) Initials rule: 2 Latin, 1 Arabic-script — confirm. (3) No semantic size above 56: add `2xl` (64/80) for profile headers? Chip's 24 `xs` alias `size-icon-lg` or own token? (4) Flutter `BwAvatar` rebuilds the `BwBadge` from its public fields — approve? (5) Avatar code starts after Badge 1.0 is merged.

## Summary

User (2026-10-22): plan Day 3 + Day 4 components on all platforms. New component, no files yet → **plan** (web, tablet, mobile), then **preview** per platform, then the after-plan gate.
