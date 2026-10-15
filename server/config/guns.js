// Gun shop catalogue. Prices are ESTIMATE placeholders in game money (no cash-out).
// Range: ₦100 million to ₦2 billion. Stronger guns add more fight strength and punch damage.
// GENERIC names only (no real brands). Tune prices/strength here; shop code reads this file.
export const GUN_RULES = {
  shop: { name: 'Iron Gate Armoury', blurb: 'Licensed street arms. Buy a gun, keep it, and carry one at a time. Placeholder prices (ESTIMATE). Game money only.' },
  resale: { enabled: false, fraction: 0.4 }
};

const G = (id, name, price, strength, damageMult, blurb) => ({ id, name, price, strength, damageMult, blurb });

export const GUNS = [
  G('pistol_street', 'Street Pistol', 100_000_000, 12, 1.5, 'Entry piece. Loud enough to settle a small wahala.'),
  G('pistol_chrome', 'Chrome Pistol', 250_000_000, 20, 1.8, 'Polished and proud. Neighbours will notice.'),
  G('smg_compact', 'Compact SMG', 500_000_000, 32, 2.2, 'Fast and mean. For people who do not miss twice.'),
  G('rifle_tactical', 'Tactical Rifle', 1_000_000_000, 48, 2.6, 'Serious hardware. Strength talks for you.'),
  G('rifle_gold', 'Gold Assault', 1_500_000_000, 64, 3.0, 'Status and firepower. You paid for both.'),
  G('cannon_boss', 'Boss Cannon', 2_000_000_000, 80, 3.5, 'Top of the range. Nobody doubts who runs the street.')
];

export const gunById = Object.fromEntries(GUNS.map(g => [g.id, g]));
