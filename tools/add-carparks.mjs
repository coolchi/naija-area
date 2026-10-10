// Idempotently adds car parks (lots) and their ad boards to the city JSON. Sites were found by scanning for free ground away from roads, buildings, water, roundabouts and plots.
import fs from 'node:fs'; const f = new URL('../server/config/cities/lagos-mainland.json', import.meta.url); const c = JSON.parse(fs.readFileSync(f));
const lots = [
  { id: 'cp_motors', name: 'Auto Mart Car Park', x: -57, z: 141.8, w: 32, d: 18, gate: 'e', fee: 0, kind: 'venue', venueId: 'venue_motors', blurb: 'Free for showroom customers (ESTIMATE rule: fee 0).' },
  { id: 'cp_club1', name: 'Midnight Lounge Car Park', x: 30, z: 141.3, w: 32, d: 18, gate: 'e', fee: 150, kind: 'venue', venueId: 'venue_club1', blurb: 'Night parking, small fee.' },
  { id: 'cp_club2', name: 'Sunset Rooftop Car Park', x: 160, z: 141.3, w: 32, d: 18, gate: 'w', fee: 150, kind: 'venue', venueId: 'venue_club2', blurb: 'Night parking, small fee.' },
  { id: 'cp_joint', name: 'Corner Joint Car Park', x: 199.5, z: 141.8, w: 32, d: 18, gate: 'w', fee: 100, kind: 'venue', venueId: 'venue_joint', blurb: 'Park and play. Small fee.' },
  { id: 'cp_public', name: 'Surulere Public Car Park', x: 28, z: 60, w: 32, d: 18, gate: 'w', fee: 100, kind: 'public', blurb: 'Public lot, small fee (ESTIMATE).' }
];
c.carParks = lots.map(l => ({ ...l }));
c.billboards = c.billboards.filter(b => b.surface !== 'carpark_board');
for (const l of lots) { const sz = l.gate === 'e' ? -1 : 1; c.billboards.push({ id: 'cb_' + l.id.slice(3), surface: 'carpark_board', tier: 'lot', x: l.x + sz * 6, z: l.z - l.d / 2 - 0.8, nx: 0, nz: -1, w: 8, h: 4, y: 5, lot: l.id }); }
fs.writeFileSync(f, JSON.stringify(c, null, 1)); console.log('lots', c.carParks.length);
