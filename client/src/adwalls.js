// Long advert walls at the outer end of a road, only on ground with no building.
// A wall is a run of tall panels on the outside of the city edge, facing back toward the road.

const FACE_W = 20, GAP = 0.4, COUNT = 8, FACE_H = 5.4, PLINTH = 0.55, SETBACK = 1.8;
const step = FACE_W + GAP;

const finite = (r) => Number.isFinite(r.x1) && Number.isFinite(r.z1) && Number.isFinite(r.x2) && Number.isFinite(r.z2);
const round = (n) => Math.round(n * 10) / 10;

/** @returns {{id:string,nx:number,nz:number,panels:object[]}[]} */
export function planAdWalls(city) {
  const roads = (city.roads || []).filter(finite);
  if (roads.length < 2) return [];
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const r of roads) {
    minX = Math.min(minX, r.x1, r.x2); maxX = Math.max(maxX, r.x1, r.x2);
    minZ = Math.min(minZ, r.z1, r.z2); maxZ = Math.max(maxZ, r.z1, r.z2);
  }
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
  const B = city.bounds, water = city.water, buildings = city.buildings || [], boards = city.billboards || [], rounds = city.roundabouts || [];
  const blocked = (x, z) => {
    if (B && (x < B.minX + 1.2 || x > B.maxX - 1.2 || z < B.minZ + 1.2 || z > B.maxZ - 1.2)) return true;
    if (water && x > water.minX && x < water.maxX && z > water.minZ && z < water.maxZ) return true;
    for (const b of buildings) if (Math.abs(x - b.x) < b.w / 2 + 1.6 && Math.abs(z - b.z) < b.d / 2 + 1.6) return true;
    for (const b of boards) if (Math.hypot(x - b.x, z - b.z) < 9) return true;
    for (const o of rounds) if (Math.hypot(x - o.x, z - o.z) < (o.outerR || 12) + 5) return true;
    return false;
  };
  const out = [];
  let seq = 0;
  for (const r of roads) {
    const dx = r.x2 - r.x1, dz = r.z2 - r.z1, len = Math.hypot(dx, dz);
    if (len < 70) continue;
    const vertical = Math.abs(dx) < 1.5, horizontal = Math.abs(dz) < 1.5;
    if (!vertical && !horizontal) continue;
    const onEdge = vertical ? (Math.abs(r.x1 - minX) < 8 || Math.abs(r.x1 - maxX) < 8) : (Math.abs(r.z1 - minZ) < 8 || Math.abs(r.z1 - maxZ) < 8);
    if (!onEdge) continue;
    const mx = (r.x1 + r.x2) / 2, mz = (r.z1 + r.z2) / 2;
    const ox = vertical ? (mx < cx ? -1 : 1) : 0;
    const oz = vertical ? 0 : (mz < cz ? -1 : 1);
    const nx = -ox, nz = -oz;
    const off = (r.width || 14) / 2 + SETBACK;
    let ax = mx, az = mz, best = Infinity;
    for (const q of roads) {
      if (q === r) continue;
      const qVert = Math.abs(q.x2 - q.x1) < 1.5;
      if (qVert === vertical) continue;
      const px = vertical ? r.x1 : q.x1, pz = vertical ? q.z1 : r.z1;
      const along = vertical ? pz : px, a0 = vertical ? Math.min(r.z1, r.z2) : Math.min(r.x1, r.x2), a1 = vertical ? Math.max(r.z1, r.z2) : Math.max(r.x1, r.x2);
      if (along < a0 + 24 || along > a1 - 24) continue;
      const d = Math.hypot(px - cx, pz - cz);
      if (d < best) { best = d; ax = vertical ? r.x1 : px; az = vertical ? pz : r.z1; }
    }
    const placed = [];
    for (let i = 0; i < COUNT; i++) {
      const t = (i - (COUNT - 1) / 2) * step;
      const x = (vertical ? r.x1 + ox * off : ax + t);
      const z = (vertical ? az + t : r.z1 + oz * off);
      const half = FACE_W / 2;
      const ends = vertical ? [[x, z - half], [x, z], [x, z + half]] : [[x - half, z], [x, z], [x + half, z]];
      if (ends.some(([ex, ez]) => blocked(ex, ez))) continue;
      placed.push({ id: `aw${++seq}`, x: round(x), z: round(z), nx, nz, w: FACE_W, h: FACE_H, y: round(PLINTH + FACE_H / 2) });
    }
    let cur = [];
    const flush = () => { if (cur.length >= 4) out.push({ id: r.id, nx, nz, panels: cur }); cur = []; };
    for (const p of placed) {
      const prev = cur[cur.length - 1];
      if (prev && Math.hypot(p.x - prev.x, p.z - prev.z) > step * 1.35) flush();
      cur.push(p);
    }
    flush();
  }
  return out;
}
