# Badge mobile previews

Plan 1.0 visual check for Flutter Material 3 mobile. The plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` (neutral anchor) | `#FFFFFF` | `#141414` |
| `color-border-default` (neutral anchor) | `#DBDBDB` | `#404040` |
| `color-text-neutral-default` (captions) | `#0A0A0A` | `#F7F7F7` |
| `color-border-inverse` (anchored ring) | `#FFFFFF` | `#0A0A0A` |
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
| `color-surface-inverse` (neutral badge) | `#141414` | `#FFFFFF` |
| `color-text-neutral-inverse` / `color-icon-neutral-inverse` | `#FFFFFF` | `#0A0A0A` |
| `target-min` (anchor touch target) | `48dp` | `48dp` |
| `size-icon-md` (count/check height and minimum width) | `20dp` | `20dp` |
| `spacing-md` (dot diameter) | `8dp` | `8dp` |
| `spacing-xs` (count horizontal padding) | `4dp` | `4dp` |
| `size-icon-sm` (check glyph) | `16dp` | `16dp` |
| `border-width-strong` (ring) | `2dp` | `2dp` |
| `radius-full` | `9999dp` | `9999dp` |
| `data-sm` font family | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| `data-sm` size / weight / line height / letter spacing | `13dp / 500 / 18dp / 0` | `13dp / 500 / 20dp / 0` |

There is no `badge.tokens.json`; the plan uses foundation semantic tokens directly.

## Prompt — `badge-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat UI component specification sheet for the Biowave mobile Badge plan 1.0
Canvas: 1536 × 1024 landscape, never wider than 1600px. Use one flat background, color-surface-page #F7F7F7. No device frame.
Style/medium: precise Flutter Material 3 mobile component spec sheet, crisp vector-like UI, orthographic, no perspective.
Direction and language: English, left-to-right. Rectangular and circular badges sit at the physical top-right corner (LTR top-end). The check glyph never mirrors.
Layout: a strict grid. Rows are the seven color options in this order: error, brand, secondary, success, warning, info, neutral. Columns are: count · Visible · 1; count · Visible · 9; count · Over max · 99+; dot · Visible; check · Visible. Put a small exact caption above every column and before every row. Show only valid plan combinations: warning has count cells only; check exists only for brand, secondary, success, info and neutral; dot exists for error, brand, secondary, success, info and neutral. Mark invalid cells with a plain em dash, not a component.
Anchors and placement: every valid grid cell uses a neutral 48dp × 48dp rectangular Icon-button-sized square, fill #FFFFFF and 1dp outline #DBDBDB. The indicator center sits exactly on the anchor's top-right corner, does not affect the 48dp hit area, and has an outside 2dp ring in #FFFFFF. Add two enlarged placement callouts: rectangular overlap at the exact top-right corner; circular avatar overlap inset 14.6% of the 48dp anchor size on both axes. Label both callouts.
Badge dimensions: count is a 20dp-high pill with minimum width 20dp, 4dp horizontal padding, radius 9999dp, one-line centered digits; dot is a fixed 8dp circle; check is a fixed 20dp circle with a centered 16dp Material Symbols Rounded check. Ring width is 2dp outside. Show these exact annotations next to an enlarged example: “20dp”, “min 20dp”, “4dp”, “8dp”, “16dp”, “2dp”, “radius 9999dp”, and “48dp target”.
Typography: count digits use Inter, 13dp, weight 500, line height 18dp, letter spacing 0, tabular figures. Render 1, 9 and 99+ exactly; 99+ remains LTR.
Exact light colors, with each token and hex written beside its color-row label: error background #D42222 with text #FFFFFF; brand #193351 with text/check #FFFFFF; secondary #0C5F79 with text/check #FFFFFF; success #1E6D41 with text/check #FFFFFF; warning #FF9435 with text #0A0A0A; info #2559D4 with text/check #FFFFFF; neutral background #141414 with text/check #FFFFFF. Captions use #0A0A0A.
States strip: below the main grid, show only plan states, captioned exactly: Hidden (empty anchor); Appearing (small indicator growing from its center); Visible (normal); Over max (99+); Disappearing (small indicator shrinking to its center); Anchor hover / focus / pressed / disabled (four anchors whose badge is visually unchanged). Keep this strip secondary and uncluttered.
Approved content examples, verbatim in a small separate text panel: “3 unread messages”, “More than 99 notifications”, “New activity”, “Verified”, “Completed”.
Constraints: flat spec sheet only. Never draw shadows, gradients, glow, photos, device frames, logos, decorations or watermarks. Do not add invented states, colors, badges, icons or copy. One badge per anchor. Use Western digits. Keep all labels legible and spelled exactly.
```

### Retry 1 — `badge-light-en.jpg`

```text
Use case: precise-object-edit
Asset type: flat UI component specification sheet
Primary request: Change only the badge attached to the “Disabled” anchor in the bottom-right “Anchor hover / focus / pressed / disabled” strip. Make that badge identical to the badges on Hover, Focus and Pressed: brand background #193351, white digit 9, white 2dp outside ring, same 20dp count-pill size and placement. The disabled anchor may remain disabled gray.
Constraints: preserve every other pixel-level aspect of the sheet: canvas, background, grid, all components, colors, text, spelling, dimensions, lines, layout and approved content. Do not dim the disabled badge. Do not change or add any other element. No watermark.
```

## Prompt — `badge-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat UI component specification sheet for the Biowave mobile Badge plan 1.0
Canvas: 1536 × 1024 landscape, never wider than 1600px. Use one flat background, color-surface-page #0A0A0A. No device frame.
Style/medium: precise Flutter Material 3 mobile component spec sheet, crisp vector-like UI, orthographic, no perspective.
Direction and language: Arabic, right-to-left. Mirror the whole grid and reading order. Rectangular and circular badges sit at the physical top-left corner, matching the plan's RTL placement. Keep Western digits 1, 9 and 99+ left-to-right. The Material Symbols Rounded check never mirrors.
Layout: a strict RTL grid. Rows are the seven code color options in this order from top to bottom: error, brand, secondary, success, warning, info, neutral. Columns, read right-to-left, are: count · Visible · 1; count · Visible · 9; count · Over max · 99+; dot · Visible; check · Visible. Put a small exact caption above every column and before every row. Show only valid plan combinations: warning has count cells only; check exists only for brand, secondary, success, info and neutral; dot exists for error, brand, secondary, success, info and neutral. Mark invalid cells with a plain em dash, not a component.
Anchors and placement: every valid grid cell uses a neutral 48dp × 48dp rectangular Icon-button-sized square, fill #141414 and 1dp outline #404040. The indicator center sits exactly on the anchor's physical top-left corner, does not affect the 48dp hit area, and has an outside 2dp ring in #0A0A0A. Add two enlarged placement callouts: rectangular overlap at the exact top-left corner; circular avatar overlap inset 14.6% of the 48dp anchor size on both axes. Label both callouts in an RTL arrangement.
Badge dimensions: count is a 20dp-high pill with minimum width 20dp, 4dp horizontal padding, radius 9999dp, one-line centered digits; dot is a fixed 8dp circle; check is a fixed 20dp circle with a centered 16dp Material Symbols Rounded check. Ring width is 2dp outside. Show these exact annotations next to an enlarged example: “20dp”, “min 20dp”, “4dp”, “8dp”, “16dp”, “2dp”, “radius 9999dp”, and “48dp target”.
Typography: count digits use IBM Plex Sans Arabic, 13dp, weight 500, line height 20dp, letter spacing 0, tabular figures. Render 1, 9 and 99+ exactly and do not reorder the plus sign.
Exact dark colors, with each token and hex written beside its color-row label: error background #FF7676 with text #0A0A0A; brand #607D9F with text/check #0A0A0A; secondary #5DA8C2 with text/check #0A0A0A; success #55BE87 with text/check #0A0A0A; warning #FFB05E with text #0A0A0A; info #6D9CE8 with text/check #0A0A0A; neutral background #FFFFFF with text/check #0A0A0A. Captions use #F7F7F7.
States strip: below the main grid, show only plan states in a mirrored RTL sequence, captioned exactly with these plan state names: Hidden (empty anchor); Appearing (small indicator growing from its center); Visible (normal); Over max (99+); Disappearing (small indicator shrinking to its center); Anchor hover / focus / pressed / disabled (four anchors whose badge is visually unchanged). Keep this strip secondary and uncluttered.
Arabic approved content examples, verbatim in a small separate RTL text panel: “3 رسائل غير مقروءة”, “أكثر من 99 إشعارًا”, “نشاط جديد”, “تم التحقق”, “مكتمل”.
Constraints: flat spec sheet only. Never draw shadows, gradients, glow, photos, device frames, logos, decorations or watermarks. Do not add invented states, colors, badges, icons or copy. One badge per anchor. Use Western digits. Keep all Arabic correctly joined, right-to-left, legible and spelled exactly.
```

## Checks

| Image | Result |
|---|---|
| `badge-light-en.jpg` | ✓ Layout, allowed combinations, token labels, LTR placement, dimensions, states and approved English copy match. One retry corrected the disabled-anchor example so its badge remains unchanged. |
| `badge-dark-ar.jpg` | ✓ Layout, allowed combinations, token labels, mirrored top-left placement, Western-digit order, unmirrored check, states and approved Arabic copy match. |

⚠ These JPEGs are planning sketches. Exact token hex and dp values are written into the sheets, but antialiasing, AI rasterization and JPEG quality-85 compression mean sampled pixels and measured raster geometry are not authoritative; use the token sheet and plan values above.
