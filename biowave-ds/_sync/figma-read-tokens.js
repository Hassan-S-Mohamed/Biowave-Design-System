// READ-ONLY Figma Plugin API script — run with use_figma on a component file (Web / Tablet / Mobile).
// Dumps its component tokens and LINTS the D-13 rule. Save the output to a file, then:
//   npm run sync:verify-tokens -- <web|tablet|mobile> <dump-file>
// Lines: V|collection|variable|Mode=collection::name;…   X|violation
const out = [];
const cols = await figma.variables.getLocalVariableCollectionsAsync();
// names of every variable in the Foundations library — a local variable with one of these names is a copied semantic variable
const FOUNDATION_NAMES = new Set();
for (const lc of (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter((x) => x.libraryName === 'Biowave DS — Foundations'))
  for (const lv of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(lc.key)) FOUNDATION_NAMES.add(lv.name);
if (!FOUNDATION_NAMES.size) out.push('X|library "Biowave DS — Foundations" is not enabled in this file');
for (const c of cols) {
  if (!/^[A-Z][A-Za-z ]* \/ [A-Z][A-Za-z ]*$/.test(c.name)) out.push(`X|collection "${c.name}" is not a component-token collection ("<Component> / <Group>") — semantic and other variables belong in the Foundations file`);
  for (const id of c.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (!v || v.name.startsWith('_deprecated/')) continue;
    if (FOUNDATION_NAMES.has(v.name)) out.push(`X|${c.name} › ${v.name}: same name as a Foundations variable (copied semantic variable) — semantic variables live only in the Foundations file`);
    const vals = [];
    for (const m of c.modes) {
      const val = v.valuesByMode[m.modeId];
      if (!val || val.type !== 'VARIABLE_ALIAS') { out.push(`X|${c.name} › ${v.name} [${m.name}]: raw value — must alias a Foundations semantic variable`); continue; }
      const t = await figma.variables.getVariableByIdAsync(val.id);
      if (!t) { out.push(`X|${c.name} › ${v.name} [${m.name}]: broken alias`); continue; }
      if (!t.remote) { out.push(`X|${c.name} › ${v.name} [${m.name}]: aliases a LOCAL variable "${t.name}" — must alias the Foundations library`); continue; }
      const tc = await figma.variables.getVariableCollectionByIdAsync(t.variableCollectionId);
      const tcn = tc ? tc.name : '?';
      if (tcn === '_Primitive' || /^(Colors|Spacing|Typography)\//.test(t.name) || t.name.startsWith('_deprecated')) out.push(`X|${c.name} › ${v.name} [${m.name}]: aliases ${tcn} › ${t.name} — must alias a SEMANTIC variable`);
      vals.push(`${m.name}=${tcn}::${t.name}`);
    }
    out.push(`V|${c.name}|${v.name}|${vals.join(';')}`);
  }
}
const styles = [...await figma.getLocalPaintStylesAsync(), ...await figma.getLocalTextStylesAsync(), ...await figma.getLocalEffectStylesAsync(), ...await figma.getLocalGridStylesAsync()];
styles.forEach((s) => out.push(`X|local style "${s.name}" — styles live only in the Foundations file`));
return out.join('\n') || '(no local variables or styles)';
