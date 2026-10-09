// A small better-sqlite3-compatible wrapper over sql.js (SQLite compiled to JS/WASM) so the SAME core game code runs in a browser.
// Supports what the core uses: prepare().run/get/all, exec, pragma, transaction() with nesting (savepoints), lastInsertRowid, changes.
const norm = (a) => (a.length === 1 && Array.isArray(a[0]) ? a[0] : a).map(v => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : v));
export function wrapSqlJs(SQL, data) {
  const raw = new SQL.Database(data); let depth = 0;
  const q = (sql, params, mode) => {
    const st = raw.prepare(sql);
    try {
      if (params.length) st.bind(params);
      if (mode === 'all') { const out = []; while (st.step()) out.push(st.getAsObject()); return out; }
      if (mode === 'get') return st.step() ? st.getAsObject() : undefined;
      while (st.step()) { /* drain */ }
      const changes = raw.getRowsModified(); const r = raw.exec('SELECT last_insert_rowid() AS id'); return { changes, lastInsertRowid: r[0].values[0][0] };
    } finally { st.free(); }
  };
  const db = {
    raw, open: true,
    prepare(sql) { return { run: (...a) => q(sql, norm(a), 'run'), get: (...a) => q(sql, norm(a), 'get'), all: (...a) => q(sql, norm(a), 'all') }; },
    exec(sql) { raw.exec(sql); return db; },
    pragma(s) { try { raw.exec(`PRAGMA ${s}`); } catch { /* journal_mode etc. are irrelevant in memory */ } return []; },
    transaction(fn) {
      return (...args) => {
        const name = `sp${depth}`; if (depth === 0) raw.exec('BEGIN'); else raw.exec(`SAVEPOINT ${name}`); depth++;
        try { const r = fn(...args); depth--; if (depth === 0) raw.exec('COMMIT'); else raw.exec(`RELEASE ${name}`); return r; }
        catch (e) { depth--; try { if (depth === 0) raw.exec('ROLLBACK'); else { raw.exec(`ROLLBACK TO ${name}`); raw.exec(`RELEASE ${name}`); } } catch { /* already rolled back */ } throw e; }
      };
    },
    export() { return raw.export(); }, close() { raw.close(); }
  };
  return db;
}
