// Abule smoke (10 Oct 2026): the village from the ground and the air: huts, market square, well, stream and footbridge, farm, goat pen, chapel, palm road, village hall, farm job.
// Usage: npm run build && node scripts/abule-smoke.mjs   (screenshots go to ./screenshots/abule-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { enterCity } from '../server/core/cities.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `screenshots/abule-${name}.png` }); };
async function newPage(w = 1280, h = 760) { const p = await browser.newPage(); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false) => { await g(page, (from, to, hud) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = false; }, from, to, hud); await sleep(1600); };
const stats = (page) => g(page, () => { const r = window.__game.renderer.info; return { calls: r.render.calls, tris: r.render.triangles, colliders: window.__game.world.colliders.length, cars: window.__game.traffic.cars.length }; });
let failed = false;
try {
  console.log('Naija Area abule smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; await g(page, () => fetch('/api/dev/cash', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: 50000 }) }));
  setClock(15 * 60); enterCity(s.app, uid, 'ogun-abule', { x: 10, z: 12, ry: 0 }); await settle(page, 'ogun-abule'); const st = await stats(page); console.log('  abule view cost (software GL):', JSON.stringify(st));
  const ab = s.app.cities['ogun-abule']; const hut = ab.buildings.find(b => b.kind === 'hut'); const chapel = ab.buildings.find(b => b.model === 'chapel');
  await cam(page, [10, 90, 140], [0, 0, 0]); await snap(page, 'aerial'); await cam(page, [-20, 12, 5], [-100, 3, 55]); await snap(page, 'farm'); await cam(page, [-60, 8, 80], [-108, 1, 98]); await snap(page, 'goat-pen'); await cam(page, [-10, 6, 35], [-32, 1, 22]); await snap(page, 'well');
  await cam(page, [5, 18, 10], [5, 0, 48]); await snap(page, 'market-square'); await cam(page, [30, 8, 14], [66, 0, 0]); await snap(page, 'stream-footbridge'); await cam(page, [-60, 6, 14], [60, 3, 0]); await snap(page, 'palm-road');
  await cam(page, [hut.x - 30, 12, hut.z + 30], [hut.x, 2, hut.z]); await snap(page, 'huts'); await cam(page, [chapel.x - 35, 12, chapel.z + 30], [chapel.x, 4, chapel.z]); await snap(page, 'chapel');
  setClock(20 * 60); await sleep(4500); await cam(page, [5, 18, 10], [5, 0, 48]); await snap(page, 'market-square-night'); setClock(15 * 60); await sleep(4500);
  ok('screenshots: aerial, farm, goat pen, well, market square (day/night), footbridge, palm road, huts, chapel');
  await g(page, () => { document.body.classList.remove('shot'); window.__game.ctrl.avatar.visible = true; window.__game.ctrl.placeCamera = Object.getPrototypeOf(window.__game.ctrl).placeCamera; });
  const jp = ab.jobs.find(j => j.id === 'job_farm'); await tp(page, jp.x, jp.z); await g(page, () => window.__game.ui.openJobs?.()); await sleep(800); const jobs = await g(page, () => fetch('/api/jobs').then(r => r.json())); assert.ok(jobs.jobs.some(j => j.id === 'farm' && j.available !== false)); ok('the Farm Hand job is offered at the farm');
  const v = ab.venueById.al_venue_hall; await tp(page, v.x, v.z); await g(page, (id) => window.__game.ui.place(id), v.id); await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 10000 }); await page.evaluate(() => document.querySelector('#venueEnter').click()); await sleep(3000); assert.ok(await g(page, () => window.__game.venue?.open)); await snap(page, 'hall-inside'); ok('the village hall opens from the normal Enter flow');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401 GET \/api\/me/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('ABULE SMOKE PASSED');
} catch (e) { failed = true; console.error('ABULE SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await snap((await browser.pages()).at(-1), 'fail'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
