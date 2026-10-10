// Room kit: every interior (venues, clubs, salons, garage, houses) is built here from small primitives, driven by config data (city JSON `room` specs and balance.housing.types).
// No external assets. Low-poly style. `anim` is a list of fn(t) the host view calls every frame. All sizes/colours are placeholders.
import * as THREE from 'three';
import { makeNameSprite } from './entities.js';

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
  return M(a);
}
export const mood = (scene, name, lights) => {
  const P = { warm: [0x2a2118, 1.0, 0xfff0d0], dim: [0x10151f, 0.55, 0xaabbee], neon: [0x140a22, 0.55, 0xffc0ff], work: [0x20252a, 0.95, 0xfff6e0], bright: [0x23303a, 1.15, 0xffffff], club: [0x07050d, 0.32, 0xb78cff], sunset: [0x1e1208, 0.6, 0xffb36b] }[name] || [0x1d2b25, 1.0, 0xffffff];
  scene.background = new THREE.Color(P[0]); lights.hemi.intensity = P[1]; lights.sun.color.set(P[2]); lights.sun.intensity = name === 'club' ? 0.15 : name === 'neon' ? 0.4 : name === 'dim' ? 0.35 : name === 'sunset' ? 0.5 : 1.0;
};

// ---- windows on the venue walls (metres from the centre). big = shop-front glass, blind = slatted blind
function windowAt(parent, wall, at, w, o, R, trim) {
  const hh = o.big ? 2.0 : 1.3, y = o.big ? 1.45 : 1.8; const g = new THREE.Group(); const k = kit(g);
  k.box(w + 0.24, hh + 0.24, 0.1, trim, 0, y, 0); k.box(w, hh, 0.14, 0, 0, y, 0, new THREE.MeshBasicMaterial({ color: o.blind ? 0x1a2433 : 0x9fd8ff, transparent: true, opacity: 0.85 }));
  k.box(0.06, hh, 0.16, trim, 0, y, 0); if (o.big) k.box(w, 0.06, 0.16, trim, 0, y, 0);
  if (o.blind) for (let i = 0; i < 5; i++) k.box(w, 0.04, 0.17, 0x5a6578, 0, y - hh / 2 + (i + 0.5) * hh / 5, 0);
  k.box(w + 0.4, 0.08, 0.3, trim, 0, y - hh / 2 - 0.12, 0.08);
  if (wall === 'back') g.position.set(at, 0, -R.d / 2 + 0.12); else { g.rotation.y = Math.PI / 2; g.position.set(-R.w / 2 + 0.12, 0, at); }
  parent.add(g);
}
/** floor, walls, trim, windows, door and mood lights of a venue room from its `room` spec */
export function venueShell(scene, R, spec, sign, anim, lights) {
  const sp = spec || {}; const trim = new THREE.Color(sp.trim || sign || '#555');
  const fl = new THREE.Mesh(new THREE.BoxGeometry(R.w, 0.2, R.d), floorMat(sp.floor, R.w, R.d)); fl.position.y = -0.1; scene.add(fl);
  const wallM = M(sp.wall || '#f1e7cf'); const H = 3.4;
  const back = new THREE.Mesh(new THREE.BoxGeometry(R.w, H, 0.2), wallM); back.position.set(0, H / 2, -R.d / 2); const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, H, R.d), wallM); left.position.set(-R.w / 2, H / 2, 0); scene.add(back, left);
  const k = kit(scene); k.box(R.w, 0.5, 0.24, trim, 0, 3.1, -R.d / 2 + 0.02); k.box(0.24, 0.5, R.d, trim, -R.w / 2 + 0.02, 3.1, 0); k.box(R.w, 0.35, 0.22, trim, 0, 0.17, -R.d / 2 + 0.02); k.box(0.22, 0.35, R.d, trim, -R.w / 2 + 0.02, 0.17, 0);
  k.box(R.w + 0.2, 0.3, 0.2, 0x555555, 0, 0.15, R.d / 2 + 0.1); // low front lip (cut-away)
  for (const w of sp.windows || []) windowAt(scene, w.wall, w.at, w.w, w, R, trim);
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.04, 0.4), new THREE.MeshBasicMaterial({ color: 0xffc20e })); door.position.set(0, 0.06, R.d / 2 + 0.1); scene.add(door);
  if (sp.floor?.style === 'dance') { const tiles = []; const cols = [0x7b2cbf, 0x3a86ff, 0xff006e, 0x06d6a0, 0xffbe0b]; for (let ix = 0; ix < 5; ix++) for (let iz = 0; iz < 4; iz++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.05, 0.96), new THREE.MeshBasicMaterial({ color: cols[(ix + iz) % 5] })); m.position.set(-2 + ix, 0.03, -0.7 + iz); scene.add(m); tiles.push(m); } anim.push(t => tiles.forEach((m, i) => m.material.color.setHex(cols[(Math.floor(t * 2) + i + Math.floor(i / 5)) % 5]))); }
  if (sp.mood) mood(scene, sp.mood, lights);
}

// ---- decor: one function per kind; (x,z) in metres from the room centre
const D = {
  shelf(g, k, o) { k.box(2.2, 1.7, 0.45, o.c || 0x8a5a2b, 0, 0.85, 0); for (let i = 0; i < 3; i++) { k.box(2.1, 0.05, 0.5, 0x5b3a1a, 0, 0.45 + i * 0.5, 0.02); for (let j = 0; j < 4; j++) { if (o.bottles) k.cyl(0.07, 0.3, [0xe63946, 0x2a9d8f, 0xf4a261, 0x8ecae6][j], -0.8 + j * 0.5, 0.62 + i * 0.5, 0.05, 8); else if (o.pots && i < 2) k.cyl(0.17, 0.2, [0xb5543a, 0xc0c0c0, 0xe9c46a, 0x8d99ae][j], -0.8 + j * 0.5, 0.57 + i * 0.5, 0.05, 10); else k.box(0.3, 0.25, 0.25, [0xe9c46a, 0xd62828, 0x2a9d8f, 0x457b9d][(i + j) % 4], -0.8 + j * 0.5, 0.6 + i * 0.5, 0.05); } } },
  fridge(g, k) { k.box(1.0, 2.0, 0.9, 0xe8eef2); k.box(0.04, 0.5, 0.04, 0x555555, 0.35, 1.5, 0.47); k.box(0.9, 0.04, 0.9, 0xb0bec5, 0, 1.2, 0.01); },
  stool(g, k, o) { k.cyl(0.32, 0.08, o.c || 0xe63946, 0, 0.62); for (const [x, z] of [[-.2, -.2], [.2, -.2], [-.2, .2], [.2, .2]]) k.cyl(0.04, 0.6, 0x555555, x, 0.3, z, 6); },
  table(g, k, o) { k.cyl(0.6, 0.07, o.c || 0xffffff, 0, 0.78, 0, 16); k.cyl(0.07, 0.75, 0x777777, 0, 0.38); },
  lanterns(g, k, o, R, anim) { const n = 7; for (let i = 0; i < n; i++) { const x = -R.w / 2 + 0.6 + i * (R.w - 1.2) / (n - 1); const m = k.sph(0.16, 0, x, 2.75 + Math.sin(i * 1.3) * 0.08, 0, B(o.c[i % o.c.length])); } k.box(R.w - 0.6, 0.02, 0.02, 0x333333, 0, 2.95, 0); },
  fan(g, k, o, R, anim) { k.cyl(0.07, 0.5, 0x777777, 0, 3.1); const bl = new THREE.Group(); bl.position.y = 2.85; for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.03, 0.22), M(0xdddddd)); b.rotation.y = i * Math.PI / 1.5; bl.add(b); } g.add(bl); anim.push(t => { bl.rotation.y = t * 6; }); },
  plant(g, k) { k.cyl(0.3, 0.45, 0xb5543a, 0, 0.22, 0, 10, null, 0.22); k.sph(0.5, 0x2f9e5a, 0, 0.95, 0); k.sph(0.34, 0x40b36b, 0.2, 1.25, 0.1); },
  menu(g, k, o) { const s = makeNameSprite(o.text, '#fff3c4'); s.scale.set(3.4, 0.85, 1); s.position.set(0, 2.2, 0.05); g.add(s); },
  bench(g, k, o) { const w = o.w || 2.4; k.box(w, 0.1, 0.55, 0x8a5a2b, 0, 0.45); k.box(w, 0.5, 0.08, 0x6b4226, 0, 0.8, 0.3); for (const s of [-1, 1]) k.box(0.1, 0.45, 0.5, 0x5b3a1a, s * (w / 2 - 0.15), 0.22); },
  speaker(g, k, o) { const h = o.tall ? 2.3 : 1.2; k.box(0.9, h, 0.7, 0x16161a); k.cyl(0.28, 0.06, 0x333, 0, h * 0.3, 0.37, 14).rotation.x = Math.PI / 2; k.cyl(0.18, 0.06, 0x333, 0, h * 0.75, 0.37, 12).rotation.x = Math.PI / 2; },
  pennants(g, k, o, R) { const n = 9; for (let i = 0; i < n; i++) { const x = -R.w / 2 + 0.7 + i * (R.w - 1.4) / (n - 1); const t = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.4, 3), B(o.c[i % o.c.length])); t.position.set(x, 2.65, 0); t.rotation.z = Math.PI; g.add(t); } k.box(R.w - 1, 0.02, 0.02, 0x333333, 0, 2.86, 0); },
  neon(g, k, o, R, anim) { k.box(4.2, 0.9, 0.08, 0x111111, 0, 2.2, 0); const s = makeNameSprite(o.text, o.c || '#ff4fd8'); s.scale.set(4.2, 1.0, 1); s.position.set(0, 2.2, 0.1); g.add(s); const m = k.box(4.4, 0.06, 0.06, 0, 0, 1.7, 0.05, B(o.c || '#ff4fd8')); anim.push(t => { m.material.color.set(o.c || '#ff4fd8').multiplyScalar(0.6 + 0.4 * Math.sin(t * 5)); }); },
  lamp(g, k, o) { k.cyl(0.02, 1.2, 0x333, 0, 3.0); const c = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.4, 14, 1, true), new THREE.MeshBasicMaterial({ color: o.c, side: THREE.DoubleSide })); c.position.y = 2.25; g.add(c); const gl = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, 1.4, 14, 1, true), new THREE.MeshBasicMaterial({ color: o.c, transparent: true, opacity: 0.1, side: THREE.DoubleSide })); gl.position.y = 1.4; g.add(gl); },
  rug(g, k, o) { k.box(o.w || 3, 0.03, o.d || 2, o.c || 0xd9a441, 0, 0.02); k.box((o.w || 3) - 0.3, 0.035, (o.d || 2) - 0.3, 0x000000, 0, 0.022, 0, M(o.c || 0xd9a441, { transparent: true, opacity: 0.4 })); },
  lift(g, k) { for (const s of [-1.5, 1.5]) k.box(0.22, 2.6, 0.3, 0xe07b00, s, 1.3, 0); k.box(3.4, 0.2, 0.35, 0xe07b00, 0, 2.55); k.box(2.6, 0.12, 1.6, 0x444a50, 0, 0.65, 0.7); k.box(0.2, 0.6, 0.2, 0x8a8f95, 0, 0.3, 0.7); },
  toolwall(g, k) { k.box(2.4, 1.6, 0.1, 0x8c8f93, 0, 1.6); const cols = [0xd62828, 0x2a9d8f, 0xf4a261, 0x457b9d, 0xe9c46a]; for (let i = 0; i < 8; i++) { k.box(0.07, 0.5 + (i % 3) * 0.12, 0.05, cols[i % 5], -1 + i * 0.28, 1.6, 0.08); } k.box(2.0, 0.08, 0.3, 0x555, 0, 0.9, 0.1); },
  tyres(g, k) { for (let i = 0; i < 3; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.14, 8, 16), M(0x1a1a1a)); t.rotation.x = Math.PI / 2; t.position.y = 0.16 + i * 0.28; g.add(t); } },
  drum(g, k, o) { k.cyl(0.38, 0.95, o.c || 0x2e5eaa, 0, 0.48, 0, 14); k.cyl(0.4, 0.05, 0x222, 0, 0.8, 0, 14); k.cyl(0.4, 0.05, 0x222, 0, 0.2, 0, 14); },
  hazard(g, k, o) { const n = Math.round((o.w || 6) / 0.6); for (let i = 0; i < n; i++) k.box(0.3, 0.025, o.d || 0.8, i % 2 ? 0xffd60a : 0x222222, -(o.w || 6) / 2 + 0.3 + i * 0.6, 0.015, 0); },
  bench2(g, k) { k.box(0.7, 0.9, 2.2, 0x6b6f75, 0, 0.45); k.box(0.8, 0.07, 2.3, 0xe07b00, 0, 0.93); k.box(0.2, 0.2, 0.3, 0xd62828, 0, 1.05, -0.6); },
  turntable(g, k, o, R, anim) { const t = k.cyl(1.55, 0.14, 0xdddddd, 0, 0.07, 0, 28); k.cyl(1.6, 0.04, 0xb8322a, 0, 0.16, 0, 28, null, 1.6).scale.set(1, 1, 1); anim.push(tt => { t.rotation.y = tt * 0.15; }); },
  spot(g, k, o) { const c = new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.6, 16, 1, true), new THREE.MeshBasicMaterial({ color: o.c, transparent: true, opacity: 0.1, side: THREE.DoubleSide })); c.position.y = 1.6; c.rotation.x = Math.PI; g.add(c); },
  desk(g, k) { k.box(2.4, 0.95, 0.8, 0x7b5836); k.box(2.5, 0.07, 0.9, 0xd8c3a5, 0, 0.98); k.box(0.5, 0.35, 0.05, 0x222, -0.5, 1.28, -0.1); k.box(0.3, 0.05, 0.2, 0xc0c0c0, 0.4, 1.03, 0.1); },
  stage(g, k, o) { k.box(o.w, 0.35, o.d, 0x2b2540, 0, 0.175); k.box(o.w, 0.04, 0.06, 0xff4fd8, 0, 0.37, o.d / 2); },
  rig(g, k, o, R, anim) { k.box(R.w - 1.5, 0.08, 0.08, 0x333, 0, 3.15, -R.d / 2 + 2); const cols = o.warm ? [0xffb703, 0xfb8500, 0xffd166, 0xe76f51] : [0xff006e, 0x3a86ff, 0x06d6a0, 0xffbe0b, 0x8338ec, 0xfb5607]; const cones = cols.map((c, i) => { const co = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.0, 12, 1, true), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.16, side: THREE.DoubleSide })); const piv = new THREE.Group(); piv.position.set(-(R.w - 2.5) / 2 + i * (R.w - 2.5) / (cols.length - 1), 3.1, -R.d / 2 + 2); co.position.y = -1.5; co.rotation.x = Math.PI; piv.add(co); g.add(piv); return piv; }); anim.push(t => cones.forEach((c, i) => { c.rotation.z = Math.sin(t * 1.3 + i) * 0.5; c.rotation.x = Math.cos(t * 0.9 + i * 1.7) * 0.45; })); },
  discoball(g, k, o, R, anim) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), new THREE.MeshLambertMaterial({ color: 0xdddddd, flatShading: true, emissive: 0x444466 })); b.position.y = 2.6; g.add(b); k.cyl(0.015, 0.6, 0x888, 0, 3.2); anim.push(t => { b.rotation.y = t * 1.2; }); },
  bar(g, k, o) { const len = o.len || 4; k.box(0.35, 2.4, len, 0x1c1410, 0.1, 1.2, 0); const cols = [0xe63946, 0x2a9d8f, 0xf4a261, 0x8ecae6, 0xe9c46a]; for (let r = 0; r < 2; r++) { k.box(0.3, 0.05, len - 0.4, 0x5b3a1a, 0.28, 1.2 + r * 0.55, 0); for (let i = 0; i < 9; i++) k.cyl(0.07, 0.34, cols[(i + r) % 5], 0.3, 1.4 + r * 0.55, -len / 2 + 0.4 + i * (len - 0.8) / 8, 8); } k.box(0.05, 0.1, len - 0.3, o.c || 0xff4fd8, 0.27, 1.05, 0, B(o.c || 0xff4fd8)); },
  barstool(g, k) { k.cyl(0.26, 0.1, 0xc1121f, 0, 0.8); k.cyl(0.05, 0.75, 0xbbb, 0, 0.4, 0, 8); k.cyl(0.22, 0.04, 0x444, 0, 0.04); },
  sofa(g, k, o) { g.rotation.y = (o.rot || 0) * -Math.PI / 2; k.box(2.2, 0.5, 0.9, o.c || 0x9d0208, 0, 0.3); k.box(2.2, 0.6, 0.25, o.c || 0x9d0208, 0, 0.7, 0.35); k.box(0.25, 0.5, 0.9, o.c || 0x9d0208, -1.05, 0.55); k.box(0.25, 0.5, 0.9, o.c || 0x9d0208, 1.05, 0.55); },
  rope(g, k, o) { const w = o.w || 2.4; for (const s of [-1, 1]) { k.cyl(0.05, 1.0, 0xd4af37, s * w / 2, 0.5, 0, 8); k.sph(0.09, 0xd4af37, s * w / 2, 1.02, 0); } k.box(w, 0.07, 0.07, 0x9d0208, 0, 0.85, 0); },
  ledstrip(g, k, o, R, anim) { const m1 = k.box(R.w, 0.06, 0.06, 0, 0, 0.8, -R.d / 2 + 0.16, B(o.c)); const m2 = k.box(0.06, 0.06, R.d, 0, -R.w / 2 + 0.16, 0.8, 0, B(o.c)); anim.push(t => { const c = new THREE.Color(o.c).offsetHSL(Math.sin(t * 0.4) * 0.12, 0, 0); m1.material.color.copy(c); m2.material.color.copy(c); }); g.position.set(0, 0, 0); },
  mirror(g, k, o) { k.box(1.9, 1.7, 0.06, 0x333, 0, 1.75); const m = new THREE.Mesh(o.oval ? new THREE.CircleGeometry(0.85, 24) : new THREE.PlaneGeometry(1.7, 1.5), new THREE.MeshBasicMaterial({ color: 0xcfe9f7 })); m.position.set(0, 1.75, 0.04); if (o.oval) m.scale.set(0.9, 1, 1); g.add(m); k.box(2.0, 0.08, 0.3, 0x777, 0, 0.95, 0.1); for (let i = 0; i < 3; i++) k.cyl(0.05, 0.22, [0xe63946, 0x2a9d8f, 0xf4a261][i], -0.6 + i * 0.6, 1.08, 0.1, 8); },
  poleSign(g, k, o, R, anim) { const p = k.cyl(0.18, 1.7, 0xffffff, 0, 1.2, 0, 14); const st = new THREE.Group(); st.position.y = 1.2; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.16, 14), M(i % 2 ? 0xd62828 : 0x1d4ed8)); s.position.y = -0.8 + i * 0.28; st.add(s); } g.add(st); k.cyl(0.24, 0.12, 0x888, 0, 2.1); anim.push(t => { st.rotation.y = t * 2; }); void p; },
  dryer(g, k) { k.cyl(0.07, 1.0, 0x777, 0, 0.5, 0, 8); k.box(0.7, 0.35, 0.7, 0xb8b8c0, 0, 1.2); k.sph(0.42, 0xe5989b, 0, 1.55, 0); k.box(0.5, 0.2, 0.5, 0xd0d0d6, 0, 0.1); }
};
export function decorate(parent, list, R, anim) {
  for (const o of list || []) { const fn = D[o.k]; if (!fn) continue; const g = new THREE.Group(); const k = kit(g); g.position.set(o.x || 0, 0, o.z || 0); if (o.k === 'lanterns' || o.k === 'pennants') g.position.x = 0; fn(g, k, o, R, anim); parent.add(g); }
}

// ---- extra station models (club, salon). Return true when handled.
export function stationModel(st, grp, anim) {
  const k = kit(grp); const col = new THREE.Color(st.color || '#888');
  if (st.type === 'dance') { const r = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.55, 28), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })); r.rotation.x = -Math.PI / 2; r.position.y = 0.07; grp.add(r); anim.push(t => { r.scale.setScalar(1 + 0.25 * Math.sin(t * 4)); }); return true; }
  if (st.type === 'dj') { k.box(3.2, 0.95, 0.9, 0x15151a); k.box(3.3, 0.06, 1.0, 0x2c2c34, 0, 0.98); const recs = [-0.9, 0.9].map(x => { const d = k.cyl(0.34, 0.04, 0x111, x, 1.03, 0.05, 20); k.cyl(0.1, 0.05, 0xff4fd8, x, 1.05, 0.05, 10); return d; }); k.box(0.7, 0.1, 0.5, 0x333, 0, 1.05, 0.05); k.box(0.7, 0.4, 0.04, 0x0a0a10, 1.2, 1.2, -0.35).rotation.x = -0.2; const led = k.box(3.0, 0.1, 0.03, 0, 0, 0.55, 0.46, B(0xff006e)); anim.push(t => { recs.forEach(r => { r.rotation.y = t * 3; }); led.material.color.setHSL((t * 0.2) % 1, 1, 0.55); }); return true; }
  if (st.type === 'bar') { k.box(1.0, 1.1, 3.8, 0x2b1d14, 0, 0.55, 0); k.box(1.15, 0.08, 3.95, col, 0, 1.13, 0); k.box(0.06, 0.12, 3.7, 0xff4fd8, -0.5, 0.95, 0, B(0xff4fd8)); for (let i = 0; i < 4; i++) { k.cyl(0.07, 0.2, 0xcfe9f7, 0.1, 1.27, -1.3 + i * 0.85, 8); } k.cyl(0.04, 0.3, 0xcccccc, 0.35, 1.3, 0.3, 8); return true; }
  if (st.type === 'songs') { grp.rotation.y = -Math.PI / 2; k.box(2.6, 2.0, 0.12, 0x10131a, 0, 1.7); k.box(2.4, 0.3, 0.14, 0x7b2cbf, 0, 2.5, 0.02); const cs = [0xff006e, 0x3a86ff, 0x06d6a0, 0xffbe0b, 0x8338ec]; const rows = cs.map((c, i) => k.box(2.0, 0.12, 0.15, c, 0, 2.05 - i * 0.28, 0.02, B(c))); anim.push(t => rows.forEach((r, i) => { r.scale.x = 0.55 + 0.45 * Math.abs(Math.sin(t * 1.5 + i)); })); return true; }
  if (st.type === 'vip') { k.box(2.0, 0.08, 1.0, 0x1a1a1a, 0, 0.5, 0.0); k.cyl(0.5, 0.06, 0xd4af37, 0, 0.55, 0, 16); k.cyl(0.06, 0.5, 0x888, 0, 0.27); k.box(0.2, 0.3, 0.2, 0xcfe9f7, 0.1, 0.72, 0.1); k.sph(0.12, 0xffd166, -0.2, 0.7, 0, B(0xffd166)); return true; }
  if (st.type === 'style') { k.cyl(0.55, 0.12, 0x333, 0, 0.06, 0, 18); k.cyl(0.1, 0.5, 0xaaaaaa, 0, 0.35, 0, 8); k.box(0.95, 0.22, 0.95, col, 0, 0.7); k.box(0.95, 1.0, 0.2, col, 0, 1.25, 0.45); k.box(0.36, 0.22, 0.2, col, 0, 1.9, 0.45); k.box(0.12, 0.2, 0.8, 0x333, -0.55, 0.95, 0.05); k.box(0.12, 0.2, 0.8, 0x333, 0.55, 0.95, 0.05); k.box(0.7, 0.08, 0.4, 0x888, 0, 0.3, -0.7); return true; }
  if (st.type === 'basin') { k.box(1.2, 0.9, 0.9, 0xdee2e6, 0, 0.45, 0); const b = k.cyl(0.42, 0.12, 0xffffff, 0, 0.96, 0, 16); k.cyl(0.04, 0.4, 0xaaaaaa, 0, 1.2, -0.3, 8); k.box(0.1, 0.1, 0.4, 0xaaaaaa, 0, 1.38, -0.15); k.box(0.9, 0.7, 0.3, 0x333, 0, 0.75, 0.95); void b; return true; }
  return false;
}

// ---- houses: windows, door frame, corridor / veranda and the fixtures of the type (cell coords, CELL metres per cell)
const wmat = new THREE.MeshBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.8 });
export function houseShell(scene, lay, CELL, anim) {
  const W = lay.w * CELL, Dm = lay.d * CELL, k = kit(scene); const T = 0x6b4a2b;
  for (const w of lay.windows || []) {
    const g = new THREE.Group(); const kk = kit(g); const ww = w.w * CELL; kk.box(ww + 0.2, 1.5, 0.12, 0xffffff, 0, 1.9, 0); kk.box(ww, 1.3, 0.15, 0, 0, 1.9, 0, wmat); kk.box(0.05, 1.3, 0.16, 0xffffff, 0, 1.9, 0); kk.box(ww, 0.05, 0.16, 0xffffff, 0, 1.9, 0); kk.box(ww + 0.3, 0.08, 0.3, 0xffffff, 0, 1.12, 0.08);
    if (w.wall === 'back') g.position.set(w.at * CELL, 0, 0.05); else if (w.wall === 'left') { g.rotation.y = Math.PI / 2; g.position.set(0.05, 0, w.at * CELL); } else { g.rotation.y = Math.PI / 2; g.position.set(W, 0, w.at * CELL); }
    scene.add(g);
  }
  // right + front walls are cut away: a low rail so the room reads as a box
  k.box(0.14, 0.45, Dm, 0xbdb4a2, W, 0.22, Dm / 2, M(0xbdb4a2, { transparent: true, opacity: 0.55 }));
  const dx = lay.door.x * CELL, dw = lay.door.w * CELL; k.box(dx, 0.45, 0.14, 0xbdb4a2, dx / 2, 0.22, Dm, M(0xbdb4a2, { transparent: true, opacity: 0.55 })); k.box(W - dx - dw, 0.45, 0.14, 0xbdb4a2, dx + dw + (W - dx - dw) / 2, 0.22, Dm, M(0xbdb4a2, { transparent: true, opacity: 0.55 }));
  k.box(0.14, 2.4, 0.14, T, dx, 1.2, Dm); k.box(0.14, 2.4, 0.14, T, dx + dw, 1.2, Dm); k.box(dw + 0.14, 0.14, 0.16, T, dx + dw / 2, 2.4, Dm);
  const piv = new THREE.Group(); piv.position.set(dx, 0, Dm); const lf = new THREE.Mesh(new THREE.BoxGeometry(dw * 0.92, 2.3, 0.07), M(0x8a5a2b)); lf.position.set(dw * 0.46, 1.15, 0); piv.add(lf); piv.rotation.y = 1.0; scene.add(piv);
  if (lay.corridor) { const cd = lay.corridor.depth * CELL; k.box(W + 0.6, 0.12, cd, 0x8d8d8a, W / 2, -0.06, Dm + cd / 2); k.box(W + 0.6, 0.5, 0.14, 0x777, W / 2, 0.25, Dm + cd); for (let i = 0; i < lay.corridor.doors; i++) { const x = (i + 0.5) * W / lay.corridor.doors; k.box(0.9, 0.04, 0.6, [0xc1121f, 0x2a9d8f, 0xe9c46a, 0x457b9d][i % 4], x, 0.02, Dm + cd - 0.5); } const s = makeNameSprite('Shared corridor', '#d9d9d9'); s.scale.set(3.6, 0.9, 1); s.position.set(W / 2, 1.2, Dm + cd * 0.55); scene.add(s); }
  if (lay.veranda) { const vd = 1.6 * CELL / 1.4; k.box(dw + 2.6, 0.14, vd, 0xc9b79c, dx + dw / 2, -0.05, Dm + vd / 2); for (const s of [-1, 1]) k.cyl(0.1, 2.5, 0xf5f0e6, dx + dw / 2 + s * (dw / 2 + 1.1), 1.25, Dm + vd - 0.2, 8); k.box(dw + 2.8, 0.1, 0.2, 0x8d6e4f, dx + dw / 2, 2.55, Dm + vd - 0.2); }
  for (const f of lay.fixtures || []) { const g = new THREE.Group(); const kk = kit(g); const fw = f.w * CELL, fd = f.d * CELL; (FX[f.kind] || (() => {}))(g, kk, fw, fd, f, anim, CELL); g.position.set(f.x * CELL, 0, f.z * CELL); scene.add(g); }
}
const FX = {
  bed(g, k, w, d, f) { const kg = f.king ? 1.1 : 1; k.box(w - 0.1, 0.35, d - 0.1, 0x6b4226, w / 2, 0.18, d / 2); k.box(w - 0.3, 0.25, d - 0.35, f.king ? 0x7b2cbf : 0x4a6fa5, w / 2, 0.5, d / 2 + 0.1); k.box(w - 0.1, 1.0 * kg, 0.15, 0x6b4226, w / 2, 0.7, 0.08); for (const s of f.king ? [-1, 1] : [0]) k.box(w * (f.king ? 0.36 : 0.7), 0.2, 0.5, 0xffffff, w / 2 + s * w * 0.25, 0.75, 0.5); k.box(w - 0.3, 0.12, d * 0.5, f.king ? 0xd4af37 : 0xe9c46a, w / 2, 0.65, d * 0.65); },
  wardrobe(g, k, w, d) { k.box(w - 0.1, 2.5, d - 0.1, 0x7a4a24, w / 2, 1.25, d / 2); k.box(0.04, 2.3, 0.05, 0x3a2412, w / 2, 1.25, d - 0.04); for (const s of [-1, 1]) k.box(0.05, 0.3, 0.05, 0xd4af37, w / 2 + s * 0.15, 1.25, d - 0.02); },
  curtain(g, k, w) { k.box(w - 0.2, 2.2, 0.06, 0xe76f51, w / 2, 1.3, 0.12); for (let i = 1; i < 6; i++) k.box(0.03, 2.2, 0.08, 0xc0502f, i * (w - 0.2) / 6, 1.3, 0.13); k.box(w, 0.05, 0.05, 0x333, w / 2, 2.45, 0.1); },
  bucket(g, k, w, d) { k.cyl(0.3, 0.45, 0x2a9d8f, w / 2, 0.22, d / 2, 12, null, 0.24); k.cyl(0.26, 0.02, 0x8ecae6, w / 2, 0.44, d / 2, 12); k.cyl(0.3, 0.45, 0xe76f51, w / 2 + 0.5, 0.22, d / 2 - 0.3, 12, null, 0.24); },
  ensuite(g, k, w, d) { const t = 0xdfe7ea; k.box(w - 0.1, 0.05, d - 0.1, 0xb8c7cc, w / 2, 0.03, d / 2); k.box(0.1, 2.3, d - 0.1, t, 0.05, 1.15, d / 2); k.box(0.1, 0.9, d * 0.5, t, w / 2, 0.45, d - 0.05); k.box(0.55, 0.4, 0.7, 0xffffff, w - 0.6, 0.2, 0.6); k.box(0.5, 0.7, 0.2, 0xffffff, w - 0.6, 0.75, 0.3); k.box(w * 0.4, 0.05, 0.1, 0x8ecae6, w * 0.3, 2.3, 0.5); k.cyl(0.2, 0.08, 0xffffff, 0.45, 0.9, 0.35, 12); k.box(0.5, 0.8, 0.4, 0xffffff, 0.45, 0.4, 0.35); },
  kitchenette(g, k, w, d) { k.box(w - 0.1, 0.95, d - 0.1, 0xd8d2c4, w / 2, 0.48, d / 2); k.box(w - 0.05, 0.07, d - 0.05, 0x4a4a4a, w / 2, 0.98, d / 2); const long = w >= d; k.cyl(0.22, 0.05, 0xc0c0c0, long ? w * 0.3 : w / 2, 1.04, long ? d / 2 : d * 0.3, 12); for (const o of [-1, 1]) k.cyl(0.12, 0.03, 0x111, long ? w * 0.7 + o * 0.28 : w / 2 + o * 0.15, 1.03, long ? d / 2 : d * 0.7 + o * 0.28, 10); if (long) k.box(w - 0.1, 0.7, 0.35, 0x8d6e4f, w / 2, 2.0, 0.2); else k.box(0.35, 0.7, d - 0.1, 0x8d6e4f, 0.2, 2.0, d / 2); },
  partition(g, k, w, d) { k.box(w - 0.05, 2.6, d * 0.4, 0xe9dcc3, w / 2, 1.3, d * 0.2); },
  stairs(g, k, w, d, f) { const n = Math.max(6, Math.round(d / 0.4)); const sw = w - 0.1; for (let i = 0; i < n; i++) { const h = 0.35 * (i + 1); k.box(sw, h, d / n, f.grand ? 0xf1ece0 : 0xb8a88a, w / 2, h / 2, d - (i + 0.5) * d / n); } if (f.grand) { k.box(sw * 0.5, 0.05, d - 0.2, 0x9d0208, w / 2, 0.35 * n + 0.03, d / 2); } k.box(0.08, 1.0, d, 0x5b3a1a, 0.05, 0.9, d / 2); k.box(w, 0.35 * (n + 1), 0.15, 0x777, w / 2, 0.35 * (n + 1) / 2, 0.05); },
  landing(g, k, w, d) { k.box(w - 0.1, 0.08, d - 0.1, 0xcdbb98, w / 2, 0.05, d / 2); k.box(0.06, 0.9, d - 0.1, 0x5b3a1a, w - 0.08, 0.5, d / 2); k.box(w - 0.1, 0.9, 0.06, 0x5b3a1a, w / 2, 0.5, d - 0.08); for (let i = 0; i < 8; i++) k.box(0.04, 0.9, 0.04, 0x8a5a2b, w - 0.08, 0.5, 0.2 + i * (d - 0.4) / 7); },
  pillar(g, k, w, d) { k.cyl(0.38, 3.0, 0xf5f0e6, w / 2, 1.5, d / 2, 16); k.cyl(0.5, 0.2, 0xd8d0be, w / 2, 0.1, d / 2, 16); k.cyl(0.5, 0.2, 0xd8d0be, w / 2, 2.9, d / 2, 16); },
  bar(g, k, w, d) { k.box(w - 0.1, 1.1, d - 0.1, 0x3b2616, w / 2, 0.55, d / 2); k.box(w + 0.1, 0.08, d, 0xd4af37, w / 2, 1.14, d / 2); for (let i = 0; i < 6; i++) k.cyl(0.07, 0.3, [0xe63946, 0x2a9d8f, 0xf4a261][i % 3], w / 2, 1.3, 0.5 + i * (d - 1) / 5, 8); for (let i = 0; i < 3; i++) k.cyl(0.22, 0.08, 0xc1121f, w + 0.5, 0.8, 0.8 + i * 1.2, 10); },
  chandelier(g, k, w, d, f, anim) { const gr = new THREE.Group(); gr.position.set(w / 2, 3.0, d / 2); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 6, 20), new THREE.MeshBasicMaterial({ color: 0xd4af37 })); ring.rotation.x = Math.PI / 2; gr.add(ring); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff1b8 })); b.position.set(Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6); gr.add(b); } const c = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8), new THREE.MeshBasicMaterial({ color: 0x888888 })); c.position.y = 0.4; gr.add(c); g.add(gr); anim.push(t => { gr.rotation.y = t * 0.3; gr.position.y = 3.0 + Math.sin(t) * 0.03; }); }
};

// ---- garage: three car slots on a painted floor, with the owner's cars (see client/src/garage-view.js)
export function garageShell(scene, anim) {
  const R = { w: 11.4, d: 7.2 }; const k = kit(scene); const fl = new THREE.Mesh(new THREE.BoxGeometry(R.w, 0.2, R.d), M(0x8d8f93)); fl.position.y = -0.1; scene.add(fl);
  const wall = M(0xdcd6c8); const back = new THREE.Mesh(new THREE.BoxGeometry(R.w, 3.6, 0.2), wall); back.position.set(0, 1.8, -R.d / 2); const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.6, R.d), wall); left.position.set(-R.w / 2, 1.8, 0); scene.add(back, left);
  k.box(R.w, 0.4, 0.22, 0xe07b00, 0, 3.4, -R.d / 2 + 0.02); k.box(0.22, 0.4, R.d, 0xe07b00, -R.w / 2 + 0.02, 3.4, 0);
  const shut = kit(scene); for (let i = 0; i < 9; i++) shut.box(4.2, 0.2, 0.08, i % 2 ? 0xb9bcc2 : 0xaaaeb5, -2.4, 0.15 + i * 0.26, -R.d / 2 + 0.14);
  k.box(2.8, 0.95, 0.7, 0x6b6f75, 3.4, 0.48, -R.d / 2 + 0.6); k.box(2.9, 0.07, 0.8, 0xe07b00, 3.4, 0.98, -R.d / 2 + 0.6); k.box(2.6, 1.3, 0.08, 0x8c8f93, 3.4, 2.0, -R.d / 2 + 0.16); for (let i = 0; i < 7; i++) k.box(0.07, 0.5, 0.05, [0xd62828, 0x2a9d8f, 0xf4a261][i % 3], 2.4 + i * 0.33, 2.0, -R.d / 2 + 0.22);
  for (let s = 0; s < 3; s++) { const x = -3.5 + s * 3.5; for (const dx of [-1.55, 1.55]) k.box(0.08, 0.02, 4.8, 0xffffff, x + dx, 0.015, 0.6); k.box(3.1, 0.02, 0.08, 0xffffff, x, 0.015, 3.0); const n = makeNameSprite(`SLOT ${s + 1}`, '#ffe08a'); n.scale.set(2.6, 0.65, 1); n.position.set(x, 0.1, 3.0); n.material.depthTest = true; scene.add(n); }
  for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.35, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1b8, side: THREE.DoubleSide })); b.position.set(-3.5 + i * 3.5, 3.2, 0.5); scene.add(b); const gl = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 1.5, 3.0, 14, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1b8, transparent: true, opacity: 0.06, side: THREE.DoubleSide })); gl.position.set(-3.5 + i * 3.5, 1.7, 0.5); scene.add(gl); }
  const tg = new THREE.Group(); tg.position.set(5.0, 0, 2.6); kit(tg); D.tyres(tg, kit(tg), {}); scene.add(tg);
  const dr = new THREE.Group(); dr.position.set(-5.0, 0, 2.8); D.drum(dr, kit(dr), {}); scene.add(dr); void anim; return R;
}
