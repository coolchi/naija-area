# Player-owned businesses (Track G item 1, 10 Oct 2026)

Mama Put, Barbing Salon, Provision Shop and Car Wash that a player can buy, staff and collect from. **Game money only, no cash-out. Every number is an ESTIMATE** (`server/config/business.js`, tuned on nothing).

## Rules
- Buy from Phone > City life > Business. One of each type, at most 3 in all, you need an account (not a guest) older than 30 minutes, and enough cash. The price goes to a sink account through the ledger (`business_buy`).
- **Staff:** each level holds a number of workers (level 1: 2 or so; upgrades raise it). Look at 3 people a game day (a pool that is the same for everybody looking at that business that day), hire one (Trainee, Regular or Expert, each with a wage per real hour), let go at any time. A business with no staff serves 40% of its demand; staff add capacity up to 100%.
- **Income** accrues while you are away, from the clock: every 10 real minutes it takes the demand for that **game hour** (a Mama Put peaks at mealtimes, a barber in the daytime, a car wash on dry days), times the base revenue, level and staff capacity. Supplies, wages and upkeep come off it. Settlement is lazy (done when you look or act), deterministic, and identical on SQLite and Postgres.
- **Caps (anti-inflation):** at most 24 real hours of earnings pile up between visits; at most ₦18,000 net per business per UTC day to the owner.
- **Collect:** ONE balanced ledger transaction `business_collect`: revenue out of `sys:faucet_business`, costs into `sys:sink_business`, the net to your cash. A second collect pays nothing. Selling returns 60% of everything paid (price + upgrades) plus whatever was waiting.
- **Hooks:** `demandHooks` in `business.js` let other systems scale demand. Weather (item 4) uses it: rain helps a Mama Put (+15%) and hurts a car wash (down to 30%).
- Account download lists your businesses and staff; closing the account removes them (value forfeited, ledger rows stay anonymised).

## Not verified
- Nobody has played it. The balance (payback about 4 to 8 real days of steady staffed play at the placeholder numbers) is arithmetic, not experience. The 24 h and ₦18,000 caps are guesses.
- A business is not drawn in the 3D city (no shopfront, no queue of customers): it lives in the phone app. A Mama Put you own is not yet the Mama Put you can walk into.
