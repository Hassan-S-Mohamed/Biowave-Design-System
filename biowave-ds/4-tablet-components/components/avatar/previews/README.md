# Avatar tablet previews

Plan 1.0 review sketches generated with the built-in image tool. The plan remains the source of truth. There is no `avatar.tokens.json`; Avatar uses resolved Foundations semantic tokens directly.

## Token sheet

| Token | Value (light / English) | Value (dark / Arabic) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-text-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-background-brand-default` | `#193351` | `#607D9F` |
| `color-text-on-brand` | `#FFFFFF` | `#0A0A0A` |
| `color-background-success-default` | `#1E6D41` | `#55BE87` |
| `font-family-en` / `font-family-ar` | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif` |
| `size-control-height-sm` | `32 dp` | `32 dp` |
| `size-control-height-md` | `40 dp` | `40 dp` |
| `size-control-height-lg` | `48 dp` | `48 dp` |
| `size-control-height-xl` | `56 dp` | `56 dp` |
| `radius-full` | `9999 dp` | `9999 dp` |
| `radius-sm` | `6 dp` | `6 dp` |
| `radius-md` | `8 dp` | `8 dp` |
| `radius-lg` | `10 dp` | `10 dp` |
| `radius-xl` | `12 dp` | `12 dp` |
| `size-icon-sm` | `16 dp` | `16 dp` |
| `size-icon-md` | `20 dp` | `20 dp` |
| `size-icon-lg` | `24 dp` | `24 dp` |
| `size-icon-xl` | `32 dp` | `32 dp` |
| `label-sm` initials | `Inter 12/18, 500, tracking 0` | `IBM Plex Sans Arabic 12/20, 500, tracking 0` |
| `label-lg` initials | `Inter 16/24, 500, tracking 0` | `IBM Plex Sans Arabic 16/26, 500, tracking 0` |
| `title-lg` initials | `Inter 18/26, 500, tracking 0` | `IBM Plex Sans Arabic 18/28, 500, tracking 0` |
| `heading-sm` initials | `Inter 18/26, 600, tracking 0` | `IBM Plex Sans Arabic 18/28, 600, tracking 0` |
| `target-min` (tablet parent target) | `48 dp` | `48 dp` |

`color-background-brand-default` + `color-text-on-brand` are an explicit `brand` choice for the count-badge example, not an Avatar default. `color-background-success-default` is the explicit `success` dot choice described by A4.

## Prompt — `avatar-light-en.jpg`

```text
Use case: ui-mockup
Asset type: tablet design-system component spec sheet
Primary request: Create one polished, flat, landscape UI specification sheet for the Biowave Avatar component in LIGHT theme, English, left-to-right. This is a human review sketch for a Flutter Material 3 tablet component, not a device mockup.

Canvas: flat #F7F7F7 background, landscape, no more than 1600 px wide. Use #0A0A0A for all headings, captions, measurement labels, and callouts. Use Inter, with clean readable typography. No outer device frame.

Layout: generous whitespace and three precise grids, aligned left-to-right. Put a small exact caption above every row and column. Do not add any samples beyond these grids.

GRID 1 — “SIZE × SHAPE”
Rows: “sm · 32 dp”, “md · 40 dp”, “lg · 48 dp”, “xl · 56 dp”.
Columns: “Circle”, “Square”.
Show eight avatars total, one in every row/column cell. Every avatar contains the exact initials “SA”.
Circle avatars are perfectly circular with radius-full = 9999 dp.
Square radii by row: sm 6 dp, md 8 dp, lg 10 dp, xl 12 dp.
Initials typography by row: sm Inter 12 px / 18 px line height / 500; md Inter 16 / 24 / 500; lg Inter 18 / 26 / 500; xl Inter 18 / 26 / 600.
Show each exact measurement immediately beside its avatar, including the icon-size companion value: sm 16 dp, md 20 dp, lg 24 dp, xl 32 dp.
Use neutral fallback colors: background #EDEDED, initials #292929.
Keep at least a 48 dp parent-cell rhythm around each sample; the avatar itself stays at its exact 32/40/48/56 dp size.

GRID 2 — “COLOR × CONTENT”
Rows: “Neutral”, “Brand”, “Secondary”.
Columns: “Image”, “Initials”, “Person”.
Use lg 48 dp circle avatars for all nine cells.
Image column: repeat the same tasteful, neutral, tightly cropped adult head-and-shoulders portrait, centered and cover-cropped, no logo.
Initials column: exact “SA”, Inter 18/26/500.
Person column: Material Symbols Rounded “person” glyph at exactly 24 dp, centered; it is non-directional.
Neutral fallback: background #EDEDED; initials #292929; icon #292929.
Brand fallback: background #E8ECF2; initials #132843; icon #193351.
Secondary fallback: background #E8F4F8; initials #094E65; icon #0C5F79.
Write those exact hex values as small callouts next to the related row.

GRID 3 — “STATES & BADGES”
Columns: “Image”, “Loading”, “Image failed”, “Count badge”, “Dot badge”.
Show one lg 48 dp sample per column.
Image: the same centered cover-cropped portrait.
Loading: exact “SA” fallback on brand colors #E8ECF2 / #132843.
Image failed: exact “SA” fallback on secondary colors #E8F4F8 / #094E65.
Count badge: circle avatar with exact “SA”; a compact badge reading exact “5” on the top-end corner, which is top-right in this LTR sheet. Use explicit brand badge colors #193351 background and #FFFFFF text, fully rounded. Badge geometry is schematic, but placement must visibly overlap the top-end edge.
Dot badge: square avatar with exact “SA”; a compact success dot on the top-end corner, top-right. Use #1E6D41. Badge geometry is schematic, but placement must visibly overlap the top-end edge. Add exact visible label “Online” beneath it.
Add a small note beside this grid: “Loading and image failed keep the same size and show fallback.”

Text (verbatim): “Avatar · Tablet · Light / EN”, “SIZE × SHAPE”, “COLOR × CONTENT”, “STATES & BADGES”, “sm · 32 dp”, “md · 40 dp”, “lg · 48 dp”, “xl · 56 dp”, “Circle”, “Square”, “Neutral”, “Brand”, “Secondary”, “Image”, “Initials”, “Person”, “Loading”, “Image failed”, “Count badge”, “Dot badge”, “SA”, “5”, “Online”, “Loading and image failed keep the same size and show fallback.”

Style/medium: clean shippable UI component documentation, flat vector-like rendering, exact circles and rounded rectangles, crisp spacing.
Constraints: exact text spelling and capitalization; all eight size/shape combinations, all three colors, image/initials/person content, loading, failed fallback, count badge, and dot badge must be visible. No gradients, shadows, glow, decorative illustration, logo, watermark, browser chrome, or device frame. Do not invent hover, focus, pressed, or disabled states.
```

## Prompt — `avatar-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: tablet design-system component spec sheet
Primary request: Create one polished, flat, landscape UI specification sheet for the Biowave Avatar component in DARK theme, Arabic, fully right-to-left. This is a human review sketch for a Flutter Material 3 tablet component, not a device mockup.

Canvas: flat #0A0A0A background, landscape, no more than 1600 px wide. Use #F7F7F7 for all headings, captions, measurement labels, and callouts. Use IBM Plex Sans Arabic with correct joined Arabic shaping and crisp readable typography. No outer device frame.

RTL layout: mirror the entire English/LTR sheet. Place the first grid at the RIGHT, second in the CENTER, third at the LEFT. Align headings and row captions to the right. Within every grid, reading order is right-to-left. Top-end badge placement is TOP-LEFT. The portrait and the non-directional person glyph do not mirror.

Layout: generous whitespace and three precise grids. Put a small exact caption above every row and column. Do not add any samples beyond these grids.

GRID 1 at RIGHT — “الحجم × الشكل”
Rows from top to bottom: “sm · 32 dp”, “md · 40 dp”, “lg · 48 dp”, “xl · 56 dp”.
Columns in RTL reading order: “دائري”, “مربع”.
Show eight avatars total, one in every row/column cell. Every avatar contains the exact single Arabic letter “س”.
Circle avatars are perfectly circular with radius-full = 9999 dp.
Square radii by row: sm 6 dp, md 8 dp, lg 10 dp, xl 12 dp.
Initials typography by row: sm IBM Plex Sans Arabic 12 px / 20 px line height / 500; md 16 / 26 / 500; lg 18 / 28 / 500; xl 18 / 28 / 600.
Show each exact measurement immediately beside its avatar, including icon-size companion value: sm 16 dp, md 20 dp, lg 24 dp, xl 32 dp.
Use neutral fallback colors: background #292929, initials #DBDBDB.
Keep at least a 48 dp parent-cell rhythm around each sample; the avatar itself stays at its exact 32/40/48/56 dp size.

GRID 2 at CENTER — “اللون × المحتوى”
Rows: “محايد”, “علامة”, “ثانوي”.
Columns in RTL reading order: “صورة”, “الحرف”, “شخص”.
Use lg 48 dp circle avatars for all nine cells.
Image column: repeat the same tasteful, neutral, tightly cropped adult head-and-shoulders portrait, centered and cover-cropped, no logo.
Initials column: exact Arabic letter “س”, IBM Plex Sans Arabic 18/28/500.
Person column: Material Symbols Rounded “person” glyph at exactly 24 dp, centered; it is non-directional and must not flip.
Neutral fallback: background #292929; initials #DBDBDB; icon #DBDBDB.
Brand fallback: background #071323; initials #90A3BC; icon #90A3BC.
Secondary fallback: background #032A37; initials #90C3D5; icon #90C3D5.
Write those exact hex values as small right-aligned callouts beside the related row.

GRID 3 at LEFT — “الحالات والشارات”
Columns in RTL reading order: “صورة”, “جارٍ التحميل”, “فشل الصورة”, “شارة عدد”, “شارة نقطة”.
Show one lg 48 dp sample per column.
Image: the same centered cover-cropped portrait.
Loading: exact Arabic letter “س” fallback on brand colors #071323 / #90A3BC.
Image failed: exact Arabic letter “س” fallback on secondary colors #032A37 / #90C3D5.
Count badge: circle avatar with exact “س”; a compact badge reading exact “5” on the top-end corner, which is top-left in this RTL sheet. Use explicit brand badge colors #607D9F background and #0A0A0A text, fully rounded. Badge geometry is schematic, but placement must visibly overlap the top-left edge.
Dot badge: square avatar with exact “س”; a compact success dot on the top-end corner, top-left. Use #55BE87. Badge geometry is schematic, but placement must visibly overlap the top-left edge. Add the exact Arabic label “متصل” beneath it.
Add a small right-aligned Arabic note beside this grid: “يحافظ التحميل وفشل الصورة على الحجم نفسه ويعرضان البديل.”

Text (verbatim): “الصورة الرمزية · جهاز لوحي · داكن / AR”, “الحجم × الشكل”, “اللون × المحتوى”, “الحالات والشارات”, “sm · 32 dp”, “md · 40 dp”, “lg · 48 dp”, “xl · 56 dp”, “دائري”, “مربع”, “محايد”, “علامة”, “ثانوي”, “صورة”, “الحرف”, “شخص”, “جارٍ التحميل”, “فشل الصورة”, “شارة عدد”, “شارة نقطة”, “س”, “5”, “متصل”, “يحافظ التحميل وفشل الصورة على الحجم نفسه ويعرضان البديل.”

Style/medium: clean shippable UI component documentation, flat vector-like rendering, exact circles and rounded rectangles, crisp spacing.
Constraints: exact Arabic spelling, joined letter shaping, and right-to-left direction; all eight size/shape combinations, all three colors, image/initials/person content, loading, failed fallback, count badge, and dot badge must be visible. No gradients, shadows, glow, decorative illustration, logo, watermark, browser chrome, or device frame. Do not invent hover, focus, pressed, or disabled states.
```

The dark/Arabic image received one targeted retry that added the omitted type and radius callouts to the size grid without changing the other grids.

## Checks

### `avatar-light-en.jpg`

- ✓ 1600 × 800 JPEG, quality 85.
- ✓ Shows all four sizes × both shapes, all three colours, image / `SA` / person content, loading and image-failed fallbacks, and count / success-dot badges.
- ✓ English strings are spelled correctly; the count and dot badges use LTR top-end (top-right).
- ⚠ The generated bitmap prints the exact token values, but the physical dp scale, font-family match, flat-fill colours, and tiny radii cannot be guaranteed pixel-exact by image generation.
- ⚠ Badge size, offset, and ring are schematic because Badge B2/B3 values were not included in the allowed Avatar preview inputs.

### `avatar-dark-ar.jpg`

- ✓ 1600 × 640 JPEG, quality 85.
- ✓ Shows the same option/state coverage as the light sheet; Arabic text is joined and readable, content uses `س` and `متصل`, and the full composition is RTL.
- ✓ Both badges use RTL top-end (top-left); image and person glyph remain non-directional.
- ✓ The retry restored the four Arabic type-metric and radius callouts.
- ⚠ The generated bitmap prints the exact token values, but the physical dp scale, font-family match, flat-fill colours, and tiny radii cannot be guaranteed pixel-exact by image generation.
- ⚠ Badge size, offset, and ring are schematic because Badge B2/B3 values were not included in the allowed Avatar preview inputs.

## Questions

- What are the Badge B2/B3 size, offset, and ring tokens for the count and dot examples? Those values were outside this step's allowed inputs, so the preview deliberately does not claim exact badge geometry.
