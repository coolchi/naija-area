// Child process for scripts/loadtest.mjs: the real game server (in-memory DB) with the per-IP/auth rate limits lifted so one machine can act as hundreds of players.
import { buildServer } from '../server/createServer.js';
const port = Number(process.argv[2] || 3999); const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'load-admin' }); s.startTimers();
Object.assign(s.app.balance.rate, { actionsPerMin: 1e9, authPerMin: 1e9, guestPerHourPerIp: 1e9 }); s.app.balance.shops.enforceHours = false;
s.server.listen(port, '127.0.0.1', () => console.log('ready ' + process.pid));
process.on('SIGTERM', async () => { await s.close(); process.exit(0); });
