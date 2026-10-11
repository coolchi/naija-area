// Demo ad sets for exclusive vs shared placement (11 Oct 2026). Used by scripts/seed-ad-placement-demo.mjs (real creative files) and by tests (generated images).
// One EXCLUSIVE board: one brand alone on it, up to 4 designs rotating. One SHARED board: several different brands taking turns.
// How the two land on different boards without choosing boards by hand: an exclusive campaign owns the first free board of the tier, and the scheduler never puts
// anything else on a wholly owned board, so every shared campaign of the same tier goes to the remaining board. Use a tier with at least 2 boards (road_billboard:mega has 2).
import * as ads from './ads.js';
import { RATE_CARD, maxCreatives } from '../config/ratecard.js';

/** @param {object} app
 *  @param {{exclusive:{brand:string,email?:string,headline:string,linkUrl:string,images:Buffer[]}, shared:{brand:string,email?:string,headline:string,linkUrl:string,images:Buffer[]}[], surface?:string, tier?:string, days?:number, actor?:string}} set
 *  @returns {{exclusive:{campaignId:number,slot:string,designs:number}, shared:{campaignId:number,slot:string,brand:string,designs:number}[], tier:string}} */
export function seedPlacementDemo(app, set) {
  const surface = set.surface || 'road_billboard', tier = set.tier || 'mega', days = set.days || 30, actor = set.actor || 'demo';
  const spec = RATE_CARD.surfaces[surface]; if (!spec?.tiers[tier]) throw new Error(`unknown surface/tier ${surface}:${tier}`);
  const boards = ads.slotsFor(app, surface, tier, app.defaultCityId).length; if (boards < 2) throw new Error(`${surface}:${tier} has ${boards} board(s); the demo needs 2 (one exclusive, one shared)`);
  const mk = (b, placement) => {
    const adv = ads.getOrCreateAdvertiser(app, { email: b.email || `${b.brand.toLowerCase().replace(/[^a-z0-9]+/g, '')}@example.com`, brand: b.brand });
    const max = maxCreatives(surface, placement); const imgs = (b.images || []).slice(0, max); if (!imgs.length) throw new Error(`${b.brand}: no images`);
    const creativeIds = imgs.map(img => ads.uploadCreative(app, adv.id, img, 'image/png').creativeId);
    const id = ads.createCampaign(app, adv.id, { surface, tier, units: 1, days, creativeIds, placement, headline: b.headline, linkUrl: b.linkUrl, testModeAck: true }, { demo: true });
    if (app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status === 'human_review') ads.decide(app, id, 'approve', actor, 'demo');
    return { id, designs: creativeIds.length };
  };
  const ex = mk(set.exclusive, 'exclusive'); const sh = set.shared.map(b => ({ brand: b.brand, ...mk(b, 'shared') })); ads.tickAds(app);
  const slotOf = (id) => app.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=?').get(id)?.slot_id || null;
  return { tier, exclusive: { campaignId: ex.id, slot: slotOf(ex.id), designs: ex.designs }, shared: sh.map(x => ({ campaignId: x.id, slot: slotOf(x.id), brand: x.brand, designs: x.designs })) };
}

// ---- the demo catalogue on a live server (11 Oct 2026, owner request) ----------------------------------------------------------------------------------------
// Goes through the REAL flow, in-process: register a demo advertiser per brand, upload each image through uploadCreative (the same size/type/dimension checks as the
// upload route), createCampaign (the same quote, aspect and design-count rules, payment 'test_mode_no_payment', is_demo=1), then decide('approve') on the normal state
// machine with an audit note. It only ever creates demo rows: it never edits or deletes a campaign it did not create. Re-running is safe (see `existing`).
export const DEMO_EMAIL_DOMAIN = 'demo.naija-area.invalid'; // not a real domain: demo advertisers can never receive mail or log in from a real inbox
export const DEMO_APPROVAL_NOTE = 'demo seed approved by owner request';

/** @param {object} app
 *  @param {{brand:string, brandId:string, headline:string, linkUrl:string, surface:string, tier:string, placement:'shared'|'exclusive', days?:number, images:Buffer[]}[]} plan
 *  @param {{actor?:string, dryRun?:boolean, log?:(m:string)=>void}} [opts]
 *  @returns {{created:{campaignId:number,brand:string,surface:string,tier:string,placement:string,designs:number,status:string,slot:string|null}[], skipped:{campaignId:number,brand:string,surface:string,tier:string,status:string}[], failed:{brand:string,surface:string,tier:string,error:string}[]}} */
export function seedDemoCatalog(app, plan, opts = {}) {
  const log = opts.log || (() => {}); const actor = opts.actor || 'admin'; const out = { created: [], skipped: [], failed: [] };
  const live = "('rejected','completed')"; // a demo campaign that ended can be renewed by a later run; anything still in the pipeline counts as "already there"
  for (const p of plan) {
    const email = `${p.brandId}@${DEMO_EMAIL_DOMAIN}`;
    try {
      if (opts.dryRun) { // look only: no advertiser row is created
        const a0 = app.db.prepare('SELECT id FROM advertisers WHERE email=? AND brand_name=?').get(email, p.brand);
        const h0 = a0 && app.db.prepare(`SELECT id, status FROM ad_campaigns WHERE advertiser_id=? AND surface=? AND tier=? AND is_demo=1 AND status NOT IN ${live} ORDER BY id LIMIT 1`).get(a0.id, p.surface, p.tier);
        if (h0) out.skipped.push({ campaignId: h0.id, brand: p.brand, surface: p.surface, tier: p.tier, status: h0.status }); else out.created.push({ campaignId: 0, brand: p.brand, surface: p.surface, tier: p.tier, placement: p.placement, designs: p.images.length, status: 'dry-run', slot: null });
        continue;
      }
      const adv = ads.getOrCreateAdvertiser(app, { email, brand: p.brand });
      const have = app.db.prepare(`SELECT id, status FROM ad_campaigns WHERE advertiser_id=? AND surface=? AND tier=? AND is_demo=1 AND status NOT IN ${live} ORDER BY id LIMIT 1`).get(adv.id, p.surface, p.tier);
      if (have) { out.skipped.push({ campaignId: have.id, brand: p.brand, surface: p.surface, tier: p.tier, status: have.status }); log(`  skip   ${p.brand} ${p.surface}:${p.tier} (campaign #${have.id} is already ${have.status})`); continue; }
      const max = maxCreatives(p.surface, p.placement); if (p.images.length > max) throw new Error(`${p.images.length} designs given, ${p.placement} allows ${max}`);
      // a picture this advertiser already uploaded (same bytes) is reused, so a re-run after a failed run does not pile up copies
      const creativeIds = p.images.map(img => { const sha = app.platform.sha256(img); const ex = app.db.prepare('SELECT id FROM ad_creatives WHERE advertiser_id=? AND sha256=? ORDER BY id LIMIT 1').get(adv.id, sha); return ex ? ex.id : ads.uploadCreative(app, adv.id, img, 'image/png').creativeId; });
      const id = ads.createCampaign(app, adv.id, { surface: p.surface, tier: p.tier, units: 1, days: p.days || 30, creativeIds, placement: p.placement, headline: p.headline, linkUrl: p.linkUrl, testModeAck: true }, { demo: true });
      let st = app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status;
      if (st === 'human_review') { st = ads.decide(app, id, 'approve', actor, DEMO_APPROVAL_NOTE); app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run(actor, 'ad_approve', `campaign ${id}: ${DEMO_APPROVAL_NOTE} (demo seed, ${p.brand}, ${p.surface}:${p.tier}, ${p.placement}, ${creativeIds.length} design${creativeIds.length > 1 ? 's' : ''})`, app.clock.now()); }
      out.created.push({ campaignId: id, brand: p.brand, surface: p.surface, tier: p.tier, placement: p.placement, designs: creativeIds.length, status: st, slot: null }); log(`  create ${p.brand} ${p.surface}:${p.tier} ${p.placement} x${creativeIds.length} -> #${id} ${st}`);
    } catch (e) { out.failed.push({ brand: p.brand, surface: p.surface, tier: p.tier, error: e.message || String(e) }); log(`  FAILED ${p.brand} ${p.surface}:${p.tier}: ${e.message}`); }
  }
  if (!opts.dryRun) { ads.tickAds(app); for (const c of out.created) c.slot = app.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=? ORDER BY slot_id LIMIT 1').get(c.campaignId)?.slot_id || null; for (const c of out.created) c.status = app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(c.campaignId)?.status || c.status; }
  return out;
}
