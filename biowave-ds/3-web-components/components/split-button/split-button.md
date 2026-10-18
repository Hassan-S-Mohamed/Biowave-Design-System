# Split button · زر مقسّم — Web

> **One file for Split button on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web split-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Summary | Pairs one primary action with a short menu of closely related alternatives. |
| Summary (ar) | يجمع إجراءً أساسياً واحداً مع قائمة قصيرة من البدائل المرتبطة به. |
| Parts | Primary action · menu trigger · menu · menu item |
| Parts (ar) | الإجراء الأساسي · مشغّل القائمة · القائمة · عنصر القائمة |
| Platform | Web · React + MUI |
| Built on | Composition of Biowave `Button` (`primary-action`) + `IconButton` (`menu-trigger`) + MUI `Menu`/`MenuItem` (temporary, until the Menu component on Day 10) |
| Import | `import { SplitButton } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Split Button` (legacy reference: Foundations `4298:3591`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/split-button/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens yet) |
| Contracts | [`split-button-contract.md`](split-button-contract.md) · [`figma-split-button-contract.md`](figma-split-button-contract.md) — generated, never edited |
| Docs page | [`split-button.html`](split-button.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/split-button/split-button.md#b--spec) · [Mobile](../../../5-mobile-components/components/split-button/split-button.md#b--spec) |
| Figma | `↳ Split Button` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | [Button](../button/button.md#a--guidelines) · [Icon button](../icon-button/icon-button.md#a--guidelines) · Split button · [Button group](../button-group/button-group.md#a--guidelines) |
| Version | 1.0 · 2026-10-16 |

### A1 Overview

A split button joins a main action with a menu of related alternatives: "Export" + PDF / Excel / CSV, "Approve" + Approve all / Approve with note. The main part runs the most common choice in one press; the chevron part opens the menu. It is built from a [Button](../button/button.md#a--guidelines) and an [Icon button](../icon-button/icon-button.md#a--guidelines), so it looks and behaves like them.

![Split button — light and dark](assets/overview.png)

### A2 Anatomy

```
  ①
  ┌──────────────────────┐ ┌─────┐
  │ ②[◆]  Export report  │ │ ③[⌄]│      ④ menu (opens below, aligned to the end)
  └──────────────────────┘ └─────┘      ┌────────────────────┐
                         ⑤ gap          │ Export as PDF      │
                                        │ Export as Excel    │
                                        └────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Groups the two parts; outer corners rounded, inner corners tight |
| 2 | `primary-action` | Yes | A Button: runs the most common action |
| 3 | `menu-trigger` | Yes | An Icon button with a chevron: opens the menu |
| 4 | `menu` | Yes | The alternatives (Menu component) |
| 5 | `gap` | Yes | Small gap that separates the two hit areas |

### A3 Usage

**When to use**
- One action is clearly the most common, and 2–5 close alternatives exist (export formats, approve variants, save as draft)

**When not to use**
| Situation | Use instead |
|---|---|
| The alternatives are unrelated actions | A Button plus an Icon button "More options" with a menu |
| There is no default action — the user must choose | A Button that opens a menu (dropdown button) |
| Only two actions | Two Buttons in a [Button group](../button-group/button-group.md#a--guidelines) |
| Destructive alternatives | Separate Buttons with confirmation |

### A4 Options

#### 4.1 `variant`
`filled` · `tonal` · `outlined` (same look as [Button A4.1](../button/button.md#41-variant--emphasis)). `text` is not available: without a container the two parts don't read as one control.

#### 4.2 `color`
`brand` (default) · `secondary` · `neutral`. Not `error` (destructive actions don't hide in menus) and not `inverse`.

#### 4.3 `size`
Same as [Button A4.3](../button/button.md#43-size): `sm` · `md` · `lg` · `xl` (touch only).

#### 4.4 `leading-icon`
Optional icon on the `primary-action`, same rule as Button.

**Combination rules**
- `tonal` only with `brand` and `secondary`.
- The menu has 2–5 items; the primary action is **not** repeated in the menu.

### A5 States and behavior

Each part has its own states, the same as [Button A5](../button/button.md#a5-states-and-behavior): hovering or pressing the chevron does not highlight the primary action.
| State | When | What the user sees |
|---|---|---|
| Expanded | Menu open | Chevron rotates; trigger keeps its pressed look until the menu closes |
| Loading | Primary action running | Primary part shows a spinner; trigger is disabled |
| Disabled | Whole control unavailable | Both parts disabled |

**Behavior rules**
- The menu opens below, aligned to the inline end of the control (flips above when there's no room).
- Choosing an item closes the menu and runs it; it does **not** change the primary action.
- Esc or a click outside closes the menu and returns focus to the trigger.

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| `primary-action` | Verb + object, like Button | 3 words |
| menu items | Same verb as the primary action + the difference: "Export as PDF" | 4 words |
| trigger label (not shown) | "More options for {primary label}" | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Export report · Export as PDF | تصدير التقرير · تصدير بصيغة PDF | Export · PDF |
| Approve · Approve with note | موافقة · موافقة مع ملاحظة | Approve · Other |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Put the most common choice in the primary part | ![](assets/dont-1.png) Repeat the primary action in the menu |
| ![](assets/do-2.png) Keep menu items as variations of the same action | ![](assets/dont-2.png) Mix unrelated actions (Export, Delete, Share) |
| ![](assets/do-3.png) Use one split button per area | ![](assets/dont-3.png) Place a split button next to a filled Button |

### A8 Platform notes — Web

| | Web |
|---|---|
| Default size | `md` |
| Menu | Dropdown menu |
| Interaction | Hover, click, keyboard (arrow keys in menu) |

### A9 Accessibility (design)

- Two separate focus stops: primary action, then trigger.
- The trigger has its own label and announces "collapsed / expanded".
- The menu is fully keyboard operable and returns focus to the trigger when it closes.

### A10 Related components

- [Button](../button/button.md#a--guidelines) and [Icon button](../icon-button/icon-button.md#a--guidelines) — the two parts
- Menu — the list of alternatives (Day 10; a placeholder menu is used until then)
- [Button group](../button-group/button-group.md#a--guidelines) — when two visible buttons are enough

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### SplitButton
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

### B2 Dimensions

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

### B3 Tokens by part and state

- `primary-action`: [Button B3](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`.
- `menu-trigger`: [Icon button B3.1](../icon-button/icon-button.md#31-unselected); **Expanded** = its Pressed tokens.
- `menu` item: hover `color-overlay-hover`, pressed `color-overlay-pressed`, focus (keyboard) `color-overlay-hover` + `color-border-focus` inner ring, disabled `color-text-neutral-disabled`; icon `color-icon-neutral-subtle`.

### B4 States and transitions

Each part: [Button B4](../button/button.md#b4-states-and-transitions). Plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Collapsed → Expanded | trigger click · Enter · Space · ArrowDown/Up | chevron rotates half a turn; menu fades + scales in from the top-end | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Expanded → Collapsed | item chosen · Esc · click outside · Tab | chevron back; menu fades out | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant (no rotation animation; chevron still shows its final direction).

### B5 RTL

```
LTR  │ [◆] Export report │ │ [⌄] │        menu aligned to the inline end
RTL  │ [⌄] │ │ تصدير التقرير [◆] │
```
| Part | In RTL |
|---|---|
| layout, corner radii | Mirror (logical `border-start-start-radius` … ) |
| `expand_more` chevron | Does not mirror (points down) |
| `menu` | Anchored `bottom-end` (logical), so it opens toward the inline start |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `<div role="group" aria-label={children}>` containing two buttons |
| Trigger | `aria-label={menuLabel}`, `aria-haspopup="menu"`, `aria-expanded`, `aria-controls={menuId}` |
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

### B7 Examples

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

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every allowed `variant` × `color` × `size`, light + dark, en + ar; inner/outer radii correct in both directions
- [ ] Two focus stops; trigger `aria-expanded` toggles; menu keyboard table B6 fully
- [ ] Choosing an item runs `onSelect` once, closes, returns focus
- [ ] Loading disables the trigger and keeps focus on the primary action
- [ ] Invalid combinations warn
- [ ] axe passes (open and closed); no raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `split-button-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Web (React + MUI) |
| Depends on | Button and Icon button (web) **Built** |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`SplitButton` composes the real `Button` and `IconButton` (no re-styling) and a temporary MUI menu, and meets B1–B6, B9.

### C2 Scope

In: B1–B6, B9. Out: the Menu component (Day 10) — when it exists, swap `SplitButtonMenu` for it (leave `// TODO(menu)`).

### C3 Approach

- Render `Button` and `IconButton` with the same `variant`/`color`/`size`. Add an **internal** (not exported) `segment?: 'start' | 'end'` prop to both that sets the logical corner radii from B2. Document it as internal in their JSDoc; do not add it to their public spec.
- Menu: `SplitButtonMenu.tsx` (private) wraps MUI `Menu` + `MenuItem`, anchored to the container, `anchorOrigin`/`transformOrigin` bottom-end (MUI flips them under RTL), styled from B2–B3 tokens.
- Ids: `useId()` for `aria-controls`.

### C4 Token gaps

None.

### C5 Files to create / change

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

### C6 Tests

B9, plus: Button and IconButton tests still pass unchanged.

### C7 Acceptance criteria

- [ ] AC-1 API = B1
- [ ] AC-2 Parts are real `Button`/`IconButton` instances; only radii differ (no copied styles)
- [ ] AC-3 Transitions B4
- [ ] AC-4 RTL B5; a11y B6 (menu keyboard complete)
- [ ] AC-5 typecheck, tests, sync pass
- [ ] AC-6 Exported; README status updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-18 |
| Files changed | `src/components/split-button/SplitButton.tsx`, `SplitButtonMenu.tsx`, `SplitButton.test.tsx`, `index.ts`; internal segment support in Button and IconButton; package `src/index.ts`; Web components README |

**Deviations:** none
**Questions for the Planner:** `npm run docs:check` remains blocked by the repository-wide Doc Kit 1.2 change: 12 Figma contracts are stale, including this component's Figma contract. The code contract is current; no generated contract was edited by the Executor.

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-split-button-contract.md`.

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec); never written here. **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Split button |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Split Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Split Button` › `Split Button/EN` `4298:3591`, `Split Button/AR` `4298:3881` |
| Depends on | Button and Icon button (Web) `Built` in the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). The two parts **must be instances** of `Button` and `Icon Button` (rule 6), with only their corner radii overridden (bound to `radius/xs` on the inner corners).

### D2 Component structure

```
❖ Split Button         ← published set
   contains instances of ❖ Button and ❖ Icon Button — no own drawing
```

### D3 Layer tree and auto layout

```
Split Button            ↔ horizontal · gap spacing/xxs · hug
├── primary-action      ◇ Button instance · Variant/Color/Size/Language follow the set · inner corners radius/xs · exposed: Label, Leading icon, Leading icon glyph
└── menu-trigger        ◇ Icon Button instance · same Variant/Color/Size · inner corners radius/xs · Icon = expand_more · Tooltip label = "More options"
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Variant` | VARIANT | `Filled` · `Tonal` · `Outlined` | `Filled` | `variant` |
| `Color` | VARIANT | `Brand` · `Secondary` · `Neutral` | `Brand` | `color` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` |
| `State` | VARIANT | `Default` · `Primary hover` · `Primary pressed` · `Trigger hover` · `Expanded` · `Focused primary` · `Focused trigger` · `Disabled` · `Loading` | `Default` | `disabled` / `loading`; others interaction only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Label` | TEXT (nested, exposed) | | `Export report` | `children` |
| `Leading icon` · `Leading icon glyph` | BOOLEAN · INSTANCE_SWAP (nested, exposed) | | `false` | `startIcon` |

### D5 Variants to generate

Allowed `Variant × Color`: Filled/Outlined × 3 + Tonal × 2 = 8 × 3 sizes × 9 states × 2 languages = **432**.

#### Legacy mapping (legacy sets are not edited)
| Legacy | New |
|---|---|
| `Type` Brand · Secondary · Neutral · Default | `Color` Brand · Secondary · Neutral (`Default` ≈ `Neutral`, report) |
| `Type` Success · Error · Warning · Info | removed |
| `State=Ghost` | `Variant=Outlined` (verify visually) |
| `Show Menu Buttons` + embedded menu | removed (Menu component) |
| `Size` SM · M · XL | `SM` · `MD` · `LG` |
| `/EN` · `/AR` sets | `Language` EN · AR |

#### After `Approved`
Report instances of `4298:3591` / `4298:3881` in the Foundations file; move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

Primary part hover/press, trigger hover/press as their own components. On click trigger → `Expanded` (smart animate `motion-duration-md`, chevron rotation). A docs-only prototype frame shows the open menu using a placeholder list until Menu exists.

### D7 RTL

`Language=AR`: reverse order (trigger first in the auto layout), inner/outer radii swap sides, Arabic label. Chevron not mirrored.

### D8 Documentation pages

12 standard pages in `Split Button — Documentation`; blocked until the Doc Kit. 05 Usage: "don't repeat the primary action" pair. 09 Accessibility: two focus stops, keyboard table.

Component description: "Main action plus a menu of related alternatives. Spec: 3-web-components/components/split-button/split-button.md".

### D9 Code Connect

`3-web-components/src/components/split-button/SplitButton.figma.tsx` — mapping D4; `options` documented as an example array.

### D10 Acceptance criteria

- [ ] F-AC-1 Parts are instances of Button / Icon Button (no detached or drawn parts)
- [ ] F-AC-2 Properties D4 exactly; F-AC-3 432 variants
- [ ] F-AC-4 Zero raw values; F-AC-5 Light/Dark by mode
- [ ] F-AC-6 AR per D7; F-AC-7 zero local variables/styles; legacy mapping in the review
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

1.0 — initial Web implementation: real Button and IconButton segments, tokenized temporary MUI menu, controlled/uncontrolled open state, complete keyboard navigation, RTL logical corners, public exports and contract tests. No API change from the initial spec.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Split Button/EN·AR` sets | `Type` (colors) → `color` brand/secondary/neutral · `State=Ghost` → `variant=outlined` · `Show Menu Buttons` removed (menu is a separate component) · two sets → one with `Language` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
