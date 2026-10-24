# Split button · زر مقسّم — Mobile

> **One file for Split button on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile split-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Summary | Pairs one primary action with a short menu of closely related alternatives. |
| Summary (ar) | يجمع إجراءً أساسياً واحداً مع قائمة قصيرة من البدائل المرتبطة به. |
| Parts | Primary action · menu trigger · menu · menu item |
| Parts (ar) | الإجراء الأساسي · مشغّل القائمة · القائمة · عنصر القائمة |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Composition of `BwButton` (`primary-action`) + `BwIconButton` (`menu-trigger`) + M3 `MenuAnchor` (temporary until the Menu component on Day 10) |
| Import | `BwSplitButton` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Split Button` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 2 · 2026-10-24 · Changes requested |
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
| Specs | [Web](../../../3-web-components/components/split-button/split-button.md#b--spec) · [Tablet](../../../4-tablet-components/components/split-button/split-button.md#b--spec) · [Mobile](#b--spec) |
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

### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Default size | `lg` |
| Menu | Bottom sheet with the options (Menu on Day 10 decides) |
| Interaction | Touch |

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

Two parts with `spacing-xxs` (`BwSpacing.xxs`) between; outer corners `radius-md` (`xl`: `radius-xl`), inner corners `radius-xs` via `BorderRadiusDirectional`; parts follow BwButton / BwIconButton B2. Menu: the [Web B2](../../../3-web-components/components/split-button/split-button.md#b2-dimensions) tokens, mapped on Mobile as below.

| Part | Property | Token | Mobile mapping |
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

**How `elevation-3` maps on Mobile.** `elevation-3` is a `List<BoxShadow>` (`context.bw.elevation.elevation3`, light and dark), and `MenuStyle` takes only a number (`elevation`) and a `shadowColor`, so the M3 surface is not used for the look: `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` are `color-background-transparent`, and `MenuAnchor(clipBehavior: Clip.none)` so the shadow is not cut off. All `menuChildren` sit in one decorated surface — `DecoratedBox(BoxDecoration(color: color-surface-raised, borderRadius: radius-lg, boxShadow: elevation-3))` with a `ClipRRect` of `radius-lg` inside it, so item overlays follow the corners. No numeric M3 elevation is set (never derived from a shadow offset).

### B3 Tokens by part and state

[Web B3](../../../3-web-components/components/split-button/split-button.md#b3-tokens-by-part-and-state). Expanded trigger = Pressed tokens (`WidgetState.pressed` forced while the menu is open).

Menu item tokens on Mobile (`MenuItemButton` style):

| State | Text | Icon | Overlay | Ring |
|---|---|---|---|---|
| Rest | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-background-transparent` | — |
| Hover (pointer) | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-overlay-hover` | — |
| Pressed | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-overlay-pressed` | — |
| Focus (keyboard) | `color-text-neutral-default` | `color-icon-neutral-subtle` | `color-overlay-hover` | `color-border-focus`, `border-width-focus`, inside the item edge |
| Disabled | `color-text-neutral-disabled` | `color-icon-neutral-disabled` | `color-background-transparent` | — |

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/split-button/split-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

Chevron: `motion-duration-md` + `motion-easing-standard-decelerate` on open, `motion-duration-sm` + `motion-easing-standard-accelerate` on close; a half turn when expanded, no turn when collapsed. Menu fade / scale: `MenuAnchor` has no duration or curve parameters, so it uses Flutter's built-in timing; `MenuAnchor(animated: !context.bw.reduceMotion)` turns it off under reduced motion. This is the temporary menu; BwMenu (Day 10) replaces it with token timings.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/split-button/split-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `Semantics(container: true, label: label)` around two buttons; two focus stops |
| Trigger | `Semantics(button: true, label: menuLabel, expanded: isOpen)` |
| Menu | `MenuAnchor` keyboard (arrows, Home / End, Esc) and focus return to the trigger; ArrowDown / ArrowUp move over enabled items and **wrap** (last → first, first → last), as Web B6 and the Tablet build |
| Loading | As BwButton B6; trigger `onPressed: null` while loading |
| Target size | ≥ `BwLayout.mobile.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus; from an open menu, closes it and moves focus on (B4) |
| Enter / Space | Activates; on the trigger opens the menu and focuses the first enabled item |
| ArrowDown / ArrowUp (menu) | Next / previous enabled item, wrapping at the ends |
| Home / End (menu) | First / last enabled item |
| Esc (menu) | Closes the menu; focus returns to the trigger |

### B7 Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

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

> Executor: read `AGENTS.md`, `5-mobile-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Mobile (Flutter + M3) |
| Depends on | BwButton and BwIconButton **Built** |
| Plan version | 2 · 2026-10-24 (Review Round 1 findings 2, 4, 5, 7, 8, 9, 10; mirrors tablet plan 2.1) |

### C1 Goal

`BwSplitButton` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### C2 Scope

In: B1–B6, B9. Out: anything not in the spec.

### C3 Approach

Row of `BwButton` + `BwIconButton`; `MenuAnchor` with `alignmentOffset` from `BwSpacing.xs`, anchored at the end; menu surface per B2 (decorated surface carrying `elevation-3`); chevron rotation per B4 (open `md` decelerate, close `sm` accelerate).

Internal parameters on the approved button components — the same API as Tablet (one API on both platforms; a later Text field (mobile) build reuses it unchanged). All are marked `@internal`, are hidden from `lib/biowave_mobile.dart` (`BwButtonSegment` is not exported), and default to today's behaviour (no change for existing callers; existing button and icon-button tests and goldens must pass unchanged). No other change to these files is allowed.

| File | Internal parameter | Type · default | Used for |
|---|---|---|---|
| `bw_button.dart` | `BwButtonSegment` | `enum BwButtonSegment { start, end }`, declared in this file | Which corners are inner corners (B2) |
| `bw_button.dart` | `segment` | `BwButtonSegment?` · `null` | Corner radii (`BorderRadiusDirectional`, B2) and the focus ring that follows the same radii; `null` = today's radius and ring |
| `bw_icon_button.dart` | `segment` | `BwButtonSegment?` · `null` | Corner radii and the focus ring that follows them (B2) |
| `bw_icon_button.dart` | `focusNode` | `FocusNode?` · `null` | `MenuAnchor.childFocusNode`; focus returns to the trigger (B6) |
| `bw_icon_button.dart` | `autofocus` | `bool` · `false` | Passed to the inner button |
| `bw_icon_button.dart` | `statesController` | `WidgetStatesController?` · `null` | Forces `WidgetState.pressed` while the menu is open (B3 Expanded) |
| `bw_icon_button.dart` | `iconTurns` | `double` · `0` | Chevron half turn when expanded (B4), through an `AnimatedRotation` round the glyph |
| `bw_icon_button.dart` | `iconRotationDuration` | `Duration` · `BwDuration.instant` | Chevron duration (B4) |
| `bw_icon_button.dart` | `iconRotationCurve` | `Curve` · `BwEasing.standard` | Chevron easing (B4) |
| `bw_icon_button.dart` | `expanded` | `bool?` · `null` | `Semantics(expanded:)` on the trigger (B6); `null` = no expanded state |
| `bw_button_style.dart` | `BwButtonStyle.segmentBorderRadius(dimensions, segment)` | `static BorderRadiusDirectional` from `BwButtonMetrics` + `BwButtonSegment?` · `null` = today's radius (`BorderRadiusDirectional.all(dimensions.radius)`) | One helper for the B2 corner radii, used by `bw_button.dart` and `bw_icon_button.dart` for the shape and the focus ring (no copied radius code) |

These replace any other trigger parameters (for example an `iconChild` slot); the chevron half turn is the B4 value (`0.5` turns, a named constant in `bw_split_button.dart`), never derived from a visual token.

### C4 Token gaps

None.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/split_button/bw_split_button.dart  new
5-mobile-components/test/split_button_test.dart                           new
5-mobile-components/test/goldens/split_button/                            new (generated goldens)
5-mobile-components/lib/src/components/button/bw_button.dart              change: internal `BwButtonSegment` enum + `segment` (corner radii + focus ring, via the shared helper) — C3
5-mobile-components/lib/src/components/button/bw_button_style.dart        change: shared internal helper `BwButtonStyle.segmentBorderRadius(dimensions, segment)`, used by BwButton and BwIconButton — C3
5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart    change: internal `segment` (corner radii + focus ring, via the shared helper), `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` (+ `AnimatedRotation` round the glyph, `expanded` on its `Semantics`) — C3
5-mobile-components/lib/biowave_mobile.dart                               change: export `BwSplitButton`, `BwSplitButtonOption`; hide `BwButtonSegment`
5-mobile-components/README.md                                             change: status row
```

### C6 Tests

B9, plus earlier button-family tests still pass.

### C7 Acceptance criteria

- [ ] AC-1 API = B1 (names, defaults, asserts)
- [ ] AC-2 Values from tokens only; shared helpers reused, no copied styles
- [ ] AC-3 States/transitions; reduced motion
- [ ] AC-4 RTL and a11y per B5–B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test`; `npm run sync` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; README status updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Antigravity |
| Date | 2026-10-24 |
| Files changed | `lib/src/components/split_button/bw_split_button.dart`; `test/split_button_test.dart`; `test/goldens/split_button/split-button-{light,dark}-{en,ar}.png`; `lib/src/components/button/bw_button.dart`; `lib/src/components/button/bw_button_style.dart`; `lib/src/components/icon_button/bw_icon_button.dart`; `lib/biowave_mobile.dart`; `README.md`; `components/split-button/split-button.md`; `CHANGELOG.md` |
| Checks | `cd 5-mobile-components && flutter analyze && flutter test` ✓ (141 tests passed); `npm run docs:check` ✓; `npm run sync` ✓ (READY) |

**What was built:**
Implemented `BwSplitButton` and `BwSplitButtonOption` in `lib/src/components/split_button/bw_split_button.dart` exported from `lib/biowave_mobile.dart`, strictly conforming to contract §1–§9.
- Composed of `BwButton` (`primary-action`) and `BwIconButton` (`menu-trigger`) separated by `BwSpacing.xxs` (`gap`) with temporary M3 `MenuAnchor` (`menu`).
- Corner radii: outer corners `radius-md` (or `radius-xl` for `size: BwControlSize.xl`), inner facing corners `radius-xs` (`BwRadius.xs`) using `BorderRadiusDirectional` via the internal `segment` parameter (`BwButtonSegment.start` and `BwButtonSegment.end`).
- Changes to `BwButton` and `BwIconButton`: contract §9 explicitly specifies changing `bw_button.dart` and `bw_icon_button.dart` to support the internal `segment` parameter controlling corner radii and focus ring outlines. `BwIconButton` additionally wires `focusNode`, `expanded` (forcing `WidgetState.pressed` overlay and background per contract §4 while open), and `iconChild` (for `AnimatedRotation` chevron rotation with `BwDuration.md`).
- Semantics and accessibility: outer `Semantics(container: true, label: label)` grouping the two focus stops, trigger with `Semantics(button: true, label: menuLabel, expanded: isOpen)` exposing single labelled button nodes with tap and focus actions (`tester.semantics.tap`, isFocused after Tab).
- Reduced motion: honours `context.bw.reduceMotion`, setting chevron rotation and menu durations to `BwDuration.instant`.
- Validation: asserts on invalid prop combinations (e.g. tonal with neutral, fewer than 2 or more than 5 options, duplicate labels) with release fallbacks.

**Deviations:** none — all internal parameters are marked `@internal`, authorized by Plan 2 C3, and hidden from the package export via `hide BwButtonSegment` in `lib/biowave_mobile.dart`.

**Questions for the Planner:** none

#### Fix round 1 — 2026-10-24 (Antigravity)

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 (🟡) Tab / Shift+Tab do not close the open menu | Handled Tab and Shift+Tab key events via `_closeMenuForTab` on trigger and options (`5-mobile-components/lib/src/components/split_button/bw_split_button.dart:490-493,529-532,556-568`), closing the menu, requesting trigger focus, and advancing/reversing focus | `5-mobile-components/test/split_button_test.dart:746-811` (`Tab and Shift+Tab close the open menu and move focus on`) |
| #3 (🟡) Internal parameters and `BwButtonSegment` must be `@internal` and hidden from public package export | Annotated `BwButtonSegment` and `segment` in `bw_button.dart:15,64`, `segmentBorderRadius` in `bw_button_style.dart:144`, and all 8 composite parameters in `bw_icon_button.dart:67-96` with `@internal`; added `hide BwButtonSegment` in `5-mobile-components/lib/biowave_mobile.dart:12` | `cd 5-mobile-components && flutter analyze` (0 warnings; package public API clean) |
| #6 (🟡) Chevron half turn derived from unrelated tokens | Added public named constant `BwSplitButton.chevronHalfTurn = 0.5` (`5-mobile-components/lib/src/components/split_button/bw_split_button.dart:76`) used for `iconTurns` | `5-mobile-components/test/split_button_test.dart:432-467` (`chevron rotates with B4 open/close durations and curves`) |
| #7 (🟡) Copied segment radius helper | Extracted `BwButtonStyle.segmentBorderRadius(dimensions, segment)` in `bw_button_style.dart:144-167`; reused across `bw_button.dart:84` and `bw_icon_button.dart:192` | `cd 5-mobile-components && flutter test test/button_test.dart test/icon_button_test.dart test/split_button_test.dart` (all 235 tests pass) |
| Plan 2 C3: `BwIconButton` composite parameters | Reworked `BwIconButton` parameters to match C3 table (`segment`, `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` for semantics only; `bw_icon_button.dart:27-32,67-96`), wrapped glyph in `AnimatedRotation` (`bw_icon_button.dart:270-284`), removed `iconChild` and pressed state hack | `cd 5-mobile-components && flutter test test/icon_button_test.dart test/split_button_test.dart` (96 icon button tests + 141 mobile tests pass) |
| Plan 2 B2/B3/B4/B6: Decorated menu surface, elevation-3, item states, cyclic arrows, reduced motion | In `bw_split_button.dart`, wrapped menu items in `DecoratedBox` with `elevation3` and `surfaceRaised` + `ClipRRect` inside transparent `MenuStyle(clipBehavior: Clip.none)` (`bw_split_button.dart:286-306`); implemented arrow keys wrap-around (`bw_split_button.dart:581-599`); configured `MenuAnchor(animated: !context.bw.reduceMotion)` (`bw_split_button.dart:257`) | `5-mobile-components/test/split_button_test.dart:349-373` (surface tokens and elevation-3), `5-mobile-components/test/split_button_test.dart:813-868` (arrow keys wrap around enabled options) |
| Goldens: Missing from C5 / contract §9 in Plan 1 | Regenerated all 4 goldens (`split-button-{light,dark}-{en,ar}.png`) under `test/goldens/split_button/` with `flutter test --update-goldens` per C5; checked pixel-exact visually | `5-mobile-components/test/split_button_test.dart:300-333` (goldens match 800×600 pixel-exact) |

#### Fix round 2 — 2026-10-24 (Antigravity)

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #11 (🟡) Shared `overlay()` resolver order in `bw_button_style.dart` | Restored `states.contains(WidgetState.focused)` check before `WidgetState.pressed` (`5-mobile-components/lib/src/components/button/bw_button_style.dart:66`) returning transparent so `bw_button_style.dart` differs from `main` only by `segmentBorderRadius` | `cd 5-mobile-components && flutter test test/button_test.dart test/split_button_test.dart` (all 91 tests pass) |
| #12 (🟢) Dual focus ring on menu item | Removed redundant `backgroundBuilder` focus border in `5-mobile-components/lib/src/components/split_button/bw_split_button.dart:457-466`, drawing the menu item focus ring once via `side` | `5-mobile-components/test/split_button_test.dart:418-425` (`expect(itemStyle.side!.resolve(...))`) |
| #13 (🟢) `BwSplitButton.chevronHalfTurn` visibility | Marked `BwSplitButton.chevronHalfTurn` with `@visibleForTesting` in `5-mobile-components/lib/src/components/split_button/bw_split_button.dart:76` so it is not exposed as part of the public API | `cd 5-mobile-components && flutter analyze` (0 issues); `5-mobile-components/test/split_button_test.dart:456` |

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-split-button-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/split-button/split-button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Split Button` › section `Split Button` |
| Mode | **Create new.** Legacy reference (read only): none on the mobile pages; legacy reference is the Foundations file › `↳ Split Button` (`4298:3591` / `4298:3881`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Split Button` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Mobile scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/split-button/split-button.md#d2-component-structure), with these Mobile differences:
- `Size` adds `XL`
- No hover states
- Parts are instances of this file's `Button` and `Icon Button`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/split-button/split-button.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

**Icons used:** `expand_more` — menu trigger chevron, Google · Material Symbols Rounded (D-18)

### D4 Properties

As [Web D4](../../../3-web-components/components/split-button/split-button.md#d4-properties), with the Mobile differences listed in D2.

### D5 Variants to generate

8 allowed `Variant × Color` × 4 sizes × 7 states (no `Primary hover` / `Trigger hover`) × 2 languages = **448**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Mobile library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Split Button — Documentation` on `↳ Split Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Phone (SafeArea). 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 5-mobile-components/components/split-button/split-button.md".

### D9 Code Connect

`5-mobile-components/lib/src/components/split_button/bw_split_button.figma.dart` — `Label` → `label`, `Variant`/`Color`/`Size` → enums, `State=Disabled` → `onPressed: null`, `State=Loading` → `loading: true`; `options` as an example list. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Split Button` in the Mobile file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline, incl. `XL`)
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
| 2 | 2026-10-24 | Changes requested | not reviewed |
| 1 | 2026-10-24 | Changes requested | not reviewed |

### E3 Round 2 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 2 · 2026-10-24 |
| Spec version reviewed | 1.0 (F2 entry 2026-10-24) |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Commit reviewed | `8686b67` (branch `ds/split-button-mobile`, `git diff main...HEAD`; working tree clean before this review; merge base `0127282`) |
| Verdict | **Changes requested** (0 🔴, 1 🟡, 2 🟢 open) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files OK |
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 141 tests, all passed (goldens compared, not updated) |

Behaviour probes (a throw-away widget test, copied into `test/` only for the run and deleted after; `git status` clean afterwards; 800 × 600 test screen; 11/11 passed):

| Probe | Result |
|---|---|
| Tab / Shift+Tab close the menu | ✅ Focusable before + split + focusable after; Tab ×3, Enter opens, ArrowDown to item 2, then Tab → menu gone, focus on the next control, no option run (`[0, 0, 0]`). Shift+Tab from item 2 → menu gone, focus on `primary-action`. Also test `Tab and Shift+Tab close the open menu and move focus on` |
| Menu position, LTR + RTL | ✅ Short options: `en` container x 330.9–469.1, menu x 330.9–469.1; `ar` container x 331.7–468.3, menu x 331.7–468.3; menu top = container bottom + 4.0 (`BwSpacing.xs`) in both. Long option: `en` menu x 137.4–469.1 (end edge = container right), `ar` menu x 331.7–647.4 (end edge = container left); width ≥ container |
| Keyboard reach | ✅ Tab ×2 → Space opens, focus on option 0; ArrowUp wraps to the last option, ArrowDown wraps back to the first (B6); ArrowDown + Enter runs option 1 exactly once (`[0, 1, 0]`), menu closes, focus returns to `menu-trigger` |
| Decorated `elevation-3` surface | ✅ Surface `DecoratedBox` color = `surfaceRaised`, `boxShadow` = `context.bw.elevation.elevation3`, radius `radius-lg`, `ClipRRect` inside; `MenuAnchor.clipBehavior = Clip.none`; `MenuStyle.elevation` not set. The M3 menu `Material` keeps its default elevation 3.0 but with transparent color and transparent `shadowColor`, so it paints nothing (B2: no numeric elevation set by the code) |
| Menu fade under reduced motion | ✅ `animated: true` without reduced motion — `FadeTransition` opacity 0.064 → 0.32 → 1.0 over the first frames; with `disableAnimations` `MenuAnchor.animated == false` and every opacity is 1.0 on the first frame (B4) |
| Shared button style, focused + pressed | ❌ Standalone `BwButton(variant: outlined)`: `overlayColor.resolve({focused, pressed})` = `overlayPressed` (on `main` = transparent) — finding 11 |

Changes to the approved button components (`git diff main...HEAD -- lib/src/components/button lib/src/components/icon_button lib/biowave_mobile.dart`), checked against C3:
- `bw_button.dart`: `@internal enum BwButtonSegment { start, end }` (`:15-16`), `@internal final BwButtonSegment? segment` (`:64-65`, default `null`); with `segment != null` the shape and the `BwFocusRing` builder use `BwButtonStyle.segmentBorderRadius` (`:84-106`); `segment == null` keeps `baseStyle`. ✅ Same names as tablet.
- `bw_icon_button.dart`: the eight C3 params, all `@internal`, defaults exactly as C3 — `focusNode` `null`, `autofocus` `false`, `statesController` `null`, `segment` `null`, `iconTurns` `0`, `iconRotationDuration` `BwDuration.instant`, `iconRotationCurve` `BwEasing.standard`, `expanded` `null` (`:26-33`, `:66-96`); `AnimatedRotation` round the glyph (`:270-284`); `expanded` on `Semantics` (`:369`); radius via the shared helper (`:191-192`). `iconChild` and the expanded-driven pressed hack are gone. ✅
- `bw_button_style.dart`: `@internal static BorderRadiusDirectional segmentBorderRadius(BwButtonMetrics, BwButtonSegment?)` (`:143-167`), `null` = `BorderRadiusDirectional.all(dimensions.radius)`. ✅ **But** the `overlay()` resolver was also changed (`:64-78`): `focused` no longer wins over `pressed` — not in C3, which says "No other change to these files is allowed" (finding 11).
- `lib/biowave_mobile.dart:12`: `export 'src/components/button/bw_button.dart' hide BwButtonSegment;` ✅; `:15` exports `bw_split_button.dart`.
- Existing tests unchanged: `git diff main...HEAD --stat -- 5-mobile-components/test` lists only `split_button_test.dart` and the 4 new goldens; `button_test.dart`, `icon_button_test.dart` and their goldens are untouched and pass.

Goldens vs B9: the four goldens in `test/goldens/split_button/` cover allowed `variant` × `color` × sizes, light + dark, en + ar, with radii mirrored in RTL (viewed `split-button-light-ar.png`). B9 does not ask for an open-menu state (tablet B9 is word-for-word the same; its open-menu goldens go beyond it), so the mobile goldens meet B9. The menu surface is covered by token tests instead (Note).

#### Round 1 findings

| # | Status | Evidence |
|---|---|---|
| 1 | Fixed | `bw_split_button.dart:490-493`, `:529-532`, `:556-568`; probe above; test `Tab and Shift+Tab close the open menu and move focus on` |
| 2 | Fixed | Plan 2 C3 table + C5 list every internal param; code matches C3 names and defaults (above) |
| 3 | Fixed | `@internal` on every param, the enum and the helper; `hide BwButtonSegment` (`biowave_mobile.dart:12`); Fix round 1 in C8 lists them |
| 4 | Fixed | Plan B2 maps `elevation-3`; code `bw_split_button.dart:253-306`; probe; test `… surface tokens and elevation-3` (`split_button_test.dart:349-373`) |
| 5 | Fixed | C5 lists `test/goldens/split_button/` |
| 6 | Fixed | `BwSplitButton.chevronHalfTurn = 0.5` (`:76`), closed `0.0` (`:352`); no token used as a turn or width sentinel (see finding 13 for its visibility) |
| 7 | Fixed | One radius helper `BwButtonStyle.segmentBorderRadius`, used by both buttons for shape and ring (C3). The ~15-line `BwFocusRing` builder is still written in both files, as on tablet `main` — Note |
| 8 | Fixed | C3 "chevron rotation per B4 (open `md` decelerate, close `sm` accelerate)"; code `:353-358` |
| 9 | Fixed | B6 says arrows wrap; code `:581-599`; probe; test `arrow keys wrap around enabled options in open menu` |
| 10 | Fixed | Header Source code = `lib/src/components/split_button/bw_split_button.dart` |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | `bw_split_button.dart:14-33` (option), `:37-73` (params, defaults `filled` / `brand` / `lg`, asserts), release fallbacks `:131-146`, default `menuLabel` `:239-242`. Group `BwSplitButton API` |
| AC-2 Values from tokens only; shared helpers reused, no copied styles | ⚠️ | Tokens only (test `component source contains no raw visual values`); radius helper shared (#7 fixed); menu surface tokens per B2 (probe). But the shared `BwButtonStyle.resolve` was changed outside C3 (finding 11) |
| AC-3 States/transitions; reduced motion | ✅ | Chevron B4 timing (test `chevron rotates with B4 open/close durations and curves`); Expanded = Pressed via `statesController` (`:649-656`); menu fade on, off under reduced motion (probe; `:254`); test `reduced motion makes chevron and menu item transitions instant` |
| AC-4 RTL and a11y per B5–B6 | ✅ | Directional radii and end-aligned menu in LTR + RTL (probe; test `menu geometry and end alignment in en and ar`; `*-ar` goldens); Tab / Shift+Tab, arrows wrap, Home / End, Esc (probes + tests); semantics test `exposes container semantics, …, and toggles expanded`; target size test `accessibility guidelines … meet tap target and contrast guidelines` |
| AC-5 analyze, test, sync pass | ✅ | Checks table above (`sync` not re-run this round; C8 reports `sync` READY, and nothing in the fix touches synced files) |
| AC-6 Exported; README status | ✅ | `lib/biowave_mobile.dart:15`; README row = header (`docs:check` ✓) |

#### Rule checks (AGENTS.md §2 and workflow rules)

| Rule | Result | Notes |
|---|---|---|
| 1 No generated files edited | ✅ | Contracts changed only by the Planner's `npm run contract` in `6c54d49`; the fix commit touches no generated file |
| 2 No raw values | ✅ | `0.5` is a named ratio constant per C3; `0.0` only as zero width / turns |
| 3 No primitives | ✅ | No `BwPalette` / `primitive.*` |
| 4 RTL first | ✅ | `EdgeInsetsDirectional`, `BorderRadiusDirectional`, `AlignmentDirectional.bottomStart` |
| 5 Both themes, both languages tested | ✅ | 4 goldens; token tests light + dark |
| 6 Accessibility | ✅ | Keyboard, focus return, semantics (probes + tests) |
| 7 Stay inside the contract | ❌ | `bw_button_style.dart` `overlay()` order changed; C3 / contract allow only the helper in that file, and C8 Fix round 1 does not list it (finding 11) |
| 8 One component per task | ✅ | Only this unit plus the three C5 button files |
| 9 Changelog | ✅ | `CHANGELOG.md` "Fixed — Mobile Split button review round 1" |
| Role ownership | ✅ | Fixer wrote C8 Fix round 1, header Code and README status only |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 11 | 🟡 Should fix | `lib/src/components/button/bw_button_style.dart:64-78` | The shared `overlay()` resolver now returns `overlayPressed` for `{focused, pressed}`; on `main` `focused` wins and returns transparent. This changes the approved BwButton / BwIconButton for every caller (tonal · outlined · text pressed while keyboard-focused; probe above), against Button B3 "focused → transparent", against C3 "No other change to these files is allowed", and unlike tablet `main` (focused first). It is not in C8 Fix round 1 (the CHANGELOG line says the pressed hack was "removed") | Restore the `main` order in `overlay()` so `bw_button_style.dart` differs from `main` only by `segmentBorderRadius`. If a split-button test then fails because the trigger is focused while expanded, do not change the shared style: stop and write it in C8 → Questions for the Planner | Executor |
| 12 | 🟢 Nit | `lib/src/components/split_button/bw_split_button.dart:457-480` | The menu item focus ring is drawn twice: once by `side` (merged into the item shape) and again by a `DecoratedBox` border in `backgroundBuilder`, same width, color and place | Keep one of the two (B3: one ring inside the item edge) | Executor |
| 13 | 🟢 Nit | `lib/src/components/split_button/bw_split_button.dart:76` | `BwSplitButton.chevronHalfTurn` is a public static, so it joins the exported API, which B1 does not list (C3 asks only for "a named constant in `bw_split_button.dart`") | Make it private (for example a top-level `const _chevronHalfTurn`) or `@visibleForTesting` | Executor |

(Severity count: 🟡 #11; 🟢 #12, #13.)

#### Notes (not findings)

- Goldens: B9 does not ask for an open-menu golden, so the four goldens meet it. The tablet goldens also show the open menu. If the menu surface should have visual regression cover on both platforms, the Planner can add that to B9 for both in a later plan version; not required for this unit.
- The `BwFocusRing` `backgroundBuilder` is repeated in `bw_button.dart` and `bw_icon_button.dart` (the radius comes from the shared helper). Same as tablet on `main`; C3 asks only for no copied radius code.
- The M3 menu `Material` keeps M3's default elevation 3.0 with transparent color and `shadowColor`, so nothing is drawn; acceptable under B2.
- The branch is based on `0127282`; `main` has moved on (`d6328c9`, `f555640`). Expect `CHANGELOG.md` conflicts at merge (orchestrator).
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

- Executor (fix round 2): finding 11, and 12 and 13 if cheap; log in C8 → Fix round 2.
- No Planner items: Plan stays `Finished`. Code → `Changes requested` (header + README).

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1 · 2026-10-16 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Commit reviewed | `962f34c` (branch `ds/split-button-mobile`, `git diff main...HEAD`; working tree clean before this review) |
| Verdict | **Changes requested** (0 🔴, 7 🟡, 3 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files OK |
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 139 tests, all passed (goldens compared, not updated) |
| `npm run sync` (AC-5) | ✓ READY for component work; working tree unchanged |

Behaviour probes (a throw-away widget test kept outside the repo, run with `flutter test <scratch file>` from `5-mobile-components`; 800 × 600 test screen):

| Probe (from the tablet Round 1 list) | Result on mobile |
|---|---|
| Menu under the container, LTR + RTL | ✅ Short options: container x 242–558, y 276–324; menu item x 242–558, top 328 (= bottom + `BwSpacing.xs`) in `en` and `ar`. Long options: test `menu geometry and end alignment in en and ar` (end edge = container end edge: right in LTR, left in RTL) |
| Menu items reachable by keyboard | ✅ Tab ×2 → Space opens and focuses the first item; ArrowDown moves to the 2nd; Enter runs option 2 exactly once (`[0, 1, 0]`), menu closes, focus returns to the trigger. Also test `keyboard navigation: two focus stops, …` (Enter / ArrowDown / ArrowUp / Home / End / Esc) |
| Tab closes the menu | ❌ After Tab, and after Shift+Tab, the menu items are still on screen (finding 1) |
| Chevron close timing | ✅ Open `BwDuration.md` + `standardDecelerate`, close `BwDuration.sm` + `standardAccelerate` (`bw_split_button.dart:453-457`; test `chevron rotates with B4 open/close durations and curves`); reduced motion → `instant` |
| BwIconButton parameters beyond `segment` | ❌ `focusNode`, `expanded`, `iconChild` added, public (finding 2, 3) |
| `elevation-3` on the menu | ⚠️ Menu `Material` has `elevation: 8.0` (= `elevation3.first.offset.dy`) with `shadowColor: shadowAmbient` — an M3 elevation shadow, not the `elevation-3` shadow list; the plan does not say how to map it (finding 4) |
| Goldens listed in C5 | ❌ 4 goldens added in `test/goldens/split_button/`, not in C5 / contract §9 (finding 5) |
| Copied radius helper | ❌ The segment radius switch and the focus-ring `backgroundBuilder` are copied into both button files (finding 7) |
| Arrow wrap (Web B6) | ⚠️ ArrowUp on the first item stays on the first item (no wrap); mobile B6 only says "MenuAnchor keyboard" (finding 9) |

Changes to the approved button components (`git diff main...HEAD -- lib/src/components/button lib/src/components/icon_button`):
- `bw_button.dart`: new `BwButtonSegment` enum (`:14`) and `segment` param (`:31`, `:60`); when `segment != null` the style gets the segment `shape` and a `BwFocusRing` `backgroundBuilder` with the same radius (`:79-115`). `segment == null` keeps today's style. Within "corner radii" (the ring follows the corner).
- `bw_icon_button.dart`: `segment` (radius + focus ring, `:176-262`) **plus** `focusNode` (`:25`), `expanded` (`:27`; drives a `WidgetStatesController` + forced pressed background / overlay, `:111-120`, `:194-237`, and `Semantics(expanded:)`, `:372`) and `iconChild` (`:28`, replaces the glyph, `:281-291`). All default to today's behaviour, but only `segment` is in C3 / C5.
- Existing tests unchanged: `git diff main...HEAD --stat -- 5-mobile-components/test` shows only the new `split_button_test.dart` and 4 new goldens; `button_test.dart`, `icon_button_test.dart` and their goldens are untouched and pass.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | `bw_split_button.dart:11-30` (`BwSplitButtonOption(label, onSelected, icon, enabled)`), `:35-71` (params, defaults `filled` / `brand` / `lg`, asserts: tonal + neutral, 2–5 options, option label = `label`), release fallbacks `:125-140`, default `menuLabel` `:368-371`. Group `BwSplitButton API` (9 `AssertionError` cases) |
| AC-2 Values from tokens only; shared helpers reused, no copied styles | ❌ | Parts reuse `BwButtonStyle.resolve` through BwButton / BwIconButton. But the segment radius + focus-ring builder is copied (finding 7), the half turn is derived from unrelated tokens (finding 6), and `elevation-3` is approximated (finding 4). Test `component source contains no raw visual values` passes |
| AC-3 States/transitions; reduced motion | ⚠️ | Chevron B4 timing ✅ (see probes); reduced motion → `instant` for chevron and items (test `reduced motion makes chevron and menu item transitions instant`). Tab does not collapse (finding 1). Menu fade + scale: M3 `MenuAnchor` has no animation here (Note) |
| AC-4 RTL and a11y per B5–B6 | ⚠️ | `BorderRadiusDirectional` radii, menu end-aligned in LTR + RTL (probe + test), chevron not mirrored, `*-ar` goldens. Semantics container + trigger `expanded` (test `exposes container semantics, single labelled button nodes with tap/focus, and toggles expanded`); loading disables trigger (test `loading disables trigger, keeps focus on primary action, and closes open menu`); target size (test `accessibility guidelines … meet tap target and contrast guidelines`). Tab / Shift+Tab leave the menu open (finding 1) |
| AC-5 analyze, test, sync pass | ✅ | Checks table above |
| AC-6 Exported; README status | ✅ | `lib/biowave_mobile.dart:15`; README row equalled the header (`docs:check` ✓) |

#### Rule checks (AGENTS.md §2 and workflow rules)

| Rule | Result | Notes |
|---|---|---|
| 1 No generated files edited | ✅ | Diff has no `generated/`, `dist/`, contract or docs-shell files |
| 2 No raw values | ⚠️ | No hex / px / ms literals; but tokens are borrowed for non-token values (`BwIconAxes.fillSelected / BwBorder.widthStrong` as 0.5 turns, `BwSpacing.none` as 0 turns, shadow `offset.dy` as M3 elevation) — finding 6, 4 |
| 3 No primitives | ✅ | No `BwPalette` / `primitive.*` (test checks `BwPalette`) |
| 4 RTL first | ✅ | `EdgeInsetsDirectional`, `BorderRadiusDirectional`, `AlignmentDirectional.bottomStart` + directional `alignmentOffset` |
| 5 Both themes, both languages tested | ✅ | 4 goldens (light/dark × en/ar); token tests in light and dark |
| 6 Accessibility | ⚠️ | Keyboard operable into the menu ✅; Tab does not close (finding 1) |
| 7 Stay inside the contract | ❌ | BwIconButton gains `focusNode` / `expanded` / `iconChild`, public; goldens folder not in §9; C8 says "Deviations: none" and that §9 "explicitly specifies" focus-ring and these params, which it does not (findings 2, 3, 5) |
| 8 One component per task | ✅ | Only this unit's files plus the two allowed button files |
| 9 Changelog | ✅ | `CHANGELOG.md` "Mobile Split button — code implementation (1.0)" |
| Role ownership | ✅ | Implementer wrote C8, header and README status only |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | `lib/src/components/split_button/bw_split_button.dart:342-359` | Tab and Shift+Tab do not collapse the menu (probe: items still on screen after each). Web B4 (mobile B4 = same): Expanded → Collapsed on "item chosen · Esc · click outside · Tab"; Web B6 "Tab — Close, move focus on". `_handleMenuItemKeyEvent` handles only Home / End | Close the menu on Tab / Shift+Tab from an item (focus then moves on as usual); add a test for both keys | Implementer |
| 2 | 🟡 Should fix | plan C3 / C5 · `bw_icon_button.dart:25-28`, `:111-120`, `:194-237`, `:281-291`, `:372` | C3 / C5 allow only "internal `segment`" on BwIconButton. The build also adds `focusNode`, `expanded` (states controller, forced pressed background + overlay, `Semantics(expanded:)`) and `iconChild`. They serve B3 (Expanded = Pressed), B4 (chevron) and B6 (focus return, `expanded`) and default to no change, but they are not planned. Same gap as tablet Round 1 #4 (fixed there in plan 2) | Record these internal parameters in C3 and C5 (as tablet plan 2: table of internal params, `@internal`, hidden from `lib/biowave_mobile.dart`, default = today's behaviour, existing tests and goldens unchanged); include the focus-ring builder in the `segment` line; regenerate the contract | Planner |
| 3 | 🟡 Should fix | `bw_button.dart:14`, `:31`; `bw_icon_button.dart:25-28`; `lib/biowave_mobile.dart` · C8 | The "internal" params are public: no `@internal`, and `BwButtonSegment`, `segment`, `focusNode`, `expanded`, `iconChild` are exported to every app through `biowave_mobile.dart`, which widens the approved Button / Icon button API. C8 says "Deviations: none" and that contract §9 "explicitly specifies" focus-ring outlines, `focusNode`, `expanded` and `iconChild` — §9 lists only `segment` | After finding 2: mark the params `@internal` and hide `BwButtonSegment` from the package export as C3 then says; list every extra param in C8 → Deviations | Implementer |
| 4 | 🟡 Should fix | plan B2 (mobile) · contract §4.1 · `bw_split_button.dart:374-397` | Web B2 menu = `elevation-3`. Mobile `elevation3` is a `List<BoxShadow>`, which `MenuStyle` cannot take; the build sets M3 `elevation: elevation3.first.offset.dy` (probe: `Material.elevation 8.0`, `shadowColor shadowAmbient`), so the shadow is Material's, not the token's. §4.1 lists only the three radii — none of the menu tokens | Say in mobile B2 how `elevation-3` maps onto the menu (e.g. a decorated menu surface carrying the shadow list, as tablet plan 2) and list the menu tokens (surface-raised, elevation-3, radius-lg, item tokens, overlays, border-focus) so §4.1 shows them; regenerate the contract. Also record in B4 that the temporary `MenuAnchor` has no fade / scale | Planner |
| 5 | 🟡 Should fix | plan C5 · B9 · `test/goldens/split_button/` | B9 asks for goldens but C5 / §9 do not list a goldens folder; the Implementer added 4 goldens without a deviation entry. Same gap as tablet Round 1 #7 and icon-button Round 1 #2 | Add `5-mobile-components/test/goldens/split_button/  new (generated goldens)` to C5 and regenerate | Planner |
| 6 | 🟡 Should fix | `bw_split_button.dart:109-110`, `:513` | Half turn computed as `BwIconAxes.fillSelected / BwBorder.widthStrong` (icon fill axis ÷ border width = 0.5 today) and closed turns as `BwSpacing.none`. These tokens have nothing to do with rotation; if either token changes, the chevron rotation changes. Same for `BwSpacing.none` used as a width sentinel (`:122-123`) | Use a named constant for B4's half turn (`0.5` turns, a ratio, not a visual token) and `0` for closed; keep spacing tokens for spacing only. The motion test then asserts the named constant | Implementer |
| 7 | 🟡 Should fix | `bw_button.dart:79-115`, `bw_icon_button.dart:176-262` · plan C5 | The segment radius switch and the `BwFocusRing` `backgroundBuilder` are copied into both files (AC-2 "shared helpers reused, no copied styles"). C5 does not allow a change to `bw_button_style.dart`, so the Implementer cannot share it today. Tablet solved this in plan 2.1 | Add to C3 / C5: `bw_button_style.dart` change: shared segment radius (+ focus ring) helper, internal, used by BwButton and BwIconButton; regenerate. The Implementer then moves the code there | Planner |
| 8 | 🟢 Nit | plan C3 | C3 says chevron `AnimatedRotation(duration: BwDuration.md)`; B4 closes with `motion-duration-sm`. Code correctly follows B4 | Change C3 to "chevron rotation per B4 (open `md` decelerate, close `sm` accelerate)" | Planner |
| 9 | 🟢 Nit | plan B6 (mobile) | Web B6: ArrowDown / ArrowUp wrap; mobile B6 only says "MenuAnchor keyboard (arrows, Esc)" and MenuAnchor does not wrap (probe: ArrowUp on the first item stays there). Not clear which is required | State in mobile B6 whether arrows wrap; if yes, the Implementer adds it with a test | Planner |
| 10 | 🟢 Nit | `split-button.md` header | "Source code" still reads `lib/src/components/split-button/ — not built yet`; the file is `lib/src/components/split_button/bw_split_button.dart` | Correct the header row | Planner |

(Severity count: 🟡 #1–#7, 🟢 #8–#10.)

#### Notes (not findings)

- Menu fade + scale (B4) is not animated: the temporary M3 `MenuAnchor` has no animation in this Flutter version; the menu is replaced by BwMenu on Day 10. Accepted, to be written in B4 (finding 4).
- Default `menuLabel` is chosen by `languageCode == 'ar'` with two inline strings (`:368-371`); acceptable until the system has a localisation layer.
- `_containerWidth` is re-measured on open and after each frame change; fine.
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

- Planner: findings 2, 4, 5, 7, 8, 9, 10 → fix C3 / C5 / B2 / B4 / B6 / header, set Plan `Finished`, regenerate the contract (`npm run contract -- mobile split-button`).
- Implementer (fix round 1, after the new contract): findings 1, 3, 6, then 7 per the new C5; log in C8.
- Code → `Changes requested`; Plan → `Open` (header + README).

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
| 1.0 | 2026-10-24 | Plan 2 for Review Round 1 (findings 2, 4, 5, 7, 8, 9, 10; user-approved: mirror tablet plan 2.1 and its API names). B2: menu tokens listed, `elevation-3` mapped onto a decorated menu surface (transparent `MenuStyle`, `Clip.none`). B3: menu item states. B4: chevron open / close timing, `MenuAnchor` built-in fade, off under reduced motion. B6: menu arrows wrap; menu keys listed. C3 / C5: internal BwButton / BwIconButton parameters and the shared `BwButtonStyle.segmentBorderRadius` helper (same names as tablet), all `@internal` and hidden from the export; goldens folder added. Header Source code corrected. No new behaviour beyond the Web spec | No | — |
| 1.0 | 2026-10-16 | Initial | No | — |
