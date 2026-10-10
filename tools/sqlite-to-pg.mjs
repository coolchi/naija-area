// One-off: copy an existing SQLite game database into an EMPTY Postgres database, then verify (row counts, balances, ledger invariants).
// Usage:  NA_DATABASE_URL=postgres://... [NA_DB_SCHEMA=x] node tools/sqlite-to-pg.mjs data/naija-area.db
// Stop the game server first (the copy is a snapshot). The SQLite file is only read. Migrations are applied to Postgres first.
import Database from 'better-sqlite3'; import fs from 'node:fs';
import { openManaged } from '../server/lib/pg-migrate.js'; import { copySqliteToPg } from '../server/lib/pg-copy.js';
const file = process.argv[2]; const url = process.env.NA_DATABASE_URL;
if (!file || !url || !fs.existsSync(file)) { console.error('usage: NA_DATABASE_URL=postgres://... node tools/sqlite-to-pg.mjs <sqlite-file>'); process.exit(2); }
const src = new Database(file, { readonly: true, fileMustExist: true });
const dst = openManaged({ url, schema: process.env.NA_DB_SCHEMA || null, ssl: process.env.NA_DB_SSL === '1' ? { rejectUnauthorized: process.env.NA_DB_SSL_STRICT !== '0' } : null, singleInstance: true, autoMigrate: true, log: (m) => console.log('[db]', m) });
try { const r = copySqliteToPg(src, dst, { log: (m) => console.log('  ' + m) }); console.log(`copied ${r.rows} rows in ${r.tables} tables`); if (r.problems.length) { console.error('PROBLEMS:\n- ' + r.problems.join('\n- ')); process.exitCode = 1; } else console.log('verified: row counts, balance totals and ledger invariants all match'); }
catch (e) { console.error('Failed (nothing was committed): ' + e.message); process.exitCode = 1; } finally { src.close(); dst.close(); }
