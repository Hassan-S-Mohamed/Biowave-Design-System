# Badge web previews

Planning sketches for Badge plan 1.0. The plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color.surface.page` | `#F7F7F7` | `#0A0A0A` |
| `color.surface.default` | `#FFFFFF` | `#141414` |
| `color.text.default` | `#0A0A0A` | `#F7F7F7` |
| `color.text.subtlest` | `#707070` | `#BDBDBD` |
| `color.border.default` | `#DBDBDB` | `#404040` |
| `color.background.error.default` | `#D42222` | `#FF7676` |
| `color.background.brand.default` | `#193351` | `#607D9F` |
| `color.background.secondary.default` | `#0C5F79` | `#5DA8C2` |
| `color.background.success.default` | `#1E6D41` | `#55BE87` |
| `color.background.warning.default` | `#FF9435` | `#FFB05E` |
| `color.background.info.default` | `#2559D4` | `#6D9CE8` |
| `color.surface.inverse` | `#141414` | `#FFFFFF` |
| `color.text.on.error` | `#FFFFFF` | `#0A0A0A` |
| `color.text.on.brand` | `#FFFFFF` | `#0A0A0A` |
| `color.text.on.secondary` | `#FFFFFF` | `#0A0A0A` |
| `color.text.on.success` | `#FFFFFF` | `#0A0A0A` |
| `color.text.on.warning` | `#0A0A0A` | `#0A0A0A` |
| `color.text.on.info` | `#FFFFFF` | `#0A0A0A` |
| `color.text.inverse` | `#FFFFFF` | `#0A0A0A` |
| `color.icon.on.brand` | `#FFFFFF` | `#0A0A0A` |
| `color.icon.on.secondary` | `#FFFFFF` | `#0A0A0A` |
| `color.icon.on.success` | `#FFFFFF` | `#0A0A0A` |
| `color.icon.on.info` | `#FFFFFF` | `#0A0A0A` |
| `color.icon.inverse` | `#FFFFFF` | `#0A0A0A` |
| `color.border.inverse` | `#FFFFFF` | `#0A0A0A` |
| `spacing.xs` | `4px` | `4px` |
| `spacing.md` | `8px` | `8px` |
| `radius.full` | `9999px` | `9999px` |
| `border.width.strong` | `2px` | `2px` |
| `size.icon.sm` | `16px` | `16px` |
| `size.icon.md` | `20px` | `20px` |
| `size.control.height.md` (preview anchor) | `40px` | `40px` |
| `font.family` (preview language) | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| `font.size.data.sm` | `12px` | `12px` |
| `font.line-height.*.data.sm` | `16px` (`en`) | `18px` (`ar`) |
| `font.weight.data` | `500` | `500` |
| `font.letter-spacing.*.default` | `0` | `0` |
| `layer.raised` | `1` | `1` |
| B2 circular overlap inset (computed) | `14.6%` | `14.6%` |

`badge.tokens.json` does not exist by design: Badge 1.0 uses existing semantic tokens only.

## Prompt — `badge-light-en.jpg`

```text
Use case: ui-mockup
Asset type: Biowave design-system component preview sheet
Canvas: flat English UI specification sheet, landscape, no more than 1600 px wide, page background #F7F7F7. Use a documentation grid with #FFFFFF panels, #DBDBDB separators, #0A0A0A primary text and #707070 secondary text.
Layout: show a COUNT matrix with rows error, brand, secondary, success, warning, info and neutral, and columns 1, 9 and 99+ over max. Show a DOT matrix for error, brand, secondary, success, info and neutral only. Show a CHECK matrix for brand, secondary, success, info and neutral only. Show placement on 40 px rectangular and circular anchors, standalone placement, the plan's hidden/appearing/visible/over-max/disappearing/anchor-state examples, and the five exact content strings.
Exact geometry: count/check 20 px; dot 8 px; count padding-inline 4 px; check icon 16 px; anchored ring 2 px outside; radius 9999 px; circular inset 14.6%; data-sm 12/16, weight 500; layer-raised 1.
Exact colors: error #D42222/#FFFFFF; brand #193351/#FFFFFF; secondary #0C5F79/#FFFFFF; success #1E6D41/#FFFFFF; warning #FF9435/#0A0A0A; info #2559D4/#FFFFFF; neutral #141414/#FFFFFF; ring #FFFFFF.
Text (verbatim): "Badge — Web · Light / EN", "1", "9", "99+", "Inbox  (12)", "3 unread messages", "More than 99 notifications", "New activity", "Verified", "Completed".
Placement: LTR top-end is physical top-right. Rectangular badge center sits on the corner. Circular overlap moves inward 14.6%. Standalone badge follows the label with no ring. Checkmarks never mirror.
Never draw: warning dots/checks, error checks, extra colors, gradients, glow, photos, device frames, logos, decoration, 3D or watermark. Use no shadow except the specified flat 2 px outside ring.
```

Targeted retry: changed only the content examples so `New activity` uses a dot and `Verified`/`Completed` use check badges; expanded the final state heading to cover anchor hover, focus, pressed and disabled while preserving the existing disabled example.

## Prompt — `badge-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: Biowave design-system component preview sheet
Canvas: flat Arabic RTL UI specification sheet, landscape, no more than 1600 px wide, page background #0A0A0A. Use a mirrored documentation grid with #141414 panels, #404040 separators, #F7F7F7 primary text and #BDBDBD secondary text.
Layout: show an RTL count matrix with rows خطأ، العلامة، ثانوي، نجاح، تحذير، معلومات، محايد and Western-digit columns 1, 9 and 99+ over max. Show a dot matrix for error, brand, secondary, success, info and neutral only. Show a check matrix for brand, secondary, success, info and neutral only. Show placement on 40 px rectangular and circular anchors, standalone RTL placement, the plan's hidden/appearing/visible/over-max/disappearing/anchor-disabled examples, and the five exact Arabic content strings.
Exact geometry: count/check 20 px; dot 8 px; count padding-inline 4 px; check icon 16 px; anchored ring 2 px outside; radius 9999 px; circular inset 14.6%; data-sm 12/18, weight 500; layer-raised 1.
Exact colors: error #FF7676/#0A0A0A; brand #607D9F/#0A0A0A; secondary #5DA8C2/#0A0A0A; success #55BE87/#0A0A0A; warning #FFB05E/#0A0A0A; info #6D9CE8/#0A0A0A; neutral #FFFFFF/#0A0A0A; ring #0A0A0A.
Text (verbatim): "الشارة — الويب · داكن / عربي", "1", "9", "99+", "(12) الوارد", "3 رسائل غير مقروءة", "أكثر من 99 إشعارًا", "نشاط جديد", "تم التحقق", "مكتمل".
Placement: RTL top-end is physical top-left. Rectangular badge center sits on the corner. Circular overlap moves inward 14.6%. Standalone badge is after the Arabic label at inline end with no ring. Keep counts and 99+ left-to-right with Western digits; never mirror the checkmark.
Never draw: warning dots/checks, error checks, extra colors, gradients, glow, photos, device frames, logos, decoration, 3D or watermark. Use no shadow except the specified flat 2 px outside ring.
```

Targeted retry: changed only the Arabic content examples so `نشاط جديد` uses a dot and `تم التحقق`/`مكتمل` use check badges.

## Checks

- `badge-light-en.jpg`: ⚠ Content, allowed combinations, LTR placement, labels and token callouts match after one retry. The generated raster shows minor antialiasing/tonal variation, so exact CSS pixel dimensions and flat hex fills cannot be machine-certified from the image; use the token sheet and plan for exact values.
- `badge-dark-ar.jpg`: ⚠ Arabic copy, Western digits, allowed combinations, RTL top-left placement, unmirrored checks and token callouts match after one retry. The generated raster shows minor antialiasing/tonal variation, so exact CSS pixel dimensions and flat hex fills cannot be machine-certified from the image; use the token sheet and plan for exact values.
- Output: both files are JPEG, quality 85, `1600 × 1066`, within the 1600 px maximum width.
- Unresolved token values: none.

