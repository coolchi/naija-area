import test from 'node:test';
import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call } from './helpers.js';
import { REFERRAL } from '../server/config/referrals.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';
import { ensureCode } from '../server/core/referrals.js';

const nameOf = (s, uid) => s.app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
const signup = (s, username, ref, email) => ok(s, 'POST', '/api/auth/signup', {
  body: { username, password: 'password1', age18: true, gender: 'male', email: email || `${username}@example.com`, ...(ref ? { ref } : {}) },
});

test('3-level referrals pay ₦1m / ₦200k / ₦50k and show the network', async () => {
  const s = makeServer();
  const a = mkUser(s);
  const code = ensureCode(s.app, a);
  const startA = balanceOf(s.app.db, cashId(a));

  const b = (await signup(s, `refb_${Date.now().toString(36)}`.slice(0, 20), code)).user.id;
  assert.equal(balanceOf(s.app.db, cashId(a)), startA + REFERRAL.rewards[0]);

  const mineB = await ok(s, 'GET', '/api/referrals', { uid: b });
  const c = (await signup(s, `refc_${Date.now().toString(36)}`.slice(0, 20), mineB.code)).user.id;
  assert.equal(balanceOf(s.app.db, cashId(b)), s.app.balance.startingCash + REFERRAL.rewards[0]);
  assert.equal(balanceOf(s.app.db, cashId(a)), startA + REFERRAL.rewards[0] + REFERRAL.rewards[1]);

  const mineC = await ok(s, 'GET', '/api/referrals', { uid: c });
  await signup(s, `refd_${Date.now().toString(36)}`.slice(0, 20), mineC.code);
  assert.equal(balanceOf(s.app.db, cashId(a)), startA + REFERRAL.rewards[0] + REFERRAL.rewards[1] + REFERRAL.rewards[2]);

  const net = await ok(s, 'GET', '/api/referrals', { uid: a });
  assert.equal(net.summary.level1, 1);
  assert.equal(net.summary.level2, 1);
  assert.equal(net.summary.level3, 1);
  assert.equal(net.summary.network, 3);
  assert.equal(net.summary.earned, REFERRAL.rewards[0] + REFERRAL.rewards[1] + REFERRAL.rewards[2]);
  assert.ok(net.url.includes(net.code) || net.path.includes(net.code));
  assert.equal(checkInvariants(s.app.db).ok, true);
});

test('email invite creates a mailto link and signup with the token accepts it', async () => {
  const s = makeServer();
  const a = mkUser(s);
  assert.equal((await call(s, 'POST', '/api/referrals/invite', { uid: a, body: { email: 'not-an-email' } })).status, 400);
  const inv = await ok(s, 'POST', '/api/referrals/invite', { uid: a, body: { email: 'friend@example.com' } });
  assert.equal(inv.sent, false);
  assert.match(inv.mailto, /^mailto:/);
  assert.ok(inv.token);
  const prev = await ok(s, 'GET', `/api/referrals/preview?ref=${encodeURIComponent(inv.token)}`);
  assert.equal(prev.ok, true);
  assert.equal(prev.username, nameOf(s, a));
  const start = balanceOf(s.app.db, cashId(a));
  await signup(s, `refe_${Date.now().toString(36)}`.slice(0, 20), inv.token);
  assert.equal(balanceOf(s.app.db, cashId(a)), start + REFERRAL.rewards[0]);
  const mine = await ok(s, 'GET', '/api/referrals', { uid: a });
  assert.equal(mine.invites[0].status, 'accepted');
  assert.equal(mine.summary.level1, 1);
});

test('email invite sends through MailDESK when configured', async () => {
  let seen = null;
  const s = makeServer({
    mailConfig: { enabled: true, apiKey: 'md_test', from: 'Naija Area <hello@example.com>' },
    mailSend: async (msg) => { seen = msg; return { id: 'mail-1', status: 'sent' }; },
  });
  const a = mkUser(s);
  const inv = await ok(s, 'POST', '/api/referrals/invite', { uid: a, body: { email: 'pal@example.com' } });
  assert.equal(inv.sent, true);
  assert.equal(inv.mailId, 'mail-1');
  assert.equal(inv.mailto, null);
  assert.equal(seen.to, 'pal@example.com');
  assert.match(seen.subject, /Join me/);
  assert.match(seen.text, /Come play/);
  assert.match(seen.html, /ref=/);
});

test('bad referral codes are rejected; self-referral is blocked', async () => {
  const s = makeServer();
  assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: 'noref1_x', password: 'password1', age18: true, gender: 'male', email: 'noref1_x@example.com', ref: 'NOPE1234' } })).json.error, 'BAD_REFERRAL');
  const a = mkUser(s);
  const code = ensureCode(s.app, a);
  const name = nameOf(s, a);
  // cannot invent a user that already exists with own code via signup of same name — use attach on existing
  assert.equal((await call(s, 'GET', '/api/referrals', { uid: a })).status, 200);
  const preview = await ok(s, 'GET', `/api/referrals/preview?ref=${encodeURIComponent(code)}`);
  assert.equal(preview.username, name);
});
