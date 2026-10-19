# Icon · أيقونة — Web

> **One file for Icon on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web icon`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Icon · أيقونة |
| Summary | Shows a Google Material Symbols glyph that helps people recognise an action, object or status. |
| Summary (ar) | تعرض رمزًا من Google Material Symbols يساعد على التعرّف على إجراء أو عنصر أو حالة. |
| Parts | Container · glyph |
| Parts (ar) | الحاوية · الرمز |
| Platform | Web · React + MUI |
| Built on | MUI `Icon` (font ligature) with `baseClassName="material-symbols-rounded"`; font `@material-symbols/font-400` (D-18) |
| Import | `import { Icon } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Icon` · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-18 |
| Plan | Open |
| Code | Changes requested |
| Figma build | Planned |
| Review | Round 1 · 2026-10-20 · Changes requested |
| Source code | [`src/components/icon/`](../../src/components/icon/) |
| Tokens | [`icon.tokens.json`](icon.tokens.json) — `Icon / Size` · `Icon / Color` (D-13) |
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

### A8 Platform notes — Web

| | Web |
|---|---|
| Available | ✓ |
| Default size | `md` (20) inline; components set their own |
| Source | `@material-symbols/font-400` Rounded font, loaded once by `@biowave/foundations/icons.css` |
| Interaction | None — icons are not interactive |
| Not supported | Optical size per icon size (font default is used) |

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

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API

#### `Icon`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `name` | `MaterialSymbol` | Material Symbols names (type from `@material-symbols/font-400`, re-exported by `@biowave/foundations`) | | ✓ | A4.1 — the glyph |
| `size` | enum | `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `3xl` | — (inherit) | | A4.2 — without `size` the icon follows the container's `font-size` (Biowave components set it) |
| `filled` | boolean | | `false` | | A4.3 — FILL 1 (class `bw-icon-fill`) |
| `color` | enum | `default` · `subtle` · `muted` · `inverse` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | — (`currentColor`) | | A4.4 |
| `directional` | boolean | | `false` | | A4.5 — adds class `bw-icon-directional`; the icon mirrors in RTL (Button / Icon button take the class and mirror their wrapper once instead) |
| `label` | string | | — | | A4.6 — present: `role="img"` + `aria-label`; absent: `aria-hidden="true"` |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root `span` |

Usage inside components: `<Button startIcon={<Icon name="add" />}>` — no `size`, the Button sizes it.

**Invalid combinations** (`console.warn` once in development; fallback still renders):

| Combination | Fallback |
|---|---|
| `color` is a status (`success` · `warning` · `error` · `info`) without `label` and used standalone | Renders; warns “status icons need text or a label” (only when not inside a Biowave component slot — skip the check when `size` is unset) |
| `name` empty | Renders an empty box of the size; warns |

### B2 Dimensions

```
 ┬ ┌──────┐
 │ │  ◆   │  container: inline-size = block-size = font-size = size-icon-{size}
 ┴ └──────┘  glyph: line-height 1, centred, overflow hidden
```

| Size | Token | px |
|---|---|---|
| `xs` | `size-icon-xs` | 12 |
| `sm` | `size-icon-sm` | 16 |
| `md` | `size-icon-md` | 20 |
| `lg` | `size-icon-lg` | 24 |
| `xl` | `size-icon-xl` | 32 |
| `2xl` | `size-icon-2xl` | 40 |
| `3xl` | `size-icon-3xl` | 48 |

Layout rules: `display: inline-flex`, `flex: none`, `inline-size`/`block-size`/`font-size` from the size token (or `1em` + inherited `font-size` when `size` is unset); `overflow: hidden`; `user-select: none`; `vertical-align: middle`. The box is reserved before the font loads (`font-display: block` from the font package keeps text from flashing the ligature name).

### B3 Tokens by part and state

> Machine-readable source: [`icon.tokens.json`](icon.tokens.json) — Figma collections `Icon / Size` and `Icon / Color`.

| `color` | `glyph` colour |
|---|---|
| — | `currentColor` (inherits) |
| `default` | `color-icon-neutral-default` |
| `subtle` | `color-icon-neutral-subtle` |
| `muted` | `color-icon-neutral-muted` |
| `inverse` | `color-icon-neutral-inverse` |
| `brand` | `color-icon-role-brand` |
| `secondary` | `color-icon-role-secondary` |
| `success` | `color-icon-role-success` |
| `error` | `color-icon-role-error` |
| `warning` | `color-icon-role-warning` |
| `info` | `color-icon-role-info` |

Fill: `'FILL' 0` default, `'FILL' 1` with `filled` (`@biowave/foundations/icons.css`, class `bw-icon-fill`). Dark theme: same tokens.

### B4 States and transitions

None of its own. Colour changes come from the parent's transition (`color` inherits). `filled` toggles instantly (no animation of the FILL axis).

### B5 RTL

```
LTR  [→] Next          RTL  التالي [←]      ← directional: mirrored
LTR  [✓] Saved         RTL  تم الحفظ [✓]     ← not directional: never mirrored
```

| Case | In RTL |
|---|---|
| `directional` on | `[dir='rtl'] .bw-icon.bw-icon-directional { transform: scaleX(-1) }` |
| `directional` off | Not mirrored |
| Inside Button / Icon button | The component removes the class from the icon and mirrors its own wrapper once (no double flip) |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Decorative (no `label`) | `aria-hidden="true"`, no role; the ligature text is never read |
| Meaningful (`label`) | `role="img"`, `aria-label={label}`; the ligature text is hidden from the name (`aria-label` wins) |
| Contrast | Meaningful icons ≥ 3:1 — the `color` tokens are checked by the build (`contrast-pairs.json`) |
| Focus | Never focusable |

### B7 Examples

```tsx
import { Icon, Button, IconButton } from '@biowave/web';

<Button startIcon={<Icon name="add" />}>Add device</Button>
<Button variant="outlined" endIcon={<Icon name="arrow_forward" directional />}>Next</Button>
<IconButton toggle selected={pinned} icon={<Icon name="push_pin" />} selectedIcon={<Icon name="push_pin" filled />} label="Pin" />
<Icon name="schedule" size="md" color="warning" label="Overdue" />
<Icon name="schedule" size="md" color="warning" label="متأخر" />
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every `size` renders a box of the token size in light + dark × en + ar
- [ ] Without `size` the box follows the parent's `font-size` (inside Button `sm`/`md`/`lg`: 16/20/24, nothing clipped)
- [ ] `filled` adds `bw-icon-fill`; `color` maps to the B3 tokens; no `color` = `currentColor`
- [ ] `directional` mirrors in RTL only; inside Button / Icon button exactly one flip
- [ ] Decorative: `aria-hidden`; labelled: `role="img"` + name; axe has no violations
- [ ] Invalid combinations warn once
- [ ] No raw values; no `@mui/icons-material` import (guard test)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `icon-contract.md`.

| Field | Value |
|---|---|
| Component | Icon |
| Platform | Web (React + MUI) |
| Plan version | 1 · 2026-10-18 |

### C1 Goal

`import { Icon } from '@biowave/web'` renders any Material Symbols Rounded glyph with token sizes and colours, fill, RTL mirroring and correct semantics; the font is loaded once by `@biowave/foundations/icons.css`.

### C2 Scope

**In scope:** B1–B9; `icon.tokens.ts` map; re-export the `MaterialSymbol` type from `@biowave/foundations`; then **adopt Icon** inside the built components — replace their direct MUI `Icon baseClassName="material-symbols-rounded"` usage with `<Icon name="…" />` in `SplitButton.tsx`, `ButtonGroup.tsx`, `TextField.tsx`, `FieldLabel.tsx`, `FieldSupportingText.tsx`, `FieldAction.tsx`, and replace the test helper `src/test/materialSymbol.tsx` with `Icon` in all tests (delete the helper's uses; keep the file only if still referenced).

**Out of scope:** new icons or custom SVG icons; animated icons; Icon button changes beyond accepting `Icon`.

### C3 Approach

- Base: MUI `Icon` with `baseClassName="material-symbols-rounded"` and `fontSize="inherit"`, wrapped in a styled root that applies the B2 size and B3 colour from `icon.tokens.ts` (`cssVars.size.icon.*`, `cssVars.color.icon.*`).
- `filled` → class `bw-icon-fill`; `directional` → class `bw-icon-directional` + the RTL rule in the root styles.
- Semantics per B6; the children text is the ligature `name`.
- Type: `name: MaterialSymbol` (`export type { MaterialSymbol } from '@material-symbols/font-400'` in `2-foundations/web/src/index.ts`).
- Gotchas: the font package's own `font-size: 24px` is reset by `icons.css` (`font-size: inherit`) — keep it; MUI `Icon` adds `aria-hidden` — override when `label` is set.

### C4 Token gaps

None (`size.icon.*`, `color.icon.*` exist). Component tokens in `icon.tokens.json` alias them.

### C5 Files to create / change

```
3-web-components/src/components/icon/Icon.tsx              new
3-web-components/src/components/icon/icon.tokens.ts        new
3-web-components/src/components/icon/Icon.test.tsx        new
3-web-components/src/components/icon/index.ts             new
3-web-components/src/index.ts                             change: export Icon
2-foundations/web/src/index.ts                            change: export type MaterialSymbol
3-web-components/src/components/{split-button,button-group,text-field}/*.tsx   change: use Icon
3-web-components/src/components/**/*.test.tsx              change: use Icon instead of MaterialSymbol
3-web-components/README.md · CHANGELOG.md                  change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] All existing component tests still pass after adopting Icon
- [ ] Type test: an unknown `name` is a TypeScript error (`// @ts-expect-error`)

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API matches B1 (names, types, defaults, warnings)
- [ ] AC-2 Sizes and colours only from B2–B3 tokens; no raw values
- [ ] AC-3 RTL per B5 (single flip inside Button / Icon button)
- [ ] AC-4 Semantics per B6; axe clean
- [ ] AC-5 `npm run typecheck` and `npm run test:web` pass
- [ ] AC-6 Exported from `src/index.ts`; README row `Built`
- [ ] AC-7 Built components use `Icon` (no direct `material-symbols-rounded` markup outside `components/icon/`)

---

### C8 Execution log

| Field | Value |
|---|---|
| Agent | Cursor (Composer) |
| Date | 2026-10-20 |
| Files changed | `3-web-components/src/components/icon/` (Icon.tsx, icon.tokens.ts, Icon.test.tsx, index.ts); `3-web-components/src/index.ts`; `2-foundations/web/src/index.ts` (`MaterialSymbol` type export); adopt Icon in `SplitButton.tsx`, `ButtonGroup.tsx`, `TextField.tsx`, `FieldLabel.tsx`, `FieldSupportingText.tsx`, `FieldAction.tsx`; replace `MaterialSymbol` test helper with `Icon` in Button / IconButton / ButtonGroup / SplitButton / TextField tests; delete `src/test/materialSymbol.tsx`; `3-web-components/README.md`; `CHANGELOG.md`; this C8 |

**Deviations from the plan or spec**
- `IconName` includes `push_pin` and `expand_more` in addition to `MaterialSymbol` from `@material-symbols/font-400`, because those typings omit names the Biowave specs and Figma icon index still use.
- IconButton / TextField axe tests: raised timeout to 20s (same as Button) — suite load made them flake at the default 5s after Icon adoption.

**Questions for the Planner**
- `npm run docs:check` fails on stale **tablet** and **mobile** `button-group` Figma contracts (outside this unit). Should those be regenerated on `main` / their branches?
- Button / IconButton `prepareIcon` still only lift `className="bw-icon-directional"` (and `mirrorInRtl`), not the Icon `directional` prop. Documented `<Icon directional />` inside Button self-mirrors once via Icon CSS (still one flip). Should Button/IconButton also strip `directional` like `mirrorInRtl` so the marker moves to the wrapper?

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-icon-contract.md`.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Icon` › sections `Icon` and `Icon — Documentation` |
| Mode | Create new |
| Plan version | 1 · 2026-10-18 |

### D1 Rules for this build

0. Component tokens only: `Icon / Size` and `Icon / Color` from [`icon.tokens.json`](icon.tokens.json), synced by the tooling. No local variables or styles of any other kind
1. The glyph is an instance of the **Google · Material Symbols** library set (Style=Rounded; keys in the contract), never detached, never redrawn
2. Size: bind the container width/height to `Icon / Size › size`; the glyph instance scales to fill (constraints Scale)
3. Colour: bind the glyph's vector fills to `Icon / Color › color`; the explicit `Icon / Color` mode picks the colour
4. Layer names = A2 part names

### D2 Component structure

```
❖ Icon                      ← component set (published)
  └─ variants by Size (XS … 3XL)
     └─ glyph               ◇ instance of Material Symbols/<name> (Style=Rounded)
```

### D3 Layer tree and auto layout

```
Icon            frame · fixed W/H = Icon / Size › size · clip content
└── glyph       ◇ Material Symbols set instance · constraints Scale · fills = Icon / Color › color
                  INSTANCE_SWAP `Glyph` · nested property `Fill` exposed (Unfilled · Filled) · `Style` locked to Rounded
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `XS` · `SM` · `MD` · `LG` · `XL` · `2XL` · `3XL` | `MD` | `size` | `'xs'` … `'3xl'` |
| `Glyph` | INSTANCE_SWAP | Google · Material Symbols sets | `add` | `name` | glyph name |
| `Fill` (nested, exposed) | VARIANT | `Unfilled` · `Filled` | `Unfilled` | `filled` | `false` · `true` |
| Colour | variable mode `Icon / Color` | `default` … `info` | `default` | `color` | same name |

**Icons used:** `add` · `arrow_forward` · `push_pin` — defaults and doc examples

### D5 Variants to generate

- Axis: `Size` = 7 variants. Colour and fill are not axes (mode and nested property)
- Grid: one row, `spacing/xl` gap

### D6 States, interactions and motion

None.

### D7 RTL

No `Language` variant (no text). Doc page 08 shows `arrow_forward` mirrored in an Arabic Button and `check` not mirrored.

### D8 Documentation pages

Standard 12 pages from the Doc Kit (Annotation library). Page notes: 03 Variations = size scale + colour roles + fill; 05 Usage = icon with text vs Icon button; 08 RTL = directional examples; 09 Accessibility = decorative vs labelled.

Component description: “Material Symbols Rounded glyph with Biowave sizes and colours. Spec: 3-web-components/components/icon/icon.md”.

### D9 Code Connect

`3-web-components/src/components/icon/Icon.figma.tsx` — `Size` → `size`, `Glyph` → `name`, `Fill` → `filled`, colour mode → `color`. Publish after code and Figma are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set and layers per D2–D3; glyph is a library instance (Rounded), not detached
- [ ] F-AC-2 Properties per D4; 7 variants
- [ ] F-AC-3 Size and colour bound to `Icon / Size` and `Icon / Color`; token lint 0
- [ ] F-AC-4 Light/Dark by mode only
- [ ] F-AC-5 Docs from the Doc Kit; Components List card; Code Connect after approval

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
| 1 | 2026-10-20 | Changes requested | not reviewed |

### E2 Round 1 — 2026-10-20

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-20 |
| Verdict | **Changes requested** — Icon itself is solid and D-18 holds across the web sources; 3 🟡 items (2 Planner, 1 Executor) and 2 🟢 nits |
| Evidence | Run by the Reviewer on `ds/icon-web`: `npm run typecheck` ✅ · `npm run test:web` ✅ 7 files, 86/86 · `npm run docs:check` ❌ 2 errors, both stale **tablet / mobile button-group** Figma contracts (pre-existing, also on `main`, out of scope — not counted) |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ⚠️ | Props, defaults, `className` / `data-*` / `ref` forwarding = B1 (`Icon.tsx:25-34`, `:71-83`). Warnings: empty `name` and status-without-label (skipped when `size` unset) warn once (`Icon.tsx:87-96`; test "warns once for invalid combinations"). `name` is `IconName` = `MaterialSymbol` + `push_pin` · `expand_more`, not `MaterialSymbol` as B1 says — finding 2 |
| AC-2 Tokens only | ✅ | `icon.tokens.ts:17-39` uses `cssVars.size.icon.*` / `cssVars.color.icon.*` only; equal to `icon.tokens.json` (test "matches every component-token alias"); raw-value guard (test "contains no raw colors, dimensions, durations, or font names"). `1em` is the B2 fallback |
| AC-3 RTL per B5 | ⚠️ | Standalone: `[dir='rtl'] &.bw-icon-directional { scaleX(-1) }` (`Icon.tsx:60-62`). Inside Button / Icon button only the `className="bw-icon-directional"` path is handled; the documented `<Icon directional />` (B7) keeps its class on the icon and the wrapper is not marked, and `directional` + the class gives a double flip — finding 1 |
| AC-4 Semantics per B6; axe | ✅ | Decorative `aria-hidden="true"`, no role; labelled `role="img"` + `aria-label`, MUI's `aria-hidden` removed (`Icon.tsx:107-119`); test "is decorative without label and labelled with role=img; axe clean" |
| AC-5 typecheck + test:web | ✅ | Both pass (run above); the `@ts-expect-error` unknown-name test is type-checked (`tsconfig` includes `src`) |
| AC-6 Exported; README `Built` | ✅ | `src/index.ts` exports `Icon` + types; `components/icon/index.ts`; README row and header were `Built` at review start |
| AC-7 Built components use Icon | ✅ | `SplitButton.tsx:153`, `ButtonGroup.tsx:202`, `TextField.tsx:546-567`, `FieldLabel.tsx:182`, `FieldSupportingText.tsx:123`; `FieldAction.tsx` / `FieldLabel.tsx` style `.bw-icon`; `src/test/materialSymbol.tsx` deleted. Repo sweep below |

**D-18 sweep (user request)** — `grep` over `3-web-components/src` for `@mui/icons-material`, `SvgIcon`, `<svg` / `<path`, other icon fonts or packages (`material-icons`, Font Awesome, Lucide, Heroicons, `react-icons`) and `material-symbols-rounded` / `@mui/material/Icon` outside `src/components/icon/`: **no component source renders an icon from another source.** `@mui/material/Icon` is imported only in `icon/Icon.tsx`; no icon package is in `package.json`. Only hits: the existing `@mui/icons-material` guard (`src/test/noLegacyIcons.test.ts`), the TextField source guards, and one `<svg>` stub in `Button.test.tsx:570` that tests the `mirrorInRtl` API for custom icons (test fixture, not rendered by any component). MUI parts used (`CircularProgress`, `Menu`, `Tooltip`, `OutlinedInput`, …) render no built-in icons in Biowave's usage.

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No `generated/`, `dist/`, contract or HTML shell in the diff |
| No raw values / no primitives | ✅ | Semantic `cssVars` only |
| Logical properties, RTL icons | ⚠️ | `inlineSize` / `blockSize`; finding 1 |
| Light + dark, en + ar tested | ✅ | Every size × theme × locale (test "renders every size as a token-sized box in both themes and languages") |
| Accessibility (keyboard, focus, labels, target) | ✅ | Never focusable; label semantics per B6 |
| Stayed inside the plan | ✅ | Files = C5; test-timeout raise to 20 s logged in C8 |
| Code matches spec | ⚠️ | Findings 1 and 2; `Icon.tsx:67-69` JSDoc says Button strips the class, which is not true for the `directional` prop |
| Accepted deviations reflected back into the spec | ❌ | The `IconName` widening is only in C8, not in B1 — finding 2 |
| Changelog | ✅ | `CHANGELOG.md` "[Web — Icon] — 2026-10-20" |

#### Findings

| # | Severity | File / section | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | B5 · C2 · C5 — `button/Button.tsx:185-210`, `icon-button/IconButton.tsx:182-207`, `icon/Icon.tsx:101` | B5 says Button / Icon button take the directional marker off the icon and mirror their wrapper once. `prepareIcon` only reads `className` and `mirrorInRtl`, so the documented `<Icon directional />` (B7) keeps `bw-icon-directional` on the icon and the wrapper is not marked (one flip today, but by the wrong element); `<Icon directional className="bw-icon-directional" />` is flipped twice (wrapper + icon = not mirrored). Button / IconButton are not in C5 and C2 puts Icon button changes out of scope, so the Executor could not fix it. **Answer to the C8 question: yes** — strip `directional` like `mirrorInRtl` | Add `button/Button.tsx` and `icon-button/IconButton.tsx` to C5; in B5 / C3 state that `prepareIcon` treats `directional === true` like `mirrorInRtl` (remove the prop, mark the wrapper); fix the `Icon.tsx` JSDoc; add the B9 case below. Regenerate the contract | Planner |
| 2 | 🟡 Should fix | B1 `name` — `icon/Icon.tsx:21-26` | `name` accepts `MaterialSymbol \| 'push_pin' \| 'expand_more' \| ''`. `@material-symbols/font-400` 0.48.0 typings no longer list `push_pin` / `expand_more` (the list has `keep`), yet `icons.md`, `_sync/figma-icons.json` and `SplitButton.tsx:153` use them. The API now differs from B1, and nobody has checked that the Rounded woff2 still has those ligatures | Planner decides: either move specs, the Figma icon index and Split button to the names the package lists, or record the extra names in B1 (and C3) and confirm the ligatures render in a browser. Executor then aligns `IconName` | Planner |
| 3 | 🟡 Should fix | `icon/Icon.test.tsx:158-202` | B9 "inside Button / Icon button exactly one flip" is only tested with `className="bw-icon-directional"`, not with the documented `directional` prop; "mirrors in RTL only" asserts that the rule text exists, not that it is scoped to `[dir='rtl']` | Add Button and IconButton cases with `<Icon directional />` (and `directional` + class): exactly one `.bw-icon-directional`, on the wrapper; assert the rule selector contains `[dir='rtl']` | Executor |
| 4 | 🟢 Nit | `icon/Icon.test.tsx:121-140` | B9 "inside Button sm/md/lg: 16/20/24" only checks `fontSize: inherit` and a truthy wrapper `font-size` | Assert the wrapper `font-size` equals the Button size token for each size | Executor |
| 5 | 🟢 Nit | B9 · `src/test/noLegacyIcons.test.ts` | AC-7 / D-18 is guarded only for 3 TextField files; nothing fails if a future component renders `material-symbols-rounded` or `@mui/material/Icon` directly | Add to B9 / C5: extend `noLegacyIcons.test.ts` to fail on `material-symbols-rounded` and `@mui/material/Icon` outside `src/components/icon/` | Planner |

#### Notes

- `docs:check` fails only on the stale tablet and mobile `button-group` Figma contracts — pre-existing on `main`, outside this unit, not counted. The C8 question about regenerating them goes to the orchestrator / Planner of those units.
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

1. Planner: findings 1, 2, 5 → Plan `Finished` → `npm run contract -- web icon`.
2. Executor: finding 3 (with finding 1's code), 4 and the outcome of 2 → C8 Fix round 1 → Code `Built`.

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
