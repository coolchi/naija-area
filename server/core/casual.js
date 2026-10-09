// Casual break games: tile-merge ("Merge Am"), memory match ("Pair Am") and the word of the day. Single player, game money only, small rewards capped per day (ESTIMATES in
// balance.casual). The SERVER decides every reward: tile-merge replays the submitted move log from a server-issued seed; memory keeps the card layout server-side and reveals
// a card only when flipped; the word is chosen and kept server-side and the client only receives per-letter marks.
import { bad, dayKey } from './util.js';
import { notify } from './economy.js';
import { move as ledgerMove, cashId, SYS } from './ledger.js';
import * as merge from './casual/merge.js';
import * as memory from './casual/memory.js';
import { ANSWERS, VALID } from '../config/words.js';

export const CASUAL = [
  { id: 'merge', name: 'Merge Am', blurb: 'Slide the tiles. Equal tiles join. Chase the big number.', where: 'Viewing Centre' },
  { id: 'memory', name: 'Pair Am', blurb: 'Flip the cards and find the pairs in few tries.', where: 'Corner Joint' },
  { id: 'word', name: 'Word of the Day', blurb: 'Guess the 5-letter word in six tries. One word a day for everybody.', where: 'Mama Put' }
];
const cfg = (app) => app.balance.casual;
const seedOf = (app) => Math.floor((app.rng ? app.rng() : Math.random()) * 4294967295) >>> 0;
const dailyRow = (app, uid, day) => app.db.prepare('SELECT earned, plays FROM casual_daily WHERE user_id=? AND day=?').get(uid, day) || { earned: 0, plays: 0 };
const eligible = (app, uid) => { const u = app.db.prepare('SELECT created_at FROM users WHERE id=?').get(uid); return app.clock.now() - u.created_at >= cfg(app).minAccountAgeMs; };

/** pay a reward through the ledger, never beyond the daily cap and never twice for one run. Returns the amount actually paid and why it was trimmed. */
function payout(app, uid, runId, want) {
  const C = cfg(app); const day = dayKey(app.clock.now()); const d = dailyRow(app, uid, day); let paid = 0, note = null;
  if (want <= 0) note = null;
  else if (!eligible(app, uid)) note = 'Practice run: rewards start when your account is a few minutes old.';
  else { const left = Math.max(0, C.dailyCap - d.earned); paid = Math.min(want, left); if (paid < want) note = left <= 0 ? 'Daily game-money cap reached. You can still play for fun.' : 'Reward trimmed to your daily cap.'; }
  app.db.transaction(() => {
    if (paid > 0) { ledgerMove(app, { from: SYS.FAUCET_CASUAL, to: cashId(uid), amount: paid, reason: 'casual_reward', ref: `run:${runId}`, userId: uid, idemKey: `casual:${runId}` }); }
    app.db.prepare('INSERT INTO casual_daily(user_id,day,earned,plays) VALUES (?,?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET earned=earned+excluded.earned, plays=plays+1').run(uid, day, paid);
  })();
  return { paid, note, earnedToday: d.earned + paid, dailyCap: C.dailyCap };
}
function openRun(app, uid, kind, seed, state) {
  if (!app.limiter.hit(`casualstart:${uid}`, cfg(app).startPerMin, 60000, app.clock.now())) bad('RATE_LIMIT', 'Easy now. Take a breath, then start again.', 429);
  const now = app.clock.now(); app.db.prepare("UPDATE casual_runs SET status='abandoned', finished_at=? WHERE user_id=? AND kind=? AND status='open'").run(now, uid, kind);
  const r = app.db.prepare('INSERT INTO casual_runs(user_id,kind,seed,state,status,day,started_at) VALUES (?,?,?,?,?,?,?)').run(uid, kind, seed, state ? JSON.stringify(state) : null, 'open', dayKey(now), now); return Number(r.lastInsertRowid);
}
function getRun(app, uid, id, kind) {
  const r = app.db.prepare('SELECT * FROM casual_runs WHERE id=? AND user_id=? AND kind=?').get(Number(id), uid, kind); if (!r) bad('NO_RUN', 'That game is not yours or does not exist.', 404);
  if (r.status !== 'open') bad('RUN_CLOSED', 'That game is already finished.', 409); if (app.clock.now() - r.started_at > cfg(app).staleRunMs) { app.db.prepare("UPDATE casual_runs SET status='abandoned' WHERE id=?").run(r.id); bad('RUN_EXPIRED', 'That game timed out. Start a new one.', 410); }
  return r;
}
const best = (app, uid, kind) => app.db.prepare("SELECT MAX(score) b FROM casual_runs WHERE user_id=? AND kind=? AND status='done'").get(uid, kind).b || 0;

export function overview(app, uid) {
  const C = cfg(app); const day = dayKey(app.clock.now()); const d = dailyRow(app, uid, day); const w = wordState(app, uid, false);
  return { day, earnedToday: d.earned, dailyCap: C.dailyCap, rewardsOn: eligible(app, uid), note: 'Game money only. Rewards are small ESTIMATE placeholders with a daily cap.',
    games: CASUAL.map(g => ({ ...g, best: g.id === 'word' ? undefined : best(app, uid, g.id), doneToday: g.id === 'word' ? w.status !== 'playing' : undefined })) };
}

// ---------------------------------------------------------------- tile-merge
export function mergeStart(app, uid) { const seed = seedOf(app); const id = openRun(app, uid, 'merge', seed); return { runId: id, seed, size: merge.SIZE, note: 'Play locally; submit your moves when the board is stuck or when you stop.' }; }
export function mergeSubmit(app, uid, runId, moves) {
  const C = cfg(app).merge; const run = getRun(app, uid, runId, 'merge'); const log = String(moves || '');
  if (log.length < C.minMoves) bad('TOO_SHORT', `Play at least ${C.minMoves} moves for a counted game.`);
  const r = merge.replay(run.seed, log, C.maxMoves); if (!r.ok) bad(r.error, 'That move list does not match the board we dealt you.');
  const elapsed = app.clock.now() - run.started_at; if (elapsed < r.moves * C.minMsPerMove) bad('TOO_FAST', 'That was faster than a human can play. Try again.');
  const want = Math.min(C.perRunCap, Math.floor(r.score / C.scorePerNaira)); app.db.prepare("UPDATE casual_runs SET status='done', score=?, finished_at=? WHERE id=?").run(r.score, app.clock.now(), run.id);
  const p = payout(app, uid, run.id, want); app.db.prepare('UPDATE casual_runs SET reward=? WHERE id=?').run(p.paid, run.id);
  if (p.paid) notify(app, uid, 'casual', `Merge Am: score ${r.score}, +₦${p.paid} (game money).`);
  return { score: r.score, best: r.best, moves: r.moves, over: r.over, reward: p.paid, note: p.note, earnedToday: p.earnedToday, dailyCap: p.dailyCap, personalBest: Math.max(best(app, uid, 'merge'), r.score) };
}

// ---------------------------------------------------------------- memory match
export function memoryStart(app, uid) { const seed = seedOf(app); const st = memory.newState(seed, cfg(app).memory.pairs); const id = openRun(app, uid, 'memory', seed, st); return { runId: id, cards: st.cards.length, pairs: cfg(app).memory.pairs, symbols: memory.SYMBOLS.slice(0, cfg(app).memory.pairs) }; }
export function memoryFlip(app, uid, runId, i) {
  const C = cfg(app).memory; const run = getRun(app, uid, runId, 'memory'); const st = JSON.parse(run.state); const now = app.clock.now();
  if (now - run.started_at > C.maxMs) { app.db.prepare("UPDATE casual_runs SET status='abandoned' WHERE id=?").run(run.id); bad('RUN_EXPIRED', 'That game timed out. Start a new one.', 410); }
  if ((st.flips + 1) * C.minMsPerFlip > now - run.started_at) bad('TOO_FAST', 'Slow down a little.', 429);
  const r = memory.flip(st, Number(i)); if (r.error) bad(r.error, r.error === 'ALREADY_MATCHED' ? 'That pair is already found.' : 'Pick a face-down card.');
  const out = { symbol: r.symbol, symbolName: r.symbolName, result: r.result, other: r.other, otherSymbol: r.otherSymbol, moves: st.moves, matched: st.matched.length / 2, done: r.done };
  if (r.done) {
    const want = Math.max(C.floor, C.perRunCap - Math.max(0, st.moves - C.pairs) * C.perExtraMove); const score = Math.max(0, 1000 - st.moves * 40);
    app.db.prepare("UPDATE casual_runs SET status='done', score=?, state=?, finished_at=? WHERE id=?").run(score, JSON.stringify(st), now, run.id);
    const p = payout(app, uid, run.id, want); app.db.prepare('UPDATE casual_runs SET reward=? WHERE id=?').run(p.paid, run.id); out.reward = p.paid; out.note = p.note; out.score = score; out.earnedToday = p.earnedToday; out.dailyCap = p.dailyCap;
    if (p.paid) notify(app, uid, 'casual', `Pair Am: done in ${st.moves} tries, +₦${p.paid} (game money).`);
  } else app.db.prepare('UPDATE casual_runs SET state=? WHERE id=?').run(JSON.stringify(st), run.id);
  return out;
}

// ---------------------------------------------------------------- word of the day
/** the day's word: chosen with an HMAC of the date under the server secret, so it cannot be worked out from the source code */
export const wordOfDay = (app, day) => { const h = app.platform.hmac(`word:${day}`); let n = 0; for (let i = 0; i < 8; i++) n = (n * 64 + (h.charCodeAt(i) % 64)) % 1000003; return ANSWERS[n % ANSWERS.length]; };
export function mark(guess, answer) { // 2 = right place, 1 = in the word elsewhere, 0 = not there (handles repeated letters correctly)
  const res = Array(guess.length).fill(0); const left = {}; for (let i = 0; i < answer.length; i++) if (guess[i] !== answer[i]) left[answer[i]] = (left[answer[i]] || 0) + 1;
  for (let i = 0; i < guess.length; i++) { if (guess[i] === answer[i]) res[i] = 2; else if (left[guess[i]] > 0) { res[i] = 1; left[guess[i]]--; } } return res;
}
function wordRun(app, uid, day, create) {
  let r = app.db.prepare("SELECT * FROM casual_runs WHERE user_id=? AND kind='word' AND day=?").get(uid, day);
  if (!r && create) { const id = app.db.prepare("INSERT INTO casual_runs(user_id,kind,seed,state,status,day,started_at) VALUES (?,?,?,?,?,?,?)").run(uid, 'word', 0, JSON.stringify({ guesses: [] }), 'open', day, app.clock.now()).lastInsertRowid; r = app.db.prepare('SELECT * FROM casual_runs WHERE id=?').get(id); }
  return r;
}
export function wordState(app, uid, create = true) {
  const C = cfg(app).word; const day = dayKey(app.clock.now()); const run = wordRun(app, uid, day, create); const st = run ? JSON.parse(run.state) : { guesses: [] };
  const status = !run ? 'playing' : run.status === 'open' ? 'playing' : st.won ? 'won' : 'lost'; const out = { day, length: C.length, maxGuesses: C.maxGuesses, guesses: st.guesses, status, reward: run?.reward || 0 };
  if (status !== 'playing') out.answer = wordOfDay(app, day); return out;
}
export function wordGuess(app, uid, word) {
  const C = cfg(app).word; const day = dayKey(app.clock.now()); const w = String(word || '').trim().toLowerCase(); const run = wordRun(app, uid, day, true);
  if (run.status !== 'open') bad('DONE_TODAY', 'You already finished today\'s word. Come back tomorrow!', 409);
  if (!/^[a-z]{5}$/.test(w)) bad('BAD_WORD', 'Use exactly 5 letters.'); if (!VALID.has(w)) bad('NOT_IN_LIST', 'That word is not in our list. Try another.');
  const st = JSON.parse(run.state); if (st.guesses.some(g => g.word === w)) bad('REPEAT', 'You tried that one already.');
  const answer = wordOfDay(app, day); const marks = mark(w, answer); st.guesses.push({ word: w, marks }); const won = w === answer; const over = won || st.guesses.length >= C.maxGuesses; st.won = won;
  let reward = 0, note = null, earnedToday;
  if (over) { const want = won ? C.rewards[Math.min(st.guesses.length, C.rewards.length) - 1] : 0; app.db.prepare("UPDATE casual_runs SET status='done', state=?, score=?, finished_at=? WHERE id=?").run(JSON.stringify(st), won ? 7 - st.guesses.length : 0, app.clock.now(), run.id); const p = payout(app, uid, run.id, want); reward = p.paid; note = p.note; earnedToday = p.earnedToday; app.db.prepare('UPDATE casual_runs SET reward=? WHERE id=?').run(reward, run.id); if (reward) notify(app, uid, 'casual', `Word of the Day solved in ${st.guesses.length}! +₦${reward} (game money).`); }
  else app.db.prepare('UPDATE casual_runs SET state=? WHERE id=?').run(JSON.stringify(st), run.id);
  return { word: w, marks, guesses: st.guesses, status: !over ? 'playing' : won ? 'won' : 'lost', reward, note, earnedToday, answer: over ? answer : undefined };
}
