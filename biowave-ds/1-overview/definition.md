# Definition

The **Biowave Design System** is the single source of design decisions for Biowave products: the identity, biometric access and workforce-attendance platform used by administrators on the web and by employees and team leaders on tablets and phones.

It consists of four layers that build on each other:

| Layer | What it is | Where |
|---|---|---|
| Principles | The few beliefs that settle design arguments | `principles.md` |
| Foundations | Design tokens (color, type, spacing, radius, elevation, motion, grid…) and the rules for using them | `2-foundations/` |
| Components | Reusable, accessible UI parts built from tokens, one library per platform | `3-` `4-` `5-` |
| Patterns | Recurring flows built from components (enrollment, approvals, device setup) | added as products need them |

What it is **not**:
- Not a Figma file alone — the code tokens are the source of truth and Figma mirrors them.
- Not a UI kit to copy from — products consume packages (`@biowave/web`, `biowave_tablet`, `biowave_mobile`), so a fix ships everywhere at once.
- Not one-size-fits-all — the same decisions are expressed natively on each platform (MUI on web, Material 3 on Flutter).
