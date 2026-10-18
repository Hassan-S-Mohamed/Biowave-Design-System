# Grid and layout

Each platform has a fluid column grid plus layout constants. Values come from `tokens/platform/*.json`.

| Token | Web | Tablet | Mobile |
|---|---|---|---|
| `breakpoint` (viewport width) | ≥ 1200 | 600–1199 | 0–599 |
| `grid-columns` | 12 | 8 | 6 |
| `grid-gutter` | 24 | 24 | 8 |
| `grid-margin-full` (no persistent sidebar) | 40 | 24 | 16 |
| `grid-margin-sidebar` (next to a sidebar) | 24 | 24 | 16 |
| `layout-height-app-bar` | 72 | 64 | 64 |
| `layout-height-system-status` (Biowave status bar) | 40 | 40 | 40 |
| `layout-width-sidebar-start / end` | 248 | 248 (adaptive) | 0 (drawer) |
| `target-min` | 24 | 48 | 48 |

Breakpoints follow Material 3 window size classes (compact < 600, medium/expanded 600–1199, large ≥ 1200), so web and Flutter agree.

## Page templates (from Figma "Grid & Layout Styles")
- Desktop full screen · left navigation · left navigation + app banner · right navigation · left + right navigation.
- Regions: System status bar → App header → Side navigation (start / end) → Main content.

## Rules
- Content columns are fluid (`fill`); never fix a content width in px. Cap reading width with `size-container-*`.
- Sidebars are named **start/end**, never left/right; they swap in RTL automatically.
- Web: grid/margins follow the viewport automatically (CSS media queries); the type scale stays "web" unless `data-platform` is set.
- Flutter: tablet and mobile apps use their own package; read `context.bw.layout`.

## Containers (max-widths)
| Token | Value | Use |
|---|---|---|
| `size-container-xxs` | 320px |  |
| `size-container-xs` | 384px |  |
| `size-container-sm` | 480px |  |
| `size-container-md` | 560px |  |
| `size-container-lg` | 640px |  |
| `size-container-xl` | 768px |  |
| `size-container-2xl` | 1024px |  |
| `size-container-3xl` | 1280px |  |
| `size-container-4xl` | 1440px |  |
| `size-container-5xl` | 1600px |  |
| `size-container-6xl` | 1920px |  |
