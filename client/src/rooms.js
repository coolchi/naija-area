// Room kit: every interior (venues, clubs, salons, garage, houses) is built here from small primitives, driven by config data (city JSON `room` specs and balance.housing.types).
// No external assets. Low-poly style. `anim` is a list of fn(t) the host view calls every frame. All sizes/colours are placeholders.
import * as THREE from 'three';
import { makeNameSprite } from './entities.js';
import * as PR from './props.js';
import { Crowd } from './people.js';

const M = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, ...o });
const B = (c) => new THREE.MeshBasicMaterial({ color: c });
export function kit(parent) {
  const box = (w, hh, d, c, x = 0, y = hh / 2, z = 0, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), mat || M(c)); m.position.set(x, y, z); parent.add(m); return m; };
  const cyl = (r, hh, c, x = 0, y = hh / 2, z = 0, seg = 14, mat, r2) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r2 ?? r, r, hh, seg), mat || M(c)); m.position.set(x, y, z); parent.add(m); return m; };
  const sph = (r, c, x, y, z, mat) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat || M(c)); m.position.set(x, y, z); parent.add(m); return m; };
  return { box, cyl, sph };
}
const canvasTex = (draw, repX = 1, repY = 1) => { const c = document.createElement('canvas'); c.width = c.height = 128; draw(c.getContext('2d')); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repX, repY); t.magFilter = THREE.NearestFilter; return t; };
function floorMat(f, w, d) {
  const a = f?.a || '#cdbb98', b = f?.b || a, st = f?.style || 'plain';
  if (st === 'checker' || st === 'dance') return M(0xffffff, { map: canvasTex(g => { g.fillStyle = a; g.fillRect(0, 0, 128, 128); g.fillStyle = b; g.fillRect(0, 0, 64, 64); g.fillRect(64, 64, 64, 64); }, w / 1.6, d / 1.6) });
  if (st === 'planks') return M(0xffffff, { map: canvasTex(g => { for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? a : b; g.fillRect(0, i * 32, 128, 32); g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(0, i * 32, 128, 2); g.fillRect(((i * 53) % 100) + 10, i * 32, 2, 32); } }, w / 2.4, d / 1.2) });
  return M(0xffffff, { color: a, map: PR.surfaces().tile(w / 1.6, d / 1.6) });
}
export const mood = (scene, name, lights) => {
  const P = { warm: [0x2a2118, 1.0, 0xfff0d0], dim: [0x10151f, 0.55, 0xaabbee], neon: [0x140a22, 0.55, 0xffc0ff], work: [0x20252a, 0.95, 0xfff6e0], bright: [0x23303a, 1.15, 0xffffff], club: [0x07050d, 0.32, 0xb78cff], sunset: [0x1e1208, 0.6, 0xffb36b] }[name] || [0x1d2b25, 1.0, 0xffffff];
  scene.background = new THREE.Color(P[0]); lights.hemi.intensity = P[1]; lights.sun.color.set(P[2]); lights.sun.intensity = name === 'club' ? 0.15 : name === 'neon' ? 0.4 : name === 'dim' ? 0.35 : name === 'sunset' ? 0.5 : 1.0;
};

// ---- windows on the venue walls (metres from the centre). big = shop-front glass, blind = slatted blind
function windowAt(parent, wall, at, w, o, R, trim) {
  const hh = o.big ? 2.0 : 1.3, y = o.big ? 0.45 : 1.15; const g = new THREE.Group(); const p = PR.louvre(w, hh, { trim: trim.getHex(), day: o.blind ? 0x1a2433 : 0xbfe6ff }); p.position.y = y; g.add(p);
  if (wall === 'back') g.position.set(at, 0, -R.d / 2 + 0.12); else { g.rotation.y = Math.PI / 2; g.position.set(-R.w / 2 + 0.12, 0, at); }
  parent.add(g);
}
/** floor, walls, trim, windows, door and mood lights of a venue room from its `room` spec */
export function venueShell(scene, R, spec, sign, anim, lights) {
  const sp = spec || {}; const trim = new THREE.Color(sp.trim || sign || '#555');
  const fl = new THREE.Mesh(new THREE.BoxGeometry(R.w, 0.2, R.d), floorMat(sp.floor, R.w, R.d)); fl.position.y = -0.1; scene.add(fl);
  const wallM = M(sp.wall || '#f1e7cf', { map: PR.surfaces().stucco(R.w / 2.4, 1.4) }); const H = 3.4;
  const back = new THREE.Mesh(new THREE.BoxGeometry(R.w, H, 0.2), wallM); back.position.set(0, H / 2, -R.d / 2); const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, H, R.d), wallM); left.position.set(-R.w / 2, H / 2, 0); scene.add(back, left);
  const k = kit(scene); k.box(R.w, 0.5, 0.24, trim, 0, 3.1, -R.d / 2 + 0.02); k.box(0.24, 0.5, R.d, trim, -R.w / 2 + 0.02, 3.1, 0); k.box(R.w, 0.35, 0.22, trim, 0, 0.17, -R.d / 2 + 0.02); k.box(0.22, 0.35, R.d, trim, -R.w / 2 + 0.02, 0.17, 0);
  k.box(R.w + 0.2, 0.3, 0.2, 0x555555, 0, 0.15, R.d / 2 + 0.1); // low front lip (cut-away)
  for (const w of sp.windows || []) windowAt(scene, w.wall, w.at, w.w, w, R, trim);
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.04, 0.4), new THREE.MeshBasicMaterial({ color: 0xffc20e })); door.position.set(0, 0.06, R.d / 2 + 0.1); scene.add(door);
  if (sp.floor?.style === 'dance') { const tiles = []; const cols = [0x7b2cbf, 0x3a86ff, 0xff006e, 0x06d6a0, 0xffbe0b]; for (let ix = 0; ix < 5; ix++) for (let iz = 0; iz < 4; iz++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.05, 0.96), new THREE.MeshBasicMaterial({ color: cols[(ix + iz) % 5] })); m.position.set(-2 + ix, 0.03, -0.7 + iz); scene.add(m); tiles.push(m); } anim.push(t => tiles.forEach((m, i) => m.material.color.setHex(cols[(Math.floor(t * 2) + i + Math.floor(i / 5)) % 5]))); }
  if (sp.mood) mood(scene, sp.mood, lights);
  if (sp.mood !== 'club') { const pl = new THREE.PointLight(0xffe2b0, 0.55, 22); pl.position.set(0, 3.0, 0); scene.add(pl); } // soft warm fill
}

// ---- decor: one function per kind; (x,z) in metres from the room centre
const D = {
  lanterns(g, k, o, R, anim) { const n = 7; for (let i = 0; i < n; i++) { const x = -R.w / 2 + 0.6 + i * (R.w - 1.2) / (n - 1); const m = k.sph(0.16, 0, x, 2.75 + Math.sin(i * 1.3) * 0.08, 0, B(o.c[i % o.c.length])); } k.box(R.w - 0.6, 0.02, 0.02, 0x333333, 0, 2.95, 0); },
  menu(g, k, o) { const s = makeNameSprite(o.text, '#fff3c4'); s.scale.set(3.4, 0.85, 1); s.position.set(0, 2.2, 0.05); g.add(s); },
  pennants(g, k, o, R) { const n = 9; for (let i = 0; i < n; i++) { const x = -R.w / 2 + 0.7 + i * (R.w - 1.4) / (n - 1); const t = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.4, 3), B(o.c[i % o.c.length])); t.position.set(x, 2.65, 0); t.rotation.z = Math.PI; g.add(t); } k.box(R.w - 1, 0.02, 0.02, 0x333333, 0, 2.86, 0); },
  neon(g, k, o, R, anim) { k.box(4.2, 0.9, 0.08, 0x111111, 0, 2.2, 0); const s = makeNameSprite(o.text, o.c || '#ff4fd8'); s.scale.set(4.2, 1.0, 1); s.position.set(0, 2.2, 0.1); g.add(s); const m = k.box(4.4, 0.06, 0.06, 0, 0, 1.7, 0.05, B(o.c || '#ff4fd8')); anim.push(t => { m.material.color.set(o.c || '#ff4fd8').multiplyScalar(0.6 + 0.4 * Math.sin(t * 5)); }); },
  lamp(g, k, o) { k.cyl(0.02, 1.2, 0x333, 0, 3.0); const c = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.4, 14, 1, true), new THREE.MeshBasicMaterial({ color: o.c, side: THREE.DoubleSide })); c.position.y = 2.25; g.add(c); const gl = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, 1.4, 14, 1, true), new THREE.MeshBasicMaterial({ color: o.c, transparent: true, opacity: 0.1, side: THREE.DoubleSide })); gl.position.y = 1.4; g.add(gl); },
  lift(g, k) { for (const s of [-1.5, 1.5]) k.box(0.22, 2.6, 0.3, 0xe07b00, s, 1.3, 0); k.box(3.4, 0.2, 0.35, 0xe07b00, 0, 2.55); k.box(2.6, 0.12, 1.6, 0x444a50, 0, 0.65, 0.7); k.box(0.2, 0.6, 0.2, 0x8a8f95, 0, 0.3, 0.7); },
  hazard(g, k, o) { const n = Math.round((o.w || 6) / 0.6); for (let i = 0; i < n; i++) k.box(0.3, 0.025, o.d || 0.8, i % 2 ? 0xffd60a : 0x222222, -(o.w || 6) / 2 + 0.3 + i * 0.6, 0.015, 0); },
  turntable(g, k, o, R, anim) { const t = k.cyl(1.55, 0.14, 0xdddddd, 0, 0.07, 0, 28); k.cyl(1.6, 0.04, 0xb8322a, 0, 0.16, 0, 28, null, 1.6).scale.set(1, 1, 1); anim.push(tt => { t.rotation.y = tt * 0.15; }); },
  spot(g, k, o) { const c = new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.6, 16, 1, true), new THREE.MeshBasicMaterial({ color: o.c, transparent: true, opacity: 0.1, side: THREE.DoubleSide })); c.position.y = 1.6; c.rotation.x = Math.PI; g.add(c); },
  stage(g, k, o) { k.box(o.w, 0.35, o.d, 0x2b2540, 0, 0.175); k.box(o.w, 0.04, 0.06, 0xff4fd8, 0, 0.37, o.d / 2); },
  rig(g, k, o, R, anim) { k.box(R.w - 1.5, 0.08, 0.08, 0x333, 0, 3.15, -R.d / 2 + 2); const cols = o.warm ? [0xffb703, 0xfb8500, 0xffd166, 0xe76f51] : [0xff006e, 0x3a86ff, 0x06d6a0, 0xffbe0b, 0x8338ec, 0xfb5607]; const cones = cols.map((c, i) => { const co = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.0, 12, 1, true), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.16, side: THREE.DoubleSide })); const piv = new THREE.Group(); piv.position.set(-(R.w - 2.5) / 2 + i * (R.w - 2.5) / (cols.length - 1), 3.1, -R.d / 2 + 2); co.position.y = -1.5; co.rotation.x = Math.PI; piv.add(co); g.add(piv); return piv; }); anim.push(t => cones.forEach((c, i) => { c.rotation.z = Math.sin(t * 1.3 + i) * 0.5; c.rotation.x = Math.cos(t * 0.9 + i * 1.7) * 0.45; })); },
  discoball(g, k, o, R, anim) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), new THREE.MeshLambertMaterial({ color: 0xdddddd, flatShading: true, emissive: 0x444466 })); b.position.y = 2.6; g.add(b); k.cyl(0.015, 0.6, 0x888, 0, 3.2); anim.push(t => { b.rotation.y = t * 1.2; }); },
  rope(g, k, o) { const w = o.w || 2.4; for (const s of [-1, 1]) { k.cyl(0.05, 1.0, 0xd4af37, s * w / 2, 0.5, 0, 8); k.sph(0.09, 0xd4af37, s * w / 2, 1.02, 0); } k.box(w, 0.07, 0.07, 0x9d0208, 0, 0.85, 0); },
  ledstrip(g, k, o, R, anim) { const m1 = k.box(R.w, 0.06, 0.06, 0, 0, 0.8, -R.d / 2 + 0.16, B(o.c)); const m2 = k.box(0.06, 0.06, R.d, 0, -R.w / 2 + 0.16, 0.8, 0, B(o.c)); anim.push(t => { const c = new THREE.Color(o.c).offsetHSL(Math.sin(t * 0.4) * 0.12, 0, 0); m1.material.color.copy(c); m2.material.color.copy(c); }); g.position.set(0, 0, 0); },
  poleSign(g, k, o, R, anim) { const p = k.cyl(0.18, 1.7, 0xffffff, 0, 1.2, 0, 14); const st = new THREE.Group(); st.position.y = 1.2; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.16, 14), M(i % 2 ? 0xd62828 : 0x1d4ed8)); s.position.y = -0.8 + i * 0.28; st.add(s); } g.add(st); k.cyl(0.24, 0.12, 0x888, 0, 2.1); anim.push(t => { st.rotation.y = t * 2; }); void p; },
};

const hx = (c, d) => (c == null ? d : c);
const put = (g, o, x = 0, y = 0, z = 0, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; g.add(o); return o; };
Object.assign(D, {
  shelf(g, k, o) { put(g, PR.bookshelf(2.2, 0.42, 1.9, { c: hx(o.c, 0x8a5a2b), stuff: o.bottles ? 'bottles' : o.pots ? 'pots' : undefined })); },
  fridge(g) { put(g, PR.fridge(0.9, 0.8, 2.0)); },
  stool(g, k, o) { put(g, PR.stool({ c: hx(o.c, 0xe63946) })); },
  table(g, k, o) { put(g, PR.roundTable(0.62, { cloth: hx(o.c, 0xffffff), vase: true })); },
  fan(g, k, o, R, anim) { const f = PR.ceilingFan(); put(g, f, 0, 3.0, 0); anim.push(t => { f.userData.spin.rotation.y = t * 5; }); },
  plant(g, k, o) { put(g, PR.plant({ h: o.h || 1.1, kind: o.kind })); },
  bench(g, k, o) { put(g, PR.bench(o.w || 2.4)); },
  speaker(g, k, o) { put(g, PR.speaker(o.tall ? 2.3 : 1.3)); },
  rug(g, k, o) { put(g, PR.rug(o.w || 3, o.d || 2, o.c ? { a: new THREE.Color(o.c).getHex() } : {})); },
  toolwall(g) { put(g, PR.toolWall(2.4, 1.6), 0, 0.8, 0); },
  tyres(g) { put(g, PR.tyreStack(3)); },
  drum(g, k, o) { put(g, PR.oilDrum(o.c ? new THREE.Color(o.c).getHex() : 0x2e5eaa)); },
  bench2(g) { put(g, PR.workbench(2.4), 0, 0, 0, Math.PI / 2); put(g, PR.toolCart(), 0.0, 0, 1.6, Math.PI / 2); },
  desk(g, k, o) { put(g, PR.desk(1.8, 0.75, {})); put(g, PR.chair({ c: 0x2a9d8f }), 0, 0, -0.8, Math.PI); },
  bar(g, k, o) { const len = o.len || 4; put(g, PR.barCounter(len), 0.0, 0, 0); put(g, PR.backBar(len), -0.7, 0, 0); },
  barstool(g) { put(g, PR.barStool()); },
  sofa(g, k, o) { g.rotation.y = (o.rot || 0) * -Math.PI / 2; put(g, PR.sofa(2.2, 0.95, { c: o.c ? new THREE.Color(o.c).getHex() : 0x9d0208, cushion: 0xffd166 })); },
  mirror(g, k, o) { put(g, PR.mirror(1.6, 1.4, { bulbs: true, frame: 0x3a3a3f }), 0, 0.8, 0); put(g, PR.counter(1.9, 0.5, { c: 0xe9e6e0, top: 0xf4f4f4 }), 0, 0, 0.45); for (let i = 0; i < 3; i++) put(g, PR.tableLamp({ c: [0xe5989b, 0x2a9d8f, 0xf2b705][i] }), -0.6 + i * 0.6, 0.93, 0.4); },
  dryer(g) { put(g, PR.hairDryer()); },
  flag(g, k, o) { put(g, PR.flag(o.w || 1.0, 0.6), 0, o.y ?? 1.9, 0); },
  clock(g, k, o) { put(g, PR.clock(0.22), 0, o.y ?? 2.3, 0); },
  art(g, k, o) { put(g, PR.wallArt(o.w || 0.9, o.h || 0.65, o.kind || 'bars'), 0, o.y ?? 1.6, 0); },
  ac(g, k, o) { put(g, PR.acUnit(), 0, o.y ?? 2.55, 0); },
  window(g, k, o) { put(g, PR.louvre(o.w || 1.2, 1.3, { trim: 0xffffff }), 0, 1.1, 0); },
  curtain(g, k, o) { put(g, PR.curtain(o.w || 1.4, 2.2, { c: o.c ? new THREE.Color(o.c).getHex() : 0xe76f51 }), 0, 0.6, 0); },
  foodCounter(g, k, o) { put(g, PR.foodCounter(o.w || 3.4)); },
  gameTable(g, k, o) { put(g, PR.gameTable(0.95, { c: o.c ? new THREE.Color(o.c).getHex() : 0x2e7d4a })); },
  chair(g, k, o) { put(g, PR.chair({ c: o.c ? new THREE.Color(o.c).getHex() : 0xc0392b }), 0, 0, 0, (o.ry || 0)); },
  coffeeTable(g) { put(g, PR.coffeeTable()); },
  floorLamp(g) { put(g, PR.floorLamp()); },
  tv(g, k, o) { put(g, PR.tvUnit(o.w || 1.8)); },
  waterDispenser(g) { put(g, PR.waterDispenser()); },
  toolCart(g) { put(g, PR.toolCart()); },
  workbench(g) { put(g, PR.workbench(2.4)); },
  generator(g) { put(g, PR.generator()); },
  crowd(g, k, o, R, anim) { // ambient people (same human shape as the street walkers): standing chatters, or dancers on a club floor
    const n = o.n || 4, SC = 0.64, ig = new THREE.Group(); ig.scale.setScalar(SC); g.add(ig); const cr = new Crowd(ig, n, o.seed || 3); cr.parts && Object.values(cr.parts).forEach(m => { m.frustumCulled = false; });
    const at = (i) => { const a = i / n * Math.PI * 2 + (o.seed || 0); const rr = (o.r || 1) * (0.55 + 0.45 * ((i * 37) % 10) / 10); return [Math.cos(a) * rr / SC, Math.sin(a) * rr / SC, a]; }; // venue avatars are drawn at about this scale
    anim.push(t => { for (let i = 0; i < n; i++) { const [x, z, a] = at(i); if (o.dance) cr.pose(i, x, 0.04 + Math.abs(Math.sin(t * 5 + i)) * 0.07, z, a + Math.PI + Math.sin(t * 1.3 + i) * 0.6, t * 5.5 + i * 1.7, 0.45); else cr.pose(i, x, 0, z, (o.yaw ?? 0) + Math.sin(t * 0.4 + i) * 0.3 + (i % 2 ? 0.6 : -0.6), 0, 0); } cr.commit(); });
  },
});
export function decorate(parent, list, R, anim) {
  for (const o of list || []) { const fn = D[o.k]; if (!fn) continue; const g = new THREE.Group(); const k = kit(g); g.position.set(o.x || 0, 0, o.z || 0); g.rotation.y = o.ry || 0; if (o.k === 'lanterns' || o.k === 'pennants') g.position.x = 0; fn(g, k, o, R, anim); parent.add(g); }
}

// ---- extra station models (club, salon). Return true when handled.
export function stationModel(st, grp, anim) {
  const k = kit(grp); const col = new THREE.Color(st.color || '#888');
  if (st.type === 'dance') { const r = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.55, 28), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })); r.rotation.x = -Math.PI / 2; r.position.y = 0.07; grp.add(r); anim.push(t => { r.scale.setScalar(1 + 0.25 * Math.sin(t * 4)); }); return true; }
  if (st.type === 'dj') { put(grp, PR.djBooth(3.2)); const recs = [-0.9, 0.9].map(x => { const d = k.cyl(0.34, 0.04, 0x111, x, 1.12, 0.05, 20); k.cyl(0.1, 0.05, 0xff4fd8, x, 1.15, 0.05, 10); k.box(0.05, 0.03, 0.25, 0xffffff, x + 0.14, 1.16, 0.05); return d; }); const led = k.box(3.0, 0.1, 0.03, 0, 0, 0.55, 0.52, B(0xff006e)); anim.push(t => { recs.forEach(r => { r.rotation.y = t * 3; }); led.material.color.setHSL((t * 0.2) % 1, 1, 0.55); }); return true; }
  if (st.type === 'bar') { put(grp, PR.barCounter(3.8, { top: col.getHex(), glow: 0xff4fd8 })); for (let i = 0; i < 4; i++) k.cyl(0.07, 0.2, 0xcfe9f7, 0.1, 1.13, -1.3 + i * 0.85, 8); return true; }
  if (st.type === 'songs') { grp.rotation.y = -Math.PI / 2; k.box(2.6, 2.0, 0.12, 0x10131a, 0, 1.7); k.box(2.8, 0.1, 0.16, 0x333340, 0, 2.72); k.box(2.4, 0.3, 0.14, 0x7b2cbf, 0, 2.5, 0.02); k.box(2.4, 0.04, 0.18, 0xd4af37, 0, 0.72); const cs = [0xff006e, 0x3a86ff, 0x06d6a0, 0xffbe0b, 0x8338ec]; const rows = cs.map((c, i) => k.box(2.0, 0.12, 0.15, c, 0, 2.05 - i * 0.28, 0.02, B(c))); for (const x of [-1.2, 1.2]) k.cyl(0.04, 0.7, 0x333333, x, 0.35, 0, 8); anim.push(t => rows.forEach((r, i) => { r.scale.x = 0.55 + 0.45 * Math.abs(Math.sin(t * 1.5 + i)); })); return true; }
  if (st.type === 'vip') { put(grp, PR.coffeeTable(1.3, 0.7, { c: 0x1a1a1a }), 0, 0, 0); put(grp, PR.sofa(2.0, 0.9, { c: 0x6a040f, cushion: 0xd4af37 }), 0, 0, -0.95); put(grp, PR.sofa(1.4, 0.8, { c: 0x6a040f, cushion: 0xd4af37 }), 1.35, 0, 0.1, -Math.PI / 2); k.cyl(0.05, 0.28, 0xcfe9f7, 0.1, 0.57, 0.1, 8); k.sph(0.12, 0xffd166, -0.3, 0.55, 0, B(0xffd166)); k.cyl(0.1, 0.02, 0xd4af37, 0.3, 0.44, -0.1, 12); return true; }
  if (st.type === 'style') { put(grp, PR.salonChair({ c: col.getHex() }), 0, 0, 0, Math.PI); put(grp, PR.toolCart(), 0.9, 0, -0.5, Math.PI / 2); return true; }
  if (st.type === 'basin') { put(grp, PR.washBasin()); put(grp, PR.salonChair({ c: 0x333338 }), 0, 0, 0.95); return true; }
  return false;
}

// ---- houses: windows, door frame, corridor / veranda and the fixtures of the type (cell coords, CELL metres per cell)
const wmat = new THREE.MeshBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.8 });
export function houseShell(scene, lay, CELL, anim) {
  const W = lay.w * CELL, Dm = lay.d * CELL, k = kit(scene); const T = 0x6b4a2b;
  for (const w of lay.windows || []) {
    if (w.wall === 'right') continue; // the right wall is cut away, a floating window would look wrong
    const ww = w.w * CELL; const g = new THREE.Group(); const p = PR.louvre(ww, 1.3, { trim: 0xffffff }); p.position.y = 1.25; g.add(p);
    if (w.wall === 'back') g.position.set(w.at * CELL, 0, 0.05); else if (w.wall === 'left') { g.rotation.y = Math.PI / 2; g.position.set(0.05, 0, w.at * CELL); } else { g.rotation.y = -Math.PI / 2; g.position.set(W, 0, w.at * CELL); }
    const cu = PR.curtain(ww + 0.7, 2.3, { open: true, c: [0xe76f51, 0x2a9d8f, 0xe9c46a, 0x7b2cbf][Math.abs(Math.round(w.at * 7)) % 4], c2: [0xc0502f, 0x1f7a6e, 0xc9a43a, 0x5b1f8f][Math.abs(Math.round(w.at * 7)) % 4] }); cu.position.set(0, 0.05, 0.1); g.add(cu);
    scene.add(g);
  }
  // right + front walls are cut away: a low rail so the room reads as a box
  k.box(0.14, 0.45, Dm, 0xbdb4a2, W, 0.22, Dm / 2, M(0xbdb4a2, { transparent: true, opacity: 0.55 }));
  const dx = lay.door.x * CELL, dw = lay.door.w * CELL; k.box(dx, 0.45, 0.14, 0xbdb4a2, dx / 2, 0.22, Dm, M(0xbdb4a2, { transparent: true, opacity: 0.55 })); k.box(W - dx - dw, 0.45, 0.14, 0xbdb4a2, dx + dw + (W - dx - dw) / 2, 0.22, Dm, M(0xbdb4a2, { transparent: true, opacity: 0.55 }));
  k.box(0.14, 2.4, 0.14, T, dx, 1.2, Dm); k.box(0.14, 2.4, 0.14, T, dx + dw, 1.2, Dm); k.box(dw + 0.14, 0.14, 0.16, T, dx + dw / 2, 2.4, Dm);
  const piv = new THREE.Group(); piv.position.set(dx, 0, Dm); const lf = new THREE.Mesh(new THREE.BoxGeometry(dw * 0.92, 2.3, 0.07), M(0x8a5a2b)); lf.position.set(dw * 0.46, 1.15, 0); piv.add(lf); piv.rotation.y = 1.0; scene.add(piv);
  if (lay.corridor) { const cd = lay.corridor.depth * CELL; k.box(W + 0.6, 0.12, cd, 0x8d8d8a, W / 2, -0.06, Dm + cd / 2); k.box(W + 0.6, 0.5, 0.14, 0x777, W / 2, 0.25, Dm + cd); for (let i = 0; i < lay.corridor.doors; i++) { const x = (i + 0.5) * W / lay.corridor.doors; k.box(0.9, 0.04, 0.6, [0xc1121f, 0x2a9d8f, 0xe9c46a, 0x457b9d][i % 4], x, 0.02, Dm + cd - 0.5); } const s = makeNameSprite('Shared corridor', '#d9d9d9'); s.scale.set(3.6, 0.9, 1); s.position.set(W / 2, 1.2, Dm + cd * 0.55); scene.add(s); }
  if (lay.veranda) { const vd = 1.6 * CELL / 1.4; k.box(dw + 2.6, 0.14, vd, 0xc9b79c, dx + dw / 2, -0.05, Dm + vd / 2); for (const s of [-1, 1]) k.cyl(0.1, 2.5, 0xf5f0e6, dx + dw / 2 + s * (dw / 2 + 1.1), 1.25, Dm + vd - 0.2, 8); k.box(dw + 2.8, 0.1, 0.2, 0x8d6e4f, dx + dw / 2, 2.55, Dm + vd - 0.2); }
  for (const f of lay.fixtures || []) { const g = new THREE.Group(); const kk = kit(g); const fw = f.w * CELL, fd = f.d * CELL; (FX[f.kind] || (() => {}))(g, kk, fw, fd, f, anim, { W, Dm, CELL }); g.position.set(f.x * CELL, 0, f.z * CELL); scene.add(g); }
  houseExtras(scene, lay, CELL, anim);
}
/** yaw so a prop built long along x (front +z) lies along the fixture's long side and faces into the room */
const facing = (f, w, d, ctx) => { const cx = f.x * ctx.CELL + w / 2, cz = f.z * ctx.CELL + d / 2; if (w >= d) return cz > ctx.Dm / 2 + 0.01 ? Math.PI : 0; void cx; return Math.PI / 2; }; // side fixtures always face +x (into the room on the left wall, towards the camera on the right)
const sideX = (f, w, ctx) => (f.x * ctx.CELL + w / 2 < ctx.W / 2 ? 0.4 : w - 0.4);
const FX = {
  bed(g, k, w, d, f) { put(g, PR.bed(w - 0.1, d - 0.1, { king: !!f.king, blanket: f.king ? 0x7b2cbf : 0x008751, cushion: 0xd4af37 }), w / 2, 0, d / 2); if (f.king) { put(g, PR.tableLamp({ c: 0xd4af37 }), 0.1, 0.5, 0.3); k.box(0.45, 0.5, 0.4, 0x4a2f1c, -0.1, 0, 0.35); } else { k.box(0.45, 0.5, 0.4, 0x4a2f1c, w + 0.15, 0, 0.3); put(g, PR.tableLamp({ c: 0xf2b705 }), w + 0.15, 0.5, 0.3); } },
  wardrobe(g, k, w, d, f, anim, ctx) { const long = Math.max(w, d) - 0.1, ry = facing(f, w, d, ctx), horiz = w >= d; put(g, PR.wardrobe(long, 0.65, 2.3), horiz ? w / 2 : sideX(f, w, ctx), 0, horiz ? (ry ? d - 0.4 : 0.4) : d / 2, ry); },
  curtain() { /* the window curtains are drawn with the windows (houseShell) */ },
  bucket(g, k, w, d) { k.cyl(0.3, 0.45, 0x2a9d8f, w / 2, 0.22, d / 2, 12, null, 0.24); k.cyl(0.26, 0.02, 0x8ecae6, w / 2, 0.44, d / 2, 12); k.cyl(0.3, 0.45, 0xe76f51, w / 2 + 0.5, 0.22, d / 2 - 0.3, 12, null, 0.24); k.cyl(0.02, 0.3, 0xdddddd, w / 2 + 0.5, 0.6, d / 2 - 0.3, 6); },
  ensuite(g, k, w, d) { put(g, PR.bathroom(w, d), w / 2, 0, d / 2); },
  kitchenette(g, k, w, d, f, anim, ctx) {
    const L = Math.max(w, d) - 0.1, ry = facing(f, w, d, ctx); const row = new THREE.Group(); const cw = Math.min(1.6, L - 1.5); put(row, PR.counter(Math.max(0.9, cw), 0.62, { c: 0xd8d2c4 }), -L / 2 + Math.max(0.9, cw) / 2, 0, 0); put(row, PR.cooker(0.7, 0.62), -L / 2 + Math.max(0.9, cw) + 0.4, 0, 0); put(row, PR.fridge(0.75, 0.7, 1.85), L / 2 - 0.4, 0, 0.02);
    // the row lies against the wall behind it (back wall, or the left/right wall for side kitchens)
    const horiz = Math.abs(Math.sin(ry)) < 0.5; const px = horiz ? w / 2 : sideX(f, w, ctx), pz = horiz ? (ry ? d - 0.4 : 0.4) : d / 2; put(g, row, px, 0, pz, ry); },
  partition(g, k, w, d) { put(g, PR.partition(w - 0.1, 2.4), w / 2, 0, d / 2); },
  stairs(g, k, w, d, f) { put(g, PR.stairs(w - 0.1, d - 0.1, f.grand ? 3.0 : 2.8, { brass: f.grand ? 0xd4af37 : 0x6b4a2b }), w / 2, 0, d / 2, Math.PI); },
  landing(g, k, w, d) { k.box(w - 0.1, 0.1, d - 0.1, 0xcdbb98, w / 2, 0.05, d / 2); k.box(w - 0.1, 0.04, 0.1, 0x5b3a1a, w / 2, 0.12, d - 0.1); for (let i = 0; i < 8; i++) k.cyl(0.025, 0.9, 0xd4af37, 0.1 + i * (w - 0.3) / 7, 0.55, d - 0.1, 6); k.box(w - 0.1, 0.06, 0.08, 0x5b3a1a, w / 2, 1.0, d - 0.1); put(g, PR.plant({ h: 1.0, kind: 'snake' }), w - 0.4, 0.1, 0.4); },
  pillar(g, k, w, d) { put(g, PR.pillar(3.0), w / 2, 0, d / 2); },
  bar(g, k, w, d, f) { put(g, PR.backBar(d - 0.2), 0.3, 0, d / 2); put(g, PR.barCounter(d - 0.2, { top: 0xd4af37 }), w - 0.5, 0, d / 2); for (let i = 0; i < 3; i++) put(g, PR.barStool(), w + 0.2, 0, d * 0.2 + i * d * 0.3); },
  chandelier(g, k, w, d) { put(g, PR.chandelier(), w / 2, 2.35, d / 2); },
};
/** ceiling fan, warm light, and wall decor placed on free wall space (config data: windows and fixtures decide what is free) */
const WALL_DECOR = { faceyou: ['flag', 'clock', 'art'], selfcon: ['art', 'clock', 'ac'], flat2: ['art', 'flag', 'ac', 'art', 'clock'], bungalow: ['art', 'flag', 'clock', 'art', 'ac', 'art'], duplex: ['art', 'flag', 'clock', 'art', 'ac', 'art'], mansion: ['art', 'flag', 'clock', 'art', 'art', 'clock'] };
const DW = { flag: 1.1, clock: 0.5, art: 1.0, ac: 1.1 };
function houseExtras(scene, lay, CELL, anim) {
  const W = lay.w * CELL, Dm = lay.d * CELL; const k = kit(scene);
  const fan = PR.ceilingFan(); fan.position.set(W / 2, 3.1, Dm / 2); scene.add(fan); anim.push(t => { fan.userData.spin.rotation.y = t * 5; });
  { const free = (lay.reserved || []).length; void free; const r = PR.rug(Math.min(3.2, W * 0.4), Math.min(2.4, Dm * 0.3), { a: [0xc0392b, 0x1f6f7a, 0x7b2cbf][W % 3] }); r.position.set(W * 0.5, -0.012, Dm * 0.52); scene.add(r); const mat = PR.rug(1.3, 0.7, { a: 0x6b4a2b, b: 0x8a5a2b, c: 0xd9a441 }); mat.position.set((lay.door.x + lay.door.w / 2) * CELL, -0.008, Dm - 0.5); scene.add(mat); }
  const pl = new THREE.PointLight(0xffe2b0, 0.5, W * 2.2); pl.position.set(W / 2, 2.7, Dm / 2); scene.add(pl);
  const occ = { back: [], left: [] };
  for (const w of lay.windows || []) if (occ[w.wall]) occ[w.wall].push([w.at * CELL - w.w * CELL / 2 - 0.45, w.at * CELL + w.w * CELL / 2 + 0.45]);
  for (const f of lay.fixtures || []) { if (['bed', 'bucket', 'landing', 'chandelier', 'curtain'].includes(f.kind) && f.kind !== 'curtain') continue; if (f.kind === 'curtain') { occ.back.push([f.x * CELL, (f.x + f.w) * CELL]); continue; } if (f.z === 0) occ.back.push([f.x * CELL - 0.1, (f.x + f.w) * CELL + 0.1]); if (f.x === 0) occ.left.push([f.z * CELL - 0.1, (f.z + f.d) * CELL + 0.1]); }
  const list = WALL_DECOR[lay.type] || WALL_DECOR.faceyou; let ia = 0;
  list.forEach((kind, i) => { const wall = i % 2 ? 'left' : 'back'; const len = wall === 'back' ? W : Dm; const need = DW[kind]; const spans = occ[wall];
    for (let c = 0.7 + need / 2; c < len - need / 2 - 0.3; c += 0.12) { const lo = c - need / 2 - 0.1, hi = c + need / 2 + 0.1; if (spans.some(([a, b]) => lo < b && hi > a)) continue; spans.push([lo, hi]);
      const o = kind === 'flag' ? PR.flag(1.0, 0.6) : kind === 'clock' ? PR.clock(0.22) : kind === 'ac' ? PR.acUnit() : PR.wallArt(0.9, 0.62, ['bars', 'sun'][ia++ % 2]); const y = kind === 'flag' ? 1.95 : kind === 'clock' ? 2.55 : kind === 'ac' ? 2.45 : 1.75;
      const grp = new THREE.Group(); o.position.y = y; grp.add(o); if (wall === 'back') grp.position.set(c, 0, 0.06); else { grp.rotation.y = Math.PI / 2; grp.position.set(0.06, 0, c); } scene.add(grp); break; } });
  if (lay.type === 'mansion' || lay.type === 'duplex') for (const x of [W * 0.22, W * 0.78]) { const wl = PR.wallLight(); wl.position.set(x, 1.9, 0.06); scene.add(wl); }
  void k;
}

// ---- garage: three car slots on a painted floor, with the owner's cars (see client/src/garage-view.js)
export function garageShell(scene, anim) {
  const R = { w: 11.4, d: 7.2 }; const k = kit(scene); const fl = new THREE.Mesh(new THREE.BoxGeometry(R.w, 0.2, R.d), M(0x8d8f93, { map: PR.surfaces().tile(R.w / 2.2, R.d / 2.2) })); fl.position.y = -0.1; scene.add(fl);
  const wall = M(0xdcd6c8, { map: PR.surfaces().stucco(4, 1.4) }); const back = new THREE.Mesh(new THREE.BoxGeometry(R.w, 3.6, 0.2), wall); back.position.set(0, 1.8, -R.d / 2); const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.6, R.d), wall); left.position.set(-R.w / 2, 1.8, 0); scene.add(back, left);
  k.box(R.w, 0.4, 0.22, 0xe07b00, 0, 3.4, -R.d / 2 + 0.02); k.box(0.22, 0.4, R.d, 0xe07b00, -R.w / 2 + 0.02, 3.4, 0);
  const shut = kit(scene); for (let i = 0; i < 9; i++) shut.box(4.2, 0.2, 0.08, i % 2 ? 0xb9bcc2 : 0xaaaeb5, -2.4, 0.15 + i * 0.26, -R.d / 2 + 0.14);
  const zb = -R.d / 2; put(scene, PR.workbench(2.8), 3.4, 0, zb + 0.55); put(scene, PR.toolWall(2.6, 1.5), 3.4, 1.15, zb + 0.1); put(scene, PR.toolCart(), 5.0, 0, zb + 0.6); put(scene, PR.bookshelf(1.5, 0.45, 2.0, { c: 0x6b6f75, stuff: 'pots' }), 0.9, 0, zb + 0.35);
  put(scene, PR.toolWall(1.8, 1.4), -5.55, 1.2, -0.6, Math.PI / 2); put(scene, PR.tyreStack(4), -5.1, 0, 2.2); put(scene, PR.oilDrum(0xd62828), -5.15, 0, -2.2); put(scene, PR.oilDrum(0x2e5eaa), -5.15, 0, -1.4);
  k.cyl(0.28, 0.9, 0x2a9d8f, -5.1, 0.45, 0.8, 14); k.cyl(0.04, 0.3, 0x222222, -5.1, 1.05, 0.8, 6); put(scene, PR.wallArt(1.1, 0.7, 'sun'), -2.0, 1.9, zb + 0.12); put(scene, PR.flag(1.0, 0.6), 1.5, 2.2, zb + 0.12); put(scene, PR.clock(0.24), 0.0, 2.9, zb + 0.12);
  for (let i = 0; i < 3; i++) { const tube = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.12), new THREE.MeshBasicMaterial({ color: 0xfff7d6 })); tube.position.set(-3.5 + i * 3.5, 3.3, -0.6); scene.add(tube); }
  for (let s = 0; s < 3; s++) { const x = -3.5 + s * 3.5; for (const dx of [-1.55, 1.55]) k.box(0.08, 0.02, 4.8, 0xffffff, x + dx, 0.015, 0.6); k.box(3.1, 0.02, 0.08, 0xffffff, x, 0.015, 3.0); const n = makeNameSprite(`SLOT ${s + 1}`, '#ffe08a'); n.scale.set(2.6, 0.65, 1); n.position.set(x, 0.1, 3.0); n.material.depthTest = true; scene.add(n); }
  for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.35, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1b8, side: THREE.DoubleSide })); b.position.set(-3.5 + i * 3.5, 3.2, 0.5); scene.add(b); const gl = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 1.5, 3.0, 14, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1b8, transparent: true, opacity: 0.06, side: THREE.DoubleSide })); gl.position.set(-3.5 + i * 3.5, 1.7, 0.5); scene.add(gl); }
  put(scene, PR.tyreStack(3), 5.0, 0, 2.6); put(scene, PR.plant({ h: 1.1 }), 5.2, 0, 1.3); const pl = new THREE.PointLight(0xfff0d0, 0.5, 20); pl.position.set(0, 3.0, 0); scene.add(pl); void anim; return R;
}
