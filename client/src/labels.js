// Station labels float over each table, board and counter. When stations sit close together the labels piled on top of each other ("Chop Am" over "Whot bench" over "Pair Am"):
// this stacks neighbouring labels at different heights (a pure function, tested) and shortens long text with an ellipsis instead of cutting it mid-word.
export const LABEL = { width: 3.0, depth: 1.5, step: 0.62, maxStack: 3, maxChars: 24 };
export function shortLabel(text, max = LABEL.maxChars) { const t = String(text || '').trim(); if (t.length <= max) return t; const cut = t.slice(0, max - 1); const sp = cut.lastIndexOf(' '); return (sp > max * 0.55 ? cut.slice(0, sp) : cut).replace(/[\s(,:·-]+$/, '') + '…'; }
/** items: [{ x, z, y }] (y = the label's own base height). Returns the height each label should use: labels whose boxes (width x depth on the floor plan) overlap an earlier one are raised in steps, back to front. */
export function declutter(items, opts = {}) {
  const o = { ...LABEL, ...opts }; const order = items.map((it, i) => i).sort((a, b) => items[a].z - items[b].z || items[a].x - items[b].x); const placed = []; const out = items.map(it => it.y);
  for (const i of order) { const it = items[i]; let k = 0; for (const p of placed) if (Math.abs(p.x - it.x) < o.width && Math.abs(p.z - it.z) < o.depth) k = Math.max(k, p.k + 1); k = Math.min(k, o.maxStack); out[i] = it.y + k * o.step; placed.push({ x: it.x, z: it.z, k }); }
  return out;
}
