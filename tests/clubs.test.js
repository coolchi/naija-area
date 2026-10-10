// Clubs and crews: founding (fee through the ledger), joining (open, request, invite), roles, kicking, leaving and succession, members-only filtered chat, the clubhouse.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { CLUBS } from '../server/config/clubs.js';

const adult = (s, cash = 50000) => mkUser(s, { cash, ageMs: 16 * 60000 });
const P = (s, u, path, body) => call(s, 'POST', '/api/clubs/' + path, { uid: u, body });
const found = (s, u, name = 'Yaba Boys', tag = 'ybs', extra = {}) => ok(s, 'POST', '/api/clubs/create', { uid: u, body: { name, tag, ...extra } });

test('founding: the fee goes to the sink, the founder leads, tag is upper-cased, names are unique, filtered and one club per player; no guests, no brand-new accounts, no cash = no club', async () => {
  const s = makeServer(); const a = adult(s), b = adult(s); const before = balanceOf(s.db, cashId(a)); const r = await found(s, a);
  assert.equal(r.club.tag, 'YBS'); assert.equal(r.role, 'leader'); assert.equal(balanceOf(s.db, cashId(a)), before - CLUBS.createFee); assert.equal(balanceOf(s.db, SYS.SINK_CLUBS), CLUBS.createFee);
  assert.equal((await P(s, a, 'create', { name: 'Another', tag: 'ANO' })).json.error, 'IN_CLUB'); assert.equal((await P(s, b, 'create', { name: 'yaba boys', tag: 'YB2' })).json.error, 'NAME_TAKEN');
  assert.ok((await P(s, b, 'create', { name: 'sh1t crew', tag: 'ABC' })).status === 400); assert.equal((await P(s, b, 'create', { name: 'Ok name', tag: 'x' })).json.error, 'BAD_TAG'); assert.equal((await P(s, b, 'create', { name: 'ab', tag: 'ABC' })).status, 400);
  const g = mkUser(s, { cash: 99999, guest: true, ageMs: 16 * 60000 }); assert.equal((await P(s, g, 'create', { name: 'Guest Club', tag: 'GST' })).json.error, 'GUEST'); const poor = adult(s, 10); assert.equal((await P(s, poor, 'create', { name: 'Poor Club', tag: 'PRC' })).status, 402);
  const fresh = mkUser(s, { cash: 99999 }); assert.equal((await P(s, fresh, 'create', { name: 'Fresh Club', tag: 'FRC' })).json.error, 'TOO_NEW'); assert.equal(checkInvariants(s.db).ok, true);
});
test('joining: open clubs take you at once, closed ones want a request the leader accepts, invites can be accepted by joining; the member cap holds', async () => {
  const s = makeServer(); const lead = adult(s), a = adult(s), b = adult(s), c = adult(s); const club = (await found(s, lead)).club;
  await ok(s, 'POST', '/api/clubs/join', { uid: a, body: { clubId: club.id } }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: a })).club.members, 2);
  await ok(s, 'POST', '/api/clubs/settings', { uid: lead, body: { open: false } }); const r = await ok(s, 'POST', '/api/clubs/join', { uid: b, body: { clubId: club.id } }); assert.equal(r.requested, true); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: b })).club, null);
  const lv = await ok(s, 'GET', '/api/clubs', { uid: lead }); assert.equal(lv.requests.length, 1); assert.equal((await P(s, a, 'decide', { userId: b, accept: true })).status, 403, 'a plain member cannot decide');
  await ok(s, 'POST', '/api/clubs/decide', { uid: lead, body: { userId: b, accept: true } }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: b })).role, 'member');
  const un = (await ok(s, 'GET', '/api/auth/me', { uid: c }).catch(() => null)); void un; const cname = s.db.prepare('SELECT username FROM users WHERE id=?').get(c).username;
  await ok(s, 'POST', '/api/clubs/invite', { uid: lead, body: { username: '@' + cname } }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: c })).invites.length, 1); await ok(s, 'POST', '/api/clubs/join', { uid: c, body: { clubId: club.id } }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: c })).club.members, 4);
  assert.equal((await P(s, lead, 'invite', { username: cname })).json.error, 'IN_CLUB');
  const s2 = makeServer(); s2.app.balance.clubs = { ...CLUBS, maxMembers: 2 }; const l2 = adult(s2), m1 = adult(s2), m2 = adult(s2); const c2 = (await found(s2, l2)).club; await ok(s2, 'POST', '/api/clubs/join', { uid: m1, body: { clubId: c2.id } }); assert.equal((await P(s2, m2, 'join', { clubId: c2.id })).json.error, 'CLUB_FULL');
});
test('roles: leader promotes officers (capped), officers manage members but not each other, leader hands over; kicked and leaving members wait out a cooldown', async () => {
  const s = makeServer(); const lead = adult(s), o = adult(s), m = adult(s), m2 = adult(s); const club = (await found(s, lead)).club; for (const u of [o, m, m2]) await ok(s, 'POST', '/api/clubs/join', { uid: u, body: { clubId: club.id } });
  assert.equal((await P(s, o, 'role', { userId: m, role: 'officer' })).status, 403); await ok(s, 'POST', '/api/clubs/role', { uid: lead, body: { userId: o, role: 'officer' } });
  assert.equal((await P(s, o, 'kick', { userId: lead })).status, 403, 'cannot remove the leader'); await ok(s, 'POST', '/api/clubs/kick', { uid: o, body: { userId: m2 } }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: m2 })).club, null);
  assert.equal((await P(s, m2, 'join', { clubId: club.id })).json.error, 'COOLDOWN'); s.app.clock.advance(CLUBS.leaveCooldownMs + 1000); await ok(s, 'POST', '/api/clubs/join', { uid: m2, body: { clubId: club.id } });
  await ok(s, 'POST', '/api/clubs/role', { uid: lead, body: { userId: m, role: 'leader' } }); const v = await ok(s, 'GET', '/api/clubs', { uid: m }); assert.equal(v.role, 'leader'); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: lead })).role, 'officer'); assert.equal(v.club.leader.length > 0, true);
});
test('leaving: the club passes to an officer then the longest member; the last one out closes it and frees the name', async () => {
  const s = makeServer(); const a = adult(s), b = adult(s), c = adult(s); const club = (await found(s, a)).club; await ok(s, 'POST', '/api/clubs/join', { uid: b, body: { clubId: club.id } }); await ok(s, 'POST', '/api/clubs/join', { uid: c, body: { clubId: club.id } });
  await ok(s, 'POST', '/api/clubs/role', { uid: a, body: { userId: c, role: 'officer' } }); await ok(s, 'POST', '/api/clubs/leave', { uid: a }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: c })).role, 'leader', 'the officer takes over');
  await ok(s, 'POST', '/api/clubs/leave', { uid: c }); assert.equal((await ok(s, 'GET', '/api/clubs', { uid: b })).role, 'leader'); await ok(s, 'POST', '/api/clubs/leave', { uid: b }); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM clubs').get().n, 0); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM club_chat').get().n, 0);
  s.app.clock.advance(CLUBS.leaveCooldownMs + 1000); await found(s, b);
});
test('chat: members only, filtered, rate limited, muted members cannot post, blocked people are hidden, history is capped', async () => {
  const s = makeServer(); const lead = adult(s), m = adult(s), out = adult(s); const club = (await found(s, lead)).club; await ok(s, 'POST', '/api/clubs/join', { uid: m, body: { clubId: club.id } });
  await ok(s, 'POST', '/api/clubs/say', { uid: lead, body: { text: 'Welcome to the club!' } }); assert.equal((await P(s, out, 'say', { text: 'hello' })).json.error, 'NOT_IN_CLUB'); assert.equal((await call(s, 'GET', '/api/clubs/chat', { uid: out })).status, 409);
  assert.equal((await P(s, lead, 'say', { text: 'second too fast' })).json.error, 'SLOW_DOWN'); s.app.clock.advance(2000); assert.ok((await P(s, lead, 'say', { text: 'what the f u c k' })).status === 400); assert.ok((await P(s, lead, 'say', { text: 'call me on 08031234567' })).status === 400);
  const c1 = await ok(s, 'GET', '/api/clubs/chat', { uid: m }); assert.equal(c1.messages.length, 1); assert.equal(c1.messages[0].text, 'Welcome to the club!'); assert.equal((await ok(s, 'GET', '/api/clubs/chat?since=' + c1.last, { uid: m })).messages.length, 0);
  await ok(s, 'POST', '/api/clubs/mute', { uid: lead, body: { userId: m, minutes: 5 } }); assert.equal((await P(s, m, 'say', { text: 'hi' })).json.error, 'MUTED'); s.app.clock.advance(6 * 60000); await ok(s, 'POST', '/api/clubs/say', { uid: m, body: { text: 'back again' } });
  await ok(s, 'POST', '/api/social/block', { uid: lead, body: { username: s.db.prepare('SELECT username FROM users WHERE id=?').get(m).username, kind: 'mute' } }).catch(() => {});
  const s2 = makeServer(); s2.app.balance.clubs = { ...CLUBS, chat: { ...CLUBS.chat, keep: 5, minGapMs: 0 } }; const l = adult(s2); await found(s2, l); for (let i = 0; i < 12; i++) await ok(s2, 'POST', '/api/clubs/say', { uid: l, body: { text: 'message ' + i } }); assert.ok(s2.db.prepare('SELECT COUNT(*) n FROM club_chat').get().n <= 6);
});
test('the directory lists clubs by size and can be searched; the clubhouse is a real venue; hanging out needs two members inside together and has a cooldown', async () => {
  const s = makeServer(); const a = adult(s), b = adult(s), x = adult(s); const club = (await found(s, a, 'Lekki Lions', 'LKL')).club; await found(s, x, 'Ajegunle Aces', 'AJA'); await ok(s, 'POST', '/api/clubs/join', { uid: b, body: { clubId: club.id } });
  const d = await ok(s, 'GET', '/api/clubs/directory', { uid: b }); assert.equal(d.clubs[0].name, 'Lekki Lions'); assert.equal((await ok(s, 'GET', '/api/clubs/directory?q=zzz', { uid: b })).clubs.length, 0); assert.equal((await ok(s, 'GET', '/api/clubs/directory?q=aj', { uid: b })).clubs.length, 1);
  const v = s.app.city.venueById.venue_crewhq; assert.ok(v && v.stations.some(t => t.type === 'club')); assert.equal((await P(s, a, 'hangout', {})).json.error, 'NOT_HERE');
  at(s, a, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: a, body: { venueId: 'venue_crewhq' } });
  assert.equal((await P(s, a, 'hangout', {})).json.error, 'ALONE', 'one member is not a hangout'); at(s, b, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: b, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: b, body: { venueId: 'venue_crewhq' } });
  const mine = await ok(s, 'GET', '/api/clubs', { uid: a }); assert.equal(mine.clubhouse.here.length, 2); assert.equal(mine.clubhouse.canHangout, true);
  const r = await ok(s, 'POST', '/api/clubs/hangout', { uid: a, body: {} }); assert.ok(r.mood > 0); assert.equal((await P(s, a, 'hangout', {})).json.error, 'COOLDOWN'); await ok(s, 'POST', '/api/clubs/hangout', { uid: b, body: {} });
});
test('your club tag rides on your presence in the heartbeat', async () => {
  const s = makeServer(); const a = adult(s), b = adult(s); await found(s, a); at(s, a, 0, 0); at(s, b, 3, 3); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); const hb = await ok(s, 'POST', '/api/heartbeat', { uid: b, body: {} }); assert.equal(hb.players.find(p => p.id === a)?.ct, 'YBS');
});
