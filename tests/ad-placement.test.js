// Exclusive vs shared ad placement and several designs per campaign (11 Oct 2026; plan: 21_ad_exclusive_vs_shared_plan.md). All numbers are ESTIMATES from the rate card.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import Database from 'better-sqlite3';
import { makeServer, mkUser, call, ok, at, newAdvertiser, DAY, PG_URL } from './helpers.js';
import { tickAds, expectedFrame, expectedCampaign, windowOf, liveOnSlot, adsSnapshot, campaignStats, decide, decideDesign, designRows, availability } from '../server/core/ads.js';
import { RATE_CARD, PLACEMENTS, DEFAULT_PLACEMENT, priceFor, weeklyFor, maxCreatives, placementLabel } from '../server/config/ratecard.js';
import { pickFrame, rotIndex } from '../server/core/adslots.js';
import { makePng } from '../server/lib/png.js';
import { SCHEMA, migrate } from '../server/core/schema.js';
import { AD_PLACEMENT_BACKFILL } from '../server/core/later-schema.js';

const mkPng = (seed, w = 1024, h = 512) => makePng(w, h, (x, y) => [((x * 255) / w + seed * 41) % 255 | 0, (90 + seed * 23) % 255, (y * 255) / h | 0], 0);
const H = (key) => ({ 'x-advertiser-key': key });
async function up(s, key, seed, w, h) { return (await ok(s, 'POST', '/api/ads/upload', { raw: mkPng(seed, w, h), headers: { ...H(key), 'content-type': 'image/png' } })).creativeId; }
async function ups(s, key, n, seed0 = 1) { const out = []; for (let i = 0; i < n; i++) out.push(await up(s, key, seed0 + i)); return out; }
const submit = (s, key, creativeIds, over = {}) => call(s, 'POST', '/api/ads/campaigns', { headers: H(key), body: { creativeIds, surface: 'road_billboard', tier: 'street', units: 1, days: 7, linkUrl: 'https://brand.example.com/promo', headline: 'Fresh deals', testModeAck: true, ...over } });
const approve = (s, id, body = {}) => ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve', ...body } });
const slotsOf = (s, id) => s.db.prepare('SELECT slot_id, position FROM ad_assignments WHERE campaign_id=? ORDER BY slot_id').all(id);
const placementOf = (s, id) => s.db.prepare('SELECT placement FROM ad_campaigns WHERE id=?').get(id).placement;
async function goLive(s, key, n, over = {}, seed0 = 1) { const ids = await ups(s, key, n, seed0); const r = await submit(s, key, ids, over); assert.equal(r.status, 200, JSON.stringify(r.json)); const id = r.json.campaign.id; await approve(s, id); tickAds(s.app); return { id, ids }; }

test('rate card: exclusiveMultiplier 3 on every surface (ESTIMATE), shared price unchanged, exclusive = shared x multiplier', () => {
  assert.deepEqual(PLACEMENTS, ['shared', 'exclusive']); assert.equal(DEFAULT_PLACEMENT, 'shared');
  for (const [k, v] of Object.entries(RATE_CARD.surfaces)) { assert.equal(v.exclusiveMultiplier, 3, k); for (const t of Object.keys(v.tiers)) { assert.equal(weeklyFor(k, t, 'exclusive'), v.tiers[t].weekly * 3, `${k}:${t}`); assert.equal(weeklyFor(k, t), v.tiers[t].weekly); } }
  assert.equal(priceFor('road_billboard', 'street', 1, 7).net, 30000); assert.equal(priceFor('road_billboard', 'major', 2, 14).net, 320000); assert.equal(priceFor('road_billboard', 'major', 2, 14, 'shared').net, 320000, 'shared is today\'s price');
  const x = priceFor('road_billboard', 'major', 1, 7, 'exclusive'); assert.deepEqual([x.net, x.vat, x.total, x.weekly, x.sharedWeekly, x.placement], [240000, 18000, 258000, 240000, 80000, 'exclusive']);
  assert.equal(priceFor('road_billboard', 'major', 2, 14, 'exclusive').net, 960000); assert.equal(priceFor('road_billboard', 'major', 1, 7, 'vip'), null, 'unknown placement'); assert.equal(priceFor('road_billboard', 'major', 99, 7, 'exclusive'), null);
  assert.deepEqual([maxCreatives('road_billboard', 'shared'), maxCreatives('road_billboard', 'exclusive')], [2, 4]); assert.equal(RATE_CARD.maxCreativesShared, 2); assert.equal(RATE_CARD.maxCreativesExclusive, 4);
  assert.equal(placementLabel('road_billboard', 'shared'), 'Shared (1 of 4 positions)'); assert.equal(placementLabel('road_billboard', 'exclusive'), 'Exclusive (whole board)');
});
test('rate card: the multiplier and the design limits are configurable (a surface can override)', () => {
  const sp = RATE_CARD.surfaces.carpark_board; const keep = [sp.exclusiveMultiplier, sp.maxCreativesShared, sp.maxCreativesExclusive, RATE_CARD.maxCreativesExclusive];
  try { sp.exclusiveMultiplier = 2; sp.maxCreativesShared = 3; sp.maxCreativesExclusive = 6; assert.equal(priceFor('carpark_board', 'lot', 1, 7, 'exclusive').net, 40000); assert.equal(maxCreatives('carpark_board', 'shared'), 3); assert.equal(maxCreatives('carpark_board', 'exclusive'), 6); assert.equal(maxCreatives('road_billboard', 'exclusive'), 4); }
  finally { [sp.exclusiveMultiplier, sp.maxCreativesShared, sp.maxCreativesExclusive, RATE_CARD.maxCreativesExclusive] = keep; if (keep[1] === undefined) delete sp.maxCreativesShared; if (keep[2] === undefined) delete sp.maxCreativesExclusive; }
});
test('quote: placement defaults to shared; exclusive shows the multiplier and says so on the line; bad placement is refused', async () => {
  const s = makeServer(); const q = (body) => call(s, 'POST', '/api/ads/quote', { body });
  const a = (await q({ surface: 'road_billboard', tier: 'major', units: 1, days: 7 })).json.quote; assert.deepEqual([a.placement, a.net, a.vat, a.total, a.sharePct, a.maxDesigns, a.positionsTaken], ['shared', 80000, 6000, 86000, 25, 2, 1]); assert.equal(a.placementLabel, 'Shared (1 of 4 positions)'); assert.match(a.lines[0].description, /Road billboard · Major road board · Shared \(1 of 4 positions\)/);
  const b = (await q({ surface: 'road_billboard', tier: 'major', units: 1, days: 7, placement: 'exclusive' })).json.quote; assert.deepEqual([b.placement, b.net, b.vat, b.total, b.sharePct, b.maxDesigns, b.positionsTaken, b.weekly, b.sharedWeekly], ['exclusive', 240000, 18000, 258000, 100, 4, 4, 240000, 80000]); assert.match(b.lines[0].description, /Exclusive \(whole board\)/); assert.equal(b.lines[0].net, 240000);
  assert.equal((await q({ surface: 'road_billboard', tier: 'major', units: 1, days: 7, placement: 'vip' })).json.error, 'BAD_PLACEMENT');
  for (const t of [['road_billboard', 'street'], ['road_billboard', 'mega'], ['airport_board', 'standard'], ['carpark_board', 'lot'], ['lagoon_plot', 'plot6x6'], ['shop_front', 'shop'], ['radio_spot', 'station'], ['ride_car', 'fleet']]) { const x = (await q({ surface: t[0], tier: t[1], units: 1, days: 7, placement: 'exclusive' })).json.quote; assert.equal(x.net, RATE_CARD.surfaces[t[0]].tiers[t[1]].weekly * 3, 'all tiers are eligible: ' + t.join(':')); }
  const rc = (await call(s, 'GET', '/api/ads/ratecard')).json; assert.equal(rc.placements.default, 'shared'); assert.equal(rc.placements.options.exclusive.maxDesigns.road_billboard, 4); assert.equal(rc.placements.options.shared.maxDesigns.road_billboard, 2); assert.equal(rc.surfaces.road_billboard.exclusiveMultiplier, 3);
});
test('create: default is shared with the old single creativeId; design limits are 2 shared / 4 exclusive; designs must be yours and the right shape', async () => {
  const s = makeServer(); const key = await newAdvertiser(s); const ids = await ups(s, key, 5);
  const old = await call(s, 'POST', '/api/ads/campaigns', { headers: H(key), body: { creativeId: ids[0], surface: 'road_billboard', tier: 'street', units: 1, days: 7, linkUrl: 'https://brand.example.com/promo', headline: 'Old way', testModeAck: true } });
  assert.equal(old.status, 200, JSON.stringify(old.json)); assert.equal(old.json.campaign.placement, 'shared'); assert.equal(old.json.campaign.designs.length, 1); assert.equal(old.json.campaign.designs[0].creativeId, ids[0]); assert.equal(placementOf(s, old.json.campaign.id), 'shared');
  assert.equal((await submit(s, key, ids.slice(0, 3))).json.error, 'TOO_MANY_DESIGNS'); assert.equal((await submit(s, key, ids.slice(0, 3), { placement: 'shared' })).json.error, 'TOO_MANY_DESIGNS');
  const two = await submit(s, key, ids.slice(0, 2), { tier: 'major' }); assert.equal(two.status, 200, JSON.stringify(two.json)); assert.deepEqual(two.json.campaign.designs.map(d => d.creativeId), [ids[0], ids[1]]); assert.deepEqual(two.json.campaign.designs.map(d => d.position), [0, 1]);
  assert.equal((await submit(s, key, ids, { placement: 'exclusive', tier: 'mega' })).json.error, 'TOO_MANY_DESIGNS', '5 designs is over the exclusive limit');
  const four = await submit(s, key, ids.slice(0, 4), { placement: 'exclusive', tier: 'mega' }); assert.equal(four.status, 200, JSON.stringify(four.json)); assert.equal(four.json.campaign.placement, 'exclusive'); assert.equal(four.json.campaign.placementLabel, 'Exclusive (whole board)'); assert.equal(four.json.campaign.designs.length, 4);
  assert.equal(four.json.campaign.priceNet, 200000 * 3 * 1, 'mega exclusive 1 board 7 days'); assert.equal(four.json.campaign.invoiceLines[0].placementLabel, 'Exclusive (whole board)'); assert.match(four.json.campaign.invoiceLines[0].description, /Mega board · Exclusive \(whole board\)/); assert.equal(four.json.campaign.maxDesigns, 4);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM ad_campaign_creatives WHERE campaign_id=?').get(four.json.campaign.id).n, 4);
  assert.deepEqual((await ok(s, 'GET', '/api/advertiser/campaigns', { headers: H(key) })).campaigns.find(c => c.id === four.json.campaign.id).designs.map(d => d.status), ['pending', 'pending', 'pending', 'pending']);
  assert.equal((await submit(s, key, [ids[0], ids[0]], { tier: 'street' })).json.campaign.designs.length, 1, 'a repeated id is one design');
  const other = await newAdvertiser(s, 'Other Co'); assert.equal((await submit(s, other, [ids[0]])).json.error, 'NO_CREATIVE', 'not your creative'); assert.equal((await submit(s, key, [ids[0], 999999])).json.error, 'NO_CREATIVE'); assert.equal((await submit(s, key, [])).json.error, 'NO_CREATIVE');
  const sq = await up(s, key, 9, 800, 800); assert.equal((await submit(s, key, [ids[0], sq])).json.error, 'BAD_ASPECT', 'every design is checked for shape'); assert.equal((await submit(s, key, [ids[0]], { placement: 'vip' })).json.error, 'BAD_PLACEMENT');
});
test('exclusive needs whole boards: a shared advertiser on a board blocks it; it frees when they end; shared cannot use a board an exclusive owns', async () => {
  const s = makeServer(); const k1 = await newAdvertiser(s, 'Shared Co'); const k2 = await newAdvertiser(s, 'Exclusive Co');
  // mega has 2 boards: one shared campaign (1 position on one board)
  const sh = await goLive(s, k1, 1, { tier: 'mega' }); const shBoard = slotsOf(s, sh.id)[0].slot_id;
  const ex2 = await ups(s, k2, 1, 20); const tooMany = await submit(s, k2, ex2, { tier: 'mega', placement: 'exclusive', units: 2 }); assert.equal(tooMany.json.error, 'SOLD_OUT', 'both boards cannot be whole: one has a shared advertiser'); assert.match(tooMany.json.message, /whole board/);
  const one = await submit(s, k2, ex2, { tier: 'mega', placement: 'exclusive', units: 1 }); assert.equal(one.status, 200, JSON.stringify(one.json)); const exId = one.json.campaign.id; await approve(s, exId); tickAds(s.app);
  const exBoard = slotsOf(s, exId); assert.equal(exBoard.length, 1); assert.notEqual(exBoard[0].slot_id, shBoard, 'the exclusive ad went to the board nobody shares'); assert.equal(exBoard[0].position, 0);
  assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(exId).status, 'live');
  // now every board is taken in some way: a second exclusive and a third shared on the exclusive board are refused
  assert.equal((await submit(s, k1, await ups(s, k1, 1, 30), { tier: 'mega', placement: 'exclusive' })).json.error, 'SOLD_OUT');
  // shared still fits: the first board still has 3 free positions
  const more = await goLive(s, k1, 1, { tier: 'mega' }, 40); assert.equal(slotsOf(s, more.id)[0].slot_id, shBoard, 'shared goes to the board without an exclusive owner, not onto the exclusive board');
  const both = await submit(s, k1, await ups(s, k1, 1, 50), { tier: 'mega', units: 2 }); assert.equal(both.json.error, 'SOLD_OUT', 'a shared ad cannot take one position on EACH of 2 boards when one board is wholly owned');
  // the shared campaigns end: the board can be sold exclusive for a later period (exclusive start dates must fit the free window)
  const av = (st, en, pl) => availability(s.app, 'road_billboard', 'mega', 1, st, en, s.app.defaultCityId, pl); const now = s.app.clock.now();
  assert.equal(av(now, now + 7 * DAY, 'exclusive').ok, false); assert.equal(av(now + 8 * DAY, now + 15 * DAY, 'exclusive').ok, true, 'after both existing campaigns end, a whole board is free');
  s.app.clock.advance(8 * DAY); tickAds(s.app);
  const later = await submit(s, k1, await ups(s, k1, 1, 60), { tier: 'mega', placement: 'exclusive', units: 2 }); assert.equal(later.status, 200, JSON.stringify(later.json));
});
test('exclusive on a one-board surface: shared and exclusive exclude each other for overlapping dates only', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Ride Co'); const base = { surface: 'ride_car', tier: 'fleet', units: 1, days: 7 };
  const sh = await submit(s, k, await ups(s, k, 1), base); assert.equal(sh.status, 200, JSON.stringify(sh.json));
  assert.equal((await submit(s, k, await ups(s, k, 1, 5), { ...base, placement: 'exclusive' })).json.error, 'SOLD_OUT', 'overlapping dates: the board has a shared advertiser');
  const startAt = s.app.clock.now() + 10 * DAY; const ex = await submit(s, k, await ups(s, k, 1, 7), { ...base, placement: 'exclusive', startAt }); assert.equal(ex.status, 200, JSON.stringify(ex.json), 'a window after the shared campaign ends is fine');
  assert.equal((await submit(s, k, await ups(s, k, 1, 9), { ...base, startAt: startAt + DAY })).json.error, 'SOLD_OUT', 'a shared ad cannot start inside the exclusive window');
  assert.equal((await submit(s, k, await ups(s, k, 1, 11), { ...base, placement: 'exclusive', startAt: startAt - 2 * DAY })).json.error, 'SOLD_OUT');
});
test('scheduling is judged for the campaign\'s own period: a future exclusive does not block a shared ad that runs before it', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Ride Co'); const base = { surface: 'ride_car', tier: 'fleet', units: 1, days: 7 }; const now = s.app.clock.now();
  const ex = await submit(s, k, await ups(s, k, 1), { ...base, placement: 'exclusive', startAt: now + 20 * DAY }); await approve(s, ex.json.campaign.id);
  const sh = await submit(s, k, await ups(s, k, 1, 5), base); assert.equal(sh.status, 200, JSON.stringify(sh.json)); await approve(s, sh.json.campaign.id); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(sh.json.campaign.id).status, 'scheduled', 'not "waiting for space"');
  tickAds(s.app); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(sh.json.campaign.id).status, 'live'); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(ex.json.campaign.id).status, 'scheduled');
  s.app.clock.advance(20 * DAY + 1000); tickAds(s.app); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(ex.json.campaign.id).status, 'live'); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(sh.json.campaign.id).status, 'completed');
});
test('pickFrame: campaigns take turns, and a campaign\'s designs take turns each time it comes round (one rule for server and client)', () => {
  assert.equal(pickFrame([], 3), null);
  const ex = [{ c: 7, i: 1, d: [1, 2, 3, 4] }]; assert.deepEqual([0, 1, 2, 3, 4, 5].map(k => pickFrame(ex, k).i), [1, 2, 3, 4, 1, 2], 'an exclusive board cycles its 4 designs, one per window');
  const mix = [{ c: 1, i: 10, d: [10, 11] }, { c: 2, i: 20 }, { c: 3, i: 30, d: [30, 31] }]; const seq = Array.from({ length: 12 }, (_, k) => { const f = pickFrame(mix, k); return `${f.c}:${f.i}`; });
  assert.deepEqual(seq, ['1:10', '2:20', '3:30', '1:11', '2:20', '3:31', '1:10', '2:20', '3:30', '1:11', '2:20', '3:31']);
  assert.equal(pickFrame([{ c: 5, i: 50 }], 9).i, 50, 'a single creative with no d (older snapshots) works');
  assert.equal(rotIndex('bb01', 12, 10000), 12, 'boards rotate every window');
});
test('rotation over several designs: an exclusive board shows only its advertiser, design after design; the snapshot and the server agree; no house ad while it runs', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Jolly Pot'); const { id, ids } = await goLive(s, k, 4, { placement: 'exclusive', tier: 'mega' }); const slot = slotsOf(s, id)[0].slot_id;
  assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status, 'live'); assert.deepEqual(designRows(s.app, id).map(d => d.status), ['approved', 'approved', 'approved', 'approved']);
  const live = liveOnSlot(s.app, slot, s.app.clock.now()); assert.equal(live.length, 1); assert.deepEqual(live[0].designs, ids); assert.equal(live[0].placement, 'exclusive');
  const snap = adsSnapshot(s.app, s.app.clock.now(), s.app.city.id).slots[slot]; assert.equal(snap.length, 1); assert.deepEqual(snap[0].d, ids); assert.equal(snap[0].x, 1); assert.equal(snap[0].i, ids[0]);
  const w0 = windowOf(s.app.clock.now()); const seen = []; for (let k2 = 0; k2 < 8; k2++) { const f = expectedFrame(s.app, slot, w0 + k2); assert.equal(f.campaign, id); seen.push(f.creative); assert.deepEqual(pickFrame(snap, w0 + k2).i, f.creative, 'client rule = server rule'); assert.equal(expectedCampaign(s.app, slot, w0 + k2), id); }
  assert.equal(new Set(seen).size, 4); assert.deepEqual(seen.slice(0, 4), seen.slice(4), 'the 4 designs repeat in the same order'); for (let q = 0; q < 4; q++) assert.equal(seen[(q + 1) % 4], pickFrame(snap, w0 + q + 1).i);
  // the other boards of the tier stay free (house ad), and the exclusive board never goes empty while the campaign runs
  s.app.clock.advance(7 * DAY - 1000); tickAds(s.app); assert.equal(liveOnSlot(s.app, slot, s.app.clock.now()).length, 1); s.app.clock.advance(2000); tickAds(s.app); assert.equal(liveOnSlot(s.app, slot, s.app.clock.now()).length, 0);
});
test('rotation: a shared campaign with 2 designs alternates them on its turns, next to other brands on the same board (different brands on one shared board)', async () => {
  const s = makeServer(); const kA = await newAdvertiser(s, 'Brand A'), kB = await newAdvertiser(s, 'Brand B'), kC = await newAdvertiser(s, 'Brand C'); const o = { surface: 'ride_car', tier: 'fleet' }; // one board, so all three share it
  const A = await goLive(s, kA, 2, o, 1), B = await goLive(s, kB, 1, o, 10), C = await goLive(s, kC, 2, o, 20); const slot = slotsOf(s, A.id)[0].slot_id; assert.equal(slot, slotsOf(s, B.id)[0].slot_id);
  const live = liveOnSlot(s.app, slot, s.app.clock.now()); assert.deepEqual(live.map(l => l.campaign), [A.id, B.id, C.id]); assert.ok(live.every(l => l.placement === 'shared')); assert.equal(placementOf(s, A.id), 'shared');
  const w0 = Math.ceil(windowOf(s.app.clock.now()) / 6) * 6; const seq = Array.from({ length: 12 }, (_, q) => { const f = expectedFrame(s.app, slot, w0 + q); return [f.campaign, f.creative]; });
  const one = [[A.id, A.ids[0]], [B.id, B.ids[0]], [C.id, C.ids[0]], [A.id, A.ids[1]], [B.id, B.ids[0]], [C.id, C.ids[1]]]; assert.deepEqual(seq, [...one, ...one], 'A: design 1 then 2; B: its one design; C: design 1 then 2');
  const snap = s.app.clock.now(); const sl = adsSnapshot(s.app, snap, s.app.city.id); void sl; // the ride slot is served with the ride, not the board list
});
test('impressions per design: valid evidence credits the design that was on; a wrong design is filtered; no design named = the scheduled one; campaign totals still add up', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Jolly Pot'); const { id, ids } = await goLive(s, k, 3, { placement: 'exclusive', tier: 'mega' }); const slot = slotsOf(s, id)[0].slot_id; const sl = s.app.city.billboardById[slot];
  const u = mkUser(s); at(s, u, sl.x, sl.z + 25 * (sl.nz || 1)); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const ev = (over = {}) => { const win = windowOf(s.app.clock.now()); return { slot, win, c: id, pct: 80, ms: 2500, vis: true, ...over }; };
  const on = () => expectedFrame(s.app, slot, windowOf(s.app.clock.now())).creative; const d1 = on();
  const r1 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [ev({ i: d1 })] } }); assert.equal(r1.adResult.accepted, 1);
  s.app.clock.advance(10000); const d2 = on(); assert.notEqual(d2, d1); const wrong = ids.find(x => x !== d2 && x !== d1) ?? d1;
  const r2 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [ev({ i: wrong })] } }); assert.equal(r2.adResult.accepted, 0); assert.equal(r2.adResult.filtered.design_not_scheduled_in_window, 1);
  const r3 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [ev()] } }); assert.equal(r3.adResult.accepted, 1, 'an older client sends no design: the scheduled one is credited');
  const rows = Object.fromEntries(designRows(s.app, id).map(d => [d.creative_id, d])); assert.deepEqual([rows[d1].gross, rows[d1].valid], [1, 1]); assert.deepEqual([rows[d2].gross, rows[d2].valid], [1, 1]); assert.equal(rows[wrong].gross, 1 + (wrong === d1 ? 1 : 0)); assert.equal(rows[wrong].valid, wrong === d1 ? 1 : 0);
  const st = campaignStats(s.app, id); assert.equal(st.grossImpressions, 3); assert.equal(st.validImpressions, 2); assert.equal(designRows(s.app, id).reduce((n, d) => n + d.valid, 0), st.validImpressions, 'valid per design adds up to the campaign');
  const adv = (await ok(s, 'GET', '/api/advertiser/campaigns', { headers: H(k) })).campaigns[0]; assert.equal(adv.designs.find(d => d.creativeId === d1).validImpressions, 1); assert.equal(adv.stats.validImpressions, 2);
  const adm = (await ok(s, 'GET', '/api/admin/queue?status=live', { admin: true })).rows[0]; assert.equal(adm.placement, 'exclusive'); assert.equal(adm.designs.length, 3);
});
test('moderation per design: reject one design of a live campaign and it leaves the rotation at once; the others keep running; its picture goes private', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Jolly Pot'); const { id, ids } = await goLive(s, k, 4, { placement: 'exclusive', tier: 'mega' }); const slot = slotsOf(s, id)[0].slot_id; await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
  try {
    assert.equal((await fetch(`${base}/media/creative/${ids[1]}`)).status, 200, 'public while approved and live');
    assert.equal((await call(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[1]}/decision`, { body: { decision: 'reject', reason: 'x' } })).status, 401, 'admin only');
    assert.equal((await call(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[1]}/decision`, { admin: true, body: { decision: 'reject' } })).json.error, 'REASON_REQUIRED');
    const r = await ok(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[1]}/decision`, { admin: true, body: { decision: 'reject', reason: 'Unclear logo' } }); assert.deepEqual([r.design, r.campaign], ['rejected', 'live']);
    assert.deepEqual(liveOnSlot(s.app, slot, s.app.clock.now())[0].designs, [ids[0], ids[2], ids[3]]); const w0 = windowOf(s.app.clock.now()); const seen = new Set(Array.from({ length: 6 }, (_, q) => expectedFrame(s.app, slot, w0 + q).creative)); assert.equal(seen.has(ids[1]), false); assert.equal(seen.size, 3);
    assert.equal((await fetch(`${base}/media/creative/${ids[1]}`)).status, 404, 'the rejected design is no longer public'); assert.equal((await fetch(`${base}/media/creative/${ids[0]}`)).status, 200);
    assert.equal((await fetch(`${base}/media/creative/${ids[1]}?key=${k}`)).status, 200, 'the advertiser can still see it, with the reason');
    const adv = (await ok(s, 'GET', '/api/advertiser/campaigns', { headers: H(k) })).campaigns[0]; const d = adv.designs.find(x => x.creativeId === ids[1]); assert.equal(d.status, 'rejected'); assert.equal(d.rejectReason, 'Unclear logo'); assert.equal(adv.status, 'live');
    assert.equal(adsSnapshot(s.app, s.app.clock.now(), s.app.city.id).slots[slot][0].d.includes(ids[1]), false);
    const back = await ok(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[1]}/decision`, { admin: true, body: { decision: 'approve' } }); assert.equal(back.design, 'approved'); assert.equal(liveOnSlot(s.app, slot, s.app.clock.now())[0].designs.length, 4);
    for (const x of [ids[0], ids[2]]) await ok(s, 'POST', `/api/admin/campaigns/${id}/designs/${x}/decision`, { admin: true, body: { decision: 'reject', reason: 'no' } });
    const last = await ok(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[1]}/decision`, { admin: true, body: { decision: 'reject', reason: 'no' } }); assert.equal(last.campaign, 'live', 'one design (ids[3]) is still approved');
    const end = await ok(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[3]}/decision`, { admin: true, body: { decision: 'reject', reason: 'no' } }); assert.equal(end.campaign, 'completed', 'rejecting the last design takes a live campaign down'); assert.equal(liveOnSlot(s.app, slot, s.app.clock.now()).length, 0);
    assert.equal((await call(s, 'POST', `/api/admin/campaigns/${id}/designs/${ids[3]}/decision`, { admin: true, body: { decision: 'approve' } })).json.error, 'BAD_TRANSITION'); assert.equal((await call(s, 'POST', `/api/admin/campaigns/${id}/designs/424242/decision`, { admin: true, body: { decision: 'reject', reason: 'x' } })).json.error, 'NO_DESIGN');
  } finally { await s.close(); }
});
test('moderation per design before it runs: reject some designs while approving the campaign; rejecting every design rejects the campaign; reject-all on decision', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Jolly Pot'); const mk = async (n, over = {}) => { const ids = await ups(s, k, n, 1 + Math.floor(Math.random() * 90)); const r = await submit(s, k, ids, { placement: 'exclusive', tier: 'mega', ...over }); assert.equal(r.status, 200, JSON.stringify(r.json)); return { id: r.json.campaign.id, ids }; };
  const a = await mk(3); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(a.id).status, 'human_review');
  assert.equal((await call(s, 'POST', `/api/admin/campaigns/${a.id}/decision`, { admin: true, body: { decision: 'approve', rejectDesigns: [a.ids[0]] } })).json.error, 'REASON_REQUIRED');
  assert.equal((await call(s, 'POST', `/api/admin/campaigns/${a.id}/decision`, { admin: true, body: { decision: 'approve', reason: 'x', rejectDesigns: a.ids } })).json.error, 'NO_DESIGN_LEFT'); assert.equal((await call(s, 'POST', `/api/admin/campaigns/${a.id}/decision`, { admin: true, body: { decision: 'approve', reason: 'x', rejectDesigns: [12345] } })).json.error, 'NO_DESIGN');
  const st = await ok(s, 'POST', `/api/admin/campaigns/${a.id}/decision`, { admin: true, body: { decision: 'approve', reason: 'Design 1 has too much text', rejectDesigns: [a.ids[0]] } }); assert.equal(st.status, 'scheduled'); tickAds(s.app);
  assert.deepEqual(designRows(s.app, a.id).map(d => d.status), ['rejected', 'approved', 'approved']); assert.deepEqual(liveOnSlot(s.app, slotsOf(s, a.id)[0].slot_id, s.app.clock.now())[0].designs, [a.ids[1], a.ids[2]]);
  const b = await mk(2, { tier: 'street', placement: 'shared' }); await ok(s, 'POST', `/api/admin/campaigns/${b.id}/designs/${b.ids[0]}/decision`, { admin: true, body: { decision: 'reject', reason: 'a' } });
  const rej = await ok(s, 'POST', `/api/admin/campaigns/${b.id}/designs/${b.ids[1]}/decision`, { admin: true, body: { decision: 'reject', reason: 'b' } }); assert.equal(rej.campaign, 'rejected', 'last design rejected before it ran: the campaign is rejected (and a paid one refunded)');
  const c = await mk(2, { tier: 'street', placement: 'shared' }); await ok(s, 'POST', `/api/admin/campaigns/${c.id}/decision`, { admin: true, body: { decision: 'reject', reason: 'Not allowed' } }); assert.deepEqual(designRows(s.app, c.id).map(d => d.status), ['rejected', 'rejected']);
});
test('player reports can name one design: removing it takes that design out and keeps the rest; a campaign-level report still takes the whole campaign down', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Jolly Pot'); const { id, ids } = await goLive(s, k, 3, { placement: 'exclusive', tier: 'mega' }); const slot = slotsOf(s, id)[0].slot_id; const u1 = mkUser(s), u2 = mkUser(s);
  assert.equal((await call(s, 'POST', '/api/report', { uid: u1, body: { kind: 'ad_creative', target: `${id}:99999`, reason: 'scam_spam' } })).status === 200, false, 'a design that is not part of the campaign cannot be reported');
  await ok(s, 'POST', '/api/report', { uid: u1, body: { kind: 'ad_creative', target: `${id}:${ids[2]}`, reason: 'scam_spam' } });
  const rep = (await ok(s, 'GET', '/api/admin/reports', { admin: true })).rows.find(r => r.kind === 'ad_creative'); assert.equal(rep.target, `${id}:${ids[2]}`); assert.match(rep.snapshot, new RegExp(`design #${ids[2]}`));
  await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'ad_creative', target: rep.target, action: 'remove', note: 'misleading' } });
  assert.deepEqual(liveOnSlot(s.app, slot, s.app.clock.now())[0].designs, [ids[0], ids[1]]); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status, 'live');
  await ok(s, 'POST', '/api/report', { uid: u2, body: { kind: 'ad_creative', target: String(id), reason: 'scam_spam' } }); await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'ad_creative', target: String(id), action: 'remove', note: 'whole ad' } });
  assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status, 'completed');
});
test('ride livery and radio spots rotate designs too, and ride impressions are credited per design', async () => {
  const s = makeServer(); const k = await newAdvertiser(s, 'Oya Brand'); const { id, ids } = await goLive(s, k, 2, { surface: 'ride_car', tier: 'fleet' });
  const { rideSponsor, rideSponsorShown, rideSponsorBoarded } = await import('../server/core/ads.js'); const cityId = s.app.city.id; const sp0 = rideSponsor(s.app, cityId, 0), sp1 = rideSponsor(s.app, cityId, 1);
  assert.deepEqual([sp0.c, sp0.i, sp1.i], [id, ids[0], ids[1]], 'the first ride gets design 1, the next ride design 2'); assert.equal(rideSponsor(s.app, cityId, 2).i, ids[0]);
  const u = mkUser(s); rideSponsorShown(s.app, sp0); assert.equal(rideSponsorBoarded(s.app, u, 1, sp0, cityId), true);
  const rows = Object.fromEntries(designRows(s.app, id).map(d => [d.creative_id, d])); assert.deepEqual([rows[ids[0]].gross, rows[ids[0]].valid, rows[ids[1]].gross], [1, 1, 0]);
  const rk = await newAdvertiser(s, 'Radio Co'); const rids = [await up(s, rk, 31, 768, 768), await up(s, rk, 32, 768, 768)]; const rr = await submit(s, rk, rids, { surface: 'radio_spot', tier: 'station', placement: 'exclusive' }); assert.equal(rr.status, 200, JSON.stringify(rr.json)); await approve(s, rr.json.campaign.id); tickAds(s.app); const r = { id: rr.json.campaign.id, ids: rids };
  const slot = slotsOf(s, r.id)[0].slot_id; const every = Math.round(180000 / 10000); const w0 = Math.ceil(windowOf(s.app.clock.now()) / (2 * every)) * (2 * every); const seq = [0, 1, 2, 3].map(q => expectedFrame(s.app, slot, w0 + q * every).creative);
  assert.deepEqual(seq, [r.ids[0], r.ids[1], r.ids[0], r.ids[1]], 'radio: one design per SPOT, in turn');
});
test('migration: placement defaults to shared, old campaigns get one design row each, and re-running changes nothing (SQLite)', () => {
  const db = new Database(':memory:'); db.exec(SCHEMA); migrate(db, { later: false }); assert.equal(db.prepare("SELECT COUNT(*) n FROM pragma_table_info('ad_campaigns') WHERE name='placement'").get().n, 0, 'the frozen baseline has no placement column');
  const now = Date.now(); db.prepare("INSERT INTO advertisers(id,email,brand_name,access_key,created_at) VALUES (1,'a@b.co','Old Brand','k1k1k1k1k1k1k1k1k1k1',?)").run(now);
  for (const c of [1, 2, 3, 4]) db.prepare("INSERT INTO ad_creatives(id,advertiser_id,mime,bytes,width,height,sha256,data,created_at) VALUES (?,1,'image/png',1,1024,512,?,x'00',?)").run(c, 'sha' + c, now);
  const camp = (id, cr, st) => db.prepare("INSERT INTO ad_campaigns(id,advertiser_id,creative_id,surface,tier,units,days,link_url,price_net,price_vat,price_total,status,created_at,updated_at) VALUES (?,1,?,'road_billboard','street',1,7,'https://x.example.com',1,1,1,?,?,?)").run(id, cr, st, now, now);
  camp(1, 1, 'live'); camp(2, 2, 'rejected'); camp(3, 3, 'human_review'); camp(4, 4, 'completed');
  migrate(db); const st = () => db.prepare('SELECT campaign_id, creative_id, position, status FROM ad_campaign_creatives ORDER BY campaign_id').all();
  assert.deepEqual(db.prepare('SELECT placement FROM ad_campaigns ORDER BY id').all().map(r => r.placement), ['shared', 'shared', 'shared', 'shared']);
  assert.deepEqual(st().map(r => [r.campaign_id, r.creative_id, r.position, r.status]), [[1, 1, 0, 'approved'], [2, 2, 0, 'rejected'], [3, 3, 0, 'pending'], [4, 4, 0, 'approved']]);
  migrate(db); migrate(db); assert.equal(st().length, 4, 'idempotent'); db.exec(AD_PLACEMENT_BACKFILL); assert.equal(st().length, 4);
});
test('the Postgres migration 0016 mirrors the SQLite schema (column, table, index, backfill)', () => {
  const sql = fs.readFileSync(new URL('../server/migrations/pg/0016_ad_placement.sql', import.meta.url), 'utf8');
  assert.match(sql, /ALTER TABLE ad_campaigns ADD COLUMN IF NOT EXISTS placement TEXT NOT NULL DEFAULT 'shared'/); assert.match(sql, /CREATE TABLE IF NOT EXISTS ad_campaign_creatives/); assert.match(sql, /ON CONFLICT \(campaign_id, creative_id\) DO NOTHING/); assert.doesNotMatch(sql, /\bINTEGER\b|AUTOINCREMENT|INSERT OR IGNORE/);
  const lite = new Database(':memory:'); lite.exec(SCHEMA); migrate(lite); const cols = lite.prepare("SELECT name FROM pragma_table_info('ad_campaign_creatives')").all().map(r => r.name);
  const m = /CREATE TABLE IF NOT EXISTS ad_campaign_creatives \(([\s\S]*?)\);/.exec(sql); for (const c of cols) assert.match(m[1], new RegExp(`(^|[ (,])${c} `), c);
});
test('Postgres: 0016 upgrades a database that already has campaigns (runs only with NA_TEST_PG_URL / npm run test:pg)', { skip: !PG_URL }, async () => {
  const { openManaged, dropSchema, MIGRATIONS_DIR, listMigrations, migrate: pgMigrate } = await import('../server/lib/pg-migrate.js'); const { openPostgres } = await import('../server/lib/pg-sync.js');
  const schema = `t_ap_${Math.random().toString(36).slice(2, 8)}`; const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pgm-'));
  try {
    for (const m of listMigrations()) if (m.version <= 15) fs.writeFileSync(path.join(tmp, m.file), m.sql);
    const boot = openPostgres({ url: PG_URL, singleInstance: false }); boot.exec(`CREATE SCHEMA IF NOT EXISTS ${schema}`); boot.close(); const db = openPostgres({ url: PG_URL, schema, singleInstance: true });
    try {
      pgMigrate(db, { dir: tmp }); const now = Date.now();
      db.prepare("INSERT INTO advertisers(email,brand_name,access_key,created_at) VALUES ('a@b.co','Old','k1k1k1k1k1k1k1k1k1k1',?)").run(now); const adv = db.prepare('SELECT id FROM advertisers').get().id;
      db.prepare("INSERT INTO ad_creatives(advertiser_id,mime,bytes,width,height,sha256,data,created_at) VALUES (?,'image/png',1,1024,512,'s1',?,?)").run(adv, Buffer.from([0]), now); const cr = db.prepare('SELECT id FROM ad_creatives').get().id;
      db.prepare("INSERT INTO ad_campaigns(advertiser_id,creative_id,surface,tier,units,days,link_url,price_net,price_vat,price_total,status,created_at,updated_at) VALUES (?,?,'road_billboard','street',1,7,'https://x.example.com',1,1,1,'live',?,?)").run(adv, cr, now, now);
      const r = pgMigrate(db, {}); assert.deepEqual(r.applied, [16]); assert.equal(db.prepare('SELECT placement FROM ad_campaigns').get().placement, 'shared'); const row = db.prepare('SELECT creative_id, status, position FROM ad_campaign_creatives').get(); assert.deepEqual([Number(row.creative_id), row.status, Number(row.position)], [Number(cr), 'approved', 0]);
      assert.deepEqual(pgMigrate(db, {}).applied, [], 'running again changes nothing');
    } finally { db.close(); }
  } finally { dropSchema({ url: PG_URL, schema }); fs.rmSync(tmp, { recursive: true, force: true }); }
});
test('advertiser page: two placement cards (Shared preselected), multi-design strip, and the form sends placement and creativeIds', async () => {
  const html = fs.readFileSync('public/advertise.html', 'utf8'); const js = fs.readFileSync('public/js/advertise.js', 'utf8'); const css = fs.readFileSync('public/pages.css', 'utf8');
  assert.match(html, /<input type="radio" name="placement" value="shared" checked>/); assert.match(html, /<input type="radio" name="placement" value="exclusive">/); assert.equal((html.match(/name="placement"/g) || []).length, 2); assert.match(html, /Shared rotating/); assert.match(html, /Exclusive/);
  for (const id of ['pcShared', 'pcExclusive', 'ppShared', 'ppExclusive', 'pmShared', 'pmExclusive', 'designs', 'designList', 'addDesign', 'rotNote', 'designCount', 'drop', 'file', 'replaceBtn', 'removeBtn', 'mock']) assert.match(html, new RegExp(`id="${id}"`), id);
  assert.match(html, /<legend>Placement<\/legend>/); assert.ok(html.indexOf('id="placement"') < html.indexOf('id="quote"') && html.indexOf('id="s2"') < html.indexOf('id="placement"') && html.indexOf('id="placement"') < html.indexOf('id="s3"'), 'the selector is in step 2');
  assert.match(js, /placement: placement\(\)/); assert.match(js, /creativeIds: designs\.map/); assert.match(js, /'\/api\/ads\/upload'/, 'the upload call is unchanged'); assert.match(js, /URL\.createObjectURL/); assert.ok(!/innerHTML = `[^`]*\$\{\$\('#headline'\)/.test(js)); assert.match(css, /\.pcard\b/); assert.match(css, /\.ditem\b/);
  const adv = fs.readFileSync('public/js/advertiser.js', 'utf8'), adm = fs.readFileSync('public/js/admin.js', 'utf8'); for (const t of [adv, adm]) { assert.match(t, /placementLabel/); assert.match(t, /designs/); } assert.match(adm, /data-design=/); assert.match(adm, /\/designs\/\$\{/);
});
test('demo creatives workflow: one exclusive board (one brand, up to 4 designs) and one shared board (different brands) from a creative set', async () => {
  const { seedPlacementDemo } = await import('../server/core/demo-ads.js'); const s = makeServer(); const set = (brand, n, seed) => ({ brand, headline: brand + ' promo', linkUrl: 'https://example.com/' + brand.toLowerCase().replace(/\W/g, ''), images: Array.from({ length: n }, (_, i) => mkPng(seed + i)) });
  const r = seedPlacementDemo(s.app, { exclusive: set('Jolly Pot', 6, 1), shared: [set('Yarn Mobile', 1, 20), set('Korope Rides', 1, 30), set('Adire Lane', 2, 40)] }); // 6 images offered: only the first 4 are used
  assert.equal(r.tier, 'mega'); assert.equal(r.exclusive.designs, 4); assert.ok(r.exclusive.slot); assert.equal(r.shared.length, 3); assert.ok(r.shared.every(x => x.slot && x.slot === r.shared[0].slot), 'all shared brands are on ONE board'); assert.notEqual(r.exclusive.slot, r.shared[0].slot, 'a different board from the exclusive one');
  assert.deepEqual(r.shared.map(x => x.designs), [1, 1, 2]); const now = s.app.clock.now(); const ex = liveOnSlot(s.app, r.exclusive.slot, now); assert.equal(ex.length, 1); assert.equal(ex[0].designs.length, 4); assert.equal(ex[0].brand, 'Jolly Pot'); assert.equal(ex[0].placement, 'exclusive');
  const sh = liveOnSlot(s.app, r.shared[0].slot, now); assert.deepEqual(sh.map(x => x.brand), ['Yarn Mobile', 'Korope Rides', 'Adire Lane']); assert.ok(sh.every(x => x.placement === 'shared'));
  const snap = adsSnapshot(s.app, now, s.app.city.id).slots; assert.equal(snap[r.exclusive.slot][0].x, 1); assert.equal(snap[r.shared[0].slot].length, 3);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ad_campaigns WHERE is_demo=1").get().n, 4); assert.throws(() => seedPlacementDemo(s.app, { tier: 'bogus', exclusive: set('X', 1, 1), shared: [] }), /unknown surface\/tier/);
});
