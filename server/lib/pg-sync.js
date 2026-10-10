// A better-sqlite3-compatible, SYNCHRONOUS wrapper over Postgres, so the same core code (ledger, economy, ...) runs on either engine.
// How: the real `pg` connection lives in a worker thread; each call posts the query and blocks on Atomics.wait until the worker answers.
// Trade-offs (see docs/POSTGRES.md): one connection, one writer (enforced by an advisory lock), the main thread waits for the database like it does with SQLite
// (but over a socket, so each statement costs a network round trip). The cure for scale is an async core + pooling: a later, bigger change.
import { Worker, MessageChannel, receiveMessageOnPort } from 'node:worker_threads';
import { translate, mapErrorCode } from './pg-translate.js';

const norm = (a) => (a.length === 1 && Array.isArray(a[0]) ? a[0] : a).map(v => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : typeof v === 'bigint' ? Number(v) : v instanceof Uint8Array && !Buffer.isBuffer(v) ? Buffer.from(v) : v));
const LOCK_KEY = 7210026; // arbitrary app-wide advisory lock id for "the one Naija Area writer"

export function openPostgres({ url, schema = null, ssl = null, singleInstance = true, timeoutMs = 60000, lockKey = LOCK_KEY } = {}) {
  if (!url) throw new Error('openPostgres: url is required');
  const flagBuf = new SharedArrayBuffer(4); const flag = new Int32Array(flagBuf); const { port1: main, port2: wport } = new MessageChannel();
  const worker = new Worker(new URL('./pg-worker.js', import.meta.url), { workerData: { flag: flagBuf, port: wport, cfg: { url, schema, ssl, singleInstance, lockKey } }, transferList: [wport] });
  worker.unref(); let dead = null; worker.on('error', (e) => { dead = e; });
  const call = (msg, tmo = timeoutMs) => {
    if (dead) throw dead;
    Atomics.store(flag, 0, 0); worker.postMessage(msg);
    const r = Atomics.wait(flag, 0, 0, tmo); if (r === 'timed-out') throw new Error(`postgres: no answer within ${tmo} ms for ${msg.t}`);
    const got = receiveMessageOnPort(main); if (!got) throw new Error('postgres: worker answered with nothing'); return got.message;
  };
  const fail = (er) => { const e = new Error(er.message); if (er.code) e.pgCode = er.code; e.code = mapErrorCode(er.code) || er.code; if (er.constraint) e.constraint = er.constraint; if (er.detail) e.detail = er.detail; return e; };
  const hello = call({ t: 'connect' }, 30000); if (!hello.ok) { try { worker.terminate(); } catch { /* gone */ } throw fail(hello.error); }
  const ctx = { identity: hello.identity }; const cache = new Map(); let depth = 0; let closed = false;
  const tr = (sql) => { let t = cache.get(sql); if (!t) { t = translate(sql, ctx); if (cache.size > 5000) cache.clear(); cache.set(sql, t); } return t; };
  const run = (text, params, mode) => { const r = call({ t: 'q', text, params, mode }); if (!r.ok) throw fail(r.error); return r; };
  const exec1 = (sql, params, mode) => {
    const t = tr(sql); if (params.length !== t.n) throw new Error(`postgres: statement has ${t.n} placeholders but got ${params.length} values: ${sql.slice(0, 80)}`);
    const r = run(t.text, params, mode);
    if (mode === 'all') return r.rows; if (mode === 'get') return r.rows[0];
    return { changes: r.rowCount ?? 0, lastInsertRowid: t.idCol && r.rows?.[0] ? Number(r.rows[0][t.idCol]) : 0 };
  };
  const db = {
    dialect: 'postgres', schema, managedSchema: true, open: true,
    prepare(sql) { return { run: (...a) => { const t = tr(sql); const r = run(t.text, norm(a), t.idCol || t.kind === 'select' ? 'all' : 'run'); return { changes: r.rowCount ?? 0, lastInsertRowid: t.idCol && r.rows?.[0] ? Number(r.rows[0][t.idCol]) : 0 }; }, get: (...a) => exec1(sql, norm(a), 'get'), all: (...a) => exec1(sql, norm(a), 'all') }; },
    exec(sql) { run(sql, undefined, 'run'); return db; },       // multi-statement text: Postgres' simple query protocol (no parameters, no translation)
    pragma() { return []; },                                    // journal_mode / foreign_keys / busy_timeout are SQLite things; Postgres has its own
    refreshIdentity() { const r = call({ t: 'identity' }); if (r.ok) Object.assign(ctx.identity, r.identity); },
    transaction(fn) {
      return (...args) => {
        const name = `sp${depth}`; if (depth === 0) run('BEGIN', undefined, 'run'); else run(`SAVEPOINT ${name}`, undefined, 'run'); depth++;
        try { const r = fn(...args); depth--; if (depth === 0) run('COMMIT', undefined, 'run'); else run(`RELEASE SAVEPOINT ${name}`, undefined, 'run'); return r; }
        catch (e) { depth--; try { if (depth === 0) run('ROLLBACK', undefined, 'run'); else { run(`ROLLBACK TO SAVEPOINT ${name}`, undefined, 'run'); run(`RELEASE SAVEPOINT ${name}`, undefined, 'run'); } } catch { /* already rolled back */ } throw e; }
      };
    },
    get inTransaction() { return depth > 0; },
    close() { if (closed) return; closed = true; db.open = false; try { call({ t: 'close' }, 10000); } catch { /* ignore */ } try { worker.terminate(); } catch { /* ignore */ } }
  };
  return db;
}
