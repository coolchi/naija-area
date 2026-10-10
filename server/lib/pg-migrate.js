// Versioned Postgres migrations: server/migrations/pg/NNNN_name.sql, applied in order, each in ONE transaction, recorded in schema_migrations
// with a checksum so an edited-after-shipping file is caught. SQLite keeps its idempotent migrate() (tests, static demo).
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import { fileURLToPath } from 'node:url';
import { openPostgres } from './pg-sync.js';

export const MIGRATIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../migrations/pg');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
export function listMigrations(dir = MIGRATIONS_DIR) {
  return fs.readdirSync(dir).filter(f => /^\d{4}_[a-z0-9_]+\.sql$/.test(f)).sort().map(f => { const sql = fs.readFileSync(path.join(dir, f), 'utf8'); return { version: Number(f.slice(0, 4)), name: f.slice(5, -4), file: f, sql, checksum: sha(sql) }; });
}
/** status without changing anything: { applied: [...], pending: [...], problems: [...] } */
export function migrationStatus(db, dir = MIGRATIONS_DIR) {
  const files = listMigrations(dir); const has = db.prepare("SELECT to_regclass('schema_migrations') IS NOT NULL AS t").get().t;
  const done = has ? db.prepare('SELECT version, name, checksum FROM schema_migrations ORDER BY version').all() : []; const problems = [];
  for (const d of done) { const f = files.find(x => x.version === d.version); if (!f) problems.push(`applied migration ${d.version} (${d.name}) has no file`); else if (f.checksum !== d.checksum) problems.push(`migration ${d.version} (${d.name}) was edited after it was applied`); }
  const dup = files.map(f => f.version).filter((v, i, a) => a.indexOf(v) !== i); if (dup.length) problems.push('duplicate migration version ' + dup[0]);
  return { applied: done.map(d => d.version), pending: files.filter(f => !done.some(d => d.version === f.version)), problems };
}
export function migrate(db, { dir = MIGRATIONS_DIR, log = () => {} } = {}) {
  db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, name TEXT NOT NULL, checksum TEXT NOT NULL, applied_at BIGINT NOT NULL)');
  const st = migrationStatus(db, dir); if (st.problems.length) throw new Error('Postgres migrations: ' + st.problems.join('; '));
  const lastApplied = Math.max(0, ...st.applied); const applied = [];
  for (const m of st.pending) {
    if (m.version < lastApplied) throw new Error(`Postgres migrations: ${m.file} is older than the newest applied migration (${lastApplied}); renumber it`);
    log(`applying ${m.file}`);
    db.transaction(() => { db.exec(m.sql); db.prepare('INSERT INTO schema_migrations(version,name,checksum,applied_at) VALUES (?,?,?,?)').run(m.version, m.name, m.checksum, Date.now()); })();
    applied.push(m.version);
  }
  db.refreshIdentity?.(); return { applied, current: Math.max(lastApplied, ...applied, 0) };
}
/** open a ready-to-use database: create the schema if asked, apply migrations, learn the identity columns */
export function openManaged({ url, schema = null, ssl = null, singleInstance = true, autoMigrate = true, log } = {}) {
  if (schema) { if (!/^[a-z_][a-z0-9_]*$/.test(schema)) throw new Error('bad schema name'); const boot = openPostgres({ url, ssl, singleInstance: false }); try { boot.exec(`CREATE SCHEMA IF NOT EXISTS ${schema}`); } finally { boot.close(); } }
  const db = openPostgres({ url, schema, ssl, singleInstance });
  try {
    const st = (() => { try { return migrationStatus(db); } catch { return null; } })();
    if (autoMigrate || !st) migrate(db, { log });
    else if (st.problems.length || st.pending.length) throw new Error(`Postgres has ${st.pending.length} pending migration(s) ${st.problems.join('; ')}: run npm run db:migrate (or set NA_DB_AUTOMIGRATE=1)`);
  } catch (e) { db.close(); throw e; }
  return db;
}
export function dropSchema({ url, schema }) { if (!/^[a-z_][a-z0-9_]*$/.test(schema)) throw new Error('bad schema name'); const d = openPostgres({ url, singleInstance: false }); try { d.exec(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); } finally { d.close(); } }
