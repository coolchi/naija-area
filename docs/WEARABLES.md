# Jewelry store and cap store (queue item 34, built 10 Oct 2026)

Two shops on the Lagos Mainland south promenade: **Naija Bling Jewellers** (kiosk at x=180, opens 10:00 to 20:00) and **Cap Shop (caps and crowns)** (x=20, opens 9:00 to 20:00). Names are GENERIC working names (no real brands); change them in `server/config/cities/lagos-mainland.json` (or `tools/add-wearable-shops.mjs`).

## How it works
- **Catalogue = one file:** `server/config/wearables.js` (36 pieces: id, shop, slot, name, price, size, model kind, material, gems). Change a price or size there; nothing else needs touching. A test changes a price in config and checks the shop charges it.
- **Slots (one worn item each):** head, neck, wrist, ears, fingers, ankle. Jewelry = neck, wrist (bracelets and watches), ears, fingers, ankle. Caps and crowns = head.
- **Prices (ALL placeholders, ESTIMATE, game money only):** jewelry N150,000 to N5,500,000 in six steps; caps N50,000 to N450,000; crowns N20,000,000 (Prince), N40,000,000 (King), N75,000,000 (Emperor), the dearest things in the game (the dearest car is about N15,000,000, a delivery shift pays about N1,800).
- **Size shows price (Sherif's rule):** `size` is a visual scale (1.0 to 2.8; crowns 1.8 to 2.6). Inside a slot a dearer piece is never smaller (test), every jewelry step is at least 0.25 bigger (test), and the DRAWN surface area of the model also grows with price in every slot (test). Sizes are capped per slot (`MAX_SIZE`). Chains get thicker and grow pendants, watches get bigger faces and diamonds, hoops get wider, crowns get more and taller points.
- **Server side:** `server/core/wearables.js`. Buying needs you to be inside the open shop, posts one ledger transaction (reason `wearable`, ref = item id, to the shop sink, idempotent with the client's key), records ownership (`wearables_owned`) and equips the piece (`wearables_equipped`, one row per slot). Refused without touching money: not enough cash, already owned, wrong shop, closed, outside. Equip, take off and (optional) sell back are free.
- **Others see it:** the heartbeat carries `w: [item ids]` for each nearby player (only when they wear something), the shop's occupant list carries it, and the profile carries `wear` (worn items, count and value owned, a status line shown under More > Your look).
- **Client:** `client/src/wear-models.js` builds each piece from shared primitives and merges what you wear into ONE mesh (one draw call per player, cached per set). Pieces on players more than 45 m away are hidden. Interiors use new decor (`glassCase`, `capWall`, `crownPlinth` as the crowns station, `guard`) in `client/src/rooms.js`; the sheet is `client/src/wear-ui.js`.
- **Database:** tables `wearables_owned`, `wearables_equipped` (SQLite in `server/core/later-schema.js`, Postgres in `server/migrations/pg/0002_wearables.sql`; a test checks they match, and `npm run test:pg` runs them for real).

## Assumptions (all easy to change; Sherif to confirm)
1. **Shop names** are generic working names (real brand names were not approved for shops).
2. **Crowns are NOT unique** (unlimited copies). `WEAR_RULES.uniqueCrowns: true` makes each crown ownable by one player at a time (tested).
3. **No resale** by default (status keeps its value). `WEAR_RULES.resale = { enabled: true, fraction: 0.5 }` turns on selling back at a fraction of the price paid (tested).
4. **Gifting is not built.**
5. The price ladder above is a proposal.
6. Only the Mainland district has these shops (the wearables themselves work in every city).

## NOT verified
- How it looks and feels on a real phone (checked only in headless Chrome on software GL; screenshots `screenshots/wear-*.png`). A fully dressed Emperor crown is deliberately huge (about three times head width); tune `size` if it is too much.
- Performance with many dressed players (budget: at most about 520 triangles per piece, one draw call per player; not load-tested).
- Real-money value: none; everything is game money with no cash-out.
