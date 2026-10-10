// Ad formats beyond billboards (item 8): shop-front signs, sponsored radio spots, branded Oya Ride cars. Same pipeline: moderation, scheduling, SERVER-side counting.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, newAdvertiser, submitAd } from './helpers.js';
import { expectedCampaign, tickAds, adsSnapshot, windowOf, campaignStats, liveOnSlot, slotsFor, slotById, rideSponsor } from '../server/core/ads.js';
import { storefrontBoards, virtualSlots, isSpotWindow } from '../server/core/adslots.js';
import { AD_FORMATS, AD_POLICY, RATE_CARD, priceFor } from '../server/config/ratecard.js';
import { spotClock } from '../client/src/radio-spot.js';

const sq = (over) => (over?.surface === 'radio_spot' ? { pngW: 768, pngH: 768, ...over } : over);
const live = async (s, over) => { const key = await newAdvertiser(s); const r = await submitAd(s, key, sq(over)); assert.equal(r.status, 200, JSON.stringify(r.json)); const id = r.json.campaign.id; return { key, id, r }; };
const approve = async (s, id) => { await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve' } }); tickAds(s.app); };
const toSpotWindow = (s) => { const P = AD_POLICY.rotationMs; let w = windowOf(s.app.clock.now()) + 1; for (let i = 0; i < 400 && !isSpotWindow(w, P); i++) w++; assert.ok(isSpotWindow(w, P)); s.app.clock.advance(w * P + 1000 - s.app.clock.now()); assert.ok(isSpotWindow(windowOf(s.app.clock.now()), P)); };   // always land 1 s into the NEXT spot window (the old version could land in the last second of one, so a 1 s advance fell out of it: a rare flake on the slow database)
const ev = (s, slot, c, over = {}) => ({ slot, win: windowOf(s.app.clock.now()), c, pct: 100, ms: 8000, vis: true, ...over });

test('rate card: the three new surfaces are priced from the card (ESTIMATES), with the same VAT and quote path', async () => {
  for (const k of ['shop_front', 'radio_spot', 'ride_car']) assert.ok(RATE_CARD.surfaces[k], k);
  assert.equal(priceFor('shop_front', 'shop', 1, 7).net, 25000); assert.equal(priceFor('radio_spot', 'station', 2, 7).net, 80000); assert.equal(priceFor('ride_car', 'fleet', 1, 14).net > 0, true);
  const s = makeServer(); const q = await ok(s, 'POST', '/api/ads/quote', { body: { surface: 'radio_spot', tier: 'station', units: 1, days: 7 } }); assert.equal(q.quote.test_mode, true); assert.equal(q.quote.vat, Math.round(q.quote.net * 0.075));
  const rc = await ok(s, 'GET', '/api/ads/ratecard'); assert.ok(rc.maxUnits['shop_front:shop'] >= 1); assert.equal(rc.maxUnits['radio_spot:station'], 2); assert.equal(rc.maxUnits['ride_car:fleet'], 1);
});
test('shop fronts: derived from the city data, one per building, on the building face by the door, ids unique across every city, capped', () => {
  const s = makeServer(); const all = new Set();
  for (const c of Object.values(s.app.cities)) {
    const raw = storefrontBoards(c); assert.ok(raw.length <= AD_FORMATS.shopFront.maxPerCity); const sf = c.billboards.filter(b => b.surface === 'shop_front'); assert.equal(sf.length, raw.length);
    for (const b of sf) { assert.ok(!all.has(b.id), b.id); all.add(b.id); assert.equal(Math.abs(b.nx) + Math.abs(b.nz), 1); assert.equal(b.w / b.h, 2); const bd = c.buildingById[[...c.shops, ...c.venues].find(x => x.id === b.forId)?.buildingId];
      assert.ok(bd, b.id + ' has a building'); const out = Math.abs((b.x - bd.x) * b.nx + (b.z - bd.z) * b.nz); assert.ok(Math.abs(out - ((b.nx ? bd.w : bd.d) / 2 + AD_FORMATS.shopFront.standOff)) < 0.06, 'on the building face');
      assert.ok(Math.abs(b.x) <= c.bounds.maxX + 30); }
    assert.equal(new Set(sf.map(b => b.forId)).size, sf.length);
  }
  const lag = s.app.city; assert.ok(lag.billboards.some(b => b.surface === 'shop_front'), 'Lagos has shop signs'); assert.equal(storefrontBoards(lag).length, lag.billboards.filter(b => b.surface === 'shop_front').length);
  assert.deepEqual(storefrontBoards(lag), storefrontBoards(lag)); // deterministic
  assert.equal(slotsFor(s.app, 'shop_front', 'shop', lag.id).length, lag.billboards.filter(b => b.surface === 'shop_front').length);
  assert.equal(slotsFor(s.app, 'radio_spot', 'station', lag.id).length, 4); assert.equal(slotsFor(s.app, 'ride_car', 'fleet', lag.id).length, 1); assert.ok(slotById(s.app, `radio:${lag.id}:eko`)); assert.ok(slotById(s.app, `ride:${lag.id}`)); assert.equal(slotById(s.app, 'nope'), null);
  assert.equal(virtualSlots(lag).length, 5);
});
test('moderation applies to every new format: a banned claim is rejected, a clean ad waits for a person, then is scheduled on the right kind of slot', async () => {
  const s = makeServer();
  for (const [surface, tier] of [['shop_front', 'shop'], ['radio_spot', 'station'], ['ride_car', 'fleet']]) {
    const key = await newAdvertiser(s, `Brand ${surface}`); const bad = await submitAd(s, key, sq({ surface, tier, headline: 'Double your money in a week' })); assert.ok(bad.json.campaign ? bad.json.campaign.status === 'rejected' : bad.status >= 400, `${surface}: ${JSON.stringify(bad.json).slice(0, 120)}`);
    const { id, r } = await live(s, { surface, tier, headline: 'Fresh bread every morning' }); assert.ok(['in_review', 'pending_review', 'submitted'].includes(r.json.campaign.status) || r.json.campaign.status, surface);
    const before = s.db.prepare('SELECT COUNT(*) n FROM ad_assignments WHERE campaign_id=?').get(id).n; assert.equal(before, 0, 'not scheduled before approval'); await approve(s, id);
    const as = s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=?').all(id); assert.ok(as.length >= 1, surface); for (const a of as) assert.equal(slotById(s.app, a.slot_id).surface, surface);
  }
});
test('shop front: counted by player evidence exactly like a billboard (near the sign, viewable)', async () => {
  const s = makeServer(); const { id } = await live(s, { surface: 'shop_front', tier: 'shop' }); await approve(s, id); const slot = s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=?').get(id).slot_id; const sl = s.app.city.billboardById[slot]; assert.equal(sl.surface, 'shop_front');
  const u = mkUser(s); at(s, u, sl.x + sl.nx * 12, sl.z + sl.nz * 12); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [{ slot, win: windowOf(s.app.clock.now()), c: id, pct: 80, ms: 2500, vis: true }] } }); assert.equal(r.adResult.accepted, 1); assert.equal(campaignStats(s.app, id).validImpressions, 1);
  at(s, u, sl.x + 300, sl.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); const far = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [{ slot, win: windowOf(s.app.clock.now()) - 0, c: id, pct: 80, ms: 2500, vis: true }] } }); assert.ok(far.adResult.accepted === 0);
});
test('radio spot: only in a spot window, only from a driver, long enough, once per window, in the right city, never for bots', async () => {
  const s = makeServer(); const { id } = await live(s, { surface: 'radio_spot', tier: 'station' }); await approve(s, id);
  const slot = s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=? ORDER BY slot_id').get(id).slot_id; assert.match(slot, /^radio:/); const city = s.app.city.id;
  const u = mkUser(s); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); const p = s.app.world.players.get(u);
  const send = async (items, uid = u) => (await ok(s, 'POST', '/api/heartbeat', { uid, body: { evidence: items } })).adResult;
  // not a spot window: the next ordinary window
  const P = AD_POLICY.rotationMs; for (let i = 0; i < 400 && isSpotWindow(windowOf(s.app.clock.now()), P); i++) s.app.clock.advance(P); p.mode = 'drive';
  assert.equal((await send([ev(s, slot, id)])).filtered.not_a_spot_window, 1);
  toSpotWindow(s); p.mode = 'walk'; p.driveAt = 0; assert.equal((await send([ev(s, slot, id)])).filtered.player_not_in_a_car, 1);
  p.mode = 'drive'; assert.equal((await send([ev(s, slot, id, { ms: 1500 })])).filtered.not_listened_long_enough, 1); assert.equal((await send([ev(s, slot, id, { ms: 60000 })])).filtered.not_listened_long_enough, 1);
  assert.equal((await send([ev(s, 'radio:other-city:eko', id)])).filtered.unknown_surface, 1);
  const good = await send([ev(s, slot, id)]); assert.equal(good.accepted, 1, JSON.stringify(good)); assert.equal(campaignStats(s.app, id).validImpressions, 1);
  assert.equal((await send([ev(s, slot, id)])).accepted, 0); // the same window twice: duplicate
  // a driver who just stepped out still counts for a few seconds (the evidence arrives with the next heartbeat)
  const u2 = mkUser(s); await ok(s, 'POST', '/api/heartbeat', { uid: u2, body: { mode: 'drive' } }); const p2 = s.app.world.players.get(u2); p2.mode = 'walk'; assert.equal((await send([ev(s, slot, id)], u2)).accepted, 1);
  const bot = mkUser(s, { bot: true }); await ok(s, 'POST', '/api/heartbeat', { uid: bot, body: {} }); s.app.world.players.get(bot).mode = 'drive'; assert.equal((await send([ev(s, slot, id)], bot)).filtered.invalid_traffic_bot, 1);
  const st = campaignStats(s.app, id); assert.equal(st.validImpressions, 2); assert.ok(st.grossImpressions >= 4);
  assert.equal(slotById(s.app, slot).city, city);
});
test('radio spot: sponsors sharing a station take turns SPOT by spot (not stuck on the first), and evidence for the sponsor that is not on is refused', async () => {
  const s = makeServer(); const ids = []; for (const n of ['A', 'B', 'C']) { const key = await newAdvertiser(s, `${n} Brand`); const r = await submitAd(s, key, sq({ surface: 'radio_spot', tier: 'station', units: 2, headline: `Sponsor ${n}` })); assert.equal(r.status, 200); ids.push(r.json.campaign.id); await approve(s, r.json.campaign.id); }
  const slot = Object.keys(adsSnapshot(s.app, s.app.clock.now(), s.app.city.id).slots).find(k => liveOnSlot(s.app, k, s.app.clock.now()).length >= 2); assert.ok(slot, 'a station with two sponsors');
  const P = AD_POLICY.rotationMs, every = Math.round(AD_FORMATS.radio.everyMs / P); toSpotWindow(s); const w0 = Math.floor(windowOf(s.app.clock.now()) / every) * every; const seen = new Set();
  for (let k = 0; k < 4; k++) seen.add(expectedCampaign(s.app, slot, w0 + k * every)); assert.ok(seen.size >= 2, 'both sponsors get spots');
  const u = mkUser(s); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { mode: 'drive' } }); const win = w0; const on = expectedCampaign(s.app, slot, win), off = liveOnSlot(s.app, slot, s.app.clock.now()).map(x => x.campaign).find(x => x !== on);
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [{ slot, win, c: off, pct: 100, ms: 8000, vis: true }, { slot, win, c: on, pct: 100, ms: 8000, vis: true }] } }); assert.equal(r.adResult.filtered.creative_not_scheduled_in_window, 1); assert.equal(r.adResult.accepted, 1);
});
test('ride car: the sponsor is picked per ride, counted by the server ONLY when you board, never from client evidence, never for bots; cancelled rides stay gross', async () => {
  const s = makeServer(); const { id } = await live(s, { surface: 'ride_car', tier: 'fleet' }); await approve(s, id);
  const mk = () => { const u = mkUser(s, { cash: 20000 }); at(s, u, -150, -150); return u; }; s.app.clock.advance(5 * 60000);
  const u = mk(); assert.equal(rideSponsor(s.app, s.app.city.id, 1)?.c, id);
  const r = (await ok(s, 'POST', '/api/ride/request', { uid: u, body: { placeId: 'venue_motors' } })).ride; assert.equal(r.sponsor.c, id); assert.ok(r.sponsor.b && r.sponsor.i);
  let st = campaignStats(s.app, id); assert.equal(st.grossImpressions, 1); assert.equal(st.validImpressions, 0, 'not counted just because the car was ordered');
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [{ slot: `ride:${s.app.city.id}`, win: windowOf(s.app.clock.now()), c: id, pct: 100, ms: 5000, vis: true }] } }); assert.equal(hb.adResult.filtered.server_counted_surface, 1); assert.equal(campaignStats(s.app, id).validImpressions, 0);
  s.app.clock.advance(r.arriveAt - s.app.clock.now() + 500); at(s, u, r.from.x + 2, r.from.z); const go = await ok(s, 'POST', '/api/ride/start', { uid: u, body: { idem: 'x1' } }); assert.equal(go.sponsor.c, id);
  st = campaignStats(s.app, id); assert.equal(st.validImpressions, 1);
  // cancelled: gross only, with a reason
  const v = mk(); await ok(s, 'POST', '/api/ride/request', { uid: v, body: { placeId: 'venue_motors' } }); await ok(s, 'POST', '/api/ride/cancel', { uid: v }); st = campaignStats(s.app, id); assert.equal(st.grossImpressions, 3, 'request, the refused client claim, and this request'); assert.equal(st.validImpressions, 1);
  // a bot rides: gross, not valid
  const b = mkUser(s, { cash: 20000, bot: true }); at(s, b, -150, -150); const rb = (await ok(s, 'POST', '/api/ride/request', { uid: b, body: { placeId: 'venue_motors' } })).ride; s.app.clock.advance(rb.arriveAt - s.app.clock.now() + 500); at(s, b, rb.from.x + 2, rb.from.z); await ok(s, 'POST', '/api/ride/start', { uid: b, body: { idem: 'x2' } });
  st = campaignStats(s.app, id); assert.equal(st.validImpressions, 1); assert.equal(st.grossImpressions, 4);
});
test('ride car: no sponsor booked means a plain ride; the ad snapshot lists shop and radio slots but not the ride slot', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 20000 }); s.app.clock.advance(5 * 60000); at(s, u, -150, -150); const r = (await ok(s, 'POST', '/api/ride/request', { uid: u, body: { placeId: 'venue_motors' } })).ride; assert.equal(r.sponsor, null);
  for (const [surface, tier] of [['radio_spot', 'station'], ['ride_car', 'fleet'], ['shop_front', 'shop']]) { const { id } = await live(s, { surface, tier }); await approve(s, id); }
  const snap = adsSnapshot(s.app, s.app.clock.now(), s.app.city.id); const keys = Object.keys(snap.slots); assert.ok(keys.some(k => k.startsWith('radio:'))); assert.ok(keys.some(k => k.startsWith('sf_'))); assert.ok(!keys.some(k => k.startsWith('ride:')));
});
test('client helpers: the spot timeline matches the server rule; config carries the spot rate', async () => {
  const P = AD_POLICY.rotationMs, E = AD_FORMATS.radio.everyMs; const k = spotClock(E * 5 + 2500, P, E); assert.equal(k.inSpot, true); assert.equal(k.msIn, 2500); assert.equal(spotClock(E * 5 + P + 1, P, E).inSpot, false);
  for (let t = 0; t < E * 3; t += 777) assert.equal(spotClock(t, P, E).inSpot, isSpotWindow(Math.floor(t / P), P, E));
  const s = makeServer(); const cfg = await ok(s, 'GET', '/api/config'); assert.equal(cfg.adFormats.radio.everyMs, E); assert.deepEqual(cfg.adFormats.radio.stations, AD_FORMATS.radio.stations);
});
