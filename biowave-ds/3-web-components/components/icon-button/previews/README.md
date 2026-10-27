# Icon button previews

Plan 1.1 sketch for the web Icon button. The component plan is the source of truth; these images are only a human review aid.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-background-transparent-default` | `#54545400` | `#54545400` |
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
| `color-background-error-default` | `#D42222` | `#FF7676` |
| `color-background-error-hovered` | `#A31A1A` | `#FEA3A3` |
| `color-background-error-pressed` | `#721212` | `#FECFCF` |
| `color-background-error-subtle` | `#FEF0EE` | `#721212` |
| `color-background-inverse-default` | `#FFFFFF` | `#0A0A0A` |
| `color-background-inverse-hovered` | `#EDEDED` | `#141414` |
| `color-background-inverse-pressed` | `#DBDBDB` | `#292929` |
| `color-icon-on-brand` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-on-secondary` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-on-error` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-icon-role-error` | `#FF2B2B` | `#FEA3A3` |
| `color-icon-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-disabled` | `#969696` | `#545454` |
| `color-border-brand` | `#607D9F` | `#254471` |
| `color-border-secondary` | `#5DA8C2` | `#1A7596` |
| `color-border-error` | `#FF7676` | `#FF3B3B` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `color-border-disabled` | `#DBDBDB` | `#404040` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-border-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-overlay-hovered` | `#5454541A` | `#54545466` |
| `color-overlay-pressed` | `#54545433` | `#54545499` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-disabled` | `#969696` | `#545454` |
| `color-text-inverse` | `#FFFFFF` | `#0A0A0A` |
| `size-control-height-sm` | `32px` | `32px` |
| `size-control-height-md` | `40px` | `40px` |
| `size-control-height-lg` | `48px` | `48px` |
| `size-icon-sm` | `16px` | `16px` |
| `size-icon-md` | `20px` | `20px` |
| `size-icon-lg` | `24px` | `24px` |
| `radius-sm` | `6px` | `6px` |
| `radius-md` | `8px` | `8px` |
| `border-width-default` | `1px` | `1px` |
| `border-width-focus` | `2px` | `2px` |
| `border-focus-offset` | `2px` | `2px` |
| `spacing-xs` | `4px` | `4px` |
| `spacing-md` | `8px` | `8px` |
| `label-sm` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`; `12px / 16px`; weight `500`; letter spacing `0` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif`; `12px / 18px`; weight `500`; letter spacing `0` |

## Prompt — `icon-button-light-en.jpg`

Use case: `ui-mockup`. Asset type: a precise web design-system component spec sheet, not a product screen.

Canvas: a flat 1536px-wide UI spec sheet on `#F7F7F7` (`color-surface-page`), never wider than 1600px. No shadows, gradients, glow, photos, device frames, logos, decoration, perspective, or watermark. Use crisp orthographic vector-like geometry.

Typography: use Inter with fallbacks system-ui, -apple-system, Segoe UI, Roboto, sans-serif. Every caption and annotation uses label-sm: 12px font, 16px line-height, weight 500, letter spacing 0, colored `#0A0A0A`. All visible words must be spelled exactly.

Layout: place a compact title `Icon button · Web · Light · EN`. Use a left-to-right matrix whose rows are the allowed md variant/color pairs and whose columns are exactly `Default`, `Hover`, `Pressed`, `Focus`, `Disabled`, `Loading`. Rows, in this order: `Filled / Brand`, `Filled / Secondary`, `Filled / Neutral`, `Filled / Error`, `Filled / Inverse`, `Tonal / Brand`, `Tonal / Secondary`, `Tonal / Error`, `Outlined / Brand`, `Outlined / Secondary`, `Outlined / Neutral`, `Outlined / Error`, `Outlined / Inverse`, `Text / Brand`, `Text / Secondary`, `Text / Neutral`, `Text / Error`, `Text / Inverse`. Do not show Tonal / Neutral or Tonal / Inverse. Put each inverse row on a local `#141414` inverse-surface strip. Every md container is exactly 40px square with 8px radius and a centered 20px icon. Outlined borders are 1px. Focus is the default visual plus a 2px ring, 2px outside: `#254471` normally and `#FFFFFF` for inverse.

State styling, exact light values: filled Brand backgrounds `#193351 / #132843 / #0D1E33`, icon `#FFFFFF`; filled Secondary `#0C5F79 / #094E65 / #063C4E`, icon `#FFFFFF`; filled Neutral `#EDEDED / #DBDBDB / #BDBDBD`, icon `#0A0A0A`; filled Error `#D42222 / #A31A1A / #721212`, icon `#FFFFFF`; filled Inverse `#FFFFFF / #EDEDED / #DBDBDB`, icon `#193351`. Filled controls use solid state colors, not overlays. Tonal backgrounds: Brand `#E8ECF2` with icon `#193351`, Secondary `#E8F4F8` with icon `#0C5F79`, Error `#FEF0EE` with icon `#FF2B2B`; add a flat `#5454541A` hover state layer or `#54545433` pressed state layer. Outlined and Text use transparent `#54545400` backgrounds with the same flat hover/pressed layers. Outlined border/icon pairs: Brand `#607D9F / #193351`, Secondary `#5DA8C2 / #0C5F79`, Neutral `#BDBDBD / #0A0A0A`, Error `#FF7676 / #FF2B2B`, Inverse `#FFFFFF / #FFFFFF`. Text icons: Brand `#193351`, Secondary `#0C5F79`, Neutral `#0A0A0A`, Error `#FF2B2B`, Inverse `#FFFFFF`. Every Filled and Tonal disabled container is `#EDEDED` with icon `#969696`; every Outlined disabled control stays transparent with border `#DBDBDB` and icon `#969696`; every Text disabled control stays transparent with icon `#969696`. Loading replaces the icon with a 20px circular spinner in that row's normal icon color and never changes the 40px container.

Icon assignment: distribute the exact glyphs `arrow_forward`, `chevron_right`, `undo`, `close`, `edit`, `delete`, `more_vert`, and `search` across the matrix. In this English LTR sheet, render each in its normal LTR orientation. Icons are simple Material-rounded-style glyphs, with no text labels inside controls.

Below the matrix, add three small review strips. `Sizes`: sm is 32px square / 16px search icon, md is 40px / 20px, lg is 48px / 24px; all use 8px radius. `Toggle`: show Text Brand, Text Neutral, Outlined Brand, and Outlined Neutral, each as `Unselected` versus `Selected`; Selected uses a filled notifications glyph and background Brand `#E8ECF2` with icon `#193351` or Neutral `#EDEDED` with icon `#0A0A0A`; selected outlined borders are Brand `#607D9F` or Neutral `#BDBDBD`. `Tooltip`: show one tooltip above an Edit icon button, offset by exactly 4px, with the exact text `Edit device`; fill `#141414`, text `#FFFFFF`, 6px radius, 4px block padding, 8px inline padding, Inter 12px/16px weight 500.

Add a compact adjacent callout key that explicitly writes: `container 40px · icon 20px · radius 8px · outline 1px · focus 2px + 2px offset · tooltip 4px offset / 4px × 8px padding / 6px radius`. Keep the sheet dense but readable and include nothing beyond this plan.

## Prompt — `icon-button-dark-ar.jpg`

Use case: `ui-mockup`. Asset type: a precise web design-system component spec sheet, not a product screen.

Canvas: a flat 1536px-wide UI spec sheet on `#0A0A0A` (`color-surface-page`), never wider than 1600px. No shadows, gradients, glow, photos, device frames, logos, decoration, perspective, or watermark. Use crisp orthographic vector-like geometry.

Typography and direction: the entire sheet is right-to-left. Use IBM Plex Sans Arabic with fallbacks Noto Sans Arabic, Tahoma, sans-serif. Every caption and annotation uses label-sm: 12px font, 18px line-height, weight 500, letter spacing 0, colored `#F7F7F7`. All Arabic must be joined, correctly ordered, and spelled exactly.

Layout: place the title `زر الأيقونة · الويب · داكن · العربية`. Use a right-to-left matrix whose visually rightmost row-caption area names the allowed md variant/color pairs and whose state columns run right-to-left in exactly this order: `افتراضي`, `تحويم`, `ضغط`, `تركيز`, `معطّل`, `تحميل`. Row captions, in this order: `ممتلئ / العلامة`, `ممتلئ / ثانوي`, `ممتلئ / محايد`, `ممتلئ / خطأ`, `ممتلئ / معكوس`, `نغمي / العلامة`, `نغمي / ثانوي`, `نغمي / خطأ`, `محدّد / العلامة`, `محدّد / ثانوي`, `محدّد / محايد`, `محدّد / خطأ`, `محدّد / معكوس`, `نصي / العلامة`, `نصي / ثانوي`, `نصي / محايد`, `نصي / خطأ`, `نصي / معكوس`. Do not show tonal-neutral or tonal-inverse combinations. Put each inverse row on a local `#FFFFFF` inverse-surface strip. Every md container is exactly 40px square with 8px radius and a centered 20px icon. Outlined borders are 1px. Focus is the default visual plus a 2px ring, 2px outside: `#90A3BC` normally and `#0A0A0A` for inverse.

State styling, exact dark values: filled Brand backgrounds `#607D9F / #90A3BC / #BEC9D9`, icon `#0A0A0A`; filled Secondary `#5DA8C2 / #90C3D5 / #C0DDE8`, icon `#0A0A0A`; filled Neutral `#292929 / #404040 / #545454`, icon `#F7F7F7`; filled Error `#FF7676 / #FEA3A3 / #FECFCF`, icon `#0A0A0A`; filled Inverse `#0A0A0A / #141414 / #292929`, icon `#90A3BC`. Filled controls use solid state colors, not overlays. Tonal backgrounds: Brand `#071323` with icon `#90A3BC`, Secondary `#032A37` with icon `#90C3D5`, Error `#721212` with icon `#FEA3A3`; add a flat `#54545466` hover state layer or `#54545499` pressed state layer. Outlined and Text use transparent `#54545400` backgrounds with the same flat hover/pressed layers. Outlined border/icon pairs: Brand `#254471 / #90A3BC`, Secondary `#1A7596 / #90C3D5`, Neutral `#545454 / #F7F7F7`, Error `#FF3B3B / #FEA3A3`, Inverse `#0A0A0A / #0A0A0A`. Text icons: Brand `#90A3BC`, Secondary `#90C3D5`, Neutral `#F7F7F7`, Error `#FEA3A3`, Inverse `#0A0A0A`. Every Filled and Tonal disabled container is `#292929` with icon `#545454`; every Outlined disabled control stays transparent with border `#404040` and icon `#545454`; every Text disabled control stays transparent with icon `#545454`. Loading replaces the icon with a 20px circular spinner in that row's normal icon color and never changes the 40px container.

Icon direction: distribute the exact glyphs `arrow_forward`, `chevron_right`, `undo`, `close`, `edit`, `delete`, `more_vert`, and `search` across the matrix. Mirror the directional `arrow_forward`, `chevron_right`, and `undo` glyphs for RTL. Do not mirror `close`, `edit`, `delete`, `more_vert`, or `search`. Icons are simple Material-rounded-style glyphs, with no text labels inside controls.

Below the matrix, add three small review strips, arranged right-to-left. `الأحجام`: sm is 32px square / 16px search icon, md is 40px / 20px, lg is 48px / 24px; all use 8px radius. `التبديل`: show Text Brand, Text Neutral, Outlined Brand, and Outlined Neutral, each as `غير محدد` versus `محدد`; Selected uses a filled notifications glyph and background Brand `#071323` with icon `#90A3BC` or Neutral `#292929` with icon `#F7F7F7`; selected outlined borders are Brand `#254471` or Neutral `#545454`. `تلميح`: show one tooltip above an Edit icon button, offset by exactly 4px, with the exact Arabic text `تعديل الجهاز`; fill `#FFFFFF`, text `#0A0A0A`, 6px radius, 4px block padding, 8px inline padding, IBM Plex Sans Arabic 12px/18px weight 500.

Add a compact right-to-left callout key that explicitly writes: `الحاوية 40px · الأيقونة 20px · نصف القطر 8px · الحد 1px · التركيز 2px + إزاحة 2px · التلميح إزاحة 4px / حشو 4px × 8px / نصف قطر 6px`. Keep the sheet dense but readable and include nothing beyond this plan.

## Checks

| Image | Result |
|---|---|
| `icon-button-light-en.jpg` | ✓ matches: 18 allowed variant/color rows, six states, sm/md/lg sizing, toggle comparisons, tooltip, inverse surfaces, and LTR icon direction are present with the resolved values annotated. |
| `icon-button-dark-ar.jpg` | ⚠ structure, Arabic tooltip text, RTL column order, state coverage, sizing, toggles, inverse surfaces, and non-directional icons match. After two retries, the directional glyph in the `Text / Error` row still points right instead of mirroring left; no further retry was made because the preview role caps retries at two per image. |
