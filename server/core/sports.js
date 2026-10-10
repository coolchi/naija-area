// Sports and Games Hall (server side): playing ping pong and tennis against a labelled bot (@Rally_Rookie, @Rally_Club, @Rally_Pro), the small capped prize for beating it,
// and the "coming soon" game slots that light up when another builder registers the game. GAME MONEY ONLY: no cash-out, nothing here creates money except the capped prize,
// which comes out of the shared daily casual cap (sys:faucet_casual) and is a ledger row with an audit reason.
// Two-player matches and their escrowed stakes are NOT here: they are the normal table-game flow in games.js (sit, escrow, 90 s turn clock, forfeit, weekly board).
import { bad } from './util.js';
import { notify } from './economy.js';
import { move as ledgerMove, cashId, SYS } from './ledger.js';
import { newPlayer } from './auth.js';
import { ensurePresence } from './world.js';
import * as games from './games.js';
import { SPORT_KINDS } from './sports-games.js';
import { LEVELS } from './games/rally.js';

const DAY = 86400000;
export const SPORTS_DEFAULTS = { botPrize: { rookie: 15, club: 30, pro: 60 }, botPrizesPerDayPerGame: 3, note: 'Beating the bot pays a small ESTIMATE prize, a few times a day, inside the shared daily game-money cap. Two-player stakes are separate and move only between the players.' };
const cfg = (app) => ({ ...SPORTS_DEFAULTS, ...(app.balance.sports || {}) });
export const BOT_NAMES = { rookie: 'Rally_Rookie', club: 'Rally_Club', pro: 'Rally_Pro' };
/** the game id a station really plays: its own `game` or the first of its `alts` that is registered. null = coming soon (the slot is there, the game is not). */
export const kindOf = (st) => [st.game, ...(st.alts || [])].find(k => k && games.GAMES[k]) || null;
const isSport = (k) => SPORT_KINDS.includes(k);
export function botUser(app, level) {
  const name = BOT_NAMES[level]; const r = app.db.prepare('SELECT id FROM users WHERE username=?').get(name); if (r) return r.id;
  return newPlayer(app, { username: name, isBot: true, ageConfirmed: true });
}
const isBotId = (app, uid) => !!app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid)?.is_bot;

export function levels(app) { const c = cfg(app); return Object.keys(LEVELS).map(id => ({ id, name: BOT_NAMES[id].replace('Rally_', ''), skill: LEVELS[id], prize: c.botPrize[id] })); }

/** sit down against a bot: an ACTIVE friendly match straight away (no stake: a person never stakes against the bot), the bot already seated as seat 1. */
export function sitVsBot(app, uid, venueId, stationId, level) {
  if (!LEVELS[level]) bad('BAD_LEVEL', `Pick a bot level: ${Object.keys(LEVELS).join(', ')}.`);
  const v = app.all.venueById[venueId]; const st = v?.stations.find(s => s.id === stationId); const kind = st && st.type === 'game' ? kindOf(st) : null;
  if (!st || st.type !== 'game') bad('NO_STATION', 'No table like that here.', 404); if (!kind) bad('COMING_SOON', 'That game is not open yet. It lights up here when it is ready.', 409);
  if (!isSport(kind)) bad('NO_BOT_HERE', 'Only ping pong and tennis have a bot opponent. For the other tables, sit and wait: the Practice Bot joins friendly games.', 400);
  const p = app.world.players.get(uid); if (!p || p.venue !== venueId) bad('NOT_INSIDE', 'Step inside first.', 409);
  const now = app.clock.now(); if (!app.limiter.hit(`sit:${uid}`, app.balance.games.sitPerMin, 60000, now)) bad('RATE_LIMIT', 'Slow down a little.', 429);
  games.expireStale(app); if (games.myMatch(app, uid, { onlyLive: true })) bad('ALREADY_PLAYING', 'You are already seated at a game.', 409);
  const bot = botUser(app, level); const eng = games.GAMES[kind].eng;
  const id = app.db.transaction(() => {
    if (app.db.prepare("SELECT 1 FROM game_matches WHERE venue_id=? AND station_id=? AND status IN ('waiting','active')").get(venueId, stationId)) bad('TABLE_BUSY', 'This table is in use. Try another one.', 409);
    const s0 = eng.newGame(2, app.rng || Math.random); s0.skill = { 1: LEVELS[level] };
    const r = app.db.prepare("INSERT INTO game_matches(venue_id,station_id,kind,p1,stake,status,state,turn_user,created_at,updated_at,deadline_at) VALUES (?,?,?,?,0,'active',?,?,?,?,?)")
      .run(venueId, stationId, kind, uid, JSON.stringify(s0), s0.turn === 0 ? uid : bot, now, now, now + app.balance.games.turnMs);
    const mid = Number(r.lastInsertRowid); app.db.prepare('INSERT INTO game_players(match_id,user_id,seat) VALUES (?,?,0)').run(mid, uid); app.db.prepare('INSERT INTO game_players(match_id,user_id,seat) VALUES (?,?,1)').run(mid, bot); return mid;
  })();
  notify(app, uid, 'game', `Your ${games.GAMES[kind].label} game against @${BOT_NAMES[level]} has started!`);
  botReplies(app, id); return games.getMatch(app, uid, id);
}

/** after any move: while it is a bot's turn in a sports match, let the bot move (instant, same rules as a person), then settle the bot prize. */
export function botReplies(app, id) {
  for (let i = 0; i < 80; i++) {
    const m = app.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id); if (!m || m.status !== 'active' || !isSport(m.kind) || !m.turn_user || !isBotId(app, m.turn_user)) break;
    const st = JSON.parse(m.state); const seat = app.db.prepare('SELECT seat FROM game_players WHERE match_id=? AND user_id=?').get(id, m.turn_user).seat;
    games.playMove(app, m.turn_user, id, games.GAMES[m.kind].eng.bot(st, seat, app.rng || Math.random));
  }
  const m = app.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id); if (m && m.status === 'finished' && isSport(m.kind)) settle(app, m);
}
/** a person who beats a Rally bot over the full match earns the bot's prize: at most N per game per day, never beyond the shared daily cap, once per match (idempotent). */
function settle(app, m) {
  if (!m.winner || m.result !== 'Played to the end') return; const seats = app.db.prepare('SELECT user_id, seat FROM game_players WHERE match_id=?').all(m.id); const loser = seats.find(s => s.user_id !== m.winner); if (!loser) return;
  const bu = app.db.prepare('SELECT username, is_bot FROM users WHERE id=?').get(loser.user_id); const level = Object.keys(BOT_NAMES).find(k => BOT_NAMES[k] === bu?.username); if (!level || !bu.is_bot || isBotId(app, m.winner)) return;
  const C = cfg(app); const now = app.clock.now(); const uid = m.winner; const day = new Date(now).toISOString().slice(0, 10); const dayStart = Math.floor(now / DAY) * DAY;
  if (app.db.prepare("SELECT 1 FROM ledger_tx WHERE idem_key=?").get(`sportsprize:${m.id}`)) return;
  const casual = app.balance.casual; const u = app.db.prepare('SELECT created_at FROM users WHERE id=?').get(uid); const row = app.db.prepare('SELECT earned FROM casual_daily WHERE user_id=? AND day=?').get(uid, day) || { earned: 0 };
  const paidToday = app.db.prepare("SELECT COUNT(*) n FROM ledger_tx t WHERE t.user_id=? AND t.reason='sports_prize' AND t.created_at>=? AND t.ref LIKE ?").get(uid, dayStart, `match:%:${m.kind}`).n;
  let pay = 0, note = null;
  if (now - u.created_at < casual.minAccountAgeMs) note = 'Practice win: prizes start when your account is a few minutes old.';
  else if (paidToday >= C.botPrizesPerDayPerGame) note = `You have won today's ${C.botPrizesPerDayPerGame} bot prizes for this game. You can still play for fun.`;
  else { const left = Math.max(0, casual.dailyCap - row.earned); pay = Math.min(C.botPrize[level], left); if (pay < C.botPrize[level]) note = left <= 0 ? 'Daily game-money cap reached.' : 'Prize trimmed to your daily cap.'; }
  app.db.transaction(() => {
    if (pay > 0) { ledgerMove(app, { from: SYS.FAUCET_CASUAL, to: cashId(uid), amount: pay, reason: 'sports_prize', ref: `match:${m.id}:${m.kind}`, userId: uid, idemKey: `sportsprize:${m.id}` });
      app.db.prepare('INSERT INTO casual_daily(user_id,day,earned,plays) VALUES (?,?,?,0) ON CONFLICT(user_id,day) DO UPDATE SET earned=casual_daily.earned+excluded.earned').run(uid, day, pay); }
    app.db.prepare("UPDATE game_matches SET result=? WHERE id=?").run(pay > 0 ? `Played to the end · prize ₦${pay}` : note ? `Played to the end · ${note}` : 'Played to the end', m.id);
  })();
  if (pay > 0) notify(app, uid, 'game', `You beat @${bu.username}! +₦${pay} (game money, daily cap applies).`);
}
