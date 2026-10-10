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
