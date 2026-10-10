// Adds the airport definition to the Lagos city config (idempotent). The terminal building and the 'airport' place already exist; this adds the apron, the runway and the arrival point.
// The runway and apron are drawn OUTSIDE the district bounds, on open ground east of the terminal (fictional layout, placeholder).
import fs from 'node:fs'; const f = new URL('../server/config/cities/lagos-mainland.json', import.meta.url); const c = JSON.parse(fs.readFileSync(f));
const t = c.buildings.find(b => b.kind === 'airport'); if (!t) throw new Error('no terminal building');
c.state = 'Lagos';
c.airport = { id: 'ap_lagos', name: 'Lagos Airport (placeholder)', door: { x: t.x, z: t.z + t.d / 2 + 4 }, apron: { x: 262, z: t.z - 2 }, runway: { x0: 300, z0: -130, x1: 300, z1: -470, width: 26 }, arrive: { x: t.x, z: t.z + t.d / 2 + 8, ry: 0 } };
fs.writeFileSync(f, JSON.stringify(c, null, 1)); console.log('airport added', JSON.stringify(c.airport));
