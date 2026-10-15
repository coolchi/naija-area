// Bodyguard hire: HD Body Upgrade (rare high-res model) on day or year plans.
// Optional +₦10M Black G-Wagon escort (guard drives their own car behind you).
// Fees are ESTIMATE placeholders in game money (no cash-out).
export const BODYGUARD = {
  venueKind: 'armoury', // hire desk lives at the gun shop venue
  body: 'hd', // Mixamo high-res mesh (same as Phone → Life HD Body Upgrade)
  rare: true,
  dayFee: 100_000_000,      // ₦100 million / game-day
  yearFee: 10_000_000_000,  // ₦10 billion / game-year
  dayDays: 1,
  yearDays: 365,
  carFee: 10_000_000,       // +₦10 million once for Black G-Wagon escort
  carBody: 'gwagon',
  carColor: '#0a0a0a',
  carLabel: 'Black G-Wagon',
  // Fight defence while hired: cut punch damage and block purse theft
  damageScale: 0.3,
  blockPurse: true,
  defenceStrength: 35,
  names: ['Chinedu', 'Musa', 'Tunde', 'Ibrahim', 'Emeka', 'Suleiman', 'Kayode', 'Bayo', 'Osas', 'Farouk']
};
