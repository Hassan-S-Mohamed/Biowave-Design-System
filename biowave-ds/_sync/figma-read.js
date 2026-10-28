// READ-ONLY Figma Plugin API script — run with the Figma MCP `use_figma` tool on the Design System file.
// Returns one line per variable: collection|name|web|Mode=value;Mode=value  (aliases resolved).
// Output is capped at ~20 KB per call, so run it once per group and save each result to a file:
//   ONLY = ['1. Themes']          ONLY = ['_Primitive']
//   ONLY = ['2. Radius','3. Spacing','4. Size','5. Typography','7. Grid & Layout','9. Border']
// then: npm run sync:verify -- <file1> <file2> <file3>
const ONLY = ['1. Themes'];
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const byId = new Map(vars.map((v) => [v.id, v]));
const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0').toUpperCase();
const hex = (c) => '#' + h(c.r) + h(c.g) + h(c.b) + (c.a !== undefined && c.a < 0.999 ? h(c.a) : '');
function res(v, modeName, d = 0) {
  const c = cols.find((c) => c.id === v.variableCollectionId);
  const m = c.modes.find((m) => m.name === modeName) || c.modes.find((m) => m.modeId === c.defaultModeId);
  const val = v.valuesByMode[m.modeId];
  if (val && val.type === 'VARIABLE_ALIAS') { const t = byId.get(val.id); return !t || d > 8 ? 'BROKEN' : res(t, modeName, d + 1); }
  if (val && typeof val === 'object' && 'r' in val) return hex(val);
  if (typeof val === 'number') return Math.round(val * 100) / 100;
  return val;
}
const out = [];
for (const c of cols.filter((c) => ONLY.includes(c.name))) {
  for (const id of c.variableIds) {
    const v = byId.get(id);
    if (!v || v.name.startsWith('_deprecated')) continue;
    const web = (v.codeSyntax?.WEB || '').replace(/^var\(--bw-|\)$/g, '');
    // `__hidden=1` marks a variable hidden from publishing (component files cannot use it); verify flags it for semantic tokens
    out.push(`${c.name}|${v.name}|${web}|${c.modes.map((m) => `${m.name}=${res(v, m.name)}`).join(';')}${v.hiddenFromPublishing ? ';__hidden=1' : ''}`);
  }
}
return out.join('\n');
