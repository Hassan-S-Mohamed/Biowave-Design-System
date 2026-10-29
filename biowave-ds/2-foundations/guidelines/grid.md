# Grid and layout

Each platform has a fluid column grid plus layout constants. Values come from `tokens/platform/*.json`.

| Token | Web | Tablet | Mobile | Use |
|---|---|---|---|---|
| `breakpoint-min / max` (viewport width) | ≥ 1200 | 600–1199 | 0–599 | Which platform values apply (Material 3 window size classes) |
| `grid-columns` | 12 | 8 | 4 | Content spans whole columns |
| `grid-gutter` | 24 | 24 | 16 | Space between columns; equals `spacing-layout-group` |
| `grid-margin-full` | 40 | 24 | 16 | Page margin when no sidebar or rail is shown |
| `grid-margin-sidebar` | 24 | 24 | 16 | Page margin next to a persistent sidebar (web) or rail (tablet) |
| `layout-height-app-bar` | 72 | 64 | 64 | App bar (App header) |
| `layout-height-system-status` | 40 | 40 | 40 | Biowave System Status Bar (in-app strip, not the OS status bar) |
| `layout-width-sidebar-start` | 248 | 80 | 0 | Start navigation: web persistent sidebar · tablet navigation rail · mobile modal drawer |
| `layout-width-sidebar-end` | 248 | 0 | 0 | End panel (details, filters): web persistent · tablet and mobile open it as a sheet |
| `target-min` | 24 | 48 | 48 | Minimum hit area, not visual size (WCAG 2.5.8 on web, 48dp on touch) |

Spacing between components on a page (`spacing-layout-section · group · stack · container`) also changes per platform and sits in the same Figma collection — see [spacing](spacing.md#layout-spacing).

Breakpoints follow Material 3 window size classes (compact < 600, medium/expanded 600–1199, large ≥ 1200), so web and Flutter agree.

## Navigation per platform
| Platform | Start (navigation) | End (details, filters) |
|---|---|---|
| Web | Persistent sidebar, 248 | Persistent panel, 248 |
| Tablet | Navigation rail, 80 (icons + short labels) | Sheet over the content |
| Mobile | Modal drawer (width 0 in the layout) | Sheet over the content |

Regions, top to bottom: System status bar → App header → Start navigation · Main content · End panel.

## In Figma
- Two grid styles: **`Grid/Full width`** and **`Grid/With sidebar`**. Columns, gutter and margin are bound to the `6. Grid & Layout` variables, so the **frame mode** (`Web`, `Tablet`, `Mobile`) decides the platform — the same style works on every platform.
- The same mode also switches `spacing/layout/*`, so a frame set to `Mobile` gets the mobile grid and the mobile layout spacing together.
- Gutter, margins and layout spacing appear in padding and gap fields; heights, widths and `target-min` in width/height fields; columns and breakpoints are not bindable.

## Rules
- Content columns are fluid (`fill`); never fix a content width in px. Cap reading width with `size-container-*`.
- Sidebars are named **start/end**, never left/right; they swap in RTL automatically.
- Web: grid/margins follow the viewport automatically (CSS media queries); the type scale stays "web" unless `data-platform` is set.
- Flutter: tablet and mobile apps use their own package; read `context.bw.layout`.

## Containers (max-widths)
Use as **max-width**: the content stays fluid below it. Same on every platform.

| Token | Value | Use |
|---|---|---|
| `size-container-xxs` | 320px | Tooltips, menus, popovers |
| `size-container-xs` | 384px | Small dialogs (confirm, single question), toasts |
| `size-container-sm` | 480px | Default dialog, simple forms in a dialog |
| `size-container-md` | 560px | Large dialog, side sheet, multi-field forms in a dialog |
| `size-container-lg` | 640px | Single-column page forms, settings panels |
| `size-container-xl` | 768px | Reading column for long text (~70 characters per line), detail pages |
| `size-container-2xl` | 1024px | Medium content area — wizards, detail pages with a side column |
| `size-container-3xl` | 1280px | Default maximum width of main page content on wide screens |
| `size-container-4xl` | 1440px | Wide data screens — dashboards, large tables. Never wider |
