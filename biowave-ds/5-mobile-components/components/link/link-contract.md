<!-- GENERATED from link.md @ fdda8a03a16ae379 — do not edit; change the source and run: npm run contract -- mobile link -->
# Link · رابط — Mobile — code contract

> **Everything you need to build Link on Mobile, and nothing else.** Read this file only. Generated from [`link.md`](link.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](link.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Link · رابط |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Custom widget: `InkWell` (no splash, no overlay) + `Text`, icons by `BwIcon`; inline links through `BwLink.span` (`WidgetSpan`). M3 has no link widget |
| Import | `BwLink` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-10-21 |
| Source code | `lib/src/components/link/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`link.md`](link.md) @ `fdda8a03a16ae379` |

## 1. What it is

A link takes people somewhere else: another page or screen, a help article, a policy, or a site outside Biowave. It sits inside a sentence (inline) or on its own (standalone), for example "Reset password" under a sign-in form or "View all requests" in a card header. A link **goes somewhere**; it never changes data — that is a [Button](../button/button.md#a--guidelines). Links are always recognisable by more than colour: inline links are always underlined.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `label` | Yes | Says where the link goes. It is the link's name for screen readers |
| 2 | `leading-icon` | No | Standalone only. A Material Symbols glyph that adds meaning (mail, help, description) |
| 3 | `underline` | Yes, inline · option, standalone | Marks the label as a link without relying on colour. Drawn under the `label` only, never under the icons |
| 4 | `external-icon` | With `external` only | `open_in_new` glyph after the label: the link leaves the product |
| 5 | `focus-ring` | Focus only | Shows keyboard focus around the whole link |

**Options** (names and values are the props in §2):

- 4.1 `color`
- 4.2 `size`
- 4.3 `underline`
- 4.4 `leading-icon`
- 4.5 `external`
- 4.6 `show-visited` (web only)

## 2. API

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

`BwLink.span` is always `underline: always` and has no leading icon (A4 combination rules). Not supported on Mobile: `showVisited` (web only, A8). Platform naming: Flutter `leadingIcon` = web `startIcon`; `onPressed` = web `href` + `onClick`; `onPressed: null` = web `disabled`; `BwLink.span` = web `size="inherit"`.

**Invalid combinations** (`assert` in debug; fallback in release):

| Combination | Fallback |
|---|---|
| `color: neutral` with `underline: hover` | `underline: always` |
| `label` empty | assert "BwLink needs a label" |
| `leadingIconDirectional: true` without `leadingIcon` | ignored |

## 3. Dimensions

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
   hit area ≥ target-min (BwLayout.mobile.minTarget), visual = content
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

Flutter access: `action-md` → `context.bw.text.actionMd` · `size-icon-md` → `BwSize.iconMd` · `spacing-xs` → `BwSpacing.xs` · `radius-xs` → `BwRadius.xs` · `border-width-focus` → `BwBorder.widthFocus` · `target-min` → `BwLayout.mobile.minTarget` · colours → `context.bw.colors.<camelCase>` (e.g. `linkDefault`).

Layout rules: `BwLink` is a `Row(mainAxisSize: MainAxisSize.min)` centred inside a hit area of at least `target-min` on both axes; the visual content keeps its own size (the hit area adds no visible padding). The label is `Flexible`, wraps (`softWrap: true`) and is never truncated. `BwLink.span` is a `WidgetSpan` aligned to the text baseline: it does not break across lines (A5, A6). The `focus-ring` is painted around the visible content, outside it, and takes no layout space.

## 4. Tokens by part and state

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

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-strong` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-inverse` | `context.bw.colors.borderInverse` | #FFFFFF | #0A0A0A |
| `color-link-default` | `context.bw.colors.linkDefault` | #2559D4 | #6D9CE8 |
| `color-link-hovered` | `context.bw.colors.linkHovered` | #1D48AD | #9CBCF2 |
| `color-link-pressed` | `context.bw.colors.linkPressed` | #153786 | #CBDCFA |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `color-text-inverse` | `context.bw.colors.textInverse` | #FFFFFF | #0A0A0A |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-duration-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 50 | 50 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `spacing-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter (pointer attached) | colour, underline | `motion-duration-sm` | `motion-easing-standard` |
| Default / Hover → Pressed | tap down · Enter / Space down | colour, underline | `motion-duration-xs` | `motion-easing-standard` |
| Pressed → Default | release | colour, underline | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus (`FocusManager.instance.highlightMode == traditional`) | focus ring appears | `motion-duration-instant` | — |
| Enabled ↔ Disabled | `onPressed` becomes / stops being `null` | colour, underline | `motion-duration-instant` | — |

Reduced motion: when `context.bw.reduceMotion` is true every duration is zero.

## 6. RTL

As [Web B5](../../../3-web-components/components/link/link.md#b5-rtl) (same wireframe and rules). Flutter: layout mirrors from `Directionality` (`Row` follows the text direction; `EdgeInsetsDirectional` only). The `external-icon` is `BwIcon(Symbols.open_in_new_rounded, directional: true)` — flipped once by `BwIcon`; the leading icon passes `directional: leadingIconDirectional`. `BwLink` never adds its own `Transform`.

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(link: true, label: label, hint: external ? externalHint : null, enabled: onPressed != null, onTap: onPressed)`; the `Text` and icons are excluded (`ExcludeSemantics` / `BwIcon` without `semanticLabel`) so the name is read once |
| Accessible name | `label` |
| External | Hint from `externalHint` (localized default by `Localizations.localeOf(context)`, the same way `BwButton` resolves `loadingLabel`) |
| Disabled | `onPressed: null` → not focusable, `enabled: false`, no hover / pressed |
| Focus | Keyboard highlight mode only: ring per B3 painted around the visible content (shared `BwFocusRing`, `lib/src/common/bw_focus_ring.dart`), shows on the first frame (no fade), takes no layout space |
| Target size | `BwLink`: hit area ≥ `BwLayout.mobile.minTarget` on both axes · `BwLink.span`: WCAG 2.5.8 inline exception |
| Text scale | Label and icons scale with the system text scale; the label wraps, the hit area grows |
| Cursor | `SystemMouseCursors.click`; disabled: `SystemMouseCursors.basic` |
| Screen reader output | "Privacy policy, link" / "سياسة الخصوصية، رابط" · external: "Contact support, link, Opens in your browser" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates (Flutter `ActivateIntent`) |

## 8. Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

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

// Arabic: same code; MaterialApp(locale: Locale('ar')) + BwMobileTheme gives RTL, the Arabic font and the Arabic hint
BwLink(label: 'التواصل مع الدعم', external: true, onPressed: () => launchUrl(supportUri));
```

## 9. How to build it

### Goal

`BwLink` and `BwLink.span` from `package:biowave_mobile/biowave_mobile.dart` meet B1–B6 in light/dark and en/ar using only tokens, and pass B9.

### Scope

**In scope**
- [ ] B1 API (`BwLink`, `BwLink.span`, enums `BwLinkColor`, `BwLinkSize`, `BwLinkUnderline`) · B2 · B3 · B4 · B5 · B6 · B9

**Out of scope (do not build)**
- Opening URLs or routes (no `url_launcher` or router dependency; the app does it in `onPressed`)
- Visited state (web only)
- Breadcrumbs, menu or navigation items

### Approach

- **Base:** custom widget — `InkWell` with `splashFactory: NoSplash.splashFactory`, `overlayColor: WidgetStatePropertyAll(Colors.transparent)`, `highlightColor`/`hoverColor`/`focusColor` transparent, `mouseCursor` per B6, `customBorder` from `BwRadius.xs`; a `WidgetStatesController` tracks hovered / pressed / focused for B3.
- **Text:** `Text(label, style: context.bw.text.action{Sm|Md|Lg}.copyWith(color: …, decoration: …, decorationColor: …, decorationThickness: …))`; colours from `context.bw.colors.*` per B3. Underline per B2/B3 (`TextDecoration.none` for `hover` at rest and for disabled).
- **Icons:** `BwIcon` (no raw `Icon(`): size from B2 (`BwIconSize` for `sm`/`md`/`lg`; for the span, an `IconTheme` with `size` = the label font size), colour = the label colour through `IconTheme`.
- **Hit area:** `ConstrainedBox(minWidth/minHeight: BwLayout.mobile.minTarget)` + `Center` around the content, inside the `InkWell`; the focus ring wraps the content only.
- **Focus ring:** reuse `lib/src/common/bw_focus_ring.dart` (the ring `BwButton` uses), with `radius-xs` and the content rect.
- **Span:** `static InlineSpan span(BuildContext context, {…})` returns `WidgetSpan(alignment: PlaceholderAlignment.baseline, baseline: TextBaseline.alphabetic, child: _BwLinkInline(...))`; `_BwLinkInline` uses `style ?? DefaultTextStyle.of(context).style` and the same state, semantics and focus code as `BwLink` (shared private builder, no copied styling).
- **Motion:** `AnimatedDefaultTextStyle` with `BwDuration.sm` / `BwDuration.xs` and `BwEasing.standard` per B4; `BwDuration.instant` when `context.bw.reduceMotion`.
- **Gotchas:** Flutter `decorationThickness` is a multiplier of the font's own thickness, so hover uses the token ratio (B2); Flutter has no underline offset (accepted platform difference, B2). A `WidgetSpan` cannot wrap across lines — that is the reason for the A6 length rule. Do not use `TapGestureRecognizer` on a `TextSpan`: it has no focus, hover or semantics support.

### Token gaps

None. All tokens exist in Foundations (`color-link-*`, `color-text-default` · `-inverse` · `-disabled`, `color-border-focus` · `-inverse`, `border-width-*`, `border-focus-offset`, `radius-xs`, `spacing-xs`, `size-icon-sm` · `-md`, `target-min`, `action-*`, `motion-*`). No component tokens (P-04).

### Files to create / change

```
5-mobile-components/lib/src/components/link/bw_link.dart   new (BwLink, BwLink.span, BwLinkColor, BwLinkSize, BwLinkUnderline)
5-mobile-components/test/link_test.dart                    new
5-mobile-components/test/goldens/link/                     new (golden images)
5-mobile-components/lib/biowave_mobile.dart                       change: export
5-mobile-components/README.md                              change: status row
CHANGELOG.md                                   change: one entry
```

## 10. Tests

- [ ] Golden tests: every `color` × `size` × allowed `underline`, plus `BwLink.span` in a paragraph, in light + dark and `Locale('en')` + `Locale('ar')`, with the real fonts (`test/flutter_test_config.dart`) and Material Symbols glyphs
- [ ] States: hovered, pressed, focused (keyboard highlight mode), disabled — text colour and decoration read from the rendered `Text` equal B3
- [ ] Underline: `always` at rest; `hover` none at rest and present when hovered, pressed or focused; disabled none; thickness ratio on hover / pressed
- [ ] External: `open_in_new` shown; semantics hint in en and ar; `externalHint` overrides it
- [ ] Semantics: `link: true`, name = label, read once (no duplicate label node); disabled `enabled: false` and not focusable
- [ ] `onPressed` called on tap, Enter and Space; not called when disabled
- [ ] Hit area: `BwLink` `sm` at least `BwLayout.mobile.minTarget` on both axes while the visible content keeps its size; `meetsGuideline(androidTapTargetGuideline)` and `textContrastGuideline` for every `color` in light **and** dark (inverse on `backgroundBrandDefault`)
- [ ] Focus ring: rect = content rect inflated by `BwBorder.focusOffset + BwBorder.widthFocus`, colour per B3, first frame, no layout change, never in touch mode
- [ ] Text scale 2.0: label wraps, nothing clipped
- [ ] RTL: `open_in_new` flipped exactly once; `mail` not flipped
- [ ] Each invalid combination in B1 asserts in debug
- [ ] No raw values in the widget file (no `Color(0x`, numeric sizes, `Duration(milliseconds:`); the no-legacy-icons guard still passes

Implement every item in B9, plus:
- [ ] Existing Button and Icon tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives; icons only through `BwIcon`
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5 (one flip, by `BwIcon`); a11y as B6 (link semantics read once, hit area, focus ring)
- [ ] AC-5 Tests in B9 + C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` status row and the `link.md` header updated to `Built`
- [ ] AC-7 No ink splash, no state overlay; `BwLink.span` shares the state / semantics / focus code with `BwLink`

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 5-mobile-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](link.md#c8-execution-log-filled-by-the-executor) in `link.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `link.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
