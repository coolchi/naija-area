# Personal-data breach runbook (DRAFT, 10 Oct 2026)

**Status: written by the engineering side, NOT reviewed by a lawyer or the Data Protection Officer, never rehearsed.** NDPA 2023 expects the regulator (NDPC) to be told **within 72 hours** of becoming aware of a breach likely to put people's rights at risk, and the affected people told without undue delay when the risk is high. Confirm the exact duties, thresholds and forms with the lawyer before launch. Fill every `[BRACKET]`.

## 0. People (fill in before launch)
| Role | Name | Phone / WhatsApp | Backup |
|---|---|---|---|
| Incident lead (decides, owns the clock) | [NAME] | [NUMBER] | [NAME] |
| Engineer on call (contain, investigate) | [NAME] | [NUMBER] | [NAME] |
| Data Protection Officer / contact for the NDPC | [NAME] | [NUMBER] | [NAME] |
| Lawyer | [FIRM] | [NUMBER] | |
| Spokesperson (players, press) | [NAME] | | |
Where this runbook lives offline (so it is readable if the hosting is down): [PLACE].

## 1. The first hour: stop the bleeding
Write down the **time you became aware** (the 72 hours start here). Open an incident log (a shared document: time, who, what was seen, what was done). Do not delete anything. Then, as the evidence suggests:
1. **Contain.** Suspected stolen admin access: change `ADMIN_PASSWORD` and `ADMIN_TOTP_SECRET` (new secret with `node tools/admin-totp.mjs`), restart. Suspected stolen sessions or a signing-key leak: change `SESSION_SECRET` and restart (this logs everybody out, which is the point). Suspected server access: take the server off the network (Cloudflare "Under Attack" or block at the firewall, or stop the service) and snapshot the disk first. Leaked payment keys: rotate in the Monipay dashboard and update `MONIPAY_*`. Leaked database credentials: rotate `NA_DATABASE_URL`.
2. **Preserve evidence.** Copy the application log (`journalctl -u naija-area`), the reverse-proxy and Cloudflare logs, the `audit_log` table, `/metrics` and the data directory. Do this before rebuilding anything.
3. **Stop further damage.** Disable the entry point (e.g. `NA_ADMIN_ALLOW_IPS` to your own IP, or turn off the affected feature) rather than the whole game if you can.

## 2. Understand what happened (hours 1 to 24)
- **What data**: use the table below. **Whose and how many**: query by time window and table. **How**: entry point, how long, still open?
- Check the ledger first: `GET /api/admin/overview` must say balanced (and `na_ledger_balanced` in `/metrics`). If it does not, treat as a money-integrity incident too.
- Look for admin actions you did not do in `audit_log`; for new admin cookies; for strange `account_closed`, `test_topup` or payment rows.

| Data we hold | Where | Sensitivity |
|---|---|---|
| Username, hashed password (bcrypt), hashed IP, colour, timestamps | `users` | medium: usernames are public in game; hashes are slow but crackable if weak passwords |
| Chat, DMs, voice notes, friends | `chat_messages`, `phone_*`, voice files in the data dir | high: private communication |
| Application and idea text, optional email | `applications`, `office_ideas` | medium to high (email, free text) |
| Payment records (reference, amounts, email), no card data | `payment_intents` | high: financial. Card numbers never touch us (Monipay) |
| Age-check outcome | `age_verifications` | medium; vendor-held evidence is the vendor's |
| Ledger, game progress | `ledger_*`, `accounts` | low (fictional money) |
| Admin secrets, signing key, provider keys | environment | critical: rotate on any doubt |

## 3. Decide and notify (inside the 72 hours)
- **Is it a notifiable breach?** Incident lead + DPO + lawyer decide and write down why. If in doubt, notify.
- **NDPC notice**: what happened, categories and approximate number of people and records, likely consequences, what we did and will do, contact point. Template: [LAWYER TO SUPPLY]. Filing route: [NDPC PORTAL / EMAIL]. If not everything is known by hour 72, send what is known and follow up.
- **Players**: if the risk to them is high, tell them plainly, in the game (notification to every affected account via the `notifications` table) and by email where we have one (applications only): what happened, what data, what they should do (change the password if reused elsewhere; beware of scam messages; how to reach us), what we did. No blame, no jargon. Template: [LAWYER TO REVIEW].
- **Providers**: Monipay (if payment data or keys), the age-check vendor (if their webhook or data), Cloudflare/host abuse desk (if attack infrastructure).
- **Police**: [LAWYER] decides (e.g. NPF cybercrime unit).

## 4. Recover and learn (days 1 to 14)
Rebuild from a clean image if the host was touched; restore data from the last good backup (`docs/LAUNCH.md` §4) and **run the ledger check** afterwards; rotate every secret even if only one was exposed; add the missing detection (alert, log, rate limit); write the post-incident review within 14 days (timeline, root cause, what worked, what did not, actions with owners); update this runbook; keep the log and notices for [RETENTION PERIOD, ask the lawyer].

## 5. Quick commands
```
node tools/admin-totp.mjs                  # new admin second-factor secret
node scripts/check-config.mjs --file .env --production   # sanity check the new environment before restart
node scripts/backup-sqlite.mjs             # backup now (before cleaning)
curl -H "Authorization: Bearer $NA_METRICS_TOKEN" https://<domain>/metrics | grep na_ledger_balanced
```

## NOT verified
Never rehearsed. No contact details exist yet. The NDPC filing route, notice templates, retention periods and the "notifiable" threshold all need the lawyer. We cannot yet detect most breaches: there is no alerting wired to `/metrics` and logs are not shipped anywhere off the server (`docs/LAUNCH.md` §5).
