# Icon · أيقونة — Tablet

> **One file for Icon on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet icon`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Icon · أيقونة |
| Summary | Shows a Google Material Symbols glyph that helps people recognise an action, object or status. |
| Summary (ar) | تعرض رمزًا من Google Material Symbols يساعد على التعرّف على إجراء أو عنصر أو حالة. |
| Parts | Container · glyph |
| Parts (ar) | الحاوية · الرمز |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter `Icon` with `Symbols.*_rounded` from `material_symbols_icons` (re-exported by `biowave_foundations`, D-18) |
| Import | `BwIcon` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Icon` (page Typography mode `Tablet`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-18 |
| Plan | Finished |
| Code | Approved |
| Figma build | Planned |
| Review | Round 1 · 2026-10-20 · Approved |
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

### A8 Platform notes — Tablet

| | Tablet |
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

> The contract for Tablet. Facts identical on every platform link to the [Web spec](../../../3-web-components/components/icon/icon.md#b--spec).

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
| Platform | Tablet (Flutter + M3) |
| Plan version | 1 · 2026-10-18 |

### C1 Goal

`BwIcon` from `package:biowave_tablet/biowave_tablet.dart` renders Material Symbols Rounded glyphs with Biowave sizes, colours, fill and RTL, and the package's later components use it for every icon.

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
4-tablet-components/lib/src/components/icon/bw_icon.dart         new: BwIcon, BwIconSize, BwIconColor
4-tablet-components/lib/biowave_tablet.dart                                 change: export bw_icon.dart
4-tablet-components/test/icon_test.dart                            new
4-tablet-components/test/no_legacy_icons_test.dart                 new: fails on `Icons.` in lib/
4-tablet-components/test/goldens/icon/                             new
4-tablet-components/README.md · CHANGELOG.md                       change
```

### C6 Tests

Implement every item in B9.

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts)
- [ ] AC-2 Sizes and colours only from tokens; no raw values
- [ ] AC-3 RTL per B5; a11y per B6
- [ ] AC-4 `cd 4-tablet-components && flutter analyze && flutter test` pass
- [ ] AC-5 Exported; README row `Built`; no `Icons.` in `lib/`

---

### C8 Execution log

#### Entry 1 — 2026-10-20

| Field | Value |
|---|---|
| Agent | Antigravity (workflow implementer, retry 2 after Codex step 01) |
| Date | 2026-10-20 |
| Files changed | `lib/src/components/icon/bw_icon.dart`; `lib/biowave_tablet.dart`; `test/icon_test.dart`; `test/no_legacy_icons_test.dart`; `test/goldens/icon/{size_scale,colors,fill,rtl}.png`; `README.md`; `components/icon/icon.md`; root `CHANGELOG.md` |
| Checks | `cd 4-tablet-components && flutter analyze && flutter test` ✓ (0 analyzer issues; 64/64 tests passed across `icon_test.dart`, `no_legacy_icons_test.dart`, and `theme_test.dart`); `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✗ (2 pre-existing errors outside this unit: `tablet button-group` and `mobile button-group` Figma contracts are stale) |

**Deviations from the plan or spec**
- None.

**Questions for the Planner**
- `npm run docs:check` reports only the 2 known pre-existing stale Figma contracts (`tablet button-group` and `mobile button-group`); they are outside this unit and were left untouched per workflow rules.

#### Entry 2 — 2026-10-21 (Adoption in built components)

| Field | Value |
|---|---|
| Agent | Antigravity (workflow implementer — adoption in built components) |
| Date | 2026-10-21 |
| Files changed | `lib/src/components/button/bw_button.dart`; `test/button_test.dart`; `test/goldens/button/button-{dark,light}-{ar,en}.png`; `test/no_legacy_icons_test.dart`; `components/icon/icon.md`; root `CHANGELOG.md` |
| Checks | `cd 4-tablet-components && flutter analyze && flutter test` ✓ (0 analyzer issues; 131/131 tests passed); `npm run docs:check` ✗ (2 pre-existing errors outside this unit: `tablet button-group` and `mobile button-group` Figma contracts are stale) |

**What was built**
- Adopted `BwIcon` in `BwButton` (`lib/src/components/button/bw_button.dart`) for `leadingIcon` and `trailingIcon`:
  - Size follows `IconTheme` via `size: null` (`dimensions.iconSize` configured by `ButtonStyle.iconSize`).
  - Colour inherits from the button's foreground through `IconTheme`.
  - Keys preserved (`BwButton.leading-icon` and `BwButton.trailing-icon`).
  - Decorative semantics maintained (excluded from accessibility tree via `ExcludeSemantics` in `BwIcon`).
  - Directional icons flip once in RTL (`directional: icon.matchTextDirection`); inner `Icon` is isolated in LTR inside `BwIcon` so it never flips a second time (B9).
- Extended guard test `test/no_legacy_icons_test.dart`:
  - Prohibits Flutter `Icons.`, `CupertinoIcons.`, raw `IconData(` constructor, and raw `Icon(` widget outside `lib/src/components/icon/`.
  - Proven with planted probes for each pattern, verified failing, and reverted to clean state.
- Enhanced `test/button_test.dart` to assert `BwIcon` usage, directional mirroring, no double flip in RTL, and decorative semantics.
- Regenerated the 4 Button goldens (`test/goldens/button/button-{dark,light}-{ar,en}.png`): layout and dimensions are unchanged; ~0.02%-0.03% pixel diff caused by `BwIcon` activating `BwIconAxes` variable font variation axes (`weight: 400`, `grade: 0`, optical size matching icon dimensions) on `MaterialSymbolsRounded`.

**Deviations from the plan or spec**
- None.

**Questions for the Planner**
- None. `npm run docs:check` pre-existing failure (`tablet button-group` and `mobile button-group` Figma contracts stale) remains untouched per workflow rules.

---

## D · Figma build

> **One file per platform (D-12).** Structure, layers and properties are the same as [Web D2–D4](../../../3-web-components/components/icon/icon.md#d--figma-build); this file lists only what differs.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
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

As Web D8; 07 Platform uses `Doc/Device frame` Tablet.

### D9 Code Connect

`4-tablet-components/lib/src/components/icon/bw_icon.figma.dart` — `Size` → `size: BwIconSize.*`, `Glyph` → `icon: Symbols.<glyph>_rounded`, `Fill` → `filled`, colour mode → `color: BwIconColor.*`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Icon` in the Tablet file as Web D2–D3; glyph is a Material Symbols Rounded instance
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
| 1 | 2026-10-20 | Approved | not reviewed |

### E2 Round 1 — 2026-10-20

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-20 |
| Code reviewed | `git diff main...ds/icon-tablet` + working tree (clean for this unit) |
| Verdict | **Approved** — every AC met, D-18 holds in `lib/`; no 🔴 / 🟡; 3 🟢 nits |
| Evidence | Run by the Reviewer in the `ds/icon-tablet` worktree: `flutter analyze` ✅ no issues · `flutter test` ✅ 64/64 · `npm run docs:check` ❌ 2 errors, both stale **tablet / mobile button-group** Figma contracts (pre-existing on `main`, accepted by the user, not counted; Icon's contracts are fresh) |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API per B1 | ✅ | `bw_icon.dart:5` `BwIconSize` (xs…xl3), `:8-19` `BwIconColor` (10 roles, `defaultColor`), `:23-46` params/types/defaults = B1; assert `:31-39` fires only for status colour + explicit `size` + no label, message “status icons need text or a label” — test "standalone status icons require text or a label" |
| AC-2 Tokens only | ✅ | Sizes `BwSize.icon*` (`:91-101`), colours `context.bw.colors.icon*` (`:103-116`) = B2 / B3; axes `BwIconAxes.*` (`:64-66`). Tests "<size> uses its token size in <theme> <lang>" (7 × 2 × 2), "<colour> resolves from <theme> theme tokens", "component token enums match icon.tokens.json", "BwIcon source has no raw sizes or colours" |
| AC-3 RTL per B5; a11y per B6 | ✅ | `Transform.flip(flipX: rtl)` only when `directional` (`:72-77`); inner `Directionality(ltr)` (`:58-59`) neutralises `matchTextDirection`, so never a second flip. Decorative `ExcludeSemantics` (`:79-81`), labelled `Semantics(label:, image: true)` (`:83-87`); never focusable. Tests "directional icons flip exactly once in RTL only", "non-directional icons never add a flip", "decorative icons are excluded from semantics", "labelled icons expose an image semantics node" |
| AC-4 analyze + test | ✅ | Both pass (run above) |
| AC-5 Exported; README `Built`; no `Icons.` | ✅ | `lib/biowave_tablet.dart:10` exports `bw_icon.dart`; README row and header were `Built` at review start; `no_legacy_icons_test.dart:6` "library code never uses Flutter Material Icons" |

**D-18 (run goal)** — `lib/` holds no `Icons.`, `CupertinoIcons`, raw `IconData(` or non-`_rounded` `Symbols.*` (grep). `Symbols` comes from `material_symbols_icons` re-exported by `biowave_foundations` (`2-foundations/flutter/lib/biowave_foundations.dart:9`). **Guard probe:** a planted `lib/src/zz_probe.dart` with `Icons.add` made "library code never uses Flutter Material Icons" fail (`no_legacy_icons_test.dart:13`); probe removed, test green again, tree clean. **Goldens** (`test/goldens/icon/size_scale.png`, `colors.png`, `fill.png`, `rtl.png`) show real Rounded glyphs — heart scale 12→48, ten coloured circles, outlined vs filled push pin, → and mirrored arrow — because the test loads `MaterialSymbolsRounded.ttf` (`icon_test.dart:14-38`), not Ahem boxes.

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No `generated/`, `dist/`, contract or HTML shell in the diff |
| No raw values / no primitives | ✅ | Semantic tokens only; guard test above |
| Logical properties, RTL icons | ✅ | Directional icons flip once; tests use `EdgeInsetsDirectional` |
| Light + dark, en + ar tested | ✅ | Size and colour tests loop both themes; sizes both languages. Goldens are light / en only, which B9 allows |
| Accessibility | ✅ | B6 |
| Stayed inside the plan | ✅ | Files = C5 |
| Code matches spec | ✅ | B1–B6; see nit 1 on `filled: false` |
| Changelog | ✅ | `CHANGELOG.md` "[Tablet — Icon] — 2026-10-20"; C8 filled |

#### Findings

| # | Severity | File / section | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟢 Nit | B1 `filled` — `bw_icon.dart:64` | `filled: false` passes `fill: null`, so the icon takes `IconTheme.fill` (theme default `BwIconAxes.fill` = 0). Under a parent `IconTheme(fill: 1)` a `BwIcon(filled: false)` renders filled. B1 does not say whether `false` means "outlined" or "inherit" | State in B1 which one is meant; if "outlined", Executor passes `BwIconAxes.fill` when `filled` is false and the test "filled uses the selected fill axis" expects it | Planner |
| 2 | 🟢 Nit | `test/no_legacy_icons_test.dart:15` | `\bIcons\.` does not match `CupertinoIcons.` (no word boundary) or a raw `IconData(0x…)`, both of which also break D-18 | Extend the guard to fail on `CupertinoIcons` and `IconData(` in `lib/` | Executor |
| 3 | 🟢 Nit | Header row "Source code" | Still says "not built yet (the Executor creates it)" | Point it at `lib/src/components/icon/bw_icon.dart` | Planner |

#### Notes

- No other tablet component is built on `main`, so nothing has to adopt `BwIcon` yet. **Button tablet** (in progress on another branch) must render its icons through `BwIcon` (C2) — check it in that unit's review; the `no double flip inside BwButton / BwIconButton` item of B9 is tested there.
- C8 question (stale button-group contracts) goes to the orchestrator / Planner of those units.
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

Approved → after-review gate. Nits 1–3 can go with the next plan / fix touch of this unit.

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
