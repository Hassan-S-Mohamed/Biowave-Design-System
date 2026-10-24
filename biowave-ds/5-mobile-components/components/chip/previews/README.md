# Mobile Chip preview — plan 1.0

These two planning sheets are visual checks of the mobile plan, not implementation sources. The `status` variant is intentionally omitted because plan 1.0 does not specify its seven states.

## Token sheet

All dimensions are logical pixels (Flutter dp at 1×); color values are resolved hex values. Alpha colors use `#RRGGBBAA`.

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-background-transparent` | `#54545400` | `#54545400` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-disabled` | `#DBDBDB` | `#404040` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-background-neutral-disabled` | `#EDEDED` | `#292929` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-background-success-subtle` | `#E9F7EF` | `#0E3921` |
| `color-background-warning-subtle` | `#FFF3E8` | `#773F12` |
| `color-background-error-subtle` | `#FEF0EE` | `#721212` |
| `color-background-info-subtle` | `#EEF4FF` | `#0E265F` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-disabled` | `#969696` | `#545454` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-text-role-success` | `#1E6D41` | `#8DD4AE` |
| `color-text-role-warning` | `#A85A1A` | `#FFC88F` |
| `color-text-role-error` | `#D42222` | `#FEA3A3` |
| `color-text-role-info` | `#1D48AD` | `#9CBCF2` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-icon-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-neutral-disabled` | `#969696` | `#545454` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-icon-role-success` | `#268751` | `#8DD4AE` |
| `color-icon-role-warning` | `#D97424` | `#FFC88F` |
| `color-icon-role-error` | `#FF2B2B` | `#FEA3A3` |
| `color-icon-role-info` | `#2559D4` | `#9CBCF2` |
| `color-overlay-hover` | `#5454541A` | `#54545466` |
| `color-overlay-pressed` | `#54545433` | `#54545499` |
| `size-control-height-sm` | `32px` | `32px` |
| `size-control-height-md` | `40px` | `40px` |
| `spacing-control-padding-inline-sm` | `8px` | `8px` |
| `spacing-control-padding-inline-md` | `12px` | `12px` |
| `spacing-xs` | `4px` | `4px` |
| `spacing-control-gap-sm` | `4px` | `4px` |
| `spacing-control-gap-md` | `6px` | `6px` |
| `radius-md` | `8px` | `8px` |
| `radius-full` | `9999px` | `9999px` |
| `border-width-default` | `1px` | `1px` |
| `border-width-focus` | `2px` | `2px` |
| `border-focus-offset` | `2px` | `2px` |
| `size-icon-sm` | `16px` | `16px` |
| `size-icon-md` | `20px` | `20px` |
| `size-icon-lg` | `24px` | `24px` |
| `spacing-sm` | `6px` | `6px` |
| `target-min` (mobile) | `48px` | `48px` |
| `label-md` font | Inter, `14px / 20px`, weight `500`, tracking `0` | IBM Plex Sans Arabic, `14px / 22px`, weight `500`, tracking `0` |
| `label-lg` font | Inter, `16px / 24px`, weight `500`, tracking `0` | IBM Plex Sans Arabic, `16px / 26px`, weight `500`, tracking `0` |

## Prompt — `chip-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat mobile component planning sheet
Primary request: Draw the Biowave Flutter Material 3 mobile Chip from plan 1.0 as a precise light-theme UI specification sheet. Canvas is a flat #F7F7F7 background, landscape, at most 1600px wide. No phone frame.

Layout: Use a disciplined grid with compact captions. Section 1 is an 8-row by 5-column matrix. Columns, left to right: Default, Hover, Pressed, Focus, Disabled. Rows: assist sm, assist md, filter unselected sm, filter unselected md, filter selected sm, filter selected md, input sm, input md. Section 2 is a tag matrix with rows sm and md and columns neutral, brand, secondary, success, warning, error, info; tags have Default only. Show no status variant.

Exact chip text: assist “Add note”; every filter “Remote”; every input “Sara Ali”; every tag “Full time”. Spell every string exactly. Use the plan’s ◆ placeholder as the assist leading icon, a checkmark at the logical start of selected filters, an outlined circular “SA” avatar placeholder at the logical start of input chips, and × at the logical end as the remove button. Add no other copy except grid captions, token names, values, and the title “Mobile Chip · Light · EN”.

Geometry: sm visual height 32px, inline padding 8px, internal gap 4px, 16px glyph, label Inter 14px/20px weight 500; md visual height 40px, inline padding 12px, internal gap 6px, 20px glyph, label Inter 16px/24px weight 500. Input edge padding beside avatar and remove is 4px. Avatar box is 24px at sm and 32px at md. Remove-button box is 24px with 16px glyph at sm and 32px with 20px glyph at md. Interactive radius 8px and 1px outline. Tags use fully rounded 9999px radius and no border. Row/run gap is 6px. Show a faint dashed 48px minimum hit-area guide around interactive chips and each remove button without changing visual height. Annotate these exact values next to the corresponding parts.

Interactive default colors: transparent #54545400, border #DBDBDB, label #0A0A0A, assist icon #292929. Hover adds #5454541A as a state layer. Pressed adds #54545433. Focus keeps default colors and adds a #254471 ring, 2px wide, 2px offset. Disabled uses border #DBDBDB, label/icon #969696, no state layer.

Selected filter colors: fill #E8ECF2, border #254471, label #132843, check #193351. Hover and Pressed add the same overlays. Focus adds the same #254471 2px ring with 2px offset. Disabled selected filter uses fill #EDEDED, border #DBDBDB, label/check #969696.

Input-state rule: the input container itself has no hover or pressed layer. In Hover and Pressed cells apply the overlay only inside the × remove-button box. In Focus apply the focus ring only around that remove-button. Disabled mutes chip outline, label and ×; leave the avatar placeholder unchanged. The exact Avatar B3 fill/foreground is unresolved, so keep it unfilled with a thin neutral outline and visibly annotate “avatar colour unresolved”; do not imply a fill token.

Tag colors, fill then label: neutral #EDEDED / #0A0A0A; brand #E8ECF2 / #132843; secondary #E8F4F8 / #094E65; success #E9F7EF / #1E6D41; warning #FFF3E8 / #A85A1A; error #FEF0EE / #D42222; info #EEF4FF / #1D48AD.

Style: practical production UI spec, crisp flat shapes, accurate spacing, readable typography, no shadows, no gradients, no glow, no photos, no devices, no logos, no decorative elements, no watermark. Do not add variants, states, badges, icons, or text beyond this specification.
```

## Prompt — `chip-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat mobile component planning sheet
Primary request: Draw the Biowave Flutter Material 3 mobile Chip from plan 1.0 as a precise dark-theme Arabic RTL UI specification sheet. Canvas is a flat #0A0A0A background, landscape, at most 1600px wide. No phone frame.

Layout: Use a disciplined grid with compact technical captions. The entire component layout is right-to-left. Section 1 is an 8-row by 5-column matrix read from right to left. State columns are Default, Hover, Pressed, Focus, Disabled. Rows: assist sm, assist md, filter unselected sm, filter unselected md, filter selected sm, filter selected md, input sm, input md. Section 2 is a tag matrix with rows sm and md and columns neutral, brand, secondary, success, warning, error, info; tags have Default only. Show no status variant.

Exact Arabic chip text: assist “إضافة ملاحظة”; every filter “عن بُعد”; every input “سارة علي”; every tag “دوام كامل”. Render Arabic correctly, joined and right-to-left. Use the plan’s ◆ placeholder as the assist leading icon at the logical start (right), a checkmark at the logical start (right) of selected filters, an outlined circular “س ع” avatar placeholder at the logical start (right) of input chips, and × at the logical end (left) as the remove button. Do not mirror the ◆, checkmark, or × glyphs. Add no other prose except technical grid captions, token names, values, and the title “Mobile Chip · Dark · AR · RTL”.

Geometry: sm visual height 32px, inline padding 8px, internal gap 4px, 16px glyph, label IBM Plex Sans Arabic 14px/22px weight 500; md visual height 40px, inline padding 12px, internal gap 6px, 20px glyph, label IBM Plex Sans Arabic 16px/26px weight 500. Input edge padding beside avatar and remove is 4px. Avatar box is 24px at sm and 32px at md. Remove-button box is 24px with 16px glyph at sm and 32px with 20px glyph at md. Interactive radius 8px and 1px outline. Tags use fully rounded 9999px radius and no border. Row/run gap is 6px. Show a faint dashed 48px minimum hit-area guide around interactive chips and each remove button without changing visual height. Annotate these exact values next to the corresponding parts.

Interactive default colors: transparent #54545400, border #404040, label #F7F7F7, assist icon #DBDBDB. Hover adds #54545466 as a state layer. Pressed adds #54545499. Focus keeps default colors and adds a #90A3BC ring, 2px wide, 2px offset. Disabled uses border #404040, label/icon #545454, no state layer.

Selected filter colors: fill #071323, border #90A3BC, label #90A3BC, check #90A3BC. Hover and Pressed add the same overlays. Focus adds the same #90A3BC 2px ring with 2px offset. Disabled selected filter uses fill #292929, border #404040, label/check #545454.

Input-state rule: the input container itself has no hover or pressed layer. In Hover and Pressed cells apply the overlay only inside the × remove-button box. In Focus apply the focus ring only around that remove-button. Disabled mutes chip outline, label and ×; leave the avatar placeholder unchanged. The exact Avatar B3 fill/foreground is unresolved, so keep it unfilled with a thin neutral outline and visibly annotate “avatar colour unresolved”; do not imply a fill token.

Tag colors, fill then label: neutral #292929 / #F7F7F7; brand #071323 / #90A3BC; secondary #032A37 / #90C3D5; success #0E3921 / #8DD4AE; warning #773F12 / #FFC88F; error #721212 / #FEA3A3; info #0E265F / #9CBCF2.

Style: practical production UI spec, crisp flat shapes, accurate spacing, readable typography, no shadows, no gradients, no glow, no photos, no devices, no logos, no decorative elements, no watermark. Do not add variants, states, badges, icons, or text beyond this specification.
```

## Visual checks

| Image | Result |
|---|---|
| `chip-light-en.jpg` | ⚠ All 8 interactive rows × 5 states, both sizes, all 7 tag colours, exact English chip strings, focus rings, remove-button-only input states and 48px target guides are present; `status` is absent as required. The final retry removed the obvious depth effects, but a generated raster is not proof of exact pixel geometry or hex output, the hex values are not all printed in the sheet, and the Avatar colours remain unresolved. |
| `chip-dark-ar.jpg` | ⚠ All required rows, states, sizes and tag colours are present; Arabic strings are correct and joined, the component order is RTL, leading items are on the right, remove buttons are on the left, and the disabled selected filters retain their muted checks after two retries. Slight tonal variation remains in some generated fills, the hex values are not all printed in the sheet, and the Avatar colours remain unresolved. |

Final exports are 1600 × 1066 JPEGs at quality 85. They were produced with the built-in image-generation tool: one corrective retry for the light sheet and two corrective retries for the dark sheet.

## Questions

- ⚠ The plan delegates the input avatar to “Avatar B3,” but no Avatar component plan exists in the repository. Its exact fill and foreground are unresolved; both previews therefore use an unfilled, explicitly labelled avatar placeholder rather than inventing Avatar tokens.
