// Table football ("Foosball"), 2 players, game money only. NOT real-time: our server is built around turns, not 60-frame physics, so this is a TURN-BASED DUEL of nerve and prediction
// that the server plays out for you. Each round one player ATTACKS and the other DEFENDS:
//   1. The defender sets three rods (keeper, defence, midfield), each slid to one of 5 positions (0..4). The attacker cannot see them.
//   2. The attacker picks a lane (where the ball starts, 0..4), an angle (-2..2: far left to far right) and a power (1..3 = how far the ball can travel).
//   3. The server rolls the ball along that line on a 9 x 12 table. It bounces off the side walls and off any figure it hits. A ball that crosses the goal line inside the goal mouth is a GOAL;
//      a ball that runs out of power stops. Everything is deterministic (no dice): the same choices always give the same result, and the client may show the path the server returns.
//   Roles swap every round. First to 3 goals wins; after 10 rounds (5 attacks each) the higher score wins (equal = draw). A ball knocked back past the attacker's own rod is simply stopped (saved).
// Seat 0 and seat 1 take turns attacking; the move contract is the same as the other table games: newGame(n, rng), play(st, seat, move, rng), forfeit, view, bot.
export const W = 9, L = 12, GOAL_X0 = 2, GOAL_X1 = 7, WIN = 3, ROUNDS = 10, BALL_R = 0.25, FIG_R = 0.33, LANES = 5, RANGE = { 1: 9, 2: 15, 3: 22 }, ANGLE_DEG = 11, START_Y = 8.5;
// rods, measured from the DEFENDER's goal line (y = 0 there): y of the rod, the base x of each figure, and how far one slide step moves the figures sideways
export const RODS = [{ name: 'keeper', y: 0.9, xs: [4.5], step: 1.1 }, { name: 'defence', y: 3.2, xs: [2.5, 6.5], step: 0.75 }, { name: 'midfield', y: 6.0, xs: [1.8, 4.5, 7.2], step: 0.6 }];
export const figures = (guard) => RODS.flatMap((rod, i) => rod.xs.map(x => ({ x: x + (guard[i] - 2) * rod.step, y: rod.y, rod: i })));
const other = (s) => 1 - s;
const inMouth = (x) => x >= GOAL_X0 && x <= GOAL_X1;
/** roll the ball. Everything is in the DEFENDER's frame: the defender's goal line is y = 0 and the ball travels toward y = 0 from START_Y. Returns { result, path } with
 *  result 'goal' | 'saved' | 'stopped' and path = [[x, y], ...] sampled about every 0.5 units for the client to animate. */
export function shoot(guard, lane, angle, power) {
  const figs = figures(guard); let x = 1.5 + lane * 1.5, y = START_Y; const a = (angle * ANGLE_DEG * Math.PI) / 180; let vx = Math.sin(a), vy = -Math.cos(a); let range = RANGE[power]; const path = [[x, y]];
  const last = new Map(); let hits = 0, saved = false, acc = 0; const h = 0.05; const hitR = FIG_R + BALL_R;
  for (let n = 0; n < 4000 && range > 0; n++) {
    x += vx * h; y += vy * h; range -= h; acc += h;
    if (x < BALL_R) { x = BALL_R + (BALL_R - x); vx = Math.abs(vx); } else if (x > W - BALL_R) { x = (W - BALL_R) - (x - (W - BALL_R)); vx = -Math.abs(vx); }
    for (let k = 0; k < figs.length; k++) { const f = figs[k]; const dx = x - f.x, dy = y - f.y; if (dx * dx + dy * dy < hitR * hitR && n - (last.get(k) ?? -999) > 12) {
      last.set(k, n); const d = Math.hypot(dx, dy) || 1; const nx = dx / d, ny = dy / d; const dot = vx * nx + vy * ny; if (dot < 0) { vx -= 2 * dot * nx; vy -= 2 * dot * ny; range *= 0.75; hits++; saved = true; const m = Math.hypot(vx, vy) || 1; vx /= m; vy /= m; } } }
    if (y <= 0) { if (inMouth(x)) { path.push([x, 0]); return { result: 'goal', path, hits }; } y = -y; vy = Math.abs(vy); range *= 0.8; }
    else if (y >= START_Y + 1.5) { path.push([+x.toFixed(2), +y.toFixed(2)]); return { result: 'saved', path, hits }; } // a ball knocked back is stopped by the attacker's own rod line
    if (acc >= 0.5) { path.push([+x.toFixed(2), +y.toFixed(2)]); acc = 0; }
  }
  path.push([+x.toFixed(2), +y.toFixed(2)]); return { result: saved ? 'saved' : 'stopped', path, hits };
}
export function newGame(n = 2, rng = Math.random) {
  const attacker = rng() < 0.5 ? 0 : 1; return { n: 2, turn: other(attacker), phase: 'guard', attacker, round: 0, score: [0, 0], guard: null, last: null, winner: null };
}
const okInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
function finish(st) {
  if (st.score[0] >= WIN) st.winner = 0; else if (st.score[1] >= WIN) st.winner = 1; else if (st.round >= ROUNDS) st.winner = st.score[0] === st.score[1] ? 'draw' : st.score[0] > st.score[1] ? 0 : 1; return st.winner;
}
/** move = { guard: [k, d, m] } (the defender, phase 'guard') or { lane, angle, power } (the attacker, phase 'shoot') */
export function play(st, seat, mv) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' };
  if (st.phase === 'guard') {
    const g = mv?.guard; if (!Array.isArray(g) || g.length !== 3 || !g.every(v => okInt(v, 0, 4))) return { error: 'BAD_MOVE', message: 'Slide each of the three rods to a position from 0 to 4.' };
    st.guard = g.slice(); st.phase = 'shoot'; st.turn = st.attacker; return { ok: true, won: null };
  }
  const lane = mv?.lane, angle = mv?.angle, power = mv?.power; if (!okInt(lane, 0, LANES - 1) || !okInt(angle, -2, 2) || !okInt(power, 1, 3)) return { error: 'BAD_MOVE', message: 'Pick a lane (0 to 4), an angle (-2 to 2) and a power (1 to 3).' };
  const r = shoot(st.guard, lane, angle, power); const defender = other(st.attacker); const scorer = r.result === 'goal' ? st.attacker : null; if (scorer != null) st.score[scorer]++;
  st.last = { round: st.round + 1, attacker: st.attacker, scorer, result: r.result, path: r.path, guard: st.guard, lane, angle, power, hits: r.hits }; st.round++; st.guard = null;
  if (finish(st) == null) { st.attacker = defender; st.turn = other(st.attacker); st.phase = 'guard'; } return { ok: true, info: st.last, won: st.winner };
}
export function forfeit(st, seat) { if (st.winner == null) st.winner = other(seat); return { ok: true, won: st.winner }; }
/** what a seat may see. The defender's rods stay hidden from the attacker until the shot has been taken (then they are in `last.guard`). */
export function view(st, who) {
  const mine = st.turn === who && st.winner == null; const defending = st.attacker !== who;
  return { game: 'football', you: who, mine, role: st.winner != null ? null : defending ? 'defend' : 'attack', phase: st.phase, attacker: st.attacker, score: st.score, round: st.round + (st.winner == null ? 1 : 0), rounds: ROUNDS, win: WIN, last: st.last,
    guard: st.phase === 'shoot' && defending ? st.guard : null, geom: { W, L, goal: [GOAL_X0, GOAL_X1], rods: RODS, startY: START_Y, lanes: LANES } };
}
/** practice bot: defends with a random-ish line-up biased to the middle, attacks with a lane and angle that looks at the open side, power mixed */
export function bot(st, seat, rng = Math.random) {
  if (st.phase === 'guard') return { guard: RODS.map(() => Math.min(4, Math.max(0, 2 + Math.round((rng() - 0.5) * 3)))) };
  return { lane: Math.floor(rng() * LANES), angle: Math.floor(rng() * 5) - 2, power: 2 + Math.floor(rng() * 2) };
}
