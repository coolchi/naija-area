// SKINS CATALOGUE (Track G item 9, 10 Oct 2026): cosmetic looks for your avatar, your car and your home. GAME MONEY ONLY (no cash-out, no real-money sale yet: see docs/PASS_SKINS.md).
// ALL PRICES ARE PLACEHOLDER ESTIMATES. For scale: a delivery shift pays about N1,800 and the dearest car costs about N15,000,000.
//
// RULES (tests/pass-skins.test.js checks them):
//   * A skin is COSMETIC ONLY: it changes colours and a glow, never speed, health, fares, rewards or any other number.
//   * `sell: 'shop'` skins are bought in the Skins shop for game money. `sell: 'pass'` skins can only be won as battle pass rewards (never sold).
//   * Skins cannot be traded or listed on the marketplace.
//   * One skin per kind is worn at a time: kind `avatar` (shirt colour + optional glow ring), `car` (paint + optional underglow, on the car you drive), `home` (facade accent on the outside and
//     wall and floor colours inside, for the one home you own).
// Fields: id, kind, name, price (shop only), rarity (common | rare | epic), and the look:
//   avatar: { color } shirt hex, { glow } optional ring colour under the feet,
//           { body: 'hd' | 'casual' | 'casual_f' } optional high-res mesh upgrade (cosmetic only).
//           { gender: 'male' | 'female' } required profile gender for body upgrades (set at signup).
//   car:    { color } paint hex, { glow } optional underglow colour.
//   home:   { accent } facade door-frame hex, { wall, floor } interior hex.
export const KINDS = { avatar: 'Avatar', car: 'Car', home: 'Home' };
export const RARITY_ORDER = ['common', 'rare', 'epic'];
export const SKINS = [
  // ---- avatar
  { id: 'av_ankara_green',  kind: 'avatar', name: 'Ankara Green',    price: 12000,  rarity: 'common', sell: 'shop', color: '#1f8a4c' },
  { id: 'av_lagos_blue',    kind: 'avatar', name: 'Lagos Blue',      price: 12000,  rarity: 'common', sell: 'shop', color: '#2f6fd1' },
  { id: 'av_suya_red',      kind: 'avatar', name: 'Suya Red',        price: 14000,  rarity: 'common', sell: 'shop', color: '#c0392b' },
  { id: 'av_adire_indigo',  kind: 'avatar', name: 'Adire Indigo',    price: 30000,  rarity: 'rare',   sell: 'shop', color: '#2d2f7a', glow: '#6c7bff' },
  { id: 'av_coral_agbada',  kind: 'avatar', name: 'Coral Agbada',    price: 45000,  rarity: 'rare',   sell: 'shop', color: '#e8735a', glow: '#ffb199' },
  // Body upgrades (ESTIMATE face values; NA_PRICE_SCALE multiplies in production like guns).
  // Soldier Man reuses the HD mesh. Male bodies need a male profile; Casual Woman needs female (signup only).
  { id: 'av_hd_body',       kind: 'avatar', name: 'Soldier Man',     price: 10_000_000_000, rarity: 'rare', sell: 'shop', color: '#3d4a2e', body: 'hd', gender: 'male' },
  { id: 'av_casual_man',    kind: 'avatar', name: 'Casual Man',      price: 100_000_000,    rarity: 'rare', sell: 'shop', color: '#5a6b3a', body: 'casual', gender: 'male' },
  { id: 'av_casual_woman',  kind: 'avatar', name: 'Casual Woman',    price: 50_000_000,     rarity: 'rare', sell: 'shop', color: '#c45c26', body: 'casual_f', gender: 'female' },
  { id: 'av_gold_aso_oke',  kind: 'avatar', name: 'Gold Aso-oke',    price: 120000, rarity: 'epic',   sell: 'shop', color: '#d4a017', glow: '#ffe066' },
  { id: 'av_pass_sunrise',  kind: 'avatar', name: 'Sunrise Kaftan',  rarity: 'common', sell: 'pass', color: '#f2994a' },
  { id: 'av_pass_midnight', kind: 'avatar', name: 'Midnight Senator', rarity: 'rare',  sell: 'pass', color: '#14213d', glow: '#4cc9f0' },
  { id: 'av_pass_royal',    kind: 'avatar', name: 'Royal Purple Lace', rarity: 'epic', sell: 'pass', color: '#7b2cbf', glow: '#e0aaff' },
  // ---- car paint
  { id: 'car_lagoon_teal',  kind: 'car', name: 'Lagoon Teal',     price: 25000,  rarity: 'common', sell: 'shop', color: '#13a89e' },
  { id: 'car_danfo_yellow', kind: 'car', name: 'Danfo Yellow',    price: 25000,  rarity: 'common', sell: 'shop', color: '#f5c518' },
  { id: 'car_jollof_orange', kind: 'car', name: 'Jollof Orange',  price: 30000,  rarity: 'common', sell: 'shop', color: '#e8590c' },
  { id: 'car_midnight_neon', kind: 'car', name: 'Midnight Neon',  price: 80000,  rarity: 'rare',   sell: 'shop', color: '#10131f', glow: '#35f0ff' },
  { id: 'car_pearl_white',  kind: 'car', name: 'Pearl White',     price: 90000,  rarity: 'rare',   sell: 'shop', color: '#f4f1ea', glow: '#ffffff' },
  { id: 'car_gold_chrome',  kind: 'car', name: 'Gold Chrome',     price: 300000, rarity: 'epic',   sell: 'shop', color: '#c9a227', glow: '#ffd700' },
  { id: 'car_pass_sunset',  kind: 'car', name: 'Sunset Drive',    rarity: 'rare',  sell: 'pass', color: '#d9480f', glow: '#ff922b' },
  { id: 'car_pass_emerald', kind: 'car', name: 'Emerald Express', rarity: 'epic',  sell: 'pass', color: '#087f5b', glow: '#63e6be' },
  // ---- home
  { id: 'home_sky_blue',    kind: 'home', name: 'Sky Blue Frame',   price: 35000,  rarity: 'common', sell: 'shop', accent: '#4dabf7', wall: '#e7f5ff', floor: '#8d6e63' },
  { id: 'home_palm_green',  kind: 'home', name: 'Palm Green Frame', price: 35000,  rarity: 'common', sell: 'shop', accent: '#2f9e44', wall: '#ebfbee', floor: '#7a5c3e' },
  { id: 'home_terracotta',  kind: 'home', name: 'Terracotta Villa', price: 90000,  rarity: 'rare',   sell: 'shop', accent: '#d9480f', wall: '#fff0e6', floor: '#5c4033' },
  { id: 'home_marble_gold', kind: 'home', name: 'Marble and Gold',  price: 250000, rarity: 'epic',   sell: 'shop', accent: '#e0b400', wall: '#f8f9fa', floor: '#ced4da' },
  { id: 'home_pass_night',  kind: 'home', name: 'Midnight Loft',    rarity: 'rare', sell: 'pass', accent: '#7048e8', wall: '#2b2d42', floor: '#3d3b4f' },
  { id: 'home_pass_royal',  kind: 'home', name: 'Royal Palace',     rarity: 'epic', sell: 'pass', accent: '#f59f00', wall: '#fff4e6', floor: '#862e9c' }
];
export const skinById = Object.fromEntries(SKINS.map(s => [s.id, s]));
export const SKIN_RULES = { realMoney: { enabled: false, note: 'Selling skins for real money (Monipay) is NOT switched on. It waits for a lawyer\'s view on selling virtual items to players, including minors, and for the Monipay live keys.' } };
