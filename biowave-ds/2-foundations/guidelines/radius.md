# Radius

| Token | Value | Use |
|---|---|---|
| `radius-none` | 0px | Square: sidebars, full-bleed areas. |
| `radius-xxs` | 2px | Micro marks, progress tracks. |
| `radius-xs` | 4px | Checkbox, small badge. |
| `radius-sm` | 6px | Tag, tooltip, compact button. |
| `radius-md` | 8px | Input, select, small popover, default button. |
| `radius-lg` | 10px | Menu, dropdown. |
| `radius-xl` | 12px | Card list item, large button. |
| `radius-2xl` | 16px | Card, dashboard widget. |
| `radius-3xl` | 20px | Dialog, banner. |
| `radius-4xl` | 24px | Sheet, hero container. |
| `radius-full` | full (9999) | Pill and circle: avatar, toggle track, count badge. |

## Rules
- **Nesting:** inner radius = outer radius − padding (never larger than the parent). A `radius-2xl` card with `spacing-md` padding holds `radius-md` children.
- Default control radius is `radius-md` (inputs, buttons, selects). Cards `radius-2xl`, dialogs `radius-3xl`, sheets `radius-4xl` (top corners only).
- `radius-full` only for pills and circles (avatars, toggles, count badges).
- In RTL, asymmetric corners use `BorderRadiusDirectional` / `border-start-start-radius`.
