<!-- GENERATED from icon-button.md @ aca00bc86b706450 — do not edit; change the source and run: npm run contract -- web icon-button -->
# Icon button · زر أيقونة — Web — code contract

> **Everything you need to build Icon button on Web, and nothing else.** Read this file only. Generated from [`icon-button.md`](icon-button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](icon-button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Icon button · زر أيقونة |
| Platform | Web · React + MUI |
| Built on | MUI `IconButton` (native `<button>`), styled only from Biowave tokens (no ripple, no MUI colors). Tooltip: MUI `Tooltip` with the tokens in B3.4, until the Tooltip component (Day 4) replaces it |
| Import | `import { IconButton } from '@biowave/web'` |
| Version | 1.1 · 2026-10-21 |
| Source code | [`src/components/icon-button/`](../../src/components/icon-button/) |
| Tokens | — |
| Source | [`icon-button.md`](icon-button.md) @ `aca00bc86b706450` |

## 1. What it is

An icon button starts an action shown only as an icon: close, edit, more options, notifications, filter. It saves space in toolbars, table rows, cards and app bars. Its name is never visible, so it always has an accessible label, and a tooltip on web. It can also be a **toggle** (pin, favourite, show password) that stays selected.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square hit area and fill |
| 2 | `icon` | Yes | The action. Outlined glyph; filled glyph when a toggle is selected |
| 3 | `tooltip` | Web: yes · touch: on long press | Shows the label on hover and keyboard focus |
| 4 | `focus-ring` | Focus only | Shows keyboard focus |

**Options** (names and values are the props in §2):

- 4.1 `variant` — emphasis
- 4.2 `color`
- 4.3 `size`
- 4.4 `toggle` and `selected`

## 2. API

### IconButton
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `icon` | `ReactNode` | a Material Symbols Rounded glyph (`icons.md`, D-18); selected = same glyph with `'FILL' 1` | — | ✓ | `icon` |
| `label` | string | | — | ✓ | Accessible name and tooltip text |
| `variant` | enum | `filled` · `tonal` · `outlined` · `text` | `text` | | A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` · `error` · `inverse` | `neutral` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 |
| `toggle` | boolean | | `false` | | A4.4 |
| `selected` | boolean | | `false` | | Only with `toggle` |
| `selectedIcon` | `ReactNode` | filled glyph | — | with `toggle` | Shown when `selected` |
| `tooltip` | boolean | | `true` | | `false` only when the label is visible next to the button |
| `loading` · `loadingLabel` · `disabled` · `type` · `onClick` | | | | | Same as [Button B1](../button/button.md#b1-api) |

**Invalid combinations** (`console.warn` in development, then the fallback):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `neutral`/`inverse` | `outlined` |
| `toggle` with `filled` or `tonal` | `toggle` ignored |
| `toggle` without `selectedIcon` | uses `icon` for both states, warns |
| `label` empty | warns "IconButton needs a label" |

## 3. Dimensions

```
   ┬ ┌──────────────┐
   │ │     [◆]      │  radius-md
   │ └──────────────┘
   ┴ size-control-height-md (width = height)
          └ size-icon-md
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `container` | width = height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `container` | padding | none (icon centered) | | |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` |
| `container` | border width (outlined) | `border-width-default` | same | same |
| `icon`, `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | | |

## 4. Tokens by part and state

### 3.1 Unselected
Exactly [Button B3.1–B3.5](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`, with `icon` taking the Button's icon token.

### 3.2 Selected (`toggle` + `selected`, text and outlined only)
| `color` | `container` background | State layer · Hover / Pressed | `icon` | `container` border (outlined) |
|---|---|---|---|---|
| `brand` | `color-background-brand-subtle` | `color-background-transparent-hovered` / `color-background-transparent-pressed` | `color-icon-role-brand` | `color-border-brand` |
| `secondary` | `color-background-secondary-subtle` | same | `color-icon-role-secondary` | `color-border-secondary` |
| `error` | `color-background-error-subtle` | same | `color-icon-role-error` | `color-border-error` |
| `neutral` | `color-background-neutral-default` | same | `color-icon-default` | `color-border-strong` |
| `inverse` | `color-background-inverse-default` | same | `color-icon-role-brand` | `color-border-inverse` |
| Disabled | `color-background-disabled` | — | `color-icon-disabled` | `color-border-disabled` |

### 3.3 Focus
As Button B3.5 (`inverse` uses `color-border-inverse`).

### 3.4 Tooltip (temporary, until Tooltip component)
| Part | Property | Token |
|---|---|---|
| `tooltip` | background · text | `color-surface-inverse` · `color-text-inverse` |
| `tooltip` | text style · radius | `label-sm` · `radius-sm` |
| `tooltip` | padding-block · padding-inline | `spacing-xs` · `spacing-md` |
| `tooltip` | offset from button | `spacing-xs` |

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `var(--bw-border-focus-offset)` · `cssVars.border.focus.offset` | 2 | 2 |
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-brand-subtle` | `var(--bw-color-background-brand-subtle)` · `cssVars.color.background.brand.subtle` | #BEC9D9 | #071323 |
| `color-background-disabled` | `var(--bw-color-background-disabled)` · `cssVars.color.background.disabled` | #EDEDED | #292929 |
| `color-background-error-subtle` | `var(--bw-color-background-error-subtle)` · `cssVars.color.background.error.subtle` | #FECFCF | #721212 |
| `color-background-inverse-default` | `var(--bw-color-background-inverse-default)` · `cssVars.color.background.inverse.default` | #FFFFFF | #0A0A0A |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-secondary-subtle` | `var(--bw-color-background-secondary-subtle)` · `cssVars.color.background.secondary.subtle` | #C0DDE8 | #032A37 |
| `color-background-transparent-hovered` | `var(--bw-color-background-transparent-hovered)` · `cssVars.color.background.transparent.hovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `var(--bw-color-background-transparent-pressed)` · `cssVars.color.background.transparent.pressed` | #54545433 | #54545499 |
| `color-border-brand` | `var(--bw-color-border-brand)` · `cssVars.color.border.brand` | #254471 | #607D9F |
| `color-border-disabled` | `var(--bw-color-border-disabled)` · `cssVars.color.border.disabled` | #DBDBDB | #404040 |
| `color-border-error` | `var(--bw-color-border-error)` · `cssVars.color.border.error` | #D42222 | #FF7676 |
| `color-border-inverse` | `var(--bw-color-border-inverse)` · `cssVars.color.border.inverse` | #FFFFFF | #0A0A0A |
| `color-border-secondary` | `var(--bw-color-border-secondary)` · `cssVars.color.border.secondary` | #1A7596 | #5DA8C2 |
| `color-border-strong` | `var(--bw-color-border-strong)` · `cssVars.color.border.strong` | #BDBDBD | #545454 |
| `color-icon-default` | `var(--bw-color-icon-default)` · `cssVars.color.icon.default` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `var(--bw-color-icon-disabled)` · `cssVars.color.icon.disabled` | #969696 | #707070 |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #132843 | #BEC9D9 |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #A31A1A | #FEA3A3 |
| `color-icon-role-secondary` | `var(--bw-color-icon-role-secondary)` · `cssVars.color.icon.role.secondary` | #094E65 | #90C3D5 |
| `color-surface-inverse` | `var(--bw-color-surface-inverse)` · `cssVars.color.surface.inverse` | #141414 | #FFFFFF |
| `color-text-inverse` | `var(--bw-color-text-inverse)` · `cssVars.color.text.inverse` | #FFFFFF | #0A0A0A |
| `motion-duration-2xl` | `var(--bw-motion-duration-2xl)` · `cssVars.motion.duration.2xl` | 500 | 500 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `motion-easing-standard-accelerate` | `var(--bw-motion-easing-standard-accelerate)` · `cssVars.motion.easing.standard-accelerate` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `var(--bw-motion-easing-standard-decelerate)` · `cssVars.motion.easing.standard-decelerate` | [0,0,0,1] | [0,0,0,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `radius-sm` | `var(--bw-radius-sm)` · `cssVars.radius.sm` | 6 | 6 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

## 5. States and transitions

As [Button B4](../button/button.md#b4-states-and-transitions), plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Unselected ↔ Selected | click / Enter / Space (toggle) | background, icon swap (cross-fade) | `motion-duration-sm` | `motion-easing-standard` |
| Tooltip hidden → shown | hover after `motion-duration-2xl` delay · keyboard focus immediately | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Tooltip shown → hidden | pointer leave · blur · Esc | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant; tooltip appears without fade.

## 6. RTL

| Part | In RTL |
|---|---|
| `icon` — directional (arrow_back, arrow_forward, chevron_left/right, undo, redo, logout, open_in_new) | Mirrors (same mechanism as Button B5) |
| `icon` — non-directional (close, edit, delete, more_vert, search, notifications) | Does not mirror |
| `tooltip` | Placement `top`; flips by the provider's direction when placed start/end |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<button type="button">` |
| Accessible name | `aria-label={label}`; icons `aria-hidden="true"`; the tooltip does not add a second name (`describeChild={false}`, `title` used only for the visual tooltip) |
| Toggle | `aria-pressed={selected}` |
| Loading · disabled | As Button B6 |
| Focus | As Button B6 |
| Target size | `sm` (32) ≥ `target-min` (24) |
| Screen reader output | "Edit device, button" · toggle: "Pin, toggle button, pressed" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus (tooltip shows on focus) |
| Enter / Space | Activates / toggles |
| Esc | Hides the tooltip |

## 8. Examples

```tsx
import { IconButton, Icon } from '@biowave/web';   // Biowave Icon (D-18)

<IconButton icon={<Icon name="edit" />} label="Edit device" onClick={edit} />
<IconButton toggle selected={pinned} icon={<Icon name="push_pin" />} selectedIcon={<Icon name="push_pin" filled />}
            label={pinned ? 'Unpin' : 'Pin'} onClick={() => setPinned(!pinned)} />
<IconButton icon={<Icon name="arrow_back" className="bw-icon-directional" />} label="Back" onClick={back} />
// Arabic: same props, Arabic label
<IconButton icon={<Icon name="edit" />} label="تعديل الجهاز" onClick={edit} />
```

No `size` on the `Icon`: the Icon button sizes it (B2).

## 9. How to build it

### Goal

`IconButton` from `@biowave/web` matches B1–B6 and passes C9, sharing Button's token map so both always look the same.

### Scope

In: B1–B6, B9; (1.1) review round 1 fixes — the Fix round 1 task list under C7. Out: Badge on icon button (composition later), the real Tooltip component (Day 4); any change to the shared test tooling, Button, Split button or Button group files.

### Approach

- Wrap MUI `IconButton` (`disableRipple`, `color="inherit"`), styled with the **same** `button.tokens.ts` table (import it; do not copy values). Add a `selected` table for B3.2 in `iconButton.tokens.ts`.
- Square: `width` and `height` = size token, `padding: 0`.
- Tooltip: MUI `Tooltip` with `title={label}`, `describeChild={false}`, `enterDelay={base.motion.duration['2xl']}` (numeric token from `@biowave/foundations` `base`; never a literal number), styled per B3.4 in `IconButtonTooltip.tsx` (private). Disable with `tooltip={false}`.
- Spinner: reuse `../button/ButtonSpinner`.
- Mirroring: same `bw-icon-directional` mechanism as Button.
- **Tooltip motion (1.1, finding 2):** B4 easing on the transition slot — enter `cssVars.motion.easing['standard-decelerate']`, exit `cssVars.motion.easing['standard-accelerate']` (the theme's `transitions.easing.easeOut` / `easeIn` resolve to the same tokens). `timeout` and `enterDelay` are JS numbers, so CSS `prefers-reduced-motion` never reaches them: read `useMediaQuery('(prefers-reduced-motion: reduce)')` and, when it matches, use `base.motion.duration.instant` for the enter / exit timeouts (the tooltip appears without a fade). Hover delay and keyboard-focus behaviour are otherwise unchanged.
- **Tooltip name (1.1, finding 3):** with `describeChild={false}` MUI puts `aria-label={title}` on the cloned child. When `disabled`, that child is the private `<span class="bw-icon-button__tooltip-anchor">`; give the span `aria-label={undefined}` (the child's own props win over MUI's) so only the `<button>` is named (B6).
- **Tooltip offset (1.1, finding 7):** one source for B3.4's offset — the popper `offset` modifier reads a numeric `offset` entry in `iconButtonTooltipTokens` (from `base.spacing.xs`); no second read of `base.spacing.xs` in `IconButtonTooltip.tsx`, no unused entry.
- **Label check (1.1, finding 9):** warn "IconButton needs a label" when `label.trim().length === 0` (whitespace-only labels too).
- **Test tooling (1.1, finding 6):** render only through `renderWithBiowave` from `src/test/render.tsx`, which after the rebase gives each test a fresh speedy Emotion cache, reset in `setup.ts` after `cleanup()` (Button plan 1.2, C3 › Test tooling). Do not create an Emotion cache or `BiowaveProvider` in the test file; do not pass per-test timeouts; do not change `vitest.config.ts`. Tooltip tests use fake timers advanced by the token durations (`base.motion.duration.*`) inside `act`, never real-time waits.

### Token gaps

None.

### Files to create / change

```
3-web-components/src/components/icon-button/IconButton.tsx         new
3-web-components/src/components/icon-button/iconButton.tokens.ts   new (selected states only)
3-web-components/src/components/icon-button/IconButtonTooltip.tsx  new (private)
3-web-components/src/components/icon-button/IconButton.test.tsx    new
3-web-components/src/components/icon-button/index.ts               new
3-web-components/src/index.ts                                      change: export IconButton
3-web-components/README.md                                         change: status row
— (1.1) Fix round 1, review round 1 —
3-web-components/src/components/icon-button/IconButton.tsx         change: trimmed-label warning (#9)
3-web-components/src/components/icon-button/IconButtonTooltip.tsx  change: easing + reduced motion (#2), anchor aria-label (#3), offset source (#7)
3-web-components/src/components/icon-button/iconButton.tokens.ts   change: numeric tooltip offset, no unused entry (#7)
3-web-components/src/components/icon-button/IconButton.test.tsx    change: deterministic Esc test (#1), no raised timeouts (#4), B9 coverage (#5)
```

## 10. Tests

- [ ] Every allowed `variant` × `color` × `size`, selected and unselected, light + dark, en + ar
- [ ] Accessible name = `label`; tooltip shows on hover and focus, hides on Esc; no duplicate name in the a11y tree
- [ ] Toggle: `aria-pressed` follows `selected`; `selectedIcon` swaps
- [ ] Loading/disabled as Button tests
- [ ] Invalid combinations warn and fall back
- [ ] Directional icon mirrors in RTL; `close` does not
- [ ] axe passes; no raw values (lint test)

B9, plus (1.1):
- [ ] Esc hides the tooltip deterministically: fake timers, `act(() => vi.advanceTimersByTime(base.motion.duration.sm))`, then assert the tooltip is gone (or the controlled `open` is false); tooltip-opening interactions wrapped in `act` (no `act()` warnings) (#1)
- [ ] No timeout arguments in `IconButton.test.tsx`; every test passes under the 5 s default (#4)
- [ ] Table-driven token assertions from the rendered CSS rules for every allowed `variant` × `color`, unselected (Button's table) and selected (B3.2: `text` and `outlined` × 5 colors, plus disabled-selected) (#5a, #5b)
- [ ] Fallbacks assert the result, not only the warning: `tonal` + `neutral` / `inverse` renders `outlined` tokens; `toggle` with `filled` / `tonal` has no `aria-pressed`; whitespace-only `label` warns (#5c, #9)
- [ ] axe in `en` and `ar`, light and dark, for enabled, disabled, loading and tooltip-on states — including `disabled` + tooltip on (no `aria-label` on the anchor span) (#3, #5d)
- [ ] Tooltip easing: enter uses `motion-easing-standard-decelerate`, exit `motion-easing-standard-accelerate`; with `matchMedia('(prefers-reduced-motion: reduce)')` mocked to match, the timeouts are `motion-duration-instant` (#2, #5e)
- [ ] Tooltip offset comes from `iconButtonTooltipTokens` (#7)

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API = B1 (names, defaults, fallbacks)
- [ ] AC-2 Unselected styles come from Button's token table (no duplicated values); selected from B3.2
- [ ] AC-3 Transitions B4; reduced motion
- [ ] AC-4 RTL B5; a11y B6 (single accessible name, `aria-pressed`)
- [ ] AC-5 `npm run typecheck`, `npm run test:web`, `npm run sync` pass
- [ ] AC-6 Exported; README status updated
- [ ] AC-7 (1.1, findings 4, 6) Branch rebased on `ds/button-web` (PR #1) shared test tooling; `IconButton.test.tsx` has no raised timeouts; `npm run test:web` **as configured** passes with the default 5 s timeout, **3 full runs green**
- [ ] AC-8 (1.1, findings 2, 3) Tooltip easing and reduced motion per C3 › Tooltip motion; disabled anchor span carries no `aria-label` (C3 › Tooltip name)
- [ ] AC-9 (1.1, findings 1, 5) C6 (1.1) tests exist and pass
- [ ] AC-10 (1.1, findings 7, 9) One source for the tooltip offset; whitespace-only label warns
- [ ] AC-11 (1.1) C8 gets a "Fix round 1" entry listing every command with ✓/✗ and real numbers: `npm run typecheck`, `npm run test:web` ×3 (passed/total, duration), `npm run docs:check`, `npm run sync`; plus the slowest Icon button test time

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
0. Precondition (#6): `ds/icon-button-web` is rebased on `ds/button-web` (PR #1) — or on `main` once PR #1 is merged — by the orchestrator before the round starts; the Executor does not switch branches. Check that `src/test/render.tsx` exports `resetTestEmotionCaches` and `src/test/setup.ts` calls it after `cleanup()`; if not, stop and report in C8 › Questions
1. #1 Deterministic Esc tooltip test; tooltip interactions in `act` — `IconButton.test.tsx`
2. #2 Tooltip easing + reduced-motion timeouts — `IconButtonTooltip.tsx` + test (C3 › Tooltip motion)
3. #3 `aria-label={undefined}` on the disabled tooltip anchor — `IconButtonTooltip.tsx` + axe test with `disabled` + tooltip on, light/dark
4. #4 Remove the raised timeouts (`IconButton.test.tsx:86` `30_000`, `:287` `20_000`); render only through `renderWithBiowave`
5. #5 B9 gaps (a)–(e) — `IconButton.test.tsx` (C6 1.1)
6. #7 One tooltip offset source — `iconButton.tokens.ts`, `IconButtonTooltip.tsx`
7. #9 Warn on `label.trim().length === 0` — `IconButton.tsx` + test
8. C8 "Fix round 1" entry (AC-11); one `CHANGELOG.md` entry

Files the Executor may touch in this fix round: exactly the four (1.1) files in C5, C8 of this file and `CHANGELOG.md`. Not the shared test tooling, Button, Split button or Button group files.

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

1. Fill [C8 Execution log](icon-button.md#c8-execution-log-filled-by-the-executor) in `icon-button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `icon-button.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
