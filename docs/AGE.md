# Real age checks (queue item 29): provider interface, stand-in only, NO VENDOR CHOSEN

Built 10 Oct 2026 on branch `track-b`. Replaces nothing yet: the 18+ tick box is still there and `NA_AGE_CHECK` defaults to `off`. This item builds the **socket**; a vendor plugs in later.

## What is stored (and what is not)
| Table | Columns | Why |
|---|---|---|
| `age_verifications` | `user_id`, `result` (`pass`/`fail`), `verified_at`, `provider` (service id) | the standing outcome |
| `age_sessions` | `user_id`, `session_ref` (the vendor's opaque id), `provider`, `state`, `created_at`, `done_at` | a check in progress; finished rows are **deleted after 30 days** |

**Never stored:** date of birth, name, ID number (NIN/BVN/passport), document or face images, address, phone, email. The provider interface can only return `{state, over18: true|false}`; `sanitize()` drops every other key a vendor sends, so personal data cannot reach the game by accident. A test has the stand-in vendor send a birth date, name, ID number and a photo, then scans the whole database for them. The vendor is given an opaque reference (a hash), never the username.

## Modes (`NA_AGE_CHECK`)
- `off` (default): tick box only, as today. A recorded **fail** still blocks buying.
- `payments`: buying ₦ needs a recorded **pass**.
- `play`: nobody can do anything but verify until a pass is recorded (server guard on every authenticated API call, plus a client gate before the world loads). Bots and public pages are exempt.

## Flow
`POST /api/age/start {consent:true}` (explicit consent or 400) -> vendor URL -> player does the check -> `POST /api/age/complete {ref}` or the vendor's signed webhook (`/api/age/webhook`, HMAC-SHA256 of the raw body in `x-age-signature` for the stand-in; a real vendor's scheme goes in its adapter) -> the server asks the vendor for the result (server to server) -> pass / fail / inconclusive. **The browser is never believed**: the result always comes from the provider.
- **pass:** permanent (a later fail can never overwrite it).
- **fail (confirmed under 18):** recorded; blocks buying in every mode and play in `play` mode; 24 h cool-down, 3 fails in 30 days = locked until an admin reopens (`POST /api/admin/age/:username/reopen`). These numbers are ESTIMATES and a policy decision.
- **inconclusive (unreadable ID, abandoned, expired):** nothing is recorded against the player; they can try again (5 starts a day).

## NDPA notes (Nigeria Data Protection Act 2023; NOT legal advice, for the lawyer)
Data minimisation (outcome + date only), purpose limitation (age gating only), explicit consent before a check, short retention, erasure (`POST /api/admin/age/:username/erase`), a processor contract with the chosen vendor (**not signed: no vendor**), cross-border transfer rules if the vendor processes outside Nigeria, and the data-controller registration with the NDPC (already on the launch list in plan 07). Open question: is age data of a *confirmed minor* something we must delete rather than keep as a block marker?

## Vendor options (kinds of method, NOT researched or priced here)
1. ID-number lookup (NIN or BVN) matched to a date of birth: fast, but needs the player to type a sensitive number and a vendor with access to the registry.
2. Document + selfie check with liveness.
3. Facial age estimation (no ID, an "over 18 with margin" answer).
4. Mobile-network or bank-based age signals.
Vendor names, prices, accuracy, Nigerian coverage, and their data-processing terms were **not** researched in this item. Sherif's decision is needed (and the lawyer's view on which method is acceptable for the 18+ duty).

## Safety rails
- The stand-in provider cannot be the age gate in production (`NODE_ENV=production` with mode not `off` refuses to start), and neither can the stand-in payments provider. Unknown `NA_AGE_PROVIDER` values refuse to start.
- The "pretend vendor" route is 404 for any provider that is not the stand-in.

## Adding a vendor later
Write `server/core/age/<vendor>.js` returning the interface in `providers.js` (`start`, `result`, `verifyWebhook`, `parseWebhook`), map the vendor's answer to `{state, over18}` only, register it in `createServer.js`, add contract tests with recorded vendor responses, and set `NA_AGE_PROVIDER`.

## NOT verified
No real vendor was called. The browser screens only ever ran with the stand-in. Real-phone behaviour, the redirect-back flow with a hosted vendor page, and vendor failure modes are untested.

## Files
`server/core/age/{index,providers,routes,sql}.js`, `server/config/age.js`, `client/src/age-ui.js`, `tests/age.test.js`, `scripts/age-smoke.mjs`.
