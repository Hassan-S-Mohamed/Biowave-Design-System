// Component tokens (D-13): <section>/components/<component>/<component>.tokens.json → local variable collections in that platform's Figma file.
// Rule: every component token aliases a SEMANTIC token (never a primitive, never a raw value). Semantic tokens live only in
// 2-foundations and only in the Foundations Figma file; component files hold component tokens only.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, walk, sha, readJson } from './lib.mjs';
import { expectedFigma } from './figma-map.mjs';

export const SECTION = { web: '3-web-components', tablet: '4-tablet-components', mobile: '5-mobile-components' };
const SEMANTIC_COLLECTIONS = ['1. Themes', '2. Radius', '3. Spacing', '4. Size', '5. Typography (EN)', '6. Typography (AR)', '7. Grid & Layout', '9. Border'];
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const merge = (a, b) => { const o = { ...a }; for (const [k, v] of Object.entries(b)) o[k] = isObj(v) && isObj(o[k]) ? merge(o[k], v) : v; return o; };

export function loadTokens(rel) {
  const abs = path.join(ROOT, rel);
  let d = JSON.parse(fs.readFileSync(abs, 'utf8'));
  if (d.$extends) {
    const baseRel = path.relative(ROOT, path.resolve(path.dirname(abs), d.$extends)).split(path.sep).join('/');
    const { $extends, $description, ...rest } = d;
    d = merge(loadTokens(baseRel), rest);
  }
  return d;
}

// semantic token path (dot) → Figma variable in the Foundations file
let SEM;
function semanticIndex() {
  if (SEM) return SEM;
  SEM = new Map();
  for (const e of expectedFigma()) if (e.web && SEMANTIC_COLLECTIONS.includes(e.collection)) SEM.set(e.web, e);
  return SEM;
}
const refOf = (v) => (typeof v === 'string' && /^\{[^}]+\}$/.test(v) ? v.slice(1, -1) : null);

// → { collections: [{ collection, component, modes: [..], vars: { name: { mode: { path, collection, name } } } }], errors: [], refs: Set }
export function figmaModel(rel) {
  const d = loadTokens(rel);
  const errors = [], refs = new Set(), collections = [];
  const comps = Object.keys(d).filter((k) => !k.startsWith('$'));
  for (const comp of comps) for (const [gk, group] of Object.entries(d[comp])) {
    if (gk.startsWith('$')) continue;
    const fx = group.$extensions?.figma;
    if (!fx?.collection) { errors.push(`${rel}: ${comp}.${gk} has no $extensions.figma.collection`); continue; }
    if (!/^[A-Z][A-Za-z ]* \/ [A-Z][A-Za-z ]*$/.test(fx.collection)) errors.push(`${rel}: collection "${fx.collection}" must be "<Component> / <Group>"`);
    const modes = Object.keys(group).filter((k) => !k.startsWith('$'));
    const vars = {};
    for (const m of modes) {
      const flat = {};
      (function walkT(node, p) {
        if ('$value' in node) { flat[p.join('/')] = node.$value; return; }
        for (const [k, v] of Object.entries(node)) if (!k.startsWith('$') && isObj(v)) walkT(v, [...p, k]);
      })(group[m], []);
      for (const [name, val] of Object.entries(flat)) {
        const ref = refOf(val);
        if (!ref) { errors.push(`${rel}: ${comp}.${gk}.${m}.${name} = ${JSON.stringify(val)} is not an alias`); continue; }
        if (ref.startsWith('primitive.')) { errors.push(`${rel}: ${comp}.${gk}.${m}.${name} aliases a PRIMITIVE (${ref}) — use a semantic token`); continue; }
        const e = semanticIndex().get(ref.replace(/\./g, '-'));
        if (!e) { errors.push(`${rel}: ${comp}.${gk}.${m}.${name} → {${ref}} is not a semantic token in the Foundations file`); continue; }
        refs.add(ref.replace(/\./g, '-'));
        (vars[name] ||= {})[m] = { path: ref, collection: e.collection, name: e.name };
      }
    }
    for (const [name, byMode] of Object.entries(vars)) {
      const missing = modes.filter((m) => !byMode[m]);
      if (missing.length) errors.push(`${rel}: "${fx.collection}" variable ${name} missing in mode(s) ${missing.join(', ')} — every mode needs the same variables`);
    }
    if (modes.length > 10) errors.push(`${rel}: "${fx.collection}" has ${modes.length} modes — Figma Professional allows 10`);
    collections.push({ collection: fx.collection, component: comp, modes, vars });
  }
  return { collections, errors, refs };
}

export const tokenFiles = (file) => walk(path.join(ROOT, SECTION[file]), (f) => /\/components\/([^/]+)\/\1\.tokens\.json$/.test(f));

export function expectedComponentTokens(file) {
  const all = [], errors = [];
  for (const rel of tokenFiles(file)) {
    const m = figmaModel(rel);
    all.push(...m.collections); errors.push(...m.errors);
  }
  const names = all.map((c) => c.collection);
  names.filter((n, i) => names.indexOf(n) !== i).forEach((n) => errors.push(`${file}: collection "${n}" defined twice`));
  return { collections: all, errors, hash: sha(JSON.stringify(all)) };
}

// Spec ↔ <name>.tokens.json: the same facts must appear in both (Part B2–B3 of <name>.md is the human view, the JSON the machine view).
export function specPart(mdPath) {
  const t = fs.readFileSync(mdPath, 'utf8');
  const m = t.match(/\n## B · Spec\n([\s\S]*?)(?=\n## [A-F] · |$)/);
  return m ? m[1] : '';
}
export function specConsistency(rel) {
  const warnings = [];
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  if (d.$extends) return warnings; // checked on the base file
  const spec = path.join(ROOT, rel.replace(/\.tokens\.json$/, '.md'));
  if (!fs.existsSync(spec)) return [`${rel}: no component file ${path.basename(spec)} next to it`];
  const text = specPart(spec);
  if (!text) return [`${rel}: ${path.basename(spec)} has no "## B · Spec" part`];
  const inSpec = new Set([...text.matchAll(/`((?:color|size|spacing|radius|border)-[a-z0-9-]+)`/g)].map((m) => m[1]));
  const { refs } = figmaModel(rel);
  for (const r of refs) if (!inSpec.has(r)) warnings.push(`${rel}: ${r} is in the tokens JSON but not named in Part B`);
  for (const s of inSpec) if (semanticIndex().has(s) && !refs.has(s) && !/^border-(focus|width-focus)|^size-control-height-xl|^radius-xl|^spacing-control-(padding-inline|gap)-xl/.test(s)) warnings.push(`${rel}: ${s} is in Part B but not in the tokens JSON`);
  return warnings;
}

// CLI: node _sync/component-tokens.mjs check
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let bad = 0;
  for (const file of Object.keys(SECTION)) {
    const { collections, errors } = expectedComponentTokens(file);
    const nv = collections.reduce((n, c) => n + Object.keys(c.vars).length * c.modes.length, 0);
    console.log(`${file}: ${tokenFiles(file).length} tokens.json · ${collections.length} collection(s) · ${nv} mode values${errors.length ? ` · ✗ ${errors.length} error(s)` : ' · ✓'}`);
    errors.forEach((e) => console.log('  ✗ ' + e)); bad += errors.length;
    for (const rel of tokenFiles(file)) for (const w of specConsistency(rel)) { console.log("  ✗ spec drift: " + w); bad++; }
  }
  process.exit(bad ? 1 : 0);
}
