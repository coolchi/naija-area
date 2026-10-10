# Clubs and crews (Track G item 3, 10 Oct 2026)

Found a club (or crew; same thing, other name), join one, chat with its members, meet at the shared **Clubhouse**. Phone > City life > Clubs, or the Club board inside the Clubhouse. GAME MONEY ONLY: the only money is a one-off founding fee (₦5,000, ESTIMATE, a sink `sys:sink_clubs` through the ledger). Numbers: `server/config/clubs.js`.

- **Rules:** one club per player, up to 20 members, 3 officers. Account (not guest) at least 15 minutes old. Names (3 to 20), tags (2 to 4 letters or digits, shown as `[TAG]` over a player's head and in the heartbeat as `ct`) and mottos are filtered; names are unique ignoring case.
- **Joining:** open clubs take you at once. Closed ("by request") clubs get a request the leader or an officer accepts. Leaders and officers can invite by `@username`; an invited player joins from their Clubs tab.
- **Roles:** leader (one), officer (up to 3, set by the leader), member. Officers can accept, invite, mute and remove members below them; only the leader changes roles, settings, hands over leadership or closes the club. Leaving or being removed starts a 10 minute cooldown before joining or founding another. If the leader leaves, the club passes to an officer, then the longest-standing member; the last one out closes it (chat is deleted, the name is free again).
- **Chat:** members only, `GET /api/clubs/chat?since=` polled every 3 s while the tab is open. Text goes through the same filter as public chat (bad words, spaced and leet spellings, links, e-mails, phone numbers), one message per 1.5 s, 200 characters, last 300 messages kept, people you muted or blocked are hidden. Leaders and officers can mute a member for 5, 30 or 120 minutes.
- **The Clubhouse:** a real venue in Lagos Mainland (`tools/add-clubhouse.mjs` places the building on free ground and adds the room, the Club board and a notice board). Two or more members of the same club inside it together can "hang out" for a small mood lift every 30 minutes.
- **Account data:** download lists your membership and your chat messages; closing the account removes your messages and membership (leadership passes on as above).

## Not verified / not built
- Nobody has used it with real people; the room is a shared room, not one room per club (all clubs share the Clubhouse; chat is per club). No treasury, no club levels, no club-vs-club events yet. A report button on club chat lines is not wired (the existing report flow works on players).
- The `[TAG]` over heads shows for ghosts that appear after the club is founded; a long-visible ghost keeps its old label until it leaves view.
