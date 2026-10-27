// Builds the static 3D district from the data-driven city config (roads, buildings, billboards, shops, jobs ...).
import * as THREE from 'three';
import { Builder, mulberry32 } from '../sample/builder.js';
import { wallTextures, roadTexture, groundTexture, waterTexture, tex2, houseAd } from './textures.js';
import { planAdWalls } from './adwalls.js';
import { roadPts, isCurved, offsetPoly, polyLen, roadAt } from './roadgeom.js';
import { planRoadHazards, hazardAt as pickHazard } from './road-hazards.js';
import { strut, subtractRects, creekVisual, creekColliders, drawExtraBuilding, drawLagosBlock, drawBeach, drawJetty, drawLink, drawBeamBridge, drawCableBridge, drawStadium, drawHill, drawWall, drawDyePits, drawMotorPark, drawFarm, drawPen, drawWell, drawPalmLine } from './landmarks3d.js';
import { lampPositions, lampLevel, lampsOn, LAMP } from './lamps.js';
import { nameTag } from './textures.js';

const lerpC = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);
/** sidewalk slab. A roundabout bites the block as a circular kerb, not a square corner. */
function sidewalkMesh(z, roundabouts) {
  const x0 = z.x0 - 3, x1 = z.x1 + 3, z0 = z.z0 - 3, z1 = z.z1 + 3;
  const near = (roundabouts || []).filter((o) => {
    const x = Math.max(x0, Math.min(o.x, x1)), zz = Math.max(z0, Math.min(o.z, z1));
    return Math.hypot(o.x - x, o.z - zz) < o.outerR - 0.05;
  });
  if (!near.length) return null;
  let poly = [{ x: x0, z: z0 }, { x: x0, z: z1 }, { x: x1, z: z1 }, { x: x1, z: z0 }];
  for (const o of near) {
    poly = cutCircle(poly, o.x, o.z, Math.max(1, o.outerR - 0.15));
    if (poly.length < 3) return null;
  }
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const shape = new THREE.Shape();
  poly.forEach((pt, i) => { const sx = pt.x - cx, sy = -(pt.z - cz); if (i) shape.lineTo(sx, sy); else shape.moveTo(sx, sy); });
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false, curveSegments: 1 });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: 0xbdb7a6 }));
  mesh.name = "round-kerb";
  mesh.position.set(cx, -0.02, cz);
  return mesh;
}
/** Keep the part of a polygon that sits outside a circle, replacing the bite with the arc. */
function cutCircle(poly, cx, cz, R) {
  const dist = (p) => Math.hypot(p.x - cx, p.z - cz);
  const keep = (p) => dist(p) >= R - 0.02;
  const s = poly.findIndex(keep);
  if (s < 0) return [];
  poly = poly.slice(s).concat(poly.slice(0, s));
  const out = [];
  const push = (p) => { const last = out[out.length - 1]; if (!last || Math.hypot(last.x - p.x, last.z - p.z) > 0.03) out.push({ x: p.x, z: p.z }); };
  const arc = (from, to) => {
    let a0 = Math.atan2(from.z - cz, from.x - cx), a1 = Math.atan2(to.z - cz, to.x - cx);
    let d = a1 - a0; if (d < 0) d += Math.PI * 2;
    const steps = Math.max(2, Math.ceil((d / (Math.PI * 2)) * 72));
    for (let i = 1; i <= steps; i++) { const a = a0 + d * (i / steps); push({ x: cx + Math.cos(a) * R, z: cz + Math.sin(a) * R }); }
  };
  const hitsOf = (a, b) => {
    const dx = b.x - a.x, dz = b.z - a.z, fx = a.x - cx, fz = a.z - cz, A = dx * dx + dz * dz;
    if (A < 1e-9) return [];
    const B = 2 * (fx * dx + fz * dz), C = fx * fx + fz * fz - R * R, disc = B * B - 4 * A * C;
    if (disc < 0) return [];
    const rt = Math.sqrt(disc);
    return [(-B - rt) / (2 * A), (-B + rt) / (2 * A)].filter((t) => t > 0.001 && t < 0.999).sort((p, q) => p - q).map((t) => ({ x: a.x + dx * t, z: a.z + dz * t }));
  };
  let pending = null;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length], ka = keep(a), kb = keep(b), hits = hitsOf(a, b);
    if (ka && kb) { push(a); if (hits.length === 2) { push(hits[0]); arc(hits[0], hits[1]); } }
    else if (ka && !kb) { push(a); if (hits.length) pending = hits[0]; }
    else if (!ka && kb) { const enter = hits.length ? hits[hits.length - 1] : b; if (pending) arc(pending, enter); else push(enter); pending = null; }
    else if (hits.length === 2) { if (pending) arc(pending, hits[0]); else push(hits[0]); push(hits[1]); pending = hits[1]; }
  }
  return out;
}

// monipay.ng: violet mark (#6F2CDE), white disc, lowercase wordmark in near-black.
const MONIPAY = { purple: '#6F2CDE', ink: '#16122A' };
let ttaSign;
function ttaSignTexture() {
  if (ttaSign) return ttaSign;
  const w = 2048, h = 512; const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, w, h); bg.addColorStop(0, '#16344f'); bg.addColorStop(1, '#0b1c2e'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(0,194,184,.14)'; for (let i = 0; i < 8; i++) g.fillRect(80 + i * 250, 36, 160, 440);
  g.fillStyle = '#00c2b8'; g.fillRect(0, 0, 36, h); g.fillRect(0, h - 10, w, 10); g.fillRect(0, 0, w, 6);
  g.fillStyle = '#ffffff'; g.font = '800 250px Nunito, system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('TTA', w / 2 + 12, 190);
  g.fillStyle = '#00c2b8'; g.fillRect(w / 2 - 280, 330, 560, 6);
  g.font = '700 78px Nunito, system-ui, sans-serif'; g.fillText('TECH TALENT', w / 2 + 12, 400);
  ttaSign = tex2(c); ttaSign.anisotropy = 16; return ttaSign;
}
/** Two-storey Tech Talent block: floor band, window bays, entrance, roof kit. */
function drawTtaBuilding(b, { walls, glassB, plain, root, signs, frontPos }) {
  const [fx, fz] = b.face; const along = Math.abs(fz) > 0.5; const hw = b.w / 2, hd = b.d / 2; const H = b.h;
  const teal = 0x00c2b8, frame = 0x07141f, glass = 0xd4f3fb, mid = H * 0.46;
  walls.box(b.w, mid, b.d, b.x, 0, b.z, b.color || '#10243a');
  walls.box(b.w * 0.99, H - mid, b.d * 0.99, b.x, mid, b.z, '#1a4564');
  plain.box(b.w + 0.45, 0.22, b.d + 0.45, b.x, mid - 0.02, b.z, teal, { noAO: true });
  plain.box(b.w + 0.25, 0.5, b.d + 0.25, b.x, H, b.z, 0x0c1c2c, { noAO: true });
  plain.box(b.w + 0.7, 0.22, b.d + 0.7, b.x, H + 0.5, b.z, teal, { noAO: true });
  for (const s of [-1, 1]) {
    plain.box(along ? 0.28 : 0.16, H, along ? 0.16 : 0.28, b.x + (along ? s * (hw - 0.2) : fx * (hw + 0.04)), 0, b.z + (along ? fz * (hd + 0.04) : s * (hd - 0.2)), teal, { noAO: true });
  }
  const span = along ? b.w : b.d;
  const at = (t, out) => [b.x + fx * ((along ? hd : hw) + out) + (along ? t : 0), b.z + fz * ((along ? hd : hw) + out) + (along ? 0 : t)];
  const win = (t, y, ww, wh) => {
    const [x, z] = at(t, 0.07);
    glassB.box(along ? ww : 0.08, wh, along ? 0.08 : ww, x, y, z, glass, { noAO: true, jit: 0 });
    const [sx, sz] = at(t, 0.05);
    plain.box(along ? 0.07 : 0.1, wh * 0.92, along ? 0.1 : 0.07, sx, y + wh * 0.04, sz, frame, { noAO: true });
    plain.box(along ? ww : 0.1, 0.06, along ? 0.1 : ww, sx, y + wh * 0.48, sz, frame, { noAO: true });
    plain.box(along ? ww + 0.16 : 0.12, 0.08, along ? 0.12 : ww + 0.16, sx, y + wh, sz, frame, { noAO: true });
    plain.box(along ? ww + 0.16 : 0.12, 0.07, along ? 0.12 : ww + 0.16, sx, y - 0.02, sz, teal, { noAO: true });
  };
  const row = (n, width, y, wh, skip) => { const step = (span * width) / (n - 1); for (let i = 0; i < n; i++) { if (skip && i === skip) continue; win((i - (n - 1) / 2) * step, y, Math.min(1.45, step * 0.72), wh); } };
  row(5, 0.72, 0.85, 1.9, 2);
  row(7, 0.82, mid + 0.42, 1.55, null);
  for (const s of [-1, 1]) for (const t of [-0.22, 0.22]) {
    const x = b.x + (along ? s * (hw + 0.05) : t * b.w), z = b.z + (along ? t * b.d : s * (hd + 0.05));
    for (const [y, wh] of [[0.95, 1.7], [mid + 0.55, 1.4]]) glassB.box(along ? 0.08 : 1.45, wh, along ? 1.45 : 0.08, x, y, z, 0xb7e6f4, { noAO: true, jit: 0 });
  }
  const [dx, dz] = frontPos(b, 0.08); const doorH = Math.min(2.95, mid - 0.55), doorW = 2.5;
  plain.box(along ? doorW + 0.4 : 0.18, doorH + 0.12, along ? 0.18 : doorW + 0.4, dx, 0, dz, frame, { noAO: true });
  for (const s of [-0.55, 0.55]) glassB.box(along ? 0.85 : 0.06, doorH - 0.2, along ? 0.06 : 0.85, dx + (along ? s : fx * 0.03), 0.06, dz + (along ? fz * 0.03 : s), glass, { noAO: true, jit: 0 });
  const [cx, cz] = frontPos(b, 1.25);
  plain.box(along ? 4.6 : 1.9, 0.1, along ? 1.9 : 4.6, cx, doorH, cz, teal, { noAO: true });
  for (const s of [-1.7, 1.7]) plain.box(0.1, doorH, 0.1, cx + (along ? s : fx * 0.7), 0, cz + (along ? fz * 0.7 : s), frame, { noAO: true });
  const [tx, tz] = frontPos(b, 0.55); plain.box(along ? 3.6 : 1.15, 0.16, along ? 1.15 : 3.6, tx, 0, tz, 0xcfc8b8, { noAO: true });
  const sw = Math.min(span - 3.4, 16), sh = 1.35; const [sx, sz] = frontPos(b, 0.16); const signY = H - 0.42 - sh / 2;
  const board = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshBasicMaterial({ map: ttaSignTexture(), side: THREE.FrontSide }));
  board.position.set(sx, signY, sz); board.rotation.y = Math.atan2(fx, fz); root.add(board); signs.push(board);
  plain.box(2.6, 0.7, 1.8, b.x - b.w * 0.16, H + 0.5, b.z - b.d * 0.08, 0x16344a, { noAO: true });
  plain.cyl(0.07, 0.07, 2.2, 8, b.x + b.w * 0.2, H + 0.5, b.z, 0xd5dae0, { noAO: true });
  plain.box(0.7, 0.07, 0.45, b.x + b.w * 0.2, H + 2.7, b.z, teal, { noAO: true, jit: 0 });
}
function monipaySignTexture() {
  const w = 1024, h = 280; const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
  const cy = h / 2; g.fillStyle = MONIPAY.purple; g.beginPath(); g.arc(148, cy, 98, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#ffffff'; g.font = '800 120px Nunito, system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('m', 148, cy + 8);
  g.fillStyle = MONIPAY.ink; g.font = '800 128px Nunito, system-ui, sans-serif'; g.textAlign = 'left'; g.fillText('monipay', 278, cy + 6);
  return tex2(c);
}
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
  const cableSegs = []; const pylonLights = []; const palmSpots = []; /* trunks you can bump into (Track G item 5) */ const colliders = []; const boards = {}; const doorMarkers = {}; const labels = [];
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
  const gt = groundTexture(); const creeks = city.creeks || []; const gmat = (w, d) => { const t = gt.clone(); t.needsUpdate = true; t.repeat.set(w / 15, d / 15); return new THREE.MeshLambertMaterial({ map: t, color: 0xcfc9b6 }); };
  for (const r of subtractRects({ x0: Math.min(-450, B.minX - 40), x1: Math.max(450, B.maxX + 40), z0: Math.min(-510, B.minZ - 40), z1: Math.max(390, B.maxZ + 120) }, creeks.map(c => creekVisual(c, city.bounds)))) { const w = r.x1 - r.x0, d = r.z1 - r.z0; if (w < 0.5 || d < 0.5) continue; const g = new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), gmat(w, d)); g.position.set((r.x0 + r.x1) / 2, -0.02, (r.z0 + r.z1) / 2); root.add(g); }
  for (const z of city.zones) { // sidewalk slabs per block; roundabout corners are cut to the circle
    const curved = sidewalkMesh(z, city.roundabouts);
    if (curved) root.add(curved);
    else plain.box(z.x1 - z.x0 + 6, 0.2, z.z1 - z.z0 + 6, (z.x0 + z.x1) / 2, -0.02, (z.z0 + z.z1) / 2, 0xbdb7a6, { noAO: true, jit: 0.02 });
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
  // ---- potholes on some streets, speed bumps on others (see road-hazards.js)
  const roadHazards = planRoadHazards(city);
  for (const h of roadHazards) {
    if (h.kind === 'pothole') {
      plain.cyl(1.15, 0.95, 0.07, 8, h.x, -0.005, h.z, 0x1a1c1f, { noAO: true });
      plain.cyl(0.72, 0.55, 0.05, 7, h.x + 0.12, -0.015, h.z - 0.08, 0x101214, { noAO: true });
      for (let k = 0; k < 5; k++) {
        const a = h.yaw + (k / 5) * Math.PI * 2;
        plain.box(0.38, 0.045, 0.2, h.x + Math.cos(a) * 1.05, 0.045, h.z + Math.sin(a) * 1.05, 0x2c3036, { noAO: true, ry: a, jit: 0 });
      }
    } else {
      // Painted speed marking only — no raised black bar across the carriageway
      const span = Math.min(h.roadW * 0.7, h.roadW - 1.2);
      for (const s of [-0.28, 0, 0.28]) {
        const ox = Math.cos(h.yaw + Math.PI / 2) * s * span;
        const oz = Math.sin(h.yaw + Math.PI / 2) * s * span;
        plain.box(0.55, 0.03, 0.22, h.x + ox, 0.12, h.z + oz, 0xf2d23c, { noAO: true, ry: h.yaw + Math.PI / 2, jit: 0 });
      }
    }
  }
  // roundabouts: asphalt ring, kerbed grass island with a palm, dashed lane circle
  const roundabouts = city.roundabouts || [];
  const asphalt = new THREE.MeshLambertMaterial({ color: 0x34373c, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  for (const o of roundabouts) {
    const ringG = new THREE.RingGeometry(o.islandR, o.outerR, 64, 1).rotateX(-Math.PI / 2); const ring = new THREE.Mesh(ringG, asphalt); ring.position.set(o.x, 0.09, o.z); root.add(ring);
    plain.cyl(o.islandR + 0.6, o.islandR + 0.6, 0.35, 64, o.x, 0.08, o.z, 0xb9b39a, { noAO: true }); plain.cyl(o.islandR - 0.2, o.islandR - 0.2, 0.42, 64, o.x, 0.08, o.z, 0x4f8a45, { noAO: true });
    const Rc = (o.outerR + o.islandR) / 2; for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2; plain.box(0.16, 0.025, 0.7, o.x + Math.cos(a) * Rc, 0.115, o.z + Math.sin(a) * Rc, 0xf2d23c, { noAO: true, jit: 0, ry: -a }); }
    const q = o.islandR * 0.62; colliders.push({ id: o.id, h: 1.2, x0: o.x - q, x1: o.x + q, z0: o.z - q, z1: o.z + q });
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
  const lampHeads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.78, 0.18, 0.48), new THREE.MeshBasicMaterial({ color: 0xffffff }), Math.max(1, lamps.length)); lampHeads.frustumCulled = false;
  const poolTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,206,120,.48)'); gr.addColorStop(0.16, 'rgba(255,190,100,.26)'); gr.addColorStop(0.42, 'rgba(255,174,86,.12)'); gr.addColorStop(0.72, 'rgba(255,164,74,.04)'); gr.addColorStop(1, 'rgba(255,160,70,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); return t; })();
  const lampPools = new THREE.InstancedMesh(new THREE.PlaneGeometry(LAMP.poolR * 2, LAMP.poolR * 2).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), Math.max(1, lamps.length)); lampPools.frustumCulled = false; lampPools.renderOrder = 2;
  { const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 1, 0);
    lamps.forEach((l, i) => { q.setFromAxisAngle(up, Math.atan2(-l.fz, l.fx)); m.compose(new THREE.Vector3(l.x + l.fx * 1.0, 6.22, l.z + l.fz * 1.0), q, sc); lampHeads.setMatrixAt(i, m); m.compose(new THREE.Vector3(l.x + l.fx * LAMP.poolOffset, 0.13, l.z + l.fz * LAMP.poolOffset), new THREE.Quaternion(), sc); lampPools.setMatrixAt(i, m); }); }
  root.add(lampHeads, lampPools); const warm = new THREE.Color(0xffe6b0), cold = new THREE.Color(0x8a8a78), tmpC = new THREE.Color(); let lampLvl = -1, lampClock = 0, lampFlickerT = 0;
  const applyLamps = (t) => { const lv = lampsOn(night); for (const l of lamps) { if (lv > 0 || lampLvl !== 0) { const b = lampLevel(l, lv, t); lampHeads.setColorAt(l.id, tmpC.copy(cold).lerp(warm, b)); lampPools.setColorAt(l.id, tmpC.setScalar(b)); } } if (lampHeads.instanceColor) lampHeads.instanceColor.needsUpdate = true; if (lampPools.instanceColor) lampPools.instanceColor.needsUpdate = true; lampPools.visible = lv > 0.02; lampLvl = lv; };
  function lamp(b, l) {
    if (l.bridge) { b.cyl(0.09, 0.14, 3.3, 5, l.x, 0, l.z, 0x2a2e33, { noAO: true }); strut(b, [l.x, 3.3, l.z], [l.x + l.fx * 0.45, 5.35, l.z + l.fz * 0.45], 0.14, 0.14, 0x2a2e33); strut(b, [l.x + l.fx * 0.45, 5.35, l.z + l.fz * 0.45], [l.x + l.fx * 1.05, 6.35, l.z + l.fz * 1.05], 0.1, 0.1, 0x2a2e33); return; }
    b.cyl(0.12, 0.16, 6.5, 6, l.x, 0, l.z, 0x3b3f45, { noAO: true }); b.box(1.4, 0.18, 0.3, l.x + l.fx * 0.55, 6.4, l.z + l.fz * 0.55, 0x3b3f45, { noAO: true, ry: Math.atan2(-l.fz, l.fx) }); }
  function palm(b, x, z, s = 1) {
    palmSpots.push({ x, z, r: 0.35 * s + 0.07 });
    const hgt = 7 * s; b.cyl(0.22 * s, 0.35 * s, hgt, 6, x, 0, z, 0x8a6a45, { noAO: true });
    for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; b.box(0.5 * s, 0.1, 3.4 * s, x + Math.cos(a) * 1.6 * s, hgt + 0.1, z + Math.sin(a) * 1.6 * s, 0x2f8f3a, { ry: -a + Math.PI / 2, rx: 0.5, noAO: true }); }
  }
  // Palms skip roads, buildings, and car parks (Motoka lot sits on the lagoon palm row and was growing through Cybertrucks).
  const palmBlocked = (x, z) => {
    if (roadAt(city, x, z, 1.5)) return true;
    if ((city.buildings || []).some((b) => Math.abs(x - b.x) < b.w / 2 + 1 && Math.abs(z - b.z) < b.d / 2 + 1)) return true;
    if ((city.carParks || []).some((l) => Math.abs(x - l.x) <= l.w / 2 + 2.5 && Math.abs(z - l.z) <= l.d / 2 + 2.5)) return true;
    return false;
  };
  if (city.palmRowZ !== false) for (let x = (city.bounds?.minX ?? -230) + 10; x < (city.bounds?.maxX ?? 240) - 10; x += 24) { const zz = (city.palmRowZ ?? 148) + (rnd() * 6 - 3); if (palmBlocked(x, zz)) continue; palm(plain, x, zz, 0.9 + rnd() * 0.5); }
  for (let i = 0; i < 40; i++) { const z = city.zones[(rnd() * city.zones.length) | 0]; if (!z) continue; const x = z.x0 + 3 + rnd() * (z.x1 - z.x0 - 6), zz = z.z0 + (rnd() < 0.5 ? 3 : z.z1 - z.z0 - 3); if (zz < 140 && !palmBlocked(x, zz)) palm(plain, x, zz, 0.7 + rnd() * 0.4); }

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
      if (b.h >= 70) {
        walls.box(b.w, b.h * 0.55, b.d, b.x, 0, b.z, b.color);
        walls.box(b.w * 0.72, b.h * 0.28, b.d * 0.72, b.x, b.h * 0.55, b.z, b.color);
        plain.box(b.w * 0.42, b.h * 0.17, b.d * 0.42, b.x, b.h * 0.83, b.z, 0xd5dde6, { noAO: true });
        const mast = Math.min(22, b.h * 0.16);
        plain.cyl(0.22, 0.35, mast, 6, b.x, b.h, b.z, 0xb0b5ba, { noAO: true });
        plain.box(1.1, 1.1, 1.1, b.x, b.h + mast, b.z, 0xff3b30, { noAO: true, jit: 0 });
      } else {
        walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w * 0.7, 3, b.d * 0.7, b.x, b.h, b.z, 0x5b6770); plain.cyl(0.2, 0.3, 14, 5, b.x, b.h + 3, b.z, 0xb0b5ba, { noAO: true }); plain.box(0.8, 0.8, 0.8, b.x, b.h + 17, b.z, 0xff3b30, { noAO: true, jit: 0 });
      }
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
      const [sx, sz] = frontPos(b, 0.5); addSign(String(b.label || 'Balogun-style market').toUpperCase(), '#8d3b13', sx, 5.9, sz, 22, 2.4, b.face);
    } else if (b.kind === 'bank') {
      const purple = 0x6f2cde; const along = Math.abs(fz) > 0;
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color || '#f7f4ff'); plain.box(b.w + 0.8, 0.55, b.d + 0.8, b.x, b.h, b.z, purple, { noAO: true });
      const [sx, sz] = frontPos(b, 0.28); const sh = 2.4, sw = Math.min(b.w - 2, 15); const signY = 5.55;
      const fasciaH = sh + 0.4;
      plain.box(along ? sw + 0.5 : 0.16, fasciaH, along ? 0.16 : sw + 0.5, sx - fx * 0.14, signY - fasciaH / 2, sz - fz * 0.14, purple, { noAO: true });
      const board = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshBasicMaterial({ map: monipaySignTexture(), side: THREE.FrontSide }));
      board.position.set(sx, signY, sz); board.rotation.y = Math.atan2(fx, fz); root.add(board); signs.push(board);
      const [dx, dz] = frontPos(b, 0.06); glassB.box(Math.abs(fz) ? 6.2 : 0.2, 3.6, Math.abs(fz) ? 0.2 : 6.2, dx, 0.35, dz, 0xd9c8f5, { noAO: true, jit: 0 });
      plain.box(Math.abs(fz) ? 2.4 : 0.22, 3.2, Math.abs(fz) ? 0.22 : 2.4, dx, 0, dz, purple, { noAO: true });
      for (const s of [-1, 1]) plain.cyl(0.38, 0.42, 4.05, 6, b.x + (along ? s * 3.4 : fx * (hw + 0.45)), 0, b.z + (along ? fz * (hd + 0.45) : s * 3.4), 0xf7f4ff, { noAO: true });
    } else if (b.kind === 'tta') {
      drawTtaBuilding(b, { walls, glassB, plain, root, signs, frontPos });
    } else if (b.kind === 'office' || b.kind === 'kiosk') {
      if (b.tag === 'motoka') {
        walls.box(b.w, b.h * 0.52, b.d, b.x, 0, b.z, b.color || '#f4f8fc');
        walls.box(b.w * 0.98, b.h * 0.48, b.d * 0.98, b.x, b.h * 0.52, b.z, '#e8f2fb');
        plain.box(b.w + 0.8, 0.4, b.d + 0.8, b.x, b.h, b.z, 0x2389e3, { noAO: true });
        plain.box(b.w + 0.4, 0.18, b.d + 0.4, b.x, b.h * 0.52, b.z, 0x05243f, { noAO: true });
        const [gx, gz] = frontPos(b, 0.05);
        glassB.box(Math.abs(fz) ? b.w * 0.78 : 0.18, b.h * 0.36, Math.abs(fz) ? 0.18 : b.d * 0.78, gx, b.h * 0.1, gz, 0xb9ddf6, { noAO: true, jit: 0 });
        glassB.box(Math.abs(fz) ? b.w * 0.72 : 0.18, b.h * 0.28, Math.abs(fz) ? 0.18 : b.d * 0.72, gx, b.h * 0.58, gz, 0xb9ddf6, { noAO: true, jit: 0 });
        plain.box(Math.abs(fz) ? 2.6 : 0.2, 3.2, Math.abs(fz) ? 0.2 : 2.6, gx, 0, gz, 0x05243f, { noAO: true });
      } else if (b.tag === 'motoka-meko') {
        walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color || '#0d3b2e');
        plain.box(b.w + 0.8, 0.35, b.d + 0.8, b.x, b.h, b.z, 0x2389e3, { noAO: true });
        plain.box(b.w * 0.9, 0.2, b.d * 0.9, b.x, b.h * 0.55, b.z, 0xe07b00, { noAO: true });
        const [gx, gz] = frontPos(b, 0.08);
        // open garage mouth (drive-in bay)
        plain.box(Math.abs(fz) ? b.w * 0.7 : 0.15, b.h * 0.55, Math.abs(fz) ? 0.15 : b.d * 0.7, gx, 0, gz, 0x1a1a1a, { noAO: true });
        plain.box(Math.abs(fz) ? b.w * 0.72 : 0.2, 0.25, Math.abs(fz) ? 0.2 : b.d * 0.72, gx, b.h * 0.55, gz, 0xe07b00, { noAO: true });
        const [sx, sz] = frontPos(b, 0.14); addSign(b.label || 'Motoka Meko', '#2389e3', sx, b.h - 1.1, sz, Math.min(b.w - 1, 14), 2.0, b.face);
      } else if (b.tag === 'armoury') {
        // Full Iron Gate Armoury block: dark shell, red fascia, barred gate, one facade sign (no floating shop spam).
        const red = parseInt(String(b.sign || '#c0392b').replace('#', ''), 16);
        walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color || '#1a1f28');
        plain.box(b.w + 0.9, 0.45, b.d + 0.9, b.x, b.h, b.z, red, { noAO: true });
        plain.box(b.w * 0.96, 0.22, b.d * 0.96, b.x, b.h * 0.62, b.z, 0x0d1016, { noAO: true });
        const [gx, gz] = frontPos(b, 0.06);
        const along = Math.abs(fz) > 0;
        const gateW = Math.min((along ? b.w : b.d) * 0.55, 7.2), gateH = Math.min(b.h * 0.72, 4.4);
        plain.box(along ? gateW : 0.18, gateH, along ? 0.18 : gateW, gx, 0, gz, 0x0a0c10, { noAO: true });
        for (let i = 0; i < 5; i++) {
          const t = (i - 2) / 2.2;
          plain.box(along ? 0.14 : 0.2, gateH * 0.92, along ? 0.2 : 0.14, gx + (along ? t * (gateW * 0.38) : 0), 0.08, gz + (along ? 0 : t * (gateW * 0.38)), 0x6b7280, { noAO: true });
        }
        plain.box(along ? gateW + 0.4 : 0.28, 0.28, along ? 0.28 : gateW + 0.4, gx, gateH, gz, red, { noAO: true });
        // side slit windows (lit at night via glass)
        for (const side of [-1, 1]) {
          const wx = b.x + (along ? side * b.w * 0.28 : fx * (hw + 0.04));
          const wz = b.z + (along ? fz * (hd + 0.04) : side * b.d * 0.28);
          glassB.box(along ? 1.6 : 0.14, 1.8, along ? 0.14 : 1.6, wx, b.h * 0.28, wz, 0xe8c96a, { noAO: true, jit: 0 });
        }
        const [sx, sz] = frontPos(b, 0.14);
        addSign(b.label || 'Iron Gate Armoury', b.sign || '#c0392b', sx, b.h - 1.35, sz, Math.min(b.w - 1.2, 16), 2.35, b.face);
      } else {
        walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 0.6, 0.3, b.d + 0.6, b.x, b.h, b.z, 0x6b6d70);
      }
      if (b.label && b.tag !== 'motoka' && b.tag !== 'motoka-meko' && b.tag !== 'armoury') { const [sx, sz] = frontPos(b, 0.12); addSign(b.label, b.sign || '#0b6b3a', sx, b.h - 1.3, sz, Math.min(b.w - 1, 14), 2.2, b.face); }
      if (b.tag === 'office') { // the Naija Area office: green-white awning over the door, a flagpole with the green-white-green flag, a front step
        const fx = b.face[0], fz = b.face[1]; const ax = b.x + fx * (b.w / 2 + 1.3), az = b.z + fz * (b.d / 2 + 1.3); const along = fz !== 0;
        for (let i = 0; i < 4; i++) plain.box(along ? 2 : 2.8, 0.26, along ? 2.8 : 2, ax + (along ? (i - 1.5) * 2 : 0), 3.3, az + (along ? 0 : (i - 1.5) * 2), i % 2 ? 0xf4f4f0 : 0x00a859, { noAO: true });
        plain.box(along ? 9 : 2.2, 0.3, along ? 2.2 : 9, b.x + fx * (b.w / 2 + 1.1), 0, b.z + fz * (b.d / 2 + 1.1), 0xc9c6bb, { noAO: true });
        const px = b.x - b.w / 2 + 1, pz = b.z - b.d / 2 + 1; plain.box(0.2, 5, 0.2, px, b.h, pz, 0xdddddd, { noAO: true }); for (const [k, c] of [[-0.5, 0x00a859], [0, 0xffffff], [0.5, 0x00a859]]) plain.box(0.1, 1.2, 0.5, px, b.h + 3.6, pz + k, c, { noAO: true });
      }
    } else if (b.kind === 'block') {
      drawLagosBlock(b, { plain, walls, glassB, addSign, frontPos });
    } else if (b.kind === 'stadium') {
      drawStadium(b, { plain, walls, addSign, frontPos, root, rnd: mulberry32(7) });
    } else if (b.kind === 'hotel' || b.kind === 'school' || b.kind === 'landmark' || b.kind === 'hut') {
      drawExtraBuilding(b, { plain, walls, glassB, addSign, frontPos });
    } else if (b.kind === 'airport') {
      walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 6, 0.8, b.d + 6, b.x, b.h, b.z, 0x8895a3); plain.box(b.w * 0.9, 2.2, 3, b.x, 3, b.z + b.d / 2 + 0.3, 0x4a6b86, { noAO: true });
      plain.box(8, 26, 8, b.x + b.w / 2 + 12, 0, b.z - 6, 0xcfd6dd); plain.box(12, 6, 12, b.x + b.w / 2 + 12, 26, b.z - 6, 0x6f8fa8);
      const [sx, sz] = frontPos(b, 0.12); addSign('AIRPORT (placeholder)', '#124d8a', sx, b.h + 4, sz, 40, 4, b.face);
    }
  }
  // ---- plaza landmark + flag
  const pl = city.landmarks.find(l => l.id === 'plaza'); if (pl) {
    const px = pl.cx ?? pl.x - 52, pz = pl.cz ?? pl.z - 52; plain.box(pl.size || 30, 0.3, pl.size || 30, px, 0, pz, 0xd7cfbd, { noAO: true }); plain.cyl(5, 5.5, 0.9, 16, px, 0.3, pz, 0x8f9aa3); plain.cyl(0.5, 0.7, 3.5, 8, px, 0.3, pz, 0x8f9aa3); plain.cyl(2.2, 0.6, 0.5, 12, px, 3.7, pz, 0x7fd1e8, { noAO: true });
    for (const a of [0, 1, 2, 3]) plain.box(3, 0.6, 1, px + Math.cos(a * 1.57) * 9, 0.3, pz + Math.sin(a * 1.57) * 9, 0x6d4c41, { ry: -a * 1.57 });
    plain.cyl(0.12, 0.12, 14, 6, px + 12, 0.3, pz - 12, 0xdddddd, { noAO: true }); for (const [i, c] of [[0, 0x008751], [1, 0xffffff], [2, 0x008751]]) plain.box(0.15, 1.5, 1.1, px + 12 + 0.1, 11 + 0, pz - 12 - 0.55 + i * 1.1, c, { noAO: true, jit: 0 });
    labels.push({ text: pl.name, x: px, z: pz });
  }
  // ---- billboards (+ lagoon pontoons)
  const frameMat = new THREE.MeshLambertMaterial({ color: 0x20232a });
  for (const bd of city.billboards) {
    const g = new THREE.Group(); g.position.set(bd.x, 0, bd.z); g.rotation.y = Math.atan2(bd.nx, bd.nz); root.add(g);
    if (bd.surface === 'shop_front') { // a sponsor sign hung on the front of a shop or venue: no posts, a slim frame and a bracket (item 8)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 0.5, bd.h + 0.5, 0.18), frameMat); frame.position.set(0, bd.y, 0.02); g.add(frame);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff }); const panel = new THREE.Mesh(new THREE.PlaneGeometry(bd.w, bd.h), mat); panel.position.set(0, bd.y, 0.13); g.add(panel);
      for (const sx of [-1, 1]) { const br = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.4), frameMat); br.position.set(sx * bd.w * 0.4, bd.y, -0.16); g.add(br); }
      boards[bd.id] = { def: bd, group: g, panel, mat, current: null }; continue;
    }
    const py = bd.y; const post = (x) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, py + bd.h / 2, 8), frameMat); m.position.set(x, (py + bd.h / 2) / 2, -0.4); g.add(m); };
    post(-bd.w * 0.3); post(bd.w * 0.3);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 0.9, bd.h + 0.9, 0.5), frameMat); frame.position.set(0, py, 0); g.add(frame);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff }); const panel = new THREE.Mesh(new THREE.PlaneGeometry(bd.w, bd.h), mat); panel.position.set(0, py, 0.27); g.add(panel);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 1.2, 0.25, 0.9), frameMat); cap.position.set(0, py + bd.h / 2 + 0.55, 0.05); g.add(cap);
    if (bd.surface === 'lagoon_plot') { const pon = new THREE.Mesh(new THREE.BoxGeometry(bd.w + 4, 1.4, 5), new THREE.MeshLambertMaterial({ color: 0x8b7d62 })); pon.position.set(0, -0.2, -0.4); g.add(pon); }
    boards[bd.id] = { def: bd, group: g, panel, mat, current: null };
  }
  // ---- advert walls: a tall run at the open end of the outer roads, facing back toward the street
  {
    const runs = planAdWalls(city);
    const face = runs[0]?.panels[0];
    if (face) {
    const tones = [0, 1, 2, 3].map((t) => new THREE.MeshBasicMaterial({ map: houseAd(Math.round(512 * face.w / face.h), 512, 'Ad wall', 'Rent this wall at /advertise', t) }));
    const frameMat = new THREE.MeshLambertMaterial({ color: 0x1a1c20 });
    const plinthMat = new THREE.MeshLambertMaterial({ color: 0xc5c0b4 });
    const faceGeo = new THREE.PlaneGeometry(face.w, face.h);
    const frameGeo = new THREE.BoxGeometry(face.w + 0.22, face.h + 0.22, 0.16);
    const plinthGeo = new THREE.BoxGeometry(face.w + 0.26, 0.55, 0.9);
    let pi = 0;
    for (const run of runs) for (const p of run.panels) {
      const g = new THREE.Group(); g.position.set(p.x, 0, p.z); g.rotation.y = Math.atan2(p.nx, p.nz); root.add(g);
      const base = new THREE.Mesh(plinthGeo, plinthMat); base.position.y = 0.275; g.add(base);
      const frame = new THREE.Mesh(frameGeo, frameMat); frame.position.set(0, p.y, -0.02); g.add(frame);
      const panel = new THREE.Mesh(faceGeo, tones[pi++ % tones.length]); panel.position.set(0, p.y, 0.1); g.add(panel);
    }
    }
  }
  // ---- creeks, bridges, beaches, link gates (expanded Lagos)
  const creekTex = []; const wt2c = (w, d) => { const t = waterTexture(); t.repeat.set(Math.max(1, w / 40), Math.max(1, d / 40)); creekTex.push(t); return t; };
  { const ex = { plain, addSign, root, pylonLights };
    for (const c of creeks) { const v = creekVisual(c, city.bounds), wy = c.y ?? -3.6, w = v.x1 - v.x0, d = v.z1 - v.z0;
      const wm = new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: wt2c(w, d), transparent: true, opacity: 0.94 })); wm.position.set((v.x0 + v.x1) / 2, wy, (v.z0 + v.z1) / 2); root.add(wm);
      plain.box(w, 0.4, d, (v.x0 + v.x1) / 2, wy - 0.6, (v.z0 + v.z1) / 2, 0x4a4f50, { noAO: true }); for (const x of [v.x0, v.x1]) plain.box(0.7, -wy + 0.6, d, x, wy - 0.2, (v.z0 + v.z1) / 2, 0xa9a396, { noAO: true }); // bank walls
      for (const z of [v.z0, v.z1]) if (Math.abs(z) < 1000 && v.z0 === c.z0 && v.z1 === c.z1) plain.box(w, -wy + 0.6, 0.7, (v.x0 + v.x1) / 2, wy - 0.2, z, 0xa9a396, { noAO: true });
      for (const r of creekColliders(c)) colliders.push(r); }
    for (const br of city.bridges || []) { if (br.type === 'cable') cableSegs.push(...drawCableBridge(br, ex)); else drawBeamBridge(br, ex); }
    for (const l of city.landmarks) { if (l.kind === 'beach') drawBeach(l, ex); else if (l.kind === 'jetty') drawJetty(l, ex); else if (l.kind === 'hill') drawHill(l, ex); else if (l.kind === 'wall') drawWall(l, ex); else if (l.kind === 'dyepits') drawDyePits(l, ex); else if (l.kind === 'motorpark') drawMotorPark(l, ex); else if (l.kind === 'farm') drawFarm(l, ex); else if (l.kind === 'pen') drawPen(l, ex); else if (l.kind === 'well') drawWell(l, ex); else if (l.kind === 'palmline') drawPalmLine(l, ex); }
    for (const l of city.links || []) drawLink(l, ex, city.bounds); }
  if (cableSegs.length) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(cableSegs, 3)); const cab = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xf2f2ee })); cab.frustumCulled = false; root.add(cab); }
  // ---- water (lagoon)
  const wt2 = waterTexture(); wt2.repeat.set(20, 8);
  if (city.water) { const water = new THREE.Mesh(new THREE.PlaneGeometry(city.water.maxX - city.water.minX, city.water.maxZ - city.water.minZ).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: wt2, transparent: true, opacity: 0.92 }));
  water.position.set(0, -0.5, (city.water.minZ + city.water.maxZ) / 2); root.add(water); }
  if (city.water) { const shoreZ = (city.water.minZ ?? B.maxZ + 8) - 3; plain.box(city.bounds.maxX - city.bounds.minX + 40, 1.5, 2.4, 0, -0.2, shoreZ, 0x9a927f, { noAO: true }); } // sea wall sits on the water line, clear of Shore Road and the advert walls
  // far skyline silhouettes (Third-Mainland-style bridge + towers) as backdrop
  const sky = new Builder(31, 0.05);
  const SK = city.skyline || 'towers'; // 'towers' (Lagos), 'lowrise' (Kano), 'hills' (Ogun towns and villages): the far backdrop matches the place
  // backdrop sits north of the map. A fixed z used to fall on Ikorodu once the city grew.
  const farN = (B.minZ ?? -300) - 70;
  if (SK === 'hills') for (let i = 0; i < 16; i++) { const span = (B.maxX ?? 450) - (B.minX ?? -450); const x = (B.minX ?? -430) + span * (i + 0.5) / 16 + rnd() * 14, r = 55 + rnd() * 50; sky.cyl(r * 0.45, r, 14 + rnd() * 16, 9, x, -2, farN - rnd() * 40, [0x7f9276, 0x74886e, 0x8a9b80][i % 3], { noAO: true }); }
  else for (let i = 0; i < 26; i++) { const span = (B.maxX ?? 450) - (B.minX ?? -450); const x = (B.minX ?? -420) + span * (i + 0.5) / 26 + rnd() * 10; const tall = SK === 'lowrise' ? 6 + rnd() * 16 : 30 + rnd() * 70; sky.box(14 + rnd() * 14, tall, 14, x, -2, farN - rnd() * 40, SK === 'lowrise' ? 0xa89c88 : 0x7a8da3, { noAO: true }); }
  if (city.id === 'lagos-mainland') for (let i = 0; i < 20; i++) { const x = -330 + i * 34; sky.box(26, 1.6, 6, x, 12, 310, 0x8a8d92, { noAO: true }); if (i % 4 === 0) sky.box(2, 26, 2, x, -2, 310, 0x8a8d92, { noAO: true }); } // bridge across the lagoon
  const skyMesh = new THREE.Mesh(sky.build(), new THREE.MeshLambertMaterial({ vertexColors: true, fog: true })); root.add(skyMesh);
  // ---- merge + add
  for (const [b, m] of [[plain, vcMat], [walls, wallMat], [glassB, vcMat]]) { const geo = b.build(); if (geo.attributes.position) root.add(new THREE.Mesh(geo, m)); }

  // ---- ownership markers floating over each house door (updated from the API)
  const markerGeo = new THREE.ConeGeometry(0.8, 1.6, 4).rotateX(Math.PI);
  for (const p of city.properties) {
    const m = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color: 0x35c46b })); m.position.set(p.door.x, 5.2, p.door.z); root.add(m); doorMarkers[p.id] = m;
  }
  // treasures sit behind buildings: a chest and a short label, not a map pin or a tall beacon
  const treasures = {};
  const bn = (n) => '₦' + (n / 1e9).toFixed(1) + 'bn';
  for (const t of city.treasures || []) {
    if (t.taken) continue;
    const g = new THREE.Group(); g.position.set(t.x, 0, t.z);
    const wood = new THREE.MeshLambertMaterial({ color: 0x8a5a24 });
    const gold = new THREE.MeshBasicMaterial({ color: 0xffc20e });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 1.0), wood); body.position.y = 0.65; g.add(body);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.32, 1.05), new THREE.MeshLambertMaterial({ color: 0xd4a24a })); lid.position.y = 1.2; g.add(lid);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.2, 1.08), gold); band.position.y = 0.8; g.add(band);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.1, 1.55, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffc20e, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false })); ring.position.y = 0.2; g.add(ring);
    const tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTag(bn(t.worth), '#ffc20e'), depthTest: false, transparent: true })); tag.scale.set(2.4, 0.6, 1); tag.position.y = 2.3; g.add(tag);
    root.add(g); treasures[t.id] = g;
  }
  // a home skin's accent (item 9): a coloured pole with a lantern beside the door, drawn for everybody (cosmetic)
  const accents = {}; const poleGeo = new THREE.BoxGeometry(0.5, 4.2, 0.5).translate(0, 2.1, 0), lampGeo = new THREE.SphereGeometry(0.7, 10, 8);
  const homeAccent = (p) => { const def = city.properties.find(x => x.id === p.id); if (!def) return; let a = accents[p.id];
    if (!p.homeSkin) { if (a) { root.remove(a); delete accents[p.id]; } return; } const hex = new THREE.Color(p.homeSkin);
    if (!a) { a = new THREE.Group(); a.add(new THREE.Mesh(poleGeo, new THREE.MeshLambertMaterial({ color: 0x3a3a3a }))); const lamp = new THREE.Mesh(lampGeo, new THREE.MeshBasicMaterial({ color: hex })); lamp.position.y = 4.6; lamp.name = 'lamp'; a.add(lamp); a.position.set(def.door.x + 1.6, 0, def.door.z + 0.4); root.add(a); accents[p.id] = a; }
    a.getObjectByName('lamp').material.color.copy(hex); a.userData.hex = p.homeSkin; };
  const markerColor = { available: 0x35c46b, taken: 0x8a8f98, yours: 0xffc20e };
  const namePlates = {}, facades = {};
  const dropMesh = (mesh) => { if (!mesh) return; root.remove(mesh); mesh.geometry?.dispose(); mesh.material?.map?.dispose(); mesh.material?.dispose(); };
  const showHouse = (p) => {
    const def = city.properties.find(x => x.id === p.id); if (!def) return;
    const text = p.owner && p.name ? p.name : '';
    let tag = namePlates[p.id];
    if (!text) dropMesh(tag), delete namePlates[p.id];
    else if (!tag || tag.userData.text !== text) {
      dropMesh(tag);
      tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTag(text, '#ffe08a'), transparent: true, depthTest: true }));
      tag.scale.set(8.4, 2.1, 1); tag.position.set(def.door.x, 7.6, def.door.z); tag.userData.text = text;
      root.add(tag); namePlates[p.id] = tag;
    }
    const bld = city.buildings.find(b => b.id === def.buildingId);
    let slab = facades[p.id];
    if (!p.facade || !bld) { dropMesh(slab); delete facades[p.id]; return; }
    if (!slab) { slab = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: p.facade })); root.add(slab); facades[p.id] = slab; }
    const [fx, fz] = bld.face || [0, 1];
    slab.material.color.set(p.facade);
    slab.scale.set(Math.abs(fz) ? bld.w * 0.98 : 0.28, bld.h * 0.92, Math.abs(fx) ? bld.d * 0.98 : 0.28);
    slab.position.set(bld.x + fx * (Math.abs(fx) ? bld.w / 2 + 0.2 : 0), bld.h * 0.46, bld.z + fz * (Math.abs(fz) ? bld.d / 2 + 0.2 : 0));
  };
  const waterSpeed = { x: 0.004 };
  const fogC = new THREE.Color('#9fd3ee'); scene.fog = new THREE.Fog(fogC, 140, 520);
  let night = 0; applyLamps(0);
  const api = {
    scene, colliders, palmSpots, boards, doorMarkers, labels, root, accents, treasures, roadHazards,
    hazardAt(x, z) { return pickHazard(roadHazards, x, z); },
    hideTreasures(ids) { for (const id of ids || []) { const g = treasures[id]; if (g) { root.remove(g); delete treasures[id]; } } },
    setMarkers(props) { for (const p of props) { const m = doorMarkers[p.id]; if (m) m.material.color.setHex(markerColor[p.status] || 0x35c46b); homeAccent(p); showHouse(p); } },
    setTime(minutes) { // 0..1440
      const t = minutes / 1440; const a = (t - 0.25) * Math.PI * 2; const h = Math.sin(a); const day = Math.max(0, Math.min(1, h * 1.8 + 0.25));
      night = 1 - day; const dusk = Math.max(0, 1 - Math.abs(h) * 3.2);
      const sky = lerpC(lerpC('#1a3568', '#8fd0f5', day), '#f08a4b', dusk * 0.7);
      scene.background = sky; scene.fog.color.copy(sky);
      sun.intensity = 0.38 + day * 1.17; sun.color.set(lerpC('#fff1d6', '#ff9a55', dusk)); sun.position.set(Math.cos(a) * 200, Math.max(30, Math.sin(a) * 220), 80);
      hemi.intensity = 0.52 + day * 0.48; hemi.color.set(lerpC('#6286b8', '#dfefff', day)); hemi.groundColor.set(lerpC('#786858', '#6b5f4a', day));
      wallMat.emissiveIntensity = night * 0.95; for (const m of pylonLights) m.material.color.copy(m.userData.base).multiplyScalar(0.28 + 0.72 * night); applyLamps(lampClock); return { day, night };
    },
    animate(dt) { wt2.offset.x += dt * 0.004; wt2.offset.y += dt * 0.002; for (const t of creekTex) { t.offset.x += dt * 0.003; t.offset.y += dt * 0.0015; } for (const g of Object.values(treasures)) g.rotation.y += dt * 0.0008; lampClock += dt / 1000; lampFlickerT += dt; if (lampLvl > 0 && lampFlickerT > 90) { lampFlickerT = 0; applyLamps(lampClock); } },
    lamps, lampHeads, lampPools, get lampLevel() { return lampLvl; },
    get night() { return night; }
  };
  return api;
}
