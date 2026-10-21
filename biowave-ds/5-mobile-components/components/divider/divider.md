# Divider · فاصل — Mobile

> **One file for Divider on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile divider`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Divider · فاصل |
| Summary | A thin line that separates groups of content so a list, card or toolbar is quicker to scan. |
| Summary (ar) | خط رفيع يفصل بين مجموعات المحتوى لتسهيل قراءة القائمة أو البطاقة أو شريط الأدوات. |
| Parts | Container · line |
| Parts (ar) | الحاوية · الخط |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `Divider` (horizontal) and `VerticalDivider` (vertical), styled only from Biowave tokens |
| Import | `BwDivider` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Divider` · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-22 |
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

A divider is a thin line that separates groups of content inside a surface — list items, sections of a card or settings page, or actions in a toolbar. It makes the structure quicker to scan without adding a new surface. It never carries meaning of its own: headings, grouping and spacing still say what belongs together, and the divider only makes the boundary easier to see.

### A2 Anatomy

```
Horizontal (inset none)                      Horizontal (inset start)
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│①────────────────────────────────────②│     │①       ──────────────────────────────②│
└──────────────────────────────────────┘     └──────────────────────────────────────┘
                                                ├─────┤ spacing-xl

Vertical (in a toolbar row)
┌──────────────────────────────┐
│ [◆]  [◆]  │②  [◆]  [◆]       │   ① container · ② line
└──────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Takes the full length the parent gives it (inline size when horizontal, block size when vertical) and holds the inset space at its ends |
| 2 | `line` | Yes | The visible rule, one border width thick, coloured by `emphasis` |

### A3 Usage

**When to use**
- Between items in a list or menu when spacing alone does not separate them clearly
- Between sections of one surface (card, side sheet, settings page) that share the same background
- Between groups of actions in a toolbar or action bar (vertical)

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| Separating whole areas of a page | Spacing between sections (`2-foundations/guidelines/spacing.md`) or separate surfaces (Card) |
| Separating buttons in a footer or dialog | [Button group](../button-group/button-group.md#a--guidelines) — its gap already separates them |
| Naming a group (“or”, “Account”) | A heading or list subheader above the group; dividers with text are not part of 1.0 |
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

#### 4.4 `decorative`

On when the divider only repeats structure that is already clear from headings, lists or groups, so screen readers skip it. Off (default) when it marks a real break between two parts of the content. See A8 for where this applies.

**Combination rules**
- `inset="start"` is for horizontal dividers only; a vertical divider uses `none` or `both`
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

### A6 Content

Dividers have no text. When a group needs a name, put a heading or a list subheader above the group instead of writing on the line.

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
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

### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Available | ✓ |
| Typical places | Lists, bottom sheets and settings pages (mostly horizontal); vertical only in compact toolbars |
| Interaction | None — dividers are not interactive |
| Screen readers | Never announced (`decorative` is not needed on this platform) |
| Not supported | Text on the divider (“or”); thicker lines; the `decorative` option (always decorative) |

### A9 Accessibility (design)

- A divider is never the only signal of structure: headings, list grouping and spacing carry the meaning, so people who cannot see the line lose nothing
- The line is decorative for contrast purposes; it is not a control boundary and does not need 3:1 (`2-foundations/guidelines/border.md`)
- Dividers are never focusable and never interactive
- A divider that marks a real break may be announced as a separator where the platform supports it (A8); one that only repeats existing structure is hidden from screen readers

### A10 Related components

- [Button group](../button-group/button-group.md#a--guidelines) — separates actions with its gap, no divider needed
- List, Menu, Card, Side sheet, Action bar (later days) — use Divider between their items or sections
- Spacing (foundations) — the first tool for separating content; a divider is added only when spacing is not enough

---

## B · Spec

> The contract for Mobile. Facts identical on every platform link to the [Web spec](../../../3-web-components/components/divider/divider.md#b--spec).

### B1 API

#### `BwDivider`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | `BwDividerOrientation` | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | `BwDividerEmphasis` | `subtle` · `defaultEmphasis` · `strong` | `defaultEmphasis` | | A4.2 — line colour (B3) |
| `inset` | `BwDividerInset` | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `key` | `Key?` | | | | |

Platform naming: web `emphasis="default"` = `BwDividerEmphasis.defaultEmphasis` (`default` is reserved in Dart, as Icon's `defaultColor`). Web `decorative` has no Flutter param: M3 `Divider` / `VerticalDivider` add no semantics node, so `BwDivider` is never announced (A8, B6).

**Invalid combinations** (`assert` in debug; release renders the fallback):

| Combination | Fallback |
|---|---|
| `orientation: vertical` with `inset: start` | Renders `inset: none`; assert message “inset start is for horizontal dividers only” |

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

Layout rules: the divider adds no space around itself — the parent's gap (`spacing:` / `SizedBox` with `BwSpacing.*`) does.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/divider/divider.md#b3-tokens-by-part-and-state) (no component tokens). Flutter mapping:

| `emphasis` | `line` colour → Flutter |
|---|---|
| `subtle` | `color-border-subtle` → `context.bw.colors.borderSubtle` |
| `defaultEmphasis` | `color-border-default` → `context.bw.colors.borderDefault` |
| `strong` | `color-border-strong` → `context.bw.colors.borderStrong` |

Width `border-width-default` → `BwBorder.widthDefault`; inset `spacing-xl` → `BwSpacing.xl`, `spacing-none` → `BwSpacing.none`. Colours are passed explicitly — never read from `DividerTheme` or `ThemeData.dividerColor`. Dark theme: same tokens.

### B4 States and transitions

As [Web B4](../../../3-web-components/components/divider/divider.md#b4-states-and-transitions) — none.

### B5 RTL

As [Web B5](../../../3-web-components/components/divider/divider.md#b5-rtl). Flutter: `Divider.indent` is the leading edge and follows `Directionality`, so `inset: start` leaves its space on the right in Arabic with no extra code. Never wrap the line in a physical `EdgeInsets.only(left/right)`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | None — `Divider` / `VerticalDivider` add no semantics node; the divider is never announced |
| Focus | Never focusable |
| Contrast | Decorative — exempt (A9) |
| Target size | Not interactive |

### B7 Examples

```dart
const BwDivider();
const BwDivider(inset: BwDividerInset.start, emphasis: BwDividerEmphasis.subtle);

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
- [ ] Goldens: emphasis × orientation × inset, light + dark, en + ar
- [ ] Source contains no raw colours or sizes, no primitives (`BwPalette`), no `Icons.`

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `divider-contract.md`.

| Field | Value |
|---|---|
| Component | Divider |
| Platform | Mobile (Flutter + M3) |
| Depends on | — (no Biowave component inside; tests use `test/helpers/bw_test_app.dart` `pumpBw`) |
| Plan version | 1 · 2026-10-22 |

### C1 Goal

`BwDivider` from `package:biowave_mobile/biowave_mobile.dart` renders a token-styled horizontal or vertical line with the B1 options, directional insets that mirror in Arabic, and no semantics node.

### C2 Scope

**In scope:** B1–B9; enums `BwDividerOrientation`, `BwDividerEmphasis`, `BwDividerInset` in `lib/src/components/divider/bw_divider.dart`; export from the package entry file.

**Out of scope:** text or icons on the divider; extra thicknesses; a `DividerTheme` override in the package theme; any change to other components or the test helpers.

### C3 Approach

- `BwDivider` is a `StatelessWidget`. Resolve colour from `context.bw.colors` per `emphasis` and inset from `BwSpacing` per `inset`, then build `Divider(height:, thickness:, indent:, endIndent:, color:)` or `VerticalDivider(width:, thickness:, indent:, endIndent:, color:)` with the B2 values. Always pass every value explicitly so the M3 defaults (16 dp height, `DividerTheme`) never apply.
- Invalid combination: `assert` with the B1 message; then use `BwDividerInset.none`.
- Gotchas: `VerticalDivider` takes its height from the parent's constraints — document in the dartdoc that the row must bound its height (B2). `Divider.indent` is directional; do not add `Padding` with physical insets.

### C4 Token gaps

None — `color-border-subtle`, `color-border-default`, `color-border-strong`, `border-width-default`, `spacing-xl` and `spacing-none` exist.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/divider/bw_divider.dart   new: BwDivider, BwDividerOrientation, BwDividerEmphasis, BwDividerInset
5-mobile-components/lib/biowave_mobile.dart                      change: export divider/bw_divider.dart
5-mobile-components/test/divider_test.dart                       new
5-mobile-components/test/goldens/divider/                        new (generated goldens)
5-mobile-components/README.md                                    change: Code status
5-mobile-components/components/divider/divider.md                change: C8 only
CHANGELOG.md                                           change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Every test pumps through `pumpBw` from `test/helpers/bw_test_app.dart` (theme × locale); no own `MaterialApp`

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, assert + fallback)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no primitives, no reliance on `DividerTheme` defaults
- [ ] AC-3 RTL per B5 (directional indent only); semantics per B6
- [ ] AC-4 Tests in B9 and C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test`, `npm run docs:check`, `npm run sync` pass
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
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Divider` › sections `Divider` and `Divider — Documentation` |
| Mode | Create new |
| Plan version | 1 · 2026-10-22 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/divider/divider.md#d1-rules-for-this-build) (no component tokens; bind to Foundations variables). The page sets the Typography variable mode to `Mobile` (no text in the set; doc pages use it).

### D2 Component structure

As Web D2.

### D3 Layer tree and auto layout

As Web D3.

### D4 Properties

As Web D4; code mapping uses the Flutter names in B1 (`Emphasis=Default` → `BwDividerEmphasis.defaultEmphasis`).

### D5 Variants to generate

As Web D5 — **18** variants.

### D6 States, interactions and motion

None.

### D7 RTL

As Web D7.

### D8 Documentation pages

As Web D8; 07 Platform uses `Doc/Device frame` Phone with a list and a bottom sheet.

Component description: “Thin line that separates groups of content. Spec: 5-mobile-components/components/divider/divider.md”.

### D9 Code Connect

`5-mobile-components/lib/src/components/divider/bw_divider.figma.dart` — `Orientation` → `orientation: BwDividerOrientation.*`, `Emphasis` → `emphasis: BwDividerEmphasis.*`, `Inset` → `inset: BwDividerInset.*`; `Direction` not mapped. Publish after code and Figma are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Divider` in the Mobile file as Web D2–D3
- [ ] F-AC-2 Properties as Web D4; 18 variants, no Vertical · Start
- [ ] F-AC-3 Zero raw values; bound to Foundations variables; token lint 0
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

1.0 — initial version; no previous version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-22 | Initial: orientation, emphasis, inset, decorative | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-22 | Initial | No | — |
