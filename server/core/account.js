// A player's rights over their own data: DOWNLOAD everything we hold about them, and CLOSE the account (NDPA 2023 data-subject rights; see docs/ACCOUNT_DATA.md).
//
// Closing an account ERASES what identifies or describes the person (chat, messages, voice notes, friends, notifications, office applications and ideas, choices, house, land,
// cars, worn items, scores, history) and ANONYMISES the rest: the users row stays (username becomes deleted_<id>, no password, no IP hash) because the money ledger is a
// double-entry book that must stay whole. Money still in the wallet is forfeited to a system sink (closed-loop game money, no cash value); real-money payment records, the age-check
// outcome and abuse reports are KEPT for legal/accounting reasons (listed in `kept`; a lawyer must confirm the retention periods).
//
// Other modules that hold per-player data register an exporter/eraser with `registerPlayerData` (so new games and tables are never forgotten): see the bottom of this file.
import { bad } from './util.js';
import { move, cashId, savId, balanceOf, SYS } from './ledger.js';
import { leaveWorld } from './world.js';
import { releaseProperty } from './economy.js';
import { assertNotFlying } from './flight.js';
import { removeVoice } from './phone/phone.js';
import * as office from './office.js';
import * as signup from './signup.js';
import * as tutorial from './tutorial.js';
import * as missions from './missions.js';
import * as achievements from './achievements.js';

const REG = [];
/** register what a module holds about a player. exportFn(app, uid) -> plain object; eraseFn(app, uid) deletes or anonymises it. `keep` documents anything deliberately retained. */
export function registerPlayerData(name, exportFn, eraseFn, keep = '') { const i = REG.findIndex(r => r.name === name); const e = { name, exportFn, eraseFn, keep }; if (i >= 0) REG[i] = e; else REG.push(e); }
export const registeredNames = () => REG.map(r => r.name);

const all = (app, sql, ...a) => app.db.prepare(sql).all(...a);
const one = (app, sql, ...a) => app.db.prepare(sql).get(...a) || null;
const del = (app, sql, ...a) => app.db.prepare(sql).run(...a).changes;
const iso = (ms) => ms ? new Date(ms).toISOString() : null;

export const isDeleted = (app, uid) => !!app.db.prepare('SELECT 1 FROM account_deletions WHERE user_id=?').get(uid);

// ---- download
export function exportData(app, uid) {
  const u = one(app, 'SELECT id, username, email, is_guest, color, age_confirmed_at, created_at, last_seen FROM users WHERE id=?', uid); if (!u) bad('NO_PLAYER', 'Unknown player.', 404);
  const accts = all(app, 'SELECT id, kind, balance FROM accounts WHERE user_id=?', uid); const ids = accts.map(a => a.id);
  const ledger = ids.length ? all(app, `SELECT e.id, e.account_id, e.amount, e.balance_after, e.created_at, t.reason, t.ref FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id IN (${ids.map(() => '?').join(',')}) ORDER BY e.id`, ...ids).map(r => ({ ...r, at: iso(r.created_at) })) : [];
  const out = {
    format: 'naija-area-data-export', version: 1, exportedAt: iso(app.clock.now()),
    about: 'Everything Naija Area holds about your account. Passwords are stored only as a one-way hash and your network address only as a one-way hash, so neither is included. In-game money is fictional; the wallet and ledger are listed so you can see every movement.',
    account: { id: u.id, username: u.username, email: u.email || null, guest: !!u.is_guest, color: u.color, createdAt: iso(u.created_at), lastSeen: iso(u.last_seen), ageConfirmedAt: iso(u.age_confirmed_at) },
    wallet: { accounts: accts, ledger },
    player: one(app, 'SELECT x,z,ry,mode,energy,hunger,mood,health,hair,total_shifts,city_id,updated_at FROM player_state WHERE user_id=?', uid),
    signupChoices: signup.exportMine(app, uid), tutorial: tutorial.exportMine(app, uid), missions: missions.exportMine(app, uid), achievements: achievements.exportMine(app, uid), office: office.exportMine(app, uid),
    wearables: { owned: all(app, 'SELECT item_id, price_paid, bought_at FROM wearables_owned WHERE user_id=?', uid), worn: all(app, 'SELECT slot, item_id FROM wearables_equipped WHERE user_id=?', uid) },
    guns: { owned: all(app, 'SELECT item_id, price_paid, bought_at FROM guns_owned WHERE user_id=?', uid), equipped: one(app, 'SELECT item_id FROM guns_equipped WHERE user_id=?', uid) },
    bodyguard: one(app, 'SELECT plan, paid, hired_at, until_at, name, with_car FROM bodyguards WHERE user_id=?', uid),
    police: {
      casesYouFiled: all(app, 'SELECT reason, detail, status, created_at FROM police_cases WHERE reporter_id=?', uid),
      casesAgainstYou: all(app, 'SELECT reason, detail, status, created_at FROM police_cases WHERE accused_id=?', uid),
      holds: all(app, 'SELECT reason, charge, status, held_at, until_at, release_how FROM police_holds WHERE user_id=?', uid),
      evidenceAsAttacker: all(app, 'SELECT kind, amount, created_at FROM police_evidence WHERE attacker_id=?', uid)
    },
    home: all(app, 'SELECT property_id, mode, custom_name, paid_price, since FROM property_owner WHERE user_id=?', uid), furniture: all(app, 'SELECT property_id, item_id, bought_at FROM property_items WHERE user_id=?', uid), land: all(app, 'SELECT plot_id, paid_price, bought_at FROM land_plots WHERE user_id=?', uid),
    cars: all(app, 'SELECT model, paid, bought_at, damage FROM player_cars WHERE user_id=?', uid),
    shifts: all(app, 'SELECT job_id, started_at, wage, status FROM shifts WHERE user_id=?', uid),
    notifications: all(app, 'SELECT kind, text, created_at, read_at FROM notifications WHERE user_id=? ORDER BY id', uid),
    chatMessagesYouSent: all(app, 'SELECT text, created_at FROM chat_messages WHERE user_id=? ORDER BY id', uid),
    friends: all(app, 'SELECT user_a, user_b, requested_by, status, created_at FROM friendships WHERE user_a=? OR user_b=?', uid, uid),
    blocksAndMutes: all(app, 'SELECT blocked_id, kind, created_at FROM user_blocks WHERE blocker_id=?', uid),
    phone: { settings: one(app, 'SELECT * FROM phone_settings WHERE user_id=?', uid), messagesYouSent: all(app, 'SELECT thread_id, kind, body, created_at, deleted_at FROM phone_messages WHERE sender_id=? ORDER BY id', uid), voiceNotesYouSent: all(app, 'SELECT id, mime, duration_ms, status, created_at FROM voice_notes WHERE owner_id=? ORDER BY id', uid) },
    games: { scores: all(app, 'SELECT week, kind, wins, losses, draws, points FROM game_scores WHERE user_id=?', uid), casualRuns: all(app, 'SELECT kind, score, reward, day, status, started_at FROM casual_runs WHERE user_id=?', uid), casualDaily: all(app, 'SELECT day, earned, plays FROM casual_daily WHERE user_id=?', uid) },
    travel: { flights: all(app, 'SELECT from_city, to_city, state, fare, created_at FROM flights WHERE user_id=?', uid), boatTrips: all(app, 'SELECT from_stop, to_stop, state, fare, called_at FROM boat_trips WHERE user_id=?', uid), stadiumTickets: all(app, 'SELECT venue_id, day, created_at FROM stadium_tickets WHERE user_id=?', uid) },
    payments: all(app, 'SELECT ref, purpose, net_kobo, vat_kobo, total_kobo, status, paid_at, created_at FROM payment_intents WHERE user_id=? ORDER BY id', uid),
    ageCheck: one(app, 'SELECT result, verified_at, provider FROM age_verifications WHERE user_id=?', uid),
    reportsYouFiled: all(app, 'SELECT kind, reason, detail, created_at, status FROM reports WHERE reporter_id=?', uid),
    adActivity: { impressions: one(app, 'SELECT COUNT(*) n FROM ad_impressions WHERE user_id=?', uid).n, taps: one(app, 'SELECT COUNT(*) n FROM ad_taps WHERE user_id=?', uid).n }
  };
  for (const r of REG) { try { out[r.name] = r.exportFn(app, uid); } catch (e) { out[r.name] = { error: 'could not be read: ' + e.message }; } }
  return out;
}

// ---- close the account
const KEPT = 'money ledger entries (anonymous accounts), real-money payment records, the age-check outcome, abuse reports you filed or that name you, finished game matches, audit log';
export async function deleteAccount(app, uid, { password, confirm } = {}) {
  const u = one(app, 'SELECT id, username, pass_hash, is_guest, is_bot FROM users WHERE id=?', uid); if (!u || isDeleted(app, uid)) bad('NO_PLAYER', 'Unknown player.', 404); if (u.is_bot) bad('NO_BOTS', 'Bots cannot be closed here.', 403);
  if (String(confirm || '').trim().toUpperCase() !== 'DELETE') bad('CONFIRM_NEEDED', 'Type DELETE to confirm.');
  if (!u.is_guest) { const ok = typeof password === 'string' && u.pass_hash && await app.platform.verify(password, u.pass_hash); if (!ok) bad('BAD_PASSWORD', 'Wrong password.', 401); }
  try { assertNotFlying(app, uid); } catch (e) { if (e.code === 'FLYING' || e.code === 'ABOARD') bad('TRAVELLING', 'You are travelling. Arrive first, then close your account.', 409); throw e; }
  if (one(app, "SELECT 1 FROM game_players gp JOIN game_matches m ON m.id=gp.match_id WHERE gp.user_id=? AND m.status IN ('waiting','active')", uid)) bad('IN_GAME', 'Finish or leave your game first.', 409);
  if (app.world.players.get(uid)?.venue) bad('INSIDE', 'Step outside first.', 409);
  const now = app.clock.now(); const stateRow = one(app, 'SELECT 1 FROM player_state WHERE user_id=?', uid);
  const res = app.db.transaction(() => {
    leaveWorld(app, uid);
    try { releaseProperty(app, uid); } catch (e) { if (e.code && e.code !== 'NO_HOME') throw e; }
    for (const v of all(app, "SELECT id FROM voice_notes WHERE owner_id=? AND status!='removed'", uid)) removeVoice(app, v.id, 'account_closed');
    let forfeited = 0; for (const a of [cashId(uid), savId(uid)]) { const bal = balanceOf(app.db, a); if (bal > 0) { move(app, { from: a, to: SYS.SINK_FEES, amount: bal, reason: 'account_closed', userId: uid, idemKey: `close:${a}` }); forfeited += bal; } }
    del(app, 'DELETE FROM notifications WHERE user_id=?', uid); del(app, 'DELETE FROM chat_messages WHERE user_id=?', uid); del(app, 'DELETE FROM room_events WHERE user_id=?', uid); del(app, 'DELETE FROM house_loves WHERE user_id=?', uid); del(app, 'DELETE FROM knocks WHERE visitor_id=? OR owner_id=?', uid, uid);
    del(app, 'DELETE FROM friendships WHERE user_a=? OR user_b=?', uid, uid); del(app, 'DELETE FROM user_blocks WHERE blocker_id=? OR blocked_id=?', uid, uid);
    app.db.prepare("UPDATE phone_messages SET body='', deleted_at=COALESCE(deleted_at, ?) WHERE sender_id=?").run(now, uid); del(app, 'DELETE FROM phone_settings WHERE user_id=?', uid); del(app, 'DELETE FROM phone_reads WHERE user_id=?', uid);
    del(app, 'DELETE FROM land_plots WHERE user_id=?', uid); del(app, 'DELETE FROM property_items WHERE user_id=?', uid); del(app, 'DELETE FROM car_parking WHERE user_id=?', uid); del(app, 'DELETE FROM player_cars WHERE user_id=?', uid); del(app, 'DELETE FROM crash_events WHERE user_id=?', uid);
    del(app, 'DELETE FROM wearables_owned WHERE user_id=?', uid); del(app, 'DELETE FROM wearables_equipped WHERE user_id=?', uid);
    del(app, 'DELETE FROM guns_owned WHERE user_id=?', uid); del(app, 'DELETE FROM guns_equipped WHERE user_id=?', uid); del(app, 'DELETE FROM bodyguards WHERE user_id=?', uid);
    del(app, 'DELETE FROM police_cases WHERE reporter_id=? OR accused_id=?', uid, uid);
    del(app, 'DELETE FROM police_evidence WHERE attacker_id=? OR victim_id=?', uid, uid);
    del(app, 'DELETE FROM police_holds WHERE user_id=?', uid);
    del(app, 'DELETE FROM shifts WHERE user_id=?', uid); del(app, 'DELETE FROM game_scores WHERE user_id=?', uid); del(app, 'DELETE FROM casual_runs WHERE user_id=?', uid); del(app, 'DELETE FROM casual_daily WHERE user_id=?', uid);
    del(app, 'DELETE FROM flights WHERE user_id=?', uid); del(app, 'DELETE FROM boat_trips WHERE user_id=?', uid); del(app, 'DELETE FROM stadium_tickets WHERE user_id=?', uid);
    del(app, 'DELETE FROM ad_impressions WHERE user_id=?', uid); del(app, 'DELETE FROM ad_taps WHERE user_id=?', uid); del(app, 'DELETE FROM age_sessions WHERE user_id=?', uid);
    signup.deleteMine(app, uid); office.deleteMine(app, uid); tutorial.deleteMine(app, uid); missions.deleteMine(app, uid); achievements.deleteMine(app, uid);
    app.db.prepare("UPDATE payment_intents SET email='' WHERE user_id=?").run(uid);
    let kept = KEPT; for (const r of REG) { r.eraseFn(app, uid); if (r.keep) kept += '; ' + r.keep; }
    if (stateRow) del(app, 'DELETE FROM player_state WHERE user_id=?', uid);
    app.db.prepare("UPDATE users SET username=?, pass_hash=NULL, email=NULL, color='#9aa0a6', signup_ip_hash=NULL, last_seen=NULL WHERE id=?").run(`deleted_${uid}`, uid);
    app.db.prepare('INSERT INTO account_deletions(user_id, deleted_at, was_guest, forfeited, kept) VALUES (?,?,?,?,?)').run(uid, now, u.is_guest ? 1 : 0, forfeited, kept);
    app.db.prepare("INSERT INTO audit_log(actor, action, detail, created_at) VALUES (?,?,?,?)").run(`user:${uid}`, 'account_closed', JSON.stringify({ forfeited }), now);
    return { ok: true, forfeited, kept: kept.split('; ') };
  })();
  app.deletedUsers?.add(uid); return res;
}
/** load the set of closed accounts at start, so every request can refuse their old session cookie cheaply */
export function loadDeleted(app) { app.deletedUsers = new Set(app.db.prepare('SELECT user_id FROM account_deletions').all().map(r => r.user_id)); return app.deletedUsers; }
