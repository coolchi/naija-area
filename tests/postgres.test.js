// Item 28. Part 1 (always runs): the SQLite->Postgres SQL translator, the baseline generator. Part 2 (runs when NA_TEST_PG_URL is set, i.e. `npm run test:pg`): real Postgres.
import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import Database from 'better-sqlite3';
import { translate, placeholders, mapErrorCode } from '../server/lib/pg-translate.js';
import { generate, sqliteFinalSchema } from '../tools/gen-pg-schema.mjs';
import { PG_URL, makeServer, mkUser, ok, call } from './helpers.js';

const T = (sql, identity = {}) => translate(sql, { identity });

test('translator: ? becomes $n, but never inside a string literal', () => {
  assert.equal(placeholders("SELECT * FROM t WHERE a=? AND b='what?' AND c=?").text, "SELECT * FROM t WHERE a=$1 AND b='what?' AND c=$2");
  assert.equal(placeholders("SELECT 'it''s ? fine', ?").text, "SELECT 'it''s ? fine', $1");
});
test('translator: named parameters (@x) become numbered, in order of use (a name may repeat)', () => {
  const r = T('INSERT INTO t(a,b,c) VALUES (@a,@b,@a)'); assert.equal(r.text, 'INSERT INTO t(a,b,c) VALUES ($1,$2,$3)'); assert.deepEqual(r.names, ['a', 'b', 'a']);
  assert.equal(T('SELECT 1 WHERE x=?').names, null);
});
test('translator: INSERT OR IGNORE, lastInsertRowid via RETURNING, LIKE, backticks, MAX/MIN with two arguments', () => {
  assert.equal(T('INSERT OR IGNORE INTO accounts(id) VALUES (?)').text, 'INSERT INTO accounts(id) VALUES ($1) ON CONFLICT DO NOTHING');
  const ins = T('INSERT INTO users(username) VALUES (?)', { users: 'id' }); assert.equal(ins.text, 'INSERT INTO users(username) VALUES ($1) RETURNING id'); assert.equal(ins.idCol, 'id');
  assert.equal(T('INSERT INTO accounts(id) VALUES (?)', { users: 'id' }).idCol, null, 'tables without an identity column get no RETURNING');
  assert.equal(T('SELECT 1 FROM t WHERE n LIKE ?').text, 'SELECT 1 FROM t WHERE n ILIKE $1');
  assert.equal(T('SELECT u.username `from` FROM users u').text, 'SELECT u.username "from" FROM users u');
  assert.equal(T('UPDATE s SET v=MAX(v, ?) WHERE id=1').text, 'UPDATE s SET v=GREATEST(v, $1) WHERE id=1');
  assert.equal(T('UPDATE s SET v=MIN(a, MAX(b, 3)) WHERE id=1').text, 'UPDATE s SET v=LEAST(a, GREATEST(b, 3)) WHERE id=1');
  assert.equal(T('SELECT MAX(amount) m, MIN(a) n, SUM(x) FROM t').text, 'SELECT MAX(amount) m, MIN(a) n, SUM(x) FROM t', 'aggregates are untouched');
  assert.equal(T("SELECT 'MAX(a,b)' FROM t").text, "SELECT 'MAX(a,b)' FROM t", 'strings are untouched');
});
test('translator: balance reads inside the ledger lock the row; unsupported shapes fail loudly', () => {
  assert.match(T('SELECT balance, allow_negative FROM accounts WHERE id=?').text, /FOR UPDATE$/);
  assert.doesNotMatch(T('SELECT COUNT(*) FROM accounts WHERE kind=?').text, /FOR UPDATE/);
  assert.throws(() => T('INSERT OR REPLACE INTO t(a) VALUES (1)'), /OR REPLACE/);
  assert.equal(T('SELECT 1; ').text, 'SELECT 1');
});
test('translator: Postgres error codes map to the SQLITE_CONSTRAINT codes the routes already check', () => {
  assert.equal(mapErrorCode('23505'), 'SQLITE_CONSTRAINT_UNIQUE'); assert.equal(mapErrorCode('23514'), 'SQLITE_CONSTRAINT_CHECK'); assert.equal(mapErrorCode('P0001'), 'SQLITE_CONSTRAINT_TRIGGER'); assert.equal(mapErrorCode('42P01'), undefined);
});
test('baseline: generated from the SQLite schema, covers every table, index and trigger, and has no SQLite-only syntax left', () => {
  const sql = generate(); const rows = sqliteFinalSchema();
  for (const r of rows.filter(x => x.type === 'table')) assert.match(sql, new RegExp(`CREATE TABLE ${r.name} \\(`), r.name);
  assert.equal((sql.match(/CREATE (UNIQUE )?INDEX/g) || []).length, rows.filter(x => x.type === 'index').length);
  assert.equal((sql.match(/CREATE TRIGGER/g) || []).length, rows.filter(x => x.type === 'trigger').length); assert.ok(rows.some(x => x.type === 'trigger'), 'the ledger triggers exist');
  assert.doesNotMatch(sql, /AUTOINCREMENT|COLLATE NOCASE|RAISE\(ABORT|\bINTEGER\b|\bREAL\b|\bBLOB\b/);
});
test('baseline: the committed 0001 file is exactly what the generator makes (it is frozen: later changes go in 0002+)', () => {
  const file = path.join(path.dirname(new URL(import.meta.url).pathname), '../server/migrations/pg/0001_baseline.sql');
  assert.equal(fs.readFileSync(file, 'utf8'), generate());
});

// ---------------- real Postgres from here on
const pgOnly = { skip: PG_URL ? false : 'set NA_TEST_PG_URL (npm run test:pg) to run against a real Postgres' };
const { openManaged, dropSchema, migrate, migrationStatus, listMigrations } = await import('../server/lib/pg-migrate.js');
const { openPostgres } = await import('../server/lib/pg-sync.js');
let k = 0; const schemaName = () => `pgt_${process.pid}_${++k}`;
const withDb = (fn, opts = {}) => async () => { const schema = schemaName(); const db = openManaged({ url: PG_URL, schema, ...opts }); try { await fn(db, schema); } finally { db.close(); dropSchema({ url: PG_URL, schema }); } };

test('pg: migrations apply once, are recorded with a checksum, and a second run does nothing', pgOnly, withDb((db) => {
  const st = migrationStatus(db); assert.equal(st.pending.length, 0); assert.deepEqual(st.problems, []);
  assert.deepEqual(migrate(db).applied, []);
  const rows = db.prepare('SELECT version, name, checksum FROM schema_migrations ORDER BY version').all(); assert.equal(rows.length, listMigrations().length); assert.equal(rows[0].name, 'baseline'); assert.match(rows[0].checksum, /^[0-9a-f]{64}$/);
}));
test('pg: an edited-after-applying migration is caught, and a failing migration rolls back completely', pgOnly, withDb((db) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'na-mig-')); fs.writeFileSync(path.join(dir, '0001_a.sql'), 'CREATE TABLE zz_a (id BIGINT);'); fs.writeFileSync(path.join(dir, '0002_b.sql'), 'CREATE TABLE zz_b (id BIGINT); SELECT * FROM does_not_exist;');
  db.exec('DROP TABLE IF EXISTS schema_migrations');
  assert.throws(() => migrate(db, { dir }), /does_not_exist/);
  assert.equal(db.prepare("SELECT to_regclass('zz_b') IS NOT NULL AS t").get().t, false, 'the failed migration left nothing behind');
  assert.equal(db.prepare("SELECT to_regclass('zz_a') IS NOT NULL AS t").get().t, true, 'earlier, good migrations stay applied');
  fs.writeFileSync(path.join(dir, '0002_b.sql'), 'CREATE TABLE zz_b (id BIGINT);'); assert.deepEqual(migrate(db, { dir }).applied, [2]);
  fs.writeFileSync(path.join(dir, '0001_a.sql'), 'CREATE TABLE zz_a (id BIGINT, extra INT);'); assert.throws(() => migrate(db, { dir }), /edited after it was applied/);
}));
test('pg: the Postgres schema has every table and column the SQLite schema has (parity)', pgOnly, withDb((db) => {
  const lite = new Database(':memory:'); const rows = sqliteFinalSchema(); for (const r of rows.filter(x => x.type === 'table')) lite.exec(r.sql);
  for (const r of rows.filter(x => x.type === 'table')) {
    const a = lite.prepare(`PRAGMA table_info(${r.name})`).all().map(c => c.name).sort();
    const b = db.prepare('SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name=?').all(r.name).map(c => c.column_name).sort();
    assert.deepEqual(b, a, r.name);
  }
}));
test('pg: ledger rows cannot be changed or deleted (append-only triggers), balances cannot go negative (CHECK), usernames are case-insensitive unique', pgOnly, withDb((db) => {
  db.prepare("INSERT INTO accounts(id,kind,user_id,balance,allow_negative) VALUES ('u:1','cash',1,10,0)").run();
  assert.throws(() => db.prepare("UPDATE accounts SET balance=-5 WHERE id='u:1'").run(), (e) => /CHECK/.test(e.message) && e.code === 'SQLITE_CONSTRAINT_CHECK');
  const tx = db.prepare("INSERT INTO ledger_tx(reason,created_at) VALUES ('t',1)").run().lastInsertRowid; assert.ok(tx > 0);
  db.prepare("INSERT INTO ledger_entries(tx_id,account_id,amount,balance_after,created_at) VALUES (?,?,?,?,1)").run(tx, 'u:1', 10, 10);
  assert.throws(() => db.prepare('UPDATE ledger_entries SET amount=99').run(), /append-only/); assert.throws(() => db.prepare('DELETE FROM ledger_entries').run(), /append-only/); assert.throws(() => db.prepare('UPDATE ledger_tx SET reason=?').run('x'), /append-only/);
  db.prepare("INSERT INTO users(username,created_at) VALUES ('Ada',1)").run();
  assert.throws(() => db.prepare("INSERT INTO users(username,created_at) VALUES ('ADA',1)").run(), (e) => e.code === 'SQLITE_CONSTRAINT_UNIQUE');
  assert.equal(db.prepare("SELECT id FROM users WHERE username=?").get('aDa').id > 0, true, 'lookups ignore case like SQLite NOCASE');
}));
test('pg: transactions commit and roll back, nested ones use savepoints, and 64-bit integers come back as numbers', pgOnly, withDb((db) => {
  db.prepare("INSERT INTO users(username,created_at) VALUES ('a',?)").run(1791617135244);
  const add = db.transaction((n) => { db.prepare('INSERT INTO users(username,created_at) VALUES (?,1)').run(n); }); add('b');
  assert.throws(db.transaction(() => { add('c'); throw new Error('boom'); }), /boom/); assert.equal(db.prepare("SELECT COUNT(*) n FROM users WHERE username IN ('b','c')").get().n, 1, 'c rolled back, b stayed');
  const outer = db.transaction(() => { db.prepare("INSERT INTO users(username,created_at) VALUES ('d',1)").run(); try { db.transaction(() => { db.prepare("INSERT INTO users(username,created_at) VALUES ('e',1)").run(); throw new Error('inner'); })(); } catch { /* inner rolled back only */ } }); outer();
  assert.deepEqual(db.prepare("SELECT username FROM users WHERE username IN ('d','e')").all().map(r => r.username), ['d']);
  assert.equal(typeof db.prepare("SELECT created_at FROM users WHERE username='a'").get().created_at, 'number'); assert.equal(db.prepare("SELECT created_at FROM users WHERE username='a'").get().created_at, 1791617135244);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM users').get().n, 3); assert.equal(db.inTransaction, false);
}));
test('pg: single-writer lock: a second server on the same database refuses to start, a different schema is fine', pgOnly, async () => {
  const schema = schemaName(); const a = openManaged({ url: PG_URL, schema });
  try {
    assert.throws(() => openPostgres({ url: PG_URL, schema }), /single-writer|already holds/);
    const other = schemaName(); const b = openManaged({ url: PG_URL, schema: other }); b.close(); dropSchema({ url: PG_URL, schema: other });
    const w = openPostgres({ url: PG_URL, schema, singleInstance: false }); w.close();
  } finally { a.close(); dropSchema({ url: PG_URL, schema }); }
  const again = openManaged({ url: PG_URL, schema }); again.close(); dropSchema({ url: PG_URL, schema });
});
test('pg: a whole game server runs on Postgres: money moves through the ledger, no overdraft, replay-safe, invariants hold', pgOnly, async () => {
  const s = makeServer(); const { checkInvariants, move, balanceOf, cashId } = await import('../server/core/ledger.js');
  assert.equal(s.db.dialect, 'postgres');
  const a = mkUser(s, { cash: 100000 }); const b = mkUser(s, { cash: 0 });
  for (let i = 0; i < 25; i++) move(s.app, { from: cashId(a), to: cashId(b), amount: 100 + i, reason: 'test', userId: a, idemKey: 'k' + i });
  move(s.app, { from: cashId(a), to: cashId(b), amount: 999, reason: 'test', userId: a, idemKey: 'k3' }); // same key again: replayed, not paid twice
  assert.equal(balanceOf(s.db, cashId(b)), 25 * 100 + 300, 'the 25 payments landed once each');
  assert.throws(() => move(s.app, { from: cashId(b), to: cashId(a), amount: 10 ** 9, reason: 'test', userId: b }), /./, 'overdraft refused');
  const inv = checkInvariants(s.db); assert.equal(inv.ok, true, JSON.stringify(inv));
  assert.equal(balanceOf(s.db, cashId(a)) + balanceOf(s.db, cashId(b)), 100000);
  const r = await call(s, 'GET', '/api/config'); assert.equal(r.status, 200);
  await s.close();
});
test('pg: copy tool: a SQLite game database moves into Postgres with identical counts, balances and a working id sequence; a non-empty target is refused', pgOnly, async () => {
  const { copySqliteToPg } = await import('../server/lib/pg-copy.js'); const { checkInvariants } = await import('../server/core/ledger.js');
  const s = makeServer({ databaseUrl: null, dbPath: ':memory:' }); assert.equal(s.db.dialect, undefined);
  const a = mkUser(s, { cash: 5000 }); const b = mkUser(s, { cash: 100 }); (await import('../server/core/ledger.js')).move(s.app, { from: 'u:' + a, to: 'u:' + b, amount: 700, reason: 'test', userId: a });
  const schema = schemaName(); const dst = openManaged({ url: PG_URL, schema });
  try {
    const r = copySqliteToPg(s.db, dst); assert.deepEqual(r.problems, [], JSON.stringify(r.problems)); assert.ok(r.rows > 10);
    assert.equal(dst.prepare('SELECT COUNT(*) n FROM users').get().n, s.db.prepare('SELECT COUNT(*) n FROM users').get().n); assert.equal(checkInvariants(dst).ok, true);
    assert.equal(dst.prepare("SELECT balance FROM accounts WHERE id=?").get('u:' + a).balance, s.db.prepare("SELECT balance FROM accounts WHERE id=?").get('u:' + a).balance);
    const next = dst.prepare("INSERT INTO users(username,created_at) VALUES ('after_copy',1)").run().lastInsertRowid; assert.ok(next > Math.max(a, b), 'ids continue after the copied ones');
    assert.throws(() => copySqliteToPg(s.db, dst), /already has/);
  } finally { dst.close(); dropSchema({ url: PG_URL, schema }); await s.close(); }
});
