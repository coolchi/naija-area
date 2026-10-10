// Jump, throw, push-object and prop/pedestrian collision numbers (Track G item 5, 10 Oct 2026). EVERY VALUE IS AN ESTIMATE / TUNING GUESS made without a human playing it.
// Shared by the server (throw validation) and the client (it imports server/core/physx.js, which reads this). Units: metres, seconds, radians.
// Answers to the questions in docs/PHYSICS.md section 5 are recorded in docs/PHYSICS_G.md.
export const PHYSX = {
  _note: 'ESTIMATE: nothing here is tuned. Change it, rebuild, feel it.',
  jump: {
    enabled: true,
    v0: 5.4, gravity: 17,          // apex = v0^2 / 2g = 0.86 m, airtime 0.64 s
    coyoteSec: 0.09, bufferSec: 0.12,   // jump just after leaving a ledge / press just before landing still counts
    airControl: 0.55,              // fraction of ground acceleration available in the air
    clearsPropHeight: 0.7,         // a prop (crate, bench, bin) no taller than this can be hopped over when you are above it
    footsteps: false               // no footstep ticks in the air
  },
  // static things you bump into on foot and in a car (circles). `h` = height; a jumping walker above `h` passes over.
  solids: {
    lamp: { r: 0.3, h: 6.4 }, palm: { r: 0.42, h: 8 }, ped: { r: 0.42, h: 1.8 },
    crate: { r: 0.5, h: 0.9 }, barrel: { r: 0.4, h: 1.0 }, ball: { r: 0.22, h: 0.44 }
  },
  walkerRadius: 0.5, carRadius: 1.2,
  // players do NOT collide with each other (nobody can block a doorway or grief); NPC walkers do, softly
  playersSolid: false,
  ped: { enabled: true, shove: 1.6, bumpSpeedLoss: 0.35, sidestepSec: 0.8 }, // a car bump slows you by this fraction; the walker steps aside for a moment
  // objects you can push (client-local: each player sees their own; they are NOT synced and reset when you reload)
  push: {
    enabled: true, perCluster: 3, maxTotal: 36,
    kinds: { crate: { mass: 9, friction: 5.5 }, barrel: { mass: 6, friction: 3.2 }, ball: { mass: 0.8, friction: 1.4 } },
    maxSpeed: 5, restitution: 0.35, carMassFactor: 3,
    resetAfterSec: 240
  },
  // throwing a ball (needs the server: others see it and it can bonk them, harmlessly)
  throw: {
    enabled: true,
    gravity: 14, minSpeed: 7, maxSpeed: 17, angle: 0.5, releaseHeight: 1.35, // launch speed from power 0..1; angle above the horizon (rad)
    ballR: 0.22, bounceRestitution: 0.55, groundGrip: 0.78, restSpeed: 0.6,   // horizontal speed kept per bounce; stops below restSpeed
    stepSec: 1 / 60, maxFlightSec: 7, visibleSec: 9,
    cooldownMs: 1200, perMinute: 24,
    hitRadius: 0.55, hitMaxHeight: 1.9,           // a ball passing within hitRadius of someone below this height bonks them
    victimCooldownMs: 15000,                      // the same person cannot be bonked again for this long
    nearRadius: 60, maxLive: 6,                   // who is told about a throw, and how many live throws a city keeps
    bonkStaggerSec: 0.5
  }
};
