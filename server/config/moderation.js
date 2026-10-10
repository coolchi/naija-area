// MODERATION settings (queue batch 1 item 6). ESTIMATES for Sherif to tune; no moderation staff exists yet (see docs/MODERATION.md for the staffing decision).
export const MOD = {
  reasons: ['abusive', 'sexual', 'hate', 'scam_spam', 'personal_info', 'cheating', 'underage_suspected', 'other'],
  maxMuteHours: 24 * 30, defaultMuteHours: 24, maxBanDays: 3650,   // a ban without a length is permanent (until lifted)
  recentChatLines: 25, recentReports: 20, auditPageSize: 100,
  strikeWindowDays: 90, strikesBeforeSuggestBan: 3,                  // the dashboard shows "3 strikes in 90 days: consider a ban"; nothing happens automatically
  notifyOnWarn: true
};
