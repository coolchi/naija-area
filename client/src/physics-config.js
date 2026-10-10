// ALL movement-feel numbers in one place (physics and kinetics pass, 10 Oct 2026). Every value is a TUNING GUESS made without a human playing it (ESTIMATE): change them here, rebuild, feel it.
// Units: metres, seconds, radians. The client may never be faster than the server allows: `applyServerLimits` (below) lowers the top speeds to what /api/config says the server will accept,
// and tests/physics.test.js checks that the shipped numbers sit under server/config/balance.js `movement` (maxWalkSpeed 7, maxDriveSpeed 26, slack 1.6).
export const PHYS = {
  // ---- walking on foot
  walk: {
    walkSpeed: 5.2, runSpeed: 7,        // top speeds (run = Shift). runSpeed equals the server's maxWalkSpeed
    accel: 22,                          // m/s^2 while pushing: 0 to walking pace in about a quarter of a second
    decel: 30,                          // m/s^2 when you let go or turn back: a stop in about half a metre instead of instantly
    runBlendRate: 5,                    // 1/s: walk to run (and back) blends over about 0.2 s instead of snapping
    turnRate: 12,                       // 1/s: how fast the avatar swings to face where it is going
    stepLen: 1.9,                       // m of ground per footfall (so footstep rate follows speed: slow shuffle to quick patter)
    bobWalk: 0.07, bobRun: 0.11,        // m of head-bob at walking / running pace (scaled down at low speed)
    leanRun: 0.16,                      // rad: body leans into a run
    swayRun: 0.05,                      // rad: left-right sway
    stopEps: 0.05                       // m/s below which the avatar counts as standing still
  },
  // ---- driving (player car)
  car: {
    maxSpeed: 20, reverseMax: 6,        // m/s (the old fixed limits). Server clamp is 26 x 1.6
    accel: 12,                          // m/s^2 at a standstill, fading to 0 at maxSpeed (a real engine curve instead of a flat push)
    throttleRise: 4.5, throttleFall: 9, // 1/s: how fast the pedal "ramps" to the key (no instant full power)
    brakeDecel: 18,                     // m/s^2 on full brake: from 20 m/s stops in about 11 m
    reverseAccel: 5,
    rolling: 2.4, drag: 0.006,          // coasting: constant rolling resistance (m/s^2) + air drag (per m/s)
    handDecel: 9,                       // m/s^2 extra slowing from the handbrake (Space)
    wheelbase: 2.7,                     // m
    steerMax: 0.62, steerSpeedRef: 10,  // rad of wheel angle at a crawl; shrinks as 1/(1+(v/ref)^2): speed-dependent steering
    steerRise: 6, steerReturn: 9,       // 1/s: how fast the wheel turns to the key and straightens
    gripLat: 13,                        // m/s^2 of sideways grip: beyond this the car understeers (turns less than asked)
    gripRate: 11,                       // 1/s: how fast sideways sliding dies away on normal tyres
    gripRateHand: 1.7,                  // 1/s: with the handbrake the back lets go: long slides
    handYawBoost: 0.9,                  // extra turn-in with the handbrake (a flick)
    handGrip: 0.7,                      // grip multiplier with the handbrake
    scrub: 0.45,                        // fraction of sideways speed lost that also costs forward speed (tyre scrub: bends slow you)
    maxSub: 0.02,                       // s: largest integration step (stability)
    zoneCap: 9, zoneDecel: 7, zoneMargin: 3 // roundabouts: above zoneCap m/s you are slowed (zoneDecel m/s^2) inside the ring + margin. 0 cap = off
  },
  // ---- body motion shown on the car (visual only)
  susp: {
    rollK: 0.011, pitchK: 0.014,        // rad per m/s^2 of sideways / forward acceleration
    maxRoll: 0.09, maxPitch: 0.07,      // rad
    k: 70, c: 9,                        // spring and damper of the body (underdamped: it wobbles a little)
    bumpKick: 1.2, bumpY: 0.12,         // an impact kicks the body: m/s of vertical speed per m/s of impact, and the largest rise
    sub: 0.015
  },
  // ---- hitting things
  collide: {
    carRestitution: 0.25,               // bounce off a wall: 25% of the speed into the wall comes back out
    walkRestitution: 0,                 // on foot you do not bounce
    hitFriction: 0.18,                  // fraction of along-the-wall speed lost on a real impact
    slideDrag: 0.9,                     // 1/s: rubbing along a wall slows you gently (you slide, you do not stick)
    minImpact: 2.2,                     // m/s into a wall below which there is no shake or thud
    npcCars: true,                      // the player's car bumps the ambient traffic (client only: no damage, no money; crash rules stay on the server)
    npcR: 1.0, npcOffset: 1.3, selfR: 1.0, selfOffset: 1.3, npcRange: 9 // two circles per car (front and back)
  },
  // ---- camera
  camera: {
    followWalk: 7, followDrive: 5.5,    // 1/s: how tightly the camera follows (lower = lazier)
    backoffPerMs: 0.18,                 // m the camera pulls back per m/s of speed (you feel the speed)
    backoffMax: 5,
    lookAheadPerMs: 0.12, lookAheadMax: 2.4, // aim a little ahead of a fast car
    lookRate: 8,                        // 1/s: smoothing of the aim point
    shakePerMs: 0.028, shakeMax: 0.5,   // m of shake per m/s of impact, and its cap
    shakeDecay: 5.5, shakeHz: 38
  },
  // ---- being knocked back by an ambient vehicle (the SERVER still decides whether it is a hit)
  knock: {
    distance: 3,                        // m in total (same as before), now a quick slide instead of a teleport
    decay: 3.2,                         // 1/s: how fast the slide dies (first quarter second covers about 55%)
    hop: 0.55, tilt: 1.15,              // m the body is thrown up and rad it tips back, over `seconds`
    seconds: 0.9,                       // matches the stun time
    shake: 0.35                         // camera shake in m
  },
  // ---- boat and plane (visual only)
  boat: {
    bobA: 0.12, bobB: 0.07, bobHzA: 0.42, bobHzB: 0.97,
    rollWave: 0.035, pitchWave: 0.025,  // rad of wave rocking
    bankPerTurn: 0.55,                  // rad of lean per rad/s of turning
    maxBank: 0.22, turnRate: 1.4,       // the heading follows the course at most this fast (rad/s): no instant swing at phase changes
    pitchPerSpeed: 0.004
  },
  plane: {
    attitudeRate: 6,                    // 1/s: smoothing of what you see (roll, pitch, yaw)
    turbulence: 0.012                   // rad of gentle shiver in cruise
  },
  // ---- sound (quiet synth ticks through the existing ui.sfx)
  audio: { footsteps: true, footstepVol: 0.35, thud: true, thudVol: 0.9, footstepMinSpeed: 2.2 }
};
/** lower the client's top speeds to the server's limits (from /api/config `movement`), so prediction can never outrun what the server accepts */
export function applyServerLimits(movement, P = PHYS) {
  if (!movement) return P; const slack = movement.slack || 1; // the server accepts maxSpeed x slack; we stay at or under maxSpeed itself
  if (movement.maxWalkSpeed > 0) { P.walk.runSpeed = Math.min(P.walk.runSpeed, movement.maxWalkSpeed); P.walk.walkSpeed = Math.min(P.walk.walkSpeed, P.walk.runSpeed); }
  if (movement.maxDriveSpeed > 0) P.car.maxSpeed = Math.min(P.car.maxSpeed, movement.maxDriveSpeed); void slack; return P;
}
