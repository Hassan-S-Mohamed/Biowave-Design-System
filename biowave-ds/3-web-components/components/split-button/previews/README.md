# Split button web previews — plan 1.1

These two flat UI specification sheets are planning sketches. The component plan remains the source of truth.

## Token sheet

All values below are resolved from `2-foundations/dist/tokens.json` for the web platform. Split button has no component-token file; its primary action and trigger reuse the allowed Button mappings in `button.tokens.json`.

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-raised` | `#FFFFFF` | `#292929` |
| `elevation-3` | `0px 8px 24px 0px rgb(7 19 35 / 12%)` | `0px 8px 24px 0px rgb(0 0 0 / 30%)` |
| `color-background-brand-default` | `#193351` | `#607D9F` |
| `color-background-brand-hovered` | `#132843` | `#90A3BC` |
| `color-background-brand-pressed` | `#0D1E33` | `#BEC9D9` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-background-secondary-default` | `#0C5F79` | `#5DA8C2` |
| `color-background-secondary-hovered` | `#094E65` | `#90C3D5` |
| `color-background-secondary-pressed` | `#063C4E` | `#C0DDE8` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-background-neutral-hovered` | `#DBDBDB` | `#404040` |
| `color-background-neutral-pressed` | `#BDBDBD` | `#545454` |
| `color-background-neutral-disabled` | `#EDEDED` | `#292929` |
| `color-background-transparent-default` | `#54545400` | `#54545400` |
| `color-text-on-brand` | `#FFFFFF` | `#0A0A0A` |
| `color-text-on-secondary` | `#FFFFFF` | `#0A0A0A` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-disabled` | `#969696` | `#545454` |
| `color-icon-on-brand` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-on-secondary` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-icon-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-disabled` | `#969696` | `#545454` |
| `color-icon-subtle` | `#292929` | `#DBDBDB` |
| `color-border-brand` | `#607D9F` | `#254471` |
| `color-border-secondary` | `#5DA8C2` | `#1A7596` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `color-border-disabled` | `#DBDBDB` | `#404040` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-overlay-hovered` | `#5454541A` | `#54545466` |
| `color-overlay-pressed` | `#54545433` | `#54545499` |
| `spacing-xxs` (between halves) | `2px` | `2px` |
| `spacing-xs` (menu offset) | `4px` | `4px` |
| `spacing-control-padding-inline-sm / md / lg` | `8px / 12px / 16px` | `8px / 12px / 16px` |
| `spacing-control-gap-sm / md / lg` | `4px / 6px / 8px` | `4px / 6px / 8px` |
| `size-control-height-sm / md / lg` | `32px / 40px / 48px` | `32px / 40px / 48px` |
| `size-icon-sm / md / lg` | `16px / 20px / 24px` | `16px / 20px / 24px` |
| `radius-xs` (inner corners) | `4px` | `4px` |
| `radius-md` (outer corners) | `8px` | `8px` |
| `radius-lg` (menu) | `10px` | `10px` |
| `border-width-default` | `1px` | `1px` |
| `border-width-focus` | `2px` | `2px` |
| `border-focus-offset` | `2px` | `2px` |
| `font-family` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| action font size sm / md / lg | `13px / 14px / 16px` | `13px / 14px / 16px` |
| action font weight | `500` | `500` |
| action line height sm / md / lg | `18px / 20px / 24px` | `20px / 22px / 26px` |
| menu `body-md` font size / weight / line height | `14px / 400 / 22px` | `14px / 400 / 24px` |
| default letter spacing | `0px` | `0px` |

## Prompt — `split-button-light-en.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component specification sheet
Primary request: Draw the Biowave web Split button plan 1.1 as a precise flat UI spec sheet in light theme and English.

Canvas: landscape, no wider than 1600px, flat page background #F7F7F7. Use a crisp product-design-system presentation, not concept art. Use Inter with system fallbacks. Captions use #0A0A0A. No device frame, logo, decoration, watermark, gradient, glow, photo, or shadow except the explicitly tokenized open-menu shadow.

Layout: three clearly separated sections on one sheet.
1. STATE MATRIX: a grid with eight row captions and nine column captions. Row order exactly: "Filled · Brand", "Filled · Secondary", "Filled · Neutral", "Tonal · Brand", "Tonal · Secondary", "Outlined · Brand", "Outlined · Secondary", "Outlined · Neutral". Column order exactly: "Default", "Primary hover", "Trigger hover", "Primary pressed", "Trigger pressed", "Primary focus", "Trigger focus", "Disabled", "Loading". Every cell is one md Split button labeled exactly "Export report". Show all 72 controls; do not omit, merge, or invent rows or columns.
2. SIZES: exactly three filled-brand default examples labeled "sm · 32px", "md · 40px", "lg · 48px".
3. OPEN MENU: one md filled-brand control with the trigger in pressed state, chevron rotated upward, and a two-item menu below aligned to the control's physical right edge (inline end in LTR). Items read exactly "Export as PDF" and "Export as Excel". The menu scales from its top-right corner.

Anatomy and geometry: every control is a single connected compound control with primary action, a visible 2px page-colored divider/gap, and a square chevron trigger. Primary action is on the left; trigger on the right. At md use height 40px, padding-inline 12px, internal gap 6px, icon 20px. Outer corners 8px; the two inner corners beside the divider are 4px. Outlined controls use 1px borders. Focus rings are 2px with a 2px outside offset and #254471, around only the focused half. In the Loading column replace only the primary-action content with a circular spinner in the normal label color; keep the trigger and chevron visible but disabled. Disabled colors apply to both halves. In hover and pressed columns, change only the named half; the other half stays default.

Size geometry: sm = 32px height, 8px inline padding, 4px content gap, 16px icon, 13px/18px action type; md = 40px, 12px, 6px, 20px, 14px/20px; lg = 48px, 16px, 8px, 24px, 16px/24px. Action weight 500 and letter spacing 0px.

Variant colors, exact:
- Filled Brand: backgrounds Default #193351, Hover #132843, Pressed #0D1E33; label/icon/spinner #FFFFFF.
- Filled Secondary: backgrounds #0C5F79, #094E65, #063C4E; label/icon/spinner #FFFFFF.
- Filled Neutral: backgrounds #EDEDED, #DBDBDB, #BDBDBD; label/icon/spinner #0A0A0A.
- Tonal Brand: base #E8ECF2, label #132843, icon #193351; hover overlay #5454541A, pressed overlay #54545433.
- Tonal Secondary: base #E8F4F8, label #094E65, icon #0C5F79; same overlays.
- Outlined Brand: transparent #54545400, 1px border #607D9F, label #132843, icon #193351; same overlays.
- Outlined Secondary: transparent #54545400, 1px border #5DA8C2, label #094E65, icon #0C5F79; same overlays.
- Outlined Neutral: transparent #54545400, 1px border #BDBDBD, label/icon #0A0A0A; same overlays.
- Disabled filled/tonal background #EDEDED; disabled outlined background transparent and border #DBDBDB; all disabled labels/icons #969696.

Menu exact values: 4px below the control; minimum width equals the whole control; background #FFFFFF; radius 10px; shadow 0px 8px 24px 0px rgb(7 19 35 / 12%). Each item is 40px high with 12px inline padding, 6px gap, 14px/22px body text at weight 400 and color #0A0A0A. Any menu icon uses #292929.

Token callouts: beside one representative md control, one size strip, and the menu, add small clean leader labels with the exact px, radius, font, and hex values above next to the part each value styles. Keep the state matrix readable and labels verbatim; add no other text.
```

## Prompt — `split-button-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component specification sheet
Primary request: Draw the Biowave web Split button plan 1.1 as a precise flat UI spec sheet in dark theme and Arabic, fully mirrored RTL.

Canvas: landscape, no wider than 1600px, flat page background #0A0A0A. Use a crisp product-design-system presentation, not concept art. Use IBM Plex Sans Arabic with Noto Sans Arabic and Tahoma fallbacks. Captions use #F7F7F7 and are right-to-left. No device frame, logo, decoration, watermark, gradient, glow, photo, or shadow except the explicitly tokenized open-menu shadow.

Layout: three clearly separated RTL sections on one sheet.
1. STATE MATRIX: a grid with eight row captions and nine column captions. Show the same exact eight variant/color rows as the English sheet and these nine state meanings in Arabic captions: default, primary hover, trigger hover, primary pressed, trigger pressed, primary focus, trigger focus, disabled, loading. Every cell is one md Split button labeled exactly "تصدير التقرير". Show all 72 controls; do not omit, merge, or invent rows or columns.
2. SIZES: exactly three filled-brand default examples labeled sm 32px, md 40px, lg 48px.
3. OPEN MENU: one md filled-brand control with the trigger in pressed state, chevron rotated upward, and a two-item menu below. Items read exactly "تصدير بصيغة PDF" and "تصدير بصيغة Excel". In RTL, align the menu to the control's physical LEFT edge because that is inline end, and scale it from its TOP-LEFT corner.

RTL anatomy and geometry: every control is a single connected compound control with primary action, a visible 2px page-colored divider/gap, and a square chevron trigger. The primary action is on the RIGHT and the chevron trigger is on the LEFT. Mirror logical corner radii: the primary action has 8px outer right corners and 4px inner left corners; the trigger has 4px inner right corners and 8px outer left corners. The downward chevron itself does not mirror. At md use height 40px, padding-inline 12px, internal gap 6px, icon 20px. Outlined controls use 1px borders. Focus rings are 2px with a 2px outside offset and #90A3BC, around only the focused half. In the Loading column replace only the primary-action content with a circular spinner in the normal label color; keep the trigger and chevron visible but disabled. Disabled colors apply to both halves. In hover and pressed columns, change only the named half; the other half stays default.

Size geometry: sm = 32px height, 8px inline padding, 4px content gap, 16px icon, 13px/20px action type; md = 40px, 12px, 6px, 20px, 14px/22px; lg = 48px, 16px, 8px, 24px, 16px/26px. Action weight 500 and letter spacing 0px.

Variant colors, exact:
- Filled Brand: backgrounds Default #607D9F, Hover #90A3BC, Pressed #BEC9D9; label/icon/spinner #0A0A0A.
- Filled Secondary: backgrounds #5DA8C2, #90C3D5, #C0DDE8; label/icon/spinner #0A0A0A.
- Filled Neutral: backgrounds #292929, #404040, #545454; label/icon/spinner #F7F7F7.
- Tonal Brand: base #071323, label/icon #90A3BC; hover overlay #54545466, pressed overlay #54545499.
- Tonal Secondary: base #032A37, label/icon #90C3D5; same overlays.
- Outlined Brand: transparent #54545400, 1px border #254471, label/icon #90A3BC; same overlays.
- Outlined Secondary: transparent #54545400, 1px border #1A7596, label/icon #90C3D5; same overlays.
- Outlined Neutral: transparent #54545400, 1px border #545454, label/icon #F7F7F7; same overlays.
- Disabled filled/tonal background #292929; disabled outlined background transparent and border #404040; all disabled labels/icons #545454.

Menu exact values: 4px below the control; minimum width equals the whole control; background #292929; radius 10px; shadow 0px 8px 24px 0px rgb(0 0 0 / 30%). Each item is 40px high with 12px inline padding, 6px gap, 14px/24px body text at weight 400 and color #F7F7F7. Any menu icon uses #DBDBDB.

Token callouts: beside one representative md RTL control, one size strip, and the menu, add small clean leader labels with the exact px, radius, font, and hex values above next to the part each value styles. Keep the state matrix readable, Arabic correctly joined and right-to-left, and labels verbatim; add no other text.
```

## Image checks

| Image | Result |
|---|---|
| `split-button-light-en.jpg` | ⚠ After two targeted retries: all 8 allowed variant/color rows, all 9 state columns, one loading control per row, English strings, sm/md/lg examples, and menu contents match. The menu panel's right edge remains visually about 8px past the control's right edge, and a static JPEG cannot demonstrate the top-right scale origin. Token callout text is exact; generated pixels and JPEG compression cannot guarantee machine-exact color or dimension values. |
| `split-button-dark-ar.jpg` | ⚠ After one targeted retry: all 8 allowed variant/color rows, all 9 state columns, spinner in the right primary half, disabled chevron trigger on the left, Arabic strings, mirrored radii, sm/md/lg examples, and physical-left menu alignment match. A static JPEG cannot demonstrate the top-left scale origin. Token callout text is exact; generated pixels and JPEG compression cannot guarantee machine-exact color or dimension values. |

## Questions

None. All values needed by the preview resolve from the permitted plan sections, Button token aliases, and the resolved Foundations token file.
