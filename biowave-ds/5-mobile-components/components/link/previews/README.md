# Link mobile previews

Plan 1.0 preview sheet for the Flutter Material 3 mobile Link. The plan defines no component tokens; every rendered value below is a resolved shared semantic token. `Visited` is intentionally not rendered because `show-visited` and the visited state are web-only in A4/A5.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---|---|
| `color-background-neutral-subtle` | `#F7F7F7` | `#141414` |
| `color-background-brand-default` | `#193351` | `#607D9F` |
| `color-link-default` | `#2559D4` | `#6D9CE8` |
| `color-link-hover` | `#1D48AD` | `#9CBCF2` |
| `color-link-pressed` | `#153786` | `#CBDCFA` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-disabled` | `#969696` | `#545454` |
| `color-text-neutral-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-border-inverse` | `#FFFFFF` | `#0A0A0A` |
| `border-width-default` | `1px` | `1px` |
| `border-width-strong` | `2px` | `2px` |
| `border-width-focus` | `2px` | `2px` |
| `border-focus-offset` | `2px` | `2px` |
| `radius-xs` | `4px` | `4px` |
| `spacing-xs` | `4px` | `4px` |
| `size-icon-sm` | `16px` | `16px` |
| `size-icon-md` | `20px` | `20px` |
| `target-min` | `48px` | `48px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `body-md` | `16px / 24px`, weight `400`, letter spacing `0` | `16px / 26px`, weight `400`, letter spacing `0` |
| `action-sm` | `14px / 20px`, weight `500`, letter spacing `0` | `14px / 22px`, weight `500`, letter spacing `0` |
| `action-md` | `16px / 24px`, weight `500`, letter spacing `0` | `16px / 26px`, weight `500`, letter spacing `0` |
| `action-lg` | `18px / 28px`, weight `500`, letter spacing `0` | `18px / 30px`, weight `500`, letter spacing `0` |

## Prompt — `link-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat UI component specification sheet for a Flutter Material 3 mobile design system
Primary request: Draw the Link component from plan 1.0 as a precise, readable light-theme English specification sheet. This is a component inventory, not a phone screen.

Canvas: flat solid #F7F7F7 `color-background-neutral-subtle` page background, landscape, at most 1600px wide. No device frame. Use crisp vector-like UI rendering and ample whitespace.

Layout: a grid. Put the five state captions across the top, verbatim: "Default", "Hover", "Pressed", "Focus", "Disabled". Put these option captions above the rows: "Inline · inherit · brand · always", "Standalone · sm · brand · always", "Standalone · md · brand · hover underline", "Standalone · md · leading mail · brand · always", "Standalone · md · external · brand · always", "Standalone · lg · neutral · always", "Standalone · md · inverse · always". Render every row in every state column. Also show a compact anatomy/detail strip for label, leading icon, underline, open_in_new external icon, and focus ring. No visited column: visited is web-only.

Exact component strings: use "Privacy policy" inside the inline sentence "Read the Privacy policy before you continue."; use "Reset password" for sm; "View all requests" for the hover-underline row; "Contact support" with a leading mail icon; "View attendance" with the open_in_new external icon; and "Contact support" for neutral and inverse rows. Spell all UI copy exactly and add no alternative labels.

Typography: English family Inter with fallbacks system-ui, -apple-system, Segoe UI, Roboto, sans-serif. Inline sentence is body-md 16px/24px, weight 400, letter spacing 0. Standalone sm is action-sm 14px/20px, weight 500. Standalone md is action-md 16px/24px, weight 500. Standalone lg is action-lg 18px/28px, weight 500. Letter spacing is 0 throughout.

Dimensions and callouts: every standalone link has an invisible minimum hit area of 48px by 48px; show this as a clean measurement callout, not a visible button background. Gap between icon and label is 4px. Icon size is 16px for sm and 20px for md/lg. The underline is under the label only, never under either icon. Focus ring surrounds the whole visible link, including icons, with 2px width, 2px offset, and 4px radius, and takes no layout space. Add concise value callouts next to the relevant parts: "48px min target", "4px gap", "16px icon", "20px icon", "1px underline", "2px strong underline", "2px focus / 2px offset / 4px radius".

Colors and state logic: brand Default and Focus use #2559D4; brand Hover uses #1D48AD; brand Pressed uses #153786; Disabled uses #969696. Neutral uses #0A0A0A in Default, Hover, Pressed and Focus, then #969696 Disabled. The inverse row sits on a flat #193351 `color-background-brand-default` strip and uses #FFFFFF in Default, Hover, Pressed and Focus, then #969696 Disabled. Regular focus ring is #254471; inverse focus ring is #FFFFFF. Put the exact hex callout next to each color usage.

Underline logic: for every "always" row use a 1px underline in Default and Focus, a 2px underline in Hover and Pressed, and no underline in Disabled. For the "hover underline" row use no underline in Default, a 1px underline in Hover, Pressed and Focus, and no underline in Disabled. Disabled links have no focus ring.

Icon logic: mail is a leading meaning-bearing icon. open_in_new is after the English label and is the only external icon. Both icons use the same state color as the label. Internal links have no external icon. Rows without a leading icon must stay without one.

Exact values legend: include a small readable legend using #0A0A0A text on the page: page #F7F7F7; inverse surface #193351; link default #2559D4; hover #1D48AD; pressed #153786; neutral #0A0A0A; disabled #969696; inverse #FFFFFF; focus #254471; inverse focus #FFFFFF; underline 1px/2px; focus 2px + 2px offset + 4px radius; gap 4px; icons 16px/20px; target 48px; fonts 14/20, 16/24 and 18/28px.

Never draw: shadows, gradients, glow, photos, device frames, logos, cards, filled button backgrounds, ink splashes, state overlays, decorative icons, truncation, or watermarks. Use only flat token colors. Keep all labels and numeric annotations large enough to read.
```

Targeted retry: remove every underline from the Disabled column while preserving all other content.

## Prompt — `link-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat UI component specification sheet for a Flutter Material 3 mobile design system
Primary request: Draw the Link component from plan 1.0 as a precise, readable dark-theme Arabic specification sheet. This is a component inventory, not a phone screen.

Canvas: flat solid #141414 `color-background-neutral-subtle` page background, landscape, at most 1600px wide. No device frame. Use crisp vector-like UI rendering and ample whitespace. The whole layout and all Arabic text run right-to-left.

Layout: a mirrored RTL grid. Put the five Arabic state captions across the top in RTL order, verbatim: "الافتراضي", "تحويم", "مضغوط", "تركيز", "معطّل". Put these option captions above the rows: "مضمّن · موروث · علامة تجارية · دائم", "مستقل · صغير · علامة تجارية · دائم", "مستقل · متوسط · علامة تجارية · تسطير عند التفاعل", "مستقل · متوسط · أيقونة بريد بادئة · علامة تجارية · دائم", "مستقل · متوسط · خارجي · علامة تجارية · دائم", "مستقل · كبير · محايد · دائم", "مستقل · متوسط · معكوس · دائم". Render every row in every state column. Also show a compact mirrored anatomy/detail strip for label, leading icon, underline, open_in_new external icon, and focus ring. No visited column: visited is web-only.

Exact component strings: use "سياسة الخصوصية" inside the inline sentence "اقرأ سياسة الخصوصية قبل المتابعة."; use "إعادة تعيين كلمة المرور" for sm; "عرض كل الطلبات" for the hover-underline row; "التواصل مع الدعم" with a leading mail icon; "عرض الحضور" with the open_in_new external icon; and "التواصل مع الدعم" for neutral and inverse rows. Spell all Arabic UI copy exactly and add no alternative labels.

Typography: Arabic family IBM Plex Sans Arabic with fallbacks Noto Sans Arabic, Tahoma, sans-serif. Inline sentence is body-md 16px/26px, weight 400, letter spacing 0. Standalone sm is action-sm 14px/22px, weight 500. Standalone md is action-md 16px/26px, weight 500. Standalone lg is action-lg 18px/30px, weight 500. Letter spacing is 0 throughout.

Dimensions and callouts: every standalone link has an invisible minimum hit area of 48px by 48px; show this as a clean measurement callout, not a visible button background. Gap between icon and label is 4px. Icon size is 16px for sm and 20px for md/lg. The underline is under the label only, never under either icon. Focus ring surrounds the whole visible link, including icons, with 2px width, 2px offset, and 4px radius, and takes no layout space. Add concise Arabic value callouts next to the relevant parts, keeping numerals and units legible: "هدف 48px", "فجوة 4px", "أيقونة 16px", "أيقونة 20px", "تسطير 1px", "تسطير قوي 2px", "تركيز 2px / إزاحة 2px / نصف قطر 4px".

Colors and state logic: brand Default and Focus use #6D9CE8; brand Hover uses #9CBCF2; brand Pressed uses #CBDCFA; Disabled uses #545454. Neutral uses #F7F7F7 in Default, Hover, Pressed and Focus, then #545454 Disabled. The inverse row sits on a flat #607D9F `color-background-brand-default` strip and uses #0A0A0A in Default, Hover, Pressed and Focus, then #545454 Disabled. Regular focus ring is #90A3BC; inverse focus ring is #0A0A0A. Put the exact hex callout next to each color usage.

Underline logic: for every "دائم" row use a 1px underline in Default and Focus, a 2px underline in Hover and Pressed, and no underline in Disabled. For the interaction-only underline row use no underline in Default, a 1px underline in Hover, Pressed and Focus, and no underline in Disabled. Disabled links have no focus ring.

RTL icon logic: the Row mirrors automatically. The mail leading icon appears before the Arabic label, visually on its right, and does not flip. The open_in_new external icon appears after the Arabic label, visually on its left, and its directional glyph is flipped horizontally exactly once. Both icons use the same state color as the label. Internal links have no external icon. Rows without a leading icon must stay without one.

Exact values legend: include a small readable RTL legend using #F7F7F7 text on the page: page #141414; inverse surface #607D9F; link default #6D9CE8; hover #9CBCF2; pressed #CBDCFA; neutral #F7F7F7; disabled #545454; inverse #0A0A0A; focus #90A3BC; inverse focus #0A0A0A; underline 1px/2px; focus 2px + 2px offset + 4px radius; gap 4px; icons 16px/20px; target 48px; fonts 14/22, 16/26 and 18/30px.

Never draw: shadows, gradients, glow, photos, device frames, logos, cards, filled button backgrounds, ink splashes, state overlays, decorative icons, truncation, or watermarks. Use only flat token colors. Keep all Arabic labels and numeric annotations large enough to read.
```

Targeted retry 1: remove every underline from the RTL Disabled column while preserving all other content.

Targeted retry 2: correct only the last two RTL legend lines to `فجوة 4px · أيقونات 16px / 20px · هدف 48px` and `خطوط 14/22 · 16/26 · 18/30px`.

## Checks

- `link-light-en.jpg`: ✓ matches — 1600 × 1066 JPEG; all seven planned option rows, five mobile states, sizes, icon options, external treatment, 48px targets, exact English copy, and resolved light-token callouts are present. Disabled links have no underline or focus ring.
- `link-dark-ar.jpg`: ⚠ all planned rows, states, Arabic copy, RTL order, mirrored `open_in_new`, non-mirrored mail icon, 48px target, colors and underline behavior match. After the maximum two retries, the final legend still renders the `action-lg` metric as `14/30px` instead of `18/30px`; the correct resolved value remains in the token sheet and prompt above.

## Questions

None. All rendered token values resolved.
