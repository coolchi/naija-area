import { adminSettings, ipAllowed } from './core/admin-guard.js';
import { newMetrics, observe, renderMetrics, metricsAllowed } from './core/metrics.js';
import { monitorEventLoopDelay } from 'node:perf_hooks';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import Database from 'better-sqlite3';
import { openManaged } from './lib/pg-migrate.js';
import { WebSocketServer } from 'ws';
import { createApp } from './core/app.js';
import { nodePlatform } from './platform-node.js';
import { dispatch } from './core/routes.js';
import { getCreative, handleTap, tickAds } from './core/ads.js';
import { tickScores } from './core/scores.js';
import { tickRent, tickInterest } from './core/economy.js';
import { tickSeasons } from './core/seasons.js';
import { pruneWorld } from './core/world.js';
import { tickLand } from './core/social.js';
import { tickGames } from './core/games.js';
import { GameError } from './core/util.js';
import { voiceAudio as phoneVoice, tickVoice, tickCalls } from './core/phone/phone.js';
import { BALANCE } from './config/balance.js';
import { PAYMENTS } from './config/payments.js';
import { AGE } from './config/age.js';
import { createAge, tickAge } from './core/age/index.js';
import { staticCompress, sendJson } from './lib/compress.js';
import { mockAgeProvider } from './core/age/providers.js';
import { createPayments, tickPayments } from './core/payments/index.js';
import { mockProvider, monipayProvider } from './core/payments/providers.js';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '..');

export function loadCity(file = path.join(here, 'config/cities/lagos-mainland.json')) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
/** city registry (config/cities/index.json): the default city plus every other enabled city */
export function loadRegistry(dir = path.join(here, 'config/cities'), env = process.env) {
  const reg = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8')); const on = reg.cities.filter(c => c.enabled !== false || (c.preview && env.NA_PREVIEW_CITIES === '1')); /* preview cities only load when NA_PREVIEW_CITIES=1 */ const def = on.find(c => c.id === reg.default) || on[0];
  return { cityJson: loadCity(path.join(dir, def.file)), extraCities: on.filter(c => c !== def).map(c => loadCity(path.join(dir, c.file))) };
}

export function buildServer(opts = {}) {
  const env = process.env;
  const dataDir = opts.dataDir || env.NA_DATA_DIR || path.join(ROOT, 'data');
  // database engine: SQLite by default (tests, the static demo, small installs); Postgres when NA_DATABASE_URL (or opts.databaseUrl) is set. See docs/POSTGRES.md.
  const databaseUrl = opts.databaseUrl ?? env.NA_DATABASE_URL ?? null;
  const dbPath = databaseUrl ? ':memory:' : (opts.dbPath ?? env.NA_DB ?? path.join(dataDir, 'naija-area.db'));
  let db;
  if (databaseUrl) {
    db = openManaged({ url: databaseUrl, schema: opts.databaseSchema ?? env.NA_DB_SCHEMA ?? null, ssl: opts.databaseSsl ?? (env.NA_DB_SSL === '1' ? { rejectUnauthorized: env.NA_DB_SSL_STRICT !== '0' } : null), autoMigrate: opts.autoMigrate ?? env.NA_DB_AUTOMIGRATE !== '0', singleInstance: env.NA_DB_SINGLE_INSTANCE !== '0', log: opts.quiet ? undefined : (m) => console.log('[db]', m) });
  } else {
    if (dbPath !== ':memory:') fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON'); db.pragma('busy_timeout = 5000');
  }
  // voice notes live outside the database (disk here; object storage later). With Postgres they sit in the data directory next to the app.
  const voiceDir = databaseUrl ? path.join(dataDir, 'voice') : dbPath === ':memory:' ? null : path.join(path.dirname(dbPath), 'voice');
  const platform = opts.platform || nodePlatform({ dataDir });
  const prod = env.NODE_ENV === 'production';
  const app = createApp({ db, platform, ...(opts.cityJson ? { cityJson: opts.cityJson, extraCities: opts.extraCities || [] } : loadRegistry()), balance: opts.balance || BALANCE, clock: opts.clock, filterHeadless: opts.filterHeadless ?? env.NA_FILTER_HEADLESS !== '0' });
  if (voiceDir) { fs.mkdirSync(voiceDir, { recursive: true }); const f = (k) => path.join(voiceDir, Buffer.from(k).toString('base64url')); app.voiceStore = { put: (k, b) => fs.writeFileSync(f(k), b), get: (k) => { try { return fs.readFileSync(f(k)); } catch { return null; } }, del: (k) => { try { fs.unlinkSync(f(k)); } catch { /* already gone */ } } }; }
  // payments (TEST MODE ONLY): provider chosen by NA_PAYMENTS_PROVIDER (mock | monipay with pri_test_ keys), or injected by tests
  { const pcfg = opts.paymentsConfig || PAYMENTS; const prov = opts.paymentsProvider || (pcfg.provider === 'monipay'
      ? monipayProvider({ platform, secretKey: env.MONIPAY_SECRET_KEY, publicKey: env.MONIPAY_PUBLIC_KEY, webhookSecret: env.MONIPAY_WEBHOOK_SECRET, baseUrl: pcfg.baseUrl })
      : mockProvider({ platform, now: () => app.clock.now() }));
    if (opts.payments !== false) createPayments(app, { provider: prov, cfg: pcfg }); }
  // real age checks: no vendor is chosen, so only the stand-in provider exists. Never allowed to be the gate in production.
  { const acfg = opts.ageConfig || AGE; const aprov = opts.ageProvider || (acfg.provider === 'mock' ? mockAgeProvider({ platform, now: () => app.clock.now(), ttlMs: acfg.sessionTtlMs }) : (() => { throw new Error(`Unknown age provider "${acfg.provider}": no vendor is chosen yet (NA_AGE_PROVIDER=mock)`); })());
    if (prod && aprov.id === 'mock' && acfg.mode !== 'off') throw new Error('The mock age provider cannot be the age gate in production. Choose a vendor first.');
    if (prod && app.payments?.provider.id === 'mock') throw new Error('The mock payments provider cannot run in production.');
    if (opts.age !== false) createAge(app, { provider: aprov, cfg: acfg }); }
  app.devRoutes = opts.dev ?? env.NA_DEV === '1';
  // admin password: env var; a fixed default exists ONLY outside production, with a loud warning
  app.adminPassword = opts.adminPassword ?? env.ADMIN_PASSWORD ?? (prod ? null : 'admin-dev-only');
  if (!env.ADMIN_PASSWORD && !prod && !opts.quiet) console.warn('[admin] ADMIN_PASSWORD not set: using the DEV-ONLY default "admin-dev-only". Never do this in production.');
  app.adminCfg = adminSettings({ ...env, ...(opts.adminEnv || {}) }, { prod });
  if (app.adminCfg.secretInvalid) throw new Error('ADMIN_TOTP_SECRET is not valid base32 (at least 16 characters). Create one with: node tools/admin-totp.mjs');
  if (prod && app.adminCfg.optOut && !app.adminCfg.secret && !opts.quiet) console.warn('[admin] NA_ADMIN_2FA=off in production: the admin login is password-only. Do not launch like this.');
  app.metrics = newMetrics(); app.metricsToken = opts.metricsToken ?? env.NA_METRICS_TOKEN ?? null; const loop = monitorEventLoopDelay({ resolution: 20 }); loop.enable(); app.metrics.loop = loop; const loopTimer = setInterval(() => loop.reset(), 60000); loopTimer.unref?.();
  const sockets = new Map();
  app.pushUser = (uid, msg) => { const s = sockets.get(uid); if (s) for (const ws of s) if (ws.readyState === 1) ws.send(JSON.stringify(msg)); };

  const ex = express(); ex.disable('x-powered-by'); ex.set('trust proxy', /^\d+$/.test(env.NA_TRUST_PROXY || '') ? Number(env.NA_TRUST_PROXY) : false); // NA_TRUST_PROXY=N: believe the last N proxies (1 = one proxy in front). A number, not `true`, so a player cannot fake their address with their own X-Forwarded-For header.
  ex.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'same-origin'); res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: blob:; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws: wss:; font-src 'self'; media-src 'self' data: blob: https://*.streamguys1.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'");
    next();
  });
  // admin surfaces: optional IP allow-list (NA_ADMIN_ALLOW_IPS), never cached, never indexed. A blocked address gets a plain 404 so the page is not even confirmed to exist.
  ex.use((req, res, next) => {
    if (!/^\/(admin(\.html)?|js\/admin[\w-]*\.js|api\/admin(\/|$))/.test(req.path)) return next();
    if (!ipAllowed(app.adminCfg.allow, req.ip)) return res.status(404).type('text/plain').send('Not found');
    res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Robots-Tag', 'noindex, nofollow'); next();
  });
  // ---- cookies (HMAC signed; no external cookie lib)
  const parseCookies = (h) => Object.fromEntries(String(h || '').split(';').map(s => s.trim().split(/=(.*)/s).slice(0, 2)).filter(a => a[0]));
  const sign = (s) => platform.hmac(s);
  const mkSession = (uid) => { const exp = Date.now() + 14 * 86400000; const v = `${uid}.${exp}`; return `${v}.${sign('s:' + v)}`; };
  const readSession = (cookie) => { if (!cookie) return null; const [uid, exp, sig] = cookie.split('.'); if (!sig || !platform.safeEqual(sig, sign(`s:${uid}.${exp}`)) || Number(exp) < Date.now()) return null; return Number(uid); };
  const mkAdmin = () => { const exp = Date.now() + 8 * 3600000; return `admin.${exp}.${sign('a:' + exp)}`; };
  const readAdmin = (cookie) => { if (!cookie) return false; const [t, exp, sig] = cookie.split('.'); return t === 'admin' && !!sig && platform.safeEqual(sig, sign('a:' + exp)) && Number(exp) > Date.now(); };
  const cookieAttrs = `Path=/; HttpOnly; SameSite=Lax${prod ? '; Secure' : ''}`;

  const sessionUid = (req) => { const uid = readSession(parseCookies(req.headers.cookie).na_s); if (!uid) return null; return uid; };
  // voice notes: only the two people in the thread may fetch the audio
  ex.get('/api/phone/voice/:id', (req, res) => {
    try { const uid = readSession(parseCookies(req.headers.cookie).na_s); if (!uid) return res.status(401).json({ error: 'AUTH' }); const a = phoneVoice(app, uid, req.params.id); res.setHeader('Content-Type', a.mime); res.setHeader('Cache-Control', 'private, max-age=3600'); res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox"); res.setHeader('Content-Length', a.data.length); res.end(a.data); }
    catch (e) { if (e instanceof GameError) return res.status(e.status).json({ error: e.code, message: e.message }); console.error(e); res.status(500).end(); }
  });
  ex.use('/api/payments/webhook', express.raw({ type: () => true, limit: '100kb' })); // the signature is over the exact bytes, so keep them raw
  ex.use('/api/age/webhook', express.raw({ type: () => true, limit: '20kb' }));
  ex.use('/api', express.json({ limit: '100kb' }));
  ex.use('/api', express.raw({ type: ['image/png', 'image/jpeg', 'image/webp', 'application/octet-stream', 'audio/webm', 'audio/ogg', 'audio/mp4'], limit: '1.2mb' }));
  ex.use('/api', async (req, res) => {
    try {
      if (req.method === 'POST') { // same-origin only for state-changing calls
        const o = req.headers.origin; if (o) { try { if (new URL(o).host !== req.headers.host) return res.status(403).json({ error: 'BAD_ORIGIN', message: 'Cross-site request blocked.' }); } catch { return res.status(403).json({ error: 'BAD_ORIGIN' }); } }
      }
      const cookies = parseCookies(req.headers.cookie); let uid = readSession(cookies.na_s);
      if (uid && !db.prepare('SELECT 1 FROM users WHERE id=?').get(uid)) uid = null;
      const isRaw = Buffer.isBuffer(req.body); const t0 = performance.now();
      const r = await dispatch(app, { method: req.method, path: req.path.startsWith('/api') ? req.path : '/api' + req.path, query: req.query, body: isRaw ? {} : (req.body || {}), raw: isRaw ? req.body : undefined, headers: req.headers, ip: req.ip, ua: req.headers['user-agent'], uid, isAdmin: readAdmin(cookies.na_a) });
      observe(app, r.status, performance.now() - t0);
      if (r.session === 'clear') res.append('Set-Cookie', `na_s=; Max-Age=0; ${cookieAttrs}`); else if (r.session) res.append('Set-Cookie', `na_s=${mkSession(r.session)}; Max-Age=${14 * 86400}; ${cookieAttrs}`);
      if (r.admin === 'clear') res.append('Set-Cookie', `na_a=; Max-Age=0; ${cookieAttrs}`); else if (r.admin) res.append('Set-Cookie', `na_a=${mkAdmin()}; Max-Age=${8 * 3600}; ${cookieAttrs}`);
      res.setHeader('Cache-Control', 'no-store'); sendJson(req, res, r.status, r.json);
    } catch (e) { console.error(e); res.status(500).json({ error: 'SERVER_ERROR', message: 'Something went wrong.' }); }
  });
  ex.use((err, req, res, next) => { if (err) return res.status(err.status === 413 ? 413 : 400).json({ error: err.status === 413 ? 'TOO_BIG' : 'BAD_REQUEST', message: err.status === 413 ? 'Upload too large.' : 'Bad request.' }); next(); });

  // creatives: public only once an ad is scheduled/live/completed; admins and the owning advertiser can preview earlier
  ex.get('/media/creative/:id', (req, res) => {
    const id = Number(req.params.id); const c = Number.isInteger(id) ? getCreative(app, id) : null; if (!c) return res.status(404).end();
    // a design is public once it is APPROVED in a campaign that is scheduled/live/completed (a rejected design of a running campaign stays private); a campaign with no design rows (pre-migration data) falls back to its one creative
    const pub = db.prepare("SELECT 1 FROM ad_campaign_creatives k JOIN ad_campaigns c ON c.id=k.campaign_id WHERE k.creative_id=? AND k.status='approved' AND c.status IN ('scheduled','live','completed')").get(id)
      || db.prepare("SELECT 1 FROM ad_campaigns c WHERE c.creative_id=? AND c.status IN ('scheduled','live','completed') AND NOT EXISTS (SELECT 1 FROM ad_campaign_creatives k WHERE k.campaign_id=c.id)").get(id);
    let ok = !!pub;
    if (!ok) { if (readAdmin(parseCookies(req.headers.cookie).na_a)) ok = true; else { const k = req.query.key; if (k) { const a = db.prepare('SELECT id FROM advertisers WHERE access_key=?').get(String(k)); if (a && a.id === c.advertiser_id) ok = true; } } }
    if (!ok) return res.status(404).end();
    res.setHeader('Content-Type', c.mime); res.setHeader('Cache-Control', 'public, max-age=3600'); res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox"); res.end(c.data);
  });
  // tap redirect (signed token, counted server-side)
  ex.get('/go/:token', (req, res) => {
    try { const url = handleTap(app, req.params.token, { headless: /headless/i.test(req.headers['user-agent'] || '') }); res.redirect(302, url); }
    catch (e) { if (e instanceof GameError) return res.status(e.status).type('text/plain').send(e.message); console.error(e); res.status(500).end(); }
  });
  // ---- health for load balancers, Docker, uptime monitors (no login, no secrets, never cached). /healthz = the process is up. /readyz = it can also reach its database.
  const startedAt = Date.now(); let version = null; try { version = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version; } catch { /* no package.json next to the app */ }
  ex.get('/healthz', (req, res) => { res.setHeader('Cache-Control', 'no-store'); res.type('text/plain').send('ok'); });
  ex.get('/readyz', (req, res) => { res.setHeader('Cache-Control', 'no-store'); try { db.prepare('SELECT 1 AS ok').get(); res.json({ ok: true, db: databaseUrl ? 'postgres' : 'sqlite', uptimeSec: Math.round((Date.now() - startedAt) / 1000), version }); } catch (e) { console.error('readyz: database check failed:', e.message); res.status(503).json({ ok: false, db: databaseUrl ? 'postgres' : 'sqlite', error: 'DATABASE_UNAVAILABLE' }); } });
  ex.get('/metrics', (req, res) => { res.setHeader('Cache-Control', 'no-store'); if (!metricsAllowed(app, { authHeader: req.headers.authorization, isAdmin: readAdmin(parseCookies(req.headers.cookie).na_a), token: app.metricsToken })) return res.status(404).type('text/plain').send('Not found'); res.type('text/plain; version=0.0.4').send(renderMetrics(app, { version, wsClients: [...sockets.values()].reduce((n, x) => n + x.size, 0) })); });
  const pub = opts.publicDir || path.join(ROOT, 'public');
  const pages = { '/advertise': 'advertise.html', '/advertiser': 'advertiser.html', '/admin': 'admin.html', '/methodology': 'methodology.html', '/play': 'index.html', '/terms': 'terms.html', '/privacy': 'privacy.html', '/refunds': 'refunds.html', '/contact': 'contact.html' };
  for (const [u, f] of Object.entries(pages)) ex.get(u, (req, res) => res.sendFile(path.join(pub, f)));
  ex.use(staticCompress(pub));
  ex.use(express.static(pub, { index: 'index.html', maxAge: '5m', extensions: ['html'] }));
  ex.use((req, res) => res.status(404).type('text/plain').send('Not found'));

  const server = http.createServer(ex);
  const wss = new WebSocketServer({ noServer: true });
  server.on('upgrade', (req, socket, head) => {
    if (req.url !== '/ws') return socket.destroy();
    const uid = sessionUid(req); if (!uid) return socket.destroy();
    wss.handleUpgrade(req, socket, head, (ws) => {
      if (!sockets.has(uid)) sockets.set(uid, new Set()); sockets.get(uid).add(ws);
      ws.on('close', () => { const s = sockets.get(uid); s?.delete(ws); if (s && !s.size) sockets.delete(uid); });
      ws.on('error', () => {}); ws.send(JSON.stringify({ type: 'hello' }));
    });
  });
  const timers = [];
  function startTimers() {
    tickScores(app).catch((e) => console.error('tickScores', e));
    timers.push(setInterval(() => { tickScores(app).catch((e) => console.error('tickScores', e)); }, 30000)); // one job for all viewers; it only calls the provider when due and under the daily cap
    timers.push(setInterval(() => { try { tickAge(app); } catch (e) { console.error('tickAge', e); } }, 60000));
    timers.push(setInterval(() => { tickPayments(app).catch((e) => console.error('tickPayments', e)); }, 15000)); // asks the provider about payments whose webhook never came; sends recorded refunds
    timers.push(setInterval(() => { try { tickCalls(app); } catch (e) { console.error('tickCalls', e); } }, 1000));
    timers.push(setInterval(() => { try { tickAds(app); } catch (e) { console.error('tickAds', e); } }, 5000));
    timers.push(setInterval(() => { try { tickRent(app); tickInterest(app); tickLand(app); tickGames(app); pruneWorld(app); tickVoice(app); tickSeasons(app); } catch (e) { console.error('tick', e); } }, 30000));
  }
  const close = () => new Promise((resolve) => { timers.forEach(clearInterval); clearInterval(loopTimer); loop.disable(); for (const s of sockets.values()) for (const ws of s) ws.terminate(); wss.close(); server.close(() => { try { db.close(); } catch {} resolve(); }); server.closeAllConnections?.(); });
  return { app, db, server, startTimers, close, sockets, ex };
}
