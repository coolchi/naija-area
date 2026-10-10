// SQLite backup that is safe while the game is running (uses SQLite's online backup API, not a file copy), then checks the copy and keeps only the newest N.
// Usage: node scripts/backup-sqlite.mjs <database file> <backup folder> [--keep 14]
// Voice notes live in a "voice" folder next to the database: copy that folder too (rsync); this script only does the database.
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

export async function backupSqlite(src, destDir, { keep = 14, now = new Date() } = {}) {
  if (!fs.existsSync(src)) throw new Error(`database not found: ${src}`);
  fs.mkdirSync(destDir, { recursive: true, mode: 0o700 });
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z'); const out = path.join(destDir, `naija-area-${stamp}.db`);
  const db = new Database(src, { readonly: true, fileMustExist: true });
  try { await db.backup(out); } finally { db.close(); }
  const chk = new Database(out); chk.pragma('journal_mode = DELETE'); /* a plain single file: no -wal/-shm companions to lose or forget */ let integrity, users = null;
  try { integrity = chk.pragma('integrity_check', { simple: true }); try { users = chk.prepare('SELECT COUNT(*) n FROM users').get().n; } catch { /* a brand new database may have no tables */ } } finally { chk.close(); }
  if (integrity !== 'ok') { fs.rmSync(out, { force: true }); throw new Error(`backup failed the integrity check: ${integrity}`); }
  fs.chmodSync(out, 0o600);
  const all = fs.readdirSync(destDir).filter(f => /^naija-area-.*\.db$/.test(f)).sort().reverse(); const removed = [];
  for (const f of all.slice(Math.max(1, keep))) { fs.rmSync(path.join(destDir, f), { force: true }); removed.push(f); }
  return { file: out, bytes: fs.statSync(out).size, integrity, users, removed };
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const a = process.argv.slice(2); const k = a.indexOf('--keep'); const keep = k >= 0 ? Number(a[k + 1]) : 14; const pos = a.filter((x, i) => !x.startsWith('--') && !(k >= 0 && i === k + 1));
  if (pos.length < 2) { console.error('usage: node scripts/backup-sqlite.mjs <database file> <backup folder> [--keep 14]'); process.exit(2); }
  backupSqlite(pos[0], pos[1], { keep }).then(r => console.log(`backup ok: ${r.file} (${r.bytes} bytes, integrity ${r.integrity}${r.users != null ? `, ${r.users} users` : ''}${r.removed.length ? `, pruned ${r.removed.length}` : ''})`)).catch(e => { console.error('BACKUP FAILED:', e.message); process.exit(1); });
}
