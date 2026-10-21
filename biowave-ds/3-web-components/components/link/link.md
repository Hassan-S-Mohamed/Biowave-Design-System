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
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/link/` — not built yet (the Executor creates it) |
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

None. All tokens exist in Foundations: `color-link-default` · `-hover` · `-pressed` · `-visited`, `color-text-neutral-default` · `-inverse` · `-disabled`, `color-border-focus` · `-inverse`, `border-width-default` · `-strong` · `-focus`, `border-focus-offset`, `radius-xs`, `spacing-xs` · `-xxs`, `size-icon-sm` · `-md`, `target-min`, `action-sm|md|lg`, `motion-duration-*`, `motion-easing-standard`. No component tokens (P-04).

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
| Agent | |
| Date | |
| Files changed | |

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

### D8 Documentation pages

Build the 12 standard pages per `_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts, inside section `Link — Documentation` on `↳ Link`, frames `Link / 00 Component sheet` … `Link / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Link:
- 01 Introduction: one inline example (a body paragraph with a link) and one standalone example, Light + Dark panels.
- 03 Variations: blocks for `Color` (`Inverse` on a `color/background/brand/default` tile), `Size`, `Underline`, `Leading icon`, `External`. Inline (`size="inherit"`): a body paragraph whose link words use the `Web/en/body/md` text style with the `color/link/default` fill and underline applied to that text range — the one example that is not an instance, because Figma cannot place an instance inside running text; label it "Inline — code `size=\"inherit\"`".
- 05 Usage: Link vs Button (`text`) side by side.
- 09 Accessibility: focus ring examples (`Focus/Ring`, `Focus/Ring Inverse`), the external announcement text in EN and AR, `target-min` overlay on a standalone `SM` link.

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
- [ ] F-AC-7 Interactions per D6; component description filled; `Focus/Ring` and `Focus/Ring Inverse` applied
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
| — | — | not reviewed | not reviewed |

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
