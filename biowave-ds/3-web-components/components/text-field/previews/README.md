# Text field preview

Plan version: 1.2. These images are review sketches; `text-field.md` remains the source of truth.

## Token sheet

All dimensions are web pixels. Typography rows use the English value first and the Arabic value second where line height or family differs by language.

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-background-base-default` | `#FFFFFF` | `#141414` |
| `color-background-disabled` | `#EDEDED` | `#292929` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-background-base-subtlest` | `#F7F7F7` | `#141414` |
| `color-border-bold` | `#707070` | `#969696` |
| `color-border-bold` | `#404040` | `#BDBDBD` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-border-error` | `#D42222` | `#FF7676` |
| `color-border-disabled` | `#DBDBDB` | `#404040` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-subtlest` | `#707070` | `#969696` |
| `color-text-subtlest` | `#707070` | `#BDBDBD` |
| `color-text-disabled` | `#969696` | `#545454` |
| `color-text-subtle` | `#292929` | `#DBDBDB` |
| `color-text-role-error` | `#D42222` | `#FEA3A3` |
| `color-icon-subtlest` | `#707070` | `#BDBDBD` |
| `color-icon-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-disabled` | `#969696` | `#545454` |
| `color-icon-role-error` | `#FF2B2B` | `#FEA3A3` |
| `size-control-height-sm / md / lg` | `32 / 40 / 48 px` | `32 / 40 / 48 px` |
| `spacing-control-padding-inline-sm / md / lg` | `8 / 12 / 16 px` | `8 / 12 / 16 px` |
| `spacing-control-gap-sm / md / lg` | `4 / 6 / 8 px` | `4 / 6 / 8 px` |
| `spacing-xs` | `4 px` | `4 px` |
| `spacing-sm` | `6 px` | `6 px` |
| `radius-md` | `8 px` | `8 px` |
| `border-width-default / focus` | `1 / 2 px` | `1 / 2 px` |
| `size-icon-sm / md / lg` | `16 / 20 / 24 px` | `16 / 20 / 24 px` |
| `trailing-action box sm / md / lg` | `24 / 32 / 40 px` | `24 / 32 / 40 px` |
| `target-min` | `24 px` | `24 px` |
| `label-sm` | `Inter 12/16 px, 500` | `IBM Plex Sans Arabic 12/18 px, 500` |
| `label-md` | `Inter 13/18 px, 500` | `IBM Plex Sans Arabic 13/20 px, 500` |
| `label-lg` | `Inter 14/20 px, 500` | `IBM Plex Sans Arabic 14/22 px, 500` |
| `body-sm` | `Inter 13/20 px, 400` | `IBM Plex Sans Arabic 13/22 px, 400` |
| `body-md` | `Inter 14/22 px, 400` | `IBM Plex Sans Arabic 14/24 px, 400` |
| `body-lg` | `Inter 16/24 px, 400` | `IBM Plex Sans Arabic 16/26 px, 400` |
| `caption-md` | `Inter 12/16 px, 400` | `IBM Plex Sans Arabic 12/18 px, 400` |
| `action-sm` | `Inter 13/18 px, 500` | `IBM Plex Sans Arabic 13/20 px, 500` |
| `action-md` | `Inter 14/20 px, 500` | `IBM Plex Sans Arabic 14/22 px, 500` |
| `action-lg` | `Inter 16/24 px, 500` | `IBM Plex Sans Arabic 16/26 px, 500` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |

Derived three-row multiline specimen heights are `70 / 80 / 90 px` in English and `76 / 86 / 96 px` in Arabic for `sm / md / lg`: `2 × padding-block + 3 × body line-height + 2 × 1 px border`.

### Unresolved

- ⚠ The permitted inputs identify the attached end button as Button `outlined · neutral` but do not expose that component's exact background, text, and state aliases. The sketches use the current text-field background, border, and neutral text tokens so the attachment can still be reviewed.
- ⚠ The plan does not prescribe a fixed multiline height. The sketches use a derived three-visible-line specimen height; the implementation remains content-driven and resizable on web.
- ⚠ `image_generation` may rasterize typography and micro-measurements approximately. Token labels beside each specimen are authoritative when a rendered edge or glyph cannot be measured exactly from the JPEG.

## Prompt — `text-field-light-en.jpg`

Use case: `ui-mockup`.

Asset type: a flat web design-system UI specification sheet, not a product screen and not concept art. Create a landscape canvas no wider than 1600 px, ideally 1536 × 1024, with a solid `#F7F7F7` page background. Use crisp flat vector-like UI drawing, Inter, strong alignment, generous white space, and high legibility.

Layout: title `Text field · web · light · EN`. Use a disciplined grid with four horizontal sections. Section 1, `single-line anatomy`, has rows `sm`, `md`, `lg`; each row shows one complete default field with label `Work email`, required indicator `*`, help icon `?`, leading mail icon, value `name@company.com`, trailing clear action `×`, supporting text `Enter a valid work email`, and counter `16 / 80`. Section 2, `states · md`, has six equal columns captioned exactly `default`, `hover`, `focus`, `error`, `read-only`, `disabled`, each showing the same compact md text field. In the error column add the error icon `!` before `Enter a valid work email`. Section 3, `attachments · md`, has three columns: prefix `http://` at inline start; suffix `SAR` at inline end; attached end button `Copy` at inline end with shared border and square joining corners. Section 4, `multiline`, has rows `sm`, `md`, `lg`; each shows label `Request reason`, three visible text lines beginning `Explain why you need remote work`, a clear action `×`, supporting text `Explain why you need remote work`, and counter `0 / 400`.

Exact geometry annotations beside the relevant specimens: single-line height `32 / 40 / 48 px`; padding-inline `8 / 12 / 16 px`; internal gap `4 / 6 / 8 px`; label gap `6 px`; supporting gap `4 px`; radius `8 px`; default border `1 px`; focus border `2 px` with no exterior offset; icons `16 / 20 / 24 px`; clear action boxes `24 / 32 / 40 px`; clear action inset exactly `4 px` from top, bottom, and inline-end border; help hit box `24 px`. Multiline specimens are `70 / 80 / 90 px` tall for exactly three English body lines. In every multiline size, draw a short red measurement guide from the field's top border to the clear-action box reading exactly `4 px top inset`; the clear-action box sits inside the top border, never on it.

Exact typography annotations: label sm/md/lg `12/16, 13/18, 14/20 px, weight 500`; body sm/md/lg `13/20, 14/22, 16/24 px, weight 400`; caption `12/16 px, weight 400`; action sm/md/lg `13/18, 14/20, 16/24 px, weight 500`.

Exact light colors, printed next to the part they style: page `#F7F7F7`; field `#FFFFFF`; disabled field and default add-on `#EDEDED`; read-only field `#F7F7F7`; default border `#707070`; hover border `#404040`; focus border `#254471`; error border `#D42222`; disabled and read-only border `#DBDBDB`; default text `#0A0A0A`; placeholder, muted text, and muted icons `#707070`; disabled text/icons `#969696`; add-on text `#292929`; error supporting text `#D42222`; error icon `#FF2B2B`; focused icon `#0A0A0A`.

Constraints: UI strings must be verbatim; captions use only plan option/state names; single-line text never wraps; prefix, suffix, and end button are separate examples; no suffix together with end button; no trailing decorative icon together with the clear action. No shadows, gradients, glow, photos, device frames, logos, decoration, watermark, or extra controls.

## Prompt — `text-field-dark-ar.jpg`

Use case: `ui-mockup`.

Asset type: a flat web design-system UI specification sheet, not a product screen and not concept art. Create a landscape canvas no wider than 1600 px, ideally 1536 × 1024, with a solid `#0A0A0A` page background. Use crisp flat vector-like UI drawing, IBM Plex Sans Arabic, strong alignment, generous white space, and high legibility. The sheet and every component use right-to-left direction.

Layout: title `Text field · web · dark · AR`. Use a disciplined mirrored grid with four horizontal sections. Section 1, `single-line anatomy`, has rows `sm`, `md`, `lg`; each row shows one complete default RTL field with label `البريد الإلكتروني للعمل`, required indicator `*`, help icon `?` after the label in reading order, leading mail icon on inline start, intrinsically LTR value `name@company.com`, trailing clear action `×` on inline end, supporting text `أدخل بريدًا إلكترونيًا صالحًا للعمل`, and LTR-isolated counter `16 / 80` at inline end. Section 2, `states · md`, has six equal mirrored columns captioned exactly `default`, `hover`, `focus`, `error`, `read-only`, `disabled`, each showing the same compact md RTL field. In the error column add the error icon `!` before the Arabic error message in reading order. Section 3, `attachments · md`, has three columns: prefix `http://` isolated LTR at visual right/inline start; suffix `ر.س` at visual left/inline end; attached end button `نسخ` at visual left/inline end with shared border and square joining corners. Section 4, `multiline`, has rows `sm`, `md`, `lg`; each shows label `سبب الطلب`, three visible RTL text lines beginning `اشرح سبب حاجتك إلى العمل عن بُعد`, clear action `×` at inline end, supporting text `اشرح سبب حاجتك إلى العمل عن بُعد`, and LTR-isolated counter `0 / 400` at inline end.

Exact geometry annotations beside the relevant specimens: single-line height `32 / 40 / 48 px`; padding-inline `8 / 12 / 16 px`; internal gap `4 / 6 / 8 px`; label gap `6 px`; supporting gap `4 px`; radius `8 px`; default border `1 px`; focus border `2 px` with no exterior offset; icons `16 / 20 / 24 px`; clear action boxes `24 / 32 / 40 px`; clear action inset exactly `4 px` from top, bottom, and inline-end border; help hit box `24 px`. Multiline specimens are `76 / 86 / 96 px` tall for exactly three Arabic body lines. In every multiline size, draw a short red measurement guide from the field's top border to the clear-action box reading exactly `4 px top inset`; the clear-action box sits inside the top border, never on it.

Exact typography annotations: label sm/md/lg `12/18, 13/20, 14/22 px, weight 500`; body sm/md/lg `13/22, 14/24, 16/26 px, weight 400`; caption `12/18 px, weight 400`; action sm/md/lg `13/20, 14/22, 16/26 px, weight 500`.

Exact dark colors, printed next to the part they style: page `#0A0A0A`; field `#141414`; disabled field and default add-on `#292929`; read-only field `#141414`; default border `#969696`; hover border `#BDBDBD`; focus border `#90A3BC`; error border `#FF7676`; disabled and read-only border `#404040`; default text `#F7F7F7`; placeholder `#969696`; muted text and icons `#BDBDBD`; disabled text/icons `#545454`; add-on text `#DBDBDB`; error supporting text and error icon `#FEA3A3`; focused icon `#F7F7F7`.

Constraints: Arabic UI strings must be verbatim and properly joined; component layout is mirrored RTL; `http://`, email values, Western digits, and slashes remain LTR and are not reversed; glyphs do not mirror; single-line text never wraps. Prefix, suffix, and end button are separate examples; no suffix together with end button; no trailing decorative icon together with the clear action. No shadows, gradients, glow, photos, device frames, logos, decoration, watermark, or extra controls.

## Checks

| Image | Result |
|---|---|
| `text-field-light-en.jpg` | ⚠ All requested sizes, states, parts, EN strings, attachments, token legends and 4 px multiline inset guides are present. The generator arranged the size variants as columns rather than the prompt's row wording; rasterized micro-measurements remain illustrative, with the token sheet authoritative. |
| `text-field-dark-ar.jpg` | ⚠ All requested sizes, states, Arabic strings, mirrored field direction, corrected RTL attachment sides and 4 px multiline inset guides are present. The generator arranged size variants as columns and omitted the full in-image typography/color legends; those exact values remain in the token sheet above. Rasterized micro-measurements remain illustrative. |
