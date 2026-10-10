// Jewelry and caps drawn on the avatar. Every worn set is ONE merged, vertex-coloured mesh (a single draw call per player), built from shared geometry
// and cached, so a crowd of dressed players stays cheap. The size of each piece comes from the catalogue (`size`, see server/config/wearables.js):
// bigger and bolder = dearer, monotonic within a slot, capped per slot. Far away the piece is hidden (see Ghosts.update: wearAt).
// Avatar frame (the model in entities.js, before its 0.92 scale): feet y=0, forward +x, shoulders along z, torso top y=1.7, head centre y=2.0 (r 0.27),
// arms at z=+-0.5 (wrist about y=0.95, hand y 0.78 to 0.94), legs at z=+-0.17 (ankle about y=0.12).
import * as THREE from 'three';
import { Builder } from '../sample/builder.js';

const NO = { noAO: true, jit: 0 };
const TOR = (b, R, t, x, y, z, col, o = {}) => b._push(new THREE.TorusGeometry(R, t, 5, 14), x, y, z, col, { ...NO, ...o });
const GEM_COL = (cat, g) => cat.materials[g] ?? cat.materials.diamond;

/** the parts of ONE item, added to builder b. `it` is a catalogue entry, `cat` the catalogue (materials). */
export function buildItem(b, it, cat) {
  const s = it.size, m = cat.materials[it.mat] ?? 0xf2c230, gem = it.gems ? GEM_COL(cat, it.gems) : null, shine = it.shine ? 1 : 0;
  const gemAt = (r, x, y, z) => b.ico(r, x, y, z, gem, { ...NO, detail: 0 });
  switch (it.kind) {
    case 'chain': case 'pendant': {
      const t = 0.016 * s; TOR(b, 0.27, t, 0, 1.72, 0, m, { rx: Math.PI / 2 });          // collar ring lying on the shoulders
      const R = it.kind === 'pendant' ? 0.2 : 0.16; TOR(b, R, t, 0.27, 1.7 - R, 0, m, { ry: Math.PI / 2 }); // front drop (U shape on the chest)
      if (it.kind === 'pendant') { b.ico(0.055 * s, 0.31, 1.42 - 0.03 * s, 0, m, { ...NO, detail: 0 }); if (gem) gemAt(0.032 * s, 0.35, 1.42 - 0.03 * s, 0); }
      if (it.kind === 'chain' && s >= 1.6) for (let i = -2; i <= 2; i++) b.ico(0.028 * s, 0.3, 1.58 - Math.abs(i) * 0.05, i * 0.07, m, { ...NO, detail: 0 }); // chunky links
      break; }
    case 'bracelet': case 'watch': {
      b.box(0.31 + 0.02 * s, 0.05 + 0.025 * s, 0.2 + 0.02 * s, 0, 0.92, 0.5, m, NO);
      if (it.kind === 'watch') { const r = 0.06 * s; b._push(new THREE.CylinderGeometry(r, r, 0.04 * s, 12), 0, 0.99 + 0.0, 0.5 + 0.1 + 0.02 * s, m, { ...NO, rx: Math.PI / 2 }); b._push(new THREE.CylinderGeometry(r * 0.78, r * 0.78, 0.04 * s, 12), 0, 0.99, 0.5 + 0.1 + 0.03 * s, 0xf4f4f0, { ...NO, rx: Math.PI / 2 }); if (gem) for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; gemAt(0.016 * s, 0, 0.99 + Math.cos(a) * r * 0.92, 0.5 + 0.12 + 0.03 * s + Math.sin(a) * 0); } }
      else if (gem) gemAt(0.03 * s, 0, 0.99 + 0.06 * s, 0.5);
      break; }
    case 'stud': case 'hoop': case 'drop': {
      for (const z of [-1, 1]) {
        if (it.kind === 'stud') (gem ? gemAt : (r, x, y, zz) => b.ico(r, x, y, zz, m, { ...NO, detail: 0 }))(0.032 * s, 0, 1.97, z * 0.29);
        else if (it.kind === 'hoop') { TOR(b, 0.05 * s, 0.011 * s, 0, 1.96 - 0.05 * s, z * 0.29, m); if (gem) gemAt(0.016 * s, 0, 1.96 - 0.1 * s, z * 0.3); }
        else { b.ico(0.025 * s, 0, 1.97, z * 0.29, m, { ...NO, detail: 0 }); b.box(0.012 * s, 0.07 * s, 0.012 * s, 0, 1.97 - 0.07 * s, z * 0.29, m, NO); b.ico(0.04 * s, 0, 1.97 - 0.1 * s, z * 0.29, gem ?? m, { ...NO, detail: 0 }); }
      }
      break; }
    case 'ring': {
      const sides = s >= 2.3 ? [-1, 1] : [-1];
      for (const z of sides) { b.box(0.05 + 0.02 * s, 0.17, 0.22, 0.02, 0.78, z * 0.5, m, NO); if (gem) gemAt(0.03 * s, 0.02, 0.96 + 0.015 * s, z * 0.5); else b.box(0.04 * s, 0.03 * s, 0.05 * s, 0.02, 0.94, z * 0.5, m, NO); }
      break; }
    case 'anklet': {
      b.box(0.44 + 0.012 * s, 0.04 + 0.022 * s, 0.38 + 0.012 * s, 0, 0.1, 0.17, m, NO);
      const n = 3 + Math.round(s); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; b.ico(0.02 * s, Math.cos(a) * 0.23, 0.1 + 0.03 * s, 0.17 + Math.sin(a) * 0.2, gem ?? m, { ...NO, detail: 0 }); }
      break; }
    // ---- head: base of every hat is y=2.14 (the hair block of the avatar), centred on the head
    case 'snapback': { b.sphere(0.3 * s, -0.02, 2.16, 0, m, { ...NO, ws: 8, hs: 5, sy: 0.62 }); b.box(0.36 * s, 0.03 * s, 0.4 * s, 0.34 * s, 2.17, 0, 0x2a2a2e, NO); break; }
    case 'fila': { b.cyl(0.23 * s, 0.3 * s, 0.2 * s, 10, -0.02, 2.14, 0, m, NO); b.cyl(0.0, 0.23 * s, 0.07 * s, 10, -0.02, 2.14 + 0.2 * s, 0, m, NO); b.box(0.04, 0.05 * s, 0.6 * s, 0.1, 2.15, 0, 0xe9e2c8, NO); break; }
    case 'bucket': { b.cyl(0.26 * s, 0.31 * s, 0.22 * s, 10, -0.02, 2.14, 0, m, NO); b.cyl(0.38 * s, 0.38 * s, 0.025 * s, 12, -0.02, 2.15, 0, m, NO); break; }
    case 'agbada': { b.cyl(0.3 * s, 0.3 * s, 0.36 * s, 8, -0.02, 2.14, 0, m, NO); for (const z of [-1, 1]) b.cone(0.13 * s, 0.32 * s, 6, -0.02, 2.2, z * 0.36 * s, m, { ...NO, rx: z * 1.2 }); b.box(0.56 * s, 0.06 * s, 0.56 * s, -0.02, 2.14 + 0.36 * s, 0, 0xcfa34a, NO); break; }
    case 'fedora': { b.cyl(0.42 * s, 0.42 * s, 0.03 * s, 14, -0.02, 2.16, 0, m, NO); b.cyl(0.2 * s, 0.26 * s, 0.26 * s, 10, -0.02, 2.18, 0, m, NO); b.cyl(0.265 * s, 0.265 * s, 0.05 * s, 10, -0.02, 2.2, 0, 0xb3202a, NO); break; }
    case 'crown': {
      const r = 0.3 * s, n = s >= 2.4 ? 9 : s >= 2.0 ? 7 : 5, y0 = 2.14; b.cyl(r, r, 0.1 * s, 12, -0.02, y0, 0, m, NO); b.cyl(r * 1.04, r * 1.04, 0.03 * s, 12, -0.02, y0, 0, 0xfff1a8, NO);
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const px = -0.02 + Math.cos(a) * r * 0.92, pz = Math.sin(a) * r * 0.92; b.cone(0.05 * s, 0.24 * s, 5, px, y0 + 0.1 * s, pz, m, NO); b.ico(0.03 * s, px, y0 + 0.34 * s, pz, i % 2 && gem ? gem : 0xfff1a8, { ...NO, detail: 0 }); }
      if (gem) b.ico(0.045 * s, -0.02 + r, y0 + 0.05 * s, 0, gem, { ...NO, detail: 0 });
      break; }
  }
  void shine;
}

const itemGeos = new Map();
function itemGeo(it, cat) {
  const key = `${it.id}`; if (itemGeos.has(key)) return itemGeos.get(key);
  const b = new Builder(7, 0); buildItem(b, it, cat); const g = b.build(); itemGeos.set(key, g); return g;
}
/** surface area of one item at its catalogue size (square model units): a plain number for tests and tuning, grows with size */
export function itemArea(it, cat) {
  const g = itemGeo(it, cat); const p = g.attributes.position; let a = 0; const A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3();
  for (let i = 0; i < p.count; i += 3) { A.fromBufferAttribute(p, i); B.fromBufferAttribute(p, i + 1); C.fromBufferAttribute(p, i + 2); a += B.sub(A).cross(C.sub(A)).length() / 2; } return a;
}
export const itemTriangles = (it, cat) => itemGeo(it, cat).attributes.position.count / 3;
const combos = new Map(); const COMBO_MAX = 48;
const WEAR_MAT = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x2a2308 }); // a little glow so gold and diamonds read as shiny
function comboGeo(items, cat) {
  const key = items.map(i => i.id).join(','); let g = combos.get(key);
  if (!g) { const geos = items.map(it => itemGeo(it, cat)); g = geos.length === 1 ? geos[0] : mergeInto(geos); combos.set(key, g); if (combos.size > COMBO_MAX) { const old = combos.keys().next().value; const og = combos.get(old); combos.delete(old); if (og && !itemGeos.has(old)) og.dispose(); } }
  return g;
}
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const mergeInto = (geos) => mergeGeometries(geos.map(g => { const c = g.clone(); for (const k of Object.keys(c.attributes)) if (!['position', 'normal', 'color', 'uv'].includes(k)) c.deleteAttribute(k); return c; }), false);

/** dress `avatar` (from makeAvatar) in the given item ids using the catalogue. Safe to call every heartbeat: nothing happens unless the set changed. */
export function applyWear(avatar, ids, cat) {
  if (!avatar?.userData?.body || !cat) return; const key = (ids || []).join(',');
  if (avatar.userData.wearKey === key) return; avatar.userData.wearKey = key; const body = avatar.userData.body;
  if (avatar.userData.wearMesh) { body.remove(avatar.userData.wearMesh); avatar.userData.wearMesh = null; }
  const items = (ids || []).map(id => cat.byId[id]).filter(Boolean); if (!items.length) return;
  const m = new THREE.Mesh(comboGeo(items, cat), WEAR_MAT); m.name = 'wear'; m.frustumCulled = true; body.add(m); avatar.userData.wearMesh = m;
}
/** hide the pieces on far-away avatars (detail drops with distance) */
export function wearLod(avatar, visible) { const m = avatar?.userData?.wearMesh; if (m && m.visible !== visible) m.visible = visible; }
/** index the public catalogue (from /api/wearables/catalogue) for applyWear */
export function indexCatalogue(c) { return c ? { ...c, byId: Object.fromEntries(c.items.map(i => [i.id, i])) } : null; }
