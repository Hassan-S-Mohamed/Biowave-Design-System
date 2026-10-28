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
| Inputs, checkboxes, radios, selects | `color-border-bold` (hover keeps it and changes the fill to `color-background-base-hovered`) → `color-border-error` when invalid | ≥ 3:1 (WCAG 1.4.11) |
| Outline buttons | `color-border-strong` (the label identifies the button) | decorative |
| Selected / state outlines | `color-border-brand`, role borders | ≥ 3:1 |
| Status outlines | `color-border-{role}` | decorative (pair with text/icon) |
| Keyboard focus | `color-border-focus` | ≥ 3:1 |

## Focus ring (all platforms)
- 2px (`border-width-focus`) solid `color-border-focus`, offset 2px (`border-focus-offset`), following the control's radius.
- Web: show on `:focus-visible` only. Flutter: use `FocusableActionDetector` / `WidgetStateProperty` focused state.
- Never remove focus styles without an equivalent replacement.

## Borders are colour tokens, never shadows
- Every outline is a real `border` (CSS `border`, Flutter `Border`/`BorderSide`) whose colour is a `color-border-*` token and whose width is a `border-width-*` token.
- Focus rings and rings that must not change layout (badge cut-out) use `outline` with a `color-border-*` token — still a stroke, not a shadow. Inset ring: `outline-offset: calc(-1 * <width>)`.
- `box-shadow` / `BoxShadow` is used only by `elevation-*` tokens for lift.
- Reason: shadows are removed in Windows forced-colors (High Contrast) mode, so a border drawn as a shadow disappears there; borders and outlines stay.

### Figma focus ring
Figma has no outline, so the ring is its own layer inside the component:
- Child layer `Focus ring`: absolute position (ignores auto layout), constraints Left & Right / Top & Bottom, inset `−(border-focus-offset + border-width-focus)` on every side (−4px).
- Corner radius = component radius + `border-focus-offset`. No fill.
- Stroke **inside**, weight bound to `border/width/focus`, colour bound to `color/border/focus` (`color/border/inverse` on brand or inverse areas). The inner 2px stays empty: that is the offset.
- Visible only in `State=Focused`. Effect styles `Focus/Ring`, `Focus/Ring Inverse` and `Shadow/Control` are deprecated.
