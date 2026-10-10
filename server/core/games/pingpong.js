// Table tennis ("Ping pong"), 2 players, game money only. Turn-based timing-and-choice rallies on the shared kernel (rally.js); read the header there.
// Rules (standard table tennis, simplified):
//   * A game is first to 11 points with a 2-point lead (at 20-20 the next point decides, a safety stop). A match is best of 3 games (first to 2).
//   * The server changes every 2 points; at 10-10 or later every point. The player who received first in a game serves first in the next game.
//   * A serve that goes into the net or out is a point for the receiver (no second serve in table tennis). There are no lets in this version.
// Shots: push (slow, safe), drive, loop (topspin: fast, risky), lob (high, slow: invites a smash), smash (only against a lob). Serves: short (always lands short), long, spin.
import { makeEngine, other } from './rally.js';
export const GAME_POINTS = 11, GAMES_TO_WIN = 2, SUDDEN = 20;
const shots = {
  push: { label: 'Push', pace: 0.25, err: 0.04, note: 'Slow and safe.' }, drive: { label: 'Drive', pace: 0.55, err: 0.12, note: 'Flat and steady.' }, loop: { label: 'Loop (topspin)', pace: 0.78, err: 0.22, note: 'Fast and risky.' },
  lob: { label: 'Lob', pace: 0.3, err: 0.10, note: 'High and slow: the other side may smash it.' }, smash: { label: 'Smash', pace: 0.95, err: 0.30, needs: 'lob', note: 'Only against a lob. Hard to return, easy to miss.' } };
const serves = { short: { label: 'Short serve', pace: 0.2, err: 0.03, depth: 0, note: 'Lands short, very safe.' }, long: { label: 'Long serve', pace: 0.5, err: 0.07, note: 'Deep and quick.' }, spin: { label: 'Spin serve', pace: 0.68, err: 0.14, note: 'Fast with spin. A little risky.' } };
const cfg = { reach: [1, 0.8, 0.5], depthPen: 0.15, bite: 0.45, soft: 0.3 };
/** the server for the next point from the first server of the game and the points so far */
export const serverFor = (st) => { const [a, b] = st.points; const t = a + b; return (a >= 10 && b >= 10) ? (st.firstServer + t) % 2 : (st.firstServer + Math.floor(t / 2)) % 2; };
export const gameOver = (a, b) => (a >= GAME_POINTS && a - b >= 2) || a >= SUDDEN + 1;
const sport = { id: 'pingpong', label: 'Ping pong', cfg, shots, serves, secondServe: false, labels: { point: 'point', set: 'game' },
  setup(st, rng) { st.points = [0, 0]; st.games = [0, 0]; st.firstServer = rng() < 0.5 ? 0 : 1; st.gameNo = 1; st.server = st.firstServer; },
  serverFor,
  award(st, w) { const L = other(w); st.points[w]++; if (!gameOver(st.points[w], st.points[L])) return;
    st.games[w]++; st.log.push({ i: ++st.evN, k: 'game', winner: w, points: st.points.slice() }); if (st.games[w] >= GAMES_TO_WIN) { st.winner = w; return; } st.points = [0, 0]; st.gameNo++; st.firstServer = other(st.firstServer); },
  scoreView(st) { return { points: st.points.slice(), games: st.games.slice(), gameNo: st.gameNo, to: GAME_POINTS, gamesToWin: GAMES_TO_WIN, text: `Game ${st.gameNo}: ${st.points[0]}-${st.points[1]} · games ${st.games[0]}-${st.games[1]}` }; },
  standing: (st) => [st.games[0] * 100 + st.points[0], st.games[1] * 100 + st.points[1]] };
const eng = makeEngine(sport);
export const { newGame, play, forfeit, view, bot, legal } = eng; export default eng; export { shots, serves, cfg, sport };
