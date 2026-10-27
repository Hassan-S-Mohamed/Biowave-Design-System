# Link tablet previews

Planning sketches for Link 1.0. The component plan remains the source of truth.

There is no `link.tokens.json`: Link uses shared semantic tokens only. `Visited` is not drawn because `show-visited` is web-only. The tablet states shown are Default, Hover, Pressed, Focus and Disabled.

## Token sheet

| Token / rendered property | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-text-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-subtlest` | `#707070` | `#BDBDBD` |
| `color-text-disabled` | `#969696` | `#545454` |
| `color-text-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-link-default` | `#2559D4` | `#6D9CE8` |
| `color-link-hovered` | `#1D48AD` | `#9CBCF2` |
| `color-link-pressed` | `#153786` | `#CBDCFA` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-border-inverse` | `#FFFFFF` | `#0A0A0A` |
| `border-width-default` | `1 px` | `1 px` |
| `border-width-strong` | `2 px` | `2 px` |
| `border-width-focus` | `2 px` | `2 px` |
| `border-focus-offset` | `2 px` | `2 px` |
| `radius-xs` | `4 px` | `4 px` |
| `spacing-xs` | `4 px` | `4 px` |
| `target-min` (tablet) | `48 px` | `48 px` |
| `size-icon-sm` | `16 px` | `16 px` |
| `size-icon-md` | `20 px` | `20 px` |
| `font-family-en` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | same |
| `font-family-ar` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` | same |
| `font-size-body-md` | `16 px` | `16 px` |
| `font-line-height-en-body-md` | `24 px` | `24 px` |
| `font-line-height-ar-body-md` | `26 px` | `26 px` |
| `font-weight-body` | `400` | `400` |
| `font-size-action-sm` | `14 px` | `14 px` |
| `font-line-height-en-action-sm` | `20 px` | `20 px` |
| `font-line-height-ar-action-sm` | `22 px` | `22 px` |
| `font-size-action-md` | `16 px` | `16 px` |
| `font-line-height-en-action-md` | `24 px` | `24 px` |
| `font-line-height-ar-action-md` | `26 px` | `26 px` |
| `font-size-action-lg` | `18 px` | `18 px` |
| `font-line-height-en-action-lg` | `26 px` | `26 px` |
| `font-line-height-ar-action-lg` | `28 px` | `28 px` |
| `font-weight-action` | `500` | `500` |
| `font-letter-spacing-en-default` | `0 px` | `0 px` |
| `font-letter-spacing-ar-default` | `0 px` | `0 px` |

Flutter uses its font-default underline offset; it has no underline-offset token. Inline links inherit the surrounding style, so the specimen uses `body-md`. The visual content is centred in an invisible `48 px` minimum touch target; that target adds no visible padding. There are no shadows, gradients, splashes or state overlays.

## Prompt — `link-light-en.jpg`

```text
Use case: ui-mockup
Asset type: tablet design-system component planning sheet
Primary request: Draw a flat, precise Flutter Material 3 tablet Link component spec sheet for the light English mode. This is a design-plan visualization, not a product screen.
Canvas: landscape, no more than 1600 px wide, flat page background #F7F7F7. Use white #FFFFFF specimen panels. No device frame.
Layout: a clean 6-row by 5-column matrix. Columns, left to right: Default, Hover, Pressed, Focus, Disabled. Put a small caption above every column. Rows are the six valid option specimens below; put a compact row caption above or to the left of every row. Keep every sample legible and aligned. Each standalone link is centred in an invisible minimum 48 px by 48 px touch target; show the 48 px target once as a faint dashed measurement box and never as component chrome.
Rows and exact component copy:
1. Inline · inherit · brand · underline always · no icons · internal: show “Privacy policy” as the linked words inside the exact sentence “Read the Privacy policy before you continue.” Use inherited body-md: Inter 16 px, weight 400, 24 px line height, 0 px letter spacing. The inline link is an unbreakable piece and has no box.
2. Standalone · sm · brand · underline always · no leading icon · internal: “Reset password”. Use Inter 14 px, weight 500, 20 px line height, 0 px letter spacing.
3. Standalone · md · brand · underline hover · leading mail icon · internal: “Contact support”. Use Inter 16 px, weight 500, 24 px line height, 0 px letter spacing. Mail icon is 20 px before the label with a 4 px gap.
4. Standalone · lg · brand · underline hover · no leading icon · external: “View all requests”. Use Inter 18 px, weight 500, 26 px line height, 0 px letter spacing. Put a 20 px Material Symbols Rounded open_in_new icon after the label with a 4 px gap.
5. Standalone · md · neutral · underline always · leading description icon · internal: “View attendance”. Use Inter 16 px, weight 500, 24 px line height. The 20 px icon is before the label with a 4 px gap.
6. Standalone · md · inverse · underline always · no leading icon · external: “Contact support”. Put each link sample on its own #141414 inverse swatch. Use Inter 16 px, weight 500, 24 px line height. Put a 20 px Material Symbols Rounded open_in_new icon after the label with a 4 px gap.
Exact states and colors:
- Brand Default: label, underline and icons #2559D4. Hover: #1D48AD. Pressed: #153786. Focus: #2559D4. Disabled: #969696 and no underline.
- Neutral active states: label, underline and icons #0A0A0A. Disabled: #969696 and no underline.
- Inverse active states: label, underline and icons #FFFFFF on #141414. Disabled: #969696 and no underline.
- For underline=always: Default and Focus underline 1 px; Hover and Pressed underline 2 px; Disabled none.
- For underline=hover: Default has no underline; Hover, Pressed and Focus underline 1 px; Disabled none.
- Focus only: draw a 2 px ring outside all visible link content, 2 px offset, 4 px corner radius. Ring is #254471 except the inverse row, where it is #FFFFFF. The ring takes no layout space.
- Underline only the label, never either icon. No visited column because visited is web-only.
Annotations: next to the styled part, write exact callouts for font size/line height/weight, icon size, 4 px gap, underline 1 px or 2 px, and focus ring #254471 · 2 px · 2 px offset · radius 4 px. Use small Inter text in #707070 for captions and #0A0A0A for primary annotations.
Style: crisp flat UI specification, orthographic, pixel-clean, ample whitespace, no perspective.
Text (verbatim): “Privacy policy”; “Read the Privacy policy before you continue.”; “Reset password”; “Contact support”; “View all requests”; “View attendance”; “Default”; “Hover”; “Pressed”; “Focus”; “Disabled”.
Constraints: five state columns only; six rows only; preserve spelling and case exactly; use Material Symbols Rounded mail, description and open_in_new glyphs; open_in_new points up and right in LTR; label and icons share one color; no truncation; no visible container around a link except the focus ring and the inverse row swatch.
Never draw: shadows, gradients, glow, photos, logos, decorative art, ink splashes, state overlays, buttons, pills, filled link backgrounds or device frames.
```

## Prompt — `link-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: tablet design-system component planning sheet
Primary request: Draw a flat, precise Flutter Material 3 tablet Link component spec sheet for the dark Arabic mode. This is a design-plan visualization, not a product screen.
Canvas: landscape, no more than 1600 px wide, flat page background #0A0A0A. Use #141414 specimen panels. No device frame.
Direction: the entire component matrix is right-to-left. Put the first state column at the right. In every link Row follows RTL: the leading icon is on the visual right before the Arabic label; the external open_in_new icon is after the label on the visual left. Flip open_in_new exactly once so its arrow points up and left. Do not mirror mail or description.
Layout: a clean 6-row by 5-column matrix. Columns from right to left: افتراضي, تحويم, ضغط, تركيز, معطّل. Put a small caption above every column. Rows are the six valid option specimens below; put a compact row caption above or to the right of every row. Keep every sample legible and aligned. Each standalone link is centred in an invisible minimum 48 px by 48 px touch target; show the 48 px target once as a faint dashed measurement box and never as component chrome.
Rows and exact component copy:
1. Inline · inherit · brand · underline always · no icons · internal: show only “سياسة الخصوصية” as the linked Arabic words within a short right-to-left body-text specimen. Use inherited body-md: IBM Plex Sans Arabic 16 px, weight 400, 26 px line height, 0 px letter spacing. The inline link is an unbreakable piece and has no box.
2. Standalone · sm · brand · underline always · no leading icon · internal: “إعادة تعيين كلمة المرور”. Use IBM Plex Sans Arabic 14 px, weight 500, 22 px line height, 0 px letter spacing.
3. Standalone · md · brand · underline hover · leading mail icon · internal: “التواصل مع الدعم”. Use IBM Plex Sans Arabic 16 px, weight 500, 26 px line height, 0 px letter spacing. Mail icon is 20 px on the visual right before the label with a 4 px gap.
4. Standalone · lg · brand · underline hover · no leading icon · external: “عرض كل الطلبات”. Use IBM Plex Sans Arabic 18 px, weight 500, 28 px line height, 0 px letter spacing. Put a 20 px Material Symbols Rounded open_in_new icon after the label on the visual left with a 4 px gap, mirrored to point up-left.
5. Standalone · md · neutral · underline always · leading description icon · internal: “عرض الحضور”. Use IBM Plex Sans Arabic 16 px, weight 500, 26 px line height. The 20 px icon is on the visual right before the label with a 4 px gap.
6. Standalone · md · inverse · underline always · no leading icon · external: “التواصل مع الدعم”. Put each link sample on its own #FFFFFF inverse swatch. Use IBM Plex Sans Arabic 16 px, weight 500, 26 px line height. Put a 20 px mirrored open_in_new icon after the label on the visual left with a 4 px gap.
Exact states and colors:
- Brand Default: label, underline and icons #6D9CE8. Hover: #9CBCF2. Pressed: #CBDCFA. Focus: #6D9CE8. Disabled: #545454 and no underline.
- Neutral active states: label, underline and icons #F7F7F7. Disabled: #545454 and no underline.
- Inverse active states: label, underline and icons #0A0A0A on #FFFFFF. Disabled: #545454 and no underline.
- For underline=always: Default and Focus underline 1 px; Hover and Pressed underline 2 px; Disabled none.
- For underline=hover: Default has no underline; Hover, Pressed and Focus underline 1 px; Disabled none.
- Focus only: draw a 2 px ring outside all visible link content, 2 px offset, 4 px corner radius. Ring is #90A3BC except the inverse row, where it is #0A0A0A. The ring takes no layout space.
- Underline only the label, never either icon. No visited column because visited is web-only.
Annotations: next to the styled part, write exact callouts for font size/line height/weight, icon size, 4 px gap, underline 1 px or 2 px, and focus ring #90A3BC · 2 px · 2 px offset · radius 4 px. Use small IBM Plex Sans Arabic text in #BDBDBD for captions and #F7F7F7 for primary annotations; technical token names and numeric callouts may remain Latin.
Style: crisp flat UI specification, orthographic, pixel-clean, ample whitespace, no perspective.
Text (verbatim): “سياسة الخصوصية”; “إعادة تعيين كلمة المرور”; “التواصل مع الدعم”; “عرض كل الطلبات”; “عرض الحضور”; “افتراضي”; “تحويم”; “ضغط”; “تركيز”; “معطّل”.
Constraints: five state columns only; six rows only; Arabic copy must be spelled exactly, joined correctly and read right-to-left; use Material Symbols Rounded mail, description and open_in_new glyphs; open_in_new points up-left in RTL; label and icons share one color; no truncation; no visible container around a link except the focus ring and the inverse row swatch.
Never draw: shadows, gradients, glow, photos, logos, decorative art, ink splashes, state overlays, buttons, pills, filled link backgrounds or device frames.
```

## Checks

- `link-light-en.jpg`: ⚠ Final visual check after two targeted retries: the 6 × 5 matrix, exact English component copy, option coverage, state order, LTR icon placement, underline behavior, focus ring, resolved callouts and standalone 48 px touch-target example match the plan. The sheet is a generated JPEG sketch, so JPEG compression and rasterized glyph/font metrics are not implementation-exact; the token sheet and numeric callouts above are authoritative.
- `link-dark-ar.jpg`: ⚠ Final visual check after two targeted retries: the 6 × 5 matrix, exact Arabic link labels, RTL state order, leading-icon placement, one-time mirrored `open_in_new`, underline behavior, focus ring, resolved color callouts and standalone 48 px touch-target example match the plan. The short host sentence around `سياسة الخصوصية` is illustrative because A6 specifies the Arabic link label but not a complete Arabic sentence. JPEG compression and rasterized glyph/font metrics are not implementation-exact; the token sheet and numeric callouts above are authoritative.

