// Table games between two real players at venue stations. Server-authoritative: the client only sends a move; the engine validates it.
// GAME MONEY ONLY: stakes are pretend naira held in an escrow account in the ledger, paid to the winner (no rake), refunded on a draw/cancel.
import { bad } from './util.js';
import { notify, addMood } from './economy.js';
import { move as ledgerMove, cashId, balanceOf, SYS } from './ledger.js';
import { isBlocked } from './safety.js';
import * as whot from './games/whot.js';
import * as ayo from './games/ayo.js';

const ENGINES = { whot, ayo };
const DAY = 86400000, WEEK = 7 * DAY;
export const weekOf = (ms) => Math.floor((ms - 4 * DAY) / WEEK);   // weeks start Monday 00:00 UTC (1970-01-05 was a Monday)
export const weekInfo = (app) => { const n = app.clock.now(); const w = weekOf(n); return { week: w, endsAt: 4 * DAY + (w + 1) * WEEK }; };
const nameOf = (app, id) => app.db.prepare('SELECT username FROM users WHERE id=?').get(id)?.username;
const row = (app, id) => app.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id);
const rngOf = (app) => app.rng || Math.random;
const sideOf = (m, uid) => (uid === m.p1 ? 'a' : uid === m.p2 ? 'b' : null);

function escrowIn(app, m, uid) { if (m.stake > 0) ledgerMove(app, { from: cashId(uid), to: SYS.ESCROW_GAMES, amount: m.stake, reason: 'game_stake', ref: `match:${m.id}`, userId: uid, idemKey: `game:${m.id}:stake:${uid}` }); }
function escrowOut(app, m, uid, amount, why) { if (amount > 0) ledgerMove(app, { from: SYS.ESCROW_GAMES, to: cashId(uid), amount, reason: why, ref: `match:${m.id}`, userId: uid, idemKey: `game:${m.id}:${why}:${uid}` }); }

/** one live (waiting/active) match per station, and one per player */
export function stationMatch(app, uid, venueId, stationId) {
  expireStale(app); const m = app.db.prepare("SELECT * FROM game_matches WHERE venue_id=? AND station_id=? AND status IN ('waiting','active') ORDER BY id DESC LIMIT 1").get(venueId, stationId);
  if (!m) return null; return { id: m.id, status: m.status, stake: m.stake, kind: m.kind, p1: nameOf(app, m.p1), p2: m.p2 ? nameOf(app, m.p2) : null, you: sideOf(m, uid) ? true : false };
}
export function myMatch(app, uid, { onlyLive = false } = {}) {
  expireStale(app); const now = app.clock.now();
  const m = app.db.prepare(`SELECT * FROM game_matches WHERE (p1=? OR p2=?) AND (status IN ('waiting','active') ${onlyLive ? '' : "OR (status IN ('finished','cancelled') AND updated_at>?)"}) ORDER BY id DESC LIMIT 1`).get(...(onlyLive ? [uid, uid] : [uid, uid, now - 45000]));
  return m || null;
}
export function viewFor(app, uid, m) {
  const side = sideOf(m, uid); const st = m.state ? JSON.parse(m.state) : null; const eng = ENGINES[m.kind];
  const result = m.status === 'finished' ? { winner: m.winner ? nameOf(app, m.winner) : 'draw', youWon: m.winner === uid, draw: !m.winner, why: m.result } : m.status === 'cancelled' ? { cancelled: true, why: m.result } : null;
  return { id: m.id, venueId: m.venue_id, stationId: m.station_id, kind: m.kind, status: m.status, stake: m.stake, you: side, p1: nameOf(app, m.p1), p2: m.p2 ? nameOf(app, m.p2) : null,
    turn: m.turn_user ? nameOf(app, m.turn_user) : null, deadlineAt: m.deadline_at, board: st && side ? eng.view(st, side) : null, result, pot: m.stake * 2, now: app.clock.now() };
}
export function myMatchView(app, uid) { const m = myMatch(app, uid); return m ? viewFor(app, uid, m) : null; }
export function getMatch(app, uid, id) { expireStale(app); const m = row(app, id); if (!m || (m.p1 !== uid && m.p2 !== uid)) bad('NO_MATCH', 'No such game.', 404); return viewFor(app, uid, m); }

/** sit at a station: join the waiting player, or wait for an opponent with the chosen stake */
export function sit(app, uid, venueId, stationId, stake = 0) {
  const G = app.balance.games; const v = (app.city.venues || []).find(x => x.id === venueId); const st = v?.stations.find(s => s.id === stationId);
  if (!st || st.type !== 'game') bad('NO_STATION', 'No table like that here.', 404);
  const p = app.world.players.get(uid); if (!p || p.venue !== venueId) bad('NOT_INSIDE', 'Step inside first.', 409);
  const now = app.clock.now(); if (!app.limiter.hit(`sit:${uid}`, G.sitPerMin, 60000, now)) bad('RATE_LIMIT', 'Slow down a little.', 429);
  expireStale(app); if (myMatch(app, uid, { onlyLive: true })) bad('ALREADY_PLAYING', 'You are already seated at a game.', 409);
  const me = app.db.prepare('SELECT is_guest, created_at FROM users WHERE id=?').get(uid);
  return app.db.transaction(() => {
    const w = app.db.prepare("SELECT * FROM game_matches WHERE venue_id=? AND station_id=? AND status='waiting' ORDER BY id LIMIT 1").get(venueId, stationId);
    if (app.db.prepare("SELECT 1 FROM game_matches WHERE venue_id=? AND station_id=? AND status='active'").get(venueId, stationId)) bad('TABLE_BUSY', 'This table is in use. Try another one.', 409);
    const useStake = w ? w.stake : stake;
    if (!G.stakes.includes(useStake)) bad('BAD_STAKE', `Stake must be one of: ${G.stakes.join(', ')}.`);
    if (useStake > 0) {
      if (me.is_guest && !G.guestsMayStake) bad('GUEST_NOT_ALLOWED', 'Guests can play friendly games only. Create an account to play for stakes.', 403);
      if (now - me.created_at < app.balance.transfer.minAccountAgeMs) bad('ACCOUNT_TOO_NEW', 'New accounts can play for stakes after a short wait. Friendly games are open now.', 403);
    }
    if (w) {
      if (w.p1 === uid) bad('ALREADY_PLAYING', 'You are already waiting here.', 409); if (isBlocked(app, uid, w.p1)) bad('CANNOT_PLAY', 'You cannot play with this player.', 403);
      if (useStake > 0) { const n = app.db.prepare("SELECT COUNT(*) n FROM game_matches WHERE stake>0 AND status!='cancelled' AND created_at>? AND ((p1=? AND p2=?) OR (p1=? AND p2=?))").get(now - DAY, uid, w.p1, w.p1, uid).n; if (n >= G.maxStakedPerPairPerDay) bad('PAIR_LIMIT', 'You two have played a lot of staked games today. Try someone else or play friendly.', 429); }
      const mm = { ...w, p2: uid }; escrowIn(app, mm, uid);
      const eng = ENGINES[w.kind]; const state = eng.newGame(rngOf(app)); const turnUser = state.turn === 'a' ? w.p1 : uid;
      app.db.prepare("UPDATE game_matches SET p2=?, status='active', state=?, turn_user=?, updated_at=?, deadline_at=? WHERE id=?").run(uid, JSON.stringify(state), turnUser, now, now + G.turnMs, w.id);
      notify(app, w.p1, 'game', `@${nameOf(app, uid)} joined your ${w.kind === 'ayo' ? 'Ayo' : 'Whot'} table${useStake ? ` (stake ₦${useStake})` : ''}. Your game has started!`);
      return viewFor(app, uid, row(app, w.id));
    }
    const kind = st.game; const r = app.db.prepare("INSERT INTO game_matches(venue_id,station_id,kind,p1,stake,status,created_at,updated_at,deadline_at) VALUES (?,?,?,?,?,'waiting',?,?,?)").run(venueId, stationId, kind, uid, useStake, now, now, now + G.waitMs);
    const m = row(app, Number(r.lastInsertRowid)); escrowIn(app, m, uid); return viewFor(app, uid, m);
  })();
}
export function cancel(app, uid, id) {
  return app.db.transaction(() => {
    const m = row(app, id); if (!m || m.p1 !== uid) bad('NO_MATCH', 'No such game.', 404); if (m.status !== 'waiting') bad('NOT_WAITING', 'The game has already started.', 409);
    app.db.prepare("UPDATE game_matches SET status='cancelled', result='Left the table', updated_at=? WHERE id=?").run(app.clock.now(), id); escrowOut(app, m, uid, m.stake, 'game_refund'); return { ok: true };
  })();
}
export function playMove(app, uid, id, mv = {}) {
  return app.db.transaction(() => {
    expireStale(app); const m = row(app, id); if (!m || sideOf(m, uid) === null) bad('NO_MATCH', 'No such game.', 404);
    if (m.status !== 'active') bad('NOT_ACTIVE', m.status === 'waiting' ? 'Waiting for an opponent.' : 'This game is over.', 409);
    const side = sideOf(m, uid); const eng = ENGINES[m.kind]; const st = JSON.parse(m.state); let r;
    if (m.kind === 'whot') r = mv.action === 'draw' ? whot.draw(st, side, rngOf(app)) : whot.play(st, side, String(mv.card || ''), mv.shape, rngOf(app));
    else r = ayo.play(st, side, Number(mv.house));
    if (r.error) bad(r.error, r.message || 'That move is not allowed.', r.error === 'NOT_YOUR_TURN' ? 409 : 400);
    const now = app.clock.now(); const turnUser = st.winner ? null : st.turn === 'a' ? m.p1 : m.p2;
    app.db.prepare('UPDATE game_matches SET state=?, turn_user=?, updated_at=?, deadline_at=? WHERE id=?').run(JSON.stringify(st), turnUser, now, now + app.balance.games.turnMs, id);
    if (st.winner) finish(app, row(app, id), st.winner === 'draw' ? null : st.winner === 'a' ? m.p1 : m.p2, 'Played to the end');
    void eng; return viewFor(app, uid, row(app, id));
  })();
}
export function resign(app, uid, id) {
  return app.db.transaction(() => {
    const m = row(app, id); if (!m || sideOf(m, uid) === null) bad('NO_MATCH', 'No such game.', 404);
    if (m.status === 'waiting') return cancel(app, uid, id); if (m.status !== 'active') bad('NOT_ACTIVE', 'This game is over.', 409);
    finish(app, m, uid === m.p1 ? m.p2 : m.p1, `@${nameOf(app, uid)} resigned`); return viewFor(app, uid, row(app, id));
  })();
}
/** pay out, score, notify. winner = user id or null for a draw. Idempotent via the status flip + ledger idem keys. */
function finish(app, m, winner, why) {
  const now = app.clock.now(); const G = app.balance.games; const M = app.balance.mood;
  const u = app.db.prepare("UPDATE game_matches SET status='finished', winner=?, result=?, turn_user=NULL, updated_at=? WHERE id=? AND status='active'").run(winner, why, now, m.id); if (u.changes !== 1) return;
  if (m.stake > 0) { if (winner) escrowOut(app, m, winner, m.stake * 2, 'game_win'); else { escrowOut(app, m, m.p1, m.stake, 'game_refund'); escrowOut(app, m, m.p2, m.stake, 'game_refund'); } }
  const practice = app.db.prepare('SELECT COUNT(*) n FROM users WHERE id IN (?,?) AND is_bot=1').get(m.p1, m.p2).n > 0; // practice games never touch the weekly board
  const w = weekOf(now); const bump = (uid, col, pts) => { if (practice) return; app.db.prepare('INSERT INTO game_scores(week,kind,user_id) VALUES (?,?,?) ON CONFLICT(week,kind,user_id) DO NOTHING').run(w, m.kind, uid); app.db.prepare(`UPDATE game_scores SET ${col}=${col}+1, points=points+? WHERE week=? AND kind=? AND user_id=?`).run(pts, w, m.kind, uid); };
  for (const uid of [m.p1, m.p2]) {
    if (!winner) { bump(uid, 'draws', G.pointsDraw); addMood(app, uid, M.gameDraw); notify(app, uid, 'game', `Draw! ${m.stake ? `Your ₦${m.stake} came back.` : ''}`.trim()); }
    else if (uid === winner) { bump(uid, 'wins', G.pointsWin); addMood(app, uid, M.gameWin); notify(app, uid, 'game', `You won! ${m.stake ? `+₦${m.stake * 2} (game money).` : '+3 points on the weekly board.'}`); }
    else { bump(uid, 'losses', 0); addMood(app, uid, M.gameLoss); notify(app, uid, 'game', `You lost this one. ${why}. Next time!`); }
  }
}
/** lazy timers: a player who lets the clock run out forfeits; unanswered tables are closed and refunded */
export function expireStale(app) {
  const now = app.clock.now(); const rows = app.db.prepare("SELECT * FROM game_matches WHERE status IN ('waiting','active') AND deadline_at<?").all(now);
  for (const m of rows) app.db.transaction(() => {
    if (m.status === 'waiting') { app.db.prepare("UPDATE game_matches SET status='cancelled', result='Nobody sat down', updated_at=? WHERE id=? AND status='waiting'").run(now, m.id); escrowOut(app, m, m.p1, m.stake, 'game_refund'); }
    else finish(app, m, m.turn_user === m.p1 ? m.p2 : m.p1, `@${nameOf(app, m.turn_user)} ran out of time`);
  })();
}
export const tickGames = (app) => expireStale(app);

/** weekly scoreboard (Monday-based weeks, UTC). kind: whot | ayo | undefined (both) */
export function scoreboard(app, { kind, weekOffset = 0 } = {}) {
  const w = weekOf(app.clock.now()) - Math.max(0, Math.min(8, weekOffset | 0)); const kinds = kind && ENGINES[kind] ? [kind] : Object.keys(ENGINES);
  const rows = app.db.prepare(`SELECT u.username, SUM(s.wins) wins, SUM(s.losses) losses, SUM(s.draws) draws, SUM(s.points) points FROM game_scores s JOIN users u ON u.id=s.user_id WHERE s.week=? AND s.kind IN (${kinds.map(() => '?').join(',')}) GROUP BY s.user_id ORDER BY points DESC, wins DESC, u.username LIMIT 10`).all(w, ...kinds);
  return { week: w, endsAt: 4 * DAY + (w + 1) * WEEK, kind: kind || 'all', rows: rows.map((r, i) => ({ rank: i + 1, ...r })), scoring: `Win ${app.balance.games.pointsWin}, draw ${app.balance.games.pointsDraw}, loss 0. Game money only.` };
}
void balanceOf;
