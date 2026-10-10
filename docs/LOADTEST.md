# Bot load test (measured 10 Oct 2026)
**What this is.** `node scripts/loadtest.mjs 50,200,500,1000 40` starts the real game server in a separate Node process (in-memory SQLite, per-IP rate limits lifted so one machine can act as many players) and drives N simulated residents over real HTTP: guest sign-up, then a heartbeat with a movement trail on the interval the server asks for. 40 s measured after a 6 s warm-up. CPU is read from `/proc/<pid>/stat` for the server process only.

**Where.** 8-core Intel(R) Xeon(R) Processor, Node v20.19.2, the same sandbox that runs the other tests; the load generator shares the machine, so latency is slightly pessimistic. **These are measurements on this box, not production estimates.** A real deployment has network latency, TLS, a reverse proxy, disk, a different CPU and real clients.

## A. Real behaviour (the server's own adaptive interval: 5 s up to 50 online, 12 s up to 1000)
| Clients | Beat interval | Beats/s | Latency ms p50 / p95 / p99 / max | Errors | Server CPU (share of ONE core) | Server RSS | Response size per beat |
|---|---|---|---|---|---|---|---|
| 50 | server ladder | 10 | 4.4 / 5.7 / 6.7 / 8.7 | 0 | 3.7% | 115 MB | 6317 B |
| 200 | server ladder | 15 | 3.9 / 5.3 / 6.5 / 15 | 0 | 4.8% | 143 MB | 8993 B |
| 500 | server ladder | 37.7 | 3.3 / 7.2 / 18.3 / 91.9 | 0 | 11.1% | 147 MB | 8903 B |
| 1000 | server ladder | 75.3 | 3.3 / 8.3 / 13.6 / 24.8 | 0 | 18.7% | 156 MB | 8898 B |

## B. Stress (every client beats every 2 s, ignoring the server's ladder)
| Clients | Beat interval | Beats/s | Latency ms p50 / p95 / p99 / max | Errors | Server CPU (share of ONE core) | Server RSS | Response size per beat |
|---|---|---|---|---|---|---|---|
| 200 | fixed 2000 ms | 100 | 2.9 / 5.2 / 12.4 / 25.6 | 0 | 24.2% | 143 MB | 8610 B |
| 500 | fixed 2000 ms | 250 | 3.1 / 10.9 / 17.6 / 82.2 | 0 | 53.9% | 154 MB | 8655 B |

## Reading it honestly
- No errors in any run. Heartbeat latency stayed in single-digit milliseconds at p95 up to 1000 simulated players on the ladder; worst single request 92 ms (one 500-client run, likely a GC pause or timer burst).
- The server is single-threaded Node: CPU share is of one core. In the stress run 500 clients at 2 s is 250 beats/s at about 54% of a core, so one core tops out near 450 beats/s on this box (simple extrapolation of a measured point, not a measured limit). That is roughly 5,000 players on the 12 s ladder before one core is saturated, **if** nothing else (ads, games, voice signalling, the database on a slower disk) grows. Treat that as a hint to test again, not a promise.
- What was **not** measured: WebSocket fan-out (phone signalling, chat push), table games, shop/travel/ledger writes under load (only heartbeats and sign-ups), a file-backed SQLite on slow disk, Postgres, TLS, real mobile networks, and bots that chat or enter interiors. The load clients walk randomly and never use the economy.
- Payload: about 6 to 9 KB per heartbeat response (nearby players capped at 60). At 12 s that is about 2.7 MB per hour of downstream data per player; worth shrinking before a data-conscious launch (delta encoding, smaller trails).
- Memory: 106 MB at 50 clients to 156 MB at 1000, roughly 50 KB per extra player.

Raw results: `docs/loadtest-last.json`. Re-run any time; it takes about 4 minutes for the default sizes.
