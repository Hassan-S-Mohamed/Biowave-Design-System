# Run — chip / web — 2026-10-22

| Field | Value |
|---|---|
| Unit | `chip` on `web` (plan step covers web, tablet and mobile — Part A is shared) |
| Unit file | `3-web-components/components/chip/chip.md` |
| Branch | `ds/chip-web` (from `main` @ 46be11a, worktree `/Users/hassansaid/Downloads/Biowave Design System-chip-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | plan | claude (wf-planner subagent) | done (2026-10-23, resumed after a connection drop) · Chip 1.0 on W/T/M: variants assist/filter/input/tag (Tag + Label)/status (P-05); sizes sm/md (web `sm`, touch `md`); interactive 32/40 outlined `radius-md`, static filled `radius-full`; tag colours neutral/brand/secondary/success/warning/error/info; no component tokens; web on `ButtonBase` + styled span (not MUI `Chip`: div role=button, remove icon not tabbable), remove = Biowave `IconButton`; Flutter custom `BwChip.*`. **`status` 7 states not specified** (renders neutral tag + warning until 1.1); `sm` chip with avatar blocked on Avatar `xs` | component-tokens ✓ · contract W/T/M ✓ · docs:build ✓ · docs:check ✓ · sync ✓ READY (`check` icon not indexed) | see git log | `01-plan-claude.prompt.md` |
| 02–05 | preview ×3 | codex | web, tablet, mobile sheets complete (tablet retried after a Codex usage limit) — status variant left out (states not specified) | previews W/T/M ✓ | see git log | `0[2-5]-preview-codex-*.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| after-plan | **Approve 1.0, status later** (2026-10-24) | Tag + Label = one `tag` variant; `sm` chip with an avatar waits for Avatar `xs`; `status` waits for its 7 states (plan 1.1). Implement after Avatar is built and merged (input chip uses Avatar) |

## Questions raised

- Planner: (1) The 7 request-status states — EN/AR names, icon and colour of each — are not written anywhere in the repo. (2) Avatar 1.1 `xs` (24) for `sm` chips with an avatar? (3) `check` icon not in `_sync/figma-icons.json` → `sync:icons:plan` + Figma read. (4) Tag and Label as one `tag` variant — right? (5) Icon A4.2 says `xs` icons are for "chips at `sm`", but Chip `sm` is 32 high with `size-icon-sm` — change Icon text or add a 24-high chip?

## Summary

User (2026-10-22): plan Day 3 + Day 4 components on all platforms. Chip waited for Avatar's plan (dependency). New component → **plan** (W/T/M), then **preview** per platform, then the after-plan gate.
