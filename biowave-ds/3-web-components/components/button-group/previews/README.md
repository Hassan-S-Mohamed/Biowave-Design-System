# Button group preview

These images are plan-check sketches for Button group 1.2. The component plan remains the source of truth. Button group adds layout only; every visible action uses Button or Icon button tokens.

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
Input image: the existing light/English Button group 1.1 sheet is the visual starting point; redraw it as plan 1.2 rather than merely relabelling it.
Primary request: Draw the Web Button group plan 1.2 as a precise plan-check sheet in light theme and English. Canvas is 1536 × 1024 px, no wider than 1600 px, with page background #F7F7F7. Use a compact, crisp grid headed “Web Button group plan 1.2” and “Group state: none · actions shown default”. Every specimen sits inside its own wide, clearly visible parent frame with #FFFFFF fill, 1px #DBDBDB outline, and 8px radius. The invisible Button group container spans 100% of each parent frame. The group has no state columns of its own.

Typography and Button styling: Inter with fallbacks system-ui, -apple-system, Segoe UI, Roboto, sans-serif; action weight 500; letter-spacing 0px. sm labels are 13px/18px, md 14px/20px, lg 16px/24px. Captions use the same family and these sizes. All Buttons have 8px radius and 1px borders. Filled brand Buttons are #193351 with #FFFFFF labels/icons. Outlined neutral Buttons use transparent #54545400, 1px #BDBDBD border, and #0A0A0A labels/icons. Text neutral and the overflow Icon button use transparent #54545400 with #0A0A0A label/icon and no border. Button group gap is exactly 8px in both orientations. Open menus are #FFFFFF with 1px #DBDBDB outline, 8px radius, and no shadow.

Lay out these four numbered sections in this exact order:
1. “Horizontal align · md (40px)”. Use five wide parent frames whose left and right edges are unmistakable. “end · default” places outlined “Cancel” then filled “Save changes” at the far right inline end. “start” places the same pair at the far left. “center” centers the pair. These three must look clearly different because the unused space and frame edges remain visible. “space-between” places outlined “Back” at the far left and filled “Next” at the far right. “fill” has outlined “Cancel” and filled “Save changes” spanning the full row in two exactly equal-width halves. All are 40px high, 12px inline padding, 6px internal icon gap if used, and 20px icons.
2. “Size · group wins”. Three parent frames show outlined “Cancel” then filled “Save changes”: sm = 32px high, 8px inline padding, 4px internal gap, 16px icon; md = 40px high, 12px inline padding, 6px internal gap, 20px icon; lg = 48px high, 16px inline padding, 8px internal gap, 24px icon. Print these exact values beside each specimen.
3. “Vertical · full width”. Show three narrow parent frames. “default vertical” has filled “Save changes” on top and outlined “Cancel” below, each full width at normal md height 40px with an 8px vertical gap. “vertical + align=fill · ignored” must look exactly identical to default vertical: same full-width Buttons, same normal 40px height, no stretching and no equal-height column fill. “narrow parent · stacks vertically” shows the same two full-width Buttons and 8px gap; never draw partial wrapping on one line.
4. “Overflow counting · plan 1.2”. Draw every row from the B1 examples table as its own wide specimen with its exact caption and an open menu where specified. The neutral borderless more_horiz trigger is first at the inline start and does not consume a visible slot.
   a. Caption “maxVisible=3 · [Delete, Archive, Cancel, Save (filled)]”. Visible, in reading order: “Archive”, “Cancel”, “Save”. Put “Delete” alone in the open menu. Show the trigger.
   b. Caption “maxVisible=3 · [Docs (href), Delete, Cancel, Save (filled)]”. Visible: outlined link action “Docs”, “Cancel”, filled “Save”. Put “Delete” alone in the open menu. Show the trigger. Mark Docs “href · visible”. Never show four visible actions.
   c. Caption “maxVisible=1 · [Docs (href), Cancel, Save (filled)]”. Visible: “Docs” and filled “Save” only because both are always-visible. Put “Cancel” alone in the open menu. Show the trigger and a compact “warning · 2 always-visible > 1” note. Never show Cancel as a visible Button.
   d. Caption “maxVisible=1 · [Docs (href), Help (href), Save (submit, filled)]”. Show all three Buttons “Docs”, “Help”, and filled “Save”; show no overflow trigger and no menu because every child is always-visible. Add “warning · 3 always-visible > 1”.

Add a compact token legend with swatches and measurement callouts adjacent to the styled parts: page #F7F7F7; frame #FFFFFF / #DBDBDB 1px; menu #FFFFFF / #DBDBDB 1px; filled #193351 / #FFFFFF; outlined transparent #54545400 / #BDBDBD 1px / #0A0A0A; group gap 8px; radius 8px. Use every quoted string and value verbatim. Draw no group-level fill, border, or state. No shadows, gradients, glow, photos, device frames, logos, decorations, watermarks, or invented interaction states.
```

## Prompt — `button-group-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat web design-system specification sheet
Input image: the existing dark/Arabic Button group 1.1 sheet is the visual starting point; redraw it as plan 1.2 rather than merely relabelling it.
Primary request: Draw the Web Button group plan 1.2 as a precise plan-check sheet in dark theme and Arabic. Canvas is 1536 × 1024 px, no wider than 1600 px, with page background #0A0A0A. Mirror the entire layout right-to-left. Use a compact, crisp grid headed “مجموعة الأزرار للويب · الخطة 1.2” and “حالة المجموعة: لا توجد · الإجراءات افتراضية”. Every specimen sits inside its own wide, clearly visible parent frame with #141414 fill, 1px #404040 outline, and 8px radius. The invisible Button group container spans 100% of each parent frame. The group has no state columns of its own.

Typography and Button styling: IBM Plex Sans Arabic with fallbacks Noto Sans Arabic, Tahoma, sans-serif; action weight 500; letter-spacing 0px. sm labels are 13px/20px, md 14px/22px, lg 16px/26px. Captions use the same family and these sizes. All Buttons have 8px radius and 1px borders. Filled brand Buttons are #607D9F with #0A0A0A labels/icons. Outlined neutral Buttons use transparent #54545400, 1px #545454 border, and #F7F7F7 labels/icons. Text neutral and the overflow Icon button use transparent #54545400 with #F7F7F7 label/icon and no border. Button group gap is exactly 8px in both orientations. Open menus are #292929 with 1px #404040 outline, 8px radius, and no shadow.

Lay out these four numbered sections in this exact order, with connected Arabic text and right-to-left reading order:
1. “المحاذاة الأفقية · md (40px)”. Use five wide parent frames whose left and right edges are unmistakable. “end · الافتراضي” places outlined “إلغاء” then filled “حفظ التغييرات” at the far left inline end. “start” places the pair at the far right. “center” centers it. These three must look clearly different because the unused space and frame edges remain visible. “space-between” places outlined “رجوع” at the far right and filled “التالي” at the far left. “fill” has outlined “إلغاء” and filled “حفظ التغييرات” spanning the full row in two exactly equal-width halves. All are 40px high, 12px inline padding, 6px internal icon gap if used, and 20px icons.
2. “الحجم · حجم المجموعة هو المعتمد”. Three parent frames show outlined “إلغاء” then filled “حفظ التغييرات”: sm = 32px high, 8px inline padding, 4px internal gap, 16px icon; md = 40px high, 12px inline padding, 6px internal gap, 20px icon; lg = 48px high, 16px inline padding, 8px internal gap, 24px icon. Print these exact values beside each specimen.
3. “عمودي · عرض كامل”. Show three narrow parent frames. “عمودي افتراضي” has filled “حفظ التغييرات” on top and outlined “إلغاء” below, each full width at normal md height 40px with an 8px vertical gap. “عمودي + align=fill · يتم تجاهله” must look exactly identical to default vertical: same full-width Buttons, same normal 40px height, no stretching and no equal-height column fill. “حاوية ضيقة · تكديس عمودي” shows the same two full-width Buttons and 8px gap; never draw partial wrapping on one line.
4. “حساب التجاوز · الخطة 1.2”. Draw every row from the B1 examples table as its own wide specimen with its caption and an open menu where specified. The neutral borderless more_horiz trigger is first at the right inline start, never mirrors, and does not consume a visible slot.
   a. Caption “maxVisible=3 · [حذف، أرشفة، إلغاء، حفظ (filled)]”. Visible, in RTL reading order: “أرشفة”، “إلغاء”، “حفظ”. Put “حذف” alone in the open menu. Show the trigger.
   b. Caption “maxVisible=3 · [المستندات (href)، حذف، إلغاء، حفظ (filled)]”. Visible: outlined link action “المستندات”، “إلغاء”، filled “حفظ”. Put “حذف” alone in the open menu. Show the trigger. Mark Docs “href · ظاهر”. Never show four visible actions.
   c. Caption “maxVisible=1 · [المستندات (href)، إلغاء، حفظ (filled)]”. Visible: “المستندات” and filled “حفظ” only because both are always-visible. Put “إلغاء” alone in the open menu. Show the trigger and a compact “تحذير · 2 دائمَا الظهور > 1” note. Never show Cancel as a visible Button.
   d. Caption “maxVisible=1 · [المستندات (href)، مساعدة (href)، حفظ (submit, filled)]”. Show all three Buttons “المستندات”، “مساعدة”، and filled “حفظ”; show no overflow trigger and no menu because every child is always-visible. Add “تحذير · 3 دائمَا الظهور > 1”.

Add a compact RTL token legend with swatches and measurement callouts adjacent to the styled parts: page #0A0A0A; frame #141414 / #404040 1px; menu #292929 / #404040 1px; filled #607D9F / #0A0A0A; outlined transparent #54545400 / #545454 1px / #F7F7F7; group gap 8px; radius 8px. Use Arabic action strings exactly, connected letters, and right-aligned RTL text. Keep filled primary actions at inline end, which is left in RTL. Draw no group-level fill, border, or state. No shadows, gradients, glow, photos, device frames, logos, decorations, watermarks, or invented interaction states.
```

## Checks

| Image | Result |
|---|---|
| `button-group-light-en.jpg` | ⚠ Matches the light tokens, English strings, clearly separated `start` / `center` / `end`, sm/md/lg sizes, normal-height vertical and ignored vertical `align="fill"`, and all four overflow-counting outcomes without extra visible actions. After two retries, the horizontal `fill` pair spans its row but remains slightly unequal in rendered width; the plan requires exact equal shares. |
| `button-group-dark-ar.jpg` | ⚠ Matches the dark tokens, connected Arabic action labels, RTL mirroring (`end` left, `start` right), non-mirrored `more_horiz`, sm/md/lg sizes, normal-height vertical and ignored vertical `align="fill"`, and the four overflow menu outcomes without extra visible actions. After two retries, the horizontal `fill` pair remains slightly unequal; mixed Arabic/English captions retain minor glyph/order artifacts, and the `maxVisible=1` Docs/Cancel/Save warning renders `3` instead of `2`. |

## Questions

None. All displayed token values resolved; the ⚠ items are generated-image differences, not plan questions.
