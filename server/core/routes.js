// Transport-agnostic route table. Express adapts it (server/index.js); the static demo adapts it to an in-browser fetch mock.
import * as flight from './flight.js';
import * as boat from './boat.js';
import { viewScores, buyTicket } from './stadium.js';
import { cityOf, publicCity, cityList, onlineByCity, useLink } from './cities.js';
import { GameError, bad, cleanText } from './util.js';
import * as auth from './auth.js';
import * as eco from './economy.js';
import * as ads from './ads.js';
import * as world from './world.js';
import * as soc from './social.js';
import * as safety from './safety.js';
import * as casual from './casual.js';
import * as venues from './venues.js';
import * as leisure from './leisure.js';
import * as phone from './phone/phone.js';
import * as games from './games.js';
import * as sports from './sports.js';
import * as cars from './cars.js';
import * as parking from './parking.js';
import * as bus from './bus.js';
import * as ride from './ride.js';
import * as crash from './crash.js';
import * as homes from './homes.js';
import * as wear from './wearables.js';
import * as business from './business.js';
import * as market from './market.js';
import * as clubs from './clubs.js';
import * as throws from './throws.js';
import * as weather from './weather.js';
import * as events from './events.js';
import * as signup from './signup.js';
import * as office from './office.js';
import * as account from './account.js';
import './gamedata.js';
import './playerdata-g.js';   // registers what the table games and the word/board games hold about a player with the account download/closing module (docs/ACCOUNT_DATA.md)
import { checkAdminLogin } from './admin-guard.js';
import { history, checkInvariants, moneySupply, balanceOf, cashId } from './ledger.js';
import { RATE_CARD, AD_POLICY, AD_FORMATS } from '../config/ratecard.js';
import { GAME_NAME, GAME_TAGLINE, MIN_AGE } from '../config/game.js';
import { paymentRoutes } from './payments/routes.js';
import { publicConfig as paymentsConfig } from './payments/index.js';
import { ageRoutes } from './age/routes.js';
import { publicConfig as ageConfig } from './age/index.js';

const R = [];
const route = (method, path, opts, handler) => { if (typeof opts === 'function') { handler = opts; opts = {}; } R.push({ method, path, parts: path.split('/').filter(Boolean), auth: opts.auth || 'none', handler, rate: opts.rate }); };

// ---- public / meta
// real radio stations in the car: global switch (env NA_REAL_RADIO=0, or the admin route below until restart). The client reads it from /api/config.
const realRadioOn = (app) => { const rt = (app.runtime ||= {}); if (rt.realRadio === undefined) rt.realRadio = (typeof process === 'undefined' || process.env?.NA_REAL_RADIO !== '0'); return rt.realRadio; };
route('GET', '/api/admin/radio', { auth: 'admin' }, (c) => ({ realRadio: realRadioOn(c.app) }));
route('POST', '/api/admin/radio', { auth: 'admin' }, (c) => { realRadioOn(c.app); c.app.runtime.realRadio = c.body.enabled !== false && c.body.enabled !== 'false'; return { realRadio: c.app.runtime.realRadio }; });
route('GET', '/api/health', (c) => ({ ok: true, name: c.app.gameName, now: c.app.clock.now() }));
route('GET', '/api/config', (c) => ({ realRadio: realRadioOn(c.app), movement: { maxWalkSpeed: c.app.balance.movement.maxWalkSpeed, maxDriveSpeed: c.app.balance.movement.maxDriveSpeed, slack: c.app.balance.movement.slack }, physx: c.app.balance.physx || null, adFormats: { radio: { everyMs: AD_FORMATS.radio.everyMs, stations: AD_FORMATS.radio.stations, minListenMs: AD_FORMATS.radio.minListenMs } }, crash: { enabled: !!c.app.balance.crash.enabled, regenPerMin: c.app.balance.crash.regenPerMin, max: c.app.balance.crash.maxHealth }, moodHappyAt: c.app.balance.mood.happyAt, name: c.app.gameName, tagline: GAME_TAGLINE, minAge: MIN_AGE, testMode: true, devRoutes: !!c.app.devRoutes, rotationMs: AD_POLICY.rotationMs, balanceNote: c.app.balance._note,
  topupOptions: c.app.balance.topup.options, payments: paymentsConfig(c.app), ageCheck: ageConfig(c.app), phone: !!c.app.balance.phone.enabled, transport: c.app.balance.transport, shopChannels: c.app.balance.shops.channels, workTask: c.app.balance.work.task, land: { risk: c.app.balance.land.risk }, maxNameLen: c.app.balance.housing.maxNameLen, housing: { rentPeriodMs: c.app.balance.housing.rentPeriodMs }, furniture: c.app.balance.housing.furniture }));
route('GET', '/api/city', (c) => publicCity(c.uid ? cityOf(c.app, c.uid) : c.app.city));
route('POST', '/api/cities/link', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); flight.assertNotFlying(c.app, c.uid); return { ...useLink(c.app, c.uid, String(c.body.linkId || ''), c.body.idem), user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/cities', { auth: 'user' }, (c) => ({ cities: cityList(c.app, c.uid), online: onlineByCity(c.app) }));
route('GET', '/api/stats', (c) => {
  const a = c.app; const players = a.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=0').get().n; const bots = a.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=1').get().n;
  const live = a.db.prepare("SELECT COUNT(*) n FROM ad_campaigns WHERE status='live'").get().n;
  return { onlineNow: world.ccuNow(a), registeredPlayers: players, simulatedBots: bots, liveCampaigns: live, definition: 'onlineNow = distinct players whose game client sent a heartbeat in the last 60 s (server-counted). Bots are included in onlineNow but excluded from registeredPlayers.', serverTime: a.clock.now() };
});
route('GET', '/api/ads/ratecard', (c) => ({ ...RATE_CARD, maxUnits: Object.fromEntries(Object.entries(RATE_CARD.surfaces).flatMap(([s, v]) => Object.keys(v.tiers).map(t => [`${s}:${t}`, ads.maxUnits(c.app, s, t)]))), policy: { restricted: AD_POLICY.restrictedKeywords, prohibited: AD_POLICY.prohibitedKeywords }, test_mode: true }));

// ---- auth
const meView = (app, uid) => ({ ...eco.profile(app, uid), signup: signup.signupView(app, uid) }); // the profile plus whether the sign-up choices still need doing
route('POST', '/api/auth/signup', { rate: 'auth' }, async (c) => { const uid = await auth.signup(c.app, c.body, c.ipHash); c.out.session = uid; return { ok: true, user: meView(c.app, uid) }; });
route('POST', '/api/auth/login', { rate: 'auth' }, async (c) => { const uid = await auth.login(c.app, c.body); c.out.session = uid; return { ok: true, user: meView(c.app, uid) }; });
route('POST', '/api/auth/guest', { rate: 'auth' }, (c) => { const uid = auth.guest(c.app, c.body, c.ipHash); c.out.session = uid; return { ok: true, user: meView(c.app, uid) }; });
route('POST', '/api/auth/logout', (c) => { if (c.uid) world.leaveWorld(c.app, c.uid); c.out.session = 'clear'; return { ok: true }; });
route('GET', '/api/me', { auth: 'user' }, (c) => ({ user: meView(c.app, c.uid) }));

// ---- world
route('POST', '/api/heartbeat', { auth: 'user' }, (c) => world.heartbeat(c.app, c.uid, c.body || {}, { headless: c.headless }));
route('POST', '/api/chat', { auth: 'user' }, (c) => world.sendChat(c.app, c.uid, c.body.text));
route('GET', '/api/leaderboard', { auth: 'user' }, (c) => ({ rows: eco.leaderboard(c.app) }));

// ---- economy
route('GET', '/api/jobs', { auth: 'user' }, (c) => ({ jobs: eco.jobsFor(c.app, c.uid) }));
route('POST', '/api/jobs/start', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); const r = eco.startShift(c.app, c.uid, c.body.jobId); return { ok: true, endsAt: r.endsAt, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/jobs/claim', { auth: 'user' }, (c) => { const r = eco.claimShift(c.app, c.uid); return { ok: true, wage: r.wage, user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/jobs/abandon', { auth: 'user' }, (c) => { eco.abandonShift(c.app, c.uid); return { ok: true, user: eco.profile(c.app, c.uid) }; });
route('GET', '/api/shops', { auth: 'user' }, (c) => ({ shops: eco.shopsView(c.app, c.uid), channels: c.app.balance.shops.channels }));
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
route('GET', '/api/venues', { auth: 'user' }, (c) => ({ venues: venues.venuesList(c.app, c.uid) }));
route('GET', '/api/venue', { auth: 'user' }, (c) => venues.venueView(c.app, c.uid, String(c.query.id)));
route('POST', '/api/venue/enter', { auth: 'user' }, (c) => venues.enterVenue(c.app, c.uid, c.body.venueId, c.body.pos));
route('POST', '/api/venue/leave', { auth: 'user' }, (c) => venues.leaveVenue(c.app, c.uid));
route('GET', '/api/stadium/scores', { auth: 'user' }, (c) => viewScores(c.app, c.uid));
route('POST', '/api/stadium/ticket', { auth: 'user' }, (c) => buyTicket(c.app, c.uid, c.body.idem));
route('POST', '/api/venue/act', { auth: 'user' }, (c) => venues.act(c.app, c.uid, c.body.venueId, c.body.stationId, c.body));
route('GET', '/api/phone/friends', { auth: 'user' }, (c) => phone.friendsView(c.app, c.uid));
route('POST', '/api/phone/friends/request', { auth: 'user' }, (c) => phone.friendRequest(c.app, c.uid, c.body.username));
route('POST', '/api/phone/friends/respond', { auth: 'user' }, (c) => phone.friendRespond(c.app, c.uid, c.body.id, !!c.body.accept));
route('POST', '/api/phone/friends/remove', { auth: 'user' }, (c) => phone.friendRemove(c.app, c.uid, c.body.username));
route('GET', '/api/phone/settings', { auth: 'user' }, (c) => { phone.gate(c.app, c.uid); return phone.settingsOf(c.app, c.uid); });
route('POST', '/api/phone/settings', { auth: 'user' }, (c) => phone.setSettings(c.app, c.uid, c.body));
route('GET', '/api/phone/threads', { auth: 'user' }, (c) => phone.threadsView(c.app, c.uid));
route('GET', '/api/phone/thread', { auth: 'user' }, (c) => phone.threadView(c.app, c.uid, String(c.query.with || ''), Number(c.query.after) || 0, c.query.read !== '0'));
route('POST', '/api/phone/messages', { auth: 'user' }, (c) => phone.sendText(c.app, c.uid, c.body.to, c.body.text));
route('POST', '/api/phone/voice', { auth: 'user' }, (c) => phone.sendVoice(c.app, c.uid, String(c.query.to || ''), c.raw, { durationMs: c.headers?.['x-duration-ms'], mime: c.headers?.['content-type'], waveform: String(c.headers?.['x-waveform'] || '').split(',').filter(Boolean).map(Number) }));
route('GET', '/api/phone/call', { auth: 'user' }, (c) => phone.callState(c.app, c.uid));
route('POST', '/api/phone/call/start', { auth: 'user' }, (c) => phone.callStart(c.app, c.uid, c.body.to));
route('POST', '/api/phone/call/act', { auth: 'user' }, (c) => phone.callAct(c.app, c.uid, c.body.callId, c.body.action));
route('POST', '/api/phone/call/signal', { auth: 'user' }, (c) => phone.callSignal(c.app, c.uid, c.body.callId, c.body));
route('POST', '/api/phone/call/stats', { auth: 'user' }, (c) => phone.reportCallEnded(c.app, c.uid, c.body.callId, c.body.icePath));
// player-owned businesses (Mama Put, barber, shop, car wash): see server/core/business.js
route('GET', '/api/business', { auth: 'user' }, (c) => business.view(c.app, c.uid));
route('POST', '/api/business/buy', { auth: 'user' }, (c) => business.buy(c.app, c.uid, String(c.body.type || ''), c.body.name, c.body.idem));
route('POST', '/api/business/collect', { auth: 'user' }, (c) => business.collect(c.app, c.uid, c.body.id, c.body.idem));
route('POST', '/api/business/hire', { auth: 'user' }, (c) => business.hire(c.app, c.uid, c.body.id, c.body.candidate));
route('POST', '/api/business/fire', { auth: 'user' }, (c) => business.fire(c.app, c.uid, c.body.id, c.body.staffId));
route('POST', '/api/business/upgrade', { auth: 'user' }, (c) => business.upgrade(c.app, c.uid, c.body.id, c.body.idem));
route('POST', '/api/business/rename', { auth: 'user' }, (c) => business.rename(c.app, c.uid, c.body.id, c.body.name));
route('POST', '/api/business/sell', { auth: 'user' }, (c) => business.sell(c.app, c.uid, c.body.id, c.body.idem));
// marketplace: players sell cars and wearables to each other (escrow in the listing, fees, limits): see server/core/market.js
route('GET', '/api/market', { auth: 'user' }, (c) => market.browse(c.app, c.uid, c.query));
route('GET', '/api/market/mine', { auth: 'user' }, (c) => market.mine(c.app, c.uid));
route('POST', '/api/market/list', { auth: 'user' }, (c) => market.list(c.app, c.uid, String(c.body.kind || ''), c.body.ref, c.body.ask, c.body.idem));
route('POST', '/api/market/cancel', { auth: 'user' }, (c) => market.cancel(c.app, c.uid, c.body.id));
route('POST', '/api/market/buy', { auth: 'user' }, (c) => market.buy(c.app, c.uid, c.body.id, c.body.expect, c.body.idem));
// clubs and crews (clubhouse, roles, requests and invites, members-only chat): see server/core/clubs.js
route('GET', '/api/clubs', { auth: 'user' }, (c) => clubs.mine(c.app, c.uid));
route('GET', '/api/clubs/directory', { auth: 'user' }, (c) => clubs.directory(c.app, c.uid, c.query));
route('POST', '/api/clubs/create', { auth: 'user' }, (c) => clubs.create(c.app, c.uid, c.body, c.body.idem));
route('POST', '/api/clubs/join', { auth: 'user' }, (c) => clubs.join(c.app, c.uid, c.body.clubId));
route('POST', '/api/clubs/decide', { auth: 'user' }, (c) => clubs.decide(c.app, c.uid, c.body.userId, !!c.body.accept));
route('POST', '/api/clubs/invite', { auth: 'user' }, (c) => clubs.invite(c.app, c.uid, c.body.username));
route('POST', '/api/clubs/decline', { auth: 'user' }, (c) => clubs.declineInvite(c.app, c.uid, c.body.clubId));
route('POST', '/api/clubs/leave', { auth: 'user' }, (c) => clubs.leave(c.app, c.uid));
route('POST', '/api/clubs/kick', { auth: 'user' }, (c) => clubs.kick(c.app, c.uid, c.body.userId));
route('POST', '/api/clubs/role', { auth: 'user' }, (c) => clubs.setRole(c.app, c.uid, c.body.userId, String(c.body.role || '')));
route('POST', '/api/clubs/settings', { auth: 'user' }, (c) => clubs.settings(c.app, c.uid, c.body));
route('POST', '/api/clubs/disband', { auth: 'user' }, (c) => clubs.disbandClub(c.app, c.uid));
route('POST', '/api/clubs/mute', { auth: 'user' }, (c) => clubs.mute(c.app, c.uid, c.body.userId, c.body.minutes));
route('POST', '/api/clubs/say', { auth: 'user' }, (c) => clubs.say(c.app, c.uid, c.body.text));
route('GET', '/api/clubs/chat', { auth: 'user' }, (c) => clubs.chat(c.app, c.uid, c.query.since));
route('POST', '/api/clubs/hangout', { auth: 'user' }, (c) => clubs.hangout(c.app, c.uid));
// weather, rain, flooding and the day/night phase (server/core/weather.js); events: night market, street owambe, festivals (server/core/events.js)
route('POST', '/api/throw', { auth: 'user' }, (c) => { c.app.limiter.hit?.(`throw:${c.uid}`, 60, 60000, c.app.clock.now()); return throws.throwBall(c.app, c.uid, c.body); });
route('GET', '/api/weather', { auth: 'user' }, (c) => weather.view(c.app, c.uid));
route('POST', '/api/admin/weather', { auth: 'admin' }, (c) => weather.force(c.app, c.body.state));
route('GET', '/api/events', { auth: 'user' }, (c) => events.view(c.app, c.uid));
route('POST', '/api/events/buy', { auth: 'user' }, (c) => events.buy(c.app, c.uid, String(c.body.event || ''), String(c.body.item || ''), c.body.idem));
route('POST', '/api/events/claim', { auth: 'user' }, (c) => events.claim(c.app, c.uid, String(c.body.event || ''), c.body.idem));
// jewelry store + cap store (wearables): public catalogue, the shop window, buy, wear, take off, (optional) sell back
route('GET', '/api/wearables/catalogue', (c) => wear.catalogue(c.app));
route('GET', '/api/wearables/shop', { auth: 'user' }, (c) => wear.shopView(c.app, c.uid, String(c.query.venueId || '')));
route('GET', '/api/wearables/mine', { auth: 'user' }, (c) => wear.wearView(c.app, c.uid));
route('POST', '/api/wearables/buy', { auth: 'user' }, (c) => wear.buy(c.app, c.uid, c.body.venueId, c.body.itemId, c.body.idem));
route('POST', '/api/wearables/equip', { auth: 'user' }, (c) => wear.equip(c.app, c.uid, c.body.itemId));
route('POST', '/api/wearables/unequip', { auth: 'user' }, (c) => wear.unequip(c.app, c.uid, c.body.slot));
route('POST', '/api/wearables/sell', { auth: 'user' }, (c) => wear.sell(c.app, c.uid, c.body.itemId, c.body.idem));
// your data: download everything we hold, or close the account (erases and anonymises; see docs/ACCOUNT_DATA.md)
route('GET', '/api/account/export', { auth: 'user' }, (c) => { if (!c.app.limiter.hit(`export:${c.uid}`, 5, 3600000, c.app.clock.now())) bad('RATE_LIMIT', 'You can download your data 5 times an hour.', 429); return account.exportData(c.app, c.uid); });
route('POST', '/api/account/delete', { auth: 'user' }, async (c) => { if (!c.app.limiter.hit(`delete:${c.uid}`, 5, 3600000, c.app.clock.now())) bad('RATE_LIMIT', 'Too many attempts. Try again later.', 429); const r = await account.deleteAccount(c.app, c.uid, c.body); c.out.session = 'clear'; return r; });
// sign-up choices (city, city of interest, interests) and the Naija Area office (apply to join, share ideas)
route('GET', '/api/signup/options', { auth: 'user' }, (c) => signup.options(c.app, c.uid));
route('POST', '/api/signup/profile', { auth: 'user' }, (c) => ({ ...signup.save(c.app, c.uid, c.body), user: meView(c.app, c.uid) }));
route('GET', '/api/office', { auth: 'user' }, (c) => office.info(c.app, c.uid));
route('POST', '/api/office/apply', { auth: 'user' }, (c) => office.apply(c.app, c.uid, c.body));
route('POST', '/api/office/withdraw', { auth: 'user' }, (c) => office.withdraw(c.app, c.uid));
route('POST', '/api/office/idea', { auth: 'user' }, (c) => office.shareIdea(c.app, c.uid, c.body));
route('GET', '/api/admin/applications', { auth: 'admin' }, (c) => ({ rows: office.adminApplications(c.app, c.query.status ? String(c.query.status).split(',') : null), summary: office.officeSummary(c.app) }));
route('POST', '/api/admin/applications/:id/status', { auth: 'admin' }, (c) => office.adminSetApplication(c.app, Number(c.params.id), String(c.body.status || ''), c.body.note));
route('GET', '/api/admin/ideas', { auth: 'admin' }, (c) => ({ rows: office.adminIdeas(c.app, c.query.status ? String(c.query.status).split(',') : null), summary: office.officeSummary(c.app) }));
route('POST', '/api/admin/ideas/:id/status', { auth: 'admin' }, (c) => office.adminSetIdea(c.app, Number(c.params.id), String(c.body.status || ''), c.body.note));
route('GET', '/api/admin/ideas/export', { auth: 'admin' }, (c) => ({ rows: office.pipelineExport(c.app) }));
route('POST', '/api/admin/ideas/exported', { auth: 'admin' }, (c) => office.markExported(c.app, c.body.ids));
route('GET', '/api/admin/signups', { auth: 'admin' }, (c) => signup.stats(c.app));
route('GET', '/api/salon', { auth: 'user' }, (c) => leisure.salonMenu(c.app, c.uid, String(c.query.venueId || '')));
route('POST', '/api/salon/style', { auth: 'user' }, (c) => leisure.salonStyle(c.app, c.uid, c.body.venueId, c.body.stationId, c.body.styleId, c.body.idem));
route('POST', '/api/game/sit', { auth: 'user' }, (c) => games.sit(c.app, c.uid, c.body.venueId, c.body.stationId, Number(c.body.stake) || 0));
route('GET', '/api/game', { auth: 'user' }, (c) => games.getMatch(c.app, c.uid, Number(c.query.id)));
route('POST', '/api/game/move', { auth: 'user' }, (c) => games.playMove(c.app, c.uid, Number(c.body.matchId), c.body));
route('POST', '/api/game/start', { auth: 'user' }, (c) => games.start(c.app, c.uid, Number(c.body.matchId)));
route('POST', '/api/game/leave', { auth: 'user' }, (c) => games.resign(c.app, c.uid, Number(c.body.matchId)));
route('POST', '/api/sports/bot', { auth: 'user' }, (c) => sports.sitVsBot(c.app, c.uid, c.body.venueId, c.body.stationId, String(c.body.level || 'club')));   // Sports and Games Hall: play ping pong or tennis against a bot
route('GET', '/api/sports/levels', { auth: 'user' }, (c) => ({ levels: sports.levels(c.app), note: sports.SPORTS_DEFAULTS.note }));
route('GET', '/api/casual', { auth: 'user' }, (c) => casual.overview(c.app, c.uid));
route('POST', '/api/casual/merge/start', { auth: 'user' }, (c) => casual.mergeStart(c.app, c.uid));
route('POST', '/api/casual/merge/submit', { auth: 'user' }, (c) => casual.mergeSubmit(c.app, c.uid, c.body.runId, c.body.moves));
route('POST', '/api/casual/memory/start', { auth: 'user' }, (c) => casual.memoryStart(c.app, c.uid));
route('POST', '/api/casual/memory/flip', { auth: 'user' }, (c) => casual.memoryFlip(c.app, c.uid, c.body.runId, c.body.i));
route('POST', '/api/casual/match3/start', { auth: 'user' }, (c) => casual.match3Start(c.app, c.uid));
route('POST', '/api/casual/match3/submit', { auth: 'user' }, (c) => casual.match3Submit(c.app, c.uid, c.body.runId, c.body.moves));
route('POST', '/api/casual/danfo/start', { auth: 'user' }, (c) => casual.danfoStart(c.app, c.uid, c.body.level));
route('POST', '/api/casual/danfo/submit', { auth: 'user' }, (c) => casual.danfoSubmit(c.app, c.uid, c.body.runId, c.body.moves));
route('GET', '/api/casual/suwe', { auth: 'user' }, (c) => ({ run: casual.suweCurrent(c.app, c.uid) }));
route('POST', '/api/casual/suwe/start', { auth: 'user' }, (c) => casual.suweStart(c.app, c.uid));
route('POST', '/api/casual/suwe/play', { auth: 'user' }, (c) => casual.suwePlay(c.app, c.uid, c.body.runId, { aim: c.body.aim, taps: c.body.taps }));
route('GET', '/api/casual/wordsearch', { auth: 'user' }, (c) => casual.wordsearchState(c.app, c.uid));
route('POST', '/api/casual/wordsearch/line', { auth: 'user' }, (c) => casual.wordsearchLine(c.app, c.uid, c.body.r1, c.body.c1, c.body.r2, c.body.c2));
route('GET', '/api/casual/word', { auth: 'user' }, (c) => casual.wordState(c.app, c.uid));
route('POST', '/api/casual/word/guess', { auth: 'user' }, (c) => casual.wordGuess(c.app, c.uid, c.body.word));
route('GET', '/api/scoreboard', { auth: 'user' }, (c) => games.scoreboard(c.app, { kind: c.query.kind, weekOffset: Number(c.query.weekOffset) || 0 }));
route('GET', '/api/garage', { auth: 'user' }, (c) => cars.garageView(c.app, c.uid));
route('POST', '/api/garage/buy', { auth: 'user' }, (c) => cars.buyCar(c.app, c.uid, c.body.model, c.body.idemKey));
route('POST', '/api/garage/use', { auth: 'user' }, (c) => cars.setActive(c.app, c.uid, Number(c.body.carId)));
route('GET', '/api/boat', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, undefined); return boat.view(c.app, c.uid); });
route('POST', '/api/boat/call', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); flight.assertNotFlying(c.app, c.uid); return boat.call(c.app, c.uid, String(c.body.to || ''), c.body.idem); });
route('POST', '/api/boat/board', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return boat.board(c.app, c.uid, c.body.idem); });
route('POST', '/api/boat/cancel', { auth: 'user' }, (c) => boat.cancel(c.app, c.uid));
route('GET', '/api/flights', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, undefined); return flight.view(c.app, c.uid); });
route('POST', '/api/flights/buy', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return flight.buy(c.app, c.uid, String(c.body.to || ''), c.body.departAt, c.body.idem); });
route('POST', '/api/flights/cancel', { auth: 'user' }, (c) => flight.cancel(c.app, c.uid));
route('GET', '/api/ride', { auth: 'user' }, (c) => ride.status(c.app, c.uid));
route('GET', '/api/ride/quote', { auth: 'user' }, (c) => ride.quote(c.app, c.uid, String(c.query.place || '')));
route('POST', '/api/ride/request', { auth: 'user' }, (c) => ride.request(c.app, c.uid, String(c.body.placeId || '')));
route('POST', '/api/ride/cancel', { auth: 'user' }, (c) => ride.cancel(c.app, c.uid));
route('POST', '/api/ride/start', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return { ...ride.start(c.app, c.uid, c.body.idem), user: eco.profile(c.app, c.uid) }; });
route('POST', '/api/bus/call', { auth: 'user' }, (c) => bus.call(c.app, c.uid, String(c.body.stopId || '')));
route('POST', '/api/bus/board', { auth: 'user' }, (c) => bus.board(c.app, c.uid, String(c.body.stopId || '')));
route('POST', '/api/bus/cancel', { auth: 'user' }, (c) => bus.cancel(c.app, c.uid));
route('GET', '/api/parking', { auth: 'user' }, (c) => parking.view(c.app, c.uid));
route('POST', '/api/parking/park', { auth: 'user' }, (c) => parking.park(c.app, c.uid, c.body.idemKey));
route('POST', '/api/parking/take', { auth: 'user' }, (c) => parking.take(c.app, c.uid));
route('GET', '/api/mechanic', { auth: 'user' }, (c) => cars.mecoCheck(c.app, c.uid));
route('POST', '/api/crash/roll', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return crash.roll(c.app, c.uid, c.body); });
route('POST', '/api/crash/impact', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return crash.impact(c.app, c.uid, c.body); });
route('GET', '/api/clinic', { auth: 'user' }, (c) => crash.clinicInfo(c.app, c.uid));
route('POST', '/api/clinic/treat', { auth: 'user' }, (c) => { world.syncPos(c.app, c.uid, c.body.pos); return crash.treat(c.app, c.uid, c.body.idemKey); });
route('POST', '/api/mechanic/repair', { auth: 'user' }, (c) => crash.repair(c.app, c.uid, c.body.idemKey));
route('POST', '/api/mechanic/service', { auth: 'user' }, (c) => cars.mecoService(c.app, c.uid, c.body.idemKey));
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

ageRoutes(route); // real age checks (provider interface, pass/fail + date only)
paymentRoutes(route); // payments (TEST MODE): top-up, webhook, ad checkout, refunds, reconciliation

// ---- admin
route('POST', '/api/admin/login', { rate: 'auth' }, (c) => { if (!c.app.adminPassword) bad('ADMIN_DISABLED', 'Admin is disabled: set ADMIN_PASSWORD.', 503); const passwordOk = c.app.platform.safeEqual(String(c.body.password || ''), c.app.adminPassword); checkAdminLogin(c.app, { passwordOk, code: c.body.code, ip: c.ip }); c.out.admin = true; return { ok: true, twoFactor: !!c.app.adminCfg?.secret }; }); // password (+ a one-time 6-digit code when ADMIN_TOTP_SECRET is set), lock-out after 5 failures
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
  if (req.uid && (app.deletedUsers ||= account.loadDeleted(app)).has(req.uid)) req = { ...req, uid: null }; // a closed account's old session cookie is dead
  const ctx = { app, uid: req.uid, body: req.body || {}, query: req.query || {}, params, headers: req.headers || {}, raw: req.raw, ip: req.ip, ipHash: req.ip ? app.platform.sha256(String(req.ip)).slice(0, 16) : null, headless: /headless/i.test(req.ua || ''), out: {} };
  try {
    if (r.auth === 'user' && !req.uid) throw new GameError('LOGIN_REQUIRED', 'Please log in.', 401);
    if (r.auth === 'admin' && !req.isAdmin) throw new GameError('ADMIN_REQUIRED', 'Admin login required.', 401);
    if (req.uid && r.auth === 'user' && app.agePlayGuard) { const g = app.agePlayGuard(req.uid, r.path); if (g) throw new GameError(g.code, g.message, 403); } // age mode 'play': unverified players can do nothing but verify
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
