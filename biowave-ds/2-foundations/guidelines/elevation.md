# Elevation

Elevation shows what floats above what. Five levels plus one control recipe; each has a Light and a Dark value.

| Token | Use | Light | Dark |
|---|---|---|---|
| `elevation-0` | Flat, on the page | none | none |
| `elevation-1` | Resting cards and controls | 0 1 2 · 5% | 0 1 2 · 12% |
| `elevation-2` | Hovered cards, sticky headers | 0 2 16 · 9% | 0 2 16 · 22% |
| `elevation-3` | Menus, popovers, action bar | 0 8 24 · 12% | 0 8 24 · 30% |
| `elevation-4` | Dialogs, drawers, bottom sheets | 0 16 48 −4 · 18% | 0 16 48 −4 · 45% |
| `shadow-control` | Skeuomorphic buttons, tabs, selectable cards (1 drop + 2 inset layers) | navy 5–20% | black |

Light shadows are tinted navy (`primary/900`); dark shadows are black.

## Rules
- Pair elevation with surface: `elevation-3/4` sit on `color-surface-raised`. In dark mode the lighter surface does most of the work.
- Use the whole token; never copy individual shadow values.
- Do not stack elevation inside elevation (no shadowed card inside a dialog).
- Flutter `BoxShadow` has no inset: `shadowControl` exposes only its drop layer; draw the inner edge with a 1px border using `color-border-subtle` if needed.
- Overlays behind dialogs: `color-overlay-backdrop`.
