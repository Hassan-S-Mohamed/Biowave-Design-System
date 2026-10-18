# Figma audit and plan — Input family (Text field · Text area · Select · Verification code · Phone field · Search field · Autocomplete)

> Agent summary: what exists in Figma today for text inputs, what is missing to meet the Biowave Definition of done (ROADMAP §2), the decisions **I-01 … I-10** to close before the Day 7 specs are written, and the build order. Read-only audit: nothing in Figma or the token source was changed. Out of scope: Checkbox, Radio, Switch (Day 6, own pages), Date/Time pickers (Day 14–15, will reuse the field parts defined here).

| Field | Value |
|---|---|
| File | Biowave DS — Foundations `AyFaSmfDUlTax3GpKhRdHI` (legacy sets) |
| Pages | Web `↳ Inputs` 1268:1776 · Mobile `↳ Inputs` 3991:1584 · Mobile `↳ Text Area` 4131:10187 |
| Target files | Biowave DS — Web / Tablet / Mobile Components (D-12) — no Inputs page yet |
| Date | 2026-10-18 |
| Plan status | **Decisions closed** 2026-10-18 — all recommendations accepted by the design lead; next: Day 7 specs |
| Method | Plugin API scan of every set: properties, variant counts, fill bindings, text styles; token check against `2-foundations/dist/tokens.json` |

## 1. Summary — what exists

| Legacy set | Page | Variants | Fills bound | Text styles | Readiness | Biggest gaps |
|---|---|---:|---|---|---|---|
| `Inputs` 4379:3155 | Web | 56 | 99 % | 100 % | 🟡 Good base, wrong model | 8 unrelated layouts in one `Type` axis (dropdown, payment, tags, trailing button); `Placeholder·Filled` stored as states; `Destructive` instead of error; no size axis; no hover / read-only |
| `Dropdown` 4379:3939 | Web | 30 | 99 % | 100 % | 🟠 Needs rework | Menu built inside (8 option slots — same issue as G-08 buttons); `Type` mixes leading visual and multi-select tags; no size axis |
| `Textarea input field` 4392:29842 | Web | 14 | 100 % | 100 % | 🟢 Good base | No counter; `Tags` type belongs to Autocomplete |
| `Verification code input field` 4392:30109 | Web | 48 | 100 % | 100 % | 🟢 Good base | Has sizes `sm·md·lg` and `4·6` digits already — keep as the model; needs per-cell states, RTL rule (digits stay LTR) |
| `Inputs` 4131:7070 + parts (`Title`, `Container`, `Supporting`, icon sets) | Mobile | 40 (+45 parts) | 90 % | **0 %** | 🟠 Needs rework | Second naming scheme (`Fill-Disabled`, `Disable`, `Support Msg`); no text styles; parts are public sets |
| `PIN Input` 4131:7157 | Mobile | 16 | 100 % | 75 % | 🟡 Duplicate | Same job as web Verification code — merge |
| `Phone Number` 4131:7389 | Mobile | 30 | 85 % | 1 % | 🟠 Needs rework | Country code drawn by hand; should be Text field + Select |
| `Search Input` 4131:7812 | Mobile | 5 | 100 % | 0 % | 🟡 | Belongs to Search field (Day 13) |
| `Details input` 4131:10189 | Mobile Text Area | 5 | — | — | 🟡 Duplicate | Same job as web Textarea — merge |
| **Code** | — | — | — | — | 🔴 None | No guidelines, specs, contracts, code or tests |

**Real usage found on the legacy web page** (23 product screens kept beside the sets — evidence for which options are needed): Login, Client code, Phone number + Select country, OTP + resend, Pincode tooltip, Add employee, Add device, Add rule, Add manual time, Request forms (sick leave, remote work), Reject reason, Edit profile, Live chat, Report day details, LMS disconnect (typed confirmation). No payment field is used anywhere.

## 2. Cross-cutting gaps

| ID | Gap | Evidence | Fix |
|---|---|---|---|
| IG-01 | **Two vocabularies** (web vs mobile) and both differ from the button family | `State=Placeholder·Filled·Focused` vs `Default·Fill·Fill-Disabled·Disable`; `Destructive=True` vs `State=Error`; `Show label` vs `Label Icon=on` | One property model for the whole family (I-05) |
| IG-02 | **Content mixed with state** | `Placeholder`/`Filled` are states on web; `Fill-Disabled` is a state on mobile | `Filled` becomes a boolean, `State` only holds interaction states |
| IG-03 | **One set doing eight jobs** | Web `Inputs` `Type` = Default · Leading/Trailing dropdown · Leading/Trailing text · Payment · Tags · Trailing button | Split by job: Text field (prefix/suffix text, icons, trailing action) · Phone field · Autocomplete (tags). Drop Payment and Trailing button (I-01) |
| IG-04 | **Menu built into Dropdown** | 8 `Option n` instance slots inside `Dropdown` | Select shows only its open state (chevron rotated, `aria-expanded`); the list is Menu (Day 10) placed in examples — same rule as G-08 |
| IG-05 | **No size axis** on Inputs / Dropdown / Textarea | Single height | `sm·md·lg` from `size.control.height.*` so a field and a Button in the same row align (B-03) |
| IG-06 | **Duplicates across web and mobile** | PIN Input ≈ Verification code; Details input ≈ Textarea; mobile parts sets public | One family per platform file, base parts private (`.Field/…`) |
| IG-07 | **Separate parts not shared** | Label, help icon, supporting text redrawn in every set | Shared private base components + shared code internals (I-09) so Select, Search, Autocomplete, Date picker reuse them |
| IG-08 | **Focus treatment undefined for fields** | Legacy uses border colour only; AGENTS rule 6 says 2px ring with 2px offset | Decide I-04 |

## 3. Token check (against `dist/tokens.json`)

| Need | Token | Status |
|---|---|---|
| Field height per size | `size-control-height-{sm,md,lg}` | ✅ exists (P-04 lists inputs) |
| Inline padding / icon gap | `spacing-control-padding-inline-*` · `spacing-control-gap-*` | ✅ |
| Border default / hover / error | `color-border-input-{default,hover,error}` | ✅ |
| Border focus / disabled | `color-border-focus` · `color-border-disabled` | ✅ |
| Field background / disabled | `color-background-base-default` · `color-background-base-disabled` | ✅ |
| Placeholder / value / label / helper text | `color-text-neutral-{placeholder,default,subtle}` | ✅ — check placeholder contrast in Day 7 plan |
| Error text / icon | `color-text-role-error` · `color-icon-role-error` | ✅ |
| Label → field gap | `spacing-…` (foundation description says "form field label gap") | ✅ confirm which step in Day 7 |
| Radius | `radius-md` ("input, select, small popover") | ✅ |
| Read-only background | — | ⚠️ gap if I-05 keeps Read-only — propose `color-background-neutral-subtle` alias, no new token |
| Multiline min height (Text area) | — | ⚠️ likely component token in `text-field.tokens.json` |
| OTP cell width | — | ⚠️ reuse `size-control-height-*` (square cells) — no new token |

No foundation change is needed before Day 7; the ⚠️ items are settled in the Day 7 / Day 8 plans (C4 Token gaps).

## 4. Decisions (✅ confirmed by design lead 2026-10-18 — all recommendations accepted)

| ID | Question | Options | Decision |
|---|---|---|---|
| I-01 | Family scope | Components: Text field · Text area · Select · Verification code · Phone field · Search field · Autocomplete. Drop: Payment (unused), Trailing button (= Text field + Button in a row, a layout) | ✅ As listed |
| I-02 | Label position | (a) static label above the field · (b) floating label inside (MUI / M3 default) | ✅ **(a)** — matches all legacy screens, never overlaps long Arabic text, clearer for a11y. MUI: `InputLabel shrink` outside + `OutlinedInput` without notch; Flutter: label `Text` above, `floatingLabelBehavior: never` |
| I-03 | Field style | (a) outlined only · (b) outlined + filled (M3) | ✅ **(a)** outlined only — fewer variants, legacy is outlined |
| I-04 | Focus indicator on fields | (a) border swaps to `color-border-focus` at `border-width-focus`, no offset ring · (b) normal 2px ring with 2px offset outside the border | ✅ **(a)** — standard for text fields (MUI, M3, Carbon, Polaris); meets WCAG 2.4.11/2.4.13 if the border has 3:1 contrast. Record it as the one field exception in `a11y.md` |
| I-05 | Property model (all fields) | `Size = sm·md·lg` · `State = Default·Hover·Focus·Disabled·Read-only` (Hover web only) · `Filled` bool · `Error` bool · `Language = EN·AR` (B-04) · booleans for label, required, help icon, leading icon, trailing action, helper text, counter | ✅ Accepted; web default `md`, tablet/mobile default `lg` |
| I-06 | Multi-line | (a) one code component (`TextField multiline` / `BwTextField(maxLines)`) with its own Figma set `Text area` · (b) separate component everywhere | ✅ **(a)** — one spec file `text-field.md`, two Figma sets (different anatomy: resize handle, counter at the bottom, top-aligned icons) |
| I-07 | Phone number | (a) Phone field component = Text field + country Select (Phase 2, needs Menu) · (b) Text field option `leading-select` · (c) pattern only | ✅ **(a)** — Day 13 with Search field and Autocomplete |
| I-08 | Verification code | Not in the roadmap but used by Sign-in and OTP pattern (Day 23) | ✅ Add as a **core** component on **Day 8** (no other component inside); digits always LTR and Western (D-10) |
| I-09 | Shared field parts | (a) private base components `.Field/Label` · `.Field/Container` · `.Field/Supporting text` in each platform file + shared code internals (`FieldLabel`, `FieldSupportingText`) · (b) each component draws its own | ✅ **(a)** — specified once in `text-field.md` (B + D), reused by every later field |
| I-10 | Legacy sets | Keep as read-only reference, deprecate to `_Deprecation Ground` after the new sets are Approved (as B-05 / D-12) | ✅ Accepted |

## 5. Plan — outputs and build order

| Day | Component | W | T | M | Base (MUI / M3) | Outputs per platform | Depends on |
|---|---|:-:|:-:|:-:|---|---|---|
| 7 | **Text field** (+ Text area, + shared field parts) | ● | ● | ● | `TextField` (static label) / `TextField` + `InputDecorationTheme` | `text-field.md` A–D · `text-field.tokens.json` · 2 contracts | Icon, Icon button (clear, password visibility) |
| 7 | **Select** (single; multi goes to Autocomplete) | ● | ● | ● | `Select` / `DropdownMenu` | `select.md` · tokens · contracts — open state only, placeholder list until Menu | Text field parts, Icon; Menu swapped in on Day 10 |
| 8 | **Verification code** (new) | ● | ● | ● | custom on `InputBase` ×n / custom `TextField` ×n | `verification-code.md` · tokens · contracts | Text field parts |
| 13 | Search field | ● | ● | ● | (roadmap) | | Text field, Icon button |
| 13 | Autocomplete (single + multi tags) | ● | ● | ● | (roadmap) | | Text field, Menu, Chip, Progress |
| 13 | **Phone field** (new) | ● | ● | ● | Text field + Select / `TextField` + `DropdownMenu` | `phone-field.md` · contracts | Text field, Select, Menu |

Day 7 stays a two-item heavy day (ROADMAP §9). Day 8 and Day 13 become three items each.

### Order of work for Day 7 (after the decisions)
1. Planner: `text-field.md` for W/T/M — Part A once (copied ×3), shared field parts defined in A2/B1/D2, then B–D per platform; `text-field.tokens.json`; Plan → Finished; `npm run contract -- <plat> text-field`.
2. Planner: same for `select.md`.
3. Planner: `a11y.md` note for I-04; ROADMAP rows for I-07 / I-08; `CHANGELOG.md`.
4. Code Executors (W, T, M) and Figma Agent run from the contracts; Planner reviews in Part E.

## 6. Legacy property inventory (web `↳ Inputs` 1268:1776, read 2026-10-18)

Every component property on the four legacy sets, and where it goes in Biowave. ✅ = already in a Biowave spec · ➕ = proposed addition (decision I-11 … I-14) · → = belongs to another component · ✗ = dropped.

### 6.1 Shared field properties (all four sets)

| Legacy property | Sets | Type | Biowave | Where |
|---|---|---|---|---|
| `Show label` · `Label` | Inputs, Dropdown, Textarea, Verification code | BOOLEAN · TEXT | ✅ `label` + `hideLabel` | Text field B1 |
| `Required` (asterisk) | Inputs, Dropdown, Textarea | BOOLEAN | ✅ `required` | B1 |
| `Help icon` (instance `Help icon`, tooltip variants) | Inputs (inside field, trailing), Dropdown + Textarea (label row) | INSTANCE_SWAP + BOOLEAN | ➕ I-11 | label row or field |
| `Supporting text` / `Hint text` | all | TEXT + BOOLEAN | ✅ `helperText` | B1 |
| `Destructive` | Inputs, Textarea, Verification code | VARIANT | ✅ `error` (renamed) | B1 |
| `Error icon` (`alert-circle`) | Inputs | INSTANCE_SWAP + BOOLEAN | ➕ I-11 | field trailing or supporting row |
| `State` = Placeholder · Filled/Default · Focused · Disabled | all | VARIANT | ✅ State + `Filled` boolean (I-05); adds Hover, Read-only | D4 |
| `State` = Open | Dropdown | VARIANT | → Select | Select B1 |

### 6.2 Inputs set (56 variants) — `Type` values

| `Type` | What it is (layer tree) | Extra properties | Biowave |
|---|---|---|---|
| Default | `Content` = leading icon + text; `Help icon` trailing | `Leading visual` (swap `mail-01`) | ✅ `startAdornment` |
| Leading dropdown | `Dropdown` segment ("US ▾", 53 px) + `Text input`, no divider | `Dropdown text`, `Chevron icon` | → Phone field (I-07); unit/currency select ➕ I-14 |
| Trailing dropdown | `Text input` + `Dropdown` segment at end | same | ➕ I-14 |
| Leading text | `Add-on` segment ("http://") with divider + `Text input` | `Add-on text` | ➕ I-12 prefix |
| Trailing text | `Text input` + `Add-on` segment at end | `Add-on text` | ➕ I-12 suffix |
| Payment | card-brand icon as leading visual | `Payment method` (swap) | ✗ not used in Biowave (I-01) |
| Tags | `Tags` (2 × `Tag` with avatar + ×) + text | `Tag 1`, `Tag 2` | → Autocomplete multi (Day 13) |
| Trailing button | `Text input` + attached secondary `Button` ("Copy", `copy-01`) | `Trailing action` (swap Button) | ➕ I-14 (was ✗ in I-01) |

### 6.3 Dropdown set (30 variants) → Select

| Property | Values | Biowave Select |
|---|---|---|
| `Type` | Default · Icon leading · Avatar leading · Dot leading · Search · Tags | Default ✅ · Icon leading ✅ · Avatar leading ➕ · Dot leading ➕ (status dot, e.g. employee status) · Search → Search field / Autocomplete · Tags → Autocomplete |
| `Leading visual` (`user-01`) · `Search icon` · `Shortcut text` (⌘K) | swap / text | icon ✅ · shortcut → Search field (backlog) |
| `Option 1 … 8` (`_Select menu item`) | swap + bool | ✗ menu not inside the component (IG-04) — Menu, Day 10 |
| `Chevron icon` | swap | fixed part, rotates when open |
| `State=Open` | | ✅ `Expanded` / open state |

### 6.4 Textarea set (14 variants) → Text field `multiline`

| Property | Biowave |
|---|---|
| `Type` = Default · Tags | Default ✅ · Tags → Autocomplete |
| `Resize handle` (BOOLEAN) | ➕ `resize` = `vertical · none` (web only; spec allows resize today but has no prop) |
| `↳ Required *`, `↳ Help icon` in label row | ✅ required · ➕ I-11 |
| Counter | not in legacy · ✅ already in Biowave |

### 6.5 Verification code set (48 variants)

`Size` sm·md·lg ✅ · `Digits` 4·6 ✅ · `Label` ✅ · `Hint text` ✅ · `Destructive` → `error` ✅ · `State` ✅. Built from private `_Mega input field base` (one cell, 64 × 64) — keep the pattern as `.Verification code/Cell`.

### 6.6 Decisions (✅ confirmed by design lead 2026-10-18 — all recommendations accepted, error icon added)

| ID | Question | Decision |
|---|---|---|
| I-11 | Help icon and error icon | ✅ Help icon (with Tooltip) in the **label row**, never inside the field. Error icon at the start of the supporting text, not inside the field, so the trailing slot stays free for one action |
| I-12 | Prefix / suffix text (`http://`, `SAR`, `%`, `kg`) | ✅ Add `prefix` / `suffix` as attached add-on segments with a divider (legacy look) |
| I-13 | Trailing action API (fixes the adornment bug, §7) | ✅ Replace free `endAdornment` content with a managed `action` prop (`{ icon, label, onClick }`) that the field renders as an Icon button sized to the field and disabled with it; keep built-ins `clearable` and the password visibility toggle. `endAdornment` keeps decorative icons only |
| I-14 | Attached button / attached select segments | ✅ Add `endButton` (attached secondary Button, e.g. "Copy") to Text field; attached unit/currency select → backlog (Phone field covers country code) |

## 7. Adornment bug (Web Text field, found 2026-10-18)

Reproduced by rendering the built component in Chromium (en/ar, viewport 980 px and 1280 px). Details and fixes: `3-web-components/components/text-field/text-field.md` › E3.

| # | Bug | Evidence |
|---|---|---|
| AD-1 | Trailing slot is sized by `target-min`, which is **48 px below 1200 px viewport**: slot 48 × 48 overflows `sm` (32) and `md` (40) fields by 8 / 4 px, and pushes a decorative trailing icon 24–28 px from the edge while the leading icon sits at the field padding (8–16 px) | `.bw-text-field__trailing-action` 48×48 at top −8 (sm) |
| AD-2 | An Icon button in the slot is not sized by the field: `md`/`lg` buttons are as tall as the field and paint over its border; hover/focus backgrounds cover the outline | Password md: button 40×40 at 0,0 in a 40 px field |
| AD-3 | Disabled field does not disable its trailing action: Clear button stays in the tab order, clickable, full colour | Tab reaches "Clear" in the Disabled field; colour `rgb(10,10,10)`, cursor pointer |
| AD-4 | Error turns **every** icon red (leading mail icon, help icon) | B3 maps all icons to `color-icon-role-error` — legacy keeps the leading icon neutral and shows a separate error icon |
| AD-5 | Multiline: trailing action is not aligned to the first text line (spec A4.5) — it sits between line 1 and 2 | Notes md: button top 14 px vs first line 6 px |
| AD-6 | Clicking the leading icon or empty slot area does not focus the input | `click(.bw-text-field__leading-icon)` → `document.activeElement = BODY` |
