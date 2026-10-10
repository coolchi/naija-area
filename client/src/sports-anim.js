// Sports hall animation maths (PURE: no three.js, no DOM, so tests can run it). Turns the server's rally log (events) into a timeline of "beats" (a swing, a ball flight, a cheer)
// and says where the ball and the athletes are at any moment. Nothing here decides a score: the server already did, this only draws it. See docs/SPORTS_HALL.md.
//
// FRAME (metres, relative to the station): the long axis of the table / court is x, the net is at x = 0, seat 0 stands at -x facing +x, seat 1 at +x facing -x.
// Columns are the SERVER's columns: 0, 1, 2 are fixed across the court from -z to +z (the same cell means the same place for both players). A person's screen shows
// their own half at the bottom, so seat 0 sees column 0 on the left and seat 1 sees column 0 on the right: see `viewCol`.
export const GEOM = {
  pingpong: { id: 'pingpong', halfLen: 1.37, halfW: 0.76, floor: 0.764, ballR: 0.07, baseX: 2.15, hitY: 0.98, netTop: 0.92, lane: 0.38, scale: 0.9, apex: 0.34, racket: 0.2 },
  tennis: { id: 'tennis', halfLen: 5.0, halfW: 2.5, floor: 0.054, ballR: 0.11, baseX: 5.9, hitY: 1.05, netTop: 0.95, lane: 1.45, scale: 0.9, apex: 1.4, racket: 0.7 },
};
export const sideSign = (seat) => (seat === 0 ? -1 : 1);                 // seat 0 is on the -x end
export const toNet = (seat) => -sideSign(seat);                          // the way a seat faces along x
export const yawOf = (seat) => (seat === 0 ? 0 : Math.PI);               // the people shape faces local +x
export const handZ = (seat) => (seat === 0 ? 0.3 : -0.3);                // the racket hand: seat 0 faces +x so its right is +z
export const colZ = (g, col) => (col - 1) * g.lane;
/** screen column of a server column for a seat's own screen (their half at the bottom): seat 0 is identity, seat 1 is mirrored */
export const viewCol = (seat, col) => (seat === 0 ? col : 2 - col);
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
export const ease = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };

/** where a seat stands, ready (cover = [col, depth] moves them sideways to where they expect the ball and a step back for a deep ball) */
export function standAt(g, seat, cover) {
  const z = cover ? colZ(g, cover[0]) * 0.8 : 0; const back = cover && cover[1] === 1 ? 0.35 : cover ? -0.35 : 0;
  return { x: sideSign(seat) * (g.baseX + back * (g.id === 'tennis' ? 1.5 : 0.5)), z: z - handZ(seat) * 0.2 };
}
/** the point where the ball is struck: in front of the racket hand */
export const strike = (g, seat, stand) => ({ x: stand.x + toNet(seat) * g.racket * 0.9, y: g.hitY, z: stand.z + handZ(seat) });
/** where a ball aimed at (col, depth) on `receiver`'s half first bounces */
export const landing = (g, receiver, col, depth) => ({ x: sideSign(receiver) * g.halfLen * (depth ? 0.8 : 0.3), y: g.floor + g.ballR, z: colZ(g, col) });
/** how far into the flight a point lies: apex lift of a shot. A lob goes high, a smash is flat and fast, a drop is soft */
export const apexOf = (g, shot, serve) => g.apex * ({ lob: 2.0, smash: 0.25, drop: 0.7, push: 0.7, slice: 0.6, kick: 1.3, flat: 0.45, topspin: 0.9, loop: 0.9, drive: 0.55, spin: 0.7, short: 0.5, long: 0.8 }[shot] ?? 0.8) + (serve ? 0.1 : 0);
export const flightMs = (pace) => Math.round(1150 - 650 * Math.max(0, Math.min(1, pace ?? 0.5)));

/** ball position on a path of [{ a:[x,y,z], b:[x,y,z], apex, w }] at u in 0..1 (w = share of the time); parabolic arc per segment */
export function ballAt(path, u) {
  const tot = path.reduce((s, p) => s + p.w, 0); let t = clamp01(u) * tot;
  for (let i = 0; i < path.length; i++) { const p = path[i]; if (t <= p.w || i === path.length - 1) { const k = clamp01(t / p.w); return { x: lerp(p.a[0], p.b[0], k), y: lerp(p.a[1], p.b[1], k) + 4 * p.apex * k * (1 - k), z: lerp(p.a[2], p.b[2], k), seg: i }; } t -= p.w; }
  const l = path[path.length - 1]; return { x: l.b[0], y: l.b[1], z: l.b[2], seg: path.length - 1 };
}

/**
 * One server event -> one beat. ctx = { sport, stands: [stand0, stand1] (where the two athletes are now), pace(shot) -> 0..1 }
 * Beat types: swing (a stroke, ball in the hitter's hand), flight (ball arcs to the landing cell and on to the receiver or past them), error (net or out), cheer, pause, none
 */
export function beatFor(ev, ctx) {
  const g = GEOM[ctx.sport]; const st = ctx.stands;
  if (ev.k === 'send') return { type: 'swing', seat: ev.hitter, serve: !!ev.serve, shot: ev.shot, dur: ev.serve ? 760 : 360 };
  if (ev.k === 'resolve') {
    const h = ev.hitter, r = ev.receiver; const a = strike(g, h, st[h]); const land = landing(g, r, ev.aim, ev.depth); const dur = flightMs(ctx.pace(ev.shot, ev.serve));
    const cover = standAt(g, r, ev.cover); const ball = [land.x, land.y, land.z];
    // the receiver slides to the cover cell at once, then (if they got it) to the ball, and lunges by how far it was
    const goal = { x: cover.x, z: land.z - handZ(r) };
    const stretch = Math.min(1, Math.abs(goal.z - cover.z) / (g.lane * 1.6) + (1 - (ev.reach ?? 1)) * 0.4);
    const endBall = ev.returned ? [strike(g, r, goal).x, g.hitY - 0.1, strike(g, r, goal).z] : [land.x + sideSign(r) * (g.halfLen * 0.9 + 1.2), g.floor + g.ballR + 0.5, land.z + (land.z >= 0 ? 0.6 : -0.6)];
    const path = [{ a: [a.x, a.y, a.z], b: ball, apex: apexOf(g, ev.shot, ev.serve), w: 0.55 }, { a: ball, b: endBall, apex: ev.returned ? apexOf(g, 'drive') * 0.45 : g.apex * 0.4, w: 0.45 }];
    return { type: 'flight', hitter: h, receiver: r, shot: ev.shot, serve: !!ev.serve, returned: !!ev.returned, path, dur, coverStand: cover, goalStand: goal, stretch, bounceAt: 0.55 };
  }
  if (ev.k === 'error') {
    const h = ev.hitter; const a = strike(g, h, st[h]); const dir = toNet(h); const net = ev.why === 'net';
    const b = net ? [0 - dir * 0.02, g.floor + g.netTop * 0.55, a.z * 0.7] : [dir * (g.halfLen + 0.9), g.floor + 0.05 + g.ballR, a.z + (a.z >= 0 ? 0.5 : -0.5)];
    return { type: 'error', seat: h, why: ev.why, serve: !!ev.serve, path: [{ a: [a.x, a.y, a.z], b, apex: net ? 0.12 : g.apex, w: 1 }], dur: 700 };
  }
  if (ev.k === 'fault') return { type: 'pause', dur: 350 };
  if (ev.k === 'point') return { type: 'cheer', winner: ev.winner, why: ev.why, dur: 1100 };
  return { type: 'none', dur: 0 };
}

/** pose parameters (the athlete rig in sports3d.js): lean (rad, forward), twist (rad), armR / armL (rad, 0 hangs down, + swings forward and up, pi = straight up), crouch (m), hop (m), stride (leg swing rad) */
export const READY = { lean: 0.08, twist: 0, armR: 0.5, armL: 0.35, crouch: 0.07, hop: 0, stride: 0 };
const mix = (a, b, t) => { const o = {}; for (const k of Object.keys(READY)) o[k] = lerp(a[k] ?? READY[k], b[k] ?? READY[k], t); return o; };
/** a stroke at progress u 0..1: wind up, hit at u = 0.5, follow through. Serves toss and reach up, smashes go overhead, ping pong strokes are short and low */
export function strokePose(sport, shot, serve, u) {
  const tt = sport === 'tennis'; const over = serve || shot === 'smash';
  let a, b;
  if (over) { a = { lean: -0.25, twist: -0.4, armR: tt ? -0.9 : -0.4, armL: 2.9, crouch: 0.12 }; b = { lean: 0.38, twist: 0.5, armR: tt ? 2.7 : 1.2, armL: 0.2, crouch: 0, hop: tt ? 0.18 : 0.05 }; }
  else if (shot === 'lob') { a = { lean: 0.05, twist: -0.4, armR: tt ? -0.6 : -0.2, crouch: 0.18 }; b = { lean: -0.12, twist: 0.35, armR: tt ? 2.0 : 1.0, crouch: 0, hop: 0.03 }; }
  else if (shot === 'drop' || shot === 'push' || shot === 'slice' || shot === 'short') { a = { lean: 0.12, twist: -0.25, armR: tt ? 0.1 : -0.1, crouch: 0.14 }; b = { lean: 0.3, twist: 0.25, armR: tt ? 1.1 : 0.9, crouch: 0.16 }; }
  else { a = { lean: 0.0, twist: -0.55, armR: tt ? -1.2 : -0.7, crouch: 0.1 }; b = { lean: 0.22, twist: 0.5, armR: tt ? 1.5 : 1.0, crouch: 0.04, stride: 0.15 }; }
  if (u < 0.45) return mix(READY, a, ease(u / 0.45));            // wind up
  if (u < 0.6) return mix(a, b, ease((u - 0.45) / 0.15));        // the hit: quick
  return mix(b, READY, ease((u - 0.6) / 0.4));                   // follow through and recover
}
/** a lunge for a ball at stretch 0..1 (0 = within reach, 1 = flat out) */
export const lungePose = (stretch, sport) => ({ lean: 0.2 + 0.45 * stretch, twist: 0.25, armR: sport === 'tennis' ? 1.35 : 1.0, armL: -0.7, crouch: 0.08 + 0.3 * stretch, hop: 0, stride: 0.5 * stretch });
export const cheerPose = (u) => ({ lean: -0.1, twist: 0, armR: 2.9, armL: 2.7, crouch: 0, hop: 0.12 * Math.abs(Math.sin(u * Math.PI * 3)), stride: 0 });
export const slumpPose = () => ({ lean: 0.4, twist: 0, armR: 0.1, armL: 0.1, crouch: 0.1, hop: 0, stride: 0 });
export const idlePose = (t, seed = 0) => ({ ...READY, crouch: READY.crouch + 0.02 * Math.sin(t * 2.2 + seed), lean: READY.lean + 0.02 * Math.sin(t * 1.7 + seed), armR: READY.armR + 0.06 * Math.sin(t * 2.6 + seed) });
export { mix as mixPose };

/** the beats for a batch of server events, in order. `track` carries the athletes' positions between events */
export function beatsFor(sport, events, stands, pace) {
  const ctx = { sport, stands: [{ ...stands[0] }, { ...stands[1] }], pace }; const out = [];
  for (const ev of events) { const b = beatFor(ev, ctx); b.ev = ev; out.push(b); if (b.type === 'flight') ctx.stands[b.receiver] = b.returned ? { ...b.goalStand } : { ...b.goalStand }; else if (b.type === 'cheer') { ctx.stands[0] = standAt(GEOM[sport], 0); ctx.stands[1] = standAt(GEOM[sport], 1); } }
  return out;
}
/** a harmless made-up rally for tables you only watch (nobody sees the real log): the same shape as server events, `rnd` gives 0..1 */
export function ambientEvents(sport, n, rnd, firstHitter = 0) {
  const ev = []; let h = firstHitter; const sh = sport === 'tennis' ? ['flat', 'topspin', 'slice'] : ['push', 'drive', 'loop'];
  for (let i = 0; i < n; i++) { const r = 1 - h; const shot = sh[(rnd() * sh.length) | 0]; const serve = i === 0; ev.push({ k: 'send', hitter: h, shot: serve ? (sport === 'tennis' ? 'kick' : 'long') : shot, serve });
    const last = i === n - 1; ev.push({ k: 'resolve', hitter: h, receiver: r, shot: serve ? 'long' : shot, serve, aim: (rnd() * 3) | 0, depth: rnd() < 0.5 ? 0 : 1, cover: [(rnd() * 3) | 0, 1], reach: last ? 0.3 : 0.8 + 0.2 * rnd(), returned: !last }); h = r; }
  ev.push({ k: 'point', winner: 1 - h, why: 'winner' }); return ev;
}

/** the text of one server rally event from the point of view of seat `me` (names = [seat 0 name, seat 1 name], labels = shot id -> label) */
export function eventText(ev, me, names, labels = {}) {
  const who = (s) => (s === me ? 'You' : '@' + (names[s] || '?')); const sh = (id) => (labels[id] || id || 'shot').toString().toLowerCase();
  if (ev.k === 'resolve') return `${who(ev.hitter)} ${ev.serve ? 'served' : 'hit'} a ${sh(ev.shot)} (${ev.quality}). ${ev.returned ? `${who(ev.receiver)} got it back.` : `${who(ev.receiver)} could not reach it.`}`;
  if (ev.k === 'error') return ev.serve ? `${who(ev.hitter)} ${ev.why === 'net' ? 'served into the net' : 'served long'}: fault.` : `${who(ev.hitter)} sent it ${ev.why === 'net' ? 'into the net' : 'out'}.`;
  if (ev.k === 'fault') return `Fault. ${who(ev.hitter)} has a second serve.`;
  if (ev.k === 'point') return `Point to ${who(ev.winner)}${ev.why === 'ace' ? ' (ace!)' : ev.why === 'double fault' ? ' (double fault)' : ev.why === 'winner' ? ' (winner)' : ev.why === 'error' ? ' (error)' : ''}.`;
  if (ev.k === 'score') return `Score: ${ev.score?.text || ''}`;
  if (ev.k === 'cap') return 'Match length limit reached: decided on the score.';
  return '';
}
export const qualityLabel = (q) => (q >= 0.85 ? 'Perfect' : q >= 0.6 ? 'Good' : q >= 0.35 ? 'OK' : 'Poor');
