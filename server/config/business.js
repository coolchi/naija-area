// Player-owned businesses (Mama Put, Barber, Shop, Car wash). GAME MONEY ONLY. EVERY NUMBER HERE IS AN ESTIMATE / PLACEHOLDER for play-testing, tuned on nothing.
// Money model: a business earns while you are away (lazily settled from the clock, at most `accrueCapHours` back). Revenue is paid by a faucet account, supplies, wages
// and upkeep go to a sink account, and the owner gets the difference in ONE ledger transaction when they collect. A per-business daily cap on the owner's net bounds inflation.
// Hours here are REAL hours (the game clock runs 15 game minutes per real minute, so a real hour is 15 game hours); `demand` is indexed by GAME hour 0 to 23.
export const BUSINESS = {
  _note: 'ESTIMATE: nothing here is tuned. Prices, incomes and caps are guesses to be changed after play-testing.',
  maxPerPlayer: 3,                 // one of each type at most, and no more than this many in all
  minAccountAgeMs: 30 * 60000,     // a brand-new account cannot buy a business (anti-abuse)
  guestsMay: false,                // guests (no password) cannot own a business: they may lose the account
  accrueCapHours: 24,              // a business stops earning after this long without a visit (you must come and collect)
  stepMinutes: 10,                 // settlement resolution (real minutes); a step uses the game hour at its middle
  dailyNetCap: 18000,              // most the owner can bank per business per UTC day, whatever the demand (ESTIMATE)
  sellBackFraction: 0.6,           // of everything paid for the business and its upgrades
  nameMax: 24, nameMin: 3,
  staffSkill: { 1: { label: 'Trainee', wagePerHour: 60, capacity: 0.2 }, 2: { label: 'Regular', wagePerHour: 100, capacity: 0.3 }, 3: { label: 'Expert', wagePerHour: 160, capacity: 0.4 } },
  soloCapacity: 0.4,               // an owner with no staff serves this fraction of the demand
  candidatesPerDay: 3,             // staff you may look at (the pool changes every game day, same for everybody in this business)
  staffNames: ['Tunde', 'Amaka', 'Bisi', 'Chidi', 'Femi', 'Ngozi', 'Kunle', 'Zainab', 'Emeka', 'Hauwa', 'Sade', 'Ibrahim', 'Yetunde', 'Obinna', 'Aisha', 'Segun', 'Ify', 'Dayo', 'Halima', 'Tobi'],
  types: {
    mamaput: { name: 'Mama Put', icon: '🍲', blurb: 'A buka serving rice, soup and swallow. Busy at mealtimes.', cost: 40000, upkeepPerHour: 100, suppliesFraction: 0.35, baseRevenuePerHour: 1800, weather: { rain: 1.15, storm: 0.8, flood: 0.7 },
      levels: [{ maxStaff: 2, mult: 1 }, { maxStaff: 4, mult: 1.5, upgrade: 30000 }, { maxStaff: 6, mult: 2.1, upgrade: 60000 }],
      demand: [0.1, 0.05, 0.05, 0.05, 0.1, 0.3, 0.7, 1, 0.9, 0.5, 0.4, 0.7, 1, 1, 0.7, 0.4, 0.5, 0.8, 1, 1, 0.8, 0.5, 0.3, 0.2] },
    barber: { name: 'Barbing Salon', icon: '💈', blurb: 'Fades, cuts and gist. Steady in the daytime, busy before the weekend.', cost: 25000, upkeepPerHour: 60, suppliesFraction: 0.15, baseRevenuePerHour: 1200, weather: { rain: 0.8, storm: 0.5, flood: 0.5 },
      levels: [{ maxStaff: 2, mult: 1 }, { maxStaff: 3, mult: 1.5, upgrade: 20000 }, { maxStaff: 5, mult: 2, upgrade: 40000 }],
      demand: [0, 0, 0, 0, 0, 0.05, 0.2, 0.4, 0.6, 0.8, 0.9, 0.9, 0.8, 0.8, 0.9, 1, 1, 0.9, 0.7, 0.4, 0.2, 0.1, 0, 0] },
    shop: { name: 'Provision Shop', icon: '🏪', blurb: 'Indomie, drinks, recharge cards and everything small. Open long hours.', cost: 60000, upkeepPerHour: 150, suppliesFraction: 0.5, baseRevenuePerHour: 3000, weather: { rain: 1.1, storm: 0.9, flood: 0.8 },
      levels: [{ maxStaff: 2, mult: 1 }, { maxStaff: 4, mult: 1.4, upgrade: 45000 }, { maxStaff: 6, mult: 1.9, upgrade: 90000 }],
      demand: [0.1, 0.05, 0.05, 0.05, 0.1, 0.3, 0.6, 0.8, 0.8, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.6, 0.7, 0.9, 1, 1, 0.8, 0.5, 0.3, 0.2] },
    carwash: { name: 'Car Wash', icon: '🚿', blurb: 'Foam, bucket and shine. Dry days only: rain keeps customers away.', cost: 35000, upkeepPerHour: 80, suppliesFraction: 0.2, baseRevenuePerHour: 1500, weather: { rain: 0.3, storm: 0.1, flood: 0.1 },
      levels: [{ maxStaff: 2, mult: 1 }, { maxStaff: 4, mult: 1.5, upgrade: 25000 }, { maxStaff: 5, mult: 2.1, upgrade: 55000 }],
      demand: [0, 0, 0, 0, 0, 0, 0.1, 0.4, 0.8, 1, 1, 0.9, 0.8, 0.9, 1, 1, 0.9, 0.6, 0.3, 0.1, 0, 0, 0, 0] }
  }
};
