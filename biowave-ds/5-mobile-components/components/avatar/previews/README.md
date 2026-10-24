# Avatar mobile previews

Planning sketches for Avatar 1.0 on Flutter Material 3 mobile. The component plan remains the source of truth.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-default` | `#FFFFFF` | `#141414` |
| `color-text-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-text-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-background-success-default` | `#1E6D41` | `#55BE87` |
| `color-text-on-success` | `#FFFFFF` | `#0A0A0A` |
| `color-background-error-default` | `#D42222` | `#FF7676` |
| `color-text-on-error` | `#FFFFFF` | `#0A0A0A` |
| `size-control-height-sm` | `32dp` | `32dp` |
| `size-control-height-md` | `40dp` | `40dp` |
| `size-control-height-lg` | `48dp` | `48dp` |
| `size-control-height-xl` | `56dp` | `56dp` |
| `size-icon-sm` | `16dp` | `16dp` |
| `size-icon-md` | `20dp` | `20dp` |
| `size-icon-lg` | `24dp` | `24dp` |
| `size-icon-xl` | `32dp` | `32dp` |
| `radius-full` | `9999dp` | `9999dp` |
| `radius-sm` | `6dp` | `6dp` |
| `radius-md` | `8dp` | `8dp` |
| `radius-lg` | `10dp` | `10dp` |
| `radius-xl` | `12dp` | `12dp` |
| `target-min` | `48dp` | `48dp` |
| `label-sm` initials | Inter/system stack · `12/16dp` · `500` | IBM Plex Sans Arabic/Noto Sans Arabic stack · `12/18dp` · `500` |
| `label-lg` initials | Inter/system stack · `16/24dp` · `500` | IBM Plex Sans Arabic/Noto Sans Arabic stack · `16/26dp` · `500` |
| `title-lg` initials | Inter/system stack · `18/28dp` · `500` | IBM Plex Sans Arabic/Noto Sans Arabic stack · `18/30dp` · `500` |
| `heading-sm` initials | Inter/system stack · `20/28dp` · `600` | IBM Plex Sans Arabic/Noto Sans Arabic stack · `20/30dp` · `600` |
| Badge geometry, offset, ring, and count colour | `unresolved` | `unresolved` |

The permitted Avatar inputs delegate Badge geometry and colours to Badge B2/B3 without including those values. Badge examples therefore check logical top-end placement and content only; their exact geometry, offset, ring and count colour are not authoritative.

## Prompt — `avatar-light-en.jpg`

```text
Use case: ui-mockup
Asset type: mobile component planning spec sheet
Primary request: Draw a precise flat UI specification sheet for the Biowave Avatar 1.0 component in Flutter Material 3 mobile, light theme, English LTR.
Canvas: landscape, no wider than 1600 px, solid #F7F7F7 page background. Use #0A0A0A for headings and captions and #EDEDED for hairline dividers. No device frame.
Layout: a clean grid with four clearly separated matrices. Matrix 1 is “Size × shape”: rows sm 32dp, md 40dp, lg 48dp, xl 56dp; columns circle and square. Circle radius is 9999dp. Square radii by row are 6dp, 8dp, 10dp, 12dp. Every cell shows centered “SA”. Add a faint dashed 48dp minimum parent touch-target box around the 32dp and 40dp noninteractive avatars; 48dp and 56dp need no extra box. Matrix 2 is “Colour × content”: rows neutral, brand, secondary; columns image, initials, person glyph. For neutral use background #EDEDED, initials #292929, glyph #292929. For brand use background #E8ECF2, initials #132843, glyph #193351. For secondary use background #E8F4F8, initials #094E65, glyph #0C5F79. Image cells show the same centered, natural head-and-shoulders portrait cropped with cover, no logo. Matrix 3 is “States”: columns Image, Loading, Image failed, Initials, Icon, With badge. Use one fixed 48dp lg circle in every state. Image shows the portrait; Loading and Image failed show fallback “SA” on neutral; Initials shows “SA”; Icon shows the Material Symbols Rounded person glyph at 24dp; With badge shows the avatar with a success dot at logical top-end. Add a tiny note: “fallback while loading and after error”. Matrix 4 is “Badge placement”: circle + dot, circle + count 5, square + dot, square + count 5, all 48dp; badge is at physical top-right because this sheet is LTR. Use success #1E6D41 for the dot with a white #FFFFFF ring; count text must be the exact digit “5”.
Exact text/content: “Sara Ali”, “SA”, “Omar Hassan”, “OH”, “Reception terminal”, “Online”. Place these as small content examples without inventing other names. Spell all text exactly.
Exact typography: Inter/system stack. Initials: sm 12px/16px weight 500; md 16px/24px weight 500; lg 18px/28px weight 500; xl 20px/28px weight 600. Person glyph sizes: 16, 20, 24, 32dp for sm, md, lg, xl.
Behavior cues: image is centered and cover-cropped, never stretched; loading and failed preserve size; exactly one of image, initials, or icon appears. The avatar itself is noninteractive and never has hover, pressed, disabled, or focus styling.
Constraints: crisp 2D component-spec rendering; captions above rows/columns; show every requested size, both shapes, all three colours, all content types, loading, failed, dot and count badges; no shadows, gradients, glow, decoration, watermark, product logo, or phone frame; no extra states or controls.
```

Targeted retry: changed only the secondary row token label from `#E9F4F8` to the resolved `#E8F4F8`; the rest of the generated sheet was preserved.

## Prompt — `avatar-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: mobile component planning spec sheet
Primary request: Draw a precise flat UI specification sheet for the Biowave Avatar 1.0 component in Flutter Material 3 mobile, dark theme, Arabic RTL.
Canvas: landscape, no wider than 1600 px, solid #0A0A0A page background. Use #F7F7F7 for headings and captions and #292929 for hairline dividers. No device frame.
Layout: mirror the whole reading flow right-to-left. Use a clean grid with four clearly separated matrices. Matrix 1 is size × shape: rows sm 32dp, md 40dp, lg 48dp, xl 56dp; circle and square columns ordered RTL. Circle radius is 9999dp. Square radii by row are 6dp, 8dp, 10dp, 12dp. Every cell shows the single Arabic initial “س”. Add a faint dashed 48dp minimum parent touch-target box around the 32dp and 40dp noninteractive avatars; 48dp and 56dp need no extra box. Matrix 2 is colour × content: rows neutral, brand, secondary; columns image, initials, person glyph, ordered RTL. For neutral use background #292929, initials #DBDBDB, glyph #DBDBDB. For brand use background #071323, initials #90A3BC, glyph #90A3BC. For secondary use background #032A37, initials #90C3D5, glyph #90C3D5. Image cells show the same centered, natural head-and-shoulders portrait cropped with cover, no logo. Matrix 3 is states, ordered RTL: image, loading, image failed, initials, icon, with badge. Use one fixed 48dp lg circle in every state. Image shows the portrait; loading and image failed show fallback “س” on neutral; initials shows “س”; icon shows the Material Symbols Rounded person glyph at 24dp; with badge shows the avatar with a success dot at logical top-end. Matrix 4 is badge placement: circle + dot, circle + count 5, square + dot, square + count 5, all 48dp; every badge is at physical top-left because logical top-end mirrors in RTL. Use success #55BE87 for the dot with a #0A0A0A ring; count text must be the exact digit “5”.
Exact Arabic text/content, rendered verbatim and right-to-left: “سارة علي”, “س”, “عمر حسن”, “ع”, “جهاز الاستقبال”, “متصل”. Do not join “س” to another letter. Technical token labels such as sm, md, lg, xl may remain Latin. No other person names.
Exact typography: IBM Plex Sans Arabic/Noto Sans Arabic stack. Initials: sm 12px/18px weight 500; md 16px/26px weight 500; lg 18px/30px weight 500; xl 20px/30px weight 600. Person glyph sizes: 16, 20, 24, 32dp for sm, md, lg, xl.
Behavior cues: image is centered and cover-cropped, never stretched; loading and failed preserve size; exactly one of image, initials, or icon appears. The avatar itself is noninteractive and never has hover, pressed, disabled, or focus styling. Image, initials, and person glyph do not mirror; only badge placement and reading order mirror.
Constraints: crisp 2D component-spec rendering; Arabic captions and RTL flow; show every requested size, both shapes, all three colours, all content types, loading, failed, dot and count badges; no shadows, gradients, glow, decoration, watermark, product logo, or phone frame; no extra states or controls.
```

## Checks

- `avatar-light-en.jpg`: ⚠ 1536 × 1024 JPEG (quality 85); visually matches the light/LTR size × shape, colour × content, state, loading/failed fallback, 48dp touch-target and logical top-end badge-placement requirements. The corrected colour labels match the token sheet. The raster omits the supplementary A6 name/label examples and most inline typography/icon-size annotations; generated pixels and the Badge-owned geometry/count colour are schematic rather than mechanically exact.
- `avatar-dark-ar.jpg`: ⚠ 1536 × 1024 JPEG (quality 85); visually matches the dark/RTL matrices, uses the one-letter Arabic initial `س`, preserves the non-directional image/person glyph, and moves count/dot badges to physical top-left. The raster omits the supplementary A6 Arabic name/label examples plus inline radius, typography and icon-size annotations; generated pixels and the Badge-owned geometry/count colour are schematic rather than mechanically exact.

## Questions

- Exact Badge geometry, offset, ring and count colour are unresolved from the permitted Avatar inputs; the previews treat those badge details as schematic while preserving the specified content and logical top-end placement.
