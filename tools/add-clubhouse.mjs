// Adds the CLUBHOUSE to Lagos Mainland (a building and a venue where club members meet; the club board station opens the club's page, chat and roster). Idempotent.
// Usage: node tools/add-clubhouse.mjs   (rewrites server/config/cities/lagos-mainland.json). The spot is searched on a grid so it never overlaps buildings, roads, plots or curves.
import fs from 'node:fs';
const F = new URL('../server/config/cities/lagos-mainland.json', import.meta.url);
const free = (c, x, z, w, d) => {
  const x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2; const b = c.bounds; if (x0 < b.minX + 8 || x1 > b.maxX - 8 || z0 < b.minZ + 8 || z1 > b.maxZ - 24) return false;
  for (const q of c.buildings) if (x0 < q.x + q.w / 2 + 5 && x1 > q.x - q.w / 2 - 5 && z0 < q.z + q.d / 2 + 5 && z1 > q.z - q.d / 2 - 5) return false;
  for (const r of c.roads) { const hw = r.width / 2 + 5; if (r.pts) { for (const [px, pz] of r.pts) if (px > x0 - hw && px < x1 + hw && pz > z0 - hw && pz < z1 + hw) return false; } else if (x1 > Math.min(r.x1, r.x2) - hw && x0 < Math.max(r.x1, r.x2) + hw && z1 > Math.min(r.z1, r.z2) - hw && z0 < Math.max(r.z1, r.z2) + hw) return false; }
  for (const p of c.plots || []) if (Math.abs(p.x - x) < (p.size + w) / 2 + 3 && Math.abs(p.z - z) < (p.size + d) / 2 + 3) return false;
  for (const o of [...(c.properties || []), ...(c.carParks || []), ...(c.busStops || [])]) if (o.x !== undefined && Math.abs(o.x - x) < w / 2 + 8 && Math.abs(o.z - z) < d / 2 + 8) return false;
  return true;
};
export function addClubhouse(city) {
  if (city.venues.some(v => v.id === 'venue_crewhq')) return city;
  const w = 22, d = 16; let spot = null; for (let r = 0; r < 400 && !spot; r += 4) for (let a = -r; a <= r && !spot; a += 4) for (const [x, z] of [[a, -r], [a, r], [-r, a], [r, a]]) if (free(city, -60 + x, 50 + z, w, d)) { spot = [-60 + x, 50 + z]; break; }
  if (!spot) throw new Error('no free spot for the clubhouse');
  const [x, z] = spot; const b = { kind: 'office', x, z, w, d, h: 7, floors: 2, color: '#e9dcc3', sign: '#8e44ad', label: 'Clubhouse', face: [0, -1], id: `b${String(city.buildings.length + 1).padStart(3, '0')}`, tag: 'clubhouse' }; city.buildings.push(b);
  const checker = (a, c) => ({ style: 'checker', a, b: c });
  city.venues.push({ id: 'venue_crewhq', name: 'Clubhouse', blurb: 'Where clubs and crews meet. Found a club, join one, read the club board and chat with your members.', buildingId: b.id, x, z: +(z - d / 2 - 3.5).toFixed(1), hours: [0, 24], sign: '#8e44ad', kind: 'clubhouse', stations: [
    { id: 'clubboard', type: 'club', label: 'Club board', x: -2.4, z: -2.4, color: '#8e44ad' },
    { id: 'clubdesk', type: 'club', label: 'Found or join a club', x: 2.6, z: -2.4, color: '#ffc20e' },
    { id: 'poster', type: 'poster', label: 'House rules', x: -4.2, z: 2.4, color: '#f0c419', text: 'Clubs and crews: up to 20 members each, one club per player. Be kind: names and chat are filtered, and anyone can be reported. Club chat is only for members. Nothing here costs real money, and game money cannot be cashed out.' }],
    room: { w: 10, d: 8, wall: '#efe6f2', trim: '#8e44ad', floor: checker('#d9cde0', '#b9a5c6'), windows: [{ wall: 'left', at: 0, w: 2.6, big: true }], mood: 'warm', decor: [
      { k: 'flag', x: -3.6, z: -3.9, y: 2.2 }, { k: 'flag', x: 3.6, z: -3.9, y: 2.2 }, { k: 'clock', x: 0.2, z: -3.9, y: 2.5 }, { k: 'art', x: -4.4, z: -0.6, w: 1.2, h: 0.8, kind: 'bars', y: 1.8 }, { k: 'plant', x: -4.4, z: -3.4 }, { k: 'plant', x: 4.4, z: 3.4 },
      { k: 'table', x: 0.6, z: 1.4, c: '#ffffff' }, { k: 'chair', x: -0.6, z: 1.4, ry: 1.2, c: '#8e44ad' }, { k: 'chair', x: 1.8, z: 1.4, ry: -1.2, c: '#8e44ad' }, { k: 'sofa', x: -3.4, z: 3.0, c: '#8e44ad', rot: 1 }, { k: 'coffeeTable', x: -2.0, z: 3.0 },
      { k: 'floorLamp', x: 1.8, z: 3.5 }, { k: 'shelf', x: 2.0, z: -3.6, c: '#8a5a2b' }, { k: 'waterDispenser', x: 4.4, z: -1.0 }, { k: 'crowd', x: 0.4, z: 0.4, n: 3, r: 0.9, yaw: Math.PI / 2, seed: 17 }], detailV2: true } });
  return city;
}
if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) { const c = JSON.parse(fs.readFileSync(F)); addClubhouse(c); fs.writeFileSync(F, JSON.stringify(c, null, 1)); console.log('clubhouse added'); }
