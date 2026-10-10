// Ogun towns smoke (10 Oct 2026): Shagamu, Abeokuta and Ijebu Ode from the ground and the air, the rock, the motor park, the adire market, a road link.
// Usage: npm run build && node scripts/ogun-smoke.mjs   (screenshots go to ./screenshots/ogun-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { enterCity } from '../server/core/cities.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `screenshots/ogun-${name}.png` }); };
async function newPage(w = 1280, h = 760) { const p = await browser.newPage(); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false) => { await g(page, (from, to, hud) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = false; }, from, to, hud); await sleep(1600); };
const stats = (page) => g(page, () => { const r = window.__game.renderer.info; return { calls: r.render.calls, tris: r.render.triangles, colliders: window.__game.world.colliders.length, cars: window.__game.traffic.cars.length }; });
let failed = false;
try {
  console.log('Naija Area ogun smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; await g(page, () => fetch('/api/dev/cash', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: 50000 }) }));
  setClock(15 * 60); const costs = {};
  enterCity(s.app, uid, 'ogun-shagamu', { x: -20, z: 70, ry: 0 }); await settle(page, 'ogun-shagamu'); costs.shagamu = await stats(page);
  await cam(page, [-20, 70, 130], [-20, 0, 5]); await snap(page, 'shagamu-aerial'); await cam(page, [-60, 14, 40], [-20, 1, -22]); await snap(page, 'shagamu-motor-park'); await cam(page, [70, 22, 90], [70, 0, 50]); await snap(page, 'shagamu-interchange');
  ok('Shagamu: aerial, motor park, interchange');
  const sg = s.app.cities['ogun-shagamu']; const gate = sg.links.find(l => l.to === 'ogun-abeokuta'); await g(page, () => { document.body.classList.remove('shot'); window.__game.ctrl.avatar.visible = true; window.__game.ctrl.placeCamera = Object.getPrototypeOf(window.__game.ctrl).placeCamera; });
  await tp(page, gate.x - 2, gate.z); await page.waitForFunction(() => { const e = document.querySelector('#linkChip'); return e && !e.classList.contains('hidden'); }, { timeout: 15000 }); await sleep(300); await snap(page, 'shagamu-link-chip'); await page.evaluate(() => document.querySelector('#linkBtn').click()); await settle(page, 'ogun-abeokuta'); costs.abeokuta = await stats(page); ok('the road link from Shagamu took us to Abeokuta (page reloaded there)');
  const ab = s.app.cities['ogun-abeokuta']; const rock = ab.buildings.find(b => b.model === 'rock');
  await cam(page, [rock.x - 90, 40, rock.z + 80], [rock.x, 10, rock.z]); await snap(page, 'abeokuta-rock'); await cam(page, [-30, 12, 50], [-30, 0, 18]); await snap(page, 'abeokuta-adire-yard'); await cam(page, [10, 60, 110], [10, 0, 0]); await snap(page, 'abeokuta-aerial');
  setClock(20 * 60); await sleep(4500); await cam(page, [rock.x - 90, 40, rock.z + 80], [rock.x, 10, rock.z]); await snap(page, 'abeokuta-rock-night'); setClock(15 * 60); await sleep(4500); ok('Abeokuta: rock (day/night), adire yard, aerial');
  enterCity(s.app, uid, 'ogun-ijebu', { x: 15, z: 100, ry: 0 }); await settle(page, 'ogun-ijebu'); costs.ijebu = await stats(page); await cam(page, [15, 70, 130], [15, 0, 20]); await snap(page, 'ijebu-aerial'); await cam(page, [15, 14, 70], [15, 0, 22]); await snap(page, 'ijebu-palace-square'); ok('Ijebu Ode: aerial, palace square');
  console.log('  view cost (software GL):', JSON.stringify(costs));
  await g(page, () => { document.body.classList.remove('shot'); window.__game.ctrl.avatar.visible = true; window.__game.ctrl.placeCamera = Object.getPrototypeOf(window.__game.ctrl).placeCamera; });
  const v = s.app.cities['ogun-ijebu'].venueById.ij_venue_canteen; await tp(page, v.x, v.z); await g(page, (id) => window.__game.ui.place(id), v.id); await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 10000 }); await page.evaluate(() => document.querySelector('#venueEnter').click()); await sleep(3000); assert.ok(await g(page, () => window.__game.venue?.open)); await snap(page, 'ijebu-canteen-inside'); ok('canteen opens from the normal Enter flow');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401 GET \/api\/me/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('OGUN SMOKE PASSED');
} catch (e) { failed = true; console.error('OGUN SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await snap((await browser.pages()).at(-1), 'fail'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
