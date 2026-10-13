// Adds a TTA (Tech Talent) building and venue. Idempotent.
// Usage: node tools/add-tta.mjs   (patches Lagos mainland and Ijebu Ode)
import fs from 'node:fs';

const W = 22, D = 16;
const FACES = [[0, -1], [0, 1], [1, 0], [-1, 0]];

function roadPts(r) {
  if (r.pts?.length >= 2) return r.pts;
  if (Number.isFinite(r.x1)) return [[r.x1, r.z1], [r.x2, r.z2]];
  return [];
}
function distToRoad(r, x, z) {
  const pts = roadPts(r); let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, z1] = pts[i], [x2, z2] = pts[i + 1];
    const dx = x2 - x1, dz = z2 - z1, l2 = dx * dx + dz * dz || 1;
    let t = ((x - x1) * dx + (z - z1) * dz) / l2; t = Math.max(0, Math.min(1, t));
    best = Math.min(best, Math.hypot(x - (x1 + dx * t), z - (z1 + dz * t)));
  }
  return best;
}
function onRoad(city, x, z, pad = 0.8) {
  return (city.roads || []).some(r => distToRoad(r, x, z) < (r.width || 10) / 2 + pad);
}
function treasurePts(city) {
  if (Array.isArray(city.treasures)) return city.treasures;
  try {
    const all = JSON.parse(fs.readFileSync(new URL('../server/config/treasures.json', import.meta.url), 'utf8'));
    return all.filter(t => t.city === city.id);
  } catch { return []; }
}
function footprintHitsRoad(city, x, z) {
  const pts = [[x - W / 2, z - D / 2], [x + W / 2, z - D / 2], [x - W / 2, z + D / 2], [x + W / 2, z + D / 2], [x, z]];
  return (city.roads || []).some(r => pts.some(([px, pz]) => distToRoad(r, px, pz) < (r.width || 10) / 2 + 3));
}
function free(city, x, z) {
  const b = city.bounds; if (!b) return false;
  const x0 = x - W / 2, x1 = x + W / 2, z0 = z - D / 2, z1 = z + D / 2;
  if (x0 < b.minX + 8 || x1 > b.maxX - 8 || z0 < b.minZ + 8 || z1 > b.maxZ - 8) return false;
  const water = city.water;
  if (water && x1 > water.minX && x0 < water.maxX && z1 > water.minZ && z0 < water.maxZ) return false;
  for (const c of city.creeks || []) if (x1 > c.x0 - 6 && x0 < c.x1 + 6 && z1 > Math.min(c.z0, c.z1) && z0 < Math.max(c.z0, c.z1)) return false;
  if (footprintHitsRoad(city, x, z)) return false;
  for (const q of city.buildings || []) if (x0 < q.x + q.w / 2 + 4 && x1 > q.x - q.w / 2 - 4 && z0 < q.z + q.d / 2 + 4 && z1 > q.z - q.d / 2 - 4) return false;
  for (const o of city.roundabouts || []) if (Math.hypot(o.x - x, o.z - z) < (o.outerR || 12) + Math.hypot(W, D) / 2) return false;
  for (const p of city.plots || []) if (Math.abs(p.x - x) < ((p.size || 16) + W) / 2 + 3 && Math.abs(p.z - z) < ((p.size || 16) + D) / 2 + 3) return false;
  for (const p of city.carParks || []) if (Math.abs(p.x - x) < ((p.w || 20) + W) / 2 + 3 && Math.abs(p.z - z) < ((p.d || 16) + D) / 2 + 3) return false;
  for (const p of [...(city.jobs || []), ...(city.shops || []), ...(city.venues || []), ...(city.spawns || []), ...(city.busStops || []), ...(city.billboards || [])]) {
    if (Number.isFinite(p.x) && Math.abs(p.x - x) < W / 2 + 4 && Math.abs(p.z - z) < D / 2 + 4) return false;
  }
  for (const p of city.properties || []) if (p.door && Math.abs(p.door.x - x) < W / 2 + 3 && Math.abs(p.door.z - z) < D / 2 + 3) return false;
  for (const l of city.links || []) if (Math.hypot(l.x - x, l.z - z) < (l.r || 16) + 8) return false;
  for (const l of city.landmarks || []) {
    const cx = l.cx ?? l.x, cz = l.cz ?? l.z, s = l.size || 0;
    if (Number.isFinite(cx) && s && Math.abs(cx - x) < s / 2 + W / 2 + 4 && Math.abs(cz - z) < s / 2 + D / 2 + 4) return false;
    if (l.kind === 'clinic' && Math.hypot((l.x || 0) - x, (l.z || 0) - z) < 20) return false;
  }
  for (const t of treasurePts(city)) if (Math.abs(t.x - x) < W / 2 + 2 && Math.abs(t.z - z) < D / 2 + 2) return false;
  return true;
}
function nearestFace(city, x, z) {
  let best = [0, -1], bd = Infinity;
  for (const r of city.roads || []) {
    if (r.pts || !Number.isFinite(r.x1)) continue;
    if (r.x1 === r.x2) { const d = Math.abs(x - r.x1); if (d < bd) { bd = d; best = x >= r.x1 ? [-1, 0] : [1, 0]; } }
    else if (r.z1 === r.z2) { const d = Math.abs(z - r.z1); if (d < bd) { bd = d; best = z >= r.z1 ? [0, -1] : [0, 1]; } }
  }
  return best;
}
function doorOf(x, z, face) {
  const [fx, fz] = face;
  return [+(x + fx * ((Math.abs(fx) ? W : D) / 2 + 3.5)).toFixed(1), +(z + fz * ((Math.abs(fz) ? D : W) / 2 + 3.5)).toFixed(1)];
}
function doorOk(city, door) {
  const b = city.bounds; const [dx, dz] = door;
  if (dx < b.minX + 2 || dx > b.maxX - 2 || dz < b.minZ + 2 || dz > b.maxZ - 2) return false;
  if (onRoad(city, dx, dz, 0.4)) return false;
  for (const q of city.buildings || []) if (Math.abs(q.x - dx) < q.w / 2 + 0.8 && Math.abs(q.z - dz) < q.d / 2 + 0.8) return false;
  if (city.water && dx > city.water.minX && dx < city.water.maxX && dz > city.water.minZ && dz < city.water.maxZ) return false;
  return (city.roads || []).some(r => { const half = (r.width || 10) / 2; const d = distToRoad(r, dx, dz); return d >= half + 0.8 && d <= half + 14; });
}
/** Open ground in front of the sign, so the front is not pressed against another building. */
function frontageClear(city, x, z, face, depth = 12) {
  const [fx, fz] = face; let x0, x1, z0, z1;
  if (fx === 1) { x0 = x + W / 2 + 0.5; x1 = x0 + depth; z0 = z - D / 2; z1 = z + D / 2; }
  else if (fx === -1) { x1 = x - W / 2 - 0.5; x0 = x1 - depth; z0 = z - D / 2; z1 = z + D / 2; }
  else if (fz === 1) { z0 = z + D / 2 + 0.5; z1 = z0 + depth; x0 = x - W / 2; x1 = x + W / 2; }
  else { z1 = z - D / 2 - 0.5; z0 = z1 - depth; x0 = x - W / 2; x1 = x + W / 2; }
  for (const q of city.buildings || []) if (x0 < q.x + q.w / 2 && x1 > q.x - q.w / 2 && z0 < q.z + q.d / 2 && z1 > q.z - q.d / 2) return false;
  return true;
}
function defaultRegion(city) {
  const yaba = (city.districts || []).find(d => d.name === 'Yaba');
  if (yaba) return { x0: yaba.x0 + 28, x1: -24, z0: yaba.z0 + 28, z1: -24 };
  const b = city.bounds;
  if (city.cityName === 'Lagos' || String(city.id || '').startsWith('lagos')) return { x0: b.minX + 24, x1: -20, z0: b.minZ + 24, z1: -20 };
  return { x0: b.minX + 28, x1: b.maxX - 28, z0: b.minZ + 28, z1: b.maxZ - 28 };
}
function findSpot(city, region, anchor) {
  const [ax, az] = anchor; const hits = [];
  for (let x = region.x0; x <= region.x1; x += 4) for (let z = region.z0; z <= region.z1; z += 4) {
    if (!free(city, x, z)) continue;
    const prefer = nearestFace(city, x, z);
    const faces = [prefer, ...FACES.filter(f => f[0] !== prefer[0] || f[1] !== prefer[1])];
    for (const face of faces) {
      const door = doorOf(x, z, face);
      if (doorOk(city, door) && frontageClear(city, x, z, face)) { hits.push({ x, z, face, door, rank: Math.hypot(x - ax, z - az) }); break; }
    }
  }
  hits.sort((a, b) => a.rank - b.rank || a.x - b.x || a.z - b.z);
  return hits[0] || null;
}

const checker = (a, c) => ({ style: 'checker', a, b: c });
function venueRoom() {
  return {
    w: 10, d: 8, wall: '#e7eef2', trim: '#00c2b8', floor: checker('#d5e4ea', '#b7cdd6'),
    windows: [{ wall: 'left', at: 0, w: 2.6, big: true }, { wall: 'right', at: 0, w: 2.2, big: true }], mood: 'bright', door: 'Enter',
    decor: [
      { k: 'neon', x: 0, z: -3.85, text: 'TTA', c: '#00c2b8' },
      { k: 'flag', x: -3.5, z: -3.87, y: 2.2 }, { k: 'clock', x: -1.2, z: -3.87, y: 2.55 },
      { k: 'art', x: 1.1, z: -3.87, w: 1.2, h: 0.8, kind: 'bars', y: 1.8 }, { k: 'art', x: 3.3, z: -3.87, w: 1.1, h: 0.8, kind: 'sun', y: 1.8 },
      { k: 'desk', x: -2.2, z: 0.2 }, { k: 'chair', x: -2.2, z: 1.2, ry: 0, c: '#00a896' },
      { k: 'desk', x: 1.6, z: 0.2 }, { k: 'chair', x: 1.6, z: 1.2, ry: 0, c: '#00a896' },
      { k: 'plant', x: -4.4, z: 3.2 }, { k: 'plant', x: 4.4, z: 3.2 },
      { k: 'waterDispenser', x: 4.4, z: -1.0 }, { k: 'floorLamp', x: -4.3, z: 0.2 },
      { k: 'shelf', x: 4.2, z: 2.2, c: '#8a5a2b' }, { k: 'crowd', x: 0.2, z: -1.4, n: 2, r: 0.8, yaw: Math.PI / 2, seed: 11 }
    ],
    detailV2: true
  };
}

/** Place TTA (Tech Talent) if this city does not already have its venue. */
export function addTta(city, opt = {}) {
  const venueId = opt.venueId || (city.id === 'ogun-ijebu' ? 'ij_venue_tta' : 'venue_tta');
  const buildingId = opt.buildingId || (city.id === 'ogun-ijebu' ? 'ij_b_tta' : 'b_tta');
  if ((city.venues || []).some(v => v.id === venueId) || (city.buildings || []).some(b => b.id === buildingId)) return city;
  const region = opt.region || defaultRegion(city);
  const anchor = opt.anchor || (city.id === 'ogun-ijebu' ? [140, 30] : [-80, -80]);
  const spot = findSpot(city, region, anchor);
  if (!spot) { if (opt.optional) { console.warn(`no free spot for TTA in ${city.id}`); return city; } throw new Error(`no free spot for TTA in ${city.id}`); }
  const [doorX, doorZ] = spot.door;
  city.buildings.push({ kind: 'tta', x: spot.x, z: spot.z, w: W, d: D, h: 8, floors: 2, color: '#10243a', sign: '#00c2b8', label: 'TTA', face: spot.face, id: buildingId, tag: 'tta' });
  city.venues.push({
    id: venueId, name: 'TTA Tech Talent', blurb: 'Tech Talent. A training floor: desks, a word board and a notice about the programme.',
    buildingId, x: doorX, z: doorZ, hours: [8, 20], sign: '#00c2b8', kind: 'tta',
    stations: [
      { id: 'about', type: 'poster', label: 'About TTA', x: -3.2, z: -2.2, color: '#00c2b8', text: 'TTA is Tech Talent: desks to work at, a word board, and a place to meet other builders. This is the game version. Nothing here costs real money.' },
      { id: 'word', type: 'casual', game: 'word', label: 'Word of the Day board', x: 3.2, z: -2.2, color: '#c8a23d' },
      { id: 'rules', type: 'poster', label: 'House rules', x: -3.4, z: 2.6, color: '#f0c419', text: 'Game money only. Be respectful: you can be reported, muted or blocked. The programme on the wall is a placeholder.' }
    ],
    room: venueRoom()
  });
  return city;
}

function indent(obj) {
  return JSON.stringify(obj, null, 1).split('\n').map(l => (l ? `  ${l}` : l)).join('\n');
}
function spliceArray(raw, key, nextKey, obj) {
  const start = raw.indexOf(`\n "${key}": [`);
  const end = raw.indexOf(`\n ],\n "${nextKey}":`, start);
  if (start < 0 || end < 0) throw new Error(`cannot splice ${key} before ${nextKey}`);
  return raw.slice(0, end) + ',\n' + indent(obj) + raw.slice(end);
}
function writeCity(path, opt) {
  const raw = fs.readFileSync(path, 'utf8');
  const city = JSON.parse(raw);
  const n = (city.venues || []).length;
  addTta(city, opt);
  if ((city.venues || []).length === n) { console.log(city.id, 'already has TTA'); return; }
  const b = city.buildings.at(-1), v = city.venues.at(-1);
  const nl = raw.endsWith('\n') ? '\n' : '';
  const round = JSON.stringify(JSON.parse(raw), null, 1) + nl;
  let out;
  if (raw === round) out = JSON.stringify(city, null, 1) + nl;
  else out = spliceArray(spliceArray(raw, 'buildings', 'properties', b), 'venues', 'roundabouts', v);
  const check = JSON.parse(out);
  if (!check.buildings.some(x => x.id === b.id) || !check.venues.some(x => x.id === v.id)) throw new Error('write missed TTA');
  fs.writeFileSync(path, out);
  console.log(`${city.id}: TTA at (${b.x}, ${b.z}), door (${v.x}, ${v.z})`);
}

const here = process.argv[1] && new URL(import.meta.url).pathname === process.argv[1];
if (here) {
  writeCity(new URL('../server/config/cities/lagos-mainland.json', import.meta.url));
  writeCity(new URL('../server/config/cities/ogun-ijebu.json', import.meta.url));
}
