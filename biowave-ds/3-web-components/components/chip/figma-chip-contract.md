<!-- GENERATED from chip.md @ 9a663318585a6c0d — do not edit; change the source and run: npm run contract -- web chip -->
# Chip · شريحة — Web — Figma contract

> **Everything the Figma Agent needs to build Chip in the Web Components file, with our variables and styles.** Read this file only. Generated from [`chip.md`](chip.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](chip.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Chip` (one page per component) |
| Component | Chip · شريحة |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-23 |
| Source | [`chip.md`](chip.md) @ `9a663318585a6c0d` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 9 collections, 318 variables reachable |

Import by key — never search by name, never copy:

```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy
const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style
const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component
const set = await figma.importComponentSetByKeyAsync('<component set key>');
```

## 2. Component-token collections (bind layers to these)

None yet — this component has no component tokens. Bind to the Foundations variables in §3 and report it in D11 so the Planner adds component tokens.

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-focus-offset` | 9. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `border-width-focus` | 9. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `color-background-brand-subtle` | 1. Themes › `color/background/brand/subtle` | `7e262abe296024e9b4a29951d5e061fee8f3f2d7` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-error-subtle` | 1. Themes › `color/background/error/subtle` | `b408c27a651904c0bc3c5396b3e88319c4d4d6fe` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-info-subtle` | 1. Themes › `color/background/info/subtle` | `7a1efc88827df67abddac933a6d6785e946cceb1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-neutral-disabled` | 1. Themes › `color/background/neutral/disabled` | `9972624254ddd391df63a7787d0281e703f584f2` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-secondary-subtle` | 1. Themes › `color/background/secondary/subtle` | `6cfea2f9951f4815d9385c0029ee3dd3cc4eba6a` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-success-subtle` | 1. Themes › `color/background/success/subtle` | `5702d75c14273a310c63dfd9d27b5c1d7af2e9f8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent` | 1. Themes › `color/background/transparent` | `7ded3d8bfead13a83fc2297ef9dc75a16f73857b` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-warning-subtle` | 1. Themes › `color/background/warning/subtle` | `98f72131ce9a86bd1cdbe39edc82da47069da705` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-brand` | 1. Themes › `color/border/brand` | `50ddd3d7028ede7c14f73576869a28588b0c3b7d` | COLOR | STROKE_COLOR | spec |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | spec |
| `color-border-disabled` | 1. Themes › `color/border/disabled` | `a6d557c3fa0bcb0e2e6b6592234d737ef80936bf` | COLOR | STROKE_COLOR | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-icon-neutral-default` | 1. Themes › `color/icon/neutral/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-neutral-disabled` | 1. Themes › `color/icon/neutral/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-neutral-subtle` | 1. Themes › `color/icon/neutral/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-info` | 1. Themes › `color/icon/role/info` | `9bbd326956964ff857cb9e3a5f9e0f41883fe168` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-secondary` | 1. Themes › `color/icon/role/secondary` | `b3c3c18415370f381760224fd00a40f2816ffdb6` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-success` | 1. Themes › `color/icon/role/success` | `096b2f9e4c965c38f55d3dd051dbff93f36a33e5` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-warning` | 1. Themes › `color/icon/role/warning` | `3fa016bcd1409896b81681403e6a214dcc365fda` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-overlay-hover` | 1. Themes › `color/overlay/hover` | `aa2655bb098fde1c03c1b3c143cb22c435402789` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-overlay-pressed` | 1. Themes › `color/overlay/pressed` | `8910a028526424e788cdae6f511506ebb855ab37` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-neutral-default` | 1. Themes › `color/text/neutral/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-neutral-disabled` | 1. Themes › `color/text/neutral/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | spec |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | spec |
| `color-text-role-info` | 1. Themes › `color/text/role/info` | `f4c1549db7800b52c7614f14ca0e63b586f2e061` | COLOR | TEXT_FILL | spec |
| `color-text-role-secondary` | 1. Themes › `color/text/role/secondary` | `39d1b107af72de6e3b48156a5c5f3e7cb170b7de` | COLOR | TEXT_FILL | spec |
| `color-text-role-success` | 1. Themes › `color/text/role/success` | `4d99dc192c15bc4d84ab06b0d7dfa29a74768030` | COLOR | TEXT_FILL | spec |
| `color-text-role-warning` | 1. Themes › `color/text/role/warning` | `298f6713572958c933c408402deaaaefd3806679` | COLOR | TEXT_FILL | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-gap-sm` | 3. Spacing › `spacing/control/gap/sm` | `97daa7ac19168846d702cc8c210d1e162a484b41` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-padding-inline-sm` | 3. Spacing › `spacing/control/padding-inline/sm` | `fb323143873973f1548553562791a9983936aa5a` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-sm` | 3. Spacing › `spacing/sm` | `8332b62aa90dea8417383c59a11eee680e0f1db5` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-instant` · `motion-duration-sm` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Focus/Ring` | `a52fabd21a5e545bc7bef092fbf39ebfe0e9bd43` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `add` | `7d426edec81a6ef6e44ffdcc37eab6863c7943a7` | `d20bdb7a3a61cd1a31b9e9dddf5c46330cc9bbff` | `cbadf0df7af23f20cf573e9b3856c059d146c57d` |
| `check` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |
| `close` | `e59e13c612139f0079fe8e1c86a696f24a335eec` | `59b74c3af3cc86471fc3c3da406e1af6f4653030` | `ba5c2563c6776e81c31d5f5212c1376851c1ff4d` |

## 7. Phase 1 — values (from Part B)

### B1 API

### `Chip`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `assist` · `filter` · `input` · `tag` · `status` | — | ✓ | A4.1 |
| `label` | string | | | ✓ | Visible text and accessible name; one line (B2) |
| `size` | enum | `sm` · `md` | `sm` | | A4.2 |
| `icon` | `IconName` | Material Symbols name (Icon B1) | — | | A4.5 `leading-icon` · `assist`, `filter`, `input`, `tag` |
| `avatar` | `ChipAvatar` | `{ name?: string; src?: string; initials?: string; icon?: IconName; color?: AvatarColor }` | — | | A4.5 `leading-avatar` · `input` only; rendered as a decorative Biowave `Avatar` (B2) |
| `color` | enum | `neutral` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | `neutral` | | A4.3 · `tag` only |
| `status` | enum | the 7 request states of A4.4 — values added in plan 1.1 | — | ✓ for `status` | A4.4 · `status` only; not built in 1.0 (C2) |
| `selected` | boolean | | `false` | | A4.6 · `filter` only; controlled |
| `onSelectedChange` | `(selected: boolean) => void` | | | ✓ for `filter` | Called with the new value on click, Enter or Space |
| `onClick` | `(event) => void` | | | ✓ for `assist` | Runs the action |
| `onRemove` | `() => void` | | | ✓ for `input` | A4.7 — called by the remove button (click, Enter, Space, Backspace, Delete) |
| `removeLabel` | string | | locale: “Remove {label}” / “إزالة {label}” | | Accessible name of the remove button |
| `disabled` | boolean | | `false` | | A4.8 · `assist`, `filter`, `input` only |
| `className` · `data-*` · `aria-*` · `ref` | | | | | Forwarded to the `container` (`<button>` for `assist`/`filter`, `<span>` otherwise) |

Exported types: `ChipProps`, `ChipVariant`, `ChipSize`, `ChipColor`, `ChipAvatar`.

Platform naming notes: web `onClick` = Flutter `onPressed`; web `onSelectedChange` = Flutter `onSelected`; web `onRemove` = Flutter `onRemoved`; web `disabled` = Flutter callback `null`. Flutter uses one named constructor per `variant` (`BwChip.assist` …).

**Invalid combinations** (`warnOnce` in development; the chip still renders as described):

| Combination | Fallback |
|---|---|
| `assist` without `onClick` | Renders disabled |
| `filter` without `onSelectedChange` | Renders disabled |
| `input` without `onRemove` | Renders without `remove-button` |
| `onClick` on a variant other than `assist` | Ignored |
| `selected` or `onSelectedChange` on a variant other than `filter` | Ignored |
| `onRemove` or `removeLabel` on a variant other than `input` | Ignored |
| `avatar` on a variant other than `input` | Ignored |
| `avatar` and `icon` together | `icon` ignored |
| `color` on a variant other than `tag` | Ignored |
| `icon` on `status` | Ignored (the state sets the icon) |
| `disabled` on `tag` or `status` | Ignored |
| `variant="status"` in 1.0 | Renders as `tag` with `color="neutral"`; warns “status states are not defined yet” (C2) |
| Empty `label` (blank) | Renders; warns “chips need a label” |

### B2 Dimensions

```
assist / filter, sm                         input with avatar and remove, sm
   pad-inline     gap        pad-inline       spacing-xs           spacing-xs
   ├──┤          ├─┤        ├──┤             ├─┤                   ├─┤
┬  ┌──────────────────────────────┐       ┬  ┌─────────────────────────────────┐
│  │  [◆]  Add note               │       │  │ (SA)  Sara Ali            [×]   │
┴  └──────────────────────────────┘       ┴  └─────────────────────────────────┘
size-control-height-sm   radius-md         avatar box size-icon-lg · remove box size-icon-lg
border-width-default                      

tag / status, sm: same height, padding and gap; radius-full; no border
```

| Part | Property | `sm` | `md` |
|---|---|---|---|
| `container` | block-size | `size-control-height-sm` | `size-control-height-md` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` |
| `container` | padding-inline-start with `leading-avatar` | `spacing-xs` | `spacing-xs` |
| `container` | padding-inline-end with `remove-button` | `spacing-xs` | `spacing-xs` |
| `container` | gap between parts | `spacing-control-gap-sm` | `spacing-control-gap-md` |
| `container` | radius · interactive | `radius-md` | `radius-md` |
| `container` | radius · `tag`, `status` | `radius-full` | `radius-full` |
| `container` | border · interactive | `border-width-default` | `border-width-default` |
| `container` | border · `tag`, `status` | none | none |
| `leading-icon` · `check-icon` · `status-icon` | size | `size-icon-sm` | `size-icon-md` |
| `leading-avatar` | box (inline = block) | `size-icon-lg` (Avatar `xs`, see C2) | `size-control-height-sm` (Avatar `sm`) |
| `remove-button` | box (inline = block) | `size-icon-lg` | `size-control-height-sm` |
| `remove-button` | glyph | `size-icon-sm` | `size-icon-md` |
| `remove-button` | radius | `radius-full` | `radius-full` |
| `remove-button` | pointer target | ≥ `target-min`, extended invisibly around the box; never changes layout | same |
| `label` | text style | `label-md` | `label-lg` |
| chip row (consumer layout) | gap, inline and block | `spacing-sm` | `spacing-sm` |

Layout rules:
- `container`: `display: inline-flex; align-items: center; flex: none; max-inline-size: 100%; min-inline-size: 0; vertical-align: middle; box-sizing: border-box`; the block-size includes the border
- `label`: one line, `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-inline-size: 0`; the chip shrinks only when its parent is narrower than its content
- `leading-avatar` and `remove-button` are inset `spacing-xs` from the border at both sizes, so `spacing-xs` + box + `spacing-xs` = the chip height
- The chip never grows in block-size with content; a filter chip keeps the same inline size order in a row when selected (the check replaces the leading icon; a chip without a leading icon grows by icon + gap)
- Rows of chips are laid out by the consumer (`display: flex; flex-wrap: wrap; gap: spacing-sm`); there is no chip-group component in 1.0

### B3 Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `chip.tokens.json` is not needed.

### 3.1 Interactive — `assist`, `filter` (unselected), `input`

| State | `container` background | `container` border | State layer | `label` | `leading-icon` |
|---|---|---|---|---|---|
| Default | `color-background-transparent` | `color-border-default` | — | `color-text-neutral-default` | `color-icon-neutral-subtle` |
| Hover | same | same | `color-overlay-hover` | same | same |
| Pressed | same | same | `color-overlay-pressed` | same | same |
| Disabled | same | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

`input` chips have no state layer on the container (the container is not interactive); Hover and Pressed apply to the `remove-button` only.

### 3.2 `filter` selected

| State | `container` background | `container` border | State layer | `label` | `check-icon` |
|---|---|---|---|---|---|
| Default | `color-background-brand-subtle` | `color-border-brand` | — | `color-text-role-brand` | `color-icon-role-brand` |
| Hover | same | same | `color-overlay-hover` | same | same |
| Pressed | same | same | `color-overlay-pressed` | same | same |
| Disabled | `color-background-neutral-disabled` | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

### 3.3 `remove-button` and `leading-avatar`

- `remove-button`: the Biowave Icon button `text` · `neutral` tokens (Icon button B3) — icon, state layer, focus ring and disabled — with the B2 box and glyph
- `leading-avatar`: Avatar B3 tokens for its `color` (default `neutral`); unchanged when the chip is disabled

### 3.4 `tag` by `color`

| `color` | `container` background | `label` | `leading-icon` |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` | `color-text-neutral-default` | `color-icon-neutral-default` |
| `brand` | `color-background-brand-subtle` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | `color-text-role-secondary` | `color-icon-role-secondary` |
| `success` | `color-background-success-subtle` | `color-text-role-success` | `color-icon-role-success` |
| `warning` | `color-background-warning-subtle` | `color-text-role-warning` | `color-icon-role-warning` |
| `error` | `color-background-error-subtle` | `color-text-role-error` | `color-icon-role-error` |
| `info` | `color-background-info-subtle` | `color-text-role-info` | `color-icon-role-info` |

### 3.5 `status`

Each of the 7 request states uses one row of 3.4 for its colours plus its own `status-icon` glyph. The state → colour → icon map is added in plan 1.1 (A4.4, C2).

### 3.6 Focus

| Part | Property | Token |
|---|---|---|
| `focus-ring` (`assist`, `filter` container; `remove-button`) | color | `color-border-focus` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` |

The state layer is a second fill painted above the container fill (`background-image: linear-gradient(var(--bw-color-overlay-hover), var(--bw-color-overlay-hover))`), as in Button B3. Every text pair is in the Foundations contrast set (`color-text-role-*` on `color-background-*-subtle`, `color-text-neutral-default` on surfaces).

Dark theme: same tokens (values switch automatically). No exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter (chip or remove button) | state layer | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down | state layer | `motion-duration-sm` | `motion-easing-standard` |
| Unselected ↔ Selected (`filter`) | click / Enter / Space | background, border, label colour; check icon fades in / out in place of the leading icon | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus | focus ring | `motion-duration-instant` | — |
| Enabled ↔ Disabled | prop change | all colours | `motion-duration-instant` | — |

A removed `input` chip leaves without an exit animation in 1.0 (the owner removes it). Reduced motion: durations resolve to instant through Foundations; the check icon swaps without a fade.

### B5 RTL

```
LTR  │ [✓] Remote │   │ (SA) Sara Ali   [×] │   ╭ [◆] Full time ╮
RTL  │ عن بُعد [✓] │   │ [×]   سارة علي (س) │   ╭ دوام كامل [◆] ╮
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (logical properties, provider direction) |
| `leading-icon` · `check-icon` · `status-icon` · `leading-avatar` | Move to inline start; glyphs never mirror (the check mark and status glyphs are not directional) |
| `remove-button` | Moves to inline end; the `close` glyph does not mirror |
| `label` | Follows the document direction; a Latin value inside an Arabic UI is bidi-isolated (`unicode-bidi: isolate`) |

No physical left/right properties are permitted.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `assist`: native `<button type="button">`. `filter`: native `<button type="button" aria-pressed="true|false">`. `input`: `<span>` container with the visible label and a `remove-button` `<button>`. `tag`, `status`: `<span>` text, no role, not focusable |
| Accessible name | From `label` (the visible text). Leading icon, check icon, status icon and avatar are `aria-hidden` (Avatar rendered with `decorative`) |
| Remove button | Biowave `IconButton` (`text`, `neutral`) with `aria-label` = `removeLabel`; `disabled` follows the chip; Backspace and Delete on the focused button call `onRemove` like Enter / Space |
| Disabled | Native `disabled` on the chip button and on the remove button (removed from the tab order) |
| Filter group | The consumer wraps a filter row in `role="group"` with `aria-label` (e.g. “Filters” / “عوامل التصفية”); B7 shows it |
| Focus | 2px `color-border-focus`, `border-focus-offset` on `:focus-visible` of the chip button and the remove button |
| Target size | Chip ≥ `target-min`; remove button pointer target ≥ `target-min` through an invisible `::before`, never changing layout |
| Screen reader output | assist: “Add note, button” · filter: “Remote, toggle button, pressed” · input: “Sara Ali” then “Remove Sara Ali, button” · tag: “Full time” |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to the next / previous `assist` or `filter` chip or remove button; static chips are skipped |
| Enter / Space | `assist`: runs the action · `filter`: toggles · remove button: removes |
| Backspace / Delete | Focused remove button: removes |

## 8. Phase 1 — build the component set (from Part D)

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Chip` › sections `Chip` and `Chip — Documentation` |
| Mode | Create new. Legacy Chips / Labels / Tags pages stay read-only in Foundations until approval |
| Plan version | 1.0 · 2026-10-23 |

### D1 Rules for this build

0. No component tokens for Chip (P-04): bind layers directly to the Foundations semantic variables (contract §3). Never create variables or styles by hand
1. Every fill, stroke, radius, padding, gap, height and icon size is bound to a variable; text uses published text styles; focus uses `Focus/Ring`
2. Never bind primitives or deprecated variables
3. Layer names equal the A2 part names in kebab-case
4. Auto layout on every frame; no absolute positioning except the hidden pointer-target overlay of `remove-button` on doc page 09
5. Icons, the remove Icon button and the Avatar are library or in-file instances, never detached

### D2 Component structure

```
❖ Chip            Variant = Assist · Filter · Input (interactive)
❖ Tag chip        static `tag` variant, one variant per colour
❖ Status chip     static `status` variant — built in plan 1.1 (A4.4)
  └─ ◇ .Chip/Leading    private base: leading-icon · check-icon · leading-avatar slot
```

All three sets are the one code component `Chip`; the split only keeps Figma variant axes valid.

### D3 Layer tree and auto layout

```
Chip                      ↔ horizontal · gap {B2 gap} · pad-inline {B2} · height fixed {B2} · width hug
│                           radius {B2 interactive} · stroke {B3} border-width-default
├── leading-icon          ◇ Icon · size {B2} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Icon`
├── check-icon            ◇ Icon `check` · visible when Selected=True (Filter)
├── leading-avatar        ◇ Avatar · size {B2} · BOOLEAN `Avatar` (Input) · pad-inline-start spacing-xs
├── label                 T label-md / label-lg · TEXT `Label` · width hug · truncate: yes
└── remove-button         ◇ Icon button (text, neutral) · box {B2} · Input only · pad-inline-end spacing-xs

Tag chip                  same tree without check-icon, leading-avatar, remove-button · radius-full · no stroke
```

**Icons used:** `check` (check-icon) · `close` (remove-button) · `add` (default `Icon` swap)

```
┌──────────────────────────┐   ╭──────────────────╮
│  [◆]  Label           [×]│   │ [◆] Label        │
└──────────────────────────┘   ╰──────────────────╯
   ①     ⑤                ⑥      ②   ⑤
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Assist` · `Filter` · `Input` | `Assist` | `variant` | `'assist'` · `'filter'` · `'input'` |
| `Color` (Tag chip) | VARIANT | `Neutral` · `Brand` · `Secondary` · `Success` · `Warning` · `Error` · `Info` | `Neutral` | `color` (with `variant="tag"`) | lower-case value |
| `Size` | VARIANT | `SM` · `MD` | `SM` | `size` | `'sm'` · `'md'` |
| `State` | VARIANT | `Default` · `Hover` · `Pressed` · `Focus` · `Disabled` | `Default` | `disabled` | Disabled maps to the prop; others are interaction states |
| `Selected` | VARIANT | `False` · `True` | `False` | `selected` | Filter only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Provider locale controls code |
| `Label` | TEXT | | `Add note` / `إضافة ملاحظة` | `label` | |
| `Leading icon` | BOOLEAN | | `false` | `icon` | present / absent |
| `Icon` | INSTANCE_SWAP | Material Symbols, Style=Rounded | `add` | `icon` | glyph name |
| `Avatar` | BOOLEAN | | `false` | `avatar` | Input only |

### D5 Variants to generate

- `Chip`: Assist = 2 sizes × 5 states × 2 languages = 20 · Filter = 2 × 5 × 2 selected × 2 = 40 · Input = 2 × 3 states (`Default`, `Focus` on the remove button, `Disabled`) × 2 = 12 → **72 variants**
- `Tag chip`: 7 colours × 2 sizes × 2 languages = **28 variants** (no State axis)
- `Status chip`: not built in 1.0 (A4.4)
- Grid: rows = Variant × Size, columns = State × Selected; gap `spacing-xl`

### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · B4 |
| While pressing | Hover → Pressed | Smart animate · B4 |
| On click (Filter) | Selected False ↔ True | Smart animate · B4 |

Focus and Disabled have no prototype interaction.

### D7 RTL

Method: `Language=AR` variants. Reverse auto-layout order, use Arabic sample copy from A6, keep `check`, `close` and status glyphs unmirrored.

```
EN  │ (SA) Sara Ali   [×] │
AR  │ [×]   سارة علي (س) │
```

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

Build the standard pages from the Doc Kit in section `Chip — Documentation`, frames `Chip / 00 Component sheet` through `Chip / 11 Changelog` (skip page 10 for version 1.0). If the Doc Kit is unavailable, finish D2–D7 and report Phase 2 as blocked.

Page notes:
- 00 shows the `Chip` and `Tag chip` sets
- 03 shows each variant, both sizes, tag colours, leading icon and avatar
- 04 shows the interactive state sequence plus filter selection
- 05 shows a filter row in a table header and input chips under a field
- 09 shows the remove button name, the filter group label and the `target-min` overlay

Component description: “Holds one short action, filter, entered value, tag or request status. Spec: 3-web-components/components/chip/chip.md”.

### Doc Kit components (keys)

| Component | Key | Kind |
|---|---|---|
| `Doc/Logo` | `b0506262908cc9602fb86d1d2f2d1574b8797fb1` | COMPONENT |
| `Doc/Version chip` | `20beed5d39281d472c391a3a23650a34058cff6a` | COMPONENT |
| `Doc/Divider` | `719437f0bf3e0276b697f22b886be069e1e428aa` | COMPONENT_SET |
| `Doc/Section` | `f29dffabb982e9374b1b804639f45514a29146a2` | COMPONENT |
| `Doc/Code block` | `9bcc61d27ad9bf6c4d4a9e5a6e3e6ebd37af5028` | COMPONENT |
| `Doc/Property chip` | `8990d04a48fb07d7f8f1056307d1faf3dc0ded65` | COMPONENT |
| `Doc/Header` | `dd9347ba546590b632ae68976fe2733f3f7d340e` | COMPONENT |
| `Doc/Axis label` | `24a64b9f56bb95bffc1b5f1ce61e58205b3023fb` | COMPONENT_SET |
| `Doc/Bracket` | `b10364d75b1d8c84e235d63773c0c7870898354a` | COMPONENT_SET |
| `Doc/Callout` | `24c24d19f00001b99acb880c3101afb1842a64f6` | COMPONENT_SET |
| `Doc/Panel` | `b8b20494dcf5f71d3492d90a96498d510d490132` | COMPONENT_SET |
| `Doc/Tile` | `eb3bac08d98c62634cbbc8a6a0129a5fa1783836` | COMPONENT |
| `Doc/Change note` | `5cc8476dd2952640e8138cf21feeb637cfcfe73a` | COMPONENT |
| `Doc/Deprecated overlay` | `d75a185f612de5fa7daadaff9083edff16c42fc4` | COMPONENT |
| `Doc/Table cell` | `4b48bcab4faac402c079e941b30f8987159bfa3f` | COMPONENT_SET |
| `Doc/Table row` | `fb2c9fdd139f3be6860495d1d95a911275ed8224` | COMPONENT_SET |
| `Doc/Table` | `40980251551a20a72810037dc043c66e9271600b` | COMPONENT |
| `Doc/Timeline` | `81d060910749d01da7648f5ae3877e283d668377` | COMPONENT_SET |
| `Doc/Motion row` | `2072d9e2a11281879696f1f8c6ee6ef917b029ac` | COMPONENT |
| `Doc/Uses` | `25ed1809ed37c229827ee8019ec52fe129ec0d31` | COMPONENT |
| `Doc/Do` | `45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1` | COMPONENT |
| `Doc/Dont` | `b6271df857b44407da2657601b4e388bf843b7e8` | COMPONENT |
| `Doc/Skeleton` | `cdb8f9c05ff039be8fda885a25e3ade2986da93b` | COMPONENT_SET |
| `Doc/Device frame` | `c7c9ec2e833fad1b54333707c2210744515d5339` | COMPONENT_SET |
| `Doc/Home header` | `e9c1ee6681300d4c2a04e8f563c308642a3db3df` | COMPONENT |
| `Doc/Title bar` | `2c79bbf4615cf2c6fc8ef6a14390a32d2832d48d` | COMPONENT |
| `Doc/Home card` | `bdd6e95450e128f7b3d3d5fa86b655a6986d2cfa` | COMPONENT |
| `Doc/Footer` | `dd342bd1d199a8c5f353c58125681fad6b6c09f2` | COMPONENT |

### Components List card

On page `Components List` of this file, add (or refresh) one `Doc/Home card`: preview = live instance of the default variant on the dot-grid tile, title = component name, link "View Component ↗" to the `↳` page of this component. Cards stay in alphabetical order.

### Page layouts (from the Doc Kit spec)

The 12 documentation pages every component gets (Part D8 lists them with their sources; this section is their one layout home).

Every page starts with the same header (`Doc/Header`):

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Documentation                 {Platform} · v{version}  │
│                                                                            │
│ {Page title}                                                               │
│ {Page subtitle — one line}                                                 │
│ ────────────────────────────────────────────────────────────────────────── │
```

#### 00 Component sheet
The full variant matrix with axis labels. Columns = interaction states, rows grouped by the other axes. Built from the component set itself.

```
{Name}  (v1.0)
{one-line description}
──────────────────────────────────────────────────────────────────────────
                    State: Default   State: Hover   State: Pressed   State: Disabled
                   ┌──────────────┬──────────────┬───────────────┬────────────────┐
Size: MD │ Primary │ ▢ instance   │ ▢ instance   │ ▢ instance    │ ▢ instance     │
         │ Second. │ ▢            │ ▢            │ ▢             │ ▢              │
Size: SM │ Primary │ ▢            │ ▢            │ ▢             │ ▢              │
                   └──────────────┴──────────────┴───────────────┴────────────────┘
```
`Doc/Axis label` for every row and column (`property` small, `Value` bold). Invalid combinations are not shown.

#### 01 Introduction
Description paragraph, then the anatomy diagram twice: Light panel, then Dark panel (same instance, variable mode switched on the panel).

```
{Description from A1}

┌─ Doc/Panel (Light) ──────────────────────────────────────────────┐
│              title      counter                 trailing-item    │
│                 │          │                          │          │
│ leading-icon ─● ┌──────────────────────────────────────────────┐ │
│                 │ [◆] Title text (12)                     [⤓]  │ │
│ subtitle ─────● │     Subtitle text                            │ │
│                 │ ░░░░░░░░░░░░░░░░ slot ░░░░░░░░░░░░░░░░░░░░░░ │ ├─ slot
│                 └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
┌─ Doc/Panel (Dark) ── same diagram ───────────────────────────────┐
```
Callout labels = anatomy part names, exactly (`Doc/Callout`).

#### 02 Props and tokens
One `Doc/Table` per public sub-component (columns: Prop name · Description · Type · Prop values · Default; required props marked `*`). Then a reference instance and the token table.

```
Props [{Name}]                     Props [{Name}Header]
┌──────────┬─────────────┬──────┬──────────────┬─────────┐
│ Prop name│ Description │ Type │ Prop values  │ Default │
├──────────┼─────────────┼──────┼──────────────┼─────────┤
│ size *   │ …           │ enum │ • sm • md    │ md      │
└──────────┴─────────────┴──────┴──────────────┴─────────┘

Tokens            ┌ reference instance ┐
┌───────────────────┬─────────┬──────────────────────────────────────┐
│ Part · property   │ State   │ Token                                │
├───────────────────┼─────────┼──────────────────────────────────────┤
│ container · bg    │ Default │ color-background-neutral-default     │
└───────────────────┴─────────┴──────────────────────────────────────┘
```

#### 03 Variations
One block per property, in D4 order. Each value = one `Doc/Tile` with a live instance and caption `property = Value`. Other properties stay at default.

```
{property}
{one-line description from A4}
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   ▢ instance     │ │   ▢ instance     │ │   ▢ instance     │
│                  │ │                  │ │                  │
│ size = SM        │ │ size = MD        │ │ size = LG        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
────────────────────────────────────────────────────────────── (Doc/Divider)
```

#### 04 States and motion
One `Doc/Motion row` per transition in B4.

```
States           Animation          Trigger    Timeline (ms)                    Transition properties
──────────────── ────────────────── ────────── ──────────────────────────────── ──────────────────────────────
Initial state    ┌──────────────┐               0  70  150  200  300  400  600  ┌────────────────────────────┐
 ▢ Default       │ prototype    │   Hover       ├──────┤                        │ duration: motion-duration-sm│
Final state      │ preview      │               └ 150 ┘                         │ easing:   motion-easing-std │
 ▢ Hover         └──────────────┘                                               └────────────────────────────┘
                                                                                [Background  ■ ▸ ■]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Timeline bar length = the duration token's value. Property chip shows the from → to token swatches. Add a reduced-motion note at the end.

#### 05 Usage guidelines
"When to use" as a `Doc/Uses` card, then rule groups, each with a `Doc/Do` + `Doc/Dont` pair holding live, realistic compositions.

```
{Rule group title}
• {rule}
┌─ ✓ Do ──────────────────────────┐   ┌─ ✗ Don't ───────────────────────┐
│ • {rule}                        │   │ • {rule}                        │
│ ┌─────────────────────────────┐ │   │ ┌─────────────────────────────┐ │
│ │ realistic example (instance)│ │   │ │ wrong example (instance)    │ │
│ └─────────────────────────────┘ │   │ └─────────────────────────────┘ │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

#### 06 Content guidelines
Same layout as 05, with copy rules from A6. Show EN and AR examples side by side in the Do card.

#### 07 Platform
One `Doc/Uses` card per layout context of this platform, each with a `Doc/Device frame` containing skeleton page content (`Doc/Skeleton`) and the component in place. Web: Desktop + narrow web. Tablet: Landscape + Portrait. Mobile: Phone. End with the platform differences table from A8.

```
Desktop
These are used on web apps / dashboards.
┌─ ★ Uses ───────────────────────────────────────────┐
│ {rule}                                             │
│ ┌─ Doc/Device frame ─────────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬                                       │ │
│ │ ▢▢   ┌ component ┐   ▬▬▬▬▬▬▬▬                  │ │
│ │      └───────────┘   ▬▬▬▬▬▬                    │ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

#### 08 RTL
LTR and RTL instances side by side for each structurally different variant, with `Doc/Callout` on every mirrored and non-mirrored part (B5). Arabic sample copy.

```
LTR (en)                              RTL (ar)
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [◆] Title text          [▸]  │      │  [◂]          عنوان البطاقة [◆] │
└──────────────────────────────┘      └──────────────────────────────┘
  ◆ not mirrored · ▸ mirrored
```

#### 09 Accessibility
`Doc/Section` blocks: Use case · Keyboard (table from B6) · Screen reader output · Focus (instance in Focus state with ring callout) · Target size (overlay showing `target-min`) · Colors (contrast pairs).

#### 10 Changes from previous version
Only when the version is > 1.0. New (live instance, with `Doc/Change note` callouts) next to Previous (old instance or image, hatched with `Doc/Deprecated overlay`). Notes use strike-through for the old value and bold for the new one, e.g. ~~`spacing-lg` fixed~~ → **`spacing-md` variable**.

```
New                                          Previous
┌──────────────────────────┐ ◂ change note   ┌──────────────────────────┐
│ ▢ current instance       │                 │ ╱╱╱ old version ╱╱╱╱╱╱╱  │
└──────────────────────────┘                 └──────────────────────────┘
```

#### 11 Changelog
`Doc/Table` from the changelogs (Version · Date · Change · Breaking · Migration).

Component description field (Figma "Description"): one line from A1 + link to the spec.

## 10. Code Connect

- File: `3-web-components/src/components/chip/Chip.figma.tsx`
- Mapping: D4 table (`Tag chip` maps to `variant="tag"`). Publish after code and Figma are both `Approved`

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 `Chip` and `Tag chip` sets plus `.Chip/Leading` match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant counts are 72 and 28; no invalid combinations
- [ ] F-AC-4 Zero raw values: every fill, stroke, radius, spacing, size, text and effect bound (QA lint report attached)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 RTL variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Interactions per D6; component description filled
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, built only from Doc Kit components with live instances

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](chip.md#d11-execution-log-filled-by-the-figma-agent) in `chip.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `chip.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
