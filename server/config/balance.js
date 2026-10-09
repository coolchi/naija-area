// ALL NUMBERS HERE ARE PLACEHOLDERS / ESTIMATES for v0 play-testing. Not tuned, not benchmarked.
// In-game ₦ is a closed-loop fictional currency: no cash-out, no real-money value.
const env = process.env;
const num = (k, d) => (env[k] !== undefined && env[k] !== '' ? Number(env[k]) : d);

export const BALANCE = {
  _note: 'ESTIMATE / placeholder values. Tune with real play data.',
  startingCash: 5000,            // ESTIMATE
  guestStartingCash: 3000,       // ESTIMATE
  worldClock: { gameMinutesPerRealMinute: 15, startRealMs: Date.UTC(2026, 9, 1) }, // ESTIMATE: 96 real min = 1 game day
  needs: {
    // per real minute decay (ESTIMATE)
    hungerDecayPerMin: 0.35, energyDecayPerMin: 0.25, min: 0, max: 100,
    startHunger: 80, startEnergy: 90,
    starvationRentPenalty: 0
  },
  jobs: [
    // durationSec = shift timer; cooldownSec after claim before this job again; energyCost/hungerCost deducted at start
    { id: 'rider',   name: 'Delivery Rider',  desc: 'Pick up and drop off food orders around the district.', location: 'job_rider', wage: 1800, durationSec: 90,  cooldownSec: 30, energyCost: 12, hungerCost: 8,  minShiftsToUnlock: 0 },
    { id: 'shop',    name: 'Shop Assistant',  desc: 'Stock shelves and serve customers at the mini-mart.', location: 'job_shop',  wage: 1300, durationSec: 60,  cooldownSec: 20, energyCost: 8,  hungerCost: 6,  minShiftsToUnlock: 0 },
    { id: 'pos',     name: 'POS Agent',       desc: 'Run a POS kiosk: cash-in, cash-out, airtime.',          location: 'job_pos',   wage: 2600, durationSec: 150, cooldownSec: 45, energyCost: 15, hungerCost: 10, minShiftsToUnlock: 3 },
    { id: 'danfo',   name: 'Danfo Conductor', desc: 'Shout the route and collect fares on the yellow bus.',  location: 'job_bus',   wage: 3600, durationSec: 210, cooldownSec: 60, energyCost: 20, hungerCost: 12, minShiftsToUnlock: 6 },
    { id: 'vendor',  name: 'Market Trader',   desc: 'Sell provisions at a stall in the market.',             location: 'job_market',wage: 2200, durationSec: 120, cooldownSec: 40, energyCost: 14, hungerCost: 9,  minShiftsToUnlock: 1 }
  ],
  minNeedsToWork: { energy: 15, hunger: 10 },
  housing: {
    rentPeriodMs: num('NA_RENT_PERIOD_MS', 24 * 3600 * 1000), // ESTIMATE: rent due every 24h real time
    graceMissedPeriods: 2,         // evicted after this many missed rent ticks
    sellBackFraction: 0.7,         // ESTIMATE
    maxNameLen: 24, minNameLen: 3, knockTimeoutMs: 95000, knockDeclineCooldownMs: 60000, visitPermitMs: 10 * 60000, guestsByTier: { 1: 2, 2: 4, 3: 6 }, room: { 1: [6, 6], 2: [8, 8], 3: [10, 10] }, furnitureSellFraction: 0.5,
    // w x d in grid cells; layer 'floor' items (rug) may sit under others. ESTIMATE prices.
    furniture: [
      { id: 'tv',     name: 'Flat-screen TV', price: 6000, w: 2, d: 1, layer: 'object', cat: 'fun' },
      { id: 'sofa',   name: 'Sofa',           price: 4500, w: 3, d: 1, layer: 'object', cat: 'comfort' },
      { id: 'fridge', name: 'Fridge',         price: 5500, w: 1, d: 1, layer: 'object', cat: 'kitchen' },
      { id: 'rug',    name: 'Ankara rug',     price: 1500, w: 2, d: 2, layer: 'floor',  cat: 'decor' },
      { id: 'plant',  name: 'Potted plant',   price: 800,  w: 1, d: 1, layer: 'object', cat: 'decor' },
      { id: 'table',  name: 'Dining table',   price: 3800, w: 2, d: 2, layer: 'object', cat: 'kitchen' },
      { id: 'gen',    name: 'Small generator',price: 9000, w: 1, d: 1, layer: 'object', cat: 'power' }
    ]
  },
  shops: {
    // price channels (as in the Lagos Life research, 09_lagos_life_mechanics.md §4). Multipliers are ESTIMATES.
    channels: { market: { mult: 0.85, label: 'Market (cheapest, walk there)' }, supermarket: { mult: 1.0, label: 'Supermarket' }, delivery: { mult: 1.1, fee: 150, label: 'Delivery (anywhere) x1.1 + fee' } },
    hours: { shop_market: [7, 19], shop_mart: [6, 23], shop_canteen: [6, 22], shop_suya: [17, 24] }, // game-clock hours
    enforceHours: true
  },
  transport: {
    // fare = round((base + perM * distance) * rush). ESTIMATES. 'car' = your own starter car: fuel only.
    modes: { keke: { label: 'Keke', base: 100, perM: 1.1, speed: 14 }, danfo: { label: 'Danfo', base: 50, perM: 0.35, speed: 9 }, car: { label: 'My car', base: 0, perM: 0.25, speed: 20 } },
    rushHours: [[7, 10], [16, 19]], rushMult: 1.3, minSec: 3, maxSec: 6
  },
  land: { dayMs: num('NA_LAND_DAY_MS', 24 * 3600 * 1000), sellFraction: 0.95, maxPlots: 3, levyFraction: 0.06, risk: { low: 0.01, medium: 0.04, high: 0.10 } }, // ESTIMATES
  work: { task: { periodMs: 1800, width: 0.22, bonusPct: 25 } }, // timing mini-game: hit the green zone for +25% wage (ESTIMATE)
  bank: {
    dailyInterestRate: 0.005,      // ESTIMATE: 0.5%/day on savings
    interestPeriodMs: num('NA_INTEREST_PERIOD_MS', 24 * 3600 * 1000),
    maxSavingsForInterest: 200000  // ESTIMATE cap so savings can't print money forever
  },
  transfer: {
    minAmount: 100, maxPerTx: 20000, maxPerDay: 50000, // ESTIMATE
    maxPerHourCount: 8, minAccountAgeMs: num('NA_TRANSFER_MIN_AGE_MS', 5 * 60 * 1000), allowGuests: false
  },
  topup: { // MOCK ONLY. 'Test top-up' mints fake test ₦. Real Monipay integration is a later step.
    options: [1000, 5000, 20000], maxPerDay: 40000
  },
  chat: { maxLen: 140, minIntervalMs: 2000, radius: 80, keep: 100 },
  movement: { maxWalkSpeed: 7, maxDriveSpeed: 26, slack: 1.6 }, // m/s; server clamps teleports
  interact: { shopRadius: 16, jobRadius: 16, houseRadius: 22 },
  heartbeat: {
    // adaptive polling interval by concurrent users (ESTIMATE ladder; tune with real load)
    ladder: [
      { maxCcu: 50,    ms: 5000 },
      { maxCcu: 1000,  ms: 12000 },
      { maxCcu: 10000, ms: 20000 },
      { maxCcu: 50000, ms: 30000 },
      { maxCcu: Infinity, ms: 45000 }
    ],
    activeWindowMs: 60000, nearbyRadius: 260, maxNearby: 60, trailKeep: 20
  },
  leaderboard: { size: 20, cacheMs: 10000 },
  rate: { actionsPerMin: 120, authPerMin: 20, guestPerHourPerIp: 30 }
};
