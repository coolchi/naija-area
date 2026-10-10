// Suwe (Yoruba hopscotch), the PURE rules shared by the single-player break game and the 2-player table game. Deterministic from a seed. GAME MONEY ONLY.
// "COMMON VERSION" (rules vary by area; see docs/WORD_BOARD_GAMES.md; the Yoruba text and any chant are PLACEHOLDER for a local reviewer).
//   A long rectangle of 12 boxes in a U route: 6 boxes going away along one side, 6 coming back along the other. Boxes are labelled 1 2 3 4 5 6 | 6 5 4 3 2 1, so every number appears on BOTH sides.
//   One STAGE: throw the stone into the stage's box (stage 1 = the first box; timing bar: stop the marker in the middle), then hop through the OTHER boxes in route order on one foot, tapping in
//   time with the beat (touching a line = a tap too early or too late = you are out for this turn), then pick the stone up (last tap). Hopping over the stone's box, or over a box that is
//   somebody else's HOUSE, is a longer hop. Your own house is a rest box (both feet allowed: a wider timing window).
//   After the last stage of a LAP you build a HOUSE: throw the stone over your shoulder (blind). It lands on a number you cannot choose among the free ones; if it lands across the middle
//   line (marker stopped near the centre), it is the SAME numbered box on both sides: that number is your house. Most houses wins.
// The SERVER makes every decision: the seed gives the beat pattern and the stone's wobble, the client only reports WHEN it tapped (relative times), and the server judges them.
import { mulberry32 } from './merge.js';
export const BOXES = 12, LABELS = [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1], PAIRS = 6, LEAD_BEATS = 4, AIM_PERIOD_MS = 1400, HOUSE_TOL = 0.17;
const hash = (s) => { let x = 2166136261; for (const c of String(s)) x = Math.imul(x ^ c.charCodeAt(0), 16777619) >>> 0; return x >>> 0; };
export const houseBoxes = (n) => [n - 1, BOXES - n];           // the two boxes numbered n: one on each side
const tri = (x) => 1 - Math.abs(2 * (((x % 1) + 1) % 1) - 1);  // 0 -> 1 -> 0 marker position over one period
export const markerAt = (aimMs) => tri(aimMs / AIM_PERIOD_MS);
/** how hard stage s is (1-based): faster beat, narrower timing window, smaller target for the stone */
export function difficulty(stage) { return { beatMs: Math.max(420, 640 - 18 * (stage - 1)), windowMs: Math.max(95, 175 - 7 * (stage - 1)), aimTol: Math.max(0.12, 0.24 - 0.01 * (stage - 1)) }; }
/** houses: array of 6 (index = number - 1) holding the owning seat or -1. Returns the FULL plan (with the stone's wobble: never sent to a client). */
export function fullPlan({ seed, stage, seat = 0, houses = Array(PAIRS).fill(-1) }) {
  const d = difficulty(stage); const rng = mulberry32(hash(`suwe:${seed}:${stage}:${seat}`)); const aimNoise = (rng() - 0.5) * 0.1; const stoneBox = stage - 1; const events = []; let gap = 0, t = 0;
  for (let i = 0; i < BOXES; i++) {
    const owner = houses[LABELS[i] - 1]; if (i === stoneBox || (owner >= 0 && owner !== seat)) { gap += 0.5; continue; }
    if (events.length) t += (1 + gap) * d.beatMs; gap = 0; events.push({ box: i, kind: owner === seat ? 'rest' : 'hop', at: Math.round(t) });
  }
  t += (1.5 + gap) * d.beatMs; events.push({ box: stoneBox, kind: 'pickup', at: Math.round(t) });
  return { stage, stoneBox, ...d, leadMs: LEAD_BEATS * d.beatMs, aimPeriodMs: AIM_PERIOD_MS, events, aimNoise };
}
export const publicPlan = (p) => { const { aimNoise, ...rest } = p; void aimNoise; return rest; };
/** the shortest real time a human could take for this stage (count-in + hops), used to refuse instant submissions */
export const minDurationMs = (p) => p.leadMs + p.events.at(-1).at;
export const grade = (err, w) => { const e = Math.abs(err); return e <= w * 0.35 ? 'perfect' : e <= w ? 'good' : 'miss'; };
/** judge one stage: input = { aim: ms the throw was stopped, taps: [ms ... one per event, measured from the start of the count-in] } */
export function resolveStage(args, input = {}) {
  const p = fullPlan(args); const aim = Number(input.aim); const taps = Array.isArray(input.taps) ? input.taps.map(Number) : null;
  if (!Number.isFinite(aim) || aim < 0 || aim > 60000 || !taps || taps.some(x => !Number.isFinite(x) || x < 0 || x > 180000)) return { ok: false, bad: true, reason: 'input' };
  const m = markerAt(aim); const err = Math.abs(m + p.aimNoise - 0.5); const out = { stage: p.stage, aim: { marker: Math.round(m * 1000) / 1000, off: Math.round(err * 1000) / 1000, tol: p.aimTol } };
  if (err > p.aimTol) return { ...out, ok: false, reason: 'stone', hops: [], perfect: 0, good: 0, score: 0, message: 'The stone landed on a line. Out for this turn!' };
  const hops = []; let perfect = 0, good = 0, failedAt = -1;
  if (taps.length !== p.events.length) return { ...out, ok: false, reason: 'taps', hops, perfect, good, score: 0, message: taps.length < p.events.length ? 'You stopped hopping before the stone was picked up.' : 'Too many taps: you touched a line.' };
  for (let k = 0; k < p.events.length; k++) { const ev = p.events[k]; const e = taps[k] - (p.leadMs + ev.at); const w = ev.kind === 'rest' ? p.windowMs * 1.5 : p.windowMs; const g = grade(e, w); hops.push({ k, box: ev.box, err: Math.round(e), grade: g }); if (g === 'miss') { failedAt = k; break; } if (g === 'perfect') perfect++; else good++; }
  if (failedAt >= 0) return { ...out, ok: false, reason: 'line', failedAt, hops, perfect, good, score: 0, message: hops[failedAt].err < 0 ? 'Too early: your foot touched the line!' : 'Too late: you lost your balance!' };
  return { ...out, ok: true, hops, perfect, good, score: 10 + good + 2 * perfect, message: 'Stone picked up. Clean hops!' };
}
/** the blind over-the-shoulder throw: the stone lands on one of the FREE numbers (not chosen), and is a house only if it lands across the middle line (marker near the centre) */
export function resolveHouse({ seed, lap, seat = 0, houses }, input = {}) {
  const free = []; for (let n = 1; n <= PAIRS; n++) if (houses[n - 1] < 0) free.push(n); if (!free.length) return { ok: false, claimed: false, pair: null, lands: 'none', message: 'Every house is taken.' };
  const rng = mulberry32(hash(`suwe-house:${seed}:${lap}:${seat}`)); const pair = free[Math.floor(rng() * free.length)]; const noise = (rng() - 0.5) * 0.1; const aim = Number(input.aim);
  if (!Number.isFinite(aim) || aim < 0 || aim > 60000) return { ok: false, bad: true, reason: 'input' };
  const m = markerAt(aim) + noise; const off = Math.abs(m - 0.5); const claimed = off <= HOUSE_TOL; const lands = claimed ? 'both' : m < 0.5 ? 'left' : 'right';
  return { ok: true, pair, lands, claimed, off: Math.round(off * 1000) / 1000, message: claimed ? `The stone landed across box ${pair} on both sides: box ${pair} is your house!` : `The stone landed on the ${lands} side only (box ${pair}). No house this time.` };
}
/** a human-like player for bots and tests: skill 0..1 (1 = very steady). Returns inputs for resolveStage / resolveHouse. */
export function playerInput(args, rng, skill = 0.7) {
  const p = fullPlan(args); const g = () => { let s = 0; for (let i = 0; i < 6; i++) s += rng(); return (s - 3) / 0.7071; };   // ~ normal(0,1)
  const m = Math.min(1, Math.max(0, 0.5 - p.aimNoise + g() * (0.07 + (1 - skill) * 0.12))); const aim = Math.round(m / 2 * AIM_PERIOD_MS);
  const sd = p.windowMs * (0.3 + (1 - skill) * 0.8); const taps = p.events.map(ev => Math.max(0, Math.round(p.leadMs + ev.at + g() * sd))); return { aim, taps };
}
export function houseInput(args, rng, skill = 0.7) {
  const free = []; for (let n = 1; n <= PAIRS; n++) if (args.houses[n - 1] < 0) free.push(n); const r = mulberry32(hash(`suwe-house:${args.seed}:${args.lap}:${args.seat ?? 0}`)); r(); const noise = (r() - 0.5) * 0.1; void free;
  const sd = (1 - skill) * 0.3 + 0.04; let s = 0; for (let i = 0; i < 6; i++) s += rng(); const m = Math.min(1, Math.max(0, 0.5 - noise + ((s - 3) / 0.7071) * sd)); return { aim: Math.round(m / 2 * AIM_PERIOD_MS) };
}
