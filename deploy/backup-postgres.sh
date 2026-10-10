#!/usr/bin/env bash
# Postgres backup (launch PREPARATION, NOT RUN: no Postgres client tools where this was written). Needs pg_dump and the NA_DATABASE_URL in the environment.
# Usage: deploy/backup-postgres.sh /var/backups/naija-area [keep=14]
set -euo pipefail
dest="${1:?destination folder}"; keep="${2:-14}"; : "${NA_DATABASE_URL:?NA_DATABASE_URL is not set}"
mkdir -p "$dest"; umask 077
file="$dest/naija-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --format=custom --no-owner --dbname="$NA_DATABASE_URL" --file="$file"
pg_restore --list "$file" > /dev/null          # proves the file is readable
ls -1t "$dest"/naija-*.dump | tail -n +"$((keep + 1))" | xargs -r rm -f --
echo "backup ok: $file"
# Restore (practise this BEFORE launch): createdb naija_restore && pg_restore --no-owner --dbname=naija_restore "$file"
# Off-machine copy is still needed: sync "$dest" to storage in another provider/region.
