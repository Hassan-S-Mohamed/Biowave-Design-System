# Chip web preview — plan 1.0

These images are planning sketches. `chip.md` remains the source of truth. The undefined `status` variant is intentionally omitted.

## Token sheet

| Token / rendered property | Value (light / English) | Value (dark / Arabic) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-background-transparent` | `#54545400` | `#54545400` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-background-neutral-disabled` | `#EDEDED` | `#292929` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-background-success-subtle` | `#E9F7EF` | `#0E3921` |
| `color-background-warning-subtle` | `#FFF3E8` | `#773F12` |
| `color-background-error-subtle` | `#FEF0EE` | `#721212` |
| `color-background-info-subtle` | `#EEF4FF` | `#0E265F` |
| `color-border-default` | `#DBDBDB` | `#404040` |
| `color-border-disabled` | `#DBDBDB` | `#404040` |
| `color-border-brand` | `#607D9F` | `#254471` |
| `color-border-focus` | `#254471` | `#90A3BC` |
| `color-overlay-hover` | `#5454541A` | `#54545466` |
| `color-overlay-pressed` | `#54545433` | `#54545499` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-disabled` | `#969696` | `#545454` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-text-role-success` | `#1E6D41` | `#8DD4AE` |
| `color-text-role-warning` | `#A85A1A` | `#FFC88F` |
| `color-text-role-error` | `#D42222` | `#FEA3A3` |
| `color-text-role-info` | `#1D48AD` | `#9CBCF2` |
| `color-icon-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-icon-neutral-disabled` | `#969696` | `#545454` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-icon-role-success` | `#268751` | `#8DD4AE` |
| `color-icon-role-warning` | `#D97424` | `#FFC88F` |
| `color-icon-role-error` | `#FF2B2B` | `#FEA3A3` |
| `color-icon-role-info` | `#2559D4` | `#9CBCF2` |
| `size-control-height-sm` | `32px` | `32px` |
| `size-control-height-md` | `40px` | `40px` |
| `spacing-control-padding-inline-sm` | `8px` | `8px` |
| `spacing-control-padding-inline-md` | `12px` | `12px` |
| `spacing-control-gap-sm` | `4px` | `4px` |
| `spacing-control-gap-md` | `6px` | `6px` |
| `spacing-xs` | `4px` | `4px` |
| `spacing-sm` | `6px` | `6px` |
| `radius-md` | `8px` | `8px` |
| `radius-full` | `9999px` (rendered as pill) | `9999px` (rendered as pill) |
| `border-width-default` | `1px` | `1px` |
| `border-width-focus` | `2px` | `2px` |
| `border-focus-offset` | `2px` | `2px` |
| `size-icon-sm` | `16px` | `16px` |
| `size-icon-md` | `20px` | `20px` |
| `size-icon-lg` | `24px` | `24px` |
| `target-min` (web) | `24px` | `24px` |
| `label-md` size / line-height | `13px / 18px` | `13px / 20px` |
| `label-lg` size / line-height | `14px / 20px` | `14px / 22px` |
| label font family | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| `font-weight-label` / letter spacing | `500 / 0px` | `500 / 0px` |
| leading avatar neutral palette | ⚠ unresolved from the allowed Chip inputs; rendered as `#EDEDED` / `#0A0A0A` | ⚠ unresolved from the allowed Chip inputs; rendered as `#292929` / `#F7F7F7` |
| remove-button text-neutral palette | ⚠ unresolved from the allowed Chip inputs; rendered with neutral icon, explicit overlay, focus and disabled values above | ⚠ unresolved from the allowed Chip inputs; rendered with neutral icon, explicit overlay, focus and disabled values above |

## Prompt — `chip-light-en.jpg`

```text
Use case: ui-mockup
Asset type: design-system component preview specification sheet
Primary request: Draw a flat, production-quality UI spec sheet for the Biowave web Chip component, plan 1.0, LIGHT theme, English, left-to-right. This is a validation sketch, not a marketing image.
Canvas: 1600 px wide maximum, landscape, solid page background #F7F7F7, no shadows. Use a clean grid with generous whitespace and crisp 1 px rules. Title exactly "Chip · Web · Light · English".
Layout: Top section "Interactive" is a grid with columns exactly "Default", "Hover", "Pressed", "Focus", "Disabled". Rows exactly "Assist · sm", "Assist · md", "Filter off · sm", "Filter off · md", "Filter on · sm", "Filter on · md", "Input · sm", "Input · md". Every cell contains one chip. Bottom section "Tag · Default only" has seven labeled color rows exactly "Neutral", "Brand", "Secondary", "Success", "Warning", "Error", "Info" and two columns exactly "sm" and "md". Do not draw a status variant.
Exact component content: Assist uses a leading note/add glyph and "Add note". Filter off uses "Remote" and no check. Filter on uses a non-directional check at inline start and "Remote". Input uses a leading circular avatar "SA", label "Sara Ali", and a circular close/remove button at inline end. Tag chips alternate only "Full time" and "Contractor", may use a leading non-directional tag glyph, and are fully rounded, filled, and borderless.
Exact dimensions: sm height 32 px, inline padding 8 px, gap 4 px, glyph 16 px, label 13 px / 18 px; md height 40 px, inline padding 12 px, gap 6 px, glyph 20 px, label 14 px / 20 px. Interactive radius 8 px and border 1 px. Tag radius full/pill. Input avatar/remove box 24 px in sm and 32 px in md; remove glyph 16 px in sm and 20 px in md; avatar/remove inset 4 px. Minimum pointer target 24 px. English label font Inter with system-ui fallbacks, weight 500, letter-spacing 0 px.
Interactive colors: transparent #54545400; normal outline #DBDBDB; label #0A0A0A; assist icon #292929; hover overlay #5454541A; pressed overlay #54545433; focus ring #254471 at 2 px with 2 px offset; disabled outline #DBDBDB and label/icons #969696; selected-disabled fill #EDEDED. Selected filter fill #E8ECF2, outline #607D9F, label #132843, check #193351. Input uses neutral avatar #EDEDED / #0A0A0A and remove icon #0A0A0A; input hover/pressed/focus affect only the remove button.
Tag colors: Neutral #EDEDED / #0A0A0A; Brand #E8ECF2 / label #132843 / icon #193351; Secondary #E8F4F8 / #094E65 / #0C5F79; Success #E9F7EF / #1E6D41 / #268751; Warning #FFF3E8 / #A85A1A / #D97424; Error #FEF0EE / #D42222 / #FF2B2B; Info #EEF4FF / #1D48AD / #2559D4.
Token annotation: show a compact readable legend associating every hex, px, radius, and font value with the styled part. Use exact values and spellings.
Constraints: all 54 required specimens; exact row/column counts and English strings; LTR leading items left and remove button right; check and close do not mirror; no status chips or extra variants/states.
Never draw: shadows, gradients, glow, photos, device frames, logos, browser chrome, decorations, texture, 3D, or watermark.
```

## Prompt — `chip-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: exact design-system component specification sheet
Primary request: Create a dark Arabic RTL web Chip component spec sheet. Flat vector-like UI only. All values and strings must be exact.
Canvas: 1600 px maximum landscape, solid #0A0A0A background. Title at top-right exactly "Chip · Web · Dark · العربية". No shadows, gradients, highlights, glow, texture, photos, device frame, logo, decoration, browser chrome, or watermark.
Interactive grid: RTL table, row caption at far right, then five state columns ordered right-to-left: "افتراضي", "تحويم", "ضغط", "تركيز", "معطّل". Eight rows exactly: "مساعدة · sm", "مساعدة · md", "مرشح غير محدد · sm", "مرشح غير محدد · md", "مرشح محدد · sm", "مرشح محدد · md", "إدخال · sm", "إدخال · md".
Assist content exactly "إضافة ملاحظة" with a leading non-directional add/note glyph on the right. Filter content exactly "عن بُعد"; unselected has no check and selected has a non-directional check on the right. Input content exactly "سارة علي"; circular avatar "س" on the right and circular close button on the left. Every Focus specimen shows #90A3BC at 2 px with 2 px offset around the assist/filter container or only the input remove button.
Interactive colors: transparent #54545400; border #404040; label #F7F7F7; assist icon #DBDBDB; hover #54545466; pressed #54545499; disabled border #404040 and label/icons #545454. Selected filter fill #071323, border #254471, label/check #90A3BC; selected-disabled fill #292929. Input avatar #292929 with "س" #F7F7F7; remove icon #F7F7F7; disabled avatar unchanged. All fills flat.
Tag grid: title "وسم · افتراضي فقط". Seven rows exactly "محايد", "علامة تجارية", "ثانوي", "نجاح", "تحذير", "خطأ", "معلومات"; columns sm and md. Exactly 14 tags alternating only "دوام كامل" and "متعاقد", tag icon on the right, fully rounded, no border. Flat colors: Neutral #292929 / #F7F7F7; Brand #071323 / #90A3BC; Secondary #032A37 / #90C3D5; Success #0E3921 / #8DD4AE; Warning #773F12 / #FFC88F; Error #721212 / #FEA3A3; Info #0E265F / #9CBCF2.
Exact dimensions, never swap sm and md: sm = 32 px height, 8 px padding, 4 px gap, 16 px icon/check, 13 px / 20 px label, 24 px avatar/remove, 16 px remove glyph. md = 40 px height, 12 px padding, 6 px gap, 20 px icon/check, 14 px / 22 px label, 32 px avatar/remove, 20 px remove glyph. Both = 8 px interactive radius, 1 px border, 4 px avatar/remove inset, 24 px minimum pointer target, full/pill tag radius, #90A3BC focus ring at 2 px with 2 px offset. Typography = IBM Plex Sans Arabic with Noto Sans Arabic fallback, weight 500, letter-spacing 0 px.
Token legend: print all color hex values and label their parts; exact hexadecimal spelling only.
Constraints: 54 specimens total (8×5 interactive plus 7×2 tags), correct Arabic shaping and RTL, all leading items on the right, input remove on the left, check and close do not mirror, no status or extra variant/state.
```

## Checks

| Image | Result |
|---|---|
| `chip-light-en.jpg` | ⚠ The 54-specimen matrix, LTR direction, sizes, states, labels, tags, and status omission match. Avatar and remove-button palettes are rendered with the neutral semantic values above because the Chip plan references Avatar/Icon button B3 without exposing their exact token mapping in the allowed preview inputs. |
| `chip-dark-ar.jpg` | ⚠ The 54-specimen matrix, RTL placement, sizes, focus targets, tags, Arabic layout, and status omission match. After two retries, some `sm` filter labels retain an extra middle dot and the in-image color legend has minor transcription/omission errors; the token sheet above is authoritative. Avatar/remove-button palette mapping is unresolved for the same reason as the light image. |

Both files are JPEG, 1536 × 1024, quality 85, and below the 1600 px maximum width.

## Questions

- What are the exact semantic token names used by Avatar B3 `neutral` and Icon button B3 `text · neutral`? They are referenced indirectly by Chip B3 but are not present in the allowed Chip preview inputs; the images use the closest explicit neutral semantic values and mark the result ⚠.
