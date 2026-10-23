# Divider tablet preview 1.0

These planning sheets cover every valid visible option combination: horizontal uses `none`, `start`, and `both`; vertical uses `none` and `both` because `start` is invalid. Each orientation is shown at `subtle`, `defaultEmphasis`, and `strong`, in the sole `Default` state. `decorative` is called out as a semantics-only option with no visual difference.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-muted` | `#707070` | `#BDBDBD` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `border-width-default` | `1 px` | `1 px` |
| `spacing-none` | `0 px` | `0 px` |
| `spacing-xl` | `16 px` | `16 px` |
| `target-min` (tablet) | `48 px` | `48 px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `font-size-heading-sm` (tablet) | `18 px` | `18 px` |
| `font-size-body-md` (tablet) | `16 px` | `16 px` |
| `font-size-caption-md` (tablet) | `12 px` | `12 px` |
| `font-weight-heading` (tablet) | `600` | `600` |
| `font-weight-body` (tablet) | `400` | `400` |
| `font-weight-caption` (tablet) | `400` | `400` |
| `font-line-height-en-heading-sm` (tablet) | `26 px` | `26 px` |
| `font-line-height-en-body-md` (tablet) | `24 px` | `24 px` |
| `font-line-height-en-caption-md` (tablet) | `18 px` | `18 px` |
| `font-line-height-ar-heading-sm` (tablet) | `28 px` | `28 px` |
| `font-line-height-ar-body-md` (tablet) | `26 px` | `26 px` |
| `font-line-height-ar-caption-md` (tablet) | `20 px` | `20 px` |

## Prompt — `divider-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat tablet UI component specification sheet
Primary request: Draw the Flutter Material 3 tablet Divider from Biowave plan 1.0 as a precise, clean planning sheet. Cover all 15 valid visible combinations in the single Default state: horizontal × subtle/default/strong × inset none/start/both; vertical × subtle/default/strong × inset none/both. Also state that decorative on/off has no visual difference because it changes semantics only.
Canvas: landscape, no more than 1600 px wide, flat page background #F7F7F7. Use white #FFFFFF flat sample surfaces. No shadows, gradients, glow, photos, device frames, logos, decoration, or rounded cards.
Layout: one state column headed “Default state”. Rows are the option combinations. Put a small caption above the state column and beside every row. Use a large left horizontal-divider grid with nine rows and a smaller right vertical-divider grid with six rows. Keep the sheet spacious and mechanically aligned.
Horizontal context: every row shows the divider between two simple list rows. Use the exact plan strings “Account settings” and “Notifications”. The divider fills the parent width. none = 0 px at both ends; start = exactly 16 px empty space at the left leading edge and 0 px at the right; both = exactly 16 px at both ends. Add no vertical space around the 1 px line.
Vertical context: every row shows the divider between neutral Material toolbar items, each touch target exactly 48 × 48 px. The row bounds its height. none = the 1 px vertical line fills the toolbar height; both = exactly 16 px empty space at top and bottom. Do not show a vertical start variant.
Exact line tokens: subtle is 1 px #EDEDED; default is 1 px #DBDBDB; strong is 1 px #BDBDBD. Place the applicable hex, “1 px”, and “0 px” or “16 px” next to each sample as compact measurement labels.
Typography: all English text uses Inter first, body 16 px / 24 px at weight 400, captions 12 px / 18 px at weight 400, headings 18 px / 26 px at weight 600. Main text #0A0A0A; measurement text #707070.
Text (verbatim): “Tablet Divider · plan 1.0”, “Horizontal · between list rows”, “Vertical · between toolbar items”, “Default state”, “Account settings”, “Notifications”, “subtle”, “default”, “strong”, “none”, “start”, “both”, “decorative on/off: no visual difference · semantics only”.
Constraints: static noninteractive divider only; no hover, focus, pressed, selected, disabled, or animation. Show exactly nine horizontal and six vertical samples, nothing extra. Use square line ends and exact flat colors.
```

Targeted retry: preserve the successful 9 + 6 matrix and all copy; add the exact caption `Touch target 48 × 48 px` above the vertical grid and render each toolbar item's visible target as a 48 × 48 px square.

## Prompt — `divider-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat tablet UI component specification sheet in Arabic
Primary request: Draw the Flutter Material 3 tablet Divider from Biowave plan 1.0 as a precise, clean Arabic planning sheet. Cover all 15 valid visible combinations in the single default state: horizontal × subtle/default/strong × inset none/start/both; vertical × subtle/default/strong × inset none/both. Also state that decorative on/off has no visual difference because it changes semantics only.
Canvas: landscape, no more than 1600 px wide, flat page background #0A0A0A. Use #141414 flat sample surfaces. No shadows, gradients, glow, photos, device frames, logos, decoration, or rounded cards.
Layout and direction: the entire sheet is right-to-left. Mirror the English composition: the large horizontal-divider grid is on the right and the smaller vertical-divider grid is on the left. Use one state column headed “الحالة الافتراضية”. Rows are the option combinations. Put a small Arabic caption above the state column and beside every row. Keep Arabic correctly joined and right-aligned.
Horizontal context: every row shows the divider between two simple right-aligned list rows. Use the exact plan strings “إعدادات الحساب” and “الإشعارات”. The divider fills the parent width. بلا إزاحة = 0 px at both ends; البداية = exactly 16 px empty space at the RIGHT leading edge and 0 px at the left, proving RTL start behavior; الطرفان = exactly 16 px at both ends. Add no vertical space around the 1 px line.
Vertical context: every row shows the divider between neutral Material toolbar items in RTL order, each touch target exactly 48 × 48 px. Add one compact measurement caption that reads exactly “هدف لمس 48 × 48 px”. The row bounds its height. بلا إزاحة = the 1 px vertical line fills the toolbar height; الطرفان = exactly 16 px empty space at top and bottom. Do not show a vertical start variant. Use only non-directional toolbar glyphs so no icon mirroring question is introduced.
Exact line tokens: خفيف is 1 px #292929; افتراضي is 1 px #404040; قوي is 1 px #545454. Place the applicable hex, “1 px”, and “0 px” or “16 px” next to each sample as compact measurement labels.
Typography: all Arabic text uses IBM Plex Sans Arabic first, body 16 px / 26 px at weight 400, captions 12 px / 20 px at weight 400, headings 18 px / 28 px at weight 600. Main text #F7F7F7; measurement text #BDBDBD.
Text (verbatim): “فاصل الجهاز اللوحي · الخطة 1.0”, “أفقي · بين صفوف القائمة”, “عمودي · بين عناصر شريط الأدوات”, “الحالة الافتراضية”, “إعدادات الحساب”, “الإشعارات”, “خفيف”, “افتراضي”, “قوي”, “بلا إزاحة”, “البداية”, “الطرفان”, “تشغيلي/زخرفي: لا فرق بصري · الدلالة فقط”, “هدف لمس 48 × 48 px”.
Constraints: static noninteractive divider only; no hover, focus, pressed, selected, disabled, or animation. Show exactly nine horizontal and six vertical samples, nothing extra. Use square line ends and exact flat colors.
```

Targeted retry: preserve the successful RTL 9 + 6 matrix and all Arabic copy; in only the three horizontal `البداية` rows, make the line touch the left edge and stop at the right leading inset so the RTL start side is visually unambiguous.

## Checks

| Image | Result |
|---|---|
| `divider-light-en.jpg` | ⚠ The 9 horizontal + 6 vertical combinations, English strings, LTR start side, sole state, line-colour labels, inset labels, list/toolbar contexts, and 48 × 48 px callout match after one targeted retry. Remaining limitation: generated JPEG geometry and compressed colours cannot independently guarantee literal 1 px, 16 px, 48 px, or exact-hex raster measurements; the resolved values are explicitly labelled. |
| `divider-dark-ar.jpg` | ⚠ The mirrored 9 horizontal + 6 vertical combinations, joined Arabic strings, right-aligned RTL layout, right-only `start` inset, sole state, line-colour labels, inset labels, list/toolbar contexts, and 48 × 48 px callout match after one targeted retry. Remaining limitation: generated JPEG geometry and compressed colours cannot independently guarantee literal 1 px, 16 px, 48 px, or exact-hex raster measurements; the resolved values are explicitly labelled. |

## Questions

None.
