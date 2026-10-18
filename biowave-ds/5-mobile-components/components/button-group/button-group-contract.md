<!-- GENERATED from button-group.md @ b383d1d911faac48 — do not edit; change the source and run: npm run contract -- mobile button-group -->
# Button group · مجموعة أزرار — Mobile — code contract

> **Everything you need to build Button group on Mobile, and nothing else.** Read this file only. Generated from [`button-group.md`](button-group.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](button-group.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Button group · مجموعة أزرار |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3/Flutter `OverflowBar` for horizontal (stacks automatically when the actions do not fit), `Column` for vertical |
| Import | `BwButtonGroup` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-10-16 |
| Source code | `lib/src/components/button-group/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`button-group.md`](button-group.md) @ `b383d1d911faac48` |

## 1. What it is

A button group arranges 2–4 related actions — the footer of a dialog, form or card, a page header's actions — with the same size, spacing, order and alignment everywhere. It is a **layout**, not a control: each action keeps its own look and focus. A connected control where one option is selected is a Segmented button, not a button group.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Lays out the actions |
| 2 | `gap` | Yes | Space between actions |
| 3 | `primary-action` | No | The one filled Button, if the group has one |
| 4 | `secondary-actions` | Yes | Other Buttons, Icon buttons or a Link |

**Options** (names and values are the props in §2):

- 4.1 `orientation`
- 4.2 `align` (horizontal)
- 4.3 `size`
- 4.4 Overflow

## 2. API

### BwButtonGroup
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | `List<Widget>` | BwButton · BwIconButton · BwSplitButton · link | — | ✓ | Reading order: secondary first, primary last |
| `orientation` | `Axis` | `horizontal` · `vertical` | `vertical` | | A4.1 |
| `align` | `BwButtonGroupAlign` | `start` · `center` · `end` · `spaceBetween` · `fill` | `end` | | Horizontal only |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | Passed to children via `BwButtonGroupScope` |
| `maxVisible` | `int` | 1–4 | `2` | | Overflow into a "More options" `BwIconButton` menu |
| `semanticLabel` | `String?` | | `null` | | Exposes the group with a name |

**Invalid combinations** (`assert` in debug, fallback in release): more than one `filled` child → assert · child with its own different `size` → group wins, assert in debug · `spaceBetween` with more than 2 children → assert.

## 3. Dimensions

Gap `BwSpacing.md` in both directions (`spacing`, `overflowSpacing`). Horizontal → `OverflowBar(alignment:` from `align`, `overflowAlignment: OverflowBarAlignment.end`, `overflowDirection: VerticalDirection.up`)` so when it stacks the last child (primary) is on top. `fill` → each child in `Expanded` inside a `Row`. Vertical → `Column(crossAxisAlignment: stretch, verticalDirection: VerticalDirection.up)`. [Web B2](../../../3-web-components/components/button-group/button-group.md#b2-dimensions) for the rest.

## 4. Tokens by part and state

None (children use their own).

Dark theme: same tokens. No exceptions.

## 5. States and transitions

Same as the [Web B4](../../../3-web-components/components/button-group/button-group.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

## 6. RTL

Same as the [Web B5](../../../3-web-components/components/button-group/button-group.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Order | Semantics traversal = children order (secondary → primary) in every layout: wrap each child in `Semantics(sortKey: OrdinalSortKey(i))` |
| Group name | `Semantics(container: true, label: semanticLabel)` when set |
| Overflow | Trigger and menu as BwSplitButton B6 |
| Target size | ≥ `BwLayout.mobile.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

## 8. Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

BwButtonGroup(children: [
  BwButton(label: 'Cancel', variant: BwButtonVariant.outlined, color: BwButtonColor.neutral, onPressed: close),
  BwButton(label: 'Save changes', onPressed: save),
]);
BwButtonGroup(orientation: Axis.vertical, children: [
  BwButton(label: 'إلغاء', variant: BwButtonVariant.outlined, onPressed: close),
  BwButton(label: 'حفظ التغييرات', onPressed: save),
]);
```

## 9. How to build it

### Goal

`BwButtonGroup` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### Scope

In: B1–B6, B9. Out: anything not in the spec.

### Approach

`BwButtonGroupScope` (InheritedWidget) provides `size`; children read it when their own `size` is not passed (make their `size` parameter nullable internally with the platform default). Layout per C2. Overflow builds options from BwButton/BwIconButton children (`label`, `onPressed`).

### Token gaps

None.

### Files to create / change

```
5-mobile-components/lib/src/components/button_group/bw_button_group.dart   new (+ BwButtonGroupScope InheritedWidget)
5-mobile-components/test/button_group_test.dart                            new
5-mobile-components/lib/src/components/button/bw_button.dart               change: read BwButtonGroupScope size
5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart     change: same
5-mobile-components/lib/src/components/split_button/bw_split_button.dart   change: same
5-mobile-components/lib/biowave_mobile.dart                                         change: export
5-mobile-components/README.md                                              change: status row
```

## 10. Tests

- [ ] Goldens: each `align` (horizontal), vertical, overflowed horizontal (narrow width, long Arabic labels) → primary on top
- [ ] Children get the group size; semantics order = children order in every layout
- [ ] Overflow moves the first children into the menu; asserts for invalid combinations

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

1. Fill [C8 Execution log](button-group.md#c8-execution-log-filled-by-the-executor) in `button-group.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `button-group.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
