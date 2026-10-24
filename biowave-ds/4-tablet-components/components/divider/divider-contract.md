<!-- GENERATED from divider.md @ 445f8bb9a37dd8e2 — do not edit; change the source and run: npm run contract -- tablet divider -->
# Divider · فاصل — Tablet — code contract

> **Everything you need to build Divider on Tablet, and nothing else.** Read this file only. Generated from [`divider.md`](divider.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](divider.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Divider · فاصل |
| Platform | Tablet · Flutter + Material 3 |
| Built on | M3 `Divider` (horizontal) and `VerticalDivider` (vertical), styled only from Biowave tokens |
| Import | `BwDivider` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.1 · 2026-10-23 |
| Source code | `lib/src/components/divider/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`divider.md`](divider.md) @ `445f8bb9a37dd8e2` |

## 1. What it is

A divider is a thin line that separates groups of content inside a surface — list items, sections of a card or settings page, or actions in a toolbar. It makes the structure quicker to scan without adding a new surface. It never carries meaning of its own: headings, grouping and spacing still say what belongs together, and the divider only makes the boundary easier to see. A horizontal divider can show a short label in the middle — a connecting word such as “or” between two alternatives — turned on with a show/hide option.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Takes the full length the parent gives it (inline size when horizontal, block size when vertical) and holds the inset space at its ends |
| 2 | `line` | Yes | The visible rule, one border width thick, coloured by `emphasis`. With a label it is drawn as two equal segments, one on each side of the label |
| 3 | `label` | No | Short text centred on a horizontal divider (for example “or” / “أو”); shown only when show label is on |

**Options** (names and values are the props in §2):

- 4.1 `orientation`
- 4.2 `emphasis`
- 4.3 `inset`
- 4.4 `decorative`
- 4.5 `showLabel` and `label`
- 4.6 `component`

## 2. API

### `BwDivider`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | `BwDividerOrientation` | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | `BwDividerEmphasis` | `subtle` · `defaultEmphasis` · `strong` | `defaultEmphasis` | | A4.2 — line colour (B3) |
| `inset` | `BwDividerInset` | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `showLabel` | `bool` | | `false` | | A4.5 — `true`: shows `label` in the middle of a horizontal divider |
| `label` | `String?` | | `null` | | A4.5 — the label text (“or” / “أو”, from the app's localizations); used only when `showLabel` is `true` |
| `key` | `Key?` | | | | |

Platform naming: web `emphasis="default"` = `BwDividerEmphasis.defaultEmphasis` (`default` is reserved in Dart, as Icon's `defaultColor`). Web `decorative` has no Flutter param: M3 `Divider` / `VerticalDivider` add no semantics node, so the line of `BwDivider` is never announced (A8, B6); a shown label is a normal `Text` and is read. Web `component` has no Flutter param (Flutter lists need no list element).

**Invalid combinations** (`assert` in debug; release renders the fallback):

| Combination | Fallback |
|---|---|
| `orientation: vertical` with `inset: start` | Renders `inset: none`; assert message “inset start is for horizontal dividers only” |
| `orientation: vertical` with `showLabel: true` | Renders the plain vertical line, no label; assert message “label is for horizontal dividers only” |
| `showLabel: true` with a `null` or empty `label` | Renders the plain line, no label; assert message “showLabel needs a label” |

## 3. Dimensions

Same as [Web B2](../../../3-web-components/components/divider/divider.md#b2-dimensions). Flutter mapping:

| Part | Property | `horizontal` → `Divider` | `vertical` → `VerticalDivider` |
|---|---|---|---|
| `line` | thickness | `border-width-default` → `thickness: BwBorder.widthDefault` | same |
| `container` | cross size (no extra space around the line) | `height: BwBorder.widthDefault` | `width: BwBorder.widthDefault` |
| `container` | inset `start` | `spacing-xl` → `indent: BwSpacing.xl` (leading edge, directional) | — (invalid, B1) |
| `container` | inset `both` | `indent` and `endIndent: BwSpacing.xl` | `indent` (top) and `endIndent` (bottom): `BwSpacing.xl` |
| `container` | inset `none` | `spacing-none` → `indent` / `endIndent: BwSpacing.none` | same |
| `container` | length | width of the parent | height from the parent's constraints (in a `Row`, the parent bounds the height, e.g. `IntrinsicHeight` or a fixed-height bar) |
| `container` (with label) | layout | `Row(crossAxisAlignment: center)` inside `Padding(EdgeInsetsDirectional.only(start:, end:))` = the inset above (`BwSpacing.xl` / `BwSpacing.none`); height = the label's line height (`caption-md`, per language) | — (no label, B1) |
| `line` (with label) | segments | two `Expanded` segments, each a `Divider(height: BwBorder.widthDefault, thickness: BwBorder.widthDefault, indent: BwSpacing.none, endIndent: BwSpacing.none)`; never shorter than `spacing-xl` → `BwSpacing.xl` | — |
| `label` (with label) | gap | `spacing-md` → `Padding(EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md))` | — |
| `label` (with label) | size | natural width, at most the row width − 2 × `BwSpacing.xl` (the minimum segments); wraps (`softWrap: true`), `TextAlign.center`; never `overflow: ellipsis` | — |

Layout rules: the divider adds no space around itself — the parent's gap (`spacing:` / `SizedBox` with `BwSpacing.*`) does. Inset `start` stays one fixed `spacing-xl`; the List plan (Day 8) adds its own text-aligned inset — nothing is added to `BwDivider` now.

## 4. Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/divider/divider.md#b3-tokens-by-part-and-state) (no component tokens). Flutter mapping:

| `emphasis` | `line` colour → Flutter |
|---|---|
| `subtle` | `color-border-subtle` → `context.bw.colors.borderSubtle` |
| `defaultEmphasis` | `color-border-default` → `context.bw.colors.borderDefault` |
| `strong` | `color-border-strong` → `context.bw.colors.borderStrong` |

Width `border-width-default` → `BwBorder.widthDefault`; inset `spacing-xl` → `BwSpacing.xl`, `spacing-none` → `BwSpacing.none`. Colours are passed explicitly — never read from `DividerTheme` or `ThemeData.dividerColor`. Dark theme: same tokens.

| Part | Property | Token → Flutter |
|---|---|---|
| `label` | text style | `caption-md` → `context.bw.text.captionMd` (family and line height follow the locale) |
| `label` | colour | `color-text-neutral-muted` → `context.bw.colors.textNeutralMuted` (4.5:1 on every surface, pairs already in `contrast-pairs.json`) |
| `label` | gap to each segment | `spacing-md` → `BwSpacing.md` |
| `line` (with label) | minimum segment length | `spacing-xl` → `BwSpacing.xl` |

The label does not change with `emphasis`; the segments use the `emphasis` colour above.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `color-border-default` | `context.bw.colors.borderDefault` | #DBDBDB | #404040 |
| `color-border-strong` | `context.bw.colors.borderStrong` | #BDBDBD | #545454 |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-text-neutral-muted` | `context.bw.colors.textNeutralMuted` | #707070 | #BDBDBD |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-none` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |

## 5. States and transitions

As [Web B4](../../../3-web-components/components/divider/divider.md#b4-states-and-transitions) — none.

## 6. RTL

As [Web B5](../../../3-web-components/components/divider/divider.md#b5-rtl). Flutter: `Divider.indent` is the leading edge and follows `Directionality`, so `inset: start` leaves its space on the right in Arabic with no extra code. Never wrap the line in a physical `EdgeInsets.only(left/right)`. With a label, the row, its inset `Padding` and the label gap use `EdgeInsetsDirectional`; the label stays centred, so the layout looks the same in both directions.

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | None — `Divider` / `VerticalDivider` add no semantics node; the line is never announced |
| Label | A plain `Text`: one semantics node whose label is the `label` text, read in reading order; no extra `Semantics` wrapper, no header or button role |
| Focus | Never focusable |
| Contrast | Line decorative — exempt (A9). Label text 4.5:1 (B3) |
| Target size | Not interactive |

## 8. Examples

```dart
const BwDivider();
const BwDivider(inset: BwDividerInset.start, emphasis: BwDividerEmphasis.subtle);

// "or" between two sign-in options
BwDivider(showLabel: true, label: l10n.or);   // en: "or" · ar: "أو"

// Toolbar groups: the row must bound its height
IntrinsicHeight(
  child: Row(children: [
    undoButton,
    const BwDivider(orientation: BwDividerOrientation.vertical, inset: BwDividerInset.both),
    deleteButton,
  ]),
);
```

## 9. How to build it

### Goal

`BwDivider` from `package:biowave_tablet/biowave_tablet.dart` renders a token-styled horizontal or vertical line with the B1 options — including an optional centred label on horizontal dividers — directional insets that mirror in Arabic, and no semantics node for the line.

### Scope

**In scope:** B1–B9; enums `BwDividerOrientation`, `BwDividerEmphasis`, `BwDividerInset` in `lib/src/components/divider/bw_divider.dart`; export from the package entry file.

**Out of scope:** icons on the divider; a label on vertical dividers; label alignments other than centre; extra thicknesses; a list-text-aligned inset (the List plan decides, Day 8); a `DividerTheme` override in the package theme; any change to other components or the test helpers.

### Approach

- `BwDivider` is a `StatelessWidget`. Resolve colour from `context.bw.colors` per `emphasis` and inset from `BwSpacing` per `inset`, then build `Divider(height:, thickness:, indent:, endIndent:, color:)` or `VerticalDivider(width:, thickness:, indent:, endIndent:, color:)` with the B2 values. Always pass every value explicitly so the M3 defaults (16 dp height, `DividerTheme`) never apply.
- Label (horizontal, `showLabel` and a non-empty `label` only): `LayoutBuilder` → `Padding(EdgeInsetsDirectional.only(start:, end:))` with the B2 inset → `Row(crossAxisAlignment: CrossAxisAlignment.center)` of `Expanded(segment)`, the label, `Expanded(segment)`. Label = `ConstrainedBox(maxWidth: max(0, maxWidth − 2 × BwSpacing.xl))` → `Padding(EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md))` → `Text(label, style: context.bw.text.captionMd.copyWith(color: context.bw.colors.textNeutralMuted), textAlign: TextAlign.center, softWrap: true)`. Segment = `Divider` with every value passed explicitly (B2). Never `Padding` with physical `EdgeInsets`.
- Invalid combinations: `assert` with the B1 messages; then use `BwDividerInset.none` / render without the label.
- Gotchas: `VerticalDivider` takes its height from the parent's constraints — document in the dartdoc that the row must bound its height (B2). `Divider.indent` is directional; do not add `Padding` with physical insets.

### Token gaps

None — `color-border-subtle`, `color-border-default`, `color-border-strong`, `border-width-default`, `spacing-xl`, `spacing-md`, `spacing-none`, `color-text-neutral-muted` and the `caption-md` text style exist.

### Files to create / change

```
4-tablet-components/lib/src/components/divider/bw_divider.dart   new: BwDivider, BwDividerOrientation, BwDividerEmphasis, BwDividerInset
4-tablet-components/lib/biowave_tablet.dart                      change: export divider/bw_divider.dart
4-tablet-components/test/divider_test.dart                       new
4-tablet-components/test/goldens/divider/                        new (generated goldens)
4-tablet-components/README.md                                    change: Code status
4-tablet-components/components/divider/divider.md                change: C8 only
CHANGELOG.md                                           change
```

## 10. Tests

- [ ] Renders horizontal and vertical × `subtle` · `defaultEmphasis` · `strong` × `none` · `start` · `both` (valid combinations) in light + dark × en + ar (`pumpBw`)
- [ ] The rendered `Divider` / `VerticalDivider` has `thickness` and `height` / `width` = `BwBorder.widthDefault` and `color` = the B3 `context.bw.colors.*` value for each emphasis, in both themes
- [ ] Inset: `indent` / `endIndent` = `BwSpacing.xl` per B2; `none` → `BwSpacing.none`
- [ ] RTL: with `inset: start`, the line's leading gap is on the right in `ar` and on the left in `en` (`tester.getTopLeft` / `getTopRight` of the painted line vs the parent)
- [ ] Vertical divider fills the height of a bounded row
- [ ] `orientation: vertical` + `inset: start` throws the B1 assertion in debug
- [ ] Semantics: the divider adds no node (`tester.getSemantics` / `SemanticsTester` finds nothing for it)
- [ ] Label: `showLabel: true` + `label: 'or'` (en) / `'أو'` (ar) renders one centred `Text` between two segments; text style = `context.bw.text.captionMd`, colour = `context.bw.colors.textNeutralMuted`, gap = `BwSpacing.md` on each side, each segment ≥ `BwSpacing.xl` and coloured per `emphasis`, light + dark; with `inset` the space is at the outer ends
- [ ] Label RTL: in `ar` the label is centred and the gaps are equal on both sides (`tester.getRect`)
- [ ] Long label in a narrow parent wraps, stays centred, is never ellipsised, and both segments stay `BwSpacing.xl` long; no overflow error
- [ ] `showLabel: false` with a `label` renders only the line and no `Text`
- [ ] Label semantics: `find.bySemanticsLabel('or')` finds exactly one node; the segments add none
- [ ] `orientation: vertical` + `showLabel: true` and `showLabel: true` with an empty `label` throw the B1 assertions in debug
- [ ] Goldens: emphasis × orientation × inset, light + dark, en + ar, plus a labelled horizontal divider (en “or”, ar “أو”) in both themes
- [ ] Source contains no raw colours or sizes, no primitives (`BwPalette`), no `Icons.`

Implement every item in B9, plus:
- [ ] Every test pumps through `pumpBw` from `test/helpers/bw_test_app.dart` (theme × locale); no own `MaterialApp`

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts + fallbacks, label only on horizontal)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no primitives, no reliance on `DividerTheme` defaults
- [ ] AC-3 RTL per B5 (directional indent and `EdgeInsetsDirectional` only); semantics per B6 (line no node, label one text node)
- [ ] AC-4 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check`, `npm run sync` pass
- [ ] AC-5 Exported from the package entry file; README row and header Code `Built`; C8 and `CHANGELOG.md` filled

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

1. Fill [C8 Execution log](divider.md#c8-execution-log-filled-by-the-executor) in `divider.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `divider.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
