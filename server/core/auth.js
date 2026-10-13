import { bad, cleanText, hasBadWord } from './util.js';
import { ensureUserAccounts, move, SYS, cashId } from './ledger.js';

const COLORS = ['#e4572e', '#17bebb', '#ffc914', '#76b041', '#a24bcf', '#f28f3b', '#3a86ff', '#ff6392', '#2e9b5e', '#8d6e63'];
export const validUsername = (u) => typeof u === 'string' && /^[A-Za-z0-9_]{3,20}$/.test(u) && !hasBadWord(u);

export function newPlayer(app, { username, passHash = null, isGuest = false, isBot = false, ageConfirmed, ipHash = null, cash }) {
  const { db, balance, city } = app; const now = app.clock.now();
  const run = db.transaction(() => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const r = db.prepare('INSERT INTO users(username,pass_hash,is_guest,is_bot,age_confirmed_at,color,created_at,last_seen,signup_ip_hash) VALUES (?,?,?,?,?,?,?,?,?)')
      .run(username, passHash, isGuest ? 1 : 0, isBot ? 1 : 0, ageConfirmed ? now : null, color, now, now, ipHash);
    const uid = Number(r.lastInsertRowid);
    ensureUserAccounts(db, uid);
    const sp = city.spawns[Math.floor(Math.random() * city.spawns.length)];
    db.prepare('INSERT INTO player_state(user_id,x,z,ry,mode,energy,hunger,needs_at,savings_interest_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .run(uid, sp.x, sp.z, sp.ry || 0, 'walk', balance.needs.startEnergy, balance.needs.startHunger, now, now, now);
    const amt = cash ?? (isGuest ? balance.guestStartingCash : balance.startingCash);
    if (amt > 0) move(app, { from: SYS.FAUCET_START, to: cashId(uid), amount: amt, reason: 'starting_cash', userId: uid, idemKey: `start:${uid}` });
    db.prepare('INSERT INTO notifications(user_id,kind,text,created_at) VALUES (?,?,?,?)').run(uid, 'welcome', `Welcome to ${app.gameName}! You got ₦${amt.toLocaleString('en-NG')} starting cash (test currency, no cash value). Find a job and a place to stay.`, now);
    return uid;
  });
  return run();
}

export async function signup(app, { username, password, age18 }, ipHash) {
  if (age18 !== true) bad('AGE_REQUIRED', 'You must confirm you are 18 or over to play.');
  if (!validUsername(username)) bad('BAD_USERNAME', 'Username: 3-20 letters, numbers or underscore (no rude words).');
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) bad('BAD_PASSWORD', 'Password must be 8-72 characters.');
  if (app.db.prepare('SELECT 1 FROM users WHERE username=?').get(username)) bad('USERNAME_TAKEN', 'That username is taken.', 409);
  const passHash = await app.platform.hash(password);
  if (app.db.prepare('SELECT 1 FROM users WHERE username=?').get(username)) bad('USERNAME_TAKEN', 'That username is taken.', 409);
  return newPlayer(app, { username, passHash, ageConfirmed: true, ipHash });
}
export async function login(app, { username, password }) {
  const u = typeof username === 'string' ? app.db.prepare('SELECT id, pass_hash, is_guest FROM users WHERE username=?').get(username) : null;
  // constant-ish work even when the user is unknown
  const ok = await app.platform.verify(typeof password === 'string' ? password : '', u?.pass_hash || app.platform.dummyHash);
  if (!u || !u.pass_hash || !ok) bad('BAD_LOGIN', 'Wrong username or password.', 401);
  app.db.prepare('UPDATE users SET last_seen=? WHERE id=?').run(app.clock.now(), u.id);
  return u.id;
}
export function guest() {
  bad('GUESTS_OFF', 'Guest play is turned off. Sign up or log in.', 403);
}
export const userRow = (db, uid) => db.prepare('SELECT id, username, is_guest, is_bot, color, created_at FROM users WHERE id=?').get(uid);
