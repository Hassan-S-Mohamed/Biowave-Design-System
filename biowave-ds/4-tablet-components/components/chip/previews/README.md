# Tablet Chip 1.0 preview

These images are planning sketches. The plan remains the source of truth. The `status` variant is intentionally omitted because plan 1.0 does not specify its seven state mappings.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-background-base-default` (canvas) | `#FFFFFF` | `#141414` |
| `color-background-transparent` | `#54545400` | `#54545400` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-background-neutral-disabled` | `#EDEDED` | `#292929` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-background-success-subtle` | `#E9F7EF` | `#0E3921` |
| `color-background-warning-subtle` | `#FFF3E8` | `#773F12` |
| `color-background-error-subtle` | `#FEF0EE` | `#721212` |
| `color-background-info-subtle` | `#EEF4FF` | `#0E265F` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-disabled` | `#DBDBDB` | `#404040` |
| `color-border-brand` | `#607D9F` | `#254471` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-disabled` | `#969696` | `#545454` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-text-role-success` | `#1E6D41` | `#8DD4AE` |
| `color-text-role-warning` | `#A85A1A` | `#FFC88F` |
| `color-text-role-error` | `#D42222` | `#FEA3A3` |
| `color-text-role-info` | `#1D48AD` | `#9CBCF2` |
| `color-icon-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-icon-neutral-disabled` | `#969696` | `#545454` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-overlay-hover` | `#5454541A` | `#54545466` |
| `color-overlay-pressed` | `#54545433` | `#54545499` |
| `size-control-height-sm` | `32px` | `32px` |
| `size-control-height-md` | `40px` | `40px` |
| `spacing-control-padding-inline-sm` | `8px` | `8px` |
| `spacing-control-padding-inline-md` | `12px` | `12px` |
| `spacing-xs` (avatar/remove edge inset) | `4px` | `4px` |
| `spacing-control-gap-sm` | `4px` | `4px` |
| `spacing-control-gap-md` | `6px` | `6px` |
| `spacing-sm` (row/run gap) | `6px` | `6px` |
| `radius-md` (interactive) | `8px` | `8px` |
| `radius-full` (static) | `9999px` | `9999px` |
| `border-width-default` | `1px` | `1px` |
| `border-width-focus` | `2px` | `2px` |
| `border-focus-offset` | `2px` | `2px` |
| `size-icon-sm` | `16px` | `16px` |
| `size-icon-md` | `20px` | `20px` |
| `size-icon-lg` | `24px` | `24px` |
| `target-min` (tablet hit area) | `48px` | `48px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `label-md` (sm) | `14px / 20px EN; 14px / 22px AR; 500` | same |
| `label-lg` (md) | `16px / 24px EN; 16px / 26px AR; 500` | same |
| Avatar `neutral` color mapping | `unresolved` | `unresolved` |
| Assist leading Material Symbol name | `unresolved` | `unresolved` |

## Prompt — `chip-light-en.jpg`

Use case: `ui-mockup`.

Create a crisp, flat Flutter Material 3 tablet UI specification sheet, landscape, no wider than 1600px. Canvas is solid `#FFFFFF`. Use only flat fills and 1px strokes: no shadow, gradient, glow, photo, device frame, logo, watermark, decoration, splash, or elevation.

Layout: title `Chip · tablet · light · en`. Below it, an INTERACTIVE matrix whose columns are exactly `default`, `hover`, `pressed`, `focus`, `disabled`, and whose rows are exactly `assist / sm`, `assist / md`, `filter off / sm`, `filter off / md`, `filter on / sm`, `filter on / md`, `input / sm`, `input / md`. Put small captions above each column and at the start of each row. Then a STATIC TAG section with two rows, `tag / sm` and `tag / md`, and seven columns exactly `neutral`, `brand`, `secondary`, `success`, `warning`, `error`, `info`. Static tags show default only. Omit `status` completely.

Exact component copy: assist label `Add note`; filter label `Remote`; input label `Sara Ali`; avatar initials `(SA)` as a schematic placeholder because its color mapping is unresolved; tag label `Full time`. Assist has a small schematic leading icon, not a named glyph, because its exact Material Symbol is unresolved. Filter off has no check. Filter on has an unmirrored check at inline start. Input has the schematic initials at inline start and an unmirrored close icon in its remove button at inline end. One line only.

Geometry: `sm` visual height 32px, 8px inline padding, 4px gap, 16px glyph; `md` visual height 40px, 12px inline padding, 6px gap, 20px glyph. At the avatar and remove edges use 4px inset. Avatar boxes are 24px at sm and 32px at md. Remove-button boxes are 24px with 16px glyph at sm and 32px with 20px glyph at md. Interactive corner radius 8px with 1px border. Static tag radius 9999px. Row/run gap 6px. Draw a subtle dashed 48px hit-area guide around one sm assist and one sm remove button, labelled `48px min hit area`, while keeping the visual chip 32px high. Focus uses a 2px `#254471` ring with 2px offset. Typography: Inter/system stack, weight 500; sm is 14px/20px, md is 16px/24px.

Colors: interactive default is transparent `#54545400`, border `#DBDBDB`, label `#0A0A0A`, leading icon `#292929`. Hover adds `#5454541A`; pressed adds `#54545433`. Disabled uses border `#DBDBDB`, label/icon `#969696`, with no overlay. Selected filter uses background `#E8ECF2`, border `#607D9F`, label `#132843`, check `#193351`; its hover/pressed overlays remain `#5454541A` / `#54545433`; selected disabled uses background `#EDEDED`, border `#DBDBDB`, label/check `#969696`. Input hover, pressed, and focus affect only the remove button: transparent base, icon `#0A0A0A`, hover `#5454541A`, pressed `#54545433`, focus ring `#254471`; disabled remove icon `#969696`. Keep the input container itself unchanged across hover/pressed/focus.

Tag fills/labels: neutral `#EDEDED` / `#0A0A0A`; brand `#E8ECF2` / `#132843`; secondary `#E8F4F8` / `#094E65`; success `#E9F7EF` / `#1E6D41`; warning `#FFF3E8` / `#A85A1A`; error `#FEF0EE` / `#D42222`; info `#EEF4FF` / `#1D48AD`.

Add compact technical callouts next to representative chips, with exact text: `32px h · 8px pad · 4px gap · 16px icon · r8`; `40px h · 12px pad · 6px gap · 20px icon · r8`; `border 1px`; `focus 2px / offset 2px`; `pill r9999`; `label 14/20 500`; `label 16/24 500`. Add a compact swatch legend with the exact hex strings used. Do not add any other UI copy.

## Prompt — `chip-dark-ar.jpg`

Use case: `ui-mockup`.

Create a crisp, flat Flutter Material 3 tablet UI specification sheet, landscape, no wider than 1600px. Canvas is solid `#141414`. The whole sheet is right-to-left. Use only flat fills and 1px strokes: no shadow, gradient, glow, photo, device frame, logo, watermark, decoration, splash, or elevation.

Layout: technical title `Chip · tablet · dark · ar`. Below it, an INTERACTIVE matrix mirrored right-to-left: the row captions sit on the right; the rightmost state column is `default`, followed leftward by `hover`, `pressed`, `focus`, `disabled`. Rows are exactly `assist / sm`, `assist / md`, `filter off / sm`, `filter off / md`, `filter on / sm`, `filter on / md`, `input / sm`, `input / md`. Then a STATIC TAG section with two rows, `tag / sm` and `tag / md`; its columns run right-to-left as `neutral`, `brand`, `secondary`, `success`, `warning`, `error`, `info`. Static tags show default only. Omit `status` completely.

Exact Arabic component copy: assist `إضافة ملاحظة`; filter `عن بُعد`; input `سارة علي`; schematic avatar initial `(س)` because its color mapping is unresolved; tag `دوام كامل`. Use IBM Plex Sans Arabic/Noto Sans Arabic/Tahoma stack, weight 500. Assist has a small schematic leading icon, not a named glyph, because its exact Material Symbol is unresolved. RTL anatomy must mirror: leading assist/check/avatar items move to inline start on the right; the input remove button moves to inline end on the left. The check and close glyphs themselves never mirror. One line only.

Geometry: `sm` visual height 32px, 8px inline padding, 4px gap, 16px glyph; `md` visual height 40px, 12px inline padding, 6px gap, 20px glyph. At the avatar and remove edges use 4px inset. Avatar boxes are 24px at sm and 32px at md. Remove-button boxes are 24px with 16px glyph at sm and 32px with 20px glyph at md. Interactive corner radius 8px with 1px border. Static tag radius 9999px. Row/run gap 6px. Draw a subtle dashed 48px hit-area guide around one sm assist and one sm remove button, labelled `48px min hit area`, while keeping the visual chip 32px high. Focus uses a 2px `#90A3BC` ring with 2px offset. Typography: sm is 14px/22px, md is 16px/26px.

Colors: interactive default is transparent `#54545400`, border `#404040`, label `#F7F7F7`, leading icon `#DBDBDB`. Hover adds `#54545466`; pressed adds `#54545499`. Disabled uses border `#404040`, label/icon `#545454`, with no overlay. Selected filter uses background `#071323`, border `#254471`, label/check `#90A3BC`; its hover/pressed overlays remain `#54545466` / `#54545499`; selected disabled uses background `#292929`, border `#404040`, label/check `#545454`. Input hover, pressed, and focus affect only the remove button: transparent base, icon `#F7F7F7`, hover `#54545466`, pressed `#54545499`, focus ring `#90A3BC`; disabled remove icon `#545454`. Keep the input container itself unchanged across hover/pressed/focus.

Tag fills/labels: neutral `#292929` / `#F7F7F7`; brand `#071323` / `#90A3BC`; secondary `#032A37` / `#90C3D5`; success `#0E3921` / `#8DD4AE`; warning `#773F12` / `#FFC88F`; error `#721212` / `#FEA3A3`; info `#0E265F` / `#9CBCF2`.

Add compact technical callouts next to representative chips, with exact text: `32px h · 8px pad · 4px gap · 16px icon · r8`; `40px h · 12px pad · 6px gap · 20px icon · r8`; `border 1px`; `focus 2px / offset 2px`; `pill r9999`; `label 14/22 500`; `label 16/26 500`. Add a compact swatch legend with the exact hex strings used. Do not add any other UI copy.

## Image checks

| Image | Result |
|---|---|
| `chip-light-en.jpg` | ⚠ All 8 interactive rows × 5 states, both tag sizes × 7 colours, English copy, focus rings, hit-area guides and final flat tag fills are present. The unresolved Avatar palette and assist glyph use schematic placeholders; generated antialiasing/compositing means annotated token values cannot be guaranteed pixel-exact. |
| `chip-dark-ar.jpg` | ⚠ All 8 interactive rows × 5 states, both tag sizes × 7 colours, Arabic copy and RTL anatomy are present; check/close glyphs do not mirror, and final flat tag fills are borderless. The unresolved Avatar palette and assist glyph use schematic placeholders; a slight dark-canvas tonal variation remains after two retries, so annotated values are not pixel-exact. |

## Questions

- What semantic colors should the planned Avatar `neutral` appearance use? Chip B3 references Avatar B3, but no Avatar plan or token mapping is present in the permitted source.
- Which Material Symbol should the `Add note` assist example use? The plan requires a leading icon but does not name its glyph.
