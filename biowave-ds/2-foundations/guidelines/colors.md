# Colors

Biowave color has two layers. **Primitives** are raw ramps (primary navy, secondary teal, neutral, success, error, warning, info; steps 50–950 plus alpha 0–90). **Semantic tokens** give each color a job and switch between Light and Dark. Components use semantic tokens only. The same semantic set serves Web, Tablet and Mobile; only the theme (Light / Dark) changes the value.

```
primitive.color.primary.600 (#193351)  ──►  color-background-brand-default (light)
primitive.color.primary.300 (#607D9F)  ──►  color-background-brand-default (dark)
```

## How to choose a token
1. **What is it?** surface (static container) · background (interactive fill) · text · icon · border · link · overlay. See *Surface vs Background* below.
2. **What role?** neutral · brand · secondary · success · error · warning · info.
3. **What emphasis / state?** default · subtle · subtlest (tonal fills) · hovered · pressed · disabled.
4. Text or icon on a filled background? Use the matching `on` token: `color-background-error-default` + `color-text-on-error`. On a tonal fill (`subtle` / `subtlest`) use the role token: `color-background-error-subtle` + `color-text-role-error`.

## Surface vs Background — read this first

Both can share the same hex value (white in light mode), but they do different jobs and must never be swapped.

| | **surface** | **background** |
|---|---|---|
| What it colors | A **static container** | The **fill of an interactive element** |
| States | **None** — no hovered, pressed or disabled | **Has states** — default, hovered, pressed, disabled |
| Does the user interact with it? | No. The user interacts with what is *inside* it | Yes. The element itself is clicked, tapped, focused or typed into |
| Examples | Page canvas, Card, Panel, Split-view pane, Modal, Dialog, Menu, Popover, Bottom sheet, Drawer, Tooltip, Snackbar | Button, Icon button, Text field, Select, Chip, Table row, List item, Menu item, Toggle, Checkbox, Segmented control, Tab |

**Rule of thumb:** if the element needs a `hovered` or `pressed` look, it takes a **background** token. If it only holds other content, it takes a **surface** token.

**Same element, two cases:**
- A card that only displays content → `color-surface-default`.
- A card the whole of which is clickable (e.g. opens device details) → `color-background-base-default` + `-hovered` / `-pressed`.

**Inverse has the same split:**
- `color-surface-inverse` → the body of a Tooltip or Snackbar (static).
- `color-background-inverse-*` → a white button sitting on a navy area such as the Side navigation or a brand App bar (interactive, has states).

Why keep them apart: changing one never breaks the other. If text fields later become light grey, only `color-background-base-default` changes — cards stay untouched.

Every token description starts with its tag so the difference is visible in Figma and in code: **`[Surface · static, no states]`** or **`[Background · interactive, has states]`**.

## Roles

| Role | Meaning in Biowave | Examples |
|---|---|---|
| brand | Primary actions, active navigation, selection | Save, Add device, active tab |
| secondary | Supporting actions and accents | Secondary CTA, chart accent |
| success | Done, approved, online | Approved request, device online |
| warning | Needs attention, pending, not critical | Pending approval, sync delayed |
| error | Failed, destructive, critical | Delete user, device offline, validation error |
| info | Informational, in progress, syncing | Sync running, tips |
| neutral | Everything without a status | Grey filled button, text, borders, disabled |

## Emphasis and states (background)

| Step | Meaning |
|---|---|
| `default` | Bold fill at rest. Label uses `text-on-{role}` (neutral: `text-default`). |
| `subtle` | Tonal fill (chip, tag, lozenge, tonal button). Label uses `text-role-{role}`. |
| `subtlest` | Lightest tint (alert/banner, selected row). Label uses `text-role-{role}` or `text-default`. |
| `hovered` | Hover of `default` — Web pointer only. For hover on `subtle`/`subtlest`, layer `color-overlay-hovered`. |
| `pressed` | Pressed of `default` (ripple state on Tablet/Mobile). On tonal fills, layer `color-overlay-pressed`. |
| `disabled` | Neutral fill of a disabled control; label `text-disabled`. No hover or press effect. |

State names are **`hovered`** and **`pressed`** everywhere in the system (backgrounds, links, input borders, overlays).

## Rules
- **Never use color alone** to carry meaning (WCAG 1.4.1). Pair status color with an icon or text.
- **Warning uses dark text.** `color-text-on-warning` is near-black in both themes; white on orange fails contrast.
- **Icons mirror text.** `icon-*` has the same names and values as `text-*`, so any text pairing is also valid for icons.
- **Borders:** `color-border-default` is decorative (cards, dividers, 1.38:1). Control boundaries (inputs, checkboxes, outline buttons) must use `color-border-input-default` (≥ 3:1).
- **Disabled** colors are exempt from contrast but must still look different from enabled ones and stay readable.
- **Dark mode depth:** surfaces get lighter as they rise (`page` 950 → `default` 900 → `raised` 800). Tonal fills in dark use the 900 (`subtle`) and 950 (`subtlest`) steps of each ramp.
- Third-party brand colors (payment networks) live in `color-external-*` and are never themed.

## Contrast guarantee
`npm run tokens` checks 123 foreground/background pairs in both themes (WCAG 2.2: 4.5:1 text, 3:1 icons, control boundaries and focus). The build fails on any violation. Add a pair to `scripts/contrast-pairs.json` whenever a component introduces a new combination.

## Surface
Static containers, no states.

| Token | Light | Dark | Use |
|---|---|---|---|
| `color-surface-page` | `#F7F7F7` · neutral.50 | `#0A0A0A` · neutral.950 | App canvas behind all content (Web page, Flutter Scaffold). Lowest emphasis. Users never interact with it; interactive elements on it use background tokens. |
| `color-surface-default` | `#FFFFFF` · neutral.0 | `#141414` · neutral.900 | Container for grouped content: Card, Panel, Data table container, Side navigation, each split-view pane on Tablet/Foldable. If the whole container is clickable, use background/base instead. |
| `color-surface-subtle` | `#F7F7F7` · neutral.50 | `#292929` · neutral.800 | Low-emphasis static block inside a page or card: page header band, grouped section, documentation home card. Not clickable; a clickable block uses background/base. |
| `color-surface-raised` | `#FFFFFF` · neutral.0 | `#292929` · neutral.800 | Floating container above the page: Modal, Dialog, Menu, Popover, Drawer, Bottom sheet. Always pair with an elevation token. Menu items inside it use background tokens. |
| `color-surface-inverse` | `#141414` · neutral.900 | `#FFFFFF` · neutral.0 | Opposite-theme container: Tooltip and Snackbar body. Text and icons on it use text/inverse and icon/inverse. For a clickable element on a dark area, use background/inverse. |

## Background
Interactive fills with states.

| Token | Light | Dark | Use |
|---|---|---|---|
| `color-background-transparent-default` | `#54545400` · neutral.alpha.0 | `#54545400` · neutral.alpha.0 | No fill at rest. For Text button, standard Icon button, ghost Tab, link-style List item. Never use for containers. |
| `color-background-transparent-hovered` | `#5454541A` · neutral.alpha.10 | `#54545466` · neutral.alpha.40 | Hover fill of transparent elements (Web pointer only). |
| `color-background-transparent-pressed` | `#54545433` · neutral.alpha.20 | `#54545499` · neutral.alpha.60 | Pressed fill of transparent elements; the pressed/ripple state on Tablet and Mobile. |
| `color-background-transparent-disabled` | `#54545400` · neutral.alpha.0 | `#54545400` · neutral.alpha.0 | Disabled transparent element. Stays transparent; show the disabled state with text/disabled and icon/disabled. No hover or press effect. |
| `color-background-base-default` | `#FFFFFF` · neutral.0 | `#141414` · neutral.900 | Default neutral fill of interactive elements: Outlined button, Text field, Select, Search, Checkbox/Radio box, clickable Card, Table row, List item. For a non-clickable card use surface/default. |
| `color-background-base-subtle` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Low-emphasis neutral fill, a step darker than default: Filled text field, Neutral chip/tag, Segmented control track, Toggle track (off). For hover/press on it, layer overlay/hovered or overlay/pressed. |
| `color-background-base-subtlest` | `#F7F7F7` · neutral.50 | `#0A0A0A` · neutral.950 | Lowest-emphasis neutral fill, almost invisible: Zebra table rows, Read-only field, Code block. Not a container; for static grouping use a surface token. |
| `color-background-base-hovered` | `#EDEDED` · neutral.100 | `#404040` · neutral.700 | Hover fill for base/default elements: Table row, List item, Menu item, Outlined button (Web pointer only). |
| `color-background-base-pressed` | `#DBDBDB` · neutral.200 | `#545454` · neutral.600 | Pressed fill for base/default elements: Table row, List item, Menu item. |
| `color-background-base-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of disabled base elements: Text field, Select, Outlined button. No hover or press effect when disabled. |
| `color-background-inverse-default` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Fill of a clickable element placed on a dark or brand area: button on the navy Side navigation, brand App bar, hero banner. Label uses text/role/brand. For a Tooltip/Snackbar body use surface/inverse. |
| `color-background-inverse-hovered` | `#EDEDED` · neutral.100 | `#141414` · neutral.900 | Hover fill of background/inverse elements (Web pointer only). |
| `color-background-inverse-pressed` | `#DBDBDB` · neutral.200 | `#292929` · neutral.800 | Pressed fill of background/inverse elements. |
| `color-background-neutral-default` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Bold neutral fill of an interactive element: Filled button (neutral colour), neutral Icon button. Text and icons on it use text/default and icon/default. |
| `color-background-neutral-hovered` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 | Hover fill of neutral/default elements (Web pointer only). |
| `color-background-neutral-pressed` | `#BDBDBD` · neutral.300 | `#545454` · neutral.600 | Pressed fill of neutral/default elements. |
| `color-background-neutral-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled neutral element. Label uses text/disabled. No hover or press effect. |
| `color-background-brand-default` | `#193351` · primary.600 | `#607D9F` · primary.300 | Bold brand fill of an interactive element: Filled button, Split button, FAB, checked Checkbox/Radio, Toggle on, Progress bar. Text and icons on it use text/on/brand and icon/on/brand. Primary actions and selection. |
| `color-background-brand-subtle` | `#BEC9D9` · primary.100 | `#071323` · primary.900 | Tonal brand fill: brand Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/brand. Primary actions and selection. |
| `color-background-brand-subtlest` | `#E8ECF2` · primary.50 | `#030A14` · primary.950 | Lightest brand tint: brand Alert/Banner, selected/highlighted row. Text on it uses text/role/brand or text/default. Primary actions and selection. |
| `color-background-brand-hovered` | `#132843` · primary.700 | `#90A3BC` · primary.200 | Hover fill of brand/default elements (Web pointer only). |
| `color-background-brand-pressed` | `#0D1E33` · primary.800 | `#BEC9D9` · primary.100 | Pressed fill of brand/default elements. |
| `color-background-brand-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled brand element. Neutral, so the role colour disappears. Label uses text/disabled. No hover or press effect. |
| `color-background-secondary-default` | `#0C5F79` · secondary.600 | `#5DA8C2` · secondary.300 | Bold secondary fill of an interactive element: Secondary filled button, accent Badge. Text and icons on it use text/on/secondary and icon/on/secondary. Supporting actions and accents. |
| `color-background-secondary-subtle` | `#C0DDE8` · secondary.100 | `#032A37` · secondary.900 | Tonal secondary fill: secondary Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/secondary. Supporting actions and accents. |
| `color-background-secondary-subtlest` | `#E8F4F8` · secondary.50 | `#011820` · secondary.950 | Lightest secondary tint: secondary Alert/Banner, selected/highlighted row. Text on it uses text/role/secondary or text/default. Supporting actions and accents. |
| `color-background-secondary-hovered` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 | Hover fill of secondary/default elements (Web pointer only). |
| `color-background-secondary-pressed` | `#063C4E` · secondary.800 | `#C0DDE8` · secondary.100 | Pressed fill of secondary/default elements. |
| `color-background-secondary-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled secondary element. Neutral, so the role colour disappears. Label uses text/disabled. No hover or press effect. |
| `color-background-success-default` | `#1E6D41` · success.700 | `#55BE87` · success.300 | Bold success fill of an interactive element: Confirm/Approve button, Success badge, Online status dot. Text and icons on it use text/on/success and icon/on/success. Positive results, completed states, confirmations. |
| `color-background-success-subtle` | `#C1E8D2` · success.100 | `#0E3921` · success.900 | Tonal success fill: success Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/success. Positive results, completed states, confirmations. |
| `color-background-success-subtlest` | `#E9F7EF` · success.50 | `#071F12` · success.950 | Lightest success tint: success Alert/Banner, selected/highlighted row. Text on it uses text/role/success or text/default. Positive results, completed states, confirmations. |
| `color-background-success-hovered` | `#165331` · success.800 | `#8DD4AE` · success.200 | Hover fill of success/default elements (Web pointer only). |
| `color-background-success-pressed` | `#0E3921` · success.900 | `#C1E8D2` · success.100 | Pressed fill of success/default elements. |
| `color-background-success-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled success element. Neutral, so the role colour disappears. Label uses text/disabled. No hover or press effect. |
| `color-background-error-default` | `#D42222` · error.700 | `#FF7676` · error.300 | Bold error fill of an interactive element: Destructive button (Delete user/device), Error badge, Count badge. Text and icons on it use text/on/error and icon/on/error. Errors, failures and destructive actions. |
| `color-background-error-subtle` | `#FECFCF` · error.100 | `#721212` · error.900 | Tonal error fill: error Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/error. Errors, failures and destructive actions. |
| `color-background-error-subtlest` | `#FEF0EE` · error.50 | `#420A0A` · error.950 | Lightest error tint: error Alert/Banner, selected/highlighted row. Text on it uses text/role/error or text/default. Errors, failures and destructive actions. |
| `color-background-error-hovered` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 | Hover fill of error/default elements (Web pointer only). |
| `color-background-error-pressed` | `#721212` · error.900 | `#FECFCF` · error.100 | Pressed fill of error/default elements. |
| `color-background-error-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled error element. Neutral, so the role colour disappears. Label uses text/disabled. No hover or press effect. |
| `color-background-warning-default` | `#FF9435` · warning.500 | `#FFB05E` · warning.300 | Bold warning fill of an interactive element: Warning button, Warning badge (always dark text). Text and icons on it use text/on/warning and icon/on/warning. Alerts, potential risks, actions that need attention. |
| `color-background-warning-subtle` | `#FFE0C0` · warning.100 | `#773F12` · warning.900 | Tonal warning fill: warning Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/warning. Alerts, potential risks, actions that need attention. |
| `color-background-warning-subtlest` | `#FFF3E8` · warning.50 | `#4A2609` · warning.950 | Lightest warning tint: warning Alert/Banner, selected/highlighted row. Text on it uses text/role/warning or text/default. Alerts, potential risks, actions that need attention. |
| `color-background-warning-hovered` | `#FF8C32` · warning.600 | `#FFC88F` · warning.200 | Hover fill of warning/default elements (Web pointer only). |
| `color-background-warning-pressed` | `#D97424` · warning.700 | `#FFE0C0` · warning.100 | Pressed fill of warning/default elements. |
| `color-background-warning-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled warning element. Neutral, so the role colour disappears. Label uses text/disabled. No hover or press effect. |
| `color-background-info-default` | `#2559D4` · info.600 | `#6D9CE8` · info.300 | Bold info fill of an interactive element: Info badge, In-progress step, Sync indicator. Text and icons on it use text/on/info and icon/on/info. Guidance, information, in-progress states. |
| `color-background-info-subtle` | `#CBDCFA` · info.100 | `#0E265F` · info.900 | Tonal info fill: info Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/info. Guidance, information, in-progress states. |
| `color-background-info-subtlest` | `#EEF4FF` · info.50 | `#081638` · info.950 | Lightest info tint: info Alert/Banner, selected/highlighted row. Text on it uses text/role/info or text/default. Guidance, information, in-progress states. |
| `color-background-info-hovered` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Hover fill of info/default elements (Web pointer only). |
| `color-background-info-pressed` | `#153786` · info.800 | `#CBDCFA` · info.100 | Pressed fill of info/default elements. |
| `color-background-info-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of a disabled info element. Neutral, so the role colour disappears. Label uses text/disabled. No hover or press effect. |

## Text
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-text-default` | `#0A0A0A` · neutral.950 | `#F7F7F7` · neutral.50 | Primary text: body, headings, Button label (outlined/text), Table cell values, Input value. |
| `color-text-subtle` | `#292929` · neutral.800 | `#DBDBDB` · neutral.200 | Secondary text: Side-nav / Navigation bar items, Input labels, Subheadings, subtle Button links, Table headers. |
| `color-text-subtlest` | `#545454` · neutral.600 | `#BDBDBD` · neutral.300 | Tertiary text: Placeholder, Helper text, Metadata, Timestamps, Breadcrumbs, Captions. Meets 4.5:1 on every surface and base fill. |
| `color-text-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text on surface/inverse: Tooltip and Snackbar. |
| `color-text-disabled` | `#969696` · neutral.400 | `#707070` · neutral.500 | Disabled Button label, Input value/label, Menu item. Exempt from contrast but must stay readable. |
| `color-text-role-brand` | `#132843` · primary.700 | `#90A3BC` · primary.200 | Active Tab label, active Side-nav item, selected Chip label, label on background/inverse. |
| `color-text-role-secondary` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 | Secondary accent text, secondary Chip label. |
| `color-text-role-success` | `#1E6D41` · success.700 | `#8DD4AE` · success.200 | Input success message, success Chip/Alert text, "Online" status label. |
| `color-text-role-error` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 | Input error message, error Chip/Alert text, required asterisk. |
| `color-text-role-warning` | `#773F12` · warning.900 | `#FFC88F` · warning.200 | Warning Chip/Lozenge text, Warning Alert text. |
| `color-text-role-info` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Info Alert text, in-progress / workflow status label. |
| `color-text-on-brand` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/brand/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-secondary` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/secondary/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-success` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/success/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-error` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/error/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-warning` | `#0A0A0A` · neutral.950 | `#0A0A0A` · neutral.950 | Text colour placed on background/warning/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-info` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/info/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |

## Icon
Same names and values as Text.

| Token | Light | Dark | Use |
|---|---|---|---|
| `color-icon-default` | `#0A0A0A` · neutral.950 | `#F7F7F7` · neutral.50 | Icons in Icon button, Toolbar, Table actions, Input trailing icon. |
| `color-icon-subtle` | `#292929` · neutral.800 | `#DBDBDB` · neutral.200 | Side-nav / Navigation bar icons, Input leading icon, Menu item icons. |
| `color-icon-subtlest` | `#545454` · neutral.600 | `#BDBDBD` · neutral.300 | Breadcrumb chevrons, Metadata icons, Helper/info hint icon. |
| `color-icon-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icons inside Tooltip and Snackbar (on surface/inverse). |
| `color-icon-disabled` | `#969696` · neutral.400 | `#707070` · neutral.500 | Icons in disabled Button, Icon button, Input, Menu item. |
| `color-icon-role-brand` | `#132843` · primary.700 | `#90A3BC` · primary.200 | Active Side-nav / Navigation bar icon, selected Tab icon. |
| `color-icon-role-secondary` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 | Secondary accent icons. |
| `color-icon-role-success` | `#1E6D41` · success.700 | `#8DD4AE` · success.200 | Success Alert icon, check icon, Online status icon. |
| `color-icon-role-error` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 | Error Alert icon, Input error icon, offline device icon. |
| `color-icon-role-warning` | `#773F12` · warning.900 | `#FFC88F` · warning.200 | Warning Alert icon, pending status icon. |
| `color-icon-role-info` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Info Alert icon, sync / in-progress icon. |
| `color-icon-on-brand` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/brand/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-secondary` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/secondary/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-success` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/success/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-error` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/error/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-warning` | `#0A0A0A` · neutral.950 | `#0A0A0A` · neutral.950 | Icon colour placed on background/warning/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-info` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/info/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |

## Border
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-border-default` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 | Decorative separation: cards, tables, dividers. Not for control boundaries. |
| `color-border-subtle` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 |  |
| `color-border-strong` | `#BDBDBD` · neutral.300 | `#545454` · neutral.600 |  |
| `color-border-disabled` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 |  |
| `color-border-brand` | `#607D9F` · primary.300 | `#254471` · primary.500 |  |
| `color-border-secondary` | `#5DA8C2` · secondary.300 | `#1A7596` · secondary.500 |  |
| `color-border-success` | `#55BE87` · success.300 | `#2D9860` · success.500 |  |
| `color-border-error` | `#FF7676` · error.300 | `#FF3B3B` · error.500 |  |
| `color-border-warning` | `#FFB05E` · warning.300 | `#FF9435` · warning.500 |  |
| `color-border-info` | `#6D9CE8` · info.300 | `#336CD9` · info.500 |  |
| `color-border-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Outlines and focus ring of controls placed on brand or inverse surfaces. |
| `color-border-input-default` | `#707070` · neutral.500 | `#969696` · neutral.400 |  |
| `color-border-input-error` | `#D42222` · error.700 | `#FF7676` · error.300 |  |
| `color-border-input-hovered` | `#404040` · neutral.700 | `#BDBDBD` · neutral.300 |  |
| `color-border-focus` | `#254471` · primary.500 | `#90A3BC` · primary.200 | Keyboard focus ring. FIX: was primary/200 (2.58:1 on white, below 3:1). |

## Link
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-link-default` | `#2559D4` · info.600 | `#6D9CE8` · info.300 |  |
| `color-link-pressed` | `#153786` · info.800 | `#CBDCFA` · info.100 |  |
| `color-link-visited` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 |  |
| `color-link-hovered` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 |  |

## Overlay
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-overlay-backdrop` | `#54545499` · neutral.alpha.60 | `#545454B3` · neutral.alpha.70 | Behind modals and blocking drawers. |
| `color-overlay-scrim` | `#5454544D` · neutral.alpha.30 | `#54545466` · neutral.alpha.40 | Non-blocking dimming. |
| `color-overlay-subtle` | `#5454541A` · neutral.alpha.10 | `#54545433` · neutral.alpha.20 | Quiet hover/selected layer. |
| `color-overlay-brand` | `#19335133` · primary.alpha.20 | `#1933514D` · primary.alpha.30 |  |
| `color-overlay-secondary` | `#0C5F7933` · secondary.alpha.20 | `#0C5F794D` · secondary.alpha.30 |  |
| `color-overlay-success` | `#26875133` · success.alpha.20 | `#2687514D` · success.alpha.30 |  |
| `color-overlay-error` | `#FF2B2B33` · error.alpha.20 | `#FF2B2B4D` · error.alpha.30 |  |
| `color-overlay-warning` | `#FF8C3233` · warning.alpha.20 | `#FF8C324D` · warning.alpha.30 |  |
| `color-overlay-info` | `#2559D433` · info.alpha.20 | `#2559D44D` · info.alpha.30 |  |
| `color-overlay-pressed` | `#54545433` · neutral.alpha.20 | `#54545499` · neutral.alpha.60 | State layer over a non-filled control on press. |
| `color-overlay-hovered` | `#5454541A` · neutral.alpha.10 | `#54545466` · neutral.alpha.40 | State layer over a non-filled control (tonal, outlined, text) on hover. Placed above the control's own fill. |

Primitive ramps: see `preview/index.html` → Palette, or `dist/tokens.json` → `primitive`.
