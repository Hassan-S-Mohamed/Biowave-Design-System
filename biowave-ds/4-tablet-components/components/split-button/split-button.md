# Split button · زر مقسّم — Tablet

> **One file for Split button on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet split-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Summary | Pairs one primary action with a short menu of closely related alternatives. |
| Summary (ar) | يجمع إجراءً أساسياً واحداً مع قائمة قصيرة من البدائل المرتبطة به. |
| Parts | Primary action · menu trigger · menu · menu item |
| Parts (ar) | الإجراء الأساسي · مشغّل القائمة · القائمة · عنصر القائمة |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Composition of `BwButton` (`primary-action`) + `BwIconButton` (`menu-trigger`) + M3 `MenuAnchor` (temporary until the Menu component on Day 10) |
| Import | `BwSplitButton` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Split Button` (page Typography mode `Tablet`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/split-button/` — not built yet (the Executor creates it) |
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
| Specs | [Web](../../../3-web-components/components/split-button/split-button.md#b--spec) · [Tablet](#b--spec) · [Mobile](../../../5-mobile-components/components/split-button/split-button.md#b--spec) |
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

### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Default size | `lg` |
| Menu | Dropdown menu |
| Interaction | Touch; keyboard with a keyboard attached |

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

| | |
|---|---|
| Web spec (shared facts) | [3-web-components/components/split-button](../../../3-web-components/components/split-button/split-button.md#b--spec) |

### B1 API

#### BwSplitButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | — | ✓ | `primary-action` label |
| `onPressed` | `VoidCallback?` | | — | ✓ | Primary action; `null` disables both parts |
| `options` | `List<BwSplitButtonOption>` | 2–5 | — | ✓ | `BwSplitButtonOption(label:, onSelected:, icon:, enabled:)` |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` | `filled` | | |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` | `brand` | | |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | |
| `leadingIcon` | `IconData?` | | `null` | | On the primary action |
| `loading` · `loadingLabel` | | | | | Primary action; trigger disabled while loading |
| `menuLabel` | `String?` | | localized "More options for {label}" | | Trigger semantics label |

**Invalid combinations** (`assert` in debug, fallback in release): `tonal` with `neutral` → `outlined` · fewer than 2 / more than 5 options → assert · option label equal to `label` → assert.

### B2 Dimensions

Two parts with `BwSpacing.xxs` between; outer corners `radius-md` (`xl`: `radius-xl`), inner corners `radius-xs` via `BorderRadiusDirectional`; parts follow BwButton / BwIconButton B2. Menu: [Web B2](../../../3-web-components/components/split-button/split-button.md#b2-dimensions) tokens, via `MenuStyle`/`MenuItemButton` styles.

### B3 Tokens by part and state

[Web B3](../../../3-web-components/components/split-button/split-button.md#b3-tokens-by-part-and-state). Expanded trigger = Pressed tokens (`WidgetState.pressed` forced while the menu is open).

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/split-button/split-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Tablet examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/split-button/split-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `Semantics(container: true, label: label)` around two buttons; two focus stops |
| Trigger | `Semantics(button: true, label: menuLabel, expanded: isOpen)` |
| Menu | `MenuAnchor` keyboard (arrows, Esc) and focus return to the trigger |
| Loading | As BwButton B6; trigger `onPressed: null` while loading |
| Target size | ≥ `BwLayout.tablet.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

### B7 Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

BwSplitButton(label: 'Export report', onPressed: () => export('pdf'), options: [
  BwSplitButtonOption(label: 'Export as Excel', onSelected: () => export('xlsx')),
  BwSplitButtonOption(label: 'Export as CSV', onSelected: () => export('csv')),
]);
BwSplitButton(label: 'موافقة', onPressed: approve, options: [BwSplitButtonOption(label: 'موافقة مع ملاحظة', onSelected: approveWithNote)]);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Goldens for allowed `variant` × `color` × sizes, light + dark, en + ar (radii mirror in RTL)
- [ ] Open/close by tap and keyboard; option runs once; focus returns to trigger
- [ ] Semantics: `expanded` toggles; two focus stops
- [ ] Loading disables trigger; invalid combinations assert

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `split-button-contract.md`.

> Executor: read `AGENTS.md`, `4-tablet-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Tablet (Flutter + M3) |
| Depends on | BwButton and BwIconButton **Built** |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`BwSplitButton` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### C2 Scope

In: B1–B6, B9. Out: anything not in the spec.

### C3 Approach

Row of `BwButton` + `BwIconButton` with an internal `segment` parameter (start/end) that only changes `BorderRadiusDirectional`; `MenuAnchor` with `alignmentOffset` from `BwSpacing.xs`, anchored at the end; chevron `AnimatedRotation(duration: BwDuration.md)`.

### C4 Token gaps

None.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/split_button/bw_split_button.dart  new
4-tablet-components/test/split_button_test.dart                           new
4-tablet-components/lib/src/components/button/bw_button.dart              change: internal `segment` (corner radii)
4-tablet-components/lib/src/components/icon_button/bw_icon_button.dart    change: internal `segment`
4-tablet-components/lib/biowave_tablet.dart                                        change: export
4-tablet-components/README.md                                             change: status row
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-split-button-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Tablet set in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/split-button/split-button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Split Button` › section `Split Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Split Button` (`4298:3591` / `4298:3881`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Split Button` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Tablet scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/split-button/split-button.md#d2-component-structure), with these Tablet differences:
- `Size` adds `XL`
- No hover states
- Parts are instances of this file's `Button` and `Icon Button`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/split-button/split-button.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

**Icons used:** `expand_more` — menu trigger chevron, Google · Material Symbols Rounded (D-18)

### D4 Properties

As [Web D4](../../../3-web-components/components/split-button/split-button.md#d4-properties), with the Tablet differences listed in D2.

### D5 Variants to generate

8 allowed `Variant × Color` × 4 sizes × 7 states (no `Primary hover` / `Trigger hover`) × 2 languages = **448**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Tablet library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Split Button — Documentation` on `↳ Split Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Tablet landscape + Tablet portrait. 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 4-tablet-components/components/split-button/split-button.md".

### D9 Code Connect

`4-tablet-components/lib/src/components/split_button/bw_split_button.figma.dart` — `Label` → `label`, `Variant`/`Color`/`Size` → enums, `State=Disabled` → `onPressed: null`, `State=Loading` → `loading: true`; `options` as an example list. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Split Button` in the Tablet file; structure and layer names as Web D2–D3 + differences above
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
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Split Button/EN·AR` sets | `Type` (colors) → `color` brand/secondary/neutral · `State=Ghost` → `variant=outlined` · `Show Menu Buttons` removed (menu is a separate component) · two sets → one with `Language` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
