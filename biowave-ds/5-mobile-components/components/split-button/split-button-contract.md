<!-- GENERATED from split-button.md @ 756ebfbd6e53a195 — do not edit; change the source and run: npm run contract -- mobile split-button -->
# Split button · زر مقسّم — Mobile — code contract

> **Everything you need to build Split button on Mobile, and nothing else.** Read this file only. Generated from [`split-button.md`](split-button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](split-button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Composition of `BwButton` (`primary-action`) + `BwIconButton` (`menu-trigger`) + M3 `MenuAnchor` (temporary until the Menu component on Day 10) |
| Import | `BwSplitButton` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-10-16 |
| Source code | `lib/src/components/split_button/bw_split_button.dart` |
| Tokens | — |
| Source | [`split-button.md`](split-button.md) @ `756ebfbd6e53a195` |

## 1. What it is

A split button joins a main action with a menu of related alternatives: "Export" + PDF / Excel / CSV, "Approve" + Approve all / Approve with note. The main part runs the most common choice in one press; the chevron part opens the menu. It is built from a [Button](../button/button.md#a--guidelines) and an [Icon button](../icon-button/icon-button.md#a--guidelines), so it looks and behaves like them.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Groups the two parts; outer corners rounded, inner corners tight |
| 2 | `primary-action` | Yes | A Button: runs the most common action |
| 3 | `menu-trigger` | Yes | An Icon button with a chevron: opens the menu |
| 4 | `menu` | Yes | The alternatives (Menu component) |
| 5 | `gap` | Yes | Small gap that separates the two hit areas |

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

## 4. Tokens by part and state

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

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-transparent` | `context.bw.colors.backgroundTransparent` | #54545400 | #54545400 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-icon-neutral-disabled` | `context.bw.colors.iconNeutralDisabled` | #969696 | #545454 |
| `color-icon-neutral-subtle` | `context.bw.colors.iconNeutralSubtle` | #292929 | #DBDBDB |
| `color-overlay-hover` | `context.bw.colors.overlayHover` | #5454541A | #54545466 |
| `color-overlay-pressed` | `context.bw.colors.overlayPressed` | #54545433 | #54545499 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-neutral-default` | `context.bw.colors.textNeutralDefault` | #0A0A0A | #F7F7F7 |
| `color-text-neutral-disabled` | `context.bw.colors.textNeutralDisabled` | #969696 | #545454 |
| `elevation-3` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 8px 24px 0px rgb(7 19 35 / 12%) | 0px 8px 24px 0px rgb(0 0 0 / 30%) |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0,0,0,1] | [0,0,0,1] |
| `radius-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 10 | 10 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `radius-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `radius-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `spacing-control-gap-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `spacing-control-padding-inline-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-none` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `spacing-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |

## 5. States and transitions

Same as the [Web B4](../../../3-web-components/components/split-button/split-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

Chevron: `motion-duration-md` + `motion-easing-standard-decelerate` on open, `motion-duration-sm` + `motion-easing-standard-accelerate` on close; a half turn when expanded, no turn when collapsed. Menu fade / scale: `MenuAnchor` has no duration or curve parameters, so it uses Flutter's built-in timing; `MenuAnchor(animated: !context.bw.reduceMotion)` turns it off under reduced motion. This is the temporary menu; BwMenu (Day 10) replaces it with token timings.

## 6. RTL

Same as the [Web B5](../../../3-web-components/components/split-button/split-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

## 7. Accessibility (implementation)

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

## 8. Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

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

### Token gaps

None.

### Files to create / change

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
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test`; `npm run sync` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; README status updated

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
cd 5-mobile-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](split-button.md#c8-execution-log-filled-by-the-executor) in `split-button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `split-button.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
