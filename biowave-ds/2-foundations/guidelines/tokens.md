# Tokens

Design tokens are named design decisions. Biowave tokens follow the **W3C Design Tokens (DTCG) format** and live in `2-foundations/tokens/`. Everything else (CSS, TS, Dart, MUI theme, Material 3 theme, preview) is generated.

## Architecture

```
tokens/
├── primitives/      raw values, no meaning          primitive.color.primary.600, primitive.dimension.16
├── semantic/        meaning, theme-aware            color.background.brand.default, spacing.md, elevation.3
│   ├── color.light.json / color.dark.json           ← theme modes
│   └── elevation.light.json / elevation.dark.json
└── platform/        per-platform values             platform.font.size.body.md, platform.grid.columns
    ├── web.json  tablet.json  mobile.json           ← platform modes
```

| Layer | Who uses it | Rule |
|---|---|---|
| Primitive | Token maintainers only | Never referenced by components |
| Semantic | Components and apps | Always reference a primitive (alias `{primitive.…}`) |
| Platform | Generated typography/grid per platform | One file per platform, identical keys |
| Component (future) | One component | Created by the Planner only when a component needs a value no semantic token expresses |

Modes: **theme** (light, dark) × **platform** (web, tablet, mobile) × **language** (en, ar — affects font family, line height, letter-spacing only).

## Token file format
```json
{
  "color": {
    "background": {
      "brand": {
        "default": { "$value": "{primitive.color.primary.600}", "$description": "Primary action fill." }
      }
    }
  }
}
```
Types used: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`, `number`.

## Workflow to change a token
1. Edit JSON in `tokens/`. Add or rename only through the Planner.
2. `npm run tokens` — regenerates outputs and runs checks (contrast, theme parity, platform parity).
3. Update the guideline page and `CHANGELOG.md`; record renames in `AUDIT.md`.
4. Mirror in Figma (variables) — keep the same names.

## Outputs
| Output | Path | Consumer |
|---|---|---|
| CSS variables | `web/src/generated/tokens.css` | Web apps (`--bw-*`) |
| TypeScript | `web/src/generated/tokens.ts` | MUI theme, components (`cssVars`, `themes`, `platforms`) |
| Dart | `flutter/lib/src/generated/bw_tokens.g.dart` | Flutter (`BwColors`, `BwTextStyles`, `BwSpacing` …) |
| Flat JSON | `dist/tokens.json` | Docs, agents, Figma sync |
| Preview | `preview/index.html` | Humans |

## Figma variable scopes (to apply — finding B-15)
| Collection / group | Scopes |
|---|---|
| `color/surface/*`, `color/background/*`, `color/overlay/*` | Frame fill, Shape fill |
| `color/text/*`, `color/link/*` | Text fill |
| `color/icon/*` | Shape fill, Stroke (icons) |
| `color/border/*` | Stroke |
| `spacing/*` | Gap, Width & height (padding) |
| `radius/*` | Corner radius |
| `border/width/*` | Stroke width |
| `size/*` | Width & height |
| font size / line height | Font size / Line height |
| primitives | none (hidden from publishing) |
