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
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/icon-button/` — not built yet (the Executor creates it) |
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
import { IconButton } from '@biowave/web';
import Icon from '@mui/material/Icon';   // until the Biowave Icon ships (D-18)

<IconButton icon={<Icon baseClassName="material-symbols-rounded">edit</Icon>} label="Edit device" onClick={edit} />
<IconButton toggle selected={pinned} icon={<Icon baseClassName="material-symbols-rounded">push_pin</Icon>} selectedIcon={<Icon baseClassName="material-symbols-rounded" sx={{ fontVariationSettings: "'FILL' 1" }}>push_pin</Icon>}
            label={pinned ? 'Unpin' : 'Pin'} onClick={() => setPinned(!pinned)} />
// Arabic: same props, Arabic label
<IconButton icon={<Icon baseClassName="material-symbols-rounded">edit</Icon>} label="تعديل الجهاز" onClick={edit} />
```

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
| Depends on | **Button (web) Built** — reuses `button.tokens.ts`, `ButtonSpinner`, `warnOnce`, test setup |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`IconButton` from `@biowave/web` matches B1–B6 and passes C9, sharing Button's token map so both always look the same.

### C2 Scope

In: B1–B6, B9. Out: Badge on icon button (composition later), the real Tooltip component (Day 4).

### C3 Approach

- Wrap MUI `IconButton` (`disableRipple`, `color="inherit"`), styled with the **same** `button.tokens.ts` table (import it; do not copy values). Add a `selected` table for B3.2 in `iconButton.tokens.ts`.
- Square: `width` and `height` = size token, `padding: 0`.
- Tooltip: MUI `Tooltip` with `title={label}`, `describeChild={false}`, `enterDelay={base.motion.duration['2xl']}` (numeric token from `@biowave/foundations` `base`; never a literal number), styled per B3.4 in `IconButtonTooltip.tsx` (private). Disable with `tooltip={false}`.
- Spinner: reuse `../button/ButtonSpinner`.
- Mirroring: same `bw-icon-directional` mechanism as Button.

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
```

### C6 Tests

B9.

### C7 Acceptance criteria

- [ ] AC-1 API = B1 (names, defaults, fallbacks)
- [ ] AC-2 Unselected styles come from Button's token table (no duplicated values); selected from B3.2
- [ ] AC-3 Transitions B4; reduced motion
- [ ] AC-4 RTL B5; a11y B6 (single accessible name, `aria-pressed`)
- [ ] AC-5 `npm run typecheck`, `npm run test:web`, `npm run sync` pass
- [ ] AC-6 Exported; README status updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-18 |
| Files changed | `src/components/icon-button/IconButton.tsx`, `IconButtonTooltip.tsx`, `iconButton.tokens.ts`, `IconButton.test.tsx`, `index.ts`; package `src/index.ts`; Web components README |

**Deviations:** none
**Questions for the Planner:** `npm run docs:check` remains blocked by the repository-wide Doc Kit 1.2 change: 12 Figma contracts are stale, including this component's Figma contract. The code contract is current; no generated contract was edited by the Executor.

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
| `Icon` | INSTANCE_SWAP | Google · Material Symbols (Rounded) | `edit` | `icon` | `<Icon baseClassName="material-symbols-rounded">{glyph}</Icon>` |
| `Selected icon` | INSTANCE_SWAP | Google · Material Symbols (Rounded, Fill=Filled) | `edit` | `selectedIcon` | same glyph with class `bw-icon-fill` |
| `Tooltip label` | TEXT | | `Edit device` | `label` | |

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
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.0 — initial Web implementation: MUI IconButton composition, shared Button visual tokens, selected-toggle tokens, tokenized tooltip, loading state, RTL icon handling, public exports and contract tests. No API change from the initial spec.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Icon Button` set | `Style` Standard → `variant` text · Color Default → `neutral` · Sizes XS–XL (Material 3 Expressive, 32–136) → control sizes `sm`–`xl` · `Width` and `Shape` removed (one rounded-square shape, matches Button) · `Type=Toggle` + `Selected` → `toggle` + `selected` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
