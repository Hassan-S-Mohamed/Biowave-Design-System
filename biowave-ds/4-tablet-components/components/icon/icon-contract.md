<!-- GENERATED from icon.md @ 553442fcb44129c9 — do not edit; change the source and run: npm run contract -- tablet icon -->
# Icon · أيقونة — Tablet — code contract

> **Everything you need to build Icon on Tablet, and nothing else.** Read this file only. Generated from [`icon.md`](icon.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](icon.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Icon · أيقونة |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter `Icon` with `Symbols.*_rounded` from `material_symbols_icons` (re-exported by `biowave_foundations`, D-18) |
| Import | `BwIcon` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-10-18 |
| Source code | `lib/src/components/icon/` — not built yet (the Executor creates it) |
| Tokens | [`icon.tokens.json`](icon.tokens.json) |
| Source | [`icon.md`](icon.md) @ `553442fcb44129c9` |

## 1. What it is

An icon is a small Google Material Symbols glyph (Rounded style, decision D-18) that helps people recognise an action, object or status faster. It supports text — it rarely replaces it. Every Biowave component that shows an icon uses this one component, so size, colour, fill and right-to-left behaviour are the same everywhere.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square box that sets the size and colour; reserves space so layouts never jump while the font loads |
| 2 | `glyph` | Yes | The Material Symbols Rounded glyph named by `name`; outlined (fill 0) by default, filled (fill 1) for selected states |

**Options** (names and values are the props in §2):

- 4.1 `name`
- 4.2 `size`
- 4.3 `filled`
- 4.4 `color`
- 4.5 `directional`
- 4.6 `label`

## 2. API

### `BwIcon`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `icon` | `IconData` | `Symbols.<name>_rounded` (re-exported by `biowave_foundations`) | | ✓ | A4.1 |
| `size` | `BwIconSize?` | `xs` · `sm` · `md` · `lg` · `xl` · `xl2` · `xl3` | `null` → `IconTheme` size | | A4.2 — inside components the component sets `IconTheme` |
| `filled` | `bool` | | `false` | | A4.3 — `fill: BwIconAxes.fillSelected` |
| `color` | `BwIconColor?` | `defaultColor` · `subtle` · `muted` · `inverse` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | `null` → `IconTheme` colour | | A4.4 |
| `directional` | `bool` | | `false` | | A4.5 — mirrored in RTL via `Directionality` (`Transform.flip(flipX: rtl)`), because only some Symbols carry mirroring metadata |
| `semanticLabel` | `String?` | | `null` | | A4.6 — `null`: `ExcludeSemantics`; set: `Semantics(label:, image: true)` |

Platform naming: web `name` = Flutter `icon` (IconData); web `label` = `semanticLabel`; web `color="default"` = `BwIconColor.defaultColor` (`default` is reserved in Dart); web `2xl`/`3xl` = `xl2`/`xl3`.

**Invalid combinations** (`assert` in debug): status colour without `semanticLabel` and with an explicit `size` (standalone) → assert message “status icons need text or a label”.

## 3. Dimensions

| Size | Token → Flutter | dp |
|---|---|---|
| `xs` | `size-icon-xs` → `BwSize.iconXs` | 12 |
| `sm` | `size-icon-sm` → `BwSize.iconSm` | 16 |
| `md` | `size-icon-md` → `BwSize.iconMd` | 20 |
| `lg` | `size-icon-lg` → `BwSize.iconLg` | 24 |
| `xl` | `size-icon-xl` → `BwSize.iconXl` | 32 |
| `2xl` | `size-icon-2xl` → `BwSize.iconXl2` | 40 |
| `3xl` | `size-icon-3xl` → `BwSize.iconXl3` | 48 |

`Icon(size:, opticalSize: size, fill:, weight: BwIconAxes.weight, grade: BwIconAxes.grade)` inside a `SizedBox.square(dimension: size)`; with `size: null` the box uses `IconTheme.of(context).size`.

## 4. Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/icon/icon.md#b3-tokens-by-part-and-state). Flutter mapping:

| Colour | Token → Flutter |
|---|---|
| `BwIconColor.defaultColor` | `color-icon-default` → `context.bw.colors.iconDefault` |
| `BwIconColor.subtle` | `color-icon-subtle` → `context.bw.colors.iconSubtle` |
| `BwIconColor.muted` | `color-icon-subtlest` → `context.bw.colors.iconSubtlest` |
| `BwIconColor.inverse` | `color-icon-inverse` → `context.bw.colors.iconInverse` |
| `BwIconColor.brand` | `color-icon-role-brand` → `context.bw.colors.iconRoleBrand` |
| `BwIconColor.secondary` | `color-icon-role-secondary` → `context.bw.colors.iconRoleSecondary` |
| `BwIconColor.success` | `color-icon-role-success` → `context.bw.colors.iconRoleSuccess` |
| `BwIconColor.error` | `color-icon-role-error` → `context.bw.colors.iconRoleError` |
| `BwIconColor.warning` | `color-icon-role-warning` → `context.bw.colors.iconRoleWarning` |
| `BwIconColor.info` | `color-icon-role-info` → `context.bw.colors.iconRoleInfo` |

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-icon-default` | `context.bw.colors.iconDefault` | #0A0A0A | #F7F7F7 |
| `color-icon-inverse` | `context.bw.colors.iconInverse` | #FFFFFF | #0A0A0A |
| `color-icon-role-brand` | `context.bw.colors.iconRoleBrand` | #132843 | #BEC9D9 |
| `color-icon-role-error` | `context.bw.colors.iconRoleError` | #A31A1A | #FEA3A3 |
| `color-icon-role-info` | `context.bw.colors.iconRoleInfo` | #1D48AD | #9CBCF2 |
| `color-icon-role-secondary` | `context.bw.colors.iconRoleSecondary` | #094E65 | #90C3D5 |
| `color-icon-role-success` | `context.bw.colors.iconRoleSuccess` | #1E6D41 | #8DD4AE |
| `color-icon-role-warning` | `context.bw.colors.iconRoleWarning` | #773F12 | #FFC88F |
| `color-icon-subtle` | `context.bw.colors.iconSubtle` | #292929 | #DBDBDB |
| `color-icon-subtlest` | `context.bw.colors.iconSubtlest` | #545454 | #BDBDBD |
| `size-icon-2xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-icon-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `size-icon-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `size-icon-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |

### 4.2 Component tokens

The code token map must equal [`icon.tokens.json`](icon.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Icon / Size | size | xs: `size-icon-xs` · sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` · xl: `size-icon-xl` · 2xl: `size-icon-2xl` · 3xl: `size-icon-3xl` |
| Icon / Color | color | default: `color-icon-default` · subtle: `color-icon-subtle` · muted: `color-icon-subtlest` · inverse: `color-icon-inverse` · brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · success: `color-icon-role-success` · error: `color-icon-role-error` · warning: `color-icon-role-warning` · info: `color-icon-role-info` |

## 5. States and transitions

As [Web B4](../../../3-web-components/components/icon/icon.md#b4-states-and-transitions).

## 6. RTL

As [Web B5](../../../3-web-components/components/icon/icon.md#b5-rtl); Flutter: `directional` flips with `Transform.flip(flipX: Directionality.of(context) == TextDirection.rtl)`. Inside `BwButton` / `BwIconButton`, the component passes `directional` through — no second flip.

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Decorative | `ExcludeSemantics` |
| Meaningful | `Semantics(label: semanticLabel, image: true)` |
| Contrast | As Web B6 |
| Focus | Never focusable |

## 8. Examples

```dart
BwButton(label: 'Add device', leadingIcon: Symbols.add_rounded, onPressed: add);   // Button renders BwIcon
BwIcon(icon: Symbols.arrow_forward_rounded, directional: true);
BwIcon(icon: Symbols.push_pin_rounded, filled: pinned);
BwIcon(icon: Symbols.schedule_rounded, size: BwIconSize.md, color: BwIconColor.warning, semanticLabel: 'متأخر');
```

## 9. How to build it

### Goal

`BwIcon` from `package:biowave_tablet/biowave_tablet.dart` renders Material Symbols Rounded glyphs with Biowave sizes, colours, fill and RTL, and the package's later components use it for every icon.

### Scope

**In scope:** B1–B9; `BwIconSize`, `BwIconColor` in `lib/src/components/icon/`; a source check test that fails on `Icons.` in `lib/`. This is the **first** component of the package (Day 1): Button, Icon button and Text field render their icons through `BwIcon`.

**Out of scope:** custom icon fonts; animated icons.

### Approach

- `BwIcon` is a `StatelessWidget`: resolve size (`BwSize.icon*` or `IconTheme`), colour (`context.bw.colors.*` or `IconTheme`), then `Icon(icon, size:, opticalSize:, fill:, weight: BwIconAxes.weight, grade: BwIconAxes.grade, color:)` in a `SizedBox.square`.
- `directional`: `Transform.flip(flipX: isRtl)`; do not also set `matchTextDirection`.
- Semantics per B6.
- Gotchas: `Icon.fill`/`weight`/`grade`/`opticalSize` need the variable Symbols font — they come from `material_symbols_icons` via `biowave_foundations`; never import `package:flutter/material.dart` `Icons`.

### Token gaps

None.

### Files to create / change

```
4-tablet-components/lib/src/components/icon/bw_icon.dart         new: BwIcon, BwIconSize, BwIconColor
4-tablet-components/lib/biowave_tablet.dart                                 change: export bw_icon.dart
4-tablet-components/test/icon_test.dart                            new
4-tablet-components/test/no_legacy_icons_test.dart                 new: fails on `Icons.` in lib/
4-tablet-components/test/goldens/icon/                             new
4-tablet-components/README.md · CHANGELOG.md                       change
```

## 10. Tests

- [ ] Every size renders a box of the token size (`tester.getSize`) in light + dark × en + ar
- [ ] `size: null` follows `IconTheme`; `filled` sets fill 1; colours per B3
- [ ] `directional` flips in RTL only; no double flip inside `BwButton` / `BwIconButton`
- [ ] Semantics: decorative excluded; labelled `image` node with the label
- [ ] Goldens: size scale, colours, filled vs outlined, RTL arrow
- [ ] No `Icons.` usage and no raw sizes/colours in the source

Implement every item in B9.

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts)
- [ ] AC-2 Sizes and colours only from tokens; no raw values
- [ ] AC-3 RTL per B5; a11y per B6
- [ ] AC-4 `cd 4-tablet-components && flutter analyze && flutter test` pass
- [ ] AC-5 Exported; README row `Built`; no `Icons.` in `lib/`

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

1. Fill [C8 Execution log](icon.md#c8-execution-log-filled-by-the-executor) in `icon.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `icon.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
