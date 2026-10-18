# _sync — keep code and Figma in step

Direction is one way (D-01): **files are the source of truth, Figma follows.**

```
2-foundations/tokens/*.json ──(auto, watcher)──► generated CSS · TS · Dart · preview
            │
            └──(sync:plan → Figma Agent runs figma-apply-*.js → sync:verify → sync:done)──► Figma variables
<3|4|5>-*/components/<name>/<name>.md ──(npm run contract)──► figma-<name>-contract.md ──(Figma Agent: Phase 1 set, Phase 2 docs → sync:done:<file>)──► Figma components, one file per platform
```

Figma files (D-12) — keys only in [`figma-files.json`](figma-files.json):

| File | Key (`_sync/figma-files.json`) | Owns | Repo source |
|---|---|---|---|
| **Biowave DS — Foundations** | `foundations` | Variables, text/effect styles, icons, foundation docs, Foundation List. Published library | `2-foundations/` |
| **Annotation** (Doc Kit, D-17) | `docKit` | `Doc/*` components (documentation + home pages), bound to the Foundations library. Published library | `2-foundations/figma-doc-kit.md` |
| **Biowave DS — Web Components** | `web` | Web component sets + docs | `3-web-components/components/*/figma-*-contract.md` |
| **Biowave DS — Tablet Components** | `tablet` | Tablet component sets + docs | `4-tablet-components/components/*/figma-*-contract.md` |
| **Biowave DS — Mobile Components** | `mobile` | Mobile component sets + docs | `5-mobile-components/components/*/figma-*-contract.md` |

Variables and styles are synced into **Foundations** only; the component files use them through the published library. Figma has no way to watch your disk and the variables REST API needs an Enterprise plan, so the Figma step is run by Claude / the Figma Agent through the Figma MCP — the tooling here tells it exactly what to change and proves the result.

## Variables: who owns what (D-13)
| Where | Contains | Never |
|---|---|---|
| Foundations file | Primitive (hidden) and **semantic** variables, text/effect styles | component tokens |
| Web / Tablet / Mobile Components files | **Component tokens only**: collections `<Component> / <Group>`, every value an alias to a Foundations semantic variable, hidden from publishing, code syntax copied from the semantic variable (Dev Mode shows the real code token) | semantic variables, primitives, raw values, local styles |

Component tokens come from `<3|4|5>-*/components/<name>/<name>.tokens.json` (Tablet/Mobile may `"$extends"` the Web file and add e.g. size `xl`). Each group declares its Figma collection in `$extensions.figma.collection`; its keys become the collection's modes and every mode must define the same variables.

## Commands

| Command | What it does |
|---|---|
| `npm run watch` | Watches the repo. Token edit → rebuilds all generated code + contrast checks. Any token or component-doc edit → refreshes `_sync/status.txt` and shows a macOS notification if Figma needs updating. |
| `npm run watch:install` | Same, started automatically at login (macOS launchd). `watch:uninstall` removes it. |
| `npm run sync` | Status in six parts (code · Figma variables · Figma build queue · component tokens · library index · contracts). Exit 1 only when **BLOCKED** (code stale, Figma variables pending, component tokens pending/invalid). Figma contracts not yet built in Figma are shown as the **Figma build queue** (⏳, not blocking). |
| `npm run sync:strict` | Same, but also fails while the Figma build queue is not empty (release checks). |
| `npm run component-tokens` | Validates every `<name>.tokens.json`: aliases only, semantic targets that exist in Foundations, same variables in every mode, ≤ 10 modes, and Part B of `<name>.md` names the same tokens. |
| `npm run sync:library -- <dumps…>` | Saves the output of `figma-read-library.js` as `figma-library.json`: every published Foundations variable, text/effect style and Doc Kit/icon component **with its key**. The Figma contracts take keys from here. Re-read after every Foundations publish (`sync` shows it as stale). |
| `npm run sync:verify-tokens -- <web|tablet|mobile> <dump>` | Checks a component file: output of `figma-read-tokens.js` vs `tokens.json`, and fails on any lint violation (copied semantic variable, raw value, local alias, primitive, local style, non-`<Component> / <Group>` collection). |
| `npm run sync:done:tokens:<web|tablet|mobile>` | After verify-tokens passed: records the component-token baseline for that file. |
| `npm run sync:plan` | Writes `figma-pending.json` + `figma-apply-N.js` (Plugin API scripts) for the pending token changes. |
| `npm run sync:verify -- <dumps…>` | Compares the output of `figma-read.js` with the token source, value by value, every mode. |
| `npm run sync:done` | After Figma **variables** are updated **and verified** (Foundations): saves the token baseline in `figma-snapshot.json`. |
| `npm run sync:done -- --components=web,tablet,mobile` · `sync:done:web` · `sync:done:tablet` · `sync:done:mobile` · `sync:done:doc-kit` | After the Figma Agent rebuilt components in those files: saves the docs baseline **per file**, so each platform file can be in or out of sync on its own. |

## Applying a pending Figma sync (Claude / Figma Agent)

1. `npm run sync` → if code is stale, `npm run tokens` first.
2. `npm run sync:plan`.
3. Run each `_sync/figma-apply-N.js` with `use_figma` on the file above (in order). Read the returned `warnings`.
   - Updates keep variable IDs, so every binding in components keeps working.
   - New values alias the matching primitive (`Colors/…`, `Typography/Size/…`, `Spacing/…`) when one exists.
   - Removed tokens are **not deleted**: they move to `_deprecated/…` and are hidden (AUDIT.md §6 convention).
4. Run `figma-read.js` three times (`ONLY` = `['1. Themes']`, `['_Primitive']`, the rest), save each result to a file, then `npm run sync:verify -- a.txt b.txt c.txt` → must end with `✓ all match`.
5. `npm run sync:done`.
6. **Publish** the Foundations library in Figma (Assets → Publish). Component files only see published changes. `sync:verify` also fails on any semantic variable hidden from publishing.

Components: `npm run sync` lists every generated `figma-<name>-contract.md` that is new or changed since the last `sync:done:<file>` (and `figma-doc-kit.md` for Foundations). Editing a plan, review or changelog never re-queues Figma work — only a regenerated Figma contract does. The Figma Agent builds the component from its contract (Phase 1 set, Phase 2 docs + Components List card); after review, `npm run sync:done:<file>`.

## Reading the library index (keys for the Figma contracts)
1. In the **Foundations** file run `figma-read-library.js` with `PART` = `'variables'` (page through if the output is too large) and `'styles'`; in the **Annotation** (Doc Kit) file with `PART = 'components'`; in **one component file** with `PART = 'reach'`. Save each output.
2. `npm run sync:library -- <dumps…>` → writes `figma-library.json` and checks that every published variable is reachable from the component file.
3. `npm run contract -- --all` regenerates the contracts with the new keys.

After a variable sync, also **publish the Foundations library** in Figma (Assets → Publish) so the component files receive the change — publishing cannot be done through the API.

## Files

| File | Edit? |
|---|---|
| `component-tokens.mjs`, `figma-apply-tokens.template.js`, `figma-read-tokens.js` | Component-token validation, apply (generated per file by `sync:plan`) and read/lint. |
| `library.mjs`, `figma-read-library.js`, `figma-library.json` | Library index for the Figma contracts. `figma-library.json` is written only by `npm run sync:library`. |
| `figma-files.json` | Yes — the only place Figma file keys are written. Add a file here before using it in any doc or script. |
| `figma-snapshot.json` | Never by hand — last state confirmed in Figma (written by `sync:done`). Commit it. |
| `build-stamp.json` | Never by hand — hash of the token source at the last build (written by `npm run tokens`). Commit it. |
| `figma-map.mjs` | How tokens map to Figma collections, names, modes, scopes and primitive aliases. Change when collections change. |
| `figma-read.js`, `figma-apply.template.js` | Plugin API scripts used through the Figma MCP. |
| `status.txt`, `watch.log`, `figma-pending.json`, `figma-apply-N.js` | Local, regenerated, git-ignored. |

Not mirrored in Figma by design (31 tokens): motion, layers (z-index), mono font, letter-spacing, composite shadows — Figma uses effect styles bound to `color/shadow/*`, which *are* synced.
