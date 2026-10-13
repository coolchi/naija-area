// Ad system v0: campaigns + moderation state machine + rotation + server-side impression validation + signed-redirect taps.
import { bad, dayKey, cleanText } from './util.js';
import { screen } from './filter.js';
import { RATE_CARD, AD_POLICY, AD_FORMATS, priceFor, isPlacement, DEFAULT_PLACEMENT, maxCreatives, placementLabel } from '../config/ratecard.js';
import { isSpotWindow, pickFrame } from './adslots.js';
import { dist } from './economy.js';

export const STATES = ['submitted', 'auto_checks', 'human_review', 'approved', 'rejected', 'scheduled', 'live', 'completed'];
const ALLOWED = { submitted: ['auto_checks'], auto_checks: ['human_review', 'rejected'], human_review: ['approved', 'rejected'], approved: ['scheduled'], scheduled: ['live'], live: ['completed'], rejected: [], completed: [] };
const PIPELINE = ['submitted', 'auto_checks', 'human_review', 'approved', 'scheduled', 'live'];

export function slotsFor(app, surface, tier, cityId) { const c = app.cities[cityId] || app.city; return [...c.billboards, ...(c.adSlots || [])].filter(b => b.surface === surface && (!tier || b.tier === tier)); }
/** a slot by id: a board on the map, or a radio / ride slot (item 8) */
export function slotById(app, id) { if (app.all.billboardById[id]) return app.all.billboardById[id]; for (const c of Object.values(app.cities)) if (c.adSlotById?.[id]) return c.adSlotById[id]; return null; }
export function maxUnits(app, surface, tier, cityId) { return Math.min(RATE_CARD.surfaces[surface].maxBoardsPerOrder, slotsFor(app, surface, tier, cityId).length); }

// ---- images ----------------------------------------------------------
export function inspectImage(buf) {
  const u = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  const dv = new DataView(u.buffer, u.byteOffset, u.byteLength);
  const eq = (o, s) => { for (let i = 0; i < s.length; i++) if (u[o + i] !== s.charCodeAt(i)) return false; return true; };
  if (u.length > 24 && u[0] === 0x89 && eq(1, 'PNG')) return { mime: 'image/png', width: dv.getUint32(16), height: dv.getUint32(20) };
  if (u.length > 4 && u[0] === 0xff && u[1] === 0xd8) {
    let o = 2;
    while (o + 9 < u.length) {
      if (u[o] !== 0xff) { o++; continue; }
      const m = u[o + 1]; if (m === 0xd8 || (m >= 0xd0 && m <= 0xd7) || m === 0x01) { o += 2; continue; }
      const len = dv.getUint16(o + 2);
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { mime: 'image/jpeg', height: dv.getUint16(o + 5), width: dv.getUint16(o + 7) };
      o += 2 + len;
    }
    return null;
  }
  if (u.length > 30 && eq(0, 'RIFF') && eq(8, 'WEBP')) {
    if (eq(12, 'VP8 ')) return { mime: 'image/webp', width: dv.getUint16(26, true) & 0x3fff, height: dv.getUint16(28, true) & 0x3fff };
    if (eq(12, 'VP8L')) { const b = dv.getUint32(21, true); return { mime: 'image/webp', width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 }; }
    if (eq(12, 'VP8X')) return { mime: 'image/webp', width: (u[24] | (u[25] << 8) | (u[26] << 16)) + 1, height: (u[27] | (u[28] << 8) | (u[29] << 16)) + 1 };
  }
  return null;
}
export function uploadCreative(app, advertiserId, buf, declaredMime) {
  const R = RATE_CARD;
  if (!buf || !buf.length) bad('NO_FILE', 'No image received.');
  if (buf.length > R.maxImageBytes) bad('TOO_BIG', `Image must be under ${Math.round(R.maxImageBytes / 1000)} KB.`, 413);
  if (buf.length < R.minImageBytes) bad('TOO_SMALL', 'That file is too small to be a real image.');
  const info = inspectImage(buf);
  if (!info) bad('BAD_IMAGE', 'Only real PNG, JPEG or WebP images are accepted (checked by file contents, not the name).', 415);
  if (declaredMime && !['image/png', 'image/jpeg', 'image/webp'].includes(declaredMime)) bad('BAD_IMAGE', 'Only PNG, JPEG or WebP.', 415);
  if (info.width < R.minImagePx || info.height < R.minImagePx || info.width > R.maxImagePx || info.height > R.maxImagePx) bad('BAD_DIMENSIONS', `Image must be between ${R.minImagePx}px and ${R.maxImagePx}px on each side.`);
  const sha = app.platform.sha256(buf);
  const r = app.db.prepare('INSERT INTO ad_creatives(advertiser_id,mime,bytes,width,height,sha256,data,created_at) VALUES (?,?,?,?,?,?,?,?)').run(advertiserId, info.mime, buf.length, info.width, info.height, sha, buf, app.clock.now());
  return { creativeId: Number(r.lastInsertRowid), ...info, bytes: buf.length };
}
export function getCreative(app, id) { return app.db.prepare('SELECT id, mime, data, advertiser_id FROM ad_creatives WHERE id=?').get(id); }

// ---- advertisers ------------------------------------------------------
export function getOrCreateAdvertiser(app, { email, brand }) {
  email = cleanText(email, 120).toLowerCase(); brand = cleanText(brand, 40); { const sc = screen(brand, { links: false }); if (!sc.ok) bad('BAD_BRAND', 'Brand name: ' + sc.message); }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) bad('BAD_EMAIL', 'Enter a valid contact email.');
  if (brand.length < 2) bad('BAD_BRAND', 'Enter your brand or business name.');
  const ex = app.db.prepare('SELECT * FROM advertisers WHERE email=? AND brand_name=?').get(email, brand);
  if (ex) return ex;   // v0: no email verification; the access key is shown once in the test-mode flow. Real: emailed magic link.
  const key = app.platform.randomHex(16);
  const r = app.db.prepare('INSERT INTO advertisers(email,brand_name,access_key,created_at) VALUES (?,?,?,?)').run(email, brand, key, app.clock.now());
  return { id: Number(r.lastInsertRowid), email, brand_name: brand, access_key: key };
}
export const advertiserByKey = (app, key) => (typeof key === 'string' && key.length >= 16 ? app.db.prepare('SELECT * FROM advertisers WHERE access_key=?').get(key) : null);

// ---- quoting + availability ---------------------------------------------
export function quote(app, { surface, tier, units, days, cityId, placement = DEFAULT_PLACEMENT }) {
  if (!isPlacement(placement)) bad('BAD_PLACEMENT', 'Placement must be "shared" or "exclusive".');
  const p = priceFor(surface, tier, units, days, placement);
  if (!p) bad('BAD_QUOTE', 'Choose a valid surface, tier, number of boards and duration.');
  if (units > maxUnits(app, surface, tier, cityId)) bad('BAD_QUOTE', `Only ${maxUnits(app, surface, tier, cityId)} boards exist for that choice.`);
  const spec = RATE_CARD.surfaces[surface], per = spec.positionsPerBoard, label = placementLabel(surface, placement);
  const line = { description: `${spec.label} · ${spec.tiers[tier].label} · ${label}`, placement, placementLabel: label, boards: units, days, weeklyPerBoard: p.weekly, net: p.net };
  return { ...p, surface, tier, units, days, placementLabel: label, positionsPerBoard: per, positionsTaken: placement === 'exclusive' ? per : 1, sharePct: placement === 'exclusive' ? 100 : Math.round(100 / per), maxDesigns: maxCreatives(surface, placement), lines: [line],
    currency: 'NGN', test_mode: true, note: 'ESTIMATE rate card. TEST MODE: no payment is taken.' };
}
/** can `units` boards be sold in this placement for [startAt, endAt)? Shared takes one rotation position per board; exclusive needs WHOLE boards: every position free for the whole period. */
export function availability(app, surface, tier, units, startAt, endAt, cityId = app.defaultCityId, placement = DEFAULT_PLACEMENT) {
  const slots = slotsFor(app, surface, tier, cityId); const boards = slots.length; const per = RATE_CARD.surfaces[surface].positionsPerBoard; const cap = boards * per;
  const ov = (c) => `${c}surface=? AND ${c}tier=? AND ${c}city_id=? AND ${c}status IN (${PIPELINE.map(() => '?').join(',')}) AND COALESCE(${c}start_at, ${c}requested_start, ${c}created_at) < ? AND COALESCE(${c}end_at, COALESCE(${c}start_at, ${c}requested_start, ${c}created_at) + ${c}days*86400000) > ?`;
  const args = [surface, tier, cityId, ...PIPELINE, endAt, startAt];
  const rows = app.db.prepare(`SELECT id, units, placement FROM ad_campaigns WHERE ${ov('')}`).all(...args);
  let sharedUnits = 0, exclUnits = 0; for (const r of rows) { if (r.placement === 'exclusive') exclUnits += Number(r.units); else sharedUnits += Number(r.units); }
  const used = sharedUnits + exclUnits * per; const poolOk = cap - used >= units * (placement === 'exclusive' ? per : 1);
  // boards: a shared unit needs a board that no exclusive campaign owns; an exclusive unit needs a board nobody touches at all (assigned boards are known; campaigns still waiting for a board count conservatively, one board per unit)
  const touched = new Set(app.db.prepare(`SELECT DISTINCT s.slot_id FROM ad_assignments s JOIN ad_campaigns c ON c.id=s.campaign_id WHERE ${ov('c.')}`).all(...args).map(r => r.slot_id));
  const assigned = new Set(app.db.prepare(`SELECT DISTINCT s.campaign_id FROM ad_assignments s JOIN ad_campaigns c ON c.id=s.campaign_id WHERE ${ov('c.')}`).all(...args).map(r => Number(r.campaign_id)));
  const unassigned = rows.filter(r => !assigned.has(Number(r.id))).reduce((n, r) => n + Number(r.units), 0);
  const blocked = Math.min(boards, touched.size + unassigned); const freeBoards = boards - blocked; const openBoards = boards - Math.min(boards, exclUnits);
  const ok = placement === 'exclusive' ? freeBoards >= units && poolOk : poolOk && openBoards >= units;
  return { placement, capacity: cap, used, free: cap - used, freeBoards, boards, ok };
}

// ---- campaigns + state machine -----------------------------------------
export function transition(app, id, to, actor, note = null) {
  const c = app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id); if (!c) bad('NO_CAMPAIGN', 'Campaign not found.', 404);
  if (!ALLOWED[c.status]?.includes(to)) bad('BAD_TRANSITION', `Cannot go from ${c.status} to ${to}.`, 409);
  const now = app.clock.now();
  const r = app.db.prepare('UPDATE ad_campaigns SET status=?, updated_at=? WHERE id=? AND status=?').run(to, now, id, c.status);
  if (r.changes !== 1) bad('CONFLICT', 'Campaign changed, retry.', 409);
  app.db.prepare('INSERT INTO ad_transitions(campaign_id,from_status,to_status,actor,note,created_at) VALUES (?,?,?,?,?,?)').run(id, c.status, to, actor, note, now);
  if (to === 'rejected' && app.onCampaignRejected) app.onCampaignRejected(id); // a paid ad that is rejected is refunded (payments module)
  return to;
}
function hostOk(u) {
  let url; try { url = new URL(u); } catch { return false; }
  if (url.protocol !== 'https:') return false; const h = url.hostname;
  if (!h.includes('.') || /^\d+\.\d+\.\d+\.\d+$/.test(h) || h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') || url.username || url.password) return false;
  return true;
}
/** the creative ids of an order: `creativeIds` (several designs) or the old single `creativeId`; no repeats, order kept */
function designIds(p) {
  const raw = Array.isArray(p.creativeIds) && p.creativeIds.length ? p.creativeIds : (p.creativeId !== undefined && p.creativeId !== null ? [p.creativeId] : []);
  const out = []; for (const x of raw) { const n = Number(x); if (!Number.isInteger(n)) bad('NO_CREATIVE', 'Upload an image first.'); if (!out.includes(n)) out.push(n); } return out;
}
export function createCampaign(app, advertiserId, p, opts = {}) {
  const now = app.clock.now();
  const placement = p.placement === undefined || p.placement === null || p.placement === '' ? DEFAULT_PLACEMENT : p.placement;
  const q = quote(app, { ...p, placement });
  const ids = designIds(p); if (!ids.length) bad('NO_CREATIVE', 'Upload an image first.');
  const maxD = maxCreatives(p.surface, placement);
  if (ids.length > maxD) bad('TOO_MANY_DESIGNS', `${placement === 'exclusive' ? 'An exclusive' : 'A shared'} campaign can rotate up to ${maxD} design${maxD > 1 ? 's' : ''} (you sent ${ids.length}).`);
  const spec = RATE_CARD.surfaces[p.surface]; const crs = [];
  for (const cid of ids) {
    const cr = app.db.prepare('SELECT * FROM ad_creatives WHERE id=?').get(cid);
    if (!cr || cr.advertiser_id !== advertiserId) bad('NO_CREATIVE', 'Upload an image first.');
    const ar = cr.width / cr.height; if (Math.abs(ar - spec.aspect) / spec.aspect > 0.2) bad('BAD_ASPECT', `Image should be about ${spec.size} (yours is ${cr.width}x${cr.height}).`);
    crs.push(cr);
  }
  const link = String(p.linkUrl || '').trim();
  if (link.length > 300 || !hostOk(link)) bad('BAD_LINK', 'Link must be a public https:// URL.');
  const headline = cleanText(p.headline || '', 60); { const sc = screen(headline, { links: false }); if (!sc.ok) bad('BAD_HEADLINE', 'Headline: ' + sc.message); }
  let reqStart = Number.isFinite(p.startAt) && p.startAt > now ? Math.min(p.startAt, now + 60 * 86400000) : now;
  const end = reqStart + p.days * 86400000;
  if (p.cityId !== undefined && !app.cities[p.cityId]) bad('NO_CITY', 'Unknown city.'); const cityId = p.cityId || app.defaultCityId; const av = availability(app, p.surface, p.tier, p.units, reqStart, end, cityId, placement);
  if (!av.ok) bad('SOLD_OUT', placement === 'exclusive' ? `Not enough whole boards free for those dates: an exclusive ad needs every position on the board free for the whole period (${av.freeBoards} whole board${av.freeBoards === 1 ? '' : 's'} free). Try Shared, other dates or fewer boards.` : `Not enough free ad positions for those dates (${av.free} free).`, 409);
  return app.db.transaction(() => {
    const r = app.db.prepare(`INSERT INTO ad_campaigns(advertiser_id,creative_id,surface,tier,units,days,link_url,headline,price_net,price_vat,price_total,payment_status,status,requested_start,is_demo,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'submitted',?,?,?,?)`).run(advertiserId, ids[0], p.surface, p.tier, p.units, p.days, link, headline, q.net, q.vat, q.total, app.payments && app.payments.cfg.adsRequirePayment ? 'awaiting_payment' : 'test_mode_no_payment', reqStart, opts.demo ? 1 : 0, now, now);
    const id = Number(r.lastInsertRowid); app.db.prepare('UPDATE ad_campaigns SET city_id=?, placement=? WHERE id=?').run(cityId, placement, id);
    ids.forEach((cid, i) => app.db.prepare("INSERT INTO ad_campaign_creatives(campaign_id,creative_id,position,status,created_at) VALUES (?,?,?,'pending',?)").run(id, cid, i, now));
    app.db.prepare('INSERT INTO ad_transitions(campaign_id,from_status,to_status,actor,note,created_at) VALUES (?,?,?,?,?,?)').run(id, null, 'submitted', 'advertiser', `TEST MODE checkout: no payment taken. ${q.placementLabel}, ${ids.length} design${ids.length > 1 ? 's' : ''}`, now);
    runAutoChecks(app, id);
    return id;
  })();
}
export function runAutoChecks(app, id) {
  transition(app, id, 'auto_checks', 'system');
  const c = app.db.prepare('SELECT c.*, a.brand_name FROM ad_campaigns c JOIN advertisers a ON a.id=c.advertiser_id WHERE c.id=?').get(id);
  const text = `${c.headline || ''} ${c.brand_name} ${c.link_url}`.toLowerCase(); const flags = [];
  const hit = (list) => list.filter(k => new RegExp(`(^|[^a-z])${k.replace(/ /g, '\\s+')}([^a-z]|$)`).test(text));
  const prohibited = hit(AD_POLICY.prohibitedKeywords);
  if (prohibited.length) { app.db.prepare('UPDATE ad_campaigns SET reject_reason=?, flags=? WHERE id=?').run(`Auto-rejected: prohibited content (${prohibited.join(', ')})`, JSON.stringify(['prohibited:' + prohibited.join('|')]), id); transition(app, id, 'rejected', 'system', 'prohibited keyword'); return 'rejected'; }
  const restricted = hit(AD_POLICY.restrictedKeywords); const rules = app.cities[c.city_id]?.contentRules;
  if (restricted.length && rules?.rejectRestrictedAds) { app.db.prepare('UPDATE ad_campaigns SET reject_reason=?, flags=? WHERE id=?').run(`Auto-rejected: this city does not allow ${restricted.join(', ')} ads`, JSON.stringify(['city_rule:' + restricted.join('|')]), id); transition(app, id, 'rejected', 'system', 'city content rule'); return 'rejected'; }
  for (const k of restricted) flags.push('restricted_category:' + k);
  if (flags.length) flags.push('needs_regulator_paperwork_check');
  const designs = designRows(app, id); const dupOf = (cid) => app.db.prepare('SELECT COUNT(*) n FROM ad_creatives WHERE sha256=(SELECT sha256 FROM ad_creatives WHERE id=?) AND id!=?').get(cid, cid).n;
  if (designs.some(d => dupOf(d.creative_id))) flags.push('duplicate_creative_seen_before');
  if (designs.length > 1 && new Set(designs.map(d => app.db.prepare('SELECT sha256 FROM ad_creatives WHERE id=?').get(d.creative_id).sha256)).size < designs.length) flags.push('same_image_twice_in_campaign');
  app.db.prepare('UPDATE ad_campaigns SET flags=? WHERE id=?').run(JSON.stringify(flags), id);
  transition(app, id, 'human_review', 'system', flags.length ? 'flags: ' + flags.join(', ') : 'auto checks passed');
  return 'human_review';
}
/** the designs of a campaign, in rotation order. A campaign with no link rows (never happens after the migration) is shown as its one creative. */
export function designRows(app, id) {
  const rows = app.db.prepare('SELECT creative_id, position, status, reject_reason, gross, valid FROM ad_campaign_creatives WHERE campaign_id=? ORDER BY position, creative_id').all(id);
  if (rows.length) return rows.map(r => ({ ...r, creative_id: Number(r.creative_id), position: Number(r.position), gross: Number(r.gross), valid: Number(r.valid) }));
  const c = app.db.prepare('SELECT creative_id, status FROM ad_campaigns WHERE id=?').get(id); return c ? [{ creative_id: Number(c.creative_id), position: 0, status: ['approved', 'scheduled', 'live', 'completed'].includes(c.status) ? 'approved' : c.status === 'rejected' ? 'rejected' : 'pending', reject_reason: null, gross: 0, valid: 0 }] : [];
}
const setDesign = (app, id, cid, status, reason) => app.db.prepare('UPDATE ad_campaign_creatives SET status=?, reject_reason=?, decided_at=? WHERE campaign_id=? AND creative_id=?').run(status, reason ? cleanText(reason, 200) : null, app.clock.now(), id, cid);
/** `extra.rejectDesigns`: creative ids of this campaign to reject while approving the rest (each needs the reason) */
export function decide(app, id, decision, actor = 'admin', reason = null, extra = {}) {
  if (decision === 'approve') {
    const rej = (Array.isArray(extra.rejectDesigns) ? extra.rejectDesigns : []).map(Number); const ds = designRows(app, id);
    if (rej.length) { if (!reason) bad('REASON_REQUIRED', 'Give a reason for the rejected design(s).'); for (const r of rej) if (!ds.some(d => d.creative_id === r)) bad('NO_DESIGN', 'That design is not part of this campaign.', 404); if (ds.every(d => rej.includes(d.creative_id) || d.status === 'rejected')) bad('NO_DESIGN_LEFT', 'At least one design must stay approved. Reject the whole campaign instead.', 409); }
    transition(app, id, 'approved', actor, reason); // (no transaction: this is synchronous, nothing can run between these steps)
    for (const d of ds) { if (rej.includes(d.creative_id)) setDesign(app, id, d.creative_id, 'rejected', reason); else if (d.status === 'pending') setDesign(app, id, d.creative_id, 'approved', null); }
    scheduleCampaign(app, id);
  }
  else if (decision === 'reject') { if (!reason) bad('REASON_REQUIRED', 'Give a rejection reason.'); app.db.prepare('UPDATE ad_campaigns SET reject_reason=? WHERE id=?').run(cleanText(reason, 200), id); transition(app, id, 'rejected', actor, reason); for (const d of designRows(app, id)) if (d.status !== 'rejected') setDesign(app, id, d.creative_id, 'rejected', reason); }
  else if (decision === 'takedown') { app.db.prepare('UPDATE ad_campaigns SET end_at=? WHERE id=?').run(app.clock.now(), id); transition(app, id, 'completed', actor, reason || 'taken down'); app.db.prepare('DELETE FROM ad_assignments WHERE campaign_id=?').run(id); bump(app); }
  else bad('BAD_DECISION', 'approve | reject | takedown');
  return app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status;
}
/** moderate ONE design of a campaign: reject (it leaves the rotation at once; the others keep running) or approve it again. Rejecting the last design that is not rejected ends the campaign (rejected before it runs, taken down once it does). */
export function decideDesign(app, id, creativeId, decision, actor = 'admin', reason = null) {
  const c = app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id); if (!c) bad('NO_CAMPAIGN', 'Campaign not found.', 404);
  const ds = designRows(app, id); const d = ds.find(x => x.creative_id === Number(creativeId)); if (!d) bad('NO_DESIGN', 'That design is not part of this campaign.', 404);
  if (['rejected', 'completed'].includes(c.status)) bad('BAD_TRANSITION', `The campaign is ${c.status}; its designs can no longer change.`, 409);
  if (decision === 'reject') {
    if (!reason) bad('REASON_REQUIRED', 'Give a rejection reason.'); if (d.status === 'rejected') return { design: 'rejected', campaign: c.status };
    const left = ds.filter(x => x.creative_id !== d.creative_id && x.status !== 'rejected').length;
    if (!left) return { design: 'rejected', campaign: decide(app, id, ['submitted', 'auto_checks', 'human_review'].includes(c.status) ? 'reject' : 'takedown', actor, reason) };
    setDesign(app, id, d.creative_id, 'rejected', reason); bump(app);
  } else if (decision === 'approve') {
    if (d.status === 'approved') return { design: 'approved', campaign: c.status };
    setDesign(app, id, d.creative_id, 'approved', null); bump(app);
  } else bad('BAD_DECISION', 'approve | reject');
  return { design: decision === 'approve' ? 'approved' : 'rejected', campaign: app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status };
}
const bump = (app) => { app.adsVersion = (app.adsVersion || 0) + 1; };
/** approved -> scheduled: put the campaign on the least-loaded boards with a free rotation position */
export function scheduleCampaign(app, id) {
  const c = app.db.prepare('SELECT * FROM ad_campaigns WHERE id=?').get(id); if (c.status !== 'approved') return false;
  const now = app.clock.now(); const per = RATE_CARD.surfaces[c.surface].positionsPerBoard;
  if (app.payments?.cfg.adsRequirePayment && !['paid', 'test_mode_no_payment'].includes(c.payment_status)) { // approved ads wait for payment; tickAds retries and schedules once the money is confirmed
    const fl = JSON.parse(c.flags || '[]'); if (!fl.includes('waiting_for_payment')) app.db.prepare('UPDATE ad_campaigns SET flags=? WHERE id=?').run(JSON.stringify([...fl, 'waiting_for_payment']), id); return false;
  }
  const start = Math.max(c.requested_start || now, now); const end = start + c.days * 86400000; const excl = c.placement === 'exclusive';
  return app.db.transaction(() => {
    // what already sits on each board DURING this campaign's period (a shared campaign = 1 position, an exclusive one = every position)
    const taken = app.db.prepare("SELECT s.slot_id, s.position, k.placement FROM ad_assignments s JOIN ad_campaigns k ON k.id=s.campaign_id WHERE s.campaign_id!=? AND k.status IN ('scheduled','live') AND k.start_at < ? AND k.end_at > ?").all(id, end, start);
    const lm = {}; for (const t of taken) lm[t.slot_id] = (lm[t.slot_id] || 0) + (t.placement === 'exclusive' ? per : 1);
    const cands = slotsFor(app, c.surface, c.tier, c.city_id).filter(s => excl ? !(lm[s.id] > 0) : (lm[s.id] || 0) < per).sort((a, b) => (lm[a.id] || 0) - (lm[b.id] || 0));
    if (cands.length < c.units) { app.db.prepare("UPDATE ad_campaigns SET flags=? WHERE id=?").run(JSON.stringify([...(JSON.parse(c.flags || '[]').filter(f => f !== 'waiting_for_space')), 'waiting_for_space']), id); return false; }
    for (const s of cands.slice(0, c.units)) { // an exclusive campaign takes position 0 and (see lm above) fills the board: nobody else is placed there while it runs
      const used = new Set(taken.filter(t => t.slot_id === s.id).map(t => Number(t.position))); let pos = 0; while (used.has(pos)) pos++;
      app.db.prepare('INSERT INTO ad_assignments(campaign_id,slot_id,position) VALUES (?,?,?)').run(id, s.id, pos);
    }
    app.db.prepare('UPDATE ad_campaigns SET start_at=?, end_at=? WHERE id=?').run(start, end, id);
    app.db.prepare("UPDATE ad_campaigns SET flags=? WHERE id=?").run(JSON.stringify(JSON.parse(c.flags || '[]').filter(f => f !== 'waiting_for_space')), id);
    transition(app, id, 'scheduled', 'system', `assigned to ${c.units} board(s)${excl ? ' (exclusive: whole board)' : ''}`);
    bump(app); return true;
  })();
}
/** scheduler: retry waiting approvals, go live when start passes, complete when end passes */
export function tickAds(app) {
  const now = app.clock.now(); let changed = 0;
  for (const c of app.db.prepare("SELECT id FROM ad_campaigns WHERE status='approved'").all()) if (scheduleCampaign(app, c.id)) changed++;
  for (const c of app.db.prepare("SELECT id FROM ad_campaigns WHERE status='scheduled' AND start_at<=?").all(now)) { transition(app, c.id, 'live', 'system'); changed++; }
  for (const c of app.db.prepare("SELECT id FROM ad_campaigns WHERE status='live' AND end_at<=?").all(now)) { transition(app, c.id, 'completed', 'system'); app.db.prepare('DELETE FROM ad_assignments WHERE campaign_id=?').run(c.id); changed++; }
  if (changed) bump(app); return changed;
}

// ---- serving + rotation -------------------------------------------------
/** what is booked on a board at time `atMs`, in rotation order: one entry per campaign with its approved designs (`designs`, in order) and `creative` = the first design (kept for older callers) */
export function liveOnSlot(app, slotId, atMs) {
  const rows = app.db.prepare(`SELECT c.id campaign, c.creative_id creative, c.headline, c.link_url, c.placement, a.brand_name brand, s.position, k.creative_id design, k.status dstatus, k.position dpos
    FROM ad_assignments s JOIN ad_campaigns c ON c.id=s.campaign_id JOIN advertisers a ON a.id=c.advertiser_id LEFT JOIN ad_campaign_creatives k ON k.campaign_id=c.id
    WHERE s.slot_id=? AND c.status IN ('live','completed') AND c.start_at<=? AND c.end_at>? ORDER BY s.position, k.position, k.creative_id`).all(slotId, atMs, atMs);
  const out = []; const by = new Map();
  for (const r of rows) {
    let e = by.get(r.campaign); if (!e) { e = { campaign: Number(r.campaign), creative: Number(r.creative), headline: r.headline, link_url: r.link_url, placement: r.placement, brand: r.brand, position: Number(r.position), designs: [], hasLinks: false }; by.set(r.campaign, e); out.push(e); }
    if (r.design !== null && r.design !== undefined) { e.hasLinks = true; if (r.dstatus === 'approved') e.designs.push(Number(r.design)); }
  }
  return out.filter(e => e.hasLinks ? e.designs.length > 0 : true).map(e => { if (!e.hasLinks) e.designs = [e.creative]; else e.creative = e.designs[0]; delete e.hasLinks; return e; });
}
export const windowOf = (ms) => Math.floor(ms / AD_POLICY.rotationMs);
export function adsSnapshot(app, now, cityId) {
  const slots = {};
  const city = app.cities[cityId] || app.city; for (const b of [...city.billboards, ...(city.adSlots || [])]) { if (b.surface === 'ride_car') continue; const l = liveOnSlot(app, b.id, now); if (l.length) slots[b.id] = l.map(x => ({ c: x.campaign, i: x.creative, b: x.brand, h: x.headline, ...(x.designs.length > 1 ? { d: x.designs } : {}), ...(x.placement === 'exclusive' ? { x: 1 } : {}) })); } // the ride slot is served with the ride itself, not with the board list. d = the designs of a campaign when it has more than one; x = exclusive
  return { slots, rotationMs: AD_POLICY.rotationMs, serverNow: now };
}
import { rotIndex } from './adslots.js';
/** the campaign AND the design (creative) that is on in window `win`: campaigns take turns window by window; inside a campaign the designs take turns each time it comes round (the same rule as the client: pickFrame in adslots.js) */
export function expectedFrame(app, slotId, win) {
  // membership is judged at the END of the window (or now, for the current window) so an ad that went live mid-window still counts
  const t = Math.min(win * AD_POLICY.rotationMs + AD_POLICY.rotationMs - 1, app.clock.now()); const list = liveOnSlot(app, slotId, t);
  const f = pickFrame(list.map(x => ({ c: x.campaign, d: x.designs })), rotIndex(slotId, win, AD_POLICY.rotationMs)); return f ? { campaign: f.c, creative: f.i } : null;
}
export function expectedCampaign(app, slotId, win) { return expectedFrame(app, slotId, win)?.campaign ?? null; }
const bumpDesign = (app, cid, creative, col) => { if (Number.isInteger(creative)) app.db.prepare(`UPDATE ad_campaign_creatives SET ${col}=${col}+1 WHERE campaign_id=? AND creative_id=?`).run(cid, creative); };

// ---- impressions --------------------------------------------------------
const bumpStat = (app, cid, col, n = 1, day) => app.db.prepare(`INSERT INTO ad_stats(campaign_id,day,${col}) VALUES (?,?,?) ON CONFLICT(campaign_id,day) DO UPDATE SET ${col}=ad_stats.${col}+?`).run(cid, day, n, n);
const bumpReason = (app, cid, kind, reason) => app.db.prepare('INSERT INTO ad_filter_reasons(campaign_id,kind,reason,n) VALUES (?,?,?,1) ON CONFLICT(campaign_id,kind,reason) DO UPDATE SET n=ad_filter_reasons.n+1').run(cid, kind, reason);

/** evidence item: {slot, win, c, pct, ms, vis}. Client sends evidence, never counts. */
export function processEvidence(app, p, items, now) {
  const P = AD_POLICY; const res = { accepted: 0, filtered: {} }; const day = dayKey(now);
  const lim = app.limiter;
  const near = (slot, t) => { // nearest known position sample to the window time
    let best = null, bd = Infinity; for (const s of p.trail) { const d = Math.abs(s.t - t); if (d < bd) { bd = d; best = s; } }
    if (!best || bd > 15000) best = { x: p.x, z: p.z }; return best;
  };
  for (const e of items) {
    if (!e || typeof e.slot !== 'string' || !Number.isInteger(e.win) || !Number.isInteger(e.c)) continue; // malformed: dropped, not counted
    const camp = app.db.prepare('SELECT id, status FROM ad_campaigns WHERE id=?').get(e.c); if (!camp) continue;
    bumpStat(app, e.c, 'gross', 1, day);
    const reject = (r) => { bumpReason(app, e.c, 'impression', r); res.filtered[r] = (res.filtered[r] || 0) + 1; };
    const slot = slotById(app, e.slot); const winT = e.win * P.rotationMs; const radio = slot?.surface === 'radio_spot';
    if (p.isBot) { reject('invalid_traffic_bot'); continue; }
    if (p.headless && app.filterHeadless) { reject('invalid_traffic_headless'); continue; }
    if (!lim.hit(`imp:${p.id}`, P.maxClaimsPerMinutePerUser, 60000, now)) { reject('rate_limit'); continue; }
    if (!slot) { reject('unknown_surface'); continue; }
    if (slot.surface === 'ride_car') { reject('server_counted_surface'); continue; } // ride liveries are counted by the server per ride, never from client evidence
    if (winT > now + 5000 || winT < now - P.maxEvidenceAgeMs) { reject('stale_or_future_window'); continue; }
    const frame = expectedFrame(app, e.slot, e.win);
    if (frame === null) { reject('creative_not_live_on_surface'); continue; }
    if (frame.campaign !== e.c) { reject('creative_not_scheduled_in_window'); continue; }
    const design = frame.creative; if (e.i !== undefined && e.i !== null && e.i !== design) { // the claim names a design: it must be the one that was on (older clients send no design: the scheduled one is credited)
      if (Number.isInteger(e.i) && app.db.prepare('SELECT 1 FROM ad_campaign_creatives WHERE campaign_id=? AND creative_id=?').get(e.c, e.i)) bumpDesign(app, e.c, e.i, 'gross');
      reject('design_not_scheduled_in_window'); continue;
    }
    bumpDesign(app, e.c, design, 'gross');
    if (radio) { // a radio spot: only in a spot window, only for someone who is in a car, listened long enough, one spot per player per window across every station
      if (!isSpotWindow(e.win, P.rotationMs)) { reject('not_a_spot_window'); continue; }
      if (slot.city !== p.city) { reject('wrong_city'); continue; }
      if (!(p.mode === 'drive' || now - (p.driveAt || 0) <= P.maxEvidenceAgeMs)) { reject('player_not_in_a_car'); continue; }
      if (!(e.vis !== false && e.ms >= AD_FORMATS.radio.minListenMs && e.ms <= P.rotationMs + 500)) { reject('not_listened_long_enough'); continue; }
      if (app.db.prepare("SELECT 1 FROM ad_impressions WHERE user_id=? AND win=? AND slot_id LIKE 'radio:%'").get(p.id, e.win)) { reject('duplicate_in_window'); continue; }
    } else {
      const pos = near(slot, winT + P.rotationMs / 2);
      if (dist(pos.x, pos.z, slot.x, slot.z) > P.maxSurfaceDistance) { reject('player_too_far_from_surface'); continue; }
      if (!(e.vis !== false && e.pct >= P.viewableMinPct && e.ms >= P.viewableMinMs && e.ms <= P.rotationMs + 500)) { reject('not_viewable'); continue; }
    }
    const r = app.db.prepare('INSERT OR IGNORE INTO ad_impressions(campaign_id,slot_id,user_id,win,pct,ms,created_at) VALUES (?,?,?,?,?,?,?)').run(e.c, e.slot, p.id, e.win, Math.round(radio ? 100 : e.pct), Math.round(e.ms), now);
    if (r.changes !== 1) { reject('duplicate_in_window'); continue; }
    bumpStat(app, e.c, 'valid', 1, day); bumpDesign(app, e.c, design, 'valid'); res.accepted++;
  }
  return res;
}

// ---- the Oya Ride livery: counted by the server alone (item 8) --------------------------------
/** the sponsor on this city's ride cars for ride number `rideId` (rotates: ride 1 gets the first live sponsor, ride 2 the next ...). null when nobody is booked. */
export function rideSponsor(app, cityId, rideId, now = app.clock.now()) {
  const list = liveOnSlot(app, `ride:${cityId}`, now); if (!list.length) return null; const f = pickFrame(list.map(x => ({ c: x.campaign, d: x.designs })), rideId); const x = list.find(y => y.campaign === f.c); // rides take turns between sponsors, and a sponsor's designs take turns each time it comes round
  return { c: x.campaign, i: f.i, b: x.brand, h: x.headline };
}
/** the ride was requested with this sponsor on the car: a claim was made (gross) */
export function rideSponsorShown(app, sponsor, now = app.clock.now()) { if (sponsor) { bumpStat(app, sponsor.c, 'gross', 1, dayKey(now)); bumpDesign(app, sponsor.c, sponsor.i, 'gross'); } }
/** the passenger got into the livered car: one valid impression for this ride, unless the player is a bot or headless. Returns true if counted. */
export function rideSponsorBoarded(app, uid, rideId, sponsor, cityId, now = app.clock.now()) {
  if (!sponsor) return false; const p = app.world.players.get(uid); const day = dayKey(now); const slot = `ride:${cityId}`;
  const camp = app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(sponsor.c); if (!camp) return false;
  const reject = (r) => { bumpReason(app, sponsor.c, 'impression', r); return false; };
  if (p?.isBot) return reject('invalid_traffic_bot'); if (p?.headless && app.filterHeadless) return reject('invalid_traffic_headless');
  const r = app.db.prepare('INSERT OR IGNORE INTO ad_impressions(campaign_id,slot_id,user_id,win,pct,ms,created_at) VALUES (?,?,?,?,?,?,?)').run(sponsor.c, slot, uid, Math.floor(now / 1000), 100, 0, now); // `win` = the second of boarding: unique per player and campaign (ride numbers restart with the server, so they cannot be the key)
  if (r.changes !== 1) return reject('duplicate_in_window'); bumpStat(app, sponsor.c, 'valid', 1, day); bumpDesign(app, sponsor.c, sponsor.i, 'valid'); return true;
}
/** the ride was cancelled or never taken: the claim stays gross-only, with a reason */
export function rideSponsorDropped(app, sponsor) { if (sponsor) bumpReason(app, sponsor.c, 'impression', 'ride_not_taken'); }

// ---- taps (signed redirect) ----------------------------------------------
export function mintTap(app, uid, campaignId, slotId) {
  const slot = app.all.billboardById[slotId]; const p = app.world.players.get(uid);
  if (!slot || !p) bad('BAD_TAP', 'Walk up to the board first.');
  if (dist(p.x, p.z, slot.x, slot.z) > AD_POLICY.maxSurfaceDistance + 20) bad('TOO_FAR', 'Too far from that board.');
  const live = liveOnSlot(app, slotId, app.clock.now()).find(x => x.campaign === campaignId);
  if (!live) bad('NOT_LIVE', 'That ad is no longer showing.', 410);
  const payload = { c: campaignId, u: uid, s: slotId, exp: app.clock.now() + AD_POLICY.tapTokenTtlMs };
  const b = app.platform.b64url(JSON.stringify(payload));
  return { path: `/go/${b}.${app.platform.hmac(b)}`, brand: live.brand, url: live.link_url };
}
export function handleTap(app, token, meta = {}) {
  const [b, sig] = String(token).split('.');
  if (!b || !sig || !app.platform.safeEqual(sig, app.platform.hmac(b))) bad('BAD_TOKEN', 'Invalid link.', 400);
  let t; try { t = JSON.parse(app.platform.fromB64url(b)); } catch { bad('BAD_TOKEN', 'Invalid link.', 400); }
  const now = app.clock.now(); if (!(t.exp > now)) bad('EXPIRED', 'This link expired. Walk back to the board and tap again.', 410);
  const c = app.db.prepare('SELECT id, link_url, status FROM ad_campaigns WHERE id=?').get(t.c); if (!c) bad('NO_CAMPAIGN', 'Gone', 404);
  const day = dayKey(now); bumpStat(app, c.id, 'taps_gross', 1, day);
  const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(t.u);
  let reason = null;
  if (u?.is_bot) reason = 'invalid_traffic_bot'; else if (meta.headless && app.filterHeadless) reason = 'invalid_traffic_headless';
  else if (app.db.prepare('SELECT 1 FROM ad_taps WHERE campaign_id=? AND user_id=? AND valid=1 AND created_at>?').get(c.id, t.u, now - AD_POLICY.tapDedupeMs)) reason = 'duplicate_tap';
  app.db.prepare('INSERT INTO ad_taps(campaign_id,user_id,valid,reason,created_at) VALUES (?,?,?,?,?)').run(c.id, t.u, reason ? 0 : 1, reason, now);
  if (reason) bumpReason(app, c.id, 'tap', reason); else bumpStat(app, c.id, 'taps_valid', 1, day);
  return c.link_url;
}

// ---- reporting -------------------------------------------------------------
export function campaignStats(app, id) {
  const s = app.db.prepare('SELECT COALESCE(SUM(gross),0) gross, COALESCE(SUM(valid),0) valid, COALESCE(SUM(taps_gross),0) tg, COALESCE(SUM(taps_valid),0) tv FROM ad_stats WHERE campaign_id=?').get(id);
  const reasons = app.db.prepare('SELECT kind, reason, n FROM ad_filter_reasons WHERE campaign_id=? ORDER BY n DESC').all(id);
  const uniq = app.db.prepare('SELECT COUNT(DISTINCT user_id) n FROM ad_impressions WHERE campaign_id=?').get(id).n;
  const daily = app.db.prepare('SELECT day, gross, valid, taps_valid FROM ad_stats WHERE campaign_id=? ORDER BY day').all(id);
  return { grossImpressions: s.gross, filteredOut: s.gross - s.valid, validImpressions: s.valid, uniquePlayers: uniq, tapsGross: s.tg, tapsValid: s.tv,
    ctrPct: s.valid ? Math.round((s.tv / s.valid) * 10000) / 100 : 0, filterReasons: reasons, daily };
}
export function campaignView(app, c) {
  const placement = c.placement || DEFAULT_PLACEMENT; const spec = RATE_CARD.surfaces[c.surface]; const designs = designRows(app, c.id).map(d => ({ creativeId: d.creative_id, position: d.position, status: d.status, rejectReason: d.reject_reason || null, grossImpressions: d.gross, validImpressions: d.valid, filteredOut: Math.max(0, d.gross - d.valid) }));
  const label = placementLabel(c.surface, placement); const tierLabel = spec?.tiers?.[c.tier]?.label || c.tier;
  return { id: c.id, brand: c.brand_name, surface: c.surface, tier: c.tier, units: c.units, days: c.days, headline: c.headline, linkUrl: c.link_url, status: c.status, rejectReason: c.reject_reason,
    flags: c.flags ? JSON.parse(c.flags) : [], priceTotal: c.price_total, priceNet: c.price_net, priceVat: c.price_vat, payment: c.payment_status, startAt: c.start_at, endAt: c.end_at, createdAt: c.created_at, creativeId: c.creative_id, demo: !!c.is_demo,
    placement, placementLabel: label, designs, maxDesigns: maxCreatives(c.surface, placement),
    invoiceLines: [{ description: `${spec?.label || c.surface} · ${tierLabel} · ${label}`, placement, placementLabel: label, boards: c.units, days: c.days, net: c.price_net, vat: c.price_vat, total: c.price_total }],
    slots: app.db.prepare('SELECT slot_id, position FROM ad_assignments WHERE campaign_id=?').all(c.id).map(r => r.slot_id) };
}
export function advertiserCampaigns(app, advertiserId) {
  return app.db.prepare('SELECT c.*, a.brand_name FROM ad_campaigns c JOIN advertisers a ON a.id=c.advertiser_id WHERE c.advertiser_id=? ORDER BY c.id DESC').all(advertiserId)
    .map(c => ({ ...campaignView(app, c), transitions: app.db.prepare('SELECT from_status,to_status,actor,note,created_at FROM ad_transitions WHERE campaign_id=? ORDER BY id').all(c.id), stats: campaignStats(app, c.id) }));
}
export function adminQueue(app, statuses) {
  const q = statuses?.length ? statuses : ['human_review'];
  return app.db.prepare(`SELECT c.*, a.brand_name, a.email FROM ad_campaigns c JOIN advertisers a ON a.id=c.advertiser_id WHERE c.status IN (${q.map(() => '?').join(',')}) ORDER BY c.id DESC LIMIT 200`).all(...q)
    .map(c => ({ ...campaignView(app, c), email: c.email, stats: campaignStats(app, c.id) }));
}
