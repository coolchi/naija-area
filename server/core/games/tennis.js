// Lawn tennis ("Tennis"), 2 players, game money only. Turn-based timing-and-choice rallies on the shared kernel (rally.js); read the header there.
// Simplified scoring so a match is short (about 6 to 10 minutes against a bot):
//   * Points inside a game: 0, 15, 30, 40, then game. At 40-40 it is DEUCE: win two points in a row (ADVANTAGE then GAME). After 6-6 in points the next point wins (golden point, a safety stop).
//   * A set is first to 4 games. A match is ONE short set (SETS_TO_WIN = 1); the code supports more sets and a test plays best of 3.
//   * The server changes every game. FIRST SERVE and SECOND SERVE: a first-serve fault gives a second serve; a second fault is a DOUBLE FAULT and the receiver wins the point.
// Shots: flat (fast), topspin (steady), slice (slow, safe), lob (high, invites a smash), drop (always lands short), smash (only against a lob). Serves: flat (fast, risky), slice, kick (slow, safe).
import { makeEngine, other } from './rally.js';
export const GAMES_TO_WIN = 4, SETS_TO_WIN = 1, GOLDEN = 7;
const shots = {
  flat: { label: 'Flat drive', pace: 0.72, err: 0.18, note: 'Fast and flat. Risky.' }, topspin: { label: 'Topspin', pace: 0.6, err: 0.11, note: 'Steady with bounce.' }, slice: { label: 'Slice', pace: 0.4, err: 0.07, note: 'Low and safe.' },
  lob: { label: 'Lob', pace: 0.3, err: 0.10, note: 'High over the head: the other side may smash.' }, drop: { label: 'Drop shot', pace: 0.2, err: 0.16, depth: 0, note: 'Dies just over the net.' }, smash: { label: 'Smash', pace: 0.95, err: 0.26, needs: 'lob', note: 'Only against a lob.' } };
const serves = { flat: { label: 'Flat serve', pace: 0.85, err: 0.30, note: 'Big and risky.' }, slice: { label: 'Slice serve', pace: 0.62, err: 0.16, note: 'Wide and quick.' }, kick: { label: 'Kick serve', pace: 0.42, err: 0.07, note: 'High bounce, safe.' } };
const cfg = { reach: [1, 0.85, 0.55], depthPen: 0.12, bite: 0.4, soft: 0.35 };
export const gameDone = (a, b) => (a >= 4 && a - b >= 2) || a >= GOLDEN;
export const pointText = (a, b) => { if (a >= 3 && b >= 3) return a === b ? ['Deuce', 'Deuce'] : a > b ? ['Adv', '40'] : ['40', 'Adv']; const T = ['0', '15', '30', '40']; return [T[Math.min(3, a)], T[Math.min(3, b)]]; };
const sport = { id: 'tennis', label: 'Tennis', cfg, shots, serves, secondServe: true, labels: { point: 'point', set: 'game' },
  setup(st, rng) { st.points = [0, 0]; st.games = [0, 0]; st.sets = [0, 0]; st.setsToWin = SETS_TO_WIN; st.firstServer = rng() < 0.5 ? 0 : 1; st.gameNo = 1; st.server = st.firstServer; },
  serverFor: (st) => (st.firstServer + st.gameNo - 1) % 2,
  award(st, w) { const L = other(w); st.points[w]++; if (!gameDone(st.points[w], st.points[L])) return;
    st.log.push({ i: ++st.evN, k: 'game', winner: w, points: st.points.slice() }); st.games[w]++; st.points = [0, 0]; st.gameNo++;
    if (st.games[w] >= GAMES_TO_WIN) { st.sets[w]++; st.games = [0, 0]; if (st.sets[w] >= st.setsToWin) st.winner = w; } },
  scoreView(st) { const [pa, pb] = pointText(st.points[0], st.points[1]); return { points: [pa, pb], raw: st.points.slice(), games: st.games.slice(), sets: st.sets.slice(), gameNo: st.gameNo, setsToWin: st.setsToWin, gamesToWin: GAMES_TO_WIN, text: `Games ${st.games[0]}-${st.games[1]} · ${pa}-${pb}${st.sets[0] + st.sets[1] ? ` · sets ${st.sets[0]}-${st.sets[1]}` : ''}` }; },
  standing: (st) => [st.sets[0] * 10000 + st.games[0] * 100 + st.points[0], st.sets[1] * 10000 + st.games[1] * 100 + st.points[1]] };
const eng = makeEngine(sport);
export const { newGame, play, forfeit, view, bot, legal } = eng; export default eng; export { shots, serves, cfg, sport };
