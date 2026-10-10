# Public launch checklist (item 30: PREPARATION ONLY)
Written 10 Oct 2026. **Nothing was deployed, no domain was bought, no account was opened, no real key was used.** The files in `deploy/` are templates. Legend: **[DONE+TESTED]** = covered by an automated test on this machine; **[WRITTEN]** = written but never run (the tool is not installed here); **[DECISION]** = needs Sherif; **[BLOCKER]** = the game must not go public until this is closed. This is not legal advice.

## 0. Where the build stands (read this first)
| Area | State today | Launch blocker? |
|---|---|---|
| Payments | Monipay **test mode only**; the server refuses live keys and refuses the mock provider in production (`server/createServer.js`, `server/core/payments/providers.js`) | **[BLOCKER]** for selling game money. A public free-to-play launch with no purchases is possible; ads are free to book in test mode (`NA_ADS_REQUIRE_PAYMENT=0`) |
| Age check | **No vendor.** `NA_AGE_CHECK=off` = the 18+ tick box only. The mock provider cannot be the gate in production | **[BLOCKER]** for anything beyond a private beta until the lawyer says what is enough (docs/AGE.md) |
| Database | SQLite file by default, Postgres adapter exists and passes the full suite (`npm run test:pg`) | no, but pick one on purpose (§1) |
| One instance only | The world and ledger live in one Node process. Two instances on one database corrupt state | design limit, see §1 |
| Legal text | Terms are a draft; privacy, refunds, contact are **placeholders** (`public/*.html`) | **[BLOCKER]** |
| Moderation | Reports queue, filters and an audit log exist; **no people** assigned | **[BLOCKER]** (§9) |
| Real radio | Streams were never listened to; no station has given written permission | not a blocker (global off switch `NA_REAL_RADIO=0`), but a legal question (§8) |

## 1. Hosting options [DECISION]
| Option | Fit | Cost shape (ESTIMATE, list prices in 05/04, re-check) | Region / data residency | Notes |
|---|---|---|---|---|
| **A. One small VPS** (DigitalOcean, Hetzner, or similar) running the app with SQLite + Caddy/nginx, Cloudflare in front | Best for soft launch up to the load measured in docs/LOADTEST.md (1000 simulated players used 19% of one core) | tens of USD a month | The nearest big-provider regions to Lagos are in Europe (London, Amsterdam, Frankfurt; DigitalOcean has none in Africa per 05). Latency is fine for a 12 s heartbeat | Simplest; backups are the main risk. `deploy/naija-area.service` or `deploy/docker-compose.yml` |
| **B. Same VPS + Postgres** (compose `postgres` profile, or a managed Postgres) | When you want point-in-time recovery and managed backups | adds roughly USD 15 to 60 a month managed (ESTIMATE) | database must sit near the app (round trips on every request) | Still ONE app instance. Set `NA_DATABASE_URL`, `NA_DB_SSL=1` for a remote database |
| **C. African hosting** (a Lagos/Johannesburg/Cape Town provider or an Africa region of a hyperscaler) | Lower latency, simpler NDPA story | unknown, not researched | in-country or in-region | Nothing here was researched or priced. Worth a quote request before choosing |
| **D. Cloudflare Workers/Durable Objects rewrite** | The long-term scale plan in 05 | n/a | edge | Not what this code is. Do not pick this for launch |

Recommendation (a suggestion, not a decision): **A for a soft launch**, move to **B** when the first real money flows, decide region with the lawyer's view on cross-border transfers (NDPA ss.41 to 43, 07 §1). The app is a single Node process, so "high availability" here means fast restarts and good backups, not a second server.

## 2. Cloudflare in front [WRITTEN, not set up]
1. DNS: the domain's A/AAAA record points at the VPS and is **proxied** (orange cloud).
2. SSL/TLS mode **Full (strict)**; an Origin Certificate on the VPS (`deploy/nginx.conf`) or Caddy's own certificate (`deploy/Caddyfile`). Always-HTTPS on. HSTS only after HTTPS works everywhere.
3. **WebSockets: on** (phone signalling and push use `/ws`).
4. **Firewall the origin so only Cloudflare's published IP ranges can reach ports 80/443** (cloudflare.com/ips). This matters: the proxy configs trust the `CF-Connecting-IP` header, which anyone could forge if they reached the origin directly.
5. Caching: cache the static assets (`/game.js`, `/assets/*`, `/style.css`); **bypass cache for `/api/*`, `/go/*`, `/media/*`, `/ws`, `/healthz`, `/readyz`**. (The app already sends `Cache-Control: no-store` on `/api` and the health endpoints.)
6. Rate limiting / WAF rules: a rule for `POST /api/auth/*` (the app limits per IP too), managed rules on, bot fight mode on **except** for `POST /api/payments/webhook` and `/api/age/webhook` (provider servers call these; allow-list the provider's IPs once known).
7. **Protect `/admin` and `/api/admin/*`** with Cloudflare Access (email login) or an IP allow-list in addition to the admin password.
8. Client IPs: set `NA_TRUST_PROXY=1` with exactly one proxy (Caddy/nginx) in front that **overwrites** `X-Forwarded-For` from `CF-Connecting-IP` (both example configs do). The app now trusts a *number* of proxies, not "everything": with the old `true` setting a player could fake their address with their own header (fixed in this item, tested). Cloudflare Tunnel straight to the app also works with `NA_TRUST_PROXY=1`.
9. Cloudflare would see all traffic (a data-processing party for the privacy notice).

## 3. Environment variables and secrets [DONE+TESTED for the validator]
Template with every variable: `deploy/env.production.example`. Validate **without starting**: `node scripts/check-config.mjs --file <file> --production`. In production the server runs the same check at start and **refuses to start on any error** (tested by actually launching it).

| Variable | Secret? | Purpose | Rule enforced |
|---|---|---|---|
| `SESSION_SECRET` | **yes** | signs player cookies | 32+ chars, not a placeholder. Changing it logs everyone out |
| `ADMIN_PASSWORD` | **yes** | the one shared admin login | 12+ chars, not a placeholder, differs from the session secret. Unset in production = admin disabled |
| `MONIPAY_SECRET_KEY`, `MONIPAY_PUBLIC_KEY`, `MONIPAY_WEBHOOK_SECRET` | **yes** | payments (TEST keys only) | must be `pri_test_` / `pub_test_`; live keys refused |
| `NA_DATABASE_URL` | **yes** (has a password) | Postgres | postgres URL; warns if remote without `NA_DB_SSL=1` |
| `APIFOOTBALL_KEY`, `NA_TURN_CREDENTIAL`, `CLOUDFLARE_TUNNEL_TOKEN`, `POSTGRES_PASSWORD` | **yes** | optional services | set together where needed |
| `NODE_ENV=production`, `PORT`, `HOST`, `NA_PUBLIC_URL`, `NA_TRUST_PROXY`, `NA_DATA_DIR`, `NA_PAYMENTS_PROVIDER`, `NA_AGE_CHECK`, `NA_REAL_RADIO`, `NA_SCORES_PROVIDER` | no | behaviour | `NA_PUBLIC_URL` must be https and not localhost |
| `NA_DEV`, `NA_PREVIEW_CITIES`, `NA_CRASH_SEED`, `PRACTICE_BOT` | no | testing aids | `NA_DEV=1` is an error in production |

Where secrets live: a root-owned file (mode 0640) read by systemd (`EnvironmentFile`), or the compose env file (git-ignored by name), or the host's secret store. **Never in git, never in the image, never in chat.** The checker never prints a secret value (tested). Rotation: new `SESSION_SECRET` = everyone signs in again; new `MONIPAY_WEBHOOK_SECRET` must be changed at Monipay at the same moment.
Also back up `NA_DATA_DIR/session.secret` if you rely on it instead of the env var (setting the env var is better).

## 4. Backups [DONE+TESTED for SQLite, WRITTEN for Postgres]
- SQLite: `node scripts/backup-sqlite.mjs <db> <folder> --keep 14` uses SQLite's online backup (safe while the game runs), checks `integrity_check`, makes files owner-only and prunes old ones. Tested while the database stays open. Timer: `deploy/naija-area-backup.timer` (every 6 hours) [WRITTEN].
- Postgres: `deploy/backup-postgres.sh` (`pg_dump` custom format + `pg_restore --list`) [WRITTEN, not run]. A managed provider's own point-in-time backups are better if you choose that.
- **Voice notes** are files in the `voice/` folder next to the database: copy that folder too (not covered by the script).
- **Off-machine copy is still needed** (another provider or region, encrypted). Not set up.
- **A backup you never restored is a hope.** Before launch: restore the newest backup on a throw-away machine and log in. Not done. Target (a suggestion): lose at most 6 hours, recover within 1 hour.
- Money check after any restore: `GET /api/admin/overview` returns the ledger invariants (money in equals money out); it must say balanced.

## 5. Monitoring and health endpoints [DONE+TESTED]
| Endpoint | Use | Behaviour |
|---|---|---|
| `GET /healthz` | liveness (Docker `HEALTHCHECK`, proxy checks) | `200 ok` while the process is up |
| `GET /readyz` | readiness / uptime monitor | `200 {ok,db,uptimeSec,version}`; **`503`** if the database does not answer. No secrets in the body |
| `GET /api/health` | older, public | `{ok,name,now}` |
| `GET /api/admin/overview` | admin only | users, online now, money supply, **ledger invariants**, campaigns by status |

To do (not set up): an external uptime monitor on `/readyz` (alert by SMS/WhatsApp/email), disk-space and memory alerts on the VPS, process restart alerts, an alert when the ledger invariant fails (poll the admin overview from a script with a service login), log shipping (the app logs to stdout; systemd journal or Docker logs keep them; **logs must not contain personal data**: check before shipping), error tracking. No metrics endpoint exists (Prometheus etc.): not built.

## 6. Admin hardening [BUILT 10 Oct 2026, partly tested]
- **Second factor (TOTP):** set `ADMIN_TOTP_SECRET` (create with `node tools/admin-totp.mjs`, add to an authenticator app). Login then needs password + 6-digit code, a code works once, 5 wrong attempts lock that address for 15 minutes. **In production the admin login is refused (503) unless the secret is set**, or the discouraged `NA_ADMIN_2FA=off` is given; `check-config` fails a production file without it.
- **Protect `/admin`:** `NA_ADMIN_ALLOW_IPS` (IPs and IPv4 ranges) makes `/admin`, its scripts and `/api/admin/*` answer a plain 404 to everyone else; admin pages are `no-store` and `noindex`. Still put Cloudflare Access in front (§2.7): this list is the second lock. Behind a proxy, `NA_TRUST_PROXY` must be right or every request looks like the proxy's address.
- **Metrics:** `GET /metrics` (Prometheus text, counts and timings only, no personal data), readable with `Authorization: Bearer $NA_METRICS_TOKEN` or an admin session, 404 otherwise. Includes `na_ledger_balanced` (alert when 0), `na_db_ok`, requests by status class, API latency histogram, players online, event-loop lag, memory, open applications, open reports, ads in review. Alert rules are NOT set up (§5).
- **Still a gap:** one shared admin password (no individual admin accounts, no per-admin audit trail beyond "admin"), not every admin action is audit-logged (unchecked), no admin session list or logout-everywhere, TOTP secret is one shared secret.

## 7. Legal pages [placeholders in the app, NOT legal text]
`/terms` (existing draft), `/privacy`, `/refunds`, `/contact` are served and each carries a loud banner that it is a placeholder with `[BRACKETS]` to fill (tested). A lawyer must write or replace: Terms of use (18+, no cash value, closed loop), Privacy notice, Refund policy, Advertiser terms (ARCON approval numbers for regulated categories, 07 §2), Acceptable use / moderation policy, takedown and law-enforcement request process, cookie statement. There is no cookie banner (one sign-in cookie, no tracking cookies found; confirm with the lawyer).

## 8. Dependencies on NDPA, age checks, payments, radio
- **NDPA 2023** (07 §1): decide whether we are a data controller of major importance (registration with the NDPC, a named Data Protection Officer, fee tiers in 07), lawful basis per use, **72-hour breach notice** (runbook drafted: docs/BREACH_RUNBOOK.md), cross-border transfer basis if hosting is abroad (and Cloudflare), retention periods, a data-protection impact view of chat, DMs, voice notes and ad tracking. **Data-subject rights:** player-facing "download my data" and "close my account" are BUILT (docs/ACCOUNT_DATA.md; retention periods and tables from merged tracks still to confirm). **Breach runbook:** drafted in docs/BREACH_RUNBOOK.md (unreviewed, never rehearsed, contacts blank).
- **Age checks** (docs/AGE.md): needs a vendor, a per-check price, a lawyer's answer on the minimum (tick box vs verified for payments vs verified to play), what happens to a failed result, retention. The plumbing, webhook and policy switch (`NA_AGE_CHECK`) exist and are tested against the stand-in only.
- **Payments** (docs/PAYMENTS.md): needs Monipay's merchant agreement and **live keys**, **a code change** to lift the test-key guard on purpose, the real fee schedule (the ₦ numbers are ESTIMATES), VAT treatment confirmed by a tax adviser, a refund policy, chargeback handling, settlement and reconciliation procedure, FCCPC wording. Webhook URL to give Monipay: `https://<domain>/api/payments/webhook` (not registered).
- **Radio**: four real stations are streamed straight from the stations' own servers by the player's browser. Not listened to, no written permission from any station. Ask a lawyer whether embedding public streams in a commercial game is acceptable; keep `NA_REAL_RADIO=0` ready as the off switch.
- **Ads**: the in-game ad system needs ARCON vetting rules and an approver (07 §2).

## 9. Moderation staffing [DECISION]
Built: chat/name filters, user reports and blocks, an admin report queue and ad-approval queue, audit log. **Not built or decided:** who reviews reports and ads and when, response-time promise, escalation (threats, child safety, scams), an under-18 report path (07 §4: review, close, delete), law-enforcement contact. From 03: lean = founder plus a community manager; solid = two moderators (ESTIMATE ₦250k a month each, no reliable Nigerian data found). Rule of thumb from 03: hire as soon as it is live, and ads need a human in the loop from day one. Launch gate: at least one named person reading the queue every day and a written "what we do about X" page.

## 10. Load test plan (uses the existing load test) [WRITTEN, not run on real hardware]
Existing results (docs/LOADTEST.md, this sandbox, in-memory SQLite, no TLS): 1000 simulated players on the adaptive ladder, p95 8.3 ms, 0 errors, 19% of one core; stress 500 players at 2 s each used 54% of one core. **Not measured:** WebSocket fan-out, writes under load (shops, travel, ledger, games), file-backed SQLite on a slow disk, Postgres, TLS, real mobile networks, Cloudflare.
Plan before opening the door:
1. On the real server size, **empty database**: `node scripts/loadtest.mjs 50,200,500,1000 40`. Accept: 0 errors, p95 under 100 ms, CPU under 60% of one core at the target online count.
2. Same with **file-backed SQLite** and again with **Postgres** (`NA_DATABASE_URL`), same targets. Compare.
3. Add write-heavy load (the load test only does sign-ups and heartbeats): a scripted mix of buy, travel, ride, game moves and a few hundred WebSocket phone clients. **This script does not exist yet** (to build).
4. Through **Cloudflare with TLS** from a machine in Nigeria if possible (latency and WAF false positives), but only against your own domain and with Cloudflare's rules in mind.
5. Soak: 2 hours at the expected peak, watch memory (50 KB per player was measured; check for growth) and disk.
6. Kill the process during the run: it must restart (systemd/Docker) and `/readyz` must go green, and the ledger invariants must still balance.
7. Then restore a backup (§4) onto a second machine and run the same smoke.
Payload note from LOADTEST.md: 6 to 9 KB per heartbeat response is about 2.7 MB per player-hour; matters for mobile-data players.

## 11. Launch-day checklist
- [ ] Decisions in §12 made. Lawyer reviewed Terms, Privacy, Refunds, Advertiser terms, NDPA status.
- [ ] Domain registered, Cloudflare set up per §2, origin firewalled to Cloudflare only.
- [ ] Production env file filled; `node scripts/check-config.mjs --file ... --production` says OK; server started in production mode.
- [ ] `/readyz` monitored from outside; alerts reach a human.
- [ ] Backups running, off-machine copy working, **one restore rehearsed**.
- [ ] Admin behind Cloudflare Access/IP list; named moderator(s) with a written policy.
- [ ] Legal placeholders replaced (search the site for "PLACEHOLDER" and "[").
- [ ] Payments: still test mode unless live payments were deliberately built and approved. Age check: vendor chosen or purchases/ads disabled.
- [ ] Load test passed on the real machine (§10). Demo/beta group of real phones on mobile data tried it.
- [ ] Rollback plan: previous release folder/image kept, database backup taken just before the change, `NA_REAL_RADIO=0` ready.

## 12. Decisions needed from Sherif
1. **Hosting choice and region** (§1): VPS in Europe vs an African host; SQLite vs Postgres.
2. **Domain** and who owns the Cloudflare account (§2).
3. **Monipay**: merchant agreement, live keys, the real fee schedule, and approval to lift the test-key guard (§8).
4. **Age-check vendor**, the required level (tick box / verify to pay / verify to play) and the failure policy.
5. **Lawyer review**: Terms, Privacy, Refunds, Advertiser terms, NDPA registration/DPO, cross-border transfer, gaming-law view of the casino/betting-style venues, radio streams, real brand names in the world.
6. **Moderation**: who, hours, budget.
7. Whether the first public version is **free-to-play without purchases** (no payments or age-vendor blocker) or waits for payments.
8. Final **game name** (08) and trademark filing before a public domain is used.

## 13. NOT verified (honest list)
- Docker image, docker-compose, systemd units, Caddyfile, nginx config, the Postgres backup script: **never built, run, validated or linted** (no Docker, systemd, nginx, caddy or pg_dump on this machine). Tests only check that the files exist, contain no secrets and contain the safety settings.
- Cloudflare settings: not set up; the advice is general practice, not tested against Cloudflare. Header names (`CF-Connecting-IP`) are from Cloudflare's public documentation as I know it; re-check.
- Any hosting price, region latency or provider claim: estimates from earlier research docs, not re-checked today.
- Restoring a backup: the SQLite backup is tested to open and match; a full restore-and-play rehearsal was not done.
- Load numbers are from this sandbox, not from the launch machine, TLS or Cloudflare.
- Real Monipay, real age vendor, real radio streams, real app-store or browser behaviour on mobile networks: not tested.
- Legal and tax statements are summaries from 07, not advice. NDPC registration thresholds and fees can change.
