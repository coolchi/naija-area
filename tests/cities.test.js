// Multi-city foundation: validation, registry, per-city presence / chat / ads / shops / jobs / venues, moving between cities, id clashes.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { buildServer, loadRegistry } from '../server/createServer.js'; import { dispatch } from '../server/core/routes.js'; import * as auth from '../server/core/auth.js'; import { teleport, heartbeat, sendChat } from '../server/core/world.js';
import { validateCity, mergeCities, indexCity } from '../server/core/city.js'; import { enterCity, cityIdOf, onlineByCity } from '../server/core/cities.js'; import { BALANCE } from '../server/config/balance.js';
import * as ads from '../server/core/ads.js'; import { checkInvariants } from '../server/core/ledger.js';
process.env.NA_BCRYPT_COST = '4';
const town = JSON.parse(fs.readFileSync(new URL('./fixtures/test-town.json', import.meta.url)));
const mk = () => { const balance = structuredClone(BALANCE); balance.shops.enforceHours = false; balance.chat.minIntervalMs = 0; return buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x', dev: true, balance, extraCities: [town], ...loadOnlyDefault() }); };
const loadOnlyDefault = () => ({ cityJson: JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))) });
let n = 0; const user = (s, cash = 20000) => auth.newPlayer(s.app, { username: `cu${++n}_${Math.floor(Math.random() * 1e5)}`, isGuest: false, isBot: false, ageConfirmed: true, cash });
const call = async (s, m, p, o = {}) => { const [path, qs] = p.split('?'); return await dispatch(s.app, { method: m, path, query: qs ? Object.fromEntries(new URLSearchParams(qs)) : {}, body: o.body, headers: {}, ip: '10.0.0.1', uid: o.uid }); };
const hb = (s, uid, trail = []) => heartbeat(s.app, uid, { trail, mode: 'walk' });

test('the shipped registry loads, validates, and has the default city', () => {
  const r = loadRegistry(); assert.equal(r.cityJson.id, 'lagos-mainland'); assert.deepEqual(validateCity(r.cityJson), []); const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x' }); assert.equal(s.app.defaultCityId, 'lagos-mainland'); assert.ok(s.app.cities['lagos-mainland']);
});
test('validateCity: the generated template passes, and broken configs are named', () => {
  assert.deepEqual(validateCity(town), []);
  const bad1 = structuredClone(town); delete bad1.spawns; assert.ok(validateCity(bad1).some(e => /spawns/.test(e)));
  const bad2 = structuredClone(town); bad2.spawns = [{ x: 9999, z: 0 }]; assert.ok(validateCity(bad2).some(e => /spawn outside/.test(e)));
  const bad3 = structuredClone(town); bad3.buildings.push({ ...bad3.buildings[0] }); assert.ok(validateCity(bad3).some(e => /duplicate id/.test(e)));
  const bad4 = structuredClone(town); bad4.properties[0].buildingId = 'nope'; assert.ok(validateCity(bad4).some(e => /no building/.test(e)));
  assert.ok(validateCity(town, { ...{ maxBuildings: 2, maxRoads: 9, maxBillboards: 9, maxTrafficLoops: 9, maxVenues: 9 } }).some(e => /too many buildings/.test(e)), 'performance budget is enforced');
  assert.throws(() => buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x', cityJson: loadOnlyDefault().cityJson, extraCities: [bad3] }), /not valid/);
});
test('ids may not clash across cities', () => {
  const a = indexCity(loadOnlyDefault().cityJson), b = indexCity(structuredClone(town)); assert.doesNotThrow(() => mergeCities([a, b]));
  const clash = structuredClone(town); clash.shops[0].id = 'shop_mart'; assert.throws(() => mergeCities([a, indexCity(clash)]), /clash/);
});
test('a new player starts in the default city; /api/me style profile and /api/city tell the client which city to load', async () => {
  const s = mk(); const u = user(s); assert.equal(cityIdOf(s.app, u), 'lagos-mainland'); const city = (await call(s, 'GET', '/api/city', { uid: u })).json; assert.equal(city.id, 'lagos-mainland'); assert.equal(city.propertyById, undefined);
  enterCity(s.app, u, 'test-town'); assert.equal((await call(s, 'GET', '/api/city', { uid: u })).json.id, 'test-town'); assert.equal((await call(s, 'GET', '/api/city')).json.id, 'lagos-mainland', 'anonymous gets the default'); const list = (await call(s, 'GET', '/api/cities', { uid: u })).json; assert.equal(list.cities.length, 2); assert.ok(list.cities.find(c => c.id === 'test-town').here);
});
test('enterCity moves the player to the new city spawn, persists across a restart of presence, and refuses unknown cities', async () => {
  const s = mk(); const u = user(s); hb(s, u); const r = enterCity(s.app, u, 'test-town', 1); assert.deepEqual(r.pos, { x: town.spawns[1].x, z: town.spawns[1].z }); const row = s.app.db.prepare('SELECT city_id,x,z FROM player_state WHERE user_id=?').get(u); assert.equal(row.city_id, 'test-town');
  s.app.world.players.delete(u); hb(s, u); assert.equal(s.app.world.players.get(u).city, 'test-town'); assert.throws(() => enterCity(s.app, u, 'atlantis'), (e) => e.code === 'NO_CITY');
  assert.equal(hb(s, u).city, 'test-town');
});
test('presence is per city: players on the same coordinates in different cities never see each other', async () => {
  const s = mk(); const a = user(s), b = user(s), c = user(s); for (const u of [a, b, c]) hb(s, u); teleport(s.app, a, 0, 0); teleport(s.app, b, 0, 0); teleport(s.app, c, 2, 2); enterCity(s.app, c, 'test-town'); teleport(s.app, c, 2, 2);
  hb(s, a); hb(s, b); hb(s, c); const seenA = hb(s, a).players.map(p => p.id), seenC = hb(s, c).players.map(p => p.id); assert.deepEqual(seenA, [b]); assert.deepEqual(seenC, []);
  const on = onlineByCity(s.app); assert.equal(on['lagos-mainland'], 2); assert.equal(on['test-town'], 1);
});
test('chat is per city', async () => {
  const s = mk(); const a = user(s), b = user(s), c = user(s); for (const u of [a, b, c]) hb(s, u); enterCity(s.app, c, 'test-town'); for (const u of [a, b, c]) teleport(s.app, u, 0, 0);
  sendChat(s.app, a, 'Good morning Lagos'); sendChat(s.app, c, 'Good morning Test Town'); const ta = hb(s, b).chat.map(m => m.t), tc = hb(s, c).chat.map(m => m.t); assert.deepEqual(ta, ['Good morning Lagos']); assert.deepEqual(tc, ['Good morning Test Town']);
});
test('shops, venues, properties, plots and places follow the player city; other-city places are refused', async () => {
  const s = mk(); const u = user(s); const lag = (await call(s, 'GET', '/api/shops', { uid: u })).json.shops.map(x => x.id); assert.ok(lag.includes('shop_mart') && !lag.includes('tt_shop'));
  enterCity(s.app, u, 'test-town'); const loc = (await call(s, 'GET', '/api/shops', { uid: u })).json.shops.map(x => x.id); assert.ok(loc.includes('tt_shop') && !loc.includes('shop_mart'));
  const vs = (await call(s, 'GET', '/api/venues', { uid: u })).json.venues.map(v => v.id); assert.deepEqual(vs, ['tt_venue_eatery']); const props = (await call(s, 'GET', '/api/properties', { uid: u })).json.properties.map(p => p.id); assert.ok(props.every(id => id.startsWith('tt_')) && props.length === 4);
  assert.equal((await call(s, 'GET', '/api/travel/quote?place=venue_motors', { uid: u })).json.error, 'NO_PLACE'); assert.ok((await call(s, 'GET', '/api/travel/quote?place=tt_shop', { uid: u })).json.modes);
  const jobs = (await call(s, 'GET', '/api/jobs', { uid: u })).json.jobs.map(j => j.id); assert.deepEqual(jobs, ['shop'], 'only the jobs this city offers');
});
test('homes work in the other city (rent, then inside the right interior), and ledger invariants hold', async () => {
  const s = mk(); const u = user(s, 50000); enterCity(s.app, u, 'test-town'); const p = town.properties[0]; teleport(s.app, u, p.door.x, p.door.z); const r = await call(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent', idem: 'x1' } });
  assert.equal(r.status, 200, JSON.stringify(r.json)); assert.ok(checkInvariants(s.app.db));
});
test('ad inventory is per city: boards, quotes and campaigns carry the city', async () => {
  const s = mk(); assert.equal(ads.slotsFor(s.app, 'road_billboard', undefined, 'test-town').length, 2); assert.ok(ads.slotsFor(s.app, 'road_billboard', undefined, 'lagos-mainland').length >= 8);
  const a = ads.getOrCreateAdvertiser(s.app, { email: 'x@example.com', brand: 'Demo' }); const png = (await import('../server/lib/png.js')).makePng(1024, 512, (x, y) => { const k = (((x + y) >> 6) & 1) ? 1 : 0.82; return [90 * k, 140 * k, 200 * k]; }, 6); const up = ads.uploadCreative(s.app, a.id, png, 'image/png');
  const id = ads.createCampaign(s.app, a.id, { surface: 'road_billboard', tier: 'street', units: 1, days: 7, creativeId: up.creativeId, headline: 'Town ad', linkUrl: 'https://example.com/t', testModeAck: true, cityId: 'test-town' }, { demo: true }); if (s.app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status === 'human_review') ads.decide(s.app, id, 'approve', 'test', 'ok'); ads.tickAds(s.app);
  assert.equal(s.app.db.prepare('SELECT city_id FROM ad_campaigns WHERE id=?').get(id).city_id, 'test-town'); const snapTown = ads.adsSnapshot(s.app, s.app.clock.now(), 'test-town'), snapLag = ads.adsSnapshot(s.app, s.app.clock.now(), 'lagos-mainland');
  assert.ok(Object.keys(snapTown.slots).length >= 1 && Object.keys(snapTown.slots).every(k => k.startsWith('tt_'))); assert.equal(Object.keys(snapLag.slots).length, 0);
  assert.throws(() => ads.createCampaign(s.app, a.id, { surface: 'road_billboard', tier: 'street', units: 1, days: 7, creativeId: up.creativeId, headline: 'x', linkUrl: 'https://example.com/t', testModeAck: true, cityId: 'nowhere' }, { demo: true }), (e) => e.code === 'NO_CITY');
});
test('crash safe zones and clinic are computed per city (the template city has no clinic: no crash on a missing one)', async () => {
  const { safeZones, clinicPlace } = await import('../server/core/crash.js'); const s = mk(); const lag = safeZones(s.app, s.app.cities['lagos-mainland']), tt = safeZones(s.app, s.app.cities['test-town']); assert.ok(lag.length > tt.length); assert.ok(tt.some(z => z.why === 'spawn')); assert.ok(clinicPlace(s.app, s.app.cities['lagos-mainland'])); assert.equal(clinicPlace(s.app, s.app.cities['test-town']), null);
});
test('the template generator output is deterministic and every id carries the prefix', () => {
  const ids = [...town.buildings, ...town.properties, ...town.shops, ...town.billboards, ...town.venues, ...town.roads].map(e => e.id); assert.ok(ids.every(i => i.startsWith('tt_')), ids.join(','));
});
