// Maps the token source (2-foundations/dist/tokens.json) to the variables the Figma file must contain.
// One entry per Figma variable: { key, collection, name, web, type, modes: {ModeName: value}, hint: {ModeName: aliasHint}, scopes }
// Matching in Figma is by WEB code syntax (var(--bw-…)); entries with web=null match by name.
// aliasHint: exact variable name ("Colors/primary/600") or "group:<prefix>" (any variable under that prefix with the same value).
import { readJson, P } from './lib.mjs';

const kebab = (p) => p.replace(/\./g, '-');
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const camel = (s) => s.replace(/[-.](\w)/g, (_, c) => c.toUpperCase());
const PLATFORM_MODES = { Web: 'web', Tablet: 'tablet', Mobile: 'mobile' };
const WEIGHT = {
  en: { 400: 'Regular', 500: 'Medium', 600: 'Semi Bold', 700: 'Bold' },
  ar: { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' },
};
const WEIGHT_WORD = { 400: 'regular', 500: 'medium', 600: 'semibold', 700: 'bold' };

// Tokens that exist only in code by design (Figma has no matching variable type or uses styles instead).
export const CODE_ONLY = [
  /^motion\./, /^layer\./, /^font\.family\.mono$/, /^font\.letter-spacing\./,
  /^elevation\./, /^shadow\./, // Figma: effect styles bound to color/shadow/* variables (derived below)
];

function colorScopes(p) {
  const g = p.split('.')[1];
  if (['surface', 'background', 'overlay'].includes(g)) return ['FRAME_FILL', 'SHAPE_FILL'];
  if (['text', 'link'].includes(g)) return ['TEXT_FILL'];
  if (g === 'icon') return ['SHAPE_FILL', 'STROKE_COLOR'];
  if (g === 'border') return ['STROKE_COLOR'];
  if (g === 'external') return ['SHAPE_FILL'];
  if (g === 'data') {
    if (p.endsWith('.text')) return ['TEXT_FILL', 'SHAPE_FILL'];
    if (p.endsWith('.background')) return ['FRAME_FILL', 'SHAPE_FILL'];
    return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];
  }
  if (g === 'shadow') return ['EFFECT_COLOR'];
  return [];
}
const primHint = (ref) => {
  if (!ref || !ref.startsWith('primitive.color.')) return undefined;
  return 'Colors/' + ref.slice('primitive.color.'.length).split('.').join('/');
};
const pct = (s) => Math.round((parseFloat(s) / 100) * 255);
const hx = (n) => n.toString(16).padStart(2, '0').toUpperCase();
// "0px 1px 2px 0px rgb(7 19 35 / 5%)" → ["#0713230D"]
function shadowColors(str) {
  return [...String(str).matchAll(/rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)%\)/g)].map((m) => `#${hx(+m[1])}${hx(+m[2])}${hx(+m[3])}${hx(pct(m[4]))}`);
}

export function expectedFigma(T = readJson(P.tokensJson)) {
  const out = [];
  const add = (e) => out.push({ key: `${e.collection}::${e.web ?? e.name}`, ...e });

  // ---- 1. Themes: semantic colours (light/dark)
  for (const [p, l] of Object.entries(T.theme.light)) {
    if (!p.startsWith('color.')) continue;
    const d = T.theme.dark[p];
    add({ collection: '1. Themes', name: p.split('.').join('/'), web: kebab(p), type: 'COLOR',
      modes: { Light: l.value, Dark: d.value }, hint: { Light: primHint(l.ref), Dark: primHint(d.ref) },
      scopes: colorScopes(p), dart: `context.bw.colors.${camel(p.slice(6))}` });
  }
  // external brand colours live in 1. Themes with the same value in both modes
  for (const [p, t] of Object.entries(T.base)) {
    if (!p.startsWith('color.external.')) continue;
    add({ collection: '1. Themes', name: p.split('.').join('/'), web: kebab(p), type: 'COLOR',
      modes: { Light: t.value, Dark: t.value }, hint: {}, scopes: colorScopes(p),
      dart: `BwExternalColors.${camel(p.slice('color.external.'.length))}` });
  }
  // shadow colours derived from elevation/shadow tokens (bound to the Elevation/* effect styles)
  const sh = (mode, k) => shadowColors(T.theme[mode][k]?.value);
  const shadowVars = {
    'elevation-1': (m) => sh(m, 'elevation.1')[0], 'elevation-2': (m) => sh(m, 'elevation.2')[0],
    'elevation-3': (m) => sh(m, 'elevation.3')[0], 'elevation-4': (m) => sh(m, 'elevation.4')[0],
    'ambient': (m) => sh(m, 'elevation.1')[0]?.slice(0, 7),
  };
  for (const [n, f] of Object.entries(shadowVars)) {
    const L = f('light'), D = f('dark');
    if (!L || !D) continue;
    const web = n === 'ambient' ? 'color-shadow-ambient' : null; // only ambient has code syntax in Figma
    add({ collection: '1. Themes', name: `color/shadow/${n}`, web, type: 'COLOR', modes: { Light: L, Dark: D }, hint: {}, scopes: ['EFFECT_COLOR'] });
  }

  // ---- single-mode collections
  const single = [
    [/^radius\./, '2. Radius', 'Values', ['CORNER_RADIUS'], () => undefined, 'BwRadius'],
    [/^spacing\./, '3. Spacing', 'Values', ['GAP', 'WIDTH_HEIGHT'], () => 'group:Spacing/', 'BwSpacing'],
    [/^size\./, '4. Size', 'Value', ['WIDTH_HEIGHT'], () => 'group:Spacing/', 'BwSize'],
    [/^border\.width\./, '9. Border', 'Value', ['STROKE_FLOAT'], () => undefined, 'BwBorder'],
    [/^border\.focus\./, '9. Border', 'Value', ['GAP'], () => undefined, 'BwBorder'],
  ];
  for (const [p, t] of Object.entries(T.base)) {
    const s = single.find(([re]) => re.test(p));
    if (!s) continue;
    const [, collection, mode, scopes, hint] = s;
    add({ collection, name: p.split('.').join('/'), web: kebab(p), type: 'FLOAT', modes: { [mode]: t.value }, hint: { [mode]: hint() }, scopes });
  }

  // ---- typography (EN / AR), modes Web · Tablet · Mobile
  const W = T.platform.web;
  for (const [lang, collection] of [['en', '5. Typography (EN)'], ['ar', '6. Typography (AR)']]) {
    const fam = T.base[`font.family.${lang}`].value;
    add({ collection, name: 'Font Family', web: null, type: 'STRING',
      modes: Object.fromEntries(Object.keys(PLATFORM_MODES).map((m) => [m, Array.isArray(fam) ? fam[0] : fam])),
      hint: Object.fromEntries(Object.keys(PLATFORM_MODES).map((m) => [m, `Typography/Font Family/${lang.toUpperCase()}`])), scopes: ['FONT_FAMILY'] });
    for (const p of Object.keys(W)) {
      let m, name, web, scopes, type = 'FLOAT', hint, val = (mode) => T.platform[PLATFORM_MODES[mode]][p];
      if ((m = p.match(/^font\.size\.(\w+)\.(\w+)$/))) {
        name = `Size/${cap(m[1])}/${m[2]}`; web = `font-size-${m[1]}-${m[2]}`; scopes = ['FONT_SIZE'];
        hint = (mode) => `Typography/Size/${mode}/${val(mode)}`;
      } else if ((m = p.match(/^font\.line-height\.(en|ar)\.(\w+)\.(\w+)$/)) && m[1] === lang) {
        name = `Line Height/${cap(m[2])}/${m[3]}`; web = `font-line-height-${m[2]}-${m[3]}`; scopes = ['LINE_HEIGHT'];
        hint = (mode) => `Typography/Line Height/${mode}/${lang}/${val(mode)}`;
      } else if ((m = p.match(/^font\.weight\.(\w+)$/))) {
        name = `Role Weight/${m[1]}`; web = `font-weight-${m[1]}`; scopes = ['FONT_STYLE']; type = 'STRING';
        const num = val; val = (mode) => WEIGHT[lang][num(mode)];
        hint = (mode) => `Font Weight/font-weight-${WEIGHT_WORD[num(mode)]}`;
      } else continue;
      add({ collection, name, web, type, scopes,
        modes: Object.fromEntries(Object.keys(PLATFORM_MODES).map((md) => [md, val(md)])),
        hint: Object.fromEntries(Object.keys(PLATFORM_MODES).map((md) => [md, hint(md)])) });
    }
  }

  // ---- 7. Grid & Layout
  const platformKeys = [...new Set(Object.values(PLATFORM_MODES).flatMap((k) => Object.keys(T.platform[k])))];
  for (const p of platformKeys) {
    if (!/^(grid|layout|breakpoint|target)\./.test(p)) continue;
    // a key missing on a platform (e.g. breakpoint.max on web = open-ended) is not checked for that mode
    const scopes = /^(layout|target)\./.test(p) ? ['WIDTH_HEIGHT'] : [];
    add({ collection: '7. Grid & Layout', name: p.split('.').join('/'), web: kebab(p), type: 'FLOAT', scopes, hint: {},
      modes: Object.fromEntries(Object.entries(PLATFORM_MODES).filter(([, k]) => T.platform[k][p] !== undefined).map(([md, k]) => [md, T.platform[k][p]])) });
  }

  // ---- _Primitive colour ramps (hidden, matched by name)
  for (const [p, v] of Object.entries(T.primitive)) {
    if (!p.startsWith('primitive.color.')) continue;
    add({ collection: '_Primitive', name: primHint(p), web: null, type: 'COLOR', modes: { Values: v }, hint: {}, scopes: [] });
  }
  return out;
}

// Tokens present in code that intentionally have no Figma variable.
export function codeOnly(T = readJson(P.tokensJson)) {
  const all = [...Object.keys(T.base), ...Object.keys(T.theme.light), ...Object.keys(T.platform.web)];
  return [...new Set(all.filter((p) => CODE_ONLY.some((re) => re.test(p))))];
}
