import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, png, newAdvertiser, submitAd, DAY } from './helpers.js';
import { transition, tickAds, expectedCampaign, windowOf, campaignStats, liveOnSlot, inspectImage } from '../server/core/ads.js';
import { makePng } from '../server/lib/png.js';
import { priceFor } from '../server/config/ratecard.js';

async function liveAd(s, over = {}) {
  const key = await newAdvertiser(s); const r = await submitAd(s, key, over); assert.equal(r.status, 200, JSON.stringify(r.json));
  const id = r.json.campaign.id; await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve' } }); tickAds(s.app);
  return { key, id, slot: s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=?').get(id).slot_id };
}
const ev = (s, slot, id, over = {}) => { const win = windowOf(s.app.clock.now()); return { slot, win, c: id, pct: 80, ms: 2500, vis: true, ...over }; };

test('ads: price comes from the rate card (ESTIMATE) and is computed server-side', async () => {
  assert.equal(priceFor('road_billboard', 'street', 1, 7).net, 30000); assert.equal(priceFor('road_billboard', 'major', 2, 14).net, 320000);
  assert.equal(priceFor('airport_board', 'standard', 1, 7).net, 160000); assert.equal(priceFor('lagoon_plot', 'plot6x6', 1, 7).net, 10800);
  assert.equal(priceFor('road_billboard', 'street', 99, 7), null); assert.equal(priceFor('road_billboard', 'street', 1, 5), null);
  const s = makeServer(); const q = await ok(s, 'POST', '/api/ads/quote', { body: { surface: 'road_billboard', tier: 'mega', units: 1, days: 7 } });
  assert.equal(q.quote.net, 200000); assert.equal(q.quote.vat, 15000); assert.equal(q.quote.test_mode, true);
});
test('ads: image upload validates contents (magic bytes), size and dimensions', async () => {
  const s = makeServer(); const key = await newAdvertiser(s); const h = { 'x-advertiser-key': key };
  const up = (raw, ct = 'image/png') => call(s, 'POST', '/api/ads/upload', { raw, headers: { ...h, 'content-type': ct } });
  assert.equal((await up(png())).status, 200);
  assert.equal((await up(Buffer.alloc(2000, 65))).json.error, 'BAD_IMAGE');                      // text pretending to be an image
  assert.equal((await up(Buffer.concat([Buffer.from('<svg xmlns="http://www.w3.org/2000/svg">'), Buffer.alloc(900, 32)]), 'image/png')).json.error, 'BAD_IMAGE'); // SVG refused
  assert.equal((await up(png(), 'image/gif')).json.error, 'BAD_IMAGE');
  assert.equal((await up(Buffer.alloc(0))).json.error, 'NO_FILE');
  assert.equal((await up(Buffer.alloc(1_100_000, 1))).json.error, 'TOO_BIG');
  assert.equal((await up(makePng(60, 60, () => [1, 2, 3], 200))).json.error, 'BAD_DIMENSIONS');
  assert.equal((await call(s, 'POST', '/api/ads/upload', { raw: png(), headers: { 'content-type': 'image/png' } })).status, 401);
  assert.deepEqual([inspectImage(png(300, 200)).width, inspectImage(png(300, 200)).height], [300, 200]);
});
test('ads: campaign validation (https link, aspect ratio, test-mode ack, creative ownership)', async () => {
  const s = makeServer(); const key = await newAdvertiser(s);
  assert.equal((await submitAd(s, key, { linkUrl: 'http://x.com/a' })).json.error, 'BAD_LINK');
  assert.equal((await submitAd(s, key, { linkUrl: 'https://127.0.0.1/a' })).json.error, 'BAD_LINK');
  assert.equal((await submitAd(s, key, { linkUrl: 'javascript:alert(1)' })).json.error, 'BAD_LINK');
  assert.equal((await submitAd(s, key, { testModeAck: false })).json.error, 'ACK_REQUIRED');
  assert.equal((await submitAd(s, key, { surface: 'lagoon_plot', tier: 'plot6x6' })).json.error, 'BAD_ASPECT'); // 2:1 image on a square surface
  const other = await newAdvertiser(s, 'Other Co'); const up = await ok(s, 'POST', '/api/ads/upload', { raw: png(), headers: { 'x-advertiser-key': other, 'content-type': 'image/png' } });
  const r = await call(s, 'POST', '/api/ads/campaigns', { headers: { 'x-advertiser-key': key }, body: { creativeId: up.creativeId, surface: 'road_billboard', tier: 'street', units: 1, days: 7, linkUrl: 'https://a.example.com', testModeAck: true } });
  assert.equal(r.json.error, 'NO_CREATIVE');
});
test('ads: moderation state machine: submitted -> auto_checks -> human_review -> approved -> scheduled -> live -> completed', async () => {
  const s = makeServer(); const key = await newAdvertiser(s); const r = await submitAd(s, key); const id = r.json.campaign.id;
  assert.equal(r.json.campaign.status, 'human_review'); assert.equal(r.json.campaign.payment, 'test_mode_no_payment');
  assert.equal((await call(s, 'GET', '/api/admin/queue', { admin: true })).json.rows.length, 1);
  assert.equal((await call(s, 'POST', `/api/admin/campaigns/${id}/decision`, { body: { decision: 'approve' } })).status, 401); // not admin
  assert.equal((await call(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'reject' } })).json.error, 'REASON_REQUIRED');
  const a = await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve' } }); assert.equal(a.status, 'scheduled');
  tickAds(s.app); const st = () => s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status; assert.equal(st(), 'live');
  assert.throws(() => transition(s.app, id, 'approved', 'x'), /Cannot go from live to approved/);
  assert.throws(() => transition(s.app, id, 'human_review', 'x'), /Cannot go/);
  s.app.clock.advance(7 * DAY + 1000); tickAds(s.app); assert.equal(st(), 'completed');
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM ad_assignments WHERE campaign_id=?').get(id).n, 0);
  assert.throws(() => transition(s.app, id, 'live', 'x'), /Cannot go/);
  const path = s.db.prepare('SELECT to_status FROM ad_transitions WHERE campaign_id=? ORDER BY id').all(id).map(x => x.to_status);
  assert.deepEqual(path, ['submitted', 'auto_checks', 'human_review', 'approved', 'scheduled', 'live', 'completed']);
});
test('ads: rejection path is final, needs a reason, and a rejected ad never goes live', async () => {
  const s = makeServer(); const key = await newAdvertiser(s); const id = (await submitAd(s, key)).json.campaign.id;
  await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'reject', reason: 'Logo not clear' } });
  assert.throws(() => transition(s.app, id, 'approved', 'x'), /Cannot go from rejected/); tickAds(s.app);
  assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status, 'rejected');
  assert.equal(liveOnSlot(s.app, 'bb01', Date.now()).length, 0);
  const view = (await ok(s, 'GET', '/api/advertiser/campaigns', { headers: { 'x-advertiser-key': key } })).campaigns[0]; assert.equal(view.rejectReason, 'Logo not clear');
});
test('ads: auto-checks reject prohibited claims and flag restricted categories for human review', async () => {
  const s = makeServer(); const key = await newAdvertiser(s);
  const bad = await submitAd(s, key, { headline: 'Double your money with guaranteed returns' }); assert.equal(bad.json.campaign.status, 'rejected'); assert.match(bad.json.campaign.rejectReason, /prohibited/);
  const bet = await submitAd(s, key, { headline: 'Best betting odds in Lagos' }); assert.equal(bet.json.campaign.status, 'human_review');
  assert.ok(bet.json.campaign.flags.some(f => f.startsWith('restricted_category:bet'))); assert.ok(bet.json.campaign.flags.includes('needs_regulator_paperwork_check'));
});
test('ads: capacity is enforced (SOLD_OUT) and boards with fewest ads are used first', async () => {
  const s = makeServer(); const key = await newAdvertiser(s); const ids = [];
  for (let i = 0; i < 12; i++) { const r = await submitAd(s, key, { tier: 'street', units: 1 }); assert.equal(r.status, 200, JSON.stringify(r.json)); ids.push(r.json.campaign.id); } // 3 street boards x 4 positions = 12
  assert.equal((await submitAd(s, key, { tier: 'street', units: 1 })).json.error, 'SOLD_OUT');
  for (const id of ids) await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve' } });
  const per = s.db.prepare('SELECT slot_id, COUNT(*) n FROM ad_assignments GROUP BY slot_id').all(); assert.deepEqual(per.map(p => p.n).sort(), [4, 4, 4]);
});
test('ads: rotation shows each ad on the board in turn (10 s windows)', async () => {
  const s = makeServer(); const a = await liveAd(s); const key = await newAdvertiser(s, 'B2'); const r = await submitAd(s, key, { tier: 'street' });
  await ok(s, 'POST', `/api/admin/campaigns/${r.json.campaign.id}/decision`, { admin: true, body: { decision: 'approve' } }); tickAds(s.app);
  const b = s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=?').get(r.json.campaign.id).slot_id;
  assert.notEqual(a.slot, b); // least-loaded board rule: second ad goes to a different board
  assert.equal(expectedCampaign(s.app, a.slot, windowOf(s.app.clock.now())), a.id);
});
test('impressions: valid evidence is counted; gross vs filtered both tracked; duplicate per window is filtered', async () => {
  const s = makeServer(); const { id, slot } = await liveAd(s); const u = mkUser(s); const sl = s.app.city.billboardById[slot]; at(s, u, sl.x, sl.z + 25 * (sl.nz || 1));
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const e = ev(s, slot, id);
  const r1 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [e] } }); assert.equal(r1.adResult.accepted, 1);
  const r2 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [e] } }); assert.equal(r2.adResult.accepted, 0); assert.equal(r2.adResult.filtered.duplicate_in_window, 1);
  s.app.clock.advance(10000); const r3 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [ev(s, slot, id)] } }); assert.equal(r3.adResult.accepted, 1);
  const st = campaignStats(s.app, id); assert.equal(st.grossImpressions, 3); assert.equal(st.validImpressions, 2); assert.equal(st.filteredOut, 1); assert.equal(st.uniquePlayers, 1);
});
test('impressions: validation rejects far players, wrong creative, stale windows, not-viewable, unknown surfaces', async () => {
  const s = makeServer(); const { id, slot } = await liveAd(s); const u = mkUser(s); const sl = s.app.city.billboardById[slot];
  at(s, u, sl.x + 200, sl.z + 100); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const far = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [ev(s, slot, id)] } }); assert.equal(far.adResult.filtered.player_too_far_from_surface, 1);
  at(s, u, sl.x, sl.z + 20 * (sl.nz || 1)); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const now = windowOf(s.app.clock.now());
  const bad = [ev(s, slot, id, { pct: 20 }), ev(s, slot, id, { ms: 300 }), ev(s, slot, id, { vis: false }), ev(s, slot, id, { win: now - 100 }), ev(s, slot, id, { win: now + 50 }), ev(s, 'bb99', id), ev(s, 'bb0' + (slot === 'bb01' ? 2 : 1), id)];
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: bad } }); assert.equal(r.adResult.accepted, 0);
  assert.equal(r.adResult.filtered.not_viewable, 3); assert.equal(r.adResult.filtered.stale_or_future_window, 2); assert.equal(r.adResult.filtered.unknown_surface, 1); assert.equal(r.adResult.filtered.creative_not_live_on_surface, 1);
  const r2 = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [{ slot, win: 'x', c: id }, null, { slot: 5 }, { slot, win: now, c: 99999 }] } }); assert.equal(r2.adResult.accepted, 0); // malformed or unknown campaign: dropped
});
test('impressions: bots and headless browsers are counted gross but filtered out of billable numbers', async () => {
  const s = makeServer(); const { id, slot } = await liveAd(s); const sl = s.app.city.billboardById[slot];
  const bot = mkUser(s, { bot: true }); at(s, bot, sl.x, sl.z + 20 * (sl.nz || 1)); await ok(s, 'POST', '/api/heartbeat', { uid: bot, body: {} });
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: bot, body: { evidence: [ev(s, slot, id)] } }); assert.equal(r.adResult.filtered.invalid_traffic_bot, 1);
  const hu = mkUser(s); at(s, hu, sl.x, sl.z + 20 * (sl.nz || 1));
  const rh = await call(s, 'POST', '/api/heartbeat', { uid: hu, ua: 'Mozilla/5.0 HeadlessChrome/120', body: { evidence: [ev(s, slot, id)] } }); assert.equal(rh.json.adResult.filtered.invalid_traffic_headless, 1);
  const st = campaignStats(s.app, id); assert.equal(st.grossImpressions, 2); assert.equal(st.validImpressions, 0);
});
test('impressions: per-user claim rate limit stops evidence flooding', async () => {
  const s = makeServer(); const { id, slot } = await liveAd(s); const sl = s.app.city.billboardById[slot]; const u = mkUser(s); at(s, u, sl.x, sl.z + 20 * (sl.nz || 1));
  const w = windowOf(s.app.clock.now()); const items = Array.from({ length: 40 }, (_, i) => ({ slot, win: w - (i % 10), c: id, pct: 90, ms: 3000, vis: true }));
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: items } }); assert.ok((r.adResult.filtered.rate_limit || 0) >= 16); assert.ok(r.adResult.accepted <= 24);
});
test('taps: signed redirect token counts a tap, dedupes repeat taps, rejects tampering/expiry, needs proximity', async () => {
  const s = makeServer(); const { id, slot } = await liveAd(s); const sl = s.app.city.billboardById[slot]; const u = mkUser(s);
  at(s, u, 0, 0); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  assert.equal((await call(s, 'POST', '/api/ads/tap', { uid: u, body: { campaign: id, slot } })).json.error, 'TOO_FAR');
  at(s, u, sl.x, sl.z + 20 * (sl.nz || 1)); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const t = await ok(s, 'POST', '/api/ads/tap', { uid: u, body: { campaign: id, slot } }); const token = t.path.replace('/go/', '');
  const { handleTap } = await import('../server/core/ads.js');
  assert.equal(handleTap(s.app, token), 'https://brand.example.com/promo');
  handleTap(s.app, token); // second click: gross +1, valid stays 1
  let st = campaignStats(s.app, id); assert.equal(st.tapsGross, 2); assert.equal(st.tapsValid, 1);
  assert.throws(() => handleTap(s.app, token.slice(0, -2) + 'AA'), /Invalid link/);
  assert.throws(() => handleTap(s.app, Buffer.from('{"c":1,"u":1,"s":"bb01","exp":9999999999999}').toString('base64url') + '.' + token.split('.')[1]), /Invalid link/);
  s.app.clock.advance(11 * 60000); assert.throws(() => handleTap(s.app, token), /expired/);
  assert.equal((await call(s, 'POST', '/api/ads/tap', { uid: u, body: { campaign: id + 50, slot } })).json.error, 'NOT_LIVE');
  // CTR = valid taps / valid impressions
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { evidence: [ev(s, slot, id)] } }); st = campaignStats(s.app, id); assert.equal(st.validImpressions, 1); assert.equal(st.ctrPct, 100);
});
test('advertiser dashboard is private to the key; creatives are not public until scheduled', async () => {
  const s = makeServer(); const k1 = await newAdvertiser(s, 'One'); const k2 = await newAdvertiser(s, 'Two');
  const r = await submitAd(s, k1); const cid = r.json.campaign.creativeId;
  assert.equal((await call(s, 'GET', '/api/advertiser/campaigns')).status, 401);
  assert.equal((await ok(s, 'GET', '/api/advertiser/campaigns', { headers: { 'x-advertiser-key': k2 } })).campaigns.length, 0);
  assert.equal((await ok(s, 'GET', '/api/advertiser/campaigns', { headers: { 'x-advertiser-key': k1 } })).campaigns.length, 1);
  await new Promise(res => s.server.listen(0, '127.0.0.1', res)); const base = `http://127.0.0.1:${s.server.address().port}`;
  try {
    assert.equal((await fetch(`${base}/media/creative/${cid}`)).status, 404);
    assert.equal((await fetch(`${base}/media/creative/${cid}?key=${k2}`)).status, 404);
    const own = await fetch(`${base}/media/creative/${cid}?key=${k1}`); assert.equal(own.status, 200); assert.equal(own.headers.get('content-type'), 'image/png');
    await ok(s, 'POST', `/api/admin/campaigns/${r.json.campaign.id}/decision`, { admin: true, body: { decision: 'approve' } });
    assert.equal((await fetch(`${base}/media/creative/${cid}`)).status, 200);
  } finally { await s.close(); }
});
test('ads: admin takedown ends a live ad immediately and frees its slot', async () => {
  const s = makeServer(); const { id, slot } = await liveAd(s);
  assert.equal(liveOnSlot(s.app, slot, s.app.clock.now()).length, 1);
  await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'takedown', reason: 'complaint' } });
  s.app.clock.advance(1); assert.equal(liveOnSlot(s.app, slot, s.app.clock.now()).length, 0);
});
