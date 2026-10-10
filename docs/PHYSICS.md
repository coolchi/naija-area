# Physics and kinetics feel pass (10 Oct 2026)
Goal: movement and physical interaction should feel more real by **tuning and refining what exists**, not by adding big systems. Server rules are unchanged: the server clamps speeds (walk 7 m/s, drive 26 m/s, both x1.6 slack, `server/config/balance.js` `movement`), decides every hit, fare and ledger entry. Everything here is client-side feel.

## 1. Audit: what the game actually had before this pass
| Thing | Existed? | Details (files) |
|---|---|---|
| Walking | yes | `client/src/player.js`: instant start and stop at 5.2 m/s (7 with Shift), the avatar swings to face the direction, a `|sin|` hop of the body (0.09 m) while moving |
| Run | yes | Shift; a hard switch between two speeds |
| Driving the player's car | yes | flat acceleration to 20 m/s, reverse to 6, coasting 6 m/s^2, turn rate constant 1.9 rad/s above 5 m/s (a car turning as sharply at 20 m/s as at 5), no sideways slip, no handbrake |
| Collision with buildings | yes | circle-vs-box push-out against building boxes, island/creek boxes; a hit halved the speed every frame (felt like sticking) |
| Collision with props | **no** | lamps, palms, bins, signs are decoration only. Not added (see section 5) |
| Collision with other cars | **no** (before) | ambient traffic yields to the player but the player's car passed through them |
| Collision with pedestrians/NPCs | **no** | NPC walkers and other players' avatars are not obstacles. Not added (section 5) |
| Crash knock-back | yes | the server decides a hit (`/api/crash/*`, about 5%); the client then **teleported** the avatar 3 m and stunned it 0.9 s |
| Jumping | **no** | there is no jump input, no vertical velocity |
| Falling / gravity | **no** | everything lives on a flat ground plane at y = 0 (plane and boat are scripted paths). The only "vertical" motion is cosmetic (head-bob, plane climb) |
| Throwing / carrying / pushing objects | **no** | no throwable or movable object exists. Table football and the casual games are rule engines, not physics |
| Plane | yes, scripted | `flightpath.js` pure pose of time: taxi, roll, climb, banked circle. Banking existed; a small pitch jump at the climb-to-cruise change |
| Boat | yes, scripted | `boatpath.js`, smoothstep sail-in and crossing; a single sine bob; heading changed instantly between phases |
| Camera | yes | exponential follow, auto-yaw behind the car, no speed feel, no shake |
| Ambient traffic motion | yes | on rails along road loops on a shared server timeline, speed slowed in bends (`path.js` bend factor) and yielding (`yield.js`) |
| Autopilot (`route.js` `Auto`) | yes | drives routes with corner-aware speed |

**Per the brief nothing was invented.** There is no jump, fall, throw or object push in the game, and none was added (see section 5).

## 2. What changed
All numbers live in **one file: `client/src/physics-config.js`** (`PHYS`). Pure functions (no THREE, no clock, no randomness) are in `client/src/kinematics.js`; `player.js` calls them.
* **Walking:** acceleration (22 m/s^2) and deceleration (30 m/s^2) curves instead of instant start/stop (a stop in about half a metre); walk-to-run blends over about 0.2 s; analog stick strength scales speed; turning back is limited by the same acceleration.
* **Gait:** footfalls are tied to distance covered (one per 1.9 m), so slow walking is a slow patter and running is quicker; head-bob height grows with speed and settles smoothly when you stop; the body leans into a run and sways; quiet footstep ticks (`ui.sfx('step')`, switch off with `PHYS.audio.footsteps=false`).
* **Car momentum:** throttle ramps to the key (4.5/s), engine force fades toward top speed (so 0 to 20 m/s takes about 3 s), brakes 18 m/s^2 (20 m/s stops in about 10 m), rolling resistance and air drag when coasting, S brakes first and only then reverses.
* **Steering:** the wheel follows the key with a rate; its limit shrinks with speed (`steerLimit`); the tyres can only hold `gripLat` of sideways acceleration (understeer beyond it: the car turns less than asked); sideways slip is tracked (`lat`) and dies away at a grip rate; **Space = handbrake**: grip drops, turn-in is flicked, the back slides and lingers; scrubbing sideways speed also costs forward speed (bends slow you).
* **Roundabouts:** inside a roundabout ring plus margin the car is slowed gently (`zoneCap` 9 m/s, `zoneDecel` 7 m/s^2, set `zoneCap: 0` to disable). It is a soft limit, not a wall. Autopilot already slowed in corners.
* **Body motion (visual only):** the car body rolls out of bends, dips its nose under braking, squats on acceleration and bounces on a damped spring; ambient traffic cars lean and nose-dip from their own motion (the shared timeline is untouched).
* **Collisions:** hitting a building now **slides** along it (speed along the wall kept, a little rubbed off), bounces by `carRestitution` 0.25 (on foot 0), loses speed on impact, shakes the camera and plays a quiet thud (rate limited). The player's car also **bumps ambient traffic** (two circles per car). This is client feel only: no damage, no money, no server call. Crash rules stay server-side.
* **Pedestrian-hit knock-back:** still only after the server says "hit". The 3 m teleport became a **0.3 s slide** (decaying), a hop of 0.55 m, a backward tip of 1.15 rad over the 0.9 s stun, camera shake. First 250 ms covers 55% of the distance, which keeps it under the server clamp (tested at every sample phase).
* **Camera:** frame-rate independent follow (lazier when driving), pulls back and looks ahead with speed, shakes on impacts and knock-backs (shake is applied and removed each frame, so it never accumulates).
* **Plane:** the climb-to-cruise pitch jump is removed in `flightPose`; what you see is a smoothed attitude plus a faint shiver in cruise. **Boat:** two-wave bob and rock; the heading now follows the course at a limited turn rate and banks into turns (no instant swing at phase changes).
* **No rubber-banding:** the client never exceeds `min(PHYS top speed, server limit)`. `GET /api/config` now returns `movement {maxWalkSpeed, maxDriveSpeed, slack}` and `applyServerLimits` lowers the client's top speeds to it. The client still sends the same positions every 250 ms.

## 3. Tuning
Edit `client/src/physics-config.js`, run `npm run build`, reload. Keys: W/S throttle and brake, A/D steer, **Space handbrake**, Shift run. Every value is an ESTIMATE guessed without playing. Most likely to want changes: `car.accel`, `car.gripLat`, `car.steerMax`, `car.zoneCap`, `camera.followDrive`, `collide.carRestitution`, `walk.accel/decel`.

## 4. Tests and measurements
* `tests/physics.test.js` (23 tests): config under the server clamp; walk acceleration/deceleration limits and stopping distance; run blend; gait; car throttle ramp, top speed, braking distance, steering vs speed, grip cap, handbrake slide, zone cap, frame-length stability; collision slide, bounce, corners, inside-box recovery, traffic circles; suspension; shake; knock-back; boat and plane continuity; determinism; a scripted 90 s drive and a run-plus-knock checked against the server clamp at every sample phase; and a **real server** heartbeat test where a simulated drive with handbrake slides and a run with a knock-back is sent as trails and the server never trims it (`suspicious` stays 0) and follows within 5 cm.
* `scripts/physics-smoke.mjs` (headless Chrome, real server): walking ramps and tops out at 7.00 m/s (clamp 7); driving ramps (first sample 0.3 m/s), handbrake slide up to 6 m/s sideways, body roll; driving at a building never ends inside it, shakes the camera and loses speed; a knock-back slides about 3 m with the biggest single-frame step 0.6 m (a teleport would be 3 m); the server's `suspicious` counter does not move during the knock-back.

## 5. Not done, and questions for Sherif
* **Jump / fall / throw / push objects:** do not exist; not added. A jump would be small (a vertical velocity and a hop on the avatar) but it changes how the server's flat-ground assumption, parking, interiors and the crash rules interact. **Ask:** do you want a jump? Throwing needs a throwable object type, hit rules and server validation: that is a system, not a tuning pass.
* **Collision with street props** (palms, lamps, bins) and **with pedestrians**: not present, not added. Props would need collider data per prop type; walking into NPCs raises questions about what a "push" means. **Ask** before building.
* Bumping ambient cars is client only and costs nothing; if you want bumps to count as crashes that is a rules change on the server.

## 6. NOT verified
Feel. Nobody has driven or walked this on a real phone with a real thumb; headless Chrome ran at about 15 fps. The numbers may be too heavy or too floaty, the handbrake may be too easy or too hard, and the footstep and thud ticks have not been heard by a human. Touch controls have no handbrake button (Space only). Frame-rate behaviour at 30 or 60 fps on real devices is covered by unit tests of the maths, not by playing.
