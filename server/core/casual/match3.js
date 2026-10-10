// Match-3 puzzle ("Chop Am", Nigerian street snacks): an 8x8 board, swap two neighbouring tiles to line up three or more of the same snack, matches clear, tiles fall, new ones drop in,
// and cascades score more. ORIGINAL ruleset and art (snack emoji on plain tiles), no look-alike of any commercial match-3. PURE and DETERMINISTIC: the SAME file runs on the client (to
// play) and on the server (to replay the submitted move log from the server-issued seed and decide the score). All randomness comes from one seeded generator consumed in a fixed order.
//
// Rules: 20 moves. A swap is only legal if it makes at least one line of 3+ (otherwise it is refused and does not use a move). Lines of 3 score 30, 4 score 60, 5 or more 100 (+30 per extra tile),
// all multiplied by the cascade level (1 for your swap, 2 for the first refill chain, ...). If no legal swap is left after a cascade settles, the board is reshuffled (same seeded generator).
export const SIZE = 8, KINDS = 5, MOVES = 20;
export const SNACKS = ['puffpuff', 'chinchin', 'suya', 'zobo', 'plantain']; // the client maps these to pictures
export const mulberry32 = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const at = (g, r, c) => g[r * SIZE + c];
const inb = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;
const rand = (rng) => Math.floor(rng() * KINDS) + 1; // tiles are 1..KINDS, 0 = empty

/** every cell that belongs to a run of 3+ equal tiles, plus the runs themselves ([{cells, kind}]) */
export function findRuns(g) {
  const runs = [];
  for (let r = 0; r < SIZE; r++) { let c = 0; while (c < SIZE) { const v = at(g, r, c); let e = c; while (e + 1 < SIZE && v && at(g, r, e + 1) === v) e++; if (v && e - c >= 2) runs.push({ kind: v, cells: Array.from({ length: e - c + 1 }, (_, k) => r * SIZE + c + k) }); c = e + 1; } }
  for (let c = 0; c < SIZE; c++) { let r = 0; while (r < SIZE) { const v = at(g, r, c); let e = r; while (e + 1 < SIZE && v && at(g, e + 1, c) === v) e++; if (v && e - r >= 2) runs.push({ kind: v, cells: Array.from({ length: e - r + 1 }, (_, k) => (r + k) * SIZE + c) }); r = e + 1; } }
  return runs;
}
export const runScore = (n) => (n >= 5 ? 100 + (n - 5) * 30 : n === 4 ? 60 : 30);
const swapped = (g, a, b) => { const h = g.slice(); [h[a], h[b]] = [h[b], h[a]]; return h; };
/** the two cells a move touches: cell index + direction ('r' = with the tile to the right, 'd' = with the tile below) or null if off the board */
export function target(cell, dir) { const r = Math.floor(cell / SIZE), c = cell % SIZE; if (!Number.isInteger(cell) || cell < 0 || cell >= SIZE * SIZE) return null; if (dir === 'r') return c + 1 < SIZE ? cell + 1 : null; if (dir === 'd') return r + 1 < SIZE ? cell + SIZE : null; return null; }
/** is this swap legal (makes a line)? */
export function legal(g, cell, dir) { const t = target(cell, dir); if (t == null || g[cell] === g[t]) return false; return findRuns(swapped(g, cell, t)).length > 0; }
export function legalMoves(g) { const out = []; for (let i = 0; i < SIZE * SIZE; i++) for (const d of ['r', 'd']) if (legal(g, i, d)) out.push({ cell: i, dir: d }); return out; }

function fillNoRuns(g, rng) { // fill every empty cell, re-rolling a tile when it would complete a run of three while filling (keeps new boards calm)
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) { const i = r * SIZE + c; if (g[i]) continue; let v, tries = 0; do { v = rand(rng); tries++; } while (tries < 12 && ((c >= 2 && at(g, r, c - 1) === v && at(g, r, c - 2) === v) || (r >= 2 && at(g, r - 1, c) === v && at(g, r - 2, c) === v))); g[i] = v; }
  return g;
}
function freshBoard(rng) { let g; do { g = fillNoRuns(Array(SIZE * SIZE).fill(0), rng); } while (findRuns(g).length || !legalMoves(g).length); return g; }
export function newGame(seed) { const rng = mulberry32(seed); const grid = freshBoard(rng); return { grid, score: 0, rng, moves: 0, movesLeft: MOVES, best: 0, shuffles: 0, over: false }; }

/** clear matches, let tiles fall and refill, repeat. Mutates g. Returns { gained, chain, cleared, steps:[{cleared:[cells], level}] } (steps let a client animate) */
function settle(g, rng) {
  let gained = 0, level = 0, cleared = 0; const steps = [];
  for (;;) {
    const runs = findRuns(g); if (!runs.length) break; level++; const kill = new Set(); let pts = 0; for (const r of runs) { pts += runScore(r.cells.length); r.cells.forEach(i => kill.add(i)); }
    gained += pts * level; cleared += kill.size; steps.push({ cleared: [...kill].sort((a, b) => a - b), level, points: pts * level }); kill.forEach(i => { g[i] = 0; });
    for (let c = 0; c < SIZE; c++) { let w = SIZE - 1; for (let r = SIZE - 1; r >= 0; r--) { const v = at(g, r, c); if (v) { g[w * SIZE + c] = v; if (w !== r) g[r * SIZE + c] = 0; w--; } } for (let r = w; r >= 0; r--) g[r * SIZE + c] = rand(rng); }
  }
  return { gained, chain: level, cleared, steps };
}
/** if the game is still on and no legal swap is left, reshuffle with the seeded generator (so replay agrees). Returns true when it reshuffled. */
export function ensureMove(game) { if (game.movesLeft > 0 && !legalMoves(game.grid).length) { game.grid = freshBoard(game.rng); game.shuffles++; return true; } return false; }
/** apply one swap to a live game. Returns false (and changes nothing) when the swap is not legal. On success returns { gained, chain, steps, shuffled }. */
export function step(game, cell, dir) {
  if (game.over || !legal(game.grid, cell, dir)) return false; const t = target(cell, dir); game.grid = swapped(game.grid, cell, t);
  const res = settle(game.grid, game.rng); game.score += res.gained; game.best = Math.max(game.best, res.chain); game.moves++; game.movesLeft--;
  const shuffled = ensureMove(game); if (game.movesLeft <= 0) game.over = true; return { ...res, shuffled };
}
export const encode = (cell, dir) => String(cell).padStart(2, '0') + dir;
/** server replay of a move log "00r12d..." from the seed: { ok, score, moves, best, over } or { ok:false, error } if any move is illegal */
export function replay(seed, log, maxMoves = MOVES) {
  if (typeof log !== 'string' || !/^(\d\d[rd])*$/.test(log)) return { ok: false, error: 'BAD_LOG' }; if (log.length / 3 > maxMoves) return { ok: false, error: 'TOO_LONG' };
  const game = newGame(seed); for (let i = 0; i < log.length; i += 3) if (!step(game, Number(log.slice(i, i + 2)), log[i + 2])) return { ok: false, error: 'IMPOSSIBLE_MOVE' };
  return { ok: true, score: game.score, moves: game.moves, best: game.best, over: game.over };
}
/** a greedy helper used by tests and the smoke test: pick the legal swap that scores most right now */
export function bestMove(game) { let best = null, bs = -1; for (const m of legalMoves(game.grid)) { const t = target(m.cell, m.dir); const g = swapped(game.grid, m.cell, t); let s = 0; for (const r of findRuns(g)) s += runScore(r.cells.length); if (s > bs) { bs = s; best = m; } } return best; }
