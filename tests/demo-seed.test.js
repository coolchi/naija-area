// The demo catalogue seed (server/core/demo-ads.js seedDemoCatalog, tools/seed-demo-ads.mjs): real flow, demo-marked, idempotent, leaves real campaigns alone.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, newAdvertiser, submitAd } from './helpers.js';
import { seedDemoCatalog, DEMO_EMAIL_DOMAIN, DEMO_APPROVAL_NOTE } from '../server/core/demo-ads.js';
import { liveOnSlot, tickAds, decide } from '../server/core/ads.js';
import { makePng } from '../server/lib/png.js';

const img = (seed, w = 1024, h = 512) => makePng(w, h, (x, y) => [((x * 255) / w + seed * 53) % 255 | 0, (60 + seed * 31) % 255, (y * 255) / h | 0], 0);
const P = (brandId, surface, tier, placement, n = 1, seed = 1, w = 1024, h = 512) => ({ brandId, brand: brandId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), headline: 'Demo headline', linkUrl: 'https://example.com/demo/' + brandId, surface, tier, placement, days: 30, images: Array.from({ length: n }, (_, i) => img(seed + i, w, h)) });
const plan = () => [P('jolly-pot', 'road_billboard', 'major', 'exclusive', 4, 1), P('yarn-mobile', 'road_billboard', 'major', 'shared', 1, 10), P('paddipay', 'road_billboard', 'major', 'shared', 1, 20),
  P('jolly-pot', 'shop_front', 'shop', 'shared', 1, 30), P('yarn-mobile', 'lagoon_plot', 'plot6x6', 'shared', 1, 40, 768, 768), P('paddipay', 'radio_spot', 'station', 'shared', 1, 50, 768, 768), P('jolly-pot', 'ride_car', 'fleet', 'shared', 1, 60)];

test('demo seed: goes through the real flow (demo advertisers, upload checks, submit, normal approval with the audit note) and everything runs', async () => {
  const s = makeServer(); try {
    const r = seedDemoCatalog(s.app, plan()); assert.deepEqual(r.failed, []); assert.equal(r.created.length, 7); assert.equal(r.skipped.length, 0);
    assert.ok(r.created.every(c => ['scheduled', 'live'].includes(c.status)), JSON.stringify(r.created));
    const camps = s.db.prepare('SELECT * FROM ad_campaigns ORDER BY id').all(); assert.ok(camps.every(c => c.is_demo === 1 && c.payment_status === 'test_mode_no_payment'), 'demo-marked, no payment');
    for (const a of s.db.prepare('SELECT email FROM advertisers').all()) assert.ok(a.email.endsWith('@' + DEMO_EMAIL_DOMAIN), a.email);
    const ex = camps[0]; assert.equal(ex.placement, 'exclusive'); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM ad_campaign_creatives WHERE campaign_id=? AND status=?').get(ex.id, 'approved').n, 4);
    const t = s.db.prepare("SELECT actor, note FROM ad_transitions WHERE campaign_id=? AND to_status='approved'").get(ex.id); assert.deepEqual([t.actor, t.note], ['admin', DEMO_APPROVAL_NOTE]);
    assert.ok(s.db.prepare("SELECT 1 FROM audit_log WHERE detail LIKE ?").get(`%${DEMO_APPROVAL_NOTE}%`), 'audit_log note');
    const exSlot = r.created[0].slot; const onEx = liveOnSlot(s.app, exSlot, s.app.clock.now()); assert.equal(onEx.length, 1); assert.equal(onEx[0].designs.length, 4, 'the exclusive board rotates the brand\'s 4 designs');
    const shSlots = new Set([r.created[1].slot, r.created[2].slot]); assert.ok(!shSlots.has(exSlot), 'shared brands are on other boards'); for (const sl of shSlots) assert.ok(liveOnSlot(s.app, sl, s.app.clock.now()).length >= 1);
    for (const c of r.created.slice(3)) assert.equal(liveOnSlot(s.app, c.slot, s.app.clock.now()).length >= 1, true, c.surface);
  } finally { await s.close(); }
});

test('demo seed: re-running adds nothing; a failed row does not stop the others; a real advertiser\'s campaign is never touched', async () => {
  const s = makeServer(); try {
    const k = await newAdvertiser(s, 'Real Brand'); const real = await submitAd(s, k, { tier: 'major' }); const realId = real.campaign?.id ?? real.id ?? real.json?.campaign?.id;
    const before = s.db.prepare('SELECT * FROM ad_campaigns WHERE advertiser_id NOT IN (SELECT id FROM advertisers WHERE email LIKE ?)').all('%' + DEMO_EMAIL_DOMAIN); assert.ok(before.length >= 1, 'a real campaign exists');
    const r1 = seedDemoCatalog(s.app, plan()); assert.equal(r1.created.length, 7);
    const counts = () => ['ad_campaigns', 'ad_creatives', 'advertisers', 'ad_campaign_creatives', 'ad_assignments', 'audit_log'].map(t => s.db.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n);
    const c1 = counts(); const r2 = seedDemoCatalog(s.app, plan()); assert.equal(r2.created.length, 0); assert.equal(r2.skipped.length, 7); assert.deepEqual(counts(), c1, 'nothing duplicated');
    const after = s.db.prepare('SELECT * FROM ad_campaigns WHERE advertiser_id NOT IN (SELECT id FROM advertisers WHERE email LIKE ?)').all('%' + DEMO_EMAIL_DOMAIN); assert.deepEqual(after.map(c => [c.id, c.status, c.placement, c.updated_at]), before.map(c => [c.id, c.status, c.placement, c.updated_at]), 'real campaigns untouched');
    void realId;
    const bad = [P('zing-zobo', 'road_billboard', 'street', 'shared', 1, 70, 300, 300), P('adire-lane', 'road_billboard', 'street', 'shared', 1, 80)]; const r3 = seedDemoCatalog(s.app, bad); assert.equal(r3.failed.length, 1); assert.match(r3.failed[0].error, /small|dimension|aspect|should be about/i); assert.equal(r3.created.length, 1);
  } finally { await s.close(); }
});

test('demo seed: a demo campaign that has ended is renewed by the next run; --dry-run changes nothing', async () => {
  const s = makeServer(); try {
    const one = () => [P('kolo-save', 'shop_front', 'shop', 'shared', 1, 5)]; const r1 = seedDemoCatalog(s.app, one()); const id = r1.created[0].campaignId;
    const n0 = s.db.prepare('SELECT COUNT(*) n FROM ad_campaigns').get().n; const d = seedDemoCatalog(s.app, [P('ile-ayo-homes', 'shop_front', 'shop', 'shared', 1, 6)], { dryRun: true }); assert.equal(d.created[0].status, 'dry-run'); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM ad_campaigns').get().n, n0); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM advertisers WHERE brand_name=?').get('Ile Ayo Homes').n, 0, 'a dry run creates no advertiser either');
    decide(s.app, id, 'takedown', 'admin', 'ended'); const r2 = seedDemoCatalog(s.app, one()); assert.equal(r2.created.length, 1); assert.notEqual(r2.created[0].campaignId, id);
  } finally { await s.close(); }
});
