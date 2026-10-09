import { buildServer } from './createServer.js';
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1'; // localhost only by default. Do NOT expose publicly without TLS/proxy review.
const s = buildServer();
s.startTimers();
s.server.listen(port, host, () => console.log(`${s.app.gameName} server on http://${host}:${port}  (data: ${process.env.NA_DB || 'data/naija-area.db'}, dev routes: ${s.app.devRoutes ? 'ON' : 'off'})`));
const stop = async () => { await s.close(); process.exit(0); };
process.on('SIGINT', stop); process.on('SIGTERM', stop);
