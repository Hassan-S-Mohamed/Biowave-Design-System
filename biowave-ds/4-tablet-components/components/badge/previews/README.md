# Badge tablet previews

Planning sketches for Badge 1.0. The plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-surface-raised` | `#FFFFFF` | `#292929` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-default` | `#0A0A0A` | `#F7F7F7` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-background-error-default` | `#D42222` | `#FF7676` |
| `color-text-on-error` | `#FFFFFF` | `#0A0A0A` |
| `color-background-brand-default` | `#193351` | `#607D9F` |
| `color-text-on-brand` / `color-icon-on-brand` | `#FFFFFF` | `#0A0A0A` |
| `color-background-secondary-default` | `#0C5F79` | `#5DA8C2` |
| `color-text-on-secondary` / `color-icon-on-secondary` | `#FFFFFF` | `#0A0A0A` |
| `color-background-success-default` | `#1E6D41` | `#55BE87` |
| `color-text-on-success` / `color-icon-on-success` | `#FFFFFF` | `#0A0A0A` |
| `color-background-warning-default` | `#FF9435` | `#FFB05E` |
| `color-text-on-warning` | `#0A0A0A` | `#0A0A0A` |
| `color-background-info-default` | `#2559D4` | `#6D9CE8` |
| `color-text-on-info` / `color-icon-on-info` | `#FFFFFF` | `#0A0A0A` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-text-inverse` / `color-icon-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-border-inverse` (anchored ring) | `#FFFFFF` | `#0A0A0A` |
| `size-icon-md` (count/check height and minimum width) | `20dp` | `20dp` |
| `spacing-md` (dot diameter) | `8dp` | `8dp` |
| `spacing-xs` (count horizontal padding) | `4dp` | `4dp` |
| `size-icon-sm` (check glyph) | `16dp` | `16dp` |
| `border-width-strong` (outside ring) | `2dp` | `2dp` |
| `radius-full` | `9999dp` | `9999dp` |
| `target-min` / tablet anchor | `48dp` | `48dp` |
| `data-sm` font size / weight | `13dp / 500` | `13dp / 500` |
| `data-sm` line height | `18dp` (EN) | `20dp` (AR) |
| `data-sm` letter spacing | `0dp` (EN) | `0dp` (AR) |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |

There is no `badge.tokens.json`; Badge uses the resolved foundation tokens above directly.

## Prompt — `badge-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat tablet UI component specification sheet
Primary request: Draw the Flutter Material 3 tablet Badge 1.0 in the light theme as a precise planning sheet, not concept art.
Canvas: 1536 × 1024 landscape, never wider than 1600px; solid page background #F7F7F7. Flat UI only.
Layout: English left-to-right grid with small 13px Inter medium captions above every column and beside every row. Use #0A0A0A caption text and #EDEDED hairline grid guides. Keep generous whitespace and exact alignment.
Section 1 — allowed variant/color matrix: rows are ERROR, BRAND, SECONDARY, SUCCESS, WARNING, INFO, NEUTRAL. Columns are COUNT 1, COUNT 9, OVER MAX 99+, DOT, CHECK. Count is allowed for every row. Dot is allowed for every row except WARNING. Check is allowed only for BRAND, SECONDARY, SUCCESS, INFO, NEUTRAL. Leave prohibited cells empty with a plain em dash; do not draw an illegal badge. Every count/check indicator is 20dp high and at least 20dp wide; counts have 4dp horizontal padding; dots are 8dp circles; all use 9999dp radius. Count text uses 13dp Inter, weight 500, 18dp line height, tabular Western digits. Check uses a centered 16dp Material Symbols Rounded check glyph and is never mirrored.
Exact light colors: ERROR fill #D42222 with count text #FFFFFF. BRAND fill #193351 with count/check #FFFFFF. SECONDARY fill #0C5F79 with count/check #FFFFFF. SUCCESS fill #1E6D41 with count/check #FFFFFF. WARNING count fill #FF9435 with count text #0A0A0A. INFO fill #2559D4 with count/check #FFFFFF. NEUTRAL fill #141414 with count/check #FFFFFF.
Section 2 — placement and sizing: show a 48dp square Icon button anchor with surface #FFFFFF and envelope icon #0A0A0A, plus a 48dp circular avatar-sized anchor with surface #FFFFFF. Put anchored indicators on the top-end corner, their centres exactly on the rectangular corner. For circular overlap inset the reference corner by 14.6% on both axes. Each anchored badge has a 2dp outside ring #FFFFFF. Show count, dot, and circular check examples. Also show one standalone inline specimen reading exactly "Inbox" followed by count "12"; it has no ring and is vertically centred.
Section 3 — static state strip: columns HIDDEN, APPEARING, VISIBLE, OVER MAX, DISAPPEARING, ANCHOR HOVER / FOCUS / PRESSED / DISABLED. Use a single 48dp anchor. Hidden is anchor only; appearing/disappearing are scale snapshots centered on the indicator; visible shows count 1; over max shows 99+; the anchor-state specimens change the anchor only and keep the badge unchanged. Do not imply the badge is interactive.
Section 4 — exact accessibility copy, rendered once each and spelled verbatim: "3 unread messages"; "More than 99 notifications"; "New activity"; "Verified"; "Completed".
Dimension callouts beside the actual part they style: "20dp indicator", "8dp dot", "4dp inline padding", "16dp check", "2dp outside ring", "48dp target", "radius 9999dp", "data-sm 13/18, 500".
Constraints: practical production UI; preserve every literal string; no extra badge colors or combinations; badge never changes anchor size or hit area; clicks belong to the anchor; no shadows, gradients, glow, photos, device frames, logos, branding, decoration, watermark, perspective, or 3D.
```

## Prompt — `badge-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat tablet UI component specification sheet
Primary request: Draw the Flutter Material 3 tablet Badge 1.0 in the dark theme as a precise Arabic planning sheet, not concept art.
Canvas: 1536 × 1024 landscape, never wider than 1600px; solid page background #0A0A0A. Flat UI only.
Layout: Arabic right-to-left grid, visually mirrored from the English sheet. Use small 13px IBM Plex Sans Arabic medium captions, 20px line height. Use #F7F7F7 caption text and #292929 hairline grid guides. Keep generous whitespace and exact alignment. The logical top-end badge corner is the physical top-left in this RTL image.
Section 1 — allowed variant/color matrix: rows are "خطأ", "العلامة التجارية", "ثانوي", "نجاح", "تحذير", "معلومات", "محايد". Columns, ordered right-to-left, are "العدد 1", "العدد 9", "فوق الحد 99+", "نقطة", "تحقق". Count is allowed for every row. Dot is allowed for every row except WARNING. Check is allowed only for BRAND, SECONDARY, SUCCESS, INFO, NEUTRAL. Leave prohibited cells empty with a plain em dash; do not draw an illegal badge. Every count/check indicator is 20dp high and at least 20dp wide; counts have 4dp horizontal padding; dots are 8dp circles; all use 9999dp radius. Count text uses 13dp type, weight 500, 20dp line height, tabular Western digits. Force count strings "1", "9" and "99+" to remain left-to-right so the plus never reorders. Check uses a centered 16dp Material Symbols Rounded check glyph and is never mirrored.
Exact dark colors: ERROR fill #FF7676 with count text #0A0A0A. BRAND fill #607D9F with count/check #0A0A0A. SECONDARY fill #5DA8C2 with count/check #0A0A0A. SUCCESS fill #55BE87 with count/check #0A0A0A. WARNING count fill #FFB05E with count text #0A0A0A. INFO fill #6D9CE8 with count/check #0A0A0A. NEUTRAL fill #FFFFFF with count/check #0A0A0A.
Section 2 — placement and sizing: show a 48dp square Icon button anchor with surface #141414 and envelope icon #F7F7F7, plus a 48dp circular avatar-sized anchor with surface #292929. Put anchored indicators on the logical top-end corner, physically top-left, with their centres exactly on the rectangular corner. For circular overlap inset the reference corner by 14.6% on both axes. Each anchored badge has a 2dp outside ring #0A0A0A. Show count, dot, and circular check examples. Also show one standalone inline specimen with Arabic text exactly "الوارد" and count "12"; it has no ring and is vertically centred. Put the count on the logical inline end while keeping its digits LTR.
Section 3 — static state strip: RTL columns "مخفي", "ظهور", "مرئي", "فوق الحد", "اختفاء", "حالات المرساة". Use a single 48dp anchor. Hidden is anchor only; appearing/disappearing are scale snapshots centered on the indicator; visible shows count 1; over max shows 99+; anchor hover/focus/pressed/disabled change the anchor only and keep the badge unchanged. Do not imply the badge is interactive.
Section 4 — exact accessibility copy, rendered once each and spelled verbatim in correct Arabic RTL: "3 رسائل غير مقروءة"; "أكثر من 99 إشعارًا"; "نشاط جديد"; "تم التحقق"; "مكتمل".
Dimension callouts beside the actual part they style: "20dp مؤشر", "8dp نقطة", "4dp حشوة أفقية", "16dp تحقق", "2dp حلقة خارجية", "48dp هدف لمس", "نصف قطر 9999dp", "data-sm 13/20, 500".
Constraints: practical production UI; preserve every literal Arabic string and Western digit; mirror placement RTL; never mirror the check; no extra badge colors or combinations; badge never changes anchor size or hit area; clicks belong to the anchor; no shadows, gradients, glow, photos, device frames, logos, branding, decoration, watermark, perspective, or 3D.
```

## Image checks

| Image | Result |
|---|---|
| `badge-light-en.jpg` | ⚠ Structure, legal variant/color combinations, count strings, dimensions/callouts, rectangular and circular placement, states and accessibility copy match. After two targeted correction attempts, the circular-avatar caption remains `Cougt` instead of `Count` (the second attempt failed before producing an image). The generated badge fills contain slight tonal variation and the raster/JPEG cannot guarantee exact token hexes or dp geometry. |
| `badge-dark-ar.jpg` | ⚠ Structure, legal variant/color combinations, Western count strings, dark/Arabic content, RTL top-start placement, dimensions/callouts, rectangular and circular overlap, states and accessibility copy match. The generated badge fills contain slight tonal variation and the raster/JPEG cannot guarantee exact token hexes or dp geometry. |

## Questions

None.
