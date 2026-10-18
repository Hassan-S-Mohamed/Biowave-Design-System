# Illustration

Status: **guidelines defined, asset library not started.**

Illustrations explain empty states, onboarding and errors. They support the message; they never carry it alone.

## Style
- Flat, geometric, line-weight matched to Material Symbols (2px at 24px scale).
- Palette limited to semantic-friendly tones: primary navy, secondary teal, neutrals, one status color when the scene is about status.
- Built from tokens: illustrations reference `primitive.color.*` exported as SVG `currentColor` / CSS variables so they work in Light and Dark.
- People are diverse and culturally appropriate for GCC/Egypt workplaces (modest clothing, mixed genders).
- No text inside illustrations (it cannot be translated).

## Sizes
| Use | Size |
|---|---|
| Empty state (web) | 160 × 160 |
| Empty state (mobile/tablet) | 120 × 120 |
| Onboarding / splash | 240 × 240 |

## Rules
- Always pair with a title and a sentence (see Content).
- Decorative: hide from screen readers.
- RTL: mirror scenes with a direction (a person walking toward a door); do not mirror logos or devices.
- Format: SVG (web), SVG via `flutter_svg` or vector assets (Flutter). Store in `2-foundations/assets/illustrations/` when created.
