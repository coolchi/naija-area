// Suwe, 2-player table version (turn based, game money only). The pure rules are in ../casual/suwe.js (common version, rules vary by area; Yoruba text is PLACEHOLDER).
// One TURN = one stage attempt (throw the stone, hop the route in rhythm, pick it up) or, after the last stage of a lap, one HOUSE throw. The client plays the rhythm locally and sends
// { aim, taps }: when the throw was stopped and when each hop was tapped. The SERVER judges them against the seeded plan, so it decides success, the stone's wobble and the house.
// A clean stage moves you to the next stage; a mistake (line touched, mistimed, stone on a line) keeps you on the same stage for your next turn. Turns alternate either way.
// After STAGES stages you build a house; the match ends when HOUSES_TO_END houses are taken or after MAX_TURNS turns in total. Most houses wins; equal houses: more stages cleared; else a draw.
import { PAIRS, fullPlan, publicPlan, resolveStage, resolveHouse, minDurationMs, houseBoxes, playerInput, houseInput, LABELS, HOUSE_TOL, AIM_PERIOD_MS } from '../casual/suwe.js';
export const STAGES = 4, HOUSES_TO_END = 4, MAX_TURNS = 40, BOT_SKILL = 0.75, SLACK_MS = 600;
export { LABELS };
export const newGame = (n = 2, rng = Math.random) => ({ n: 2, seed: Math.floor(rng() * 4294967296) >>> 0, turn: Math.floor(rng() * 2), turnNo: 0, stage: [1, 1], lap: [1, 1], phase: ['stage', 'stage'], houses: Array(PAIRS).fill(-1), won: [0, 0], progress: [0, 0], perfect: [0, 0], winner: null, why: null, last: null, stagesPerLap: STAGES, maxTurns: MAX_TURNS });
/** skip stone boxes that are the opponent's house (they cannot be thrown into) and move to the house throw after the last stage */
function normalize(st, seat) {
  while (st.phase[seat] === 'stage') { const box = st.stage[seat] - 1; const lab = LABELS[box]; const owner = st.houses[lab - 1]; if (owner >= 0 && owner !== seat) { st.stage[seat]++; st.progress[seat]++; } else break; if (st.stage[seat] > st.stagesPerLap) { st.phase[seat] = 'house'; } }
  if (st.phase[seat] === 'stage' && st.stage[seat] > st.stagesPerLap) st.phase[seat] = 'house';
}
const args = (st, seat) => ({ seed: `${st.seed}:${st.turnNo}`, stage: st.stage[seat], seat, houses: st.houses });
const houseArgs = (st, seat) => ({ seed: `${st.seed}:${st.turnNo}`, lap: st.lap[seat], seat, houses: st.houses });
function finishIf(st) {
  const taken = st.won[0] + st.won[1]; if (taken < HOUSES_TO_END && st.turnNo < st.maxTurns) return;
  const [a, b] = st.won; const cmp = (x) => (x[0] === x[1] ? 0 : x[0] > x[1] ? 1 : -1); const o = cmp(st.won) || cmp(st.progress) || cmp(st.perfect); st.winner = o === 0 ? 'draw' : o > 0 ? 0 : 1;
  st.why = taken >= HOUSES_TO_END ? `${a} house${a === 1 ? '' : 's'} to ${b}${a === b ? ` (tie broken by stages cleared, then perfect hops)` : ''}: the street is full` : `Turn limit: houses ${a} to ${b}${a === b ? `, stages cleared ${st.progress[0]} to ${st.progress[1]}` : ''}`;
}
export function play(st, seat, mv = {}, rng, ctx = {}) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' }; normalize(st, seat);
  let res, info;
  if (st.phase[seat] === 'house') {
    res = resolveHouse(houseArgs(st, seat), mv); if (res.bad) return { error: 'BAD_INPUT', message: 'Bad throw.' };
    if (ctx.now && ctx.turnStart && !ctx.bot && ctx.now - ctx.turnStart < 400) return { error: 'TOO_FAST', message: 'That was too quick to be a real throw.' };
    if (res.claimed) { st.houses[res.pair - 1] = seat; st.won[seat]++; } info = { who: seat, kind: 'house', ...res, lap: st.lap[seat] }; st.lap[seat]++; st.stage[seat] = 1; st.phase[seat] = 'stage';
  } else {
    const a = args(st, seat); res = resolveStage(a, mv); if (res.bad) return { error: 'BAD_INPUT', message: 'Bad input.' };
    if (ctx.now && ctx.turnStart && !ctx.bot) { const need = minDurationMs(fullPlan(a)) - SLACK_MS; if (ctx.now - ctx.turnStart < need) return { error: 'TOO_FAST', message: 'That was faster than a person can hop it. Play it in time!' }; }
    info = { who: seat, kind: 'stage', stage: st.stage[seat], ok: res.ok, reason: res.reason || null, message: res.message, perfect: res.perfect, good: res.good, failedAt: res.failedAt ?? null, aim: res.aim };
    if (res.ok) { st.perfect[seat] += res.perfect; st.progress[seat]++; st.stage[seat]++; if (st.stage[seat] > st.stagesPerLap) st.phase[seat] = 'house'; }
  }
  st.last = info; st.turnNo++; st.turn = 1 - seat; finishIf(st); if (st.winner == null) normalize(st, st.turn); return { ok: true, info, won: st.winner };
}
export function forfeit(st, seat) { if (st.winner == null) { st.winner = 1 - seat; st.why = 'Left the game'; } return { ok: true, won: st.winner }; }
export function view(st, who) {
  const mine = st.turn === who && st.winner == null; const t = copy(st); normalize(t, who); const phase = t.phase[who], stage = t.stage[who]; let plan = null;
  if (mine) plan = phase === 'house' ? { aimPeriodMs: AIM_PERIOD_MS, tol: HOUSE_TOL } : publicPlan(fullPlan({ seed: `${st.seed}:${st.turnNo}`, stage, seat: who, houses: st.houses }));
  return { game: 'suwe', you: who, mine, turn: st.turn, turnNo: st.turnNo, maxTurns: st.maxTurns, phase, stage, stages: st.stagesPerLap, lap: st.lap[who], houses: st.houses, won: st.won, progress: st.progress, plan, last: st.last, labels: LABELS, why: st.why, housesToEnd: HOUSES_TO_END };
}
const copy = (st) => ({ ...st, stage: st.stage.slice(), phase: st.phase.slice(), progress: st.progress.slice() });
/** the practice bot is a fair-but-not-great hopper: it plays real inputs through the same judge as everybody */
export function bot(st, seat, rng = Math.random) {
  const t = copy(st); normalize(t, seat); if (t.phase[seat] === 'house') return houseInput({ ...houseArgs(t, seat) }, rng, BOT_SKILL); return playerInput(args(t, seat), rng, BOT_SKILL);
}
export { houseBoxes };
