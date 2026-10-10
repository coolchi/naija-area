// SQLite-dialect SQL -> Postgres. The game core is written against better-sqlite3's API and SQL. Instead of rewriting ~360 statements, this small, pure,
// well-tested translator covers the handful of dialect differences the code actually uses. Anything it cannot translate is a bug the test-suite finds
// (the whole suite runs on real Postgres: `npm run test:pg`). Keep the rule list SHORT: new SQL should be portable in the first place.

/** Replace each `?` outside a string literal with $1, $2, ... Returns { text, n }. */
export function placeholders(sql) {
  let out = ''; let n = 0; let inStr = false;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (inStr) { out += ch; if (ch === "'") { if (sql[i + 1] === "'") { out += "'"; i++; } else inStr = false; } continue; }
    if (ch === "'") { inStr = true; out += ch; continue; }
    if (ch === '?') { out += `$${++n}`; continue; }
    out += ch;
  }
  return { text: out, n };
}
const stripComments = (s) => s.replace(/--[^\n]*/g, ' ').trim();

/**
 * @param {string} sql  one SQLite statement
 * @param {{identity: Record<string,string>}} ctx  identity.<table> = name of its generated id column (for lastInsertRowid)
 * @returns {{ text: string, n: number, kind: 'select'|'insert'|'other', idCol: string|null }}
 */
export function translate(sql, ctx = { identity: {} }) {
  let s = stripComments(sql).replace(/;\s*$/, '');
  const kind = /^(select|with)\b/i.test(s) ? 'select' : /^insert\b/i.test(s) ? 'insert' : 'other';
  let ignore = false;
  s = s.replace(/^insert\s+or\s+ignore\s+into\b/i, () => { ignore = true; return 'INSERT INTO'; });
  if (/^insert\s+or\s+replace\b/i.test(s)) throw new Error('pg-translate: INSERT OR REPLACE is not supported; use ON CONFLICT ... DO UPDATE');
  const { text, n } = placeholders(s); s = text;
  // SQLite's LIKE ignores ASCII case; Postgres' does not
  s = s.replace(/\bLIKE\b/g, 'ILIKE');
  // the ledger reads a balance, checks it, writes it: lock the row so a second connection can never interleave (defence in depth; one process is enforced anyway)
  if (kind === 'select' && /^select\b[^]*\bfrom\s+accounts\s+where\s+id\s*=\s*\$\d+\s*$/i.test(s)) s += ' FOR UPDATE';
  let idCol = null;
  if (kind === 'insert') {
    if (ignore) s += ' ON CONFLICT DO NOTHING';
    const m = /^insert\s+into\s+([a-z_][a-z0-9_]*)/i.exec(s); const col = m && ctx.identity[m[1].toLowerCase()];
    if (col && !/\breturning\b/i.test(s)) { s += ` RETURNING ${col}`; idCol = col; }
  }
  return { text: s, n, kind, idCol };
}

/** map a Postgres error to the SQLite-flavoured code the core already checks for (`/SQLITE_CONSTRAINT/` in routes.js) */
export function mapErrorCode(pgCode) {
  switch (pgCode) {
    case '23505': return 'SQLITE_CONSTRAINT_UNIQUE';
    case '23503': return 'SQLITE_CONSTRAINT_FOREIGNKEY';
    case '23514': return 'SQLITE_CONSTRAINT_CHECK';
    case '23502': return 'SQLITE_CONSTRAINT_NOTNULL';
    case 'P0001': return 'SQLITE_CONSTRAINT_TRIGGER'; // RAISE EXCEPTION from the append-only ledger triggers
    default: return undefined;
  }
}
