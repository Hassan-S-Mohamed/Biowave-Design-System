# Motion

Motion explains change: where something came from, what it became. Biowave uses Material 3 durations and easing.

## Duration
| Token | Value | Use |
|---|---|---|
| `motion-duration-instant` | 0ms |  |
| `motion-duration-xs` | 50ms | Ripple start, color change on small controls. |
| `motion-duration-sm` | 100ms | Hover, press, toggle, checkbox. |
| `motion-duration-md` | 200ms | Tooltip, menu open, expand small content. |
| `motion-duration-lg` | 300ms | Dialog, drawer, bottom sheet enter. |
| `motion-duration-xl` | 400ms | Large layout or page transitions. |
| `motion-duration-2xl` | 500ms | Rare: complex choreography. |

## Easing
| Token | Value | Use |
|---|---|---|
| `motion-easing-standard` | `[0.2, 0, 0, 1]` | Default for elements that stay on screen. |
| `motion-easing-standard-decelerate` | `[0, 0, 0, 1]` | Elements entering. |
| `motion-easing-standard-accelerate` | `[0.3, 0, 1, 1]` | Elements exiting. |
| `motion-easing-emphasized-decelerate` | `[0.05, 0.7, 0.1, 1]` | Prominent entrances (dialog, sheet). |
| `motion-easing-emphasized-accelerate` | `[0.3, 0, 0.8, 0.15]` | Prominent exits. |
| `motion-easing-linear` | `[0, 0, 1, 1]` | Progress, color fades only. |

## Choosing
| Situation | Duration | Easing |
|---|---|---|
| Hover, press, toggle, checkbox | `sm` | `standard` |
| Tooltip, menu, expand | `md` | `standard-decelerate` in · `standard-accelerate` out |
| Dialog, drawer, bottom sheet | `lg` in · `md` out | `emphasized-decelerate` in · `emphasized-accelerate` out |
| Page transition | `xl` | `emphasized-decelerate` |
| Progress, color fade | any | `linear` |

## Rules
- Exits are shorter than entrances.
- **Reduced motion:** web durations become 0 under `prefers-reduced-motion` (built into tokens.css). Flutter: check `context.bw.reduceMotion` and use `BwDuration.instant`.
- **Exception — `motion-duration-progress` (1000ms):** one turn of a looping progress indicator (spinner). It is **not** reduced under `prefers-reduced-motion` / `disableAnimations`, because a frozen spinner reads as "stuck". Use it only for looping progress; never for transitions.
- Never animate layout of text the user is reading; never loop animations except progress indicators.
- Slide directions are logical: "from end" flips in RTL.
