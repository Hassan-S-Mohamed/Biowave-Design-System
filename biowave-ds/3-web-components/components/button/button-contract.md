<!-- GENERATED from button.md @ b0dfb4823b2888c1 — do not edit; change the source and run: npm run contract -- web button -->
# Button · زر — Web — code contract

> **Everything you need to build Button on Web, and nothing else.** Read this file only. Generated from [`button.md`](button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Button · زر |
| Platform | Web · React + MUI |
| Built on | MUI `Button` (native `<button>` / `<a>`), styled entirely from Biowave tokens. MUI palette colors, elevation and ripple are not used |
| Import | `import { Button } from '@biowave/web'` |
| Version | 1.1 · 2026-10-18 |
| Source code | [`src/components/button/`](../../src/components/button/) |
| Tokens | [`button.tokens.json`](button.tokens.json) |
| Source | [`button.md`](button.md) @ `b0dfb4823b2888c1` |

## 1. What it is

A button starts an action the user chose: save a form, approve a request, clock in, add a device. Its label says what will happen. Emphasis (`variant`) and `color` tell the user how important the action is and what it does. One screen area has **one** most-important action.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Hit area and fill. Its emphasis and color carry the hierarchy |
| 2 | `leading-icon` | No | Supports the label (e.g. add, download). Never replaces it |
| 3 | `label` | Yes | Says the action, verb first. Single line |
| 4 | `trailing-icon` | No | Shows where the action goes (arrow, external link) |
| 5 | `spinner` | Loading only | Shows that the action is running. Replaces the content in place |
| 6 | `focus-ring` | Focus only | Shows keyboard focus |

**Options** (names and values are the props in §2):

- 4.1 `variant` — emphasis
- 4.2 `color`
- 4.3 `size`
- 4.4 Icons — `leading-icon` · `trailing-icon`
- 4.5 `full-width`

## 2. API

### Button
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `filled` · `tonal` · `outlined` · `text` | `filled` | | Emphasis — A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` · `error` · `inverse` | `brand` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 (`xl` is touch only) |
| `startIcon` | `ReactNode` | a Material Symbols Rounded glyph (`icons.md`, D-18) | — | | `leading-icon` — A4.4 |
| `endIcon` | `ReactNode` | an icon | — | | `trailing-icon` |
| `fullWidth` | boolean | | `false` | | A4.5 |
| `loading` | boolean | | `false` | | Shows `spinner`, blocks activation, keeps focus |
| `loadingLabel` | string | | `"Loading"` (EN) / `"جارٍ التحميل"` (AR) from the provider locale | | Announced to screen readers while loading, e.g. "Saving…" |
| `disabled` | boolean | | `false` | | Native disabled; not focusable |
| `type` | enum | `button` · `submit` · `reset` | `button` | | Native button type |
| `href` | string | | — | | Renders an `<a>` with button styling. Use only for actions that navigate (e.g. "Download report") |
| `onClick` | `(e) => void` | | — | | Not called while `loading` or `disabled` |
| `children` | string | | — | ✓ | `label`. Plain text only |
| `ref`, `className`, `aria-*`, `data-*` | | | | | Forwarded to the root element |

Not supported: MUI `variant="contained"`, `color="success|warning|info|primary"`, `disableElevation`, `disableRipple`, `sx` overrides of colors. Platform naming: web `startIcon` = Flutter `leadingIcon`; `onClick` = `onPressed`.

**Invalid combinations** (`console.warn` in development, then the fallback renders):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `color="neutral"` or `"inverse"` | `variant="outlined"` |
| `startIcon` and `endIcon` both set | `startIcon` only |
| `children` empty or not a string | renders, warns "Button needs a text label — use IconButton" |

## 3. Dimensions

```
   spacing-control-padding-inline-md            spacing-control-padding-inline-md
     ├────────┤ spacing-control-gap-md                       ├────────┤
   ┬ ┌────────────────────────────────────────────────────────────┐
   │ │        [◆]  ├─┤  Save changes                             │  radius-md
   │ └────────────────────────────────────────────────────────────┘  border-width-default (outlined)
   ┴ size-control-height-md
             └ size-icon-md       └ text style action-md
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `container` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` |
| `container` | border width (outlined only) | `border-width-default` | `border-width-default` | `border-width-default` |
| `leading-icon`, `trailing-icon` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `label` | text style | `action-sm` (`.bw-text-action-sm`) | `action-md` | `action-lg` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | same | same |

Layout rules:
- `display: inline-flex`, content centered on both axes. Width hugs content; `fullWidth` → 100% of the parent.
- Height is fixed by the size token. The outlined border is drawn **inside** the height (no layout shift between variants). Padding does not change when an icon is present.
- `label`: one line, `white-space: nowrap`; when the parent forces a narrower width, `text-overflow: ellipsis` and the full label stays the accessible name.
- Loading: content keeps its box and its accessible name (`opacity: 0`, never `visibility`/`display`), `spinner` is centered on top, so the width never changes.
- Elevation: none (`elevation-0`) in every state.

## 4. Tokens by part and state

> Machine-readable source: [`button.tokens.json`](button.tokens.json) (component tokens, D-13). It holds exactly these mappings; `npm run component-tokens` fails if they drift. In Figma these become the `Button / …` collections in the Web Components file.

Token names are written without the `color-` prefix where the column header says "color". Disabled is the same for every color of a variant.

### 3.1 `filled`
| `color` | `container` background · Default / Hover / Pressed | `label` · `spinner` | `leading/trailing-icon` |
|---|---|---|---|
| `brand` | `color-background-brand-default` / `color-background-brand-hovered` / `color-background-brand-pressed` | `color-text-on-brand` | `color-icon-on-brand` |
| `secondary` | `color-background-secondary-default` / `color-background-secondary-hovered` / `color-background-secondary-pressed` | `color-text-on-secondary` | `color-icon-on-secondary` |
| `error` | `color-background-error-default` / `color-background-error-hovered` / `color-background-error-pressed` | `color-text-on-error` | `color-icon-on-error` |
| `neutral` | `color-background-neutral-default` / `color-background-neutral-hovered` / `color-background-neutral-pressed` | `color-text-default` | `color-icon-default` |
| `inverse` | `color-background-inverse-default` / `color-background-inverse-hovered` / `color-background-inverse-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| Disabled (all) | `color-background-disabled` | `color-text-disabled` | `color-icon-disabled` |

### 3.2 `tonal`
| `color` | `container` background | State layer · Hover / Pressed | `label` · `spinner` | icons |
|---|---|---|---|---|
| `brand` | `color-background-brand-subtle` | `color-background-transparent-hovered` / `color-background-transparent-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | same | `color-text-role-secondary` | `color-icon-role-secondary` |
| `error` | `color-background-error-subtle` | same | `color-text-role-error` | `color-icon-role-error` |
| Disabled (all) | `color-background-disabled` | — | `color-text-disabled` | `color-icon-disabled` |

### 3.3 `outlined`
| `color` | `container` background | `container` border | State layer · Hover / Pressed | `label` · `spinner` | icons |
|---|---|---|---|---|---|
| `brand` | `color-background-transparent-default` | `color-border-brand` | `color-background-transparent-hovered` / `color-background-transparent-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | same | `color-border-secondary` | same | `color-text-role-secondary` | `color-icon-role-secondary` |
| `error` | same | `color-border-error` | same | `color-text-role-error` | `color-icon-role-error` |
| `neutral` | same | `color-border-strong` | same | `color-text-default` | `color-icon-default` |
| `inverse` | same | `color-border-inverse` | same | `color-text-on-brand` | `color-icon-on-brand` |
| Disabled (all) | same | `color-border-disabled` | — | `color-text-disabled` | `color-icon-disabled` |

### 3.4 `text`
Same as `outlined` without the border.

### 3.5 Focus
| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` |

The **state layer** is a second fill painted above the container fill (web: `background-image: linear-gradient(var(--bw-color-background-transparent-hovered), var(--bw-color-background-transparent-hovered))`). Filled buttons never use a state layer; they switch to the solid `-hovered`/`-pressed` tokens.

Dark theme: same tokens, values switch automatically. No exceptions.

### 3.6 Legacy Figma colours (Figma only — no code prop)
The Figma Button sets keep their legacy `Color` values **Success · Warning · Info** (decision 2026-10-31: keep every variant and property). They read extra modes of the same component collections; code `color` stays `brand · secondary · neutral · error · inverse`.

| Variant | `container` default · hovered · pressed · disabled | `border` default · disabled | `label` · `icon` (default) |
|---|---|---|---|
| Filled (`Type=Primary`) | `color-background-success-default` · `color-background-success-hovered` · `color-background-success-pressed` · `color-background-disabled` (same for `warning`, `info`: `color-background-warning-default` · `color-background-warning-hovered` · `color-background-warning-pressed`, `color-background-info-default` · `color-background-info-hovered` · `color-background-info-pressed`) | — | `color-text-on-success` · `color-icon-on-success`; `color-text-on-warning` · `color-icon-on-warning`; `color-text-on-info` · `color-icon-on-info` |
| Outlined (`Type=Secondary`) · Text (`Type=Tertiary`) | transparent; state layer as 3.3 / 3.4 | `color-border-success` · `color-border-warning` · `color-border-info` (outlined only) · `color-border-disabled` | `color-text-role-success` · `color-icon-role-success`; `color-text-role-warning` · `color-icon-role-warning`; `color-text-role-info` · `color-icon-role-info` |

Disabled: `color-text-disabled` · `color-icon-disabled`, as every colour.

### 3.7 Figma focus ring layer
`Focus ring` layer (border.md › Figma focus ring): stroke `Button / Focus › color`, weight `Button / Focus › width` = `border-width-focus`, corner radius `Button / Size › focus-ring-radius` = `radius-lg` (control `radius-md` + 2px offset; the touch `xl` size uses the next step up, see the Tablet and Mobile specs).

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `var(--bw-border-focus-offset)` · `cssVars.border.focus.offset` | 2 | 2 |
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-brand-default` | `var(--bw-color-background-brand-default)` · `cssVars.color.background.brand.default` | #193351 | #607D9F |
| `color-background-brand-hovered` | `var(--bw-color-background-brand-hovered)` · `cssVars.color.background.brand.hovered` | #132843 | #90A3BC |
| `color-background-brand-pressed` | `var(--bw-color-background-brand-pressed)` · `cssVars.color.background.brand.pressed` | #0D1E33 | #BEC9D9 |
| `color-background-brand-subtle` | `var(--bw-color-background-brand-subtle)` · `cssVars.color.background.brand.subtle` | #BEC9D9 | #071323 |
| `color-background-disabled` | `var(--bw-color-background-disabled)` · `cssVars.color.background.disabled` | #EDEDED | #292929 |
| `color-background-error-default` | `var(--bw-color-background-error-default)` · `cssVars.color.background.error.default` | #D42222 | #FF7676 |
| `color-background-error-hovered` | `var(--bw-color-background-error-hovered)` · `cssVars.color.background.error.hovered` | #A31A1A | #FEA3A3 |
| `color-background-error-pressed` | `var(--bw-color-background-error-pressed)` · `cssVars.color.background.error.pressed` | #721212 | #FECFCF |
| `color-background-error-subtle` | `var(--bw-color-background-error-subtle)` · `cssVars.color.background.error.subtle` | #FECFCF | #721212 |
| `color-background-info-default` | `var(--bw-color-background-info-default)` · `cssVars.color.background.info.default` | #2559D4 | #6D9CE8 |
| `color-background-info-hovered` | `var(--bw-color-background-info-hovered)` · `cssVars.color.background.info.hovered` | #1D48AD | #9CBCF2 |
| `color-background-info-pressed` | `var(--bw-color-background-info-pressed)` · `cssVars.color.background.info.pressed` | #153786 | #CBDCFA |
| `color-background-inverse-default` | `var(--bw-color-background-inverse-default)` · `cssVars.color.background.inverse.default` | #FFFFFF | #0A0A0A |
| `color-background-inverse-hovered` | `var(--bw-color-background-inverse-hovered)` · `cssVars.color.background.inverse.hovered` | #EDEDED | #141414 |
| `color-background-inverse-pressed` | `var(--bw-color-background-inverse-pressed)` · `cssVars.color.background.inverse.pressed` | #DBDBDB | #292929 |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-neutral-hovered` | `var(--bw-color-background-neutral-hovered)` · `cssVars.color.background.neutral.hovered` | #DBDBDB | #404040 |
| `color-background-neutral-pressed` | `var(--bw-color-background-neutral-pressed)` · `cssVars.color.background.neutral.pressed` | #BDBDBD | #545454 |
| `color-background-secondary-default` | `var(--bw-color-background-secondary-default)` · `cssVars.color.background.secondary.default` | #0C5F79 | #5DA8C2 |
| `color-background-secondary-hovered` | `var(--bw-color-background-secondary-hovered)` · `cssVars.color.background.secondary.hovered` | #094E65 | #90C3D5 |
| `color-background-secondary-pressed` | `var(--bw-color-background-secondary-pressed)` · `cssVars.color.background.secondary.pressed` | #063C4E | #C0DDE8 |
| `color-background-secondary-subtle` | `var(--bw-color-background-secondary-subtle)` · `cssVars.color.background.secondary.subtle` | #C0DDE8 | #032A37 |
| `color-background-success-default` | `var(--bw-color-background-success-default)` · `cssVars.color.background.success.default` | #1E6D41 | #55BE87 |
| `color-background-success-hovered` | `var(--bw-color-background-success-hovered)` · `cssVars.color.background.success.hovered` | #165331 | #8DD4AE |
| `color-background-success-pressed` | `var(--bw-color-background-success-pressed)` · `cssVars.color.background.success.pressed` | #0E3921 | #C1E8D2 |
| `color-background-transparent-default` | `var(--bw-color-background-transparent-default)` · `cssVars.color.background.transparent.default` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `var(--bw-color-background-transparent-hovered)` · `cssVars.color.background.transparent.hovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `var(--bw-color-background-transparent-pressed)` · `cssVars.color.background.transparent.pressed` | #54545433 | #54545499 |
| `color-background-warning-default` | `var(--bw-color-background-warning-default)` · `cssVars.color.background.warning.default` | #FF9435 | #FFB05E |
| `color-background-warning-hovered` | `var(--bw-color-background-warning-hovered)` · `cssVars.color.background.warning.hovered` | #EC842C | #FFC88F |
| `color-background-warning-pressed` | `var(--bw-color-background-warning-pressed)` · `cssVars.color.background.warning.pressed` | #D97424 | #FFE0C0 |
| `color-border-brand` | `var(--bw-color-border-brand)` · `cssVars.color.border.brand` | #254471 | #607D9F |
| `color-border-disabled` | `var(--bw-color-border-disabled)` · `cssVars.color.border.disabled` | #DBDBDB | #404040 |
| `color-border-error` | `var(--bw-color-border-error)` · `cssVars.color.border.error` | #D42222 | #FF7676 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-border-info` | `var(--bw-color-border-info)` · `cssVars.color.border.info` | #2559D4 | #6D9CE8 |
| `color-border-inverse` | `var(--bw-color-border-inverse)` · `cssVars.color.border.inverse` | #FFFFFF | #0A0A0A |
| `color-border-secondary` | `var(--bw-color-border-secondary)` · `cssVars.color.border.secondary` | #1A7596 | #5DA8C2 |
| `color-border-strong` | `var(--bw-color-border-strong)` · `cssVars.color.border.strong` | #BDBDBD | #545454 |
| `color-border-success` | `var(--bw-color-border-success)` · `cssVars.color.border.success` | #268751 | #55BE87 |
| `color-border-warning` | `var(--bw-color-border-warning)` · `cssVars.color.border.warning` | #D97424 | #FFB05E |
| `color-icon-default` | `var(--bw-color-icon-default)` · `cssVars.color.icon.default` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `var(--bw-color-icon-disabled)` · `cssVars.color.icon.disabled` | #969696 | #707070 |
| `color-icon-on-brand` | `var(--bw-color-icon-on-brand)` · `cssVars.color.icon.on.brand` | #FFFFFF | #0A0A0A |
| `color-icon-on-error` | `var(--bw-color-icon-on-error)` · `cssVars.color.icon.on.error` | #FFFFFF | #0A0A0A |
| `color-icon-on-info` | `var(--bw-color-icon-on-info)` · `cssVars.color.icon.on.info` | #FFFFFF | #0A0A0A |
| `color-icon-on-secondary` | `var(--bw-color-icon-on-secondary)` · `cssVars.color.icon.on.secondary` | #FFFFFF | #0A0A0A |
| `color-icon-on-success` | `var(--bw-color-icon-on-success)` · `cssVars.color.icon.on.success` | #FFFFFF | #0A0A0A |
| `color-icon-on-warning` | `var(--bw-color-icon-on-warning)` · `cssVars.color.icon.on.warning` | #0A0A0A | #0A0A0A |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #132843 | #BEC9D9 |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #A31A1A | #FEA3A3 |
| `color-icon-role-info` | `var(--bw-color-icon-role-info)` · `cssVars.color.icon.role.info` | #1D48AD | #9CBCF2 |
| `color-icon-role-secondary` | `var(--bw-color-icon-role-secondary)` · `cssVars.color.icon.role.secondary` | #094E65 | #90C3D5 |
| `color-icon-role-success` | `var(--bw-color-icon-role-success)` · `cssVars.color.icon.role.success` | #1E6D41 | #8DD4AE |
| `color-icon-role-warning` | `var(--bw-color-icon-role-warning)` · `cssVars.color.icon.role.warning` | #773F12 | #FFC88F |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `var(--bw-color-text-disabled)` · `cssVars.color.text.disabled` | #969696 | #707070 |
| `color-text-on-brand` | `var(--bw-color-text-on-brand)` · `cssVars.color.text.on.brand` | #FFFFFF | #0A0A0A |
| `color-text-on-error` | `var(--bw-color-text-on-error)` · `cssVars.color.text.on.error` | #FFFFFF | #0A0A0A |
| `color-text-on-info` | `var(--bw-color-text-on-info)` · `cssVars.color.text.on.info` | #FFFFFF | #0A0A0A |
| `color-text-on-secondary` | `var(--bw-color-text-on-secondary)` · `cssVars.color.text.on.secondary` | #FFFFFF | #0A0A0A |
| `color-text-on-success` | `var(--bw-color-text-on-success)` · `cssVars.color.text.on.success` | #FFFFFF | #0A0A0A |
| `color-text-on-warning` | `var(--bw-color-text-on-warning)` · `cssVars.color.text.on.warning` | #0A0A0A | #0A0A0A |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #BEC9D9 |
| `color-text-role-error` | `var(--bw-color-text-role-error)` · `cssVars.color.text.role.error` | #A31A1A | #FEA3A3 |
| `color-text-role-info` | `var(--bw-color-text-role-info)` · `cssVars.color.text.role.info` | #1D48AD | #9CBCF2 |
| `color-text-role-secondary` | `var(--bw-color-text-role-secondary)` · `cssVars.color.text.role.secondary` | #094E65 | #90C3D5 |
| `color-text-role-success` | `var(--bw-color-text-role-success)` · `cssVars.color.text.role.success` | #1E6D41 | #8DD4AE |
| `color-text-role-warning` | `var(--bw-color-text-role-warning)` · `cssVars.color.text.role.warning` | #773F12 | #FFC88F |
| `elevation-0` | `var(--bw-elevation-0)` · `cssVars.elevation.0` | 0px 0px 0px 0px rgb(7 19 35 / 0%) | 0px 0px 0px 0px rgb(0 0 0 / 0%) |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-progress` | `var(--bw-motion-duration-progress)` · `cssVars.motion.duration.progress` | 1000 | 1000 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-duration-xs` | `var(--bw-motion-duration-xs)` · `cssVars.motion.duration.xs` | 50 | 50 |
| `motion-easing-linear` | `var(--bw-motion-easing-linear)` · `cssVars.motion.easing.linear` | [0,0,1,1] | [0,0,1,1] |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-lg` | `var(--bw-radius-lg)` · `cssVars.radius.lg` | 10 | 10 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-control-gap-lg` | `var(--bw-spacing-control-gap-lg)` · `cssVars.spacing.control.gap.lg` | 8 | 8 |
| `spacing-control-gap-md` | `var(--bw-spacing-control-gap-md)` · `cssVars.spacing.control.gap.md` | 6 | 6 |
| `spacing-control-gap-sm` | `var(--bw-spacing-control-gap-sm)` · `cssVars.spacing.control.gap.sm` | 4 | 4 |
| `spacing-control-padding-inline-lg` | `var(--bw-spacing-control-padding-inline-lg)` · `cssVars.spacing.control.padding-inline.lg` | 16 | 16 |
| `spacing-control-padding-inline-md` | `var(--bw-spacing-control-padding-inline-md)` · `cssVars.spacing.control.padding-inline.md` | 12 | 12 |
| `spacing-control-padding-inline-sm` | `var(--bw-spacing-control-padding-inline-sm)` · `cssVars.spacing.control.padding-inline.sm` | 8 | 8 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

### 4.2 Component tokens

The code token map must equal [`button.tokens.json`](button.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Button / Size | height | sm: `size-control-height-sm` · md: `size-control-height-md` · lg: `size-control-height-lg` |
| Button / Size | padding-inline | sm: `spacing-control-padding-inline-sm` · md: `spacing-control-padding-inline-md` · lg: `spacing-control-padding-inline-lg` |
| Button / Size | gap | sm: `spacing-control-gap-sm` · md: `spacing-control-gap-md` · lg: `spacing-control-gap-lg` |
| Button / Size | icon | sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` |
| Button / Size | radius | sm: `radius-md` · md: `radius-md` · lg: `radius-md` |
| Button / Size | border-width | sm: `border-width-default` · md: `border-width-default` · lg: `border-width-default` |
| Button / Size | focus-ring-radius | sm: `radius-lg` · md: `radius-lg` · lg: `radius-lg` |
| Button / Filled | container/default | brand: `color-background-brand-default` · secondary: `color-background-secondary-default` · error: `color-background-error-default` · neutral: `color-background-neutral-default` · inverse: `color-background-inverse-default` · success: `color-background-success-default` · warning: `color-background-warning-default` · info: `color-background-info-default` |
| Button / Filled | container/hovered | brand: `color-background-brand-hovered` · secondary: `color-background-secondary-hovered` · error: `color-background-error-hovered` · neutral: `color-background-neutral-hovered` · inverse: `color-background-inverse-hovered` · success: `color-background-success-hovered` · warning: `color-background-warning-hovered` · info: `color-background-info-hovered` |
| Button / Filled | container/pressed | brand: `color-background-brand-pressed` · secondary: `color-background-secondary-pressed` · error: `color-background-error-pressed` · neutral: `color-background-neutral-pressed` · inverse: `color-background-inverse-pressed` · success: `color-background-success-pressed` · warning: `color-background-warning-pressed` · info: `color-background-info-pressed` |
| Button / Filled | container/disabled | brand: `color-background-disabled` · secondary: `color-background-disabled` · error: `color-background-disabled` · neutral: `color-background-disabled` · inverse: `color-background-disabled` · success: `color-background-disabled` · warning: `color-background-disabled` · info: `color-background-disabled` |
| Button / Filled | label/default | brand: `color-text-on-brand` · secondary: `color-text-on-secondary` · error: `color-text-on-error` · neutral: `color-text-default` · inverse: `color-text-role-brand` · success: `color-text-on-success` · warning: `color-text-on-warning` · info: `color-text-on-info` |
| Button / Filled | label/disabled | brand: `color-text-disabled` · secondary: `color-text-disabled` · error: `color-text-disabled` · neutral: `color-text-disabled` · inverse: `color-text-disabled` · success: `color-text-disabled` · warning: `color-text-disabled` · info: `color-text-disabled` |
| Button / Filled | icon/default | brand: `color-icon-on-brand` · secondary: `color-icon-on-secondary` · error: `color-icon-on-error` · neutral: `color-icon-default` · inverse: `color-icon-role-brand` · success: `color-icon-on-success` · warning: `color-icon-on-warning` · info: `color-icon-on-info` |
| Button / Filled | icon/disabled | brand: `color-icon-disabled` · secondary: `color-icon-disabled` · error: `color-icon-disabled` · neutral: `color-icon-disabled` · inverse: `color-icon-disabled` · success: `color-icon-disabled` · warning: `color-icon-disabled` · info: `color-icon-disabled` |
| Button / Tonal | container/default | brand: `color-background-brand-subtle` · secondary: `color-background-secondary-subtle` · error: `color-background-error-subtle` |
| Button / Tonal | container/disabled | brand: `color-background-disabled` · secondary: `color-background-disabled` · error: `color-background-disabled` |
| Button / Tonal | state-layer/hovered | brand: `color-background-transparent-hovered` · secondary: `color-background-transparent-hovered` · error: `color-background-transparent-hovered` |
| Button / Tonal | state-layer/pressed | brand: `color-background-transparent-pressed` · secondary: `color-background-transparent-pressed` · error: `color-background-transparent-pressed` |
| Button / Tonal | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` |
| Button / Tonal | label/disabled | brand: `color-text-disabled` · secondary: `color-text-disabled` · error: `color-text-disabled` |
| Button / Tonal | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` |
| Button / Tonal | icon/disabled | brand: `color-icon-disabled` · secondary: `color-icon-disabled` · error: `color-icon-disabled` |
| Button / Outlined | container/default | brand: `color-background-transparent-default` · secondary: `color-background-transparent-default` · error: `color-background-transparent-default` · neutral: `color-background-transparent-default` · inverse: `color-background-transparent-default` · success: `color-background-transparent-default` · warning: `color-background-transparent-default` · info: `color-background-transparent-default` |
| Button / Outlined | container/disabled | brand: `color-background-transparent-default` · secondary: `color-background-transparent-default` · error: `color-background-transparent-default` · neutral: `color-background-transparent-default` · inverse: `color-background-transparent-default` · success: `color-background-transparent-default` · warning: `color-background-transparent-default` · info: `color-background-transparent-default` |
| Button / Outlined | border/default | brand: `color-border-brand` · secondary: `color-border-secondary` · error: `color-border-error` · neutral: `color-border-strong` · inverse: `color-border-inverse` · success: `color-border-success` · warning: `color-border-warning` · info: `color-border-info` |
| Button / Outlined | border/disabled | brand: `color-border-disabled` · secondary: `color-border-disabled` · error: `color-border-disabled` · neutral: `color-border-disabled` · inverse: `color-border-disabled` · success: `color-border-disabled` · warning: `color-border-disabled` · info: `color-border-disabled` |
| Button / Outlined | state-layer/hovered | brand: `color-background-transparent-hovered` · secondary: `color-background-transparent-hovered` · error: `color-background-transparent-hovered` · neutral: `color-background-transparent-hovered` · inverse: `color-background-transparent-hovered` · success: `color-background-transparent-hovered` · warning: `color-background-transparent-hovered` · info: `color-background-transparent-hovered` |
| Button / Outlined | state-layer/pressed | brand: `color-background-transparent-pressed` · secondary: `color-background-transparent-pressed` · error: `color-background-transparent-pressed` · neutral: `color-background-transparent-pressed` · inverse: `color-background-transparent-pressed` · success: `color-background-transparent-pressed` · warning: `color-background-transparent-pressed` · info: `color-background-transparent-pressed` |
| Button / Outlined | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` · neutral: `color-text-default` · inverse: `color-text-on-brand` · success: `color-text-role-success` · warning: `color-text-role-warning` · info: `color-text-role-info` |
| Button / Outlined | label/disabled | brand: `color-text-disabled` · secondary: `color-text-disabled` · error: `color-text-disabled` · neutral: `color-text-disabled` · inverse: `color-text-disabled` · success: `color-text-disabled` · warning: `color-text-disabled` · info: `color-text-disabled` |
| Button / Outlined | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` · neutral: `color-icon-default` · inverse: `color-icon-on-brand` · success: `color-icon-role-success` · warning: `color-icon-role-warning` · info: `color-icon-role-info` |
| Button / Outlined | icon/disabled | brand: `color-icon-disabled` · secondary: `color-icon-disabled` · error: `color-icon-disabled` · neutral: `color-icon-disabled` · inverse: `color-icon-disabled` · success: `color-icon-disabled` · warning: `color-icon-disabled` · info: `color-icon-disabled` |
| Button / Text | container/default | brand: `color-background-transparent-default` · secondary: `color-background-transparent-default` · error: `color-background-transparent-default` · neutral: `color-background-transparent-default` · inverse: `color-background-transparent-default` · success: `color-background-transparent-default` · warning: `color-background-transparent-default` · info: `color-background-transparent-default` |
| Button / Text | container/disabled | brand: `color-background-transparent-default` · secondary: `color-background-transparent-default` · error: `color-background-transparent-default` · neutral: `color-background-transparent-default` · inverse: `color-background-transparent-default` · success: `color-background-transparent-default` · warning: `color-background-transparent-default` · info: `color-background-transparent-default` |
| Button / Text | state-layer/hovered | brand: `color-background-transparent-hovered` · secondary: `color-background-transparent-hovered` · error: `color-background-transparent-hovered` · neutral: `color-background-transparent-hovered` · inverse: `color-background-transparent-hovered` · success: `color-background-transparent-hovered` · warning: `color-background-transparent-hovered` · info: `color-background-transparent-hovered` |
| Button / Text | state-layer/pressed | brand: `color-background-transparent-pressed` · secondary: `color-background-transparent-pressed` · error: `color-background-transparent-pressed` · neutral: `color-background-transparent-pressed` · inverse: `color-background-transparent-pressed` · success: `color-background-transparent-pressed` · warning: `color-background-transparent-pressed` · info: `color-background-transparent-pressed` |
| Button / Text | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` · neutral: `color-text-default` · inverse: `color-text-on-brand` · success: `color-text-role-success` · warning: `color-text-role-warning` · info: `color-text-role-info` |
| Button / Text | label/disabled | brand: `color-text-disabled` · secondary: `color-text-disabled` · error: `color-text-disabled` · neutral: `color-text-disabled` · inverse: `color-text-disabled` · success: `color-text-disabled` · warning: `color-text-disabled` · info: `color-text-disabled` |
| Button / Text | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` · neutral: `color-icon-default` · inverse: `color-icon-on-brand` · success: `color-icon-role-success` · warning: `color-icon-role-warning` · info: `color-icon-role-info` |
| Button / Text | icon/disabled | brand: `color-icon-disabled` · secondary: `color-icon-disabled` · error: `color-icon-disabled` · neutral: `color-icon-disabled` · inverse: `color-icon-disabled` · success: `color-icon-disabled` · warning: `color-icon-disabled` · info: `color-icon-disabled` |
| Button / Focus | color | default: `color-border-focus` · inverse: `color-border-inverse` |
| Button / Focus | width | default: `border-width-focus` · inverse: `border-width-focus` |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter | background, state layer, border color | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down · Enter/Space down | background, state layer | `motion-duration-xs` | `motion-easing-standard` |
| Pressed → Hover/Default | release | background, state layer | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus (`:focus-visible`) | focus ring appears | `motion-duration-instant` | — |
| Any → Loading | `loading=true` | content fades out, spinner fades in | `motion-duration-sm` | `motion-easing-linear` |
| Loading | while loading | spinner rotates continuously | one turn per `motion-duration-progress` | `motion-easing-linear` |
| Enabled ↔ Disabled | `disabled` changes | colors | `motion-duration-instant` | — |

Reduced motion: every transition is instant (built into `tokens.css`). The spinner keeps rotating (progress indicators are the allowed exception in [motion.md](../../../2-foundations/guidelines/motion.md)).

## 6. RTL

```
LTR  │  [◆]  Add device          │      │  Next  [▸]  │
RTL  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (`startIcon` stays at the inline start). Logical properties only |
| `leading-icon` / `trailing-icon` — directional (arrow_forward, arrow_back, chevron, open_in_new, logout) | Mirrors (`transform: scaleX(-1)` under `[dir=rtl]`, applied **once, on the icon wrapper** `.bw-button__icon`). Mark an icon directional with the `bw-icon-directional` class on the icon element (main way, works with every icon) or `mirrorInRtl` on a custom icon element; the Button reads `mirrorInRtl`, removes it before rendering (it never reaches the DOM or a MUI icon), and puts the class on the wrapper only |
| Non-directional icons (add, download, delete, check, clock) | Does not mirror |
| `spinner` | Does not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<button type="button">`; `<a href>` when `href` is set (role stays link — use only for navigation-like actions) |
| Accessible name | `children` text. Icons get `aria-hidden="true"` |
| Loading | `aria-busy="true"` + `aria-disabled="true"` (stays focusable, click ignored). A visually hidden `role="status"` region announces `loadingLabel` once |
| Disabled | Native `disabled` (removed from tab order). With `href`: `aria-disabled="true"`, `tabIndex=-1`, no navigation |
| Focus | `:focus-visible` outline: `border-width-focus` solid `color-border-focus`, `outline-offset: border-focus-offset`; follows the container radius |
| Target size | Every size ≥ `target-min` (24) — `sm` is the smallest at 32 |
| Contrast | All label/background pairs in B3 are in `contrast-pairs.json` (4.5:1); outlines and focus 3:1 |
| Screen reader output | "Save changes, button" · loading: "Save changes, button, busy" + "Saving…" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / away from the button |
| Enter | Activates (button and link) |
| Space | Activates (button only) |

## 8. Examples

```tsx
import { Button } from '@biowave/web';
import Icon from '@mui/material/Icon';   // until the Biowave Icon ships (D-18)

// Dialog footer: one filled + one outlined
<Button variant="outlined" color="neutral">Cancel</Button>
<Button type="submit" loading={saving} loadingLabel="Saving…">Save changes</Button>

// Destructive
<Button color="error">Delete user</Button>

// With an icon, small, in a table toolbar
<Button size="sm" variant="tonal" startIcon={<Icon baseClassName="material-symbols-rounded">add</Icon>}>Add device</Button>

// Arabic (direction and fonts come from BiowaveProvider locale="ar" — no extra props)
<Button>حفظ التغييرات</Button>

// On a navy surface
<Button color="inverse" variant="outlined">Learn more</Button>
```

## 9. How to build it

### Goal

`import { Button } from '@biowave/web'` renders every allowed `variant` × `color` × `size` from B1–B3 using only Biowave tokens, behaves as B4–B6 in light/dark and en/ar, and is covered by the tests in B9. This is also the **first web component**, so this plan sets up the test tooling every later component reuses.

### Scope

**In scope**
- [ ] C1 API (all props) · C2 Dimensions · C3 Tokens · C4 States · C5 RTL · C6 Accessibility · C9 Tests
- [ ] One-time setup: install dependencies and the web test tooling (C5 below)
- [ ] Shared test tooling fix (plan 1.2, review finding 11): a fresh emotion cache per test, flushed after each test (C3 › Test tooling). Shared tooling: it also unblocks Icon button, Split button and Text field, whose tests use the same `renderWithBiowave`

**Out of scope (do not build)**
- Icon button, Split button, Button group (separate plans)
- A shared `Spinner`/`Progress` component (Day 5). Build a private spinner inside the button folder (C3)
- `xl` size (touch only)
- Storybook / docs site

### Approach

- **Base:** wrap MUI `Button` (`@mui/material/Button`) with `disableRipple`, `disableElevation`, `variant="text"` and `color="inherit"`, so MUI adds no colors, shadows or ripple of its own. All visual styling comes from one `styled()` wrapper that reads our props through a transient prop object (`$variant`, `$color`, `$size`) — never forwarded to the DOM.
- **Token map:** must equal [`button.tokens.json`](button.tokens.json) (add a test that loads `button.tokens.json` and compares every entry). `button.tokens.ts` exports a typed table `variant → color → { bg, bgHover, bgPressed, stateLayer, border, label, icon }` whose values are `cssVars.*` references (B3). The styled wrapper only reads this table. No values in the component file.
- **State layer** (tonal, outlined, text): `background-image: linear-gradient(<overlay>, <overlay>)` on `:hover` and `:active`, over the variant's `background-color`.
- **Focus:** remove MUI's focus visual; apply B6 outline on `&:focus-visible` (and `&.Mui-focusVisible`). `inverse` uses `cssVars.color.border.inverse`.
- **Typography:** `label` uses the `actionSm|actionMd|actionLg` variant from `biowaveVariants` (font size/line height come from CSS variables, so platform and Arabic switch automatically).
- **Loading:** do **not** use MUI's `loading` prop (it sets `disabled` and loses focus). Implement: wrap children + icons in `.bw-button__content` and hide it with **`opacity: 0` only** while loading (never `visibility` or `display` — the label must stay the accessible name, B2/B6; opacity also gives the B4 fade); render the private `ButtonSpinner` absolutely centered and fade it with `opacity` (+ `pointer-events: none`); set `aria-busy`, `aria-disabled`; swallow `onClick`. The `role="status"` live region that receives `loadingLabel` is a **sibling outside** the `<button>`/`<a>` (wrap both in a fragment). It is **mounted for as long as the Button is mounted and empty while idle**; `loadingLabel` is written into it when `loading` turns on and removed when it turns off (screen readers often skip a live region that appears with its text already inside — review finding 13). It is styled with the standard visually-hidden pattern (clip, 1px, overflow hidden) from a shared internal helper `src/internal/visuallyHidden.ts`, so it is announced but never part of the button's name.
- **ButtonSpinner** (private, `ButtonSpinner.tsx`): MUI `CircularProgress` with `size` = icon size token, `color="inherit"`, `disableShrink`. One turn per `cssVars.motion.duration.progress` (B4) — not `2xl`. Will be replaced by the Progress component on Day 5 (leave a `// TODO(progress)` comment).
- **RTL icons (B5):** the consumer marks a directional icon with `className="bw-icon-directional"` on the icon element (documented main way) or `mirrorInRtl` on a custom icon element. In `Button.tsx`: detect either marker on `startIcon`/`endIcon`, strip `mirrorInRtl` **whenever the prop is present** (`'mirrorInRtl' in icon.props`, so `mirrorInRtl={false}` is stripped too — finding 15) with `React.cloneElement(icon, { mirrorInRtl: undefined })`, strip the class from the icon, and put `bw-icon-directional` on the wrapper `.bw-button__icon` only. The rule is scoped to the wrapper — `[dir='rtl'] & .bw-button__icon.bw-icon-directional { transform: scaleX(-1) }` — so exactly one element is flipped. Export a small helper type so `mirrorInRtl` on a custom element is not a TS error. Document both ways in the component's JSDoc.
- **Disabled ↔ enabled (B4):** colours change instantly both ways — apply `transition: none` (or `transition-duration: var(--bw-motion-duration-instant)`) while disabled and on the frame the button is re-enabled; hover/press transitions are unchanged.
- **Invalid combinations:** a `warnOnce(key, message)` helper (`src/internal/warnOnce.ts`, dev only via `process.env.NODE_ENV !== 'production'`). Fallbacks exactly as B1.
- **Test tooling — emotion caches (plan 1.2, finding 11).** Cause: `BiowaveProvider` creates its two emotion caches once per module, non-speedy in tests, so every CSS rule becomes its own `<style>` tag that `cleanup()` never removes; axe and user-event slow down with the tag count. Fix, following MUI's own test renderer (`@mui/internal-test-utils` `createRenderer`: a new emotion cache in `beforeEach`, its `sheet.tags` removed in `afterEach`) and the `@emotion/cache` `speedy` option (one `<style>` tag per cache, rules added with `insertRule`):
  1. `2-foundations/web/src/BiowaveProvider.tsx`: move the two `createCache` calls into an exported factory `createBiowaveEmotionCaches(options?: { speedy?: boolean }): BiowaveEmotionCaches` (`{ ltr, rtl }`, same keys `bw` / `bw-rtl`, `prepend: true`, RTL stylis plugins `[prefixer, rtlPlugin]`; `speedy` passed through, `undefined` keeps emotion's default). The module-level default is `createBiowaveEmotionCaches()`, so app behaviour does not change. Add an optional prop `emotionCaches?: BiowaveEmotionCaches` (JSDoc: "Advanced — tests and isolated roots. Defaults to the shared Biowave caches"); the provider uses `emotionCaches[direction]`. Export the factory and the type from `2-foundations/web/src/index.ts`.
  2. `3-web-components/src/test/render.tsx`: keep one test cache pair per test — create it lazily with `createBiowaveEmotionCaches({ speedy: true })` on the first `renderWithBiowave` of a test and pass it as `emotionCaches`; export `resetTestEmotionCaches()` that calls `sheet.flush()` on both caches (removes their tags) and drops the pair, so the next test starts with a fresh cache (fresh `inserted` map — styles are inserted again, never assumed).
  3. `3-web-components/src/test/setup.ts`: in the existing `afterEach`, call `resetTestEmotionCaches()` **after** `cleanup()`.
  4. No test file creates its own emotion cache or `BiowaveProvider`; all render through `renderWithBiowave`. Do not raise timeouts, do not change `vitest.config.ts` (no `testTimeout`, no `fileParallelism` change).
  Planner probe (2026-10-19, clean Linux copy, 2 CPUs, Node 22.22.0, all 7 raised timeouts in the web tests removed, not committed): baseline 73/77 in 2 m 32 s; speedy only (module caches) 74/77 in 1 m 20 s — still fails, because rules still pile up across tests; fresh cache per test without speedy 77/77 in 44 s; **fresh cache per test + speedy 77/77 in 35 s** (chosen). Slowest tests with the chosen fix: Text field matrix 2.61 s, Split button matrix 1.73 s, Button matrix 1.57 s, Button axe light / dark 1.04 s / 0.93 s (were 15.25 s / 15.09 s), Icon button axe light 0.12 s (was 6.21 s ✗), Split button keyboard 0.49 s (was 5.70 s ✗), Text field axe 0.93 s (was 6.45 s ✗). `npm run typecheck` ✅; no "problem inserting the following rule" errors from speedy `insertRule`.
- **Gotchas:** MUI `Button` uppercases text by default → `textTransform: 'none'`. MUI min-width (64) → `minWidth: 0`. MUI adds `padding` per size → override with tokens. With `href`, MUI renders `<a>`; disabled anchors need `aria-disabled` + `tabIndex=-1` + `preventDefault`.

### Token gaps

None. Added on 2026-10-16 before this plan (Foundations 1.1.0): `size-control-height-*`, `spacing-control-padding-inline-*`, `spacing-control-gap-*`, `color-background-inverse-*`, `color-border-inverse`, `color-background-transparent-hovered`, `color-background-transparent-pressed`.

### Files to create / change

```
3-web-components/package.json                         change: add devDependencies (below) + "test": "vitest run"
3-web-components/vitest.config.ts                     new: jsdom, setupFiles
3-web-components/src/test/setup.ts                    new: @testing-library/jest-dom, vitest-axe matchers
3-web-components/src/test/render.tsx                  new: renderWithBiowave(ui, { theme: 'light'|'dark', locale: 'en'|'ar' }) using BiowaveProvider
                                                      change (1.2): per-test speedy emotion caches + resetTestEmotionCaches() (C3 › Test tooling)
3-web-components/src/test/setup.ts                    change (1.2): afterEach → cleanup() then resetTestEmotionCaches()
3-web-components/src/test/render.test.tsx             new (1.2): tooling test for the cache reset (C6)
2-foundations/web/src/BiowaveProvider.tsx             change (1.2): createBiowaveEmotionCaches() + optional emotionCaches prop; default unchanged
2-foundations/web/src/index.ts                        change (1.2): export createBiowaveEmotionCaches, type BiowaveEmotionCaches
3-web-components/src/internal/warnOnce.ts             new
3-web-components/src/components/button/Button.tsx     new
3-web-components/src/components/button/button.tokens.ts   new
3-web-components/src/components/button/ButtonSpinner.tsx  new (private, not exported from the package)
3-web-components/src/components/button/Button.test.tsx    new
3-web-components/src/components/button/index.ts       new: export { Button } and types ButtonProps, ButtonVariant, ButtonColor, ButtonSize
3-web-components/src/index.ts                         change: uncomment the Button export
3-web-components/README.md                            change: status table row; (1.2) Stack › Tests line names the per-test emotion cache reset
package.json (root)                                   change: "test:web": "npm test -w 3-web-components"
```

devDependencies to add to `3-web-components`: `@mui/material@^9.5`, `material-symbols` (D-18; was `@mui/icons-material`), `@emotion/react`, `@emotion/styled`, `react@^19`, `react-dom@^19`, `@types/react`, `@types/react-dom`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`. Run `npm install` at the repo root first (no `node_modules` exist yet; `npm run typecheck` currently fails only because MUI is not installed).

## 10. Tests

- [ ] Renders every allowed `variant` × `color` × `size` in light + dark and en + ar (snapshot of computed CSS variables per part, B3)
- [ ] Every state in B4: hover, pressed (`:active`), focus-visible, disabled, loading
- [ ] Loading: `aria-busy`, `aria-disabled`, still focusable, `onClick` not called, width unchanged, status announced once
- [ ] Disabled: not focusable, `onClick` not called; `href` + disabled does not navigate
- [ ] Each invalid combination in B1 warns once and renders its fallback
- [ ] `startIcon` directional icon mirrors under `dir="rtl"`; non-directional does not
- [ ] axe: no violations for each variant in both themes; keyboard table in B6 (Enter, Space, Tab)
- [ ] No raw values: the component file contains no hex, px, ms or font names (lint test)

Implement every item in B9, plus:
- [ ] `renderWithBiowave` works for the 4 theme × locale combinations (used by all later components)
- [ ] A "no raw values" test: read `Button.tsx`, `button.tokens.ts` and `ButtonSpinner.tsx` as text and fail on `/#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i` (word boundaries — no stripping of other words)
- [ ] Loading keeps the name: with `loading`, `computeAccessibleName(button)` = the label (e.g. "Save changes"), and the `role="status"` element is **not** inside the button
- [ ] RTL mirrors once: in `ar`, for an icon marked with the class and one marked with `mirrorInRtl`, exactly one element in the icon path carries the flip rule, and `mirrorInRtl` never reaches the DOM (no React warning)
- [ ] Token assertions per variant × color: container, label, icon and border rules use the `cssVars` from B3 (assert the generated CSS rules, not jsdom layout); states and axe run for every allowed color, not only `brand`
- [ ] Spinner uses `motion-duration-progress`; under reduced motion its animation duration stays non-zero
- [ ] No layout claims in jsdom (e.g. "width unchanged while loading") — keep those as manual checks in C8
- [ ] (1.2) Tooling, in `src/test/render.test.tsx`: after a test that renders through `renderWithBiowave`, the next test starts with no `style[data-emotion]` tags from the previous test, and a render after the reset still produces the expected CSS rules (styles are re-inserted into the new cache)
- [ ] (1.2) Live region (finding 13): the `role="status"` sibling exists and is empty before `loading`; after `loading` turns on it contains `loadingLabel`; after it turns off it is empty again and still mounted. Screen-reader announcement is a manual check in C8 (VoiceOver or NVDA, EN + AR)
- [ ] (1.2) `mirrorInRtl={false}` on a custom icon that spreads its props does not reach the DOM and causes no React warning (finding 15)
- [ ] (1.2) Re-enable (finding 16): after the next animation frame the instant-duration rule is gone and the `motion-duration-sm` transition applies again
- [ ] (1.2) No per-test timeout arguments in `Button.test.tsx` (finding 12); every Button test passes under the 5 s default

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token via `cssVars`/theme; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (loading keeps focus and is announced)
- [ ] AC-5 Tests in B9 + C6 above exist and pass; `npm run typecheck`, `npm run test:web`, `npm run sync` pass
- [ ] AC-6 Exported from `src/index.ts`; `3-web-components/README.md` status table updated to `Built`
- [ ] AC-7 MUI ripple, elevation, uppercase and min-width are all disabled
- [ ] AC-8 Test tooling (`vitest.config.ts`, `src/test/*`) is generic and documented in one line in `3-web-components/README.md` › Stack › Tests
- [ ] AC-9 Review round 1 findings fixed: #1 loading name, #2 single RTL flip, #3 `mirrorInRtl` stripped, #5 opacity fades, #6 tests, #7 instant disabled change, #8 visually-hidden helper (E2)
- [ ] AC-10 C8 gets a "Round 2" block; header `Code` set to `Built`; `3-web-components/README.md` table matches
- [ ] AC-11 (finding 11) Test tooling per C3 › Test tooling: `createBiowaveEmotionCaches` + optional `emotionCaches` prop in Foundations (default behaviour unchanged), per-test speedy caches in `render.tsx`, `resetTestEmotionCaches()` after `cleanup()` in `setup.ts`, tooling test in `render.test.tsx`. `npm run test:web` **as configured** passes **77/77** (or the full count, if tests are added) with the default 5 s timeout, no `testTimeout` / `fileParallelism` change
- [ ] AC-12 (finding 12) The raised timeouts at `Button.test.tsx:202` (30 s), `:344` (20 s) and `:610` (20 s) are removed; every Button test is well under 5 s (planner probe: slowest 1.57 s)
- [ ] AC-13 (finding 13) Live region always mounted, empty when idle, `loadingLabel` written on loading (C3 › Loading, C6)
- [ ] AC-14 (findings 15, 16) `mirrorInRtl` stripped whenever present; re-enable test asserts the transition comes back (C6)
- [ ] AC-15 (finding 17) The C8 "Fix round 1" entry lists every command with ✓/✗ and real numbers: `npm run typecheck`, `npm run test:web` (passed/total, duration), `npm run docs:check`, `npm run sync`; plus the slowest Button test times and the manual checks (loading width, screen-reader announcement)

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
1. #11 Test tooling — C3 › Test tooling steps 1–4. Files: `2-foundations/web/src/BiowaveProvider.tsx`, `2-foundations/web/src/index.ts`, `3-web-components/src/test/render.tsx`, `3-web-components/src/test/setup.ts`, new `3-web-components/src/test/render.test.tsx`. Shared tooling: it also unblocks Icon button, Split button and Text field; do not edit their files (their own raised timeouts — `IconButton.test.tsx:86`, `SplitButton.test.tsx:93, 272`, `ButtonGroup.test.tsx:254` — are removed in their own fix steps; the planner probe shows they pass without them)
2. #12 Remove the three raised timeouts in `3-web-components/src/components/button/Button.test.tsx`
3. #13 Live region always mounted — `3-web-components/src/components/button/Button.tsx` + test
4. #15 Strip `mirrorInRtl` when present (incl. `false`) — `Button.tsx` + test
5. #16 Re-enable test asserts the transition returns — `Button.test.tsx`
6. #17 C8 "Fix round 1" entry with every command result (AC-15); `3-web-components/README.md` › Stack › Tests line; one `CHANGELOG.md` entry (tooling + Button)

Files the Executor may touch in this fix round: exactly the files named in 1–6, plus C8 of this file. Nothing else.

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

1. Fill [C8 Execution log](button.md#c8-execution-log-filled-by-the-executor) in `button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `button.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
