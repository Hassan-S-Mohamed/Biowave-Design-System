// Quality gates for the token source. Runs automatically at the end of build.mjs,
// or alone: node 2-foundations/scripts/check.mjs
// 1. WCAG 2.2 contrast for every pair in contrast-pairs.json, in every theme.
// 2. Every semantic color exists in every theme (light/dark parity).
// 3. Every platform defines the same keys.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll, THEMES, PLATFORMS, contrast, colorHex, isPrimitive } from './lib/tokens.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

export function runChecks(all = loadAll(), { verbose = false } = {}) {
  const errors = [];
  const pairs = JSON.parse(fs.readFileSync(path.join(here, 'contrast-pairs.json'), 'utf8')).pairs;
  const rows = [];
  for (const th of THEMES) {
    const m = all.theme[th];
    for (const { fg, bg, min, note } of pairs) {
      const f = m.get(fg), b = m.get(bg);
      if (!f || !b) { errors.push(`[${th}] contrast pair references missing token: ${!f ? fg : bg}`); continue; }
      if ((f.value.alpha ?? 1) < 1 || (b.value.alpha ?? 1) < 1) { errors.push(`[${th}] contrast pair uses a translucent color: ${fg} / ${bg}`); continue; }
      const r = contrast(colorHex(f.value), colorHex(b.value));
      const pass = r + 1e-9 >= min;
      rows.push({ th, fg, bg, r: r.toFixed(2), min, pass, note });
      if (!pass) errors.push(`[${th}] ${fg} on ${bg} = ${r.toFixed(2)}:1 (needs ${min}:1)`);
    }
  }
  // theme parity
  const keys = (m) => new Set([...m.keys()].filter((k) => !isPrimitive(k) && (k.startsWith('color.') || k.startsWith('elevation.') || k.startsWith('shadow.'))));
  const [a, ...rest] = THEMES.map((t) => keys(all.theme[t]));
  rest.forEach((s, i) => { for (const k of a) if (!s.has(k)) errors.push(`token ${k} missing in theme ${THEMES[i + 1]}`); for (const k of s) if (!a.has(k)) errors.push(`token ${k} missing in theme ${THEMES[0]}`); });
  // platform parity
  const pk = (m) => new Set([...m.keys()].filter((k) => k.startsWith('platform.')));
  const [p0, ...pr] = PLATFORMS.map((p) => pk(all.platform[p]));
  pr.forEach((s, i) => { for (const k of p0) if (!s.has(k) && !k.endsWith('breakpoint.max')) errors.push(`platform key ${k} missing in ${PLATFORMS[i + 1]}`); });

  if (verbose) console.table(rows);
  const failed = rows.filter((r) => !r.pass).length;
  console.log(`${errors.length ? '✗' : '✓'} checks: ${rows.length - failed}/${rows.length} contrast pairs pass, ${errors.length} error(s)`);
  errors.forEach((e) => console.error('  - ' + e));
  return errors.length === 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exitCode = runChecks(loadAll(), { verbose: process.argv.includes('--verbose') }) ? 0 : 1;
}
