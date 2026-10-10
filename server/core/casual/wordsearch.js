// Word search ("Find Am"), single player. ONE puzzle per day for everybody (so players can compare), built deterministically from the date: 10 x 10 letters, 8 Lagos-themed words hidden
// in any of the 8 directions (forwards, backwards, up, down, diagonals). Pure and deterministic. The SERVER keeps the player's found words and checks every line they draw against the grid.
import { POOL } from '../../config/wordsearch-words.js';
import { mulberry32 } from './merge.js';
export const SIZE = 10, WORDS = 8, MAX_LEN = 9;
const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
const hashStr = (s) => { let x = 2166136261; for (const c of String(s)) x = Math.imul(x ^ c.charCodeAt(0), 16777619) >>> 0; return x >>> 0; };
export function puzzle(day) {
  for (let attempt = 0; attempt < 50; attempt++) { const rng = mulberry32(hashStr('wordsearch:' + day) + attempt * 7919); const p = build(rng); if (p) return { day, size: SIZE, ...p }; }
  throw new Error('wordsearch: no puzzle could be built'); // cannot happen with this pool (tested for many days)
}
function build(rng) {
  const pool = POOL.filter(w => w.length <= MAX_LEN); const pick = []; while (pick.length < WORDS) { const w = pool[Math.floor(rng() * pool.length)]; if (!pick.includes(w) && !pick.some(x => x.includes(w) || w.includes(x))) pick.push(w); }
  pick.sort((a, b) => b.length - a.length); const grid = Array(SIZE * SIZE).fill(''); const placed = [];
  for (const w of pick) {
    let ok = false;
    for (let t = 0; t < 400 && !ok; t++) {
      const [dr, dc] = DIRS[Math.floor(rng() * 8)]; const r0 = Math.floor(rng() * SIZE), c0 = Math.floor(rng() * SIZE); const r1 = r0 + dr * (w.length - 1), c1 = c0 + dc * (w.length - 1); if (r1 < 0 || r1 >= SIZE || c1 < 0 || c1 >= SIZE) continue;
      let fits = true; for (let k = 0; k < w.length; k++) { const cell = grid[(r0 + dr * k) * SIZE + c0 + dc * k]; if (cell && cell !== w[k]) { fits = false; break; } }
      if (!fits) continue; for (let k = 0; k < w.length; k++) grid[(r0 + dr * k) * SIZE + c0 + dc * k] = w[k]; placed.push({ word: w, r: r0, c: c0, dr, dc }); ok = true;
    }
    if (!ok) return null;
  }
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for (let i = 0; i < grid.length; i++) if (!grid[i]) grid[i] = A[Math.floor(rng() * 26)];
  return { grid, words: pick.slice().sort(), placed };
}
/** the letters along a straight line (null if it is not a row, column or diagonal, or leaves the grid) */
export function lineText(grid, r1, c1, r2, c2) {
  const nums = [r1, c1, r2, c2]; if (!nums.every(n => Number.isInteger(n) && n >= 0 && n < SIZE)) return null;
  const dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1); if ((dr === 0 && dc === 0) || !(r1 === r2 || c1 === c2 || Math.abs(r2 - r1) === Math.abs(c2 - c1))) return null;
  const n = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1; let s = ''; for (let k = 0; k < n; k++) s += grid[(r1 + dr * k) * SIZE + c1 + dc * k]; return s;
}
/** which of the day's words does this line spell (either direction)? null if none */
export function matchLine(p, r1, c1, r2, c2) { const t = lineText(p.grid, r1, c1, r2, c2); if (!t) return null; const rev = [...t].reverse().join(''); return p.words.find(w => w === t || w === rev) || null; }
/** brute-force solver: every word of the list found anywhere in the grid (used by tests to prove each puzzle is solvable) */
export function solve(p) {
  const found = new Set(); for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) for (const [dr, dc] of DIRS) for (const w of p.words) { const r2 = r + dr * (w.length - 1), c2 = c + dc * (w.length - 1); if (r2 < 0 || r2 >= SIZE || c2 < 0 || c2 >= SIZE) continue; if (lineText(p.grid, r, c, r2, c2) === w) found.add(w); }
  return [...found].sort();
}
