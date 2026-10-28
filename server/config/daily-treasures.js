// Daily treasures (Sherif, 28 Oct 2026). Game money only. Numbers marked ESTIMATE are defaults for Sherif to tune.
// Each Lagos day (resets at Lagos midnight) the server places up to `perDay` cash chests, plus ONE free Tesla Cybertruck chest.
// Placement is seeded by the day, so every server instance and restart shows the same spots. First player to reach one takes it.
export const DAILY_TREASURES = {
  enabled: true,
  perDay: 100,                         // hard maximum of cash chests per Lagos day (Sherif)
  value: {                             // each cash chest is worth ₦1M..₦10M (Sherif). Picked per chest from the seeded random.
    min: 1_000_000, max: 10_000_000, step: 100_000,
    // distribution: 'uniform' (every amount equally likely, average ₦5.5M -> ~₦550M/day if all 100 are found)
    // or 'bands': pick a band by weight, then uniform inside it, e.g. [{ min: 1e6, max: 3e6, w: 60 }, { min: 3e6, max: 6e6, w: 30 }, { min: 6e6, max: 1e7, w: 10 }]
    distribution: 'uniform', bands: []
  },
  // where the chests go (Sherif: 40% interiors, 10% street, 40% behind buildings; the remaining 10% he did not specify -> parks/open ground, ESTIMATE)
  split: { interior: 40, street: 10, behind: 40, open: 10 },
  // which Lagos district (Sherif: "more in Mainland"). ESTIMATE weights, percent.
  cities: { 'lagos-mainland': 50, 'lagos-island': 17, 'lagos-vi-ikoyi': 17, 'lagos-lekki': 16 },
  minGapM: 15,                         // outdoor chests on the same day are at least this far apart
  cybertruck: { enabled: true, model: 'cyber', city: 'lagos-mainland', kind: 'open',
    // garage full (balance.cars.garageSlots, 5): the claim is refused with GARAGE_FULL and the truck STAYS for anyone else (ESTIMATE rule, no cash equivalent)
    fullGarage: 'refuse' },
  reachM: 12,                          // pick-up range from the server's known position (same as the one-time treasures)
  maxSpeedMps: 25,                     // anti-teleport: between two daily finds in the same district you cannot have moved faster than this (ESTIMATE; the fastest car is ~19 m/s with slack)
  maxPerPlayerPerDay: 10,              // ESTIMATE anti-farm: one player can take at most this many daily chests per Lagos day (0 = no limit). The Cybertruck does not count.
  guests: false,                       // guests and bots cannot take daily chests (sign up first)
  seedSalt: 'naija-daily-treasure-v1'
};
