# Icon button · زر أيقونة — Web

> **One file for Icon button on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web icon-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Icon button · زر أيقونة |
| Summary | A compact action for familiar symbols. Every icon button keeps a visible tooltip and an accessible name. |
| Summary (ar) | إجراء مدمج للرموز المألوفة. يحتفظ كل زر أيقونة بتلميح مرئي واسم واضح لقارئات الشاشة. |
| Parts | Container · icon · tooltip · spinner · focus ring |
| Parts (ar) | الحاوية · الأيقونة · التلميح · مؤشر التحميل · حلقة التركيز |
| Platform | Web · React + MUI |
| Built on | MUI `IconButton` (native `<button>`), styled only from Biowave tokens (no ripple, no MUI colors). Tooltip: MUI `Tooltip` with the tokens in B3.4, until the Tooltip component (Day 4) replaces it |
| Import | `import { IconButton } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Icon Button` (legacy reference: Foundations `4310:3146`) · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-21 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 1 · 2026-10-21 · Changes requested |
| Source code | [`src/components/icon-button/`](../../src/components/icon-button/) |
| Tokens | — (no component tokens yet) |
| Contracts | [`icon-button-contract.md`](icon-button-contract.md) · [`figma-icon-button-contract.md`](figma-icon-button-contract.md) — generated, never edited |
| Docs page | [`icon-button.html`](icon-button.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/icon-button/icon-button.md#b--spec) · [Mobile](../../../5-mobile-components/components/icon-button/icon-button.md#b--spec) |
| Figma | `↳ Icon Button` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | [Button](../button/button.md#a--guidelines) · Icon button · [Split button](../split-button/split-button.md#a--guidelines) · [Button group](../button-group/button-group.md#a--guidelines) |
| Version | 1.0 · 2026-10-16 |

### A1 Overview

An icon button starts an action shown only as an icon: close, edit, more options, notifications, filter. It saves space in toolbars, table rows, cards and app bars. Its name is never visible, so it always has an accessible label, and a tooltip on web. It can also be a **toggle** (pin, favourite, show password) that stays selected.

![Icon button — light and dark](assets/overview.png)

### A2 Anatomy

```
  ①┌───────┐         toggle, selected
   │  ②[◆] │        ┌───────┐
   └───────┘        │  [◆]  │  ← filled glyph + selected fill
   ③ tooltip        └───────┘
   ④ focus ring
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square hit area and fill |
| 2 | `icon` | Yes | The action. Outlined glyph; filled glyph when a toggle is selected |
| 3 | `tooltip` | Web: yes · touch: on long press | Shows the label on hover and keyboard focus |
| 4 | `focus-ring` | Focus only | Shows keyboard focus |
| — | `spinner` | Loading only | Replaces the icon while the action runs |

### A3 Usage

**When to use**
- Common, recognisable actions where space is tight: close, edit, delete in a row, more options, refresh, filter
- App bars, table rows, card headers, toolbars
- Toggles with a clear on/off icon: pin, favourite, mute, show password

**When not to use**
| Situation | Use instead |
|---|---|
| The icon is not universally understood | [Button](../button/button.md#a--guidelines) with a label (and the icon as `leading-icon`) |
| The main action of a form or dialog | [Button](../button/button.md#a--guidelines) `filled` |
| The icon opens a menu of related actions next to a main action | [Split button](../split-button/split-button.md#a--guidelines) |
| Choosing one option from a set of icons | Segmented button |

### A4 Options

#### 4.1 `variant` — emphasis
Same scale as [Button A4.1](../button/button.md#41-variant--emphasis).
| Value | Looks like | Pick it when |
|---|---|---|
| `filled` | `[■◆■]` | Rare: the single main action shown as an icon (e.g. send in a message box) |
| `tonal` | `[▒◆▒]` | A prominent icon action that must not compete with a filled Button |
| `outlined` | `[─◆─]` | Icon actions next to outlined Buttons, or on busy backgrounds that need a boundary |
| `text` | ` ◆ ` | **Default.** App bars, table rows, card headers (Material calls this "standard") |

#### 4.2 `color`
Same values and rules as [Button A4.2](../button/button.md#42-color): `brand` · `secondary` · `neutral` · `error` · `inverse`. **Default for icon buttons: `neutral`**: most icon actions are utilities. Use `error` for delete in a row only when it isn't followed by a confirmation; otherwise `neutral`.

#### 4.3 `size`
Same scale as [Button A4.3](../button/button.md#43-size), so icon buttons line up with buttons in a row: `sm` · `md` (web default) · `lg` (touch default) · `xl` (touch only). The container is square.

#### 4.4 `toggle` and `selected`
| Value | Pick it when |
|---|---|
| `toggle` off | Default. The press runs an action |
| `toggle` on | The press switches a state (pin, favourite). `selected` shows the current state with a filled glyph and a selected fill |

**Combination rules**
- `tonal` is not available with `neutral` or `inverse`.
- `toggle` is available with `text` and `outlined` only (filled and tonal already look selected).
- `xl` is not available on web.
- A label is always required (accessible name and tooltip), even though it isn't shown.

### A5 States and behavior

Same states as [Button A5](../button/button.md#a5-states-and-behavior), plus:
| State | When it happens | What the user sees |
|---|---|---|
| Selected (toggle) | Toggle is on | Selected fill and the filled glyph |
| Tooltip | Hover (after a short delay) or keyboard focus on web; long press on touch | Label in a tooltip |

**Behavior rules**
- The label changes with a toggle when the action changes: "Pin" ↔ "Unpin".
- Loading replaces the icon with a spinner; the size never changes.
- In a row of icon buttons, keep one size and one variant.

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| label (tooltip + accessible name) | Verb first, says the action, not the icon: "Delete user", not "Trash" | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Close | إغلاق | X |
| Edit device | تعديل الجهاز | Pencil |
| More options | خيارات أخرى | Menu, … |
| Show password | إظهار كلمة المرور | Eye |
| Notifications | الإشعارات | Bell |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Use well-known icons and give every one a label | ![](assets/dont-1.png) Use a custom or ambiguous icon with no label |
| ![](assets/do-2.png) Keep one size and variant in a toolbar | ![](assets/dont-2.png) Mix filled, outlined and text icon buttons in one row |
| ![](assets/do-3.png) Use a Button with a label for the main action | ![](assets/dont-3.png) Make a form's submit an icon button |
| ![](assets/do-4.png) Change the label when a toggle changes ("Pin" ↔ "Unpin") | ![](assets/dont-4.png) Rely on the filled glyph alone to show a toggle state |

### A8 Platform notes — Web

| | Web |
|---|---|
| Default size | `md` |
| Tooltip | Hover + keyboard focus |
| Touch target | Visual size (≥ 24) |

### A9 Accessibility (design)

- Every icon button has a label that screen readers announce, in English and Arabic.
- Toggles announce their state ("Pin, toggle button, pressed").
- Focus ring visible on keyboard focus; `inverse` ring on brand surfaces.
- The icon meets 3:1 against its background; selected and unselected differ by more than color (glyph fill).

### A10 Related components

- [Button](../button/button.md#a--guidelines) — the same actions with a visible label
- [Split button](../split-button/split-button.md#a--guidelines) — uses an icon button as its menu trigger
- Tooltip — shows the label
- Badge — counts on an icon button (e.g. notifications), placed by composition

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### IconButton
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

### B2 Dimensions

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

### B3 Tokens by part and state

#### 3.1 Unselected
Exactly [Button B3.1–B3.5](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`, with `icon` taking the Button's icon token.

#### 3.2 Selected (`toggle` + `selected`, text and outlined only)
| `color` | `container` background | State layer · Hover / Pressed | `icon` | `container` border (outlined) |
|---|---|---|---|---|
| `brand` | `color-background-brand-subtle` | `color-overlay-hover` / `color-overlay-pressed` | `color-icon-role-brand` | `color-border-brand` |
| `secondary` | `color-background-secondary-subtle` | same | `color-icon-role-secondary` | `color-border-secondary` |
| `error` | `color-background-error-subtle` | same | `color-icon-role-error` | `color-border-error` |
| `neutral` | `color-background-neutral-default` | same | `color-icon-neutral-default` | `color-border-strong` |
| `inverse` | `color-background-inverse-default` | same | `color-icon-role-brand` | `color-border-inverse` |
| Disabled | `color-background-neutral-disabled` | — | `color-icon-neutral-disabled` | `color-border-disabled` |

#### 3.3 Focus
As Button B3.5 (`inverse` uses `color-border-inverse`).

#### 3.4 Tooltip (temporary, until Tooltip component)
| Part | Property | Token |
|---|---|---|
| `tooltip` | background · text | `color-surface-inverse` · `color-text-neutral-inverse` |
| `tooltip` | text style · radius | `label-sm` · `radius-sm` |
| `tooltip` | padding-block · padding-inline | `spacing-xs` · `spacing-md` |
| `tooltip` | offset from button | `spacing-xs` |

### B4 States and transitions

As [Button B4](../button/button.md#b4-states-and-transitions), plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Unselected ↔ Selected | click / Enter / Space (toggle) | background, icon swap (cross-fade) | `motion-duration-sm` | `motion-easing-standard` |
| Tooltip hidden → shown | hover after `motion-duration-2xl` delay · keyboard focus immediately | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Tooltip shown → hidden | pointer leave · blur · Esc | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant; tooltip appears without fade.

### B5 RTL

| Part | In RTL |
|---|---|
| `icon` — directional (arrow_back, arrow_forward, chevron_left/right, undo, redo, logout, open_in_new) | Mirrors (same mechanism as Button B5) |
| `icon` — non-directional (close, edit, delete, more_vert, search, notifications) | Does not mirror |
| `tooltip` | Placement `top`; flips by the provider's direction when placed start/end |

### B6 Accessibility (implementation)

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

### B7 Examples

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

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every allowed `variant` × `color` × `size`, selected and unselected, light + dark, en + ar
- [ ] Accessible name = `label`; tooltip shows on hover and focus, hides on Esc; no duplicate name in the a11y tree
- [ ] Toggle: `aria-pressed` follows `selected`; `selectedIcon` swaps
- [ ] Loading/disabled as Button tests
- [ ] Invalid combinations warn and fall back
- [ ] Directional icon mirrors in RTL; `close` does not
- [ ] axe passes; no raw values (lint test)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `icon-button-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec). Nothing else unless linked here.

| Field | Value |
|---|---|
| Component | Icon button |
| Platform | Web (React + MUI) |
| Depends on | **Button (web) Built** — reuses `button.tokens.ts`, `ButtonSpinner`, `warnOnce`, test setup · **(1.1) Button plan 1.2 test tooling** on `ds/button-web` (PR #1): shared per-test speedy Emotion cache in `src/test/render.tsx` + `setup.ts` (review finding 6). Fix round 1 starts only after `ds/icon-button-web` is rebased on it |
| Plan version | 1.1 · 2026-10-21 |

### C1 Goal

`IconButton` from `@biowave/web` matches B1–B6 and passes C9, sharing Button's token map so both always look the same.

### C2 Scope

In: B1–B6, B9; (1.1) review round 1 fixes — the Fix round 1 task list under C7. Out: Badge on icon button (composition later), the real Tooltip component (Day 4); any change to the shared test tooling, Button, Split button or Button group files.

### C3 Approach

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

### C4 Token gaps

None.

### C5 Files to create / change

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

### C6 Tests

B9, plus (1.1):
- [ ] Esc hides the tooltip deterministically: fake timers, `act(() => vi.advanceTimersByTime(base.motion.duration.sm))`, then assert the tooltip is gone (or the controlled `open` is false); tooltip-opening interactions wrapped in `act` (no `act()` warnings) (#1)
- [ ] No timeout arguments in `IconButton.test.tsx`; every test passes under the 5 s default (#4)
- [ ] Table-driven token assertions from the rendered CSS rules for every allowed `variant` × `color`, unselected (Button's table) and selected (B3.2: `text` and `outlined` × 5 colors, plus disabled-selected) (#5a, #5b)
- [ ] Fallbacks assert the result, not only the warning: `tonal` + `neutral` / `inverse` renders `outlined` tokens; `toggle` with `filled` / `tonal` has no `aria-pressed`; whitespace-only `label` warns (#5c, #9)
- [ ] axe in `en` and `ar`, light and dark, for enabled, disabled, loading and tooltip-on states — including `disabled` + tooltip on (no `aria-label` on the anchor span) (#3, #5d)
- [ ] Tooltip easing: enter uses `motion-easing-standard-decelerate`, exit `motion-easing-standard-accelerate`; with `matchMedia('(prefers-reduced-motion: reduce)')` mocked to match, the timeouts are `motion-duration-instant` (#2, #5e)
- [ ] Tooltip offset comes from `iconButtonTooltipTokens` (#7)

### C7 Acceptance criteria

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

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-18 |
| Files changed | `src/components/icon-button/IconButton.tsx`, `IconButtonTooltip.tsx`, `iconButton.tokens.ts`, `IconButton.test.tsx`, `index.ts`; package `src/index.ts`; Web components README |

**Deviations:** none
**Questions for the Planner:** `npm run docs:check` remains blocked by the repository-wide Doc Kit 1.2 change: 12 Figma contracts are stale, including this component's Figma contract. The code contract is current; no generated contract was edited by the Executor.

#### Fix round 1 — 2026-10-21

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 | `IconButton.test.tsx:191` uses fake timers and token durations for focus, Escape, exit, and hover interactions, all inside `act` | `has one accessible name and shows and hides its visual tooltip deterministically` |
| #2 | `IconButtonTooltip.tsx:18,67` applies the specified enter/exit easing and instant reduced-motion timeouts; `iconButton.tokens.ts:87` owns the easing tokens | `uses the specified tooltip easing and token-owned offset`; `uses instant tooltip timeouts when reduced motion is requested` |
| #3 | `IconButtonTooltip.tsx:22` explicitly removes `aria-label` from the disabled tooltip anchor | Four light/dark × en/ar axe cases at `IconButton.test.tsx:386`, each with a disabled open tooltip, pass with one button name |
| #4 | `IconButton.test.tsx:105` uses only `renderWithBiowave`; both raised timeout arguments were removed | Icon button 15/15 under default timeouts; three full Web runs pass 93/93 |
| #5 | `IconButton.test.tsx:105,147,317,386` adds rendered-rule assertions for every unselected and selected token combination, disabled-selected states, fallback results, whitespace validation, and the full theme/locale/state axe matrix | `renders every supported variant…`; `uses every selected…`; `warns and applies…`; four `has no axe violations…` cases |
| #7 | `iconButton.tokens.ts:80` owns the numeric tooltip offset; `IconButtonTooltip.tsx:49` consumes that entry without a second `base.spacing.xs` read | `uses the specified tooltip easing and token-owned offset` |
| #9 | `IconButton.tsx:291` validates `label.trim().length` | `warns and applies the specified fallbacks` passes with a whitespace-only label |

**Checks:**
- `npm run typecheck` ✓
- `npm run test:web` run 1 ✓ — 93/93, Vitest 8.96 s (wall 9.67 s)
- `npm run test:web` run 2 ✓ — 93/93, Vitest 6.27 s (wall 6.86 s)
- `npm run test:web` run 3 ✓ — 93/93, Vitest 5.94 s (wall 6.46 s)
- Slowest Icon button test ✓ — 4.372 s, `renders every supported variant, color, and size with its unselected tokens in both themes and languages`
- `npm run docs:check` ✓ — 18 component files OK
- `npm run component-tokens` ✓ — web/tablet/mobile in sync
- `npm run sync` ✓ — READY

**Deviations:** none
**Questions for the Planner:** none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-icon-button-contract.md`.

> Executed by the **Figma Agent**. Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Icon button |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Icon Button` |
| Mode | **Create new**, keeping the legacy nested structure (Glyph / Appearance / outer set — the model for the family). Legacy reference (read only): Foundations file › `↳ Icon Button` › `Icon Button` `4310:3146`, `Icon Button / Appearance` `4310:2356`, `Icon Button / Glyph` `4310:1555` |
| Depends on | Button Part D (Web) `Built` — reuses `.Button/Spinner` from the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build).

### D2 Component structure

```
❖ Icon Button                    ← published set (size, toggle, selected)
  ├─ ❖ .Icon Button/Appearance   ← private set (variant × color × state × selected)
  └─ ❖ .Icon Button/Glyph        ← private set (size × selected: outlined / filled glyph swap)
```

### D3 Layer tree and auto layout

```
Icon Button              ↔ centered · width = height {B2} · padding 0
└── .Icon Button/Appearance  ◇ fill both axes · radius {B2} · fill/stroke {B3} · effect Focus/Ring when State=Focused
    ├── state-layer      ▭ absolute, fill {overlay-hover|pressed} in Hover/Pressed of tonal/outlined/text
    ├── icon             ◇ .Icon Button/Glyph · size {B2 icon} · fill {B3}
    └── spinner          ◇ .Button/Spinner · visible only State=Loading (icon opacity 0)
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) | Code value |
|---|---|---|---|---|---|
| `Variant` (on Appearance, exposed) | VARIANT | `Filled` · `Tonal` · `Outlined` · `Text` | `Text` | `variant` | |
| `Color` (exposed) | VARIANT | `Brand` · `Secondary` · `Neutral` · `Error` · `Inverse` | `Neutral` | `color` | |
| `State` (exposed) | VARIANT | `Default` · `Hover` · `Focused` · `Pressed` · `Disabled` · `Loading` | `Default` | `disabled` / `loading` | |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | |
| `Toggle` | VARIANT | `Off` · `On` | `Off` | `toggle` | |
| `Selected` | VARIANT | `False` · `True` | `False` | `selected` | only with `Toggle=On` |
| `Icon` | INSTANCE_SWAP | Google · Material Symbols (Rounded) | `edit` | `icon` | `<Icon name="{glyph}" />` |
| `Selected icon` | INSTANCE_SWAP | Google · Material Symbols (Rounded, Fill=Filled) | `edit` | `selectedIcon` | `<Icon name="{glyph}" filled />` |
| `Tooltip label` | TEXT | | `Edit device` | `label` | |

**Icons used:** `edit` (default `Icon` / `Selected icon`) · `push_pin` (toggle example, B7)

### D5 Variants to generate

- `.Icon Button/Appearance`: 18 allowed `Variant × Color` × 6 states = 108, + `Selected=True` for `Text`/`Outlined` × 5 colors × 6 states = 60 → **168**
- `Icon Button`: `Size` 3 × (`Toggle=Off` + `Toggle=On × Selected 2`) = **9**
- No `Language` axis (no visible text).

#### Legacy mapping (legacy set is not edited)
| Legacy | New |
|---|---|
| `Style` Standard · Filled · Tonal · Outlined | `Variant` Text · Filled · Tonal · Outlined |
| `Color` Default / Neutral (duplicates) | `Neutral` (report which one was kept as the visual reference) |
| `Color` Success · Warning · Info | removed |
| `Size` XS · S · M · L · XL (32–136, Material 3 Expressive) | `SM` · `MD` (`LG` new); M/L/XL have no web equivalent |
| `Width`, `Shape`, `Show Menu Buttons` | removed (one rounded-square shape; menu is a separate component) |
| `Type` Default · Toggle + `Selected` | `Toggle` Off · On + `Selected` |

#### After `Approved`
In the Foundations file: report instances of the three legacy sets, then move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

While hovering → Hover; while pressing → Pressed (B4). On click for `Toggle=On`: Selected False ↔ True, smart animate `motion-duration-sm`.

### D7 RTL

No RTL variants. Docs page 08 shows `arrow_back`/`arrow_forward` mirrored and `close`/`edit` not mirrored.

### D8 Documentation pages

12 standard pages (template D8) in section `Icon Button — Documentation`; blocked until the Doc Kit exists. 03 Variations: Variant, Color, Size, Toggle. 09 Accessibility: target-size overlay on `SM`, tooltip example.

Component description: "Starts an action shown as an icon. Always has a label. Spec: 3-web-components/components/icon-button/icon-button.md".

### D9 Code Connect

`3-web-components/src/components/icon-button/IconButton.figma.tsx` — mapping D4. After both reviews are `Approved`.

### D10 Acceptance criteria

- [ ] F-AC-1 Structure D2 with dot-prefixed private sets; layer names D3
- [ ] F-AC-2 Properties D4 exactly
- [ ] F-AC-3 Variant counts 168 / 9
- [ ] F-AC-4 Zero raw values (QA lint)
- [ ] F-AC-5 Light/Dark by mode only
- [ ] F-AC-6 Legacy mapping D5 in the review; zero local variables/styles in the file
- [ ] F-AC-7 Values match B2–B3 (redline)
- [ ] F-AC-8 Docs built or reported blocked

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | |
| Date | |
| Node IDs | |

**Deviations:** none
**Questions for the Planner:** none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 1 | 2026-10-21 | **Changes requested** | not reviewed |

### E2 Round 1 — 2026-10-21

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-21 |
| Verdict | **Changes requested** |

Code reviewed as it is on `main` (branch `ds/icon-button-web` has no diff against `main`): `3-web-components/src/components/icon-button/` (`IconButton.tsx`, `IconButtonTooltip.tsx`, `iconButton.tokens.ts`, `IconButton.test.tsx`, `index.ts`) and `src/index.ts:31-35`.

Commands run by the Reviewer (2026-10-21, on the user's machine):
`npm run typecheck` ✅ · `npm run sync` ✅ READY (exit 0) · `npm run test:web -- src/components/icon-button` ✅ 11/11 (alone) · `npm run test:web` ❌ three full runs: 85/87, 81/87, 84/87 — Button and SplitButton axe/keyboard tests time out in every run (outside this unit); `IconButton › has one accessible name and shows its visual tooltip…` failed in 1 of 3 full runs (finding 1) · `npm run docs:check` ❌ 2 errors, both the pre-existing stale tablet/mobile **button-group** Figma contracts (not this unit; accepted in earlier rounds).

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, fallbacks) | ✅ | `IconButton.tsx:27-44` props; defaults `:239-250` (`text`, `neutral`, `md`, `tooltip` true, `type` button); fallbacks + `warnOnce` `:259-293`; test *warns and applies the specified fallbacks* (warnings only — finding 5) |
| AC-2 Unselected from Button's table; selected from B3.2 | ✅ | `IconButton.tsx:9-19, 231` imports `resolveButtonTokens` / `buttonSizeTokens` (no copied values); `iconButton.tokens.ts:33-79` = B3.2 row for row (inverse icon `color-icon-role-brand`, neutral border `color-border-strong`, disabled row); test *uses square size tokens and the selected toggle token map* |
| AC-3 Transitions B4; reduced motion | ❌ | Toggle background + icon cross-fade use `motion-duration-sm` / `standard` (`IconButton.tsx:97-102, 157`) ✅. Tooltip fade uses the wrong easing and does not honour reduced motion (finding 2) |
| AC-4 RTL B5; a11y B6 | ⚠️ | Mirroring scoped to the wrapper `IconButton.tsx:169-171`, test *mirrors only directional icon wrappers in RTL* ✅; single name `aria-label` + icons `aria-hidden` `:317, 323` ✅; `aria-pressed` `:318` ✅; status region outside the button `:338-342` ✅. Disabled tooltip anchor gets a stray `aria-label` (finding 3) |
| AC-5 typecheck, test:web, sync pass | ❌ | typecheck ✅, sync ✅; `test:web` red (findings 1, 6); unit tests still raise timeouts (finding 4) |
| AC-6 Exported; README status updated | ✅ | `src/index.ts:31-35`; `3-web-components/README.md:49` Code = Built |

#### Rule checks (AGENTS.md §2 + step prompt)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No diff against `main`; `git status` clean apart from the run folder |
| Tokens only — no raw values, no primitives | ✅ | `cssVars.*` / `base.*` only; lint test *contains no raw colors, dimensions, durations, or font names* passes. Unused `offset` token (finding 7) |
| RTL logical properties | ✅ | `inlineSize`, `blockSize`, `borderStartStartRadius…`, `paddingInline`/`paddingBlock` (tooltip) |
| Both themes, both languages, tested | ⚠️ | Rendered in light/dark × en/ar, but only the button count is asserted; axe runs only in `en` (finding 5) |
| WCAG 2.2 AA | ⚠️ | Keyboard ✅ (*uses a native disabled button and activates with keyboard input*), focus ring = Button focus tokens `:122-125` ✅, target `sm` 32 ≥ 24 ✅. Finding 3 |
| Biowave `Icon` per D-18, no `@mui/icons-material` | ✅ | No `@mui/icons-material` import in the unit; tests use `Icon` from `../icon`; `noLegacyIcons.test.ts` passes. Spec B7 still shows `@mui/material/Icon` (finding 8) |
| Default test timeouts (Button round-2 pattern) | ❌ | `IconButton.test.tsx:86` `30_000`, `:287` `20_000` (finding 4) |
| Stayed inside the contract (C5 files) | ✅ | Exactly the C5 files; `segment` / `InternalIconButton` is an internal SplitButton hook, not public (`index.ts` exports only `IconButton` + types) |

#### Figma build (Part D)

Skipped — Figma build is `Planned` and `figma` is skipped in `_workflow/config.json`.

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | `IconButton.test.tsx:138-139` | Flaky: *has one accessible name and shows its visual tooltip on hover and focus* failed in 1 of 3 full `test:web` runs — after `Escape` the tooltip popper was still in the DOM when `waitFor`'s default 1 s ran out (real timers, exit `Fade` under suite load). The same tooltip state also triggers `act()` warnings from `IconButtonTooltip` in SplitButton / ButtonGroup tests | Make the Esc assertion deterministic (fake timers + `act(() => vi.advanceTimersByTime(...))` with the token duration, or assert the controlled `open` state / `aria-hidden`); wrap tooltip-opening interactions in `act`. Run `test:web` 3× green |
| 2 | 🟡 Should fix | `IconButtonTooltip.tsx:42-68` | B4: tooltip enter must use `motion-easing-standard-decelerate`, exit `motion-easing-standard-accelerate`; MUI `Fade` defaults to `easeInOut` = `standard` (rendered `transition: opacity 200ms cubic-bezier(0.2,0,0,1)`). B4 reduced motion "tooltip appears without fade": `timeout` and `enterDelay` are JS numbers from `base`, so `prefers-reduced-motion` (which only zeroes the CSS variables) never applies | Pass `easing: { enter: theme.transitions.easing.easeOut, exit: theme.transitions.easing.easeIn }` on the transition slot; when `useMediaQuery('(prefers-reduced-motion: reduce)')` is true use `base.motion.duration.instant` for the timeouts. Test both (mock `matchMedia`) |
| 3 | 🟡 Should fix | `IconButtonTooltip.tsx:19-21` · MUI `Tooltip.js:488-490` | With `describeChild={false}` MUI spreads `aria-label={title}` onto the cloned child. When `disabled`, that child is the private `<span class="bw-icon-button__tooltip-anchor">`, so a generic `span` carries `aria-label` (ARIA 1.2 prohibited on `generic`; axe `aria-prohibited-attr`). Not caught because every axe test sets `tooltip={false}` | Give the anchor span an explicit `aria-label={undefined}` (the child's own props override MUI's) so only the button is named; add an axe test with `disabled` + tooltip on, light/dark |
| 4 | 🟡 Should fix | `IconButton.test.tsx:86, 287` | Tests still raise their own timeouts (`30_000`, `20_000`); axe tests take ~5.5 s each alone. Button fixed this in round 2 with a shared per-test speedy Emotion cache and default timeouts — but that fix (`e8dc43b`, `src/test/render.tsx`) is on `ds/button-web`, not on `main`, so this branch can't use it yet | After finding 6 lands, use the shared speedy cache from `src/test/render.tsx` and remove both timeout arguments; keep per-test runtime under the 5 s default |
| 5 | 🟡 Should fix | `IconButton.test.tsx:56-123, 217-238, 262-289` | B9 gaps: (a) the variant × color × size × theme × locale test only counts buttons — no per-part token assertion, and unselected tokens are never checked; (b) selected tokens checked only for `outlined`/`brand` (not `text`, other colors, disabled-selected); (c) fallbacks: warnings asserted, but not the result (tonal+neutral renders outlined tokens; `toggle` with `filled` has no `aria-pressed`); (d) axe only `en`, only enabled, only tooltip off; (e) no reduced-motion test | Add table-driven assertions for every allowed variant × color (selected and unselected, incl. disabled) from the rendered CSS rules; assert fallback rendering; run axe in `ar` and with disabled / loading / tooltip-on states; add the reduced-motion test from #2 |
| 6 | 🟡 Should fix | `Button.test.tsx:592` · `SplitButton.test.tsx:149, 255` (outside this unit) | AC-5 needs `npm run test:web` green, but on `main` (and this branch) Button and SplitButton tests time out in every full run (3/87, 6/87, 2/87 failures). The fix exists only on the unmerged `ds/button-web` branch | Sequence: merge `ds/button-web` (shared speedy cache) to `main`, rebase `ds/icon-button-web`, then the Executor applies #4. Record the dependency in C (Depends on) |
| 7 | 🟢 Nit | `iconButton.tokens.ts:86` · `IconButtonTooltip.tsx:49` | `iconButtonTooltipTokens.offset` is defined but unused; the popper offset reads `base.spacing.xs` directly, so B3.4's offset lives in two places | Use one source (e.g. a numeric `offset` in the tooltip token map) or remove the unused entry |
| 8 | 🟢 Nit | `icon-button.md` B7 · header | B7 imports `@mui/material/Icon` "until the Biowave Icon ships (D-18)" — it has shipped; examples should use `<Icon name="edit" />` from `@biowave/web`. Header "Source code — not built yet (the Executor creates it)" is stale | Update B7 and the Source code header row |
| 9 | 🟢 Nit | `IconButton.tsx:291` | Only `label.length === 0` warns; a whitespace-only label gives an empty accessible name silently | Warn on `label.trim().length === 0` |

#### Next step

- Changes requested → Planner: #6 (dependency on `ds/button-web` merge), #8; set Plan `Finished` and regenerate the contract if A–D change.
- Executor (fix round 1, after the rebase): 🟡 #1–#5, 🟢 #7, #9; append a Fix round entry to C8.

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.1 — review round 1 Planner items: B7 uses the Biowave `Icon` (`<Icon name="…" />`); fix round 1 depends on the shared per-test speedy Emotion cache from `ds/button-web` (PR #1); C3/C5/C6/C7 carry the Fix round 1 task list (tooltip easing and reduced motion, disabled-anchor name, offset source, trimmed-label warning, deterministic and complete tests, no raised timeouts). No API change.

1.0 — initial Web implementation: MUI IconButton composition, shared Button visual tokens, selected-toggle tokens, tokenized tooltip, loading state, RTL icon handling, public exports and contract tests. No API change from the initial spec.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Icon Button` set | `Style` Standard → `variant` text · Color Default → `neutral` · Sizes XS–XL (Material 3 Expressive, 32–136) → control sizes `sm`–`xl` · `Width` and `Shape` removed (one rounded-square shape, matches Button) · `Type=Toggle` + `Selected` → `toggle` + `selected` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
| 1.1 | 2026-10-21 | Review round 1 Planner items: #8 B7 examples use the Biowave `Icon` (`<Icon name>`, `filled`), D4 code values, a D4 **Icons used** line and the header Source code updated; #6 C dependency on `ds/button-web` (PR #1) shared speedy Emotion cache, raised timeouts dropped. Executor findings #1–#5, #7, #9 folded into C3/C5/C6, C7 AC-7–AC-11 and the Fix round 1 task list. B1–B6 unchanged | No | — |
