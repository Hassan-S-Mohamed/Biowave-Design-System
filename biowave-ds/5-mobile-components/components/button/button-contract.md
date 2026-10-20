<!-- GENERATED from button.md @ 716f7c539fbad30a — do not edit; change the source and run: npm run contract -- mobile button -->
# Button · زر — Mobile — code contract

> **Everything you need to build Button on Mobile, and nothing else.** Read this file only. Generated from [`button.md`](button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Button · زر |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `FilledButton` · `FilledButton.tonal` · `OutlinedButton` · `TextButton`, chosen by `variant`, with a `ButtonStyle` built only from Biowave tokens. No ink splash |
| Import | `BwButton` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.1 · 2026-10-20 |
| Source code | `lib/src/components/button/` — not built yet (the Executor creates it) |
| Tokens | [`button.tokens.json`](button.tokens.json) |
| Source | [`button.md`](button.md) @ `716f7c539fbad30a` |

## 1. What it is

A button starts an action the user chose: save a form, approve a request, clock in, add a device. Its label says what will happen. Emphasis (`variant`) and `color` tell the user how important the action is and what it does. One screen area has **one** most-important action.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Hit area and fill. Its emphasis and color carry the hierarchy |
| 2 | `leading-icon` | No | Supports the label (e.g. add, download). Never replaces it |
| 3 | `label` | Yes | Says the action, verb first. Single line |
| 4 | `trailing-icon` | No | Shows where the action goes (arrow, external link) |
| 5 | `spinner` | Loading only | Shows that the action is running. Replaces the content in place |
| 6 | `focus-ring` | Focus only | Shows keyboard focus |

**Options** (names and values are the props in §2):

- 4.1 `variant` — emphasis
- 4.2 `color`
- 4.3 `size`
- 4.4 Icons — `leading-icon` · `trailing-icon`
- 4.5 `full-width`

## 2. API

### BwButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | — | ✓ | `label`. Plain text |
| `onPressed` | `VoidCallback?` | | — | ✓ | `null` = disabled (Flutter convention). Not called while `loading` |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` · `text` | `filled` | | Emphasis — A4.1 |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` · `error` · `inverse` | `brand` | | A4.2 |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.3 |
| `leadingIcon` | `IconData?` | `Symbols.*_rounded` (D-18; re-exported by `biowave_foundations`) | `null` | | `leading-icon` |
| `trailingIcon` | `IconData?` | | `null` | | `trailing-icon` |
| `fullWidth` | `bool` | | `false` | | A4.5 |
| `loading` | `bool` | | `false` | | Shows `spinner`, ignores presses, keeps focus |
| `loadingLabel` | `String?` | | localized "Loading" / "جارٍ التحميل" | | Announced when loading starts, e.g. "Saving…" |
| `focusNode` · `autofocus` | | | | | Passed to the M3 button |

`BwControlSize` is shared by every control (Text field, Select, … later) and lives in `lib/src/common/bw_control_size.dart`. Platform naming: Flutter `leadingIcon` = web `startIcon`; `onPressed` = `onClick`; `onPressed: null` = web `disabled`.

**Invalid combinations** (`assert` in debug; fallback in release):
| Combination | Fallback |
|---|---|
| `variant: tonal` with `color: neutral` or `inverse` | `outlined` |
| `leadingIcon` and `trailingIcon` both set | `leadingIcon` only |
| `label` empty | assert "BwButton needs a label — use BwIconButton" |

## 3. Dimensions

```
   BwSpacing.controlPaddingInlineLg                 BwSpacing.controlPaddingInlineLg
     ├────────┤ BwSpacing.controlGapLg                        ├────────┤
   ┬ ┌────────────────────────────────────────────────────────────┐
   │ │        [◆]  ├─┤  Clock in                                 │  radius-md
   │ └────────────────────────────────────────────────────────────┘
   ┴ size-control-height-lg        (hit area ≥ BwLayout.mobile.minTarget)
```

| Part | Property | sm | md | lg | xl |
|---|---|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` | `size-control-height-xl` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `…-md` | `…-lg` | `…-xl` |
| `container` | gap | `spacing-control-gap-sm` | `…-md` | `…-lg` | `…-xl` |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` | `radius-xl` |
| `container` | border width (outlined) | `border-width-default` | same | same | same |
| `leading-icon`, `trailing-icon`, `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` | `size-icon-lg` |
| `label` | text style | `action-sm` | `action-md` | `action-lg` | `action-lg` |
| hit area | min size | `target-min` (`BwLayout.mobile.minTarget`) | same | same (= height) | height |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | same | same | same |

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-gap-lg` → `BwSpacing.controlGapLg` · `radius-md` → `BwRadius.md` · `action-lg` → `context.bw.text.actionLg` · colors → `context.bw.colors.<camelCase>` (e.g. `backgroundBrandDefault`).

Layout rules: width hugs content (`MainAxisSize.min`); `fullWidth` → `minimumSize` width `double.infinity` in the parent constraints. Height fixed by the size token (`fixedSize` height, `minimumSize` height). Outlined border drawn inside the height. `label` one line, `TextOverflow.ellipsis`, `softWrap: false`. Loading keeps the content's size (`Visibility(maintainSize: true, …)`) with the spinner centered on top. `MaterialTapTargetSize.padded` keeps the 48dp hit area for `sm`/`md`. Elevation 0 in every state. The `focus-ring` is painted outside the visible container and takes no layout space: focused or not, the button's size is the container size (height at least `BwLayout.mobile.minTarget`), never container + ring.

## 4. Tokens by part and state

Identical to the [Web B3](../../../3-web-components/components/button/button.md#b3-tokens-by-part-and-state) (same token for every part × state; tokens are platform-agnostic). Flutter mapping:

| Spec part / state | `ButtonStyle` field |
|---|---|
| `container` background (Default · Hover · Pressed · Disabled) | `backgroundColor` `WidgetStateProperty` |
| state layer (tonal · outlined · text) | `overlayColor`: hovered → `overlayHover`, pressed → `overlayPressed`, focused → transparent; filled → always transparent |
| `container` border (outlined) | `side` `WidgetStateProperty` (`BorderSide(width: BwBorder.widthDefault, color: …)`) |
| `label` · `spinner` | `foregroundColor` |
| icons | `iconColor` |
| splash | `splashFactory: NoSplash.splashFactory` |
| elevation, shadow | `elevation: 0`, `shadowColor: transparent` |

Dark theme: same tokens, values switch automatically. No exceptions.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-inverse` | `context.bw.colors.borderInverse` | #FFFFFF | #0A0A0A |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `radius-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-control-height-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `size-control-height-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 56 | 56 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-control-gap-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-control-gap-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `spacing-control-padding-inline-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

### 4.2 Component tokens

The code token map must equal [`button.tokens.json`](button.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Button / Size | height | sm: `size-control-height-sm` · md: `size-control-height-md` · lg: `size-control-height-lg` · xl: `size-control-height-xl` |
| Button / Size | padding-inline | sm: `spacing-control-padding-inline-sm` · md: `spacing-control-padding-inline-md` · lg: `spacing-control-padding-inline-lg` · xl: `spacing-control-padding-inline-xl` |
| Button / Size | gap | sm: `spacing-control-gap-sm` · md: `spacing-control-gap-md` · lg: `spacing-control-gap-lg` · xl: `spacing-control-gap-xl` |
| Button / Size | icon | sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` · xl: `size-icon-lg` |
| Button / Size | radius | sm: `radius-md` · md: `radius-md` · lg: `radius-md` · xl: `radius-xl` |
| Button / Size | border-width | sm: `border-width-default` · md: `border-width-default` · lg: `border-width-default` · xl: `border-width-default` |
| Button / Filled | container/default | brand: `color-background-brand-default` · secondary: `color-background-secondary-default` · error: `color-background-error-default` · neutral: `color-background-neutral-default` · inverse: `color-background-inverse-default` |
| Button / Filled | container/hover | brand: `color-background-brand-hover` · secondary: `color-background-secondary-hover` · error: `color-background-error-hover` · neutral: `color-background-neutral-hover` · inverse: `color-background-inverse-hover` |
| Button / Filled | container/pressed | brand: `color-background-brand-pressed` · secondary: `color-background-secondary-pressed` · error: `color-background-error-pressed` · neutral: `color-background-neutral-pressed` · inverse: `color-background-inverse-pressed` |
| Button / Filled | container/disabled | brand: `color-background-neutral-disabled` · secondary: `color-background-neutral-disabled` · error: `color-background-neutral-disabled` · neutral: `color-background-neutral-disabled` · inverse: `color-background-neutral-disabled` |
| Button / Filled | label/default | brand: `color-text-on-brand` · secondary: `color-text-on-secondary` · error: `color-text-on-error` · neutral: `color-text-neutral-default` · inverse: `color-text-role-brand` |
| Button / Filled | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` · neutral: `color-text-neutral-disabled` · inverse: `color-text-neutral-disabled` |
| Button / Filled | icon/default | brand: `color-icon-on-brand` · secondary: `color-icon-on-secondary` · error: `color-icon-on-error` · neutral: `color-icon-neutral-default` · inverse: `color-icon-role-brand` |
| Button / Filled | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` · neutral: `color-icon-neutral-disabled` · inverse: `color-icon-neutral-disabled` |
| Button / Tonal | container/default | brand: `color-background-brand-subtle` · secondary: `color-background-secondary-subtle` · error: `color-background-error-subtle` |
| Button / Tonal | container/disabled | brand: `color-background-neutral-disabled` · secondary: `color-background-neutral-disabled` · error: `color-background-neutral-disabled` |
| Button / Tonal | state-layer/hover | brand: `color-overlay-hover` · secondary: `color-overlay-hover` · error: `color-overlay-hover` |
| Button / Tonal | state-layer/pressed | brand: `color-overlay-pressed` · secondary: `color-overlay-pressed` · error: `color-overlay-pressed` |
| Button / Tonal | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` |
| Button / Tonal | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` |
| Button / Tonal | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` |
| Button / Tonal | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` |
| Button / Outlined | container/default | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Outlined | container/disabled | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Outlined | border/default | brand: `color-border-brand` · secondary: `color-border-secondary` · error: `color-border-error` · neutral: `color-border-strong` · inverse: `color-border-inverse` |
| Button / Outlined | border/disabled | brand: `color-border-disabled` · secondary: `color-border-disabled` · error: `color-border-disabled` · neutral: `color-border-disabled` · inverse: `color-border-disabled` |
| Button / Outlined | state-layer/hover | brand: `color-overlay-hover` · secondary: `color-overlay-hover` · error: `color-overlay-hover` · neutral: `color-overlay-hover` · inverse: `color-overlay-hover` |
| Button / Outlined | state-layer/pressed | brand: `color-overlay-pressed` · secondary: `color-overlay-pressed` · error: `color-overlay-pressed` · neutral: `color-overlay-pressed` · inverse: `color-overlay-pressed` |
| Button / Outlined | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` · neutral: `color-text-neutral-default` · inverse: `color-text-on-brand` |
| Button / Outlined | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` · neutral: `color-text-neutral-disabled` · inverse: `color-text-neutral-disabled` |
| Button / Outlined | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` · neutral: `color-icon-neutral-default` · inverse: `color-icon-on-brand` |
| Button / Outlined | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` · neutral: `color-icon-neutral-disabled` · inverse: `color-icon-neutral-disabled` |
| Button / Text | container/default | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Text | container/disabled | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Text | state-layer/hover | brand: `color-overlay-hover` · secondary: `color-overlay-hover` · error: `color-overlay-hover` · neutral: `color-overlay-hover` · inverse: `color-overlay-hover` |
| Button / Text | state-layer/pressed | brand: `color-overlay-pressed` · secondary: `color-overlay-pressed` · error: `color-overlay-pressed` · neutral: `color-overlay-pressed` · inverse: `color-overlay-pressed` |
| Button / Text | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` · neutral: `color-text-neutral-default` · inverse: `color-text-on-brand` |
| Button / Text | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` · neutral: `color-text-neutral-disabled` · inverse: `color-text-neutral-disabled` |
| Button / Text | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` · neutral: `color-icon-neutral-default` · inverse: `color-icon-on-brand` |
| Button / Text | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` · neutral: `color-icon-neutral-disabled` · inverse: `color-icon-neutral-disabled` |
| Button / Focus | color | default: `color-border-focus` · inverse: `color-border-inverse` |

## 5. States and transitions

Same table as [Web B4](../../../3-web-components/components/button/button.md#b4-states-and-transitions). Flutter: `animationDuration: BwDuration.sm`; pressed uses the same duration (M3 buttons animate state colors with one duration); loading cross-fade `AnimatedSwitcher(duration: BwDuration.sm)`; spinner `CircularProgressIndicator` (indeterminate).
Reduced motion: when `context.bw.reduceMotion` is true use `BwDuration.instant`; the spinner keeps rotating.

## 6. RTL

```
LTR  │  [◆]  Add device          │      │  Next  [▸]  │
RTL  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically from `Directionality`; padding is `EdgeInsetsDirectional` |
| directional icons | Mirrored by `material_symbols_icons` itself for directional glyphs (`Symbols.arrow_forward_rounded`, `chevron_right`, `logout`…; D-18). Do not wrap in `Transform` |
| non-directional icons, `spinner` | Do not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | M3 button semantics (`button: true`, `enabled`). Icons `excludeFromSemantics` |
| Accessible name | `label` |
| Loading | `Semantics(label: '$label', value: loadingLabel, button: true, enabled: true)`; `SemanticsService.announce(loadingLabel, Directionality.of(context))` once when `loading` turns on; presses ignored, focus kept |
| Disabled | `onPressed: null` → not focusable, `enabled: false` |
| Focus | Keyboard focus only (`FocusManager.instance.highlightMode == traditional`): ring `border-width-focus` in `color-border-focus` (`inverse`: `color-border-inverse`) painted around the **visible container** (the shaped `Material`), never around the padded 48dp tap-target box: gap between container edge and ring = `border-focus-offset`, stroke = `border-width-focus`, ring inner-edge radius = container radius + offset (outer edge + `border-width-focus`, concentric). The ring takes no layout space (C3) and appears and disappears instantly (B4 Any → Focus `motion-duration-instant`) |
| Target size | ≥ `BwLayout.mobile.minTarget` via `MaterialTapTargetSize.padded` |
| Text scale | Label scales with the system text scale; height grows rather than clipping (use `minimumSize`, not a hard max) |
| Screen reader output | "Clock in, button" / "تسجيل الحضور، زر" · loading: "Saving…" announced |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

## 8. Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

// Screen main action, full width
BwButton(label: 'Clock in', size: BwControlSize.xl, fullWidth: true, onPressed: clockIn);

// Pair in a sheet
BwButton(label: 'Cancel', variant: BwButtonVariant.outlined, color: BwButtonColor.neutral, onPressed: close);
BwButton(label: 'Save changes', loading: saving, loadingLabel: 'Saving…', onPressed: save);

// Destructive
BwButton(label: 'Delete user', color: BwButtonColor.error, onPressed: confirmDelete);

// Arabic: same code; MaterialApp(locale: Locale('ar')) + BwMobileTheme.light(locale) give RTL and the Arabic font
BwButton(label: 'تسجيل الحضور', leadingIcon: Symbols.login_rounded, onPressed: clockIn);
```

## 9. How to build it

### Goal

`BwButton` from `package:biowave_mobile/biowave_mobile.dart` renders every allowed `variant` × `color` × `size` of B1–B3 from tokens only, behaves as B4–B6 in light/dark and en/ar, and passes B9. First component of this package: it also adds `BwControlSize` and the golden-test helpers later components reuse.

### Scope

**In scope**: B1 API (all params) · C2 · C3 · C4 · C5 · C6 · C9.
**Out of scope**: Icon button, Split button, Button group; a shared Progress widget (Day 5) — use M3 `CircularProgressIndicator` directly inside the button.

### Approach

- `BwButton` is a `StatelessWidget` that picks `FilledButton` / `FilledButton.tonal` / `OutlinedButton` / `TextButton` by `variant` and passes `style: BwButtonStyle.resolve(context, variant, color, size)`.
- `bw_button_style.dart`: a pure function that maps (variant, color, size) → `ButtonStyle` using only `context.bw.colors`, `context.bw.text`, `BwSize`, `BwSpacing`, `BwRadius`, `BwBorder`, `BwDuration`. One `switch` per B3 table — no colors computed with `withOpacity`/`lerp`.
- Child: `Row(mainAxisSize: MainAxisSize.min)` with `leadingIcon` / `label` / `trailingIcon` and `SizedBox(width: BwSpacing.control{Gap}{Size})` gaps; wrapped in `Visibility(maintainSize: true, maintainAnimation: true, maintainState: true, visible: !loading)`; spinner centered in a `Stack`.
- Focus ring (B6): `BwFocusRing` in `lib/src/common/bw_focus_ring.dart` — not exported from the package, reused by later controls (Icon button, Chip, Text field). It is **painted outside the visible container and never changes layout**. No `Padding`, no wrapper around the M3 button.
  - **Hook:** the M3 button's `ButtonStyle.backgroundBuilder`. Its `child` is exactly the shaped container (inside the button's `Material`, inside the 48dp tap-target padding), so the ring is sized from the container and never from the padded box. Pass `clipBehavior: Clip.none` to the M3 button: Flutter switches to `Clip.antiAlias` when a builder is set, which would clip the ring.
  - **Paint:** `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough, children: [child, ring])`; the ring is `PositionedDirectional(start: -i, end: -i, top: -i, bottom: -i)` with `i = BwBorder.focusOffset + BwBorder.widthFocus`, then `IgnorePointer` → `DecoratedBox(BoxDecoration(border: Border.all(width: BwBorder.widthFocus, color: …), borderRadius: …))`. The border is drawn inside that box, so the gap to the container is `focusOffset`. Outer radius = container radius + `focusOffset` + `widthFocus` (inner edge = container radius + offset, concentric).
  - **When:** shown only if the builder's states contain `WidgetState.focused` **and** `FocusManager.instance.highlightMode == FocusHighlightMode.traditional`. `BwFocusRing` is a `StatefulWidget` that listens with `FocusManager.instance.addHighlightModeListener` (removed in `dispose`) so a mode change repaints it. Shown and hidden instantly — no `AnimatedOpacity` / `AnimatedContainer` (B4 Any → Focus is `motion-duration-instant`).
  - **API:** `BwFocusRing({required bool focused, required BorderRadiusGeometry borderRadius, required Color color, Key? ringKey, required Widget child})`. `borderRadius` is the control's container radius (resolved with `Directionality.of(context)`; a stadium or circle passes its own radius), so other shapes reuse it. `ringKey` is set on the ring's `DecoratedBox` by the caller — `BwButton` passes `ValueKey('BwButton.focus-ring')`; the shared widget hard-codes no key. Color: `context.bw.colors.borderFocus`, `inverse` → `borderInverse`.
- Loading: wrap `onPressed` to a no-op while loading **but keep it non-null** so the button stays enabled and focusable — only when `onPressed` itself is non-null (`loading && onPressed != null ? () {} : onPressed`); `onPressed: null` stays disabled even while loading (B1). Announce via `SemanticsService.announce`.
- Invalid combinations: `assert` + fallback (B1).
- Gotchas: M3 `FilledButton` default `minimumSize` (64×40) and `padding` must be overridden from tokens; `visualDensity` must be `VisualDensity.standard` so heights are exact; `tapTargetSize: MaterialTapTargetSize.padded`.

### Token gaps

None (Foundations 1.1.0 added the control and inverse/overlay tokens).

### Files to create / change

```
5-mobile-components/lib/src/common/bw_control_size.dart          new: enum BwControlSize { sm, md, lg, xl }
5-mobile-components/lib/src/common/bw_focus_ring.dart            new: BwFocusRing (C3), not exported
5-mobile-components/lib/src/components/button/bw_button.dart     new: BwButton, BwButtonVariant, BwButtonColor
5-mobile-components/lib/src/components/button/bw_button_style.dart  new
5-mobile-components/lib/biowave_mobile.dart                               change: export bw_control_size.dart and button/bw_button.dart
5-mobile-components/test/helpers/bw_test_app.dart                new: pumpBw(tester, child, {brightness, locale, textScale, reduceMotion}) using BwMobileTheme
                                                                    MaterialApp gets locale, supportedLocales [en, ar] and
                                                                    GlobalMaterialLocalizations.delegates (flutter_localizations,
                                                                    dev dependency); reduceMotion sets MediaQuery disableAnimations
5-mobile-components/test/flutter_test_config.dart                new: testExecutable loads the real fonts once before every test
5-mobile-components/test/fonts/                                  new: Inter-{Regular,Medium,SemiBold}.ttf · IBMPlexSansArabic-{Regular,Medium,SemiBold}.ttf
                                                                    · OFL-Inter.txt · OFL-IBMPlexSansArabic.txt (licences, unchanged)
5-mobile-components/test/button_test.dart                        new
5-mobile-components/test/goldens/button/                         new (generated goldens)
5-mobile-components/README.md                                    change: status table row
```

**Test fonts** (`test/flutter_test_config.dart`; review finding #6). Goldens must show the real Latin and Arabic text and the icon glyphs, so `testExecutable` calls `TestWidgetsFlutterBinding.ensureInitialized()`, loads three families with `FontLoader`, then runs `testMain()`:

| Family (name registered) | Source | Licence | Why this source |
|---|---|---|---|
| `BwFontFamily.en` (`Inter`) — 400 · 500 · 600 | `test/fonts/Inter-*.ttf`, static TTFs from the official Inter 4.x release (github.com/rsms/inter, `extras/ttf`), committed with `OFL-Inter.txt` | SIL OFL 1.1 | Not in any package: `google_fonts` downloads fonts over the network at run time (not offline, not deterministic) and `@fontsource` ships only WOFF/WOFF2, which `FontLoader` does not take. Committed TTFs are offline, pinned and OFL allows redistribution with the licence |
| `BwFontFamily.ar` (`IBM Plex Sans Arabic`) — 400 · 500 · 600 | `test/fonts/IBMPlexSansArabic-*.ttf`, static TTFs from github.com/google/fonts `ofl/ibmplexsansarabic`, committed with `OFL-IBMPlexSansArabic.txt` | SIL OFL 1.1 | Same as above |
| `packages/material_symbols_icons/MaterialSymbolsRounded` (the family Flutter resolves for `Symbols.*_rounded`) | `rootBundle.load('packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded.ttf')` — the asset already shipped by `material_symbols_icons` (dependency of `biowave_foundations`) | Apache 2.0 | Already on disk after `flutter pub get`, offline; nothing to commit |

Rules: register Latin and Arabic with the `BwFontFamily.en` / `.ar` constants, not string literals; read the TTFs with `File('test/fonts/…').readAsBytes()` (tests run from the package root); no `pubspec.yaml` change (the fonts are test-only, not package assets); `Noto Sans Arabic` (fallback) is not loaded. Goldens with real fonts are platform-specific: generate and compare them on macOS, where the checks run.

## 10. Tests

- [ ] Golden tests: every allowed `variant` × `color` at `lg`, plus each size for `filled brand`, in light + dark and `Locale('en')` + `Locale('ar')`, rendered with the **real fonts** (`test/flutter_test_config.dart`, C5): Latin `Inter`, Arabic `IBM Plex Sans Arabic` (shaped, joined), Material Symbols Rounded glyphs — no Ahem boxes
- [ ] States: hovered, pressed, focused (keyboard highlight mode), disabled, loading — colors read from the resolved `ButtonStyle` equal the tokens in B3
- [ ] Loading: `onPressed` not called, size unchanged, focus kept, announcement made once
- [ ] Each invalid combination in B1 asserts in debug
- [ ] `meetsGuideline(androidTapTargetGuideline)` and `textContrastGuideline` for every variant × color, in light **and** dark
- [ ] Text scale 2.0: label not clipped — the container (measured) is taller than its size token for `sm` and at least as tall as the label
- [ ] Exact sizes: for each size the visible container (`tester.getSize` of the `Material` inside `BwButton`) has height `BwSize.controlHeight{Sm|Md|Lg|Xl}`; `fullWidth` in a parent of width W → container width W
- [ ] Focus ring geometry, for each size, LTR and RTL, keyboard focus: ring rect (`tester.getRect` of the caller key `BwButton.focus-ring`) = container rect inflated by `BwBorder.focusOffset + BwBorder.widthFocus` on every side (so for `sm`/`md` it follows the container, not the 48dp tap target); ring border width = `BwBorder.widthFocus`; color `borderFocus` (`inverse`: `borderInverse`); outer radius = container radius + `focusOffset` + `widthFocus`
- [ ] Ring takes no layout: the `BwButton` rect is identical before and after focus; its width equals the container width and its height equals `max(container height, BwLayout.mobile.minTarget)`
- [ ] Ring shows on the first frame after keyboard focus (no fade) and never in touch highlight mode
- [ ] `loading: true` with `onPressed: null` stays disabled: not focusable, `enabled: false`
- [ ] Directional icon mirrors in RTL; `Symbols.add_rounded` does not
- [ ] No raw values: the widget file contains no `Color(0x`, no numeric `EdgeInsets`/`SizedBox` sizes, no `Duration(milliseconds:` (lint test)

Implement every item in B9, plus:
- [ ] `pumpBw` helper covers the 4 theme × locale combinations; in `ar` a widget that needs `MaterialLocalizations` (e.g. `TextField`) builds; `reduceMotion: true` makes `context.bw.reduceMotion` true — the reduced-motion test uses it
- [ ] Test fonts load: a probe `Text` in `BwFontFamily.en` and `.ar` is not rendered with the test font (its width differs from the Ahem width), and `Icon(Symbols.add_rounded)` paints a glyph (golden)
- [ ] `BwButtonStyle.resolve` unit test: for each allowed (variant, color), resolved colors per `WidgetState` equal B3 tokens

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus ring only in keyboard mode; loading keeps focus and announces)
- [ ] AC-5 Tests pass: `cd 5-mobile-components && flutter analyze && flutter test`; `npm run sync` passes
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` status table updated to `Built`
- [ ] AC-7 No ink splash; elevation 0; exact heights per size (golden + `tester.getSize`)
- [ ] AC-8 Focus ring painted outside the visible container with no layout change (C3, B6) and measured per size (B9); shared test setup per C5: real fonts via `test/flutter_test_config.dart`, `pumpBw` with Material localizations and `reduceMotion`

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

1. Fill [C8 Execution log](button.md#c8-execution-log-filled-by-the-executor) in `button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `button.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
