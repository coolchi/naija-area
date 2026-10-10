// Tables added after the frozen Postgres baseline: each chunk in later-schema.js needs its own hand-written NNNN_name.sql, with the same tables and columns.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import { LATER } from '../server/core/later-schema.js';
import { SCHEMA, migrate } from '../server/core/schema.js';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../server/migrations/pg');
test('every later-schema chunk has its Postgres migration file with the same tables and columns', () => {
  const files = fs.readdirSync(dir).filter(f => /^\d{4}_.*\.sql$/.test(f)); const ns = LATER.map(c => c.n); assert.equal(new Set(ns).size, ns.length, 'numbers are unique'); assert.ok(ns.every(n => n >= 2), '0001 is the frozen baseline');
  for (const c of LATER) {
    const f = files.find(x => x.startsWith(String(c.n).padStart(4, '0') + '_' + c.name)); assert.ok(f, `migration file for ${c.n} ${c.name}`); const pg = fs.readFileSync(path.join(dir, f), 'utf8');
    const lite = new Database(':memory:'); lite.exec(c.sql);
    for (const t of lite.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(r => r.name)) {
      const cols = lite.prepare(`PRAGMA table_info(${t})`).all().map(x => x.name); const m = new RegExp(`CREATE TABLE IF NOT EXISTS ${t} \\(([\\s\\S]*?)\\);`).exec(pg); assert.ok(m, `${t} in ${f}`);
      for (const col of cols) assert.match(m[1], new RegExp(`(^|[ (,])${col} `), `${t}.${col} in ${f}`);
      assert.doesNotMatch(m[1], /\bINTEGER\b|AUTOINCREMENT|\bREAL\b/, 'Postgres types');
    }
    const idx = [...c.sql.matchAll(/CREATE (?:UNIQUE )?INDEX IF NOT EXISTS (\w+)/g)].map(x => x[1]); for (const i of idx) assert.match(pg, new RegExp(i));
  }
});
test('the SQLite schema creates the later tables at start (and not into the baseline view)', () => {
  const db = new Database(':memory:'); db.exec(SCHEMA); migrate(db); assert.ok(db.prepare("SELECT 1 FROM sqlite_master WHERE name='wearables_owned'").get());
  const base = new Database(':memory:'); base.exec(SCHEMA); migrate(base, { later: false }); assert.equal(base.prepare("SELECT 1 FROM sqlite_master WHERE name='wearables_owned'").get(), undefined);
});
