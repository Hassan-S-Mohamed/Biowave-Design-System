# Icon preview — Web plan 1.1

These images are planning sketches. `icon.md` remains the source of truth.

## Token sheet

| Token / value | Value (light) | Value (dark) |
|---|---|---|
| `color-surface-page` | `#F7F7F7` | `#0A0A0A` |
| `color-surface-inverse` | `#141414` | `#FFFFFF` |
| `color-text-neutral-default` (the `currentColor` sample) | `#0A0A0A` | `#F7F7F7` |
| `color-text-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-border-subtle` | `#EDEDED` | `#292929` |
| `color-icon-neutral-default` | `#0A0A0A` | `#F7F7F7` |
| `color-icon-neutral-subtle` | `#292929` | `#DBDBDB` |
| `color-icon-neutral-muted` | `#707070` | `#BDBDBD` |
| `color-icon-neutral-inverse` | `#FFFFFF` | `#0A0A0A` |
| `color-icon-role-brand` | `#193351` | `#90A3BC` |
| `color-icon-role-secondary` | `#0C5F79` | `#90C3D5` |
| `color-icon-role-success` | `#268751` | `#8DD4AE` |
| `color-icon-role-error` | `#FF2B2B` | `#FEA3A3` |
| `color-icon-role-warning` | `#D97424` | `#FFC88F` |
| `color-icon-role-info` | `#2559D4` | `#9CBCF2` |
| `size-icon-xs` | `12 px` | `12 px` |
| `size-icon-sm` | `16 px` | `16 px` |
| `size-icon-md` | `20 px` | `20 px` |
| `size-icon-lg` | `24 px` | `24 px` |
| `size-icon-xl` | `32 px` | `32 px` |
| `size-icon-2xl` | `40 px` | `40 px` |
| `size-icon-3xl` | `48 px` | `48 px` |
| `spacing-md` | `8 px` | `8 px` |
| `spacing-xl` | `16 px` | `16 px` |
| `spacing-2xl` | `20 px` | `20 px` |
| `border-width-default` | `1 px` | `1 px` |
| `radius-none` | `0 px` | `0 px` |
| Heading typography | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`; `18 px / 24 px`; weight `600` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif`; `18 px / 26 px`; weight `600` |
| Caption typography | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`; `12 px / 16 px`; weight `400` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif`; `12 px / 18 px`; weight `400` |
| Annotation typography | `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`; `11 px / 16 px`; weight `400` | `IBM Plex Sans Arabic, Noto Sans Arabic, Tahoma, sans-serif`; `11 px / 18 px`; weight `400` |
| Glyph font (plan value) | `Google Material Symbols Rounded` | `Google Material Symbols Rounded` |
| Default state | Material Symbols axis `FILL 0` | Material Symbols axis `FILL 0` |
| Selected state | Material Symbols axis `FILL 1` | Material Symbols axis `FILL 1` |

## Prompt — `icon-light-en.jpg`

```text
Use case: ui-mockup
Asset type: flat web design-system UI spec sheet; planning sketch, not a product screen
Canvas: exactly 1536 × 1024 px, maximum width 1600 px. Flat page background color-surface-page #F7F7F7. English left-to-right. No browser or device frame.
Primary request: show the planned Biowave Icon component using only canonical Google Material Symbols Rounded glyphs. Every glyph must be a real Material Symbols glyph and must have its Material Symbols snake_case name printed beside it.
Layout: crisp two-column grid with 20 px outer section gaps, 16 px cell gaps and 8 px label gaps; 1 px #EDEDED dividers; square 0 px corners. Small captions above every row and column. Heading text is Inter 18 px/24 px weight 600 in #0A0A0A. Captions are Inter 12 px/16 px weight 400 in #292929. Exact-value annotations are Inter 11 px/16 px weight 400 in #292929.
Left grid — size variants: seven rows labeled exactly "size-icon-xs · 12 px", "size-icon-sm · 16 px", "size-icon-md · 20 px", "size-icon-lg · 24 px", "size-icon-xl · 32 px", "size-icon-2xl · 40 px", "size-icon-3xl · 48 px". Two state columns labeled exactly "FILL 0 · default" and "FILL 1 · selected". Render the real Material Symbols Rounded glyph "star" at the exact row size in both columns; the second column is visibly filled.
Right grid — color variants: eleven rows labeled exactly "currentColor · #0A0A0A", "default · #0A0A0A", "subtle · #292929", "muted · #707070", "inverse · #FFFFFF", "brand · #193351", "secondary · #0C5F79", "success · #268751", "error · #FF2B2B", "warning · #D97424", "info · #2559D4". Two state columns labeled exactly "FILL 0" and "FILL 1". Render the real Material Symbols Rounded glyph "favorite" in the exact row color. Put only the inverse row glyphs on a small square #141414 color-surface-inverse backing so #FFFFFF is visible; every other row stays directly on #F7F7F7.
Bottom direction grid: show the real glyph "arrow_forward" pointing right and labeled exactly "arrow_forward · directional"; show "search" unchanged and labeled exactly "search · not mirrored"; show "check" unchanged and labeled exactly "check · not mirrored". Add two exact content examples: a #D97424 "schedule" glyph with the text "Overdue", and a #268751 "check" glyph with the text "Synced".
Exact values: print every listed hex, px, font, radius and border value beside the section or part it styles. Keep token labels legible and verbatim.
Constraints: icons are square containers with centered glyphs and line-height 1. Use no icon source except Google Material Symbols Rounded. Do not invent glyphs. No shadows, gradients, glow, photos, device frames, logos, illustrations, decorations or watermark. No extra text. Preserve all exact strings and punctuation.
```

## Prompt — `icon-dark-ar.jpg`

```text
Use case: ui-mockup
Asset type: flat web design-system UI spec sheet; planning sketch, not a product screen
Canvas: exactly 1536 × 1024 px, maximum width 1600 px. Flat page background color-surface-page #0A0A0A. Arabic right-to-left; mirror the entire grid and reading order. No browser or device frame.
Primary request: show the planned Biowave Icon component using only canonical Google Material Symbols Rounded glyphs. Every glyph must be a real Material Symbols glyph and must have its Material Symbols snake_case name printed beside it.
Layout: crisp two-column grid mirrored right-to-left with 20 px outer section gaps, 16 px cell gaps and 8 px label gaps; 1 px #292929 dividers; square 0 px corners. Small captions above every row and column. Heading text is IBM Plex Sans Arabic 18 px/26 px weight 600 in #F7F7F7. Captions are IBM Plex Sans Arabic 12 px/18 px weight 400 in #DBDBDB. Exact-value annotations are IBM Plex Sans Arabic 11 px/18 px weight 400 in #DBDBDB.
Right-hand grid — size variants: seven rows labeled exactly "size-icon-xs · 12 px", "size-icon-sm · 16 px", "size-icon-md · 20 px", "size-icon-lg · 24 px", "size-icon-xl · 32 px", "size-icon-2xl · 40 px", "size-icon-3xl · 48 px". In RTL reading order use two state columns labeled exactly "محدد · FILL 1" then "افتراضي · FILL 0". Render the real Material Symbols Rounded glyph "star" at the exact row size in both columns; FILL 1 is visibly filled.
Left-hand grid — color variants: eleven rows labeled exactly "currentColor · #F7F7F7", "default · #F7F7F7", "subtle · #DBDBDB", "muted · #BDBDBD", "inverse · #0A0A0A", "brand · #90A3BC", "secondary · #90C3D5", "success · #8DD4AE", "error · #FEA3A3", "warning · #FFC88F", "info · #9CBCF2". In RTL reading order use state columns labeled exactly "FILL 1" then "FILL 0". Render the real Material Symbols Rounded glyph "favorite" in the exact row color. Put only the inverse row glyphs on a small square #FFFFFF color-surface-inverse backing so #0A0A0A is visible; every other row stays directly on #0A0A0A.
Bottom direction grid, ordered right-to-left: render the real glyph "arrow_forward" mirrored so it points left and label it exactly "arrow_forward · اتجاهي"; render "search" unchanged and label it exactly "search · لا ينعكس"; render "check" unchanged and label it exactly "check · لا ينعكس". Add two exact RTL content examples: the text "متأخر" with a #FFC88F "schedule" glyph, and the text "تمت المزامنة" with a #8DD4AE "check" glyph. Checkmarks and clocks never mirror.
Exact values: print every listed hex, px, font, radius and border value beside the section or part it styles. Keep Arabic and token labels legible and verbatim.
Constraints: icons are square containers with centered glyphs and line-height 1. Use no icon source except Google Material Symbols Rounded. Do not invent glyphs. Directional icons alone mirror; search, check and schedule do not. No shadows, gradients, glow, photos, device frames, logos, illustrations, decorations or watermark. No extra text. Preserve all exact strings and punctuation.
```

### Retry 1 — text cleanup

```text
Use case: precise-object-edit
Asset type: dark Arabic RTL design-system UI spec sheet
Primary request: edit only the text cleanup in the supplied dark Arabic Icon spec sheet.
Keep unchanged: the 1536 × 1024 canvas, #0A0A0A background, all grid geometry, all Material Symbols Rounded glyph shapes, every icon size, every icon color and hex label, both FILL columns, the left-pointing mirrored arrow_forward, unchanged search/check/schedule glyphs, and the exact content strings "متأخر" and "تمت المزامنة".
Change only these text areas:
1. Remove the malformed small typography lines under both top section titles. Replace each with one clean line: "Google Material Symbols Rounded".
2. In the bottom direction panel remove the two extra Arabic explanatory sentences below each glyph; keep only these three exact labels, in RTL order: "arrow_forward · اتجاهي", "search · لا ينعكس", "check · لا ينعكس".
3. Replace the bottom-right specifications panel with a compact exact-value legend whose lines are exactly:
"IBM Plex Sans Arabic · 18 px / 26 px · 600"
"IBM Plex Sans Arabic · 12 px / 18 px · 400"
"IBM Plex Sans Arabic · 11 px / 18 px · 400"
"gap · 20 px / 16 px / 8 px"
"border · 1 px · #292929"
"radius · 0 px"
"canvas · #0A0A0A"
Constraints: preserve everything else pixel-for-pixel as closely as possible. Do not add any other text. No new glyphs, decorations, shadows, gradients, glow, logos, frames, or watermark.
```

## Check results

| Image | Result |
|---|---|
| `icon-light-en.jpg` | ✓ Matches: seven size-token rows, all B3 colors, FILL 0/1, exact EN content, LTR `arrow_forward`, and unchanged `search` / `check`. |
| `icon-dark-ar.jpg` | ✓ Matches after retry 1: mirrored RTL grid, seven size-token rows, all dark B3 colors, FILL 0/1, exact Arabic content, left-pointing `arrow_forward`, and unchanged `search` / `check`. |

## Questions

None.
