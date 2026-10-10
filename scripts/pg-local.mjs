// Starts a throw-away REAL Postgres (the embedded-postgres dev dependency: real Postgres 17 binaries, no root, no Docker) for development and `npm run test:pg`.
//   node scripts/pg-local.mjs start [port]   -> prints the URL, keeps running until Ctrl-C        node scripts/pg-local.mjs run -- <command...>  -> runs a command with NA_TEST_PG_URL set, then stops
import { spawn, execFileSync } from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
function binDir() { return process.env.NA_PG_NATIVE || fileURLToPath(new URL('../node_modules/@embedded-postgres/linux-x64/native', import.meta.url)); }
export async function startLocalPostgres({ port = 0, keep = false } = {}) {
  const nat = binDir(); const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'na-pg-')); const env = { ...process.env, LD_LIBRARY_PATH: path.join(nat, 'lib') };
  port ||= 30000 + Math.floor(Math.random() * 20000); fs.writeFileSync(path.join(dir, 'pw'), 'na');
  execFileSync(path.join(nat, 'bin/initdb'), ['-D', path.join(dir, 'data'), '-U', 'na', '--pwfile=' + path.join(dir, 'pw'), '-A', 'password', '--no-sync'], { env, stdio: 'ignore' });
  fs.appendFileSync(path.join(dir, 'data/postgresql.conf'), `\nfsync = off\nsynchronous_commit = off\nfull_page_writes = off\nmax_connections = 600\nshared_buffers = 64MB\nlisten_addresses = '127.0.0.1'\nunix_socket_directories = '${dir}'\n`);
  execFileSync(path.join(nat, 'bin/pg_ctl'), ['-D', path.join(dir, 'data'), '-o', `-p ${port}`, '-l', path.join(dir, 'log'), '-w', 'start'], { env, stdio: 'ignore' });
  const url = `postgres://na:na@127.0.0.1:${port}/postgres`;
  const stop = () => { try { execFileSync(path.join(nat, 'bin/pg_ctl'), ['-D', path.join(dir, 'data'), '-m', 'immediate', '-w', 'stop'], { env, stdio: 'ignore' }); } catch { /* already stopped */ } if (!keep) fs.rmSync(dir, { recursive: true, force: true }); };
  return { url, port, stop, dir };
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd === 'start') { const pgi = await startLocalPostgres({ port: Number(rest[0]) || 0 }); console.log(pgi.url); process.on('SIGINT', () => { pgi.stop(); process.exit(0); }); process.on('SIGTERM', () => { pgi.stop(); process.exit(0); }); setInterval(() => {}, 1 << 30); }
  else if (cmd === 'run') {
    const i = rest.indexOf('--'); const argv = rest.slice(i + 1); const pgi = await startLocalPostgres();
    const child = spawn(argv[0], argv.slice(1), { stdio: 'inherit', env: { ...process.env, NA_TEST_PG_URL: pgi.url } });
    const done = (code) => { pgi.stop(); process.exit(code ?? 1); }; child.on('exit', done); process.on('SIGINT', () => child.kill('SIGINT'));
  } else { console.error('usage: node scripts/pg-local.mjs start [port] | run -- <command...>'); process.exit(2); }
}
