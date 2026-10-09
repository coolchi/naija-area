import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { indexCity } from '../server/core/city.js';
import { buildModel, search, hitTest, labelRules, DEFAULT_LAYERS, LAYERS, KIND_COL } from '../client/src/map-model.js';
const raw = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url)));
const city = indexCity(raw); const model = buildModel(city);

test('map model: every road, building, venue, shop, job, plot, landmark and home in the city JSON is on the map; billboards are an optional layer', () => {
  assert.equal(model.roads.length, city.roads.length); assert.equal(model.buildings.length, city.buildings.length); assert.ok(model.districts.length >= 5);
  for (const t of ['venue', 'shop', 'job', 'plot', 'house', 'landmark', 'billboard']) assert.ok(model.items.some(i => i.type === t), t);
  for (const v of city.venues) assert.ok(model.items.find(i => i.id === v.id && i.type === 'venue' && i.icon), v.id);
  assert.equal(model.items.filter(i => i.type === 'house').length, city.properties.length); assert.equal(model.items.filter(i => i.type === 'plot').length, city.plots.length);
  assert.equal(DEFAULT_LAYERS.billboards, false); assert.ok(LAYERS.every(([id]) => id in DEFAULT_LAYERS)); for (const b of city.buildings) assert.ok(KIND_COL[b.kind], `colour for ${b.kind}`);
  assert.ok(model.items.filter(i => i.placeId).every(i => city.placeById[i.placeId]), 'every tappable item opens a real place the server accepts');
});
test('districts are data: the server area() lookup comes from the city JSON and still gives the old names', () => {
  assert.equal(city.area(-50, -50), 'Yaba'); assert.equal(city.area(50, -50), 'Ikeja'); assert.equal(city.area(-50, 50), 'Surulere'); assert.equal(city.area(50, 50), 'Lekki Phase 1'); assert.equal(city.area(0, 140), 'Lagoon Front');
  const alt = indexCity({ ...raw, districts: [{ id: 'd1', name: 'Test Quarter', x0: -300, x1: 300, z0: -300, z1: 300 }] }); assert.equal(alt.area(1, 1), 'Test Quarter'); const none = indexCity({ ...raw, districts: undefined }); assert.equal(none.area(-5, -5), 'Yaba');
});
test('map search: prefix beats substring, finds places/roads/districts, empty query lists the highlights', () => {
  assert.equal(search(model, 'mama')[0].id, 'venue_mamaput'); assert.ok(search(model, 'okada').some(i => i.type === 'road')); assert.ok(search(model, 'ikeja').some(i => i.type === 'district')); assert.ok(search(model, 'ikorodu').some(i => i.type === 'plot'));
  assert.equal(search(model, 'zzzzqq').length, 0); assert.ok(search(model, '').length > 3); assert.ok(search(model, 'a', 5).length <= 5); assert.ok(search(model, 'meco').some(i => i.id === 'venue_meco'));
});
test('map hit-test: markers beat buildings beat plots beat roads beat districts; layers switch things off; labels appear by zoom', () => {
  const mp = city.venues.find(v => v.id === 'venue_mamaput'); assert.equal(hitTest(model, mp.x, mp.z, 3).id, 'venue_mamaput'); assert.equal(hitTest(model, mp.x, mp.z, 3, { ...DEFAULT_LAYERS, venues: false })?.type === 'venue', false);
  const house = city.buildings.find(b => b.propertyId); const hb = hitTest(model, house.x + house.w / 2 - 1, house.z + house.d / 2 - 1, 0.5); assert.equal(hb.type, 'building'); assert.ok(hb.placeId, 'a home building opens its property');
  const p = city.plots[0]; assert.equal(hitTest(model, p.x + 3, p.z + 3, 1).type, 'plot'); const r = city.roads[0]; assert.equal(hitTest(model, r.x1, r.z1 + 3, 0.5, { ...DEFAULT_LAYERS, buildings: false }).type, 'road');
  assert.equal(hitTest(model, -230, 130, 0.6, { ...DEFAULT_LAYERS, buildings: false, roads: false }).type, 'district'); assert.equal(hitTest(model, 0, 200, 1).type, 'water'); assert.equal(hitTest(model, 9999, 9999, 1), null);
  assert.equal(hitTest(model, 0, 0, 1, DEFAULT_LAYERS, [{ id: 7, name: 'bola', x: 0.5, z: 0.5 }]).type, 'player');
  const bb = city.billboards.find(b => b.surface !== 'lagoon_plot'); assert.notEqual(hitTest(model, bb.x, bb.z, 3)?.type, 'billboard'); assert.equal(hitTest(model, bb.x, bb.z, 3, { ...DEFAULT_LAYERS, billboards: true }).type, 'billboard');
  assert.ok(labelRules.district(0.8) && !labelRules.district(4)); assert.ok(!labelRules.building(1) && labelRules.building(5)); assert.ok(!labelRules.shop(1) && labelRules.shop(2.5));
});
test('map model works for a different city file with no venues/districts/plots (new cities reuse it)', () => {
  const tiny = indexCity({ id: 't', name: 'Tiny', bounds: { minX: -50, maxX: 50, minZ: -50, maxZ: 50 }, roads: [{ id: 'r', name: 'Only Road', x1: 0, z1: -50, x2: 0, z2: 50, width: 10 }], buildings: [{ kind: 'shop', x: 20, z: 20, w: 10, d: 10, h: 4, floors: 1, color: '#fff', id: 'b1' }], properties: [], shops: [], jobs: [], billboards: [], spawns: [], trafficLoops: [], landmarks: [], zones: [] });
  const m = buildModel(tiny); assert.equal(m.roads.length, 1); assert.equal(hitTest(m, 20, 20, 2).type, 'building'); assert.equal(hitTest(m, 0, 0, 1).type, 'road'); assert.deepEqual(search(m, 'only').map(i => i.id), ['r']);
});
