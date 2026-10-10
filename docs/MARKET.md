# Player marketplace (Track G item 2, 10 Oct 2026)

Players sell **cars** and **wearables** (clothes, jewelry, caps) to each other from Phone > City life > Market. GAME MONEY ONLY, no cash-out. Numbers: `server/config/market.js` (all ESTIMATES).

- **Escrow:** listing removes the asset from the seller (the car leaves the garage and the car park; the wearable leaves the wardrobe and what is worn) into the listing row as a frozen snapshot. It cannot be used, worn, sold twice or listed twice. Cancel (or claim after expiry) gives it back; a car needs a free garage slot.
- **Sale:** ONE balanced ledger transaction `market_sale`: buyer pays the ask, seller gets it minus the **5% sale fee** (min ₦25), the fee goes to `sys:sink_market`. The asset moves in the same database transaction; any failure (full garage, no funds) rolls the lot back. The listing also costs a **1% listing fee** (min ₦20) when it is made, never refunded.
- **No money machine:** a car keeps its ORIGINAL price paid and purchase date. So what the Auto Mart pays for it (resale) is the same whoever owns it and whatever was paid on the market; two friends cannot pump money out by trading at a silly price (tested).
- **Anti-scam limits:** the ask must lie in a band around the item's worth (car 50% to 150% of current resale value; wearable 30% to 200% of catalogue price), asks over 130% show a warning; the buyer sends the price they were shown and the sale refuses if it differs; a frozen snapshot shows damage and condition; accounts must be 60 min old to list and 30 min to buy; no guests; 5 listings at a time; a listing lasts 48 h; relisting the same item within 5 min of taking it off is refused; the same buyer and seller trade at most twice a day; a seller can sell at most ₦15,000,000 a day; crowns (unique items) cannot be traded.
- **Not covered:** furniture and other "items" in a house are not tradeable (they belong to a property); festival items (item 6) are wearables so they trade, unless their config says otherwise. There is no chat or negotiation, no offers, no auction. There is no admin tool to void a trade yet.

## Not verified
Fee and cap values are guesses; whether 2 trades a day per pair is too tight or loose is unknown. Nobody has played it.
