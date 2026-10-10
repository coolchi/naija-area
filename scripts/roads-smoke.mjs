// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/roads-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js';
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
  console.log('Naija Area roads smoke (curved roads, roundabouts, cars following them)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const info = await g(page, () => ({ curved: window.__game.city.roads.filter(r => r.pts).length, ra: (window.__game.city.roundabouts || []).length, cars: window.__game.traffic.cars.length })); assert.ok(info.curved >= 2 && info.ra >= 4 && info.cars > 10, JSON.stringify(info)); ok(`city has ${info.curved} curved roads, ${info.ra} roundabouts, ${info.cars} ambient cars`);
  // sample every car for 45 s: all must stay on a road; some must be seen on a curved road and in a roundabout
  const seen = await g(page, async () => { const T = window.__game.traffic, G = window.__game; const out = { off: 0, curve: 0, ra: 0, n: 0, slowBend: false }; let maxV = 0;
    for (let i = 0; i < 450; i++) { for (const c of T.cars) { const r = G.onRoad(c.g.position.x, c.g.position.z, 1.2); out.n++; if (!r) out.off++; else if (r.kind === 'curve') out.curve++; else if (r.kind === 'roundabout') out.ra++; } await new Promise(r => setTimeout(r, 100)); } return out; });
  assert.equal(seen.off, 0, 'cars left the road: ' + JSON.stringify(seen)); assert.ok(seen.curve > 0 && seen.ra > 0, JSON.stringify(seen)); ok(`${seen.n} car samples: 0 off the road, ${seen.curve} on curved roads, ${seen.ra} in roundabouts`);
  const ra = await g(page, () => window.__game.city.roundabouts[0]); await tp(page, ra.x + 2, ra.z + 34); await sleep(1200); await g(page, (r) => { const c = window.__game.ctrl; c.ry = Math.atan2(-(r.z - c.z), r.x - c.x); c.camYaw = c.ry; }, ra); await sleep(1800); await snap(page, 'roads-roundabout');
  const cv = await g(page, () => window.__game.city.roads.find(r => r.pts).pts[24]); const cv0 = await g(page, () => window.__game.city.roads.find(r => r.pts).pts[4]); await tp(page, cv0[0], cv0[1]); await sleep(1200); await g(page, (a, b) => { const c = window.__game.ctrl; c.ry = Math.atan2(-(b[1] - a[1]), b[0] - a[0]); c.camYaw = c.ry; }, cv0, cv); await sleep(1800); await snap(page, 'roads-curved-road'); ok('3D screenshots of a roundabout and a curved road');
  await tp(page, 20, 20); await sleep(800); await page.evaluate(() => document.querySelector('#minimap').click()); await page.waitForSelector('#bigmap .bm-canvas', { timeout: 8000 }); await sleep(800); await snap(page, 'roads-map-overview');
  await page.evaluate((r) => { window.__bigmap.v.k = 5; window.__bigmap.v.cx = r.x + 30; window.__bigmap.v.cz = r.z + 30; }, ra); await sleep(600); await snap(page, 'roads-map-roundabout');
  await page.evaluate(() => { const c = window.__game.city.roads.find(r => r.pts).pts[24]; window.__bigmap.v.k = 5; window.__bigmap.v.cx = c[0]; window.__bigmap.v.cz = c[1]; }); await sleep(600); await snap(page, 'roads-map-curve'); ok('map draws the curved road and the roundabout (screenshots)');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('ROADS SMOKE PASSED');
} catch (e) { failed = true; console.error('ROADS SMOKE FAILED:', e.message); try { await snap(await (await browser.pages()).at(-1), 'fail-roads'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
