// Clubs and crews (a club is a place-based social group; a crew is the same thing with another name). GAME MONEY ONLY. Every number is an ESTIMATE / placeholder.
export const CLUBS = {
  _note: 'ESTIMATE: nothing here is tuned.',
  createFee: 5000,                 // paid once to found a club (a sink)
  minAccountAgeMs: 15 * 60000, guestsMay: false,
  maxMembers: 20, maxOfficers: 3,
  nameMin: 3, nameMax: 20, tagMin: 2, tagMax: 4, mottoMax: 60,
  kinds: ['club', 'crew'],
  colors: ['#8e44ad', '#2a9d8f', '#e76f51', '#457b9d', '#f4a261', '#2b9348', '#d62828', '#6a4c93'],
  chat: { max: 200, minGapMs: 1500, keep: 300, pageSize: 60 }, // characters per message, seconds between messages per member, messages kept per club
  muteMinutes: [5, 30, 120],
  requestsMax: 30,                  // pending join requests/invites a club can hold
  leaveCooldownMs: 10 * 60000,      // after leaving or being removed, wait before joining or founding another
  hangout: { venueId: 'venue_crewhq', minMembers: 2, mood: 5, cooldownMs: 30 * 60000 }, // two or more club members in the clubhouse together can hang out for a small mood lift
  directoryPage: 20
};
