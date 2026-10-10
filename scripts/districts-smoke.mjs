// Expanded Lagos smoke (10 Oct 2026): loads every district in a real browser, takes screenshots of the landmarks and the bridge, uses a road link through the UI, opens a hotel and a club.
// Usage: npm run build && node scripts/districts-smoke.mjs   (screenshots go to ./screenshots/district-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { enterCity } from '../server/core/cities.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `screenshots/district-${name}.png` }); };
async function newPage(w = 1280, h = 760) { const p = await browser.newPage(); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false) => { await g(page, (from, to, hud) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = false; }, from, to, hud); await sleep(1600); };
const stats = (page) => g(page, () => { const r = window.__game.renderer.info; return { calls: r.render.calls, tris: r.render.triangles, colliders: window.__game.world.colliders.length, cars: window.__game.traffic.cars.length }; });
let failed = false; const perf = {};
try {
  console.log('Naija Area expanded-Lagos smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; await g(page, () => fetch('/api/dev/cash', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: 200000 }) }));
  const go = async (id, x, z) => { enterCity(s.app, uid, id, { x, z, ry: 0 }); await settle(page, id); };
  const C = (id) => s.app.cities[id];
  setClock(12 * 60);
  // ---- Lagos Island
  await go('lagos-island', 100, -2); const isl = C('lagos-island'); perf.island = await stats(page);
  const mosque = isl.buildings.find(b => b.model === 'mosque'), cath = isl.buildings.find(b => b.model === 'cathedral'), tbs = isl.landmarks.find(l => l.id === 'plaza'), mk = isl.buildings.find(b => b.kind === 'market');
  await cam(page, [mosque.x + 62, 18, mosque.z + 34], [mosque.x, 8, mosque.z]); await snap(page, 'island-mosque');
  await cam(page, [cath.x - 36, 16, cath.z + 58], [cath.x, 10, cath.z]); await snap(page, 'island-cathedral');
  await cam(page, [tbs.cx - 62, 24, tbs.cz + 62], [tbs.cx, 0, tbs.cz]); await snap(page, 'island-tbs-square');
  await cam(page, [mk.x + 42, 16, mk.z + 48], [mk.x, 2, mk.z]); await snap(page, 'island-balogun-market'); ok('Lagos Island loads (mosque, cathedral, square, market shots)');
  // ---- VI and Ikoyi
  await go('lagos-vi-ikoyi', -115, 128); const vi = C('lagos-vi-ikoyi'); perf.vi = await stats(page);
  await cam(page, [-148, 14, 178], [-115, 16, 113]); await snap(page, 'vi-eko-hotel');
  await cam(page, [58, 11, 24], [96, 0, -10]); await snap(page, 'vi-falomo-bridge');
  await cam(page, [128, 12, -92], [172, 0, -120]); await snap(page, 'vi-banana-causeway');
  setClock(21 * 60); await sleep(4500); await cam(page, [-248, 10, 160], [-215, 5, 118]); await snap(page, 'vi-quilox-front-night'); setClock(12 * 60); await sleep(4500); ok('Victoria Island and Ikoyi load (hotel, Falomo bridge, Banana causeway, club)');
  // hotel + club interiors through the normal Enter flow
  for (const [vid, name] of [['vi_venue_eko', 'vi-eko-lobby-inside'], ['vi_venue_quilox', 'vi-quilox-inside'], ['vi_venue_arts', 'vi-terra-kulture-inside'], ['vi_venue_cafe', 'vi-hard-rock-cafe-inside']]) {
    const v = vi.venueById[vid]; await cam(page, [v.x, 8, v.z + 16], [v.x, 1, v.z], true); await g(page, () => { document.body.classList.remove('shot'); window.__game.ctrl.avatar.visible = true; }); await tp(page, v.x, v.z); await g(page, (id) => window.__game.ui.place(id), vid);
    await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 10000 }); await page.evaluate(() => document.querySelector('#venueEnter').click()); await sleep(2800); assert.ok(await g(page, () => window.__game.venue?.open), vid + ' opened'); await snap(page, name); await page.evaluate(() => document.querySelector('#venueLeave').click()); await sleep(900); }
  ok('hotel lobby, club, arts venue and cafe open from the normal Enter flow');
  // ---- the Lekki-Ikoyi Bridge
  await go('lagos-bridge', -250, 0); const br = C('lagos-bridge').bridges[0]; perf.bridge = await stats(page);
  await cam(page, [-120, 5.5, 6.5], [0, 22, 0]); await snap(page, 'bridge-from-deck-west');
  await cam(page, [-70, 14, 78], [0, 16, 0]); await snap(page, 'bridge-side-view');
  setClock(21 * 60); await sleep(4500); await cam(page, [-70, 14, 78], [0, 16, 0]); await snap(page, 'bridge-side-view-night'); setClock(12 * 60); await sleep(4500);
  await cam(page, [0, 110, 80], [0, 8, 0]); await snap(page, 'bridge-aerial'); await cam(page, [95, 5.5, -6.5], [0, 22, 0]); await snap(page, 'bridge-from-deck-east');
  await cam(page, [-34, 4, 0], [0, 24, 0]); await snap(page, 'bridge-pylon-close');
  const cables = await g(page, () => { let n = 0; window.__game.scene.traverse(o => { if (o.isLineSegments && o.geometry.attributes.position.count >= 56) n = o.geometry.attributes.position.count / 2; }); return n; }); assert.equal(cables, 28, 'four groups of seven stay cables'); ok(`bridge deck, X-shaped pylon and 28 stay cables render (pylon ${br.pylonHeightAboveDeck} m above deck at scale ${br.scale})`);
  await g(page, () => { const c = window.__game.ctrl; c.avatar.visible = true; c.x = 0; c.z = 3.9; c.root.position.set(0, 0, 3.9); }); await sleep(300); const wc = await g(page, () => window.__game.world.colliders.filter(c => /^br_creek/.test(c.id)).length); assert.equal(wc, 2, 'creek colliders leave the deck strip free');
  // ---- Lekki
  await go('lagos-lekki', 150, 60); const lk = C('lagos-lekki'); perf.lekki = await stats(page);
  await cam(page, [130, 16, 92], [170, 0, 140]); await snap(page, 'lekki-eleko-beach'); await cam(page, [-40, 14, 118], [-80, 0, 176]); await snap(page, 'lekki-tarkwa-jetty'); await cam(page, [-50, 9, 150], [-80, 2, 240]); await snap(page, 'lekki-tarkwa-island'); ok('Lekki loads with Eleko Beach and the Tarkwa Bay jetty and island');
  await g(page, () => { document.body.classList.remove('shot'); window.__game.ctrl.avatar.visible = true; window.__game.ctrl.placeCamera = Object.getPrototypeOf(window.__game.ctrl).placeCamera; });
  // ---- road link through the UI: Lekki -> bridge
  const lg = lk.links[0]; await g(page, (x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), lg.x + 2, lg.z); await page.waitForFunction(() => { const e = document.querySelector('#linkChip'); return e && !e.classList.contains('hidden'); }, { timeout: 15000 }); await sleep(300); await snap(page, 'link-gate-chip');
  const txt = await g(page, () => document.querySelector('#linkBtn').textContent); assert.match(txt, /₦200/); await page.evaluate(() => document.querySelector('#linkBtn').click()); await settle(page, 'lagos-bridge'); const pos = await g(page, () => ({ x: window.__game.ctrl.x, z: window.__game.ctrl.z })); assert.ok(Math.hypot(pos.x - lg.arrive.x, pos.z - lg.arrive.z) < 15, 'arrived at the other gate road end: ' + JSON.stringify(pos)); ok('road link used from the chip: fare charged, now on the bridge');
  // ---- the mainland National Theatre
  await go('lagos-mainland', -202, 100); const th = C('lagos-mainland').buildings.find(b => b.model === 'theatre'); await cam(page, [th.x + 14, 12, th.z - 50], [th.x, 8, th.z]); await snap(page, 'mainland-national-theatre'); perf.mainland = await stats(page);
  console.log('  perf (software GL, desktop viewport):', JSON.stringify(perf));
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401 GET \/api\/me/.test(e) && !/status of 401/.test(e)); 
  assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('DISTRICTS SMOKE PASSED');
} catch (e) { failed = true; console.error('DISTRICTS SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await snap((await browser.pages()).at(-1), 'fail'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
