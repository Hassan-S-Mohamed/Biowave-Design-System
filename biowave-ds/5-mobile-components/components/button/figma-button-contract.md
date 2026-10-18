<!-- GENERATED from button.md @ a3889d4c386b1fef — do not edit; change the source and run: npm run contract -- mobile button -->
# Button · زر — Mobile — Figma contract

> **Everything the Figma Agent needs to build Button in the Mobile Components file, with our variables and styles.** Read this file only. Generated from [`button.md`](button.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](button.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` · https://www.figma.com/design/249tIAxlZogRvgBBXjcIZ5 |
| Page | `↳ Button` (one page per component) |
| Component | Button · زر |
| Platform | Mobile · Flutter + Material 3 |
| Version | 1.0 · 2026-10-16 |
| Source | [`button.md`](button.md) @ `a3889d4c386b1fef` |

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

Already in this file, created by the sync tooling from [`button.tokens.json`](button.tokens.json). **Bind component layers to these variables** and pick the option with the collection's explicit variable mode. Each value aliases the Foundations variable shown (key in §3).

| Collection | Modes | Variable | Alias target per mode |
|---|---|---|---|
| Button / Size | sm · md · lg · xl | `height` | sm → 4. Size › `size/control/height/sm`<br>md → 4. Size › `size/control/height/md`<br>lg → 4. Size › `size/control/height/lg`<br>xl → 4. Size › `size/control/height/xl` |
| Button / Size | sm · md · lg · xl | `padding-inline` | sm → 3. Spacing › `spacing/control/padding-inline/sm`<br>md → 3. Spacing › `spacing/control/padding-inline/md`<br>lg → 3. Spacing › `spacing/control/padding-inline/lg`<br>xl → 3. Spacing › `spacing/control/padding-inline/xl` |
| Button / Size | sm · md · lg · xl | `gap` | sm → 3. Spacing › `spacing/control/gap/sm`<br>md → 3. Spacing › `spacing/control/gap/md`<br>lg → 3. Spacing › `spacing/control/gap/lg`<br>xl → 3. Spacing › `spacing/control/gap/xl` |
| Button / Size | sm · md · lg · xl | `icon` | sm → 4. Size › `size/icon/sm`<br>md → 4. Size › `size/icon/md`<br>lg → 4. Size › `size/icon/lg`<br>xl → 4. Size › `size/icon/lg` |
| Button / Size | sm · md · lg · xl | `radius` | sm → 2. Radius › `radius/md`<br>md → 2. Radius › `radius/md`<br>lg → 2. Radius › `radius/md`<br>xl → 2. Radius › `radius/xl` |
| Button / Size | sm · md · lg · xl | `border-width` | sm → 9. Border › `border/width/default`<br>md → 9. Border › `border/width/default`<br>lg → 9. Border › `border/width/default`<br>xl → 9. Border › `border/width/default` |
| Button / Filled | brand · secondary · error · neutral · inverse | `container/default` | brand → 1. Themes › `color/background/brand/default`<br>secondary → 1. Themes › `color/background/secondary/default`<br>error → 1. Themes › `color/background/error/default`<br>neutral → 1. Themes › `color/background/neutral/default`<br>inverse → 1. Themes › `color/background/inverse/default` |
| Button / Filled | brand · secondary · error · neutral · inverse | `container/hover` | brand → 1. Themes › `color/background/brand/hover`<br>secondary → 1. Themes › `color/background/secondary/hover`<br>error → 1. Themes › `color/background/error/hover`<br>neutral → 1. Themes › `color/background/neutral/hover`<br>inverse → 1. Themes › `color/background/inverse/hover` |
| Button / Filled | brand · secondary · error · neutral · inverse | `container/pressed` | brand → 1. Themes › `color/background/brand/pressed`<br>secondary → 1. Themes › `color/background/secondary/pressed`<br>error → 1. Themes › `color/background/error/pressed`<br>neutral → 1. Themes › `color/background/neutral/pressed`<br>inverse → 1. Themes › `color/background/inverse/pressed` |
| Button / Filled | brand · secondary · error · neutral · inverse | `container/disabled` | brand → 1. Themes › `color/background/neutral/disabled`<br>secondary → 1. Themes › `color/background/neutral/disabled`<br>error → 1. Themes › `color/background/neutral/disabled`<br>neutral → 1. Themes › `color/background/neutral/disabled`<br>inverse → 1. Themes › `color/background/neutral/disabled` |
| Button / Filled | brand · secondary · error · neutral · inverse | `label/default` | brand → 1. Themes › `color/text/on/brand`<br>secondary → 1. Themes › `color/text/on/secondary`<br>error → 1. Themes › `color/text/on/error`<br>neutral → 1. Themes › `color/text/neutral/default`<br>inverse → 1. Themes › `color/text/role/brand` |
| Button / Filled | brand · secondary · error · neutral · inverse | `label/disabled` | brand → 1. Themes › `color/text/neutral/disabled`<br>secondary → 1. Themes › `color/text/neutral/disabled`<br>error → 1. Themes › `color/text/neutral/disabled`<br>neutral → 1. Themes › `color/text/neutral/disabled`<br>inverse → 1. Themes › `color/text/neutral/disabled` |
| Button / Filled | brand · secondary · error · neutral · inverse | `icon/default` | brand → 1. Themes › `color/icon/on/brand`<br>secondary → 1. Themes › `color/icon/on/secondary`<br>error → 1. Themes › `color/icon/on/error`<br>neutral → 1. Themes › `color/icon/neutral/default`<br>inverse → 1. Themes › `color/icon/role/brand` |
| Button / Filled | brand · secondary · error · neutral · inverse | `icon/disabled` | brand → 1. Themes › `color/icon/neutral/disabled`<br>secondary → 1. Themes › `color/icon/neutral/disabled`<br>error → 1. Themes › `color/icon/neutral/disabled`<br>neutral → 1. Themes › `color/icon/neutral/disabled`<br>inverse → 1. Themes › `color/icon/neutral/disabled` |
| Button / Tonal | brand · secondary · error | `container/default` | brand → 1. Themes › `color/background/brand/subtle`<br>secondary → 1. Themes › `color/background/secondary/subtle`<br>error → 1. Themes › `color/background/error/subtle` |
| Button / Tonal | brand · secondary · error | `container/disabled` | brand → 1. Themes › `color/background/neutral/disabled`<br>secondary → 1. Themes › `color/background/neutral/disabled`<br>error → 1. Themes › `color/background/neutral/disabled` |
| Button / Tonal | brand · secondary · error | `state-layer/hover` | brand → 1. Themes › `color/overlay/hover`<br>secondary → 1. Themes › `color/overlay/hover`<br>error → 1. Themes › `color/overlay/hover` |
| Button / Tonal | brand · secondary · error | `state-layer/pressed` | brand → 1. Themes › `color/overlay/pressed`<br>secondary → 1. Themes › `color/overlay/pressed`<br>error → 1. Themes › `color/overlay/pressed` |
| Button / Tonal | brand · secondary · error | `label/default` | brand → 1. Themes › `color/text/role/brand`<br>secondary → 1. Themes › `color/text/role/secondary`<br>error → 1. Themes › `color/text/role/error` |
| Button / Tonal | brand · secondary · error | `label/disabled` | brand → 1. Themes › `color/text/neutral/disabled`<br>secondary → 1. Themes › `color/text/neutral/disabled`<br>error → 1. Themes › `color/text/neutral/disabled` |
| Button / Tonal | brand · secondary · error | `icon/default` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>error → 1. Themes › `color/icon/role/error` |
| Button / Tonal | brand · secondary · error | `icon/disabled` | brand → 1. Themes › `color/icon/neutral/disabled`<br>secondary → 1. Themes › `color/icon/neutral/disabled`<br>error → 1. Themes › `color/icon/neutral/disabled` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `container/default` | brand → 1. Themes › `color/background/transparent`<br>secondary → 1. Themes › `color/background/transparent`<br>error → 1. Themes › `color/background/transparent`<br>neutral → 1. Themes › `color/background/transparent`<br>inverse → 1. Themes › `color/background/transparent` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `container/disabled` | brand → 1. Themes › `color/background/transparent`<br>secondary → 1. Themes › `color/background/transparent`<br>error → 1. Themes › `color/background/transparent`<br>neutral → 1. Themes › `color/background/transparent`<br>inverse → 1. Themes › `color/background/transparent` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `border/default` | brand → 1. Themes › `color/border/brand`<br>secondary → 1. Themes › `color/border/secondary`<br>error → 1. Themes › `color/border/error`<br>neutral → 1. Themes › `color/border/strong`<br>inverse → 1. Themes › `color/border/inverse` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `border/disabled` | brand → 1. Themes › `color/border/disabled`<br>secondary → 1. Themes › `color/border/disabled`<br>error → 1. Themes › `color/border/disabled`<br>neutral → 1. Themes › `color/border/disabled`<br>inverse → 1. Themes › `color/border/disabled` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `state-layer/hover` | brand → 1. Themes › `color/overlay/hover`<br>secondary → 1. Themes › `color/overlay/hover`<br>error → 1. Themes › `color/overlay/hover`<br>neutral → 1. Themes › `color/overlay/hover`<br>inverse → 1. Themes › `color/overlay/hover` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `state-layer/pressed` | brand → 1. Themes › `color/overlay/pressed`<br>secondary → 1. Themes › `color/overlay/pressed`<br>error → 1. Themes › `color/overlay/pressed`<br>neutral → 1. Themes › `color/overlay/pressed`<br>inverse → 1. Themes › `color/overlay/pressed` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `label/default` | brand → 1. Themes › `color/text/role/brand`<br>secondary → 1. Themes › `color/text/role/secondary`<br>error → 1. Themes › `color/text/role/error`<br>neutral → 1. Themes › `color/text/neutral/default`<br>inverse → 1. Themes › `color/text/on/brand` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `label/disabled` | brand → 1. Themes › `color/text/neutral/disabled`<br>secondary → 1. Themes › `color/text/neutral/disabled`<br>error → 1. Themes › `color/text/neutral/disabled`<br>neutral → 1. Themes › `color/text/neutral/disabled`<br>inverse → 1. Themes › `color/text/neutral/disabled` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `icon/default` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>error → 1. Themes › `color/icon/role/error`<br>neutral → 1. Themes › `color/icon/neutral/default`<br>inverse → 1. Themes › `color/icon/on/brand` |
| Button / Outlined | brand · secondary · error · neutral · inverse | `icon/disabled` | brand → 1. Themes › `color/icon/neutral/disabled`<br>secondary → 1. Themes › `color/icon/neutral/disabled`<br>error → 1. Themes › `color/icon/neutral/disabled`<br>neutral → 1. Themes › `color/icon/neutral/disabled`<br>inverse → 1. Themes › `color/icon/neutral/disabled` |
| Button / Text | brand · secondary · error · neutral · inverse | `container/default` | brand → 1. Themes › `color/background/transparent`<br>secondary → 1. Themes › `color/background/transparent`<br>error → 1. Themes › `color/background/transparent`<br>neutral → 1. Themes › `color/background/transparent`<br>inverse → 1. Themes › `color/background/transparent` |
| Button / Text | brand · secondary · error · neutral · inverse | `container/disabled` | brand → 1. Themes › `color/background/transparent`<br>secondary → 1. Themes › `color/background/transparent`<br>error → 1. Themes › `color/background/transparent`<br>neutral → 1. Themes › `color/background/transparent`<br>inverse → 1. Themes › `color/background/transparent` |
| Button / Text | brand · secondary · error · neutral · inverse | `state-layer/hover` | brand → 1. Themes › `color/overlay/hover`<br>secondary → 1. Themes › `color/overlay/hover`<br>error → 1. Themes › `color/overlay/hover`<br>neutral → 1. Themes › `color/overlay/hover`<br>inverse → 1. Themes › `color/overlay/hover` |
| Button / Text | brand · secondary · error · neutral · inverse | `state-layer/pressed` | brand → 1. Themes › `color/overlay/pressed`<br>secondary → 1. Themes › `color/overlay/pressed`<br>error → 1. Themes › `color/overlay/pressed`<br>neutral → 1. Themes › `color/overlay/pressed`<br>inverse → 1. Themes › `color/overlay/pressed` |
| Button / Text | brand · secondary · error · neutral · inverse | `label/default` | brand → 1. Themes › `color/text/role/brand`<br>secondary → 1. Themes › `color/text/role/secondary`<br>error → 1. Themes › `color/text/role/error`<br>neutral → 1. Themes › `color/text/neutral/default`<br>inverse → 1. Themes › `color/text/on/brand` |
| Button / Text | brand · secondary · error · neutral · inverse | `label/disabled` | brand → 1. Themes › `color/text/neutral/disabled`<br>secondary → 1. Themes › `color/text/neutral/disabled`<br>error → 1. Themes › `color/text/neutral/disabled`<br>neutral → 1. Themes › `color/text/neutral/disabled`<br>inverse → 1. Themes › `color/text/neutral/disabled` |
| Button / Text | brand · secondary · error · neutral · inverse | `icon/default` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>error → 1. Themes › `color/icon/role/error`<br>neutral → 1. Themes › `color/icon/neutral/default`<br>inverse → 1. Themes › `color/icon/on/brand` |
| Button / Text | brand · secondary · error · neutral · inverse | `icon/disabled` | brand → 1. Themes › `color/icon/neutral/disabled`<br>secondary → 1. Themes › `color/icon/neutral/disabled`<br>error → 1. Themes › `color/icon/neutral/disabled`<br>neutral → 1. Themes › `color/icon/neutral/disabled`<br>inverse → 1. Themes › `color/icon/neutral/disabled` |
| Button / Focus | default · inverse | `color` | default → 1. Themes › `color/border/focus`<br>inverse → 1. Themes › `color/border/inverse` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-focus-offset` | 9. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec, component token |
| `border-width-focus` | 9. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `color-background-brand-default` | 1. Themes › `color/background/brand/default` | `bdd7bfecb9dd5c41ac657e880d4d2efe36909e3f` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-brand-hover` | 1. Themes › `color/background/brand/hover` | `8c4a115738de9afc5cc82e97aa2aa38763e937ed` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-brand-pressed` | 1. Themes › `color/background/brand/pressed` | `53e9e1b8df7612fbd2878471501d6b72fd3b12be` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-brand-subtle` | 1. Themes › `color/background/brand/subtle` | `7e262abe296024e9b4a29951d5e061fee8f3f2d7` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-error-default` | 1. Themes › `color/background/error/default` | `00642d9524f1bc7c3550f2b6fc75ef70393d6b56` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-error-hover` | 1. Themes › `color/background/error/hover` | `a9474bf6f7facfd420b7b6f89a4d209518283cb1` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-error-pressed` | 1. Themes › `color/background/error/pressed` | `9da0e3351735c92eeb30d34faeb15172b4cd3f4f` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-error-subtle` | 1. Themes › `color/background/error/subtle` | `b408c27a651904c0bc3c5396b3e88319c4d4d6fe` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-inverse-default` | 1. Themes › `color/background/inverse/default` | `0d78c3b8e082ed200902a7d8eb44436e029d1a2c` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-inverse-hover` | 1. Themes › `color/background/inverse/hover` | `c3928b097c6b2381ead0dfedbfaddbacc60a0cc5` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-inverse-pressed` | 1. Themes › `color/background/inverse/pressed` | `184847e844ab1e2f7ad6bcc2a115d5d3273bfcdc` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-neutral-disabled` | 1. Themes › `color/background/neutral/disabled` | `9972624254ddd391df63a7787d0281e703f584f2` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-neutral-hover` | 1. Themes › `color/background/neutral/hover` | `16f86a509cd2b260b41d6e424507e4afa9c2f129` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-neutral-pressed` | 1. Themes › `color/background/neutral/pressed` | `e61d69e8213fa938060cb965e6fe464fa4714187` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-secondary-default` | 1. Themes › `color/background/secondary/default` | `5fb5cedefb9062e4290089bb76e4929a21e5e739` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-secondary-hover` | 1. Themes › `color/background/secondary/hover` | `256a0e41b7ec7991e641cbd4ef86783030e7d890` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-secondary-pressed` | 1. Themes › `color/background/secondary/pressed` | `dfb8d5000f8aa653576e83dc0e7d59e49623b720` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-secondary-subtle` | 1. Themes › `color/background/secondary/subtle` | `6cfea2f9951f4815d9385c0029ee3dd3cc4eba6a` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-transparent` | 1. Themes › `color/background/transparent` | `7ded3d8bfead13a83fc2297ef9dc75a16f73857b` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-border-brand` | 1. Themes › `color/border/brand` | `50ddd3d7028ede7c14f73576869a28588b0c3b7d` | COLOR | STROKE_COLOR | component token |
| `color-border-disabled` | 1. Themes › `color/border/disabled` | `a6d557c3fa0bcb0e2e6b6592234d737ef80936bf` | COLOR | STROKE_COLOR | component token |
| `color-border-error` | 1. Themes › `color/border/error` | `28b0f15306faf6c8113f5acdf14ed8fc66e02c57` | COLOR | STROKE_COLOR | component token |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-inverse` | 1. Themes › `color/border/inverse` | `0e53944b3de77eca83b17b27c3e5d0b4fca582d8` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-secondary` | 1. Themes › `color/border/secondary` | `7466169e60102e31827f59ddfe6eb94a9bbee577` | COLOR | STROKE_COLOR | component token |
| `color-border-strong` | 1. Themes › `color/border/strong` | `a12934eff6a447ebe30a4507b223c76e583e2701` | COLOR | STROKE_COLOR | component token |
| `color-icon-neutral-default` | 1. Themes › `color/icon/neutral/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-neutral-disabled` | 1. Themes › `color/icon/neutral/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-on-brand` | 1. Themes › `color/icon/on/brand` | `7adf0bdf71942294bcca707ea3b88ab778741004` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-on-error` | 1. Themes › `color/icon/on/error` | `8617148ccaaa218b21876f31d38c2a6b8a4357e4` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-on-secondary` | 1. Themes › `color/icon/on/secondary` | `c9e557cbf045baf1678551c328e726930b0ce16d` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-secondary` | 1. Themes › `color/icon/role/secondary` | `b3c3c18415370f381760224fd00a40f2816ffdb6` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-overlay-hover` | 1. Themes › `color/overlay/hover` | `aa2655bb098fde1c03c1b3c143cb22c435402789` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-overlay-pressed` | 1. Themes › `color/overlay/pressed` | `8910a028526424e788cdae6f511506ebb855ab37` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-text-neutral-default` | 1. Themes › `color/text/neutral/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | component token |
| `color-text-neutral-disabled` | 1. Themes › `color/text/neutral/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | component token |
| `color-text-on-brand` | 1. Themes › `color/text/on/brand` | `993ca33a3563483742db3f20ac2db1d094fa2106` | COLOR | TEXT_FILL | component token |
| `color-text-on-error` | 1. Themes › `color/text/on/error` | `2a712a2cc3a4ba1f5c6ec54f1fccb0a42d8da539` | COLOR | TEXT_FILL | component token |
| `color-text-on-secondary` | 1. Themes › `color/text/on/secondary` | `c94b4241b9f81084e2ef11af7d3724b092d9da57` | COLOR | TEXT_FILL | component token |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | component token |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | component token |
| `color-text-role-secondary` | 1. Themes › `color/text/role/secondary` | `39d1b107af72de6e3b48156a5c5f3e7cb170b7de` | COLOR | TEXT_FILL | component token |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec, component token |
| `radius-xl` | 2. Radius › `radius/xl` | `a5042304656c42bab9b62a4f4ab9c6b1831b487c` | FLOAT | CORNER_RADIUS | spec, component token |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-xl` | 4. Size › `size/control/height/xl` | `2d65685001b2cf5f0f050eddba6e298b104c97c4` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `spacing-control-gap-lg` | 3. Spacing › `spacing/control/gap/lg` | `c9e0925c6738c94acdf8f5220207a44c304e25f0` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-gap-sm` | 3. Spacing › `spacing/control/gap/sm` | `97daa7ac19168846d702cc8c210d1e162a484b41` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-gap-xl` | 3. Spacing › `spacing/control/gap/xl` | `f10a55c1c4949aa91cde0b85991775431452c6da` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-control-padding-inline-lg` | 3. Spacing › `spacing/control/padding-inline/lg` | `3dddd3d0ffa2e8c03e2ee62241d0b414f9c3f5b5` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-control-padding-inline-sm` | 3. Spacing › `spacing/control/padding-inline/sm` | `fb323143873973f1548553562791a9983936aa5a` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-padding-inline-xl` | 3. Spacing › `spacing/control/padding-inline/xl` | `ed8f5014d16f8f8fc9a858fdcfed85c7ef2ecd2f` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-sm` · `motion-duration-xs`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `Web/en/action/sm` | `db13893c893d1f873aeec7bbd5d890d77d5a3ab3` |
| `Web/en/action/md` | `6dec13ffdefd6ebe1bcad745d715cf13b7a2a66a` |
| `Web/en/action/lg` | `0566d1dce9a436d6464c879125e0797cef4f8750` |
| `Web/ar/action/sm` | `f97df07b5974ac1d2fdd64d6a320a30c88c4bd3f` |
| `Web/ar/action/md` | `ef1c490f6c608d2036d1ffcb2d171f21646cdb0d` |
| `Web/ar/action/lg` | `8da07033b0da14a69851c6e2b828050d160c1d2b` |

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Focus/Ring` | `a52fabd21a5e545bc7bef092fbf39ebfe0e9bd43` |
| `Focus/Ring Inverse` | `226003580f6aa5c70ac56921a7ac0a2b6a9d8f85` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

## 7. Phase 1 — values (from Part B)

### B1 API

### BwButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | — | ✓ | `label`. Plain text |
| `onPressed` | `VoidCallback?` | | — | ✓ | `null` = disabled (Flutter convention). Not called while `loading` |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` · `text` | `filled` | | Emphasis — A4.1 |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` · `error` · `inverse` | `brand` | | A4.2 |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.3 |
| `leadingIcon` | `IconData?` | Material Symbols Rounded | `null` | | `leading-icon` |
| `trailingIcon` | `IconData?` | | `null` | | `trailing-icon` |
| `fullWidth` | `bool` | | `false` | | A4.5 |
| `loading` | `bool` | | `false` | | Shows `spinner`, ignores presses, keeps focus |
| `loadingLabel` | `String?` | | localized "Loading" / "جارٍ التحميل" | | Announced when loading starts, e.g. "Saving…" |
| `focusNode` · `autofocus` | | | | | Passed to the M3 button |

`BwControlSize` is shared by every control (Text field, Select, … later) and lives in `lib/src/common/bw_control_size.dart`. Platform naming: Flutter `leadingIcon` = web `startIcon`; `onPressed` = `onClick`; `onPressed: null` = web `disabled`.

**Invalid combinations** (`assert` in debug; fallback in release):
| Combination | Fallback |
|---|---|
| `variant: tonal` with `color: neutral` or `inverse` | `outlined` |
| `leadingIcon` and `trailingIcon` both set | `leadingIcon` only |
| `label` empty | assert "BwButton needs a label — use BwIconButton" |

### B2 Dimensions

```
   BwSpacing.controlPaddingInlineLg                 BwSpacing.controlPaddingInlineLg
     ├────────┤ BwSpacing.controlGapLg                        ├────────┤
   ┬ ┌────────────────────────────────────────────────────────────┐
   │ │        [◆]  ├─┤  Clock in                                 │  radius-md
   │ └────────────────────────────────────────────────────────────┘
   ┴ size-control-height-lg        (hit area ≥ BwLayout.mobile.minTarget)
```

| Part | Property | sm | md | lg | xl |
|---|---|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` | `size-control-height-xl` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `…-md` | `…-lg` | `…-xl` |
| `container` | gap | `spacing-control-gap-sm` | `…-md` | `…-lg` | `…-xl` |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` | `radius-xl` |
| `container` | border width (outlined) | `border-width-default` | same | same | same |
| `leading-icon`, `trailing-icon`, `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` | `size-icon-lg` |
| `label` | text style | `action-sm` | `action-md` | `action-lg` | `action-lg` |
| hit area | min size | `target-min` (`BwLayout.mobile.minTarget`) | same | same (= height) | height |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | same | same | same |

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-gap-lg` → `BwSpacing.controlGapLg` · `radius-md` → `BwRadius.md` · `action-lg` → `context.bw.text.actionLg` · colors → `context.bw.colors.<camelCase>` (e.g. `backgroundBrandDefault`).

Layout rules: width hugs content (`MainAxisSize.min`); `fullWidth` → `minimumSize` width `double.infinity` in the parent constraints. Height fixed by the size token (`fixedSize` height, `minimumSize` height). Outlined border drawn inside the height. `label` one line, `TextOverflow.ellipsis`, `softWrap: false`. Loading keeps the content's size (`Visibility(maintainSize: true, …)`) with the spinner centered on top. `MaterialTapTargetSize.padded` keeps the 48dp hit area for `sm`/`md`. Elevation 0 in every state.

### B3 Tokens by part and state

Identical to the [Web B3](../../../3-web-components/components/button/button.md#b3-tokens-by-part-and-state) (same token for every part × state; tokens are platform-agnostic). Flutter mapping:

| Spec part / state | `ButtonStyle` field |
|---|---|
| `container` background (Default · Hover · Pressed · Disabled) | `backgroundColor` `WidgetStateProperty` |
| state layer (tonal · outlined · text) | `overlayColor`: hovered → `overlayHover`, pressed → `overlayPressed`, focused → transparent; filled → always transparent |
| `container` border (outlined) | `side` `WidgetStateProperty` (`BorderSide(width: BwBorder.widthDefault, color: …)`) |
| `label` · `spinner` | `foregroundColor` |
| icons | `iconColor` |
| splash | `splashFactory: NoSplash.splashFactory` |
| elevation, shadow | `elevation: 0`, `shadowColor: transparent` |

Dark theme: same tokens, values switch automatically. No exceptions.

### B4 States and transitions

Same table as [Web B4](../../../3-web-components/components/button/button.md#b4-states-and-transitions). Flutter: `animationDuration: BwDuration.sm`; pressed uses the same duration (M3 buttons animate state colors with one duration); loading cross-fade `AnimatedSwitcher(duration: BwDuration.sm)`; spinner `CircularProgressIndicator` (indeterminate).
Reduced motion: when `context.bw.reduceMotion` is true use `BwDuration.instant`; the spinner keeps rotating.

### B5 RTL

```
LTR  │  [◆]  Add device          │      │  Next  [▸]  │
RTL  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically from `Directionality`; padding is `EdgeInsetsDirectional` |
| directional icons | Mirror automatically when `IconData.matchTextDirection` is true (`Icons.arrow_forward_rounded`, `chevron_right`, `logout`…). Do not wrap in `Transform` |
| non-directional icons, `spinner` | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | M3 button semantics (`button: true`, `enabled`). Icons `excludeFromSemantics` |
| Accessible name | `label` |
| Loading | `Semantics(label: '$label', value: loadingLabel, button: true, enabled: true)`; `SemanticsService.announce(loadingLabel, Directionality.of(context))` once when `loading` turns on; presses ignored, focus kept |
| Disabled | `onPressed: null` → not focusable, `enabled: false` |
| Focus | Keyboard focus only (`FocusManager.instance.highlightMode == traditional`): ring `border-width-focus` in `color-border-focus` (`inverse`: `color-border-inverse`) drawn `border-focus-offset` outside the container, radius = container radius + offset |
| Target size | ≥ `BwLayout.mobile.minTarget` via `MaterialTapTargetSize.padded` |
| Text scale | Label scales with the system text scale; height grows rather than clipping (use `minimumSize`, not a hard max) |
| Screen reader output | "Clock in, button" / "تسجيل الحضور، زر" · loading: "Saving…" announced |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/button/button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Button` › section `Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › LEGACY Mobile › `↳ Buttons`: `Buttons` `4131:1124`, `Default Button/EN` `4858:41924`, `Default Button/AR` `4858:42702`, copies `.Button _en` `4882:46761` / `.Button _ar` `4882:48846` (B-05: all deprecated after this build is `Approved`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Button` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Mobile scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/button/button.md#d2-component-structure), with these Mobile differences:
- `Size` adds `XL` (B2 `xl` row: `size/control/height/xl`, `spacing/control/padding-inline/xl`, `radius/xl`)
- `State` = `Default` · `Focused` · `Pressed` · `Disabled` · `Loading` (no `Hover`)
- Default instance size `LG`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/button/button.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/button/button.md#d4-properties), with the Mobile differences listed in D2.

### D5 Variants to generate

18 allowed `Variant × Color` × 4 sizes (`SM` · `MD` · `LG` · `XL`) × 5 states (no `Hover`) × 2 languages = **720**.

### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Mobile library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### Inherited from Web (D1, D2, D3, D4, D6, D7)

The Mobile Part D refers to these Web sections; they are copied here so you read one file. Apply the Mobile differences above on top.

#### D1 Rules for this build

0. **Library first, component tokens only (D-13).** Text styles, effect styles (`Focus/Ring`, `Focus/Ring Inverse`) and icons come from the published library **Biowave DS — Foundations**. Visual values bind to the **Button component tokens** already in this file (created from [`button.tokens.json`](button.tokens.json) by the sync tooling): `Button / Size` (modes `sm`·`md`·`lg`), `Button / Filled` · `Button / Tonal` · `Button / Outlined` · `Button / Text` (modes = colors), `Button / Focus`. Each variant sets the explicit mode of its collections (e.g. `Variant=Filled, Color=Brand, Size=MD` → `Button / Filled`=`brand`, `Button / Size`=`md`). **Never create variables or styles** in this file; if a value is missing, stop and ask the Planner (it is added to `button.tokens.json` → synced).
1. **Every value is bound.** Fills, strokes, radius, padding, gap, height → variables; text → text styles; focus → effect style. No raw hex / px. Opacity 0 for the hidden label in Loading is the only literal allowed.
2. **Spec token → component token:** B3 table and `button.tokens.json` name the same semantic tokens; bind the component token that aliases it (`container/default`, `label/default`, `state-layer/hover`, `border/default`, `height`, `padding-inline`, `gap`, `icon`, `radius`, `border-width`, `Button / Focus › color`). Semantic variables are never bound directly. For reference, spec names map to Foundations variables as: `-` between segments becomes `/`: `color-background-brand-hover` → `1. Themes › color/background/brand/hover`; `size-control-height-md` → `4. Size › size/control/height/md`; `spacing-control-gap-md` → `3. Spacing › spacing/control/gap/md`; `radius-md` → `2. Radius › radius/md`; `border-width-default` → `9. Border › border/width/default`.
   Text styles: `Web/en/action/{sm|md|lg}` and `Web/ar/action/{sm|md|lg}` (they are bound to the Typography variables, so Tablet/Mobile scale comes from the variable mode, not from a different style). Effect: `Focus/Ring`.
3. **Never** bind `_Primitive/*`, `_deprecated/*` or the old `Button size` collection.
4. **Layer names = anatomy part names** (A2): `container` is the component itself, children `leading-icon`, `label`, `trailing-icon`, `spinner`, `state-layer`.
5. Auto layout everywhere. Absolute position only for `state-layer` and `spinner` (both centered, constraints scale).
6. Icons are instances from the Icons page (`↳ Icons`), never detached.

#### D2 Component structure

```
❖ Button                         ← component set (published) on page ↳ Button
  └─ ◇ .Button/Spinner           ← private base component (new): ring arc, stroke bound to label color via property override
```

#### D3 Layer tree and auto layout

```
Button                    ↔ horizontal · align center/center · gap {B2 gap} · pad-inline {B2 padding-inline} · pad-block 0
│                           height fixed {B2 height} · width hug · radius {B2 radius} · clip content
│                           fill {B3 container background} · stroke inside {B3 border, outlined only} · effect Focus/Ring (State=Focused only)
├── state-layer           ▭ absolute, constraints scale, fill {B3 state layer}; visible only in Hover/Pressed of tonal · outlined · text
├── leading-icon          ◇ Icon instance · size {B2} · fill {B3 icons} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
├── label                 T text style Web/{en|ar}/action/{sm|md|lg} · fill {B3 label} · TEXT `Label` · hug · no wrap
├── trailing-icon         ◇ Icon instance · BOOLEAN `Trailing icon` · INSTANCE_SWAP `Trailing icon glyph`
└── spinner               ◇ .Button/Spinner · absolute centered · size {B2 spinner} · visible only State=Loading
                            (in Loading: leading-icon, label, trailing-icon layer opacity 0, so the width stays the same)
```

```
┌─────────────────────────────────┐
│   [◆]   Save changes    [▸]     │      Loading: ┌─────────────────┐
└─────────────────────────────────┘                │       ◌         │
   ②         ③             ④                       └─────────────────┘
```

#### D4 Properties

This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop (web) | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Filled` · `Tonal` · `Outlined` · `Text` | `Filled` | `variant` | `'filled'` · `'tonal'` · `'outlined'` · `'text'` |
| `Color` | VARIANT | `Brand` · `Secondary` · `Neutral` · `Error` · `Inverse` | `Brand` | `color` | `'brand'` … `'inverse'` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `'sm'` · `'md'` · `'lg'` |
| `State` | VARIANT | `Default` · `Hover` · `Focused` · `Pressed` · `Disabled` · `Loading` | `Default` | `disabled` / `loading` | `Disabled` → `disabled`; `Loading` → `loading`; others are interaction states, not props |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only; code takes language and direction from the provider |
| `Label` | TEXT | | `Save changes` (AR variants: `حفظ التغييرات`) | `children` | |
| `Leading icon` | BOOLEAN | | `false` | `startIcon` | present / absent |
| `Leading icon glyph` | INSTANCE_SWAP | preferred: Icons page | `add` | `startIcon` | `<{Glyph}Rounded />` |
| `Trailing icon` | BOOLEAN | | `false` | `endIcon` | present / absent |
| `Trailing icon glyph` | INSTANCE_SWAP | preferred: Icons page | `arrow_forward` | `endIcon` | |
| — (instance width Fill) | | | | `fullWidth` | not mapped; resizing the instance to Fill = `fullWidth` |

#### D6 States, interactions and motion

Values from B3 (tokens per state) and D4 (transitions).

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · `motion-duration-sm` · standard easing (B4) |
| While pressing | Hover → Pressed | Smart animate · `motion-duration-xs` |
| On click | Default → Loading (prototype demo only, on the docs page) | Dissolve · `motion-duration-sm` |

Focus is not an interaction in Figma; the `Focused` state shows the ring for docs and handoff.

**Inverse focus ring:** effect style `Focus/Ring Inverse` (Foundations library, created 2026-10-16: ring `color/border/inverse`, gap `color/background/brand/default`). Use it for `Color=Inverse, State=Focused`.

#### D7 RTL

Method: `Language=AR` variants. In AR variants: reverse the auto layout order (trailing-icon first, label, leading-icon last, so leading stays at the inline start), text align end, Arabic sample label. Mirror only directional glyphs (B5); the default `Trailing icon glyph` `arrow_forward` is shown mirrored in AR.

```
EN  │  [◆]  Add device          │      │  Next  [▸]  │
AR  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Button — Documentation` on `↳ Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Phone (SafeArea). 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 5-mobile-components/components/button/button.md".

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

`5-mobile-components/lib/src/components/button/bw_button.figma.dart` — `Variant` → `variant: BwButtonVariant.*`, `Color` → `color: BwButtonColor.*`, `Size` → `size: BwControlSize.*`, `State=Disabled` → `onPressed: null`, `State=Loading` → `loading: true`, `Label` → `label`, `Leading icon glyph` → `leadingIcon: Icons.*_rounded`, `Trailing icon glyph` → `trailingIcon`. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Button` in the Mobile file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline, incl. `XL`)
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](button.md#d11-execution-log-filled-by-the-figma-agent) in `button.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `button.md` and in `5-mobile-components/README.md`.
3. `npm run sync:done:mobile` — records this contract as built in the Mobile file.
4. Add one line to the root `CHANGELOG.md`.
