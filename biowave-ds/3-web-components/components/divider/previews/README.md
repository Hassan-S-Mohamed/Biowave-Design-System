# Divider web preview

Planning sketches for Divider 1.0. The component plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-subtle` | `#292929` | `#DBDBDB` |
| `border-width-default` | `1px` | `1px` |
| `spacing-xl` | `16px` | `16px` |
| `spacing-none` | `0px` | `0px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `font-size-body-md` | `14px` | `14px` |
| `font-weight-body` | `400` | `400` |
| `font-line-height-en-body-md` | `22px` | `22px` |
| `font-line-height-ar-body-md` | `24px` | `24px` |
| `font-size-caption-sm` | `11px` | `11px` |
| `font-weight-caption` | `400` | `400` |
| `font-line-height-en-caption-sm` | `16px` | `16px` |
| `font-line-height-ar-caption-sm` | `18px` | `18px` |
| `font-letter-spacing-en-default` | `0px` | `0px` |
| `font-letter-spacing-ar-default` | `0px` | `0px` |

There is no `divider.tokens.json`: B3 specifies semantic tokens directly.

## Prompt — `divider-light-en.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component planning sheet
Primary request: Draw a flat, exact UI specification sheet for the web Divider component in light theme and English. This is a plan-checking sketch, not concept art.
Canvas: 1536 × 1024 landscape, never wider than 1600px. Fill the entire canvas with color-surface-page #F7F7F7. No outer frame.
Layout: Use one compact grid with a small band caption "state=default" above it. The three row captions are exactly "emphasis=subtle", "emphasis=default", and "emphasis=strong". The five column captions are exactly "orientation=horizontal · inset=none", "orientation=horizontal · inset=start", "orientation=horizontal · inset=both", "orientation=vertical · inset=none", and "orientation=vertical · inset=both". This creates exactly 15 cells and shows every valid orientation × emphasis × inset combination. Do not show vertical + start because it is invalid.
Horizontal context: In each of the first three columns, show a simple rectangular list surface in #FFFFFF containing two rows, with the exact strings "Account settings" above and "Notifications" below. Put the divider between those rows. The divider fills the parent width for none; starts exactly 16px after the left inline-start for start; and stops exactly 16px from both ends for both.
Vertical context: In each of the last two columns, show a simple rectangular toolbar surface in #FFFFFF with "Account settings" and "Notifications" as adjacent text actions in one row. Put the vertical divider between the two toolbar items. It fills the row height for none and stops exactly 16px from the top and bottom for both.
Line tokens: Every divider is exactly 1px thick. In the subtle row use #EDEDED; in the default row use #DBDBDB; in the strong row use #BDBDBD. Put a tiny annotation immediately beside each divider using only the applicable exact strings "1px · #EDEDED", "1px · #DBDBDB", or "1px · #BDBDBD", plus one of "inset 0px", "start 16px", or "both 16px".
Typography: All content text is #0A0A0A, Inter 14px, weight 400, 22px line height, 0px letter spacing. All grid captions and annotations are #292929, Inter 11px, weight 400, 16px line height, 0px letter spacing.
Direction: left-to-right. The start inset is visibly on the left.
Exact text: Render every quoted string verbatim, with no misspellings, omissions, or extra characters.
Constraints: Crisp flat product UI; rectangular context surfaces; clear spacing; all 15 examples visible. No shadows, gradients, glow, photos, device frames, logos, icons, rounded decoration, extra states, hover/focus/pressed/selected/disabled treatments, or watermark.
```

## Prompt — `divider-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component planning sheet
Primary request: Draw a flat, exact UI specification sheet for the web Divider component in dark theme and Arabic. This is a plan-checking sketch, not concept art.
Canvas: 1536 × 1024 landscape, never wider than 1600px. Fill the entire canvas with color-surface-page #0A0A0A. No outer frame.
Layout: Use one compact right-to-left grid with a small band caption "state=default" above it. Reading from the right edge toward the left, the five column captions are exactly "orientation=horizontal · inset=none", "orientation=horizontal · inset=start", "orientation=horizontal · inset=both", "orientation=vertical · inset=none", and "orientation=vertical · inset=both". The three row captions are exactly "emphasis=subtle", "emphasis=default", and "emphasis=strong". This creates exactly 15 cells and shows every valid orientation × emphasis × inset combination. Do not show vertical + start because it is invalid.
Horizontal context: In each horizontal column, show a simple rectangular list surface in #141414 containing two right-aligned rows with the exact Arabic strings "إعدادات الحساب" above and "الإشعارات" below. Put the divider between those rows. The divider fills the parent width for none; starts exactly 16px after the RIGHT inline-start for start, leaving the gap on the right; and stops exactly 16px from both ends for both.
Vertical context: In each vertical column, show a simple rectangular right-to-left toolbar surface in #141414 with "إعدادات الحساب" and "الإشعارات" as adjacent text actions in one row. Put the vertical divider between the two toolbar items. It fills the row height for none and stops exactly 16px from the top and bottom for both.
Line tokens: Every divider is exactly 1px thick. In the subtle row use #292929; in the default row use #404040; in the strong row use #545454. Put a tiny annotation immediately beside each divider using only the applicable exact strings "1px · #292929", "1px · #404040", or "1px · #545454", plus one of "inset 0px", "start 16px", or "both 16px".
Typography: All Arabic content text is #F7F7F7, IBM Plex Sans Arabic 14px, weight 400, 24px line height, 0px letter spacing. All grid captions and annotations are #DBDBDB, IBM Plex Sans Arabic 11px, weight 400, 18px line height, 0px letter spacing.
Direction: right-to-left throughout. The horizontal start inset is visibly on the right. Keep code-like option captions intact and right-aligned; do not mirror glyphs because there are no icons.
Exact text: Render every quoted string verbatim, especially "إعدادات الحساب" and "الإشعارات", with no misspellings, omissions, disconnected Arabic letters, or extra characters.
Constraints: Crisp flat product UI; rectangular context surfaces; clear spacing; all 15 examples visible. No shadows, gradients, glow, photos, device frames, logos, icons, rounded decoration, extra states, hover/focus/pressed/selected/disabled treatments, or watermark.
```

## Checks

- `divider-light-en.jpg`: ⚠ not rendered — the built-in image tool returned a network transport error on the initial call and one retry, so there is no image to compare.
- `divider-dark-ar.jpg`: ⚠ not rendered — generation was not started after the repeated built-in service failure; an image-tool retry or an explicitly approved API/CLI fallback is required.
