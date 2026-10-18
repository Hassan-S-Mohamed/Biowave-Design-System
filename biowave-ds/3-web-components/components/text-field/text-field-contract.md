<!-- GENERATED from text-field.md @ afb6038475b860cb — do not edit; change the source and run: npm run contract -- web text-field -->
# Text field · حقل نص — Web — code contract

> **Everything you need to build Text field on Web, and nothing else.** Read this file only. Generated from [`text-field.md`](text-field.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](text-field.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Text field · حقل نص |
| Platform | Web · React + MUI |
| Built on | MUI `FormControl` + `OutlinedInput`; static native label above a notchless outlined field |
| Import | `import { TextField } from '@biowave/web'` |
| Version | 1.0 · 2026-10-18 |
| Source code | [`src/components/text-field/`](../../src/components/text-field/) |
| Tokens | [`text-field.tokens.json`](text-field.tokens.json) |
| Source | [`text-field.md`](text-field.md) @ `afb6038475b860cb` |

## 1. What it is

A text field lets a user enter or edit text. It uses a static label above an outlined field so the purpose stays visible after entry and remains clear with long Arabic labels. The same component covers single-line input and multiline text area; choosing `multiline` changes the field anatomy without changing the form model.

**Part names** (use exactly these in code, class names and tests):

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

**Options** (names and values are the props in §2):

- 4.1 `size`
- 4.2 `multiline`
- 4.3 Label and required indicator
- 4.4 Leading icon and trailing action
- 4.5 Supporting text and counter

## 2. API

### `TextField`

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

## 3. Dimensions

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

## 4. Tokens by part and state

> Machine-readable source: [`text-field.tokens.json`](text-field.tokens.json). In Figma it creates `Text field / Size` and `Text field / State`; every value aliases a semantic Foundations token.

### 3.1 Size tokens

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border | `border-width-default` | `border-width-default` | `border-width-default` |
| adornments | icon size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |

### 3.2 State tokens

| State | `field` background | `field` border | Border width | `label` · `input` | `placeholder` | icons | `supporting-text` · `counter` |
|---|---|---|---|---|---|---|---|
| Default | `color-background-base-default` | `color-border-input-default` | `border-width-default` | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-text-neutral-muted` |
| Hover | same | `color-border-input-hover` | same | same | same | same | same |
| Focus | same | `color-border-focus` | `border-width-focus` | same | same | `color-icon-neutral-default` | same |
| Error | same | `color-border-input-error` | `border-width-default` (focused: `border-width-focus`) | same | same | `color-icon-role-error` | `color-text-role-error` |
| Disabled | `color-background-base-disabled` | `color-border-disabled` | `border-width-default` | `color-text-neutral-disabled` | `color-text-neutral-disabled` | `color-icon-neutral-disabled` | `color-text-neutral-disabled` |
| Read-only | `color-background-neutral-subtle` | `color-border-input-default` | `border-width-default` (focused: `border-width-focus`) | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-text-neutral-muted` |

`required-indicator` uses `color-text-role-error`. Error priority is Disabled → Error → Focus → Hover → Default; an error that receives focus keeps the error color and changes to `border-width-focus`. Dark theme uses the same token names and switches values automatically.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-base-default` | `var(--bw-color-background-base-default)` · `cssVars.color.background.base.default` | #FFFFFF | #141414 |
| `color-background-base-disabled` | `var(--bw-color-background-base-disabled)` · `cssVars.color.background.base.disabled` | #EDEDED | #292929 |
| `color-background-neutral-subtle` | `var(--bw-color-background-neutral-subtle)` · `cssVars.color.background.neutral.subtle` | #F7F7F7 | #141414 |
| `color-border-disabled` | `var(--bw-color-border-disabled)` · `cssVars.color.border.disabled` | #DBDBDB | #404040 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-border-input-default` | `var(--bw-color-border-input-default)` · `cssVars.color.border.input.default` | #707070 | #969696 |
| `color-border-input-error` | `var(--bw-color-border-input-error)` · `cssVars.color.border.input.error` | #D42222 | #FF7676 |
| `color-border-input-hover` | `var(--bw-color-border-input-hover)` · `cssVars.color.border.input.hover` | #404040 | #BDBDBD |
| `color-icon-neutral-default` | `var(--bw-color-icon-neutral-default)` · `cssVars.color.icon.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-icon-neutral-disabled` | `var(--bw-color-icon-neutral-disabled)` · `cssVars.color.icon.neutral.disabled` | #969696 | #545454 |
| `color-icon-neutral-muted` | `var(--bw-color-icon-neutral-muted)` · `cssVars.color.icon.neutral.muted` | #707070 | #BDBDBD |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #FF2B2B | #FEA3A3 |
| `color-text-neutral-default` | `var(--bw-color-text-neutral-default)` · `cssVars.color.text.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-text-neutral-disabled` | `var(--bw-color-text-neutral-disabled)` · `cssVars.color.text.neutral.disabled` | #969696 | #545454 |
| `color-text-neutral-muted` | `var(--bw-color-text-neutral-muted)` · `cssVars.color.text.neutral.muted` | #707070 | #BDBDBD |
| `color-text-neutral-placeholder` | `var(--bw-color-text-neutral-placeholder)` · `cssVars.color.text.neutral.placeholder` | #707070 | #969696 |
| `color-text-role-error` | `var(--bw-color-text-role-error)` · `cssVars.color.text.role.error` | #D42222 | #FEA3A3 |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-control-gap-lg` | `var(--bw-spacing-control-gap-lg)` · `cssVars.spacing.control.gap.lg` | 8 | 8 |
| `spacing-control-gap-md` | `var(--bw-spacing-control-gap-md)` · `cssVars.spacing.control.gap.md` | 6 | 6 |
| `spacing-control-gap-sm` | `var(--bw-spacing-control-gap-sm)` · `cssVars.spacing.control.gap.sm` | 4 | 4 |
| `spacing-control-padding-inline-lg` | `var(--bw-spacing-control-padding-inline-lg)` · `cssVars.spacing.control.padding-inline.lg` | 16 | 16 |
| `spacing-control-padding-inline-md` | `var(--bw-spacing-control-padding-inline-md)` · `cssVars.spacing.control.padding-inline.md` | 12 | 12 |
| `spacing-control-padding-inline-sm` | `var(--bw-spacing-control-padding-inline-sm)` · `cssVars.spacing.control.padding-inline.sm` | 8 | 8 |
| `spacing-sm` | `var(--bw-spacing-sm)` · `cssVars.spacing.sm` | 6 | 6 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

### 4.2 Component tokens

The code token map must equal [`text-field.tokens.json`](text-field.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Text field / Size | height | sm: `size-control-height-sm` · md: `size-control-height-md` · lg: `size-control-height-lg` |
| Text field / Size | padding-inline | sm: `spacing-control-padding-inline-sm` · md: `spacing-control-padding-inline-md` · lg: `spacing-control-padding-inline-lg` |
| Text field / Size | gap | sm: `spacing-control-gap-sm` · md: `spacing-control-gap-md` · lg: `spacing-control-gap-lg` |
| Text field / Size | label-gap | sm: `spacing-sm` · md: `spacing-sm` · lg: `spacing-sm` |
| Text field / Size | supporting-gap | sm: `spacing-xs` · md: `spacing-xs` · lg: `spacing-xs` |
| Text field / Size | icon | sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` |
| Text field / Size | radius | sm: `radius-md` · md: `radius-md` · lg: `radius-md` |
| Text field / Size | border-width | sm: `border-width-default` · md: `border-width-default` · lg: `border-width-default` |
| Text field / State | background | default: `color-background-base-default` · hover: `color-background-base-default` · focus: `color-background-base-default` · error: `color-background-base-default` · disabled: `color-background-base-disabled` · read-only: `color-background-neutral-subtle` |
| Text field / State | border | default: `color-border-input-default` · hover: `color-border-input-hover` · focus: `color-border-focus` · error: `color-border-input-error` · disabled: `color-border-disabled` · read-only: `color-border-input-default` |
| Text field / State | border-width | default: `border-width-default` · hover: `border-width-default` · focus: `border-width-focus` · error: `border-width-default` · disabled: `border-width-default` · read-only: `border-width-default` |
| Text field / State | label | default: `color-text-neutral-default` · hover: `color-text-neutral-default` · focus: `color-text-neutral-default` · error: `color-text-neutral-default` · disabled: `color-text-neutral-disabled` · read-only: `color-text-neutral-default` |
| Text field / State | input | default: `color-text-neutral-default` · hover: `color-text-neutral-default` · focus: `color-text-neutral-default` · error: `color-text-neutral-default` · disabled: `color-text-neutral-disabled` · read-only: `color-text-neutral-default` |
| Text field / State | placeholder | default: `color-text-neutral-placeholder` · hover: `color-text-neutral-placeholder` · focus: `color-text-neutral-placeholder` · error: `color-text-neutral-placeholder` · disabled: `color-text-neutral-disabled` · read-only: `color-text-neutral-placeholder` |
| Text field / State | icon | default: `color-icon-neutral-muted` · hover: `color-icon-neutral-muted` · focus: `color-icon-neutral-default` · error: `color-icon-role-error` · disabled: `color-icon-neutral-disabled` · read-only: `color-icon-neutral-muted` |
| Text field / State | supporting | default: `color-text-neutral-muted` · hover: `color-text-neutral-muted` · focus: `color-text-neutral-muted` · error: `color-text-role-error` · disabled: `color-text-neutral-disabled` · read-only: `color-text-neutral-muted` |
| Text field / State | counter | default: `color-text-neutral-muted` · hover: `color-text-neutral-muted` · focus: `color-text-neutral-muted` · error: `color-text-role-error` · disabled: `color-text-neutral-disabled` · read-only: `color-text-neutral-muted` |
| Text field / State | required | default: `color-text-role-error` · hover: `color-text-role-error` · focus: `color-text-role-error` · error: `color-text-role-error` · disabled: `color-text-neutral-disabled` · read-only: `color-text-role-error` |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | Pointer enters field | border color | `motion-duration-sm` | `motion-easing-standard` |
| Hover/Default → Focus | Native input receives focus | border color and width | `motion-duration-sm` | `motion-easing-standard` |
| Any enabled → Error | Validation result changes | border, icon and supporting-text color | `motion-duration-sm` | `motion-easing-standard` |
| Enabled ↔ Disabled/Read-only | prop changes | background, border and text colors | `motion-duration-instant` | — |

Reduced motion: durations resolve to instant through Foundations; no spatial motion is used. The value, selection and focus are never reset by a visual transition.

## 6. RTL

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

## 7. Accessibility (implementation)

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

## 8. Examples

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

## 9. How to build it

### Goal

`import { TextField } from '@biowave/web'` renders the single-line and multiline APIs in B1 with static labels, token-only state styling, native form behavior, English/Arabic direction, accessible error/help/counter relationships and complete tests.

### Scope

**In scope**
- [ ] All B1 props, B2 dimensions, B3 tokens, B4 states, B5 RTL, B6 accessibility and B9 tests
- [ ] Private shared pieces `FieldLabel` and `FieldSupportingText` in the text-field folder for later field-family components to reuse after their own contracts approve that dependency

**Out of scope (do not build)**
- Select, Verification code, Phone field, Search field or Autocomplete
- Form-level validation, error summaries or submit orchestration
- Masking, parsing, currency formatting, rich text or autosuggest menus
- A public base-field component; shared pieces remain internal

### Approach

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

### Token gaps

None. Multiline height derives from row count and the semantic text/padding tokens; no raw component height is needed.

### Files to create / change

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

## 10. Tests

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

Implement every item in B9, plus:
- [ ] Label click/focus association and generated-id stability
- [ ] Caller `aria-describedby` is preserved and merged with supporting/counter ids
- [ ] `endAdornment` interactive content remains reachable after the input
- [ ] Counter counts Arabic and emoji as Unicode code points and never has `aria-live`
- [ ] Error focus uses error color plus focus width; normal focus uses focus color plus focus width
- [ ] Token-map test covers every size/state entry and matches component-token aliases
- [ ] “No raw values” source check covers every file in the component folder

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API, defaults, warnings and fallbacks match B1 exactly
- [ ] AC-2 Every visual value comes from B2–B3 through `cssVars`/`biowaveVariants`; no raw values or primitives
- [ ] AC-3 Every B4 transition exists and reduced motion resolves through Foundations
- [ ] AC-4 RTL matches B5; semantics and native keyboard behavior match B6
- [ ] AC-5 B9 and C6 tests pass with `npm run typecheck` and `npm run test:web`
- [ ] AC-6 Exported from `src/index.ts`; header and section README status are `Built`
- [ ] AC-7 MUI floating label/notch styling and palette defaults do not appear
- [ ] AC-8 Single-line and multiline use one public component, with private reusable field parts
- [ ] AC-9 `npm run component-tokens`, `npm run sync` and `npm run docs:check` pass

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus` at `border-width-focus`, with no exterior offset per the documented field exception in §7), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](text-field.md#c8-execution-log-filled-by-the-executor) in `text-field.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `text-field.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
