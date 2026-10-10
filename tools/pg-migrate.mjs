// Postgres migrations. Usage:  NA_DATABASE_URL=postgres://... [NA_DB_SCHEMA=name] node tools/pg-migrate.mjs [status|up]
import { openPostgres } from '../server/lib/pg-sync.js'; import { migrate, migrationStatus, openManaged } from '../server/lib/pg-migrate.js';
const url = process.env.NA_DATABASE_URL; const cmd = process.argv[2] || 'status';
if (!url) { console.error('Set NA_DATABASE_URL=postgres://user:pass@host:5432/dbname'); process.exit(2); }
const ssl = process.env.NA_DB_SSL === '1' ? { rejectUnauthorized: process.env.NA_DB_SSL_STRICT !== '0' } : null; const schema = process.env.NA_DB_SCHEMA || null;
try {
  if (cmd === 'up') { const db = openManaged({ url, schema, ssl, singleInstance: false, autoMigrate: true, log: (m) => console.log(m) }); const st = migrationStatus(db); console.log(`up to date: ${st.applied.length} migration(s) applied`); db.close(); }
  else if (cmd === 'status') { const db = openPostgres({ url, schema, ssl, singleInstance: false }); const st = migrationStatus(db); console.log(`applied: ${st.applied.join(', ') || 'none'}\npending: ${st.pending.map(m => m.file).join(', ') || 'none'}`); for (const p of st.problems) console.log('PROBLEM: ' + p); db.close(); process.exit(st.problems.length ? 1 : 0); }
  else { console.error('usage: pg-migrate.mjs [status|up]'); process.exit(2); }
} catch (e) { console.error('Failed: ' + e.message); process.exit(1); }
