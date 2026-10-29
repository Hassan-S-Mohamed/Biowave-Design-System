<!-- GENERATED from link.md @ e9db7b3b2df67611 — do not edit; change the source and run: npm run contract -- tablet link -->
# Link · رابط — Tablet — Figma contract

> **Everything the Figma Agent needs to build Link in the Tablet Components file, with our variables and styles.** Read this file only. Generated from [`link.md`](link.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-29). Questions go to [D11 Execution log](link.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Tablet Components** · key `KTlAsEow60qCiYyU3J90kp` · https://www.figma.com/design/KTlAsEow60qCiYyU3J90kp |
| Page | `↳ Link` (one page per component) |
| Component | Link · رابط |
| Platform | Tablet · Flutter + Material 3 |
| Version | 1.0 · 2026-10-21 |
| Source | [`link.md`](link.md) @ `e9db7b3b2df67611` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 7 collections, 281 variables reachable |

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
| `border-focus-offset` | 7. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 7. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `border-width-focus` | 7. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `border-width-strong` | 7. Border › `border/width/strong` | `71439086700175c98e9cdf1952de74427c72063e` | FLOAT | STROKE_FLOAT | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-border-inverse` | 1. Themes › `color/border/inverse` | `0e53944b3de77eca83b17b27c3e5d0b4fca582d8` | COLOR | STROKE_COLOR | spec |
| `color-link-default` | 1. Themes › `color/link/default` | `39af653c9124e2888e3c1d3de9c92b3f1e4d6df0` | COLOR | TEXT_FILL | spec |
| `color-link-hovered` | 1. Themes › `color/link/hovered` | `db406378bc33a17e0471c73076f83e3c75b4d1c3` | COLOR | TEXT_FILL | spec |
| `color-link-pressed` | 1. Themes › `color/link/pressed` | `9dde6bdff995276bdaa7a18390b4c55082da7afa` | COLOR | TEXT_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `color-text-inverse` | 1. Themes › `color/text/inverse` | `83e1f6c6d7ddf8376b1bc5d0b9d5f6cd13b68e9b` | COLOR | TEXT_FILL | spec |
| `radius-xs` | 2. Radius › `radius/xs` | `213fc023e86a88779565677e47c64a4dea40c260` | FLOAT | CORNER_RADIUS | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | GAP | spec |
| `spacing-xxs` | 3. Spacing › `spacing/xxs` | `e772baca3a3110208bb2791461b6659a6d6e9ba8` | FLOAT | GAP | spec |
| `target-min` | 6. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-instant` · `motion-duration-sm` · `motion-duration-xs` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `action/sm` | `db13893c893d1f873aeec7bbd5d890d77d5a3ab3` |
| `action/md` | `6dec13ffdefd6ebe1bcad745d715cf13b7a2a66a` |
| `action/lg` | `0566d1dce9a436d6464c879125e0797cef4f8750` |
| `body/md` | `87a12277da6eb5157d262a0d847b277747f73b69` |

## 5. Effect styles used (keys)

None named in B/D.

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

### BwLink (standalone)

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | — | ✓ | `label`. Plain text |
| `onPressed` | `VoidCallback?` | | — | ✓ | Navigates (the app opens the route or URL). `null` = disabled (Flutter convention) |
| `color` | `BwLinkColor` | `brand` · `neutral` · `inverse` | `brand` | | A4.1 |
| `size` | `BwLinkSize` | `sm` · `md` · `lg` | `md` | | A4.2 (`inherit` = `BwLink.span` below) |
| `underline` | `BwLinkUnderline` | `always` · `hover` | `always` | | A4.3 |
| `leadingIcon` | `IconData?` | `Symbols.*_rounded` (D-18; re-exported by `biowave_foundations`) | `null` | | `leading-icon` — A4.4, rendered with `BwIcon` |
| `leadingIconDirectional` | `bool` | | `false` | | Mirrors the leading icon in RTL (arrows only, B5) |
| `external` | `bool` | | `false` | | A4.5 — shows `external-icon` (`Symbols.open_in_new_rounded`) and the semantics hint |
| `externalHint` | `String?` | | localized "Opens in your browser" / "يفتح في المتصفح" | | Read after the label when `external` |
| `focusNode` · `autofocus` | | | | | Passed to the focus handling |

### BwLink.span (inline) — static method returning `InlineSpan`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` · `onPressed` · `color` · `external` · `externalHint` | | as `BwLink` | | `label` ✓ · `onPressed` ✓ | |
| `style` | `TextStyle?` | | `null` → `DefaultTextStyle.of(context).style` | | The surrounding text style (`size` = `inherit`) |

`BwLink.span` is always `underline: always` and has no leading icon (A4 combination rules). Not supported on Tablet: `showVisited` (web only, A8). Platform naming: Flutter `leadingIcon` = web `startIcon`; `onPressed` = web `href` + `onClick`; `onPressed: null` = web `disabled`; `BwLink.span` = web `size="inherit"`.

**Invalid combinations** (`assert` in debug; fallback in release):

| Combination | Fallback |
|---|---|
| `color: neutral` with `underline: hover` | `underline: always` |
| `label` empty | assert "BwLink needs a label" |
| `leadingIconDirectional: true` without `leadingIcon` | ignored |

### B2 Dimensions

```
 Inline (BwLink.span): no box of its own — the surrounding text style; the link
 is one unbreakable piece in the line.   Device not listed? Contact support for help.
                                                             ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 Standalone (BwLink, md)
          spacing-xs              spacing-xs
         ├┤                      ├┤
   ┬ ┌──────────────────────────────────┐   focus ring (keyboard focus only):
   │ │ [◆] Contact support [▸]          │   border-width-focus · border-focus-offset
   ┴ └──────────────────────────────────┘   · radius-xs
   hit area ≥ target-min (BwLayout.tablet.minTarget), visual = content
       └ size-icon-md   └ text style action-md
```

| Part | Property | `span` (inherit) | `sm` | `md` | `lg` |
|---|---|---|---|---|---|
| `label` | text style | `style` / `DefaultTextStyle` | `action-sm` | `action-md` | `action-lg` |
| `leading-icon`, `external-icon` | size | the label's font size | `size-icon-sm` | `size-icon-md` | `size-icon-md` |
| content | gap | `spacing-xs` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| hit area | min size (both axes) | — (inline exception) | `target-min` | `target-min` | `target-min` |
| `underline` | thickness | `TextDecoration.underline`, font default thickness (= `border-width-default`); hover / pressed: `decorationThickness` = `BwBorder.widthStrong / BwBorder.widthDefault` | same | same | same |
| `underline` | offset | font default (Flutter has no underline offset; web uses `spacing-xxs`) | same | same | same |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` | same | same | same |

Flutter access: `action-md` → `context.bw.text.actionMd` · `size-icon-md` → `BwSize.iconMd` · `spacing-xs` → `BwSpacing.xs` · `radius-xs` → `BwRadius.xs` · `border-width-focus` → `BwBorder.widthFocus` · `target-min` → `BwLayout.tablet.minTarget` · colours → `context.bw.colors.<camelCase>` (e.g. `linkDefault`).

Layout rules: `BwLink` is a `Row(mainAxisSize: MainAxisSize.min)` centred inside a hit area of at least `target-min` on both axes; the visual content keeps its own size (the hit area adds no visible padding). The label is `Flexible`, wraps (`softWrap: true`) and is never truncated. `BwLink.span` is a `WidgetSpan` aligned to the text baseline: it does not break across lines (A5, A6). The `focus-ring` is painted around the visible content, outside it, and takes no layout space.

### B3 Tokens by part and state

> No component tokens (P-04): every value is a shared semantic token, so there is no `link.tokens.json`. `label`, `underline` and both icons use the same colour.

| `color` | Default | Hover (pointer) | Pressed | Disabled |
|---|---|---|---|---|
| `brand` | `color-link-default` | `color-link-hovered` | `color-link-pressed` | `color-text-disabled` |
| `neutral` | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-disabled` |
| `inverse` | `color-text-inverse` | `color-text-inverse` | `color-text-inverse` | `color-text-disabled` |

| Part | `underline` | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|---|
| `underline` | `always` | `border-width-default` | `border-width-strong` | `border-width-strong` | `border-width-default` | none |
| `underline` | `hover` | none | `border-width-default` | `border-width-default` | `border-width-default` | none |

| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` |

No ink splash and no state overlay: states change only colour and underline. Dark theme: same tokens, values switch automatically. No exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter (pointer attached) | colour, underline | `motion-duration-sm` | `motion-easing-standard` |
| Default / Hover → Pressed | tap down · Enter / Space down | colour, underline | `motion-duration-xs` | `motion-easing-standard` |
| Pressed → Default | release | colour, underline | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus (`FocusManager.instance.highlightMode == traditional`) | focus ring appears | `motion-duration-instant` | — |
| Enabled ↔ Disabled | `onPressed` becomes / stops being `null` | colour, underline | `motion-duration-instant` | — |

Reduced motion: when `context.bw.reduceMotion` is true every duration is zero.

### B5 RTL

As [Web B5](../../../3-web-components/components/link/link.md#b5-rtl) (same wireframe and rules). Flutter: layout mirrors from `Directionality` (`Row` follows the text direction; `EdgeInsetsDirectional` only). The `external-icon` is `BwIcon(Symbols.open_in_new_rounded, directional: true)` — flipped once by `BwIcon`; the leading icon passes `directional: leadingIconDirectional`. `BwLink` never adds its own `Transform`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(link: true, label: label, hint: external ? externalHint : null, enabled: onPressed != null, onTap: onPressed)`; the `Text` and icons are excluded (`ExcludeSemantics` / `BwIcon` without `semanticLabel`) so the name is read once |
| Accessible name | `label` |
| External | Hint from `externalHint` (localized default by `Localizations.localeOf(context)`, the same way `BwButton` resolves `loadingLabel`) |
| Disabled | `onPressed: null` → not focusable, `enabled: false`, no hover / pressed |
| Focus | Keyboard highlight mode only: ring per B3 painted around the visible content (shared `BwFocusRing`, `lib/src/common/bw_focus_ring.dart`), shows on the first frame (no fade), takes no layout space |
| Target size | `BwLink`: hit area ≥ `BwLayout.tablet.minTarget` on both axes · `BwLink.span`: WCAG 2.5.8 inline exception |
| Text scale | Label and icons scale with the system text scale; the label wraps, the hit area grows |
| Cursor | `SystemMouseCursors.click`; disabled: `SystemMouseCursors.basic` |
| Screen reader output | "Privacy policy, link" / "سياسة الخصوصية، رابط" · external: "Contact support, link, Opens in your browser" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates (Flutter `ActivateIntent`) |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Tablet set in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/link/link.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Link |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Link` › section `Link` |
| Mode | **Create new.** No legacy Link set is indexed |
| Plan version | 1 · 2026-10-21 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/link/link.md#d1-rules-for-this-build) (library first, no component tokens — bind the Foundations variables directly, everything bound except the underline thickness and offset), plus:
- **Typography mode:** on page `↳ Link` set the explicit variable mode **`Tablet · EN`** of `5. Typography` (Arabic frames and examples: **`Tablet · AR`**) (`page.setExplicitVariableModeForCollection`). Text styles stay `action/{sm|md|lg}`; the mode gives the Tablet scale and the language font.
- Underline offset: font default (B2), not `spacing-xxs`.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/link/link.md#d2-component-structure), with these Tablet differences:
- `State`: `Default` · `Focused` · `Pressed` · `Disabled` — no `Hover`, no `Visited`
- Icon sizes per the Tablet B2 (`MD` uses `size/icon/md`)
- The component frame's min width and min height bind to `target/min` (48 hit area); the content stays centred
- Default instance: `Color=Brand`, `Size=MD`, `Underline=Always`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/link/link.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/link/link.md#d4-properties), with the Tablet differences listed in D2. Code props map to the Flutter names in B1 (`leadingIcon`, `external`, `onPressed: null` for `Disabled`).

### D5 Variants to generate

- Allowed `Color × Underline × State`: `Brand` × 2 × 4 = 8 · `Neutral` × `Always` × 4 = 4 · `Inverse` × 2 × 4 = 8 → **20**
- 20 × 3 sizes × 2 languages = **120 variants**
- Grid: rows = `Language › Size › Color › Underline`, columns = `State`; gap `spacing/xl`

### D6 States, interactions and motion

As Web D6 without the hover interaction. While pressing: Default → Pressed, smart animate per B4.

### D7 RTL

As [Web D7](../../../3-web-components/components/link/link.md#d7-rtl): `Language=AR` variants, reversed auto layout order, `open_in_new` mirrored, `mail` not.

### Inherited from Web (D1, D2, D3, D4, D6, D7, D8)

The Tablet Part D refers to these Web sections; they are copied here so you read one file. Apply the Tablet differences above on top.

#### D1 Rules for this build

0. **Library first, no component tokens (P-04).** Link has no `link.tokens.json`, so this file gets **no** `Link / …` collection. Bind layers directly to the Foundations variables listed in the contract (§3) by key — this is intended, not a gap; do not ask for component tokens in D11. Never create, copy or detach variables or styles. Lint (`figma-read-tokens.js`) must report 0.
1. **Every value is bound.** Fills, gap, min height, radius → variables; text → text styles `action/{sm|md|lg}`; focus → the `Focus ring` layer (border.md › Figma focus ring: stroke `color/border/focus`, `color/border/inverse` on Inverse). No raw hex / px. **Only literals allowed:** the label's underline thickness and offset (Figma text decoration cannot be bound to variables) — set them to the B2 / B3 values and list them in the QA report.
2. **Token → variable name:** replace `-` between segments with `/` — `color-link-hovered` → `1. Themes › color/link/hovered`; `spacing-xs` → `3. Spacing › spacing/xs`; `radius-xs` → `2. Radius › radius/xs`; `target-min` → `6. Grid & Layout › target/min`.
3. **Never** bind `_Primitive/*` or `_deprecated/*`.
4. **Layer names = anatomy part names** (A2): the component frame is the link root; children `leading-icon`, `label`, `external-icon`. The underline is the label's text decoration, not a layer.
5. Auto layout everywhere. No absolute positioning.
6. Icons are instances from the **Google · Material Symbols** library (Style=Rounded; D-18, keys in the contract), never detached. Their vector fills bind to the same colour variable as the `label`.

#### D2 Component structure

```
❖ Link                           ← component set (published) on page ↳ Link
```

No private base components.

#### D3 Layer tree and auto layout

```
Link                      ↔ horizontal · align center/center · gap {B2 gap} · padding 0
│                           height hug, min height {B2 min block size} · width hug · radius {B2 focus radius}
│                           no fill · `Focus ring` layer visible (State=Focused; stroke `color/border/inverse` when Color=Inverse)
├── leading-icon          ◇ Material Symbols instance · size {B2 icon} · fill {B3 colour} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
├── label                 T text style action/{sm|md|lg} · fill {B3 colour} · decoration Underline per B3 · TEXT `Label` · hug
└── external-icon         ◇ Material Symbols `open_in_new` instance · size {B2 icon} · fill {B3 colour} · BOOLEAN `External`
```

```
┌───────────────────────────────────┐
│ [◆]  Contact support  [▸]         │
└───────────────────────────────────┘
  ②        ①  ‾‾‾ ③      ④
```

#### D4 Properties

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

#### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · `motion-duration-sm` · standard easing (B4) |
| While pressing | Hover → Pressed | Smart animate · `motion-duration-xs` |

`Focused` shows the ring for docs and handoff; it is not a prototype interaction. `Visited` is a static variant.

#### D7 RTL

Method: `Language=AR` variants. In AR variants: reverse the auto layout order (`external-icon`, `label`, `leading-icon`, so the leading icon stays at the inline start), text align end, Arabic sample label from A6. Mirror the `open_in_new` glyph (B5); never mirror `mail`.

```
EN  │ [◆]  Contact support  [▸] │
AR  │ [◂]  التواصل مع الدعم  [◆] │
```

#### D8 Documentation pages

Build the 12 standard pages per `_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts, inside section `Link — Documentation` on `↳ Link`, frames `Link / 00 Component sheet` … `Link / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Link:
- 01 Introduction: one inline example (a body paragraph with a link) and one standalone example, Light + Dark panels.
- 03 Variations: blocks for `Color` (`Inverse` on a `color/background/brand/default` tile), `Size`, `Underline`, `Leading icon`, `External`. Inline (`size="inherit"`): a body paragraph whose link words use the `body/md` text style with the `color/link/default` fill and underline applied to that text range — the one example that is not an instance, because Figma cannot place an instance inside running text; label it "Inline — code `size=\"inherit\"`".
- 05 Usage: Link vs Button (`text`) side by side.
- 09 Accessibility: focus ring examples (default and Inverse), the external announcement text in EN and AR, `target-min` overlay on a standalone `SM` link.

Component description: "Takes people to another page or resource. Spec: 3-web-components/components/link/link.md".

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Link — Documentation` on `↳ Link` in this file, built only from the Doc Kit (blocked until it is published). Page notes as Web D8, plus: 07 Platform — `Doc/Device frame` = Tablet landscape + Tablet portrait; 03 Variations shows the inline link inside a helper-text paragraph (one unbreakable piece); 09 Accessibility — `target-min` (48) overlay around `SM`.

Component description: "Takes people to another screen or resource. Spec: 4-tablet-components/components/link/link.md".

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

`4-tablet-components/lib/src/components/link/bw_link.figma.dart` — `Color` / `Size` / `Underline` → enums, `Label` → `label`, `Leading icon glyph` → `leadingIcon: Symbols.*_rounded`, `External` → `external`, `State=Disabled` → `onPressed: null`. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Link` in the Tablet file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count = 120
- [ ] F-AC-3 Zero raw values except the underline thickness and offset; zero local variables and styles
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline), incl. the 48 hit area
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](link.md#d11-execution-log-filled-by-the-figma-agent) in `link.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `link.md` and in `4-tablet-components/README.md`.
3. `npm run sync:done:tablet` — records this contract as built in the Tablet file.
4. Add one line to the root `CHANGELOG.md`.
