// Worker thread: owns the ONE Postgres connection. The main thread blocks on an Atomics flag while this runs a query, so the (synchronous) game core
// can use Postgres without being rewritten. See docs/POSTGRES.md for the trade-off.
import { workerData, parentPort } from 'node:worker_threads';
import pg from 'pg';

const { flag: flagBuf, port, cfg } = workerData; const flag = new Int32Array(flagBuf);
pg.types.setTypeParser(20, (v) => Number(v));       // bigint -> number (all our money, ids and millisecond timestamps are far below 2^53)
pg.types.setTypeParser(1700, (v) => Number(v));     // numeric (SUM/AVG of integers) -> number
const client = new pg.Client({ connectionString: cfg.url, ssl: cfg.ssl || undefined, options: cfg.schema ? `-c search_path=${cfg.schema},public` : undefined, application_name: 'naija-area' });
client.on('error', (e) => { console.error('[pg] connection error:', e.message); });
const named = new Map(); const seen = new Map(); let connected = false;
const reply = (msg) => { port.postMessage(msg); Atomics.store(flag, 0, 1); Atomics.notify(flag, 0); };
const errOut = (e) => ({ ok: false, error: { message: e.message, code: e.code, constraint: e.constraint, table: e.table, detail: e.detail, severity: e.severity } });

parentPort.on('message', async (m) => {
  try {
    if (m.t === 'connect') {
      await client.connect(); connected = true;
      if (cfg.singleInstance) { // one writer only: the ledger and the in-memory world assume it. A second server on the same database refuses to start.
        const r = await client.query("SELECT pg_try_advisory_lock($1::int, hashtext(current_schema())) AS got", [cfg.lockKey]);
        if (!r.rows[0].got) { await client.end(); return reply({ ok: false, error: { message: 'Another Naija Area server already holds this database (single-writer lock). Stop it first.', code: 'NA_LOCKED' } }); }
      }
      const ident = await client.query("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = current_schema() AND is_identity = 'YES'");
      return reply({ ok: true, identity: Object.fromEntries(ident.rows.map(r => [r.table_name, r.column_name])) });
    }
    if (m.t === 'identity') {
      const ident = await client.query("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = current_schema() AND is_identity = 'YES'");
      return reply({ ok: true, identity: Object.fromEntries(ident.rows.map(r => [r.table_name, r.column_name])) });
    }
    if (m.t === 'close') { if (connected) await client.end().catch(() => {}); return reply({ ok: true }); }
    if (m.t === 'q') {
      const q = { text: m.text, values: m.params };
      if (m.params && m.params.length) { // name a statement the second time we see it so Postgres can skip parsing (bounded, so odd dynamic SQL cannot grow it forever)
        const c = (seen.get(m.text) || 0) + 1; seen.set(m.text, c); if (seen.size > 5000) seen.clear();
        if (c >= 2 && (named.has(m.text) || named.size < 400)) { if (!named.has(m.text)) named.set(m.text, 's' + named.size); q.name = named.get(m.text); }
      }
      const r = await client.query(q);
      const res = Array.isArray(r) ? r[r.length - 1] : r;
      return reply({ ok: true, rows: m.mode === 'run' ? undefined : res.rows, rowCount: res.rowCount });
    }
    reply({ ok: false, error: { message: 'unknown message ' + m.t } });
  } catch (e) { reply(errOut(e)); }
});
