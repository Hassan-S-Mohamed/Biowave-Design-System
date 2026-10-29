# Link · رابط — Web

> **One file for Link on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web link`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Link · رابط |
| Summary | Takes people to another page, screen or resource, inside a sentence or on its own. |
| Summary (ar) | ينقل المستخدم إلى صفحة أو شاشة أو مورد آخر، داخل جملة أو بشكل مستقل. |
| Parts | Label · leading icon · underline · external icon · focus ring |
| Parts (ar) | التسمية · أيقونة البداية · الخط السفلي · أيقونة الرابط الخارجي · حلقة التركيز |
| Platform | Web · React + MUI |
| Built on | MUI `Link` (native `<a href>`), styled only from Biowave tokens; MUI underline, palette colours and typography are not used |
| Import | `import { Link } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Link` · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-21 |
| Plan | Finished |
| Code | Approved |
| Figma build | Planned |
| Review | Round 2 · 2026-10-24 · Approved |
| Source code | `src/components/link/` (built) |
| Tokens | — (no component tokens: every value is a shared semantic token, P-04) |
| Contracts | [`link-contract.md`](link-contract.md) · [`figma-link-contract.md`](figma-link-contract.md) — generated, never edited |
| Docs page | [`link.html`](link.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/link/link.md#b--spec) · [Tablet](../../../4-tablet-components/components/link/link.md#b--spec) · [Mobile](../../../5-mobile-components/components/link/link.md#b--spec) |
| Figma | `↳ Link` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Depends on | [Icon](../icon/icon.md#a--guidelines) (leading and external icons, D-18) |
| Version | 1.0 · 2026-10-21 |

### A1 Overview

A link takes people somewhere else: another page or screen, a help article, a policy, or a site outside Biowave. It sits inside a sentence (inline) or on its own (standalone), for example "Reset password" under a sign-in form or "View all requests" in a card header. A link **goes somewhere**; it never changes data — that is a [Button](../button/button.md#a--guidelines). Links are always recognisable by more than colour: inline links are always underlined.

### A2 Anatomy

```
 Inline — inside body text
   Read the ①Privacy policy before you continue.
              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ③

 Standalone
   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ ⑤
     ②[◆]  ①Contact support  ④[▸]
   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ③
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `label` | Yes | Says where the link goes. It is the link's name for screen readers |
| 2 | `leading-icon` | No | Standalone only. A Material Symbols glyph that adds meaning (mail, help, description) |
| 3 | `underline` | Yes, inline · option, standalone | Marks the label as a link without relying on colour. Drawn under the `label` only, never under the icons |
| 4 | `external-icon` | With `external` only | `open_in_new` glyph after the label: the link leaves the product |
| 5 | `focus-ring` | Focus only | Shows keyboard focus around the whole link |

### A3 Usage

**When to use**
- Inside a sentence, to point to more information: a policy, a help article, a related record
- Standalone, for navigation that is not the main action: "Reset password", "View all requests", "Contact support"
- In helper text and empty states, to point to the place where the problem is fixed
- To open a page outside Biowave (with `external`)

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| The action saves, deletes, submits or changes data | [Button](../button/button.md#a--guidelines) (`text` variant for a quiet action) |
| The main call to action of a screen or dialog | [Button](../button/button.md#a--guidelines) `filled` |
| The action has only an icon | [Icon button](../icon-button/icon-button.md#a--guidelines) |
| Switching between views of the same content | Tabs |
| Showing the path back to parent pages | Breadcrumbs |
| The main navigation of the app | Side menu / navigation bar |
| Starting a file download or an export job | [Button](../button/button.md#a--guidelines) with a leading icon |

### A4 Options

#### 4.1 `color`

| Value | Looks like | Pick it when |
|---|---|---|
| `brand` | Link blue, underlined | **Default.** Links in content, forms and cards |
| `neutral` | Body text colour, always underlined | Dense text where blue is too loud: footers, legal text, table cells, metadata |
| `inverse` | Light text, underlined | On navy, brand or other dark inverse surfaces |

#### 4.2 `size`

| Value | Pick it when |
|---|---|
| `inherit` | **Inline** — the link is part of a sentence; it takes the surrounding text style |
| `sm` | Standalone, next to caption or helper text, in dense toolbars and table footers |
| `md` | Standalone default: under forms, in card headers, in lists |
| `lg` | Standalone, next to large body text and in empty states |

#### 4.3 `underline`

| Value | Looks like | Pick it when |
|---|---|---|
| `always` | `Contact support` with a line under it | **Default.** Required for inline links and for `neutral` |
| `hover` | No line until hovered, pressed or focused | Standalone links whose place already says "link": card header "View all", a list of links, a footer. On touch screens the line shows while pressed or focused |

#### 4.4 `leading-icon`

An optional icon before the label, for standalone links only, when it adds meaning ("Contact support" with `mail`, "Help centre" with `help`). Never decoration. Arrows that only repeat "go there" are not needed.

#### 4.5 `external`

| Value | Pick it when |
|---|---|
| off | **Default.** The destination is inside the product |
| on | The link leaves the product: a new browser tab on web, the browser app on tablet and mobile. Shows the `external-icon` and tells screen readers |

#### 4.6 `show-visited` (web only)

On for links in long content and help pages, where people benefit from seeing which pages they already opened. Off (default) in app navigation, forms and dashboards, where "visited" means nothing. Available with `brand` only.

**Combination rules**
- Inline links (`size` = `inherit`) are always underlined and have no `leading-icon`
- `neutral` links are always underlined (`underline` = `hover` is not allowed)
- `show-visited` works with `brand` only
- One link, one destination: never put two links side by side with the same label

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | At rest | Link colour; underline per `underline` |
| Hover | Pointer over (web, tablet with a pointer) | Darker link colour (`brand`), thicker underline; `hover` links show their underline |
| Focus | Keyboard focus | Focus ring around the whole link (see [a11y](../../../2-foundations/guidelines/a11y.md)); `hover` links show their underline |
| Pressed | Click, tap, Enter | Darkest link colour (`brand`), thicker underline |
| Visited | Web with `show-visited`, page already opened | Visited link colour |
| Disabled | The destination is not available yet | Disabled text colour, no underline, not focusable. Prefer hiding the link or explaining why in text next to it |

**Behavior rules**
- Inline links wrap with the sentence like the rest of the text; standalone labels wrap to a second line instead of being cut — links are never truncated
- Long Arabic text (+20–30% width): standalone links wrap; inline links stay short (A6), because on tablet and mobile an inline link does not break across lines
- `external` links open a new tab (web) or the browser (tablet, mobile); internal links never open a new tab
- A link with nothing to show (empty label) is a bug, not a state

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| `label` | Says where it goes or what opens: the destination's title, or verb + object. Makes sense out of context (screen readers list links alone). Never "Click here", "Here", "Read more", "Link" | 5 words · ~32 characters EN |
| `label` (inline) | The words of the sentence that name the destination — not the whole sentence | 5 words |
| `label` (external) | Do not write "(opens in a new tab)" — the component adds it for screen readers | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Reset password | إعادة تعيين كلمة المرور | Click here |
| Privacy policy | سياسة الخصوصية | Read more |
| View all requests | عرض كل الطلبات | More… |
| Contact support | التواصل مع الدعم | Here |
| View attendance | عرض الحضور | Go |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Use a link to go somewhere | Use a link to save, delete or submit — use a Button |
| Write labels that say the destination ("Privacy policy") | Write "Click here" or "Read more" |
| Keep inline links underlined | Mark inline links with colour alone |
| Use `external` for pages outside Biowave | Open internal pages in a new tab |
| Use `inverse` on navy and brand surfaces | Put a `brand` link on a brand surface |
| Keep one size and underline style in a list of links | Mix sizes, colours and underline styles in one list |

### A8 Platform notes — Web

```
Web — inline in a paragraph                    Web — standalone under a form
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│ Read the Privacy policy before you    │     │ [■■■■■■ Sign in ■■■■■■] │
│          ‾‾‾‾‾‾‾‾‾‾‾‾‾‾               │     │      Reset password     │
│ continue.                             │     │      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾     │
└───────────────────────────────────────┘     └─────────────────────────┘
```

| | Web |
|---|---|
| Available | ✓ |
| Default size | `inherit` (inline); standalone links usually `md` |
| Interaction | Hover + click + keyboard; middle-click and "open in new tab" work because it is a real `<a href>` |
| `external` | Opens a new browser tab |
| `show-visited` | ✓ |
| Router links | Pass the app router's link component; styles and behaviour stay the same |
| Touch target | Standalone: at least `target-min` (24) high · inline: WCAG 2.5.8 inline exception |

### A9 Accessibility (design)

- Every link can be reached and opened with the keyboard (Tab, then Enter) and with screen readers in English and Arabic; screen readers announce it as a link
- The label alone says where the link goes; icons are decorative and not read
- `external` links tell screen readers that they leave the product ("opens in a new tab" / "يفتح في علامة تبويب جديدة" on web, "opens in your browser" / "يفتح في المتصفح" on tablet and mobile)
- Colour is never the only signal: inline and `neutral` links are always underlined
- Focus is always visible on keyboard focus; `inverse` links use the inverse focus ring
- Label contrast meets 4.5:1 against its surface in light and dark
- Standalone links meet the platform target size (`target-min`); inline links in a sentence use the WCAG 2.5.8 inline exception, so keep two inline links apart by at least a word
- Disabled links are not focusable, so the reason must be visible on screen as text

### A10 Related components

- [Button](../button/button.md#a--guidelines) — for actions; `text` buttons look quiet like links but do something
- [Icon](../icon/icon.md#a--guidelines) — provides the `leading-icon` and the `external-icon`
- [Button group](../button-group/button-group.md#a--guidelines) — can hold a Link as a secondary action ("Cancel and go back")
- [Text field](../text-field/text-field.md#a--guidelines) — helper text can contain an inline link
- Breadcrumbs — a row of links showing the path (Day 10)

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### Link

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
| `brand` | `color-link-default` | `color-link-hovered` | `color-link-pressed` | `color-link-visited` | `color-text-disabled` |
| `neutral` | `color-text-default` | `color-text-default` | `color-text-default` | — | `color-text-disabled` |
| `inverse` | `color-text-inverse` | `color-text-inverse` | `color-text-inverse` | — | `color-text-disabled` |

| Part | `underline` | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|---|
| `underline` | `always` | `border-width-default` | `border-width-strong` | `border-width-strong` | `border-width-default` | none |
| `underline` | `hover` | none | `border-width-default` | `border-width-default` | `border-width-default` | none |

| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` |

Contrast: `color-link-default` is checked against the page and surface colours in `2-foundations/scripts/contrast-pairs.json` (4.5:1); `-hovered` and `-pressed` are darker in light and lighter in dark, so they keep at least that contrast. Dark theme: same tokens, values switch automatically. No exceptions.

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

### B7 Examples

```tsx
import { Link, Icon } from '@biowave/web';
import { Link as RouterLink } from 'react-router-dom';

// Inline, inside body text
<p>Read the <Link href="/privacy">Privacy policy</Link> before you continue.</p>

// Standalone under a sign-in form, through the app router
<Link component={RouterLink} to="/reset-password" href="/reset-password" size="md">Reset password</Link>

// Card header, underline on hover
<Link href="/requests" size="sm" underline="hover">View all requests</Link>

// External, with a leading icon
<Link href="https://support.example.com" size="md" external startIcon={<Icon name="mail" />}>Contact support</Link>

// Arabic (direction, font and the external suffix come from BiowaveProvider locale="ar")
<Link href="https://support.example.com" size="md" external>التواصل مع الدعم</Link>

// On a navy surface
<Link href="/attendance" size="md" color="inverse">View attendance</Link>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every `color` × `size` × allowed `underline` in light + dark and en + ar: the generated CSS rules for `label`, `underline` and icons use the B3 `cssVars` (assert rules, not jsdom layout)
- [ ] States: hover, `:active`, `:focus-visible`, disabled; `:visited` rule exists only with `showVisited` + `brand`
- [ ] Underline: drawn on `.bw-link__label` only; thickness and offset tokens per B2/B3; `underline="hover"` has none at rest and one on hover and focus
- [ ] `size="inherit"`: `font: inherit`, `display: inline`, no `min-block-size`; standalone sizes: `action-*` variant and `min-block-size: target-min`
- [ ] External: `target="_blank"`, `rel="noopener noreferrer"`, `open_in_new` Icon with `directional`, accessible name = label + suffix in en and ar; `externalLabel` overrides the suffix
- [ ] Disabled: no `href` attribute, `role="link"`, `aria-disabled="true"`, not tabbable, `onClick` not called
- [ ] `component`: renders the given component, forwards `to`, keeps the Link classes
- [ ] Each invalid combination in B1 warns once and renders its fallback
- [ ] RTL: exactly one element flips the `external-icon` (the Icon itself); `mail` does not flip
- [ ] axe: no violations for each `color` in both themes; Enter follows the link (keyboard table B6)
- [ ] No raw values (hex, px, ms, font names) in `Link.tsx` and `link.tokens.ts`; the D-18 guard (`noLegacyIcons.test.ts`) still passes

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `link-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec). Nothing else unless linked here.
> **The spec is the contract.** This plan says how to build it.

| Field | Value |
|---|---|
| Component | Link |
| Platform | Web (React + MUI) |
| Depends on | Icon (web) **Approved** — `Icon` from `src/components/icon/`; shared helpers `src/internal/warnOnce.ts`, `src/internal/visuallyHidden.ts`, test helper `src/test/render.tsx` |
| Plan version | 1 · 2026-10-21 |

### C1 Goal

`import { Link } from '@biowave/web'` renders inline and standalone links per B1–B3 using only Biowave tokens, behaves as B4–B6 in light/dark and en/ar, opens external links safely, works with an app router through `component`, and is covered by B9.

### C2 Scope

**In scope**
- [ ] B1 API (all props) · B2 Dimensions · B3 Tokens · B4 States · B5 RTL · B6 Accessibility · B9 Tests

**Out of scope (do not build)**
- Breadcrumbs, menu items, navigation items (separate components)
- Any router dependency (`react-router-dom` is only an example; the consumer passes `component`)
- A link that looks like a button (use `Button` with `href`)

### C3 Approach

- **Base:** wrap MUI `Link` (`@mui/material/Link`) with `underline="none"` and `color="inherit"`, so MUI adds no colour, underline or typography of its own. All styling comes from one `styled()` wrapper that reads transient props (`$color`, `$size`, `$underline`, `$showVisited`) — never forwarded to the DOM.
- **Token map:** `link.tokens.ts` exports typed tables `color → { default, hover, pressed, visited?, disabled }` and `size → { typography, icon }` whose values are `cssVars.*` references (B2–B3). The styled wrapper reads only these tables.
- **Label and underline:** render the children inside `<span class="bw-link__label">`. The underline is `text-decoration-line: underline` on that span with `text-decoration-thickness: cssVars.border.width.default` (hover / active: `.strong`), `text-underline-offset: cssVars.spacing.xxs`, `text-decoration-color: currentColor`. `underline="hover"` sets `text-decoration-line: none` at rest and `underline` on `:hover`, `:active`, `:focus-visible`.
- **Typography:** `sm`/`md`/`lg` use `actionSm|actionMd|actionLg` from `biowaveVariants` (size and line height are CSS variables, so Arabic switches automatically); `inherit` sets `font: inherit` and `display: inline`.
- **Icons:** `startIcon` is wrapped in `<span class="bw-link__icon" aria-hidden="true">` whose `font-size` is the B2 icon token (the Icon without `size` follows it; for `inherit` the wrapper uses `1em`). The external icon is `<Icon name="open_in_new" directional />` in the same wrapper. Link never adds `bw-icon-directional` to a wrapper (the Icon flips itself once, B5).
- **External:** add `target="_blank"`, `rel="noopener noreferrer"` and a visually hidden `<span>` with `externalLabel` after the label (helper `src/internal/visuallyHidden.ts`). Default text by locale: `const { locale } = useBiowave()` — the same pattern Button uses for `loadingLabel`.
- **Visited:** add `&:visited { color: cssVars.color.link.visited }` only when `$showVisited && $color === 'brand'`.
- **Disabled:** render the root without `href`, with `role="link"`, `aria-disabled="true"`, `cursor: default`; wrap `onClick` to `preventDefault` and do nothing; colours per B3 Disabled, `text-decoration-line: none`.
- **Focus:** remove MUI's focus visual; `&:focus-visible, &.Mui-focusVisible` get the B6 outline; `box-decoration-break: clone` for inline wraps.
- **Router:** `component` is passed to MUI `Link` (`component={component}`); type the props like MUI's `LinkProps<'a', { component?: React.ElementType }>` so `to` and other props are accepted.
- **Invalid combinations:** `warnOnce` from `src/internal/warnOnce.ts`; fallbacks exactly as B1.
- **Gotchas:** MUI `Link` defaults to `underline="always"` with a palette colour at 40% alpha and `variant="inherit"` typography — override both. Browsers only allow `color` (and a few colour properties) in `:visited`. The name `Link` clashes with router `Link` imports — keep `Link` (no `Bw` prefix on web, AGENTS.md §4) and show the alias in the JSDoc (`import { Link as RouterLink }`).

### C4 Token gaps

None. All tokens exist in Foundations: `color-link-default` · `-hovered` · `-pressed` · `-visited`, `color-text-default` · `-inverse` · `-disabled`, `color-border-focus` · `-inverse`, `border-width-default` · `-strong` · `-focus`, `border-focus-offset`, `radius-xs`, `spacing-xs` · `-xxs`, `size-icon-sm` · `-md`, `target-min`, `action-sm|md|lg`, `motion-duration-*`, `motion-easing-standard`. No component tokens (P-04).

### C5 Files to create / change

```
3-web-components/src/components/link/Link.tsx         new
3-web-components/src/components/link/link.tokens.ts   new (typed map of B2–B3 → cssVars)
3-web-components/src/components/link/Link.test.tsx    new
3-web-components/src/components/link/index.ts         new: export { Link } and types LinkProps, LinkColor, LinkSize, LinkUnderline
3-web-components/src/index.ts                         change: export Link and its types
3-web-components/README.md                            change: status row
CHANGELOG.md                                          change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Rendered with `renderWithBiowave` for the 4 theme × locale combinations
- [ ] "No raw values" text test on `Link.tsx` and `link.tokens.ts` (same regex as Button)
- [ ] A `component` test with a minimal fake router link (`forwardRef((p, ref) => <a ref={ref} href={p.to} {...p} />)`), no router dependency

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token via `cssVars` / theme variants; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5 (one flip, by the Icon); a11y as B6 (external suffix in en and ar, disabled not focusable)
- [ ] AC-5 Tests in B9 + C6 exist and pass; `npm run typecheck`, `npm run test:web`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; `3-web-components/README.md` status row and the `link.md` header updated to `Built`
- [ ] AC-7 MUI underline, palette colour and typography of `Link` are fully overridden; icons only through the Biowave `Icon`

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-24 |
| Built | Web Link 1.0: token-only inline and standalone styling, every API fallback, external and router behavior, disabled and visited states, localized accessibility, RTL icon handling, public exports, and contract coverage. |
| Files changed | `3-web-components/src/components/link/Link.tsx`, `link.tokens.ts`, `Link.test.tsx`, `index.ts`; `3-web-components/src/index.ts`; `3-web-components/README.md`; `3-web-components/components/link/link.md`; `CHANGELOG.md` |
| Checks | `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✓; `npm run typecheck` ✓; `npm run test:web` ✓ 123/123 |

#### Fix round 1 — 2026-10-24

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 🟡 | Removed the synthesized external-link `aria-label`; the visible label and visually hidden suffix now form the accessible name, while a consumer `aria-label` passes through unchanged (`Link.tsx:290`, `Link.tsx:299-307`). | `Link.test.tsx:344` — `renders safe external links with localized and overridden accessible suffixes` covers EN, AR, an overridden suffix, and an unchanged consumer label. |
| #2 🟢 | Removed disabled `tabIndex={-1}` so an anchor without `href` is naturally outside the tab order (`Link.tsx:286-292`). | `Link.test.tsx:393` — `removes disabled navigation and activation from the tab order`; assertions at `:409` and `:590` require no `tabindex`. |
| #3 🟢 | Gave empty and non-string labels separate `warnOnce` keys so each invalid case proves its own warning (`Link.tsx:255-259`). | `Link.test.tsx:575-580` asserts the non-string case emits `Link needs a text label` and increments the warning count. |
| #4 🟢 | Updated the header Source code field to point to the built component (`link.md:21`). | `npm run docs:check` ✓. |

Fix checks: `npm run docs:check` ✓; `npm run typecheck` ✓; `npm run test:web` ✓ 123/123 (default timeouts).

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-link-contract.md`.

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
1. **Every value is bound.** Fills, gap, min height, radius → variables; text → text styles `action/{sm|md|lg}`; focus → the `Focus ring` layer (border.md › Figma focus ring: stroke `color/border/focus`, `color/border/inverse` on Inverse). No raw hex / px. **Only literals allowed:** the label's underline thickness and offset (Figma text decoration cannot be bound to variables) — set them to the B2 / B3 values and list them in the QA report.
2. **Token → variable name:** replace `-` between segments with `/` — `color-link-hovered` → `1. Themes › color/link/hovered`; `spacing-xs` → `3. Spacing › spacing/xs`; `radius-xs` → `2. Radius › radius/xs`; `target-min` → `6. Grid & Layout › target/min`.
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

### D8 Documentation pages

Build the 12 standard pages per `_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts, inside section `Link — Documentation` on `↳ Link`, frames `Link / 00 Component sheet` … `Link / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Link:
- 01 Introduction: one inline example (a body paragraph with a link) and one standalone example, Light + Dark panels.
- 03 Variations: blocks for `Color` (`Inverse` on a `color/background/brand/default` tile), `Size`, `Underline`, `Leading icon`, `External`. Inline (`size="inherit"`): a body paragraph whose link words use the `body/md` text style with the `color/link/default` fill and underline applied to that text range — the one example that is not an instance, because Figma cannot place an instance inside running text; label it "Inline — code `size=\"inherit\"`".
- 05 Usage: Link vs Button (`text`) side by side.
- 09 Accessibility: focus ring examples (default and Inverse), the external announcement text in EN and AR, `target-min` overlay on a standalone `SM` link.

Component description: "Takes people to another page or resource. Spec: 3-web-components/components/link/link.md".

### D9 Code Connect

- File: `3-web-components/src/components/link/Link.figma.tsx`
- Mapping: D4 table. Publish only after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Link` on `↳ Link` in the Web file; layer names match D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 162; no `Neutral × Hover underline`; `Visited` only with `Brand`
- [ ] F-AC-4 Zero raw values except the underline thickness and offset listed in the QA report; every fill, gap, min height, radius, text and effect bound
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only); Typography mode `Web`; zero local variables and styles in the file
- [ ] F-AC-6 AR variants per D7; Arabic labels fit without truncation; `open_in_new` mirrored, `mail` not
- [ ] F-AC-7 Interactions per D6; component description filled; `Focus ring` layer (focus / inverse stroke) present and bound
- [ ] F-AC-8 Values match B2–B3 one by one (redline check on every `Color` × `Size` in Default and Hover)
- [ ] F-AC-9 Documentation pages built from the Doc Kit (or reported blocked) with the page notes above

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `{id}` · docs section `{id}` |
| QA report | {unbound values: 0 · literals: underline thickness, offset · contrast: pass} |

**Deviations** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 2 | 2026-10-24 | **Approved** | not reviewed |
| 1 | 2026-10-24 | Changes requested | not reviewed |


### E3 Round 2 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.0 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Code reviewed | `git diff origin/main...HEAD -- 3-web-components/src` on `ds/link-web`; fix round = `db4041d fix(link/web): round 1` (`components/link/Link.tsx`, `Link.test.tsx`) |
| Verdict | **Approved** — all four Round 1 findings fixed; the accessible name of external, consumer-labelled and disabled links is right in a real browser in light/dark × en/ar; nothing else regressed. One new 🟢 nit (a test guard), not blocking |
| Evidence | Run by the Reviewer on `ds/link-web`: `npm run docs:check` ✅ · `npm run typecheck` ✅ · `npm run test:web` ✅ 9 files, 123/123 (5.6 s, default timeouts, load avg 3.3). Headless Chrome 154 (own instance, CDP port 9333, real Tab / mouse input, accessible names from the Chrome accessibility tree `Accessibility.getPartialAXTree`) on a scratch page rendering the real `Link` from `src/index.ts` through `BiowaveProvider` with `tokens.css` + `icons.css`, 1440 px wide, in light/en, dark/ar, light/ar and dark/en |

#### Round 1 findings

| # | Status | Evidence |
|---|---|---|
| 1 🟡 external `aria-label` | **Fixed** | `Link.tsx:290` passes only the consumer `aria-label`; the suffix comes only from the hidden span (`Link.tsx:302-307`). Chrome AX tree, name source `contents` (no attribute): md "Contact support (opens in a new tab)", inline "Privacy policy that wraps lines (opens in a new tab)", AR "التواصل مع الدعم (يفتح في علامة تبويب جديدة)", `externalLabel` "Help New window", sm / lg the same in both locales. Consumer `aria-label="Support portal"` on an external link → name "Support portal", source `aria-label`, attribute unchanged (no suffix appended); non-external `aria-label="Go home"` → "Go home". Test `Link.test.tsx:344` "renders safe external links with localized and overridden accessible suffixes" (consumer case `:381-390`) |
| 2 🟢 disabled `tabIndex={-1}` | **Fixed** | `tabIndex` removed (`Link.tsx:286-292`). Browser: no `tabindex` attribute, AX `disabled: true`, not focusable; Tab order skips both disabled links in all four combos; a real mouse click on the disabled and disabled-external label leaves focus on `BODY` and the URL unchanged; `cursor: default`. Tests `:409`, `:590` |
| 3 🟢 non-string label warning | **Fixed** | Separate `warnOnce` keys (`Link.tsx:255-259`); test asserts the non-string case's own "Link needs a text label" and the count going 5 → 6 (`Link.test.tsx:579-580`) |
| 4 🟢 header `Source code` | **Fixed** | `link.md` header: "`src/components/link/` (built)"; `docs:check` ✅ |

#### Browser measurements (headless Chrome, Round 2 regression pass)

| What | Spec | Measured |
|---|---|---|
| Accessible names | B6: label, + suffix for `external` | See finding 1 above; disabled "Disabled link" / "معطل", role link, `disabled: true` |
| Hidden suffix span | visually hidden, no layout effect | `position: absolute`, 1 × 1 px, `clip: rect(0 0 0 0)`; the new `display: block` is a no-op for layout (absolute boxes are blockified) and gives Chrome the word break before the suffix. Inline external link still wraps to 2 line boxes with `open_in_new` 4 px after the last word (en x 97 → 101; ar 1398 → 1394); no horizontal page overflow (scrollWidth 1440 = viewport) |
| Standalone block size | `target-min` (24 px) | sm · md · lg 24 · 24 · 24 px (en); AR lg 26 px (`action-lg` AR line height 26, above the minimum) |
| Gap · icons | `spacing-xs` · `size-icon-sm` | 4 px · 16 px |
| Underline (`always`) rest → hover | `border-width-default` → `-strong`, offset `spacing-xxs`, label only | 1 px → 2 px, offset 2 px, root `none`, hidden span `none` (md and inline) |
| Colours | `color-link-*`, disabled `color-text-disabled` | light `rgb(37,89,212)` → hover `rgb(29,72,173)`, disabled `rgb(150,150,150)`; dark `rgb(109,156,232)`, disabled `rgb(84,84,84)` — same as Round 1 |
| Focus (`:focus-visible` by Tab) | 2 px solid `color-border-focus`, offset 2 px, radius `radius-xs` | light `rgb(37,68,113)`, dark `rgb(144,163,188)`; 2 px solid, offset 2 px, radius 4 px |
| RTL (dark/ar, light/ar) | leading icon at inline start; `open_in_new` flipped once by the Icon; `mail` not flipped | leading x 1400, label x 1296, external x 1276; external glyph `matrix(-1,0,0,1,0,0)`, wrapper `none`, `mail` `none`; LTR glyph `none` |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ✅ | Unchanged from Round 1 (`Link.tsx:188-205`, fallbacks `:231-263`); consumer `aria-label` now forwarded unchanged (`:290`); test "warns once for each invalid combination and renders the documented fallback" (`Link.test.tsx:495`) |
| AC-2 Tokens only | ✅ | Fix adds no values (`display: 'block'` is a keyword); test "contains no raw colors, dimensions, durations, or font names" (`:133`); browser table |
| AC-3 Transitions B4; reduced motion | ✅ | Not touched by the fix; test "changes instantly in both directions between enabled and disabled" (`:308`); hover colour/underline measured |
| AC-4 RTL B5; a11y B6 | ✅ | Name = `children` + hidden span only (`Link.tsx:299-307`), en and ar measured; disabled: no `href`, `role="link"`, `aria-disabled`, not tabbable, not click-focusable, `onClick` not called (`:286-292`, `:265-271`; test `:393`); one flip by the Icon (test `:456`, browser RTL row) |
| AC-5 Tests B9 + C6; checks pass | ✅ | All B9 items covered as in Round 1, plus the consumer-label case (`:381-390`); `docs:check`, `typecheck`, `test:web` 123/123 ✅ |
| AC-6 Exported; statuses | ✅ | `src/index.ts` unchanged; header and README were `Built` at review start |
| AC-7 MUI styling overridden; Biowave Icon only | ✅ | `underline="none"`, `color="inherit"`, `variant="inherit"` (`Link.tsx:283-285`); only `<Icon name="open_in_new" directional />` (`:309`); no `@mui/icons-material` in `components/link/` |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Fix commit touches `Link.tsx`, `Link.test.tsx`, `link.md` (C8 + header), README, CHANGELOG, run record |
| No raw values / no primitives | ✅ | No new values |
| RTL first | ✅ | No new physical properties; RTL measured in both themes |
| Both themes, both languages, tested | ✅ | `renderWithBiowave` light/dark × en/ar unchanged; browser in all four combos |
| WCAG 2.2 AA | ✅ | Name from visible text + suffix (2.5.3 label in name holds), keyboard, focus ring, 24 px target, non-colour underline |
| Tests through `renderWithBiowave`, default timeouts | ✅ | New case uses `renderWithBiowave`; no timeout overrides |
| Stayed inside the contract | ✅ | Fix limited to findings 1–4; C8 Fix round 1 lists each change with `file:line` and test |
| Changelog | ✅ | `CHANGELOG.md` "[Fixed — Web Link review round 1] — 2026-10-24" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 5 | 🟢 Nit | `3-web-components/src/components/link/Link.test.tsx:351-360` | The en / ar external cases assert the name by role, which would also pass if a synthesized `aria-label` came back (the Round 1 bug). Nothing guards that the name comes from content | Optional: add `expect(enLink).not.toHaveAttribute('aria-label')` (and for the ar link) | Executor |

#### Notes and questions for the Planner (not blocking, no Plan change requested)

- Still open from Round 1 (plan wording, not code): `external` + `disabled` keeps the `open_in_new` icon and the suffix — Chrome reads "Disabled external (opens in a new tab)", which is slightly misleading for a link that opens nothing; and `disabled` + `component` still forwards `to`. A later plan version could say what both combinations show.

#### Next step

After-review gate → merge. Nit 5 can be picked up in a later version.

---

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.0 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Code reviewed | `git diff origin/main...HEAD -- 3-web-components/src` on `ds/link-web` (`8e29350 implement(link/web)`): `components/link/Link.tsx`, `link.tokens.ts`, `Link.test.tsx`, `index.ts`; `src/index.ts` |
| Verdict | **Changes requested** — solid build: every measured dimension, colour, focus ring and RTL position matches B2–B5 in light/dark × en/ar. 1 🟡 (external accessible name built with an undeclared `aria-label` on top of the B6 hidden span) and 3 🟢 nits |
| Evidence | Run by the Reviewer on `ds/link-web`: `npm run docs:check` ✅ · `npm run typecheck` ✅ · `npm run test:web` ✅ 9 files, 123/123 (6.6 s, default timeouts). Headless Chrome (CDP, real Tab / mouse input) on a scratch page rendering the real `Link` through `BiowaveProvider` with `tokens.css` + `icons.css`, 1440 px wide, light/en and dark/ar |

#### Browser measurements (headless Chrome)

| What | Spec | Measured |
|---|---|---|
| Standalone `sm` · `md` · `lg` block size | `target-min` (24 px web) | 24 · 24 · 24 px at 1440 px (`--bw-target-min` 24 px) |
| Label text style `sm` · `md` · `lg` | `action-sm|md|lg` | en 13/18 · 14/20 · 16/24 px, weight 500, Inter; ar 13/20 · 14/22 · 16/26 px, IBM Plex Sans Arabic |
| Inline (`inherit`) | parent font, `display: inline`, no min size | 14/22 px 400 = the paragraph; `inline`; `min-block-size: 0`; wraps over 3 lines with the `open_in_new` icon (1em = 14 px) after the last word |
| Icons `sm` · `md` · `lg` | `size-icon-sm` · `-sm` · `-md` | 16 · 16 · 20 px (wrapper and glyph) |
| Gap | `spacing-xs` | 4 px |
| Underline rest · hover/pressed (`always`) | `border-width-default` · `-strong`, offset `spacing-xxs` | 1 px · 2 px, offset 2 px, `currentColor`, label only (root `text-decoration: none`) |
| `underline="hover"` | none at rest; default width on hover, pressed, focus | none · 1 px · 1 px · 1 px |
| Colours light (default / hover / pressed) | `color-link-*` | `#2559D4` / `rgb(29,72,173)` / `rgb(21,55,134)`; neutral `#0A0A0A` constant; inverse `#FFFFFF`; disabled `#969696` |
| Colours dark | same tokens | `#6D9CE8` / `rgb(156,188,242)` / `rgb(203,220,250)`; neutral `#F7F7F7`; inverse `#0A0A0A`; disabled `#545454` |
| Focus (`:focus-visible` by Tab) | 2 px solid `color-border-focus`, offset 2 px, radius `radius-xs`; inverse `color-border-inverse` | light `#254471`, dark `#90A3BC`, inverse `#FFFFFF` / `#0A0A0A`; 2 px solid, offset 2 px, radius 4 px; label underlined on focus |
| Tab order | disabled skipped | inline → inlineExt → sm → md → lg → hover → neutral → inverse (disabled skipped) |
| Disabled | no hover/pressed change, `cursor: default` | colour and underline unchanged under hover and press; `cursor: default`; transition 0 s |
| RTL (`md`, dark/ar) | leading icon at inline start, `open_in_new` flipped once by the Icon | leading icon x 868 (right), label x 764, external icon x 744 (left); glyph `matrix(-1,0,0,1,0,0)`, wrapper `none`; `mail` not flipped |
| Motion | hover `motion-duration-sm`, pressed `-xs`, `standard` easing; reduced motion instant | `color 0.1s cubic-bezier(0.2,0,0,1)`; `:active` duration `-xs`; reduced motion through the `tokens.css` media query (durations 0 ms) |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ✅ | Props and defaults `Link.tsx:23-38`, `:188-205`; MUI `color` / `underline` / `variant` / `sx` / `target` / `rel` removed from the type (`Link.tsx:40-58`); every B1 fallback + warn once (`Link.tsx:208-260`; test "warns once for each invalid combination and renders the documented fallback"); `component` forwards `to` + ref (test "renders an app-router component, forwards to, href, ref, and Link classes") |
| AC-2 Tokens only | ✅ | `link.tokens.ts:15-82` uses `cssVars.*` and `biowaveVariants.action*` only; `1em` / `100%` are the B2 inline / layout values; test "maps every visual, layout, focus, underline, size, and motion value to cssVars"; raw-value guard (test "contains no raw colors, dimensions, durations, or font names"); browser table above |
| AC-3 Transitions B4; reduced motion | ✅ | `Link.tsx:98-99`, `:114-118`, `:152`, `:159`, `:171`, `:177`; enabled ↔ disabled instant both ways (`Link.tsx:210-229`, test "changes instantly in both directions between enabled and disabled"); reduced motion from `tokens.css` |
| AC-4 RTL B5; a11y B6 | ⚠️ | One flip by the Icon (`Link.tsx:306`; test "mirrors only the external Icon in RTL…"; browser RTL row). Disabled: no `href`, `role="link"`, `aria-disabled`, out of tab order, `onClick` not called (`Link.tsx:262-291`; test "removes disabled navigation…"). External name is right in en and ar, but it is produced by an `aria-label` the spec does not have — finding 1 |
| AC-5 Tests B9 + C6 pass; checks pass | ✅ | Every B9 item and C6 item has a test in `Link.test.tsx` (4 theme × locale renders `:142-207`; states `:211-266`; underline `:268-306`; external `:344-380`; disabled `:382-404`; component `:406-430`; Enter / Space `:432-443`; RTL `:445-465`; axe `:467-480`; fallbacks `:484-581`); `noLegacyIcons.test.ts` passes; all three checks pass |
| AC-6 Exported; statuses `Built` | ✅ | `src/index.ts` (diff, after Icon button); `components/link/index.ts:1-7`; README row and `link.md` header were `Built` at review start |
| AC-7 MUI styling overridden; Biowave Icon only | ✅ | `underline="none"`, `color="inherit"`, `variant="inherit"` + own styles (`Link.tsx:280-282`, `:82-98`); browser shows no MUI underline or palette colour; only `<Icon name="open_in_new" directional />` (`Link.tsx:306`); no `@mui/icons-material` |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Only `src/components/link/*` and `src/index.ts` in the code diff |
| No raw values / no primitives | ✅ | Semantic `cssVars` and theme variants only |
| RTL first (logical properties, icon mirroring) | ✅ | `minBlockSize`, `maxInlineSize`, `inlineSize`, `blockSize`, `marginInlineStart`; single flip by the Icon |
| Both themes, both languages, tested | ✅ | `renderWithBiowave` for light/dark × en/ar (`Link.test.tsx:142-207`); browser check in light/en and dark/ar |
| WCAG 2.2 AA | ⚠️ | Keyboard, focus ring, target size, non-colour cue all measured ✅; finding 1 on how the external name is built |
| Tests through `renderWithBiowave`, default timeouts | ✅ | Every render uses `renderWithBiowave`; no timeout overrides in `Link.test.tsx` |
| Stayed inside the contract | ⚠️ | Files = C5. C8 lists no deviations, but the `aria-label` (finding 1) and the extra `tabIndex={-1}` (finding 2) are not in B6 |
| Leftovers from the three-agent build | ✅ | No stray files, debug code, commented-out code, TODOs or untracked files on the branch; one C8 entry; one changelog line |
| Changelog | ✅ | `CHANGELOG.md` "[Added — Web Link 1.0] — 2026-10-24" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | `3-web-components/src/components/link/Link.tsx:287-289`, `:302-304` | For `external`, the root gets `aria-label="<label> <suffix>"` **and** the B6 visually hidden span. The `aria-label` replaces the content as the accessible name, so the hidden span is dead, a consumer `aria-label` is silently changed (suffix appended), and the name is no longer the visible text (browser translation does not translate `aria-label`). B6 asks for the name from `children` + the hidden span only; C8 lists no deviation | Remove the `external` branch of `aria-label`; pass a consumer `aria-label` through unchanged. Keep the hidden span as the only source of the suffix. The existing tests (`Link.test.tsx:351-378`) must still pass by role + name | Executor |
| 2 | 🟢 Nit | `3-web-components/src/components/link/Link.tsx:291` | Disabled adds `tabIndex={-1}`. An `<a>` without `href` is already out of the tab order; `-1` makes it focusable by mouse click, which B6 does not ask for | Drop `tabIndex` for disabled (update the two `tabindex` assertions, `Link.test.tsx:398`, `:578`, to `not.toHaveAttribute('tabindex')` and keep the Tab-order check) | Executor |
| 3 | 🟢 Nit | `3-web-components/src/components/link/Link.test.tsx:564-568` | The non-string `children` case cannot prove its own warning: the shared `warnOnce` key already fired for the empty label, so the test only checks the count stays 5 | Assert the warning for non-string children in its own case (e.g. a separate key, or reset `warnOnce` state between cases) | Executor |
| 4 | 🟢 Nit | `3-web-components/components/link/link.md:21` (header) | `Source code` still says "not built yet (the Executor creates it)" | Point it at `src/components/link/` (built) | Executor |

#### Notes and questions for the Planner (not blocking, no Plan change requested)

- `external` + `disabled`: the code drops `target` / `rel` but still renders the `open_in_new` icon and the "(opens in a new tab)" suffix. B1 / B6 do not say what this combination shows; worth one line in a later plan version.
- `disabled` + `component` (router link): `href` is dropped, but `to` is still forwarded, so a real router link renders an `href` (navigation is still blocked by `preventDefault` in `onClick`). B6 says "`<a>` without `href`"; a later plan version could say whether `to` is dropped too.
- Harness note: the inverse examples must sit on `color-surface-inverse` (not `color-background-inverse-default`, which is the light-on-light inverse button fill); with the right surface the token pair is the one in `contrast-pairs.json`.
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

Executor: findings 1–4 → C8 Fix round 1 → Code `Built` → review Round 2.

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — version 1.0. Filled when the version is above 1.0; it feeds Figma doc page 10.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-21 | Initial (ROADMAP Day 3) | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-21 | Initial: MUI `Link`, semantic tokens only (no component tokens, P-04) | No | — |
| 1.0 (wording) | 2026-10-29 | B3 / C4 prose: `color-link-hover` → `color-link-hovered` (colour tokens 2.0 name); no token or value change | No | — |
