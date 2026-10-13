// TTA (Tech Talent) in Lagos mainland (Yaba) and Ijebu Ode.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { validateCity, indexCity, mergeCities } from '../server/core/city.js';
import { buildModel, search } from '../client/src/map-model.js';

const PLACES = [['lagos-mainland', 'venue_tta', 'b_tta', 'Yaba'], ['ogun-ijebu', 'ij_venue_tta', 'ij_b_tta', null]];

test('TTA Tech Talent is a building and a venue in Lagos (Yaba) and Ijebu Ode', () => {
  const cities = PLACES.map(([id]) => indexCity(JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${id}.json`, import.meta.url)))));
  mergeCities(cities);
  for (const [id, vid, bid, area] of PLACES) {
    const raw = JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${id}.json`, import.meta.url)));
    assert.deepEqual(validateCity(raw), [], id);
    const c = cities.find(x => x.id === id); const b = c.buildingById[bid]; const v = c.venueById[vid];
    assert.ok(b && b.kind === 'tta' && b.label === 'TTA' && b.tag === 'tta', id);
    assert.equal(v.name, 'TTA Tech Talent'); assert.equal(v.kind, 'tta'); assert.equal(v.buildingId, bid);
    assert.ok(v.blurb.startsWith('Tech Talent')); assert.deepEqual(v.hours, [8, 20]);
    assert.ok(v.stations.some(st => st.id === 'about' && /Tech Talent/.test(st.text)));
    assert.ok(c.placeById[vid], 'the door is a place you can travel to');
    assert.ok(!c.buildings.some(o => o.id !== b.id && Math.abs(o.x - b.x) < (o.w + b.w) / 2 && Math.abs(o.z - b.z) < (o.d + b.d) / 2), 'no overlap');
    if (area) assert.equal(c.area(b.x, b.z), area);
    const model = buildModel(c);
    assert.ok(search(model, 'tta').some(i => i.id === vid), 'search TTA');
    assert.ok(search(model, 'tech talent').some(i => i.id === vid), 'search Tech Talent');
  }
});
