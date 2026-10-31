<!-- GENERATED from split-button.md @ adbb393083cc5173 — do not edit; change the source and run: npm run contract -- tablet split-button -->
# Split button · زر مقسّم — Tablet — code contract

> **Everything you need to build Split button on Tablet, and nothing else.** Read this file only. Generated from [`split-button.md`](split-button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](split-button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Composition of `BwButton` (`primary-action`) + `BwIconButton` (`menu-trigger`) + M3 `MenuAnchor` (temporary until the Menu component on Day 10) |
| Import | `BwSplitButton` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.1 · 2026-10-31 |
| Source code | `lib/src/components/split_button/bw_split_button.dart` |
| Tokens | — |
| Source | [`split-button.md`](split-button.md) @ `adbb393083cc5173` |

## 1. What it is

A split button joins a main action with a menu of related alternatives: "Export" + PDF / Excel / CSV, "Approve" + Approve all / Approve with note. The main part runs the most common choice in one press; the chevron part opens the menu. It is built from a [Button](../button/button.md#a--guidelines) and an [Icon button](../icon-button/icon-button.md#a--guidelines), so it looks and behaves like them.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Joins the two parts; outer corners rounded, inner corners square |
| 2 | `primary-action` | Yes | A Button: runs the most common action |
| 3 | `menu-trigger` | Yes | An Icon button with a chevron: opens the menu |
| 4 | `menu` | Yes | The alternatives (Menu component) |
| 5 | `divider` | Yes | A vertical [Divider](../divider/divider.md#a--guidelines) where the two parts meet. The parts touch (no gap), so this line is what separates the two hit areas |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `color`
- 4.3 `size`
- 4.4 `leading-icon`

## 2. API

### BwSplitButton
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

## 3. Dimensions

The two parts touch (`spacing-none`) with a vertical `divider` between them: `VerticalDivider(width: BwBorder.widthDefault, thickness: BwBorder.widthDefault, indent/endIndent: BwSpacing.none, color: color-border-default)` in a `SizedBox` of the control height — the Divider spec values, same on every variant and color (swap for `BwDivider` vertical once Divider is built on Tablet). Outer corners `radius-md` (`xl`: `radius-xl`), inner corners `radius-none` via `BorderRadiusDirectional`; each part's shape is `BwSegmentBorder` (internal), which leaves the inner edge unstroked so an outlined control shows one line there. Parts follow BwButton / BwIconButton B2. Menu: the [Web B2](../../../3-web-components/components/split-button/split-button.md#b2-dimensions) tokens, mapped on Tablet as below (touch-sized rows).

| Part | Property | Token | Tablet mapping |
|---|---|---|---|
| `menu` | offset from `container` | `spacing-xs` | `MenuAnchor.alignmentOffset` (vertical) |
| `menu` | min-width | width of `container` | `MenuStyle.minimumSize` and item `minimumSize` |
| `menu` | padding | `spacing-none` | `MenuStyle.padding` |
| `menu` | background | `color-surface-raised` | the decorated surface (below) |
| `menu` | radius | `radius-lg` | the decorated surface; `MenuStyle.shape` uses the same radius |
| `menu` | elevation | `elevation-3` | the decorated surface: `boxShadow: context.bw.elevation.elevation3` |
| `menu` | M3 surface (unused) | `color-background-transparent-default` | `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` |
| `menu` item | height | `size-control-height-lg` (touch row = `target-min`) | item `minimumSize` |
| `menu` item | padding-inline | `spacing-xl` (menu-row padding on touch, component scale) | `EdgeInsetsDirectional` |
| `menu` item | icon · icon–label gap | `size-icon-lg` · `spacing-md` | `BwIcon(size: BwIconSize.lg)` · `SizedBox` |
| `menu` item | text style | `body-md` | `context.bw.text.bodyMd` |
| `menu` item | focus ring width | `border-width-focus` | inner ring (B3); item corners square, clipped by the surface |

**How `elevation-3` maps on Tablet.** `elevation-3` is a `List<BoxShadow>` (`context.bw.elevation.elevation3`, light and dark), and `MenuStyle` takes only a number (`elevation`) and a `shadowColor`, so the M3 surface is not used for the look: `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` are `color-background-transparent-default`, and `MenuAnchor(clipBehavior: Clip.none)` so the shadow is not cut off. All `menuChildren` sit in one decorated surface — `DecoratedBox(BoxDecoration(color: color-surface-raised, borderRadius: radius-lg, boxShadow: elevation-3))` with a `ClipRRect` of `radius-lg` inside it, so item overlays follow the corners. No numeric M3 elevation is set.

## 4. Tokens by part and state

[Web B3](../../../3-web-components/components/split-button/split-button.md#b3-tokens-by-part-and-state). Expanded trigger = Pressed tokens (`WidgetState.pressed` forced while the menu is open).

Menu item tokens on Tablet (`MenuItemButton` style):

| State | Text | Icon | Overlay | Ring |
|---|---|---|---|---|
| Rest | `color-text-default` | `color-icon-subtle` | `color-background-transparent-default` | — |
| Hover (pointer) | `color-text-default` | `color-icon-subtle` | `color-background-transparent-hovered` | — |
| Pressed | `color-text-default` | `color-icon-subtle` | `color-background-transparent-pressed` | — |
| Focus (keyboard) | `color-text-default` | `color-icon-subtle` | `color-background-transparent-hovered` | `color-border-focus`, `border-width-focus`, inside the item edge |
| Disabled | `color-text-disabled` | `color-icon-disabled` | `color-background-transparent-default` | — |

Dark theme: same tokens. No exceptions.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-icon-disabled` | `context.bw.colors.iconDisabled` | #969696 | #707070 |
| `color-icon-subtle` | `context.bw.colors.iconSubtle` | #292929 | #DBDBDB |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `elevation-3` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 8px 24px 0px rgb(7 19 35 / 12%) | 0px 8px 24px 0px rgb(0 0 0 / 30%) |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0,0,0,1] | [0,0,0,1] |
| `radius-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 10 | 10 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `radius-none` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `radius-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-none` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

Same as the [Web B4](../../../3-web-components/components/split-button/split-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Tablet examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

Chevron: `motion-duration-md` + `motion-easing-standard-decelerate` on open, `motion-duration-sm` + `motion-easing-standard-accelerate` on close. Menu fade / scale: `MenuAnchor` has no duration or curve parameters, so it uses Flutter's built-in timing; `MenuAnchor(animated: !context.bw.reduceMotion)` turns it off under reduced motion.

## 6. RTL

Same as the [Web B5](../../../3-web-components/components/split-button/split-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

## 7. Accessibility (implementation)

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

## 8. Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

BwSplitButton(label: 'Export report', onPressed: () => export('pdf'), options: [
  BwSplitButtonOption(label: 'Export as Excel', onSelected: () => export('xlsx')),
  BwSplitButtonOption(label: 'Export as CSV', onSelected: () => export('csv')),
]);
BwSplitButton(label: 'موافقة', onPressed: approve, options: [BwSplitButtonOption(label: 'موافقة مع ملاحظة', onSelected: approveWithNote)]);
```

## 9. How to build it

### Goal

`BwSplitButton` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### Scope

In: B1–B6, B9. Out: anything not in the spec.

### Approach

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
| `bw_button_style.dart` | shared segment radius helper | `BorderRadiusDirectional` from `BwButtonSegment?` · `null` = today's radius | One helper for the B2 corner radii, used by `bw_button.dart` and `bw_icon_button.dart` (no copied code) |

### Token gaps

None.

### Files to create / change

```
4-tablet-components/lib/src/components/split_button/bw_split_button.dart  new
4-tablet-components/test/split_button_test.dart                           new
4-tablet-components/test/goldens/split_button/                            new (generated goldens)
4-tablet-components/lib/src/components/button/bw_button.dart              change: internal `segment` (corner radii) — C3
4-tablet-components/lib/src/components/button/bw_button_style.dart        change: shared segment radius helper (internal, used by BwButton and BwIconButton)
4-tablet-components/lib/src/components/icon_button/bw_icon_button.dart    change: internal `segment`, `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` (+ `AnimatedRotation` round the glyph, `expanded` on its `Semantics`) — C3
4-tablet-components/lib/biowave_tablet.dart                               change: export
4-tablet-components/README.md                                             change: status row
```

## 10. Tests

- [ ] Goldens for allowed `variant` × `color` × sizes, light + dark, en + ar (radii mirror in RTL)
- [ ] Open/close by tap and keyboard; option runs once; focus returns to trigger
- [ ] Semantics: `expanded` toggles; two focus stops
- [ ] Loading disables trigger; invalid combinations assert

B9, plus earlier button-family tests still pass.

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API = B1 (names, defaults, asserts)
- [ ] AC-2 Values from tokens only; shared helpers reused, no copied styles
- [ ] AC-3 States/transitions; reduced motion
- [ ] AC-4 RTL and a11y per B5–B6
- [ ] AC-5 `cd 4-tablet-components && flutter analyze && flutter test`; `npm run sync` pass
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; README status updated

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 4-tablet-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](split-button.md#c8-execution-log-filled-by-the-executor) in `split-button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `split-button.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
