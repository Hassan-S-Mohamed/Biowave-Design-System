# Colors

Biowave color has two layers. **Primitives** are raw ramps (primary navy, secondary teal, neutral, success, error, warning, info; steps 50–950 plus alpha 0–90). **Semantic tokens** give each color a job and switch between Light and Dark. Components use semantic tokens only. The same semantic set serves Web, Tablet and Mobile; only the theme (Light / Dark) changes the value.

```
primitive.color.primary.600 (#193351)  ──►  color-background-brand-default (light)
primitive.color.primary.300 (#607D9F)  ──►  color-background-brand-default (dark)
```

## How to choose a token
1. **What is it?** surface (static container) · background (interactive fill) · text · icon · border · link · overlay. See *Surface vs Background* below.
2. **What role?** neutral · brand · secondary · success · error · warning · info.
3. **What emphasis / state?** default · subtle · subtlest (tonal fills) · hovered · pressed. Selection is `background-selected-*`; every disabled fill is the single `background-disabled`.
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
| accent | Highlight, promotion, feature callout (orange, never a status) | New-feature badge, highlight card |
| neutral | Everything without a status | Grey filled button, text, borders, disabled |

## Emphasis and states (background)

| Step | Meaning |
|---|---|
| `default` | Bold fill at rest. Label uses `text-on-{role}` (neutral: `text-default`). |
| `subtle` | Tonal fill (chip, tag, lozenge, tonal button). Label uses `text-role-{role}`. |
| `subtlest` | Lightest tint (alert/banner, selected row). Label uses `text-role-{role}` or `text-default`. |
| `hovered` | Hover of `default` — Web pointer only. For hover on `subtle`/`subtlest`, layer `background-transparent-hovered`. |
| `pressed` | Pressed of `default` (ripple state on Tablet/Mobile). On tonal fills, layer `background-transparent-pressed`. |

| Shared token | Meaning |
|---|---|
| `background-selected-default · hovered · pressed` | Selected item (table row, list/menu item, active nav item, tab, chip, card). Text stays `text-default` or `text-role-brand`; always add a non-colour indicator. |
| `background-disabled` | One fill for every disabled control that has a fill (all roles, inputs). Transparent controls stay `background-transparent-default`. Label `text-disabled`. No hover or press effect. |
| `background-transparent-hovered · pressed` | Hover/press of transparent controls **and** the state layer placed over tonal or outlined controls. There is no separate overlay state layer. |

State names are **`hovered`** and **`pressed`** everywhere in the system (backgrounds, links).

## Rules
- **Never use color alone** to carry meaning (WCAG 1.4.1). Pair status color with an icon or text.
- **Warning uses dark text.** `color-text-on-warning` is near-black in both themes; white on orange fails contrast.
- **Icons mirror text.** `icon-*` has the same names and values as `text-*`, so any text pairing is also valid for icons.
- **Borders:** `border-default · subtle · strong` are decorative (cards, dividers). A boundary that identifies a control (text field, select, checkbox, radio) uses `border-bold` (≥ 3:1); role borders (`border-error` …) and `border-focus` also meet 3:1. There is no input-specific border group: components take their border from these tokens in their own component tokens.
- **Overlay is one token.** `overlay-default` dims the page behind blocking layers (modal, dialog, drawer, bottom sheet, side panel). States use `background-transparent-*`; selection uses `background-selected-*`.
- **Visited links** use error 700 / 300 (no purple ramp) — only where revisits matter.
- **Accent** (`background-accent-*`, `text-role-accent` …) is a raw hex orange for now (no primitive ramp yet). It is Material 3 *tertiary* on Flutter and is never used for status.
- **Disabled** colors are exempt from contrast but must still look different from enabled ones and stay readable.
- **Dark mode depth:** surfaces get lighter as they rise (`page` 950 → `default` 900 → `raised` 800). Tonal fills in dark use the 900 (`subtle`) and 950 (`subtlest`) steps of each ramp.
- Third-party brand colors (payment networks) live in `color-external-*` and are never themed.

## Contrast guarantee
`npm run tokens` checks 201 foreground/background pairs in both themes (WCAG 2.2: 4.5:1 text, 3:1 icons, control boundaries and focus). The build fails on any violation. Add a pair to `scripts/contrast-pairs.json` whenever a component introduces a new combination.

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
| `color-background-transparent-default` | `#54545400` · neutral.alpha.0 | `#54545400` · neutral.alpha.0 | No fill at rest. For Text button, standard Icon button, ghost Tab, link-style List item. Also the fill of a disabled transparent element (show the disabled state with text/disabled and icon/disabled). Never use for containers. |
| `color-background-transparent-hovered` | `#5454541A` · neutral.alpha.10 | `#54545466` · neutral.alpha.40 | Hover fill of transparent elements (Web pointer only). Also the hover state layer placed above a tonal (subtle/subtlest) or outlined control. |
| `color-background-transparent-pressed` | `#54545433` · neutral.alpha.20 | `#54545499` · neutral.alpha.60 | Pressed fill of transparent elements and the pressed/ripple state layer above tonal or outlined controls (Tablet and Mobile ripple). |
| `color-background-base-default` | `#FFFFFF` · neutral.0 | `#141414` · neutral.900 | Default neutral fill of interactive elements: Outlined button, Text field, Select, Search, Checkbox/Radio box, clickable Card, Table row, List item. For a non-clickable card use surface/default. |
| `color-background-base-subtle` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Low-emphasis neutral fill, a step darker than default: Filled text field, Neutral chip/tag, Segmented control track, Toggle track (off). For hover/press on it, layer background/transparent/hovered or pressed. |
| `color-background-base-subtlest` | `#F7F7F7` · neutral.50 | `#0A0A0A` · neutral.950 | Lowest-emphasis neutral fill, almost invisible: Zebra table rows, Read-only field, Code block. Not a container; for static grouping use a surface token. |
| `color-background-base-hovered` | `#EDEDED` · neutral.100 | `#404040` · neutral.700 | Hover fill for base/default elements: Table row, List item, Menu item, Outlined button (Web pointer only). |
| `color-background-base-pressed` | `#DBDBDB` · neutral.200 | `#545454` · neutral.600 | Pressed fill for base/default elements: Table row, List item, Menu item. |
| `color-background-inverse-default` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Fill of a clickable element placed on a dark or brand area: button on the navy Side navigation, brand App bar, hero banner. Label uses text/role/brand. For a Tooltip/Snackbar body use surface/inverse. |
| `color-background-inverse-hovered` | `#EDEDED` · neutral.100 | `#141414` · neutral.900 | Hover fill of background/inverse elements (Web pointer only). |
| `color-background-inverse-pressed` | `#DBDBDB` · neutral.200 | `#292929` · neutral.800 | Pressed fill of background/inverse elements. |
| `color-background-neutral-default` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Bold neutral fill of an interactive element: Filled button (neutral colour), neutral Icon button. Text and icons on it use text/default and icon/default. |
| `color-background-neutral-hovered` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 | Hover fill of neutral/default elements (Web pointer only). |
| `color-background-neutral-pressed` | `#BDBDBD` · neutral.300 | `#545454` · neutral.600 | Pressed fill of neutral/default elements. |
| `color-background-selected-default` | `#E8ECF2` · primary.50 | `#193351` · primary.600 | Selected item at rest: selected Table row, List item, Menu item, active Side-nav item, selected Tab, selected Chip, selected Card. Text on it: text/default or text/role/brand; icons: icon/default or icon/role/brand. Always pair with a non-colour indicator (check, bar, bold label). |
| `color-background-selected-hovered` | `#BEC9D9` · primary.100 | `#254471` · primary.500 | Hover fill of a selected item (Web pointer only). |
| `color-background-selected-pressed` | `#90A3BC` · primary.200 | `#3D5E88` · primary.400 | Pressed fill of a selected item. |
| `color-background-brand-default` | `#193351` · primary.600 | `#607D9F` · primary.300 | Bold brand fill of an interactive element: Filled button, Split button, FAB, checked Checkbox/Radio, Toggle on, Progress bar. Text and icons on it use text/on/brand and icon/on/brand. Primary actions and selection. |
| `color-background-brand-subtle` | `#BEC9D9` · primary.100 | `#071323` · primary.900 | Tonal brand fill: brand Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/brand. Primary actions and selection. |
| `color-background-brand-subtlest` | `#E8ECF2` · primary.50 | `#030A14` · primary.950 | Lightest brand tint: brand Alert/Banner, highlighted (not selected) row; selection uses background/selected. Text on it uses text/role/brand or text/default. Primary actions and selection. |
| `color-background-brand-hovered` | `#132843` · primary.700 | `#90A3BC` · primary.200 | Hover fill of brand/default elements (Web pointer only). |
| `color-background-brand-pressed` | `#0D1E33` · primary.800 | `#BEC9D9` · primary.100 | Pressed fill of brand/default elements. |
| `color-background-secondary-default` | `#0C5F79` · secondary.600 | `#5DA8C2` · secondary.300 | Bold secondary fill of an interactive element: Secondary filled button, accent Badge. Text and icons on it use text/on/secondary and icon/on/secondary. Supporting actions and accents. |
| `color-background-secondary-subtle` | `#C0DDE8` · secondary.100 | `#032A37` · secondary.900 | Tonal secondary fill: secondary Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/secondary. Supporting actions and accents. |
| `color-background-secondary-subtlest` | `#E8F4F8` · secondary.50 | `#011820` · secondary.950 | Lightest secondary tint: secondary Alert/Banner, highlighted (not selected) row; selection uses background/selected. Text on it uses text/role/secondary or text/default. Supporting actions and accents. |
| `color-background-secondary-hovered` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 | Hover fill of secondary/default elements (Web pointer only). |
| `color-background-secondary-pressed` | `#063C4E` · secondary.800 | `#C0DDE8` · secondary.100 | Pressed fill of secondary/default elements. |
| `color-background-accent-default` | `#C2410C` (hex) | `#FB923C` (hex) | Bold accent fill (orange, separate from warning): highlight actions, promotional badge, feature callout, chart/illustration accent. Text and icons on it use text/on/accent and icon/on/accent. Material 3 tertiary. |
| `color-background-accent-subtle` | `#FFEDD5` (hex) | `#7C2D12` (hex) | Tonal accent fill: accent Chip/Tag, Tonal button. Text on it uses text/role/accent. Material 3 tertiaryContainer. |
| `color-background-accent-subtlest` | `#FFF7ED` (hex) | `#431407` (hex) | Lightest accent tint: highlight banner, new-feature row. Text on it uses text/role/accent or text/default. |
| `color-background-accent-hovered` | `#9A3412` (hex) | `#FDBA74` (hex) | Hover fill of accent/default elements (Web pointer only). |
| `color-background-accent-pressed` | `#7C2D12` (hex) | `#FED7AA` (hex) | Pressed fill of accent/default elements. |
| `color-background-success-default` | `#1E6D41` · success.700 | `#55BE87` · success.300 | Bold success fill of an interactive element: Confirm/Approve button, Success badge, Online status dot. Text and icons on it use text/on/success and icon/on/success. Positive results, completed states, confirmations. |
| `color-background-success-subtle` | `#C1E8D2` · success.100 | `#0E3921` · success.900 | Tonal success fill: success Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/success. Positive results, completed states, confirmations. |
| `color-background-success-subtlest` | `#E9F7EF` · success.50 | `#071F12` · success.950 | Lightest success tint: success Alert/Banner, highlighted (not selected) row; selection uses background/selected. Text on it uses text/role/success or text/default. Positive results, completed states, confirmations. |
| `color-background-success-hovered` | `#165331` · success.800 | `#8DD4AE` · success.200 | Hover fill of success/default elements (Web pointer only). |
| `color-background-success-pressed` | `#0E3921` · success.900 | `#C1E8D2` · success.100 | Pressed fill of success/default elements. |
| `color-background-error-default` | `#D42222` · error.700 | `#FF7676` · error.300 | Bold error fill of an interactive element: Destructive button (Delete user/device), Error badge, Count badge. Text and icons on it use text/on/error and icon/on/error. Errors, failures and destructive actions. |
| `color-background-error-subtle` | `#FECFCF` · error.100 | `#721212` · error.900 | Tonal error fill: error Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/error. Errors, failures and destructive actions. |
| `color-background-error-subtlest` | `#FEF0EE` · error.50 | `#420A0A` · error.950 | Lightest error tint: error Alert/Banner, highlighted (not selected) row; selection uses background/selected. Text on it uses text/role/error or text/default. Errors, failures and destructive actions. |
| `color-background-error-hovered` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 | Hover fill of error/default elements (Web pointer only). |
| `color-background-error-pressed` | `#721212` · error.900 | `#FECFCF` · error.100 | Pressed fill of error/default elements. |
| `color-background-warning-default` | `#FF9435` · warning.500 | `#FFB05E` · warning.300 | Bold warning fill of an interactive element: Warning button, Warning badge (always dark text). Text and icons on it use text/on/warning and icon/on/warning. Alerts, potential risks, actions that need attention. |
| `color-background-warning-subtle` | `#FFE0C0` · warning.100 | `#773F12` · warning.900 | Tonal warning fill: warning Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/warning. Alerts, potential risks, actions that need attention. |
| `color-background-warning-subtlest` | `#FFF3E8` · warning.50 | `#4A2609` · warning.950 | Lightest warning tint: warning Alert/Banner, highlighted (not selected) row; selection uses background/selected. Text on it uses text/role/warning or text/default. Alerts, potential risks, actions that need attention. |
| `color-background-warning-hovered` | `#FF8C32` · warning.600 | `#FFC88F` · warning.200 | Hover fill of warning/default elements (Web pointer only). |
| `color-background-warning-pressed` | `#D97424` · warning.700 | `#FFE0C0` · warning.100 | Pressed fill of warning/default elements. |
| `color-background-info-default` | `#2559D4` · info.600 | `#6D9CE8` · info.300 | Bold info fill of an interactive element: Info badge, In-progress step, Sync indicator. Text and icons on it use text/on/info and icon/on/info. Guidance, information, in-progress states. |
| `color-background-info-subtle` | `#CBDCFA` · info.100 | `#0E265F` · info.900 | Tonal info fill: info Chip/Tag, Lozenge, Tonal button. Text on it uses text/role/info. Guidance, information, in-progress states. |
| `color-background-info-subtlest` | `#EEF4FF` · info.50 | `#081638` · info.950 | Lightest info tint: info Alert/Banner, highlighted (not selected) row; selection uses background/selected. Text on it uses text/role/info or text/default. Guidance, information, in-progress states. |
| `color-background-info-hovered` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Hover fill of info/default elements (Web pointer only). |
| `color-background-info-pressed` | `#153786` · info.800 | `#CBDCFA` · info.100 | Pressed fill of info/default elements. |
| `color-background-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Fill of any disabled control that has a fill: Filled/Tonal button (every colour), Text field, Select, checked Checkbox/Toggle. Transparent controls stay background/transparent/default. Label uses text/disabled. No hover or press effect. |

## Text
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-text-default` | `#0A0A0A` · neutral.950 | `#F7F7F7` · neutral.50 | Primary text: body, headings, Button label (outlined/text), Table cell values, Input value. |
| `color-text-subtle` | `#292929` · neutral.800 | `#DBDBDB` · neutral.200 | Secondary text: Side-nav / Navigation bar items, Input labels, Subheadings, subtle Button links, Table headers. |
| `color-text-subtlest` | `#545454` · neutral.600 | `#BDBDBD` · neutral.300 | Tertiary text: Placeholder, Helper text, Metadata, Timestamps, Breadcrumbs, Captions. Meets 4.5:1 on every surface and base fill. |
| `color-text-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text on surface/inverse: Tooltip and Snackbar. |
| `color-text-disabled` | `#969696` · neutral.400 | `#707070` · neutral.500 | Disabled Button label, Input value/label, Menu item. Exempt from contrast but must stay readable. |
| `color-text-role-brand` | `#132843` · primary.700 | `#BEC9D9` · primary.100 | Active Tab label, active Side-nav item, selected Chip label, label on background/inverse. |
| `color-text-role-secondary` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 | Secondary accent text, secondary Chip label. |
| `color-text-role-accent` | `#9A3412` (hex) | `#FED7AA` (hex) | Accent text on neutral surfaces and on background/accent/subtle and subtlest: highlight label, feature callout. |
| `color-text-role-success` | `#1E6D41` · success.700 | `#8DD4AE` · success.200 | Input success message, success Chip/Alert text, "Online" status label. |
| `color-text-role-error` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 | Input error message, error Chip/Alert text, required asterisk. |
| `color-text-role-warning` | `#773F12` · warning.900 | `#FFC88F` · warning.200 | Warning Chip/Lozenge text, Warning Alert text. |
| `color-text-role-info` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Info Alert text, in-progress / workflow status label. |
| `color-text-on-brand` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/brand/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-secondary` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/secondary/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-text-on-accent` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text colour placed on background/accent/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
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
| `color-icon-role-brand` | `#132843` · primary.700 | `#BEC9D9` · primary.100 | Active Side-nav / Navigation bar icon, selected Tab icon. |
| `color-icon-role-secondary` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 | Secondary accent icons. |
| `color-icon-role-accent` | `#9A3412` (hex) | `#FED7AA` (hex) | Accent icon: highlight, new-feature marker. |
| `color-icon-role-success` | `#1E6D41` · success.700 | `#8DD4AE` · success.200 | Success Alert icon, check icon, Online status icon. |
| `color-icon-role-error` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 | Error Alert icon, Input error icon, offline device icon. |
| `color-icon-role-warning` | `#773F12` · warning.900 | `#FFC88F` · warning.200 | Warning Alert icon, pending status icon. |
| `color-icon-role-info` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Info Alert icon, sync / in-progress icon. |
| `color-icon-on-brand` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/brand/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-secondary` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/secondary/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-accent` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/accent/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-success` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/success/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-error` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/error/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-warning` | `#0A0A0A` · neutral.950 | `#0A0A0A` · neutral.950 | Icon colour placed on background/warning/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |
| `color-icon-on-info` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Icon colour placed on background/info/default, hovered and pressed fills. Always pair with that fill; never use on surfaces. |

## Border
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-border-default` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 | Decorative separation: Card and Panel outline, Table grid, Divider. Low contrast by design; not for control boundaries. |
| `color-border-subtle` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 | Quietest separation: grouped rows, inner dividers inside a card. |
| `color-border-strong` | `#BDBDBD` · neutral.300 | `#545454` · neutral.600 | Emphasised decorative line: strong Divider, Outlined button outline (the label identifies the button), selected neutral Icon button outline. |
| `color-border-bold` | `#707070` · neutral.500 | `#969696` · neutral.400 | Boundary that identifies a control (≥ 3:1): Text field, Select, Checkbox, Radio, Switch track outline, unselected Segmented control. Hover keeps this border and changes the fill to background/base/hovered. |
| `color-border-disabled` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 | Outline of a disabled control. |
| `color-border-focus` | `#254471` · primary.500 | `#90A3BC` · primary.200 | Keyboard focus ring (2px, 2px offset) on every focusable element. ≥ 3:1 against surfaces. |
| `color-border-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Outline and focus ring of controls placed on brand or inverse areas (navy Side navigation, brand App bar), where border/focus would disappear. |
| `color-border-brand` | `#254471` · primary.500 | `#607D9F` · primary.300 | Selected outline (selected Icon button, selected Card), brand emphasis. ≥ 3:1 against surfaces. |
| `color-border-secondary` | `#1A7596` · secondary.500 | `#5DA8C2` · secondary.300 | Secondary accent outline. ≥ 3:1 against surfaces. |
| `color-border-accent` | `#C2410C` (hex) | `#FB923C` (hex) | Accent outline: highlight card, feature callout. ≥ 3:1 against surfaces. |
| `color-border-success` | `#268751` · success.600 | `#55BE87` · success.300 | Success Alert/Banner outline, valid field. ≥ 3:1 against surfaces. |
| `color-border-error` | `#D42222` · error.700 | `#FF7676` · error.300 | Error outline: invalid Text field/Select, error Alert/Banner, destructive confirmation. ≥ 3:1 against surfaces. |
| `color-border-warning` | `#D97424` · warning.700 | `#FFB05E` · warning.300 | Warning Alert/Banner outline. ≥ 3:1 against surfaces. |
| `color-border-info` | `#2559D4` · info.600 | `#6D9CE8` · info.300 | Info Alert/Banner outline. ≥ 3:1 against surfaces. |

## Link
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-link-default` | `#2559D4` · info.600 | `#6D9CE8` · info.300 | Link at rest: inline links in body text, Breadcrumb links, "Learn more". |
| `color-link-hovered` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 | Link on pointer hover (Web). |
| `color-link-pressed` | `#153786` · info.800 | `#CBDCFA` · info.100 | Link while pressed / active. |
| `color-link-visited` | `#D42222` · error.700 | `#FF7676` · error.300 | Link the user has already opened. Biowave has no purple ramp, so visited uses error 700 / 300. Only where revisits matter (help, docs); app navigation links do not use it. |

## Overlay
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-overlay-default` | `#54545499` · neutral.alpha.60 | `#545454B3` · neutral.alpha.70 | Dimming layer behind blocking layers: Modal, Dialog, blocking Drawer, Bottom sheet, side Panel. Not a fill and not a state layer (states use background/transparent/hovered and pressed; selection uses background/selected). |

## Data visualisation
Fixed order, never cycled: 1 brand blue · 2 gold · 3 rose · 4 teal (secondary) · 5 orange · 6 violet · 7 magenta · 8 olive. A 9th series folds into "Other". Scatter, bubble and map charts use slots 1–3 only. Validated with the dataviz checks in both themes: OKLCH lightness band, chroma ≥ 0.10, adjacent CVD ΔE ≥ 8 (protan/deutan), normal-vision ΔE ≥ 15, marks ≥ 3:1 on `surface-default` and `surface-page`; tag labels ≥ 4.5:1 on their fill. Values, axis labels and legends use text tokens, never these colours. Status colours (success, warning, error, info) are reserved and never used as a series.

| Token | Light | Dark | Use |
|---|---|---|---|
| `color-data-categorical-1` | `#3065A0` (hex) | `#4E89CC` (hex) | Series 1 (brand blue): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-2` | `#B48500` (hex) | `#B68B16` (hex) | Series 2 (gold): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-3` | `#A8545D` (hex) | `#BD5F69` (hex) | Series 3 (rose): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-4` | `#0587AC` (hex) | `#2193B9` (hex) | Series 4 (teal (secondary)): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-5` | `#DE602C` (hex) | `#DA6435` (hex) | Series 5 (orange): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-6` | `#6B50C2` (hex) | `#8673D9` (hex) | Series 6 (violet): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-7` | `#CA5794` (hex) | `#CA5E96` (hex) | Series 7 (magenta): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-categorical-8` | `#6F8D2A` (hex) | `#749331` (hex) | Series 8 (olive): line, bar, area, pie slice, legend swatch. ≥ 3:1 on surfaces. Scatter, bubble and map charts use slots 1–3 only. |
| `color-data-sequential-1` | `#7DAEE9` (hex) | `#36608F` (hex) | Magnitude step 1 of 5 (brand blue, low): heatmap cell, choropleth, intensity scale. One hue, ordered; never for categories. |
| `color-data-sequential-2` | `#6091C9` (hex) | `#537DAE` (hex) | Magnitude step 2 of 5 (brand blue, mid): heatmap cell, choropleth, intensity scale. One hue, ordered; never for categories. |
| `color-data-sequential-3` | `#4574AA` (hex) | `#709CCF` (hex) | Magnitude step 3 of 5 (brand blue, mid): heatmap cell, choropleth, intensity scale. One hue, ordered; never for categories. |
| `color-data-sequential-4` | `#29588D` (hex) | `#8EBBF0` (hex) | Magnitude step 4 of 5 (brand blue, mid): heatmap cell, choropleth, intensity scale. One hue, ordered; never for categories. |
| `color-data-sequential-5` | `#0C3E70` (hex) | `#AEDCFF` (hex) | Magnitude step 5 of 5 (brand blue, high): heatmap cell, choropleth, intensity scale. One hue, ordered; never for categories. |
| `color-data-tag-1-background` | `#DDEFFF` (hex) | `#19314E` (hex) | Categorical tag / avatar fill 1 (brand blue): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-1-text` | `#184E87` (hex) | `#B4D8FF` (hex) | Label and icon on data/tag/1/background (≥ 4.5:1). |
| `color-data-tag-2-background` | `#F8ECD3` (hex) | `#3E2D04` (hex) | Categorical tag / avatar fill 2 (gold): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-2-text` | `#684600` (hex) | `#E9D1A0` (hex) | Label and icon on data/tag/2/background (≥ 4.5:1). |
| `color-data-tag-3-background` | `#FFE4E5` (hex) | `#4A2226` (hex) | Categorical tag / avatar fill 3 (rose): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-3-text` | `#7E2E39` (hex) | `#FFC2C5` (hex) | Label and icon on data/tag/3/background (≥ 4.5:1). |
| `color-data-tag-4-background` | `#D5F2FF` (hex) | `#003647` (hex) | Categorical tag / avatar fill 4 (teal (secondary)): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-4-text` | `#00577A` (hex) | `#A3DEF8` (hex) | Label and icon on data/tag/4/background (≥ 4.5:1). |
| `color-data-tag-5-background` | `#FFE6DB` (hex) | `#492517` (hex) | Categorical tag / avatar fill 5 (orange): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-5-text` | `#7D3416` (hex) | `#FDC6B1` (hex) | Label and icon on data/tag/5/background (≥ 4.5:1). |
| `color-data-tag-6-background` | `#ECE9FF` (hex) | `#302A4C` (hex) | Categorical tag / avatar fill 6 (violet): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-6-text` | `#4D4084` (hex) | `#D3CDFF` (hex) | Label and icon on data/tag/6/background (≥ 4.5:1). |
| `color-data-tag-7-background` | `#FFE4F0` (hex) | `#472335` (hex) | Categorical tag / avatar fill 7 (magenta): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-7-text` | `#772F55` (hex) | `#F9C2DB` (hex) | Label and icon on data/tag/7/background (≥ 4.5:1). |
| `color-data-tag-8-background` | `#E7F1D8` (hex) | `#293510` (hex) | Categorical tag / avatar fill 8 (olive): user-defined Tag, Label, Avatar initials, department or group colour. Same order as data/categorical. |
| `color-data-tag-8-text` | `#3F5700` (hex) | `#CADDAB` (hex) | Label and icon on data/tag/8/background (≥ 4.5:1). |

Primitive ramps: see `preview/index.html` → Palette, or `dist/tokens.json` → `primitive`.
