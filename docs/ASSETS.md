# On-demand asset loading (10 Oct 2026, approved by Sherif)
**Goal:** do not download everything at the start. Ad images (the biggest files in the game) are fetched only when a board is near the player, one or two at a time, and are released again when the player has moved far away and memory is tight.

## What is built
- `client/src/assetcache.js`: a small generic cache. `request(key, distance)` every few hundred ms; nearest first; at most 2 downloads at once (`maxConcurrent`); failed loads retry after 3 s, 10 s, 30 s then stop until the player comes back; when over the byte budget, entries farther than `keepRadius` are evicted farthest first. Nothing within `keepRadius` is ever evicted. Pure logic, 7 unit tests.
- `client/src/ads-client.js` now asks the cache for the creatives on boards within 150 m (current and next rotation window) instead of loading every image when the ad snapshot arrives. A board whose image is not loaded shows the plain "house ad" board, as before. A released image takes its board back to the house ad until it is needed again.
- **Impressions:** a board counts as viewable only when its image is actually loaded (evidence is not collected otherwise). Server rules are unchanged.
- Numbers (ESTIMATE, to tune with real phone tests): load radius 150 m, keep radius 260 m, budget 24 MB decoded (about 6 images at 1024x512 plus mipmaps), 2 concurrent.
- Server already sends `Cache-Control: public, max-age=3600` for creatives, so a returning player usually reads from the browser cache.

## Not built
- Server-side small and large image variants (needs an image-processing library; not added). Uploads are still limited to 1 MB and 4096 px by the ad rate card.
- On-demand loading for interiors, audio and city packs (no such files exist yet: interiors and props are generated from code). The cache is generic, so the multi-city and radio items can use it.
- Prefetch along the road for a driving player (the 150 m radius already covers about 10 s at driving speed; not tuned).
- CDN, WebP re-encoding.

## Tests
`tests/assetcache.test.js` (7). `scripts/assets-smoke.mjs`: spawn shows only the nearby images requested; walking to a far board loads its image; with a tiny budget the first board's image is evicted and the board shows the house ad; it reloads on return. Screenshot `screenshots/*-assets-near-board.png`.
