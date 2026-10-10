// Adds the new break-game stations to the Lagos mainland district JSON (idempotent): Chop Am (match-3) at the Viewing Centre, Clear the Go-Slow at Mama Put, Table football at the Corner Joint.
// (The JSON is the source of truth. If you ever regenerate the district with tools/gen-city.mjs, run this tool again afterwards.) Usage: node tools/add-break-games.mjs
import fs from 'node:fs';
const f = 'server/config/cities/lagos-mainland.json'; const c = JSON.parse(fs.readFileSync(f, 'utf8'));
const ADD = { venue_viewing: [{ id: 'match1', type: 'casual', game: 'match3', label: 'Chop Am (match-3)', x: -3.4, z: -3.3, color: '#e0572b' }], venue_mamaput: [{ id: 'danfo1', type: 'casual', game: 'danfo', label: 'Clear the Go-Slow', x: 3.4, z: 0.9, color: '#f2c200' }],
  venue_joint: [{ id: 'football1', type: 'game', game: 'football', label: 'Table football', x: 3.2, z: -2.2, color: '#2e7d32' }] };
let n = 0; for (const [vid, sts] of Object.entries(ADD)) { const v = c.venues.find(x => x.id === vid); for (const s of sts) if (!v.stations.some(x => x.id === s.id)) { v.stations.push(s); n++; } }
fs.writeFileSync(f, JSON.stringify(c, null, 1)); console.log('added', n, 'stations');
