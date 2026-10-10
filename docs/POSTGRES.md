# PostgreSQL (item 28)

The game runs on **SQLite by default** (tests, the static demo, small installs) and on **PostgreSQL** when `NA_DATABASE_URL` is set. Same code, same ledger rules, one switch.

## Switch

| Variable | Meaning |
|---|---|
| `NA_DATABASE_URL` | `postgres://user:pass@host:5432/dbname`. Unset = SQLite (`NA_DB`, default `data/naija-area.db`). |
| `NA_DB_SCHEMA` | optional Postgres schema to live in (created if missing). Default: the user's default schema (`public`). |
| `NA_DB_SSL=1` | use TLS to the database (`NA_DB_SSL_STRICT=0` allows self-signed, e.g. some managed providers; prefer a real CA). |
| `NA_DB_AUTOMIGRATE` | default on: the server applies pending migrations at start. `0` = refuse to start if migrations are pending (run `npm run db:migrate` first; use this for rolling deploys). |
| `NA_DB_SINGLE_INSTANCE` | default on: the server takes a Postgres advisory lock and **refuses to start if another server already uses the same database/schema**. See "Limits". |

The passwords in the URL are masked in the start-up log.

## Commands

```
npm run test:pg                      # the WHOLE test suite on a throw-away real Postgres 17 (no Docker, no root)
node scripts/pg-local.mjs start 5544 # a local dev Postgres on port 5544 (prints the URL; Ctrl-C stops and deletes it)
NA_DATABASE_URL=... npm run db:migrate          # status
NA_DATABASE_URL=... node tools/pg-migrate.mjs up
NA_DATABASE_URL=... node tools/sqlite-to-pg.mjs data/naija-area.db   # one-off copy of an existing game into an EMPTY Postgres
node tools/gen-pg-schema.mjs --check # is the frozen baseline still what the SQLite schema generates
```

`embedded-postgres` (a dev dependency) ships real PostgreSQL 17 binaries and is only used for tests and local development. Production uses your own Postgres (any 14+ with the `citext` extension, which every managed provider offers).

## How it works (and why)

The core is **synchronous** (`db.prepare(sql).get/all/run`, `db.transaction`) and has ~360 SQL statements written for SQLite. Rewriting all of it to async Postgres would have touched every file and put the ledger at risk, so:

1. **`server/lib/pg-sync.js`** offers the same API on Postgres. The real `pg` connection lives in a **worker thread** (`pg-worker.js`); each call posts the query and blocks (`Atomics.wait`) until the answer arrives. The core cannot tell the difference.
2. **`server/lib/pg-translate.js`** (small, pure, unit-tested) converts the few SQLite-isms: `?` and `@name` parameters, `INSERT OR IGNORE`, `lastInsertRowid` (via `RETURNING`), `LIKE` (case-insensitive like SQLite), backtick identifiers, two-argument `MAX/MIN`, error codes (`SQLITE_CONSTRAINT_*`, which the routes already check). Anything it cannot translate throws loudly (e.g. `INSERT OR REPLACE`).
3. **Migrations**: `server/migrations/pg/NNNN_name.sql`, applied in order, each in **one transaction**, recorded in `schema_migrations` with a checksum (editing an applied file is refused). `0001_baseline.sql` is **generated** from the SQLite schema (`tools/gen-pg-schema.mjs`) and then frozen. From now on a schema change is: update the SQLite `migrate()` in `server/core/schema.js` **and** add `0002_*.sql` by hand. A test compares every table and column of both engines, so forgetting one fails the suite.
4. **Ledger invariants are database-enforced on both engines**: append-only triggers on `ledger_tx` and `ledger_entries` (Postgres: `na_ledger_append_only()`), `CHECK (allow_negative = 1 OR balance >= 0)`, unique idempotency key. The balance row is read `FOR UPDATE` inside the posting transaction. `checkInvariants` (sum of entries is 0, balance = sum of entries, no negative user balance) passes on Postgres in the same tests as SQLite.
5. Types: SQLite `INTEGER` becomes `BIGINT` (read back as JS numbers; our ids, money and millisecond timestamps are far below 2^53), `REAL` becomes `DOUBLE PRECISION`, `COLLATE NOCASE` usernames become `CITEXT`.

## Moving an existing game to Postgres

1. Stop the server (the copy is a snapshot). 2. `NA_DATABASE_URL=... node tools/sqlite-to-pg.mjs data/naija-area.db`. It applies migrations, refuses a non-empty target, copies everything in one transaction (parents before children), restarts the id sequences, then **verifies**: row counts per table, total of balances, ledger invariants. Nothing is committed if anything fails. The SQLite file is only read, so you can go back. 3. Start the server with `NA_DATABASE_URL`. Voice-note files stay on disk (`NA_DATA_DIR/voice`), they were never in the database.

## Differences you may notice

* `CAST(x AS INTEGER)` truncates in SQLite and rounds in Postgres; the one use (leaderboard house value) now uses `FLOOR` so both agree. Decimal literals (`x*0.7`) are exact in Postgres and binary floating point in SQLite, which can differ by 1 at an exact boundary; the game's money uses whole numbers and `Math.floor` in code.
* Postgres refuses a fractional number in an integer column (SQLite stored it). One such bug was found by the Postgres run (`scores.js`) and fixed; any other will show as an error rather than silent bad data.
* `NOT NULL`, `UNIQUE`, `CHECK` errors keep the SQLite wording prefix (`UNIQUE constraint failed: ...`) so code and tests that match on it still work.

## Limits (be honest)

* **One server process, one writer.** The game world (positions, matches, timers) lives in memory, and the ledger code reads, checks and writes in one synchronous step. That is correct with a single process, and Postgres does not change that. The advisory lock stops an accidental second process. **Running several servers needs an async core, shared world state and a pub/sub layer: a separate, large project.** What Postgres gives today: a managed, backed-up, restorable database, point-in-time recovery, read replicas for reports/admin, and a safe base for that later step.
* **Latency**: each statement is a network round trip and the main thread waits for it, like SQLite does but over a socket. Measured on this box with Postgres on localhost (fsync off): about **0.1 ms per statement**, 1.7 ms for a transaction of 20 writes. These are local numbers: with the database in the same region expect roughly 0.5 to 2 ms per statement, so a busy heartbeat (a dozen statements) could block the loop for 10 to 20 ms. Run the load test (`docs/LOADTEST.md`) against your real database before launch. Keep the app server and the database in the same region.
* **One connection** (no pool), by design, for the reason above. A connection drop surfaces as an error on the next call; the process manager should restart the server.
* Tested on PostgreSQL 17.5 only. Not tested: TLS, a managed provider, connection loss/failover, very large databases, `NA_DB_AUTOMIGRATE=0` flow beyond the unit tests.
* Backups, retention, monitoring are the hosting provider's / ops job, not done here.
