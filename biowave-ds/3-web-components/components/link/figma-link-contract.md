<!-- GENERATED from link.md @ fb4f571594341aa9 — do not edit; change the source and run: npm run contract -- web link -->
# Link · رابط — Web — Figma contract

> **Everything the Figma Agent needs to build Link in the Web Components file, with our variables and styles.** Read this file only. Generated from [`link.md`](link.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](link.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Link` (one page per component) |
| Component | Link · رابط |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-21 |
| Source | [`link.md`](link.md) @ `fb4f571594341aa9` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 9 collections, 318 variables reachable |

Import by key — never search by name, never copy:

```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy
const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style
const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component
const set = await figma.importComponentSetByKeyAsync('<component set key>');
```

## 2. Component-token collections (bind layers to these)

None yet — this component has no component tokens. Bind to the Foundations variables in §3 and report it in D11 so the Planner adds component tokens.

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-focus-offset` | 9. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `border-width-focus` | 9. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `border-width-strong` | 9. Border › `border/width/strong` | `71439086700175c98e9cdf1952de74427c72063e` | FLOAT | STROKE_FLOAT | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-border-inverse` | 1. Themes › `color/border/inverse` | `0e53944b3de77eca83b17b27c3e5d0b4fca582d8` | COLOR | STROKE_COLOR | spec |
| `color-link-default` | 1. Themes › `color/link/default` | `39af653c9124e2888e3c1d3de9c92b3f1e4d6df0` | COLOR | TEXT_FILL | spec |
| `color-link-hover` | 1. Themes › `color/link/hover` | `db406378bc33a17e0471c73076f83e3c75b4d1c3` | COLOR | TEXT_FILL | spec |
| `color-link-pressed` | 1. Themes › `color/link/pressed` | `9dde6bdff995276bdaa7a18390b4c55082da7afa` | COLOR | TEXT_FILL | spec |
| `color-link-visited` | 1. Themes › `color/link/visited` | `fae9e8c94ca939fe60d30119ac1e6358342c9700` | COLOR | TEXT_FILL | spec |
| `color-text-neutral-default` | 1. Themes › `color/text/neutral/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-neutral-disabled` | 1. Themes › `color/text/neutral/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `color-text-neutral-inverse` | 1. Themes › `color/text/neutral/inverse` | `83e1f6c6d7ddf8376b1bc5d0b9d5f6cd13b68e9b` | COLOR | TEXT_FILL | spec |
| `radius-xs` | 2. Radius › `radius/xs` | `213fc023e86a88779565677e47c64a4dea40c260` | FLOAT | CORNER_RADIUS | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xxs` | 3. Spacing › `spacing/xxs` | `e772baca3a3110208bb2791461b6659a6d6e9ba8` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-instant` · `motion-duration-sm` · `motion-duration-xs` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `Web/en/action/sm` | `db13893c893d1f873aeec7bbd5d890d77d5a3ab3` |
| `Web/en/action/md` | `6dec13ffdefd6ebe1bcad745d715cf13b7a2a66a` |
| `Web/en/action/lg` | `0566d1dce9a436d6464c879125e0797cef4f8750` |
| `Web/ar/action/sm` | `f97df07b5974ac1d2fdd64d6a320a30c88c4bd3f` |
| `Web/ar/action/md` | `ef1c490f6c608d2036d1ffcb2d171f21646cdb0d` |
| `Web/ar/action/lg` | `8da07033b0da14a69851c6e2b828050d160c1d2b` |
| `Web/en/body/md` | `87a12277da6eb5157d262a0d847b277747f73b69` |

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Focus/Ring` | `a52fabd21a5e545bc7bef092fbf39ebfe0e9bd43` |
| `Focus/Ring Inverse` | `226003580f6aa5c70ac56921a7ac0a2b6a9d8f85` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `mail` | `c0a48a046c2a3fb66c36765d7f150b2ac9a045e0` | `0414b32813202713bf05545f2c8154575f842511` | `c625c93be50f00889f8de6e1d8b1747d848531c9` |
| `open_in_new` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |

## 7. Phase 1 — values (from Part B)

### B1 API

### Link

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `href` | string | | — | ✓ (unless `disabled`) | Destination. With `component`, passed to that component as well |
| `children` | string | | — | ✓ | `label`. Plain text only |
| `color` | enum | `brand` · `neutral` · `inverse` | `brand` | | A4.1 |
| `size` | enum | `inherit` · `sm` · `md` · `lg` | `inherit` | | A4.2 — `inherit` = inline, takes the parent's font |
| `underline` | enum | `always` · `hover` | `always` | | A4.3 |
| `startIcon` | `ReactNode` | a Biowave `<Icon name="…" />` (Material Symbols Rounded, D-18) without `size` | — | | `leading-icon` — A4.4. Standalone sizes only |
| `external` | boolean | | `false` | | A4.5 — `target="_blank"`, `rel="noopener noreferrer"`, `external-icon` (`open_in_new`), screen-reader suffix |
| `externalLabel` | string | | `"(opens in a new tab)"` (EN) / `"(يفتح في علامة تبويب جديدة)"` (AR) from the provider locale | | The visually hidden suffix read after the label |
| `showVisited` | boolean | | `false` | | A4.6 — `:visited` colour, `brand` only |
| `disabled` | boolean | | `false` | | No navigation, not focusable (B6). Use rarely (A5) |
| `component` | `React.ElementType` | e.g. the app router's link | `'a'` | | Renders that element with the Link styles; extra props (e.g. `to`) are forwarded |
| `onClick` | `(e) => void` | | — | | Called before navigation; not called while `disabled` |
| `ref`, `className`, `aria-*`, `data-*` | | | | | Forwarded to the root element |

Not supported: MUI `underline="none"`, MUI `color` palette values, `variant` typography values, `sx` colour overrides, a custom `target` / `rel` (use `external`), `endIcon` (the only trailing icon is the `external-icon`). Platform naming: web `startIcon` = Flutter `leadingIcon`; `onClick` + `href` = Flutter `onPressed`; `disabled` = Flutter `onPressed: null`; `showVisited` is web only.

**Invalid combinations** (`console.warn` once in development, then the fallback renders):

| Combination | Fallback |
|---|---|
| `color="neutral"` with `underline="hover"` | `underline="always"` |
| `size="inherit"` with `underline="hover"` | `underline="always"` |
| `size="inherit"` with `startIcon` | `startIcon` not rendered |
| `showVisited` with `color` ≠ `brand` | `showVisited` ignored |
| `children` empty or not a string | renders, warns "Link needs a text label" |
| no `href`, no `component` and not `disabled` | renders as disabled, warns "Link needs an href" |

### B2 Dimensions

```
 Inline (size inherit): no box of its own — font, line height and wrapping come
 from the parent text.        Read the Privacy policy before you continue.
                                       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾ border-width-default,
                                                      offset spacing-xxs

 Standalone (size md, LTR)
          spacing-xs              spacing-xs
         ├┤                      ├┤
   ┬ ┌──────────────────────────────────┐   focus ring (Focus only):
   │ │ [◆] Contact support [▸]          │   border-width-focus · border-focus-offset
   ┴ └──────────────────────────────────┘   · radius-xs
   target-min (min block size)
       └ size-icon-sm   └ text style action-md
```

| Part | Property | `inherit` | `sm` | `md` | `lg` |
|---|---|---|---|---|---|
| `label` | text style | parent's (`font: inherit`) | `action-sm` | `action-md` | `action-lg` |
| `leading-icon`, `external-icon` | size | `1em` of the parent font (Icon without `size`) | `size-icon-sm` | `size-icon-sm` | `size-icon-md` |
| root | gap between parts | `spacing-xs` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| root | min block size | — (inline exception) | `target-min` | `target-min` | `target-min` |
| root | padding | none | none | none | none |
| `underline` | thickness · offset | `border-width-default` · `spacing-xxs` (hover / pressed: `border-width-strong`) | same | same | same |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` | same | same | same |

Layout rules:
- `inherit`: `display: inline`; wraps with the sentence; the focus outline follows every line box (`box-decoration-break: clone`). The `external-icon` wrapper is `display: inline-block`, `vertical-align: middle`, after the label.
- Standalone (`sm` · `md` · `lg`): `display: inline-flex`, `align-items: center`, width hugs content, `max-inline-size: 100%`; the label wraps to more lines instead of truncating.
- The underline is drawn on the `label` span only (`.bw-link__label`), never under icons or the gap.

### B3 Tokens by part and state

> No component tokens (P-04): every value is a shared semantic token, so there is no `link.tokens.json`. `label`, `underline` and both icons use the same colour (`currentColor`).

| `color` | Default | Hover | Pressed | Visited (`showVisited`) | Disabled |
|---|---|---|---|---|---|
| `brand` | `color-link-default` | `color-link-hover` | `color-link-pressed` | `color-link-visited` | `color-text-neutral-disabled` |
| `neutral` | `color-text-neutral-default` | `color-text-neutral-default` | `color-text-neutral-default` | — | `color-text-neutral-disabled` |
| `inverse` | `color-text-neutral-inverse` | `color-text-neutral-inverse` | `color-text-neutral-inverse` | — | `color-text-neutral-disabled` |

| Part | `underline` | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|---|
| `underline` | `always` | `border-width-default` | `border-width-strong` | `border-width-strong` | `border-width-default` | none |
| `underline` | `hover` | none | `border-width-default` | `border-width-default` | `border-width-default` | none |

| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` |

Contrast: `color-link-default` is checked against the page and surface colours in `2-foundations/scripts/contrast-pairs.json` (4.5:1); `-hover` and `-pressed` are darker in light and lighter in dark, so they keep at least that contrast. Dark theme: same tokens, values switch automatically. No exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter | colour, underline thickness / appearance | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down · Enter down | colour, underline thickness | `motion-duration-xs` | `motion-easing-standard` |
| Pressed → Hover / Default | release | colour, underline thickness | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus (`:focus-visible`) | focus ring appears | `motion-duration-instant` | — |
| Enabled ↔ Disabled | `disabled` changes | colour, underline | `motion-duration-instant` | — |
| Default → Visited | browser history | colour (no transition: `:visited` allows colour only) | — | — |

Reduced motion: every transition is instant (built into `tokens.css`).

### B5 RTL

```
LTR  Read the Privacy policy before you continue.
RTL                 اقرأ سياسة الخصوصية قبل المتابعة.

LTR  [◆] Contact support [▸]          RTL          [◂] التواصل مع الدعم [◆]
     ↑ leading-icon        ↑ external-icon (open_in_new, mirrored)
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (logical properties only); `startIcon` stays at the inline start |
| `external-icon` (`open_in_new`) | Mirrors — rendered as `<Icon name="open_in_new" directional />`; the Icon's own `bw-icon-directional` rule flips it once. Link never flips a wrapper |
| `leading-icon` | Mirrors only when the consumer marks it `directional` (arrows); `mail`, `help`, `description` do not mirror |
| `underline`, `focus-ring` | Follow the text; nothing to mirror |
| Label in the other script (e.g. "Biowave" in an Arabic sentence) | Ordered by the browser's bidi algorithm; no `dir` attribute on the link |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<a href>` (or the `component`, which must render an `<a href>`); role stays link |
| Accessible name | `children` text. Icons are decorative (`Icon` without `label` → `aria-hidden="true"`). `external`: a visually hidden span with `externalLabel` inside the link, after the label (shared helper `src/internal/visuallyHidden.ts`) |
| External | `target="_blank"` + `rel="noopener noreferrer"` |
| Disabled | `<a>` **without** `href`, `role="link"`, `aria-disabled="true"`; not in the tab order; `onClick` not called |
| Focus | `:focus-visible` (and `.Mui-focusVisible`) outline `border-width-focus` solid `color-border-focus` (`inverse`: `color-border-inverse`), `outline-offset: border-focus-offset`, `border-radius: radius-xs` |
| Target size | Standalone: `min-block-size: target-min` (24) · inline: WCAG 2.5.8 inline exception |
| Non-colour cue | Inline and `neutral` links always underlined (WCAG 1.4.1, B1 fallbacks) |
| Cursor | `pointer`; disabled: `default` |
| Screen reader output | "Privacy policy, link" · external: "Contact support (opens in a new tab), link" · AR: "سياسة الخصوصية، رابط" · visited: the browser adds "visited" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / away from the link |
| Enter | Follows the link (native) |
| Space | Nothing (native link behaviour — scrolls the page) |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Figma Agent: read this file, the spec [Part B](#b--spec) (all values) and the [guidelines](#a--guidelines) (anatomy, options, do/don't). Nothing else.
> **Values are never written here.** Sizes, tokens, states and timings come from B2–B4.
> **One file per platform (D-12).** This file builds the Web Link set in **Biowave DS — Web Components**. Tablet and Mobile build their own sets in their own files.

| Field | Value |
|---|---|
| Component | Link |
| Platform | Web |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Link` › section `Link` |
| Mode | **Create new.** No legacy Link set is indexed. If a link text style or set exists in the Foundations file, report its node ID in D11 (read only, never edit) |
| Plan version | 1 · 2026-10-21 |

### D1 Rules for this build

0. **Library first, no component tokens (P-04).** Link has no `link.tokens.json`, so this file gets **no** `Link / …` collection. Bind layers directly to the Foundations variables listed in the contract (§3) by key — this is intended, not a gap; do not ask for component tokens in D11. Never create, copy or detach variables or styles. Lint (`figma-read-tokens.js`) must report 0.
1. **Every value is bound.** Fills, gap, min height, radius → variables; text → text styles `Web/en/action/{sm|md|lg}` and `Web/ar/action/{sm|md|lg}`; focus → effect styles `Focus/Ring` and `Focus/Ring Inverse`. No raw hex / px. **Only literals allowed:** the label's underline thickness and offset (Figma text decoration cannot be bound to variables) — set them to the B2 / B3 values and list them in the QA report.
2. **Token → variable name:** replace `-` between segments with `/` — `color-link-hover` → `1. Themes › color/link/hover`; `spacing-xs` → `3. Spacing › spacing/xs`; `radius-xs` → `2. Radius › radius/xs`; `target-min` → `7. Grid & Layout › target/min`.
3. **Never** bind `_Primitive/*` or `_deprecated/*`.
4. **Layer names = anatomy part names** (A2): the component frame is the link root; children `leading-icon`, `label`, `external-icon`. The underline is the label's text decoration, not a layer.
5. Auto layout everywhere. No absolute positioning.
6. Icons are instances from the **Google · Material Symbols** library (Style=Rounded; D-18, keys in the contract), never detached. Their vector fills bind to the same colour variable as the `label`.

### D2 Component structure

```
❖ Link                           ← component set (published) on page ↳ Link
```

No private base components.

### D3 Layer tree and auto layout

```
Link                      ↔ horizontal · align center/center · gap {B2 gap} · padding 0
│                           height hug, min height {B2 min block size} · width hug · radius {B2 focus radius}
│                           no fill · effect Focus/Ring (State=Focused) · Focus/Ring Inverse (Color=Inverse, State=Focused)
├── leading-icon          ◇ Material Symbols instance · size {B2 icon} · fill {B3 colour} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
├── label                 T text style Web/{en|ar}/action/{sm|md|lg} · fill {B3 colour} · decoration Underline per B3 · TEXT `Label` · hug
└── external-icon         ◇ Material Symbols `open_in_new` instance · size {B2 icon} · fill {B3 colour} · BOOLEAN `External`
```

```
┌───────────────────────────────────┐
│ [◆]  Contact support  [▸]         │
└───────────────────────────────────┘
  ②        ①  ‾‾‾ ③      ④
```

### D4 Properties

This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop (web) | Code value |
|---|---|---|---|---|---|
| `Color` | VARIANT | `Brand` · `Neutral` · `Inverse` | `Brand` | `color` | `'brand'` · `'neutral'` · `'inverse'` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `'sm'` · `'md'` · `'lg'` (`'inherit'` has no Figma variant — see D8 page 03) |
| `Underline` | VARIANT | `Always` · `Hover` | `Always` | `underline` | `'always'` · `'hover'` |
| `State` | VARIANT | `Default` · `Hover` · `Focused` · `Pressed` · `Visited` · `Disabled` | `Default` | `disabled` / `showVisited` | `Disabled` → `disabled`; `Visited` → `showVisited` (shown visited); others are interaction states |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only; code takes language and direction from the provider |
| `Label` | TEXT | | `Contact support` (AR variants: `التواصل مع الدعم`) | `children` | |
| `Leading icon` | BOOLEAN | | `false` | `startIcon` | present / absent |
| `Leading icon glyph` | INSTANCE_SWAP | Google · Material Symbols (Rounded) | `mail` | `startIcon` | `<Icon name="{glyph}" />` |
| `External` | BOOLEAN | | `false` | `external` | `true` / `false` |

**Icons used:** `mail` · `open_in_new`

### D5 Variants to generate

- Axes: `Color × Underline × State × Size × Language`
- Allowed `Color × Underline × State` (B1): `Brand` × 2 underlines × 6 states = 12 · `Neutral` × `Always` × 5 states (no `Visited`) = 5 · `Inverse` × 2 underlines × 5 states (no `Visited`) = 10 → **27**
- 27 × 3 sizes × 2 languages = **162 variants**
- Grid of the raw set: rows = `Language › Size › Color › Underline`, columns = `State`; gap `spacing/xl`

### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · `motion-duration-sm` · standard easing (B4) |
| While pressing | Hover → Pressed | Smart animate · `motion-duration-xs` |

`Focused` shows the ring for docs and handoff; it is not a prototype interaction. `Visited` is a static variant.

### D7 RTL

Method: `Language=AR` variants. In AR variants: reverse the auto layout order (`external-icon`, `label`, `leading-icon`, so the leading icon stays at the inline start), text align end, Arabic sample label from A6. Mirror the `open_in_new` glyph (B5); never mirror `mail`.

```
EN  │ [◆]  Contact support  [▸] │
AR  │ [◂]  التواصل مع الدعم  [◆] │
```

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

Build the 12 standard pages per `_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts, inside section `Link — Documentation` on `↳ Link`, frames `Link / 00 Component sheet` … `Link / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Link:
- 01 Introduction: one inline example (a body paragraph with a link) and one standalone example, Light + Dark panels.
- 03 Variations: blocks for `Color` (`Inverse` on a `color/background/brand/default` tile), `Size`, `Underline`, `Leading icon`, `External`. Inline (`size="inherit"`): a body paragraph whose link words use the `Web/en/body/md` text style with the `color/link/default` fill and underline applied to that text range — the one example that is not an instance, because Figma cannot place an instance inside running text; label it "Inline — code `size=\"inherit\"`".
- 05 Usage: Link vs Button (`text`) side by side.
- 09 Accessibility: focus ring examples (`Focus/Ring`, `Focus/Ring Inverse`), the external announcement text in EN and AR, `target-min` overlay on a standalone `SM` link.

Component description: "Takes people to another page or resource. Spec: 3-web-components/components/link/link.md".

### Doc Kit components (keys)

| Component | Key | Kind |
|---|---|---|
| `Doc/Logo` | `b0506262908cc9602fb86d1d2f2d1574b8797fb1` | COMPONENT |
| `Doc/Version chip` | `20beed5d39281d472c391a3a23650a34058cff6a` | COMPONENT |
| `Doc/Divider` | `719437f0bf3e0276b697f22b886be069e1e428aa` | COMPONENT_SET |
| `Doc/Section` | `f29dffabb982e9374b1b804639f45514a29146a2` | COMPONENT |
| `Doc/Code block` | `9bcc61d27ad9bf6c4d4a9e5a6e3e6ebd37af5028` | COMPONENT |
| `Doc/Property chip` | `8990d04a48fb07d7f8f1056307d1faf3dc0ded65` | COMPONENT |
| `Doc/Header` | `dd9347ba546590b632ae68976fe2733f3f7d340e` | COMPONENT |
| `Doc/Axis label` | `24a64b9f56bb95bffc1b5f1ce61e58205b3023fb` | COMPONENT_SET |
| `Doc/Bracket` | `b10364d75b1d8c84e235d63773c0c7870898354a` | COMPONENT_SET |
| `Doc/Callout` | `24c24d19f00001b99acb880c3101afb1842a64f6` | COMPONENT_SET |
| `Doc/Panel` | `b8b20494dcf5f71d3492d90a96498d510d490132` | COMPONENT_SET |
| `Doc/Tile` | `eb3bac08d98c62634cbbc8a6a0129a5fa1783836` | COMPONENT |
| `Doc/Change note` | `5cc8476dd2952640e8138cf21feeb637cfcfe73a` | COMPONENT |
| `Doc/Deprecated overlay` | `d75a185f612de5fa7daadaff9083edff16c42fc4` | COMPONENT |
| `Doc/Table cell` | `4b48bcab4faac402c079e941b30f8987159bfa3f` | COMPONENT_SET |
| `Doc/Table row` | `fb2c9fdd139f3be6860495d1d95a911275ed8224` | COMPONENT_SET |
| `Doc/Table` | `40980251551a20a72810037dc043c66e9271600b` | COMPONENT |
| `Doc/Timeline` | `81d060910749d01da7648f5ae3877e283d668377` | COMPONENT_SET |
| `Doc/Motion row` | `2072d9e2a11281879696f1f8c6ee6ef917b029ac` | COMPONENT |
| `Doc/Uses` | `25ed1809ed37c229827ee8019ec52fe129ec0d31` | COMPONENT |
| `Doc/Do` | `45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1` | COMPONENT |
| `Doc/Dont` | `b6271df857b44407da2657601b4e388bf843b7e8` | COMPONENT |
| `Doc/Skeleton` | `cdb8f9c05ff039be8fda885a25e3ade2986da93b` | COMPONENT_SET |
| `Doc/Device frame` | `c7c9ec2e833fad1b54333707c2210744515d5339` | COMPONENT_SET |
| `Doc/Home header` | `e9c1ee6681300d4c2a04e8f563c308642a3db3df` | COMPONENT |
| `Doc/Title bar` | `2c79bbf4615cf2c6fc8ef6a14390a32d2832d48d` | COMPONENT |
| `Doc/Home card` | `bdd6e95450e128f7b3d3d5fa86b655a6986d2cfa` | COMPONENT |
| `Doc/Footer` | `dd342bd1d199a8c5f353c58125681fad6b6c09f2` | COMPONENT |

### Components List card

On page `Components List` of this file, add (or refresh) one `Doc/Home card`: preview = live instance of the default variant on the dot-grid tile, title = component name, link "View Component ↗" to the `↳` page of this component. Cards stay in alphabetical order.

### Page layouts (from the Doc Kit spec)

The 12 documentation pages every component gets (Part D8 lists them with their sources; this section is their one layout home).

Every page starts with the same header (`Doc/Header`):

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Documentation                 {Platform} · v{version}  │
│                                                                            │
│ {Page title}                                                               │
│ {Page subtitle — one line}                                                 │
│ ────────────────────────────────────────────────────────────────────────── │
```

#### 00 Component sheet
The full variant matrix with axis labels. Columns = interaction states, rows grouped by the other axes. Built from the component set itself.

```
{Name}  (v1.0)
{one-line description}
──────────────────────────────────────────────────────────────────────────
                    State: Default   State: Hover   State: Pressed   State: Disabled
                   ┌──────────────┬──────────────┬───────────────┬────────────────┐
Size: MD │ Primary │ ▢ instance   │ ▢ instance   │ ▢ instance    │ ▢ instance     │
         │ Second. │ ▢            │ ▢            │ ▢             │ ▢              │
Size: SM │ Primary │ ▢            │ ▢            │ ▢             │ ▢              │
                   └──────────────┴──────────────┴───────────────┴────────────────┘
```
`Doc/Axis label` for every row and column (`property` small, `Value` bold). Invalid combinations are not shown.

#### 01 Introduction
Description paragraph, then the anatomy diagram twice: Light panel, then Dark panel (same instance, variable mode switched on the panel).

```
{Description from A1}

┌─ Doc/Panel (Light) ──────────────────────────────────────────────┐
│              title      counter                 trailing-item    │
│                 │          │                          │          │
│ leading-icon ─● ┌──────────────────────────────────────────────┐ │
│                 │ [◆] Title text (12)                     [⤓]  │ │
│ subtitle ─────● │     Subtitle text                            │ │
│                 │ ░░░░░░░░░░░░░░░░ slot ░░░░░░░░░░░░░░░░░░░░░░ │ ├─ slot
│                 └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
┌─ Doc/Panel (Dark) ── same diagram ───────────────────────────────┐
```
Callout labels = anatomy part names, exactly (`Doc/Callout`).

#### 02 Props and tokens
One `Doc/Table` per public sub-component (columns: Prop name · Description · Type · Prop values · Default; required props marked `*`). Then a reference instance and the token table.

```
Props [{Name}]                     Props [{Name}Header]
┌──────────┬─────────────┬──────┬──────────────┬─────────┐
│ Prop name│ Description │ Type │ Prop values  │ Default │
├──────────┼─────────────┼──────┼──────────────┼─────────┤
│ size *   │ …           │ enum │ • sm • md    │ md      │
└──────────┴─────────────┴──────┴──────────────┴─────────┘

Tokens            ┌ reference instance ┐
┌───────────────────┬─────────┬──────────────────────────────────────┐
│ Part · property   │ State   │ Token                                │
├───────────────────┼─────────┼──────────────────────────────────────┤
│ container · bg    │ Default │ color-background-neutral-default     │
└───────────────────┴─────────┴──────────────────────────────────────┘
```

#### 03 Variations
One block per property, in D4 order. Each value = one `Doc/Tile` with a live instance and caption `property = Value`. Other properties stay at default.

```
{property}
{one-line description from A4}
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   ▢ instance     │ │   ▢ instance     │ │   ▢ instance     │
│                  │ │                  │ │                  │
│ size = SM        │ │ size = MD        │ │ size = LG        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
────────────────────────────────────────────────────────────── (Doc/Divider)
```

#### 04 States and motion
One `Doc/Motion row` per transition in B4.

```
States           Animation          Trigger    Timeline (ms)                    Transition properties
──────────────── ────────────────── ────────── ──────────────────────────────── ──────────────────────────────
Initial state    ┌──────────────┐               0  70  150  200  300  400  600  ┌────────────────────────────┐
 ▢ Default       │ prototype    │   Hover       ├──────┤                        │ duration: motion-duration-sm│
Final state      │ preview      │               └ 150 ┘                         │ easing:   motion-easing-std │
 ▢ Hover         └──────────────┘                                               └────────────────────────────┘
                                                                                [Background  ■ ▸ ■]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Timeline bar length = the duration token's value. Property chip shows the from → to token swatches. Add a reduced-motion note at the end.

#### 05 Usage guidelines
"When to use" as a `Doc/Uses` card, then rule groups, each with a `Doc/Do` + `Doc/Dont` pair holding live, realistic compositions.

```
{Rule group title}
• {rule}
┌─ ✓ Do ──────────────────────────┐   ┌─ ✗ Don't ───────────────────────┐
│ • {rule}                        │   │ • {rule}                        │
│ ┌─────────────────────────────┐ │   │ ┌─────────────────────────────┐ │
│ │ realistic example (instance)│ │   │ │ wrong example (instance)    │ │
│ └─────────────────────────────┘ │   │ └─────────────────────────────┘ │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

#### 06 Content guidelines
Same layout as 05, with copy rules from A6. Show EN and AR examples side by side in the Do card.

#### 07 Platform
One `Doc/Uses` card per layout context of this platform, each with a `Doc/Device frame` containing skeleton page content (`Doc/Skeleton`) and the component in place. Web: Desktop + narrow web. Tablet: Landscape + Portrait. Mobile: Phone. End with the platform differences table from A8.

```
Desktop
These are used on web apps / dashboards.
┌─ ★ Uses ───────────────────────────────────────────┐
│ {rule}                                             │
│ ┌─ Doc/Device frame ─────────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬                                       │ │
│ │ ▢▢   ┌ component ┐   ▬▬▬▬▬▬▬▬                  │ │
│ │      └───────────┘   ▬▬▬▬▬▬                    │ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

#### 08 RTL
LTR and RTL instances side by side for each structurally different variant, with `Doc/Callout` on every mirrored and non-mirrored part (B5). Arabic sample copy.

```
LTR (en)                              RTL (ar)
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [◆] Title text          [▸]  │      │  [◂]          عنوان البطاقة [◆] │
└──────────────────────────────┘      └──────────────────────────────┘
  ◆ not mirrored · ▸ mirrored
```

#### 09 Accessibility
`Doc/Section` blocks: Use case · Keyboard (table from B6) · Screen reader output · Focus (instance in Focus state with ring callout) · Target size (overlay showing `target-min`) · Colors (contrast pairs).

#### 10 Changes from previous version
Only when the version is > 1.0. New (live instance, with `Doc/Change note` callouts) next to Previous (old instance or image, hatched with `Doc/Deprecated overlay`). Notes use strike-through for the old value and bold for the new one, e.g. ~~`spacing-lg` fixed~~ → **`spacing-md` variable**.

```
New                                          Previous
┌──────────────────────────┐ ◂ change note   ┌──────────────────────────┐
│ ▢ current instance       │                 │ ╱╱╱ old version ╱╱╱╱╱╱╱  │
└──────────────────────────┘                 └──────────────────────────┘
```

#### 11 Changelog
`Doc/Table` from the changelogs (Version · Date · Change · Breaking · Migration).

Component description field (Figma "Description"): one line from A1 + link to the spec.

## 10. Code Connect

- File: `3-web-components/src/components/link/Link.figma.tsx`
- Mapping: D4 table. Publish only after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Link` on `↳ Link` in the Web file; layer names match D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 162; no `Neutral × Hover underline`; `Visited` only with `Brand`
- [ ] F-AC-4 Zero raw values except the underline thickness and offset listed in the QA report; every fill, gap, min height, radius, text and effect bound
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only); Typography mode `Web`; zero local variables and styles in the file
- [ ] F-AC-6 AR variants per D7; Arabic labels fit without truncation; `open_in_new` mirrored, `mail` not
- [ ] F-AC-7 Interactions per D6; component description filled; `Focus/Ring` and `Focus/Ring Inverse` applied
- [ ] F-AC-8 Values match B2–B3 one by one (redline check on every `Color` × `Size` in Default and Hover)
- [ ] F-AC-9 Documentation pages built from the Doc Kit (or reported blocked) with the page notes above

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](link.md#d11-execution-log-filled-by-the-figma-agent) in `link.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `link.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
