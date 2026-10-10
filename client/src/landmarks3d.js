// Expanded-Lagos 3D pieces (10 Oct 2026), all built from primitives and vertex colours, driven by the city JSON:
// hotels, mosque, cathedral, National-Theatre-style hall, beaches and jetties, creeks with bank walls, beam bridges, the cable-stayed Lekki-Ikoyi bridge, road-link gates.
// Models are SIMPLIFIED placeholders; shapes are read from reference photos and written specs (see docs/BRIDGE.md), not copied from any photo or model.
import * as THREE from 'three';

const _up = new THREE.Vector3(0, 1, 0);
/** a straight bar of width w and thickness t from p to q (3D points), added to builder b */
export function strut(b, p, q, w, t, color, o = {}) {
  const d = new THREE.Vector3(q[0] - p[0], q[1] - p[1], q[2] - p[2]); const len = d.length(); if (len < 1e-4) return;
  const geo = new THREE.BoxGeometry(w, len, t); const quat = new THREE.Quaternion().setFromUnitVectors(_up, d.clone().normalize()); geo.applyQuaternion(quat);
  b._push(geo, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2, color, { noAO: true, jit: 0, ...o });
}
/** rectangle minus rectangles -> list of rectangles (used to cut the ground plane where creeks run) */
export function subtractRects(base, cuts) {
  let parts = [base]; for (const c of cuts) { const next = []; for (const p of parts) { if (c.x0 >= p.x1 || c.x1 <= p.x0 || c.z0 >= p.z1 || c.z1 <= p.z0) { next.push(p); continue; }
    if (c.z0 > p.z0) next.push({ x0: p.x0, x1: p.x1, z0: p.z0, z1: c.z0 }); if (c.z1 < p.z1) next.push({ x0: p.x0, x1: p.x1, z0: c.z1, z1: p.z1 });
    const zz0 = Math.max(p.z0, c.z0), zz1 = Math.min(p.z1, c.z1); if (c.x0 > p.x0) next.push({ x0: p.x0, x1: c.x0, z0: zz0, z1: zz1 }); if (c.x1 < p.x1) next.push({ x0: c.x1, x1: p.x1, z0: zz0, z1: zz1 }); } parts = next; }
  return parts;
}
/** a creek's visual rectangle: if it runs into the district edge it carries on out of sight so it never looks like a pond with a lid */
export const creekVisual = (c, B) => ({ x0: c.x0 <= B.minX ? c.x0 - 200 : c.x0, x1: c.x1 >= B.maxX ? c.x1 + 200 : c.x1, z0: c.z0 <= B.minZ ? c.z0 - 200 : c.z0, z1: c.z1 >= B.maxZ ? c.z1 + 200 : c.z1 });
/** the collider rectangles of a creek: the whole creek except the gaps where roads cross it on bridges */
export function creekColliders(c) {
  const out = []; let z = c.z0; for (const [a, b] of [...(c.gaps || [])].sort((p, q) => p[0] - q[0])) { if (a > z) out.push({ x0: c.x0, x1: c.x1, z0: z, z1: a }); z = Math.max(z, b); } if (c.z1 > z) out.push({ x0: c.x0, x1: c.x1, z0: z, z1: c.z1 }); return out.map((r, i) => ({ id: `${c.id}_${i}`, h: 3, ...r }));
}

const CREAM = 0xefe9db, STONE = 0xd8cfc0;
export function drawExtraBuilding(b, ctx) {
  const { plain, walls, glassB, addSign, frontPos } = ctx; const hw = b.w / 2, hd = b.d / 2, [fx, fz] = b.face; const alongX = Math.abs(fz) > 0; // true when the front faces +-z
  const at = (u, v, h, y, w, d, c, o) => { const px = b.x + (alongX ? u : v), pz = b.z + (alongX ? v : u); plain.box(alongX ? w : d, h, alongX ? d : w, px, y, pz, c, o || { noAO: true }); }; // u: sideways, v: along the facing direction (positive = out the front)
  const fs = alongX ? fz : fx; const V = (v) => v * fs; // v>0 toward the front
  if (b.kind === 'hotel') {
    walls.box(b.w, b.h, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 1, 0.8, b.d + 1, b.x, b.h, b.z, 0x7d8185);
    at(0, V(hd * 0.0 + hd + 2.2), 4.2, 0, b.w * 0.5, 5, 0xe6dfd0); at(0, V(hd + 2.2), 0.45, 4.2, b.w * 0.55, 5.6, 0x555b61); // podium and canopy
    for (const s of [-1, 1]) at(s * b.w * 0.24, V(hd + 4.5), 4.2, 0, 0.7, 0.7, 0xfaf7ef); // canopy columns
    at(0, V(0), 5, b.h, b.w * 0.34, b.d * 0.5, 0x9aa1a8); // rooftop plant
    const [sx, sz] = frontPos(b, 0.12); addSign(b.label.toUpperCase(), '#1d2b3a', sx, b.h - 2.6, sz, Math.min(b.w - 4, 26), 3, b.face);
    const [dx, dz] = frontPos(b, 5.1); glassB.box(alongX ? 6 : 0.2, 3.4, alongX ? 0.2 : 6, dx, 0.2, dz, 0x9cc7d9, { noAO: true, jit: 0 });
  } else if (b.model === 'mosque') { // central dome on a drum, two minarets, arched porch, green trim
    const base = 7; walls.box(b.w, base, b.d, b.x, 0, b.z, b.color); plain.box(b.w + 0.8, 0.5, b.d + 0.8, b.x, base, b.z, 0xbfb7a2);
    plain.box(b.w * 0.55, 4, b.d * 0.6, b.x, base + 0.5, b.z, 0xf3eee0); plain.cyl(6.2, 6.6, 3, 20, b.x, base + 4.5, b.z, 0xf3eee0); plain.sphere(6.4, b.x, base + 7.4, b.z, 0x2f8f5a, { noAO: true, sy: 0.9 }); plain.cyl(0.08, 0.35, 3.2, 8, b.x, base + 13, b.z, 0xd4af37); plain.sphere(0.55, b.x, base + 16.4, b.z, 0xd4af37);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const mx = b.x + sx * (hw - 3), mz = b.z + sz * (hd - 3); if (sz > 0 !== (fz > 0 || fx > 0 ? true : false) && false) continue; plain.cyl(1.0, 1.3, 20, 10, mx, 0, mz, 0xf3eee0); plain.cyl(1.7, 1.7, 0.5, 10, mx, 12, mz, 0xbfb7a2); plain.cyl(1.2, 1.2, 4, 10, mx, 20, mz, 0xf3eee0); plain.cyl(1.5, 1.5, 0.4, 10, mx, 20, mz, 0x2f8f5a); plain.cone(1.4, 2.8, 10, mx, 24, mz, 0x2f8f5a); plain.sphere(0.3, mx, 27, mz, 0xd4af37); }
    for (let i = -2; i <= 2; i++) at(i * b.w * 0.17, V(hd + 0.15), 3.2, 1.3, 1.4, 0.2, 0x2c6b4a); // arched windows (flat)
    at(0, V(hd + 1.5), 0.4, 0, b.w * 0.5, 3, 0xcfc8b4); const [sx, sz] = frontPos(b, 0.12); addSign(b.label, '#2c6b4a', sx, base + 0.6, sz, 24, 2.2, b.face);
  } else if (b.model === 'cathedral') { // long nave with a gable roof, tall front tower with a spire, side buttresses, round window
    walls.box(b.w, 8, b.d, b.x, 0, b.z, b.color); plain.gable(b.w + 1, b.d + 1, 6, b.x, 8, b.z, 0x6d5a4a, { ry: alongX ? 0 : Math.PI / 2 });
    const tw = 9; const tx = b.x + (alongX ? 0 : fs * (hw - tw / 2)), tz = b.z + (alongX ? fs * (hd - tw / 2) : 0); walls.box(tw, 24, tw, tx, 0, tz, STONE); plain.box(tw + 0.8, 0.6, tw + 0.8, tx, 24, tz, 0x8a8075); plain.cone(tw * 0.62, 12, 4, tx, 24.6, tz, 0x6d5a4a, { ry: Math.PI / 4 }); plain.box(0.25, 3, 0.25, tx, 36.4, tz, 0xd4af37); plain.box(1.4, 0.25, 0.25, tx, 38, tz, 0xd4af37);
    for (let i = -2; i <= 2; i++) for (const s of [-1, 1]) at(s * (hw + 0.3), i * b.d * 0.17, 6, 0, 0.7, 1.4, 0xbfb7a2); // buttresses
    at(0, V(hd + 0.15), 2.4, 3.2, 2.6, 0.2, 0x3b6ea5, { noAO: true }); const [sx, sz] = frontPos(b, 0.12); addSign(b.label, '#4a3b2f', sx, 2.6, sz, 24, 2.2, b.face);
  } else if (b.model === 'theatre') { // a wide round hall under a flared cap roof with two lower wings (simplified)
    const wing = b.w * 0.3; for (const s of [-1, 1]) walls.box(wing, 7, b.d * 0.8, b.x + (alongX ? s * (hw - wing / 2) : 0), 0, b.z + (alongX ? 0 : s * (hw - wing / 2)), b.color);
    const R = Math.min(b.d, b.w * 0.4) * 0.5; walls.cyl(R, R, 9, 28, b.x, 0, b.z, STONE); plain.cyl(R * 1.45, R * 0.95, 4, 28, b.x, 9, b.z, 0xbfb8aa); plain.cyl(R * 0.7, R * 1.45, 1.6, 28, b.x, 13, b.z, 0xcfc8ba);
    at(0, V(hd + 1.2), 0.5, 0, b.w * 0.34, 3.2, 0xb9b09c); at(0, V(hd + 2.4), 0.3, 0, b.w * 0.3, 1.6, 0xa89f8c); const [sx, sz] = frontPos(b, 0.12); addSign(b.label, '#5c4a38', sx, 7.6, sz, 22, 2.2, b.face);
  }
}
/** beach (sand, huts, palms, loungers) and jetty landmarks */
export function drawBeach(l, ctx) {
  const { plain } = ctx; const x0 = l.cx - l.w / 2, z0 = l.cz - l.d / 2; plain.box(l.w, 0.14, l.d, l.cx, l.island ? 0.0 : 0.12, l.cz, 0xefe0a6, { noAO: true, jit: 0.015 }); if (l.island) plain.box(l.w - 20, 0.5, l.d - 14, l.cx, 0.1, l.cz, 0xdccc90, { noAO: true });
  const rn = (i) => { const t = Math.sin(i * 127.1 + l.cx) * 43758.5453; return t - Math.floor(t); };
  for (let i = 0; i < (l.huts || 4); i++) { const hx = x0 + 14 + (l.w - 28) * (i + 0.5) / (l.huts || 4), hz = l.cz + (rn(i) - 0.5) * l.d * 0.4; plain.box(3.2, 2.2, 3.2, hx, 0, hz, 0xc89b5a); plain.cone(2.9, 1.8, 4, hx, 2.2, hz, 0xb58a3a, { ry: Math.PI / 4 }); plain.box(0.9, 1.5, 0.15, hx, 0, hz + 1.65, 0x6d4c41); }
  for (let i = 0; i < 12; i++) { const px = x0 + 6 + rn(i + 20) * (l.w - 12), pz = z0 + 4 + rn(i + 40) * (l.d - 8), hgt = 6 + rn(i) * 2; plain.cyl(0.2, 0.33, hgt, 6, px, 0, pz, 0x8a6a45, { noAO: true }); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; plain.box(0.5, 0.1, 3.2, px + Math.cos(a) * 1.5, hgt + 0.1, pz + Math.sin(a) * 1.5, 0x2f8f3a, { ry: -a + Math.PI / 2, rx: 0.5, noAO: true }); } }
  for (let i = 0; i < 8; i++) { const lx = x0 + 10 + rn(i + 60) * (l.w - 20), lz = l.cz + (rn(i + 80) - 0.2) * l.d * 0.35; plain.box(0.9, 0.3, 2, lx, 0.3, lz, [0xd84315, 0x1e88e5, 0xfdd835][i % 3], { noAO: true }); plain.box(0.1, 1.6, 0.1, lx + 1, 0.3, lz, 0x6d4c41, { noAO: true }); plain.box(2.2, 0.15, 2.2, lx + 1, 1.9, lz, [0xd84315, 0x1e88e5, 0xfdd835][(i + 1) % 3], { noAO: true }); }
}
export function drawJetty(l, ctx) { const { plain } = ctx; const len = Math.abs(l.z2 - l.z); const zc = (l.z + l.z2) / 2; plain.box(4, 0.3, len, l.x, 0.05, zc, 0x8a6a45, { noAO: true }); for (let i = 0; i <= len / 6; i++) for (const s of [-1, 1]) plain.cyl(0.22, 0.22, 2.4, 6, l.x + s * 2, -1.6, l.z + i * 6 * Math.sign(l.z2 - l.z), 0x5b4332, { noAO: true }); }
/** road-link gate: two posts, a cross bar and a name sign over the road */
export function drawLink(l, ctx, B) {
  const { plain, addSign } = ctx; const hw = (l.r || 16) / 2 - 1; const face = [l.x > (B.minX + B.maxX) / 2 ? -1 : 1, 0]; for (const s of [-1, 1]) { plain.box(0.9, 7.4, 0.9, l.x, 0, l.z + s * hw, 0xe8e2d0); plain.box(1.4, 0.4, 1.4, l.x, 7.4, l.z + s * hw, 0x8a8f94); }
  plain.box(1.1, 1.5, hw * 2 + 1.4, l.x, 6.9, l.z, 0x1d4d7a, { noAO: true }); addSign(`${l.name}  >`, '#1d4d7a', l.x + face[0] * 0.65, 7.65, l.z, hw * 2 - 0.5, 1.3, face);
}

/** beam bridge (Falomo-style): deck on piers, parapets, lamp posts come from lamps.js */
export function drawBeamBridge(br, ctx) {
  const { plain } = ctx; const len = br.b - br.a, cx = (br.a + br.b) / 2, w = br.width; plain.box(len, 0.9, w + 1.6, cx, -0.9, br.z, 0x8d8f91, { noAO: true }); plain.box(len, 0.06, w, cx, 0.0, br.z, 0x34373c, { noAO: true, jit: 0 });
  for (const s of [-1, 1]) { plain.box(len, 0.9, 0.4, cx, 0, br.z + s * (w / 2 + 0.5), 0xbdb7a6, { noAO: true }); plain.box(len, 0.12, 0.7, cx, 0.9, br.z + s * (w / 2 + 0.5), 0xd8d2c0, { noAO: true }); }
  for (let i = 0; i < (br.piers || 3); i++) { const px = br.a + len * (i + 0.5) / (br.piers || 3); plain.box(2, 4.2, w * 0.7, px, -5.1, br.z, 0x7d7f80, { noAO: true }); }
}
/** the cable-stayed Lekki-Ikoyi Link Bridge: single X-shaped reinforced-concrete pylon, semi-fan of 4 x 7 stay cables, segmental deck on piers, 2 x 2 lanes, walkways.
    Scale 0.4 of the real structure (see docs/BRIDGE.md). Returns the cable line segments to be added as one LineSegments object. */
export function drawCableBridge(br, ctx) {
  const { plain } = ctx; const W = br.deckWidth, z0 = br.z, H = br.pylonHeightAboveDeck, px = br.pylonX || 0; const cr = br.creek || { x0: -200, x1: 200 }, len = br.x1 - br.x0;
  plain.box(len, 1.0, W + 0.6, (br.x0 + br.x1) / 2, -1.0, z0, 0x9b9a96, { noAO: true }); plain.box(len, 0.06, W, (br.x0 + br.x1) / 2, 0, z0, 0x34373c, { noAO: true, jit: 0 }); // segmental deck, asphalt on top
  for (const s of [-1, 1]) { plain.box(len, 1.0, 0.35, (br.x0 + br.x1) / 2, 0, z0 + s * (W / 2 + 0.1), 0xbdb7a6, { noAO: true }); plain.box(len, 0.1, 0.6, (br.x0 + br.x1) / 2, 1.0, z0 + s * (W / 2 + 0.1), 0xd8d2c0, { noAO: true }); plain.box(len, 0.04, br.walkway, (br.x0 + br.x1) / 2, 0.06, z0 + s * (W / 2 - br.walkway / 2), 0xa9a396, { noAO: true, jit: 0 }); } // parapets and 2 m (scaled) walkways
  // piers: main-bridge spans (scaled 55-75-112.5 | 112.5-75-55 m) and shorter approach spans
  const sp = [-112.5 - 75 - 75, -112.5 - 75, -112.5, 0, 112.5, 112.5 + 75, 112.5 + 75 + 75].map(v => v * br.scale).filter(v => Math.abs(v) < len / 2); for (const x of sp) if (Math.abs(x) > 0.1) plain.box(2.6, 4.4, W * 0.62, x, -5, z0, 0x7d7f80, { noAO: true });
  for (let x = br.x0 + 18; x < -cr.x1 + 4; x += 36) plain.box(1.8, 2.6, W * 0.6, x, -3, z0, 0x7d7f80, { noAO: true }); for (let x = cr.x1 + 4; x < br.x1 - 10; x += 36) plain.box(1.8, 2.6, W * 0.6, x, -3, z0, 0x7d7f80, { noAO: true });
  // pylon: legs start at the deck edges, lean in to a narrow waist (two cross-beams), then open into a V at the top; leg thickness tapers from base to top
  const base = W / 2 + 0.2, waist = 1.3, top = 2.7, hW = H * 0.62; const col = 0xcfc8b6; const zs = [-1, 1];
  for (const s of zs) { strut(plain, [px, -4.6, z0 + s * (base + 0.4)], [px, 0, z0 + s * base], 1.9, 1.5, 0xa9a396); strut(plain, [px, 0, z0 + s * base], [px, hW, z0 + s * waist], 1.5, 1.35, col); strut(plain, [px, hW, z0 + s * waist], [px, H, z0 + s * top], 1.2, 1.0, col); }
  for (const hh of [hW - 0.4, hW + 3.2]) plain.box(1.2, 0.8, 2 * waist + 1.2, px, hh, z0, col, { noAO: true });
  plain.box(1.7, 2.2, 0.6, px, H - 2, z0 - top - 0.2, 0xcfc8b6, { noAO: true, jit: 0 }); plain.box(1.7, 2.2, 0.6, px, H - 2, z0 + top + 0.2, 0xcfc8b6, { noAO: true, jit: 0 });
  for (const s of zs) for (const [lo, hi] of [[0.12, 0.3]]) plain.box(0.35, H * (hi - lo), 0.2, px, H * lo, z0 + s * (base - 0.3), 0x2fb6a0, { noAO: true }); void 0;
  // 28 stay cables: 7 per side of the pylon per leg, from the leg (0.55 H up to 0.97 H) to deck anchors every 5 m (scaled) out to 38 m
  const seg = []; for (const s of zs) for (const side of [-1, 1]) for (let i = 0; i < 7; i++) { const t = i / 6, hh = H * (0.55 + 0.42 * (1 - t)); const legZ = z0 + s * (hh < hW ? waist + (base - waist) * (1 - hh / hW) : waist + (top - waist) * ((hh - hW) / (H - hW))); const ax = px + side * (7 + i * 5.2), az = z0 + s * (W / 2 - 0.2); seg.push(px, hh, legZ, ax, 0.4, az); }
  return seg;
}
