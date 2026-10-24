# Divider web previews — plan 1.1

These images are planning sketches. The component plan remains the source of truth. Resolved numeric dimension values below are CSS pixels on web.

## Token sheet

| Token | Value (light / EN) | Value (dark / AR) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `color-text-neutral-muted` | `#707070` | `#BDBDBD` |
| `border-width-default` | `1px` | `1px` |
| `spacing-none` | `0px` | `0px` |
| `spacing-md` | `8px` | `8px` |
| `spacing-xl` | `16px` | `16px` |
| `caption-md` font family | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| `caption-md` font size | `12px` | `12px` |
| `caption-md` font weight | `400` | `400` |
| `caption-md` line height | `16px` | `18px` |

There is no component token file for Divider; plan B3 uses semantic tokens directly. The component has one state, `Default`, and no radius, shadow, gradient or motion token.

## Prompt — `divider-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat web component UI specification sheet
Primary request: Draw the web Divider from plan 1.1, showing every allowed orientation × emphasis × inset combination in context, plus both labelled examples.

Canvas: Flat UI spec sheet, no perspective, at most 1600px wide. Use page background color-surface-page #F7F7F7. Use rectangular context surfaces color-surface-default #FFFFFF. Do not use a device frame.

Layout: Use a precise grid with small captions above every row and column. The only state column is “Default”.
1. Panel “horizontal”: a 3-row × 3-column matrix. Row captions are emphasis “subtle”, “default”, “strong”. Column captions are inset “none”, “start”, “both”. Each cell is a short two-row list context with unlabeled pale-neutral content-placeholder bars and the horizontal divider between the list rows. This shows all 9 horizontal combinations.
2. Panel “vertical”: a 3-row × 2-column matrix. Row captions are emphasis “subtle”, “default”, “strong”. Column captions are inset “none”, “both”. Each cell is a horizontal toolbar context with simple square toolbar-item placeholders on both sides of one vertical divider. This shows all 6 allowed vertical combinations. Do not show vertical + start.
3. Panel “showLabel”: two horizontal default-emphasis, inset-none dividers. The first contains the exact centred label “or”. The second is deliberately narrow and contains the exact label “or continue with”, wrapping to multiple centred lines without truncation. The two line segments remain equal and each is at least 16px long.

Exact values, visibly annotate each part beside the example it styles:
- line thickness: border-width-default 1px.
- subtle line: color-border-subtle #EDEDED.
- default line: color-border-default #DBDBDB.
- strong line: color-border-strong #BDBDBD.
- inset none: spacing-none 0px.
- horizontal inset start: spacing-xl 16px at the left inline-start only.
- horizontal inset both: spacing-xl 16px at both inline ends.
- vertical inset both: spacing-xl 16px at top and bottom; vertical none is 0px.
- label gap: spacing-md 8px on each side of the text.
- label color: color-text-neutral-muted #707070.
- label typography: caption-md, Inter, 12px, weight 400, 16px line height.

Text: Render technical captions exactly as quoted and render the labels exactly “or” and “or continue with”, all English left-to-right. No additional prose.
Behavior: Horizontal lines fill the available inline size. Vertical lines stretch to the toolbar row height before any 16px top/bottom inset. Labelled segments split the remaining length equally. The long label wraps and stays centred.
Constraints: crisp one-pixel divider rules; practical web UI proportions; no interactivity or extra states.
Never draw: shadows, gradients, glow, photos, logos, rounded cards, decoration, icons, focus rings, hover/pressed/disabled states, or watermarks.
```

## Prompt — `divider-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat web component UI specification sheet
Primary request: Draw the web Divider from plan 1.1 in dark theme and Arabic right-to-left layout, showing every allowed orientation × emphasis × inset combination in context, plus both labelled examples.

Canvas: Flat UI spec sheet, no perspective, at most 1600px wide. Use page background color-surface-page #0A0A0A. Use rectangular context surfaces color-surface-default #141414. Do not use a device frame.

Layout: Set the entire composition to RTL and mirror the grid reading order. Use a precise grid with small captions above every row and column. The only state column is “Default”.
1. Panel “horizontal”: a 3-row × 3-column matrix. Row captions are emphasis “subtle”, “default”, “strong”. Column captions are inset “none”, “start”, “both”. Each cell is a short two-row list context with unlabeled pale-neutral content-placeholder bars and the horizontal divider between the list rows. This shows all 9 horizontal combinations.
2. Panel “vertical”: a 3-row × 2-column matrix. Row captions are emphasis “subtle”, “default”, “strong”. Column captions are inset “none”, “both”. Each cell is a horizontal toolbar context with simple square toolbar-item placeholders on both sides of one vertical divider, with item order mirrored for RTL. This shows all 6 allowed vertical combinations. Do not show vertical + start.
3. Panel “showLabel”: two horizontal default-emphasis, inset-none dividers. The first contains the exact centred Arabic label “أو”. The second is deliberately narrow and contains the exact Arabic label “أو تابع باستخدام”, wrapping to multiple centred lines without truncation. The two line segments remain equal and each is at least 16px long.

Exact values, visibly annotate each part beside the example it styles:
- line thickness: border-width-default 1px.
- subtle line: color-border-subtle #292929.
- default line: color-border-default #404040.
- strong line: color-border-strong #545454.
- inset none: spacing-none 0px.
- horizontal inset start: spacing-xl 16px at the right inline-start only in RTL.
- horizontal inset both: spacing-xl 16px at both inline ends.
- vertical inset both: spacing-xl 16px at top and bottom; vertical none is 0px.
- label gap: spacing-md 8px on each side of the text.
- label color: color-text-neutral-muted #BDBDBD.
- label typography: caption-md, IBM Plex Sans Arabic, 12px, weight 400, 18px line height.

Text: Render technical property/value captions exactly as quoted. Render the Arabic labels exactly “أو” and “أو تابع باستخدام”, right-to-left. Do not transliterate or alter the Arabic. No additional prose.
Behavior: Horizontal lines fill the available inline size. The start inset is on the right, never the left. Vertical lines stretch to the toolbar row height before any 16px top/bottom inset. Labelled segments split the remaining length equally. Both labels stay centred; the long label wraps.
Constraints: crisp one-pixel divider rules; practical web UI proportions; correct Arabic glyph joining; no interactivity or extra states.
Never draw: shadows, gradients, glow, photos, logos, rounded cards, decoration, directional icons, focus rings, hover/pressed/disabled states, or watermarks.
```

## Checks

| Image | Result |
|---|---|
| `divider-light-en.jpg` | ⚠ All 9 horizontal and 6 vertical combinations are present; English labels are exact, the long label wraps, and LTR inset direction is correct. The annotated token values are exact, but generated/JPEG pixels cannot guarantee the precise hex colors, font face, 1px rule, or 8px/16px geometry; the `both` inset proportions remain illustrative. |
| `divider-dark-ar.jpg` | ⚠ All 9 horizontal and 6 vertical combinations are present; Arabic labels are exact, joined, centred and the long label wraps; RTL order is mirrored and `start` leaves space on the right. After two targeted retries the side is correct, but the visible inset magnitude remains approximate rather than provably 16px; generated/JPEG pixels likewise cannot guarantee exact hex colors, font face, 1px rule, or 8px/16px geometry. |
