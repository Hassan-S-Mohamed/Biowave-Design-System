# Mobile Divider 1.0 previews

Planning sketches for the light/English and dark/Arabic mobile Divider. The component plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-muted` | `#707070` | `#BDBDBD` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `border-width-default` | `1 px` | `1 px` |
| `spacing-xl` | `16 px` | `16 px` |
| `spacing-none` | `0 px` | `0 px` |
| `target-min` (mobile) | `48 px` | `48 px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `font-size-body-md` / `font-weight-body` | `16 px` / `400` | same |
| `font-line-height-en-body-md` / `font-line-height-ar-body-md` | `24 px` / `26 px` | same |
| `font-size-caption-sm` / `font-weight-caption` | `12 px` / `400` | same |
| `font-line-height-en-caption-sm` / `font-line-height-ar-caption-sm` | `18 px` / `20 px` | same |
| `font-letter-spacing-en-default` / `font-letter-spacing-ar-default` | `0 px` / `0 px` | same |

There is no component token file for Divider; the plan maps directly to the resolved semantic and base tokens above.

## Prompt — `divider-light-en.jpg`

```text
Use case: ui-mockup
Asset type: mobile design-system component spec sheet
Primary request: Draw a precise planning sheet for the Flutter Material 3 mobile Divider in light theme and English. Show every allowed A4 combination in its only state, Default: horizontal orientation × subtle/default/strong emphasis × none/start/both inset (9 specimens), plus vertical orientation × subtle/default/strong emphasis × none/both inset (6 specimens). Do not show vertical/start because it is invalid.
Canvas: 1600 × 1600 px maximum, flat UI spec sheet, background color-surface-page #F7F7F7. No device frame.
Layout: a clean grid made of two grouped option tables, each with one state column captioned exactly “Default”. The horizontal table has nine rows captioned exactly “Horizontal · subtle · none”, “Horizontal · subtle · start”, “Horizontal · subtle · both”, “Horizontal · default · none”, “Horizontal · default · start”, “Horizontal · default · both”, “Horizontal · strong · none”, “Horizontal · strong · start”, and “Horizontal · strong · both”. The vertical table has six rows captioned exactly “Vertical · subtle · none”, “Vertical · subtle · both”, “Vertical · default · none”, “Vertical · default · both”, “Vertical · strong · none”, and “Vertical · strong · both”. Put each small row caption immediately above its specimen. Do not add another state.
Context: each horizontal specimen is a color-surface-default #FFFFFF list surface with two 48 px-minimum rows using the exact strings “Account settings” and “Notifications”, separated by the divider. Each vertical specimen is a color-surface-default #FFFFFF 48 px-tall toolbar row with those same exact strings as two text actions separated by the vertical divider. Dividers add no surrounding space; the parent owns all gaps.
Exact component values: every line is exactly 1 px thick. Subtle line color #EDEDED, default line color #DBDBDB, strong line color #BDBDBD. Inset none is 0 px at both ends. Horizontal start is 16 px only on the left leading edge and 0 px on the right. Horizontal both is 16 px at both ends. Vertical none is 0 px at top and bottom. Vertical both is 16 px at top and bottom. Vertical container width is exactly 1 px. Write a compact callout next to each specimen with its line color, “1 px”, and its inset value(s). Mark the action target height “48 px min”.
Typography: all English body copy uses Inter first, 16 px, weight 400, 24 px line height, 0 px letter spacing, color-text-neutral-default #0A0A0A. Row/column captions and callouts use Inter first, 12 px, weight 400, 18 px line height, 0 px letter spacing, color-text-neutral-muted #707070. Write these exact font values in a compact typography callout next to the body and caption examples.
Direction: left-to-right. Only horizontal/start has a one-sided inset and it is on the left.
Constraints: render all 15 specimens exactly once; preserve the exact spelling and capitalization of every caption and content string; flat orthographic UI; crisp 1 px rules; square unframed surfaces; no interactive states, animation, disabled treatment, icons, shadows, gradients, glow, photos, device frames, logos, decoration, or watermark.
```

## Prompt — `divider-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: mobile design-system component spec sheet
Primary request: Draw a precise planning sheet for the Flutter Material 3 mobile Divider in dark theme and Arabic. Show every allowed A4 combination in its only state, Default: horizontal orientation × subtle/default/strong emphasis × none/start/both inset (9 specimens), plus vertical orientation × subtle/default/strong emphasis × none/both inset (6 specimens). Do not show vertical/start because it is invalid.
Canvas: 1600 × 1600 px maximum, flat UI spec sheet, background color-surface-page #0A0A0A. No device frame.
Layout: a right-to-left clean grid made of two grouped option tables, each with one state column captioned exactly “Default”. The horizontal table has nine rows captioned exactly “Horizontal · subtle · none”, “Horizontal · subtle · start”, “Horizontal · subtle · both”, “Horizontal · default · none”, “Horizontal · default · start”, “Horizontal · default · both”, “Horizontal · strong · none”, “Horizontal · strong · start”, and “Horizontal · strong · both”. The vertical table has six rows captioned exactly “Vertical · subtle · none”, “Vertical · subtle · both”, “Vertical · default · none”, “Vertical · default · both”, “Vertical · strong · none”, and “Vertical · strong · both”. Put each small row caption immediately above its specimen. Do not add another state.
Context: each horizontal specimen is a color-surface-default #141414 list surface with two 48 px-minimum rows using the exact Arabic strings “إعدادات الحساب” and “الإشعارات”, separated by the divider. Each vertical specimen is a color-surface-default #141414 48 px-tall right-to-left toolbar row with those same exact Arabic strings as two text actions separated by the vertical divider. Dividers add no surrounding space; the parent owns all gaps.
Exact component values: every line is exactly 1 px thick. Subtle line color #292929, default line color #404040, strong line color #545454. Inset none is 0 px at both ends. Horizontal start is 16 px only on the right leading edge and 0 px on the left, visibly mirroring the English layout. Horizontal both is 16 px at both ends. Vertical none is 0 px at top and bottom. Vertical both is 16 px at top and bottom. Vertical container width is exactly 1 px. Write a compact callout next to each specimen with its line color, “1 px”, and its inset value(s). Mark the action target height “48 px min”.
Typography: all Arabic body copy uses IBM Plex Sans Arabic first, 16 px, weight 400, 26 px line height, 0 px letter spacing, color-text-neutral-default #F7F7F7. Row/column captions and callouts use IBM Plex Sans Arabic first, 12 px, weight 400, 20 px line height, 0 px letter spacing, color-text-neutral-muted #BDBDBD. Write these exact font values in a compact typography callout next to the body and caption examples.
Direction: fully right-to-left. The Arabic content order and alignment mirror the English layout. Only horizontal/start has a one-sided inset and it is on the right. Do not mirror non-directional marks.
Constraints: render all 15 specimens exactly once; spell the Arabic strings exactly and keep their letters joined in correct right-to-left order; preserve every caption exactly; flat orthographic UI; crisp 1 px rules; square unframed surfaces; no interactive states, animation, disabled treatment, icons, shadows, gradients, glow, photos, device frames, logos, decoration, or watermark.
```

## Checks

- `divider-light-en.jpg`: pending generation and inspection.
- `divider-dark-ar.jpg`: pending generation and inspection.
