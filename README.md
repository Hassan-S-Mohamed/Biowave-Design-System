# Biowave Design System

> **Trusted identity, effortlessly — in any language, on any screen.**

One design language for every Biowave product (identity, biometric access and attendance), built **as code** for three platforms, two languages and two themes, and kept in sync with Figma.

| | |
|---|---|
| **Platforms** | Web App — React + MUI · Tablet App — Flutter + Material 3 · Mobile App — Flutter + Material 3 |
| **Languages** | English (LTR, Inter) · Arabic (RTL, IBM Plex Sans Arabic) |
| **Themes** | Light · Dark |
| **Brand** | Navy `#193351` (primary) · Teal `#0C5F79` (secondary) |
| **Tokens** | W3C Design Tokens (DTCG), generated to CSS, TypeScript and Dart |
| **Accessibility** | WCAG 2.2 AA, contrast checked automatically on every token build |
| **Version** | Foundations 1.1.0 · Components: button family in progress · DS 1.0 target ≈ 23 Nov 2026 |

---

## 🎯 Goals

1. **One language, three native platforms.** Web, tablet and mobile share tokens and behaviour, but each feels native (MUI on web, Material 3 on Flutter).
2. **Bilingual by default.** Every component is designed, built and tested in Arabic (RTL) and English (LTR) from day one.
3. **Accessible by construction.** Contrast, focus, target size and reduced motion are enforced by tokens and checks, not by memory.
4. **Self-documenting.** Humans and AI agents can find any decision in one README hop.
5. **Governed change.** Every change is planned, reviewed, versioned and logged. Nothing drifts silently between Figma and code.

**Design principles (ranked):** 1 Clear before clever · 2 Trust through precision · 3 Equal in Arabic and English · 4 Accessible for everyone · 5 Native on every platform · 6 Calm by default.

---

## 📦 Outputs

### 1 · Overview — [`biowave-ds/1-overview`](biowave-ds/1-overview)
Definition, benefits, vision, value and principles of the system *(Draft v1, waiting for design-lead sign-off)*.

### 2 · Foundations — [`biowave-ds/2-foundations`](biowave-ds/2-foundations) ✅ v1.1.0
- **Design tokens (source of truth):** primitives (color, dimension, typography, motion) → semantic (color light/dark/external, spacing, size, radius, border, elevation light/dark, typography, motion, layer) → platform (web, tablet, mobile).
- **Generated code packages:** `@biowave/foundations` (CSS variables, TypeScript tokens, MUI theme, `BiowaveProvider`) and `biowave_foundations` (Dart tokens + Flutter theme).
- **15 guidelines:** colors, typography, spacing, grid, radius, border, elevation, motion, icons, illustration, logos, devices, content, accessibility, tokens.
- **Foundation List** docs home (10 cards) + a visual token preview.
- **Figma Doc Kit spec** for all Figma documentation and home pages, plus a foundations audit (`AUDIT.md`).

### 3 · Web components — [`biowave-ds/3-web-components`](biowave-ds/3-web-components)
npm package **`@biowave/web`** (React 19 + MUI, Vitest + Testing Library + axe).
- **Button:** built in code and on review round 2 (24-test contract matrix).
- **Icon button, Split button, Button group:** planned, contracts ready.

### 4 · Tablet components — [`biowave-ds/4-tablet-components`](biowave-ds/4-tablet-components)
Dart package **`biowave_tablet`** (Flutter + Material 3). Button family planned, 4 contracts ready.

### 5 · Mobile components — [`biowave-ds/5-mobile-components`](biowave-ds/5-mobile-components)
Dart package **`biowave_mobile`** (Flutter + Material 3). Button family planned, 4 contracts ready.

**Each component, on each platform, has one folder:**

| File | What it is |
|---|---|
| `<name>.md` | The single source: A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog |
| `<name>.tokens.json` | Component tokens, every value aliasing a Foundations semantic token |
| `<name>-contract.md` | Generated contract for the code agent |
| `figma-<name>-contract.md` | Generated contract for the Figma agent (variables, styles, library keys) |
| `<name>.html` | Documentation page (EN/AR × Light/Dark) |

### Tooling
| Folder | Output |
|---|---|
| [`_docs`](biowave-ds/_docs) | Docs viewer and server, docs build, docs checks, contract generator |
| [`_sync`](biowave-ds/_sync) | Keeps tokens, generated code and the 4 Figma files in step; Figma library index |
| [`_templates`](biowave-ds/_templates) | The one component template, section README template, writing rules |
| [`_audits`](biowave-ds/_audits) | Cross-component audits (button family gap report) |

### Figma
Four files: **Foundations** (published library: variables, text and effect styles, icons, Doc Kit) + **Web**, **Tablet** and **Mobile Components**. Component files may hold only component tokens that alias the Foundations library. Source exports are in [`figma-assets`](figma-assets).

### Project documents
- [`biowave-ds/README.md`](biowave-ds/README.md): full structure, status and key decisions (D-01 … D-16)
- [`biowave-ds/AGENTS.md`](biowave-ds/AGENTS.md): rules and workflow for every AI agent and developer
- [`biowave-ds/ROADMAP.md`](biowave-ds/ROADMAP.md): build order and schedule
- [`biowave-ds/CHANGELOG.md`](biowave-ds/CHANGELOG.md): every change, newest first

---

## 🗺️ Roadmap

| Phase | Days | Scope |
|---|---|---|
| 0 · Prep | Day 0 | Close foundation decisions, Figma Doc Kit, icon set |
| 1 · Core components | Day 1–9 | 21 components: Icon, the button family, Link, Divider, Badge, Avatar, Chip, Tooltip, Progress, Skeleton, Card, Checkbox, Radio, Switch, Text field, Select, List, Segmented button → **0.5.0** |
| 2 · Complex components | Day 10–19 | 21 components: Menu, Tabs, Dialog, Sheets, Date/Time pickers, Data table, Navigation… → **0.9.0** |
| 3 · Patterns | Day 20–26 | 13 patterns: App shell, Forms, Sign-in & OTP, Clock in/out, Approvals, Dashboard… → **1.0.0** |

Pace: 2–3 items per working day. Details are in [`ROADMAP.md`](biowave-ds/ROADMAP.md).

---

## 🔄 How work flows

```
Planner (Claude)              Executors                         Reviewer (Claude)
<name>.md Parts A–D    ──►    Code agent  → reads <name>-contract.md        ──►  Part E review
Plan: Draft → Finished        Figma agent → reads figma-<name>-contract.md       Approved / Changes requested
npm run contract                                                                 → CHANGELOG.md
```

---

## 🚀 Quick start

```bash
cd biowave-ds
npm install
npm run tokens        # rebuild CSS / TS / Dart from tokens + contrast checks
npm run docs          # open docs: Foundation List → Components List → component pages
npm run sync          # check code ↔ files ↔ Figma are in sync
npm run typecheck && npm run test:web
cd 5-mobile-components && flutter test
```

**Web app**
```tsx
import '@biowave/foundations/tokens.css';
import { BiowaveProvider } from '@biowave/web';

<BiowaveProvider locale="ar" theme="system"><App /></BiowaveProvider>
```

**Flutter app** (tablet: `biowave_tablet` / `BwTabletTheme`)
```dart
MaterialApp(
  theme: BwMobileTheme.light(locale),
  darkTheme: BwMobileTheme.dark(locale),
  locale: locale, // Locale('ar') → RTL automatically
);
```

---

## 📊 Status

| Section | State |
|---|---|
| 1 · Overview | Draft v1 |
| 2 · Foundations | ✅ 1.1.0, synced to Figma |
| 3 · Web components | 4 planned · Button built, in review |
| 4 · Tablet components | 4 planned · contracts ready |
| 5 · Mobile components | 4 planned · contracts ready |
| Figma Doc Kit | Planned (blocks Figma doc pages) |

---

Maintained by **Hassan Said Mohamed**, Product/UX Design Lead.
