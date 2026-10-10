// Rally kernel shared by Table tennis (ping pong) and Lawn tennis. NOT real-time: our server is built around turns and an HTTP heartbeat, so a match is a series of short
// TIMING-AND-CHOICE exchanges that the server resolves with a seeded generator (the same state + the same move always gives the same result).
//
// One exchange = ONE move by the player whose turn it is. A move bundles two decisions:
//   1. COVER (only when a ball is coming): where you think the incoming ball will land. The cell is a column (0..2, left to right) and a depth (0 short, 1 deep).
//      You see the SHOT TYPE the opponent chose (a drop is short, a lob is high) but never where it is aimed or how well it was hit.
//   2. YOUR SHOT (only if you get to the ball): shot type, an aim column and a depth, and a TIMING value from the meter.
// The server first resolves the incoming ball against your cover, then, if you reached it, your own shot: it can fail (net or out) or become the next incoming ball for the opponent.
// The timing meter is a triangle wave of SERVER time (like the work task): the page only animates it, the server reads its own clock when the move arrives. The engine itself is pure:
// it receives `timing` (0..1) from the host (games.js asks sports-games.js `prep`), so tests can play any rally deterministically.
// Everything random comes from a generator keyed by (match seed, exchange number, part), so a match can be replayed exactly from its seed and move list.
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const other = (s) => 1 - s;
export function mulberry32(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function rngFor(seed, n, part) { let h = (seed ^ 0x9E3779B9) >>> 0; h = Math.imul(h ^ (n + 1), 0x85EBCA6B); h ^= h >>> 13; h = Math.imul(h ^ (part + 1), 0xC2B2AE35); h ^= h >>> 16; return mulberry32(h >>> 0); }
export const METER_MS = 2800;
export const triangle = (x) => { const f = x - Math.floor(x); return f < 0.5 ? f * 2 : 2 - f * 2; };
/** the timing meter at a server time: 0 (empty) up to 1 (full, the sweet spot) and back */
export const meterAt = (nowMs, period = METER_MS) => triangle(nowMs / period);
export const LEVELS = { rookie: 0.25, club: 0.55, pro: 0.85 };
export const MAX_EXCHANGES = 1500;       // safety stop: a match that long is decided on the score
const CELLS = 6;
export const cellOf = (aim, depth) => depth * 3 + aim;
const okInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
/** how well a cover reaches a ball: 1 exact cell, less one column away, little two columns away; a wrong depth costs extra */
export const reachOf = (cfg, ca, cd, aim, depth) => Math.max(0, cfg.reach[Math.abs(ca - aim)] - (cd === depth ? 0 : cfg.depthPen));
export const returnProb = (cfg, pace, q, r) => clamp(r * (1 - cfg.bite * pace * (0.5 + 0.5 * q)) + cfg.soft * (1 - pace) * 0.5, 0.02, 0.97);
export const errProb = (base, q, stretch, pace) => clamp(base * (1.6 - 1.4 * q) + 0.35 * stretch * pace, 0, 0.9);
const qLabel = (q) => (q >= 0.85 ? 'perfect' : q >= 0.6 ? 'good' : q >= 0.35 ? 'ok' : 'poor');

/** Build an engine with the shared contract: newGame(n, rng), play(st, seat, move), forfeit(st, seat), view(st, seat), bot(st, seat, rng).
 *  sport = { id, label, cfg, shots, serves, setup(st, rng), serverFor(st), award(st, winner) -> ends game/match by setting st.winner, scoreView(st), secondServe:boolean, standing(st) -> [x, y] for a cap decision } */
export function makeEngine(sport) {
  const { shots, serves, cfg } = sport;
  const blank = () => ({ aim: Array(CELLS).fill(0), cover: Array(CELLS).fill(0) });
  const stat = () => ({ points: 0, aces: 0, winners: 0, errors: 0, faults: 0, longest: 0 });
  function newGame(n = 2, rng = Math.random) {
    const st = { n: 2, sport: sport.id, seed: Math.floor(rng() * 4294967295) >>> 0, turn: 0, winner: null, phase: 'serve', serveNo: 1, ball: null, rally: 0, ex: 0, evN: 0, log: [], hist: [blank(), blank()], stats: [stat(), stat()], skill: null, server: 0 };
    sport.setup(st, rng); st.server = sport.serverFor(st); st.turn = st.server; return st;
  }
  const ev = (st, e) => { st.log.push({ i: ++st.evN, ...e }); if (st.log.length > 14) st.log.splice(0, st.log.length - 14); };
  function endPoint(st, w, why) {
    const L = other(w); st.stats[w].points++; if (why === 'ace') st.stats[w].aces++; else if (why === 'winner') st.stats[w].winners++; else if (why === 'error' || why === 'double fault') st.stats[L].errors++;
    st.stats[w].longest = Math.max(st.stats[w].longest, st.rally);
    ev(st, { k: 'point', winner: w, why, rally: st.rally }); st.ball = null; st.rally = 0; st.serveNo = 1; st.phase = 'serve';
    sport.award(st, w); if (st.winner == null) { st.server = sport.serverFor(st); st.turn = st.server; ev(st, { k: 'score', score: sport.scoreView(st) }); }
    else { st.turn = w; ev(st, { k: 'score', score: sport.scoreView(st) }); }
  }
  /** shots the seat may choose right now */
  function legal(st) { if (st.phase === 'serve') return Object.keys(serves); return Object.keys(shots).filter(k => !shots[k].needs || shots[k].needs === st.ball?.shot); }
  function capDecide(st) {
    const [a, b] = sport.standing(st); st.winner = a === b ? 'draw' : a > b ? 0 : 1; ev(st, { k: 'cap' });
  }
  function play(st, seat, mv = {}) {
    if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' };
    const rallying = st.phase === 'rally' && st.ball; const table = rallying ? shots : serves; const sh = table[mv?.shot];
    if (!sh || !legal(st).includes(mv.shot)) return { error: 'BAD_MOVE', message: rallying ? 'That shot is not possible now (a smash needs a lob to hit).' : 'Pick one of the serves.' };
    if (!okInt(mv.aim, 0, 2) || !okInt(mv.depth, 0, 1)) return { error: 'BAD_MOVE', message: 'Aim at a column (left, middle, right) and a depth (short or deep).' };
    if (sh.depth != null && mv.depth !== sh.depth) return { error: 'BAD_MOVE', message: `${sh.label} always lands ${sh.depth ? 'deep' : 'short'}.` };
    if (rallying && (!okInt(mv.coverAim, 0, 2) || !okInt(mv.coverDepth, 0, 1))) return { error: 'BAD_MOVE', message: 'Say where you cover the incoming ball (column and depth).' };
    const timing = clamp(Number.isFinite(mv.timing) ? mv.timing : 0.5, 0, 1); const exn = ++st.ex; const opp = other(seat); const h = st.hist[seat]; let stretch = 0;
    if (rallying) {
      const b = st.ball; const r = reachOf(cfg, mv.coverAim, mv.coverDepth, b.aim, b.depth); const pr = returnProb(cfg, b.pace, b.q, r); const got = rngFor(st.seed, exn, 1)() < pr; stretch = 1 - r;
      h.cover[cellOf(mv.coverAim, mv.coverDepth)]++; st.hist[b.hitter].aim[cellOf(b.aim, b.depth)]++;
      ev(st, { k: 'resolve', hitter: b.hitter, receiver: seat, shot: b.shot, serve: b.serve, aim: b.aim, depth: b.depth, quality: qLabel(b.q), cover: [mv.coverAim, mv.coverDepth], reach: +r.toFixed(2), returned: got, rally: st.rally });
      if (!got) { endPoint(st, b.hitter, b.serve ? 'ace' : 'winner'); return { ok: true, won: st.winner }; }
    }
    // my own shot: timing sets the quality; a stretched return is harder to control
    const q = clamp(timing * (1 - 0.35 * stretch), 0, 1); const rr = rngFor(st.seed, exn, 2); const isServe = !rallying;
    const bad = rr() < errProb(sh.err, q, stretch, sh.pace);
    if (bad) {
      const why = rr() < 0.5 ? 'net' : 'out';
      ev(st, { k: 'error', hitter: seat, shot: mv.shot, serve: isServe, why, quality: qLabel(q) });
      if (isServe) { st.stats[seat].faults++; if (sport.secondServe && st.serveNo === 1) { st.serveNo = 2; ev(st, { k: 'fault', hitter: seat, n: 1 }); return { ok: true, won: null }; } endPoint(st, opp, sport.secondServe ? 'double fault' : 'error'); return { ok: true, won: st.winner }; }
      endPoint(st, opp, 'error'); return { ok: true, won: st.winner };
    }
    let aim = mv.aim; if (rr() < (1 - q) * 0.45) { const d = rr() < 0.5 ? -1 : 1; aim = aim + d; if (aim < 0 || aim > 2) aim = mv.aim - d; }
    st.rally++; st.ball = { hitter: seat, shot: mv.shot, serve: isServe, pace: sh.pace, aim, depth: mv.depth, q: +q.toFixed(3) }; st.phase = 'rally'; st.turn = opp;
    ev(st, { k: 'send', hitter: seat, shot: mv.shot, serve: isServe, pace: sh.pace });
    if (st.ex >= MAX_EXCHANGES) capDecide(st);
    return { ok: true, won: st.winner };
  }
  function forfeit(st, seat) { if (st.winner == null) st.winner = other(seat); return { ok: true, won: st.winner }; }
  const cat = (t) => Object.entries(t).map(([id, s]) => ({ id, label: s.label, pace: s.pace, risk: s.err, note: s.note || '', depth: s.depth ?? null, needs: s.needs || null }));
  /** what a seat may see: never the aim, depth or quality of the ball in flight; the history of aims and covers is public (reading the opponent is the game) */
  function view(st, who) {
    const mine = st.turn === who && st.winner == null; const rallying = st.phase === 'rally' && st.ball;
    return { game: sport.id, you: who, mine, phase: st.phase, serveNo: st.serveNo, server: st.server, role: st.winner != null ? null : st.phase === 'serve' ? (st.server === who ? 'serve' : 'wait') : (st.turn === who ? 'return' : 'wait'),
      score: sport.scoreView(st), ball: rallying ? { hitter: st.ball.hitter, shot: st.ball.shot, serve: st.ball.serve, pace: st.ball.pace } : null, legal: st.winner == null ? legal(st) : [], shots: cat(shots), serves: cat(serves), rally: st.rally,
      hist: st.hist, stats: st.stats, log: st.log, ex: st.ex, meter: { periodMs: METER_MS }, labels: sport.labels, secondServe: !!sport.secondServe, winner: st.winner };
  }
  // ---- practice bot: skill 0..1 sets how well it times the meter and how well it reads you; the same rules as a person (it sees only the public history)
  const pick = (rng, weights) => { const sum = weights.reduce((a, b) => a + b, 0) || 1; let x = rng() * sum; for (let i = 0; i < weights.length; i++) { x -= weights[i]; if (x <= 0) return i; } return weights.length - 1; };
  function bot(st, seat, rng = Math.random) {
    const s = st.skill?.[seat] ?? 0.5; const opp = other(seat); const mv = {}; const ids = legal(st); const table = st.phase === 'serve' ? serves : shots;
    mv.timing = clamp(0.2 + 0.7 * s + (rng() - 0.5) * 0.45, 0.04, 1);
    const q = mv.timing; const temp = 0.15 + (1 - s) * 0.9; const ws = ids.map(id => { const sh = table[id]; const ev0 = sh.pace * (0.5 + 0.5 * q) - sh.err * (1.6 - 1.4 * q) * 1.3 + (sh.needs ? 0.5 : 0); return Math.exp(ev0 / temp); });
    mv.shot = ids[pick(rng, ws)]; const sh = table[mv.shot];
    // aim at the cells the opponent covers least (public history), blurred by skill
    const hc = st.hist[opp].cover; const tot = hc.reduce((a, b) => a + b, 0); const aw = hc.map((c) => (rng() < s ? 1 / (1 + (c * 6) / (1 + tot * 0.2)) : 1)); const cell = pick(rng, aw);
    mv.aim = cell % 3; mv.depth = sh.depth != null ? sh.depth : Math.floor(cell / 3);
    if (st.phase === 'rally' && st.ball) {
      const ha = st.hist[st.ball.hitter].aim; const ht = ha.reduce((a, b) => a + b, 0); const forced = shots[st.ball.shot]?.depth ?? serves[st.ball.shot]?.depth;
      const cw = ha.map((c, i) => ((forced != null && Math.floor(i / 3) !== forced) ? 0.01 : rng() < 0.15 + 0.7 * s ? 1 + (c * 5) / (1 + ht * 0.2) : 1)); const k = pick(rng, cw); mv.coverAim = k % 3; mv.coverDepth = Math.floor(k / 3);
    }
    return mv;
  }
  return { newGame, play, forfeit, view, bot, legal, shots, serves, sport };
}
