# Mobile pass (queue batch 1, item 2)

Every number is in `client/src/quality-config.js` (graphics) or `server/lib/compress.js` (`COMPRESS`). They are **ESTIMATES**: nobody has measured them on a real low-end phone.

## Touch handbrake
A red **HAND** button (60 px) appears bottom-right, beside the car button, only while you are driving on a touch screen (`body.driving` + `pointer: coarse`). Hold it to hand-brake (the same `hand` input the Space key uses, so the same kinematics and the same server speed clamp apply). It lets go when you lift your finger, leave the button, switch app or the page is hidden.

## Other touch fixes
- Pinch with two fingers on the 3D view to zoom the camera (the old wheel zoom is unchanged).
- Round HUD buttons are at least 44 px on touch screens (the small ones were 38 px).
- The in-car radio bar moves to the bottom-left on touch screens (it used to cover the health bars and minimap buttons on a 390 px phone).
- The joystick, camera drag and the HAND button each keep their own finger (pointer ids), so you can steer and hand-brake at once.

## Graphics levels (More > Graphics)
| Level | Pixel ratio | View distance (far / fog) | Frame cap | Walkers |
|---|---|---|---|---|
| Lite | 1.0 | 330 / 300 | 30 fps | 14 |
| Normal | 1.25 | 480 / 430 | 60 fps | 26 |
| High | 1.75 | 900 / 520 | 60 fps | 36 |

**Auto** (default) picks at start: Lite for "data saver", 4 GB memory or less, 4 cores or fewer, or a small high-density touch screen; Normal for other touch devices; High otherwise. While on Auto, if the average frame rate stays under 24 fps for 3 seconds (after a 5 second warm-up) it drops one level (at most twice per session) and says so in a toast. Picking a level yourself turns the automatic drop off. The choice is remembered in the browser (`na_quality_v1`). Pixel ratio, view distance and frame cap change at once; walker count and anti-aliasing apply after a reload.

## Faster loading
- **Compression** (`server/lib/compress.js`, no new dependency): the game bundle goes from 983 KB to about 274 KB over the wire (brotli, or gzip); `style.css`, HTML and JSON replies over 1 KB are compressed too (`/api/city` 62 KB to about 10 KB). Compressed static files are kept in memory per file time; ETag gives 304s.
- **Preload** (`public/preload.js`): the page asks for `/api/config` and `/api/city` while the bundle is still downloading; the game uses those answers once and falls back to a normal request if one failed. The static demo build strips this (no server).
- A Cloudflare layer in front (see `docs/LAUNCH.md`) would do compression and caching on the edge too; this is the fallback when there is none.

## Not done (needs a human or a bigger change)
Splitting the bundle into lazily loaded chunks (radio, phone apps, sports and casual games would be the first candidates); texture compression; a measured low-end phone profile; haptics.
