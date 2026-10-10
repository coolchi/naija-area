// Seasons: a few weeks of ranking on three boards (money earned, table games won, best dressed). When a season ends the server SETTLES it once: the top three of each board who reached the
// board's minimum get a badge (👑 🥈 🥉) and game money paid through the ledger; the winners get a title ("S1 Money Maker") shown after their name. All figures come from the server's own records.
import { bad } from './util.js';
import { SEASONS } from '../config/progress.js';
import { notify } from './economy.js';
import { grantReward } from './rewards.js';
import { cfgOf, equippedIds } from './wearables.js';

const DAY = 86400000, WEEK = 7 * DAY;
const cfg = (app) => app.seasonsCfg || SEASONS;
/** week number as the table-game scores use it (Monday 00:00 UTC; 1970-01-05 was a Monday) */
export const weekOfMs = (ms) => Math.floor((ms - 4 * DAY) / WEEK);
const weekStartMs = (w) => 4 * DAY + w * WEEK;
const startWeek = (c) => weekOfMs(Date.parse(c.startsAt + 'T00:00:00Z'));
/** the season running at `now` (1, 2, ...), or 0 before the first one starts */
export const seasonAt = (app, now = app.clock.now()) => { const c = cfg(app), d = weekOfMs(now) - startWeek(c); return d < 0 ? 0 : Math.floor(d / c.weeks) + 1; };
export const windowOf = (app, n) => { const c = cfg(app), w0 = startWeek(c) + (n - 1) * c.weeks; return { w0, w1: w0 + c.weeks, from: weekStartMs(w0), to: weekStartMs(w0 + c.weeks) }; };
const boardOf = (app, id) => cfg(app).boards.find(b => b.id === id);
const prizeFor = (app, place) => cfg(app).prizes.find(p => p.rank === place);
const inList = (a) => a.map(() => '?').join(',');
const enabled = (app) => !!cfg(app).enabled;
const isPlayer = (app, uid) => { const u = app.db.prepare('SELECT is_bot, is_guest FROM users WHERE id=?').get(uid); return !!u && !u.is_bot && !u.is_guest; };
const banned = (app, uid) => !!app.db.prepare("SELECT 1 FROM sanctions WHERE user_id=? AND kind='ban' AND lifted_at IS NULL AND (until_at IS NULL OR until_at>?)").get(uid, app.clock.now());

/** every player's number for a board, best first (ties go to the older account), bots, guests and banned players left out. At most `depth` rows. */
export function standings(app, n, boardId, depth = cfg(app).rankDepth) {
  const b = boardOf(app, boardId); if (!b) bad('NO_BOARD', 'No such board.', 404); const win = windowOf(app, n); let rows;
  if (b.metric === 'earned') {
    rows = app.db.prepare(`SELECT u.id, u.username, SUM(e.amount) v FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id JOIN users u ON e.account_id = 'u:' || u.id
      WHERE t.reason IN (${inList(b.reasons)}) AND e.amount>0 AND e.created_at>=? AND e.created_at<? AND u.is_bot=0 AND u.is_guest=0 GROUP BY u.id, u.username ORDER BY v DESC, u.id ASC LIMIT ?`).all(...b.reasons, win.from, win.to, depth + 25);
  } else if (b.metric === 'wins') {
    rows = app.db.prepare('SELECT u.id, u.username, SUM(s.wins) v FROM game_scores s JOIN users u ON u.id=s.user_id WHERE s.week>=? AND s.week<? AND u.is_bot=0 AND u.is_guest=0 GROUP BY u.id, u.username HAVING SUM(s.wins)>0 ORDER BY v DESC, u.id ASC LIMIT ?').all(win.w0, win.w1, depth + 25);
  } else if (b.metric === 'dressed') {
    const price = new Map(cfgOf(app).WEARABLES.map(w => [w.id, w.price])); const sums = new Map();
    for (const r of app.db.prepare('SELECT e.user_id, e.item_id FROM wearables_equipped e JOIN users u ON u.id=e.user_id WHERE u.is_bot=0 AND u.is_guest=0').all()) sums.set(r.user_id, (sums.get(r.user_id) || 0) + (price.get(r.item_id) || 0));
    const ids = [...sums.entries()].filter(([, v]) => v > 0).sort((a, c) => c[1] - a[1] || a[0] - c[0]).slice(0, depth + 25);
    rows = ids.map(([id, v]) => ({ id, username: app.db.prepare('SELECT username FROM users WHERE id=?').get(id).username, v }));
  } else bad('NO_BOARD', 'Unknown board kind.', 500);
  return rows.map(r => ({ id: r.id, name: r.username, value: Number(r.v) })).filter(r => !banned(app, r.id)).slice(0, depth).map((r, i) => ({ ...r, rank: i + 1 }));
}
function cachedStandings(app, n, boardId) {
  const c = (app._seasonCache ||= new Map()), key = n + ':' + boardId, now = app.clock.now(), hit = c.get(key);
  if (hit && now - hit.at < cfg(app).cacheMs) return hit.rows; const rows = standings(app, n, boardId); c.set(key, { at: now, rows }); if (c.size > 40) c.delete(c.keys().next().value); return rows;
}

const awardsOf = (app, uid) => app.db.prepare('SELECT season, board, place, score, prize, awarded_at FROM season_awards WHERE user_id=? ORDER BY season DESC, board').all(uid);
const badgeView = (app, a) => { const p = prizeFor(app, a.place), b = boardOf(app, a.board); return { season: a.season, board: a.board, boardName: b?.name || a.board, icon: b?.icon || '', place: a.place, badge: p?.badge || '', badgeIcon: p?.icon || '', label: p?.label || '', score: a.score, prize: a.prize, text: `Season ${a.season}: ${p?.icon || ''} ${b?.name || a.board}` }; };
/** the titles a player has won: rank 1 of a board. `latest` is true for the most recent settled season (these show automatically). */
export function crownTitles(app, uid) {
  const rows = app.db.prepare('SELECT season, board FROM season_awards WHERE user_id=? AND place=1 ORDER BY season DESC, board').all(uid); if (!rows.length) return [];
  const last = app.db.prepare('SELECT MAX(season) m FROM season_settled').get()?.m || 0;
  const order = (id) => cfg(app).boards.findIndex(b => b.id === id);   // within a season the board order in the config is the priority (the first listed shows by default)
  return rows.sort((x, y) => y.season - x.season || order(x.board) - order(y.board)).map(r => { const b = boardOf(app, r.board); return b ? { id: `season:${r.season}:${r.board}`, text: `S${r.season} ${b.titleWord}`, season: r.season, latest: r.season === last } : null; }).filter(Boolean);
}

/** pay out and record one finished season, once. Safe to call again: a settled season is skipped, and every payment has its own idempotency key. */
export function settleSeason(app, n) {
  if (app.db.prepare('SELECT 1 FROM season_settled WHERE season=?').get(n)) return null; const now = app.clock.now(); const out = [];
  app.db.transaction(() => {
    for (const b of cfg(app).boards) {
      const rows = standings(app, n, b.id, 50).filter(r => r.value >= b.min && isPlayer(app, r.id)).slice(0, cfg(app).prizes.length);
      rows.forEach((r, i) => {
        const place = i + 1, pz = prizeFor(app, place); if (!pz) return; const paid = pz.cash > 0 ? grantReward(app, r.id, { amount: pz.cash, reason: 'season_prize', ref: `s${n}:${b.id}`, idemKey: `season:${n}:${b.id}:${r.id}`, countCaps: false }) : 0;
        app.db.prepare('INSERT INTO season_awards(season,board,user_id,place,score,prize,awarded_at) VALUES (?,?,?,?,?,?,?) ON CONFLICT(season,board,user_id) DO NOTHING').run(n, b.id, r.id, place, r.value, paid, now);
        out.push({ uid: r.id, board: b.id, place, prize: paid, value: r.value });
      });
    }
    app.db.prepare('INSERT INTO season_settled(season,settled_at) VALUES (?,?) ON CONFLICT(season) DO NOTHING').run(n, now);
  })();
  for (const a of out) { const b = boardOf(app, a.board), pz = prizeFor(app, a.place); notify(app, a.uid, 'season', `Season ${n} ended: you came ${a.place}${['st', 'nd', 'rd'][a.place - 1] || 'th'} on ${b.icon} ${b.name}! ${pz.icon} ${pz.label} badge${a.prize ? ` and ₦${a.prize.toLocaleString('en-NG')}` : ''}${a.place === 1 ? ` and the title "S${n} ${b.titleWord}"` : ''}.`); app._titleCache?.delete(a.uid); const p = app.world?.players?.get(a.uid); if (p) p.title = undefined; }
  return out;
}
/** settle every finished season not yet settled (oldest first, a few per call). Cheap when there is nothing to do. */
export function settleDue(app, { force = false } = {}) {
  if (!enabled(app)) return []; const now = app.clock.now(), cur = seasonAt(app, now); if (cur <= 1) return [];
  if (!force && app._seasonSettleChecked === cur) return []; const done = new Set(app.db.prepare('SELECT season FROM season_settled').all().map(r => r.season)); const todo = []; for (let n = 1; n < cur; n++) if (!done.has(n)) todo.push(n);
  const out = []; for (const n of todo.slice(0, cfg(app).maxSettlePerCheck)) out.push(...(settleSeason(app, n) || []).map(a => ({ season: n, ...a })));
  if (todo.length <= cfg(app).maxSettlePerCheck) app._seasonSettleChecked = cur; return out;
}
export const tickSeasons = (app) => { const now = app.clock.now(); if (now - (app._seasonTickAt || 0) < cfg(app).settleChecksMs) return; app._seasonTickAt = now; settleDue(app); };

const findMe = (rows, uid) => rows.find(r => r.id === uid) || null;
function boardView(app, n, b, uid) {
  const rows = cachedStandings(app, n, b.id), me = findMe(rows, uid); const mineValue = me ? me.value : null;
  return { id: b.id, icon: b.icon, name: b.name, desc: b.desc, unit: b.unit, min: b.min, top: rows.slice(0, cfg(app).topShown).map(r => ({ rank: r.rank, name: r.name, value: r.value, me: r.id === uid })),
    me: { rank: me ? me.rank : null, value: mineValue, qualifies: mineValue != null && mineValue >= b.min, outside: !me }, players: rows.length };
}
export function view(app, uid) {
  if (!enabled(app)) return { enabled: false }; settleDue(app); const now = app.clock.now(), n = seasonAt(app, now), c = cfg(app); const eligible = isPlayer(app, uid);
  const base = { enabled: true, eligible, rankDepth: c.rankDepth, prizes: c.prizes.map(p => ({ rank: p.rank, icon: p.icon, label: p.label, cash: p.cash })), weeks: c.weeks, mine: awardsOf(app, uid).map(a => badgeView(app, a)), titles: crownTitles(app, uid) };
  if (n === 0) return { ...base, started: false, startsAt: c.startsAt, startsInMs: Date.parse(c.startsAt + 'T00:00:00Z') - now };
  const win = windowOf(app, n); const last = app.db.prepare('SELECT MAX(season) m FROM season_settled').get()?.m || 0;
  const previous = last ? { season: last, winners: app.db.prepare('SELECT a.board, a.place, a.score, u.username FROM season_awards a JOIN users u ON u.id=a.user_id WHERE a.season=? ORDER BY a.board, a.place').all(last).map(r => ({ board: r.board, boardName: boardOf(app, r.board)?.name || r.board, icon: boardOf(app, r.board)?.icon || '', place: r.place, badgeIcon: prizeFor(app, r.place)?.icon || '', name: r.username, score: r.score })) } : null;
  return { ...base, started: true, season: n, startsAt: new Date(win.from).toISOString(), endsAt: new Date(win.to).toISOString(), endsInMs: win.to - now, boards: c.boards.map(b => boardView(app, n, b, uid)), previous };
}
export const exportMine = (app, uid) => ({ awards: awardsOf(app, uid) });
export const deleteMine = (app, uid) => { app.db.prepare('DELETE FROM season_awards WHERE user_id=?').run(uid); };
