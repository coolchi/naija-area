// Tile-merge puzzle ("Merge Am"): a 4x4 grid, slide with L/R/U/D, equal tiles merge. ORIGINAL ruleset code, pure and deterministic: the SAME file runs on the
// client (to play) and on the server (to replay the submitted move log from the server-issued seed and decide the score). Score = sum of merged tile values.
export const SIZE = 4;
export const mulberry32 = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
function spawn(grid, rng) { const empty = []; grid.forEach((v, i) => { if (!v) empty.push(i); }); if (!empty.length) return grid; const i = empty[Math.floor(rng() * empty.length)]; grid[i] = rng() < 0.1 ? 4 : 2; return grid; }
export function newGame(seed) { const rng = mulberry32(seed); const grid = Array(SIZE * SIZE).fill(0); spawn(grid, rng); spawn(grid, rng); return { grid, score: 0, rng, moves: 0, over: false }; }
function line(vals) { // slide one line toward index 0
  const t = vals.filter(Boolean); const out = []; let gained = 0;
  for (let i = 0; i < t.length; i++) { if (t[i] === t[i + 1]) { out.push(t[i] * 2); gained += t[i] * 2; i++; } else out.push(t[i]); }
  while (out.length < SIZE) out.push(0); return { out, gained };
}
/** pure slide: returns { grid, gained, moved } */
export function slide(grid, dir) {
  const g = grid.slice(); let gained = 0; const idx = (r, c) => r * SIZE + c;
  for (let k = 0; k < SIZE; k++) {
    const cells = []; for (let j = 0; j < SIZE; j++) cells.push(dir === 'L' ? idx(k, j) : dir === 'R' ? idx(k, SIZE - 1 - j) : dir === 'U' ? idx(j, k) : idx(SIZE - 1 - j, k));
    const { out, gained: gg } = line(cells.map(i => grid[i])); gained += gg; cells.forEach((i, j) => { g[i] = out[j]; });
  }
  return { grid: g, gained, moved: g.some((v, i) => v !== grid[i]) };
}
export const canMove = (grid) => ['L', 'R', 'U', 'D'].some(d => slide(grid, d).moved);
/** apply one move to a live game (spawns a tile). Returns false (and changes nothing) when the move does nothing. */
export function step(game, dir) {
  if (game.over || !'LRUD'.includes(dir) || dir.length !== 1) return false; const r = slide(game.grid, dir); if (!r.moved) return false;
  game.grid = r.grid; game.score += r.gained; game.moves++; spawn(game.grid, game.rng); if (!canMove(game.grid)) game.over = true; return true;
}
/** server replay: { ok, score, moves, best, over } or { ok:false, error } if the log contains an impossible move */
export function replay(seed, log, maxMoves = 4000) {
  if (typeof log !== 'string' || !/^[LRUD]*$/.test(log)) return { ok: false, error: 'BAD_LOG' }; if (log.length > maxMoves) return { ok: false, error: 'TOO_LONG' };
  const game = newGame(seed); for (const d of log) if (!step(game, d)) return { ok: false, error: 'IMPOSSIBLE_MOVE' };
  return { ok: true, score: game.score, moves: game.moves, best: Math.max(...game.grid), over: game.over };
}
