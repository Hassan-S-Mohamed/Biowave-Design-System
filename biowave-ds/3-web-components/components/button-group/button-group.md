# Button group · مجموعة أزرار — Web

> **One file for Button group on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web button-group`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Button group · مجموعة أزرار |
| Summary | Arranges related actions with predictable priority, alignment, overflow, and responsive stacking. |
| Summary (ar) | يرتّب الإجراءات المرتبطة بأولوية ومحاذاة وتدفّق وتكديس متجاوب يمكن توقّعه. |
| Parts | Group · children · overflow trigger · overflow menu |
| Parts (ar) | المجموعة · العناصر · مشغّل الخيارات الإضافية · قائمة الخيارات |
| Platform | Web · React + MUI |
| Built on | Custom layout (`div` flex). **Not** MUI `ButtonGroup` (that is a connected control). Overflow uses `IconButton` + the temporary menu from Split button |
| Import | `import { ButtonGroup } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Button Group` (legacy reference: Foundations `4833:35916`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/button-group/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens yet) |
| Contracts | [`button-group-contract.md`](button-group-contract.md) · [`figma-button-group-contract.md`](figma-button-group-contract.md) — generated, never edited |
| Docs page | [`button-group.html`](button-group.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/button-group/button-group.md#b--spec) · [Mobile](../../../5-mobile-components/components/button-group/button-group.md#b--spec) |
| Figma | `↳ Button Group` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | [Button](../button/button.md#a--guidelines) · [Icon button](../icon-button/icon-button.md#a--guidelines) · [Split button](../split-button/split-button.md#a--guidelines) · Button group |
| Version | 1.0 · 2026-10-16 |

### A1 Overview

A button group arranges 2–4 related actions — the footer of a dialog, form or card, a page header's actions — with the same size, spacing, order and alignment everywhere. It is a **layout**, not a control: each action keeps its own look and focus. A connected control where one option is selected is a Segmented button, not a button group.

![Button group — light and dark](assets/overview.png)

### A2 Anatomy

```
Horizontal, end-aligned (web dialog footer)
① ┌──────────────────────────────────────────────────────────┐
  │             ④[─ Cancel ─]  ③[■■ Save changes ■■]         │
  └──────────────────────────────────────────────────────────┘
                     ├──┤ ② gap

Vertical, fill (mobile screen bottom)
  ┌─────────────────────────┐
  │ ③[■■■■ Clock in ■■■■■■] │
  │ ④[────── Cancel ──────] │
  └─────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Lays out the actions |
| 2 | `gap` | Yes | Space between actions |
| 3 | `primary-action` | No | The one filled Button, if the group has one |
| 4 | `secondary-actions` | Yes | Other Buttons, Icon buttons or a Link |
| — | `overflow-trigger` | No | "More options" Icon button holding actions beyond the visible limit |

### A3 Usage

**When to use**
- Dialog, sheet and form footers
- Page and card header actions
- Any place with 2–4 actions that belong together

**When not to use**
| Situation | Use instead |
|---|---|
| A single action | [Button](../button/button.md#a--guidelines) on its own |
| Selecting one option | Segmented button |
| One main action with variants | [Split button](../split-button/split-button.md#a--guidelines) |
| Toolbar of many icon actions | Toolbar (later) or Icon buttons in a row |

### A4 Options

#### 4.1 `orientation`
| Value | Looks like | Pick it when |
|---|---|---|
| `horizontal` | `[── A ──] [■ B ■]` | Default on web and tablet |
| `vertical` | stacked, full width | Default on mobile; narrow sheets and side panels |

#### 4.2 `align` (horizontal)
| Value | Pick it when |
|---|---|
| `end` | **Default.** Dialog and form footers, page header actions |
| `start` | Inline with content (under a form section, in a card body) |
| `center` | Empty states, confirmation screens |
| `space-between` | One action at each end (Back … Next) in wizards |
| `fill` | Actions share the width equally (mobile, narrow dialogs) |

#### 4.3 `size`
One size for all actions in the group (`sm` · `md` · `lg` · `xl`), same scale as [Button A4.3](../button/button.md#43-size).

#### 4.4 Overflow
More than the visible limit (web 3, touch 2) → the rest go into an `overflow-trigger` menu.

**Combination rules**
- At most one `filled` Button, and it is the primary action.
- Don't mix sizes inside a group.
- `space-between` takes exactly two actions or two sub-groups.

### A5 States and behavior

The group has no states of its own; each action keeps its states.

**Order rules**
- Horizontal: the primary action is at the **inline end** (right in English, left in Arabic). Secondary actions come before it.
- Vertical: the primary action is on **top**.
- Focus and screen reader order are the same in both: secondary first, primary last. Write the actions in that order; the layout places them.
- When there isn't room for a horizontal group (narrow window, long Arabic labels), it stacks vertically (touch platforms do this automatically).

### A6 Content

Labels follow [Button A6](../button/button.md#a6-content). In a pair, the secondary is "Cancel" / "إلغاء" or "Back" / "رجوع"; the primary names the outcome.

| ✓ EN | ✓ AR |
|---|---|
| Cancel · Save changes | إلغاء · حفظ التغييرات |
| Back · Next | رجوع · التالي |
| Reject · Approve | رفض · موافقة |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Put the primary action at the inline end (top when stacked) | ![](assets/dont-1.png) Put the primary action first in a horizontal footer |
| ![](assets/do-2.png) Keep one filled Button per group | ![](assets/dont-2.png) Use two filled Buttons |
| ![](assets/do-3.png) Move extra actions into "More options" | ![](assets/dont-3.png) Show five buttons in a row |
| ![](assets/do-4.png) Use the same size for every action | ![](assets/dont-4.png) Mix `sm` and `lg` buttons |

### A8 Platform notes — Web

```
Web / Tablet                                  Mobile
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│               [── Cancel ──][■ Save ■]│     │ [■■■■■■■ Save ■■■■■■■■] │
└───────────────────────────────────────┘     │ [────── Cancel ───────] │
                                              └─────────────────────────┘
```
| | Web |
|---|---|
| Default | `horizontal`, `end`, `md` |
| Stacking | When set to `vertical` |
| Visible limit | 3 |

### A9 Accessibility (design)

- Reading and focus order: secondary actions first, primary last, in every layout and both languages.
- If the group labels a set (e.g. "Report actions"), it is exposed as a group with that name.

### A10 Related components

- [Button](../button/button.md#a--guidelines), [Icon button](../icon-button/icon-button.md#a--guidelines), Link — the actions inside
- Segmented button — connected single/multi select
- Dialog, Bottom sheet, Page header — main places a button group appears

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### ButtonGroup
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | `ReactNode` | `Button` · `IconButton` · `SplitButton` · `Link` | — | ✓ | `secondary-actions` then `primary-action` (reading order) |
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `align` | enum | `start` · `center` · `end` · `space-between` · `fill` | `end` | | A4.2 (horizontal). Vertical is always full width |
| `size` | enum | `sm` · `md` · `lg` | `md` | | Applied to every child through context |
| `maxVisible` | number | 1–4 | `3` | | Actions beyond this go into the overflow menu |
| `overflowLabel` | string | | "More options" / "خيارات أخرى" | | Overflow trigger name |
| `aria-label` | string | | — | | When set, the group is exposed as `role="group"` with this name |

**Invalid combinations** (dev warning):
- more than one child with `variant="filled"`
- a child with its own `size` different from the group `size` (group wins)
- `align="space-between"` with more than 2 children
- `align` set with `orientation="vertical"` (ignored)

### B2 Dimensions

```
horizontal, align=end
┌───────────────────────────────────────────────────────┐
│                         [── Cancel ──]  [■■ Save ■■]  │
└───────────────────────────────────────────────────────┘
                                      ├──┤ spacing-md

vertical
┌───────────────────────┐
│ [■■■■■■ Save ■■■■■■■] │
│          ┬ spacing-md │
│ [────── Cancel ──────] │
└───────────────────────┘
```

| Part | Property | Value |
|---|---|---|
| `container` | display · gap | flex · `spacing-md` (both orientations) |
| `container` | horizontal | `flex-direction: row`; `justify-content` from `align` (`start` · `center` · `flex-end` · `space-between`); `fill` → children `flex: 1 1 0` |
| `container` | vertical | `flex-direction: column-reverse` (primary = last child on top), children full width |
| `container` | width | hug (horizontal) · 100% of parent (vertical, `fill`) |
| `overflow-trigger` | | `IconButton` `variant="text"` `color="neutral"`, same `size`, icon `more_horiz`, placed first (start) |

No colors of its own: B3 is empty by design.

### B3 Tokens by part and state

None. Children use their own specs.

### B4 States and transitions

None. Overflow menu: as [Split button B4](../split-button/split-button.md#b4-states-and-transitions).

### B5 RTL

```
LTR  │                [── Cancel ──] [■ Save ■] │
RTL  │ [■ حفظ ■] [── إلغاء ──]                   │   (align=end → inline end = left)
```
Layout mirrors automatically; `more_horiz` does not mirror.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | Plain container; `role="group"` + `aria-label` only when a label is given |
| Order | DOM order = reading and focus order (secondary → primary) in every orientation. `column-reverse` changes only the visual stacking |
| Overflow | Trigger and menu as Split button B6 |

### B7 Examples

```tsx
<ButtonGroup>
  <Button variant="outlined" color="neutral">Cancel</Button>
  <Button type="submit">Save changes</Button>
</ButtonGroup>

<ButtonGroup align="space-between">
  <Button variant="text">Back</Button>
  <Button>Next</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical" size="lg">
  <Button variant="outlined">إلغاء</Button>
  <Button>حفظ التغييرات</Button>
</ButtonGroup>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Each `orientation` × `align` renders B2 layout (computed styles), en + ar
- [ ] Children receive the group `size`; conflicting child size warns
- [ ] Focus order = DOM order in vertical layout (primary visually on top, focused last)
- [ ] `maxVisible` moves the first (least important) children into the overflow menu; menu items call the children's `onClick`
- [ ] Invalid combinations warn; axe passes

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `button-group-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button group |
| Platform | Web (React + MUI) |
| Depends on | Button, Icon button, Split button (web) **Built** (reuses `SplitButtonMenu`) |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`ButtonGroup` lays out actions per B2, passes `size` to children, handles overflow, and keeps DOM order = focus order.

### C2 Scope

In: B1–B6, B9. Out: Toolbar, Segmented button.

### C3 Approach

- `ButtonGroupContext` provides `size`; `Button`, `IconButton`, `SplitButton` read it when they have no explicit `size` (small change to each: `const size = props.size ?? groupSize ?? default`).
- Overflow: `React.Children.toArray(children)`; if `length > maxVisible`, the first `length - maxVisible` items become menu options built from their props (`children`/`label` → `label`, `onClick` → `onSelect`, `disabled`). Children that are not Button/IconButton cannot overflow → warn and keep visible.
- Styles only `cssVars.spacing.md` + flex rules. No colors.

### C4 Token gaps

None.

### C5 Files to create / change

```
3-web-components/src/components/button-group/ButtonGroup.tsx          new
3-web-components/src/components/button-group/ButtonGroupContext.ts    new
3-web-components/src/components/button-group/ButtonGroup.test.tsx     new
3-web-components/src/components/button-group/index.ts                 new
3-web-components/src/components/button/Button.tsx                     change: read group size
3-web-components/src/components/icon-button/IconButton.tsx            change: read group size
3-web-components/src/components/split-button/SplitButton.tsx          change: read group size
3-web-components/src/index.ts                                         change: export ButtonGroup
3-web-components/README.md                                            change: status row
```

### C6 Tests

B9; Button/IconButton/SplitButton tests still pass.

### C7 Acceptance criteria

- [ ] AC-1 API = B1; AC-2 layout = B2 (no raw values)
- [ ] AC-3 Focus order = DOM order in both orientations
- [ ] AC-4 Overflow behaves per B9
- [ ] AC-5 typecheck, tests, sync pass; AC-6 exported, README updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-18 |
| Files changed | `src/components/button-group/ButtonGroup.tsx`, `ButtonGroupContext.ts`, `ButtonGroup.test.tsx`, `index.ts`; group-size support in Button, IconButton and SplitButton; package `src/index.ts`; Web components README |

**Deviations:** none
**Questions for the Planner:** `npm run docs:check` remains blocked by the repository-wide Doc Kit 1.2 change: 12 Figma contracts are stale, including this component's Figma contract. The code contract is current; no generated contract was edited by the Executor.

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-button-group-contract.md`.

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec). **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Button group |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Button Group` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Button group` › `Button Group/EN` `4833:35916`, `Button Group/AR` `4833:35989` |
| Depends on | Button and Icon button (Web) `Built` in the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). Children are `Button` / `Icon Button` / `Link` instances placed in the `Actions` slot.

### D2 Component structure

```
❖ Button Group    ← published set with a SLOT property `Actions` (as in the legacy set)
```

### D3 Layer tree and auto layout

```
Button Group           ↔ horizontal (Orientation=Horizontal) · ↕ vertical, reversed (Orientation=Vertical) · gap spacing/md
│                        Align → primary-axis alignment (Start/Center/End/Space between); Fill → children FILL
└── actions            SLOT `Actions` · default content: Button Outlined Neutral "Cancel" + Button Filled Brand "Save changes"
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` |
| `Align` | VARIANT | `Start` · `Center` · `End` · `Space between` · `Fill` | `End` | `align` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` (sets the size of the instances in the slot default) |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Actions` | SLOT | | 2 buttons | `children` |

### D5 Variants to generate

Horizontal: 5 aligns × 3 sizes × 2 languages = 30; Vertical: 3 sizes × 2 languages = 6 → **36**.

#### Legacy mapping (legacy sets are not edited)
| Legacy | New |
|---|---|
| `View` Horizontal · Vertical | `Orientation` |
| `Platform` Desktop · Tablet · Mobile | removed (one set per platform file) |
| `Size` SM · M · XL | `SM` · `MD` · `LG` |
| `/EN` · `/AR` sets | `Language` |
| — | `Align` (new) |

#### After `Approved`
Report instances of `4833:35916` / `4833:35989` in the Foundations file; move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

None.

### D7 RTL

`Language=AR`: auto layout direction reversed, so `End` sits at the left; Arabic labels in the default slot content.

### D8 Documentation pages

12 standard pages in `Button Group — Documentation`; blocked until the Doc Kit. 03 Variations: Orientation, Align, Size. 05 Usage: order rules. 07 Platform: web dialog footer.

Component description: "Lays out 2–4 related actions with the right order and alignment. Spec: 3-web-components/components/button-group/button-group.md".

### D9 Code Connect

`3-web-components/src/components/button-group/ButtonGroup.figma.tsx` — mapping D4; `Actions` slot → `children`.

### D10 Acceptance criteria

- [ ] F-AC-1 Properties D4 exactly; 36 variants
- [ ] F-AC-2 Gap bound; no raw values
- [ ] F-AC-3 Vertical shows primary on top; AR mirrors
- [ ] F-AC-4 Zero local variables/styles; docs built or reported blocked

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

1.0 — initial Web implementation: horizontal/vertical layouts, alignment and fill modes, shared child sizing, overflow menu, localized trigger, validation, public exports and contract tests. No API change from the initial spec.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Button Group/EN·AR` sets | `View` → `orientation` · `Platform` removed (defaults per platform) · new `align` and overflow · two sets → one with `Language` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
