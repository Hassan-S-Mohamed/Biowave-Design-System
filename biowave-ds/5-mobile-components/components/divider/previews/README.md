# Mobile Divider 1.1 previews

Planning sketches for the light/English and dark/Arabic mobile Divider. The component plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-subtlest` | `#707070` | `#BDBDBD` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `border-width-default` | `1 px` | `1 px` |
| `spacing-none` | `0 px` | `0 px` |
| `spacing-md` | `8 px` | `8 px` |
| `spacing-xl` | `16 px` | `16 px` |
| `target-min` (mobile context) | `48 px` | `48 px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| Context text: `font-size-body-md` / `font-weight-body` | `16 px` / `400` | same |
| Context text: `font-line-height-en-body-md` / `font-line-height-ar-body-md` | `24 px` / `26 px` | same |
| Label: `font-size-caption-md` / `font-weight-caption` | `12 px` / `400` | same |
| Label: `font-line-height-en-caption-md` / `font-line-height-ar-caption-md` | `18 px` / `20 px` | same |
| `font-letter-spacing-en-default` / `font-letter-spacing-ar-default` | `0 px` / `0 px` | same |

There is no component token file for Divider; the plan maps directly to resolved foundation tokens.

## Prompt — `divider-light-en.jpg`

```text
Use case: ui-mockup
Asset type: mobile design-system component planning spec sheet
Primary request: Create a precise flat square spec sheet for the Flutter Material 3 mobile Divider 1.1 in light theme and English. This is a strict component matrix, not a phone screenshot.

Canvas: a flat UI spec sheet no more than 1600 px wide on solid color-surface-page #F7F7F7. No device frame.

Layout: use three sections on a clean grid, with the only state captioned “Default”.
1. Horizontal: a 3 × 3 matrix. Rows are subtle, default and strong. Columns are inset none, start and both. Render exactly 9 specimens. Each is a color-surface-default #FFFFFF list with two 48 px minimum-height rows, exact strings “Account settings” and “Notifications”, separated by one horizontal divider.
2. Vertical: a 3 × 2 matrix. Rows are subtle, default and strong. Columns are inset none and both. Render exactly 6 specimens. Each is a color-surface-default #FFFFFF toolbar 48 px high with two 48 × 48 px minimum text-action areas separated by the vertical divider. Do not draw vertical/start because it is invalid.
3. Label: render exactly 2 full-width horizontal specimens at default emphasis and inset none. One uses the exact centred label “or”. One uses the exact centred label “or continue with”, constrained so it wraps onto two centred lines.

Exact values: every divider is exactly 1 px thick. subtle = #EDEDED; default = #DBDBDB; strong = #BDBDBD. Inset none = 0 px at both ends. Horizontal start = 16 px on the left leading edge and 0 px on the right. Horizontal both = 16 px at both ends. Vertical none = 0 px top and bottom. Vertical both = 16 px top and bottom. The label gap is 8 px on each side. Each label line segment remains at least 16 px long. Add compact dimension callouts beside representative specimens: “1 px”, “16 px”, “8 px” and “48 px min”.

Typography: context text uses Inter, 16 px, weight 400, 24 px line height, 0 px letter spacing, #0A0A0A. Divider labels and spec captions use Inter, 12 px, weight 400, 18 px line height, 0 px letter spacing, color-text-subtlest #707070. The two segments around a label are equal. The long label wraps and is never clipped or ellipsized.

Direction: left-to-right. The start inset appears only on the left.

Never draw: extra states, icons, rounded cards, shadows, gradients, glow, photos, device frames, logos, decorations, animation or watermarks.
```

## Prompt — `divider-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: mobile design-system component planning spec sheet
Primary request: Create a precise flat square spec sheet for the Flutter Material 3 mobile Divider 1.1 in dark theme and Arabic. This is a strict component matrix, not a phone screenshot.

Canvas: a flat UI spec sheet no more than 1600 px wide on solid color-surface-page #0A0A0A. No device frame.

Layout: mirror the full sheet right-to-left and use three sections on a clean grid, with the only state captioned “افتراضي”.
1. Horizontal: a 3 × 3 matrix. Rows are “خفيف”, “افتراضي” and “قوي”. Columns in RTL visual order are “بلا إزاحة”, “إزاحة البداية” and “إزاحة الطرفين”. Render exactly 9 specimens. Each is a color-surface-default #141414 list with two 48 px minimum-height rows, exact strings “إعدادات الحساب” and “الإشعارات”, separated by one horizontal divider.
2. Vertical: a 3 × 2 matrix. Rows are “خفيف”, “افتراضي” and “قوي”. Columns are “بلا إزاحة” and “إزاحة الطرفين”. Render exactly 6 specimens. Each is a color-surface-default #141414 toolbar 48 px high with two 48 × 48 px minimum text-action areas labelled exactly “إلغاء” and “حفظ”, separated by the vertical divider. Do not draw vertical/start because it is invalid.
3. Label: render exactly 2 full-width horizontal specimens at default emphasis and inset none. One uses the exact centred label “أو”. One uses the exact centred label “أو تابع باستخدام”, constrained so it wraps onto two centred lines.

Exact values: every divider is exactly 1 px thick. subtle = #292929; default = #404040; strong = #545454. Inset none = 0 px at both ends. Horizontal start = 16 px on the right leading edge and 0 px on the left, visibly mirrored from English. Horizontal both = 16 px at both ends. Vertical none = 0 px top and bottom. Vertical both = 16 px top and bottom. The label gap is 8 px on each side. Each label line segment remains at least 16 px long. Add compact dimension callouts beside representative specimens: “1 px”, “16 px”, “8 px” and “48 px min”.

Typography: Arabic context text uses IBM Plex Sans Arabic, 16 px, weight 400, 26 px line height, 0 px letter spacing, #F7F7F7. Divider labels and Arabic spec captions use IBM Plex Sans Arabic, 12 px, weight 400, 20 px line height, 0 px letter spacing, color-text-subtlest #BDBDBD. Arabic letters are joined and read right-to-left. The two segments around a label are equal. The long label wraps and is never clipped or ellipsized.

Direction: fully right-to-left. Only horizontal/start has a one-sided inset, and it is on the right. Do not mirror non-directional marks.

Never draw: extra states, icons, rounded cards, shadows, gradients, glow, photos, device frames, logos, decorations, animation or watermarks.
```

## Checks

- `divider-light-en.jpg`: ✓ structure, copy and direction match — 9 horizontal options, 6 vertical options, two centred labels (including the wrapped long label), one Default state, and the specified dimension callouts. One targeted retry flattened the page and specimen surfaces.
- `divider-light-en.jpg`: ⚠ the generative JPEG cannot certify exact hex channels, a physical 1 px hairline, or the requested font face/metrics; the resolved token sheet above is authoritative. Hex and font values did not fit as legible in-image callouts.
- `divider-dark-ar.jpg`: ✓ structure, Arabic copy and RTL direction match — 9 horizontal options, 6 vertical options, two centred labels (including the wrapped long label), one default state, and the corrected `start` inset on the right only. One targeted retry corrected that one-sided inset.
- `divider-dark-ar.jpg`: ⚠ the generative JPEG cannot certify exact hex channels, a physical 1 px hairline, or the requested font face/metrics; the resolved token sheet above is authoritative. Hex and font values did not fit as legible in-image callouts.
