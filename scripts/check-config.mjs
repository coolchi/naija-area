// Checks a configuration WITHOUT starting the server. Usage:
//   node scripts/check-config.mjs                       (checks the current environment)
//   node scripts/check-config.mjs --file .env       (checks a dotenv file; add --production to apply production rules)
// Exit code 0 = no errors, 1 = errors. It never prints secret values.
import fs from 'node:fs';
import { checkConfig, parseEnvFile, formatReport } from '../server/lib/config-check.js';
const a = process.argv.slice(2); const i = a.indexOf('--file'); let env = process.env; let production = a.includes('--production') || undefined;
if (i >= 0) { const f = a[i + 1]; if (!f || !fs.existsSync(f)) { console.error(`env file not found: ${f}`); process.exit(2); } env = parseEnvFile(fs.readFileSync(f, 'utf8')); production = production ?? env.NODE_ENV === 'production'; }
const r = checkConfig(env, production === undefined ? {} : { production }); console.log(formatReport(r)); process.exit(r.ok ? 0 : 1);
