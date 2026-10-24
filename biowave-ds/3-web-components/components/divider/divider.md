# Divider · فاصل — Web

> **One file for Divider on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web divider`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Divider · فاصل |
| Summary | A thin line that separates groups of content so a list, card or toolbar is quicker to scan. |
| Summary (ar) | خط رفيع يفصل بين مجموعات المحتوى لتسهيل قراءة القائمة أو البطاقة أو شريط الأدوات. |
| Parts | Container · line · label (optional) |
| Parts (ar) | الحاوية · الخط · النص (اختياري) |
| Platform | Web · React + MUI |
| Built on | MUI `Divider` (`<hr>`), styled only from Biowave tokens |
| Import | `import { Divider } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Divider` · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-23 |
| Plan | Finished |
| Code | Changes requested |
| Figma build | Planned |
| Review | Round 1 · 2026-10-24 · Changes requested |
| Source code | [`src/components/divider/`](../../src/components/divider/) |
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

### A8 Platform notes — Web

| | Web |
|---|---|
| Available | ✓ |
| Typical places | Lists and menus, card and side-sheet sections, toolbars and action bars (vertical) |
| Interaction | None — dividers are not interactive |
| Screen readers | Announced as a separator unless `decorative` is on; with a label, the label is the separator's name (“separator, or”) |
| Lists | Inside a `<ul>` / `<ol>`, set `component` to `li` so the list markup stays valid; a divider in a list is always hidden from screen readers (the list already shows the grouping) |
| Not supported | A label on a vertical divider; thicker lines |

### A9 Accessibility (design)

- A divider is never the only signal of structure: headings, list grouping and spacing carry the meaning, so people who cannot see the line lose nothing
- The line is decorative for contrast purposes; it is not a control boundary and does not need 3:1 (`2-foundations/guidelines/border.md`)
- Dividers are never focusable and never interactive
- A divider that marks a real break may be announced as a separator where the platform supports it (A8); one that only repeats existing structure is hidden from screen readers
- The label is text, so it meets 4.5:1 on every surface (`color-text-neutral-muted`) and is read by screen readers where the platform reads it (A8); it never holds information that is not clear from the content around it

### A10 Related components

- [Button group](../button-group/button-group.md#a--guidelines) — separates actions with its gap, no divider needed
- List, Menu, Card, Side sheet, Action bar (later days) — use Divider between their items or sections
- Spacing (foundations) — the first tool for separating content; a divider is added only when spacing is not enough

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API

#### `Divider`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | enum | `subtle` · `default` · `strong` | `default` | | A4.2 — line colour (B3) |
| `inset` | enum | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `decorative` | boolean | | `false` | | A4.4 — `true`: hidden from assistive technology (B6). Has no effect with `component="li"` (always hidden, B6) |
| `showLabel` | boolean | | `false` | | A4.5 — `true`: shows `label` in the middle of a horizontal divider |
| `label` | string | | — | | A4.5 — the label text (“or” / “أو”); used only when `showLabel` is `true` |
| `component` | enum | `hr` · `li` | `hr` | | A4.6 — `li` for a divider that sits directly inside a `<ul>` / `<ol>` (B6) |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root element |

No `children` (the label comes only from `label`), no MUI `variant` / `textAlign` / `flexItem` / `light` / `absolute` props on the public API; `component` accepts only `hr` and `li` (C3 maps the Biowave props to MUI).

**Root element**

| `component` | Without label | With label (`showLabel` and a non-empty `label`, horizontal) |
|---|---|---|
| `hr` (default) | `<hr>` | `<div role="separator">` — an `<hr>` cannot hold text |
| `li` | `<li role="separator">` | `<li role="separator">` |

**Invalid combinations** (`console.warn` once in development; the fallback renders):

| Combination | Fallback |
|---|---|
| `orientation="vertical"` with `inset="start"` | Renders `inset="none"`; warns “inset start is for horizontal dividers only” |
| `orientation="vertical"` with `showLabel` | Renders the plain vertical line, no label; warns “label is for horizontal dividers only” |
| `showLabel` with an empty or missing `label` | Renders the plain line, no label; warns “showLabel needs a label” |

### B2 Dimensions

```
Horizontal, inset both
 spacing-xl                                   spacing-xl
├──────────┤                                 ├──────────┤
┌───────────────────────────────────────────────────────┐ ┬
│          ─────────────────────────────────            │ ┴ border-width-default
└───────────────────────────────────────────────────────┘
 ① container (fills inline size)   ② line

Vertical, inset both
 ┬ spacing-xl
 ┴
 │  ② line — border-width-default wide, fills the row's block size
 ┬ spacing-xl
 ┴

Horizontal with label, inset none
┌───────────────────────────────────────────────────────┐ ┬
│②─────────────────────── ③ or ────────────────────────②│ │ caption-md line height
└───────────────────────────────────────────────────────┘ ┴
                        ├─┤    ├─┤ spacing-md each side
 ② two equal segments (each ≥ spacing-xl), centred on the label's block axis
```

| Part | Property | `horizontal` | `vertical` |
|---|---|---|---|
| `line` | thickness | `border-width-default` (block-end border) | `border-width-default` (inline-end border) |
| `container` | length | inline size of the parent (`inline-size: auto`, block element) | block size of the row (`align-self: stretch`, `block-size: auto`) |
| `container` | inset `start` | `margin-inline-start: spacing-xl` | — (invalid, B1) |
| `container` | inset `both` | `margin-inline: spacing-xl` | `margin-block: spacing-xl` |
| `container` | inset `none` | margin `spacing-none` | margin `spacing-none` |
| `container` | outer margin | `spacing-none` — the parent's gap or padding sets the space around it | same |
| `container` (with label) | layout | `display: flex`, `align-items: center`; block size = the label's line height (`caption-md`, per language); the inset margins above still apply to the outer ends | — (no label, B1) |
| `line` (with label) | segments | two segments, one before and one after the label: `flex: 1 0 spacing-xl` (equal share of the free length, never shorter than `spacing-xl`), block-end border `border-width-default` | — |
| `label` (with label) | gap | `padding-inline: spacing-md` (the gap to each segment) | — |
| `label` (with label) | size | `flex: 0 1 auto` — natural width; wraps when longer than the free length, `text-align: center`; never truncated | — |

Layout rules: `flex-shrink: 0`; never adds its own spacing above / below (horizontal) or beside (vertical) — the parent's `gap` does. A vertical divider is meant for flex rows (toolbars, action bars); outside a flex row its height is the row's height only if the parent gives one.

Inset `start` stays one fixed `spacing-xl` (A4.3). Known follow-up: the List plan (Day 8) adds its own text-aligned inset for list rows; nothing is added to Divider now.

### B3 Tokens by part and state

> No component tokens (P-04): every value below is a semantic token, used directly. `{name}.tokens.json` is not needed.

| Part | Property | `emphasis="subtle"` | `emphasis="default"` | `emphasis="strong"` |
|---|---|---|---|---|
| `line` | colour | `color-border-subtle` | `color-border-default` | `color-border-strong` |
| `line` | width | `border-width-default` | `border-width-default` | `border-width-default` |
| `line` (with label) | minimum segment length | `spacing-xl` | same | same |
| `container` | inset | `spacing-xl` · `spacing-none` | same | same |
| `label` | text style | `caption-md` (`biowaveVariants.captionMd`; the family and line height follow the language) | same | same |
| `label` | colour | `color-text-neutral-muted` | same | same |
| `label` | gap to each segment | `spacing-md` | same | same |

The label does not change with `emphasis`. No interactive states. Dark theme: same tokens (values switch automatically). The line is decorative (`2-foundations/guidelines/border.md`) — no contrast requirement. The label is text: `color-text-neutral-muted` already meets 4.5:1 on `color-surface-default`, `-page`, `-subtle` and `-raised` in both themes (pairs exist in `contrast-pairs.json`; none to add).

### B4 States and transitions

None. The divider has one state and never animates; colour follows the theme instantly. Showing or hiding the label is instant. Reduced motion: nothing to remove.

### B5 RTL

```
LTR  │        ──────────────────────│   inset start: space at the inline start (left)
RTL  │──────────────────────        │   inset start: space at the inline start (right)

LTR  │─────────────── or ───────────────│   label centred
RTL  │─────────────── أو ───────────────│   label centred — same layout
```

| Part | In RTL |
|---|---|
| `container` inset | Logical margins (`margin-inline-start`, `margin-inline`) — mirrors automatically |
| `line` (vertical) | `border-inline-end` — the side flips with the direction; a single line looks the same either way |
| `label` | Centred; its gap is `padding-inline` (logical), so it is the same in both directions; the text follows the document direction and language (`:lang(ar)` font) |
| Icons | None |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Horizontal: `<hr>` (implicit `separator`). Vertical: `<hr aria-orientation="vertical">` (set explicitly if MUI does not). With a label: `<div role="separator">` (horizontal, no `aria-orientation` needed) |
| Accessible name | Without a label: none (a separator needs no name). With a label: `aria-label` = the `label` text, because a separator's children are presentational; the visible label text is inside the separator |
| Decorative | `decorative` → `aria-hidden="true"` on the root; no `aria-orientation`, no `aria-label` |
| Inside a list (`component="li"`) | `<li role="separator" aria-hidden="true">` — always hidden, whatever `decorative` says: the list items already show the grouping, and axe's `list` rule rejects a visible `role="separator"` child of `<ul>` / `<ol>` (checked with axe-core 4.14: passes only when hidden). Never nests an `<hr>` inside the `<li>` |
| Focus | Never focusable; no `tabindex` |
| Contrast | Line decorative — exempt (A9). Label text 4.5:1 (B3) |
| Target size | Not interactive |

| Key | Action |
|---|---|
| — | No keyboard interaction; Tab skips the divider |

### B7 Examples

```tsx
import { Divider } from '@biowave/web';

// Between list sections
<Divider />

// Lines up with list text after the leading icon
<Divider inset="start" emphasis="subtle" decorative />

// "or" between two sign-in options
<Divider showLabel label={t('or')} />            // en: "or" · ar: "أو"

// Directly inside a list
<ul>
  <li>Profile</li>
  <Divider component="li" />
  <li>Sign out</li>
</ul>

// Toolbar groups (row is a flex container)
<Stack direction="row" gap={cssVars.spacing.md}>
  <IconButton icon={<Icon name="undo" directional />} label="Undo" />
  <Divider orientation="vertical" inset="both" />
  <IconButton icon={<Icon name="delete" />} label="حذف" />
</Stack>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Renders horizontal and vertical × `subtle` · `default` · `strong` × `none` · `start` · `both` (valid combinations) in light + dark × en + ar
- [ ] Line colour per `emphasis` and thickness `border-width-default` come from the B3 tokens (read from the rendered CSS rules / `cssVars`), not literals
- [ ] Inset: `start` → `margin-inline-start` = `spacing-xl`; `both` → `margin-inline` (horizontal) / `margin-block` (vertical) = `spacing-xl`; `none` → no margin
- [ ] RTL: in `en` and `ar` the Divider's own styled rules (`divider.tokens.ts` values) use only logical properties (`margin-inline-start`, `margin-inline`, `margin-block`, `padding-inline`, `border-block-end-width`, `border-inline-end-width`) — no physical `left` / `right` margin, padding or border in them or in the source; the computed inline-start margin is `spacing-xl` with `inset="start"` in both directions
- [ ] Vertical divider stretches to the height of a flex row (`align-self: stretch`)
- [ ] Label: `showLabel` + `label="or"` (en) / `"أو"` (ar) renders the text centred between two line segments; label text style `caption-md`, colour `color-text-neutral-muted`, `padding-inline` `spacing-md`, segment colour per `emphasis` and minimum length `spacing-xl` — all from `divider.tokens.ts`, light + dark; with `inset` the margins apply to the outer ends
- [ ] Label off: `showLabel={false}` with a `label` renders the plain `<hr>` and no text
- [ ] Semantics: horizontal `<hr>` with role `separator`; vertical has `aria-orientation="vertical"`; labelled divider is `<div role="separator" aria-label="or">` with the visible text inside; `decorative` sets `aria-hidden="true"` (and no `aria-label`); never focusable
- [ ] `component="li"`: renders `<li role="separator" aria-hidden="true">` (with and without a label, and with `decorative={false}`), no `<hr>` inside; a `<ul>` with `<li>` items and `component="li"` dividers is valid markup
- [ ] `orientation="vertical"` + `inset="start"` warns once and renders `inset="none"`; `orientation="vertical"` + `showLabel` warns once and renders no label; `showLabel` with an empty or missing `label` warns once and renders the plain line
- [ ] axe: no violations in both themes and languages — decorative and not, with and without a label, and a `<ul>` containing `component="li"` dividers
- [ ] Source contains no raw hex, px, ms or font names; no primitives

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `divider-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md` and this contract. Nothing else unless linked here.

| Field | Value |
|---|---|
| Component | Divider |
| Platform | Web (React + MUI) |
| Depends on | — (no Biowave component inside; uses the shared test tooling in `src/test/render.tsx`) |
| Plan version | 1.1 · 2026-10-23 |

### C1 Goal

`import { Divider } from '@biowave/web'` renders a token-styled separator with the B1 options — including an optional centred label on horizontal dividers and an `li` root for lists — with logical insets that mirror in Arabic, correct separator semantics, and tests that pass at the default timeouts.

### C2 Scope

**In scope:** B1–B9; `divider.tokens.ts` (TS map of the B3 semantic tokens per `emphasis`, plus the label text style, colour, gap and minimum segment length); export from `src/index.ts`.

**Out of scope:** icons on the divider; a label on vertical dividers; label alignments other than centre; extra thicknesses; a list-text-aligned inset (the List plan decides, Day 8); any change to other components or the shared test tooling.

### C3 Approach

- Base: `styled(MuiDivider)` with `shouldForwardProp` that drops the Biowave props. Map: `orientation` → MUI `orientation`; vertical → MUI `flexItem` always; MUI `variant` stays `fullWidth` (Biowave `inset` replaces `inset`/`middle`, because MUI's inset value is a fixed physical-looking left margin, not a token).
- Styles from `divider.tokens.ts` (`cssVars.color.border.{subtle|default|strong}`, `cssVars.border.width.default`, `cssVars.spacing.xl`, `cssVars.spacing.md`, `cssVars.spacing.none`, `cssVars.color.text.neutral.muted`, `biowaveVariants.captionMd`): reset MUI's border (`border-width: 0`, `border-style: solid`), then horizontal `border-block-end-width`, vertical `border-inline-end-width`; `border-color` per `emphasis`; `margin: 0` plus the B2 logical inset margins.
- Gotcha: MUI's own styles use `borderBottomWidth` / `borderRightWidth`; the reset must override them so only the logical border remains (stylis RTL would otherwise flip a physical right border — harmless visually but against rule 4).
- **Label:** only when `orientation="horizontal"`, `showLabel` and a non-empty `label`. Pass the text as MUI `children` (MUI then renders the line as `::before` / `::after` and wraps the text in `.MuiDivider-wrapper`). Gotchas: MUI's `withChildren` styles use `border-top` and physical `padding-left` / `padding-right` (`calc(8px * 1.2)`) and fixed `width` on the pseudo elements — override them: pseudo elements `flex: 1 0 spacing-xl`, `width: auto`, `border-width: 0`, `border-block-end-width: border-width-default`, `border-style: solid`, `border-color` per `emphasis`; wrapper `padding-inline: spacing-md`, `padding-block: 0`, `caption-md` typography, `color-text-neutral-muted`, `text-align: center`, `flex: 0 1 auto`, `white-space: normal`; root `display: flex`, `align-items: center`, no own border (`border-width: 0` on the root when labelled). Do not use MUI `textAlign`.
- **Root element (B1):** pass MUI `component` = `'li'` when `component="li"`; otherwise `'div'` when labelled, `'hr'` when not. MUI sets `role="separator"` for non-`hr` roots — keep it.
- Semantics per B6: `decorative` → `aria-hidden="true"`; vertical non-decorative → `aria-orientation="vertical"` on the `<hr>`; labelled non-decorative → `aria-label={label}`; `component="li"` → always `aria-hidden="true"` and no `aria-label` / `aria-orientation`.
- Invalid combinations per B1 with the shared `warnOnce` helper used by Button.
- **Test tooling:** render only through `renderWithBiowave` from `src/test/render.tsx` (fresh speedy Emotion cache per test, reset in `setup.ts` after `cleanup()`). Do not create an Emotion cache or `BiowaveProvider` in the test file; no per-test timeout arguments; do not change `vitest.config.ts`. Every test passes at the default 5 s timeout.

### C4 Token gaps

None — `color-border-subtle`, `color-border-default`, `color-border-strong`, `border-width-default`, `spacing-xl`, `spacing-md`, `spacing-none`, `color-text-neutral-muted` and the `caption-md` text style exist.

### C5 Files to create / change

```
3-web-components/src/components/divider/Divider.tsx          new
3-web-components/src/components/divider/divider.tokens.ts    new (B3 map, semantic tokens only)
3-web-components/src/components/divider/Divider.test.tsx     new
3-web-components/src/components/divider/index.ts             new
3-web-components/src/index.ts                                change: export Divider and its types
3-web-components/README.md                                   change: Code status
3-web-components/components/divider/divider.md               change: C8 only
CHANGELOG.md                                                 change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] All renders go through `renderWithBiowave` (`theme` × `locale` options); no Emotion cache or provider in `Divider.test.tsx`; no timeout arguments; `npm run test:web` passes 3 full runs at the default timeout
- [ ] Token assertions are table-driven from `divider.tokens.ts` (one source; the test does not repeat values), including the label rows
- [ ] The label is tested with the Arabic sample “أو” under `locale: 'ar'` (`dir="rtl"`): centred, same `padding-inline` on both sides, no physical padding in the computed or source rules

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, root element table, warnings + fallbacks); no extra MUI props exposed; `component` only `hr` · `li`
- [ ] AC-2 Every value in B2–B3 comes from the listed semantic token or text style; no raw values, no primitives
- [ ] AC-3 Logical properties only (including the label gap); RTL behaves as B5
- [ ] AC-4 Semantics per B6 (separator, vertical orientation, label as name, decorative hidden, `li` always hidden, never focusable); axe clean, including a list with `li` dividers
- [ ] AC-5 Tests in B9 and C6 exist and pass through `renderWithBiowave` at default timeouts; `npm run typecheck`, `npm run test:web`, `npm run docs:check`, `npm run sync` pass
- [ ] AC-6 Exported from `src/index.ts`; README row and header Code `Built`; C8 and `CHANGELOG.md` filled

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-24 |
| Files changed | `3-web-components/src/components/divider/Divider.tsx`; `3-web-components/src/components/divider/divider.tokens.ts`; `3-web-components/src/components/divider/Divider.test.tsx`; `3-web-components/src/components/divider/index.ts`; `3-web-components/src/index.ts`; `3-web-components/README.md`; `3-web-components/components/divider/divider.md`; `CHANGELOG.md` |
| Checks | `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✓; `npm run typecheck` ✓; `npm run test:web` ✓ 118/118, three consecutive full runs at default timeouts |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-divider-contract.md`.

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec). **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Divider` › sections `Divider` and `Divider — Documentation` |
| Mode | Create new (no legacy Divider set in the Figma files) |
| Plan version | 1.1 · 2026-10-23 |

### D1 Rules for this build

0. **No component tokens** — this component has no `Divider / *` collection. Bind directly to the Foundations library variables (keys in the contract). Never create local variables or styles; `figma-read-tokens.js` lint must report 0 before Phase 1 and after each phase.
1. Every value is bound: line stroke colour → `color/border/{subtle|default|strong}`; stroke weight → `border/width/default`; inset padding → `spacing/xl` (or `spacing/none`); label gap → `spacing/md`; label fill → `color/text/neutral/muted`; label text style → `Web/{en|ar}/caption/md` (published Foundations text styles). No raw numbers.
2. Never bind `_Primitive/*` or `_deprecated/*`.
3. Layer names = A2 part names (`container`, `line`, `label`). With a label the line is two layers, both named `line`.
4. Auto layout on every frame; no absolute positioning.
5. No icons. The only text layer is `label`, in Horizontal variants only.

### D2 Component structure

```
❖ Divider                 ← component set (published)
  └─ variants Orientation × Emphasis × Inset (+ Direction=RTL for Horizontal · Start)
     properties Show label (BOOLEAN) · Label (TEXT) — Horizontal variants only
```

### D3 Layer tree and auto layout

```
Horizontal
container        ↔ horizontal · width FILL when placed · height HUG
│                  padding-left / padding-right = {B2 inset} (Start: left only in LTR, right only in RTL)
│                  counter-axis align = center · gap = {B3 label gap: spacing/md}
├── line         frame · width FILL (min width {spacing/xl}) · height HUG (no children)
│                  bottom stroke only: weight {B3 border-width-default}, colour {B3 per Emphasis}
│                  strokes included in layout = on (the frame is exactly one stroke thick)
├── label        T `Web/{en|ar}/caption/md` · fill {color/text/neutral/muted} · width HUG · align center
│                  BOOLEAN `Show label` (visibility) · TEXT `Label` (characters) · default “or”
└── line         second segment, same as the first · visibility bound to `Show label`

Vertical
container        ↕ vertical · height FILL when placed · width HUG
│                  padding-top / padding-bottom = {B2 inset} (Both only)
└── line         frame · height FILL · width HUG (no children)
                   right stroke only: weight {B3}, colour {B3}; strokes included in layout = on
```

With `Show label` off, `label` and the second `line` are hidden, so the first `line` fills the container alone (hidden layers take no gap). Vertical variants have no `label` layer: `Show label` and `Label` do nothing there (B1 — no label on vertical dividers). The default text style is `Web/en/caption/md`; Arabic samples on doc pages use `Web/ar/caption/md` and the Arabic text “أو”.

If a hug frame with no children cannot keep the stroke-only size, stop and report in D11 (do not switch to a fill rectangle with a raw height).

```
LTR, Inset=Start              │      ──────────────────────│
RTL, Inset=Start              │──────────────────────      │
Show label on (LTR and RTL)   │─────────── or ───────────│
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` | `'horizontal'` · `'vertical'` |
| `Emphasis` | VARIANT | `Subtle` · `Default` · `Strong` | `Default` | `emphasis` | `'subtle'` · `'default'` · `'strong'` |
| `Inset` | VARIANT | `None` · `Start` · `Both` | `None` | `inset` | `'none'` · `'start'` · `'both'` |
| `Direction` | VARIANT | `LTR` · `RTL` | `LTR` | — | Figma only; code mirrors automatically |
| `Show label` | BOOLEAN | | `false` | `showLabel` | `true` · `false` |
| `Label` | TEXT | | `or` | `label` | the text |

`decorative` and `component` are code-only (no Figma property).

### D5 Variants to generate

- Horizontal: 3 Emphasis × 3 Inset × LTR = 9, plus Inset=Start × RTL × 3 Emphasis = 3
- Vertical: 3 Emphasis × (None · Both) × LTR = 6 (Start is invalid, B1)
- Total **18** — the label is a BOOLEAN + TEXT property, not a variant. Grid: rows = Orientation × Inset × Direction, columns = Emphasis; gap `spacing/xl`

### D6 States, interactions and motion

None.

### D7 RTL

Method: `Direction=RTL` variants only where the result differs (Horizontal · Inset=Start): padding on the right instead of the left. All other variants look the same in both directions, including a shown label (centred). Doc page 08 shows an inset divider in an Arabic list (sample copy from A6: الإشعارات) and a labelled divider with “أو” in `Web/ar/caption/md`.

### D8 Documentation pages

Standard 12 pages from the Doc Kit (Annotation library), section `Divider — Documentation`. Page notes: 01 Introduction = a card with sections separated by a default divider, Light + Dark; 03 Variations = orientation, emphasis, inset, show label; 05 Usage = spacing first vs divider, toolbar with vertical dividers, “or” between two sign-in buttons; 06 Content = label copy from A6 (EN / AR); 07 Platform = `Doc/Device frame` Desktop + Web narrow with a list and a toolbar; 08 RTL = Inset=Start and a labelled divider in LTR and RTL; 09 Accessibility = separator vs decorative, label as the separator's name; 10 Changes from previous version = F0.

Component description: “Thin line that separates groups of content, with an optional centred label. Spec: 3-web-components/components/divider/divider.md”.

### D9 Code Connect

`3-web-components/src/components/divider/Divider.figma.tsx` — `Orientation` → `orientation`, `Emphasis` → `emphasis`, `Inset` → `inset`, `Show label` → `showLabel`, `Label` → `label`; `Direction` not mapped. Publish after code and Figma are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set, layers and names per D2–D3 and A2
- [ ] F-AC-2 Properties per D4 exactly; 18 variants, no Vertical · Start; `Show label` and `Label` bound to the Horizontal `label` layer (and the second `line`)
- [ ] F-AC-3 Zero raw values: stroke colour, stroke weight, padding, gap, label fill and text style bound to Foundations variables / styles; token lint 0
- [ ] F-AC-4 Light / Dark by variable mode only
- [ ] F-AC-5 RTL variants per D7
- [ ] F-AC-6 Docs pages per D8 from the Doc Kit with live instances (or reported blocked); Components List card
- [ ] F-AC-7 Values match B2–B3 one by one

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
| 1 | 2026-10-24 | **Changes requested** | not reviewed |

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Verdict | **Changes requested** |

Code reviewed: `git diff origin/main...HEAD -- 3-web-components/src` on `ds/divider-web` (commit `3e8f79b`): `src/components/divider/` (`Divider.tsx`, `divider.tokens.ts`, `Divider.test.tsx`, `index.ts`) and `src/index.ts:22-29`. Working tree was clean before the review.

Commands run by the Reviewer (2026-10-24, on the user's machine):
`npm run docs:check` ✅ · `npm run typecheck` ✅ · `npm run sync` ✅ READY (exit 0) · `npm run test:web`: run 1 ❌ 117/118 (load average 3.4–6 from other agents; total test time 45 s against about 16 s normally; the name of the failing test was cut from the captured tail, so the file is not known). Re-run per the user's note: runs 2–5 ✅ 118/118 each (load 5.9–7.0, 5.4–11 s). `Divider.test.tsx` passed 11/11 in every captured run (about 0.9 s).

Real browser: my own headless Chrome 156 (`--headless=new`, driven over CDP on a private port, not the shared pane). It rendered the real `Divider` from `3-web-components/src` with the generated `tokens.css` inside `BiowaveProvider`, built by a scratch Vite config outside the repo. Checked in light / dark × `en` / `ar`: computed styles, `Accessibility.getPartialAXTree`, and axe-core (wcag2a/aa, 21, 22aa, best-practice) on the whole page. I stopped my processes by PID afterwards.

| Measured | light · en | light · ar | dark · en | dark · ar | Spec |
|---|---|---|---|---|---|
| Line thickness (`border-width-default` = 1px) | 1px, only border-bottom (horiz.) / border-right (vert.) | 1px, border-bottom / border-**left** (vert., inline-end in RTL) | as light · en | as light · ar | B2 ✅ |
| `subtle` · `default` · `strong` colour | rgb(237) · rgb(219) · rgb(189) | same | rgb(41) · rgb(64) · rgb(84) | same | = `color-border-*` resolved per theme, B3 ✅ |
| Inset `none` · `start` · `both` (400px box) | 0 · margin-left 16 · margin 16/16 | 0 · margin-**right** 16 · 16/16 | as en | as ar | `spacing-xl` = 16px, start flips, B2/B5 ✅ |
| Vertical in a 48px flex row | 1×48, `align-self: stretch`; `both` → margin-block 16, 1×16; `start` → falls back to 0 margin | same, line on the left | same | same | B1/B2 ✅ |
| Label `or` / `أو` | 12px / 16px Inter, weight 400, rgb(112), padding 8/8, container 16px tall, label centred (label centre 216 = box centre) | 12px / 18px IBM Plex Sans Arabic, container 18px | rgb(189) | rgb(189), 18px | `caption-md` per language, `color-text-neutral-muted`, gap `spacing-md`, B2/B3 ✅ |
| Segments | `::before`/`::after` `flex: 1 0 16px`, 1px block-end border in the emphasis colour; label + `inset="both"` → outer margins 16/16 | same | same | same | B2 ✅ |
| Long label in a 200px box | wraps to 3 lines, `text-align: center`, each segment exactly 16px, not truncated | 3 lines, segments 16px | same | same | B2 ✅ |
| Label on vertical | plain `<hr aria-orientation="vertical">`, no text | same | same | same | B1 ✅ |
| `component="li"` without label in a `<ul>` | **23px tall, `display: list-item` with a visible bullet** (`list-style-type: disc`, 22px line box) + 1px line | **25px** (24px line box) | 23px | 25px | B2 ❌ (finding 1) |
| `component="li"` with label | `display: flex`, no marker, 16px | 18px | 16px | 18px | ✅ |

Accessibility tree (all four combinations):
- `<hr>` → `separator`, orientation horizontal, no `aria-orientation` attribute. Vertical → `separator`, orientation vertical.
- Labelled → `<div role="separator" aria-label="or|أو">`, name "or" / "أو", visible text inside.
- `decorative` (plain, labelled, vertical) → `aria-hidden="true"`, ignored, no `aria-label` / `aria-orientation`.
- `component="li"` (plain, and labelled with `decorative={false}`) → `<li role="separator" aria-hidden="true">`, ignored, no `aria-label` / `aria-orientation`. The explicit `undefined` overrides the `aria-orientation` MUI would compute.
- No `tabindex` anywhere.
- axe: **0 violations** in all four; `list`, `listitem`, `aria-allowed-attr`, `aria-allowed-role`, `aria-hidden-focus` and `color-contrast` pass.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 Public API = B1 (names, types, defaults, root table, warnings + fallbacks); no extra MUI props; `component` only `hr` · `li` | ✅ | `Divider.tsx:14-26` props (only B1 names + `className`, `data-*`; `ref` via `forwardRef` `:102`); defaults `:104-110`; root element `:137` (`li` → `li`, labelled → `div`, else `hr`); three warnings + fallbacks `:118-135`; tests *uses the required root and separator semantics*, *warns once for invalid combinations and renders each fallback*; in the browser every fallback renders as specified |
| AC-2 Every B2–B3 value from the listed semantic token / text style; no raw values, no primitives | ⚠️ | `divider.tokens.ts:7-32` = B3 row for row (`cssVars.*`, `biowaveVariants.captionMd`); `Divider.tsx:41-91` uses only the map; test *uses only semantic tokens and logical directional properties*; every browser value above matches its token. **But** for `component="li"` without a label, B2's `border-width-default` thickness and "never adds its own spacing above / below" do not hold (finding 1) |
| AC-3 Logical properties only (incl. label gap); RTL as B5 | ✅ | `Divider.tsx:45-49, 55-63, 74, 82` (`marginInlineStart`, `marginInline`, `marginBlock`, `inlineSize`, `blockSize`, `borderBlockEndWidth`, `borderInlineEndWidth`, `paddingInline`). MUI's physical `borderBottomWidth` / `borderRightWidth` and wrapper `padding-left/right` are overridden (browser: wrapper padding 8/8, vertical line on the inline-end side in both directions); test *keeps start inset at the logical inline start in English and Arabic* |
| AC-4 Semantics per B6; axe clean incl. a list with `li` dividers | ✅ | `Divider.tsx:136, 147-150`; tests *uses the required root and separator semantics*, *hides decorative dividers…*, *renders list dividers as hidden li roots…*, *has no axe violations in both themes and languages*; browser AX tree + axe above |
| AC-5 B9 + C6 tests exist and pass through `renderWithBiowave` at default timeouts; typecheck, test:web, docs:check, sync pass | ⚠️ | Every render uses `renderWithBiowave` (`Divider.test.tsx:9`); no cache or provider, no timeout arguments; checks green (test:web run 1 red under load, runs 2–5 green). Gaps: no test would catch finding 1; the C6 "no physical padding in the **computed** rules" check reads rule text only (finding 2) |
| AC-6 Exported from `src/index.ts`; README row + header Code `Built`; C8 + CHANGELOG filled | ✅ | `src/index.ts:22-29`; `3-web-components/README.md:52` and header Code `Built` (before this review); C8 filled; CHANGELOG `[Added — Web Divider 1.1]` |

#### Rule checks (AGENTS.md §2 + step prompt)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | The `src/` diff touches only the C5 files; contracts, HTML and `index.json` came from the plan step |
| Tokens only — no raw values, no primitives | ✅ | Source lint test passes; no `primitive.*` / `base.*` in the unit |
| RTL logical properties | ✅ | See AC-3; in the browser the start inset and the vertical line flip in Arabic |
| Both themes, both languages — and tested | ✅ | Every layout × emphasis and the label rendered in light/dark × en/ar (*renders every valid layout…*, *centres English and Arabic labels…*); the browser confirms per-theme colours and per-language label metrics |
| WCAG 2.2 AA | ✅ | Not interactive, never focusable; label `color-text-neutral-muted` (B3 pairs); axe 0 violations in jsdom and in Chrome |
| Tests via `renderWithBiowave`, default timeouts | ✅ | No Emotion cache or provider in the test file, no timeout arguments, `vitest.config.ts` untouched |
| Stayed inside the contract (C5 files) | ✅ | Exactly the C5 files |
| `component="li"` always hidden (user-approved) | ✅ | `Divider.tsx:136`; tested with `decorative={false}` |

#### Figma build (Part D)

Skipped: Figma build is `Planned` and `figma` is skipped in `_workflow/config.json`.

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `Divider.tsx:52-91` | `component="li"` **without** a label keeps the browser's `display: list-item` / `list-style-type: disc`. Inside an ordinary `<ul>` (the B7 example) it shows a **bullet** and an empty 22px (en) / 24px (ar) line box above the line, so the divider is 23 / 25px tall and adds its own space. This breaks B2 (thickness `border-width-default`, "never adds its own spacing above / below"). Measured in headless Chrome in all four theme × language combinations. The labelled `li` is fine (`display: flex`). jsdom tests cannot see it | Reset the list-item styling on the root: at least `listStyle: 'none'`, and keep the unlabelled line a block (for example `display: 'block'` when not labelled), so the `li` renders exactly like the `<hr>`: 1px tall, no marker. Add a test that the `li` divider's styled rules contain `list-style: none` (or that the computed `list-style-type` is `none`) in en and ar |
| 2 | 🟢 Nit | `Divider.test.tsx:157-201` | For the Arabic label, C6 asks for "same `padding-inline` on both sides, no physical padding in the computed or source rules". The test checks only the bw- rule text, so it would miss MUI's own `.MuiDivider-wrapper` `padding-left/right: calc(8px * 1.2)` (overridden today) if the override ever broke | Also assert `getComputedStyle(wrapper)` `paddingInlineStart` = `paddingInlineEnd` = `dividerTokens.label.gap` under `locale: 'ar'` |
| 3 | 🟢 Nit | `divider.md` header | The Source code row still says "not built yet (the Executor creates it)", but the code now exists | Link the folder like the other components: [`src/components/divider/`](../../src/components/divider/) |

#### Next step

- Changes requested → Executor (fix round 1): 🔴 #1 and 🟢 #2; append a Fix round entry to C8.
- Planner: 🟢 #3 (header row only, no behaviour change in A–D). Plan is set to `Open` per the workflow rule; set it back to `Finished` and regenerate the contract.

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

1.1 — a horizontal divider can show a short centred label (“or” / “أو”) with `showLabel` + `label`: `caption-md`, `color-text-neutral-muted`, `spacing-md` gap on each side, line segments at least `spacing-xl` long; never on vertical dividers. New web `component` prop (`hr` default, `li` for dividers directly inside a list → `<li role="separator" aria-hidden="true">`). Inset `start` stays `spacing-xl` (the List plan, Day 8, adds its own text-aligned inset). Figma: new `Show label` (BOOLEAN) and `Label` (TEXT) properties; still 18 variants. No breaking change — existing dividers look and behave the same.

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
| 1.1 | 2026-10-23 | New props `showLabel`, `label`, `component` (`hr` · `li`); labelled root `<div role="separator" aria-label>`; `li` root always `aria-hidden`; two new warnings (B1); label tokens (B2–B3), RTL (B5), semantics (B6), tests (B9); Figma `Show label` + `Label` (D3–D4) | No | — (new options default off) |
| 1.1 | 2026-10-24 | Review round 1 Planner finding #3: header Source code row links the built folder [`src/components/divider/`](../../src/components/divider/). Executor findings #1–#2 need no plan change (fixes stated in E2). No spec change; Plan → Finished, web contract regenerated | No | — |
