<!-- GENERATED from icon-button.md @ b2c22e315f706582 — do not edit; change the source and run: npm run contract -- mobile icon-button -->
# Icon button · زر أيقونة — Mobile — code contract

> **Everything you need to build Icon button on Mobile, and nothing else.** Read this file only. Generated from [`icon-button.md`](icon-button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](icon-button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Icon button · زر أيقونة |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `IconButton` · `IconButton.filled` · `IconButton.filledTonal` · `IconButton.outlined` with a `ButtonStyle` from tokens; `isSelected` for toggles; `tooltip` → M3 `Tooltip` (long press) |
| Import | `BwIconButton` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-10-16 |
| Source code | `lib/src/components/icon-button/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`icon-button.md`](icon-button.md) @ `b2c22e315f706582` |

## 1. What it is

An icon button starts an action shown only as an icon: close, edit, more options, notifications, filter. It saves space in toolbars, table rows, cards and app bars. Its name is never visible, so it always has an accessible label, and a tooltip on web. It can also be a **toggle** (pin, favourite, show password) that stays selected.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square hit area and fill |
| 2 | `icon` | Yes | The action. Outlined glyph; filled glyph when a toggle is selected |
| 3 | `tooltip` | Web: yes · touch: on long press | Shows the label on hover and keyboard focus |
| 4 | `focus-ring` | Focus only | Shows keyboard focus |

**Options** (names and values are the props in §2):

- 4.1 `variant` — emphasis
- 4.2 `color`
- 4.3 `size`
- 4.4 `toggle` and `selected`

## 2. API

### BwIconButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `icon` | `IconData` | Material Symbols Rounded | — | ✓ | `icon` |
| `label` | `String` | | — | ✓ | Semantics label and tooltip |
| `onPressed` | `VoidCallback?` | | — | ✓ | `null` = disabled |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` · `text` | `text` | | A4.1 |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` · `error` · `inverse` | `neutral` | | A4.2 |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.3 |
| `toggle` · `selected` | `bool` · `bool` | | `false` · `false` | | A4.4 |
| `selectedIcon` | `IconData?` | filled glyph | `null` | with `toggle` | |
| `tooltip` | `bool` | | `true` | | Long-press tooltip |
| `loading` · `loadingLabel` | | | | | As BwButton |

**Invalid combinations** (`assert` in debug, fallback in release): `tonal` with `neutral`/`inverse` → `outlined` · `toggle` with `filled`/`tonal` → toggle ignored · `toggle` without `selectedIcon` → assert · empty `label` → assert.

## 3. Dimensions

Width = height = `size-control-height-{sm|md|lg|xl}`; icon `size-icon-sm|md|lg|lg`; radius `radius-md` (`xl`: `radius-xl`); hit area ≥ `target-min` (`MaterialTapTargetSize.padded`). Everything else: [Web B2](../../../3-web-components/components/icon-button/icon-button.md#b2-dimensions).

## 4. Tokens by part and state

[Web B3](../../../3-web-components/components/icon-button/icon-button.md#b3-tokens-by-part-and-state) (unselected = Button tokens, selected = B3.2, tooltip = B3.4 with M3 `TooltipThemeData` built from the same tokens). `ButtonStyle` mapping as [BwButton B3](../button/button.md#b3-tokens-by-part-and-state).

Dark theme: same tokens. No exceptions.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `radius-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

Same as the [Web B4](../../../3-web-components/components/icon-button/icon-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

## 6. RTL

Same as the [Web B5](../../../3-web-components/components/icon-button/icon-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | `Semantics(button: true, label: label, toggled: toggle ? selected : null)`; icon `excludeFromSemantics` |
| Tooltip | M3 `Tooltip(message: label, excludeFromSemantics: true)` so the name is not read twice |
| Loading · disabled · focus · target | As BwButton B6 |
| Target size | ≥ `BwLayout.mobile.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

## 8. Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

BwIconButton(icon: Icons.edit_rounded, label: 'Edit device', onPressed: edit);
BwIconButton(icon: Icons.push_pin_outlined, selectedIcon: Icons.push_pin, toggle: true, selected: pinned,
    label: pinned ? 'Unpin' : 'Pin', onPressed: togglePin);
BwIconButton(icon: Icons.edit_rounded, label: 'تعديل الجهاز', onPressed: edit);
```

## 9. How to build it

### Goal

`BwIconButton` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### Scope

In: B1–B6, B9. Out: anything not in the spec.

### Approach

Pick the M3 constructor by `variant`; style from `BwButtonStyle.resolve` (shared with BwButton) plus a selected-state branch (`WidgetState.selected`) for B3.2. Square size via `fixedSize`. Tooltip only when `tooltip` is true.

### Token gaps

None.

### Files to create / change

```
5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart   new (reuses BwButtonStyle, BwControlSize, focus ring)
5-mobile-components/test/icon_button_test.dart                           new
5-mobile-components/lib/biowave_mobile.dart                                       change: export
5-mobile-components/README.md                                            change: status row
```

## 10. Tests

- [ ] Goldens: every allowed `variant` × `color` (selected and not) at `lg`, every size for `text neutral`, light + dark, en + ar
- [ ] Semantics: label read once; toggle state exposed
- [ ] Tap target guideline for `sm`/`md`; contrast guideline
- [ ] Directional icon mirrors in RTL (`matchTextDirection`), `Icons.close_rounded` does not
- [ ] Invalid combinations assert; no raw values

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

1. Fill [C8 Execution log](icon-button.md#c8-execution-log-filled-by-the-executor) in `icon-button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `icon-button.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
