# Icon · أيقونة — Mobile

> **One file for Icon on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile icon`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Icon · أيقونة |
| Summary | Shows a Google Material Symbols glyph that helps people recognise an action, object or status. |
| Summary (ar) | تعرض رمزًا من Google Material Symbols يساعد على التعرّف على إجراء أو عنصر أو حالة. |
| Parts | Container · glyph |
| Parts (ar) | الحاوية · الرمز |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Flutter `Icon` with `Symbols.*_rounded` from `material_symbols_icons` (re-exported by `biowave_foundations`, D-18) |
| Import | `BwIcon` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Icon` (page Typography mode `Mobile`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-18 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/icon/` — not built yet (the Executor creates it) |
| Tokens | [`icon.tokens.json`](icon.tokens.json) — extends the Web file (D-13) |
| Contracts | [`icon-contract.md`](icon-contract.md) · [`figma-icon-contract.md`](figma-icon-contract.md) — generated, never edited |
| Docs page | [`icon.html`](icon.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

An icon is a small Google Material Symbols glyph (Rounded style, decision D-18) that helps people recognise an action, object or status faster. It supports text — it rarely replaces it. Every Biowave component that shows an icon uses this one component, so size, colour, fill and right-to-left behaviour are the same everywhere.

### A2 Anatomy

```
 ┌──────────┐
 │ ②  ◆     │ ①   ① container — square box sized by `size-icon-*`
 │          │     ② glyph — Material Symbols Rounded, fills the box
 └──────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square box that sets the size and colour; reserves space so layouts never jump while the font loads |
| 2 | `glyph` | Yes | The Material Symbols Rounded glyph named by `name`; outlined (fill 0) by default, filled (fill 1) for selected states |

### A3 Usage

**When to use**
- Next to a label to make an action or object quicker to find (Add device, Clock in)
- Inside components that have an icon slot: Button, Icon button, Text field, Chip, List, Tabs, Navigation
- For status together with text or a colour that is not the only signal (success, warning, error)

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| A clickable icon on its own | [Icon button](../icon-button/icon-button.md#a--guidelines) — it adds the target size, name and focus ring |
| A person, team or device picture | Avatar |
| A count or notification dot | Badge |
| A brand logo, illustration or biometric drawing | Logo / illustration assets (`2-foundations/guidelines/logos.md`, `illustration.md`) |
| A glyph that is not in Material Symbols | Ask the Planner: custom icons follow `icons.md` › Rules and are added to the icon library first |

### A4 Options

#### 4.1 `name`

The Material Symbols name in snake_case (`add`, `visibility_off`, `push_pin`). Search the Google · Material Symbols library; use the same name in Figma, web and Flutter. Never mix in the older Material Icons set.

#### 4.2 `size`

| Value | Pick it when |
|---|---|
| `xs` | Inside dense data (table status cells, chips at `sm`) |
| `sm` | Inside `sm` controls and caption text |
| `md` | Default inline icon on web; inside `md` controls |
| `lg` | Default inline icon on tablet and mobile; inside `lg` controls |
| `xl` | Empty states in small panels, list leading icons on touch |
| `2xl` · `3xl` | Empty states and feature tiles only |
| none | Inside a Biowave component: the component sets the size |

#### 4.3 `filled`

| Value | Looks like | Pick it when |
|---|---|---|
| off | Outlined glyph | Default |
| on | Solid glyph | The selected or active state of a toggle, tab or navigation item — never as decoration |

#### 4.4 `color`

| Value | Pick it when |
|---|---|
| none (inherit) | Inside a component, or next to text — the icon takes the text colour |
| `default` · `subtle` · `muted` | Standalone neutral icons, by emphasis (next to disabled text, leave `color` unset — the icon inherits the disabled colour) |
| `inverse` | On dark or brand surfaces |
| `brand` · `secondary` | Emphasis that matches a brand or teal action |
| `success` · `warning` · `error` · `info` | Status — always with text or a label |

#### 4.5 `directional`

On for icons that show direction or progress (`arrow_forward`, `chevron_right`, `undo`, `send`, `logout`): they mirror in Arabic. Off for everything else — never mirror checkmarks, clocks, search, media controls or logos (`icons.md` › RTL).

#### 4.6 `label`

Give a label only when the icon carries meaning on its own (a status with no text next to it). Decorative icons next to text have no label and are hidden from assistive technology.

**Combination rules**
- `filled` is a state, not a style: do not use filled icons for plain decoration
- A `label` and visible text with the same meaning must not both be read — drop the label
- A status colour (`success` … `info`) always comes with text or a `label`

### A5 States and behavior

An icon has no interactive states of its own. It follows its parent: colour and fill change when the parent's state changes (hover, selected, disabled). It never animates on its own; components animate the parent.

**Behavior rules**
- The container keeps its size before the icon font loads, so text never shifts
- An unknown `name` renders an empty box of the right size and warns in development
- Icons scale with the size token, not with the user's text size, unless the parent sizes them in text units

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| `label` | Says the meaning, not the shape: “Overdue”, not “Red clock” | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Overdue | متأخر | Warning icon |
| Synced | تمت المزامنة | Check |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Pair icons with text in buttons and lists | Use an icon alone where the meaning is not obvious |
| Use one icon for one meaning across the product | Use the same icon for two different actions |
| Use `filled` only for the selected state | Fill icons to make them look bolder |
| Mirror arrows and chevrons in Arabic with `directional` | Mirror logos, checkmarks, clocks or search |
| Take icons from Google · Material Symbols (Rounded) | Mix in Material Icons, other icon sets or drawn copies |

### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Available | ✓ |
| Default size | `lg` (24) inline; components set their own |
| Source | `material_symbols_icons` (`Symbols.*_rounded`), re-exported by `biowave_foundations` |
| Interaction | None — icons are not interactive |
| RTL | Directional glyphs are mirrored by the icon package when `directional` is on |

### A9 Accessibility (design)

- Decorative icons (next to text) are hidden from screen readers
- Meaningful icons without text have a `label` in English and Arabic
- Meaningful icons meet 3:1 contrast against their background (`icons.md` › Color)
- Status never relies on colour or icon alone — text or label says it
- Interactive icons are always an Icon button, never a bare icon with a click handler

### A10 Related components

- Icon button — a clickable icon with a name, target and focus ring
- Button, Text field, Split button, Button group — use Icon in their icon slots
- Badge, Avatar — for counts and pictures, not icons

---

## B · Spec

> The contract for Mobile. Facts identical on every platform link to the [Web spec](../../../3-web-components/components/icon/icon.md#b--spec).

### B1 API

#### `BwIcon`

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

### B2 Dimensions

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

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/icon/icon.md#b3-tokens-by-part-and-state). Flutter mapping:

| Colour | Token → Flutter |
|---|---|
| `BwIconColor.defaultColor` | `color-icon-neutral-default` → `context.bw.colors.iconNeutralDefault` |
| `BwIconColor.subtle` | `color-icon-neutral-subtle` → `context.bw.colors.iconNeutralSubtle` |
| `BwIconColor.muted` | `color-icon-neutral-muted` → `context.bw.colors.iconNeutralMuted` |
| `BwIconColor.inverse` | `color-icon-neutral-inverse` → `context.bw.colors.iconNeutralInverse` |
| `BwIconColor.brand` | `color-icon-role-brand` → `context.bw.colors.iconRoleBrand` |
| `BwIconColor.secondary` | `color-icon-role-secondary` → `context.bw.colors.iconRoleSecondary` |
| `BwIconColor.success` | `color-icon-role-success` → `context.bw.colors.iconRoleSuccess` |
| `BwIconColor.error` | `color-icon-role-error` → `context.bw.colors.iconRoleError` |
| `BwIconColor.warning` | `color-icon-role-warning` → `context.bw.colors.iconRoleWarning` |
| `BwIconColor.info` | `color-icon-role-info` → `context.bw.colors.iconRoleInfo` |

### B4 States and transitions

As [Web B4](../../../3-web-components/components/icon/icon.md#b4-states-and-transitions).

### B5 RTL

As [Web B5](../../../3-web-components/components/icon/icon.md#b5-rtl); Flutter: `directional` flips with `Transform.flip(flipX: Directionality.of(context) == TextDirection.rtl)`. Inside `BwButton` / `BwIconButton`, the component passes `directional` through — no second flip.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Decorative | `ExcludeSemantics` |
| Meaningful | `Semantics(label: semanticLabel, image: true)` |
| Contrast | As Web B6 |
| Focus | Never focusable |

### B7 Examples

```dart
BwButton(label: 'Add device', leadingIcon: Symbols.add_rounded, onPressed: add);   // Button renders BwIcon
BwIcon(icon: Symbols.arrow_forward_rounded, directional: true);
BwIcon(icon: Symbols.push_pin_rounded, filled: pinned);
BwIcon(icon: Symbols.schedule_rounded, size: BwIconSize.md, color: BwIconColor.warning, semanticLabel: 'متأخر');
```

### B8 Figma

[Part D](#d--figma-build).

### B9 Tests

- [ ] Every size renders a box of the token size (`tester.getSize`) in light + dark × en + ar
- [ ] `size: null` follows `IconTheme`; `filled` sets fill 1; colours per B3
- [ ] `directional` flips in RTL only; no double flip inside `BwButton` / `BwIconButton`
- [ ] Semantics: decorative excluded; labelled `image` node with the label
- [ ] Goldens: size scale, colours, filled vs outlined, RTL arrow
- [ ] No `Icons.` usage and no raw sizes/colours in the source

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `icon-contract.md`.

| Field | Value |
|---|---|
| Component | Icon |
| Platform | Mobile (Flutter + M3) |
| Plan version | 1 · 2026-10-18 |

### C1 Goal

`BwIcon` from `package:biowave_mobile/biowave_mobile.dart` renders Material Symbols Rounded glyphs with Biowave sizes, colours, fill and RTL, and the package's later components use it for every icon.

### C2 Scope

**In scope:** B1–B9; `BwIconSize`, `BwIconColor` in `lib/src/components/icon/`; a source check test that fails on `Icons.` in `lib/`. This is the **first** component of the package (Day 1): Button, Icon button and Text field render their icons through `BwIcon`.

**Out of scope:** custom icon fonts; animated icons.

### C3 Approach

- `BwIcon` is a `StatelessWidget`: resolve size (`BwSize.icon*` or `IconTheme`), colour (`context.bw.colors.*` or `IconTheme`), then `Icon(icon, size:, opticalSize:, fill:, weight: BwIconAxes.weight, grade: BwIconAxes.grade, color:)` in a `SizedBox.square`.
- `directional`: `Transform.flip(flipX: isRtl)`; do not also set `matchTextDirection`.
- Semantics per B6.
- Gotchas: `Icon.fill`/`weight`/`grade`/`opticalSize` need the variable Symbols font — they come from `material_symbols_icons` via `biowave_foundations`; never import `package:flutter/material.dart` `Icons`.

### C4 Token gaps

None.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/icon/bw_icon.dart         new: BwIcon, BwIconSize, BwIconColor
5-mobile-components/lib/biowave_mobile.dart                                 change: export bw_icon.dart
5-mobile-components/test/icon_test.dart                            new
5-mobile-components/test/no_legacy_icons_test.dart                 new: fails on `Icons.` in lib/
5-mobile-components/test/goldens/icon/                             new
5-mobile-components/README.md · CHANGELOG.md                       change
```

### C6 Tests

Implement every item in B9.

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts)
- [ ] AC-2 Sizes and colours only from tokens; no raw values
- [ ] AC-3 RTL per B5; a11y per B6
- [ ] AC-4 `cd 5-mobile-components && flutter analyze && flutter test` pass
- [ ] AC-5 Exported; README row `Built`; no `Icons.` in `lib/`

---

### C8 Execution log

| Field | Value |
|---|---|
| Agent | Antigravity (Code Executor) |
| Date | 2026-10-23 |
| Files changed | `5-mobile-components/lib/src/components/icon/bw_icon.dart`, `5-mobile-components/lib/biowave_mobile.dart`, `5-mobile-components/test/icon_test.dart`, `5-mobile-components/test/no_legacy_icons_test.dart`, `5-mobile-components/test/goldens/icon/icon-light-en.png`, `5-mobile-components/test/goldens/icon/icon-light-ar.png`, `5-mobile-components/test/goldens/icon/icon-dark-en.png`, `5-mobile-components/test/goldens/icon/icon-dark-ar.png`, `5-mobile-components/components/icon/icon.md`, `5-mobile-components/README.md`, `CHANGELOG.md` |

**Built**
- Implemented `BwIcon`, `BwIconSize` (`xs` · `sm` · `md` · `lg` · `xl` · `xl2` · `xl3`), and `BwIconColor` (`defaultColor` · `subtle` · `muted` · `inverse` · `brand` · `secondary` · `success` · `warning` · `error` · `info`) in `5-mobile-components/lib/src/components/icon/bw_icon.dart`, and exported it from `5-mobile-components/lib/biowave_mobile.dart`.
- Resolved dimensions from `BwSize.icon*` (or `IconTheme.of(context).size` when `size` is `null`), colours from `context.bw.colors.*` (or `IconTheme.of(context).color` when `color` is `null`), variable font axes from `BwIconAxes` (`fill`, `fillSelected`, `weight`, `grade`, `opticalSize`), RTL mirroring via `Transform.flip(flipX: Directionality.of(context) == TextDirection.rtl)` when `directional` is `true`, debug assertion on standalone status colours without `semanticLabel`, and semantics (`ExcludeSemantics` when decorative, `Semantics(label: semanticLabel, image: true)` when labelled).
- Added unit, semantics, token-map, source-hygiene, and golden tests (`light`/`dark` × `en`/`ar`) in `5-mobile-components/test/icon_test.dart` and the D-18 legacy `Icons.` guard in `5-mobile-components/test/no_legacy_icons_test.dart`.

**Checks**
- `npm run docs:check` ✓
- `npm run component-tokens` ✓
- `npm run sync` ✓ (READY for component work)
- `cd 5-mobile-components && flutter analyze && flutter test` ✓ (0 issues, 92/92 tests passed)

**Deviations from the plan or spec**
- none

**Questions for the Planner**
- none

---

## D · Figma build

> **One file per platform (D-12).** Structure, layers and properties are the same as [Web D2–D4](../../../3-web-components/components/icon/icon.md#d--figma-build); this file lists only what differs.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Icon` |
| Mode | Create new |
| Plan version | 1 · 2026-10-18 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/icon/icon.md#d1-rules-for-this-build).

### D2 Component structure

As [Web D2](../../../3-web-components/components/icon/icon.md#d2-component-structure). Default `Size` = `LG`.

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/icon/icon.md#d3-layer-tree-and-auto-layout).

### D4 Properties

As [Web D4](../../../3-web-components/components/icon/icon.md#d4-properties); code mapping uses the Flutter names in B1.

**Icons used:** `add` · `arrow_forward` · `push_pin`

### D5 Variants to generate

7 (`Size`), default `LG`.

### D6 States, interactions and motion

None.

### D7 RTL

As Web D7.

### D8 Documentation pages

As Web D8; 07 Platform uses `Doc/Device frame` Mobile.

### D9 Code Connect

`5-mobile-components/lib/src/components/icon/bw_icon.figma.dart` — `Size` → `size: BwIconSize.*`, `Glyph` → `icon: Symbols.<glyph>_rounded`, `Fill` → `filled`, colour mode → `color: BwIconColor.*`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Icon` in the Mobile file as Web D2–D3; glyph is a Material Symbols Rounded instance
- [ ] F-AC-2 Properties as Web D4; 7 variants; default `LG`
- [ ] F-AC-3 Bound to `Icon / Size` / `Icon / Color`; token lint 0
- [ ] F-AC-4 Docs from the Doc Kit; Code Connect after approval

---

### D11 Execution log

| Field | Value |
|---|---|
| Agent / stages run | build · qa · document |
| Date | |
| Node IDs | |
| QA report | |

**Deviations**
- none

**Questions for the Planner**
- none

---

## E · Review

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed | not reviewed |

---

## F · Changelog

### F0 Changes from previous version

First version (1.0).

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-18 | Initial (D-18: Google Material Symbols Rounded) | Replace direct MUI `Icon` / `Symbols` use in components with Icon (C2) | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-18 | Initial | No | — |
