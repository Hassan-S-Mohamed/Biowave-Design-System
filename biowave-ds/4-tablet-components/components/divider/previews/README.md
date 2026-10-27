# Divider tablet preview 1.1

These planning sheets cover every valid visible option combination in the sole `Default` state: horizontal uses `none`, `start`, and `both`; vertical uses `none` and `both` because `start` is invalid. The plan 1.1 label is shown once with the short connector and once in a constrained parent so the long connector wraps. `decorative` remains a semantics-only option with no visual difference.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-subtlest` | `#707070` | `#BDBDBD` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-strong` | `#BDBDBD` | `#545454` |
| `border-width-default` | `1 px` | `1 px` |
| `spacing-none` | `0 px` | `0 px` |
| `spacing-md` | `8 px` | `8 px` |
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
| `font-letter-spacing-en-default` (tablet) | `0 px` | `0 px` |
| `font-letter-spacing-ar-default` (tablet) | `0 px` | `0 px` |

## Prompt — `divider-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat tablet UI component specification sheet
Input images: Image 1 is the plan 1.0 English preview and edit target. Preserve its accurate 9-horizontal + 6-vertical matrix while updating it to plan 1.1.
Primary request: Draw the Flutter Material 3 tablet Divider from Biowave plan 1.1 as a precise, clean planning sheet. Preserve all 15 valid visible combinations in the single Default state: horizontal × subtle/default/strong × inset none/start/both; vertical × subtle/default/strong × inset none/both. Add plan 1.1 labelled horizontal dividers: one with “or” centred and one with “or continue with” centred and visibly wrapped onto two lines in a constrained parent. State that decorative on/off has no visual difference because it changes semantics only.
Canvas: landscape, no more than 1600 px wide, flat page background #F7F7F7. Use white #FFFFFF flat sample surfaces. No shadows, gradients, glow, photos, device frames, logos, decoration, or rounded cards.
Layout: one state column headed “Default state”. Rows are the option combinations, with a small caption above the state column and beside every row. Use a large left horizontal-divider grid with nine samples, a smaller right vertical-divider grid with six samples, and a clearly separated bottom band titled “Label · horizontal only” with two labelled samples. Reflow or scale the existing matrix uniformly to make room; do not remove, duplicate, or relabel any sample.
Horizontal context: every matrix sample shows the divider between two simple list rows with exact plan strings “Account settings” and “Notifications”. none = 0 px both ends; start = exactly 16 px empty space at the LEFT leading edge and 0 px at the right; both = exactly 16 px both ends. Add no vertical space around the 1 px line.
Vertical context: every sample shows the divider between neutral Material toolbar items, each visible touch target exactly 48 × 48 px. none = the 1 px vertical line fills the toolbar height; both = exactly 16 px empty space at top and bottom. Do not show a vertical start variant. Use non-directional glyphs only.
Label context: horizontal and inset none. Draw two equal line segments around the label. Each label has exactly 8 px horizontal gap to each segment; each segment remains at least 16 px long. Short label “or” stays on one line. Long label “or continue with” wraps onto two centred lines and is never truncated or ellipsized. Label typography is Inter 12 px / 18 px, weight 400, letter spacing 0 px, color #707070. Both labelled line segments use default emphasis: 1 px #DBDBDB. Add compact measurement text “8 px gap each side · segments ≥ 16 px”.
Exact line tokens: subtle is 1 px #EDEDED; default is 1 px #DBDBDB; strong is 1 px #BDBDBD. Place the applicable hex, “1 px”, and “0 px” or “16 px” next to each matrix sample.
Typography: English uses Inter first. Body 16 px / 24 px weight 400; captions 12 px / 18 px weight 400; headings 18 px / 26 px weight 600; letter spacing 0 px. Main text #0A0A0A; measurement and label text #707070.
Text (verbatim): “Tablet Divider · plan 1.1”, “Horizontal · between list rows”, “Vertical · between toolbar items”, “Label · horizontal only”, “Default state”, “Account settings”, “Notifications”, “or”, “or continue with”, “subtle”, “default”, “strong”, “none”, “start”, “both”, “decorative on/off: no visual difference · semantics only”, “Touch target 48 × 48 px”, “8 px gap each side · segments ≥ 16 px”.
Constraints: static noninteractive divider only; no hover, focus, pressed, selected, disabled, or animation. Show exactly nine horizontal matrix samples, six vertical matrix samples, and two labelled samples, nothing extra. Use square line ends and exact flat colors. Render every quoted string verbatim with no misspelling.
```

Targeted retries: preserve the complete sheet and replace only the short-label measurement phrase with `8 px gap each side · segments ≥ 16 px`; the second retry re-rendered that entire measurement line and spelled `side` explicitly.

## Prompt — `divider-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat tablet UI component specification sheet in Arabic
Input images: Image 1 is the plan 1.0 Arabic preview and edit target. Preserve its accurate mirrored 9-horizontal + 6-vertical matrix while updating it to plan 1.1.
Primary request: Draw the Flutter Material 3 tablet Divider from Biowave plan 1.1 as a precise, clean Arabic planning sheet. Preserve all 15 valid visible combinations in the single default state: horizontal × subtle/default/strong × inset none/start/both; vertical × subtle/default/strong × inset none/both. Add plan 1.1 labelled horizontal dividers: one with “أو” centred and one with “أو تابع باستخدام” centred and visibly wrapped onto two lines in a constrained parent. State that decorative on/off has no visual difference because it changes semantics only.
Canvas: landscape, no more than 1600 px wide, flat page background #0A0A0A. Use #141414 flat sample surfaces. No shadows, gradients, glow, photos, device frames, logos, decoration, or rounded cards.
Layout and direction: the entire sheet is right-to-left. Keep the large horizontal-divider grid on the right and the smaller vertical-divider grid on the left, then add a clearly separated bottom band titled “تسمية وسطية · أفقي فقط” with two labelled samples. Use one state column headed “الحالة الافتراضية”. Put a small Arabic caption above the state column and beside every row. Reflow or scale the existing matrix uniformly to make room; do not remove, duplicate, or relabel any sample. Arabic is correctly joined and right-aligned except centred labels.
Horizontal context: every matrix sample shows the divider between two simple right-aligned list rows with exact plan strings “إعدادات الحساب” and “الإشعارات”. “بلا إزاحة” = 0 px both ends; “البداية” = exactly 16 px empty space at the RIGHT leading edge and 0 px at the left, proving RTL start behavior; “الطرفان” = exactly 16 px both ends. Add no vertical space around the 1 px line.
Vertical context: every sample shows the divider between neutral Material toolbar items in RTL order, each visible touch target exactly 48 × 48 px. none = the 1 px vertical line fills the toolbar height; both = exactly 16 px empty space at top and bottom. Do not show a vertical start variant. Use non-directional glyphs only.
Label context: horizontal and inset none. Draw two equal line segments around the label. Each label has exactly 8 px horizontal gap to each segment; each segment remains at least 16 px long. Short label “أو” stays on one line. Long label “أو تابع باستخدام” wraps onto two centred lines and is never truncated or ellipsized. Label typography is IBM Plex Sans Arabic 12 px / 20 px, weight 400, letter spacing 0 px, color #BDBDBD. Both labelled line segments use default emphasis: 1 px #404040. Add compact measurement text “8 px لكل جانب · القطعة ≥ 16 px”.
Exact line tokens: “خفيف” is 1 px #292929; “افتراضي” is 1 px #404040; “قوي” is 1 px #545454. Place the applicable hex, “1 px”, and “0 px” or “16 px” next to each matrix sample.
Typography: Arabic uses IBM Plex Sans Arabic first. Body 16 px / 26 px weight 400; captions 12 px / 20 px weight 400; headings 18 px / 28 px weight 600; letter spacing 0 px. Main text #F7F7F7; measurement and label text #BDBDBD.
Text (verbatim): “فاصل الجهاز اللوحي · الخطة 1.1”, “أفقي · بين صفوف القائمة”, “عمودي · بين عناصر شريط الأدوات”, “تسمية وسطية · أفقي فقط”, “الحالة الافتراضية”, “إعدادات الحساب”, “الإشعارات”, “أو”, “أو تابع باستخدام”, “خفيف”, “افتراضي”, “قوي”, “بلا إزاحة”, “البداية”, “الطرفان”, “تشغيلي/زخرفي: لا فرق بصري · الدلالة فقط”, “هدف لمس 48 × 48 px”, “8 px لكل جانب · القطعة ≥ 16 px”.
Constraints: static noninteractive divider only; no hover, focus, pressed, selected, disabled, or animation. Show exactly nine horizontal matrix samples, six vertical matrix samples, and two labelled samples, nothing extra. Use square line ends and exact flat colors. Render every quoted Arabic string verbatim with correct joining and no misspelling.
```

Targeted retry: preserve the complete sheet and change only the three horizontal `البداية` lines so each touches the left trailing edge and leaves its `16 px` inset only on the right leading edge.

## Checks

| Image | Result |
|---|---|
| `divider-light-en.jpg` | ⚠ The 9 horizontal + 6 vertical combinations, sole Default state, English strings, LTR start side, list/toolbar contexts, `48 × 48 px` touch-target callout, short `or`, and wrapped `or continue with` match after two targeted retries. The final JPEG is `1600 × 1066` at quality 85. Generated raster geometry and JPEG compression cannot independently guarantee literal `1 px`, `8 px`, `16 px`, `48 px`, or exact-hex samples; the resolved values are labelled and recorded in the token sheet. |
| `divider-dark-ar.jpg` | ⚠ The mirrored 9 horizontal + 6 vertical combinations, joined Arabic strings, right-aligned RTL layout, right-only `start` inset, sole state, list/toolbar contexts, short `أو`, and wrapped `أو تابع باستخدام` match after one targeted retry. The final JPEG is `1600 × 1066` at quality 85. The compact Arabic `8 px` / `16 px` label measurement is not fully legible at this raster scale, and generated geometry/JPEG compression cannot independently guarantee literal dimensions or exact-hex samples; the exact values remain in the token sheet. |

## Questions

None.
