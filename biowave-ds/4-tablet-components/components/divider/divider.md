# Divider · فاصل — Tablet

> **One file for Divider on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet divider`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Divider · فاصل |
| Summary | A thin line that separates groups of content so a list, card or toolbar is quicker to scan. |
| Summary (ar) | خط رفيع يفصل بين مجموعات المحتوى لتسهيل قراءة القائمة أو البطاقة أو شريط الأدوات. |
| Parts | Container · line · label (optional) |
| Parts (ar) | الحاوية · الخط · النص (اختياري) |
| Platform | Tablet · Flutter + Material 3 |
| Built on | M3 `Divider` (horizontal) and `VerticalDivider` (vertical), styled only from Biowave tokens |
| Import | `BwDivider` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Divider` · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-23 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/divider/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens: every value is a semantic token, P-04) |
| Contracts | [`divider-contract.md`](divider-contract.md) · [`figma-divider-contract.md`](figma-divider-contract.md) — generated, never edited |
| Docs page | [`divider.html`](divider.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

A divider is a thin line that separates groups of content inside a surface — list items, sections of a card or settings page, or actions in a toolbar. It makes the structure quicker to scan without adding a new surface. It never carries meaning of its own: headings, grouping and spacing still say what belongs together, and the divider only makes the boundary easier to see. A horizontal divider can show a short label in the middle — a connecting word such as “or” between two alternatives — turned on with a show/hide option.

### A2 Anatomy

```
Horizontal (inset none)                      Horizontal (inset start)
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│①────────────────────────────────────②│     │①       ──────────────────────────────②│
└──────────────────────────────────────┘     └──────────────────────────────────────┘
                                                ├─────┤ spacing-xl

Horizontal with label (show label on)
┌──────────────────────────────────────┐
│①─────────────── ③or ────────────────②│
└──────────────────────────────────────┘
                 ├─┤    ├─┤ spacing-md (gap on each side of the label)

Vertical (in a toolbar row)
┌──────────────────────────────┐
│ [◆]  [◆]  │②  [◆]  [◆]       │   ① container · ② line · ③ label
└──────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Takes the full length the parent gives it (inline size when horizontal, block size when vertical) and holds the inset space at its ends |
| 2 | `line` | Yes | The visible rule, one border width thick, coloured by `emphasis`. With a label it is drawn as two equal segments, one on each side of the label |
| 3 | `label` | No | Short text centred on a horizontal divider (for example “or” / “أو”); shown only when show label is on |

### A3 Usage

**When to use**
- Between items in a list or menu when spacing alone does not separate them clearly
- Between sections of one surface (card, side sheet, settings page) that share the same background
- Between groups of actions in a toolbar or action bar (vertical)
- Between two alternatives stacked one above the other, with a short label (“or” between two sign-in options)

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| Separating whole areas of a page | Spacing between sections (`2-foundations/guidelines/spacing.md`) or separate surfaces (Card) |
| Separating buttons in a footer or dialog | [Button group](../button-group/button-group.md#a--guidelines) — its gap already separates them |
| Naming a group (“Account”, “Notifications”) | A heading or list subheader above the group; the divider label is only for a short connecting word such as “or” |
| Showing an edge of a card, field or table cell | The component's own border |
| Showing progress or a selected tab | Progress or Tabs — a divider never shows state |

### A4 Options

#### 4.1 `orientation`

| Value | Looks like | Pick it when |
|---|---|---|
| `horizontal` | `──────────` | Default — between stacked content (list items, sections) |
| `vertical` | `│` | Between items in one row (toolbar actions, inline metadata); the row sets its height |

#### 4.2 `emphasis`

| Value | Pick it when |
|---|---|
| `subtle` | Many dividers close together (long lists, dense tables) where a lighter line keeps the page calm |
| `default` | Default — most lists, menus and card sections |
| `strong` | Separating larger sections on the same surface, where the boundary must stand out more |

#### 4.3 `inset`

| Value | Looks like | Pick it when |
|---|---|---|
| `none` | `├──────────┤` | Default — the line runs the full length of the parent |
| `start` | `├   ───────┤` | The line starts after the leading space, so it lines up with the content (horizontal only) |
| `both` | `├  ──────  ┤` | The line stops short at both ends, inside a padded surface or toolbar |

The inset is one fixed space (`spacing-xl`). Known follow-up: the List plan (Day 8) will add its own inset that lines up with list text after a leading icon or avatar; nothing changes in Divider until then.

#### 4.4 `decorative`

On when the divider only repeats structure that is already clear from headings, lists or groups, so screen readers skip it. Off (default) when it marks a real break between two parts of the content. See A8 for where this applies.

#### 4.5 `showLabel` and `label`

| Option | Values | Default | Pick it when |
|---|---|---|---|
| `showLabel` | on · off | off | On to show `label` in the middle of a horizontal divider |
| `label` | short text | — | The words shown when `showLabel` is on (“or” / “أو”); see A6 |

The label sits in the centre of the line with an equal gap on each side, in a small muted text style. It is for horizontal dividers only: on a vertical divider the label is never shown and the divider stays a plain line.

#### 4.6 `component`

Which element a divider is when it sits directly inside a list (`hr` by default, `li` inside a list). See A8 for where this applies.

**Combination rules**
- `inset="start"` is for horizontal dividers only; a vertical divider uses `none` or `both`
- `showLabel` is for horizontal dividers only; on a vertical divider it is ignored
- One emphasis per group: do not mix `subtle` and `strong` dividers in the same list
- Never stack two dividers, or a divider next to a component's own border

### A5 States and behavior

A divider has no interactive states. It is never hovered, focused, pressed, selected or disabled, and it never animates. When its parent is disabled, the divider stays the same.

| State | When it happens | What the user sees |
|---|---|---|
| Default | Always | A thin line in the `emphasis` colour |

**Behavior rules**
- Length: horizontal fills the parent's width; vertical fills the height of the row it sits in
- Spacing around the divider comes from the parent's gap or padding, never from the divider itself
- Arabic: the line mirrors with the layout, so `inset="start"` leaves its space on the right
- Long Arabic content around it does not change the divider; it only follows the parent's size
- Label: centred on the line with `spacing-md` on each side; the two line segments share the rest of the length equally and are never shorter than `spacing-xl`. A label that does not fit wraps onto more lines and stays centred; it is never cut off
- Label in Arabic: the label stays centred, so the layout looks the same in both directions; only `inset="start"` moves to the right

### A6 Content

The only text on a divider is the optional label: one or two connecting words between two alternatives. Write it in lower case (sentence case for a single word), with no punctuation. When a group needs a name, put a heading or a list subheader above the group instead of writing on the line.

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| or (label between two sign-in options) | أو | “OR”, “Or:”, “— or —” |
| or continue with (label above social sign-in buttons) | أو تابع باستخدام | A full sentence or instructions on the line |
| Account settings (heading above the group) | إعدادات الحساب | A divider with “Account” written on it |
| Notifications (list subheader) | الإشعارات | A divider with no heading where the group needs a name |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Use dividers to make an existing grouping easier to scan | Use a divider as the only sign that two groups are different |
| Use spacing first and add a divider only when spacing is not enough | Put a divider between every block on a page |
| Keep one emphasis per list or menu | Mix subtle and strong dividers in the same list |
| Use `inset="start"` so the line lines up with list text after a leading icon | Run inset lines in one list and full-width lines in the next row of the same list |
| Let the parent's gap set the space around the divider | Add margins to the divider to push content apart |
| Keep the label to one or two connecting words (“or”) | Use the label as a section title or put a sentence on the line |

### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Available | ✓ |
| Typical places | Lists and settings pages, side sheets, navigation rail groups, toolbars (vertical) |
| Interaction | None — dividers are not interactive |
| Screen readers | The line is never announced (`decorative` is not needed on this platform); a label is read as plain text |
| Not supported | A label on a vertical divider; thicker lines; the `decorative` and `component` options (web only — the line is always decorative and needs no list element) |

### A9 Accessibility (design)

- A divider is never the only signal of structure: headings, list grouping and spacing carry the meaning, so people who cannot see the line lose nothing
- The line is decorative for contrast purposes; it is not a control boundary and does not need 3:1 (`2-foundations/guidelines/border.md`)
- Dividers are never focusable and never interactive
- A divider that marks a real break may be announced as a separator where the platform supports it (A8); one that only repeats existing structure is hidden from screen readers
- The label is text, so it meets 4.5:1 on every surface (`color-text-subtlest`) and is read by screen readers where the platform reads it (A8); it never holds information that is not clear from the content around it

### A10 Related components

- [Button group](../button-group/button-group.md#a--guidelines) — separates actions with its gap, no divider needed
- List, Menu, Card, Side sheet, Action bar (later days) — use Divider between their items or sections
- Spacing (foundations) — the first tool for separating content; a divider is added only when spacing is not enough

---

## B · Spec

> The contract for Tablet. Facts identical on every platform link to the [Web spec](../../../3-web-components/components/divider/divider.md#b--spec).

### B1 API

#### `BwDivider`

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

### B2 Dimensions

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

### B3 Tokens by part and state

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
| `label` | colour | `color-text-subtlest` → `context.bw.colors.textSubtlest` (4.5:1 on every surface, pairs already in `contrast-pairs.json`) |
| `label` | gap to each segment | `spacing-md` → `BwSpacing.md` |
| `line` (with label) | minimum segment length | `spacing-xl` → `BwSpacing.xl` |

The label does not change with `emphasis`; the segments use the `emphasis` colour above.

### B4 States and transitions

As [Web B4](../../../3-web-components/components/divider/divider.md#b4-states-and-transitions) — none.

### B5 RTL

As [Web B5](../../../3-web-components/components/divider/divider.md#b5-rtl). Flutter: `Divider.indent` is the leading edge and follows `Directionality`, so `inset: start` leaves its space on the right in Arabic with no extra code. Never wrap the line in a physical `EdgeInsets.only(left/right)`. With a label, the row, its inset `Padding` and the label gap use `EdgeInsetsDirectional`; the label stays centred, so the layout looks the same in both directions.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | None — `Divider` / `VerticalDivider` add no semantics node; the line is never announced |
| Label | A plain `Text`: one semantics node whose label is the `label` text, read in reading order; no extra `Semantics` wrapper, no header or button role |
| Focus | Never focusable |
| Contrast | Line decorative — exempt (A9). Label text 4.5:1 (B3) |
| Target size | Not interactive |

### B7 Examples

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

### B8 Figma

[Part D](#d--figma-build).

### B9 Tests

- [ ] Renders horizontal and vertical × `subtle` · `defaultEmphasis` · `strong` × `none` · `start` · `both` (valid combinations) in light + dark × en + ar (`pumpBw`)
- [ ] The rendered `Divider` / `VerticalDivider` has `thickness` and `height` / `width` = `BwBorder.widthDefault` and `color` = the B3 `context.bw.colors.*` value for each emphasis, in both themes
- [ ] Inset: `indent` / `endIndent` = `BwSpacing.xl` per B2; `none` → `BwSpacing.none`
- [ ] RTL: with `inset: start`, the line's leading gap is on the right in `ar` and on the left in `en` (`tester.getTopLeft` / `getTopRight` of the painted line vs the parent)
- [ ] Vertical divider fills the height of a bounded row
- [ ] `orientation: vertical` + `inset: start` throws the B1 assertion in debug
- [ ] Semantics: the divider adds no node (`tester.getSemantics` / `SemanticsTester` finds nothing for it)
- [ ] Label: `showLabel: true` + `label: 'or'` (en) / `'أو'` (ar) renders one centred `Text` between two segments; text style = `context.bw.text.captionMd`, colour = `context.bw.colors.textSubtlest`, gap = `BwSpacing.md` on each side, each segment ≥ `BwSpacing.xl` and coloured per `emphasis`, light + dark; with `inset` the space is at the outer ends
- [ ] Label RTL: in `ar` the label is centred and the gaps are equal on both sides (`tester.getRect`)
- [ ] Long label in a narrow parent wraps, stays centred, is never ellipsised, and both segments stay `BwSpacing.xl` long; no overflow error
- [ ] `showLabel: false` with a `label` renders only the line and no `Text`
- [ ] Label semantics: `find.bySemanticsLabel('or')` finds exactly one node; the segments add none
- [ ] `orientation: vertical` + `showLabel: true` and `showLabel: true` with an empty `label` throw the B1 assertions in debug
- [ ] Goldens: emphasis × orientation × inset, light + dark, en + ar, plus a labelled horizontal divider (en “or”, ar “أو”) in both themes
- [ ] Source contains no raw colours or sizes, no primitives (`BwPalette`), no `Icons.`

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `divider-contract.md`.

| Field | Value |
|---|---|
| Component | Divider |
| Platform | Tablet (Flutter + M3) |
| Depends on | — (no Biowave component inside; tests use `test/helpers/bw_test_app.dart` `pumpBw`) |
| Plan version | 1.1 · 2026-10-23 |

### C1 Goal

`BwDivider` from `package:biowave_tablet/biowave_tablet.dart` renders a token-styled horizontal or vertical line with the B1 options — including an optional centred label on horizontal dividers — directional insets that mirror in Arabic, and no semantics node for the line.

### C2 Scope

**In scope:** B1–B9; enums `BwDividerOrientation`, `BwDividerEmphasis`, `BwDividerInset` in `lib/src/components/divider/bw_divider.dart`; export from the package entry file.

**Out of scope:** icons on the divider; a label on vertical dividers; label alignments other than centre; extra thicknesses; a list-text-aligned inset (the List plan decides, Day 8); a `DividerTheme` override in the package theme; any change to other components or the test helpers.

### C3 Approach

- `BwDivider` is a `StatelessWidget`. Resolve colour from `context.bw.colors` per `emphasis` and inset from `BwSpacing` per `inset`, then build `Divider(height:, thickness:, indent:, endIndent:, color:)` or `VerticalDivider(width:, thickness:, indent:, endIndent:, color:)` with the B2 values. Always pass every value explicitly so the M3 defaults (16 dp height, `DividerTheme`) never apply.
- Label (horizontal, `showLabel` and a non-empty `label` only): `LayoutBuilder` → `Padding(EdgeInsetsDirectional.only(start:, end:))` with the B2 inset → `Row(crossAxisAlignment: CrossAxisAlignment.center)` of `Expanded(segment)`, the label, `Expanded(segment)`. Label = `ConstrainedBox(maxWidth: max(0, maxWidth − 2 × BwSpacing.xl))` → `Padding(EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md))` → `Text(label, style: context.bw.text.captionMd.copyWith(color: context.bw.colors.textSubtlest), textAlign: TextAlign.center, softWrap: true)`. Segment = `Divider` with every value passed explicitly (B2). Never `Padding` with physical `EdgeInsets`.
- Invalid combinations: `assert` with the B1 messages; then use `BwDividerInset.none` / render without the label.
- Gotchas: `VerticalDivider` takes its height from the parent's constraints — document in the dartdoc that the row must bound its height (B2). `Divider.indent` is directional; do not add `Padding` with physical insets.

### C4 Token gaps

None — `color-border-subtle`, `color-border-default`, `color-border-strong`, `border-width-default`, `spacing-xl`, `spacing-md`, `spacing-none`, `color-text-subtlest` and the `caption-md` text style exist.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/divider/bw_divider.dart   new: BwDivider, BwDividerOrientation, BwDividerEmphasis, BwDividerInset
4-tablet-components/lib/biowave_tablet.dart                      change: export divider/bw_divider.dart
4-tablet-components/test/divider_test.dart                       new
4-tablet-components/test/goldens/divider/                        new (generated goldens)
4-tablet-components/README.md                                    change: Code status
4-tablet-components/components/divider/divider.md                change: C8 only
CHANGELOG.md                                           change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Every test pumps through `pumpBw` from `test/helpers/bw_test_app.dart` (theme × locale); no own `MaterialApp`

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts + fallbacks, label only on horizontal)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no primitives, no reliance on `DividerTheme` defaults
- [ ] AC-3 RTL per B5 (directional indent and `EdgeInsetsDirectional` only); semantics per B6 (line no node, label one text node)
- [ ] AC-4 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check`, `npm run sync` pass
- [ ] AC-5 Exported from the package entry file; README row and header Code `Built`; C8 and `CHANGELOG.md` filled

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> **One file per platform (D-12).** Structure, layers and properties are the same as [Web D2–D7](../../../3-web-components/components/divider/divider.md#d--figma-build); this file lists only what differs.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) — never the Foundations file |
| Page / section | `↳ Divider` › sections `Divider` and `Divider — Documentation` |
| Mode | Create new |
| Plan version | 1.1 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/divider/divider.md#d1-rules-for-this-build) (no component tokens; bind to Foundations variables), except the label text style: `Tablet/{en|ar}/caption/md` instead of the Web styles. The page sets the Typography variable mode to `Tablet`.

### D2 Component structure

As Web D2.

### D3 Layer tree and auto layout

As Web D3, including the `label` layer and the second `line` bound to `Show label`; the `label` text style is `Tablet/{en|ar}/caption/md` (default `Tablet/en/caption/md`).

### D4 Properties

As Web D4 (including `Show label` → `showLabel` and `Label` → `label`); code mapping uses the Flutter names in B1 (`Emphasis=Default` → `BwDividerEmphasis.defaultEmphasis`).

### D5 Variants to generate

As Web D5 — **18** variants (the label is a property, not a variant).

### D6 States, interactions and motion

None.

### D7 RTL

As Web D7.

### D8 Documentation pages

As Web D8; 07 Platform uses `Doc/Device frame` Tablet landscape + Tablet portrait with a settings list and a toolbar. Labelled samples use `Tablet/en/caption/md` (“or”) and `Tablet/ar/caption/md` (“أو”).

Component description: “Thin line that separates groups of content, with an optional centred label. Spec: 4-tablet-components/components/divider/divider.md”.

### D9 Code Connect

`4-tablet-components/lib/src/components/divider/bw_divider.figma.dart` — `Orientation` → `orientation: BwDividerOrientation.*`, `Emphasis` → `emphasis: BwDividerEmphasis.*`, `Inset` → `inset: BwDividerInset.*`, `Show label` → `showLabel`, `Label` → `label`; `Direction` not mapped. Publish after code and Figma are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Divider` in the Tablet file as Web D2–D3
- [ ] F-AC-2 Properties as Web D4 (with `Show label` and `Label`); 18 variants, no Vertical · Start
- [ ] F-AC-3 Zero raw values; bound to Foundations variables; label uses `Tablet/{en|ar}/caption/md`; token lint 0
- [ ] F-AC-4 Light / Dark by variable mode only; RTL per Web D7
- [ ] F-AC-5 Docs from the Doc Kit (or reported blocked); Components List card; Code Connect after approval

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

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

1.1 — a horizontal divider can show a short centred label (“or” / “أو”) with `showLabel` + `label`: `caption-md`, `color-text-subtlest`, `spacing-md` gap on each side, line segments at least `spacing-xl` long; never on vertical dividers. The label is read as plain text; the line is still never announced. Inset `start` stays `spacing-xl` (the List plan, Day 8, adds its own text-aligned inset). Figma: new `Show label` (BOOLEAN) and `Label` (TEXT) properties; still 18 variants. No breaking change — existing dividers look and behave the same.

1.0 — initial version; no previous version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-22 | Initial: orientation, emphasis, inset, decorative | — | Claude (Planner) |
| 1.1 | 2026-10-23 | Optional centred label on horizontal dividers (A1–A9, new A4.5); web-only `component` option (A4.6, A8); inset follow-up note for List (A4.3) | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-22 | Initial | No | — |
| 1.1 | 2026-10-23 | New params `showLabel`, `label`; new assert for vertical + label and for an empty label (B1); label layout and tokens (B2–B3), RTL (B5), semantics (B6), tests (B9); Figma `Show label` + `Label` (D) | No | — (new options default off) |
