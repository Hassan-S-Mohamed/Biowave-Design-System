<!-- GENERATED from chip.md @ cfc790ac3037595f — do not edit; change the source and run: npm run contract -- web chip -->
# Chip · شريحة — Web — code contract

> **Everything you need to build Chip on Web, and nothing else.** Read this file only. Generated from [`chip.md`](chip.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](chip.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Chip · شريحة |
| Platform | Web · React + MUI |
| Built on | MUI `ButtonBase` (`assist`, `filter`: native `<button>`, ripple off) and a styled `span` (`input`, `tag`, `status`), restyled only from tokens. MUI `Chip` (roadmap base) is not used: its clickable root is a `div role="button"` and its delete icon is not a separate focusable button (C3). Glyphs via the Biowave `Icon`, remove via the Biowave `IconButton`, avatar via the Biowave `Avatar` |
| Import | `import { Chip } from '@biowave/web'` |
| Version | 1.0 · 2026-10-23 |
| Source code | `src/components/chip/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`chip.md`](chip.md) @ `cfc790ac3037595f` |

## 1. What it is

A chip is a compact element that holds one short piece of information. Interactive chips let people start a related action (`assist`), narrow a list (`filter`) or see and remove a value they entered (`input`). Static chips label something (`tag`, the Tag / Label of the legacy Figma pages) or show where a request stands (`status`, request status). Tag, Label and Status are variants of Chip, not separate components (decision P-05), so every chip shares one shape, one size scale and one set of rules.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | The chip surface and, for `assist` and `filter`, the whole interaction target |
| 2 | `leading-icon` | No | Material Symbols glyph that helps recognise the label; decorative |
| 3 | `check-icon` | Auto | Shown at the start of a selected `filter` chip; replaces the leading icon while selected |
| 4 | `leading-avatar` | No | Avatar of the person or thing an `input` chip stands for; decorative because the label names it |
| 5 | `label` | Yes | The short text of the chip; one line |
| 6 | `remove-button` | Auto | Icon button at the end of an `input` chip that removes the value; its own keyboard stop |
| 7 | `status-icon` | Auto | Fixed glyph of a `status` chip, chosen by the state; never set by hand |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `size`
- 4.3 `color` (`tag` only)
- 4.4 Request status (`status` only)
- 4.5 Leading content: `icon` and `avatar`
- 4.6 `selected` (`filter` only)
- 4.7 Remove (`input` only)
- 4.8 `disabled` (interactive only)

## 2. API

### `Chip`

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

## 3. Dimensions

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

## 4. Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `chip.tokens.json` is not needed.

### 3.1 Interactive — `assist`, `filter` (unselected), `input`

| State | `container` background | `container` border | State layer | `label` | `leading-icon` |
|---|---|---|---|---|---|
| Default | `color-background-transparent` | `color-border-default` | — | `color-text-neutral-default` | `color-icon-neutral-subtle` |
| Hover | same | same | `color-overlay-hover` | same | same |
| Pressed | same | same | `color-overlay-pressed` | same | same |
| Disabled | same | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

`input` chips have no state layer on the container (the container is not interactive); Hover and Pressed apply to the `remove-button` only.

### 3.2 `filter` selected

| State | `container` background | `container` border | State layer | `label` | `check-icon` |
|---|---|---|---|---|---|
| Default | `color-background-brand-subtle` | `color-border-brand` | — | `color-text-role-brand` | `color-icon-role-brand` |
| Hover | same | same | `color-overlay-hover` | same | same |
| Pressed | same | same | `color-overlay-pressed` | same | same |
| Disabled | `color-background-neutral-disabled` | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

### 3.3 `remove-button` and `leading-avatar`

- `remove-button`: the Biowave Icon button `text` · `neutral` tokens (Icon button B3) — icon, state layer, focus ring and disabled — with the B2 box and glyph
- `leading-avatar`: Avatar B3 tokens for its `color` (default `neutral`); unchanged when the chip is disabled

### 3.4 `tag` by `color`

| `color` | `container` background | `label` | `leading-icon` |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` | `color-text-neutral-default` | `color-icon-neutral-default` |
| `brand` | `color-background-brand-subtle` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | `color-text-role-secondary` | `color-icon-role-secondary` |
| `success` | `color-background-success-subtle` | `color-text-role-success` | `color-icon-role-success` |
| `warning` | `color-background-warning-subtle` | `color-text-role-warning` | `color-icon-role-warning` |
| `error` | `color-background-error-subtle` | `color-text-role-error` | `color-icon-role-error` |
| `info` | `color-background-info-subtle` | `color-text-role-info` | `color-icon-role-info` |

### 3.5 `status`

Each of the 7 request states uses one row of 3.4 for its colours plus its own `status-icon` glyph. The state → colour → icon map is added in plan 1.1 (A4.4, C2).

### 3.6 Focus

| Part | Property | Token |
|---|---|---|
| `focus-ring` (`assist`, `filter` container; `remove-button`) | color | `color-border-focus` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` |

The state layer is a second fill painted above the container fill (`background-image: linear-gradient(var(--bw-color-overlay-hover), var(--bw-color-overlay-hover))`), as in Button B3. Every text pair is in the Foundations contrast set (`color-text-role-*` on `color-background-*-subtle`, `color-text-neutral-default` on surfaces).

Dark theme: same tokens (values switch automatically). No exceptions.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `var(--bw-border-focus-offset)` · `cssVars.border.focus.offset` | 2 | 2 |
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-brand-subtle` | `var(--bw-color-background-brand-subtle)` · `cssVars.color.background.brand.subtle` | #E8ECF2 | #071323 |
| `color-background-error-subtle` | `var(--bw-color-background-error-subtle)` · `cssVars.color.background.error.subtle` | #FEF0EE | #721212 |
| `color-background-info-subtle` | `var(--bw-color-background-info-subtle)` · `cssVars.color.background.info.subtle` | #EEF4FF | #0E265F |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-neutral-disabled` | `var(--bw-color-background-neutral-disabled)` · `cssVars.color.background.neutral.disabled` | #EDEDED | #292929 |
| `color-background-secondary-subtle` | `var(--bw-color-background-secondary-subtle)` · `cssVars.color.background.secondary.subtle` | #E8F4F8 | #032A37 |
| `color-background-success-subtle` | `var(--bw-color-background-success-subtle)` · `cssVars.color.background.success.subtle` | #E9F7EF | #0E3921 |
| `color-background-transparent` | `var(--bw-color-background-transparent)` · `cssVars.color.background.transparent` | #54545400 | #54545400 |
| `color-background-warning-subtle` | `var(--bw-color-background-warning-subtle)` · `cssVars.color.background.warning.subtle` | #FFF3E8 | #773F12 |
| `color-border-brand` | `var(--bw-color-border-brand)` · `cssVars.color.border.brand` | #607D9F | #254471 |
| `color-border-default` | `var(--bw-color-border-default)` · `cssVars.color.border.default` | #DBDBDB | #404040 |
| `color-border-disabled` | `var(--bw-color-border-disabled)` · `cssVars.color.border.disabled` | #DBDBDB | #404040 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-icon-neutral-default` | `var(--bw-color-icon-neutral-default)` · `cssVars.color.icon.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-icon-neutral-disabled` | `var(--bw-color-icon-neutral-disabled)` · `cssVars.color.icon.neutral.disabled` | #969696 | #545454 |
| `color-icon-neutral-subtle` | `var(--bw-color-icon-neutral-subtle)` · `cssVars.color.icon.neutral.subtle` | #292929 | #DBDBDB |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #193351 | #90A3BC |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #FF2B2B | #FEA3A3 |
| `color-icon-role-info` | `var(--bw-color-icon-role-info)` · `cssVars.color.icon.role.info` | #2559D4 | #9CBCF2 |
| `color-icon-role-secondary` | `var(--bw-color-icon-role-secondary)` · `cssVars.color.icon.role.secondary` | #0C5F79 | #90C3D5 |
| `color-icon-role-success` | `var(--bw-color-icon-role-success)` · `cssVars.color.icon.role.success` | #268751 | #8DD4AE |
| `color-icon-role-warning` | `var(--bw-color-icon-role-warning)` · `cssVars.color.icon.role.warning` | #D97424 | #FFC88F |
| `color-overlay-hover` | `var(--bw-color-overlay-hover)` · `cssVars.color.overlay.hover` | #5454541A | #54545466 |
| `color-overlay-pressed` | `var(--bw-color-overlay-pressed)` · `cssVars.color.overlay.pressed` | #54545433 | #54545499 |
| `color-text-neutral-default` | `var(--bw-color-text-neutral-default)` · `cssVars.color.text.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-text-neutral-disabled` | `var(--bw-color-text-neutral-disabled)` · `cssVars.color.text.neutral.disabled` | #969696 | #545454 |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #90A3BC |
| `color-text-role-error` | `var(--bw-color-text-role-error)` · `cssVars.color.text.role.error` | #D42222 | #FEA3A3 |
| `color-text-role-info` | `var(--bw-color-text-role-info)` · `cssVars.color.text.role.info` | #1D48AD | #9CBCF2 |
| `color-text-role-secondary` | `var(--bw-color-text-role-secondary)` · `cssVars.color.text.role.secondary` | #094E65 | #90C3D5 |
| `color-text-role-success` | `var(--bw-color-text-role-success)` · `cssVars.color.text.role.success` | #1E6D41 | #8DD4AE |
| `color-text-role-warning` | `var(--bw-color-text-role-warning)` · `cssVars.color.text.role.warning` | #A85A1A | #FFC88F |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-control-gap-md` | `var(--bw-spacing-control-gap-md)` · `cssVars.spacing.control.gap.md` | 6 | 6 |
| `spacing-control-gap-sm` | `var(--bw-spacing-control-gap-sm)` · `cssVars.spacing.control.gap.sm` | 4 | 4 |
| `spacing-control-padding-inline-md` | `var(--bw-spacing-control-padding-inline-md)` · `cssVars.spacing.control.padding-inline.md` | 12 | 12 |
| `spacing-control-padding-inline-sm` | `var(--bw-spacing-control-padding-inline-sm)` · `cssVars.spacing.control.padding-inline.sm` | 8 | 8 |
| `spacing-sm` | `var(--bw-spacing-sm)` · `cssVars.spacing.sm` | 6 | 6 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter (chip or remove button) | state layer | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down | state layer | `motion-duration-sm` | `motion-easing-standard` |
| Unselected ↔ Selected (`filter`) | click / Enter / Space | background, border, label colour; check icon fades in / out in place of the leading icon | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus | focus ring | `motion-duration-instant` | — |
| Enabled ↔ Disabled | prop change | all colours | `motion-duration-instant` | — |

A removed `input` chip leaves without an exit animation in 1.0 (the owner removes it). Reduced motion: durations resolve to instant through Foundations; the check icon swaps without a fade.

## 6. RTL

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

## 7. Accessibility (implementation)

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

## 8. Examples

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

## 9. How to build it

### Goal

`import { Chip } from '@biowave/web'` renders the `assist`, `filter`, `input` and `tag` variants of B1 from semantic tokens only, with native button semantics, a separate named remove button, English/Arabic direction, light/dark themes and complete tests.

### Scope

**Depends on:** the Biowave `Icon` and `IconButton` (built, Approved) and the Biowave `Avatar` (plan Finished, not on `main` yet — build Chip after Avatar is merged). The `sm` leading avatar needs an Avatar `xs` size (box `size-icon-lg`); Avatar 1.0 has `sm` · `md` · `lg` · `xl` only. Until Avatar has `xs`, the one case `size="sm"` + `avatar` is blocked: build everything else and report “blocked — Avatar xs” in C8. Never restyle Avatar internals from Chip.

**In scope**
- [ ] B1 API for `assist`, `filter`, `input`, `tag`; B2 dimensions; B3 tokens; B4 transitions; B5 RTL; B6 accessibility; B9 tests
- [ ] The `variant="status"` fallback and warning from B1

**Out of scope (do not build)**
- The `status` variant's 7 states, icons and colours — not written in the design system yet; added in plan 1.1
- A chip-group component, single-select behaviour, chip menus, drag to reorder, links (`href`), removal animation
- Focus management after removal (the owner of the list does it; Autocomplete on Day 13)

### Approach

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

### Token gaps

None. Every value is an existing semantic token; no `chip.tokens.json` (P-04). Avatar `xs` is an Avatar plan change, not a token gap (C2).

### Files to create / change

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

## 10. Tests

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

Implement every item in B9, plus:
- [ ] Render every test through the shared `renderWithBiowave` (`src/test/render.tsx`) with its `theme` and `locale` options; no local providers or Emotion caches
- [ ] Default Vitest timeouts only — no per-test or per-file timeout overrides
- [ ] Token-map test: every entry of `chip.tokens.ts` names the B2–B3 token
- [ ] Hover, pressed and disabled colours read with `getComputedStyle` on the element, not from the style source
- [ ] `variant="status"` renders as a neutral tag and warns once

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings and fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token through `cssVars`; no raw values, no primitives
- [ ] AC-3 Every transition in B4 implemented; reduced motion respected
- [ ] AC-4 RTL behaves as B5; semantics, keyboard and focus as B6
- [ ] AC-5 B9 and C6 tests exist and pass with `npm run typecheck` and `npm run test:web` at default timeouts
- [ ] AC-6 Exported from `src/index.ts` with its types; header and section README status are `Built`
- [ ] AC-7 Remove button is the Biowave `IconButton`, glyphs are the Biowave `Icon`, avatar is the Biowave `Avatar` — no restyled MUI copies, no MUI `Chip`
- [ ] AC-8 `tag` and `status` chips are not focusable and expose no role
- [ ] AC-9 `npm run sync` and `npm run docs:check` pass

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](chip.md#c8-execution-log-filled-by-the-executor) in `chip.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `chip.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
