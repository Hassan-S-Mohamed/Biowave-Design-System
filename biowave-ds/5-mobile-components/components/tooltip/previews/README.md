# Tooltip mobile previews

Plan 1.0 preview sheet for Flutter Material 3 mobile. The plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-text-neutral-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `spacing-xs` | `4 px` | `4 px` |
| `spacing-md` | `8 px` | `8 px` |
| `radius-sm` | `6 px` | `6 px` |
| `size-container-xxs` | `320 px` | `320 px` |
| `target-min` (mobile) | `48 px` | `48 px` |
| `size-icon-md` | `20 px` | `20 px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `font-size-label-sm` (mobile) | `12 px` | `12 px` |
| `font-weight-label` (mobile) | `500` | `500` |
| `font-line-height-en-label-sm` (mobile) | `16 px` | `16 px` |
| `font-line-height-ar-label-sm` (mobile) | `18 px` | `18 px` |
| `font-letter-spacing-en-default` (mobile) | `0 px` | `0 px` |
| `font-letter-spacing-ar-default` (mobile) | `0 px` | `0 px` |

## Prompt — `tooltip-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat mobile component specification sheet
Primary request: Draw the Biowave Flutter Material 3 mobile Tooltip from plan 1.0 in the light theme and English, left-to-right.

Canvas: 1536 × 1024 px, never wider than 1600 px. Flat #F7F7F7 page background. No device frame. Use #0A0A0A for captions and callouts. Use a clean grid with generous whitespace.

Layout: organize the sheet into compact labelled grids. Use only options and states in the plan.
1. Placement grid: four rows captioned exactly “top”, “bottom”, “start”, “end”; two columns captioned exactly “Hidden” and “Shown — touch”. Every cell has a 48 × 48 px icon-button touch target with a 20 × 20 px edit icon in #0A0A0A. Hidden cells show only the anchor. Shown cells use the exact tooltip text “Edit device”. Place the tooltip above, below, left of, or right of the anchor as the row requires. In LTR, start is left and end is right. Centre the tooltip on the anchor’s cross axis. Keep an exact 4 px offset so it never covers the anchor.
2. Purpose grid: rows captioned exactly “label” and “description”. For label, show an icon-only anchor and the tooltip text “Edit device”. For description, show a labelled control and the tooltip text “We send shift reminders to this address.”
3. Trigger grid: rows captioned exactly “long-press” and “tap”. Long-press uses an actionable icon button and tooltip text “More options”. Tap uses a help-only anchor and tooltip text “Shows the hours worked this week.”
4. State strip: five columns captioned exactly “Hidden”, “Shown — hover”, “Shown — keyboard focus”, “Shown — touch”, and “Dismissed”. Hidden and Dismissed show only the anchor; the three Shown states show the tooltip. Focus stays on the anchor; the tooltip has no separate focus or disabled styling.
5. Max-width sample: show “We send shift reminders to this address.” at user text scale 200%, based on the 12 px token, wrapping to exactly two lines inside a tooltip constrained to 320 px maximum width. Caption it “max 320 px · wraps · never truncates”.

Exact tooltip values: background #141414; text #FFFFFF; no border; no shadow; no pointer arrow; 6 px corner radius; 4 px block padding; 8 px inline padding; 320 px maximum width; 4 px anchor offset; 8 px minimum screen-edge distance. Text is Inter Medium, 12 px, 16 px line height, 0 px letter spacing, start-aligned. Write the exact value next to each part it styles as a small external redline annotation, never inside the tooltip.

Text (verbatim): “Edit device”; “More options”; “We send shift reminders to this address.”; “Shows the hours worked this week.” Do not substitute, misspell, truncate, or add tooltip copy.

Constraints: realistic Flutter Material 3 component-spec rendering, crisp flat vector-like UI, practical mobile proportions, exact logical placement, readable verbatim text. Never draw shadows, gradients, glow, photos, logos, decoration, tooltip arrows, or a phone/device frame. No watermark.
```

## Prompt — `tooltip-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat mobile component specification sheet
Primary request: Draw the Biowave Flutter Material 3 mobile Tooltip from plan 1.0 in the dark theme and Arabic, fully right-to-left.

Canvas: 1536 × 1024 px, never wider than 1600 px. Flat #0A0A0A page background. No device frame. Use #F7F7F7 for captions and callouts. Use a clean grid with generous whitespace; mirror the layout and reading order right-to-left.

Layout: organize the sheet into compact labelled grids. Use only options and states in the plan.
1. Placement grid: four rows captioned exactly “أعلى”, “أسفل”, “بداية”, “نهاية”; two RTL columns captioned exactly “مخفي” and “ظاهر — لمس”. Every cell has a 48 × 48 px icon-button touch target with a 20 × 20 px edit icon in #F7F7F7. Hidden cells show only the anchor. Shown cells use the exact tooltip text “تعديل الجهاز”. Place the tooltip above, below, right of, or left of the anchor as the row requires. In RTL, start is right and end is left. Centre the tooltip on the anchor’s cross axis. Keep an exact 4 px offset so it never covers the anchor.
2. Purpose grid: rows captioned exactly “تسمية” and “وصف”. For label, show an icon-only anchor and the tooltip text “تعديل الجهاز”. For description, show a labelled control and the tooltip text “نرسل تذكيرات المناوبات إلى هذا العنوان.”
3. Trigger grid: rows captioned exactly “ضغط مطوّل” and “نقر”. Long-press uses an actionable icon button and tooltip text “خيارات أخرى”. Tap uses a help-only anchor and tooltip text “يعرض ساعات العمل لهذا الأسبوع.”
4. State strip in RTL reading order: five columns captioned exactly “مخفي”, “ظاهر — تحويم”, “ظاهر — تركيز لوحة المفاتيح”, “ظاهر — لمس”, and “مُغلق”. Hidden and Dismissed show only the anchor; the three Shown states show the tooltip. Focus stays on the anchor; the tooltip has no separate focus or disabled styling.
5. Max-width sample: show “نرسل تذكيرات المناوبات إلى هذا العنوان.” at user text scale 200%, based on the 12 px token, wrapping to exactly two lines inside a tooltip constrained to 320 px maximum width. Caption it “حد أقصى 320 px · يلتف · لا يُقتطع”.

Exact tooltip values: background #FFFFFF; text #0A0A0A; no border; no shadow; no pointer arrow; 6 px corner radius; 4 px block padding; 8 px inline padding; 320 px maximum width; 4 px anchor offset; 8 px minimum screen-edge distance. Arabic text is IBM Plex Sans Arabic Medium, 12 px, 18 px line height, 0 px letter spacing, right/start-aligned. Write the exact value next to each part it styles as a small external redline annotation, never inside the tooltip.

Text (verbatim): “تعديل الجهاز”; “خيارات أخرى”; “نرسل تذكيرات المناوبات إلى هذا العنوان.”; “يعرض ساعات العمل لهذا الأسبوع.” Do not substitute, misspell, truncate, reorder, or add tooltip copy. Arabic glyphs must join correctly.

Constraints: realistic Flutter Material 3 component-spec rendering, crisp flat vector-like UI, practical mobile proportions, exact logical placement and RTL mirroring, readable verbatim Arabic. Only directional layout mirrors; the edit and help icons do not mirror. Never draw shadows, gradients, glow, photos, logos, decoration, tooltip arrows, or a phone/device frame. No watermark.
```

## Image checks

| Image | Result |
|---|---|
| `tooltip-light-en.jpg` | ✓ Matches the light-theme token colors, English strings, LTR placements, both purposes and triggers, all five states, 48 px touch targets, two-line max-width sample, and no-arrow styling. |
| `tooltip-dark-ar.jpg` | ✓ Matches the dark-theme token colors, Arabic strings, RTL start/end swap, both purposes and triggers, all five states, 48 px touch targets, two-line max-width sample, and no-arrow styling. |

## Questions

None.
