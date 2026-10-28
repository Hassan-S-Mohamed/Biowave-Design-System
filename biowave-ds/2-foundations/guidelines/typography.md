# Typography

| Script | Family | Fallback |
|---|---|---|
| Latin (en) | **Inter** | system-ui, -apple-system, Segoe UI, Roboto |
| Arabic (ar) | **IBM Plex Sans Arabic** | Noto Sans Arabic, Tahoma |
| Mono (`code` role only) | **JetBrains Mono** | SFMono-Regular, Menlo, Consolas |

The active family follows the language automatically: `:lang(ar)` on web, `BwTheme.build(locale:)` in Flutter, the frame mode in Figma. Do not set font families in components.

## How it is built — one name, everywhere

```
platform tokens (web / tablet / mobile)          → size, line height (en · ar), role weight
   │
   ├── Web     .bw-text-body-md · <Typography variant="bodyMd">      platform: viewport / data-platform · language: :lang(ar)
   ├── Flutter context.bw.text.bodyMd                                 platform: package (tablet/mobile) · language: locale
   └── Figma   text style  body/md                                     platform + language: frame mode of "5. Typography"
```

**Figma.** One collection **`5. Typography`** with six modes: `Web · EN`, `Web · AR`, `Tablet · EN`, `Tablet · AR`, `Mobile · EN`, `Mobile · AR`. **23 text styles** named `{role}/{size}` — the same name as the code class. A style never changes by platform or language: set the mode on the page or frame (Mobile component file → `Mobile · EN`; an Arabic frame → `Mobile · AR`) and size, line height, weight and family switch together.

| Figma variable | Code token | What it holds |
|---|---|---|
| `font/family/default` | `--bw-font-family` | Inter in EN modes, IBM Plex Sans Arabic in AR modes |
| `font/family/mono` | `--bw-font-family-mono` | JetBrains Mono (all modes) — `code` role only |
| `font/size/{role}/{size}` | `--bw-font-size-{role}-{size}` | Size per platform (same for EN and AR) |
| `font/line-height/{role}/{size}` | `--bw-font-line-height-{role}-{size}` | Line height per platform and language (AR taller) |
| `font/weight/{role}` | `--bw-font-weight-{role}` | Role weight (Figma: font style name per family) |
| `font/letter-spacing/display` · `default` | `--bw-font-letter-spacing-*` | −0.16px for Latin display, 0 everywhere else |

`action` variables are **aliases**: `action/lg` = `title/lg`, `action/md` = `label/lg`, `action/sm` = `label/md` (size, line height and weight). They never drift; the role name stays so components say what the text is for.

## Roles

| Role | Job |
|---|---|
| display | Rare hero numbers or titles |
| heading | Page title (`lg`), section (`md`), subsection (`sm`) |
| title | Card, panel, sheet titles |
| body | Paragraphs and table text (`body/md` is the default) |
| label | Form labels, tabs, chips, menu and nav items |
| caption | Helper text, errors under fields, timestamps, metadata |
| action | Text inside buttons and links (aliased to label/title) |
| data | Numbers, times, counts — tabular numerals |
| code | Serial numbers, IDs, keys — monospace, Latin only |

## Styles — what each one is for, and its values

Size / line height in px (logical px on Flutter); line height shown English · Arabic.

| Style (Figma) · class (web) · getter (Flutter) | Used for | Weight | Web size / LH en · ar | Tablet | Mobile |
|---|---|---|---|---|---|
| `display/lg` | Hero title, rare: onboarding splash, report cover, empty dashboard hero. Not for page titles. | 600 | 40 / 40 · 50 | 34 / 42 · 44 | 36 / 44 · 48 |
| `display/md` | Large feature title: featured report title, sign-in screen title. | 600 | 32 / 36 · 40 | 30 / 38 · 40 | 32 / 40 · 44 |
| `heading/lg` | Page title, one per screen: Web page header · Tablet/Mobile large top app bar. | 600 | 24 / 32 · 34 | 26 / 34 · 36 | 28 / 36 · 40 |
| `heading/md` | Section heading · Dialog/Modal title on Tablet and Mobile. | 600 | 20 / 28 · 30 | 22 / 30 · 32 | 24 / 32 · 34 |
| `heading/sm` | Subsection heading · Dialog/Modal and Drawer title on Web · Avatar group title. | 600 | 18 / 24 · 26 | 18 / 26 · 28 | 20 / 28 · 30 |
| `title/lg` | Card, Panel, Side sheet, Bottom sheet title · primary line of two-line List items · large Avatar name. | 500 | 16 / 24 · 26 | 18 / 26 · 28 | 18 / 28 · 30 |
| `title/md` | Compact title: sidebar widget, dense card, table group header, Menu section header. | 500 | 14 / 22 · 24 | 16 / 24 · 26 | 16 / 24 · 26 |
| `body/lg` | Long reading text: empty state, onboarding · Alert/Banner body on Tablet and Mobile. | 400 | 16 / 24 · 26 | 16 / 26 · 28 | 18 / 28 · 30 |
| `body/md` | Default text: paragraphs, Table cells, List items, Text field value, Alert body, rich Tooltip body. | 400 | 14 / 22 · 24 | 16 / 24 · 26 | 16 / 24 · 26 |
| `body/sm` | Secondary body: List item second line, card description, Snackbar on Web. | 400 | 13 / 20 · 22 | 14 / 22 · 24 | 14 / 22 · 24 |
| `label/lg` | Prominent label: Tab, Segmented control, Navigation bar item, large Text field label, Avatar initials (lg). | 500 | 14 / 20 · 22 | 16 / 24 · 26 | 16 / 24 · 26 |
| `label/md` | Standard label: Text field label, Chip, Menu item, Side-nav item, Table header. | 500 | 13 / 18 · 20 | 14 / 20 · 22 | 14 / 20 · 22 |
| `label/sm` | Smallest label: Badge text, Tag/Lozenge, plain Tooltip, Avatar initials (sm/md). | 500 | 12 / 16 · 18 | 12 / 18 · 20 | 12 / 16 · 18 |
| `caption/md` | Helper and error text under fields, character counter, timestamps, metadata, Breadcrumbs. | 400 | 12 / 16 · 18 | 12 / 18 · 20 | 12 / 18 · 20 |
| `caption/sm` | Web only: very dense metadata (table footnotes, chart axis labels). | 400 | 11 / 16 · 18 | 12 / 18 · 20 | 12 / 18 · 20 |
| `action/lg` | Button, Link — size lg (= title/lg). | 500 | 16 / 24 · 26 | 18 / 26 · 28 | 18 / 28 · 30 |
| `action/md` | Button, Icon button label, Split button, Button group, Link — size md, default (= label/lg). | 500 | 14 / 20 · 22 | 16 / 24 · 26 | 16 / 24 · 26 |
| `action/sm` | Button, Link — size sm (= label/md). | 500 | 13 / 18 · 20 | 14 / 20 · 22 | 14 / 20 · 22 |
| `data/lg` | KPI / metric on dashboards and stat cards. | 500 | 20 / 28 · 30 | 22 / 30 · 32 | 24 / 32 · 34 |
| `data/md` | Numbers in tables: dates, times, durations, counts, attendance hours. | 500 | 14 / 20 · 22 | 16 / 24 · 26 | 16 / 24 · 26 |
| `data/sm` | Badge count, secondary metric, chart value labels. | 500 | 12 / 16 · 18 | 13 / 18 · 20 | 13 / 18 · 20 |
| `code/md` | Device serial numbers, user/device IDs, API keys, codes in tables and detail panels. | 400 | 13 / 20 · 20 | 14 / 22 · 22 | 14 / 22 · 22 |
| `code/sm` | Inline IDs in captions and dense table cells. | 400 | 12 / 16 · 16 | 12 / 18 · 18 | 12 / 18 · 18 |

Notes:
- Web body is 14px (dense dashboards). Tablet/Mobile body is 16px (Material 3 and iOS minimums for comfortable reading).
- `caption/sm` is 11px on **web only**; on tablet/mobile it equals `caption/md`.
- Weights are role-based (decision D-07, pending sign-off).

## Rules
- **Pick by job, not by size.** A button label is `action/*` even when it matches `label/*`.
- **Arabic:** never apply letter-spacing (connected script). Line heights are taller to fit marks; allow 20–30% more width than English.
- **Numbers:** `data/*` uses tabular numerals (`font-variant-numeric: tabular-nums`, built into `.bw-text-data-*` and `.bw-text-code-*`; Flutter `FontFeature.tabularFigures()`). Arabic UI uses Western digits for data (decision D-10).
- **Code:** `code/*` is Latin-only (serials, IDs). Inside Arabic text it stays LTR: wrap it in `<bdi>` / `dir="ltr"` (web) or `Directionality(textDirection: TextDirection.ltr)` (Flutter).
- **Case:** sentence case everywhere. No ALL CAPS in Arabic; avoid it in English except short overlines.
- **Line length:** 45–75 characters for paragraphs.
- **Colour is never part of a text style** — apply a `color/text/*` token.
- Respect user font scaling: Flutter must not clamp `TextScaler` below 1.0; web layouts must survive 200% zoom (WCAG 1.4.4).

## Using it
| Platform | How |
|---|---|
| Web (CSS) | `class="bw-text-body-md"` (family, size, line height, weight, letter-spacing, numerals in one class) |
| Web (MUI) | `<Typography variant="bodyMd">` · `codeMd` · `actionMd` … (also mapped: h1=displayLg … body1=bodyMd, button=actionMd) |
| Flutter | `context.bw.text.bodyMd` · `codeMd` … or `Theme.of(context).textTheme.bodyMedium` |
| Figma | Text style `body/md` + frame mode of `5. Typography` |

## Fonts setup
- Web: self-host via `@fontsource/inter`, `@fontsource/ibm-plex-sans-arabic` (400/500/600/700) and `@fontsource/jetbrains-mono` (400).
- Flutter: add the font files to the app's `pubspec.yaml` with family names exactly `Inter`, `IBM Plex Sans Arabic` and `JetBrains Mono` (`BwFontFamily.en/ar/mono`). All three fonts are SIL OFL licensed.
