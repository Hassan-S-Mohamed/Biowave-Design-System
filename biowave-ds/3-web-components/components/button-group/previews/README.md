# Button group preview

These images are plan-check sketches for Button group 1.1. The component plan remains the source of truth. Button group adds layout only; every visible action uses Button or Icon button tokens.

## Token sheet

| Token | Value (light / English) | Value (dark / Arabic) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` (visible parent frames) | `#FFFFFF` | `#141414` |
| `color-surface-raised` (open overflow menu) | `#FFFFFF` | `#292929` |
| `color-border-default` (parent/menu outline) | `#DBDBDB` | `#404040` |
| `color-background-brand-default` (filled primary) | `#193351` | `#607D9F` |
| `color-text-on-brand` / `color-icon-on-brand` | `#FFFFFF` | `#0A0A0A` |
| `color-background-transparent` (outlined/text action) | `#54545400` | `#54545400` |
| `color-border-strong` (outlined neutral action) | `#BDBDBD` | `#545454` |
| `color-text-neutral-default` / `color-icon-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `spacing-md` (group gap, both orientations) | `8px` | `8px` |
| `size-control-height-sm` | `32px` | `32px` |
| `spacing-control-padding-inline-sm` | `8px` | `8px` |
| `spacing-control-gap-sm` | `4px` | `4px` |
| `size-icon-sm` | `16px` | `16px` |
| `size-control-height-md` | `40px` | `40px` |
| `spacing-control-padding-inline-md` | `12px` | `12px` |
| `spacing-control-gap-md` | `6px` | `6px` |
| `size-icon-md` | `20px` | `20px` |
| `size-control-height-lg` | `48px` | `48px` |
| `spacing-control-padding-inline-lg` | `16px` | `16px` |
| `spacing-control-gap-lg` | `8px` | `8px` |
| `size-icon-lg` | `24px` | `24px` |
| `radius-md` | `8px` | `8px` |
| `border-width-default` | `1px` | `1px` |
| `font-family-en` / `font-family-ar` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| `font-size-action-sm` / `font-line-height-*.action.sm` | `13px / 18px` | `13px / 20px` |
| `font-size-action-md` / `font-line-height-*.action.md` | `14px / 20px` | `14px / 22px` |
| `font-size-action-lg` / `font-line-height-*.action.lg` | `16px / 24px` | `16px / 26px` |
| `font-weight-action` | `500` | `500` |
| `font-letter-spacing-*.default` | `0px` | `0px` |

## Prompt — `button-group-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat web design-system specification sheet
Primary request: Draw the Web Button group plan 1.1 as a precise plan-check sheet in light theme and English. Canvas is 1536 × 1024 px, no wider than 1600 px, with page background #F7F7F7. Use a clean grid with one column labelled “Group state: none · actions shown default”. Every specimen sits inside its own clearly visible full-width parent frame: #FFFFFF fill, 1px #DBDBDB outline, 8px radius. The invisible Button group container spans 100% of that frame so alignment is obvious.

Typography: Inter with fallbacks system-ui, -apple-system, Segoe UI, Roboto, sans-serif; action weight 500 and letter-spacing 0px. sm labels are 13px/18px, md 14px/20px, lg 16px/24px. Captions use the same family and only these sizes.

Global Button geometry: 8px radius and 1px borders. Filled brand buttons use #193351 with #FFFFFF labels/icons. Outlined neutral buttons use transparent #54545400, 1px #BDBDBD border, #0A0A0A labels/icons. Text neutral and the overflow Icon button use transparent #54545400 with #0A0A0A label/icon and no border. Button group gap is exactly 8px in every orientation.

Rows, in this exact order:
1. “Horizontal align · md (40px)” with five separate parent frames: “end · default” has outlined “Cancel” then filled “Save changes” at the right inline end and doubles as the dialog-footer example; “start” has the same pair at the left; “center” has the same pair centered; “space-between” has outlined “Back” at the far left and filled “Next” at the far right; “fill” has outlined “Cancel” and filled “Save changes” sharing the full width equally. All md actions are 40px high with 12px inline padding, 6px internal icon gap if an icon exists, and 20px icons.
2. “Size · group wins” with three parent frames and the same outlined “Cancel” then filled “Save changes”: sm = 32px high, 8px inline padding, 4px internal gap, 16px icon; md = 40px, 12px, 6px, 20px; lg = 48px, 16px, 8px, 24px. Put the exact size values in small callouts beside each row.
3. “Vertical · full width” with one narrow parent frame: filled “Save changes” on top and outlined “Cancel” below, each full width, exact 8px vertical gap. Beside it show “Narrow parent · stacks vertically” with the same two actions full width to communicate the planned horizontal-to-vertical responsive stack; do not draw partial wrapping on one line.
4. “Overflow · more than 3 actions” in a wide parent frame. Keep an outlined link action “Back” visible at the start and a filled submit action “Save changes” visible at the end. Place the borderless neutral more_horiz Icon button first at the start of the ordinary actions, then two visible ordinary text actions “Reject” and “Approve”; show an open overflow menu anchored to more_horiz containing the remaining actions “Cancel” and “Next”. Menu is #FFFFFF with 1px #DBDBDB outline and 8px radius, no shadow. Label the link and submit actions “href · visible” and “submit · visible”.

Add a compact token legend with swatches and measurement callouts adjacent to the styled parts: page #F7F7F7; frame #FFFFFF / #DBDBDB 1px; filled #193351 / #FFFFFF; outlined transparent / #BDBDBD 1px / #0A0A0A; group gap 8px; radius 8px. Use exact strings and values verbatim. Draw no group-level fill, border, or state. No shadows, gradients, glow, photos, device frames, logos, decorations, or invented interaction states.
```

## Prompt — `button-group-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat web design-system specification sheet
Primary request: Draw the Web Button group plan 1.1 as a precise plan-check sheet in dark theme and Arabic. Canvas is 1536 × 1024 px, no wider than 1600 px, with page background #0A0A0A. Entire layout direction is right-to-left. Use a clean grid with one column labelled “حالة المجموعة: لا توجد · الإجراءات افتراضية”. Every specimen sits inside its own clearly visible full-width parent frame: #141414 fill, 1px #404040 outline, 8px radius. The invisible Button group container spans 100% of that frame so alignment is obvious.

Typography: IBM Plex Sans Arabic with fallbacks Noto Sans Arabic, Tahoma, sans-serif; action weight 500 and letter-spacing 0px. sm labels are 13px/20px, md 14px/22px, lg 16px/26px. Captions use the same family and only these sizes.

Global Button geometry: 8px radius and 1px borders. Filled brand buttons use #607D9F with #0A0A0A labels/icons. Outlined neutral buttons use transparent #54545400, 1px #545454 border, #F7F7F7 labels/icons. Text neutral and the overflow Icon button use transparent #54545400 with #F7F7F7 label/icon and no border. Button group gap is exactly 8px in every orientation.

Rows, in this exact order and mirrored right-to-left:
1. “المحاذاة الأفقية · md (40px)” with five separate parent frames: “end · الافتراضي” places outlined “إلغاء” then filled “حفظ التغييرات” at the left inline end and doubles as the dialog-footer example; “start” places the same pair at the right; “center” centers the same pair; “space-between” places outlined “رجوع” at the far right and filled “التالي” at the far left; “fill” gives outlined “إلغاء” and filled “حفظ التغييرات” equal full-width shares. The primary is at the inline end, which is left in RTL. All md actions are 40px high with 12px inline padding, 6px internal icon gap if an icon exists, and 20px icons.
2. “الحجم · حجم المجموعة هو المعتمد” with three parent frames and the same outlined “إلغاء” then filled “حفظ التغييرات”: sm = 32px high, 8px inline padding, 4px internal gap, 16px icon; md = 40px, 12px, 6px, 20px; lg = 48px, 16px, 8px, 24px. Put the exact size values in small callouts beside each row.
3. “عمودي · عرض كامل” with one narrow parent frame: filled “حفظ التغييرات” on top and outlined “إلغاء” below, each full width, exact 8px vertical gap. Beside it show “حاوية ضيقة · تكديس عمودي” with the same two actions full width to communicate the planned horizontal-to-vertical responsive stack; do not draw partial wrapping on one line.
4. “التجاوز · أكثر من 3 إجراءات” in a wide parent frame. Keep an outlined link action “رجوع” visible at the right start and a filled submit action “حفظ التغييرات” visible at the left end. Place the borderless neutral more_horiz Icon button first at the right start of the ordinary actions; the more_horiz glyph does not mirror. Then show two visible ordinary text actions “رفض” and “موافقة”; show an open overflow menu anchored to more_horiz containing the remaining actions “إلغاء” and “التالي”. Menu is #292929 with 1px #404040 outline and 8px radius, no shadow. Label the link and submit actions “href · ظاهر” and “submit · ظاهر”.

Add a compact RTL token legend with swatches and measurement callouts adjacent to the styled parts: page #0A0A0A; frame #141414 / #404040 1px; filled #607D9F / #0A0A0A; outlined transparent / #545454 1px / #F7F7F7; group gap 8px; radius 8px. Use Arabic action strings exactly, connected letters, and right-aligned RTL text. Draw no group-level fill, border, or state. No shadows, gradients, glow, photos, device frames, logos, decorations, or invented interaction states.
```

## Checks

| Image | Result |
|---|---|
| `button-group-light-en.jpg` | ⚠ Correct light tokens, English strings, parent-width alignment specimens, sm/md/lg sizing, 8px gaps, vertical stack, `more_horiz`, visible `href` / submit actions, and open overflow menu. After two retries, the `fill` specimen's two children remain slightly unequal in rendered width; the plan requires equal `flex: 1 1 0` shares. |
| `button-group-dark-ar.jpg` | ⚠ Correct dark tokens, connected Arabic strings, RTL mirroring (`end` left, `start` right), sm/md/lg sizing, 8px gaps, vertical stack, non-mirrored `more_horiz`, visible `href` / submit actions, and open overflow menu. After two retries, the `fill` specimen's two children remain slightly unequal in rendered width; the plan requires equal `flex: 1 1 0` shares. |

## Questions

None. All token values resolved; the two ⚠ items above are image-rendering differences, not plan questions.
