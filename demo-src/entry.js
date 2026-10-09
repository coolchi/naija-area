// "Naija Area" static demo: the REAL server core (same game rules, ledger, economy, ads, games) runs inside this page on sql.js.
// Nothing is sent anywhere; reload = a fresh world. Opens by double-click (file://): no server, no network.
import initSqlJs from 'sql.js/dist/sql-asm.js';
import bcrypt from 'bcryptjs';
import { wrapSqlJs } from '../server/lib/sqljs-adapter.js';
import { createApp } from '../server/core/app.js';
import { dispatch } from '../server/core/routes.js';
import { BALANCE } from '../server/config/balance.js';
import city from '../server/config/cities/lagos-mainland.json';
import * as ads from '../server/core/ads.js';
import { tickRent, tickInterest } from '../server/core/economy.js';
import { tickLand } from '../server/core/social.js';
import { tickGames } from '../server/core/games.js';
import { pruneWorld } from '../server/core/world.js';
import { startBots } from '../server/bots.js';
import { startPracticeBot } from '../server/core/practice-bot.js';
import { sha256hex, hmacB64url } from './sha.js';

const enc = new TextEncoder();
const platform = {
  hash: (pw) => bcrypt.hash(pw, 4), verify: (pw, h) => bcrypt.compare(pw, h), dummyHash: bcrypt.hashSync('dummy-password-for-timing', 4),
  sha256: (b) => sha256hex(typeof b === 'string' ? enc.encode(b) : b), randomHex: (n) => [...crypto.getRandomValues(new Uint8Array(n))].map(x => x.toString(16).padStart(2, '0')).join(''),
  hmac: (s) => hmacB64url('demo-secret', s), b64url: (s) => btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''), fromB64url: (s) => atob(s.replace(/-/g, '+').replace(/_/g, '/')),
  safeEqual: (a, b) => String(a) === String(b), secret: 'demo-secret'
};
window.__naDemo = true;
const state = { uid: null, admin: false, urls: new Map() }; let app = null;

async function makeBanner(w, hh, col, text) { // placeholder creative drawn on a canvas (PNG bytes)
  const c = document.createElement('canvas'); c.width = w; c.height = hh; const g = c.getContext('2d'); g.fillStyle = `rgb(${col})`; g.fillRect(0, 0, w, hh); g.fillStyle = 'rgba(255,255,255,.18)'; for (let x = -hh; x < w; x += 96) { g.beginPath(); g.moveTo(x, hh); g.lineTo(x + 48, hh); g.lineTo(x + 48 + hh, 0); g.lineTo(x + hh, 0); g.fill(); }
  g.fillStyle = '#fff'; g.font = '800 64px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = '#0008'; g.shadowBlur = 8; g.fillText(text, w / 2, hh / 2); g.font = '700 30px system-ui'; g.fillText('DEMO AD · placeholder', w / 2, hh / 2 + 70);
  const blob = await new Promise(r => c.toBlob(r, 'image/png')); return new Uint8Array(await blob.arrayBuffer());
}
async function boot() {
  const SQL = await initSqlJs(); const db = wrapSqlJs(SQL); db.pragma('foreign_keys = ON');
  app = createApp({ db, platform, cityJson: city, balance: structuredClone(BALANCE) }); app.devRoutes = true; app.adminPassword = 'admin-demo';
  const brands = [['Mama Tee Foods (demo)', 'Fresh jollof, hot every day', '0,135,81', 'road_billboard', 'major'], ['Naija Data (demo)', 'Data that no dey finish', '200,120,0', 'road_billboard', 'street'], ['Lagoon Realty (demo)', 'Your plot, your future', '40,90,160', 'lagoon_plot', 'plot6x6']];
  for (const [brand, headline, col, surface, tier] of brands) {
    const a = ads.getOrCreateAdvertiser(app, { email: brand.split(' ')[0].toLowerCase() + '@example.com', brand }); const img = await makeBanner(surface === 'lagoon_plot' ? 768 : 1024, surface === 'lagoon_plot' ? 768 : 512, col, brand.replace(' (demo)', ''));
    const up = ads.uploadCreative(app, a.id, img, 'image/png'); const id = ads.createCampaign(app, a.id, { surface, tier, units: 1, days: 30, creativeId: up.creativeId, headline, linkUrl: 'https://example.com/', testModeAck: true }, { demo: true });
    if (app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status === 'human_review') ads.decide(app, id, 'approve', 'demo', 'demo');
  }
  ads.tickAds(app); startBots(app, 6); startPracticeBot(app);
  setInterval(() => { try { ads.tickAds(app); } catch (e) { console.error(e); } }, 5000); setInterval(() => { try { tickRent(app); tickInterest(app); tickLand(app); tickGames(app); pruneWorld(app); } catch (e) { console.error(e); } }, 30000);
}
const ready = boot();
window.__naMedia = (id) => { let u = state.urls.get(id); if (!u) { const c = ads.getCreative(app, Number(id)); if (!c) return ''; u = URL.createObjectURL(new Blob([c.data], { type: c.mime })); state.urls.set(id, u); } return u; };
const realFetch = window.fetch.bind(window);
window.fetch = async (input, opts = {}) => {
  const url = typeof input === 'string' ? input : input.url; if (!url.startsWith('/api')) { if (url.startsWith('/go/') || url.startsWith('/media/')) return new Response('', { status: 204 }); return realFetch(input, opts); }
  await ready; const [path, qs] = url.split('?'); const query = Object.fromEntries(new URLSearchParams(qs || '')); const method = (opts.method || 'GET').toUpperCase(); let body = {}, raw;
  if (opts.body instanceof Uint8Array || opts.body instanceof ArrayBuffer || opts.body instanceof Blob) raw = new Uint8Array(opts.body instanceof Blob ? await opts.body.arrayBuffer() : opts.body); else if (typeof opts.body === 'string' && opts.body) { try { body = JSON.parse(opts.body); } catch { body = {}; } }
  const headers = Object.fromEntries(Object.entries(opts.headers || {}).map(([k, v]) => [k.toLowerCase(), v]));
  if (state.uid && !app.db.prepare('SELECT 1 FROM users WHERE id=?').get(state.uid)) state.uid = null;
  const r = await dispatch(app, { method, path, query, body, raw, headers, ip: '127.0.0.1', ua: navigator.userAgent, uid: state.uid, isAdmin: state.admin });
  if (r.session === 'clear') state.uid = null; else if (r.session) state.uid = r.session; if (r.admin === 'clear') state.admin = false; else if (r.admin) state.admin = true;
  return new Response(JSON.stringify(r.json), { status: r.status, headers: { 'content-type': 'application/json' } });
};
