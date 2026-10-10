# deploy/ : launch PREPARATION files (nothing here was deployed, built or run)
Safe to commit: no secrets, only placeholders. The full checklist and the honest list of what is unverified is `docs/LAUNCH.md`.

| File | What it is |
|---|---|
| `Dockerfile` | multi-stage image, non-root, `/healthz` health check |
| `docker-compose.yml` | app (+ optional `postgres` and `tunnel` profiles); one app instance only |
| `env.production.example` | every environment variable with placeholders; check a filled copy with `node scripts/check-config.mjs --file <file> --production` |
| `naija-area.service` | hardened systemd unit |
| `naija-area-backup.service` / `.timer` | 6-hourly SQLite backup via `scripts/backup-sqlite.mjs` (the one piece here that is tested) |
| `backup-postgres.sh` | `pg_dump` backup with a restore check (not run) |
| `Caddyfile`, `nginx.conf` | reverse proxy examples for use behind Cloudflare (not run) |
