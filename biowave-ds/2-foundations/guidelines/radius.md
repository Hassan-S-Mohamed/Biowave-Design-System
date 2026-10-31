# Radius

Corner radius is chosen by **what the object is**, not by its size on screen. One scale, same on every platform: bigger surfaces get a bigger radius.

## Pick by object
| Object | Token | Value |
|---|---|---|
| Attached to a screen edge (app bar, sidebar, rail, full-bleed media, table cell); inner corners of joined segments (split button) | `radius-none` | 0 |
| Tiny marks (progress / slider track, inline code) | `radius-xxs` | 2 |
| Focus ring of inline links, checkbox, small badge | `radius-xs` | 4 |
| Tooltip, chip, tag | `radius-sm` | 6 |
| **Controls** — Button, Icon button, Text field, Select, Segmented button at `sm` · `md` · `lg`; small popover | `radius-md` | 8 |
| Menu, dropdown list, popover anchored to a control | `radius-lg` | 10 |
| `xl` (56) controls on tablet and mobile; list item shown as a card | `radius-xl` | 12 |
| Card, dashboard widget, tile, banner inside content | `radius-2xl` | 16 |
| Dialog and other modal surfaces | `radius-3xl` | 20 |
| Bottom / side sheet (corners facing the content only), hero container | `radius-4xl` | 24 |
| Pills and circles — circular avatar, switch, count and dot badges, pill chips | `radius-full` | 9999 |

A rounded-square **Avatar** steps with its size: `sm` → `radius-sm`, `md` → `radius-md`, `lg` → `radius-lg`, `xl` → `radius-xl` (through the Avatar's component tokens).

## Rules
- **Nesting:** when the padding is smaller than the outer radius, inner radius = outer radius − padding, never below `radius-xs`. When the padding is equal or larger (for example a `radius-2xl` card with `spacing-layout-container` padding), the inner element keeps its own radius from the table above.
- **Joined segments** (split button): outer corners keep the control radius; the corners where segments touch are square (`radius-none`) and a vertical Divider (`color-border-default`) separates the parts — no gap.
- **Sheets:** round only the corners that face the content (`border-start-start-radius` …), never the edge attached to the screen.
- `radius-full` only for pills and circles — never on a rectangle that can grow tall (it turns into a capsule).
- RTL: asymmetric corners use logical properties (`border-start-start-radius`, `BorderRadiusDirectional`).

## In Figma and code
- Figma `2. Radius` (scope: corner radius only). Every value aliases `_Primitive › Dimension/<px>`; hover a variable to read where it is used.
- CSS `var(--bw-radius-md)` · TS `cssVars.radius.md` · Flutter `BwRadius.md` (`2xl` → `BwRadius.xl2`).
