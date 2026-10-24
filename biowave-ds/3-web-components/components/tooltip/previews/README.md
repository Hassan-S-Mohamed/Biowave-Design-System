# Tooltip web previews

Planning sketches for Tooltip 1.0. The plan remains the source of truth. The Icon button anchor is deliberately schematic because the Tooltip plan treats the anchor as consumer-supplied and gives it no Tooltip-owned dimensions or visual tokens.

## Token sheet

| Token / value | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-text-neutral-inverse` | `#FFFFFF` | `#0A0A0A` |
| `spacing-xs` — block padding and anchor offset | `4px` | `4px` |
| `spacing-md` — inline padding and viewport edge minimum | `8px` | `8px` |
| `radius-sm` | `6px` | `6px` |
| `size-container-xxs` — maximum width | `320px` | `320px` |
| `label-sm` — font size / weight | `12px / 500` | `12px / 500` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `label-sm` English line height / letter spacing | `16px / 0px` | `16px / 0px` |
| `label-sm` Arabic line height / letter spacing | `18px / 0px` | `18px / 0px` |
| `layer-tooltip` | `1600` | `1600` |
| Border / shadow | `none / none` | `none / none` |

## Prompt — `tooltip-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat web component planning spec sheet
Primary request: Draw the Biowave Tooltip 1.0 on a flat 1536 x 1024 canvas, never wider than 1600px. Use the light page background #F7F7F7. No app chrome or device frame.
Layout: Use a precise grid. The main placement matrix has row captions "top", "bottom", "start", "end" and column captions "Hidden", "Shown — hover", "Shown — keyboard focus", "Shown — touch", "Dismissed". Each cell contains one schematic Icon button anchor. Hidden and Dismissed show only the anchor. Each Shown cell displays the tooltip on the row's side, centered on the anchor's cross axis, never covering it. In English LTR, start is left of the anchor and end is right. Below the matrix, add a purpose strip with captions "label", "description", and "max-width / two lines".
Tooltip container: #141414 background; #FFFFFF label; 4px block padding; 8px inline padding; 6px radius; no border; no shadow; 320px maximum width. Show a 4px measured offset between tooltip and anchor. Show an 8px viewport-edge minimum ruler on one edge example. Annotate these exact values beside the styled part: "bg #141414", "text #FFFFFF", "padding 4px / 8px", "radius 6px", "max-width 320px", "offset 4px", "edge min 8px", "border none", "shadow none", "layer 1600".
Typography: Inter, 12px, weight 500, 16px line height, 0px letter spacing, start-aligned. Annotate "Inter · 12px / 16px · 500 · 0px" next to a label.
Text (verbatim): Use "Edit device" for purpose label and most placement cells. Use "We send shift reminders to this address." for purpose description. For the max-width specimen, use that same sentence verbatim in a 320px-wide tooltip and wrap it to exactly two lines; do not truncate. Small captions may use only the state, placement, purpose, and token annotation strings specified here. Render all quoted text exactly with no extra characters.
Anchor: Draw a simple neutral outlined square Icon button with a small pencil glyph. It is only a schematic consumer-supplied anchor; do not add measurements or claim Tooltip tokens for its size/style.
Constraints: Flat UI spec sheet, crisp orthographic shapes, practical design-document fidelity. Show all four placements and all five states. Include label versus description purpose and the two-line max-width specimen. No gradients, shadows, glow, photos, logos, decorations, watermarks, or extra components.
```

## Prompt — `tooltip-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat web component planning spec sheet
Primary request: Draw the Biowave Tooltip 1.0 on a flat 1536 x 1024 canvas, never wider than 1600px. Use the dark page background #0A0A0A. No app chrome or device frame. The entire sheet is Arabic and right-to-left.
Layout: Use a precise RTL grid. The main placement matrix has Arabic row captions "أعلى", "أسفل", "البداية", "النهاية" and Arabic column captions "مخفي", "ظاهر — التحويم", "ظاهر — تركيز لوحة المفاتيح", "ظاهر — اللمس", "مرفوض". Each cell contains one schematic Icon button anchor. Hidden and Dismissed show only the anchor. Each Shown cell displays the tooltip on the row's side, centered on the anchor's cross axis, never covering it. In Arabic RTL, logical start is right of the anchor and logical end is left. Top and bottom do not change. Below the matrix, add a purpose strip with Arabic captions "تسمية", "وصف", and "العرض الأقصى / سطران".
Tooltip container: #FFFFFF background; #0A0A0A label; 4px block padding; 8px inline padding; 6px radius; no border; no shadow; 320px maximum width. Show a 4px measured offset between tooltip and anchor. Show an 8px viewport-edge minimum ruler on one edge example. Annotate these exact values beside the styled part: "الخلفية #FFFFFF", "النص #0A0A0A", "الحشو 4px / 8px", "نصف القطر 6px", "العرض الأقصى 320px", "الإزاحة 4px", "حد الحافة 8px", "بلا حد", "بلا ظل", "الطبقة 1600".
Typography: IBM Plex Sans Arabic, 12px, weight 500, 18px line height, 0px letter spacing, right/start-aligned. Annotate "IBM Plex Sans Arabic · 12px / 18px · 500 · 0px" next to a label.
Text (verbatim): Use "تعديل الجهاز" for purpose label and most placement cells. Use "نرسل تذكيرات المناوبات إلى هذا العنوان." for purpose description. For the max-width specimen, use that same Arabic sentence verbatim in a 320px-wide tooltip and wrap it to exactly two lines; do not truncate. Small captions may use only the Arabic state, placement, purpose, and token annotation strings specified here. Render all quoted text exactly with correct Arabic joining, no extra characters, and right-to-left alignment.
Anchor: Draw a simple neutral outlined square Icon button with a small pencil glyph. It is only a schematic consumer-supplied anchor; do not add measurements or claim Tooltip tokens for its size/style. Do not mirror the pencil icon; only the logical start/end placement swaps sides.
Constraints: Flat UI spec sheet, crisp orthographic shapes, practical design-document fidelity. Show all four placements and all five states. Include label versus description purpose and the two-line max-width specimen. No gradients, shadows, glow, photos, logos, decorations, watermarks, or extra components.
```

## Image checks

| Image | Result |
|---|---|
| `tooltip-light-en.jpg` | Pending generation and visual check. |
| `tooltip-dark-ar.jpg` | Pending generation and visual check. |

## Questions

None. The Tooltip plan fully resolves every Tooltip-owned value shown. The anchor remains schematic because A2 assigns its implementation and visual styling to the consumer.
