# Link · رابط — Tablet

> **One file for Link on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet link`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Link · رابط |
| Summary | Takes people to another page, screen or resource, inside a sentence or on its own. |
| Summary (ar) | ينقل المستخدم إلى صفحة أو شاشة أو مورد آخر، داخل جملة أو بشكل مستقل. |
| Parts | Label · leading icon · underline · external icon · focus ring |
| Parts (ar) | التسمية · أيقونة البداية · الخط السفلي · أيقونة الرابط الخارجي · حلقة التركيز |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom widget: `InkWell` (no splash, no overlay) + `Text`, icons by `BwIcon`; inline links through `BwLink.span` (`WidgetSpan`). M3 has no link widget |
| Import | `BwLink` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Link` (page Typography mode `Tablet`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-21 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/link/` — not built yet (the Executor creates it) |
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

### A8 Platform notes — Tablet

```
Tablet — standalone under a form              Tablet — inline in helper text
┌───────────────────────────────────────┐     ┌──────────────────────────────┐
│ [■■■■■■■■■■■■ Sign in ■■■■■■■■■■■■■■] │     │ Device not listed? Contact   │
│            Reset password             │     │ support for help.            │
└───────────────────────────────────────┘     │ (the link moves to the next  │
                                              │  line as one piece)          │
                                              └──────────────────────────────┘
```

| | Tablet |
|---|---|
| Available | ✓ |
| Default size | `md` (standalone `BwLink`); inline links take the surrounding text style |
| Interaction | Touch; hover and keyboard with a pointer or keyboard attached |
| `external` | Opens the browser app (the app opens the URL) |
| `show-visited` | Not supported (no browser history in the app) |
| Inline links | Placed in rich text; an inline link does not break across lines — keep it short (A6) |
| Touch target | Standalone: 48 hit area (`target-min`) · inline: WCAG 2.5.8 inline exception |

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

Context: Tablet app (landscape and portrait, two-pane layouts). Hover and keyboard are supported when a pointer or keyboard is attached.

### B1 API

#### BwLink (standalone)

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

#### BwLink.span (inline) — static method returning `InlineSpan`

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

### B7 Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

// Standalone under a sign-in form
BwLink(label: 'Reset password', onPressed: () => context.go('/reset-password'));

// Card header, underline on hover / press
BwLink(label: 'View all requests', size: BwLinkSize.sm, underline: BwLinkUnderline.hover, onPressed: openRequests);

// External, with a leading icon (the app opens the URL)
BwLink(label: 'Contact support', leadingIcon: Symbols.mail_rounded, external: true, onPressed: () => launchUrl(supportUri));

// Inline in helper text
Text.rich(TextSpan(children: [
  const TextSpan(text: 'Device not listed? '),
  BwLink.span(context, label: 'Contact support', onPressed: openSupport),
  const TextSpan(text: ' for help.'),
]));

// Arabic: same code; MaterialApp(locale: Locale('ar')) + BwTabletTheme gives RTL, the Arabic font and the Arabic hint
BwLink(label: 'التواصل مع الدعم', external: true, onPressed: () => launchUrl(supportUri));
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Golden tests: every `color` × `size` × allowed `underline`, plus `BwLink.span` in a paragraph, in light + dark and `Locale('en')` + `Locale('ar')`, with the real fonts (`test/flutter_test_config.dart`) and Material Symbols glyphs
- [ ] States: hovered, pressed, focused (keyboard highlight mode), disabled — text colour and decoration read from the rendered `Text` equal B3
- [ ] Underline: `always` at rest; `hover` none at rest and present when hovered, pressed or focused; disabled none; thickness ratio on hover / pressed
- [ ] External: `open_in_new` shown; semantics hint in en and ar; `externalHint` overrides it
- [ ] Semantics: `link: true`, name = label, read once (no duplicate label node); disabled `enabled: false` and not focusable
- [ ] `onPressed` called on tap, Enter and Space; not called when disabled
- [ ] Hit area: `BwLink` `sm` at least `BwLayout.tablet.minTarget` on both axes while the visible content keeps its size; `meetsGuideline(androidTapTargetGuideline)` and `textContrastGuideline` for every `color` in light **and** dark (inverse on `backgroundBrandDefault`)
- [ ] Focus ring: rect = content rect inflated by `BwBorder.focusOffset + BwBorder.widthFocus`, colour per B3, first frame, no layout change, never in touch mode
- [ ] Text scale 2.0: label wraps, nothing clipped
- [ ] RTL: `open_in_new` flipped exactly once; `mail` not flipped
- [ ] Each invalid combination in B1 asserts in debug
- [ ] No raw values in the widget file (no `Color(0x`, numeric sizes, `Duration(milliseconds:`); the no-legacy-icons guard still passes

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `link-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> Executor: read `AGENTS.md`, `4-tablet-components/README.md`, this file and the spec [Part B](#b--spec). Nothing else unless linked here.
> **The spec is the contract.** This plan says how to build it.

| Field | Value |
|---|---|
| Component | Link |
| Platform | Tablet (Flutter + M3) |
| Depends on | BwIcon (tablet) **Approved**; shared `BwFocusRing` (`lib/src/common/bw_focus_ring.dart`, from BwButton) |
| Plan version | 1 · 2026-10-21 |

### C1 Goal

`BwLink` and `BwLink.span` from `package:biowave_tablet/biowave_tablet.dart` meet B1–B6 in light/dark and en/ar using only tokens, and pass B9.

### C2 Scope

**In scope**
- [ ] B1 API (`BwLink`, `BwLink.span`, enums `BwLinkColor`, `BwLinkSize`, `BwLinkUnderline`) · B2 · B3 · B4 · B5 · B6 · B9

**Out of scope (do not build)**
- Opening URLs or routes (no `url_launcher` or router dependency; the app does it in `onPressed`)
- Visited state (web only)
- Breadcrumbs, menu or navigation items

### C3 Approach

- **Base:** custom widget — `InkWell` with `splashFactory: NoSplash.splashFactory`, `overlayColor: WidgetStatePropertyAll(Colors.transparent)`, `highlightColor`/`hoverColor`/`focusColor` transparent, `mouseCursor` per B6, `customBorder` from `BwRadius.xs`; a `WidgetStatesController` tracks hovered / pressed / focused for B3.
- **Text:** `Text(label, style: context.bw.text.action{Sm|Md|Lg}.copyWith(color: …, decoration: …, decorationColor: …, decorationThickness: …))`; colours from `context.bw.colors.*` per B3. Underline per B2/B3 (`TextDecoration.none` for `hover` at rest and for disabled).
- **Icons:** `BwIcon` (no raw `Icon(`): size from B2 (`BwIconSize` for `sm`/`md`/`lg`; for the span, an `IconTheme` with `size` = the label font size), colour = the label colour through `IconTheme`.
- **Hit area:** `ConstrainedBox(minWidth/minHeight: BwLayout.tablet.minTarget)` + `Center` around the content, inside the `InkWell`; the focus ring wraps the content only.
- **Focus ring:** reuse `lib/src/common/bw_focus_ring.dart` (the ring `BwButton` uses), with `radius-xs` and the content rect.
- **Span:** `static InlineSpan span(BuildContext context, {…})` returns `WidgetSpan(alignment: PlaceholderAlignment.baseline, baseline: TextBaseline.alphabetic, child: _BwLinkInline(...))`; `_BwLinkInline` uses `style ?? DefaultTextStyle.of(context).style` and the same state, semantics and focus code as `BwLink` (shared private builder, no copied styling).
- **Motion:** `AnimatedDefaultTextStyle` with `BwDuration.sm` / `BwDuration.xs` and `BwEasing.standard` per B4; `BwDuration.instant` when `context.bw.reduceMotion`.
- **Gotchas:** Flutter `decorationThickness` is a multiplier of the font's own thickness, so hover uses the token ratio (B2); Flutter has no underline offset (accepted platform difference, B2). A `WidgetSpan` cannot wrap across lines — that is the reason for the A6 length rule. Do not use `TapGestureRecognizer` on a `TextSpan`: it has no focus, hover or semantics support.

### C4 Token gaps

None. All tokens exist in Foundations (`color-link-*`, `color-text-default` · `-inverse` · `-disabled`, `color-border-focus` · `-inverse`, `border-width-*`, `border-focus-offset`, `radius-xs`, `spacing-xs`, `size-icon-sm` · `-md`, `target-min`, `action-*`, `motion-*`). No component tokens (P-04).

### C5 Files to create / change

```
4-tablet-components/lib/src/components/link/bw_link.dart   new (BwLink, BwLink.span, BwLinkColor, BwLinkSize, BwLinkUnderline)
4-tablet-components/test/link_test.dart                    new
4-tablet-components/test/goldens/link/                     new (golden images)
4-tablet-components/lib/biowave_tablet.dart                       change: export
4-tablet-components/README.md                              change: status row
CHANGELOG.md                                   change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Existing Button and Icon tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives; icons only through `BwIcon`
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5 (one flip, by `BwIcon`); a11y as B6 (link semantics read once, hit area, focus ring)
- [ ] AC-5 Tests in B9 + C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; `4-tablet-components/README.md` status row and the `link.md` header updated to `Built`
- [ ] AC-7 No ink splash, no state overlay; `BwLink.span` shares the state / semantics / focus code with `BwLink`

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
- **Typography mode:** on page `↳ Link` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/action/{sm|md|lg}`; the mode gives the Tablet scale.
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

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Link — Documentation` on `↳ Link` in this file, built only from the Doc Kit (blocked until it is published). Page notes as Web D8, plus: 07 Platform — `Doc/Device frame` = Tablet landscape + Tablet portrait; 03 Variations shows the inline link inside a helper-text paragraph (one unbreakable piece); 09 Accessibility — `target-min` (48) overlay around `SM`.

Component description: "Takes people to another screen or resource. Spec: 4-tablet-components/components/link/link.md".

### D9 Code Connect

`4-tablet-components/lib/src/components/link/bw_link.figma.dart` — `Color` / `Size` / `Underline` → enums, `Label` → `label`, `Leading icon glyph` → `leadingIcon: Symbols.*_rounded`, `External` → `external`, `State=Disabled` → `onPressed: null`. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Link` in the Tablet file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count = 120
- [ ] F-AC-3 Zero raw values except the underline thickness and offset; zero local variables and styles
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline), incl. the 48 hit area
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `{id}` · docs section `{id}` |
| QA report | |

**Deviations:** none
**Questions for the Planner:** none

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
| 1.0 | 2026-10-21 | Initial: custom `InkWell` + text, `BwLink.span` for inline links, semantic tokens only (no component tokens, P-04) | No | — |
