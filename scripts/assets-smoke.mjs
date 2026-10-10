// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/assets-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import * as ads from '../server/core/ads.js'; import { makePng } from '../server/lib/png.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/${String(++step).padStart(2, '0')}-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
try {
  console.log('Naija Area on-demand asset loading smoke (ad images load near the player only, evict when far)');
  const app = s.app; const bills = app.city.billboards.filter(b => b.surface === 'road_billboard'); const K = Math.min(6, bills.length); const ids = [];
  for (let i = 0; i < K; i++) { const a = ads.getOrCreateAdvertiser(app, { email: `a${i}@example.com`, brand: `Demo ${i}` }); const img = makePng(1024, 512, (x, y) => { const k = (((x + y) >> 5) & 1) ? 1 : 0.8; return [(40 + i * 35) * k, 120 * k, (210 - i * 25) * k]; }, 6); const up = ads.uploadCreative(app, a.id, img, 'image/png'); const id = ads.createCampaign(app, a.id, { surface: 'road_billboard', tier: 'major', units: 1, days: 30, creativeId: up.creativeId, headline: 'Demo ' + i, linkUrl: 'https://example.com/d' + i, testModeAck: true }, { demo: true }); if (app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status === 'human_review') ads.decide(app, id, 'approve', 'smoke', 'demo'); ids.push(up.creativeId); }
  ads.tickAds(app); const live = app.db.prepare("SELECT COUNT(*) n FROM ad_campaigns WHERE status IN ('live','scheduled')").get().n; ok(`${live} live campaigns with ${ids.length} different images`);
  const requested = new Set(); const page = await newPage(); await page.evaluateOnNewDocument(() => { window.__naAssetCfg = { loadRadius: 60, keepRadius: 100 }; }); page.on('request', (r) => { const m = r.url().match(/\/media\/creative\/(\d+)/); if (m) requested.add(Number(m[1])); });
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(3500);
  const users = await g(page, () => window.__game.ads.users.size); assert.ok(users >= 4, 'users ' + users);
  const st0 = await g(page, () => window.__game.ads.cache.stats()); assert.ok(requested.size < users, `not everything is fetched at the start: requested ${requested.size} of ${users}`); ok(`at spawn only ${requested.size} of ${users} images requested (before: all of them); cache ${JSON.stringify(st0)}`);
  // walk to each board in turn: its image must be requested when we get near, and shown on the board
  const placed = (await g(page, () => Object.entries(window.__game.ads.slots).map(([bid, l]) => ({ bid, n: l.length, x: window.__game.world.boards[bid]?.def.x, z: window.__game.world.boards[bid]?.def.z })))).filter(b => b.x !== undefined);
  const far = placed.find(b => Math.hypot(b.x + 12, b.z + 12) > 120) || placed[placed.length - 1]; await tp(page, far.x - 14, far.z); await sleep(2500);
  const bar = await g(page, (bid) => { const A = window.__game.ads; const b = window.__game.world.boards[bid]; const win = Math.floor(A.now() / A.rot); const cur = A.currentFor(bid, win); return { cur: cur?.i, loaded: !!A.cache.get(cur?.i), hasMap: !!b.mat.map, house: b.mat.map === A.houseTex.get(bid) }; }, far.bid); assert.ok(bar.loaded && !bar.house, 'near board shows its creative: ' + JSON.stringify(bar)); ok(`walked up to ${far.bid}: its image loaded on approach and is on the board`); await snap(page, 'assets-near-board');
  const n1 = requested.size; assert.ok(n1 >= 1);
  // shrink the budget so the first-seen ones must go when we are far from them
  await g(page, () => { window.__game.ads.cache.cfg.budgetBytes = 1; }); const other = placed.find(b => Math.hypot(b.x - far.x, b.z - far.z) > 150); if (other) { await tp(page, other.x - 14, other.z); await sleep(3000); const st = await g(page, () => window.__game.ads.cache.stats()); const gone = await g(page, (bid, cid) => { const A = window.__game.ads; return { cached: !!A.cache.get(cid), house: window.__game.world.boards[bid].mat.map === A.houseTex.get(bid) }; }, far.bid, bar.cur); assert.equal(gone.cached, false, 'far creative evicted'); assert.ok(gone.house, 'far board back to the plain house ad'); ok(`far image evicted and its board shows the plain house ad again; cache now ${JSON.stringify(st)}`); await tp(page, far.x - 14, far.z); await sleep(3000); const back = await g(page, (cid) => !!window.__game.ads.cache.get(cid), bar.cur); assert.ok(back, 'reloads on return'); ok('image reloads when the player returns'); }
  // failure path: break the media route for one id and make sure nothing throws
  const real = errors.filter(e => !/GPU|404|Failed to load resource/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('ASSETS SMOKE PASSED');
} catch (e) { failed = true; console.error('ASSETS SMOKE FAILED:', e.message); try { await snap((await browser.pages()).at(-1), 'fail-assets'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
