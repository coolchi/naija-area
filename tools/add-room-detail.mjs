// Interior detail pass: adds wall decor (flag, clock, art), seating corners and ambient crowds to venue rooms, from config data. Idempotent.
// Usage: node tools/add-room-detail.mjs   (rewrites server/config/cities/lagos-mainland.json)
import fs from 'node:fs';
const F = new URL('../server/config/cities/lagos-mainland.json', import.meta.url);
export function addRoomDetail(city) {
  for (const v of city.venues || []) {
    const R = v.room; if (!R || R.detailV2) continue; const dec = R.decor ||= []; const w = R.w, d = R.d;
    const wallKinds = new Set(['shelf', 'menu', 'mirror', 'toolwall', 'poleSign', 'speaker', 'fridge', 'stage', 'neon', 'bar', 'lift', 'desk']);
    const occ = dec.filter(o => wallKinds.has(o.k) && o.z != null && o.z < -d / 2 + 1.4).map(o => [(o.x || 0) - 1.4, (o.x || 0) + 1.4]);
    const club = /club/.test(v.id), shop = ['venue_meco', 'venue_motors'].includes(v.id);
    const wallList = club ? [] : shop ? ['flag', 'clock', 'art'] : ['flag', 'clock', 'art', 'art'];
    let ia = 0; for (const kind of wallList) { const need = kind === 'clock' ? 0.8 : 1.4; for (let c = -w / 2 + 1.0; c < w / 2 - 1.0; c += 0.25) { if (occ.some(([a, b]) => c - need / 2 < b && c + need / 2 > a)) continue; occ.push([c - need / 2, c + need / 2]); dec.push({ k: kind, x: +c.toFixed(2), z: +(-d / 2 + 0.13).toFixed(2), ...(kind === 'art' ? { kind: ['bars', 'sun'][ia++ % 2] } : {}), ...(kind === 'clock' ? { y: 2.55 } : {}) }); break; } }
    if (v.id === 'venue_motors') dec.push({ k: 'sofa', x: -w / 2 + 1.2, z: d / 2 - 1.8, c: '#1f6f7a', rot: 1 }, { k: 'coffeeTable', x: -w / 2 + 2.5, z: d / 2 - 1.8 }, { k: 'waterDispenser', x: w / 2 - 0.6, z: -d / 2 + 0.6 }, { k: 'floorLamp', x: -w / 2 + 0.6, z: d / 2 - 0.6 });
    if (v.id === 'venue_meco') dec.push({ k: 'generator', x: 3.4, z: 0.2 }, { k: 'waterDispenser', x: -w / 2 + 0.5, z: d / 2 - 0.7 });
    if (v.id === 'venue_mamaput') dec.push({ k: 'crowd', x: 0, z: -1.9, n: 3, r: 0.9, yaw: Math.PI / 2, seed: 4 }, { k: 'waterDispenser', x: -w / 2 + 0.6, z: -1.6 });
    if (v.id === 'venue_viewing') dec.push({ k: 'crowd', x: 0, z: 1.2, n: 6, r: 2.2, yaw: Math.PI / 2, seed: 8 }, { k: 'waterDispenser', x: w / 2 - 0.6, z: d / 2 - 0.7 });
    if (v.id === 'venue_joint') dec.push({ k: 'crowd', x: 0, z: 1.0, n: 3, r: 1.2, yaw: Math.PI / 2, seed: 2 }, { k: 'waterDispenser', x: w / 2 - 0.6, z: -d / 2 + 0.6 });
    if (club) dec.push({ k: 'crowd', x: 0, z: 0.8, n: 9, r: 1.9, dance: true, seed: club && v.id.endsWith('2') ? 13 : 6 });
    if (/salon/.test(v.id)) dec.push({ k: 'sofa', x: -w / 2 + 1.2, z: d / 2 - 1.4, c: '#e5989b', rot: 1 }, { k: 'coffeeTable', x: -w / 2 + 2.5, z: d / 2 - 1.4 }, { k: 'floorLamp', x: -w / 2 + 0.6, z: d / 2 - 0.5 });
    R.detailV2 = true;
  }
  return city;
}
if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) { const c = JSON.parse(fs.readFileSync(F)); addRoomDetail(c); fs.writeFileSync(F, JSON.stringify(c, null, 1)); console.log('room detail applied'); }
