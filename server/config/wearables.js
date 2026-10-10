// WEARABLES CATALOGUE (jewelry store + cap store). One file: items, prices and sizes can be tuned here without touching code.
// ALL PRICES ARE PLACEHOLDER ESTIMATES in game money (no cash-out). For scale: the dearest car is about N15,000,000 and a delivery shift pays about N1,800.
//
// DESIGN RULE (Sherif, 10 Oct 2026): the bigger the piece, the more expensive it is, so you can see who has money at a glance.
//   * `size` is the visual scale multiplier on the avatar (1 = the base piece). Within one SLOT, a dearer item is NEVER smaller than a cheaper one
//     (tests/wearables.test.js checks it), and in the jewelry ladder every step up is visibly bigger.
//   * Sizes are CAPPED (MAX_SIZE per slot) so the avatar stays recognisable and the cost stays low: shared geometry, drops out at distance (client).
// SLOTS: one equipped item per slot: head, neck, wrist, ears, fingers, ankle.
// OPEN DECISIONS (assumptions, easy to change below): shop names are GENERIC working names; crowns are NOT unique (unlimited) unless `uniqueCrowns` is true;
//   resale is OFF (`resale.enabled`: false) to keep status value, and when switched on pays `resale.fraction` of the price paid; gifting is NOT built.
export const SLOTS = ['head', 'neck', 'wrist', 'ears', 'fingers', 'ankle'];
export const SLOT_LABEL = { head: 'Head', neck: 'Neck', wrist: 'Wrist', ears: 'Ears', fingers: 'Fingers', ankle: 'Ankle' };
export const MAX_SIZE = { head: 2.7, neck: 2.9, wrist: 2.9, ears: 2.9, fingers: 2.9, ankle: 2.4 };
export const WEAR_RULES = {
  uniqueCrowns: false,                  // true: only one player at a time may own a given crown (the others show "taken")
  resale: { enabled: false, fraction: 0.5 }, // selling back is off by default (status items keep their value); fraction of the price paid
  shops: {                              // the venue field `wearShop` in the city JSON points here
    jewelry: { name: 'Naija Bling', blurb: 'Chains, rings, earrings, bracelets, watches and anklets. Very expensive, and the bigger the piece, the more it costs.' },
    caps: { name: 'Cap Shop', blurb: 'Snapbacks, fila, bucket hats, agbada caps, fedoras and, for the very rich, crowns.' }
  }
};
// materials the client draws with (shared)
export const MATERIALS = { gold: 0xf2c230, rose: 0xe0a080, silver: 0xd5dce2, steel: 0x9aa3ab, diamond: 0xeaf6ff, black: 0x1b1b1f, cloth: 0x4a6fa5, red: 0xb3202a, green: 0x1b7a45, brown: 0x6b4a2b, white: 0xf4f4f0 };

const J = (id, slot, name, price, size, kind, mat, extra = {}) => ({ id, shop: 'jewelry', slot, name, price, size, kind, mat, ...extra });
const C = (id, name, price, size, kind, mat, extra = {}) => ({ id, shop: 'caps', slot: 'head', name, price, size, kind, mat, ...extra });
const E = (id, slot, name, price, size, kind, mat, extra = {}) => ({ id, shop: 'event', slot, name, price, size, kind, mat, limited: true, ...extra });
// jewelry price ladder (ESTIMATE): tier 1 N150,000 ... tier 6 N5,500,000; size steps up with every tier
export const WEARABLES = [
  J('neck_thin', 'neck', 'Thin gold chain', 150000, 1.0, 'chain', 'gold'),
  J('neck_rope', 'neck', 'Rope chain', 400000, 1.3, 'chain', 'gold'),
  J('neck_cuban', 'neck', 'Cuban link chain', 900000, 1.65, 'chain', 'gold'),
  J('neck_pendant', 'neck', 'Chain with pendant', 1800000, 2.0, 'pendant', 'gold'),
  J('neck_boss', 'neck', 'Big boss chain', 3500000, 2.4, 'pendant', 'gold', { gems: 'diamond' }),
  J('neck_iced', 'neck', 'Iced mega chain', 5500000, 2.8, 'pendant', 'diamond', { gems: 'diamond', shine: 1 }),
  J('wrist_band', 'wrist', 'Silver bracelet', 150000, 1.0, 'bracelet', 'silver'),
  J('wrist_gold', 'wrist', 'Gold bangle', 400000, 1.3, 'bracelet', 'gold'),
  J('wrist_watch', 'wrist', 'Steel watch', 900000, 1.65, 'watch', 'steel'),
  J('wrist_watch_gold', 'wrist', 'Gold watch', 1800000, 2.0, 'watch', 'gold'),
  J('wrist_watch_dia', 'wrist', 'Diamond watch', 3500000, 2.4, 'watch', 'gold', { gems: 'diamond' }),
  J('wrist_watch_mega', 'wrist', 'Iced mega watch', 5500000, 2.8, 'watch', 'diamond', { gems: 'diamond', shine: 1 }),
  J('ears_stud', 'ears', 'Stud earrings', 150000, 1.0, 'stud', 'gold'),
  J('ears_hoop', 'ears', 'Gold hoops', 400000, 1.3, 'hoop', 'gold'),
  J('ears_drop', 'ears', 'Drop earrings', 900000, 1.65, 'drop', 'gold'),
  J('ears_dia', 'ears', 'Diamond drops', 1800000, 2.0, 'drop', 'diamond', { gems: 'diamond' }),
  J('ears_bighoop', 'ears', 'Big gold hoops', 3500000, 2.4, 'hoop', 'gold', { gems: 'diamond' }),
  J('ears_chandelier', 'ears', 'Chandelier earrings', 5500000, 2.8, 'drop', 'diamond', { gems: 'diamond', shine: 1 }),
  J('ring_band', 'fingers', 'Plain band ring', 150000, 1.0, 'ring', 'silver'),
  J('ring_signet', 'fingers', 'Signet ring', 400000, 1.3, 'ring', 'gold'),
  J('ring_stone', 'fingers', 'Stone ring', 900000, 1.65, 'ring', 'gold', { gems: 'green' }),
  J('ring_double', 'fingers', 'Double stone ring', 1800000, 2.0, 'ring', 'gold', { gems: 'red' }),
  J('ring_knuckle', 'fingers', 'Knuckle ring', 3500000, 2.4, 'ring', 'gold', { gems: 'diamond' }),
  J('ring_mega', 'fingers', 'Mega diamond ring', 5500000, 2.8, 'ring', 'diamond', { gems: 'diamond', shine: 1 }),
  J('ankle_chain', 'ankle', 'Anklet chain', 150000, 1.0, 'anklet', 'gold'),
  J('ankle_beads', 'ankle', 'Beaded anklet', 400000, 1.3, 'anklet', 'rose'),
  J('ankle_gold', 'ankle', 'Gold anklet', 900000, 1.65, 'anklet', 'gold'),
  J('ankle_iced', 'ankle', 'Iced anklet', 1800000, 2.0, 'anklet', 'diamond', { gems: 'diamond', shine: 1 }),
  // caps: cheaper than jewelry at the low end (from N50,000), crowns the dearest things in the game
  C('cap_snapback', 'Snapback cap', 50000, 1.0, 'snapback', 'red'),
  C('cap_fila', 'Fila cap', 90000, 1.08, 'fila', 'cloth'),
  C('cap_bucket', 'Bucket hat', 150000, 1.16, 'bucket', 'green'),
  C('cap_agbada', 'Agbada cap (fila)', 280000, 1.25, 'agbada', 'brown'),
  C('cap_fedora', 'Fedora', 450000, 1.35, 'fedora', 'black'),
  // LIMITED FESTIVAL ITEMS (shop 'event'): sold only by the festival shops in server/config/events.js while the festival runs, never in the jewelry or cap shop, kept for good.
  // They sit OUTSIDE the status price ladder on purpose (a low price and a modest size: they show "I was there", not "I am rich"). Prices are ESTIMATES.
  E('fest_detty_hat', 'head', 'Detty December hat', 120000, 1.1, 'bucket', 'red'),
  E('fest_detty_band', 'wrist', 'Detty wristband', 80000, 1.0, 'bracelet', 'green'),
  E('fest_xmas_cap', 'head', 'Christmas cap', 100000, 1.1, 'fila', 'red'),
  E('fest_eid_cap', 'head', 'Sallah agbada cap', 100000, 1.1, 'agbada', 'white'),
  E('fest_adha_cap', 'head', 'Ileya cap', 100000, 1.1, 'fila', 'green'),
  C('crown_prince', 'Prince crown', 20000000, 1.8, 'crown', 'gold', { gems: 'red', crown: true }),
  C('crown_king', 'King crown', 40000000, 2.2, 'crown', 'gold', { gems: 'diamond', crown: true, shine: 1 }),
  C('crown_emperor', 'Emperor crown', 75000000, 2.6, 'crown', 'gold', { gems: 'diamond', crown: true, shine: 1 })
];
export const wearableById = Object.fromEntries(WEARABLES.map(w => [w.id, w]));
