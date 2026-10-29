// Build all platform outputs from 2-foundations/tokens.
//   node 2-foundations/scripts/build.mjs
// Outputs (all generated, never edit by hand):
//   2-foundations/web/src/generated/tokens.css    CSS custom properties (themes, platforms, locales)
//   2-foundations/web/src/generated/tokens.ts     Typed raw values + CSS var references
//   2-foundations/flutter/lib/src/generated/bw_tokens.g.dart
//   2-foundations/dist/tokens.json                Flat resolved values for every mode (for docs & agents)
import path from 'node:path';
import { loadAll, THEMES, PLATFORMS, LOCALES, FOUNDATIONS, isPrimitive, px, colorHex, colorCss, kebab, camel, writeFile, HEADER } from './lib/tokens.mjs';
import { runChecks } from './check.mjs';

const all = loadAll();
const semantic = (map) => [...map.values()].filter((t) => !isPrimitive(t.path.join('.')));
const PREFIX = 'bw';
const cssName = (p) => `--${PREFIX}-${kebab(p)}`;

// ---------------------------------------------------------------- CSS value serialisation
function cssValue(t) {
  switch (t.type) {
    case 'color': return colorCss(t.value);
    case 'dimension': return `${px(t.value)}px`;
    case 'duration': return `${px(t.value)}ms`;
    case 'cubicBezier': return `cubic-bezier(${t.value.join(', ')})`;
    case 'fontFamily': return t.value.map((f) => (/\s/.test(f) && !f.includes('-apple') ? `"${f}"` : f)).join(', ');
    case 'fontWeight': case 'number': return String(t.value);
    case 'shadow': return t.value.map((s) => `${s.inset ? 'inset ' : ''}${px(s.offsetX)}px ${px(s.offsetY)}px ${px(s.blur)}px ${px(s.spread)}px ${colorCss(s.color)}`).join(', ');
    default: throw new Error(`No CSS serialiser for type ${t.type} (${t.path.join('.')})`);
  }
}
const decls = (tokens, indent = '  ') => tokens.map((t) => `${indent}${cssName(t.path)}: ${cssValue(t)};`).join('\n');

// Split platform tokens: locale-specific line-height / letter-spacing get indirection so :lang(ar) can swap them.
function platformDecls(map, indent) {
  const lines = [];
  for (const t of semantic(map)) {
    const p = t.path;
    if (p[0] !== 'platform') continue;
    const rest = p.slice(1);
    lines.push(`${indent}${cssName(rest)}: ${cssValue(t)};`); // e.g. --bw-font-line-height-en-body-md
  }
  return lines.join('\n');
}

const base = semantic(all.base);
const themeTokens = (t) => semantic(all.theme[t]).filter((x) => ['color', 'elevation', 'shadow'].includes(x.path[0]) && x.path[1] !== 'external');
const roles = [...new Set(semantic(all.platform.web).filter((t) => t.path[1] === 'font' && t.path[2] === 'size').map((t) => t.path.slice(3).join('-')))];

let css = `/* ${HEADER} */
/* Usage: import once at the app root. Theme: <html data-theme="light|dark"> (default follows the OS).
   Locale: <html lang="ar" dir="rtl">. Platform: <html data-platform="web|tablet|mobile"> forces a scale;
   otherwise grid/layout follow the viewport and the type scale stays "web". */

:root {
${decls(base)}
  /* Active font family + locale-aware type metrics (see :lang(ar) below) */
  --bw-font-family: var(--bw-font-family-en);
${roles.map((r) => `  --bw-font-line-height-${r}: var(--bw-font-line-height-en-${r});`).join('\n')}
  --bw-font-letter-spacing-display: var(--bw-font-letter-spacing-en-display);
  --bw-font-letter-spacing-default: var(--bw-font-letter-spacing-en-default);
}
:lang(ar) {
  --bw-font-family: var(--bw-font-family-ar);
${roles.map((r) => `  --bw-font-line-height-${r}: var(--bw-font-line-height-ar-${r});`).join('\n')}
  --bw-font-letter-spacing-display: var(--bw-font-letter-spacing-ar-default);
  --bw-font-letter-spacing-default: var(--bw-font-letter-spacing-ar-default);
}

/* ---------- Themes ---------- */
:root, [data-theme="light"] {
  color-scheme: light;
${decls(themeTokens('light'))}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
${decls(themeTokens('dark'), '    ')}
  }
}
[data-theme="dark"] {
  color-scheme: dark;
${decls(themeTokens('dark'))}
}

/* ---------- Platforms ---------- */
:root, [data-platform="web"] {
${platformDecls(all.platform.web, '  ')}
}
/* Viewport-driven layout (grid, margins, app bar) when no platform is forced. Type scale stays web. */
@media (max-width: ${px(all.platform.tablet.get('platform.breakpoint.max').value)}px) {
  :root:not([data-platform]) {
${platformDecls(all.platform.tablet, '    ').split('\n').filter((l) => !l.includes('-font-')).join('\n')}
  }
}
@media (max-width: ${px(all.platform.mobile.get('platform.breakpoint.max').value)}px) {
  :root:not([data-platform]) {
${platformDecls(all.platform.mobile, '    ').split('\n').filter((l) => !l.includes('-font-')).join('\n')}
  }
}
[data-platform="tablet"] {
${platformDecls(all.platform.tablet, '  ')}
}
[data-platform="mobile"] {
${platformDecls(all.platform.mobile, '  ')}
}

/* ---------- Typography utility classes ---------- */
${roles.map((r) => `.bw-text-${r} { font-family: ${r.startsWith('code') ? 'var(--bw-font-family-mono)' : 'var(--bw-font-family)'};${r.startsWith('data') || r.startsWith('code') ? ' font-variant-numeric: tabular-nums;' : ''} font-size: var(--bw-font-size-${r}); line-height: var(--bw-font-line-height-${r}); font-weight: var(--bw-font-weight-${r.split('-')[0]}); letter-spacing: var(--bw-font-letter-spacing-${r.startsWith('display') ? 'display' : 'default'}); }`).join('\n')}

/* ---------- Motion safety ---------- */
@media (prefers-reduced-motion: reduce) {
  :root { ${['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((k) => `--bw-motion-duration-${k}: 0ms;`).join(' ')} }
}
`;
writeFile(path.join(FOUNDATIONS, 'web/src/generated/tokens.css'), css);

// ---------------------------------------------------------------- TypeScript
function tsRaw(t) {
  switch (t.type) {
    case 'color': return JSON.stringify(colorHex(t.value));
    case 'dimension': case 'duration': return String(px(t.value));
    case 'cubicBezier': return `[${t.value.join(', ')}] as const`;
    case 'fontFamily': return JSON.stringify(t.value);
    case 'shadow': return JSON.stringify(cssValue(t));
    default: return JSON.stringify(t.value);
  }
}
function nest(entries, valueOf) {
  const root = {};
  for (const t of entries) {
    let n = root;
    t.path.slice(0, -1).forEach((k) => (n = n[k] ??= {}));
    n[t.path.at(-1)] = valueOf(t);
  }
  const ser = (o, d) => `{\n${Object.entries(o).map(([k, v]) => `${'  '.repeat(d + 1)}${/^[a-zA-Z_]\w*$/.test(k) ? k : JSON.stringify(k)}: ${typeof v === 'string' ? v : ser(v, d + 1)}`).join(',\n')}\n${'  '.repeat(d)}}`;
  return ser(root, 0);
}
const strip = (t, n) => ({ ...t, path: t.path.slice(n) });
let ts = `// ${HEADER}
/** Raw resolved values (numbers are px / ms). Prefer \`cssVars\` in styles so themes and locales switch at runtime. */
export const base = ${nest(base, tsRaw)} as const;

export const themes = {
${THEMES.map((th) => `  ${th}: ${nest(themeTokens(th), tsRaw).replace(/\n/g, '\n  ')}`).join(',\n')}
} as const;

export const platforms = {
${PLATFORMS.map((p) => `  ${p}: ${nest(semantic(all.platform[p]).filter((t) => t.path[0] === 'platform').map((t) => strip(t, 1)), tsRaw).replace(/\n/g, '\n  ')}`).join(',\n')}
} as const;

/** CSS custom property references, e.g. cssVars.color.background.brand.default -> "var(--bw-color-background-brand-default)". */
export const cssVars = ${nest([
  ...base, ...themeTokens('light'),
  ...semantic(all.platform.web).filter((t) => t.path[0] === 'platform' && !['line-height', 'letter-spacing'].includes(t.path[2])).map((t) => strip(t, 1)),
  ...roles.map((r) => ({ path: ['font', 'line-height', ...r.split('-')], type: 'dimension' })),
  { path: ['font', 'family', 'active'], type: 'x' },
], (t) => JSON.stringify(t.path[2] === 'active' ? 'var(--bw-font-family)' : `var(${cssName(t.path)})`))} as const;

export type ThemeName = ${THEMES.map((t) => `'${t}'`).join(' | ')};
export type PlatformName = ${PLATFORMS.map((t) => `'${t}'`).join(' | ')};
export type LocaleName = ${LOCALES.map((t) => `'${t}'`).join(' | ')};
export type TypeRole = ${roles.map((r) => `'${r}'`).join(' | ')};
export const typeRoles: readonly TypeRole[] = ${JSON.stringify(roles)};
`;
writeFile(path.join(FOUNDATIONS, 'web/src/generated/tokens.ts'), ts);

// ---------------------------------------------------------------- Dart
const dartColor = (v) => `Color(0x${(() => { const h = colorHex(v).slice(1); return h.length === 8 ? h.slice(6) + h.slice(0, 6) : 'FF' + h; })()})`;
const dartId = (parts) => camel(parts.map((s) => s.replace(/^(\d+)xl$/, 'xl$1').replace(/^(\d+)xs$/, 'xs$1')));
const dartShadow = (t) => `[${t.value.filter((s) => !s.inset).map((s) => `BoxShadow(color: ${dartColor(s.color)}, offset: Offset(${px(s.offsetX)}, ${px(s.offsetY)}), blurRadius: ${px(s.blur)}, spreadRadius: ${px(s.spread)})`).join(', ')}]`;

const colorTokens = (th) => themeTokens(th).filter((t) => t.path[0] === 'color');
const colorFields = colorTokens('light').map((t) => ({ id: dartId(t.path.slice(1)), key: t.path.join('.'), desc: t.description }));
const elevFields = themeTokens('light').filter((t) => t.path[0] !== 'color').map((t) => ({ id: dartId(t.path), key: t.path.join('.') }));
const dartPlatforms = ['tablet', 'mobile'];

const consts = (cls, doc, filter, mapVal, strip = 1, src = base) => {
  const ts = src.filter(filter);
  return `/// ${doc}\nabstract final class ${cls} {\n${ts.map((t) => `${t.description ? `  /// ${t.description.replace(/\n/g, ' ')}\n` : ''}  static const ${mapVal(t).type} ${dartId(t.path.slice(strip))} = ${mapVal(t).v};`).join('\n')}\n}\n`;
};
const num = (t) => ({ type: 'double', v: `${px(t.value)}` });

let dart = `// ${HEADER}
// ignore_for_file: constant_identifier_names, lines_longer_than_80_chars
import 'package:flutter/material.dart';

${consts('BwPalette', 'Primitive palette. Do not use in components; use [BwColors] via context.', (t) => t.path[0] === 'primitive' && t.path[1] === 'color', (t) => ({ type: 'Color', v: dartColor(t.value) }), 2, [...all.base.values()])}
${consts('BwSpacing', 'Spacing scale (logical pixels).', (t) => t.path[0] === 'spacing', num)}
${consts('BwRadius', 'Corner radius scale (logical pixels).', (t) => t.path[0] === 'radius', num)}
${consts('BwBorder', 'Border widths and focus offset (logical pixels).', (t) => t.path[0] === 'border', num)}
${consts('BwSize', 'Container max-widths and icon sizes (logical pixels).', (t) => t.path[0] === 'size', num)}
${consts('BwDuration', 'Motion durations.', (t) => t.path[0] === 'motion' && t.path[1] === 'duration', (t) => ({ type: 'Duration', v: `Duration(milliseconds: ${px(t.value)})` }), 2)}
${consts('BwEasing', 'Motion easing curves.', (t) => t.path[0] === 'motion' && t.path[1] === 'easing', (t) => ({ type: 'Cubic', v: `Cubic(${t.value.join(', ')})` }), 2)}
${consts('BwExternalColors', 'Third-party brand colors (never themed).', (t) => t.path[0] === 'color' && t.path[1] === 'external', (t) => ({ type: 'Color', v: dartColor(t.value) }), 2)}
/// Font families. Bundle the fonts in the app's pubspec.yaml under these family names.
abstract final class BwFontFamily {
  static const String en = ${JSON.stringify(all.base.get('primitive.font.family.en').value[0])};
  static const String ar = ${JSON.stringify(all.base.get('primitive.font.family.ar').value[0])};
  static const String mono = ${JSON.stringify(all.base.get('primitive.font.family.mono').value[0])};
  static const List<String> arFallback = ${JSON.stringify(all.base.get('primitive.font.family.ar').value.slice(1, 2))};
}

/// Semantic colors for one theme. Read with \`BwColors.of(context)\`.
@immutable
class BwColors extends ThemeExtension<BwColors> {
  const BwColors({
${colorFields.map((f) => `    required this.${f.id},`).join('\n')}
  });

${colorFields.map((f) => `${f.desc ? `  /// ${f.desc.replace(/\n/g, ' ')}\n` : ''}  final Color ${f.id};`).join('\n')}

${THEMES.map((th) => `  static const ${th} = BwColors(\n${colorTokens(th).map((t) => `    ${dartId(t.path.slice(1))}: ${dartColor(t.value)},`).join('\n')}\n  );`).join('\n\n')}

  static BwColors of(BuildContext context) => Theme.of(context).extension<BwColors>()!;

  @override
  BwColors copyWith(${colorFields.map((f) => `Color? ${f.id}`).join(', ').replace(/^/, '{').replace(/$/, '}')}) => BwColors(
${colorFields.map((f) => `    ${f.id}: ${f.id} ?? this.${f.id},`).join('\n')}
  );

  @override
  BwColors lerp(ThemeExtension<BwColors>? other, double t) {
    if (other is! BwColors) return this;
    return BwColors(
${colorFields.map((f) => `      ${f.id}: Color.lerp(${f.id}, other.${f.id}, t)!,`).join('\n')}
    );
  }
}

/// Elevation shadows for one theme. Read with \`BwElevation.of(context)\`.
@immutable
class BwElevation extends ThemeExtension<BwElevation> {
  const BwElevation({${elevFields.map((f) => `required this.${f.id}`).join(', ')}});
${elevFields.map((f) => `  final List<BoxShadow> ${f.id};`).join('\n')}

${THEMES.map((th) => `  static const ${th} = BwElevation(\n${themeTokens(th).filter((t) => t.path[0] !== 'color').map((t) => `    ${dartId(t.path)}: ${dartShadow(t)},`).join('\n')}\n  );`).join('\n\n')}

  static BwElevation of(BuildContext context) => Theme.of(context).extension<BwElevation>()!;

  @override
  BwElevation copyWith() => this;

  @override
  BwElevation lerp(ThemeExtension<BwElevation>? other, double t) => t < 0.5 ? this : (other as BwElevation? ?? this);
}
`;

// Typography + layout per platform/locale
const typeIds = roles.map((r) => ({ r, id: dartId(r.split('-')) }));
dart += `
/// Type scale for one platform + locale. Read with \`BwTextStyles.of(context)\`.
/// Colors are not set here: apply \`BwColors\` (e.g. style.copyWith(color: colors.textDefault)).
@immutable
class BwTextStyles extends ThemeExtension<BwTextStyles> {
  const BwTextStyles({${typeIds.map((x) => `required this.${x.id}`).join(', ')}});
${typeIds.map((x) => `  final TextStyle ${x.id};`).join('\n')}

${dartPlatforms.flatMap((p) => LOCALES.map((loc) => {
  const m = all.platform[p];
  const famOf = (role) => (role === 'code' ? 'BwFontFamily.mono' : loc === 'en' ? 'BwFontFamily.en' : 'BwFontFamily.ar');
  return `  static const ${p}${loc === 'en' ? 'En' : 'Ar'} = BwTextStyles(\n${typeIds.map(({ r, id }) => {
    const [role, size] = r.split('-');
    const fs = px(m.get(`platform.font.size.${role}.${size}`).value);
    const lh = px(m.get(`platform.font.line-height.${loc}.${role}.${size}`).value);
    const w = m.get(`platform.font.weight.${role}`).value;
    const ls = loc === 'en' && role === 'display' ? px(m.get('platform.font.letter-spacing.en.display').value) : 0;
    return `    ${id}: TextStyle(fontFamily: ${famOf(role)}${loc === 'ar' && role !== 'code' ? ', fontFamilyFallback: BwFontFamily.arFallback' : ''}, fontSize: ${fs}, height: ${+(lh / fs).toFixed(4)}, fontWeight: FontWeight.w${w}, letterSpacing: ${ls}, leadingDistribution: TextLeadingDistribution.even),`;
  }).join('\n')}\n  );`;
})).join('\n\n')}

  static BwTextStyles of(BuildContext context) => Theme.of(context).extension<BwTextStyles>()!;

  @override
  BwTextStyles copyWith() => this;

  @override
  BwTextStyles lerp(ThemeExtension<BwTextStyles>? other, double t) {
    if (other is! BwTextStyles) return this;
    return BwTextStyles(
${typeIds.map((x) => `      ${x.id}: TextStyle.lerp(${x.id}, other.${x.id}, t)!,`).join('\n')}
    );
  }
}

/// Grid and layout metrics for one platform. Read with \`BwLayout.of(context)\`.
@immutable
class BwLayout extends ThemeExtension<BwLayout> {
  const BwLayout({required this.breakpointMin, this.breakpointMax, required this.columns, required this.gutter, required this.marginFull, required this.marginSidebar, required this.appBarHeight, required this.systemStatusHeight, required this.sidebarStart, required this.sidebarEnd, required this.minTarget, required this.sectionGap, required this.groupGap, required this.stackGap, required this.containerPadding});
  final double breakpointMin;
  final double? breakpointMax;
  final int columns;
  final double gutter;
  final double marginFull;
  final double marginSidebar;
  final double appBarHeight;
  final double systemStatusHeight;
  final double sidebarStart;
  final double sidebarEnd;
  /// Minimum interactive target size.
  final double minTarget;
  /// Layout spacing (spacing-layout-section): vertical gap between page sections.
  final double sectionGap;
  /// Layout spacing (spacing-layout-group): gap between sibling blocks in a section (= gutter).
  final double groupGap;
  /// Layout spacing (spacing-layout-stack): gap between consecutive items in a vertical flow.
  final double stackGap;
  /// Layout spacing (spacing-layout-container): padding from a container's edge to its content.
  final double containerPadding;

${dartPlatforms.map((p) => {
  const g = (k) => px(all.platform[p].get(`platform.${k}`)?.value);
  return `  static const ${p} = BwLayout(breakpointMin: ${g('breakpoint.min')}, breakpointMax: ${g('breakpoint.max') ?? 'null'}, columns: ${g('grid.columns')}, gutter: ${g('grid.gutter')}, marginFull: ${g('grid.margin.full')}, marginSidebar: ${g('grid.margin.sidebar')}, appBarHeight: ${g('layout.height.app-bar')}, systemStatusHeight: ${g('layout.height.system-status')}, sidebarStart: ${g('layout.width.sidebar-start')}, sidebarEnd: ${g('layout.width.sidebar-end')}, minTarget: ${g('target.min')}, sectionGap: ${g('spacing.layout.section')}, groupGap: ${g('spacing.layout.group')}, stackGap: ${g('spacing.layout.stack')}, containerPadding: ${g('spacing.layout.container')});`;
}).join('\n')}

  static BwLayout of(BuildContext context) => Theme.of(context).extension<BwLayout>()!;

  @override
  BwLayout copyWith() => this;

  @override
  BwLayout lerp(ThemeExtension<BwLayout>? other, double t) => t < 0.5 ? this : (other as BwLayout? ?? this);
}
`;
writeFile(path.join(FOUNDATIONS, 'flutter/lib/src/generated/bw_tokens.g.dart'), dart);

// ---------------------------------------------------------------- flat JSON for docs / agents
const flatOut = { base: {}, theme: {}, platform: {} };
const plain = (t) => (t.type === 'color' ? colorHex(t.value) : t.type === 'shadow' ? cssValue(t) : t.type === 'dimension' || t.type === 'duration' ? px(t.value) : t.value);
for (const t of base) flatOut.base[t.path.join('.')] = { type: t.type, value: plain(t), ref: t.ref, description: t.description };
for (const th of THEMES) flatOut.theme[th] = Object.fromEntries(themeTokens(th).map((t) => [t.path.join('.'), { value: plain(t), ref: t.ref }]));
for (const p of PLATFORMS) flatOut.platform[p] = Object.fromEntries(semantic(all.platform[p]).filter((t) => t.path[0] === 'platform').map((t) => [t.path.slice(1).join('.'), plain(t)]));
flatOut.primitive = Object.fromEntries([...all.base.values()].filter((t) => isPrimitive(t.path.join('.'))).map((t) => [t.path.join('.'), plain(t)]));
writeFile(path.join(FOUNDATIONS, 'dist/tokens.json'), JSON.stringify(flatOut, null, 2) + '\n');

console.log(`✓ built: ${base.length} base, ${themeTokens('light').length} theme, ${semantic(all.platform.web).length - base.length} platform tokens`);
const ok = runChecks(all);
if (!ok) process.exitCode = 1;
