// In-game events: night-only events (item 4) and calendar festivals (item 6) share this config. GAME MONEY ONLY. Every number is an ESTIMATE / placeholder.
// window.type 'night': game hours [from, to) (wraps past midnight), optionally only on every Nth game day. window.type 'dates': real calendar dates (month/day, UTC+1, ESTIMATE).
export const EVENTS = {
  _note: 'ESTIMATE: nothing here is tuned.',
  enabled: true,
  forced: [],                    // ids of events to switch on regardless of the clock (tests, admin)
  claimDailyCap: 3000,           // most game money events can hand out to one player per UTC day (a faucet cap, inside the economy)
  events: [
    { id: 'night_market', kind: 'night', name: 'Night Market', icon: '🌙', blurb: 'After dark the roadside stalls come out: suya, zobo, roasted corn. Limited stock each night.',
      window: { type: 'night', from: 21, to: 4 },
      shop: [
        { id: 'nm_suya', name: 'Night suya', price: 900, hunger: 35, mood: 5, stockPerNight: 150, limitPerPlayer: 3 },
        { id: 'nm_zobo', name: 'Cold zobo', price: 400, hunger: 8, mood: 4, stockPerNight: 200, limitPerPlayer: 3 },
        { id: 'nm_corn', name: 'Roasted corn and pear', price: 600, hunger: 25, mood: 3, stockPerNight: 120, limitPerPlayer: 2 }
      ] },
    { id: 'street_owambe', kind: 'night', name: 'Street Owambe', icon: '🎉', blurb: 'Every third night somebody throws a party on the street. Come and dance: a little cash and a mood lift, once a night.',
      window: { type: 'night', from: 22, to: 3, everyNthDay: 3, dayOffset: 1 },
      claim: { label: 'Join the dance', mood: 10, cash: 500 } }
  ]
};
