# Colors

Biowave color has two layers. **Primitives** are raw ramps (primary navy, secondary teal, neutral, success, error, warning, info; steps 50–950 plus alpha 0–90). **Semantic tokens** give each color a job and switch between Light and Dark. Components use semantic tokens only.

```
primitive.color.primary.600 (#193351)  ──►  color-background-brand-default (light)
primitive.color.primary.300 (#607D9F)  ──►  color-background-brand-default (dark)
```

## How to choose a token
1. **What is it?** surface (container) · background (interactive fill) · text · icon · border · link · overlay.
2. **What role?** neutral · brand · secondary · success · error · warning · info.
3. **What state?** default · hover · pressed · disabled (backgrounds) / subtle for tonal fills.
4. Text or icon on a filled background? Use the matching `on` token: `color-background-error-default` + `color-text-on-error`.

| Role | Meaning in Biowave | Examples |
|---|---|---|
| brand | Primary actions, active navigation, selection | Save, Add device, active tab |
| secondary | Supporting actions and accents | Secondary CTA, chart accent |
| success | Done, approved, online | Approved request, device online |
| warning | Needs attention, pending, not critical | Pending approval, sync delayed |
| error | Failed, destructive, critical | Delete user, device offline, validation error |
| info | Informational, in progress, syncing, links | Sync running, tips |
| neutral | Everything without a status | Text, borders, disabled |

## Rules
- **Never use color alone** to carry meaning (WCAG 1.4.1). Pair status color with an icon or text.
- **Warning uses dark text.** `color-text-on-warning` is near-black in both themes; white on orange fails contrast.
- **Borders:** `color-border-default` is decorative (cards, dividers, 1.38:1). Control boundaries (inputs, checkboxes, outline buttons) must use `color-border-input-default` (≥ 3:1).
- **Disabled** colors are exempt from contrast but must still look different from enabled ones.
- **Dark mode depth:** surfaces get lighter as they rise (`page` 950 → `default` 900 → `raised` 800).
- Third-party brand colors (payment networks) live in `color-external-*` and are never themed.

## Contrast guarantee
`npm run tokens` checks 76 foreground/background pairs in both themes (WCAG 2.2: 4.5:1 text, 3:1 icons, control boundaries and focus). The build fails on any violation. Add a pair to `scripts/contrast-pairs.json` whenever a component introduces a new combination.

## Surface
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-surface-page` | `#F7F7F7` · neutral.50 | `#0A0A0A` · neutral.950 | App canvas behind all content. |
| `color-surface-default` | `#FFFFFF` · neutral.0 | `#141414` · neutral.900 | Cards, panels, tables, containers. |
| `color-surface-subtle` | `#F7F7F7` · neutral.50 | `#292929` · neutral.800 | Low-emphasis blocks inside pages or cards. |
| `color-surface-raised` | `#FFFFFF` · neutral.0 | `#292929` · neutral.800 | Floating layers: modals, menus, popovers, drawers. Pair with an elevation token. |
| `color-surface-inverse` | `#141414` · neutral.900 | `#FFFFFF` · neutral.0 | Opposite-theme surface (e.g. tooltip, snackbar). |

## Background (interactive fills)
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-background-transparent` | `#54545400` · neutral.alpha.0 | `#54545400` · neutral.alpha.0 | Transparent fill for ghost controls. |
| `color-background-base-default` | `#FFFFFF` · neutral.0 | `#141414` · neutral.900 |  |
| `color-background-base-hover` | `#EDEDED` · neutral.100 | `#404040` · neutral.700 |  |
| `color-background-base-pressed` | `#DBDBDB` · neutral.200 | `#545454` · neutral.600 |  |
| `color-background-base-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 |  |
| `color-background-neutral-default` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 |  |
| `color-background-neutral-subtle` | `#F7F7F7` · neutral.50 | `#141414` · neutral.900 |  |
| `color-background-neutral-hover` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 |  |
| `color-background-neutral-pressed` | `#BDBDBD` · neutral.300 | `#545454` · neutral.600 |  |
| `color-background-neutral-disabled` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 |  |
| `color-background-brand-default` | `#193351` · primary.600 | `#607D9F` · primary.300 |  |
| `color-background-brand-subtle` | `#E8ECF2` · primary.50 | `#071323` · primary.900 |  |
| `color-background-brand-hover` | `#132843` · primary.700 | `#90A3BC` · primary.200 |  |
| `color-background-brand-pressed` | `#0D1E33` · primary.800 | `#BEC9D9` · primary.100 |  |
| `color-background-brand-disabled` | `#BDBDBD` · neutral.300 | `#404040` · neutral.700 |  |
| `color-background-secondary-default` | `#0C5F79` · secondary.600 | `#5DA8C2` · secondary.300 |  |
| `color-background-secondary-subtle` | `#E8F4F8` · secondary.50 | `#032A37` · secondary.900 |  |
| `color-background-secondary-hover` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 |  |
| `color-background-secondary-pressed` | `#063C4E` · secondary.800 | `#C0DDE8` · secondary.100 |  |
| `color-background-secondary-disabled` | `#BDBDBD` · neutral.300 | `#404040` · neutral.700 |  |
| `color-background-success-default` | `#1E6D41` · success.700 | `#55BE87` · success.300 |  |
| `color-background-success-subtle` | `#E9F7EF` · success.50 | `#0E3921` · success.900 |  |
| `color-background-success-hover` | `#165331` · success.800 | `#8DD4AE` · success.200 |  |
| `color-background-success-pressed` | `#0E3921` · success.900 | `#C1E8D2` · success.100 |  |
| `color-background-success-disabled` | `#BDBDBD` · neutral.300 | `#404040` · neutral.700 |  |
| `color-background-error-default` | `#D42222` · error.700 | `#FF7676` · error.300 |  |
| `color-background-error-subtle` | `#FEF0EE` · error.50 | `#721212` · error.900 |  |
| `color-background-error-hover` | `#A31A1A` · error.800 | `#FEA3A3` · error.200 |  |
| `color-background-error-pressed` | `#721212` · error.900 | `#FECFCF` · error.100 |  |
| `color-background-error-disabled` | `#BDBDBD` · neutral.300 | `#404040` · neutral.700 |  |
| `color-background-warning-default` | `#FF9435` · warning.500 | `#FFB05E` · warning.300 |  |
| `color-background-warning-subtle` | `#FFF3E8` · warning.50 | `#773F12` · warning.900 |  |
| `color-background-warning-hover` | `#FF8C32` · warning.600 | `#FFC88F` · warning.200 |  |
| `color-background-warning-pressed` | `#D97424` · warning.700 | `#FFE0C0` · warning.100 |  |
| `color-background-warning-disabled` | `#BDBDBD` · neutral.300 | `#404040` · neutral.700 |  |
| `color-background-info-default` | `#2559D4` · info.600 | `#6D9CE8` · info.300 |  |
| `color-background-info-subtle` | `#EEF4FF` · info.50 | `#0E265F` · info.900 |  |
| `color-background-info-hover` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 |  |
| `color-background-info-pressed` | `#153786` · info.800 | `#CBDCFA` · info.100 |  |
| `color-background-info-disabled` | `#BDBDBD` · neutral.300 | `#404040` · neutral.700 |  |

## Text
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-text-neutral-default` | `#0A0A0A` · neutral.950 | `#F7F7F7` · neutral.50 | Primary text: titles, body, values. |
| `color-text-neutral-subtle` | `#292929` · neutral.800 | `#DBDBDB` · neutral.200 | Secondary text. (Renamed from text/neutral/neutral.) |
| `color-text-neutral-muted` | `#707070` · neutral.500 | `#BDBDBD` · neutral.300 | Supporting text: helper, meta, timestamps. Meets 4.5:1 on surface.default and surface.page. |
| `color-text-neutral-placeholder` | `#707070` · neutral.500 | `#969696` · neutral.400 | Input placeholder. FIX: was neutral/200 (1.38:1). |
| `color-text-neutral-disabled` | `#969696` · neutral.400 | `#545454` · neutral.600 | Disabled text (exempt from contrast, must look different from muted). |
| `color-text-neutral-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 | Text on surface.inverse. |
| `color-text-role-brand` | `#132843` · primary.700 | `#90A3BC` · primary.200 |  |
| `color-text-role-secondary` | `#094E65` · secondary.700 | `#90C3D5` · secondary.200 |  |
| `color-text-role-success` | `#1E6D41` · success.700 | `#8DD4AE` · success.200 |  |
| `color-text-role-error` | `#D42222` · error.700 | `#FEA3A3` · error.200 |  |
| `color-text-role-warning` | `#A85A1A` · warning.800 | `#FFC88F` · warning.200 |  |
| `color-text-role-info` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 |  |
| `color-text-on-brand` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-text-on-secondary` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-text-on-success` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-text-on-error` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-text-on-warning` | `#0A0A0A` · neutral.950 | `#0A0A0A` · neutral.950 |  |
| `color-text-on-info` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |

## Icon
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-icon-neutral-default` | `#0A0A0A` · neutral.950 | `#F7F7F7` · neutral.50 |  |
| `color-icon-neutral-subtle` | `#292929` · neutral.800 | `#DBDBDB` · neutral.200 |  |
| `color-icon-neutral-muted` | `#707070` · neutral.500 | `#BDBDBD` · neutral.300 | FIX: was neutral/400 (2.96:1, below 3:1 for meaningful icons). |
| `color-icon-neutral-disabled` | `#969696` · neutral.400 | `#545454` · neutral.600 |  |
| `color-icon-neutral-inverse` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-icon-role-brand` | `#193351` · primary.600 | `#90A3BC` · primary.200 |  |
| `color-icon-role-secondary` | `#0C5F79` · secondary.600 | `#90C3D5` · secondary.200 |  |
| `color-icon-role-success` | `#268751` · success.600 | `#8DD4AE` · success.200 |  |
| `color-icon-role-error` | `#FF2B2B` · error.600 | `#FEA3A3` · error.200 |  |
| `color-icon-role-warning` | `#D97424` · warning.700 | `#FFC88F` · warning.200 |  |
| `color-icon-role-info` | `#2559D4` · info.600 | `#9CBCF2` · info.200 |  |
| `color-icon-on-brand` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-icon-on-secondary` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-icon-on-success` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-icon-on-error` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |
| `color-icon-on-warning` | `#0A0A0A` · neutral.950 | `#0A0A0A` · neutral.950 |  |
| `color-icon-on-info` | `#FFFFFF` · neutral.0 | `#0A0A0A` · neutral.950 |  |

## Border
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-border-default` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 | Decorative separation: cards, tables, dividers. Not for control boundaries. |
| `color-border-subtle` | `#EDEDED` · neutral.100 | `#292929` · neutral.800 |  |
| `color-border-strong` | `#BDBDBD` · neutral.300 | `#545454` · neutral.600 |  |
| `color-border-disabled` | `#DBDBDB` · neutral.200 | `#404040` · neutral.700 |  |
| `color-border-brand` | `#607D9F` · primary.300 | `#254471` · primary.500 |  |
| `color-border-secondary` | `#5DA8C2` · secondary.300 | `#1A7596` · secondary.500 |  |
| `color-border-success` | `#55BE87` · success.300 | `#2D9860` · success.500 |  |
| `color-border-error` | `#FF7676` · error.300 | `#FF3B3B` · error.500 |  |
| `color-border-warning` | `#FFB05E` · warning.300 | `#FF9435` · warning.500 |  |
| `color-border-info` | `#6D9CE8` · info.300 | `#336CD9` · info.500 |  |
| `color-border-input-default` | `#707070` · neutral.500 | `#969696` · neutral.400 |  |
| `color-border-input-hover` | `#404040` · neutral.700 | `#BDBDBD` · neutral.300 |  |
| `color-border-input-error` | `#D42222` · error.700 | `#FF7676` · error.300 |  |
| `color-border-focus` | `#254471` · primary.500 | `#90A3BC` · primary.200 | Keyboard focus ring. FIX: was primary/200 (2.58:1 on white, below 3:1). |

## Link
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-link-default` | `#2559D4` · info.600 | `#6D9CE8` · info.300 |  |
| `color-link-hover` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 |  |
| `color-link-pressed` | `#153786` · info.800 | `#CBDCFA` · info.100 |  |
| `color-link-visited` | `#1D48AD` · info.700 | `#9CBCF2` · info.200 |  |

## Overlay
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-overlay-backdrop` | `#54545499` · neutral.alpha.60 | `#545454B3` · neutral.alpha.70 | Behind modals and blocking drawers. |
| `color-overlay-scrim` | `#5454544D` · neutral.alpha.30 | `#54545466` · neutral.alpha.40 | Non-blocking dimming. |
| `color-overlay-subtle` | `#5454541A` · neutral.alpha.10 | `#54545433` · neutral.alpha.20 | Quiet hover/selected layer. |
| `color-overlay-brand` | `#19335133` · primary.alpha.20 | `#1933514D` · primary.alpha.30 |  |
| `color-overlay-secondary` | `#0C5F7933` · secondary.alpha.20 | `#0C5F794D` · secondary.alpha.30 |  |
| `color-overlay-success` | `#26875133` · success.alpha.20 | `#2687514D` · success.alpha.30 |  |
| `color-overlay-error` | `#FF2B2B33` · error.alpha.20 | `#FF2B2B4D` · error.alpha.30 |  |
| `color-overlay-warning` | `#FF8C3233` · warning.alpha.20 | `#FF8C324D` · warning.alpha.30 |  |
| `color-overlay-info` | `#2559D433` · info.alpha.20 | `#2559D44D` · info.alpha.30 |  |

Primitive ramps: see `preview/index.html` → Palette, or `dist/tokens.json` → `primitive`.

## Added 2026-10-16 (button family)
| Token | Light | Dark | Use |
|---|---|---|---|
| `color-background-inverse-default · hover · pressed` | neutral 0 · 100 · 200 | neutral 950 · 900 · 800 | Filled control placed **on brand or inverse surfaces** (navy side navigation, hero banner). Label `color-text-role-brand`. |
| `color-border-inverse` | neutral 0 | neutral 950 | Outline and **focus ring** of controls on brand/inverse surfaces (`color-border-focus` would disappear there). |
| `color-overlay-hover` · `color-overlay-pressed` | neutral α10 · α20 | neutral α40 · α60 | **State layer** over non-filled controls (tonal, outlined, text): a second fill above the control's own fill. Filled controls use their solid `-hover`/`-pressed` tokens instead. |

