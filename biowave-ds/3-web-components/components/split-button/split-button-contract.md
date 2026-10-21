<!-- GENERATED from split-button.md @ c72ed8d53d6986d1 — do not edit; change the source and run: npm run contract -- web split-button -->
# Split button · زر مقسّم — Web — code contract

> **Everything you need to build Split button on Web, and nothing else.** Read this file only. Generated from [`split-button.md`](split-button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](split-button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Platform | Web · React + MUI |
| Built on | Composition of Biowave `Button` (`primary-action`) + `IconButton` (`menu-trigger`) + MUI `Menu`/`MenuItem` (temporary, until the Menu component on Day 10) |
| Import | `import { SplitButton } from '@biowave/web'` |
| Version | 1.1 · 2026-10-21 |
| Source code | `src/components/split-button/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`split-button.md`](split-button.md) @ `c72ed8d53d6986d1` |

## 1. What it is

A split button joins a main action with a menu of related alternatives: "Export" + PDF / Excel / CSV, "Approve" + Approve all / Approve with note. The main part runs the most common choice in one press; the chevron part opens the menu. It is built from a [Button](../button/button.md#a--guidelines) and an [Icon button](../icon-button/icon-button.md#a--guidelines), so it looks and behaves like them.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Groups the two parts; outer corners rounded, inner corners tight |
| 2 | `primary-action` | Yes | A Button: runs the most common action |
| 3 | `menu-trigger` | Yes | An Icon button with a chevron: opens the menu |
| 4 | `menu` | Yes | The alternatives (Menu component) |
| 5 | `gap` | Yes | Small gap that separates the two hit areas |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `color`
- 4.3 `size`
- 4.4 `leading-icon`

## 2. API

### SplitButton
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | string | | — | ✓ | `primary-action` label |
| `onClick` | `(e) => void` | | — | ✓ | Runs the primary action |
| `options` | `SplitButtonOption[]` | 2–5 items | — | ✓ | Menu items (below) |
| `variant` | enum | `filled` · `tonal` · `outlined` | `filled` | | A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` | `brand` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 |
| `startIcon` | `ReactNode` | | — | | On the primary action |
| `loading` · `loadingLabel` | | | `false` | | Primary action loading; trigger disabled meanwhile |
| `disabled` | boolean | | `false` | | Disables both parts |
| `menuLabel` | string | | "More options for {children}" / "خيارات أخرى لـ{children}" | | Trigger accessible name |
| `open` · `onOpenChange` | boolean · `(open) => void` | | uncontrolled | | Optional control of the menu |

`SplitButtonOption = { label: string; onSelect: () => void; icon?: ReactNode; disabled?: boolean }`

**Invalid combinations** (dev warning + fallback):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `neutral` | `outlined` |
| fewer than 2 or more than 5 `options` | renders, warns |
| an option label equal to `children` | renders, warns "Don't repeat the primary action in the menu" |

## 3. Dimensions

```
  radius-md                    radius-xs │ │ radius-xs          radius-md
  ┌──────────────────────────────────┐   ┌────────┐
  │ [◆]  Export report               │   │  [⌄]   │   both: size-control-height-md
  └──────────────────────────────────┘   └────────┘
                                    ├──┤ spacing-xxs
```

| Part | Property | Value |
|---|---|---|
| `container` | layout · gap | inline-flex · `spacing-xxs` |
| `primary-action` | everything | Button of the same `variant`, `color`, `size` ([Button B2](../button/button.md#b2-dimensions)), except: radius start corners `radius-md`, end corners `radius-xs` |
| `menu-trigger` | everything | IconButton of the same `variant`, `color`, `size` ([Icon button B2](../icon-button/icon-button.md#b2-dimensions)), except: start corners `radius-xs`, end corners `radius-md`; icon `expand_more` |
| `menu` (temporary) | min-width · background · elevation · radius | width of `container` · `color-surface-raised` · `elevation-3` · `radius-lg` |
| `menu` item | height · padding-inline · gap · text style · text color | `size-control-height-md` · `spacing-control-padding-inline-md` · `spacing-control-gap-md` · `body-md` · `color-text-neutral-default` |
| `menu` | offset from container | `spacing-xs` |

## 4. Tokens by part and state

- `primary-action`: [Button B3](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`.
- `menu-trigger`: [Icon button B3.1](../icon-button/icon-button.md#31-unselected); **Expanded** = its Pressed tokens.
- `menu` item: hover `color-overlay-hover`, pressed `color-overlay-pressed`, focus (keyboard) `color-overlay-hover` + `color-border-focus` inner ring, disabled `color-text-neutral-disabled`; icon `color-icon-neutral-subtle`.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-icon-neutral-subtle` | `var(--bw-color-icon-neutral-subtle)` · `cssVars.color.icon.neutral.subtle` | #292929 | #DBDBDB |
| `color-overlay-hover` | `var(--bw-color-overlay-hover)` · `cssVars.color.overlay.hover` | #5454541A | #54545466 |
| `color-overlay-pressed` | `var(--bw-color-overlay-pressed)` · `cssVars.color.overlay.pressed` | #54545433 | #54545499 |
| `color-surface-raised` | `var(--bw-color-surface-raised)` · `cssVars.color.surface.raised` | #FFFFFF | #292929 |
| `color-text-neutral-default` | `var(--bw-color-text-neutral-default)` · `cssVars.color.text.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-text-neutral-disabled` | `var(--bw-color-text-neutral-disabled)` · `cssVars.color.text.neutral.disabled` | #969696 | #545454 |
| `elevation-3` | `var(--bw-elevation-3)` · `cssVars.elevation.3` | 0px 8px 24px 0px rgb(7 19 35 / 12%) | 0px 8px 24px 0px rgb(0 0 0 / 30%) |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard-accelerate` | `var(--bw-motion-easing-standard-accelerate)` · `cssVars.motion.easing.standard-accelerate` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `var(--bw-motion-easing-standard-decelerate)` · `cssVars.motion.easing.standard-decelerate` | [0,0,0,1] | [0,0,0,1] |
| `radius-lg` | `var(--bw-radius-lg)` · `cssVars.radius.lg` | 10 | 10 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `radius-xs` | `var(--bw-radius-xs)` · `cssVars.radius.xs` | 4 | 4 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `spacing-control-gap-md` | `var(--bw-spacing-control-gap-md)` · `cssVars.spacing.control.gap.md` | 6 | 6 |
| `spacing-control-padding-inline-md` | `var(--bw-spacing-control-padding-inline-md)` · `cssVars.spacing.control.padding-inline.md` | 12 | 12 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `spacing-xxs` | `var(--bw-spacing-xxs)` · `cssVars.spacing.xxs` | 2 | 2 |

## 5. States and transitions

Each part: [Button B4](../button/button.md#b4-states-and-transitions). Plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Collapsed → Expanded | trigger click · Enter · Space · ArrowDown/Up | chevron rotates half a turn; menu fades + scales in from the top-end | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Expanded → Collapsed | item chosen · Esc · click outside · Tab | chevron back; menu fades out | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant (no rotation animation; chevron still shows its final direction).

## 6. RTL

```
LTR  │ [◆] Export report │ │ [⌄] │        menu aligned to the inline end
RTL  │ [⌄] │ │ تصدير التقرير [◆] │
```
| Part | In RTL |
|---|---|
| layout, corner radii | Mirror (logical `border-start-start-radius` … ) |
| `expand_more` chevron | Does not mirror (points down) |
| `menu` | Anchored `bottom-end` (logical), so it opens toward the inline start. The physical side is chosen from the text direction: the menu's end edge lines up with the container's end edge (right in LTR, left in RTL) and it scales in from its top-end corner |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `<div role="group" aria-label={children}>` containing two buttons |
| Trigger | `aria-label={menuLabel}`, `aria-haspopup="menu"`, `aria-expanded`; `aria-controls={menuId}` **only while the menu is open** (the menu is not in the DOM when closed, so the attribute is left off then) |
| Menu | `role="menu"`, items `role="menuitem"`; focus moves into the menu on open, returns to the trigger on close |
| Loading | Primary as Button B6; trigger `disabled` while loading |
| Focus ring | Per part, as Button B6 |

| Key (focus on trigger) | Action |
|---|---|
| Enter / Space / ArrowDown | Open, focus first item |
| ArrowUp | Open, focus last item |

| Key (focus in menu) | Action |
|---|---|
| ArrowDown / ArrowUp | Next / previous item (wraps) |
| Home / End | First / last item |
| Enter / Space | Choose item, close, run `onSelect` |
| Esc | Close, focus trigger |
| Tab | Close, move focus on |

## 8. Examples

```tsx
<SplitButton
  onClick={() => exportReport('pdf')}
  options={[
    { label: 'Export as Excel', onSelect: () => exportReport('xlsx') },
    { label: 'Export as CSV', onSelect: () => exportReport('csv') },
  ]}
>Export report</SplitButton>

// Arabic
<SplitButton onClick={approve} options={[{ label: 'موافقة مع ملاحظة', onSelect: approveWithNote }]}>موافقة</SplitButton>
```

## 9. How to build it

### Goal

`SplitButton` composes the real `Button` and `IconButton` (no re-styling) and a temporary MUI menu, and meets B1–B6, B9.

### Scope

In: B1–B6, B9; plan 1.1: the Review round 1 fixes in the Fix round 1 task list (C7). Out: the Menu component (Day 10) — when it exists, swap `SplitButtonMenu` for it (leave `// TODO(menu)`); any change to the shared test tooling (`src/test/*`, `vitest.config.ts`).

### Approach

- Render `Button` and `IconButton` with the same `variant`/`color`/`size`. Add an **internal** (not exported) `segment?: 'start' | 'end'` prop to both that sets the logical corner radii from B2. Document it as internal in their JSDoc; do not add it to their public spec.
- Menu: `SplitButtonMenu.tsx` (private) wraps MUI `Menu` + `MenuItem`, anchored to the container, styled from B2–B3 tokens.
- **Menu side (B5; plan 1.1, finding 6).** MUI flips only its **default** `anchorOrigin`/`transformOrigin` in RTL; origins passed in are used as physical sides unchanged (`Menu.js`, `Popover.js` `getOffsetLeft`). So choose the side from the text direction (`theme.direction` / the provider's RTL flag): `end = isRtl ? 'left' : 'right'`; `anchorOrigin = { vertical: 'bottom', horizontal: end }`, `transformOrigin = { vertical: 'top', horizontal: end }`. Never pass a fixed `'right'` or `'left'`.
- Ids: `useId()` for the menu id. `aria-controls` is set on the trigger only while the menu is open (B6; plan 1.1, finding 7).
- **Test tooling (plan 1.1, finding 2).** The shared per-test speedy Emotion cache from `ds/button-web` (PR #1; [Button C3 › Test tooling](../button/button.md#c3-approach)) is now on `main` and merged into this branch: `renderWithBiowave` creates a speedy cache pair per test and `src/test/setup.ts` calls `resetTestEmotionCaches()` after `cleanup()`. Split button tests render only through `renderWithBiowave`, create no emotion cache or `BiowaveProvider` of their own, and use the default 5 s timeout — drop the raised timeouts. Do not edit `src/test/*` or `vitest.config.ts`.

### Token gaps

None.

### Files to create / change

```
3-web-components/src/components/split-button/SplitButton.tsx       new
3-web-components/src/components/split-button/SplitButtonMenu.tsx   new (private)
3-web-components/src/components/split-button/SplitButton.test.tsx  new
3-web-components/src/components/split-button/index.ts              new
3-web-components/src/components/button/Button.tsx                  change: internal `segment` prop
3-web-components/src/components/icon-button/IconButton.tsx         change: internal `segment` prop
3-web-components/src/index.ts                                      change: export SplitButton
3-web-components/README.md                                         change: status row
```

## 10. Tests

- [ ] Every allowed `variant` × `color` × `size`, light + dark, en + ar; inner/outer radii correct in both directions
- [ ] Two focus stops; trigger `aria-expanded` toggles; menu keyboard table B6 fully
- [ ] Choosing an item runs `onSelect` once, closes, returns focus
- [ ] Loading disables the trigger and keeps focus on the primary action
- [ ] Invalid combinations warn
- [ ] axe passes (open and closed); no raw values

B9, plus: Button and IconButton tests still pass unchanged.
- [ ] (1.1) `ar` menu side (finding 1): in `ar` the menu origins (or the Paper `transform-origin`) are inline-end — physical `left` — and in `en` physical `right`
- [ ] (1.1) B4 close transition (finding 3): emitted rules show the chevron and the menu opening with `motion-duration-md` + `motion-easing-standard-decelerate` and closing with `motion-duration-sm` + `motion-easing-standard-accelerate`
- [ ] (1.1) Trigger keys (finding 4): Enter, Space and ArrowDown each open the menu and focus the first item; Space on an item chooses it, closes the menu and runs `onSelect` once
- [ ] (1.1) Loading (finding 4): while `loading`, the trigger is disabled and focus stays on the primary action
- [ ] (1.1) `ar` label (finding 4): the default `menuLabel` is "خيارات أخرى لـ{children}"
- [ ] (1.1) Radii (finding 4): per corner — `start` segment start corners `radius-md`, end corners `radius-xs`; `end` segment the reverse — for every allowed `variant`
- [ ] (1.1) axe (finding 4): open and closed, in `en` and `ar`
- [ ] (1.1) `aria-controls` (finding 7): absent while closed; while open it equals the menu's `id`
- [ ] (1.1) No per-test timeout arguments in `SplitButton.test.tsx` (finding 5); every Split button test passes under the 5 s default in the full suite

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API = B1
- [ ] AC-2 Parts are real `Button`/`IconButton` instances; only radii differ (no copied styles)
- [ ] AC-3 Transitions B4
- [ ] AC-4 RTL B5; a11y B6 (menu keyboard complete)
- [ ] AC-5 typecheck, tests, sync pass
- [ ] AC-6 Exported; README status updated
- [ ] AC-7 (plan 1.1) Review round 1 findings #1–#5 and #8 fixed as the task list below; `npm run test:web` **as configured** (full suite) passes with the default 5 s timeout, no `testTimeout` / `fileParallelism` change
- [ ] AC-8 (plan 1.1) C8 gets a **Fix round 1** entry with every command and real numbers (`npm run typecheck`, `npm run test:web` passed/total + duration, `npm run docs:check`, `npm run sync`), the slowest Split button test times, and Deviations that list "`aria-controls` only while open" (#7); header `Code` set to `Built`; `3-web-components/README.md` table matches

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
1. #1 Menu side from the text direction — C3 › Menu side. File: `3-web-components/src/components/split-button/SplitButtonMenu.tsx` + an `ar` test (C6)
2. #2 Use the shared per-test speedy Emotion cache — C3 › Test tooling. Nothing to build in `src/test/*` (already on this branch); `SplitButton.test.tsx` renders only through `renderWithBiowave`. `npm run test:web` must pass in the full suite
3. #3 B4 close transition: open/closed-specific duration + easing on the chevron; the Paper transition per enter/exit with the B4 duration and easing tokens (drop the blanket `!important` duration). Files: `SplitButton.tsx`, `SplitButtonMenu.tsx` + test (C6)
4. #4 Missing tests (C6 items marked 1.1: trigger keys, Space to choose, loading focus, `ar` label and menu side, per-corner radii for every variant, axe open + closed in `en` and `ar`). File: `SplitButton.test.tsx`
5. #5 Remove the raised timeouts at `SplitButton.test.tsx:93` (30 s) and `:272` (20 s); default timeouts only
6. #8 Replace the outdated C8 `docs:check` question with the current result; C8 **Fix round 1** entry (AC-8), with #7 under Deviations; one `CHANGELOG.md` entry

Files the Executor may touch in this fix round: `3-web-components/src/components/split-button/SplitButton.tsx`, `SplitButtonMenu.tsx`, `SplitButton.test.tsx`, C8 of this file, the header `Code` field, the `3-web-components/README.md` table row and `CHANGELOG.md`. Nothing else.

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](split-button.md#c8-execution-log-filled-by-the-executor) in `split-button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `split-button.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
