// Table games at venue stations (Whot: 2 players, Ludo: 2 to 4). Server-authoritative: the client only sends an action (roll / move / draw / play a card);
// the engine validates it, rolls the dice and shuffles the deck. GAME MONEY ONLY: stakes are pretend naira held in an escrow account in the ledger,
// paid to the winner (no rake), refunded on a draw/cancel. Seats live in game_players; game_matches.p1 is the host.
import { bad } from './util.js';
import { notify, addMood } from './economy.js';
import { move as ledgerMove, cashId, SYS } from './ledger.js';
import { isBlocked } from './safety.js';
import * as guardian from './guardian.js';
import * as whot from './games/whot.js';
import * as ludo from './games/ludo.js';
import * as dominoes from './games/dominoes.js';
import * as draughts from './games/draughts.js';
import * as ayo from './games/ayo.js';
import * as football from './games/football.js';
import * as chess from './games/chess.js';
import * as wordduel from './games/wordduel.js';
import * as landlord from './games/landlord.js';
import * as suwe from './games/suwe.js';

// Every engine except Whot (the original, 'a'/'b' sides) shares one contract: newGame(n, rng), play(st, seat, move, rng) -> {ok,won}|{error}, forfeit(st, seat), view(st, seat), bot(st, seat, rng).
// State carries n (players), turn (seat index), winner (null | seat | 'draw').
export const GAMES = { whot: { label: 'Whot', min: 2, max: 2, eng: whot }, ludo: { label: 'Ludo', min: 2, max: 4, eng: ludo }, dominoes: { label: 'Dominoes', min: 2, max: 4, eng: dominoes },
  draughts: { label: 'Draughts', min: 2, max: 2, eng: draughts }, ayo: { label: 'Ayo', min: 2, max: 2, eng: ayo }, football: { label: 'Table football', min: 2, max: 2, eng: football }, chess: { label: 'Chess', min: 2, max: 2, eng: chess }, wordduel: { label: 'Word duel', min: 2, max: 2, eng: wordduel }, landlord: { label: 'Landlord Lagos', min: 2, max: 4, eng: landlord }, suwe: { label: 'Suwe', min: 2, max: 2, eng: suwe } };
const DAY = 86400000, WEEK = 7 * DAY;
export const weekOf = (ms) => Math.floor((ms - 4 * DAY) / WEEK);   // weeks start Monday 00:00 UTC (1970-01-05 was a Monday)
export const weekInfo = (app) => { const w = weekOf(app.clock.now()); return { week: w, endsAt: 4 * DAY + (w + 1) * WEEK }; };
import { SPORTS_GAMES } from './sports-games.js'; import * as sports from './sports.js'; Object.assign(GAMES, SPORTS_GAMES);   // ping pong + tennis (Sports and Games Hall)
const nameOf = (app, id) => app.db.prepare('SELECT username FROM users WHERE id=?').get(id)?.username;
const row = (app, id) => app.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id);
const rngOf = (app) => app.rng || Math.random;
const seatsOf = (app, id) => app.db.prepare('SELECT user_id, seat, out FROM game_players WHERE match_id=? ORDER BY seat').all(id);
const seatOf = (app, m, uid) => seatsOf(app, m.id).find(s => s.user_id === uid) || null;
const side = (m, seat) => (m.kind === 'whot' ? 'ab'[seat] : seat);           // engine-side identity of a seat
const paidCount = (app, m) => (m.state ? (m.kind === 'whot' ? 2 : JSON.parse(m.state).n) : seatsOf(app, m.id).length);

const joins = (app, m, uid) => app.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE ref=? AND user_id=? AND reason='game_stake'").get(`match:${m.id}`, uid).n;   // a player may leave a waiting table and sit again: each seating is its own ledger entry
function escrowIn(app, m, uid) { if (m.stake > 0) ledgerMove(app, { from: cashId(uid), to: SYS.ESCROW_GAMES, amount: m.stake, reason: 'game_stake', ref: `match:${m.id}`, userId: uid, idemKey: `game:${m.id}:stake:${uid}:${joins(app, m, uid)}` }); }
function escrowOut(app, m, uid, amount, why) { if (amount > 0) ledgerMove(app, { from: SYS.ESCROW_GAMES, to: cashId(uid), amount, reason: why, ref: `match:${m.id}`, userId: uid, idemKey: `game:${m.id}:${why}:${uid}:${joins(app, m, uid)}` }); }

export function stationMatch(app, uid, venueId, stationId) {
  expireStale(app); const m = app.db.prepare("SELECT * FROM game_matches WHERE venue_id=? AND station_id=? AND status IN ('waiting','active') ORDER BY id DESC LIMIT 1").get(venueId, stationId); if (!m) return null;
  const seats = seatsOf(app, m.id); return { id: m.id, status: m.status, stake: m.stake, kind: m.kind, host: nameOf(app, m.p1), players: seats.map(s => nameOf(app, s.user_id)), max: GAMES[m.kind].max, min: GAMES[m.kind].min, you: seats.some(s => s.user_id === uid && !s.out) };
}
export function myMatch(app, uid, { onlyLive = false } = {}) {
  expireStale(app); const now = app.clock.now();
  return app.db.prepare(`SELECT m.* FROM game_matches m JOIN game_players gp ON gp.match_id=m.id WHERE gp.user_id=? AND ((gp.out=0 AND m.status IN ('waiting','active')) ${onlyLive ? '' : "OR (m.status IN ('finished','cancelled') AND m.updated_at>?)"}) ORDER BY m.id DESC LIMIT 1`).get(...(onlyLive ? [uid] : [uid, now - 45000])) || null;
}
export function viewFor(app, uid, m) {
  const seats = seatsOf(app, m.id); const mine = seats.find(s => s.user_id === uid); const st = m.state ? JSON.parse(m.state) : null; const G = GAMES[m.kind];
  const result = m.status === 'finished' ? { winner: m.winner ? nameOf(app, m.winner) : 'draw', youWon: m.winner === uid, draw: !m.winner, why: m.result } : m.status === 'cancelled' ? { cancelled: true, why: m.result } : null;
  return { id: m.id, venueId: m.venue_id, stationId: m.station_id, kind: m.kind, label: G.label, status: m.status, stake: m.stake, host: nameOf(app, m.p1), isHost: m.p1 === uid, min: G.min, max: G.max,
    players: seats.map(s => ({ name: nameOf(app, s.user_id), seat: s.seat, out: !!s.out, you: s.user_id === uid })), you: mine ? side(m, mine.seat) : null, youSeat: mine?.seat ?? null,
    canStart: m.status === 'waiting' && m.p1 === uid && G.max > 2 && seats.length >= G.min, turn: m.turn_user ? nameOf(app, m.turn_user) : null, deadlineAt: m.deadline_at,
    board: st && mine ? G.eng.view(st, side(m, mine.seat)) : null, result, pot: m.stake * paidCount(app, m), now: app.clock.now() };
}
export function myMatchView(app, uid) { const m = myMatch(app, uid); return m ? viewFor(app, uid, m) : null; }
export function getMatch(app, uid, id) { expireStale(app); const m = row(app, id); if (!m || !seatOf(app, m, uid)) bad('NO_MATCH', 'No such game.', 404); return viewFor(app, uid, m); }

function activate(app, m, now) {
  const seats = seatsOf(app, m.id); const eng = GAMES[m.kind].eng; const st = m.kind === 'whot' ? eng.newGame(rngOf(app)) : eng.newGame(seats.length, rngOf(app));
  const turnUser = seats[m.kind === 'whot' ? (st.turn === 'a' ? 0 : 1) : st.turn].user_id;
  app.db.prepare("UPDATE game_matches SET status='active', state=?, turn_user=?, updated_at=?, deadline_at=? WHERE id=?").run(JSON.stringify(st), turnUser, now, now + app.balance.games.turnMs, m.id);
  for (const s of seats) if (s.user_id !== m.p1) notify(app, s.user_id, 'game', `Your ${GAMES[m.kind].label} game has started!`); notify(app, m.p1, 'game', `Your ${GAMES[m.kind].label} game has started!`);
}
export function sit(app, uid, venueId, stationId, stake = 0) {
  const G = app.balance.games; const v = app.all.venueById[venueId]; const st = v?.stations.find(s => s.id === stationId);
  if (!st || st.type !== 'game') bad('NO_STATION', 'No table like that here.', 404); const kind = sports.kindOf(st); if (!kind) bad('COMING_SOON', 'That game is not open yet. It lights up here when it is ready.', 409);
  const p = app.world.players.get(uid); if (!p || p.venue !== venueId) bad('NOT_INSIDE', 'Step inside first.', 409);
  const now = app.clock.now(); if (!app.limiter.hit(`sit:${uid}`, G.sitPerMin, 60000, now)) bad('RATE_LIMIT', 'Slow down a little.', 429);
  expireStale(app); if (myMatch(app, uid, { onlyLive: true })) bad('ALREADY_PLAYING', 'You are already seated at a game.', 409);
  const me = app.db.prepare('SELECT is_guest, created_at FROM users WHERE id=?').get(uid);
  return app.db.transaction(() => {
    if (app.db.prepare("SELECT 1 FROM game_matches WHERE venue_id=? AND station_id=? AND status='active'").get(venueId, stationId)) bad('TABLE_BUSY', 'This table is in use. Try another one.', 409);
    const w = app.db.prepare("SELECT * FROM game_matches WHERE venue_id=? AND station_id=? AND status='waiting' ORDER BY id LIMIT 1").get(venueId, stationId);
    const useStake = w ? w.stake : stake; if (!G.stakes.includes(useStake)) bad('BAD_STAKE', `Stake must be one of: ${G.stakes.join(', ')}.`); guardian.assertStake(app, uid, useStake);
    if (useStake > 0) {
      if (me.is_guest && !G.guestsMayStake) bad('GUEST_NOT_ALLOWED', 'Guests can play friendly games only. Create an account to play for stakes.', 403);
      if (now - me.created_at < app.balance.transfer.minAccountAgeMs) bad('ACCOUNT_TOO_NEW', 'New accounts can play for stakes after a short wait. Friendly games are open now.', 403);
    }
    if (w) {
      const seats = seatsOf(app, w.id); const Gm = GAMES[w.kind]; if (seats.length >= Gm.max) bad('TABLE_FULL', 'This table is full.', 409);
      for (const s of seats) if (isBlocked(app, uid, s.user_id)) bad('CANNOT_PLAY', 'You cannot play with this player.', 403);
      if (useStake > 0) { const n = app.db.prepare("SELECT COUNT(DISTINCT m.id) n FROM game_matches m JOIN game_players a ON a.match_id=m.id AND a.user_id=? JOIN game_players b ON b.match_id=m.id AND b.user_id=? WHERE m.stake>0 AND m.status!='cancelled' AND m.created_at>?").get(uid, w.p1, now - DAY).n; if (n >= G.maxStakedPerPairPerDay) bad('PAIR_LIMIT', 'You and the host have played a lot of staked games today. Try someone else or play friendly.', 429); }
      escrowIn(app, w, uid); app.db.prepare('INSERT INTO game_players(match_id,user_id,seat) VALUES (?,?,?)').run(w.id, uid, seats.length);
      notify(app, w.p1, 'game', `@${nameOf(app, uid)} joined your ${Gm.label} table${useStake ? ` (stake ₦${useStake})` : ''}.`);
      app.db.prepare('UPDATE game_matches SET deadline_at=?, updated_at=? WHERE id=?').run(now + G.waitMs, now, w.id);
      if (seats.length + 1 >= Gm.max) activate(app, row(app, w.id), now);   // full table starts by itself; Ludo with fewer seats waits for the host's Start
      else if (w.kind === 'whot') activate(app, row(app, w.id), now);
      return viewFor(app, uid, row(app, w.id));
    }
    const r = app.db.prepare("INSERT INTO game_matches(venue_id,station_id,kind,p1,stake,status,created_at,updated_at,deadline_at) VALUES (?,?,?,?,?,'waiting',?,?,?)").run(venueId, stationId, kind, uid, useStake, now, now, now + G.waitMs);
    const m = row(app, Number(r.lastInsertRowid)); escrowIn(app, m, uid); app.db.prepare('INSERT INTO game_players(match_id,user_id,seat) VALUES (?,?,0)').run(m.id, uid); return viewFor(app, uid, m);
  })();
}
export function start(app, uid, id) {
  return app.db.transaction(() => {
    const m = row(app, id); if (!m || m.p1 !== uid) bad('NO_MATCH', 'Only the host can start the game.', 404); if (m.status !== 'waiting') bad('NOT_WAITING', 'Already started.', 409);
    if (seatsOf(app, id).length < GAMES[m.kind].min) bad('NEED_PLAYERS', `Wait for at least ${GAMES[m.kind].min} players.`, 409); activate(app, m, app.clock.now()); return viewFor(app, uid, row(app, id));
  })();
}
/** leave a waiting table (refund). The host leaving hands the table to the next player. */
export function cancel(app, uid, id) {
  return app.db.transaction(() => {
    const m = row(app, id); const me = m && seatOf(app, m, uid); if (!m || !me) bad('NO_MATCH', 'No such game.', 404); if (m.status !== 'waiting') bad('NOT_WAITING', 'The game has already started.', 409);
    const now = app.clock.now(); escrowOut(app, m, uid, m.stake, 'game_refund'); app.db.prepare('DELETE FROM game_players WHERE match_id=? AND user_id=?').run(id, uid);
    const rest = seatsOf(app, id); if (!rest.length) app.db.prepare("UPDATE game_matches SET status='cancelled', result='Left the table', updated_at=? WHERE id=?").run(now, id);
    else { rest.forEach((s, i) => app.db.prepare('UPDATE game_players SET seat=? WHERE match_id=? AND user_id=?').run(i, id, s.user_id)); app.db.prepare('UPDATE game_matches SET p1=?, updated_at=? WHERE id=?').run(rest[0].user_id, now, id); }
    return { ok: true };
  })();
}
export function playMove(app, uid, id, mv = {}) {
  return app.db.transaction(() => {
    expireStale(app); const m = row(app, id); const me = m && seatOf(app, m, uid); if (!m || !me) bad('NO_MATCH', 'No such game.', 404);
    if (m.status !== 'active') bad('NOT_ACTIVE', m.status === 'waiting' ? 'Waiting for the game to start.' : 'This game is over.', 409); if (me.out) bad('NOT_ACTIVE', 'You left this game.', 409);
    const sd = side(m, me.seat); const st = JSON.parse(m.state); let r;
    if (m.kind === 'whot') r = mv.action === 'draw' ? whot.draw(st, sd, rngOf(app)) : whot.play(st, sd, String(mv.card || ''), mv.shape, rngOf(app));
    else { const isBot = !!app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid)?.is_bot; r = GAMES[m.kind].eng.play(st, sd, GAMES[m.kind].prep ? GAMES[m.kind].prep(app, st, mv, isBot) : mv, rngOf(app), { now: app.clock.now(), turnStart: m.updated_at, bot: isBot }); }
    if (r.error) bad(r.error, r.message || 'That move is not allowed.', r.error === 'NOT_YOUR_TURN' ? 409 : 400);
    persist(app, m, st, uid); sports.botReplies(app, id); return viewFor(app, uid, row(app, id));
  })();
}
function persist(app, m, st, actor) {
  const now = app.clock.now(); const seats = seatsOf(app, m.id); const turnSeat = m.kind !== 'whot' ? st.turn : (st.turn === 'a' ? 0 : 1);
  const winnerSeat = m.kind !== 'whot' ? st.winner : st.winner === 'draw' ? 'draw' : st.winner === 'a' ? 0 : st.winner === 'b' ? 1 : null;
  app.db.prepare('UPDATE game_matches SET state=?, turn_user=?, updated_at=?, deadline_at=? WHERE id=?').run(JSON.stringify(st), winnerSeat != null ? null : seats[turnSeat]?.user_id ?? null, now, now + app.balance.games.turnMs, m.id);
  if (winnerSeat != null) finish(app, row(app, m.id), winnerSeat === 'draw' ? null : seats[winnerSeat].user_id, st.why || 'Played to the end'); void actor;
}
export function resign(app, uid, id) {
  return app.db.transaction(() => {
    const m = row(app, id); const me = m && seatOf(app, m, uid); if (!m || !me) bad('NO_MATCH', 'No such game.', 404);
    if (m.status === 'waiting') return cancel(app, uid, id); if (m.status !== 'active' || me.out) bad('NOT_ACTIVE', 'This game is over.', 409); leaveActive(app, m, uid, `@${nameOf(app, uid)} resigned`); return viewFor(app, uid, row(app, id));
  })();
}
/** a player leaves an ACTIVE game (resign or time-out). Whot: opponent wins. Ludo: their tokens leave, last one standing wins. Stake stays in the pot. */
function leaveActive(app, m, uid, why) {
  const seats = seatsOf(app, m.id); const me = seats.find(s => s.user_id === uid); const st = JSON.parse(m.state);
  if (m.kind === 'whot') return finish(app, m, seats.find(s => s.user_id !== uid).user_id, why);
  app.db.prepare('UPDATE game_players SET out=1 WHERE match_id=? AND user_id=?').run(m.id, uid); GAMES[m.kind].eng.forfeit(st, me.seat); notify(app, uid, 'game', `You left the ${GAMES[m.kind].label} game. ${why}.`);
  if (st.winner != null && st.winner !== 'draw') { app.db.prepare('UPDATE game_matches SET state=? WHERE id=?').run(JSON.stringify(st), m.id); return finish(app, row(app, m.id), seats[st.winner].user_id, why); }
  const now = app.clock.now(); app.db.prepare('UPDATE game_matches SET state=?, turn_user=?, updated_at=?, deadline_at=? WHERE id=?').run(JSON.stringify(st), seats[st.turn].user_id, now, now + app.balance.games.turnMs, m.id);
}
function finish(app, m, winner, why) {
  const now = app.clock.now(); const G = app.balance.games; const M = app.balance.mood; const n = paidCount(app, m);
  const u = app.db.prepare("UPDATE game_matches SET status='finished', winner=?, result=?, turn_user=NULL, updated_at=? WHERE id=? AND status='active'").run(winner, why, now, m.id); if (u.changes !== 1) return;
  const seats = seatsOf(app, m.id); app.db.prepare('UPDATE game_players SET out=0 WHERE match_id=?').run(m.id);
  if (m.stake > 0) { if (winner) escrowOut(app, m, winner, m.stake * n, 'game_win'); else for (const s of seats) escrowOut(app, m, s.user_id, m.stake, 'game_refund'); }
  const practice = app.db.prepare(`SELECT COUNT(*) n FROM users WHERE is_bot=1 AND id IN (${seats.map(() => '?').join(',')})`).get(...seats.map(s => s.user_id)).n > 0; // practice games never touch the weekly board
  const w = weekOf(now); const bump = (uid, col, pts) => { if (practice) return; app.db.prepare('INSERT INTO game_scores(week,kind,user_id) VALUES (?,?,?) ON CONFLICT(week,kind,user_id) DO NOTHING').run(w, m.kind, uid); app.db.prepare(`UPDATE game_scores SET ${col}=${col}+1, points=points+? WHERE week=? AND kind=? AND user_id=?`).run(pts, w, m.kind, uid); };
  for (const s of seats) {
    const uid = s.user_id;
    if (!winner) { bump(uid, 'draws', G.pointsDraw); addMood(app, uid, M.gameDraw); notify(app, uid, 'game', `Draw! ${m.stake ? `Your ₦${m.stake} came back.` : ''}`.trim()); }
    else if (uid === winner) { bump(uid, 'wins', G.pointsWin); addMood(app, uid, M.gameWin); notify(app, uid, 'game', `You won! ${m.stake ? `+₦${m.stake * n} (game money).` : `+${G.pointsWin} points on the weekly board.`}`); }
    else { bump(uid, 'losses', 0); addMood(app, uid, M.gameLoss); notify(app, uid, 'game', `You lost this one. ${why}. Next time!`); }
  }
}
export function expireStale(app) {
  const now = app.clock.now(); const rows = app.db.prepare("SELECT * FROM game_matches WHERE status IN ('waiting','active') AND deadline_at<?").all(now);
  for (const m of rows) app.db.transaction(() => {
    if (m.status === 'waiting') { app.db.prepare("UPDATE game_matches SET status='cancelled', result='Nobody started the game', updated_at=? WHERE id=? AND status='waiting'").run(now, m.id); for (const s of seatsOf(app, m.id)) escrowOut(app, m, s.user_id, m.stake, 'game_refund'); }
    else leaveActive(app, m, m.turn_user, `@${nameOf(app, m.turn_user)} ran out of time`);
  })();
}
export const tickGames = (app) => expireStale(app);

export function scoreboard(app, { kind, weekOffset = 0 } = {}) {
  const w = weekOf(app.clock.now()) - Math.max(0, Math.min(8, weekOffset | 0)); const kinds = kind && GAMES[kind] ? [kind] : Object.keys(GAMES);
  const rows = app.db.prepare(`SELECT u.username, SUM(s.wins) wins, SUM(s.losses) losses, SUM(s.draws) draws, SUM(s.points) points FROM game_scores s JOIN users u ON u.id=s.user_id WHERE s.week=? AND s.kind IN (${kinds.map(() => '?').join(',')}) GROUP BY s.user_id, u.username ORDER BY points DESC, wins DESC, u.username LIMIT 10`).all(w, ...kinds);
  return { week: w, endsAt: 4 * DAY + (w + 1) * WEEK, kind: kind || 'all', rows: rows.map((r, i) => ({ rank: i + 1, ...r })), scoring: `Win ${app.balance.games.pointsWin}, draw ${app.balance.games.pointsDraw}, loss 0. Game money only.` };
}
