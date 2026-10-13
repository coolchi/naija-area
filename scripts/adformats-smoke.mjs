// Track G item 8 smoke: real server + headless Chrome. Three campaigns (shop-front sign, radio spot, Oya Ride livery) are approved through the normal portal path. The browser then shows the sponsor on the shop sign,
// the radio-spot card in a car in a spot window (and the server counts it), and the livery on the hailed car (counted by the server on boarding). Looks are NOT judged.
// Usage: npm run build && node scripts/adformats-smoke.mjs
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { call, ok as sok, newAdvertiser, submitAd, mkUser } from '../tests/helpers.js';
import { tickAds, campaignStats, windowOf } from '../server/core/ads.js'; import { AD_POLICY, AD_FORMATS } from '../server/config/ratecard.js'; import { isSpotWindow } from '../server/core/adslots.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.filterHeadless = false; // the smoke browser IS headless: the real filter is covered by the tests
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760', '--autoplay-policy=no-user-gesture-required'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const ok = (m) => console.log(`  ✓ ${m}`); let failed = false; const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 6, { timeout: 15000 }, x, z); };
const camp = async (surface, tier, brand) => { const key = await newAdvertiser(s, brand); const sq = surface === 'radio_spot' ? { pngW: 768, pngH: 768 } : {}; const r = await submitAd(s, key, { surface, tier, headline: `${brand} promo`, ...sq }); assert.equal(r.status, 200, JSON.stringify(r.json)); const id = r.json.campaign.id; await sok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve' } }); tickAds(s.app); return id; };
try {
  console.log('Naija Area ad-formats smoke, Track G item 8');
  const shopId = await camp('shop_front', 'shop', 'Shopsign Co'), radioId = await camp('radio_spot', 'station', 'Radiowave Co'), rideId = await camp('ride_car', 'fleet', 'Ridebrand Co'); ok('three campaigns approved and scheduled');
  s.app.adsVersion = (s.app.adsVersion || 0) + 1;
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 760 }); page.on('pageerror', e => errors.push(String(e)));
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 20000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 });
  const uid = await g(page, () => window.__game.user.id); await g(page, async () => { await fetch('/api/dev/cash', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: 50000 }) }).catch(() => {}); });
  // ---- 1. the shop-front sign
  const slot = s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=?').get(shopId).slot_id; const sl = s.app.city.billboardById[slot]; assert.equal(sl.surface, 'shop_front');
  await tp(page, sl.x + sl.nx * 14, sl.z + sl.nz * 14); const look = async (yaw) => { await g(page, (y) => { const c = window.__game.ctrl; c.camYaw = y; c.ry = y; c.dragT = performance.now() + 60000; }, yaw); await sleep(1200); return g(page, (slot) => { const G = window.__game; return G.ads.visiblePct(G.camera, G.size, G.world.boards[slot]); }, slot); };
  let seen = 0; for (const k of [0, 1, 2, 3]) { seen = await look(k * Math.PI / 2); if (seen >= 50) break; } console.log('  · the sign is ' + seen + '% in view'); assert.ok(seen >= 50, 'could not face the sign');
  await page.waitForFunction((slot, id) => window.__game.world.boards[slot]?.shownKey?.startsWith(`c${id}:`), { timeout: 30000 }, slot, shopId); ok(`the sign on ${sl.label} shows the sponsor (${slot})`);
  await page.screenshot({ path: 'screenshots/adformats-shopfront.png' }); await sleep(AD_POLICY.rotationMs + 2500); await page.evaluate(() => window.__game.net.nudge()); await sleep(2500); const sfStat = campaignStats(s.app, shopId); assert.ok(sfStat.validImpressions >= 1, 'shop sign counted: ' + JSON.stringify(sfStat)); ok(`the server counted the shop sign (valid ${sfStat.validImpressions})`);
  // ---- 2. the radio spot, in a car, on a synthesised station, in a spot window
  await tp(page, 0, 0).catch(() => {}); await g(page, () => { const G = window.__game; if (G.ctrl.mode !== 'drive') G.toggleCar(); });
  await page.waitForFunction(() => window.__game.radio.state.inCar, { timeout: 10000 });
  await g(page, () => { const R = window.__game.radio; for (let i = 0; i < 12 && !(R.state.current.kind === 'synth' && R.state.current.id === 'eko'); i++) R.tune(1); if (!R.state.wantOn) R.power(); });
  const radioSlot = await g(page, () => `radio:${window.__game.city.id}:${window.__game.radio.state.current.id}`); assert.ok(s.app.city.adSlotById[radioSlot], radioSlot);
  const assigned = s.db.prepare('SELECT 1 FROM ad_assignments WHERE campaign_id=? AND slot_id=?').get(radioId, radioSlot);
  if (!assigned) { // the campaign sits on other stations: tune to one that has it
    const sid = s.db.prepare('SELECT slot_id FROM ad_assignments WHERE campaign_id=? LIMIT 1').get(radioId).slot_id.split(':')[2]; await g(page, (sid) => { const R = window.__game.radio; for (let i = 0; i < 12 && R.state.current.id !== sid; i++) R.tune(1); }, sid); }
  const P = AD_POLICY.rotationMs; { let w = windowOf(s.app.clock.now()) + 1; while (!isSpotWindow(w, P)) w++; const lead = 7000; s.app.clock.advance(w * P - lead - s.app.clock.now()); } // jump to 7 s BEFORE the next spot window: the browser syncs its clock first, then the spot starts for real and the card is up for the whole window
  const off = s.app.clock.now() - Date.now(); await page.waitForFunction((off) => { window.__game.net.nudge(); return Math.abs(window.__game.clockOffset - off) < 900; }, { timeout: 8000, polling: 250 }, off); const dbg = await g(page, () => { const G = window.__game, st = G.radio.state; return { mode: G.ctrl.mode, inCar: st.inCar, wantOn: st.wantOn, muted: st.muted, vol: st.volume, cur: st.current?.id + ':' + st.current?.kind, cfg: G.cfg.adFormats, slots: Object.keys(G.ads.slots), now: G.serverNow(), rot: G.ads.rot }; }); console.log('  · radio state', JSON.stringify(dbg), 'server now', s.app.clock.now());
  await page.waitForFunction(() => { const c = document.getElementById('radioSpot'); return c && !c.classList.contains('hidden') && /Radiowave Co/.test(c.textContent); }, { timeout: 12000 }); ok('the sponsored card shows in the car: ' + await g(page, () => document.getElementById('radioSpotTxt').textContent));
  await page.screenshot({ path: 'screenshots/adformats-radio.png' }); await sleep(P + 1500); await page.evaluate(() => window.__game.net.nudge()); await sleep(2500);
  const rs = campaignStats(s.app, radioId); if (rs.validImpressions !== 1) console.log('  · stats', JSON.stringify(rs)); assert.equal(rs.validImpressions, 1, `radio valid ${rs.validImpressions}, gross ${rs.grossImpressions}`); ok('the server counted exactly one valid radio impression (gross ' + rs.grossImpressions + ')');
  await g(page, () => { const G = window.__game; if (G.ctrl.mode === 'drive') G.toggleCar(); });
  // ---- 3. the Oya Ride livery, counted on boarding
  await tp(page, -150, -150); s.app.clock.advance(5 * 60000);
  const rr = await g(page, async () => { const r = await fetch('/api/ride/request', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ placeId: 'venue_motors' }) }); return { st: r.status, j: await r.json() }; }); assert.equal(rr.st, 200, JSON.stringify(rr.j)); assert.equal(rr.j.ride.sponsor.c, rideId); ok('the hailed car carries the sponsor: ' + rr.j.ride.sponsor.b);
  await page.evaluate(() => window.__game.rideSvc.load()); await page.waitForFunction(() => window.__game.rideSvc.car?.userData?.livery, { timeout: 10000 }); await page.waitForFunction(() => window.__game.rideSvc.car?.userData?.liveryLoaded, { timeout: 15000 }); ok('the livery decal loaded on the car mesh');
  assert.equal(campaignStats(s.app, rideId).validImpressions, 0, 'not counted before boarding'); s.app.clock.advance(rr.j.ride.arriveAt - s.app.clock.now() + 600);
  await tp(page, rr.j.ride.from.x + 2, rr.j.ride.from.z); const go = await g(page, async () => (await fetch('/api/ride/start', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pos: { x: window.__game.ctrl.x, z: window.__game.ctrl.z }, idem: 'smoke' + Date.now() }) })).status); assert.equal(go, 200);
  assert.equal(campaignStats(s.app, rideId).validImpressions, 1); ok('boarding counted one valid ride impression on the server');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'page errors: ' + real.join(' || ')); ok('no page errors'); console.log('ADFORMATS SMOKE PASSED');
} catch (e) { failed = true; console.error('ADFORMATS SMOKE FAILED:', e.stack || e.message); console.error(errors.slice(0, 5)); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
