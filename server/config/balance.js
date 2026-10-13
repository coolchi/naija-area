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
    { id: 'farm',    name: 'Farm Hand',       desc: 'Weed, plant and harvest on a village farm.',            location: 'job_farm',  wage: 1500, durationSec: 90,  cooldownSec: 30, energyCost: 14, hungerCost: 9,  minShiftsToUnlock: 0 },
    { id: 'vendor',  name: 'Market Trader',   desc: 'Sell provisions at a stall in the market.',             location: 'job_market',wage: 2200, durationSec: 120, cooldownSec: 40, energyCost: 14, hungerCost: 9,  minShiftsToUnlock: 1 }
  ],
  minNeedsToWork: { energy: 15, hunger: 10 },
  housing: {
    rentPeriodMs: num('NA_RENT_PERIOD_MS', 24 * 3600 * 1000), // ESTIMATE: rent due every 24h real time
    graceMissedPeriods: 2,         // evicted after this many missed rent ticks
    sellBackFraction: 0.7,         // ESTIMATE
    maxNameLen: 24, minNameLen: 3, knockTimeoutMs: 95000, knockDeclineCooldownMs: 60000, visitPermitMs: 10 * 60000, guestsByTier: { 1: 2, 2: 4, 3: 6 }, room: { 1: [6, 6], 2: [8, 8], 3: [10, 10] }, furnitureSellFraction: 0.5,
    // ---- per-type interiors (ALL sizes, guest caps and layouts are ESTIMATE placeholders). Grid in cells (1 cell = 1.4 m on screen); z=0 is the back wall, the door is on the front wall (z = d).
    // fixtures: built-in pieces (rendered by the client from primitives). blocks:true = those cells are reserved: Buy mode cannot place furniture there (server-checked). The doorway cells in front of the door are always reserved.
    // door: { x, w } = door position (cells) and width on the front wall. windows: { wall: 'back'|'left'|'right', at, w } in cells along that wall. wall/floor = default decor palette ids (the owner can repaint).
    types: {
      faceyou: { label: 'Face-me-I-face-you room', tier: 1, grid: [6, 5], maxGuests: 2, wall: 'sky', floor: 'tile', door: { x: 2, w: 2 }, windows: [{ wall: 'back', at: 3, w: 1 }], corridor: { depth: 2, doors: 4 },
        fixtures: [{ kind: 'bed', x: 0, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'wardrobe', x: 5, z: 0, w: 1, d: 2, blocks: true, what: 'wardrobe' }, { kind: 'curtain', x: 2, z: 0, w: 2, d: 1, blocks: false }, { kind: 'bucket', x: 4, z: 3, w: 1, d: 1, blocks: false }] },
      selfcon: { label: 'Self-contain studio', tier: 1, grid: [6, 7], maxGuests: 2, wall: 'white', floor: 'tile', door: { x: 2, w: 2 }, windows: [{ wall: 'back', at: 1, w: 1.4 }, { wall: 'right', at: 4, w: 1.2 }],
        fixtures: [{ kind: 'bed', x: 0, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'ensuite', x: 4, z: 0, w: 2, d: 2, blocks: true, what: 'bathroom' }, { kind: 'kitchenette', x: 2, z: 0, w: 2, d: 1, blocks: true, what: 'kitchenette' }] },
      flat2: { label: '2-bedroom flat', tier: 2, grid: [8, 8], maxGuests: 4, wall: 'peach', floor: 'oak', door: { x: 3, w: 2 }, windows: [{ wall: 'back', at: 1.5, w: 1.4 }, { wall: 'back', at: 6.5, w: 1.4 }, { wall: 'left', at: 5, w: 1.4 }],
        fixtures: [{ kind: 'bed', x: 0, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'bed', x: 6, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'partition', x: 3, z: 0, w: 2, d: 1, blocks: true, what: 'wall' }, { kind: 'kitchenette', x: 0, z: 5, w: 1, d: 3, blocks: true, what: 'kitchen', side: 'left' }] },
      bungalow: { label: 'Bungalow', tier: 2, rooms: 3, grid: [9, 8], maxGuests: 5, wall: 'sand', floor: 'terracotta', door: { x: 4, w: 2 }, veranda: true, windows: [{ wall: 'back', at: 1.5, w: 1.4 }, { wall: 'back', at: 7.5, w: 1.4 }, { wall: 'right', at: 4, w: 1.4 }],
        fixtures: [{ kind: 'bed', x: 0, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'bed', x: 7, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'kitchenette', x: 3, z: 0, w: 3, d: 1, blocks: true, what: 'kitchen' }] },
      duplex: { label: 'Duplex', tier: 3, grid: [10, 10], maxGuests: 6, wall: 'cream', floor: 'dark', door: { x: 4, w: 2 }, windows: [{ wall: 'back', at: 3, w: 1.6 }, { wall: 'back', at: 6, w: 1.6 }, { wall: 'left', at: 5, w: 1.6 }],
        fixtures: [{ kind: 'stairs', x: 8, z: 0, w: 2, d: 4, blocks: true, what: 'stairs' }, { kind: 'bed', x: 0, z: 0, w: 2, d: 3, blocks: true, what: 'bed' }, { kind: 'kitchenette', x: 0, z: 5, w: 1, d: 4, blocks: true, what: 'kitchen', side: 'left' }, { kind: 'landing', x: 6, z: 0, w: 4, d: 4, blocks: false }] },
      mansion: { label: 'Mansion', tier: 3, grid: [12, 12], maxGuests: 8, wall: 'white', floor: 'mosaic', door: { x: 5, w: 3 }, windows: [{ wall: 'back', at: 3, w: 1.8 }, { wall: 'back', at: 7, w: 1.8 }, { wall: 'left', at: 4, w: 1.8 }, { wall: 'right', at: 4, w: 1.8 }],
        fixtures: [{ kind: 'stairs', x: 9, z: 0, w: 3, d: 4, blocks: true, what: 'stairs', grand: true }, { kind: 'bed', x: 0, z: 0, w: 3, d: 3, blocks: true, what: 'bed', king: true }, { kind: 'pillar', x: 4, z: 5, w: 1, d: 1, blocks: true, what: 'pillar' }, { kind: 'pillar', x: 7, z: 5, w: 1, d: 1, blocks: true, what: 'pillar' }, { kind: 'bar', x: 0, z: 8, w: 1, d: 4, blocks: true, what: 'bar', side: 'left' }, { kind: 'chandelier', x: 5, z: 5, w: 2, d: 2, blocks: false }] }
    },
    defaultTypeByTier: { 1: 'faceyou', 2: 'flat2', 3: 'duplex' },
    // what a bought plot looks like as it is built on (staged placeholder, ESTIMATE days after purchase)
    plotStages: [{ id: 'pegged', label: 'Pegged and fenced', icon: '🪧', afterDays: 0 }, { id: 'foundation', label: 'Foundation dug', icon: '⛏️', afterDays: 3 }, { id: 'blocks', label: 'Blockwork going up', icon: '🧱', afterDays: 7 }, { id: 'roofed', label: 'Roofed and painted', icon: '🏠', afterDays: 14 }],
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
    modes: { keke: { label: 'Keke', base: 100, perM: 1.1, speed: 14 }, danfo: { label: 'Danfo', base: 50, perM: 0.35, speed: 9 }, car: { label: 'My car', base: 0, perM: 0.25, speed: 20 } /* replaced at runtime by cars.js: borrowed car or your active car */ },
    rushHours: [[7, 10], [16, 19]], rushMult: 1.3, minSec: 2, maxSec: 10
  },
  // ---- mood (a third meter): drifts back to baseline; nice things raise it. ESTIMATES.
  mood: { baseline: 50, decayPerMin: 0.05, happyAt: 75, happyBonusPct: 5, gameWin: 6, gameLoss: 1, gameDraw: 2, tv: 4, love: 5, lovedOwner: 3, hype: 2, greet: 1, sofa: 3, ride: 1 },
  // ---- venues + table games (GAME MONEY ONLY: no cash value, no cash-out). Stakes/timers/points are ESTIMATES.
  games: { stakes: [0, 100, 500], turnMs: 90000, waitMs: 5 * 60000, pointsWin: 3, pointsDraw: 1, maxStakedPerPairPerDay: 5, guestsMayStake: false, enterRadius: 16, leaveRadius: 40, sitPerMin: 10 },
  // ---- in-game phone (PHONE_V2). ALL numbers are ESTIMATE placeholders. Defaults follow 15_phone_system_spec.md section 14.
  phone: {
    enabled: process.env.PHONE_V2 !== 'false',            // default ON (flip off with PHONE_V2=false)
    maxFriends: 100, friendReqPerHour: 12, declinedCooldownMs: 24 * 3600000,
    textMax: 500, msgPerMin: 20, msgPerRecipientPerMin: 8, threadPage: 60,
    voice: { maxMs: 60000, minMs: 500, maxBytes: 600 * 1024, minBytes: 600, maxBytesPerMs: 20, perMin: 6, perDayBytes: 20 * 1024 * 1024, retentionMs: 24 * 3600000, mimes: ['audio/webm', 'audio/ogg', 'audio/mp4'] },
    call: { ringMs: 30000, maxMs: 60 * 60000, startPerMin: 5, signalPer10s: 80, signalMaxBytes: 16000, staleMs: 45000 },
    ice: { stun: (process.env.NA_STUN_URLS || 'stun:stun.l.google.com:19302').split(',').map(x => x.trim()).filter(Boolean), turnUrls: (process.env.NA_TURN_URLS || '').split(',').map(x => x.trim()).filter(Boolean), turnUser: process.env.NA_TURN_USERNAME || '', turnCred: process.env.NA_TURN_CREDENTIAL || '' }
  },
  // ---- clubs and salons (ALL fees/moods are ESTIMATE placeholders; game money only; clubs serve soft drinks only)
  leisure: {
    club: { danceCdMs: 5 * 60000, danceMood: 3, drinkFee: 300, drinkCdMs: 2 * 60000, drinkMood: 1, vipFee: 1000, vipCdMs: 30 * 60000, vipMood: 4, song: { slots: 5, note: 'Artist slots are planned (see 14_radio_tv_plan.md). Nothing to book yet.' } },
    salon: { cdMs: 10 * 60000, freshMs: 2 * 3600000, washMood: 1, washCdMs: 5 * 60000,
      styles: [{ id: 'trim', name: 'Low cut', fee: 800, mood: 3 }, { id: 'fade', name: 'Skin fade', fee: 1200, mood: 4 }, { id: 'braids', name: 'Braids', fee: 2500, mood: 5 }, { id: 'twist', name: 'Twists', fee: 1800, mood: 4 }, { id: 'gele', name: 'Gele tie', fee: 1500, mood: 4 }] } },
  // ---- casual break games (single player). ALL reward numbers are ESTIMATE placeholders, game money only, no cash-out. dailyCap is the most a player can EARN per day across all casual games.
  casual: { dailyCap: 300, startPerMin: 8, minAccountAgeMs: num('NA_CASUAL_MIN_AGE_MS', 5 * 60 * 1000), staleRunMs: 6 * 3600000,
    merge: { size: 4, scorePerNaira: 120, perRunCap: 60, minMoves: 20, maxMoves: 4000, minMsPerMove: 150 },
    memory: { pairs: 8, perRunCap: 40, perExtraMove: 4, floor: 5, minMsPerFlip: 250, maxMs: 30 * 60000 },
    word: { length: 5, maxGuesses: 6, rewards: [60, 50, 40, 30, 20, 10] },
    // match-3 ("Chop Am") and the traffic-jam puzzle ("Clear the Go-Slow"): reward numbers are ESTIMATE placeholders like the rest
    match3: { scorePerNaira: 60, perRunCap: 50, minMoves: 5, minMsPerMove: 700 },
    danfo: { perLevelBase: 8, perPar: 2, perRunCap: 45, perExtraMove: 2, floor: 4, minMsPerMove: 350, maxMoves: 200 },
    // word search (Find Am): one puzzle a day, ESTIMATE reward like the rest
    wordsearch: { perRunCap: 30, minMsPerWord: 4000, linesPerMin: 40 },
    // Suwe street hopscotch: ESTIMATE rewards, a run pays at the end (stages cleared and a house), small cap, inside the shared daily cap
    suwe: { perStage: 2, perHouse: 6, perRunCap: 30, startsPerMin: 8, slackMs: 600 } },
  // ---- cars (fictional models, placeholder ESTIMATE prices). 'borrowed' is what you drive until you buy one. fuel = perM per metre.
  cars: {
    borrowed: { name: 'Borrowed car', base: 60, perM: 0.35, speed: 10, mood: 0 },
    // Meco mechanic (ALL ESTIMATE placeholders). Condition falls with days since the last service (or purchase) down to a floor; a rough car (below roughBelow)
    // gives a smaller mood bump on rides. A service resets condition and gives a SHORT perk: cheaper fuel per metre and a small extra mood bump for perkMs.
    meco: { serviceFee: 20000, perkMs: 3 * 3600000, fareDiscount: 0.10, perkMood: 1, wearPerDay: 4, wearFloor: 40, roughBelow: 60, roughMoodPenalty: 2 },
    garageSlots: 3, resale: { firstDriveOffFraction: 0.12, perDayDepreciation: 0.01, floorFraction: 0.5 }, // value = paid * max(floor, 1 - firstDriveOff - perDay * ageDays)
    models: {
      kekere: { name: 'Kekere Hatch (used)', price: 900000, perM: 0.30, speed: 14, mood: 1, color: '#e9c46a', body: 'hatch' },
      oga: { name: 'Oga Sedan', price: 2500000, perM: 0.28, speed: 18, mood: 3, color: '#457b9d', body: 'sedan' },
      bigboy: { name: 'Big Boy SUV', price: 6000000, perM: 0.45, speed: 24, mood: 6, color: '#2b2d42', body: 'suv' },
      senator: { name: 'Senator Executive', price: 15000000, perM: 0.40, speed: 28, mood: 8, color: '#d62828', body: 'sedan' },
      // Exclusive pair. Prices set by Sherif: 10 billion and 20 billion. drive = free-roam top speed in m/s (under the server clamp).
      gwagon: { name: 'G-Wagon', price: 10000000000, perM: 0.55, speed: 34, drive: 23, mood: 12, color: '#161616', body: 'gwagon', exclusive: true },
      cyber: { name: 'Cybertruck', price: 20000000000, perM: 0.12, speed: 42, drive: 25, mood: 14, color: '#c5c9d0', body: 'cyber', exclusive: true }
    }
  },
  decor: { price: 500, walls: { cream: ['Cream', '#f1e7cf'], sky: ['Sky blue', '#9fd0ee'], mint: ['Mint', '#a8dcc0'], peach: ['Peach', '#f6c4a4'], lilac: ['Lilac', '#cdb7ea'], sand: ['Sand', '#d9c59a'], white: ['White', '#f6f6f2'], clay: ['Clay', '#c9876a'] },
    floors: { oak: ['Oak boards', '#b98a56'], tile: ['Cream tile', '#e5ddc7'], slate: ['Slate', '#6c7480'], terracotta: ['Terracotta', '#b5573a'], mosaic: ['Green mosaic', '#4f8f6b'], dark: ['Dark wood', '#5a3d27'] } },
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
  // trust & safety thresholds (ESTIMATES: tune from real report data)
  safety: { reportsPerHour: 10, maxBlocks: 100, autoHideAfter: 3, autoMuteAfter: 3, autoMuteMs: 10 * 60000, adminMuteMs: 60 * 60000, chatPerMin: 12, dmPerMin: 8, dmPerRecipientPerMin: 3, knockPerMin: 5, knockPerTargetPer10Min: 3, dupWindowMs: 20000 },
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
  // Crash rules (10 Oct 2026). EVERY number is a placeholder ESTIMATE. The server decides hits with a seeded RNG; ambient cars are never charged.
  ride: { enabled: true, name: 'Oya Ride', base: 300, perM: 1.6, rushMult: 1.4, speed: 13, minTripSec: 6, maxTripSec: 40, minDistanceM: 40, driverMinM: 140, driverMaxM: 300, driverSpeed: 11, rushEtaMult: 1.3, waitMs: 120000, cancelFee: 100, boardRangeM: 14, requestsPerMin: 6, _note: 'ESTIMATE placeholders. Generic in-game service name, no real brand.' },
  // Airport and flights (10 Oct 2026). EVERY number is a placeholder ESTIMATE.
  flight: { enabled: true, gateRadiusM: 70, departEveryMs: 90000, minLeadMs: 20000, slotsShown: 3, flightMs: 45000, cooldownMs: 120000, cancelRefundPct: 80, fares: { sameState: 4500, otherState: 9000 },
    // long routes (Track G item 7). A route entry belongs to a CITY: a flight to or from it costs at least `fare` and takes `flightFactor` times as long (the larger of the two cities' values wins). ESTIMATES, game money only.
    routes: { abuja: { fare: 24000, flightFactor: 1.4 }, 'port-harcourt': { fare: 21000, flightFactor: 1.3 } },
    // other players see planes: the departure circuit and the landing of flights in the airport's city, to anyone within viewRangeM of the apron (heartbeat field `pl`). ESTIMATE.
    planes: { enabled: true, viewRangeM: 700, resolveEveryMs: 1000, maxShown: 3, depVisibleS: 45, arrVisibleS: 24 }, // depVisibleS: takeoff + circuit + climb-out; arrVisibleS: the landing (keep in step with client/src/flightpath.js FLIGHT)
    _note: 'Fares and times are ESTIMATES. departEveryMs is real time between scheduled departures.' },
  // Road links between districts/cities (10 Oct 2026). ESTIMATE placeholders.
  link: { enabled: true, fare: 200, gateRadiusM: 16, perMin: 6, _note: 'ESTIMATE. A link gate moves you to the next district by road; the fare goes through the ledger.' },
  // Stadium (10 Oct 2026). ESTIMATE placeholders. Live scores are a TEST: see core/scores.js and docs/STADIUM.md.
  stadium: {
    ticketFee: 500, ticketMood: 4, seatMood: 6, seatCdMs: 120000, _note: 'ESTIMATE. A match-day ticket lasts until the end of the real UTC day and is paid through the ledger.',
    scores: { enabled: true, provider: 'mock', refreshMs: 300000, idleRefreshMs: 1800000, blockedRetryMs: 21600000, dailyCap: 100, reserve: 5, staleMs: 7200000, maxFixtures: 10, _note: 'ESTIMATE. One server job polls; viewers read the stored copy. 5 min cannot fit 100 calls a day, so the delay is stretched to spread the remaining calls over the rest of the UTC day.' },
  },
  // Call a boat (10 Oct 2026). ESTIMATE placeholders; the fare of each route is in the city JSON.
  boat: { enabled: true, stopRadiusM: 14, waitMs: 20000, boardWindowMs: 60000, cooldownMs: 20000, _note: 'ESTIMATE. The boat arrives after waitMs and waits boardWindowMs. You pay when you board.' },
  bus: { enabled: true, waitMinMs: 10000, waitMaxMs: 24000, rushMult: 1.5, callExpireMs: 90000, rangeM: 12, callsPerMin: 4, _note: 'ESTIMATE placeholders: wait times; the fare is the normal danfo fare (transport.modes.danfo)' },
  parking: { enabled: true, takeRangeM: 9, lotPadM: 1, maxParkedMs: 3 * 24 * 3600 * 1000, _note: 'ESTIMATE placeholders: lot fees live in the city JSON (carParks[].fee)' },
  crash: {
    enabled: true, hitChance: 0.05, rollMinMs: 5000, tokenMs: 8000, cooldownMs: 120000, graceMs: 3 * 60000, minSpeed: 3, seed: process.env.NA_CRASH_SEED || null,
    maxHealth: 100, regenPerMin: 3,                       // natural recovery, health points per minute
    onFoot: { min: 12, max: 22 },                         // health lost when hit while walking
    driving: { min: 4, max: 9 },                          // health lost by the driver when the car is hit
    car: { min: 10, max: 24 }, feePerCarPoint: 300,       // car health lost, and the crash cost in game money per point (only for a real player's own car)
    clinic: { feePerPoint: 20, minFee: 200, koFee: 800, koHealth: 35, koMood: 15, radius: 28 }, // treatment, and the "woke up at the clinic" rule at zero health
    repairPerPoint: 600,                                  // Meco repair, game money per car health point
    safe: { junctionExtra: 7, plazaExtra: 3, doorRadius: 11, spawnRadius: 14, clinicRadius: 20 }
  },
  leaderboard: { size: 20, cacheMs: 10000 },
  rate: { actionsPerMin: 120, authPerMin: 20, guestPerHourPerIp: 30 }
};
