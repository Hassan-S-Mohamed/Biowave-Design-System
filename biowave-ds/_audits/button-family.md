# Figma audit — Button family (Button · Split button · Icon button · Button group)

> Agent summary: what already exists in Figma for the four button components, what is missing to meet the Biowave Definition of done (ROADMAP §2), and the decisions **B-01 … B-05** that must be closed before the Day 1 specs are written. Read-only audit: nothing in Figma was changed.

| Field | Value |
|---|---|
| File | Design System `AyFaSmfDUlTax3GpKhRdHI` |
| Pages | `↳ Button` 1268:1755 · `↳ Split Button` 4831:26807 · `↳ Icon Button` 4831:29896 · `↳ Button group` 4833:35914 · Mobile `↳ Buttons` 3991:1583 |
| Date | 2026-10-15 |
| Method | Plugin API scan of every variant: properties, variable bindings (fills, strokes, padding, gap, radius), text styles, effects, nested instances |

## 1. Summary

| Component | Figma sets | Variants | Variable binding | Readiness | Biggest gaps |
|---|---|---:|---|---|---|
| Button | `.Button _en` 3998:4847 · `.Button _ar` 4000:712 | 360 × 2 | Colors 66 % · padding 100 % · radius 50 % · text styles 0 % | 🟠 Needs rework | Icons can't be swapped, no loading state, hardcoded label/icon colors, naming clash (Type=Primary vs Color=Primary), focus ring off-spec |
| Split button | `Split Button/EN` 4298:3591 · `/AR` 4298:3881 | 144 × 2 | Colors 94 % · padding 100 % · text styles 34 % | 🟠 Needs rework | Colors stored in `Type`, `Ghost` stored as a state, menu built inside the component, no separate states for the two segments, no open/expanded state |
| Icon button | `Icon Button` 4310:3146 (+ `/ Appearance` 4310:2356, `/ Glyph` 4310:1555) | 90 (+160, +10) | Colors 100 % · padding 100 % · radius 82 % | 🟢 Good base | Naming alignment, target size for XS/S, menu built in, radius bindings |
| Button group | `Button Group/EN` 4833:35916 · `/AR` 4833:35989 | 18 × 2 | Colors 100 % · gap 75 % | 🟡 Partial | No alignment / overflow / wrap rules; `Platform` variant instead of layout rules |
| **Code** | — | — | — | 🔴 None | No guidelines, specs, plans, `figma.md`, code, tests or Code Connect for any of the four |

## 2. Cross-cutting gaps (all four components)

| ID | Gap | Evidence | Fix |
|---|---|---|---|
| G-01 | **Property names and values don't match across the family, or with the tokens** | Emphasis: Button `Type=Primary·Secondary·Tertiary`; Split `State=…Ghost`; Icon `Style=Standard·Filled·Tonal·Outlined`; old mobile `Type=Filled·Tonal·Outline·Text`. Color: Button `Primary…White`; Split/Icon `Brand…Default`; tokens say `brand`. State: `Idle·Hovered` vs `Default·Hover`. Size: `XLarge·Medium·Small` vs `XL·M·SM` vs `XS…XL`; AGENTS.md says `sm·md·lg·xl` | One vocabulary for the family (B-01 … B-03), then rename the Figma properties to match |
| G-02 | **Separate EN and AR component sets** double the maintenance, and they have already drifted | Option order differs (`Color=Secondary·Neutral·…·Primary` in AR); AR Split has one extra unbound stroke | Decide B-04 |
| G-03 | **Duplicate and legacy buttons** on the Mobile `Buttons` page | `Buttons` 4131:1124 (60, padding 0 % bound), icon `Buttons` 4131:2710 (15), `Default Button/EN·AR` 4858:41924 / 4858:42702 (144 each, a 3rd naming scheme), and copies of `.Button _en/_ar` 4882:46761 / 4882:48846 | Decide B-05: one Button per family, move the rest to `_Deprecation Ground` |
| G-04 | **Component variables exist only in Figma**, not in the token source (breaks D-01; `npm run sync` can't verify them) | Collections `Button size` (7: `control/padding-x`, `control/icon-label-gap`, `icon/size` …), `Component Tokens / Link` (121), `Avatar size` (84), `Checkbox size` (5), `Radio button size` (4) | P-04: move the shared values into semantic **control** tokens in `2-foundations/tokens` (ROADMAP Day 0.5), run sync, rebind |
| G-05 | **Focus ring doesn't match `a11y.md`** | Drop shadow, spread 3, hardcoded `#254471`; inner `Border` rectangle r=16, unbound | 2px ring (`border-width-focus`), 2px offset (`border-focus-offset`), `color-border-focus`, radius = control radius + offset (token) |
| G-06 | **Deprecated variable still bound** | `_deprecated/color/text/neutral/on/neutral` on Button labels | Rebind to the current `color/text/on/*` |
| G-07 | **Documentation doesn't follow the standard** | `↳ Button` holds two old doc sets ("Button Documentation —" ×5, "Button Docs — 1…6") plus ~30 product screen frames. The others have only `_Introduction` + `_Thumb`. The 12 standard pages need the Doc Kit, which isn't built yet | Build the Doc Kit (Day 0.3), produce the 12 pages per component, move screen audits to a separate `Usage audit` section or page |
| G-08 | **Menu built inside the components** | `Show Menu Buttons` boolean on Split and Icon button contains `Scroll Bar`, `Cursor`, `Row Icon`, `Placeholder` instances | Remove it. A component shows only its open state (chevron rotated / selected); the menu is the Menu component (Day 10) placed in examples |

## 3. Per-component gaps

### Button
| # | Missing or wrong | Detail |
|---|---|---|
| 1 | **Icon swap** | `Leading Icon` / `Trailing Icon` are BOOLEAN only; the glyph is fixed to `keyboard_arrow_down`. Add `INSTANCE_SWAP` properties with preferred icons |
| 2 | **Loading state** | No spinner state. Needed for submit flows (sign-in, approvals) |
| 3 | **Hardcoded colors** | 492 / 1440 fills unbound: icon vectors and some labels (`#ffffff`, `#0a0a0a`, warning/error hexes `#aa5b1c` `#c31f1f` …). Every one must use `color/text/on/*` or `color/icon/*` |
| 4 | **Text styles** | 0 / 360 labels use a text style (font variables are bound directly). Apply the `label`/`action` role style so EN/AR typography switches by mode |
| 5 | **Radius** | Half of the radius values unbound (focus ring layer) |
| 6 | **Width** | No `Full width` option (mobile bottom actions, dialogs) |
| 7 | **Icon-only** | Covered by Icon button, so Button should **not** get an icon-only option. Write that in the guidelines |
| 8 | **Colors** | 8 colors × 3 types × 5 states × 3 sizes = 360 variants per language. Warning/Info filled buttons are rare in enterprise systems. See B-02 |
| 9 | **Effects** | 120 effects with no effect style (focus) — see G-05 |

### Split button
| # | Missing or wrong | Detail |
|---|---|---|
| 1 | **Property model** | `Type` holds colors; `Ghost` is an emphasis, not a state. Re-model as Button: `Emphasis` × `Color` × `State` × `Size` |
| 2 | **Two independent hit areas** | Main action and chevron have separate hover/focus/pressed; today one `State` drives both. Add `Segment state` or build from two nested Button instances |
| 3 | **Open state** | No `Expanded=True` (chevron rotated, `aria-expanded`) |
| 4 | **Icon swap** | Leading icon is BOOLEAN only |
| 5 | **Reuse** | Should be built from nested Button + Icon button instances so it inherits their fixes. Today it is drawn separately |
| 6 | **Text styles** | 50 / 147 labels styled |
| 7 | **Menu inside** | See G-08 |

### Icon button
| # | Missing or wrong | Detail |
|---|---|---|
| 1 | Naming | `Style=Standard` ↔ Button's text emphasis; `Color=Default` ↔ `Neutral`. Align with B-01/B-02 |
| 2 | **Target size** | XS/S visual sizes are below 24 px (web) / 48 dp (touch). Spec must define an invisible target area per size; Figma shows it in the a11y page |
| 3 | Sizes | `XS…XL` must map to the control size tokens (B-03) |
| 4 | Radius | 991 radii, 810 bound — bind the rest |
| 5 | Loading / badge | Decide if needed (notification bell uses Badge on Icon button — better as composition, not a variant) |
| 6 | Menu inside | See G-08 |
| ✅ | Good already | Glyph / Appearance / Icon Button layers, `Type=Default·Toggle` + `Selected`, `Width`, `Shape`, `Tooltip label`. Keep this structure as the model for the family |

### Button group
| # | Missing or wrong | Detail |
|---|---|---|
| 1 | Definition | It's an **action layout** (primary + secondary + link), not a connected control. The connected control is **Segmented button** (Day 8). State this in the guidelines |
| 2 | **Alignment** | No `Align = Start · End · Center · Space between · Fill` |
| 3 | **Wrap / stack rule** | `View=Horizontal·Vertical` is manual. Define when it stacks (narrow width, mobile) and the order when stacked (primary on top) |
| 4 | **RTL order** | Primary action position in LTR vs RTL not defined |
| 5 | **Overflow** | No "More" Icon button + menu for 4+ actions |
| 6 | `Platform` variant | Replace with size + alignment rules; platform differences go in guidelines §8 |
| 7 | Gaps | 54 / 72 bound; gap must be `spacing-md` (token) |

## 4. Decisions (✅ confirmed by design lead 2026-10-16 — all recommendations accepted)

| ID | Question | Options | Decision |
|---|---|---|---|
| B-01 | Emphasis names (one list for Button, Split, Icon button) | (a) `filled · tonal · outlined · text` (M3 + MUI `contained · outlined · text`) · (b) `primary · secondary · tertiary` | ✅ **(a)** `filled · tonal · outlined · text` |
| B-02 | Which colors a button can have | (a) all 8 · (b) `brand · neutral · error · inverse` (+ `secondary` if teal actions are used) | ✅ **(b)** `brand · secondary · neutral · error · inverse` (secondary kept: teal actions exist in the products) |
| B-03 | Size names and heights | `sm 32 · md 40 · lg 48` (+ `xl 56` for mobile primary only) | ✅ `sm 32 · md 40 · lg 48 · xl 56` (xl tablet/mobile only). Tokens `size.control.height.*` (P-04). Touch default `lg` |
| B-04 | EN / AR sets | (a) keep two sets · (b) one set with `Language = EN · AR` variant | ✅ **(b)** one set, `Language = EN · AR` |
| B-05 | Duplicate mobile buttons (G-03) | Keep one family; deprecate the rest | ✅ Deprecate them all to `_Deprecation Ground`; swap instances to the new Button |

> **Update 2026-10-16 (D-12):** components are no longer migrated in place. Each platform builds a new set in its own file (Web / Tablet / Mobile Components); the sets listed above stay in the Foundations file as read-only legacy references and move to `_Deprecation Ground` after the new sets are approved. All gaps above still apply to the new builds.

## 5. Work to complete the family (after B-01 … B-05)

| Step | Owner | Output |
|---|---|---|
| 1 | Planner | Control tokens in `2-foundations/tokens` (G-04) → `npm run tokens` → sync to Figma |
| 2 | Planner | `6-component-guidelines/{button,split-button,icon-button,button-group}.md` |
| 3 | Planner | Per platform (W, T, M): `specs/<name>/README.md` + `plan.md` + `figma.md` (12 spec docs) |
| 4 | Figma Agent | Fix G-01 … G-08 and the per-component gaps by following `figma.md`; build the 12 doc pages |
| 5 | Code Executors | React (MUI) + Flutter tablet + Flutter mobile components with tests |
| 6 | Reviewer | `review.md` per platform → Approved → Code Connect |
