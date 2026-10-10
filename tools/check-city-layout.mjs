// Layout checker: overlapping buildings, buildings on roads, outside bounds, in water. Usage: node tools/check-city-layout.mjs [file ...]
import fs from 'node:fs';
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync('server/config/cities').filter(f => f.startsWith('lagos-') && f.endsWith('.json')).map(f => 'server/config/cities/' + f);
let bad = 0; for (const f of files) { const c = JSON.parse(fs.readFileSync(f)); const bs = c.buildings.map(b => ({ b, x0: b.x - b.w / 2, x1: b.x + b.w / 2, z0: b.z - b.d / 2, z1: b.z + b.d / 2 })); const p = (m) => { bad++; console.log(`${c.id}: ${m}`); };
  for (let i = 0; i < bs.length; i++) { const a = bs[i]; if (a.x0 < c.bounds.minX || a.x1 > c.bounds.maxX || a.z0 < c.bounds.minZ || a.z1 > c.bounds.maxZ) p(`${a.b.id} out of bounds`);
    for (let j = i + 1; j < bs.length; j++) { const q = bs[j]; if (a.x0 < q.x1 && a.x1 > q.x0 && a.z0 < q.z1 && a.z1 > q.z0) p(`${a.b.id} overlaps ${q.b.id}`); }
    for (const r of c.roads) { if (r.pts) { for (const [x, z] of r.pts) if (x > a.x0 - r.width / 2 && x < a.x1 + r.width / 2 && z > a.z0 - r.width / 2 && z < a.z1 + r.width / 2) { p(`${a.b.id} on curve ${r.id}`); break; } continue; } const hw = r.width / 2; const rx0 = Math.min(r.x1, r.x2) - hw, rx1 = Math.max(r.x1, r.x2) + hw, rz0 = Math.min(r.z1, r.z2) - hw, rz1 = Math.max(r.z1, r.z2) + hw; if (a.x0 < rx1 && a.x1 > rx0 && a.z0 < rz1 && a.z1 > rz0) p(`${a.b.id} on road ${r.id}`); }
    for (const w of c.creeks || []) if (a.x0 < w.x1 && a.x1 > w.x0 && a.z0 < w.z1 && a.z1 > w.z0) p(`${a.b.id} in creek ${w.id}`);
    if (c.water && a.z1 > c.water.minZ) p(`${a.b.id} in the water`); }
  console.log(`${c.id}: ${c.buildings.length} buildings checked`); }
process.exit(bad ? 1 : 0);
