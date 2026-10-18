# Icons

Biowave uses **Material Symbols** (Rounded, weight 400, fill 0 by default; fill 1 for selected states).

| Platform | Source |
|---|---|
| Web | `@mui/icons-material` (Material Symbols set) or `material-symbols` font |
| Flutter | `Icons.*` (Material) or the `material_symbols_icons` package |

## Sizes
| Token | Value | Use |
|---|---|---|
| `size-icon-xs` | 12px |  |
| `size-icon-sm` | 16px |  |
| `size-icon-md` | 20px |  |
| `size-icon-lg` | 24px |  |
| `size-icon-xl` | 32px |  |
| `size-icon-2xl` | 40px |  |
| `size-icon-3xl` | 48px |  |

Default inline icon: `size-icon-md` (20) on web, `size-icon-lg` (24) on tablet/mobile. Icon-only buttons keep the icon size but the **target** must reach `target-min`.

## Color
`color-icon-neutral-*` on neutral surfaces, `color-icon-role-*` for status, `color-icon-on-*` on filled backgrounds. Meaningful icons need ≥ 3:1 (checked by the build).

## RTL
Mirror icons that show direction or progress (arrow_back/forward, chevrons, undo/redo, send, list indent). Do **not** mirror: logos, checkmarks, clocks, media play/pause, search, plus/minus, slashes in fractions.

## Rules
- Icon-only controls need an accessible name (`aria-label` / `Semantics(label:)` / `tooltip`).
- Decorative icons next to text are hidden from screen readers (`aria-hidden`, `ExcludeSemantics`).
- Custom icons (biometric methods, device types) are drawn on a 24px grid with 2px padding and Material Symbols stroke weight, and stored in Figma page `Icons`.
