// One-off copy of an existing SQLite game database into an (empty, migrated) Postgres database, then verify it. Used by tools/sqlite-to-pg.mjs.
// Never changes the SQLite source. Refuses a target that already has data. All-or-nothing: one Postgres transaction.
import { checkInvariants } from '../core/ledger.js';

const q = (id) => '"' + id.replace(/"/g, '""') + '"';
export function copySqliteToPg(src, dst, { log = () => {} } = {}) {
  const tables = src.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all().map(r => r.name);
  const dstTables = new Set(dst.prepare("SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_type='BASE TABLE'").all().map(r => r.table_name));
  const missing = tables.filter(t => !dstTables.has(t)); if (missing.length) throw new Error('Postgres is missing tables that SQLite has: ' + missing.join(', ') + '. Apply migrations first.');
  for (const t of tables) { const n = dst.prepare(`SELECT COUNT(*) AS n FROM ${q(t)}`).get().n; if (n > 0) throw new Error(`Target table ${t} already has ${n} rows: refusing to copy into a non-empty database.`); }
  // parents before children (foreign keys)
  const deps = Object.fromEntries(tables.map(t => [t, new Set(src.prepare(`PRAGMA foreign_key_list(${t})`).all().map(f => f.table).filter(x => x !== t && tables.includes(x)))]));
  const order = []; const done = new Set();
  while (order.length < tables.length) { const next = tables.filter(t => !done.has(t) && [...deps[t]].every(d => done.has(d))); if (!next.length) { order.push(...tables.filter(t => !done.has(t))); break; } for (const t of next) { order.push(t); done.add(t); } }
  const counts = {};
  dst.transaction(() => {
    for (const t of order) {
      const scols = src.prepare(`PRAGMA table_info(${t})`).all().map(c => c.name);
      const dcols = new Set(dst.prepare('SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ?').all(t).map(r => r.column_name));
      const cols = scols.filter(c => dcols.has(c)); const lost = scols.filter(c => !dcols.has(c)); if (lost.length) throw new Error(`Table ${t}: column(s) ${lost.join(', ')} do not exist in Postgres`);
      const ins = dst.prepare(`INSERT INTO ${q(t)}(${cols.map(q).join(',')}) VALUES (${cols.map(() => '?').join(',')})`); let n = 0;
      for (const row of src.prepare(`SELECT ${cols.map(q).join(',')} FROM ${q(t)}`).all()) { ins.run(...cols.map(c => row[c])); n++; }
      counts[t] = n; if (n) log(`${t}: ${n} rows`);
    }
    // identity columns continue after the highest copied id
    for (const r of dst.prepare("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = current_schema() AND is_identity='YES'").all()) {
      const mx = dst.prepare(`SELECT COALESCE(MAX(${q(r.column_name)}),0) AS m FROM ${q(r.table_name)}`).get().m;
      if (mx > 0) dst.prepare('SELECT setval(pg_get_serial_sequence(?, ?), ?) AS v').get(r.table_name, r.column_name, mx);
    }
  })();
  // verify: same row counts, same ledger sums, ledger invariants hold on the copy
  const problems = [];
  for (const t of order) { const n = dst.prepare(`SELECT COUNT(*) AS n FROM ${q(t)}`).get().n; if (n !== counts[t]) problems.push(`${t}: copied ${counts[t]} but Postgres has ${n}`); }
  const sum = (d) => d.prepare('SELECT COALESCE(SUM(balance),0) AS b FROM accounts').get().b;
  if (sum(src) !== sum(dst)) problems.push('sum of account balances differs');
  const inv = checkInvariants(dst); if (!inv.ok) problems.push('ledger invariants broken on the copy: ' + JSON.stringify(inv).slice(0, 300));
  return { tables: order.length, rows: Object.values(counts).reduce((a, b) => a + b, 0), counts, problems };
}
