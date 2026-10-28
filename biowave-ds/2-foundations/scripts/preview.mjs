// Generates a self-contained visual reference of every foundation token.
//   node 2-foundations/scripts/preview.mjs   ->  2-foundations/preview/index.html
// Open the file in any browser. Theme / language / platform switches use the same
// attributes the real apps use (data-theme, lang+dir, data-platform).
import fs from 'node:fs';
import path from 'node:path';
import { FOUNDATIONS, writeFile, contrast } from './lib/tokens.mjs';

const css = fs.readFileSync(path.join(FOUNDATIONS, 'web/src/generated/tokens.css'), 'utf8');
const T = JSON.parse(fs.readFileSync(path.join(FOUNDATIONS, 'dist/tokens.json'), 'utf8'));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const v = (p) => `var(--bw-${p.replace(/\./g, '-')})`;
const L = T.theme.light, D = T.theme.dark;

// ---------- colors
const groups = {};
for (const k of Object.keys(L)) if (k.startsWith('color.')) (groups[k.split('.').slice(0, 2).join('.')] ??= []).push(k);
const bgFor = (k) => {
  const p = k.split('.');
  if (p[1] === 'text' || p[1] === 'icon' || p[1] === 'link') {
    if (p[2] === 'on') return `color.background.${p[3]}.default`;
    if (p[3] === 'inverse') return 'color.surface.inverse';
    return 'color.surface.default';
  }
  return null;
};
const ratio = (th, fg, bg) => (bg && th[fg] && th[bg] && th[fg].value.length === 7 ? contrast(th[fg].value, th[bg].value).toFixed(2) : null);
const swatch = (k) => {
  const bg = bgFor(k);
  const isText = !!bg;
  const rl = ratio(L, k, bg), rd = ratio(D, k, bg);
  const chip = isText
    ? `<div class="chip" style="background:${v(bg)};color:${v(k)}"><span class="bw-text-title-lg">Aa</span>${k.includes('.icon.') ? '<span class="dot" style="background:currentColor"></span>' : ''}</div>`
    : `<div class="chip" style="background:${v(k)}"></div>`;
  return `<div class="sw">${chip}<div class="meta"><code>${esc(k.replace(/^color\./, '').replace(/\./g, '-'))}</code>
  <div class="vals"><span title="light">☀ ${esc(L[k].value)}${L[k].ref ? ` · ${esc(L[k].ref.replace('primitive.color.', ''))}` : ''}</span><span title="dark">☾ ${esc(D[k].value)}${D[k].ref ? ` · ${esc(D[k].ref.replace('primitive.color.', ''))}` : ''}</span></div>
  ${rl ? `<div class="cr">contrast ☀ ${rl} · ☾ ${rd}</div>` : ''}</div></div>`;
};
const colorHtml = Object.entries(groups).map(([g, ks]) => `<h3>${esc(g.replace('color.', ''))}</h3><div class="grid sw-grid">${ks.map(swatch).join('')}</div>`).join('');

// ---------- primitives
const ramps = {};
for (const [k, val] of Object.entries(T.primitive)) {
  const m = k.match(/^primitive\.color\.(\w+)\.(\d+)$/);
  if (m) (ramps[m[1]] ??= []).push([m[2], val]);
}
const rampHtml = Object.entries(ramps).map(([r, steps]) => `<div class="ramp"><div class="ramp-name">${r}</div><div class="ramp-row">${steps.map(([s, hex]) => `<div class="step" style="background:${hex};color:${contrast(hex, '#FFFFFF') > 4.5 ? '#fff' : '#0A0A0A'}"><b>${s}</b><span>${hex}</span></div>`).join('')}</div></div>`).join('');

// ---------- typography
const roles = Object.keys(T.platform.web).filter((k) => k.startsWith('font.size.')).map((k) => k.replace('font.size.', ''));
const sample = { en: 'Clock-in recorded at 08:57 · Main Door', ar: 'تم تسجيل الحضور الساعة 08:57 · البوابة الرئيسية' };
const typeRows = roles.map((r) => {
  const [role, size] = r.split('.');
  const cells = ['web', 'tablet', 'mobile'].map((p) => {
    const P = T.platform[p];
    return `<td class="num">${P[`font.size.${r}`]} / ${P[`font.line-height.en.${r}`]} <span class="muted">· ar ${P[`font.line-height.ar.${r}`]}</span></td>`;
  }).join('');
  return `<tr><td><code>${role}-${size}</code><div class="muted">w ${T.platform.web[`font.weight.${role}`]}</div></td><td class="spec"><div class="bw-text-${role}-${size} en" lang="en">${esc(sample.en)}</div><div class="bw-text-${role}-${size} ar" lang="ar" dir="rtl">${esc(sample.ar)}</div></td>${cells}</tr>`;
}).join('');

// ---------- scales
const scale = (prefix, render) => Object.entries(T.base).filter(([k]) => k.startsWith(prefix)).map(([k, t]) => render(k.slice(prefix.length), t)).join('');
const spacingHtml = scale('spacing.', (n, t) => `<div class="row"><code>spacing-${n}</code><span class="num">${t.value}px</span><span class="bar" style="width:${Math.min(t.value, 160)}px"></span></div>`);
const radiusHtml = scale('radius.', (n, t) => `<div class="tile"><div class="rbox" style="border-radius:${Math.min(t.value, 999)}px"></div><code>radius-${n}</code><span class="num">${t.value === 9999 ? 'full' : t.value + 'px'}</span></div>`);
const elevHtml = Object.keys(L).filter((k) => k.startsWith('elevation.') || k.startsWith('shadow.')).map((k) => `<div class="tile"><div class="ebox" style="box-shadow:${v(k)}"></div><code>${k.replace('.', '-')}</code><span class="muted">${esc(T.base[k]?.description ?? '')}</span></div>`).join('');
const motionHtml = scale('motion.duration.', (n, t) => `<div class="row"><code>motion-duration-${n}</code><span class="num">${t.value}ms</span><span class="muted">${esc(t.description ?? '')}</span></div>`)
  + scale('motion.easing.', (n, t) => `<div class="row"><code>motion-easing-${n}</code><span class="num">[${t.value.join(', ')}]</span><span class="track"><span class="ball" style="transition-timing-function:cubic-bezier(${t.value.join(',')})"></span></span></div>`);
const sizeHtml = scale('size.icon.', (n, t) => `<div class="tile"><div class="ibox" style="width:${t.value}px;height:${t.value}px"></div><code>size-icon-${n}</code><span class="num">${t.value}px</span></div>`);
const contHtml = scale('size.container.', (n, t) => `<div class="row"><code>size-container-${n}</code><span class="num">${t.value}px</span><span class="bar alt" style="width:${t.value / 1920 * 100}%"></span></div>`);
const gridKeys = ['breakpoint.min', 'breakpoint.max', 'grid.columns', 'grid.gutter', 'grid.margin.full', 'grid.margin.sidebar', 'layout.height.app-bar', 'layout.height.system-status', 'layout.width.sidebar-start', 'layout.width.sidebar-end', 'target.min'];
const gridHtml = `<table><thead><tr><th>Token</th><th>Web</th><th>Tablet</th><th>Mobile</th></tr></thead><tbody>${gridKeys.map((k) => `<tr><td><code>${k.replace(/\./g, '-')}</code></td>${['web', 'tablet', 'mobile'].map((p) => `<td class="num">${T.platform[p][k] ?? '—'}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const cols = (p) => { const P = T.platform[p]; return `<figure class="cols"><figcaption>${p} · ${P['grid.columns']} cols · ${P['grid.gutter']} gutter · ${P['grid.margin.full']} margin</figcaption><div class="cols-frame" style="padding-inline:${P['grid.margin.full'] / 2}px;gap:${P['grid.gutter'] / 2}px">${Array.from({ length: P['grid.columns'] }, () => '<span></span>').join('')}</div></figure>`; };

const SECTIONS = ['Colors', 'Palette', 'Typography', 'Spacing', 'Radius', 'Elevation', 'Size', 'Grid', 'Motion'];
const seg = (name, label, opts) => `<div class="seg-group"><span class="seg-label" id="lbl-${name}">${label}</span><div class="seg" role="radiogroup" aria-labelledby="lbl-${name}">${opts.map(([v, t, lang]) => `<label class="seg-opt"><input type="radio" name="${name}" value="${v}"${lang ? ` lang="${lang}"` : ''}><span${lang ? ` lang="${lang}"` : ''}>${t}</span></label>`).join('')}</div></div>`;
const logo = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5.6 7.5A8 8 0 0 1 18.4 7.5"/><path d="M4.2 12a8 8 0 0 1 1.1-3.3M19.8 12a8 8 0 0 0-1.1-3.3"/><path d="M7.5 18.5A9 9 0 0 1 6.5 12a5.5 5.5 0 0 1 11 0v1"/><path d="M9.5 20a11 11 0 0 1-1-8 3.5 3.5 0 0 1 7 0v2.5a6 6 0 0 1-1 3.3"/><path d="M12 12v2.5a9 9 0 0 0 1.5 5"/><path d="M17.3 16.3a10 10 0 0 1-.8 3.2"/></svg>';
const body = `
<header class="top">
  <div class="brand"><span class="logo">${logo}</span><div><div class="brand-name">Biowave</div><div class="brand-sub">Design System. Foundations</div></div></div>
  <div class="controls">
    ${seg('theme', 'Theme', [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']])}
    ${seg('platform', 'Platform', [['web', 'Web'], ['tablet', 'Tablet'], ['mobile', 'Mobile']])}
    ${seg('lang', 'Language', [['en', 'EN', 'en'], ['ar', 'عربي', 'ar']])}
    <div class="menu">
      <button type="button" class="menu-btn" id="menu-btn" aria-haspopup="true" aria-expanded="false" aria-controls="menu-list" aria-label="Sections">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <nav class="menu-list" id="menu-list" aria-label="Sections" hidden>
        ${SECTIONS.map((x, i) => `<a href="#${x.toLowerCase()}"><span class="menu-num">${String(i + 1).padStart(2, '0')}</span>${x}</a>`).join('')}
      </nav>
    </div>
  </div>
</header>
<main>
<section id="colors"><h2 class="bw-text-heading-md">Semantic colors</h2><p class="muted lead">Components use only these. Each swatch shows its light and dark value and the primitive it aliases. Text and icon swatches are drawn on the surface they are meant for, with the measured WCAG contrast.</p>${colorHtml}</section>
<section id="palette"><h2 class="bw-text-heading-md">Primitive palette</h2><p class="muted lead">Raw ramps. Maintainers only: never bind these inside components.</p>${rampHtml}</section>
<section id="typography"><h2 class="bw-text-heading-md">Typography</h2><p class="muted lead">Inter for Latin, IBM Plex Sans Arabic for Arabic. Specimens render at the platform chosen above. Columns list size / line height (px) per platform; Arabic uses taller line heights.</p><div class="scroll"><table class="type"><thead><tr><th>Role</th><th>Specimen</th><th>Web</th><th>Tablet</th><th>Mobile</th></tr></thead><tbody>${typeRows}</tbody></table></div></section>
<section id="spacing"><h2 class="bw-text-heading-md">Spacing</h2><div class="rows">${spacingHtml}</div></section>
<section id="radius"><h2 class="bw-text-heading-md">Radius</h2><div class="grid tiles">${radiusHtml}</div></section>
<section id="elevation"><h2 class="bw-text-heading-md">Elevation</h2><p class="muted lead">Dark theme uses stronger black shadows plus a lighter surface (surface-raised) to show depth.</p><div class="grid tiles elev">${elevHtml}</div></section>
<section id="size"><h2 class="bw-text-heading-md">Size</h2><h3>Icons</h3><div class="grid tiles">${sizeHtml}</div><h3>Containers</h3><div class="rows">${contHtml}</div></section>
<section id="grid"><h2 class="bw-text-heading-md">Grid, layout and breakpoints</h2><div class="scroll">${gridHtml}</div>${['web', 'tablet', 'mobile'].map(cols).join('')}</section>
<section id="motion"><h2 class="bw-text-heading-md">Motion</h2><p class="muted lead">Hover a row to play the easing. Durations drop to 0 when the OS asks for reduced motion.</p><div class="rows">${motionHtml}</div></section>
</main>`;

const pageCss = `
html { background: ${v('color.surface.page')}; }
body { margin: 0; background: ${v('color.surface.page')}; color: ${v('color.text.default')}; font-family: var(--bw-font-family); font-size: var(--bw-font-size-body-md); line-height: var(--bw-font-line-height-body-md); padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 0 48px; }
code { font-family: var(--bw-font-family-mono); font-size: 12px; color: ${v('color.text.subtle')}; overflow-wrap: anywhere; }
.muted { color: ${v('color.text.subtlest')}; font-size: var(--bw-font-size-caption-md); }
.num { font-variant-numeric: tabular-nums; font-size: var(--bw-font-size-caption-md); color: ${v('color.text.subtle')}; }
.lead { max-width: 70ch; font-size: var(--bw-font-size-body-sm); }
.top { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 10; display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: center; justify-content: space-between; padding-block: 16px; margin-bottom: 24px; background: ${v('color.surface.page')}; border-bottom: 1px solid ${v('color.border.subtle')}; }
.brand { display: flex; gap: 10px; align-items: center; }
.logo { width: 46px; height: 46px; border-radius: ${v('radius.lg')}; background: ${v('color.background.brand.default')}; color: ${v('color.text.on.brand')}; display: grid; place-items: center; flex: none; }
.brand-name { font-size: var(--bw-font-size-heading-md); line-height: var(--bw-font-line-height-heading-md); font-weight: 600; color: ${v('color.text.default')}; }
.brand-sub { font-size: var(--bw-font-size-caption-md); color: ${v('color.text.subtlest')}; }
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 40px; }
.seg-group { display: flex; align-items: center; gap: 14px; }
.seg-label { font-size: var(--bw-font-size-body-md); color: ${v('color.text.subtle')}; font-weight: 500; }
.seg { display: inline-flex; gap: 4px; padding: 4px; border-radius: ${v('radius.lg')}; background: ${v('color.background.neutral.default')}; }
.seg-opt { position: relative; }
.seg-opt input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.seg-opt span { display: block; padding: 8px 16px; min-height: 24px; border-radius: ${v('radius.md')}; font-size: var(--bw-font-size-label-lg); line-height: 24px; color: ${v('color.text.subtlest')}; transition: background var(--bw-motion-duration-sm) var(--bw-motion-easing-standard), color var(--bw-motion-duration-sm) var(--bw-motion-easing-standard); }
.seg-opt span[lang="ar"] { font-family: var(--bw-font-family-ar); }
.seg-opt:hover span { color: ${v('color.text.default')}; }
.seg-opt input:checked + span { background: ${v('color.surface.default')}; color: ${v('color.text.role.brand')}; font-weight: 500; box-shadow: inset 0 0 0 1px ${v('color.border.default')}, var(--bw-elevation-1); }
.seg-opt input:focus-visible + span { outline: var(--bw-border-width-focus) solid ${v('color.border.focus')}; outline-offset: var(--bw-border-focus-offset); }
.menu { position: relative; }
.menu-btn { width: 44px; height: 44px; display: grid; place-items: center; border: 0; border-radius: ${v('radius.lg')}; background: ${v('color.background.neutral.default')}; color: ${v('color.icon.default')}; cursor: pointer; }
.menu-btn:hover { background: ${v('color.background.neutral.hovered')}; }
.menu-btn[aria-expanded="true"] { background: ${v('color.background.brand.default')}; color: ${v('color.icon.on.brand')}; }
.menu-btn:focus-visible, a:focus-visible { outline: var(--bw-border-width-focus) solid ${v('color.border.focus')}; outline-offset: var(--bw-border-focus-offset); }
.menu-list { position: absolute; inset-inline-end: 0; top: calc(100% + 8px); min-width: 220px; padding: 6px; display: grid; gap: 2px; background: ${v('color.surface.raised')}; border: 1px solid ${v('color.border.subtle')}; border-radius: ${v('radius.xl')}; box-shadow: var(--bw-elevation-3); z-index: 20; }
.menu-list[hidden] { display: none; }
.menu-list a { display: flex; gap: 12px; align-items: center; padding: 10px 12px; border-radius: ${v('radius.md')}; color: ${v('color.text.default')}; text-decoration: none; font-size: var(--bw-font-size-label-lg); }
.menu-list a:hover, .menu-list a.active { background: ${v('color.background.brand.subtle')}; color: ${v('color.text.role.brand')}; }
.menu-num { font-variant-numeric: tabular-nums; font-size: var(--bw-font-size-caption-md); color: ${v('color.text.subtlest')}; min-width: 18px; }
section { scroll-margin-top: 120px; }
@media (max-width: 1100px) { .controls { gap: 12px 20px; } .seg-label { display: none; } }
@media (max-width: 560px) { .top { position: static; } .controls { width: 100%; } .seg-opt span { padding: 6px 10px; } .menu { margin-inline-start: auto; } }
main { display: grid; gap: 48px; max-width: 1280px; }
section { min-width: 0; }
h2 { margin: 0 0 8px; text-wrap: balance; }
h3 { margin: 24px 0 12px; font-size: var(--bw-font-size-label-lg); text-transform: uppercase; letter-spacing: .06em; color: ${v('color.text.subtlest')}; }
:lang(ar) h3 { letter-spacing: 0; }
.grid { display: grid; gap: 12px; }
.sw-grid { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
.sw { display: flex; gap: 12px; align-items: flex-start; background: ${v('color.surface.default')}; border: 1px solid ${v('color.border.subtle')}; border-radius: ${v('radius.lg')}; padding: 10px; min-width: 0; }
.chip { flex: none; width: 52px; height: 52px; border-radius: ${v('radius.md')}; border: 1px solid ${v('color.border.default')}; display: grid; place-items: center; position: relative; background-image: linear-gradient(45deg, transparent 0 0); }
.dot { position: absolute; inset-inline-end: 6px; bottom: 6px; width: 8px; height: 8px; border-radius: 50%; }
.meta { min-width: 0; display: grid; gap: 4px; }
.vals { display: grid; font-size: 11px; color: ${v('color.text.subtlest')}; font-variant-numeric: tabular-nums; }
.cr { font-size: 11px; color: ${v('color.text.role.success')}; }
.ramp { display: grid; gap: 6px; margin-bottom: 14px; }
.ramp-name { font-size: var(--bw-font-size-label-md); font-weight: 600; text-transform: capitalize; }
.ramp-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); border-radius: ${v('radius.lg')}; overflow: hidden; }
.step { padding: 10px 8px; display: grid; gap: 2px; font-size: 11px; font-variant-numeric: tabular-nums; }
.scroll { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; background: ${v('color.surface.default')}; border: 1px solid ${v('color.border.default')}; border-radius: ${v('radius.lg')}; overflow: hidden; }
th, td { text-align: start; padding: 10px 12px; border-bottom: 1px solid ${v('color.border.subtle')}; vertical-align: top; }
th { font-size: var(--bw-font-size-label-sm); color: ${v('color.text.subtlest')}; font-weight: 500; background: ${v('color.surface.subtle')}; }
.type .spec { min-width: 320px; }
.type .spec > div { margin-bottom: 4px; }
.rows { display: grid; gap: 6px; }
.row { display: grid; grid-template-columns: minmax(150px, 220px) 90px 1fr; gap: 12px; align-items: center; min-width: 0; }
.bar { display: block; height: 12px; border-radius: ${v('radius.xxs')}; background: ${v('color.background.secondary.default')}; }
.bar.alt { background: ${v('color.background.brand.subtle')}; border: 1px solid ${v('color.border.brand')}; }
.tiles { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
.tile { display: grid; gap: 6px; justify-items: start; padding: 12px; background: ${v('color.surface.default')}; border: 1px solid ${v('color.border.subtle')}; border-radius: ${v('radius.lg')}; }
.rbox { width: 56px; height: 56px; background: ${v('color.background.brand.subtle')}; border: 2px solid ${v('color.border.brand')}; }
.elev .tile { background: transparent; border: none; }
.ebox { width: 100%; height: 72px; border-radius: ${v('radius.xl')}; background: ${v('color.surface.raised')}; }
.ibox { border-radius: ${v('radius.xs')}; background: ${v('color.icon.role.brand')}; }
.cols { margin: 16px 0 0; }
.cols figcaption { font-size: var(--bw-font-size-caption-md); color: ${v('color.text.subtlest')}; margin-bottom: 6px; }
.cols-frame { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; height: 56px; background: ${v('color.surface.default')}; border: 1px solid ${v('color.border.default')}; border-radius: ${v('radius.md')}; padding-block: 6px; max-width: 100%; }
.cols-frame span { background: ${v('color.background.error.subtle')}; border-radius: 2px; }
.track { position: relative; height: 12px; background: ${v('color.background.neutral.default')}; border-radius: 99px; }
.ball { position: absolute; inset-inline-start: 0; top: 0; width: 12px; height: 12px; border-radius: 50%; background: ${v('color.background.brand.default')}; transition-property: inset-inline-start; transition-duration: 900ms; }
.row:hover .ball { inset-inline-start: calc(100% - 12px); }
@media (max-width: 560px) { .row { grid-template-columns: 1fr auto; } .row .bar, .row .track, .row .muted { grid-column: 1 / -1; } }
`;

const script = `
(function(){
  var root = document.documentElement;
  function radios(name){ return Array.prototype.slice.call(document.querySelectorAll('input[name="' + name + '"]')); }
  function val(name){ var r = radios(name).filter(function(x){ return x.checked; })[0]; return r ? r.value : null; }
  function set(name, v){ radios(name).forEach(function(x){ x.checked = x.value === v; }); }
  set('theme', root.getAttribute('data-theme') || 'light');
  set('platform', 'web'); set('lang', 'en');
  function apply(){
    var t = val('theme'), l = val('lang');
    if (t === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t);
    root.lang = l; root.dir = l === 'ar' ? 'rtl' : 'ltr';
    root.setAttribute('data-platform', val('platform'));
  }
  ['theme', 'platform', 'lang'].forEach(function(n){ radios(n).forEach(function(x){ x.addEventListener('change', apply); }); });
  apply();
  var btn = document.getElementById('menu-btn'), list = document.getElementById('menu-list');
  function open(o){ list.hidden = !o; btn.setAttribute('aria-expanded', o ? 'true' : 'false'); if (o) { var f = list.querySelector('a'); if (f) f.focus(); } }
  btn.addEventListener('click', function(e){ e.stopPropagation(); open(list.hidden); });
  list.addEventListener('click', function(e){ if (e.target.closest('a')) open(false); });
  document.addEventListener('click', function(e){ if (!list.hidden && !e.target.closest('.menu')) open(false); });
  document.addEventListener('keydown', function(e){
    if (list.hidden) return;
    var links = Array.prototype.slice.call(list.querySelectorAll('a')), i = links.indexOf(document.activeElement);
    if (e.key === 'Escape') { open(false); btn.focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
  });
  // highlight the section in view
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){ entries.forEach(function(en){ if (en.isIntersecting) { list.querySelectorAll('a').forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); }); } }); }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section').forEach(function(sct){ io.observe(sct); });
  }
})();`;

const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap">';
const head = `<title>Biowave Foundations</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${fonts}\n<style>\n${css}\n${pageCss}\n</style>\n`;
const bodyPart = `${body}\n<script>${script}</script>\n`;
const inner = head + bodyPart;
writeFile(path.join(FOUNDATIONS, 'preview/index.html'), `<!doctype html>\n<html lang="en" dir="ltr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head}</head>\n<body>\n${bodyPart}</body>\n</html>\n`);
if (process.env.PREVIEW_FRAGMENT) writeFile(process.env.PREVIEW_FRAGMENT, inner);
console.log('✓ preview: 2-foundations/preview/index.html');
