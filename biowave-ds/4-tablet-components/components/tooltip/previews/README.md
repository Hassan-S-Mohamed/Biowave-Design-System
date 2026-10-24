# Tooltip tablet previews

Planning sketches for Tooltip 1.0 on Flutter Material 3 tablet. The plan remains the source of truth. There is no `tooltip.tokens.json`; every value below resolves from Foundations.

## Token sheet

| Token | Value (light / English) | Value (dark / Arabic) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` (staging anchors only) | `#FFFFFF` | `#141414` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-text-neutral-default` (sheet captions / labelled anchor) | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-muted` (sheet secondary captions) | `#707070` | `#BDBDBD` |
| `color-text-neutral-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-neutral-default` (staging anchors only) | `#0A0A0A` | `#F7F7F7` |
| `color-border-default` (staging anchors only) | `#DBDBDB` | `#404040` |
| `color-border-focus` (focused staging anchor only) | `#254471` | `#90A3BC` |
| `spacing-xs` | `4 px` | `4 px` |
| `spacing-md` | `8 px` | `8 px` |
| `radius-sm` | `6 px` | `6 px` |
| `radius-full` (circular staging anchor only) | `9999 px` | `9999 px` |
| `size-container-xxs` | `320 px` | `320 px` |
| `size-icon-md` (staging anchor only) | `20 px` | `20 px` |
| `target-min` (tablet) | `48 px` | `48 px` |
| `border-width-default` (staging anchor only) | `1 px` | `1 px` |
| `border-width-focus` (focused staging anchor only) | `2 px` | `2 px` |
| `border-focus-offset` (focused staging anchor only) | `2 px` | `2 px` |
| `font-family-en` / `font-family-ar` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| Tablet `label-sm` | `12 px / 18 px`, weight `500`, letter spacing `0 px` | `12 px / 20 px`, weight `500`, letter spacing `0 px` |
| Tablet `heading-sm` (sheet heading only) | `18 px / 26 px`, weight `600` | `18 px / 28 px`, weight `600` |

Tooltip layout uses `spacing-xs` for 4 px block padding and the 4 px anchor offset, `spacing-md` for 8 px inline padding and the 8 px minimum screen-edge distance, `radius-sm` for the 6 px corner radius, and `size-container-xxs` for the 320 px maximum width. The anchor visuals are contextual staging, not Tooltip styling.

## Prompt — `tooltip-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat UI component specification sheet for a design-system planning preview
Primary request: draw the Flutter Material 3 tablet Tooltip from plan 1.0 in light theme and English, showing every planned placement, purpose, trigger, and state around tablet controls.
Canvas: flat 4:3 landscape UI spec sheet, at most 1600 px wide, solid #F7F7F7 background. No device frame.
Style/medium: crisp flat vector-like product UI, orthographic, exact geometric measurements, generous whitespace; not concept art.
Typography: use Inter. Sheet heading uses 18 px / 26 px, weight 600. All tooltip labels use 12 px / 18 px, weight 500, letter spacing 0 px. Sheet captions may use the same 12 px style.
Layout: three clean grids with small captions above rows and columns. First grid is PLACEMENT with four columns TOP, BOTTOM, START, END; each cell shows a visible tooltip centered on the anchor cross-axis. In LTR, START is left of the anchor and END is right. Second grid is PURPOSE / TRIGGER with LABEL, DESCRIPTION, LONG-PRESS, TAP. LABEL shows an icon-only circular Edit button and tooltip "Edit device". DESCRIPTION shows a visibly labelled control "Hours" and tooltip "Shows the hours worked this week.". LONG-PRESS and TAP show their respective touch trigger captions. Include one separate LONG TEXT / MAX WIDTH specimen using exactly "We send shift reminders to this address." forced to two lines inside a container measured exactly 320 px wide. Third grid is STATES with five columns HIDDEN, SHOWN — HOVER, SHOWN — KEYBOARD FOCUS, SHOWN — TOUCH, DISMISSED. Hidden and Dismissed show only the anchor; the three Shown cells display the tooltip. Keyboard focus adds a focus ring to the anchor only.
Tooltip container exact values: #141414 background; #FFFFFF text; 4 px block padding; 8 px inline padding; 6 px radius; hug text up to exactly 320 px maximum; no border; no shadow; no arrow. Keep exactly 4 px between tooltip and anchor. Keep at least 8 px from sheet edges. Text is start-aligned, wraps, and is never truncated.
Staging anchor exact values: circular Icon button has a 48 px minimum touch target, #FFFFFF background, 1 px #DBDBDB border, 9999 px radius, and centered 20 px pencil icon in #0A0A0A. The visibly labelled control uses the same staging colors and 48 px minimum height. Keyboard-focus ring is 2 px #254471 with 2 px offset.
Exact callouts: next to the tooltip part, print "background #141414", "text #FFFFFF", "padding 4 px / 8 px", "radius 6 px", "max width 320 px", and "offset 4 px". Next to the anchor part, print "target min 48 px", "icon 20 px", and for the focus specimen "focus 2 px + 2 px offset". Use thin #DBDBDB measurement lines and #707070 secondary captions; primary sheet text is #0A0A0A.
Text (verbatim): "Tooltip · Tablet · Light / English", "PLACEMENT", "TOP", "BOTTOM", "START", "END", "PURPOSE / TRIGGER", "LABEL", "DESCRIPTION", "LONG-PRESS", "TAP", "LONG TEXT / MAX WIDTH", "STATES", "HIDDEN", "SHOWN — HOVER", "SHOWN — KEYBOARD FOCUS", "SHOWN — TOUCH", "DISMISSED", "Edit device", "Hours", "Shows the hours worked this week.", "We send shift reminders to this address.", "background #141414", "text #FFFFFF", "padding 4 px / 8 px", "radius 6 px", "max width 320 px", "offset 4 px", "target min 48 px", "icon 20 px", "focus 2 px + 2 px offset".
Constraints: render every listed string verbatim and exactly once where practical; preserve clear LTR reading order; draw only one tooltip per anchor; tooltip never covers its anchor. No shadows, gradients, glow, photos, logos, decorations, watermark, tooltip arrows, extra controls, or extra copy. Pencil is non-directional and does not flip.
```

Check: ✓ matches — verified all four LTR placements, both purposes, both touch triggers, all five states, exact English component copy, the arrowless 4 px separation, 48 px tablet target callout, focus treatment, and the measured 320 px two-line specimen after two targeted retries.

## Prompt — `tooltip-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat UI component specification sheet for a design-system planning preview
Primary request: draw the Flutter Material 3 tablet Tooltip from plan 1.0 in dark theme with Arabic component copy and a right-to-left layout, showing every planned placement, purpose, trigger, and state around tablet controls.
Canvas: flat 4:3 landscape UI spec sheet, at most 1600 px wide, solid #0A0A0A background. No device frame.
Style/medium: crisp flat vector-like product UI, orthographic, exact geometric measurements, generous whitespace; not concept art.
Typography: use IBM Plex Sans Arabic for Arabic. Sheet heading uses 18 px / 28 px, weight 600. All Arabic tooltip labels use 12 px / 20 px, weight 500, letter spacing 0 px. Technical sheet captions may remain concise English in the same 12 px style so the exact Arabic tooltip copy stays unambiguous.
Direction: the whole component layout is RTL. Arabic tooltip text is right-aligned at its logical start. TOP and BOTTOM remain unchanged. For logical placement, START is right of the anchor in RTL and END is left of the anchor. The pencil icon is non-directional and never flips.
Layout: three clean grids with small captions above rows and columns. First grid is PLACEMENT with four columns TOP, BOTTOM, START, END; each cell shows a visible tooltip centered on the anchor cross-axis and applies the RTL side mapping above. Second grid is PURPOSE / TRIGGER with LABEL, DESCRIPTION, LONG-PRESS, TAP. LABEL shows an icon-only circular Edit button and tooltip "تعديل الجهاز". DESCRIPTION shows a visibly labelled control "الساعات" and tooltip "يعرض ساعات العمل لهذا الأسبوع.". LONG-PRESS and TAP show their respective touch trigger captions. Include one separate LONG TEXT / MAX WIDTH specimen using exactly "نرسل تذكيرات المناوبات إلى هذا العنوان." on two lines inside a container measured exactly 320 px wide. Third grid is STATES with five columns HIDDEN, SHOWN — HOVER, SHOWN — KEYBOARD FOCUS, SHOWN — TOUCH, DISMISSED. Hidden and Dismissed show only the anchor; the three Shown cells display the tooltip. Keyboard focus adds a focus ring to the anchor only.
Tooltip container exact values: #FFFFFF background; #0A0A0A text; 4 px block padding; 8 px inline padding; 6 px radius; hug text up to exactly 320 px maximum; no border; no shadow; no arrow. Keep exactly 4 px between tooltip and anchor. Keep at least 8 px from sheet edges. Text wraps and is never truncated.
Staging anchor exact values: circular Icon button has a 48 px minimum touch target, #141414 background, 1 px #404040 border, 9999 px radius, and centered 20 px pencil icon in #F7F7F7. The visibly labelled control uses the same staging colors and 48 px minimum height. Keyboard-focus ring is 2 px #90A3BC with 2 px offset.
Exact callouts: next to the tooltip part, print "background #FFFFFF", "text #0A0A0A", "padding 4 px / 8 px", "radius 6 px", "max width 320 px", and "offset 4 px". Next to the anchor part, print "target min 48 px", "icon 20 px", and for the focus specimen "focus 2 px + 2 px offset". Use thin #404040 measurement lines and #BDBDBD secondary captions; primary sheet text is #F7F7F7.
Text (verbatim): "Tooltip · Tablet · Dark / Arabic RTL", "PLACEMENT", "TOP", "BOTTOM", "START", "END", "PURPOSE / TRIGGER", "LABEL", "DESCRIPTION", "LONG-PRESS", "TAP", "LONG TEXT / MAX WIDTH", "STATES", "HIDDEN", "SHOWN — HOVER", "SHOWN — KEYBOARD FOCUS", "SHOWN — TOUCH", "DISMISSED", "تعديل الجهاز", "الساعات", "يعرض ساعات العمل لهذا الأسبوع.", "نرسل تذكيرات المناوبات إلى هذا العنوان.", "background #FFFFFF", "text #0A0A0A", "padding 4 px / 8 px", "radius 6 px", "max width 320 px", "offset 4 px", "target min 48 px", "icon 20 px", "focus 2 px + 2 px offset".
Constraints: render every listed string verbatim and exactly once where practical; preserve RTL reading order; draw only one tooltip per anchor; tooltip never covers its anchor. No shadows, gradients, glow, photos, logos, decorations, watermark, tooltip arrows, extra controls, or extra copy. Do not mirror the pencil icon.
```

Check: ✓ matches — verified exact Arabic component copy, right-aligned RTL text, START on the anchor's right and END on its left, unchanged top/bottom placement, both purposes and triggers, all five states, the arrowless 4 px separation, focus treatment, and the measured 320 px two-line specimen after one targeted retry.

## Questions

None.
