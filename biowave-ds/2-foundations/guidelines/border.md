# Border

Border = width token + color token. Widths are new in v1.0.

| Token | Value | Use |
|---|---|---|
| `border-width-none` | 0px |  |
| `border-width-default` | 1px | Cards, inputs, dividers. |
| `border-width-strong` | 2px | Selected/active outlines. |
| `border-width-focus` | 2px | Focus ring thickness (WCAG 2.4.13 recommends >= 2px). |
| `border-focus-offset` | 2px | Gap between control and focus ring. |

| Purpose | Color token | Contrast |
|---|---|---|
| Cards, tables, dividers | `color-border-default` / `subtle` | decorative |
| Section separation | `color-border-strong` | decorative |
| Inputs, checkboxes, outline buttons | `color-border-input-default` → `hover` → `error` | ≥ 3:1 (WCAG 1.4.11) |
| Status outlines | `color-border-{role}` | decorative (pair with text/icon) |
| Keyboard focus | `color-border-focus` | ≥ 3:1 |

## Focus ring (all platforms)
- 2px (`border-width-focus`) solid `color-border-focus`, offset 2px (`border-focus-offset`), following the control's radius.
- Web: show on `:focus-visible` only. Flutter: use `FocusableActionDetector` / `WidgetStateProperty` focused state.
- Never remove focus styles without an equivalent replacement.
