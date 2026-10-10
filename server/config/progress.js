// PROGRESSION CONFIG (queue batch 1, 10 Oct 2026): tutorial, daily and weekly missions, login streak, achievements and titles, seasons.
// Every number here is an ESTIMATE (marked) for Sherif to tune; none has been balance-tested with real players. Rewards are game money paid through the ledger
// from the FAUCET_MISSIONS system account and are capped per day and per week below, so missions can never out-earn real play by much.

// ---- 1) first-five-minutes tutorial (server-checked steps pay once; "client" steps only guide)
export const TUTORIAL = {
  enabled: true,
  reward: 1500,            // ESTIMATE: ₦ paid once when every server-checked step is done (a first shift pays about this much)
  minWalkM: 25,            // ESTIMATE: metres walked from where you started
  steps: [
    { id: 'walk', icon: '🚶', title: 'Walk around', touch: 'Drag on the left of the screen to walk. Walk about 25 metres.', desk: 'Use W A S D or the arrow keys to walk about 25 metres.', check: 'walk' },
    { id: 'map', icon: '🗺️', title: 'Open the map', touch: 'Tap the little map in the corner to open the big map.', desk: 'Press M or click the little map to open the big map.', check: 'ack' },
    { id: 'job', icon: '💼', title: 'Do your first shift', touch: 'Walk to a blue 💼 marker (Corner Mart is the easiest), tap it and start a shift.', desk: 'Walk to a blue 💼 marker (Corner Mart is the easiest), click it and start a shift.', check: 'shift_started' },
    { id: 'pay', icon: '💰', title: 'Collect your pay', touch: 'When the timer ends, tap the job marker again and collect your pay.', desk: 'When the timer ends, click the job marker again and collect your pay.', check: 'paid' },
    { id: 'eat', icon: '🍲', title: 'Buy something to eat or drink', touch: 'Visit Mama Put or Corner Mart and buy food. Watch the 🍲 bar.', desk: 'Visit Mama Put or Corner Mart and buy food. Watch the 🍲 bar.', check: 'bought' },
    { id: 'phone', icon: '📱', title: 'Open your phone', touch: 'Tap 📱 to see your wallet, jobs and games.', desk: 'Press P or click 📱 to see your wallet, jobs and games.', check: 'ack' },
    { id: 'home', icon: '🏠', title: 'Rent a place to stay', touch: 'Tap a green 🏠 house marker and rent a room.', desk: 'Click a green 🏠 house marker and rent a room.', check: 'home' }
  ],
  pollMs: 8000
};

// ---- shared caps for everything paid out by missions, streaks, tutorial and seasons (ESTIMATES)
export const CAPS = { perDay: 2500, perWeek: 12000, _note: 'ESTIMATE. Missions, streak and tutorial rewards together never pay more than this per game day / week (season prizes are not counted).' };

// ---- 4) daily and weekly missions + login streak
// A mission counts things the player did in the current game day (Lagos time) or week (Monday start), straight from the money ledger and chat table (see server/core/progress-metrics.js).
// Everyone sees the same missions on the same day (picked by a seeded shuffle of the pool). Metrics: tx = number of ledger entries with those reasons, sum = ₦ moved on your cash account with those reasons,
// chat = chat lines you sent, logins = different days you opened the game. All rewards and targets are ESTIMATES.
export const MISSIONS = {
  enabled: true,
  dailyCount: 3, weeklyCount: 3,
  daily: [
    { id: 'd_shifts',  title: 'Work 2 shifts',                  icon: '💼', metric: { k: 'tx', reasons: ['job_wage'] },                      target: 2,    reward: 400 },
    { id: 'd_eat',     title: 'Buy 2 things from shops',        icon: '🛒', metric: { k: 'tx', reasons: ['shop_purchase', 'shop_delivery'] }, target: 2,    reward: 300 },
    { id: 'd_earn',    title: 'Earn ₦3,000 from work',          icon: '💰', metric: { k: 'sum', reasons: ['job_wage'] },                     target: 3000, reward: 500 },
    { id: 'd_play',    title: 'Play a break game',              icon: '🎮', metric: { k: 'tx', reasons: ['casual_reward'] },                 target: 1,    reward: 350 },
    { id: 'd_travel',  title: 'Take a trip (keke, danfo, boat, flight)', icon: '🚌', metric: { k: 'tx', reasons: ['transport', 'boat_fare', 'flight_ticket', 'district_link'] }, target: 1, reward: 300 },
    { id: 'd_chat',    title: 'Say 3 things in chat',           icon: '💬', metric: { k: 'chat' },                                           target: 3,    reward: 200 },
    { id: 'd_stadium', title: 'Buy a stadium ticket',           icon: '🏟️', metric: { k: 'tx', reasons: ['stadium_ticket'] },                target: 1,    reward: 400 },
    { id: 'd_sports',  title: 'Win a sports hall prize',        icon: '🏓', metric: { k: 'tx', reasons: ['sports_prize'] },                  target: 1,    reward: 450 }
  ],
  weekly: [
    { id: 'w_shifts',  title: 'Work 10 shifts this week',       icon: '💼', metric: { k: 'tx', reasons: ['job_wage'] },                      target: 10,    reward: 2000 },
    { id: 'w_spend',   title: 'Spend ₦20,000 in shops',         icon: '🛍️', metric: { k: 'sum', reasons: ['shop_purchase', 'shop_delivery'] }, target: 20000, reward: 1500 },
    { id: 'w_play',    title: 'Play 5 break games',             icon: '🎮', metric: { k: 'tx', reasons: ['casual_reward'] },                 target: 5,     reward: 1500 },
    { id: 'w_travel',  title: 'Take 5 trips',                   icon: '🚌', metric: { k: 'tx', reasons: ['transport', 'boat_fare', 'flight_ticket', 'district_link'] }, target: 5, reward: 1200 },
    { id: 'w_days',    title: 'Open the game on 5 different days', icon: '📅', metric: { k: 'logins' },                                     target: 5,     reward: 1500 },
    { id: 'w_chat',    title: 'Say 20 things in chat',          icon: '💬', metric: { k: 'chat' },                                           target: 20,    reward: 1000 }
  ]
};
// Login streak: open the game on consecutive days. Claim today's bonus in the missions sheet (once a day). Missing a day starts again at day 1. After the last entry the list repeats.
export const STREAK = { enabled: true, rewards: [100, 100, 150, 150, 200, 250, 500], maxLookbackDays: 400 };

// ---- 5) achievements and titles
// An achievement is a LIFETIME counter reaching a target. Some give a TITLE (shown after the player's name in chat, over their head, and on their profile). The list order is the title rank:
// when a player has not picked a title, the highest-ranked one they earned is shown. Metric kinds: see server/core/progress-metrics.js. Titles are plain, friendly words (no real brands, no insults). All targets are ESTIMATES.
export const ACHIEVEMENTS = {
  enabled: true, evalEveryMs: 45000,
  list: [
    { id: 'first_pay',   icon: '💵', name: 'First pay',           desc: 'Collect pay from a job.',                    metric: { k: 'tx', reasons: ['job_wage'] },        target: 1 },
    { id: 'hustler',     icon: '💼', name: 'Hustler',             desc: 'Work 10 shifts.',                            metric: { k: 'tx', reasons: ['job_wage'] },        target: 10,  title: 'Hustler' },
    { id: 'workhorse',   icon: '🐎', name: 'Workhorse',           desc: 'Work 50 shifts.',                            metric: { k: 'tx', reasons: ['job_wage'] },        target: 50,  title: 'Workhorse' },
    { id: 'shopper',     icon: '🛍️', name: 'Shopper',            desc: 'Buy 10 things in shops.',                    metric: { k: 'tx', reasons: ['shop_purchase', 'shop_delivery'] }, target: 10, title: 'Shopper' },
    { id: 'commuter',    icon: '🚌', name: 'Danfo regular',       desc: 'Take 10 trips by keke, danfo or ride.',      metric: { k: 'tx', reasons: ['transport'] },       target: 10,  title: 'Danfo Regular' },
    { id: 'sailor',      icon: '⛵', name: 'Sea legs',            desc: 'Take a boat.',                               metric: { k: 'tx', reasons: ['boat_fare'] },       target: 1,   title: 'Sea Legs' },
    { id: 'flyer',       icon: '✈️', name: 'Jet setter',          desc: 'Fly to another city.',                       metric: { k: 'tx', reasons: ['flight_ticket'] },   target: 1,   title: 'Jet Setter' },
    { id: 'fan',         icon: '🏟️', name: 'Stadium regular',    desc: 'Buy 3 stadium tickets.',                     metric: { k: 'tx', reasons: ['stadium_ticket'] }, target: 3,   title: 'Stadium Regular' },
    { id: 'gamer',       icon: '🎮', name: 'Game head',           desc: 'Earn a reward in 10 break games.',                        metric: { k: 'tx', reasons: ['casual_reward'] },   target: 10,  title: 'Game Head' },
    { id: 'court',       icon: '🏓', name: 'Court champ',         desc: 'Win a sports hall prize.',                   metric: { k: 'tx', reasons: ['sports_prize'] },    target: 1,   title: 'Court Champ' },
    { id: 'champion',    icon: '🏆', name: 'Champion',            desc: 'Win 10 table games against other players.',  metric: { k: 'games_won' },                           target: 10,  title: 'Champion' },
    { id: 'gist',        icon: '💬', name: 'Gist master',         desc: 'Say 50 things in chat.',                     metric: { k: 'chat' },                                target: 50,  title: 'Gist Master' },
    { id: 'homeowner',   icon: '🏠', name: 'House proud',         desc: 'Have a place of your own to stay.',          metric: { k: 'home' },                                target: 1,   title: 'House Proud' },
    { id: 'faithful',    icon: '🔥', name: 'Faithful',            desc: 'Open the game 7 days in a row.',             metric: { k: 'streak_best' },                         target: 7,   title: 'Faithful' },
    { id: 'evergreen',   icon: '🌳', name: 'Evergreen',           desc: 'Open the game 30 days in a row.',            metric: { k: 'streak_best' },                         target: 30,  title: 'Evergreen' },
    { id: 'stylish',     icon: '💎', name: 'Fashionista',         desc: 'Own 3 jewelry or cap pieces.',               metric: { k: 'wear_owned' },                          target: 3,   title: 'Fashionista' },
    { id: 'bigfish',     icon: '🐟', name: 'Big fish',            desc: 'Hold ₦1,000,000 in cash and savings.',       metric: { k: 'wealth' },                              target: 1000000, title: 'Big Fish' },
    { id: 'chairman',    icon: '🎩', name: 'Chairman',            desc: 'Hold ₦20,000,000 in cash and savings.',      metric: { k: 'wealth' },                              target: 20000000, title: 'Chairman' },
    { id: 'crowned',     icon: '👑', name: 'Crowned',             desc: 'Own a crown.',                               metric: { k: 'wear_crown' },                          target: 1,   title: 'Crowned' }
  ]
};
