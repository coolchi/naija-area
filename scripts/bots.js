// `npm run bots`: start the game server with simulated residents walking, working, shopping and chatting.
// Usage: BOTS=10 PORT=3000 npm run bots   (then open http://127.0.0.1:3000 and watch the ghosts)
import { buildServer } from '../server/createServer.js';
import { startBots } from '../server/bots.js';
const port = Number(process.env.PORT || 3000); const s = buildServer(); s.startTimers();
const b = startBots(s.app, Number(process.env.BOTS || 8));
s.server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`${s.app.gameName} + ${b.bots.length} bots on http://127.0.0.1:${port}`));
process.on('SIGINT', async () => { b.stop(); await s.close(); process.exit(0); });
