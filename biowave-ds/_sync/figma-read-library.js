// READ-ONLY Figma Plugin API script — run with use_figma. Builds the Figma library index (keys) that the
// Figma contracts need, so the Figma Agent imports by key instead of searching by name.
//
//   1. In the FOUNDATIONS file, once per PART ('variables', 'styles', 'components'); save each output.
//   2. In ONE COMPONENT file (Web, Tablet or Mobile) with PART = 'reach' — proves the library is enabled there.
//   3. npm run sync:library -- <dump-variables> <dump-styles> <dump-components> <dump-reach>
//
// Lines:  V|collection|name|key|type|scopes|webSyntax|hidden   T|name|key   E|name|key   P|name|key   G|name|key
//         C|page|name|key|kind   R|library|collections|variables|libraryKey   F|file|part
const PART = /*__PART__*/'variables';
const LIBRARY = 'Biowave DS — Foundations';
const COMPONENT_PAGES = /Doc Kit|Icon/i; // components the contracts can reference: Doc Kit + icons
const out = [`F|${figma.root.name}|${PART}`];
const clean = (s) => String(s ?? '').replace(/[|\n]/g, ' ');

if (PART === 'variables') {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  for (const c of cols) for (const id of c.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (!v || v.name.startsWith('_deprecated/')) continue;
    out.push(['V', clean(c.name), clean(v.name), v.key, v.resolvedType, (v.scopes || []).join(','), clean(v.codeSyntax?.WEB), v.hiddenFromPublishing ? 1 : 0].join('|'));
  }
} else if (PART === 'styles') {
  for (const s of await figma.getLocalTextStylesAsync()) out.push(`T|${clean(s.name)}|${s.key}`);
  for (const s of await figma.getLocalEffectStylesAsync()) out.push(`E|${clean(s.name)}|${s.key}`);
  for (const s of await figma.getLocalPaintStylesAsync()) out.push(`P|${clean(s.name)}|${s.key}`);
  for (const s of await figma.getLocalGridStylesAsync()) out.push(`G|${clean(s.name)}|${s.key}`);
} else if (PART === 'components') {
  await figma.loadAllPagesAsync();
  for (const page of figma.root.children.filter((p) => COMPONENT_PAGES.test(p.name))) {
    for (const n of page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })) {
      if (n.type === 'COMPONENT' && n.parent?.type === 'COMPONENT_SET') continue; // variants come with their set
      out.push(`C|${clean(page.name)}|${clean(n.name)}|${n.key}|${n.type}`);
    }
  }
} else if (PART === 'reach') {
  const libs = (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter((c) => c.libraryName === LIBRARY);
  let n = 0;
  for (const c of libs) n += (await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)).length;
  out.push(`R|${LIBRARY}|${libs.length}|${n}|`);
}
return out.join('\n');
