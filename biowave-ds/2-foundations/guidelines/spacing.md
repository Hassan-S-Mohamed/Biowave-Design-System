# Spacing

A 4px base scale with 2px half-steps for micro adjustments. Use spacing tokens for padding, gap and margin. Never add numbers together in code (`8 + 4`); pick the token that matches.

| Token | Value | Use |
|---|---|---|
| `spacing-none` | 0px | Intentional zero spacing. Collapsing gaps, removing default padding on reset elements.
 |
| `spacing-xxs` | 2px | Micro adjustments. Notification badge offset, indicator dot position, tight icon nudges.
 |
| `spacing-xs` | 4px | Icon-to-label gap, tag/badge internal padding, tight chip spacing, button icon gap.
 |
| `spacing-sm` | 6px | Status pill padding, pagination item padding, vertical tab padding, small control gaps.
 |
| `spacing-md` | 8px | Table cell padding, button group gap, modal inner gap, list row vertical padding, tooltip padding.
 |
| `spacing-lg` | 12px | Tab button vertical padding, accordion header padding, form label gap, link group gap.
 |
| `spacing-xl` | 16px | Tab button horizontal padding, button large padding, notification padding, table cell horizontal padding, form field label gap.
 |
| `spacing-2xl` | 20px | Button large horizontal padding, section subgroup spacing, comfortable list gaps on tablet.
 |
| `spacing-3xl` | 24px | Modal padding, card padding, notification horizontal padding, accordion medium gap.
 |
| `spacing-4xl` | 32px | Section padding, section gap, card lg/md/sm padding on web. Major layout rhythm value.
 |
| `spacing-5xl` | 40px | Page content top padding, large drawer padding, between-section vertical rhythm on web.
 |
| `spacing-6xl` | 48px | Accordion medium header gap, large section separators, major vertical rhythm breaks.
 |
| `spacing-7xl` | 64px | Page header bottom margin, switch description offset, large structural gaps on web.
 |
| `spacing-8xl` | 80px | Large layout offsets, page-level container padding on wide breakpoints.
 |
| `spacing-9xl` | 96px | Maximum semantic spacing. Wide-screen page container horizontal padding.
 |
| `spacing-10xl` | 128px | Radio description indent, structural layout offsets in complex dashboard layouts.
 |
| `spacing-11xl` | 160px | Maximum layout structural offset. Rare — use only for intentional large structural gaps.
 |

## Rules
- Use `gap` (flex/grid, Flutter `spacing:` or `SizedBox`) between siblings instead of margins on children.
- Inside a component, use `xs…3xl`. Between page sections, use `4xl…7xl`. `8xl+` are rare layout offsets.
- Use **logical** directions: `padding-inline-start`, `EdgeInsetsDirectional.only(start: …)`.
- Touch platforms: spacing never shrinks a target below `target-min` (48dp); add padding instead.
- Web: `theme.spacing(n)` in MUI = n × 4px; prefer the named token (`cssVars.spacing.md`).

## Control sizes (P-04, added 2026-10-16)
Shared by every control that has a height: Button, Icon button, Split button, Text field, Select, Segmented button. Components pick a size and read all three values from the same step, so a Button and a Text field of the same size line up.

| Size | `size-control-height-*` | `spacing-control-padding-inline-*` | `spacing-control-gap-*` | Icon | Typography | Default on |
|---|---|---|---|---|---|---|
| `sm` | 32 | 8 | 4 | `size-icon-sm` | `action-sm` | dense web (tables, toolbars) |
| `md` | 40 | 12 | 6 | `size-icon-md` | `action-md` | **web** |
| `lg` | 48 | 16 | 8 | `size-icon-lg` | `action-lg` | **tablet, mobile** |
| `xl` | 56 | 24 | 8 | `size-icon-lg` | `action-lg` | tablet/mobile primary actions only |

On touch platforms a control smaller than `lg` keeps a `target-min` (48dp) hit area around it.

