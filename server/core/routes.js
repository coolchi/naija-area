// Transport-agnostic route table. Express adapts it (server/index.js); the static demo adapts it to an in-browser fetch mock.
import { GameError, bad, cleanText } from './util.js';
import * as auth from './auth.js';
import * as eco from './economy.js';
import * as ads from './ads.js';
import * as world from './world.js';
import * as soc from './social.js';
import * as safety from './safety.js';
import * as venues from './venues.js';
import * as games from './games.js';
import * as cars from './cars.js';
import * as homes from './homes.js';
import { history, checkInvariants, moneySupply, balanceOf, cashId } from './ledger.js';
import { RATE_CARD, AD_POLICY } from '../config/ratecard.js';
import { GAME_NAME, GAME_TAGLINE, MIN_AGE } from '../config/game.js';

const R = [];
const route = (method, path, opts, handler) => { if (typeof opts === 'function') { handler = opts; opts = {}; } R.push({ method, path, parts: path.split('/').filter(Boolean), auth: opts.auth || 'none', handler, rate: opts.rate }); };

// ---- public / meta
route('GET', '/api/health', (c) => ({ ok: true, name: c.app.gameName, now: c.app.clock.now() }));
route('GET', '/api/config', (c) => ({ moodHappyAt: c.app.balance.mood.happyAt, name: c.app.gameName, tagline: GAME_TAGLINE, minAge: MIN_AGE, testMode: true, devRoutes: !!c.app.devRoutes, rotationMs: AD_POLICY.rotationMs, balanceNote: c.app.balance._note,
  topupOptions: c.app.balance.topup.options, transport: c.app.balance.transport, shopChannels: c.app.balance.shops.channels, workTask: c.app.balance.work.task, land: { risk: c.app.balance.land.risk }, maxNameLen: c.app.balance.housing.maxNameLen, housing: { rentPeriodMs: c.app.balance.housing.rentPeriodMs }, furniture: c.app.balance.housing.furniture }));
route('GET', '/api/city', (c) => { const { propertyById, shopById, jobLoc, billboardById, buildingById, plotById, placeById, area, ...rest } = c.app.city; return rest; });
route('GET', '/api/stats', (c) => {
  const a = c.app; const players = a.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=0').get().n; const bots = a.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=1').get().n;
  const live = a.db.prepare("SELECT COUNT(*) n FROM ad_campaigns WHERE status='live'").get().n;
  return { onlineNow: world.ccuNow(a), registeredPlayers: players, simulatedBots: bots, liveCampaigns: live, definition: 'onlineNow = distinct players whose game client sent a heartbeat in the last 60 s (server-counted). Bots are included in onlineNow but excluded from registeredPlayers.', serverTime: a.clock.now() };
});
route('GET', '/api/ads/ratecard', (c) => ({ ...RATE_CARD, maxUnits: Object.fromEntries(Object.entries(RATE_CARD.surfaces).flatMap(([s, v]) => Object.keys(v.tiers).map(t => [`${s}:${t}`, ads.maxUnits(c.app, s, t)]))), policy: { restricted: AD_POLICY.restrictedKeywords, prohibited: AD_POLICY.prohibitedKeywords }, test_mode: true }));

// ---- auth
route('POST', '/api/auth/signup', { rate: 'auth' }, async (c) => { const uid = await auth.signup(c.app, c.body, c.ipHash); c.out.session = uid; return { ok: true, user: eco.profile(c.app, uid) }; });
route('POST', '/api/auth/login', { rate: 'auth' }, async (c) => { const uid = await auth.login(c.app, c.body); c.out.session = uid; return { ok: true, user: eco.profile(c.app, uid) }; });
route('POST', '/api/auth/guest', { rate: 'auth' }, (c) => { const uid = auth.guest(c.app, c.body, c.ipHash); c.out.session = uid; return { ok: true, user: eco.profile(c.app, uid) }; });
route('POST', '/api/auth/logout', (c) => { if (c.uid) world.leaveWorld(c.app, c.uid); c.out.session = 'clear'; return { ok: true }; });
route('GET', '/api/me', { auth: 'user' }, (c) => ({ user: eco.profile(c.app, c.uid) }));

// ---- world
route('POST', '/api/heartbeat', { auth: 'user' }, (c) => world.heartbeat(c.app, c.uid, c.body || {}, { headless: c.headless }));
route('POST', '/api/chat', { auth: 'user' }, (c) => world.sendChat(c.app, c.uid, c.body.text));
route('GET', '/api/leaderboard', { auth: 'user' }, (c) => ({ rows: eco.leaderboard(c.app) }));

// ---- economy
route('GET', '/api/jobs', { auth: 'user' }, (c) => ({ jobs: eco.jobsFor(c.app, c.uid) }));
route('POST', '/api/jobs/start', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); const r = eco.startShift(c.app, c.uid, c.body.jobId); return { ok: true, endsAt: r.endsAt, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/jobs/claim', { auth: 'user' }, (c) => { const r = eco.claimShift(c.app, c.uid); return { ok: true, wage: r.wage, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/jobs/abandon', { auth: 'user' }, (c) => { eco.abandonShift(c.app, c.uid); return { ok: true, user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/shops', { auth: 'user' }, (c) => ({ shops: eco.shopsView(c.app), channels: c.app.balance.shops.channels }));
route('POST', '/api/shop/buy', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); const r = eco.shopBuy(c.app, c.uid, c.body.shopId, c.body.itemId, c.body.qty ?? 1, c.body.idem, c.body.channel || 'local'); return { ok: true, ...r, user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/properties', { auth: 'user' }, (c) => ({ properties: eco.listProperties(c.app, c.uid) }));
route('POST', '/api/property/acquire', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); eco.acquireProperty(c.app, c.uid, c.body.propertyId, c.body.mode, c.body.idem); return { ok: true, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/property/release', { auth: 'user' }, (c) => { const r = eco.releaseProperty(c.app, c.uid); return { ok: true, refund: r.refund, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/property/name', { auth: 'user' }, (c) => { const r = eco.nameProperty(c.app, c.uid, c.body.name); return { ok: true, name: r.name, user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/property/:id/interior', { auth: 'user' }, (c) => eco.interior(c.app, c.uid, c.params.id));
route('POST', '/api/property/furniture', { auth: 'user' }, (c) => { const r = eco.placeFurniture(c.app, c.uid, c.body.itemId, c.body.x, c.body.z, c.body.rot ?? 0, c.body.idem); return { ok: true, ...r, user: eco.profile(c.app, c.uid), interior: eco.interior(c.app, c.uid, eco.homeOf(c.app, c.uid).property_id) }; });
route('POST', '/api/property/furniture/sell', { auth: 'user' }, (c) => { const r = eco.sellFurniture(c.app, c.uid, c.body.itemId); return { ok: true, ...r, user: eco.profile(c.app, c.uid), interior: eco.interior(c.app, c.uid, eco.homeOf(c.app, c.uid).property_id) }; });
route('POST', '/api/property/enter', { auth: 'user' }, (c) => soc.enterHome(c.app, c.uid));
route('POST', '/api/property/leave', { auth: 'user' }, (c) => soc.leaveHome(c.app, c.uid));
route('POST', '/api/visit/knock', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return soc.knock(c.app, c.uid, c.body.propertyId); });
route('POST', '/api/visit/respond', { auth: 'user' }, (c) => soc.respondKnock(c.app, c.uid, c.body.knockId, c.body.accept === true));
route('POST', '/api/visit/cancel', { auth: 'user' }, (c) => soc.cancelKnock(c.app, c.uid));
route('POST', '/api/report', { auth: 'user' }, (c) => safety.createReport(c.app, c.uid, c.body));
route('POST', '/api/social/mute', { auth: 'user' }, (c) => safety.setBlock(c.app, c.uid, c.body.username, c.body.kind ?? null));
route('GET', '/api/social/blocks', { auth: 'user' }, (c) => ({ rows: safety.listBlocks(c.app, c.uid), reasons: safety.REASONS }));
route('GET', '/api/admin/reports', { auth: 'admin' }, (c) => ({ rows: safety.adminReports(c.app, c.query.status ? String(c.query.status).split(',') : ['open']) }));
route('POST', '/api/admin/reports/resolve', { auth: 'admin' }, (c) => safety.resolve(c.app, c.body.kind, c.body.target, c.body.action, c.body.note));
route('GET', '/api/venues', { auth: 'user' }, (c) => ({ venues: venues.venuesList(c.app) }));
route('GET', '/api/venue', { auth: 'user' }, (c) => venues.venueView(c.app, c.uid, String(c.query.id)));
route('POST', '/api/venue/enter', { auth: 'user' }, (c) => venues.enterVenue(c.app, c.uid, c.body.venueId, c.body.pos));
route('POST', '/api/venue/leave', { auth: 'user' }, (c) => venues.leaveVenue(c.app, c.uid));
route('POST', '/api/venue/act', { auth: 'user' }, (c) => venues.act(c.app, c.uid, c.body.venueId, c.body.stationId));
route('POST', '/api/game/sit', { auth: 'user' }, (c) => games.sit(c.app, c.uid, c.body.venueId, c.body.stationId, Number(c.body.stake) || 0));
route('GET', '/api/game', { auth: 'user' }, (c) => games.getMatch(c.app, c.uid, Number(c.query.id)));
route('POST', '/api/game/move', { auth: 'user' }, (c) => games.playMove(c.app, c.uid, Number(c.body.matchId), c.body));
route('POST', '/api/game/leave', { auth: 'user' }, (c) => games.resign(c.app, c.uid, Number(c.body.matchId)));
route('GET', '/api/scoreboard', { auth: 'user' }, (c) => games.scoreboard(c.app, { kind: c.query.kind, weekOffset: Number(c.query.weekOffset) || 0 }));
route('GET', '/api/garage', { auth: 'user' }, (c) => cars.garageView(c.app, c.uid));
route('POST', '/api/garage/buy', { auth: 'user' }, (c) => cars.buyCar(c.app, c.uid, c.body.model, c.body.idemKey));
route('POST', '/api/garage/use', { auth: 'user' }, (c) => cars.setActive(c.app, c.uid, Number(c.body.carId)));
route('POST', '/api/garage/sell', { auth: 'user' }, (c) => cars.sellCar(c.app, c.uid, Number(c.body.carId), c.body.idemKey));
route('POST', '/api/property/decor', { auth: 'user' }, (c) => homes.setDecor(c.app, c.uid, c.body.propertyId, c.body.wall, c.body.floor, c.body.idemKey));
route('POST', '/api/visit/love', { auth: 'user' }, (c) => homes.love(c.app, c.uid, c.body.propertyId));
route('POST', '/api/visit/act', { auth: 'user' }, (c) => homes.act(c.app, c.uid, c.body.propertyId, c.body.action));
route('POST', '/api/room/say', { auth: 'user' }, (c) => homes.say(c.app, c.uid, c.body.propertyId, c.body.text));
route('GET', '/api/room', { auth: 'user' }, (c) => homes.room(c.app, c.uid, String(c.query.propertyId), c.query.since));
route('POST', '/api/visit/kick', { auth: 'user' }, (c) => homes.kick(c.app, c.uid, c.body.propertyId, c.body.username));
route('POST', '/api/dm', { auth: 'user' }, (c) => soc.sendDm(c.app, c.uid, c.body.to, c.body.text));
route('GET', '/api/travel/quote', { auth: 'user' }, (c) => soc.travelQuote(c.app, c.uid, c.query.place));
route('POST', '/api/travel', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return { ...soc.travel(c.app, c.uid, c.body.placeId, c.body.mode, c.body.idem), user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/plots', { auth: 'user' }, (c) => ({ plots: soc.plotsView(c.app, c.uid) }));
route('POST', '/api/plot/buy', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); soc.buyPlot(c.app, c.uid, c.body.plotId, c.body.idem); return { ok: true, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/plot/sell', { auth: 'user' }, (c) => { const r = soc.sellPlot(c.app, c.uid, c.body.plotId); return { ...r, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/jobs/task/start', { auth: 'user' }, (c) => ({ ok: true, ...eco.taskStart(c.app, c.uid) }));
route('POST', '/api/jobs/task/stop', { auth: 'user' }, (c) => ({ ok: true, ...eco.taskStop(c.app, c.uid) }));
route('POST', '/api/bank', { auth: 'user' }, (c) => { eco.bankMove(c.app, c.uid, c.body.dir, c.body.amount, c.body.idem); return { ok: true, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/transfer', { auth: 'user' }, (c) => { const r = eco.transfer(c.app, c.uid, c.body.to, c.body.amount, c.body.idem); return { ...r, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/topup/test', { auth: 'user' }, (c) => { eco.testTopup(c.app, c.uid, c.body.amount, c.body.idem); return { ok: true, test: true, user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/ledger', { auth: 'user' }, (c) => ({ rows: history(c.app.db, c.uid, 30) }));
route('GET', '/api/notifications', { auth: 'user' }, (c) => ({ rows: eco.notifications(c.app, c.uid) }));

// ---- ads: public advertiser flow (test mode)
const needKey = (c) => { const a = ads.advertiserByKey(c.app, c.headers['x-advertiser-key'] || c.query.key); if (!a) bad('NEED_KEY', 'Advertiser access key required.', 401); return a; };
route('POST', '/api/advertiser/register', { rate: 'auth' }, (c) => { const a = ads.getOrCreateAdvertiser(c.app, { email: c.body.email, brand: c.body.brand }); return { ok: true, key: a.access_key, brand: a.brand_name, note: 'Keep this key: it is your dashboard login in test mode.' }; });
route('POST', '/api/ads/upload', { rate: 'auth' }, (c) => { const a = needKey(c); return { ok: true, ...ads.uploadCreative(c.app, a.id, c.raw, c.headers['content-type']) }; });
route('POST', '/api/ads/quote', (c) => ({ quote: ads.quote(c.app, c.body) }));
route('POST', '/api/ads/campaigns', { rate: 'auth' }, (c) => {
  const a = needKey(c); if (c.body.testModeAck !== true) bad('ACK_REQUIRED', 'Tick the box to confirm this is test mode (no payment).');
  const id = ads.createCampaign(c.app, a.id, c.body);
  return { ok: true, campaign: ads.advertiserCampaigns(c.app, a.id).find(x => x.id === id) };
});
route('GET', '/api/advertiser/campaigns', (c) => { const a = needKey(c); return { brand: a.brand_name, campaigns: ads.advertiserCampaigns(c.app, a.id) }; });
route('POST', '/api/ads/tap', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return ads.mintTap(c.app, c.uid, c.body.campaign, c.body.slot); });

// ---- admin
route('POST', '/api/admin/login', { rate: 'auth' }, (c) => { if (!c.app.adminPassword) bad('ADMIN_DISABLED', 'Admin is disabled: set ADMIN_PASSWORD.', 503); if (!c.app.platform.safeEqual(String(c.body.password || ''), c.app.adminPassword)) bad('BAD_LOGIN', 'Wrong password.', 401); c.out.admin = true; return { ok: true }; });
route('POST', '/api/admin/logout', (c) => { c.out.admin = 'clear'; return { ok: true }; });
route('GET', '/api/admin/queue', { auth: 'admin' }, (c) => ({ rows: ads.adminQueue(c.app, c.query.status ? String(c.query.status).split(',') : ['human_review']) }));
route('POST', '/api/admin/campaigns/:id/decision', { auth: 'admin' }, (c) => { const st = ads.decide(c.app, Number(c.params.id), c.body.decision, 'admin', c.body.reason); c.app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run('admin', 'ad_' + c.body.decision, `campaign ${c.params.id}: ${c.body.reason || ''}`, c.app.clock.now()); return { ok: true, status: st }; });
route('GET', '/api/admin/overview', { auth: 'admin' }, (c) => {
  const a = c.app, db = a.db; const byStatus = db.prepare('SELECT status, COUNT(*) n FROM ad_campaigns GROUP BY status').all();
  const faucets = db.prepare("SELECT id, balance FROM accounts WHERE kind='system' ORDER BY id").all();
  return { users: db.prepare('SELECT COUNT(*) n FROM users').get().n, online: world.ccuNow(a), moneySupply: moneySupply(db), systemAccounts: faucets, ledger: checkInvariants(db), campaignsByStatus: byStatus, interval: world.recommendedInterval(a, world.ccuNow(a)) };
});
route('GET', '/api/admin/ledger/:username', { auth: 'admin' }, (c) => { const u = c.app.db.prepare('SELECT id FROM users WHERE username=?').get(c.params.username); if (!u) bad('NO_USER', 'No such user', 404); return { rows: history(c.app.db, u.id, 100), balance: balanceOf(c.app.db, cashId(u.id)) }; });
route('POST', '/api/admin/tick', { auth: 'admin' }, (c) => ({ ads: ads.tickAds(c.app), rent: eco.tickRent(c.app), interest: eco.tickInterest(c.app), land: soc.tickLand(c.app) }));

// ---- dev (only when NA_DEV=1)
route('POST', '/api/dev/teleport', { auth: 'user' }, (c) => { if (!c.app.devRoutes) bad('NOT_FOUND', 'Not found', 404); world.teleport(c.app, c.uid, Number(c.body.x), Number(c.body.z)); return { ok: true }; });
route('POST', '/api/dev/cash', { auth: 'user' }, (c) => { if (!c.app.devRoutes) bad('NOT_FOUND', 'Not found', 404); eco.testTopup(c.app, c.uid, 1000); return { ok: true, user: eco.profile(c.app, c.uid) }; });

function match(method, path) {
  const segs = path.split('/').filter(Boolean);
  for (const r of R) {
    if (r.method !== method || r.parts.length !== segs.length) continue; const params = {}; let ok = true;
    for (let i = 0; i < segs.length; i++) { if (r.parts[i].startsWith(':')) params[r.parts[i].slice(1)] = decodeURIComponent(segs[i]); else if (r.parts[i] !== segs[i]) { ok = false; break; } }
    if (ok) return { r, params };
  }
  return null;
}

/** Transport-neutral dispatch. req: {method, path, query, body, raw, headers, ip, ua, uid, isAdmin}. Returns {status, json, session, admin} */
export async function dispatch(app, req) {
  const m = match(req.method, req.path);
  if (!m) return { status: 404, json: { error: 'NOT_FOUND', message: 'Unknown endpoint.' } };
  const { r, params } = m; const now = app.clock.now();
  const ctx = { app, uid: req.uid, body: req.body || {}, query: req.query || {}, params, headers: req.headers || {}, raw: req.raw, ip: req.ip, ipHash: req.ip ? app.platform.sha256(String(req.ip)).slice(0, 16) : null, headless: /headless/i.test(req.ua || ''), out: {} };
  try {
    if (r.auth === 'user' && !req.uid) throw new GameError('LOGIN_REQUIRED', 'Please log in.', 401);
    if (r.auth === 'admin' && !req.isAdmin) throw new GameError('ADMIN_REQUIRED', 'Admin login required.', 401);
    if (r.rate === 'auth' && !app.limiter.hit(`auth:${req.ip}:${r.path}`, app.balance.rate.authPerMin, 60000, now)) throw new GameError('RATE_LIMIT', 'Too many attempts, wait a minute.', 429);
    if (r.method === 'POST' && req.uid && r.path !== '/api/heartbeat' && !app.limiter.hit(`act:${req.uid}`, app.balance.rate.actionsPerMin, 60000, now)) throw new GameError('RATE_LIMIT', 'Slow down a little.', 429);
    if (r.path === '/api/auth/guest' && !app.limiter.hit(`guest:${req.ip}`, app.balance.rate.guestPerHourPerIp, 3600000, now)) throw new GameError('RATE_LIMIT', 'Too many guest accounts from this network.', 429);
    const json = await r.handler(ctx);
    return { status: 200, json, session: ctx.out.session, admin: ctx.out.admin };
  } catch (e) {
    if (e instanceof GameError) return { status: e.status, json: { error: e.code, message: e.message, ...e.extra } };
    if (e && /SQLITE_CONSTRAINT/.test(e.code || e.message || '')) return { status: 409, json: { error: 'CONFLICT', message: 'That action conflicted with another one. Try again.' } };
    console.error('[route error]', r.path, e); return { status: 500, json: { error: 'SERVER_ERROR', message: 'Something went wrong on our side.' } };
  }
}
