# Typography

| Script | Family | Fallback |
|---|---|---|
| Latin (en) | **Inter** | system-ui, -apple-system, Segoe UI, Roboto |
| Arabic (ar) | **IBM Plex Sans Arabic** | Noto Sans Arabic, Tahoma |
| Mono (IDs, serials, code) | JetBrains Mono | SFMono-Regular, Menlo, Consolas |

The active family follows the language automatically: `:lang(ar)` on web, `BwTheme.build(locale:)` in Flutter. Do not set font families in components.

## Type roles
Eight roles, each with sizes. Pick by **job**, not by size.

| Role | Job |
|---|---|
| display | Rare hero numbers or onboarding titles |
| heading | Page title (`heading-lg`), section (`md`), subsection (`sm`) |
| title | Card, panel, dialog titles |
| body | Paragraphs and table text (`body-md` is the default) |
| label | Form labels, tab labels, chips |
| caption | Helper text, timestamps, metadata |
| action | Text inside buttons and links |
| data | Numbers, times, counts, IDs (use tabular numerals) |

## Scale per platform
Size / line height in px (logical px on Flutter). Line height is shown for English · Arabic.

| Role | Weight | Web size / LH (en · ar) | Tablet | Mobile |
|---|---|---|---|---|
| `display-lg` | 600 | 40 / 40 · 50 | 34 / 42 · 44 | 36 / 44 · 48 |
| `display-md` | 600 | 32 / 36 · 40 | 30 / 38 · 40 | 32 / 40 · 44 |
| `heading-lg` | 600 | 24 / 32 · 34 | 26 / 34 · 36 | 28 / 36 · 40 |
| `heading-md` | 600 | 20 / 28 · 30 | 22 / 30 · 32 | 24 / 32 · 34 |
| `heading-sm` | 600 | 18 / 24 · 26 | 18 / 26 · 28 | 20 / 28 · 30 |
| `title-lg` | 500 | 16 / 24 · 26 | 18 / 26 · 28 | 18 / 28 · 30 |
| `title-md` | 500 | 14 / 22 · 24 | 16 / 24 · 26 | 16 / 24 · 26 |
| `body-lg` | 400 | 16 / 24 · 26 | 16 / 26 · 28 | 18 / 28 · 30 |
| `body-md` | 400 | 14 / 22 · 24 | 16 / 24 · 26 | 16 / 24 · 26 |
| `body-sm` | 400 | 13 / 20 · 22 | 14 / 22 · 24 | 14 / 22 · 24 |
| `label-lg` | 500 | 14 / 20 · 22 | 16 / 24 · 26 | 16 / 24 · 26 |
| `label-md` | 500 | 13 / 18 · 20 | 14 / 20 · 22 | 14 / 20 · 22 |
| `label-sm` | 500 | 12 / 16 · 18 | 12 / 18 · 20 | 12 / 16 · 18 |
| `caption-md` | 400 | 12 / 16 · 18 | 12 / 18 · 20 | 12 / 18 · 20 |
| `caption-sm` | 400 | 11 / 16 · 18 | 12 / 18 · 20 | 12 / 18 · 20 |
| `action-lg` | 500 | 16 / 24 · 26 | 18 / 26 · 28 | 18 / 28 · 30 |
| `action-md` | 500 | 14 / 20 · 22 | 16 / 24 · 26 | 16 / 24 · 26 |
| `action-sm` | 500 | 13 / 18 · 20 | 14 / 20 · 22 | 14 / 20 · 22 |
| `data-lg` | 500 | 20 / 28 · 30 | 22 / 30 · 32 | 24 / 32 · 34 |
| `data-md` | 500 | 14 / 20 · 22 | 16 / 24 · 26 | 16 / 24 · 26 |
| `data-sm` | 500 | 12 / 16 · 18 | 13 / 18 · 20 | 13 / 18 · 20 |

Notes:
- Web body is 14px (dense dashboards). Tablet/Mobile body is 16px (Material 3 and iOS minimums for comfortable reading).
- `caption-sm` (11px) exists on **web only**; on tablet/mobile it equals `caption-md`.
- Weights are role-based (decision D-07, pending sign-off).

## Rules
- **Arabic:** never apply letter-spacing (connected script). Line heights are taller to fit marks; display ≥ 1.25×. Allow 20–30% more width than English.
- **Latin display** uses −0.16px letter-spacing; all other roles 0.
- **Numbers:** use `data-*` roles with `font-variant-numeric: tabular-nums` (web) / `FontFeature.tabularFigures()` (Flutter) for columns. Arabic UI uses Western digits for data (decision D-10).
- **Case:** sentence case everywhere. No ALL CAPS in Arabic; avoid it in English except short overlines.
- **Line length:** 45–75 characters for paragraphs.
- Respect user font scaling: Flutter must not clamp `TextScaler` below 1.0; web uses px tokens but layouts must survive 200% zoom (WCAG 1.4.4).

## Using it
| Platform | How |
|---|---|
| Web (CSS) | `class="bw-text-body-md"` or `font: var(--bw-font-size-body-md)/var(--bw-font-line-height-body-md) var(--bw-font-family)` |
| Web (MUI) | `<Typography variant="bodyMd">` (also mapped: h1=displayLg … body1=bodyMd, button=actionMd) |
| Flutter | `context.bw.text.bodyMd` or `Theme.of(context).textTheme.bodyMedium` |

## Fonts setup
- Web: self-host via `@fontsource/inter` and `@fontsource/ibm-plex-sans-arabic` (weights 400/500/600/700).
- Flutter: add the font files to the app's `pubspec.yaml` with family names exactly `Inter` and `IBM Plex Sans Arabic` (`BwFontFamily.en/ar`). Both fonts are SIL OFL licensed.
