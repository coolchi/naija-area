// 3-level referral rewards (game ₦, pretend money). Paid once per new player to each ancestor.
export const REFERRAL = {
  levels: 3,
  // Level 1: you invited them. Level 2: they invited someone. Level 3: that someone invited someone.
  rewards: [1_000_000, 200_000, 50_000],
  codeLen: 8,
  invitePerDay: 20,
  inviteEmailMax: 120,
};
