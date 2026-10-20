# Button tablet preview — plan 1.1

These images are a review sketch. The plan remains the source of truth. Values below resolve the tablet component aliases through `2-foundations/dist/tokens.json`. The light image uses English typography; the dark image uses Arabic typography.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color.surface.page` | `#F7F7F7` | `#0A0A0A` |
| `color.background.transparent` | `#54545400` | `#54545400` |
| `color.background.brand.default` | `#193351` | `#607D9F` |
| `color.background.brand.hover` | `#132843` | `#90A3BC` |
| `color.background.brand.pressed` | `#0D1E33` | `#BEC9D9` |
| `color.background.brand.subtle` | `#E8ECF2` | `#071323` |
| `color.background.secondary.default` | `#0C5F79` | `#5DA8C2` |
| `color.background.secondary.subtle` | `#E8F4F8` | `#032A37` |
| `color.background.neutral.default` | `#EDEDED` | `#292929` |
| `color.background.neutral.disabled` | `#EDEDED` | `#292929` |
| `color.background.error.default` | `#D42222` | `#FF7676` |
| `color.background.error.subtle` | `#FEF0EE` | `#721212` |
| `color.background.inverse.default` | `#FFFFFF` | `#0A0A0A` |
| `color.border.brand` | `#607D9F` | `#254471` |
| `color.border.secondary` | `#5DA8C2` | `#1A7596` |
| `color.border.strong` | `#BDBDBD` | `#545454` |
| `color.border.error` | `#FF7676` | `#FF3B3B` |
| `color.border.inverse` | `#FFFFFF` | `#0A0A0A` |
| `color.border.disabled` | `#DBDBDB` | `#404040` |
| `color.border.focus` | `#254471` | `#90A3BC` |
| `color.text.on.brand` | `#FFFFFF` | `#0A0A0A` |
| `color.text.on.secondary` | `#FFFFFF` | `#0A0A0A` |
| `color.text.on.error` | `#FFFFFF` | `#0A0A0A` |
| `color.text.role.brand` | `#132843` | `#90A3BC` |
| `color.text.role.secondary` | `#094E65` | `#90C3D5` |
| `color.text.role.error` | `#D42222` | `#FEA3A3` |
| `color.text.neutral.default` | `#0A0A0A` | `#F7F7F7` |
| `color.text.neutral.disabled` | `#969696` | `#545454` |
| `color.icon.on.brand` | `#FFFFFF` | `#0A0A0A` |
| `size.control.height.sm` | `32px` | `32px` |
| `size.control.height.md` | `40px` | `40px` |
| `size.control.height.lg` | `48px` | `48px` |
| `size.control.height.xl` | `56px` | `56px` |
| `spacing.control.padding-inline.sm` | `8px` | `8px` |
| `spacing.control.padding-inline.md` | `12px` | `12px` |
| `spacing.control.padding-inline.lg` | `16px` | `16px` |
| `spacing.control.padding-inline.xl` | `24px` | `24px` |
| `spacing.control.gap.sm` | `4px` | `4px` |
| `spacing.control.gap.md` | `6px` | `6px` |
| `spacing.control.gap.lg` | `8px` | `8px` |
| `spacing.control.gap.xl` | `8px` | `8px` |
| `size.icon.sm` | `16px` | `16px` |
| `size.icon.md` | `20px` | `20px` |
| `size.icon.lg` | `24px` | `24px` |
| `radius.md` | `8px` | `8px` |
| `radius.xl` | `12px` | `12px` |
| `border.width.default` | `1px` | `1px` |
| `border.width.focus` | `2px` | `2px` |
| `border.focus.offset` | `2px` | `2px` |
| focused `sm` ring radius (`radius.md + offset`) | `10px` | `10px` |
| focused `lg` ring radius (`radius.md + offset`) | `10px` | `10px` |
| `target.min` | `48px` | `48px` |
| `font.family` | `Inter` (fallbacks: system UI) | `IBM Plex Sans Arabic` (fallbacks: Noto Sans Arabic, Tahoma) |
| `action-sm` | `14px / 20px`, weight `500`, tracking `0` | `14px / 22px`, weight `500`, tracking `0` |
| `action-md` | `16px / 24px`, weight `500`, tracking `0` | `16px / 26px`, weight `500`, tracking `0` |
| `action-lg` | `18px / 26px`, weight `500`, tracking `0` | `18px / 28px`, weight `500`, tracking `0` |

## Prompt — `button-light-en.jpg`

```text
Use case: ui-mockup
Asset type: tablet design-system component review sheet
Primary request: Draw the Biowave tablet Button from plan 1.1 as a precise flat UI specification sheet, light theme, English, left-to-right.

Canvas: wide landscape canvas no more than 1600px wide; solid page background #F7F7F7. Crisp, orthographic, flat product UI—not concept art. Use Inter for English. No device frame.

Layout: four compact sections in one aligned grid.
1. “Variants × colors · lg”: show all 18 valid combinations at lg, grouped in four rows. Filled has brand, secondary, neutral, error, inverse. Tonal has brand, secondary, error only; do not invent tonal neutral or tonal inverse because the plan forbids them. Outlined has brand, secondary, neutral, error, inverse. Text has brand, secondary, neutral, error, inverse. Put small variant and color captions above/along the grid. Each lg visible container is exactly 48px high, padding-inline 16px, radius 8px, label style 18px/26px weight 500. Outlined borders are 1px. Put inverse specimens on a compact contextual swatch using brand background #193351. Button labels, verbatim by color: brand “Save changes”; secondary “Approve request”; neutral “Cancel”; error “Delete user”; inverse “Clock in”.
2. “Sizes · filled brand”: sm, md, lg, xl in one row, each with a leading plus icon and verbatim label “Add device”. Annotate immediately below each control: sm = 32h, 8px inline padding, 4px gap, 16px icon, radius 8px, 14px/20px; md = 40h, 12px padding, 6px gap, 20px icon, radius 8px, 16px/24px; lg = 48h, 16px padding, 8px gap, 24px icon, radius 8px, 18px/26px; xl = 56h, 24px padding, 8px gap, 24px icon, radius 12px, 18px/26px. All label weights 500.
3. “States · filled brand lg”: six columns default, hovered, pressed, focused, disabled, loading, with verbatim label “Clock in” except loading, where a centered 24px spinner replaces hidden content while width stays unchanged. Use 48px height, 16px inline padding, radius 8px, 18px/26px weight 500. Focus ring geometry is mandatory: it is outside the visible container, with a clear 2px gap, a 2px #254471 stroke, and ring radius exactly 10px; no padding and no layout expansion. Add a small separate focus-geometry callout for sm: 32px visible container, 48px touch target shown only as a faint measurement guide, but the ring hugs the 32px visible container with the same 2px gap, 2px stroke and 10px radius—never ring the 48px touch area.
4. “Directionality”: one lg filled-brand button with verbatim label “Next” and a 24px trailing arrow pointing right, placed after the label with an 8px gap.

Exact light colors, written in tiny legible callouts directly beside the parts they style: page #F7F7F7; filled backgrounds brand #193351, secondary #0C5F79, neutral #EDEDED, error #D42222, inverse #FFFFFF; tonal backgrounds brand #E8ECF2, secondary #E8F4F8, error #FEF0EE; outlined/text background transparent #54545400; outlined borders brand #607D9F, secondary #5DA8C2, neutral #BDBDBD, error #FF7676, inverse #FFFFFF; filled foregrounds brand #FFFFFF, secondary #FFFFFF, neutral #0A0A0A, error #FFFFFF, inverse #132843; tonal/outlined/text foregrounds brand #132843, secondary #094E65, neutral #0A0A0A, error #D42222, inverse #FFFFFF. State backgrounds: default #193351, hovered #132843, pressed #0D1E33, focused #193351, disabled #EDEDED, loading #193351. Disabled label #969696; spinner #FFFFFF.

Text must be verbatim with no misspellings and no extra button labels. Use only sentence case. Keep every label on one line. Never draw shadows, gradients, glow, photos, device frames, logos, watermarks, splashes, elevation or decoration.
```

## Prompt — `button-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: tablet design-system component review sheet
Primary request: Draw the Biowave tablet Button from plan 1.1 as a precise flat UI specification sheet, dark theme, Arabic, fully right-to-left.

Canvas: wide landscape canvas no more than 1600px wide; solid page background #0A0A0A. Crisp, orthographic, flat product UI—not concept art. Use IBM Plex Sans Arabic for Arabic. No device frame.

Layout: mirror the full sheet right-to-left, including grid reading order, inline padding and icon placement. Use the same four compact sections.
1. “Variants × colors · lg”: show all 18 valid combinations at lg, grouped in four rows. Filled has brand, secondary, neutral, error, inverse. Tonal has brand, secondary, error only; do not invent tonal neutral or tonal inverse because the plan forbids them. Outlined has brand, secondary, neutral, error, inverse. Text has brand, secondary, neutral, error, inverse. Put small variant and color captions above/along the grid. Each lg visible container is exactly 48px high, padding-inline 16px, radius 8px, Arabic label style 18px/28px weight 500. Outlined borders are 1px. Put inverse specimens on a compact contextual swatch using brand background #607D9F. Button labels, verbatim by color: brand “حفظ التغييرات”; secondary “الموافقة على الطلب”; neutral “إلغاء”; error “حذف المستخدم”; inverse “تسجيل الحضور”.
2. “Sizes · filled brand”: sm, md, lg, xl in a mirrored row, each with a leading plus icon on the RTL leading side and verbatim label “إضافة جهاز”. Annotate immediately below each control: sm = 32h, 8px inline padding, 4px gap, 16px icon, radius 8px, 14px/22px; md = 40h, 12px padding, 6px gap, 20px icon, radius 8px, 16px/26px; lg = 48h, 16px padding, 8px gap, 24px icon, radius 8px, 18px/28px; xl = 56h, 24px padding, 8px gap, 24px icon, radius 12px, 18px/28px. All label weights 500.
3. “States · filled brand lg”: six mirrored columns default, hovered, pressed, focused, disabled, loading, with verbatim label “تسجيل الحضور” except loading, where a centered 24px spinner replaces hidden content while width stays unchanged. Use 48px height, 16px inline padding, radius 8px, 18px/28px weight 500. Focus ring geometry is mandatory: it is outside the visible container, with a clear 2px gap, a 2px #90A3BC stroke, and ring radius exactly 10px; no padding and no layout expansion. Add a small separate focus-geometry callout for sm: 32px visible container, 48px touch target shown only as a faint measurement guide, but the ring hugs the 32px visible container with the same 2px gap, 2px stroke and 10px radius—never ring the 48px touch area.
4. “Directionality”: one lg filled-brand button with verbatim label “التالي”. The trailing 24px directional arrow is on the visual left after the Arabic label in RTL and points left, with an 8px gap. Mirror this directional arrow; do not mirror the plus icon or spinner.

Exact dark colors, written in tiny legible callouts directly beside the parts they style: page #0A0A0A; filled backgrounds brand #607D9F, secondary #5DA8C2, neutral #292929, error #FF7676, inverse #0A0A0A; tonal backgrounds brand #071323, secondary #032A37, error #721212; outlined/text background transparent #54545400; outlined borders brand #254471, secondary #1A7596, neutral #545454, error #FF3B3B, inverse #0A0A0A; filled foregrounds brand #0A0A0A, secondary #0A0A0A, neutral #F7F7F7, error #0A0A0A, inverse #90A3BC; tonal/outlined/text foregrounds brand #90A3BC, secondary #90C3D5, neutral #F7F7F7, error #FEA3A3, inverse #0A0A0A. State backgrounds: default #607D9F, hovered #90A3BC, pressed #BEC9D9, focused #607D9F, disabled #292929, loading #607D9F. Disabled label #545454; spinner #0A0A0A.

Arabic text must be verbatim, correctly joined, and contain no extra characters or button labels. Keep every label on one line. Never draw shadows, gradients, glow, photos, device frames, logos, watermarks, splashes, elevation or decoration.
```

## Checks

- `button-light-en.jpg`: ⚠ Structure matches: 18 valid variant/color combinations, four filled-brand sizes, six states, the separate 32px-container/48px-target focus diagram, and the LTR arrow are present; English labels and literal token callouts are correct. Saved as 1600 × 800 JPEG at requested quality 85. The generated raster has slight tonal variation/anti-aliasing, so uniform hex fills, exact Inter metrics, and pixel-perfect dimensions/radii cannot be asserted from the image itself; use the token sheet and plan as truth.
- `button-dark-ar.jpg`: ⚠ Structure matches: the same 18 valid combinations, four sizes, six mirrored states, 24px loading-spinner callout, outside focus ring, 32px-container/48px-target diagram, and left-pointing RTL trailing arrow are present. Arabic button labels are correctly joined and ordered RTL; literal token callouts are present. Saved as 1600 × 1066 JPEG at requested quality 85. The generated raster has slight tonal variation/anti-aliasing, so uniform hex fills, exact IBM Plex Sans Arabic metrics, and pixel-perfect dimensions/radii cannot be asserted from the image itself; use the token sheet and plan as truth.

## Questions

None.
