# Avatar web preview — plan 1.0

These two flat UI specification sheets are planning sketches. The source of truth remains `avatar.md`.

## Token sheet

| Token | Value (light) | Value (dark) |
|---|---:|---:|
| `color-background-base-default` | `#FFFFFF` | `#141414` |
| `color-text-neutral-default` (sheet headings) | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-subtle` (sheet notes; neutral initials) | `#292929` | `#DBDBDB` |
| `color-border-subtle` (sheet dividers) | `#EDEDED` | `#292929` |
| `color-background-neutral-default` | `#EDEDED` | `#292929` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-background-brand-subtle` | `#E8ECF2` | `#071323` |
| `color-text-role-brand` | `#132843` | `#90A3BC` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-background-secondary-subtle` | `#E8F4F8` | `#032A37` |
| `color-text-role-secondary` | `#094E65` | `#90C3D5` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `size-control-height-sm` | `32px` | `32px` |
| `size-control-height-md` | `40px` | `40px` |
| `size-control-height-lg` | `48px` | `48px` |
| `size-control-height-xl` | `56px` | `56px` |
| `radius-full` | `9999px` | `9999px` |
| `radius-sm` / `radius-md` / `radius-lg` / `radius-xl` | `6px` / `8px` / `10px` / `12px` | same |
| `size-icon-sm` / `size-icon-md` / `size-icon-lg` / `size-icon-xl` | `16px` / `20px` / `24px` / `32px` | same |
| `label-sm` initials (`sm`) | Inter, `12px/16px`, 500, tracking `0` | IBM Plex Sans Arabic, `12px/18px`, 500, tracking `0` |
| `label-lg` initials (`md`) | Inter, `14px/20px`, 500, tracking `0` | IBM Plex Sans Arabic, `14px/22px`, 500, tracking `0` |
| `title-lg` initials (`lg`) | Inter, `16px/24px`, 500, tracking `0` | IBM Plex Sans Arabic, `16px/26px`, 500, tracking `0` |
| `heading-sm` initials (`xl`) | Inter, `18px/24px`, 600, tracking `0` | IBM Plex Sans Arabic, `18px/26px`, 600, tracking `0` |
| `color-background-success-default` (success-dot preview) | `#1E6D41` | `#55BE87` |
| `color-background-error-default` / `color-text-on-error` (count preview) | `#D42222` / `#FFFFFF` | `#FF7676` / `#0A0A0A` |

The success and error rows are preview-only Badge swatches, not Avatar tokens. Avatar B3 delegates all indicator size, ring, and internal styling to Badge; those Badge-owned values are outside this step's allowed inputs.

## Prompt — `avatar-light-en.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component specification sheet
Primary request: Draw a precise flat UI spec sheet for the Biowave Avatar plan 1.0, light theme, English/LTR. This is a practical design review sheet, not concept art.

Canvas: 1536×1024 landscape, no more than 1600px wide. Solid page background #FFFFFF. Flat 2D UI only. Use #0A0A0A for headings, #292929 for notes, and #EDEDED for one-pixel section dividers. Use Inter for English annotations. Keep generous white space and crisp alignment.

Layout: three clean horizontal sections in one page.

Section 1, caption "Size × shape": a 4-row × 2-column grid. Row captions are exactly "sm · 32px", "md · 40px", "lg · 48px", "xl · 56px". Column captions are exactly "circle · radius 9999px" and "square · radius 6px / 8px / 10px / 12px". Each cell contains a neutral avatar with centered initials "SA". Avatar sizes are exactly 32, 40, 48, and 56px. Circle radius is 9999px. Square radii by row are exactly 6, 8, 10, and 12px. Neutral background #EDEDED and initials #292929. Initials typography by row: 12px/16px weight 500; 14px/20px weight 500; 16px/24px weight 500; 18px/24px weight 600. Write each exact size, radius, and text style beside its row.

Section 2, caption "Color × content": a 3-row × 3-column grid of md 40px circular avatars. Row captions exactly "neutral", "brand", "secondary". Column captions exactly "Image", "Initials", "Icon". Image cells contain the same friendly generic adult portrait, centered and cropped to fill, never stretched, with no border or overlay. Initials cells show exactly "SA". Icon cells show a clean Material Symbols Rounded-style person glyph at exactly 20px, never mirrored. Neutral: background #EDEDED, initials #292929, icon #292929. Brand: background #E8ECF2, initials #132843, icon #193351. Secondary: background #E8F4F8, initials #094E65, icon #0C5F79. Write the exact hex values beside each row.

Section 3, caption "States and badge placement": one row of md 40px avatars with column captions exactly "Image", "Loading", "Image failed", "Initials", "Icon", "Dot badge", "Count badge". Image shows the same cropped portrait. Loading and Image failed both show the fallback initials "SA" on neutral #EDEDED, visibly identical in Avatar appearance, with small state captions clarifying them. Initials shows "SA". Icon shows the 20px person glyph. Dot badge and Count badge use neutral initials avatars and place one badge centered over the top-end edge: top-right in LTR. Show each badge on both a circle and a rounded square mini-example. Dot uses success #1E6D41. Count shows exactly "5" using #D42222 with #FFFFFF text. Add the exact content examples "Sara Ali → SA", "Omar Hassan → OH", and "Online" near the section.

Exact behavior: all avatar containers are fixed squares, clip content, have no border, no shadow, no overlay, no hover or focus treatment. Images crop to fill and remain centered. Exactly one of image, initials, or person glyph is visible in each avatar. Badges do not change the avatar size.

Constraints: render all labels verbatim with no extra words. No gradients, glow, shadows, device frames, logos, decorative shapes, or watermark. Do not draw directional arrows. Do not add any Avatar option or state not listed above.
```

## Prompt — `avatar-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: web design-system component specification sheet
Primary request: Draw a precise flat UI spec sheet for the Biowave Avatar plan 1.0, dark theme, Arabic/RTL. This is a practical design review sheet, not concept art.

Canvas: 1536×1024 landscape, no more than 1600px wide. Solid page background #141414. Flat 2D UI only. Use #F7F7F7 for headings, #DBDBDB for notes, and #292929 for one-pixel section dividers. Use IBM Plex Sans Arabic for Arabic annotations. The whole page flows right-to-left with crisp alignment and generous space.

Layout: three clean horizontal sections in one page, each grid ordered from the right edge.

Section 1, caption "الحجم × الشكل": a 4-row × 2-column RTL grid. Row captions use the exact technical strings "sm · 32px", "md · 40px", "lg · 48px", "xl · 56px". Columns are "دائرة · radius 9999px" on the right and "مربع · radius 6px / 8px / 10px / 12px" on the left. Each cell contains a neutral avatar with the single centered Arabic initial "س". Avatar sizes are exactly 32, 40, 48, and 56px. Circle radius 9999px. Square radii by row exactly 6, 8, 10, and 12px. Neutral background #292929 and initial #DBDBDB. Arabic initial typography by row: 12px/18px weight 500; 14px/22px weight 500; 16px/26px weight 500; 18px/26px weight 600. Write each exact size, radius, and text style beside its row.

Section 2, caption "اللون × المحتوى": a 3-row × 3-column RTL grid of md 40px circular avatars. Row captions preserve exact enum strings "neutral", "brand", "secondary". Content columns from right to left are "صورة", "حرف", "أيقونة". Image cells contain the same friendly generic adult portrait, centered and cropped to fill, never stretched, with no border or overlay. Initial cells show exactly "س". Icon cells show a clean Material Symbols Rounded-style person glyph at exactly 20px and never mirror it. Neutral: background #292929, initial #DBDBDB, icon #DBDBDB. Brand: background #071323, initial #90A3BC, icon #90A3BC. Secondary: background #032A37, initial #90C3D5, icon #90C3D5. Write the exact hex values beside each row.

Section 3, caption "الحالات وموضع الشارة": one RTL row of md 40px avatars. Use compact Arabic state captions from right to left for image, loading, image failed, initials, icon, dot badge, and count badge. Image shows the same cropped portrait. Loading and image failed both show the fallback Arabic initial "س" on neutral #292929, visibly identical in Avatar appearance. The icon state shows the 20px person glyph. Dot and count badges use neutral initial avatars and place one badge centered over the logical top-end edge, which is physical top-left in RTL. Show each badge on both a circle and rounded-square mini-example. Dot uses success #55BE87. Count shows exactly "5" using #FF7676 with #0A0A0A text. Add the exact plan examples "سارة علي → س", "عمر حسن → ع", "جهاز الاستقبال", and "متصل" near the section.

RTL invariants: photos are never flipped. The person glyph is never mirrored. Arabic names use one letter. If the Latin initials "SA" appear in a tiny comparison note, their order stays "SA". Only badge placement mirrors, from top-right in LTR to top-left here.

Exact behavior: all avatar containers are fixed squares, clip content, have no border, no shadow, no overlay, no hover or focus treatment. Images crop to fill and remain centered. Exactly one of image, initial, or person glyph is visible in each avatar. Badges do not change the avatar size.

Constraints: render all supplied Arabic and technical labels verbatim with no extra words. No gradients, glow, shadows, device frames, logos, decorative shapes, or watermark. Do not flip photos or the person glyph. Do not add any Avatar option or state not listed above.
```

## Correction prompts used

- Light/English: `Change only the visual fill treatment: make the page #FFFFFF and every token-based Avatar and badge fill a uniform flat solid using its annotated value; remove gradients, glow, shadows, bevel and texture; preserve every word, number, portrait, icon, initial, grid, badge position and layout exactly.`
- Dark/Arabic: `Change only the visual fill treatment: make the page #141414 and every token-based Avatar and badge fill a uniform flat solid using its annotated value; remove gradients, glow, shadows, bevel and texture; preserve every Arabic and technical label, portrait, icon, initial, RTL grid, top-left badge position and layout exactly.`

## Checks

| Image | Result |
|---|---|
| `avatar-light-en.jpg` | ⚠ Coverage matches: all four sizes, both shapes, all three colours, image/initials/person content, loading and failed fallbacks, and dot/count badges on circle and square. English text is legible and the badges sit at top-right. The sheet prints the resolved values, but generated geometry is proportionally enlarged rather than pixel-measurable, and subtle tonal variation remains inside nominally flat swatches after one correction pass. |
| `avatar-dark-ar.jpg` | ⚠ Coverage matches and the section flow is RTL. Arabic examples render correctly, initials use one Arabic letter, photos and person glyphs remain unmirrored, and both badge types move to top-left. The sheet prints the resolved values, but generated geometry is proportionally enlarged rather than pixel-measurable, and subtle tonal variation remains inside nominally flat swatches after one correction pass. |

## Questions

- Badge size, ring width/color, and exact indicator offset are unresolved in the permitted Avatar inputs because Avatar B2/B3 explicitly delegates them to Badge. The sheets therefore review Avatar's top-end anchoring and use exact semantic color swatches, but cannot certify the Badge-owned geometry.
- The JPEGs are planning sketches, not pixel or colour sampling references; implementation must use the token names and values above.
