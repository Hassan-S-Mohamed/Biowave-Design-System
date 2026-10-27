# Link web previews — plan 1.0

These flat planning sheets sketch the Link options and states before implementation. `link.md` remains the source of truth. There is no `link.tokens.json`; every value below resolves from the shared foundation tokens.

## Token sheet

| Token / resolved rule | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-link-default` | `#2559D4` | `#6D9CE8` |
| `color-link-hovered` | `#1D48AD` | `#9CBCF2` |
| `color-link-pressed` | `#153786` | `#CBDCFA` |
| `color-link-visited` | `#1D48AD` | `#9CBCF2` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-disabled` | `#969696` | `#545454` |
| `color-text-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-border-inverse` | `#FFFFFF` | `#0A0A0A` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `action-sm` | `13px / 18px EN · 13px / 20px AR · 500 · 0px letter spacing` | same |
| `action-md` | `14px / 20px EN · 14px / 22px AR · 500 · 0px letter spacing` | same |
| `action-lg` | `16px / 24px EN · 16px / 26px AR · 500 · 0px letter spacing` | same |
| inline `inherit` | `font: inherit`; no Link-owned font size or line height | same |
| inline icon size | `1em` of the inherited parent font | same |
| `size-icon-sm` | `16px` | same |
| `size-icon-md` | `20px` | same |
| `spacing-xs` (part gap) | `4px` | same |
| `spacing-xxs` (underline offset) | `2px` | same |
| `target-min` (standalone min block size) | `24px` | same |
| `border-width-default` | `1px` | same |
| `border-width-strong` | `2px` | same |
| `border-width-focus` | `2px` | same |
| `border-focus-offset` | `2px` | same |
| `radius-xs` | `4px` | same |

## Prompt — `link-light-en.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component planning sheet
Primary request: Draw a precise Link component specification sheet for plan 1.0 in light theme and English. This is a flat product-UI diagram, not a marketing image.
Canvas: landscape 3:2 flat UI spec sheet, no more than 1600 px wide, solid page background #F7F7F7. Use the English font stack Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif. Crisp vector-like edges and generous, regular spacing.
Layout: Use a four-row by six-column grid. Put small captions above every row and every column. Column captions, verbatim: "Default", "Hover", "Pressed", "Focus", "Visited", "Disabled". Row captions, verbatim: "brand · inherit · always · internal · no leading icon", "brand · sm · hover · internal · no leading icon", "neutral · md · always · internal · leading mail", and "inverse · lg · always · external · leading description". Show only these planned options and the six planned states. For neutral and inverse Visited cells, print only a small em dash with "not available" because visited is brand-only.
Row 1 content: the exact sentence "Read the Privacy policy before you continue." The link label is exactly "Privacy policy" and only those words are styled as the link. It is inline, `font: inherit`, and has no independent Link font size or line height. Underline the link label only, never the rest of the sentence.
Row 2 content: exact standalone label "Reset password". Use action-sm: 13px font, 18px line height, weight 500, letter spacing 0px. No icons.
Row 3 content: exact standalone label "Contact support" with a Material Symbols Rounded `mail` leading icon at inline start. Use action-md: 14px font, 20px line height, weight 500, letter spacing 0px. Icon is 16px.
Row 4 content: exact standalone label "View attendance" with a Material Symbols Rounded `description` leading icon at inline start and a Material Symbols Rounded `open_in_new` external icon at inline end. Use action-lg: 16px font, 24px line height, weight 500, letter spacing 0px. Both icons are 20px. Put every row-4 link on a compact inverse-surface swatch #141414 so its inverse text remains readable.
Exact colors: brand Default #2559D4; brand Hover #1D48AD; brand Pressed #153786; brand Visited #1D48AD; neutral Default/Hover/Pressed/Visited #0A0A0A; inverse Default/Hover/Pressed #FFFFFF; Disabled #969696 for every color. Icons and underlines use currentColor. Focus keeps the color appropriate to its resting variant.
Exact underline states: for `always`, Default, Focus, and Visited use 1px; Hover and Pressed use 2px; Disabled has no underline. For `hover`, Default has no underline; Hover, Pressed, and Focus use 1px; Disabled has no underline. Underline offset is 2px. Draw the underline under the label only, never under either icon or the 4px gaps.
Exact layout values: gap between icon and label or label and external icon is 4px. Every standalone link hugs its content, has no padding, and has a minimum block size of 24px. Focus draws a 2px outline, 2px outside the whole link, 4px radius: #254471 for brand and neutral, #FFFFFF for inverse. Disabled has no underline and no focus ring.
Exact-value callouts: Beside the relevant row or cell, print compact callouts with the exact hex, px, radius, and font values above. Include a small color-swatch strip labelled with #2559D4, #1D48AD, #153786, #1D48AD visited, #0A0A0A neutral, #FFFFFF inverse, #969696 disabled, #254471 focus, and #141414 inverse surface. Keep callouts adjacent to the part they style and do not obscure the links.
Direction: left-to-right. Leading icon is before the label; `open_in_new` is after the label and is not mirrored in LTR.
Constraints: render all quoted text verbatim with no spelling changes and no extra UI controls. No shadows, gradients, glow, photos, device frames, logos, decorations, cards, buttons, watermarks, or ornamental icons. Use only the four planned rows and six planned columns.
```

## Prompt — `link-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component planning sheet
Primary request: Draw a precise Link component specification sheet for plan 1.0 in dark theme and Arabic. This is a flat product-UI diagram, not a marketing image.
Canvas: landscape 3:2 flat UI spec sheet, no more than 1600 px wide, solid page background #0A0A0A. Use the Arabic font stack IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif. Crisp vector-like edges and generous, regular spacing.
Layout: Use a four-row by six-column grid mirrored right-to-left. Put small captions above every row and every column. Column captions, kept as exact technical state names: "Default", "Hover", "Pressed", "Focus", "Visited", "Disabled"; order them from the right edge toward the left edge in that sequence. Row captions, kept as exact technical option names: "brand · inherit · always · internal · no leading icon", "brand · sm · hover · internal · no leading icon", "neutral · md · always · internal · leading mail", and "inverse · lg · always · external · leading description". Show only these planned options and the six planned states. For neutral and inverse Visited cells, print only a small em dash with "not available" because visited is brand-only.
Row 1 content: the exact Arabic sentence "اقرأ سياسة الخصوصية قبل المتابعة." The link label is exactly "سياسة الخصوصية" and only those words are styled as the link. It is inline, `font: inherit`, and has no independent Link font size or line height. Underline the link label only, never the rest of the sentence. Keep Arabic shaping and letter order correct.
Row 2 content: exact Arabic standalone label "إعادة تعيين كلمة المرور". Use action-sm: 13px font, 20px line height, weight 500, letter spacing 0px. No icons.
Row 3 content: exact Arabic standalone label "التواصل مع الدعم" with a Material Symbols Rounded `mail` leading icon at logical inline start, visually on the right. Use action-md: 14px font, 22px line height, weight 500, letter spacing 0px. Icon is 16px. The mail icon does not mirror.
Row 4 content: exact Arabic standalone label "عرض الحضور" with a Material Symbols Rounded `description` leading icon at logical inline start, visually on the right, and a Material Symbols Rounded `open_in_new` external icon at logical inline end, visually on the left. Use action-lg: 16px font, 26px line height, weight 500, letter spacing 0px. Both icons are 20px. The description icon does not mirror. Mirror the `open_in_new` glyph exactly once for RTL; do not flip its wrapper. Put every row-4 link on a compact inverse-surface swatch #FFFFFF so its inverse text remains readable.
Exact colors: brand Default #6D9CE8; brand Hover #9CBCF2; brand Pressed #CBDCFA; brand Visited #9CBCF2; neutral Default/Hover/Pressed/Visited #F7F7F7; inverse Default/Hover/Pressed #0A0A0A; Disabled #545454 for every color. Icons and underlines use currentColor. Focus keeps the color appropriate to its resting variant.
Exact underline states: for `always`, Default, Focus, and Visited use 1px; Hover and Pressed use 2px; Disabled has no underline. For `hover`, Default has no underline; Hover, Pressed, and Focus use 1px; Disabled has no underline. Underline offset is 2px. Draw the underline under the label only, never under either icon or the 4px gaps.
Exact layout values: gap between icon and label or label and external icon is 4px. Every standalone link hugs its content, has no padding, and has a minimum block size of 24px. Focus draws a 2px outline, 2px outside the whole link, 4px radius: #90A3BC for brand and neutral, #0A0A0A for inverse. Disabled has no underline and no focus ring.
Exact-value callouts: Beside the relevant row or cell, print compact callouts with the exact hex, px, radius, and font values above. Include a small color-swatch strip labelled with #6D9CE8, #9CBCF2, #CBDCFA, #9CBCF2 visited, #F7F7F7 neutral, #0A0A0A inverse, #545454 disabled, #90A3BC focus, and #FFFFFF inverse surface. Keep callouts adjacent to the part they style and do not obscure the links.
Direction: right-to-left throughout the grid and link content. Start icon is on the right; external icon is on the left. `open_in_new` mirrors exactly once. Underline and focus ring follow the Arabic text.
Constraints: render all quoted Arabic text verbatim with correct shaping, no spelling changes, and no extra UI controls. No shadows, gradients, glow, photos, device frames, logos, decorations, cards, buttons, watermarks, or ornamental icons. Use only the four planned rows and six planned columns.
```

## Checks

| Image | Result |
|---|---|
| `link-light-en.jpg` | ✓ matches — four planned option rows, six states, exact English copy, LTR icon order, resolved colors, dimensions, typography and focus treatment. |
| `link-dark-ar.jpg` | ✓ matches after one targeted retry — exact Arabic copy and shaping, RTL state order, neutral Visited restriction, logical icon order, once-mirrored `open_in_new`, inverse focus token and resolved dark values. |
