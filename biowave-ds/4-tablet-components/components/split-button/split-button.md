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
| Code | Changes requested |
| Figma build | Planned |
| Review | Round 1 · 2026-10-24 · Changes requested |
| Source code | `lib/src/components/split_button/bw_split_button.dart` |
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

Two parts with `spacing-xxs` (`BwSpacing.xxs`) between; outer corners `radius-md` (`xl`: `radius-xl`), inner corners `radius-xs` via `BorderRadiusDirectional`; parts follow BwButton / BwIconButton B2. Menu: the [Web B2](../../../3-web-components/components/split-button/split-button.md#b2-dimensions) tokens, mapped on Tablet as below.

| Part | Property | Token | Tablet mapping |
|---|---|---|---|
| `menu` | offset from `container` | `spacing-xs` | `MenuAnchor.alignmentOffset` (vertical) |
| `menu` | min-width | width of `container` | `MenuStyle.minimumSize` and item `minimumSize` |
| `menu` | padding | `spacing-none` | `MenuStyle.padding` |
| `menu` | background | `color-surface-raised` | the decorated surface (below) |
| `menu` | radius | `radius-lg` | the decorated surface; `MenuStyle.shape` uses the same radius |
| `menu` | elevation | `elevation-3` | the decorated surface: `boxShadow: context.bw.elevation.elevation3` |
| `menu` | M3 surface (unused) | `color-background-transparent` | `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` |
| `menu` item | height | `size-control-height-md` | item `minimumSize` |
| `menu` item | padding-inline | `spacing-control-padding-inline-md` | `EdgeInsetsDirectional` |
| `menu` item | icon–label gap | `spacing-control-gap-md` | |
| `menu` item | text style | `body-md` | `context.bw.text.bodyMd` |
| `menu` item | focus ring width | `border-width-focus` | inner ring (B3); item corners square, clipped by the surface |

**How `elevation-3` maps on Tablet.** `elevation-3` is a `List<BoxShadow>` (`context.bw.elevation.elevation3`, light and dark), and `MenuStyle` takes only a number (`elevation`) and a `shadowColor`, so the M3 surface is not used for the look: `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` are `color-background-transparent`, and `MenuAnchor(clipBehavior: Clip.none)` so the shadow is not cut off. All `menuChildren` sit in one decorated surface — `DecoratedBox(BoxDecoration(color: color-surface-raised, borderRadius: radius-lg, boxShadow: elevation-3))` with a `ClipRRect` of `radius-lg` inside it, so item overlays follow the corners. No numeric M3 elevation is set.

### B3 Tokens by part and state

[Web B3](../../../3-web-components/components/split-button/split-button.md#b3-tokens-by-part-and-state). Expanded trigger = Pressed tokens (`WidgetState.pressed` forced while the menu is open).

Menu item tokens on Tablet (`MenuItemButton` style):

| State | Text | Icon | Overlay | Ring |
|---|---|---|---|---|
| Rest | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-background-transparent` | — |
| Hover (pointer) | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-overlay-hover` | — |
| Pressed | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-overlay-pressed` | — |
| Focus (keyboard) | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-overlay-hover` | `color-border-focus`, `border-width-focus`, inside the item edge |
| Disabled | `color-text-neutral-disabled` | `color-icon-neutral-disabled` | `color-background-transparent` | — |

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/split-button/split-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Tablet examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

Chevron: `motion-duration-md` + `motion-easing-standard-decelerate` on open, `motion-duration-sm` + `motion-easing-standard-accelerate` on close. Menu fade / scale: `MenuAnchor` has no duration or curve parameters, so it uses Flutter's built-in timing; `MenuAnchor(animated: !context.bw.reduceMotion)` turns it off under reduced motion.

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
| Plan version | 2 · 2026-10-24 (Review Round 1 findings 4, 5, 7, 8) |

### C1 Goal

`BwSplitButton` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### C2 Scope

In: B1–B6, B9. Out: anything not in the spec.

### C3 Approach

Row of `BwButton` + `BwIconButton`; `MenuAnchor` with `alignmentOffset` from `BwSpacing.xs`, anchored at the end; menu surface per B2 (decorated surface carrying `elevation-3`); chevron rotation per B4.

Internal parameters on the approved button components. All are marked `@internal`, are hidden from `lib/biowave_tablet.dart`, and default to today's behaviour (no change for existing callers; existing button and icon-button tests and goldens must pass unchanged). No other change to these files is allowed.

| File | Internal parameter | Type · default | Used for |
|---|---|---|---|
| `bw_button.dart` | `segment` | `BwButtonSegment?` (`start` · `end`) · `null` | Corner radii only (`BorderRadiusDirectional`, B2); `null` = today's radius |
| `bw_icon_button.dart` | `segment` | `BwButtonSegment?` · `null` | Corner radii only (B2) |
| `bw_icon_button.dart` | `focusNode` | `FocusNode?` · `null` | `MenuAnchor.childFocusNode`; focus returns to the trigger (B6) |
| `bw_icon_button.dart` | `autofocus` | `bool` · `false` | Passed to the inner button |
| `bw_icon_button.dart` | `statesController` | `WidgetStatesController?` · `null` | Forces `WidgetState.pressed` while the menu is open (B3 Expanded) |
| `bw_icon_button.dart` | `iconTurns` | `double` · `0` | Chevron half turn when expanded (B4), through an `AnimatedRotation` round the glyph |
| `bw_icon_button.dart` | `iconRotationDuration` | `Duration` · `BwDuration.instant` | Chevron duration (B4) |
| `bw_icon_button.dart` | `iconRotationCurve` | `Curve` · `BwEasing.standard` | Chevron easing (B4) |
| `bw_icon_button.dart` | `expanded` | `bool?` · `null` | `Semantics(expanded:)` on the trigger (B6); `null` = no expanded state |

### C4 Token gaps

None.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/split_button/bw_split_button.dart  new
4-tablet-components/test/split_button_test.dart                           new
4-tablet-components/test/goldens/split_button/                            new (generated goldens)
4-tablet-components/lib/src/components/button/bw_button.dart              change: internal `segment` (corner radii) — C3
4-tablet-components/lib/src/components/icon_button/bw_icon_button.dart    change: internal `segment`, `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` (+ `AnimatedRotation` round the glyph, `expanded` on its `Semantics`) — C3
4-tablet-components/lib/biowave_tablet.dart                               change: export
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
| Agent | Codex |
| Date | 2026-10-24 |
| Files changed | `lib/src/components/split_button/bw_split_button.dart` · `test/split_button_test.dart` · `lib/src/components/button/bw_button.dart` · `lib/src/components/icon_button/bw_icon_button.dart` · `lib/biowave_tablet.dart` · `4-tablet-components/README.md` · this C8 log · `CHANGELOG.md` |
| Round 2 fixes | Replaced the legacy chevron with `Symbols.expand_more_rounded`; sized menu options to the split-button container; corrected the directional test harness; disposed semantics handles inside each test body. |
| Checks | `flutter analyze` ✓ · `npm run component-tokens` ✓ · `npm run sync` ✓ · `npm run docs:check` ✓ · `flutter test` not runnable in sandbox — orchestrator runs it (loopback socket denied) |

**Deviations:** No PNG golden matcher paths were added because contract §9 does not authorise a goldens folder, as directed by the implementation prompt; the allowed visual matrix and RTL radii are covered programmatically. `MenuAnchor` does not expose animation-duration parameters, so its prescribed fade/scale uses Flutter's built-in timing; the chevron uses `BwDuration.md` / `BwEasing.*`, and reduced motion disables both animations.
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
| 1 | 2026-10-24 | Changes requested | not reviewed |

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1 · 2026-10-16 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Code reviewed | `git diff main...ds/split-button-tablet` (HEAD `54f813b`, implement rounds 1–2) + working tree (clean at review start) |
| Verdict | **Changes requested** — 2 🔴 (menu position, menu keyboard navigation), 5 🟡, 3 🟢 |
| Evidence | Run by the Reviewer in the `ds/split-button-tablet` worktree: `npm run docs:check` ✅ · `flutter analyze` ✅ no issues · `flutter test` ✅ 160/160 · `npm run sync` ✅ READY. Behaviour probes: throw-away tests in the scratchpad (outside the repo) run with `flutter test <path>` from `4-tablet-components`; results quoted in findings 1–3 |

#### Questions from the review prompt

| Question | Answer | Evidence |
|---|---|---|
| Does `segment` change only `BorderRadiusDirectional` in BwButton / BwIconButton, with no change to their behaviour, semantics or tests? | **BwButton: yes. BwIconButton: radius yes, but the change is wider than the contract** (finding 4). Defaults keep existing behaviour; existing tests are untouched and pass | BwButton: `segment` `bw_button.dart:34`, `_borderRadius` `:234-253`; `segment: null` returns `BorderRadiusDirectional.all(dimensions.radius)`, the same value `BwButtonStyle` already sets (`bw_button_style.dart:105-111`); the focus ring uses the same radius. BwIconButton: same `segment` + `_borderRadius` (`bw_icon_button.dart:30`, `:312-331`), **plus** 7 more internal params (`focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded`, `:27-34`), an `AnimatedRotation` wrapper round the glyph (`:192-202`) and `expanded:` on its `Semantics` (`:304`). Defaults (`turns 0`, `BwDuration.instant`, `expanded null`, no focus node / states controller) are no-ops. `git diff main...HEAD -- test/` touches only `split_button_test.dart`; `button_test.dart` and `icon_button_test.dart` (incl. goldens) pass unchanged. `BwButtonSegment` is `@internal` and hidden from the package export (`lib/biowave_tablet.dart:12`) |
| Were the build-round-1 part-gap (−174.4) and menu-width (170 < 227.7) failures fixed in code, not by weakening the tests? | **Yes** | Gap: the test asserts the exact value `BwSpacing.xxs` on the correct edges for each direction (`split_button_test.dart:168-173`) over every variant × color × size × theme × direction; the harness now sets `Directionality` inside `Localizations.override` (`:49-54`). Layout is `Row[BwButton, SizedBox(BwSpacing.xxs), BwIconButton]` (`bw_split_button.dart:180-222`). Menu width: fixed in code — the container is measured on open (`:296-299`) and used as `MenuStyle.minimumSize` (`:144-146`) and item `minimumSize` (`:231-236`); the test still asserts item width ≥ container width (`:313-316`). The round-1 test text is not in history (one commit), so the check is against the contract, which these assertions match exactly |
| Screen reader + keyboard: one labelled node per part with tap and focus; menu opens/closes by keyboard and returns focus to the trigger | **Partly.** Labels, tap, `expanded`, two focus stops, open by Enter / Space / ArrowDown, close by Esc and focus return all work. **Arrow keys never reach the menu items and Tab does not close the menu** (findings 2–3); the primary node's focus action is not asserted (finding 10) | Tests "semantic actions expose two focus stops and expanded state" (`:181-252`), "opens and closes by keyboard and returns focus to trigger" (`:254-283`), "selects one option once and restores trigger focus" (`:298-328`) |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | Params/defaults `bw_split_button.dart:28-39` (`filled`, `brand`, `lg`); `BwSplitButtonOption(label, onSelected, icon, enabled)` `:12-24`; asserts 2–5 options, option label ≠ `label`, tonal + neutral `:40-63`; release fallback tonal + neutral → outlined `:94-100`; default menu label en / ar `:120-123`. Tests "asserts invalid combinations", "derives an Arabic menu label when none is provided" |
| AC-2 Tokens only; shared helpers reused | ⚠️ | Parts reuse `BwButton` / `BwIconButton` (`:184-219`); menu uses `surfaceRaised`, `BwRadius.lg`, `bodyMd`, `controlHeightMd`, `controlPaddingInlineMd`, `controlGapMd`, overlays, `borderFocus` (`:136-282`). `elevation-3` missing (finding 5); `_borderRadius` copied into both button files (finding 9) |
| AC-3 States/transitions; reduced motion | ⚠️ | Expanded = forced `WidgetState.pressed` (`:309-316`, asserted in the semantics test); chevron half turn, `BwDuration.md` + decelerate on open. Close uses `md`, not `sm` (finding 6); Tab does not collapse (finding 3). Reduced motion: `animated: !reduceMotion` + `BwDuration.instant` (`:133`, `:213-214`), test "reduced motion makes chevron and menu transitions instant" |
| AC-4 RTL and a11y per B5–B6 | ❌ | RTL radii and gap correct both ways (render-matrix test). Menu not end-aligned with the container (finding 1); no arrow-key navigation (finding 2). Semantics container + trigger `expanded` per B6 ✅; parts and menu items ≥ 48 ✅ |
| AC-5 analyze + test; `npm run sync` | ✅ | All pass (above) |
| AC-6 Exported; README status | ✅ | `lib/biowave_tablet.dart:15` (alphabetical); README row matched the header (`docs:check` ✅) |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No `generated/`, `dist/`, contract or HTML shell in the diff |
| No raw values / no primitives | ✅ | Only `Bw*` / `context.bw.*`; `turns: 0.5` is a geometry factor. `no_legacy_icons_test` passes (`Symbols.expand_more_rounded`, `:202`) |
| Logical properties, RTL icons | ✅ | `BorderRadiusDirectional`, `EdgeInsetsDirectional`, `AlignmentDirectional` only; chevron not mirrored |
| Light + dark, en + ar tested | ⚠️ | Property matrix covers both themes and directions; no goldens (finding 7) |
| Accessibility (WCAG 2.2 AA) | ❌ | Menu items not reachable by arrow keys (finding 2) |
| Stayed inside the contract | ⚠️ | BwIconButton changed beyond "internal `segment`", not listed in C8 deviations (finding 4) |
| Code matches spec | ❌ | Findings 1–3, 5, 6 |
| Changelog | ✅ | `CHANGELOG.md` "[Tablet Split button — implementation]" and "[Fixed — Tablet Split button implementation checks]"; C8 filled |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `lib/src/components/split_button/bw_split_button.dart:137` | `MenuStyle(alignment: AlignmentDirectional.bottomEnd)` puts the menu's start corner at the container's **end** corner, so the menu opens beside the container, not under it. Probe (800-wide screen, container x 242–558): LTR menu x 484–800 (held back only by the screen edge), RTL menu x 0–316. B5: the menu's end edge lines up with the container's end edge (right in LTR, left in RTL). Same defect the web build fixed in its Round 3 | Anchor the menu so its end edge equals the container's end edge in both directions (e.g. `AlignmentDirectional.bottomStart` with the container-width minimum, plus an end-aligned offset when the menu is wider), keeping `BwSpacing.xs` as the vertical offset. Add an LTR + RTL test: menu end edge = container end edge, menu top = container bottom + `BwSpacing.xs` | Implementer |
| 2 | 🔴 Blocker | `lib/src/components/split_button/bw_split_button.dart:196-200`, `:293-307` | Menu items cannot be reached by keyboard. Probe: Tab ×2 → Enter opens the menu; ArrowDown ×2 leaves primary focus on `BwSplitButton.menu-trigger`; Enter then **closes** the menu without selecting. The trigger's `CallbackShortcuts` take ArrowDown/Up (`_openMenu` returns early when open) and focus never moves into the menu. B6 "MenuAnchor keyboard (arrows, Esc)"; AGENTS.md rule 6 | On keyboard open (Enter / Space / ArrowDown) move focus to the first enabled item (ArrowUp: last); while open, ArrowDown/Up on the trigger move into the menu; arrows move between items; Enter / Space selects. Add a test: Tab to trigger → Enter → ArrowDown → Enter runs the 2nd option exactly once and focus returns to the trigger | Implementer |
| 3 | 🟡 Should fix | `lib/src/components/split_button/bw_split_button.dart` | Tab does not collapse the menu (probe: still open after Tab). Web B4: Expanded → Collapsed on "item chosen · Esc · click outside · Tab" | Close the menu on Tab / Shift+Tab (focus moves on as usual); add a test | Implementer |
| 4 | 🟡 Should fix | `lib/src/components/icon_button/bw_icon_button.dart:27-34`, `:192-202`, `:304` · plan C3 / C5 | C3 / C5 authorise only "internal `segment` (corner radii)" on BwIconButton. The build also adds `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` and an `AnimatedRotation` wrapper. All are `@internal`, default to no-ops and existing tests pass, and they serve B3 (forced pressed), B4 (chevron) and B6 (focus return, `expanded`) — but they are outside the plan and not listed in C8 deviations | Record these internal parameters in C3 and C5 (BwIconButton line) so the change to the approved component is planned, then regenerate the contract. The Implementer lists them in C8 in the next fix round | Planner |
| 5 | 🟡 Should fix | plan B2 (tablet) · contract §4.1 · `bw_split_button.dart:136-157` | Web B2 menu = `elevation-3`; the tablet build leaves elevation and shadow to M3 `MenuStyle` defaults (no token). The tablet token `context.bw.elevation.elevation3` is a `List<BoxShadow>`, which `MenuStyle` cannot take (only `elevation` + `shadowColor`), and §4.1 lists only the three radii, none of the menu tokens | Say in tablet B2 how `elevation-3` maps onto the menu on tablet (or allow a decorated menu surface), and list the menu tokens (surface-raised, elevation-3, radius-lg, item tokens, overlays, border-focus) so §4.1 shows them; regenerate the contract | Planner |
| 6 | 🟡 Should fix | `lib/src/components/split_button/bw_split_button.dart:213-217` | Chevron uses `BwDuration.md` both ways; Web B4 collapses with `motion-duration-sm` (the accelerate easing is already switched) | Use `BwDuration.sm` when collapsing (`instant` under reduced motion); assert both durations in the motion test | Implementer |
| 7 | 🟡 Should fix | plan C5 · B9 | B9 asks for goldens (variant × color × size, light / dark, en / ar, mirrored radii) but C5 / contract §9 do not authorise a goldens folder, so the Implementer correctly logged it as a deviation. Same gap as icon-button Round 1 #2 | Add `4-tablet-components/test/goldens/split_button/  new (generated goldens)` to C5 and regenerate; then the Implementer adds the goldens (closed and open menu, LTR + RTL) | Planner |
| 8 | 🟢 Nit | `split-button.md` header | "Source code" still reads `lib/src/components/split-button/ — not built yet`; the file is `lib/src/components/split_button/bw_split_button.dart` | Correct the header row | Planner |
| 9 | 🟢 Nit | `bw_button.dart:234-253`, `bw_icon_button.dart:312-331` | `_borderRadius(segment)` is copied verbatim into both files (AC-2 "shared helpers reused, no copied styles") | Move it to one shared helper (e.g. in `bw_button_style.dart`) used by both | Implementer |
| 10 | 🟢 Nit | `test/split_button_test.dart:189-192` | The primary part is checked for tap only; the trigger for tap + focus. The icon-button lesson says every part must prove tap + focus | Assert `hasTapAction: true, hasFocusAction: true` on the primary node too | Implementer |

#### Notes

- C8 deviation "MenuAnchor does not expose animation-duration parameters" is accepted: the menu fade / scale uses Flutter's internal timing and reduced motion turns it off (`animated: false`). The Planner may record this in tablet B4 when fixing finding 5.
- `_containerWidth` is measured when the menu opens; if the label changes while the menu is open, the width stays stale until the next open. Not a finding.
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

Changes requested. Planner first (findings 4, 5, 7, 8 → Plan `Open`, regenerate the contract), then a fix round for the Implementer (findings 1, 2, 3, 6, 9, 10, plus the goldens from 7 and the C8 note from 4). Code → `Changes requested`.

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
| 1.0 | 2026-10-24 | Tablet B2–B4 clarified for Review Round 1 (no new behaviour): menu tokens listed, `elevation-3` mapped onto a decorated menu surface, menu item states listed, chevron close timing and `MenuAnchor` built-in fade timing recorded. Plan 2: C3 / C5 record the internal BwButton / BwIconButton parameters; C5 adds the goldens folder | No | — |
| 1.0 | 2026-10-16 | Initial | No | — |
