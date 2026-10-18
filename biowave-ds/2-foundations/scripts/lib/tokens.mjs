// Loads the DTCG token source, merges it into "modes", and resolves aliases.
// Zero dependencies on purpose: any agent can read and run it with plain Node 18+.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const FOUNDATIONS = path.resolve(here, '../..');
export const ROOT = path.resolve(FOUNDATIONS, '..');
export const TOKENS = path.join(FOUNDATIONS, 'tokens');

const read = (rel) => JSON.parse(fs.readFileSync(path.join(TOKENS, rel), 'utf8'));

// Which files make up each mode. Order matters only for readability; keys never collide.
export const SETS = {
  base: [
    'primitives/color.json', 'primitives/dimension.json', 'primitives/typography.json', 'primitives/motion.json',
    'semantic/spacing.json', 'semantic/radius.json', 'semantic/border.json', 'semantic/size.json',
    'semantic/typography.json', 'semantic/motion.json', 'semantic/layer.json', 'semantic/color.external.json',
  ],
  theme: { light: ['semantic/color.light.json', 'semantic/elevation.light.json'], dark: ['semantic/color.dark.json', 'semantic/elevation.dark.json'] },
  platform: { web: ['platform/web.json'], tablet: ['platform/tablet.json'], mobile: ['platform/mobile.json'] },
};
export const THEMES = Object.keys(SETS.theme);
export const PLATFORMS = Object.keys(SETS.platform);
export const LOCALES = ['en', 'ar'];

function deepMerge(target, src, file) {
  for (const [k, v] of Object.entries(src)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && !('$value' in v) && target[k] && typeof target[k] === 'object') deepMerge(target[k], v, file);
    else if (k in target && !k.startsWith('$')) throw new Error(`Duplicate token key "${k}" while merging ${file}`);
    else target[k] = v;
  }
  return target;
}

/** Flatten a DTCG tree into Map<path, {type, value, description}> with inherited $type. */
export function flatten(tree) {
  const out = new Map();
  (function walk(node, p, inheritedType) {
    const type = node.$type ?? inheritedType;
    if ('$value' in node) { out.set(p.join('.'), { path: p, type, value: node.$value, description: node.$description }); return; }
    for (const [k, v] of Object.entries(node)) if (!k.startsWith('$') && v && typeof v === 'object') walk(v, [...p, k], type);
  })(tree, [], undefined);
  return out;
}

const ALIAS = /^\{([^}]+)\}$/;

/** Resolve aliases. Returns Map<path, token> where token.value is fully resolved and token.ref is the alias target (if any). */
export function resolve(flat) {
  const res = new Map();
  const get = (p, stack = []) => {
    if (res.has(p)) return res.get(p);
    const t = flat.get(p);
    if (!t) throw new Error(`Unresolved alias {${p}}${stack.length ? ' (from ' + stack.at(-1) + ')' : ''}`);
    if (stack.includes(p)) throw new Error(`Alias cycle: ${[...stack, p].join(' -> ')}`);
    let out;
    if (typeof t.value === 'string' && ALIAS.test(t.value)) {
      const target = t.value.match(ALIAS)[1];
      const r = get(target, [...stack, p]);
      out = { ...t, type: t.type ?? r.type, value: r.value, ref: target };
    } else out = { ...t };
    if (!out.type) throw new Error(`Token ${p} has no $type`);
    res.set(p, out);
    return out;
  };
  for (const p of flat.keys()) get(p);
  return res;
}

/** Build every mode: base + each theme + each platform, resolved. */
export function loadAll() {
  const merge = (files) => files.reduce((acc, f) => deepMerge(acc, read(f), f), {});
  const base = merge(SETS.base);
  const modes = { theme: {}, platform: {} };
  for (const t of THEMES) modes.theme[t] = resolve(flatten(deepMerge(structuredClone(base), merge(SETS.theme[t]), t)));
  for (const p of PLATFORMS) modes.platform[p] = resolve(flatten(deepMerge(structuredClone(base), merge(SETS.platform[p]), p)));
  const baseResolved = resolve(flatten(base));
  return { base: baseResolved, ...modes };
}

// ---------- value helpers ----------
export const isPrimitive = (p) => p.startsWith('primitive.');
export const px = (v) => (typeof v === 'object' && v && 'value' in v ? v.value : v);
export function colorHex(v) {
  const a = v.alpha ?? 1;
  const hex = v.hex.toUpperCase();
  return a >= 1 ? hex : hex + Math.round(a * 255).toString(16).padStart(2, '0').toUpperCase();
}
export function colorCss(v) {
  const a = v.alpha ?? 1;
  if (a >= 1) return v.hex.toUpperCase();
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(v.hex.slice(i, i + 2), 16));
  return `rgb(${r} ${g} ${b} / ${+(a * 100).toFixed(1)}%)`;
}
export function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => m - n);
  return (y + 0.05) / (x + 0.05);
}
export const kebab = (p) => p.join('-');
export const camel = (parts) => parts.map((s, i) => s.split('-').map((w, j) => (i === 0 && j === 0 ? w : w[0].toUpperCase() + w.slice(1))).join('')).join('')
  .replace(/^(\d)/, 'v$1');
export const writeFile = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
export const HEADER = 'GENERATED by 2-foundations/scripts/build.mjs from 2-foundations/tokens. Do not edit by hand.';
