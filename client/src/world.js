// Builds the static 3D district from the data-driven city config (roads, buildings, billboards, shops, jobs ...).
import * as THREE from 'three';
import { Builder, mulberry32 } from '../sample/builder.js';
import { wallTextures, roadTexture, groundTexture, waterTexture, tex2 } from './textures.js';
import { roadPts, isCurved, offsetPoly, polyLen } from './roadgeom.js';
import { lampPositions, lampLevel, lampsOn, LAMP } from './lamps.js';

const lerpC = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);

function signTexture(text, bg, fg = '#fff', w = 512, hgt = 128) {
  const c = document.createElement('canvas'); c.width = w; c.height = hgt; const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, hgt); g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 6; g.strokeRect(6, 6, w - 12, hgt - 12);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; let fs = 62; g.font = `${fs}px "Lilita One", Nunito, sans-serif`;
  while (g.measureText(text).width > w - 40 && fs > 18) { fs -= 4; g.font = `${fs}px "Lilita One", Nunito, sans-serif`; }
  g.fillText(text, w / 2, hgt / 2 + 3); return tex2(c);
}

export function buildWorld(city) {
  const scene = new THREE.Scene();
  const root = new THREE.Group(); scene.add(root);
  const colliders = []; const boards = {}; const doorMarkers = {}; const labels = [];
  const hemi = new THREE.HemisphereLight(0xdfefff, 0x6b5f4a, 0.9); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1d6, 1.4); sun.position.set(120, 200, 80); scene.add(sun);
  const vcMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const wt = wallTextures();
  const wallMat = new THREE.MeshLambertMaterial({ vertexColors: true, map: wt.map, emissive: 0xffffff, emissiveMap: wt.emissiveMap, emissiveIntensity: 0 });
  const wallB = (seed) => { const b = new Builder(seed, 0.04); b.uvScale = 1 / 3.4; return b; };
  const plain = new Builder(7, 0.03); const walls = wallB(11); const glassB = new Builder(5, 0.0);
  const rnd = mulberry32(99);
  const B = city.bounds;

  // ---- ground + sidewalks
  const gt = groundTexture(); gt.repeat.set(60, 60);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: gt, color: 0xcfc9b6 })); ground.position.set(0, -0.02, -60); root.add(ground);
  for (const z of city.zones) { // sidewalk slabs per block
    plain.box(z.x1 - z.x0 + 6, 0.2, z.z1 - z.z0 + 6, (z.x0 + z.x1) / 2, -0.02, (z.z0 + z.z1) / 2, 0xbdb7a6, { noAO: true, jit: 0.02 });
  }
  // ---- roads
  const rt = roadTexture(); const roadMeshes = [];
  for (const r of city.roads) {
    if (isCurved(r)) continue;
    const len = Math.hypot(r.x2 - r.x1, r.z2 - r.z1); const alongX = Math.abs(r.x2 - r.x1) > Math.abs(r.z2 - r.z1);
    const t = rt.clone(); t.needsUpdate = true; t.repeat.set(1, len / 56);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(r.width, len).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: t }));
    m.position.set((r.x1 + r.x2) / 2, 0.02 + (alongX ? 0 : 0.005), (r.z1 + r.z2) / 2); if (alongX) m.rotation.y = Math.PI / 2; root.add(m);
  }
  // curved roads (road data v2): a ribbon along the polyline, raised a little so the block sidewalk slabs do not hide it
  const ribbon = (pts, w, y, mat, vScale) => { const L = offsetPoly(pts, -w / 2, false), R = offsetPoly(pts, w / 2, false); const pos = [], uv = [], idx = []; let acc = 0;
    for (let i = 0; i < pts.length; i++) { if (i) acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); pos.push(L[i][0], y, L[i][1], R[i][0], y, R[i][1]); uv.push(0, acc / vScale, 1, acc / vScale); if (i) { const k = i * 2; idx.push(k - 2, k, k - 1, k - 1, k, k + 1); } }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); const m = new THREE.Mesh(g, mat); root.add(m); return m; };
  const kerbMat = new THREE.MeshLambertMaterial({ color: 0xb9b39a }); const curvedMats = [];
  for (const r of city.roads) { if (!isCurved(r)) continue; const t = rt.clone(); t.needsUpdate = true; t.repeat.set(1, 1); const mat = new THREE.MeshLambertMaterial({ map: t, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }); curvedMats.push(mat); ribbon(roadPts(r), r.width + 1.6, 0.085, kerbMat, 56); ribbon(roadPts(r), r.width, 0.09, mat, 56); }
  // roundabouts: asphalt ring, kerbed grass island with a palm, dashed lane circle
  const roundabouts = city.roundabouts || [];
  const asphalt = new THREE.MeshLambertMaterial({ color: 0x34373c, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  for (const o of roundabouts) {
    const ringG = new THREE.RingGeometry(o.islandR, o.outerR, 48, 1).rotateX(-Math.PI / 2); const ring = new THREE.Mesh(ringG, asphalt); ring.position.set(o.x, 0.09, o.z); root.add(ring);
    plain.cyl(o.islandR + 0.6, o.islandR + 0.6, 0.35, 20, o.x, 0.08, o.z, 0xb9b39a, { noAO: true }); plain.cyl(o.islandR - 0.2, o.islandR - 0.2, 0.42, 20, o.x, 0.08, o.z, 0x4f8a45, { noAO: true });
    const Rc = (o.outerR + o.islandR) / 2; for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; plain.box(0.25, 0.04, 2.2, o.x + Math.cos(a) * Rc, 0.1, o.z + Math.sin(a) * Rc, 0xf2d23c, { noAO: true, jit: 0, ry: -a }); }
    for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2 + Math.PI / 4; plain.box(1.3, 0.5, 0.5, o.x + Math.cos(a) * (o.islandR + 0.6), 0.2, o.z + Math.sin(a) * (o.islandR + 0.6), 0xffffff, { noAO: true, jit: 0, ry: -a }); }
    palm(plain, o.x, o.z, 0.8); const q = o.islandR * 0.62; colliders.push({ id: o.id, h: 1.2, x0: o.x - q, x1: o.x + q, z0: o.z - q, z1: o.z + q });
  }
  const inRA = (x, z) => roundabouts.some(o => Math.hypot(x - o.x, z - o.z) < 1);
  const xs = city.roads.filter(r => !isCurved(r) && r.x1 === r.x2).map(r => r.x1), zs = city.roads.filter(r => !isCurved(r) && r.z1 === r.z2).map(r => r.z1);
  for (const x of xs) for (const z of zs) {
    if (inRA(x, z)) continue;
    plain.box(14, 0.05, 14, x, 0.0, z, 0x34373c, { noAO: true, jit: 0 });
    for (let i = -3; i <= 3; i++) for (const [dx, dz, w, d] of [[0, -8.5, 1, 3], [0, 8.5, 1, 3], [-8.5, 0, 3, 1], [8.5, 0, 3, 1]]) plain.box(w, 0.06, d, x + dx + (dx === 0 ? i * 1.8 : 0), 0.0, z + dz + (dz === 0 ? i * 1.8 : 0), 0xeeeeea, { noAO: true, jit: 0 });
  }
  // ---- street lights (lamps.js): static poles and arms here, glowing heads and light pools are instanced and follow the night level
  const lamps = lampPositions(city);
  for (const l of lamps) lamp(plain, l);
  const lampHeads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.16, 0.45), new THREE.MeshBasicMaterial({ color: 0xffffff }), Math.max(1, lamps.length)); lampHeads.frustumCulled = false;
  const poolTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,214,140,.85)'); gr.addColorStop(0.5, 'rgba(255,190,100,.32)'); gr.addColorStop(1, 'rgba(255,170,80,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); return t; })();
  const lampPools = new THREE.InstancedMesh(new THREE.PlaneGeometry(LAMP.poolR * 2, LAMP.poolR * 2).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), Math.max(1, lamps.length)); lampPools.frustumCulled = false; lampPools.renderOrder = 2;
  { const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 1, 0);
    lamps.forEach((l, i) => { q.setFromAxisAngle(up, Math.atan2(-l.fz, l.fx)); m.compose(new THREE.Vector3(l.x + l.fx * 1.0, 6.22, l.z + l.fz * 1.0), q, sc); lampHeads.setMatrixAt(i, m); m.compose(new THREE.Vector3(l.x + l.fx * LAMP.poolOffset, 0.13, l.z + l.fz * LAMP.poolOffset), new THREE.Quaternion(), sc); lampPools.setMatrixAt(i, m); }); }
  root.add(lampHeads, lampPools); const warm = new THREE.Color(0xffe3a0), cold = new THREE.Color(0x77776b), tmpC = new THREE.Color(); let lampLvl = -1, lampClock = 0, lampFlickerT = 0;
  const applyLamps = (t) => { const lv = lampsOn(night); for (const l of lamps) { if (lv > 0 || lampLvl !== 0) { const b = lampLevel(l, lv, t); lampHeads.setColorAt(l.id, tmpC.copy(cold).lerp(warm, b)); lampPools.setColorAt(l.id, tmpC.setScalar(b)); } } if (lampHeads.instanceColor) lampHeads.instanceColor.needsUpdate = true; if (lampPools.instanceColor) lampPools.instanceColor.needsUpdate = true; lampPools.visible = lv > 0.02; lampLvl = lv; };
  function lamp(b, l) { b.cyl(0.12, 0.16, 6.5, 6, l.x, 0, l.z, 0x3b3f45, { noAO: true }); b.box(1.4, 0.18, 0.3, l.x + l.fx * 0.55, 6.4, l.z + l.fz * 0.55, 0x3b3f45, { noAO: true, ry: Math.atan2(-l.fz, l.fx) }); }
  function palm(b, x, z, s = 1) {
    const hgt = 7 * s; b.cyl(0.22 * s, 0.35 * s, hgt, 6, x, 0, z, 0x8a6a45, { noAO: true });
    for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; b.box(0.5 * s, 0.1, 3.4 * s, x + Math.cos(a) * 1.6 * s, hgt + 0.1, z + Math.sin(a) * 1.6 * s, 0x2f8f3a, { ry: -a + Math.PI / 2, rx: 0.5, noAO: true }); }
  }
  for (let x = -230; x < 240; x += 24) palm(plain, x, 148 + (rnd() * 6 - 3), 0.9 + rnd() * 0.5);
  for (let i = 0; i < 40; i++) { const z = city.zones[(rnd() * 12) | 0]; if (!z) continue; const x = z.x0 + 3 + rnd() * (z.x1 - z.x0 - 6), zz = z.z0 + (rnd() < 0.5 ? 3 : z.z1 - z.z0 - 3); if (zz < 140) palm(plain, x, zz, 0.7 + rnd() * 0.4); }

  // ---- buildings
  const signs = [];
  const addSign = (text, bg, x, y, z, w, h, face) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: signTexture(text, bg), side: THREE.FrontSide })); m.position.set(x, y, z); m.rotation.y = Math.atan2(face[0], face[1]); root.add(m); signs.push(m); return m; };
  const frontPos = (b, off = 0.08) => [b.x + b.face[0] * (b.w / 2 + off), b.z + b.face[1] * (b.d / 2 + off)];
  for (const b of city.buildings) {
    const hw = b.w / 2, hd = b.d / 2; colliders.push({ id: b.id, h: b.h, x0: b.x - hw - 0.6, x1: b.x + hw + 0.6, z0: b.z - hd - 0.6, z1: b.z + hd + 0.6 });
    const [fx, fz] = b.face; const ry = Math.atan2(fx, fz);
    if (b.kind === 'house') {
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color);
      if (b.tier === 1) { plain.box(b.w + 0.6, 0.5, b.d + 0.6, b.x, b.h, b.z, 0x6b6d70); for (let i = 0; i < 3; i++) plain.box(1.2, 1.4, 1.2, b.x - b.w / 3 + i * (b.w / 3), b.h + 0.5, b.z - b.d / 4, 0x2f4f6f); /* water tanks */ }
      else plain.gable(b.w + 1.2, b.d + 1.2, b.tier === 3 ? 3.4 : 2.6, b.x, b.h, b.z, b.roof);
      const [px, pz] = frontPos(b, 0.04); const dw = 1.9, dh = 2.8;
      plain.box(Math.abs(fz) > 0 ? dw : 0.3, dh, Math.abs(fz) > 0 ? 0.3 : dw, px, 0, pz, 0x4a2f1c, { noAO: true });
      plain.box(Math.abs(fz) > 0 ? 3.4 : 1.6, 0.3, Math.abs(fz) > 0 ? 1.6 : 3.4, px + fx * 0.8, 0, pz + fz * 0.8, 0xa9a396, { noAO: true });
      if (b.tier === 3) plain.box(Math.abs(fz) > 0 ? b.w * 0.5 : 2, 0.25, Math.abs(fz) > 0 ? 2 : b.d * 0.5, b.x + fx * (hw + 0.8), b.h * 0.62, b.z + fz * (hd + 0.8), 0xb7b2a5, { noAO: true });
    } else if (b.kind === 'tower') {
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w * 0.7, 3, b.d * 0.7, b.x, b.h, b.z, 0x5b6770); plain.cyl(0.2, 0.3, 14, 5, b.x, b.h + 3, b.z, 0xb0b5ba, { noAO: true }); plain.box(0.8, 0.8, 0.8, b.x, b.h + 17, b.z, 0xff3b30, { noAO: true, jit: 0 });
      plain.box(b.w + 0.4, 1.4, b.d + 0.4, b.x, 0, b.z, 0x4b535a, { noAO: true });
    } else if (b.kind === 'shop') {
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 0.8, 0.4, b.d + 0.8, b.x, b.h, b.z, 0x8a8f94);
      const [px, pz] = frontPos(b, 0.6); plain.box(Math.abs(fz) ? b.w - 2 : 2.6, 0.3, Math.abs(fz) ? 2.6 : b.d - 2, px, 3.9, pz, 0xd0392b, { noAO: true });
      const [sx, sz] = frontPos(b, 0.12); addSign(b.label, b.sign || '#2c6fbb', sx, 5.4, sz, Math.min(b.w - 3, 16), 2.6, b.face);
      const [dx, dz] = frontPos(b, 0.05); glassB.box(Math.abs(fz) ? 4 : 0.2, 2.6, Math.abs(fz) ? 0.2 : 4, dx, 0.2, dz, 0x9cc7d9, { noAO: true, jit: 0 });
    } else if (b.kind === 'market') {
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) plain.cyl(0.25, 0.25, 4.4, 6, b.x + sx * (hw - 1), 0, b.z + sz * (hd - 1), 0x6d4c41, { noAO: true });
      plain.box(b.w + 1, 0.4, b.d + 1, b.x, 4.4, b.z, 0xbf8f2f, { noAO: true }); // zinc roof
      const cols = [0xd84315, 0x1e88e5, 0x43a047, 0xfdd835, 0x8e24aa, 0xf4511e];
      for (let i = 0; i < 12; i++) { const px = b.x - hw + 3 + (i % 4) * ((b.w - 6) / 3), pz = b.z - hd + 5 + Math.floor(i / 4) * ((b.d - 10) / 2); plain.box(3.4, 1.0, 1.8, px, 0, pz, cols[i % cols.length]); plain.box(3.8, 0.12, 2.2, px, 2.6, pz, cols[(i + 2) % cols.length], { noAO: true }); }
      const [sx, sz] = frontPos(b, 0.5); addSign('BALOGUN-STYLE MARKET', '#8d3b13', sx, 5.9, sz, 22, 2.4, b.face);
    } else if (b.kind === 'office' || b.kind === 'kiosk') {
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 0.6, 0.3, b.d + 0.6, b.x, b.h, b.z, 0x6b6d70);
      if (b.label) { const [sx, sz] = frontPos(b, 0.12); addSign(b.label, '#0b6b3a', sx, b.h - 1.3, sz, Math.min(b.w - 1, 14), 2.2, b.face); }
    } else if (b.kind === 'airport') {
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 6, 0.8, b.d + 6, b.x, b.h, b.z, 0x8895a3); plain.box(b.w * 0.9, 2.2, 3, b.x, 3, b.z + b.d / 2 + 0.3, 0x4a6b86, { noAO: true });
      plain.box(8, 26, 8, b.x + b.w / 2 + 12, 0, b.z - 6, 0xcfd6dd); plain.box(12, 6, 12, b.x + b.w / 2 + 12, 26, b.z - 6, 0x6f8fa8);
      const [sx, sz] = frontPos(b, 0.12); addSign('AIRPORT (placeholder)', '#124d8a', sx, b.h + 4, sz, 40, 4, b.face);
    }
  }
  // ---- plaza landmark + flag
  const pl = city.landmarks.find(l => l.id === 'plaza'); if (pl) {
    const px = pl.x - 52, pz = pl.z - 52; plain.box(30, 0.3, 30, px, 0, pz, 0xd7cfbd, { noAO: true }); plain.cyl(5, 5.5, 0.9, 16, px, 0.3, pz, 0x8f9aa3); plain.cyl(0.5, 0.7, 3.5, 8, px, 0.3, pz, 0x8f9aa3); plain.cyl(2.2, 0.6, 0.5, 12, px, 3.7, pz, 0x7fd1e8, { noAO: true });
    for (const a of [0, 1, 2, 3]) plain.box(3, 0.6, 1, px + Math.cos(a * 1.57) * 9, 0.3, pz + Math.sin(a * 1.57) * 9, 0x6d4c41, { ry: -a * 1.57 });
    plain.cyl(0.12, 0.12, 14, 6, px + 12, 0.3, pz - 12, 0xdddddd, { noAO: true }); for (const [i, c] of [[0, 0x008751], [1, 0xffffff], [2, 0x008751]]) plain.box(0.15, 1.5, 1.1, px + 12 + 0.1, 11 + 0, pz - 12 - 0.55 + i * 1.1, c, { noAO: true, jit: 0 });
    labels.push({ text: pl.name, x: px, z: pz });
  }
  // ---- billboards (+ lagoon pontoons)
  const frameMat = new THREE.MeshLambertMaterial({ color: 0x20232a });
  for (const bd of city.billboards) {
    const g = new THREE.Group(); g.position.set(bd.x, 0, bd.z); g.rotation.y = Math.atan2(bd.nx, bd.nz); root.add(g);
    const py = bd.y; const post = (x) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, py + bd.h / 2, 8), frameMat); m.position.set(x, (py + bd.h / 2) / 2, -0.4); g.add(m); };
    post(-bd.w * 0.3); post(bd.w * 0.3);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 0.9, bd.h + 0.9, 0.5), frameMat); frame.position.set(0, py, 0); g.add(frame);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff }); const panel = new THREE.Mesh(new THREE.PlaneGeometry(bd.w, bd.h), mat); panel.position.set(0, py, 0.27); g.add(panel);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 1.2, 0.25, 0.9), frameMat); cap.position.set(0, py + bd.h / 2 + 0.55, 0.05); g.add(cap);
    if (bd.surface === 'lagoon_plot') { const pon = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 4, 1.4, 5), new THREE.MeshLambertMaterial({ color: 0x8b7d62 })); pon.position.set(0, -0.2, -0.4); g.add(pon); }
    boards[bd.id] = { def: bd, group: g, panel, mat, current: null };
  }
  // ---- water (lagoon)
  const wt2 = waterTexture(); wt2.repeat.set(20, 8);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(city.water.maxX - city.water.minX, city.water.maxZ - city.water.minZ).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: wt2, transparent: true, opacity: 0.92 }));
  water.position.set(0, -0.5, (city.water.minZ + city.water.maxZ) / 2); root.add(water);
  plain.box(city.bounds.maxX - city.bounds.minX + 40, 1.2, 4, 0, -0.9, B.maxZ - 1, 0x9a927f, { noAO: true }); // sea wall
  // far skyline silhouettes (Third-Mainland-style bridge + towers) as backdrop
  const sky = new Builder(31, 0.05);
  for (let i = 0; i < 26; i++) { const x = -420 + i * 34 + rnd() * 10; sky.box(14 + rnd() * 14, 30 + rnd() * 70, 14, x, -2, -340 - rnd() * 40, 0x7a8da3, { noAO: true }); }
  for (let i = 0; i < 20; i++) { const x = -330 + i * 34; sky.box(26, 1.6, 6, x, 12, 310, 0x8a8d92, { noAO: true }); if (i % 4 === 0) sky.box(2, 26, 2, x, -2, 310, 0x8a8d92, { noAO: true }); } // bridge across the lagoon
  const skyMesh = new THREE.Mesh(sky.build(), new THREE.MeshLambertMaterial({ vertexColors: true, fog: true })); root.add(skyMesh);
  // ---- merge + add
  for (const [b, m] of [[plain, vcMat], [walls, wallMat], [glassB, vcMat]]) { const geo = b.build(); if (geo.attributes.position) root.add(new THREE.Mesh(geo, m)); }

  // ---- ownership markers floating over each house door (updated from the API)
  const markerGeo = new THREE.ConeGeometry(0.8, 1.6, 4).rotateX(Math.PI);
  for (const p of city.properties) {
    const m = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color: 0x35c46b })); m.position.set(p.door.x, 5.2, p.door.z); root.add(m); doorMarkers[p.id] = m;
  }
  const markerColor = { available: 0x35c46b, taken: 0x8a8f98, yours: 0xffc20e };
  const waterSpeed = { x: 0.004 };
  const fogC = new THREE.Color('#9fd3ee'); scene.fog = new THREE.Fog(fogC, 140, 520);
  let night = 0; applyLamps(0);
  const api = {
    scene, colliders, boards, doorMarkers, labels, root,
    setMarkers(props) { for (const p of props) { const m = doorMarkers[p.id]; if (m) m.material.color.setHex(markerColor[p.status] || 0x35c46b); } },
    setTime(minutes) { // 0..1440
      const t = minutes / 1440; const a = (t - 0.25) * Math.PI * 2; const h = Math.sin(a); const day = Math.max(0, Math.min(1, h * 1.8 + 0.25));
      night = 1 - day; const dusk = Math.max(0, 1 - Math.abs(h) * 3.2);
      const sky = lerpC(lerpC('#0a1230', '#8fd0f5', day), '#f08a4b', dusk * 0.7);
      scene.background = sky; scene.fog.color.copy(sky);
      sun.intensity = 0.15 + day * 1.4; sun.color.set(lerpC('#fff1d6', '#ff9a55', dusk)); sun.position.set(Math.cos(a) * 200, Math.max(30, Math.sin(a) * 220), 80);
      hemi.intensity = 0.35 + day * 0.65; hemi.color.set(lerpC('#2b3a6b', '#dfefff', day));
      wallMat.emissiveIntensity = night * 0.95; applyLamps(lampClock); return { day, night };
    },
    animate(dt) { wt2.offset.x += dt * 0.004; wt2.offset.y += dt * 0.002; lampClock += dt / 1000; lampFlickerT += dt; if (lampLvl > 0 && lampFlickerT > 90) { lampFlickerT = 0; applyLamps(lampClock); } },
    lamps, lampHeads, lampPools, get lampLevel() { return lampLvl; },
    get night() { return night; }
  };
  return api;
}
