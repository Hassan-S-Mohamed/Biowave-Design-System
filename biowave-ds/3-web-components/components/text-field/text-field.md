# Text field · حقل نص — Web

> **One file for Text field on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders receive generated contracts (`npm run contract -- web text-field`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Text field · حقل نص |
| Summary | Lets a user enter or edit a short value or a longer passage of text. |
| Summary (ar) | يتيح للمستخدم إدخال قيمة قصيرة أو نص أطول وتعديلهما. |
| Parts | Field · label · required indicator · input · placeholder · leading icon · trailing action · supporting text · counter |
| Parts (ar) | الحقل · التسمية · علامة الإلزام · الإدخال · النص الإرشادي · أيقونة البداية · إجراء النهاية · النص المساعد · العداد |
| Platform | Web · React + MUI |
| Built on | MUI `FormControl` + `OutlinedInput`; static native label above a notchless outlined field |
| Import | `import { TextField } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Text field` |
| Version | 1.0 · 2026-10-18 |
| Plan | Open |
| Code | Changes requested |
| Figma build | Planned |
| Review | Round 1 · 2026-10-18 · Changes requested |
| Source code | [`src/components/text-field/`](../../src/components/text-field/) |
| Tokens | [`text-field.tokens.json`](text-field.tokens.json) — machine copy of B3 (D-13) |
| Contracts | [`text-field-contract.md`](text-field-contract.md) · [`figma-text-field-contract.md`](figma-text-field-contract.md) — generated, never edited |
| Docs page | [`text-field.html`](text-field.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. This guidance is shared by Web, Tablet and Mobile except A8.

### A1 Overview

A text field lets a user enter or edit text. It uses a static label above an outlined field so the purpose stays visible after entry and remains clear with long Arabic labels. The same component covers single-line input and multiline text area; choosing `multiline` changes the field anatomy without changing the form model.

### A2 Anatomy

```
② Email address ③*
①┌──────────────────────────────────────────────┐
 │ ⑥[◆]  ④name@example.com              ⑦[×] │
 └──────────────────────────────────────────────┘
 ⑧Use your work email                         ⑨(16 / 80)

Multiline:
② Notes
①┌──────────────────────────────────────────────┐
 │ ④Add context for the request…                │
 │                                              │
 │                                      ⑨(0 / 400)│
 └──────────────────────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `field` | Yes | Outlined input surface and interaction boundary |
| 2 | `label` | Yes | Persistent name for the input; visually hidden only when nearby context makes repetition unnecessary |
| 3 | `required-indicator` | No | Marks a value that must be supplied; never the only required instruction |
| 4 | `input` | Yes | Native editable value, single-line or multiline |
| 5 | `placeholder` | No | Short format hint or example; never replaces the label |
| 6 | `leading-icon` | No | Non-interactive cue for the expected content |
| 7 | `trailing-action` | No | One labelled action such as clear or show password |
| 8 | `supporting-text` | No | Hint or error linked to the input |
| 9 | `counter` | No | Current character count and optional limit |

### A3 Usage

**When to use**
- For a person, email, identifier, title or other free-form text value
- For passwords, numbers or other native input types when the browser behavior is useful
- With `multiline` for notes, reasons, descriptions and other passages of text

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| Choosing one value from a known list | Select |
| Searching and suggesting known records | Autocomplete |
| Entering a country code and phone number | Phone field |
| Entering a four- or six-digit one-time code | Verification code |
| Starting a search that has search-specific behavior | Search field |

### A4 Options

#### 4.1 `size`

| Value | Pick it when |
|---|---|
| `sm` | A dense web table, filter bar or compact form |
| `md` | Default on web forms and dialogs |
| `lg` | A prominent web form or the default touch size on tablet and mobile |

Fields in the same form row use the same size.

#### 4.2 `multiline`

| Value | Looks like | Pick it when |
|---|---|---|
| off | One line | The expected answer is a short value |
| on | Text area with at least three visible lines | The answer may be a sentence or paragraph |

#### 4.3 Label and required indicator

The label is visible by default. It may be visually hidden only when an adjacent heading names the value unambiguously and the label remains available to assistive technology. `required` adds an indicator and native required semantics; forms also explain the indicator once near the start.

#### 4.4 Leading icon and trailing action

Use a leading icon only when it clarifies the value type. Use at most one trailing action, with its own accessible name and a minimum target size. Actions do not replace validation or supporting text.

#### 4.5 Supporting text and counter

Supporting text gives a stable hint until an error replaces it. A counter is useful only when the limit matters to the user. It shows the current count and limit and is announced with the supporting text, not on every keystroke as a live region.

**Combination rules**
- `rows`, `minRows` and `maxRows` apply only when `multiline` is on
- A counter requires `maxLength`; otherwise omit it
- `disabled` overrides `readOnly`; disabled fields are unavailable, read-only fields remain focusable and selectable
- Error text uses `supporting-text`; never show a hint and an error as two competing lines
- A multiline field may have a trailing action, but it aligns to the first text line

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | Ready, empty or filled | Base surface, default border and normal text |
| Hover | Pointer over the field (web only) | Stronger input border |
| Focus | Native input has keyboard or pointer focus | Two-step focus border with no exterior offset; this is the documented field exception in the accessibility guideline |
| Error | Validation failed | Error border and supporting text; the message explains how to fix the value |
| Disabled | Value cannot currently be changed or selected | Disabled surface, border, text and icons; removed from the tab order |
| Read-only | Value may be read, copied or submitted but not changed | Subtle neutral surface; remains focusable and selectable |
| Filled | A value exists | Value replaces the placeholder; state otherwise stays unchanged |

**Behavior rules**
- Labels, helper messages and values wrap naturally where their role allows; single-line input values scroll horizontally rather than wrap
- Multiline input grows between its row bounds; manual vertical resize is allowed on web
- Long Arabic labels and messages wrap without clipping; do not give a field a fixed width sized only for English
- Preserve the user's value through focus, error and theme changes
- Validation normally runs on blur or submit, not on every keystroke; clear an error only when the value is valid
- The character limit prevents further native entry when reached; never silently truncate an existing controlled value

### A6 Content

General rules: [content.md](../../../2-foundations/guidelines/content.md). Text-field-specific rules:

| Element | Rule | Max length |
|---|---|---|
| `label` | Noun phrase naming the value, not an instruction | 4 words |
| `placeholder` | Example or format only; do not repeat the label | 5 words |
| `supporting-text` hint | Explain format, privacy or consequence | 1 short sentence |
| `supporting-text` error | Say what is wrong and how to fix it | 1 short sentence |
| `trailing-action` name | Verb-first description such as “Clear email” | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Work email · name@company.com | البريد الإلكتروني للعمل · name@company.com | Email · Enter email |
| Password · Use at least 12 characters | كلمة المرور · استخدم 12 حرفًا على الأقل | Password · Invalid |
| Request reason · Explain why you need remote work | سبب الطلب · اشرح سبب حاجتك إلى العمل عن بُعد | Details · Type here… |
| Enter a valid work email | أدخل بريدًا إلكترونيًا صالحًا للعمل | Wrong value |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Keep a persistent label above every field | Use placeholder text as the only label |
| Put a specific correction beside the field | Show “Invalid” without telling the user what to change |
| Use multiline for sentences and paragraphs | Force a long answer into a single scrolling line |
| Keep supporting text stable to avoid layout surprise | Add and remove unrelated help while the user types |
| Mark required fields consistently and explain the mark once | Mark some required fields with color alone |

### A8 Platform notes — Web

```
Web form row
┌──────────────────────────────┐  ┌──────────────────────────────┐
│ Work email                   │  │ Employee ID                  │
│ name@company.com             │  │ BW-1042                      │
└──────────────────────────────┘  └──────────────────────────────┘
       Tab order follows document order; pointer hover is visible
```

| | Web |
|---|---|
| Available | ✓ |
| Default size | `md` |
| Sizes | `sm` · `md` · `lg` |
| Layout | Fills its parent by default; form layout controls the width |
| Interaction | Hover + click + keyboard; native input autofill and password-manager support |
| Multiline | Auto-grow within row bounds; vertical resize allowed |
| Touch target | Every control and trailing action ≥ `target-min` |

### A9 Accessibility (design)

- Every field has a persistent visible label, or a label that is visually hidden only when the surrounding context is unambiguous
- The label activates and focuses the native input; required and invalid state are exposed to assistive technology
- Supporting and error text is programmatically linked to the input and remains readable at 200% zoom
- Error is communicated by message and semantics, never color alone
- Focus uses the documented field exception: the input border becomes `border-width-focus` in `color-border-focus` with no exterior offset
- Leading icons are decorative; a trailing action is separately keyboard operable and named
- Disabled is used only when interaction is impossible; use read-only when the value must remain discoverable and copyable

### A10 Related components

- Select — chooses one known option while reusing label and supporting-text anatomy
- Verification code — enters a fixed number of digits in separate cells
- Search field — adds search and clear behavior to this field foundation
- Autocomplete — suggests known values and may produce tags
- Phone field — composes a country Select and a phone-number text field

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API

#### `TextField`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `ReactNode` | | | ✓ | Persistent visible and accessible name |
| `hideLabel` | boolean | | `false` | | Visually hides `label`; it remains associated with the input |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `multiline` | boolean | | `false` | | A4.2; renders a native textarea through MUI |
| `rows` | number | | | | Fixed visible rows for multiline input |
| `minRows` | number | | `3` when multiline | | Minimum auto-growing rows; ignored when `rows` is set |
| `maxRows` | number | | | | Maximum auto-growing rows |
| `required` | boolean | | `false` | | Shows the required indicator and sets native required semantics |
| `helperText` | `ReactNode` | | | | Hint, or correction text when `error=true` |
| `error` | boolean | | `false` | | Invalid visual and `aria-invalid` state |
| `showCounter` | boolean | | `false` | | Shows `current / maxLength`; requires `maxLength` |
| `maxLength` | number | | | | Native character limit and counter maximum |
| `startAdornment` | `ReactNode` | | | | Decorative leading icon; hidden from assistive technology |
| `endAdornment` | `ReactNode` | | | | One trailing action or decorative icon; interactive content supplies its own name |
| `readOnly` | boolean | | `false` | | Native read-only state; disabled wins if both are true |
| `disabled` | boolean | | `false` | | Native disabled state |
| `fullWidth` | boolean | | `true` | | Fills the parent inline size |
| `id`, `name` | string | | generated / — | | Native form identity |
| `type` | string | native input types | `text` | | Ignored for multiline |
| `placeholder` | string | | | | Format hint, never the accessible name |
| `value`, `defaultValue` | string or number | | | | Controlled or uncontrolled value |
| `onChange` | callback | | | | Native input/textarea change event |
| `onBlur`, `onFocus` | callback | | | | Native focus events |
| `autoComplete` | string | | | | Native autofill purpose |
| `inputRef` | ref | | | | Ref to the native input or textarea |
| `className`, `aria-*`, `data-*` | | | | | Forwarded to the root form control |

**Invalid combinations** (`console.warn` once in development; fallback still renders):

| Combination | Fallback |
|---|---|
| `showCounter=true` without `maxLength` | Counter is hidden |
| `rows`, `minRows` or `maxRows` while `multiline=false` | Row props are ignored |
| `type` other than `text` while `multiline=true` | Native textarea renders; `type` is ignored |
| `disabled=true` and `readOnly=true` | Disabled semantics and visuals win |

### B2 Dimensions

```
      label text style label-md
      Work email
      ├──────── spacing-sm ────────┤
   ┬  ┌──────────────────────────────────────────────────────────┐
   │  │ spacing-control-padding-inline-md  Value text      [◆] │ radius-md
   │  └──────────────────────────────────────────────────────────┘ border-width-default
   ┴ size-control-height-md           └ size-icon-md
      ├──────── spacing-xs ────────┤
      supporting text style caption-md                         counter
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | single-line height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | internal gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border width | `border-width-default` | same | same |
| `field` | focused border width | `border-width-focus` | same | same |
| `leading-icon`, `trailing-action` | visual size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `label` | text style | `label-sm` | `label-md` | `label-lg` |
| `input` | text style | `body-sm` | `body-md` | `body-lg` |
| `supporting-text`, `counter` | text style | `caption-md` | `caption-md` | `caption-md` |
| label → field | gap | `spacing-sm` | same | same |
| field → supporting row | gap | `spacing-xs` | same | same |

Layout rules:
- Root fills the available inline size by default; `fullWidth=false` hugs the MUI intrinsic width
- The single-line height includes the border. The input and adornments center on the block axis
- Multiline uses the same inline padding, top-aligns adornments and derives its block size from the text style plus `rows`/`minRows`/`maxRows`; it has no separate raw minimum-height value
- Label, helper text and counter can wrap. The helper grows first; the counter stays at inline end and does not overlap it
- The trailing action supplies its own target box of at least `target-min`; the field does not shrink that target

### B3 Tokens by part and state

> Machine-readable source: [`text-field.tokens.json`](text-field.tokens.json). In Figma it creates `Text field / Size` and `Text field / State`; every value aliases a semantic Foundations token.

#### 3.1 Size tokens

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border | `border-width-default` | `border-width-default` | `border-width-default` |
| adornments | icon size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |

#### 3.2 State tokens

| State | `field` background | `field` border | Border width | `label` · `input` | `placeholder` | icons | `supporting-text` · `counter` |
|---|---|---|---|---|---|---|---|
| Default | `color-background-base-default` | `color-border-input-default` | `border-width-default` | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-text-neutral-muted` |
| Hover | same | `color-border-input-hover` | same | same | same | same | same |
| Focus | same | `color-border-focus` | `border-width-focus` | same | same | `color-icon-neutral-default` | same |
| Error | same | `color-border-input-error` | `border-width-default` (focused: `border-width-focus`) | same | same | `color-icon-role-error` | `color-text-role-error` |
| Disabled | `color-background-base-disabled` | `color-border-disabled` | `border-width-default` | `color-text-neutral-disabled` | `color-text-neutral-disabled` | `color-icon-neutral-disabled` | `color-text-neutral-disabled` |
| Read-only | `color-background-neutral-subtle` | `color-border-input-default` | `border-width-default` (focused: `border-width-focus`) | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-text-neutral-muted` |

`required-indicator` uses `color-text-role-error`. Error priority is Disabled → Error → Focus → Hover → Default; an error that receives focus keeps the error color and changes to `border-width-focus`. Dark theme uses the same token names and switches values automatically.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | Pointer enters field | border color | `motion-duration-sm` | `motion-easing-standard` |
| Hover/Default → Focus | Native input receives focus | border color and width | `motion-duration-sm` | `motion-easing-standard` |
| Any enabled → Error | Validation result changes | border, icon and supporting-text color | `motion-duration-sm` | `motion-easing-standard` |
| Enabled ↔ Disabled/Read-only | prop changes | background, border and text colors | `motion-duration-instant` | — |

Reduced motion: durations resolve to instant through Foundations; no spatial motion is used. The value, selection and focus are never reset by a visual transition.

### B5 RTL

```
LTR  Work email
     │ [◆] name@example.com                         [×] │
     Helper text                              (16 / 80)

RTL  البريد الإلكتروني للعمل
     │ [×]                         name@example.com [◆] │
                                      (16 / 80) نص مساعد
```

| Part | In RTL |
|---|---|
| Root, label and supporting row | Mirror automatically through logical layout and provider direction |
| `input` | Uses the document direction by default; consumers may set native `dir` only for intrinsically LTR values such as email when needed |
| `leading-icon` | Moves to inline start; ordinary field icons do not mirror |
| `trailing-action` | Moves to inline end; its own directional glyph follows that component's mirroring rule |
| `counter` | Moves to inline end; Western digits and slash remain LTR |

No physical left/right properties are permitted.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<input>` or `<textarea>` inside MUI `OutlinedInput`; no redundant ARIA role |
| Accessible name | Native `<label for=id>`; `hideLabel` applies the shared visually-hidden style, never `display:none` |
| Required | Native `required` plus visible `required-indicator` with `aria-hidden=true` |
| Error | `aria-invalid=true`; `supporting-text` id included in `aria-describedby`; error message is text, not color alone |
| Supporting text / counter | Stable ids combined in `aria-describedby`; counter is not a live region |
| Adornments | Leading icon wrapper is `aria-hidden=true`; interactive trailing content provides its own name and keyboard behavior |
| Disabled / read-only | Native `disabled` removes input from tab order; native `readOnly` remains focusable and selectable |
| Focus | **Field exception:** focused outline border uses `border-width-focus` and `color-border-focus` with no exterior offset. Error focus uses the same width with `color-border-input-error` |
| Target size | Field height is ≥ `target-min`; interactive trailing content must also be ≥ `target-min` |
| Screen reader output | “Work email, required, edit text” · error adds “invalid” then the linked correction |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus into or out of the input and any interactive trailing action in document order |
| Arrow keys | Moves the text caret; never intercepted by the wrapper |
| Enter | Submits the owning form for single-line input; inserts a line break for multiline input |
| Home / End | Native caret behavior |

### B7 Examples

```tsx
import { TextField } from '@biowave/web';

<TextField
  label="Work email"
  name="email"
  type="email"
  autoComplete="email"
  placeholder="name@company.com"
  required
/>

<TextField
  label="Request reason"
  multiline
  minRows={3}
  maxRows={8}
  maxLength={400}
  showCounter
  helperText="Explain why you need remote work"
/>

<TextField
  label="البريد الإلكتروني للعمل"
  type="email"
  error
  helperText="أدخل بريدًا إلكترونيًا صالحًا للعمل"
/>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Renders single-line and multiline fields for `sm` · `md` · `lg` in light + dark and en + ar
- [ ] Associates visible and visually hidden labels with the native control
- [ ] Required, error, helper and counter ids/semantics match B6
- [ ] Default, hover, focus, error, disabled and read-only use the B3 token map
- [ ] Controlled and uncontrolled values update the counter without mutating or truncating the supplied value
- [ ] Invalid combinations warn once and use the B1 fallback
- [ ] RTL mirrors layout without mirroring ordinary icons; counter remains LTR
- [ ] Keyboard behavior remains native; disabled is skipped and read-only remains focusable
- [ ] axe has no violations in both themes and languages
- [ ] Source contains no raw hex, px, ms or font names

---

## C · Code plan

> How to build Part B in code. The generated `text-field-contract.md` is the only component file the Code Executor reads.

| Field | Value |
|---|---|
| Component | Text field |
| Platform | Web (React + MUI) |
| Plan version | 1 · 2026-10-18 |

### C1 Goal

`import { TextField } from '@biowave/web'` renders the single-line and multiline APIs in B1 with static labels, token-only state styling, native form behavior, English/Arabic direction, accessible error/help/counter relationships and complete tests.

### C2 Scope

**In scope**
- [ ] All B1 props, B2 dimensions, B3 tokens, B4 states, B5 RTL, B6 accessibility and B9 tests
- [ ] Private shared pieces `FieldLabel` and `FieldSupportingText` in the text-field folder for later field-family components to reuse after their own contracts approve that dependency

**Out of scope (do not build)**
- Select, Verification code, Phone field, Search field or Autocomplete
- Form-level validation, error summaries or submit orchestration
- Masking, parsing, currency formatting, rich text or autosuggest menus
- A public base-field component; shared pieces remain internal

### C3 Approach

- **Base:** compose MUI `FormControl` and `OutlinedInput`. Keep the label outside the outline and do not pass MUI's floating/notched label. Use the native input/textarea that `OutlinedInput` creates
- **Token map:** `text-field.tokens.ts` exports typed size and state maps using `cssVars.*`; its semantic references equal `text-field.tokens.json`. Styling reads this map only
- **Structure:** root form control → native `label` → styled `OutlinedInput` → supporting row. `FieldLabel.tsx` and `FieldSupportingText.tsx` are private exports inside the folder, not package exports
- **State priority:** native MUI classes plus transient props implement Disabled → Error → Focus → Hover → Default. Read-only has its background token and still receives focus styling
- **Focus exception:** style only `.MuiOutlinedInput-notchedOutline`; never add an exterior CSS outline or shadow. Focus changes the border to the B6 token and width
- **Multiline:** pass `multiline`, row props and textarea semantics to MUI. Use `minRows=3` only when no fixed `rows` is supplied. Top-align adornments and use token padding/gaps; derive height from rows and typography
- **Counter:** maintain only an internal string mirror for uncontrolled counting. Controlled count always derives from `value`. Count Unicode code points with `Array.from(String(value)).length`; native `maxLength` enforces new entry without slicing a controlled value
- **Ids:** `useId()` supplies an id when absent. Stable `-supporting` and `-counter` ids are merged with caller `aria-describedby` without duplicates
- **Adornments:** render wrappers at logical start/end. Leading is always decorative. End content is not forcibly hidden; the consumer owns semantics when interactive
- **Warnings:** use the existing `warnOnce` helper for B1 invalid combinations; never throw for recoverable misuse
- **Gotchas:** override MUI's default padding, radius, colors, hover, focus and disabled rules with sufficient specificity. Preserve native autofill, password managers, selection and form submission

### C4 Token gaps

None. Multiline height derives from row count and the semantic text/padding tokens; no raw component height is needed.

### C5 Files to create / change

```
3-web-components/src/components/text-field/TextField.tsx
3-web-components/src/components/text-field/FieldLabel.tsx
3-web-components/src/components/text-field/FieldSupportingText.tsx
3-web-components/src/components/text-field/text-field.tokens.ts
3-web-components/src/components/text-field/TextField.test.tsx
3-web-components/src/components/text-field/index.ts
3-web-components/src/index.ts
3-web-components/README.md
2-foundations/guidelines/a11y.md
CHANGELOG.md
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Label click/focus association and generated-id stability
- [ ] Caller `aria-describedby` is preserved and merged with supporting/counter ids
- [ ] `endAdornment` interactive content remains reachable after the input
- [ ] Counter counts Arabic and emoji as Unicode code points and never has `aria-live`
- [ ] Error focus uses error color plus focus width; normal focus uses focus color plus focus width
- [ ] Token-map test covers every size/state entry and matches component-token aliases
- [ ] “No raw values” source check covers every file in the component folder

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API, defaults, warnings and fallbacks match B1 exactly
- [ ] AC-2 Every visual value comes from B2–B3 through `cssVars`/`biowaveVariants`; no raw values or primitives
- [ ] AC-3 Every B4 transition exists and reduced motion resolves through Foundations
- [ ] AC-4 RTL matches B5; semantics and native keyboard behavior match B6
- [ ] AC-5 B9 and C6 tests pass with `npm run typecheck` and `npm run test:web`
- [ ] AC-6 Exported from `src/index.ts`; header and section README status are `Built`
- [ ] AC-7 MUI floating label/notch styling and palette defaults do not appear
- [ ] AC-8 Single-line and multiline use one public component, with private reusable field parts
- [ ] AC-9 `npm run component-tokens`, `npm run sync` and `npm run docs:check` pass

### C8 Execution log

| Field | Value |
|---|---|
| Agent | OpenAI Codex |
| Date | 2026-10-18 |
| Files changed | `3-web-components/components/text-field/*`; `3-web-components/src/components/text-field/*`; `3-web-components/src/index.ts`; `3-web-components/README.md`; `2-foundations/guidelines/a11y.md`; `2-foundations/web/package.json`; `package.json`; `package-lock.json`; `_docs/contract.mjs`; `CHANGELOG.md` |

**Deviations from the plan or spec**
- Pinned Stylis to 4.2 at the workspace root and Foundations package. Emotion cache 11.14 embeds Stylis 4.2, while the prior direct range resolved the RTL plugin against Stylis 4.4; disabled MUI input rules crashed the RTL serializer. The aligned dependency is covered by the Arabic disabled/read-only test.
- Updated the contract generator's generic focus rule to honor the B6 editable-field exception; without this, the generated contract contradicted its own component-specific focus requirement.

**Questions for the Planner**
- none

---

## D · Figma build

> Build the Web Text field sets from B2–B4 in the Web Components file. The generated Figma contract adds library keys.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Text field` › sections `Text field` and `Text field — Documentation` |
| Mode | Create new; legacy references remain read-only in Foundations until approval |
| Plan version | 1 · 2026-10-18 |

### D1 Rules for this build

0. Component tokens only: use `Text field / Size` and `Text field / State` already synced from [`text-field.tokens.json`](text-field.tokens.json). Never create variables or styles by hand
1. Bind every fill, stroke, radius, padding, gap, height and icon size to a component token; text uses published Foundations text styles
2. Each variant sets explicit collection modes for Size and State. Error uses the `error` State mode; an Error + Focus variant overrides only border width to the Focus mode's width while keeping error color
3. Never bind primitives, deprecated variables or legacy input variables
4. Layer names equal A2 anatomy names in kebab-case
5. Auto layout on every frame. The only absolute layer allowed is the field border if needed to keep the focused border inside the component bounds
6. Icons and trailing actions are library instances, never detached

### D2 Component structure

```
❖ Text field
  ├─ ◇ .Field/Label
  ├─ ◇ .Field/Container
  └─ ◇ .Field/Supporting text

❖ Text area
  └─ instances of the same .Field/* private bases, with multiline layout
```

The private `.Field/*` components are the approved shared field parts for later Select, Search field, Autocomplete and date/time fields in this platform file.

### D3 Layer tree and auto layout

```
Text field                     ↕ vertical · gap {B2 label/field and supporting gaps} · width fill
├── label                      ◇ .Field/Label · width fill
│   ├── label                  T {B2 label text style} · TEXT `Label`
│   └── required-indicator     T `*` · BOOLEAN `Required`
├── field                      ◇ .Field/Container · ↔ horizontal · fill · fixed height {B2}
│   ├── leading-icon           ◇ Icon · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
│   ├── input                  T {B2 input style} · fill · TEXT `Value` or `Placeholder`
│   └── trailing-action        ◇ instance · BOOLEAN `Trailing action` · INSTANCE_SWAP
└── supporting-row            ↔ horizontal · width fill
    ├── supporting-text        ◇ .Field/Supporting text · TEXT `Supporting text` · BOOLEAN
    └── counter                T caption-md · TEXT `Counter` · BOOLEAN
```

```
Text area                      same outer tree
└── field                      height hug from three input lines · align start
    ├── leading-icon           top aligned
    ├── input                  T multiline · fill · min three lines
    └── trailing-action        top aligned
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Type` | VARIANT | `Single line` · `Multiline` | `Single line` | `multiline` | `false` · `true` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `'sm'` · `'md'` · `'lg'` |
| `State` | VARIANT | `Default` · `Hover` · `Focus` · `Disabled` · `Read-only` | `Default` | `disabled` / `readOnly` | Disabled and Read-only map to props; others are interaction states |
| `Filled` | VARIANT | `False` · `True` | `False` | `value` / `defaultValue` | empty · non-empty |
| `Error` | VARIANT | `False` · `True` | `False` | `error` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Provider locale controls code |
| `Label` | TEXT | | `Work email` / `البريد الإلكتروني للعمل` | `label` | |
| `Show label` | BOOLEAN | | `true` | `hideLabel` | inverse mapping |
| `Required` | BOOLEAN | | `false` | `required` | |
| `Placeholder` | TEXT | | `name@company.com` | `placeholder` | |
| `Value` | TEXT | | `name@company.com` | `value` | |
| `Leading icon` | BOOLEAN | | `false` | `startAdornment` | present / absent |
| `Leading icon glyph` | INSTANCE_SWAP | Icons | `mail` | `startAdornment` | |
| `Trailing action` | BOOLEAN | | `false` | `endAdornment` | present / absent |
| `Trailing action instance` | INSTANCE_SWAP | Icon button | `clear` | `endAdornment` | |
| `Supporting text` | BOOLEAN | | `true` | `helperText` | present / absent |
| `Supporting text value` | TEXT | | `Use your work email` | `helperText` | |
| `Counter` | BOOLEAN | | `false` | `showCounter` | |
| `Counter value` | TEXT | | `0 / 80` | derived | |

### D5 Variants to generate

- Axes: `Type × Size × State × Filled × Error × Language`
- Exclude `State=Disabled × Error=True`; disabled wins in code and does not retain error visuals
- Final count: 2 types × 3 sizes × 2 filled values × 2 languages × 9 valid State/Error pairs = **216 variants**
- Label, required, icons, supporting text and counter are component properties, not variant axes
- Grid: sections by Type and Language; rows = Size × Filled × Error; columns = State; gap `spacing-xl`

Legacy reference mapping:

| Legacy | New |
|---|---|
| `State=Placeholder` | `Filled=False, State=Default` |
| `State=Filled` | `Filled=True, State=Default` |
| `Destructive=True` | `Error=True` |
| `Type=Tags` | Autocomplete (later contract) |
| leading/trailing dropdown | Phone field or Select (later contract) |
| Payment and trailing button layouts | Removed; compose a field with surrounding layout/components |

### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate border color · B4 duration/easing |
| On focus | Default/Hover → Focus | Smart animate border color/width · B4 |
| Validation example | Default/Focus → Error equivalent | Smart animate colors · B4 |

Focus is shown as a component state for docs. Disabled and Read-only have no prototype interaction.

### D7 RTL

Method: `Language=AR` variants. Reverse horizontal auto-layout order, align label/value/supporting text to start, move the counter to inline end and keep counter digits LTR. Do not mirror mail, person, lock, visibility or clear glyphs.

```
EN  │ [◆] name@company.com                         [×] │
AR  │ [×]                         name@company.com [◆] │
```

### D8 Documentation pages

Build the standard pages from the Doc Kit in section `Text field — Documentation`, frames `Text field / 00 Component sheet` through `Text field / 11 Changelog` (skip page 10 for version 1.0). If the Doc Kit is unavailable, complete D2–D7 and report Phase 2 as blocked.

Page notes:
- 00 shows both Text field and Text area sets
- 03 shows size, multiline, label/required, adornments, supporting text and counter
- 04 shows the full state sequence plus Error × Focus
- 07 uses desktop and narrow-form examples
- 08 shows email and Arabic prose examples to explain intrinsic text direction
- 09 shows visible label, visually hidden label, error association and the field focus exception

Component description: “Enters or edits short and multiline text with persistent labels and accessible validation. Spec: 3-web-components/components/text-field/text-field.md”.

### D9 Code Connect

- File: `3-web-components/src/components/text-field/TextField.figma.tsx`
- Mapping: D4 table. Publish after code and Figma are both `Approved`

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 `Text field` and `Text area` sets plus private `.Field/*` bases match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly, including defaults and EN/AR sample copy
- [ ] F-AC-3 Variant count is 216 with no Disabled × Error=True variants
- [ ] F-AC-4 Zero raw visual values; all values use component tokens or published styles/components; token lint reports zero
- [ ] F-AC-5 Light and Dark switch by variable mode; Typography mode is Web
- [ ] F-AC-6 RTL matches D7 and Arabic copy wraps without clipping
- [ ] F-AC-7 Interactions match D6 and component descriptions are filled
- [ ] F-AC-8 Every B2–B3 mapping passes a redline check for SM, MD and LG
- [ ] F-AC-9 Documentation pages and Components List card use only Doc Kit components and live instances, or Phase 2 is explicitly blocked on the missing kit
- [ ] F-AC-10 Legacy mapping is recorded; legacy sets are not moved until approval and product instance migration

### D11 Execution log

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component sets `{id}` · private bases `{id…}` · docs section `{id}` |
| QA report | unbound values: — · contrast: — |

**Deviations**
- none

**Questions for the Planner**
- none

---

## E · Review

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 1 | 2026-10-18 | Changes requested | not reviewed (Figma build not started) |

### E2 Round 1 — 2026-10-18

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-18 |
| Verdict | **Changes requested** — code is solid; 1 gate failure (AC-9, not caused by this component), 2 Planner items and 2 Executor items |
| Evidence | Clean install in a scratch copy: `npm run typecheck` ✅ · `npm run test:web` ✅ 35/35 (Text field 11, Button 24) · `npm run component-tokens` ✅ · `npm run sync` ✅ READY · `npm run docs:check` ❌ 13 stale Figma contracts · contrast of every field pair computed from `dist/tokens.json` on both field backgrounds, light + dark ✅ |

#### Acceptance criteria

| AC | Result | Evidence |
|---|---|---|
| AC-1 API, defaults, warnings, fallbacks | ✅ | `TextField.tsx` props = B1; 4 `warnOnce` cases + fallbacks (test "warns once for every invalid combination") |
| AC-2 Token-only values | ✅ | `text-field.tokens.ts` uses `cssVars` / `biowaveVariants` only; raw-value source test covers all 4 files |
| AC-3 B4 transitions, reduced motion | ✅ | `motion-duration-sm` on border/icon, `motion-duration-instant` for background/disabled; reduced motion via Foundations |
| AC-4 RTL (B5), semantics + keyboard (B6) | ⚠️ | Logical properties only, counter `dir="ltr"` + isolate ✅. `aria-*` lands on the root `div`, not the input — finding 3 |
| AC-5 Tests pass | ✅ | 11 tests; B9 / C6 covered except hover token (finding 6) |
| AC-6 Exported, status | ✅ | `src/index.ts`; README row = header |
| AC-7 No floating label / notch / palette defaults | ✅ | `notched={false}`, legend hidden, label outside the outline |
| AC-8 One public component, private field parts | ✅ | `FieldLabel`, `FieldSupportingText` not exported from the package |
| AC-9 `component-tokens`, `sync`, `docs:check` | ❌ | `docs:check` fails: all 13 Figma contracts stale, including this one — finding 1 |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Contracts regenerated by the generator, not by hand |
| No raw values / no primitives | ✅ | |
| Logical properties, RTL icons | ✅ | |
| Light + dark, en + ar tested | ✅ | All sizes × themes × locales + axe |
| Accessibility (keyboard, focus, labels, target) | ⚠️ | Finding 3; focus exception per I-04 ✅; all field colour pairs ≥ 3:1 / 4.5:1 ✅ |
| Stayed inside the plan | ⚠️ | One agent (Codex) wrote Parts A–D **and** the code, so the plan had no Planner review before `Finished` (AGENTS §1 roles). Edits to `a11y.md`, the contract generator and the Stylis pin are justified and logged (C8, CHANGELOG) — accepted |
| Code matches spec | ✅ | Except finding 4 |
| Accepted deviations reflected back into the spec | ✅ | Stylis 4.2 pin and generator focus rule recorded in C8 |

#### Findings

| # | Severity | File / section | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker (gate) | all `figma-*-contract.md` | `docs:check` fails: every Figma contract is stale since Doc Kit 1.2 changed `figma-doc-kit.md`. Not caused by Text field, but AC-9 cannot pass | Run `_sync/figma-read-library.js` in Foundations (picks up the Doc Kit keys) → `npm run sync:library` → `npm run contract -- --all` → `docs:check` green | Planner |
| 2 | 🟡 Should fix | B3 · read-only | Read-only can't be seen in dark mode: `color-background-neutral-subtle` = `color-background-base-default` (both `#141414`). In light mode it is 1.07:1 against white | Pick a read-only cue that differs in both themes, e.g. `color-background-base-disabled`-like surface is wrong (looks disabled) — recommend `color-border-subtle` border + no background change, or a new semantic `color-background-input-read-only` with distinct light/dark values. Update B3, tokens.json, A5 | Planner |
| 3 | 🟡 Should fix | B1 · `TextField.tsx` (`...rootProps`) | `aria-*` props go to the root `FormControl` `div`. `aria-label`, `aria-labelledby`, `aria-errormessage`, `aria-required` then do nothing for the input. Only `aria-describedby` is routed correctly | Spec: input-related `aria-*` are forwarded to the native input; root gets `className` and `data-*` only. Code: route them through `inputProps`; add a test with `aria-errormessage` | Planner (B1) → Executor |
| 4 | 🟡 Should fix | `FieldLabel.tsx` `RequiredIndicator` | The `*` always uses `default.required` (error colour) even when the field is disabled; the token map already defines `disabled.required` | Pass `disabled` to the indicator and use `textFieldStateTokens.disabled.required` | Executor |
| 5 | 🟢 Nit | B2 · multiline | Multiline block padding uses `spacing-control-gap-*`, which B2 doesn't name. Fine as a value, but undocumented | Add "multiline padding-block = `spacing-control-gap-*`" to B2 and the tokens | Planner |
| 6 | 🟢 Nit | `TextField.test.tsx` | Hover and read-only colours are only checked as "present in the CSS", not tied to their selector; disabled + required colour untested | Assert the hover rule selector and the disabled indicator colour | Executor |
| 7 | 🟢 Nit | `FieldLabel.tsx` | The label is `inline-flex` inside a column flex `FormControl`, so it stretches full width: clicking empty space to the right of a short label focuses the input | `alignSelf: 'flex-start'` on the label | Executor |
| 8 | 🟢 Nit | `TextField.tsx` counter | Uncontrolled counter keeps the old count after a native form `reset` | Listen to the form's `reset` event, or document controlled use with forms that reset | Executor |

#### Not reviewed

- Figma build (Part D): `Figma build = Planned`; no `↳ Text field` page in Biowave DS — Web Components yet. Its contract is stale (finding 1).
- Tablet and Mobile Text field (Day 7 is W·T·M) and Select (Day 7) — no files yet. When Tablet/Mobile are planned, Part A must be copied unchanged (rule 10).

#### Next step

1. Planner: findings 1, 2, 3 (B1), 5 → Plan `Finished` → regenerate contracts.
2. Executor: findings 3 (code), 4, 6, 7, 8 → C8 round 2 → Code `Built`.
3. Round 2 review.

---

## F · Changelog

### F0 Initial version

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-18 | Initial Web Text field and Text area plan | No | — |
| 1.0 | 2026-10-18 | Review round 1: Changes requested (E2) | No | — |
