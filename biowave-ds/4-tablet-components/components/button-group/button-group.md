# Button group · مجموعة أزرار — Tablet

> **One file for Button group on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet button-group`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Button group · مجموعة أزرار |
| Summary | Arranges related actions with predictable priority, alignment, overflow, and responsive stacking. |
| Summary (ar) | يرتّب الإجراءات المرتبطة بأولوية ومحاذاة وتدفّق وتكديس متجاوب يمكن توقّعه. |
| Parts | Group · children · overflow trigger · overflow menu |
| Parts (ar) | المجموعة · العناصر · مشغّل الخيارات الإضافية · قائمة الخيارات |
| Platform | Tablet · Flutter + Material 3 |
| Built on | M3/Flutter `OverflowBar` for horizontal (stacks automatically when the actions do not fit), `Column` for vertical |
| Import | `BwButtonGroup` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Button Group` (page Typography mode `Tablet`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/button-group/` — not built yet (the Executor creates it) |
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
| Specs | [Web](../../../3-web-components/components/button-group/button-group.md#b--spec) · [Tablet](#b--spec) · [Mobile](../../../5-mobile-components/components/button-group/button-group.md#b--spec) |
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

### A8 Platform notes — Tablet

```
Web / Tablet                                  Mobile
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│               [── Cancel ──][■ Save ■]│     │ [■■■■■■■ Save ■■■■■■■■] │
└───────────────────────────────────────┘     │ [────── Cancel ───────] │
                                              └─────────────────────────┘
```
| | Tablet |
|---|---|
| Default | `horizontal`, `end`, `lg` |
| Stacking | Automatic when actions don't fit |
| Visible limit | 2 |

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

| | |
|---|---|
| Web spec (shared facts) | [3-web-components/components/button-group](../../../3-web-components/components/button-group/button-group.md#b--spec) |

### B1 API

#### BwButtonGroup
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | `List<Widget>` | BwButton · BwIconButton · BwSplitButton · link | — | ✓ | Reading order: secondary first, primary last |
| `orientation` | `Axis` | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `align` | `BwButtonGroupAlign` | `start` · `center` · `end` · `spaceBetween` · `fill` | `end` | | Horizontal only |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | Passed to children via `BwButtonGroupScope` |
| `maxVisible` | `int` | 1–4 | `2` | | Overflow into a "More options" `BwIconButton` menu |
| `semanticLabel` | `String?` | | `null` | | Exposes the group with a name |

**Invalid combinations** (`assert` in debug, fallback in release): more than one `filled` child → assert · child with its own different `size` → group wins, assert in debug · `spaceBetween` with more than 2 children → assert.

### B2 Dimensions

Gap `BwSpacing.md` in both directions (`spacing`, `overflowSpacing`). Horizontal → `OverflowBar(alignment:` from `align`, `overflowAlignment: OverflowBarAlignment.end`, `overflowDirection: VerticalDirection.up`)` so when it stacks the last child (primary) is on top. `fill` → each child in `Expanded` inside a `Row`. Vertical → `Column(crossAxisAlignment: stretch, verticalDirection: VerticalDirection.up)`. [Web B2](../../../3-web-components/components/button-group/button-group.md#b2-dimensions) for the rest.

### B3 Tokens by part and state

None (children use their own).

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/button-group/button-group.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Tablet examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/button-group/button-group.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Order | Semantics traversal = children order (secondary → primary) in every layout: wrap each child in `Semantics(sortKey: OrdinalSortKey(i))` |
| Group name | `Semantics(container: true, label: semanticLabel)` when set |
| Overflow | Trigger and menu as BwSplitButton B6 |
| Target size | ≥ `BwLayout.tablet.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

### B7 Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

BwButtonGroup(children: [
  BwButton(label: 'Cancel', variant: BwButtonVariant.outlined, color: BwButtonColor.neutral, onPressed: close),
  BwButton(label: 'Save changes', onPressed: save),
]);
BwButtonGroup(orientation: Axis.vertical, children: [
  BwButton(label: 'إلغاء', variant: BwButtonVariant.outlined, onPressed: close),
  BwButton(label: 'حفظ التغييرات', onPressed: save),
]);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Goldens: each `align` (horizontal), vertical, overflowed horizontal (narrow width, long Arabic labels) → primary on top
- [ ] Children get the group size; semantics order = children order in every layout
- [ ] Overflow moves the first children into the menu; asserts for invalid combinations

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `button-group-contract.md`.

> Executor: read `AGENTS.md`, `4-tablet-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button group |
| Platform | Tablet (Flutter + M3) |
| Depends on | BwButton, BwIconButton, BwSplitButton **Built** |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`BwButtonGroup` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### C2 Scope

In: B1–B6, B9. Out: anything not in the spec.

### C3 Approach

`BwButtonGroupScope` (InheritedWidget) provides `size`; children read it when their own `size` is not passed (make their `size` parameter nullable internally with the platform default). Layout per C2. Overflow builds options from BwButton/BwIconButton children (`label`, `onPressed`).

### C4 Token gaps

None.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/button_group/bw_button_group.dart   new (+ BwButtonGroupScope InheritedWidget)
4-tablet-components/test/button_group_test.dart                            new
4-tablet-components/lib/src/components/button/bw_button.dart               change: read BwButtonGroupScope size
4-tablet-components/lib/src/components/icon_button/bw_icon_button.dart     change: same
4-tablet-components/lib/src/components/split_button/bw_split_button.dart   change: same
4-tablet-components/lib/biowave_tablet.dart                                         change: export
4-tablet-components/README.md                                              change: status row
```

### C6 Tests

B9, plus earlier button-family tests still pass.

### C7 Acceptance criteria

- [ ] AC-1 API = B1 (names, defaults, asserts)
- [ ] AC-2 Values from tokens only; shared helpers reused, no copied styles
- [ ] AC-3 States/transitions; reduced motion
- [ ] AC-4 RTL and a11y per B5–B6
- [ ] AC-5 `cd 4-tablet-components && flutter analyze && flutter test`; `npm run sync` pass
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; README status updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations:** none
**Questions for the Planner:** none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-button-group-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Tablet set in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/button-group/button-group.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button group |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Button Group` › section `Button Group` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Button group` (`Platform=Tablet` variants) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Button Group` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Tablet scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/button-group/button-group.md#d2-component-structure), with these Tablet differences:
- `Size` adds `XL`
- Default variant: `Orientation=Horizontal`
- Slot default content uses this file's `Button` instances at `LG`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/button-group/button-group.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

**Icons used:** `more_horiz` — overflow (More) trigger, Google · Material Symbols Rounded (D-18)

### D4 Properties

As [Web D4](../../../3-web-components/components/button-group/button-group.md#d4-properties), with the Tablet differences listed in D2.

### D5 Variants to generate

Horizontal: 5 aligns × 4 sizes × 2 languages = 40; Vertical: 4 sizes × 2 = 8 → **48**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Tablet library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Button Group — Documentation` on `↳ Button Group` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Tablet landscape + Tablet portrait. 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 4-tablet-components/components/button-group/button-group.md".

### D9 Code Connect

`4-tablet-components/lib/src/components/button_group/bw_button_group.figma.dart` — `Orientation` → `orientation: Axis.*`, `Align` → `align: BwButtonGroupAlign.*`, `Size` → `size`, `Actions` slot → `children`. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Button Group` in the Tablet file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline, incl. `XL`)
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `{id}` · docs section `{id}` |
| QA report | |

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

None — version 1.0. Filled when the version is above 1.0; it feeds Figma doc page 10.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Button Group/EN·AR` sets | `View` → `orientation` · `Platform` removed (defaults per platform) · new `align` and overflow · two sets → one with `Language` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
