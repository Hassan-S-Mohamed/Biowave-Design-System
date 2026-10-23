# Chip · شريحة — Web

> **One file for Chip on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web chip`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Chip · شريحة |
| Summary | Holds one short piece of information — an action, a filter, an entered value, a tag or a request status — in a compact shape. |
| Summary (ar) | تعرض معلومة قصيرة واحدة — إجراءً أو عامل تصفية أو قيمة مُدخلة أو وسمًا أو حالة طلب — في شكل مضغوط. |
| Parts | Container · leading icon · check icon · leading avatar · label · remove button · status icon |
| Parts (ar) | الحاوية · أيقونة البداية · أيقونة التحديد · الصورة الرمزية · التسمية · زر الإزالة · أيقونة الحالة |
| Platform | Web · React + MUI |
| Built on | MUI `ButtonBase` (`assist`, `filter`: native `<button>`, ripple off) and a styled `span` (`input`, `tag`, `status`), restyled only from tokens. MUI `Chip` (roadmap base) is not used: its clickable root is a `div role="button"` and its delete icon is not a separate focusable button (C3). Glyphs via the Biowave `Icon`, remove via the Biowave `IconButton`, avatar via the Biowave `Avatar` |
| Import | `import { Chip } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Chip` · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-23 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/chip/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens: every value is an existing semantic token, P-04) |
| Contracts | [`chip-contract.md`](chip-contract.md) · [`figma-chip-contract.md`](figma-chip-contract.md) — generated, never edited |
| Docs page | [`chip.html`](chip.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

A chip is a compact element that holds one short piece of information. Interactive chips let people start a related action (`assist`), narrow a list (`filter`) or see and remove a value they entered (`input`). Static chips label something (`tag`, the Tag / Label of the legacy Figma pages) or show where a request stands (`status`, request status). Tag, Label and Status are variants of Chip, not separate components (decision P-05), so every chip shares one shape, one size scale and one set of rules.

### A2 Anatomy

```
Interactive (assist · filter · input)               radius-md, outlined
①┌──────────────────────────┐   ①┌──────────────────────────┐
 │ ②[◆]  ⑤Add note          │    │ ③[✓]  ⑤Remote            │   filter, selected
 └──────────────────────────┘    └──────────────────────────┘
①┌──────────────────────────────┐
 │ ④(SA) ⑤Sara Ali      ⑥[×]    │                               input
 └──────────────────────────────┘

Static (tag · status)                                radius-full, filled
①╭────────────────────╮   ①╭──────────────────────╮
 │ ②[◆] ⑤Full time    │    │ ⑦[◆] ⑤{state name}   │            status
 ╰────────────────────╯    ╰──────────────────────╯
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | The chip surface and, for `assist` and `filter`, the whole interaction target |
| 2 | `leading-icon` | No | Material Symbols glyph that helps recognise the label; decorative |
| 3 | `check-icon` | Auto | Shown at the start of a selected `filter` chip; replaces the leading icon while selected |
| 4 | `leading-avatar` | No | Avatar of the person or thing an `input` chip stands for; decorative because the label names it |
| 5 | `label` | Yes | The short text of the chip; one line |
| 6 | `remove-button` | Auto | Icon button at the end of an `input` chip that removes the value; its own keyboard stop |
| 7 | `status-icon` | Auto | Fixed glyph of a `status` chip, chosen by the state; never set by hand |

### A3 Usage

**When to use**
- `assist` — a smart or related action next to content, such as “Add note” under a request
- `filter` — narrowing a list or table by one or more independent criteria
- `input` — values a person entered or picked: people, keywords, file types, before they submit
- `tag` — a read-only attribute of a record: contract type, department, skill
- `status` — the current state of a request, always with its status icon and name

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| The main action of a page or dialog | Button |
| Choosing exactly one option from a short set | Segmented button or Radio |
| Turning one setting on or off | Switch or Checkbox |
| A count or a dot on another element | Badge |
| Showing a person without a value to remove | Avatar |
| A long list of options to choose from | Select or Autocomplete |

### A4 Options

#### 4.1 `variant`

| Value | Looks like | Pick it when |
|---|---|---|
| `assist` | `┌ [◆] Add note ┐` outlined | People start an action that relates to the content around it. Without an icon it also covers the Material suggestion chip |
| `filter` | `┌ Remote ┐` → `┌ [✓] Remote ┐` tinted when selected | People switch a filter on or off; several filters in a row can be on at once |
| `input` | `┌ (SA) Sara Ali [×] ┐` outlined | The chip stands for a value the person entered and can remove |
| `tag` | `╭ Full time ╮` filled, no border | A read-only attribute; not interactive |
| `status` | `╭ [◆] {state} ╮` filled, no border | The state of a request; the state picks the colour and the icon |

Interactive chips have rounded corners and an outline; static chips are fully rounded and filled, so a static chip never looks clickable.

#### 4.2 `size`

| Value | Pick it when |
|---|---|
| `sm` | Default on web: filter bars, table cells, forms |
| `md` | Default on tablet and mobile; prominent filter rows on web |

Chips in the same row use the same size.

#### 4.3 `color` (`tag` only)

| Value | Pick it when |
|---|---|
| `neutral` | Default — most attributes |
| `brand` · `secondary` | To set one group of attributes apart from another |
| `success` · `warning` · `error` · `info` | The attribute is a status word that is not a request status (for example “Overdue”); the label must say it — colour is never the only signal |

#### 4.4 Request status (`status` only)

A `status` chip shows one of the **7 request states**, each with its own status icon and colour. The state names and icons come from the request flow of the legacy Figma pages; they are not written in the design system yet, so this table is filled in plan 1.1 once confirmed (see C2).

| State | Status icon | Colour |
|---|---|---|
| 7 request states — names, icons and colours to be confirmed | — | — |

#### 4.5 Leading content: `icon` and `avatar`

- `icon` — a leading Material Symbols glyph for `assist`, `filter`, `input` and `tag`. Add it only when it helps people scan; never as decoration on every chip in a row.
- `avatar` — a leading avatar for `input` chips that stand for a person or a team. It shows the photo, else the initials, else a person glyph (Avatar rules).
- A `filter` chip shows the check icon while selected, in place of its leading icon.

#### 4.6 `selected` (`filter` only)

| Value | Looks like | Meaning |
|---|---|---|
| off | Outlined, no check | The filter is not applied |
| on | Tinted, check icon, coloured label | The filter is applied |

#### 4.7 Remove (`input` only)

Every `input` chip has a remove button at its end. It removes this one value and has its own name (“Remove Sara Ali”). An `input` chip that cannot be removed is a `tag`.

#### 4.8 `disabled` (interactive only)

`assist`, `filter` and `input` can be disabled when the action or value cannot change right now. Static chips are never disabled.

**Combination rules**
- `icon` is not used on `status` chips — the state sets the icon
- `avatar` is for `input` chips only; one leading item per chip — `avatar` or `icon`, never both
- `color` is for `tag` chips only; `status` chips get their colour from the state
- `selected` is for `filter` chips only
- A remove button is for `input` chips only
- `disabled` is for interactive chips only
- A filter row allows several selected chips; when exactly one option must be chosen use Segmented button or Radio

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | Ready | Outlined chip (interactive) or filled chip (static) |
| Hover | Pointer over an `assist` or `filter` chip, or over the remove button (pointer devices only) | A light state layer over the chip or the remove button |
| Pressed | Pointer or touch down | A stronger state layer |
| Focus | Keyboard focus on an `assist` or `filter` chip or on a remove button | Focus ring (see [a11y](../../../2-foundations/guidelines/a11y.md)) around the focused element |
| Selected | A `filter` chip is on | Tinted surface, coloured outline and label, check icon at the start |
| Disabled | An interactive chip cannot be used now | Muted outline, label and icons; removed from the tab order; a disabled `input` chip's remove button is disabled too |

Static chips (`tag`, `status`) have only the Default state.

**Behavior rules**
- One line only: a long label is truncated with an ellipsis when the chip is wider than its container; the full label is always the accessible name
- Long Arabic labels (+20–30% width) widen the chip; never give chips a fixed width sized for English
- Chips in a row wrap onto the next line with the same gap between rows and columns
- Activating an `assist` chip runs its action once; it does not stay selected
- Activating a `filter` chip toggles it; the list updates without moving the chip
- Activating the remove button removes only that value; it never triggers the chip's other action. The owner of the chip list then moves focus to the next chip's remove button, else the previous one, else the related input, so keyboard focus is never lost
- A selected filter keeps its place in the row; chips are not reordered on selection

### A6 Content

General rules: [content.md](../../../2-foundations/guidelines/content.md). Chip-specific rules:

| Element | Rule | Max length |
|---|---|---|
| `label` · `assist` | Verb-first, says the outcome | 3 words |
| `label` · `filter` | Noun or adjective naming the criterion; no verb, no “Filter by” | 3 words |
| `label` · `input` | The value as entered or the person's display name | 24 characters |
| `label` · `tag` | Noun phrase for the attribute | 2 words |
| `label` · `status` | The fixed state name from 4.4 — never a custom word | — |
| `remove-button` name | “Remove {label}” / “إزالة {label}” | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Add note | إضافة ملاحظة | Click here (hides the outcome) |
| Remote · Night shift · This week | عن بُعد · وردية ليلية · هذا الأسبوع | Filter by remote employees in Riyadh |
| Sara Ali | سارة علي | sara.ali@company.com (use the display name) |
| Full time · Contractor | دوام كامل · متعاقد | FT (unexplained abbreviation) |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Use filter chips for independent on/off filters | Use filter chips for one required choice — use Segmented button or Radio |
| Keep every label short and on one line | Put sentences or two-line text in a chip |
| Use `tag` and `status` for read-only information | Make a static chip look or behave like a button |
| Pair every status colour with its icon and name | Show status by colour alone |
| Give every removable value its own named remove button | Remove a value when the whole chip is clicked |
| Keep chips in a row the same size | Mix `sm` and `md` chips in one row |

### A8 Platform notes — Web

```
Filter bar above a table (chips wrap; gap spacing-sm)
┌──────────────────────────────────────────────────────────────────┐
│ [✓ Remote] [Night shift] [This week] [Contractor]                │
│ [On site]                                                        │
└──────────────────────────────────────────────────────────────────┘
  Tab moves chip to chip; Enter or Space toggles; hover shows a state layer
```

| | Web |
|---|---|
| Available | ✓ |
| Default size | `sm` |
| Sizes | `sm` · `md` |
| Layout | Hugs its content; rows of chips wrap in the parent's flex layout |
| Interaction | Hover + click + keyboard (Tab, Enter, Space; Backspace or Delete on a focused remove button) |
| Touch target | Every chip and remove button ≥ `target-min` (24) |
| Not supported | Drag to reorder, chip menus, links (`href`) |

### A9 Accessibility (design)

- Every interactive chip and every remove button can be reached and used with the keyboard and with a screen reader; static chips are read as text and are not focus stops
- A `filter` chip says whether it is on or off; selection is shown by the check icon and the tinted surface, never colour alone
- A `status` chip always shows its icon and its state name; colour supports the name and never replaces it
- The remove button has a name that includes the chip label (“Remove Sara Ali”), so it makes sense out of context
- After a value is removed, focus moves to a neighbouring chip or the related input — the owner of the list does this
- A row of filter chips is announced as one group with a name (“Filters”)
- Leading icons and avatars are decorative: the label already names the chip
- Labels stay readable at 200% zoom; truncated labels keep the full text as their accessible name
- Every target meets `target-min`; focus uses the standard ring (2px `color-border-focus`, 2px offset)

### A10 Related components

- Button — the main actions of a page; a chip only supports content
- Segmented button — one choice from a short connected set (Day 8)
- Badge — a count or a dot on another element, not a label of its own
- Avatar — the person on their own; `input` chips show an Avatar at their start
- Autocomplete — picks several values and shows them as `input` chips (Day 13)
- Text field — the field that `input` chips usually belong to

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API

#### `Chip`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `assist` · `filter` · `input` · `tag` · `status` | — | ✓ | A4.1 |
| `label` | string | | | ✓ | Visible text and accessible name; one line (B2) |
| `size` | enum | `sm` · `md` | `sm` | | A4.2 |
| `icon` | `IconName` | Material Symbols name (Icon B1) | — | | A4.5 `leading-icon` · `assist`, `filter`, `input`, `tag` |
| `avatar` | `ChipAvatar` | `{ name?: string; src?: string; initials?: string; icon?: IconName; color?: AvatarColor }` | — | | A4.5 `leading-avatar` · `input` only; rendered as a decorative Biowave `Avatar` (B2) |
| `color` | enum | `neutral` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | `neutral` | | A4.3 · `tag` only |
| `status` | enum | the 7 request states of A4.4 — values added in plan 1.1 | — | ✓ for `status` | A4.4 · `status` only; not built in 1.0 (C2) |
| `selected` | boolean | | `false` | | A4.6 · `filter` only; controlled |
| `onSelectedChange` | `(selected: boolean) => void` | | | ✓ for `filter` | Called with the new value on click, Enter or Space |
| `onClick` | `(event) => void` | | | ✓ for `assist` | Runs the action |
| `onRemove` | `() => void` | | | ✓ for `input` | A4.7 — called by the remove button (click, Enter, Space, Backspace, Delete) |
| `removeLabel` | string | | locale: “Remove {label}” / “إزالة {label}” | | Accessible name of the remove button |
| `disabled` | boolean | | `false` | | A4.8 · `assist`, `filter`, `input` only |
| `className` · `data-*` · `aria-*` · `ref` | | | | | Forwarded to the `container` (`<button>` for `assist`/`filter`, `<span>` otherwise) |

Exported types: `ChipProps`, `ChipVariant`, `ChipSize`, `ChipColor`, `ChipAvatar`.

Platform naming notes: web `onClick` = Flutter `onPressed`; web `onSelectedChange` = Flutter `onSelected`; web `onRemove` = Flutter `onRemoved`; web `disabled` = Flutter callback `null`. Flutter uses one named constructor per `variant` (`BwChip.assist` …).

**Invalid combinations** (`warnOnce` in development; the chip still renders as described):

| Combination | Fallback |
|---|---|
| `assist` without `onClick` | Renders disabled |
| `filter` without `onSelectedChange` | Renders disabled |
| `input` without `onRemove` | Renders without `remove-button` |
| `onClick` on a variant other than `assist` | Ignored |
| `selected` or `onSelectedChange` on a variant other than `filter` | Ignored |
| `onRemove` or `removeLabel` on a variant other than `input` | Ignored |
| `avatar` on a variant other than `input` | Ignored |
| `avatar` and `icon` together | `icon` ignored |
| `color` on a variant other than `tag` | Ignored |
| `icon` on `status` | Ignored (the state sets the icon) |
| `disabled` on `tag` or `status` | Ignored |
| `variant="status"` in 1.0 | Renders as `tag` with `color="neutral"`; warns “status states are not defined yet” (C2) |
| Empty `label` (blank) | Renders; warns “chips need a label” |

### B2 Dimensions

```
assist / filter, sm                         input with avatar and remove, sm
   pad-inline     gap        pad-inline       spacing-xs           spacing-xs
   ├──┤          ├─┤        ├──┤             ├─┤                   ├─┤
┬  ┌──────────────────────────────┐       ┬  ┌─────────────────────────────────┐
│  │  [◆]  Add note               │       │  │ (SA)  Sara Ali            [×]   │
┴  └──────────────────────────────┘       ┴  └─────────────────────────────────┘
size-control-height-sm   radius-md         avatar box size-icon-lg · remove box size-icon-lg
border-width-default                      

tag / status, sm: same height, padding and gap; radius-full; no border
```

| Part | Property | `sm` | `md` |
|---|---|---|---|
| `container` | block-size | `size-control-height-sm` | `size-control-height-md` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` |
| `container` | padding-inline-start with `leading-avatar` | `spacing-xs` | `spacing-xs` |
| `container` | padding-inline-end with `remove-button` | `spacing-xs` | `spacing-xs` |
| `container` | gap between parts | `spacing-control-gap-sm` | `spacing-control-gap-md` |
| `container` | radius · interactive | `radius-md` | `radius-md` |
| `container` | radius · `tag`, `status` | `radius-full` | `radius-full` |
| `container` | border · interactive | `border-width-default` | `border-width-default` |
| `container` | border · `tag`, `status` | none | none |
| `leading-icon` · `check-icon` · `status-icon` | size | `size-icon-sm` | `size-icon-md` |
| `leading-avatar` | box (inline = block) | `size-icon-lg` (Avatar `xs`, see C2) | `size-control-height-sm` (Avatar `sm`) |
| `remove-button` | box (inline = block) | `size-icon-lg` | `size-control-height-sm` |
| `remove-button` | glyph | `size-icon-sm` | `size-icon-md` |
| `remove-button` | radius | `radius-full` | `radius-full` |
| `remove-button` | pointer target | ≥ `target-min`, extended invisibly around the box; never changes layout | same |
| `label` | text style | `label-md` | `label-lg` |
| chip row (consumer layout) | gap, inline and block | `spacing-sm` | `spacing-sm` |

Layout rules:
- `container`: `display: inline-flex; align-items: center; flex: none; max-inline-size: 100%; min-inline-size: 0; vertical-align: middle; box-sizing: border-box`; the block-size includes the border
- `label`: one line, `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-inline-size: 0`; the chip shrinks only when its parent is narrower than its content
- `leading-avatar` and `remove-button` are inset `spacing-xs` from the border at both sizes, so `spacing-xs` + box + `spacing-xs` = the chip height
- The chip never grows in block-size with content; a filter chip keeps the same inline size order in a row when selected (the check replaces the leading icon; a chip without a leading icon grows by icon + gap)
- Rows of chips are laid out by the consumer (`display: flex; flex-wrap: wrap; gap: spacing-sm`); there is no chip-group component in 1.0

### B3 Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `chip.tokens.json` is not needed.

#### 3.1 Interactive — `assist`, `filter` (unselected), `input`

| State | `container` background | `container` border | State layer | `label` | `leading-icon` |
|---|---|---|---|---|---|
| Default | `color-background-transparent` | `color-border-default` | — | `color-text-neutral-default` | `color-icon-neutral-subtle` |
| Hover | same | same | `color-overlay-hover` | same | same |
| Pressed | same | same | `color-overlay-pressed` | same | same |
| Disabled | same | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

`input` chips have no state layer on the container (the container is not interactive); Hover and Pressed apply to the `remove-button` only.

#### 3.2 `filter` selected

| State | `container` background | `container` border | State layer | `label` | `check-icon` |
|---|---|---|---|---|---|
| Default | `color-background-brand-subtle` | `color-border-brand` | — | `color-text-role-brand` | `color-icon-role-brand` |
| Hover | same | same | `color-overlay-hover` | same | same |
| Pressed | same | same | `color-overlay-pressed` | same | same |
| Disabled | `color-background-neutral-disabled` | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

#### 3.3 `remove-button` and `leading-avatar`

- `remove-button`: the Biowave Icon button `text` · `neutral` tokens (Icon button B3) — icon, state layer, focus ring and disabled — with the B2 box and glyph
- `leading-avatar`: Avatar B3 tokens for its `color` (default `neutral`); unchanged when the chip is disabled

#### 3.4 `tag` by `color`

| `color` | `container` background | `label` | `leading-icon` |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` | `color-text-neutral-default` | `color-icon-neutral-default` |
| `brand` | `color-background-brand-subtle` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | `color-text-role-secondary` | `color-icon-role-secondary` |
| `success` | `color-background-success-subtle` | `color-text-role-success` | `color-icon-role-success` |
| `warning` | `color-background-warning-subtle` | `color-text-role-warning` | `color-icon-role-warning` |
| `error` | `color-background-error-subtle` | `color-text-role-error` | `color-icon-role-error` |
| `info` | `color-background-info-subtle` | `color-text-role-info` | `color-icon-role-info` |

#### 3.5 `status`

Each of the 7 request states uses one row of 3.4 for its colours plus its own `status-icon` glyph. The state → colour → icon map is added in plan 1.1 (A4.4, C2).

#### 3.6 Focus

| Part | Property | Token |
|---|---|---|
| `focus-ring` (`assist`, `filter` container; `remove-button`) | color | `color-border-focus` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` |

The state layer is a second fill painted above the container fill (`background-image: linear-gradient(var(--bw-color-overlay-hover), var(--bw-color-overlay-hover))`), as in Button B3. Every text pair is in the Foundations contrast set (`color-text-role-*` on `color-background-*-subtle`, `color-text-neutral-default` on surfaces).

Dark theme: same tokens (values switch automatically). No exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter (chip or remove button) | state layer | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down | state layer | `motion-duration-sm` | `motion-easing-standard` |
| Unselected ↔ Selected (`filter`) | click / Enter / Space | background, border, label colour; check icon fades in / out in place of the leading icon | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus | focus ring | `motion-duration-instant` | — |
| Enabled ↔ Disabled | prop change | all colours | `motion-duration-instant` | — |

A removed `input` chip leaves without an exit animation in 1.0 (the owner removes it). Reduced motion: durations resolve to instant through Foundations; the check icon swaps without a fade.

### B5 RTL

```
LTR  │ [✓] Remote │   │ (SA) Sara Ali   [×] │   ╭ [◆] Full time ╮
RTL  │ عن بُعد [✓] │   │ [×]   سارة علي (س) │   ╭ دوام كامل [◆] ╮
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (logical properties, provider direction) |
| `leading-icon` · `check-icon` · `status-icon` · `leading-avatar` | Move to inline start; glyphs never mirror (the check mark and status glyphs are not directional) |
| `remove-button` | Moves to inline end; the `close` glyph does not mirror |
| `label` | Follows the document direction; a Latin value inside an Arabic UI is bidi-isolated (`unicode-bidi: isolate`) |

No physical left/right properties are permitted.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `assist`: native `<button type="button">`. `filter`: native `<button type="button" aria-pressed="true|false">`. `input`: `<span>` container with the visible label and a `remove-button` `<button>`. `tag`, `status`: `<span>` text, no role, not focusable |
| Accessible name | From `label` (the visible text). Leading icon, check icon, status icon and avatar are `aria-hidden` (Avatar rendered with `decorative`) |
| Remove button | Biowave `IconButton` (`text`, `neutral`) with `aria-label` = `removeLabel`; `disabled` follows the chip; Backspace and Delete on the focused button call `onRemove` like Enter / Space |
| Disabled | Native `disabled` on the chip button and on the remove button (removed from the tab order) |
| Filter group | The consumer wraps a filter row in `role="group"` with `aria-label` (e.g. “Filters” / “عوامل التصفية”); B7 shows it |
| Focus | 2px `color-border-focus`, `border-focus-offset` on `:focus-visible` of the chip button and the remove button |
| Target size | Chip ≥ `target-min`; remove button pointer target ≥ `target-min` through an invisible `::before`, never changing layout |
| Screen reader output | assist: “Add note, button” · filter: “Remote, toggle button, pressed” · input: “Sara Ali” then “Remove Sara Ali, button” · tag: “Full time” |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to the next / previous `assist` or `filter` chip or remove button; static chips are skipped |
| Enter / Space | `assist`: runs the action · `filter`: toggles · remove button: removes |
| Backspace / Delete | Focused remove button: removes |

### B7 Examples

```tsx
import { Chip } from '@biowave/web';

<Chip variant="assist" icon="add" label="Add note" onClick={addNote} />

<div role="group" aria-label="Filters">
  <Chip variant="filter" label="Remote" selected={remote} onSelectedChange={setRemote} />
  <Chip variant="filter" label="Night shift" selected={night} onSelectedChange={setNight} />
</div>

<Chip variant="input" label="Sara Ali" avatar={{ name: 'Sara Ali', src: sara.photo }}
  onRemove={() => removePerson(sara.id)} />

<Chip variant="tag" color="info" label="Contractor" />

// Arabic (direction and the remove label come from the provider)
<Chip variant="input" label="سارة علي" avatar={{ name: 'سارة علي' }} onRemove={remove} />
<Chip variant="tag" label="دوام كامل" />
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every variant (`assist`, `filter` unselected / selected, `input`, `tag` × 7 colours) at `sm` and `md`, in light + dark and en + ar
- [ ] Block-size, padding, gap, radius and border per B2 for each size; avatar and remove boxes inset `spacing-xs`
- [ ] Every B3 token by state: Default, Hover, Pressed and Disabled asserted on their selectors (not only present in CSS); selected filter; tag colours
- [ ] `filter`: click, Enter and Space call `onSelectedChange(!selected)`; `aria-pressed` follows `selected`; the check icon replaces the leading icon
- [ ] `assist`: click, Enter and Space call `onClick` once
- [ ] `input`: remove button named `removeLabel` (default EN and AR from the locale); click, Enter, Space, Backspace and Delete call `onRemove`; removing never calls another handler
- [ ] Disabled chips and their remove buttons are skipped by Tab and do not call handlers
- [ ] Static chips are not focusable and have no role
- [ ] Long labels truncate with an ellipsis in a narrow parent; the accessible name is the full label
- [ ] RTL mirrors layout; check, close and status glyphs do not mirror
- [ ] Every invalid combination in B1 warns once and uses its fallback
- [ ] axe has no violations in both themes and languages
- [ ] Source contains no raw hex, px, ms or font names

---

## C · Code plan

> How to build Part B in code. The generated `chip-contract.md` is the only component file the Code Executor reads.

| Field | Value |
|---|---|
| Component | Chip |
| Platform | Web (React + MUI) |
| Plan version | 1.0 · 2026-10-23 |

### C1 Goal

`import { Chip } from '@biowave/web'` renders the `assist`, `filter`, `input` and `tag` variants of B1 from semantic tokens only, with native button semantics, a separate named remove button, English/Arabic direction, light/dark themes and complete tests.

### C2 Scope

**Depends on:** the Biowave `Icon` and `IconButton` (built, Approved) and the Biowave `Avatar` (plan Finished, not on `main` yet — build Chip after Avatar is merged). The `sm` leading avatar needs an Avatar `xs` size (box `size-icon-lg`); Avatar 1.0 has `sm` · `md` · `lg` · `xl` only. Until Avatar has `xs`, the one case `size="sm"` + `avatar` is blocked: build everything else and report “blocked — Avatar xs” in C8. Never restyle Avatar internals from Chip.

**In scope**
- [ ] B1 API for `assist`, `filter`, `input`, `tag`; B2 dimensions; B3 tokens; B4 transitions; B5 RTL; B6 accessibility; B9 tests
- [ ] The `variant="status"` fallback and warning from B1

**Out of scope (do not build)**
- The `status` variant's 7 states, icons and colours — not written in the design system yet; added in plan 1.1
- A chip-group component, single-select behaviour, chip menus, drag to reorder, links (`href`), removal animation
- Focus management after removal (the owner of the list does it; Autocomplete on Day 13)

### C3 Approach

- **Base:** `assist` and `filter` render MUI `ButtonBase` (`component="button"`, `type="button"`, `disableRipple`, `focusRipple={false}`); `input`, `tag` and `status` render a styled `span`. MUI `Chip` is not used: its clickable root is `div role="button"` and its delete icon is not a separate focusable button, which breaks B6
- **Token map:** `chip.tokens.ts` exports typed size, state and colour maps using `cssVars.*` (B2–B3); styling reads only this map
- **Leading item:** `<Icon name={icon} />` without `size`; the container sets the icon `font-size` from the size map (Icon B1). `filter` + `selected` renders `<Icon name="check" />` instead. `leading-avatar` = `<Avatar {...avatar} size="sm" decorative />` at `md`, `size="xs"` at `sm` once Avatar has it (C2)
- **Remove button:** the Biowave `IconButton` (`variant="text"`, `color="neutral"`, `size="sm"`, `disabled={disabled}`, `aria-label={removeLabel}`, icon `<Icon name="close" />`) with its box set to the B2 remove box through a scoped class and a `::before` pointer target ≥ `target-min`, as Text field's `FieldAction` does. `onKeyDown` maps Backspace and Delete to `onRemove`
- **State layer:** `background-image: linear-gradient(...)` from `color-overlay-hover` / `color-overlay-pressed` on `:hover` / `:active` of the chip button only; filled tag colours never use it
- **Focus:** `:focus-visible` outline `border-width-focus` `color-border-focus`, offset `border-focus-offset`, on the chip button; the remove button keeps Icon button's ring
- **Locale:** `removeLabel` default from the provider locale (“Remove {label}” / “إزالة {label}”)
- **Warnings:** the shared `warnOnce` (`src/internal/warnOnce.ts`) for every B1 invalid combination; never throw
- **Icons (D-18):** Biowave `Icon` only (`check`, `close`, consumer glyphs); never MUI `Icon` or `@mui/icons-material`

**Icons used:** `check` · `close`

### C4 Token gaps

None. Every value is an existing semantic token; no `chip.tokens.json` (P-04). Avatar `xs` is an Avatar plan change, not a token gap (C2).

### C5 Files to create / change

```
3-web-components/src/components/chip/Chip.tsx
3-web-components/src/components/chip/chip.tokens.ts
3-web-components/src/components/chip/Chip.test.tsx
3-web-components/src/components/chip/index.ts
3-web-components/src/index.ts
3-web-components/components/chip/chip.md          (header Code status + C8 only)
3-web-components/README.md
CHANGELOG.md
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Render every test through the shared `renderWithBiowave` (`src/test/render.tsx`) with its `theme` and `locale` options; no local providers or Emotion caches
- [ ] Default Vitest timeouts only — no per-test or per-file timeout overrides
- [ ] Token-map test: every entry of `chip.tokens.ts` names the B2–B3 token
- [ ] Hover, pressed and disabled colours read with `getComputedStyle` on the element, not from the style source
- [ ] `variant="status"` renders as a neutral tag and warns once

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings and fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token through `cssVars`; no raw values, no primitives
- [ ] AC-3 Every transition in B4 implemented; reduced motion respected
- [ ] AC-4 RTL behaves as B5; semantics, keyboard and focus as B6
- [ ] AC-5 B9 and C6 tests exist and pass with `npm run typecheck` and `npm run test:web` at default timeouts
- [ ] AC-6 Exported from `src/index.ts` with its types; header and section README status are `Built`
- [ ] AC-7 Remove button is the Biowave `IconButton`, glyphs are the Biowave `Icon`, avatar is the Biowave `Avatar` — no restyled MUI copies, no MUI `Chip`
- [ ] AC-8 `tag` and `status` chips are not focusable and expose no role
- [ ] AC-9 `npm run sync` and `npm run docs:check` pass

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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-chip-contract.md`.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Chip` › sections `Chip` and `Chip — Documentation` |
| Mode | Create new. Legacy Chips / Labels / Tags pages stay read-only in Foundations until approval |
| Plan version | 1.0 · 2026-10-23 |

### D1 Rules for this build

0. No component tokens for Chip (P-04): bind layers directly to the Foundations semantic variables (contract §3). Never create variables or styles by hand
1. Every fill, stroke, radius, padding, gap, height and icon size is bound to a variable; text uses published text styles; focus uses `Focus/Ring`
2. Never bind primitives or deprecated variables
3. Layer names equal the A2 part names in kebab-case
4. Auto layout on every frame; no absolute positioning except the hidden pointer-target overlay of `remove-button` on doc page 09
5. Icons, the remove Icon button and the Avatar are library or in-file instances, never detached

### D2 Component structure

```
❖ Chip            Variant = Assist · Filter · Input (interactive)
❖ Tag chip        static `tag` variant, one variant per colour
❖ Status chip     static `status` variant — built in plan 1.1 (A4.4)
  └─ ◇ .Chip/Leading    private base: leading-icon · check-icon · leading-avatar slot
```

All three sets are the one code component `Chip`; the split only keeps Figma variant axes valid.

### D3 Layer tree and auto layout

```
Chip                      ↔ horizontal · gap {B2 gap} · pad-inline {B2} · height fixed {B2} · width hug
│                           radius {B2 interactive} · stroke {B3} border-width-default
├── leading-icon          ◇ Icon · size {B2} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Icon`
├── check-icon            ◇ Icon `check` · visible when Selected=True (Filter)
├── leading-avatar        ◇ Avatar · size {B2} · BOOLEAN `Avatar` (Input) · pad-inline-start spacing-xs
├── label                 T label-md / label-lg · TEXT `Label` · width hug · truncate: yes
└── remove-button         ◇ Icon button (text, neutral) · box {B2} · Input only · pad-inline-end spacing-xs

Tag chip                  same tree without check-icon, leading-avatar, remove-button · radius-full · no stroke
```

**Icons used:** `check` (check-icon) · `close` (remove-button) · `add` (default `Icon` swap)

```
┌──────────────────────────┐   ╭──────────────────╮
│  [◆]  Label           [×]│   │ [◆] Label        │
└──────────────────────────┘   ╰──────────────────╯
   ①     ⑤                ⑥      ②   ⑤
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Assist` · `Filter` · `Input` | `Assist` | `variant` | `'assist'` · `'filter'` · `'input'` |
| `Color` (Tag chip) | VARIANT | `Neutral` · `Brand` · `Secondary` · `Success` · `Warning` · `Error` · `Info` | `Neutral` | `color` (with `variant="tag"`) | lower-case value |
| `Size` | VARIANT | `SM` · `MD` | `SM` | `size` | `'sm'` · `'md'` |
| `State` | VARIANT | `Default` · `Hover` · `Pressed` · `Focus` · `Disabled` | `Default` | `disabled` | Disabled maps to the prop; others are interaction states |
| `Selected` | VARIANT | `False` · `True` | `False` | `selected` | Filter only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Provider locale controls code |
| `Label` | TEXT | | `Add note` / `إضافة ملاحظة` | `label` | |
| `Leading icon` | BOOLEAN | | `false` | `icon` | present / absent |
| `Icon` | INSTANCE_SWAP | Material Symbols, Style=Rounded | `add` | `icon` | glyph name |
| `Avatar` | BOOLEAN | | `false` | `avatar` | Input only |

### D5 Variants to generate

- `Chip`: Assist = 2 sizes × 5 states × 2 languages = 20 · Filter = 2 × 5 × 2 selected × 2 = 40 · Input = 2 × 3 states (`Default`, `Focus` on the remove button, `Disabled`) × 2 = 12 → **72 variants**
- `Tag chip`: 7 colours × 2 sizes × 2 languages = **28 variants** (no State axis)
- `Status chip`: not built in 1.0 (A4.4)
- Grid: rows = Variant × Size, columns = State × Selected; gap `spacing-xl`

### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · B4 |
| While pressing | Hover → Pressed | Smart animate · B4 |
| On click (Filter) | Selected False ↔ True | Smart animate · B4 |

Focus and Disabled have no prototype interaction.

### D7 RTL

Method: `Language=AR` variants. Reverse auto-layout order, use Arabic sample copy from A6, keep `check`, `close` and status glyphs unmirrored.

```
EN  │ (SA) Sara Ali   [×] │
AR  │ [×]   سارة علي (س) │
```

### D8 Documentation pages

Build the standard pages from the Doc Kit in section `Chip — Documentation`, frames `Chip / 00 Component sheet` through `Chip / 11 Changelog` (skip page 10 for version 1.0). If the Doc Kit is unavailable, finish D2–D7 and report Phase 2 as blocked.

Page notes:
- 00 shows the `Chip` and `Tag chip` sets
- 03 shows each variant, both sizes, tag colours, leading icon and avatar
- 04 shows the interactive state sequence plus filter selection
- 05 shows a filter row in a table header and input chips under a field
- 09 shows the remove button name, the filter group label and the `target-min` overlay

Component description: “Holds one short action, filter, entered value, tag or request status. Spec: 3-web-components/components/chip/chip.md”.

### D9 Code Connect

- File: `3-web-components/src/components/chip/Chip.figma.tsx`
- Mapping: D4 table (`Tag chip` maps to `variant="tag"`). Publish after code and Figma are both `Approved`

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 `Chip` and `Tag chip` sets plus `.Chip/Leading` match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant counts are 72 and 28; no invalid combinations
- [ ] F-AC-4 Zero raw values: every fill, stroke, radius, spacing, size, text and effect bound (QA lint report attached)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 RTL variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Interactions per D6; component description filled
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component sets `{id}` · docs section `{id}` |
| QA report | unbound values: — · contrast: — |

**Deviations**
- none

**Questions for the Planner**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed yet | not reviewed yet |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Initial version

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial Web Chip plan: `assist`, `filter`, `input`, `tag`; `status` variant defined, its 7 states pending (A4.4) | No | — |
