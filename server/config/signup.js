// SIGN-UP CHOICES, APPLY-TO-JOIN and OFFICE IDEAS: every list and limit in one place (Sherif can change them without touching code).
//
// ASSUMPTIONS (10 Oct 2026; not confirmed with Sherif, all easy to change here):
//  1. "Choose your city" = the city you want to START playing from (CONFIRMED by Sherif 10 Oct 2026). It decides your spawn point. Open now: Lagos, Kano, Shagamu, Abeokuta,
//     Ijebu Ode, Abule; a city that is not open yet is shown as such, you start in Lagos and the wish is stored (see START_CLOSED / WISHLIST_CITIES below). Chosen once at set-up
//     (a wish for a closed city can be changed later); after that you move by plane, boat or road. Lagos is one city with five districts: you start on the Mainland.
//  2. "City of interest" (its own screen) = ANOTHER city you want to visit or watch later. It is not binding; it is shown on your profile and on the airport board, and
//     the admin backend counts it. It can be changed any time. It cannot be the same as your own city.
//  3. "Interests" = pick 1 to 5 topics from the list below. They are stored and counted for the admin backend; nothing in the game changes because of them yet.
//  4. "Apply to join" = apply to join the Naija Area CONTRIBUTOR team (people who help build, test, advise or grow the game), NOT a waiting list to enter the game.
//     Players apply at the Naija Area office in Lagos or from More > Apply to join. A registered account is needed (guests cannot be found again).
//  5. Ideas shared at the office go to the same kind of record the idea pipeline (../ideas) uses. Ideas from ACCEPTED contributors count fully when exported to the
//     pipeline, ideas from other players count as anonymous (half weight), as the pipeline already does.
//  6. Guests ("Play now") skip set-up (fast start); they can do it later from More > Your choices once they have an account. Set-up shows for new accounts and for
//     existing accounts that never saw it (skippable).
export const INTEREST_OPTIONS = [
  { id: 'music', label: 'Music and clubs', emoji: '🎵' },
  { id: 'football', label: 'Football', emoji: '⚽' },
  { id: 'cars', label: 'Cars and driving', emoji: '🚗' },
  { id: 'food', label: 'Food and canteens', emoji: '🍲' },
  { id: 'fashion', label: 'Fashion and jewelry', emoji: '💎' },
  { id: 'property', label: 'Houses and land', emoji: '🏠' },
  { id: 'games', label: 'Games and puzzles', emoji: '🎲' },
  { id: 'travel', label: 'Travel and flights', emoji: '✈️' },
  { id: 'business', label: 'Shops and business', emoji: '🛍️' },
  { id: 'village', label: 'Village life and nature', emoji: '🌾' },
  { id: 'friends', label: 'Meeting people', emoji: '🤝' },
  { id: 'building', label: 'Building and designing', emoji: '🛠️' }
];
export const SIGNUP_RULES = { minInterests: 1, maxInterests: 5 };

// START CITY (clarified by Sherif 10 Oct 2026): the "city" chosen at sign-up is the city the player wants to START playing from. It decides the spawn point (the first spawn point of
// that city's entry district). A city that is not open yet cannot be started in: the player is told so on the screen, starts in Lagos, and the wish is still stored (and counted in
// the admin backend) so we can see where people want us to go next.
//  * A city is OPEN when it is built and enabled in config/cities/index.json AND not listed in START_CLOSED.
//  * START_CLOSED: built cities you want to hold back from new players for now (their ids as the player sees them, e.g. 'kano'). Empty = every built city is open.
//  * WISHLIST_CITIES: cities that do not exist in the game yet but players may ask for. They show as "not open yet". Add or remove freely.
//  * FALLBACK_CITY: where a player who picks a closed city starts (the default city, Lagos).
export const START_CLOSED = [];
export const FALLBACK_CITY = 'lagos';
export const WISHLIST_CITIES = [
  { id: 'abuja', name: 'Abuja', state: 'FCT' }, { id: 'port-harcourt', name: 'Port Harcourt', state: 'Rivers' }, { id: 'ibadan', name: 'Ibadan', state: 'Oyo' },
  { id: 'enugu', name: 'Enugu', state: 'Enugu' }, { id: 'benin-city', name: 'Benin City', state: 'Edo' }, { id: 'kaduna', name: 'Kaduna', state: 'Kaduna' },
  { id: 'calabar', name: 'Calabar', state: 'Cross River' }, { id: 'jos', name: 'Jos', state: 'Plateau' }
];

// apply-to-join (contributor team)
export const APPLY_ROLES = [
  { id: 'tester', label: 'Tester (play, find bugs)' },
  { id: 'designer', label: 'Designer (look, rooms, items)' },
  { id: 'developer', label: 'Developer (code)' },
  { id: 'artist', label: 'Artist or 3D modeller' },
  { id: 'local', label: 'Local knowledge (places, language, culture)' },
  { id: 'community', label: 'Community helper or moderator' },
  { id: 'brand', label: 'Brand or advertiser contact' },
  { id: 'other', label: 'Something else' }
];
export const APPLY_RULES = { skills: 200, message: { min: 20, max: 1000 }, contact: 120, perDayLimit: 3, reapplyAfterDays: 7, statuses: ['new', 'review', 'shortlisted', 'accepted', 'declined', 'withdrawn'], open: ['new', 'review', 'shortlisted'] };
// what the applicant sees for each status (kind wording)
export const APPLY_STATUS_TEXT = { new: 'Received. We read every application.', review: 'We are reading it.', shortlisted: 'You are on the shortlist.', accepted: 'Welcome to the team!', declined: 'Not right now. Thank you for applying; you can apply again later.', withdrawn: 'You withdrew this application.' };

// ideas (same enums and limits as ideas/lib/constants.js so exports fit the pipeline)
export const IDEA_CATEGORIES = ['gameplay', 'economy', 'ads/brands', 'art/visuals', 'social', 'cities/maps', 'safety/legal', 'other'];
export const IDEA_ROLES = ['player', 'designer', 'dev', 'brand', 'other'];
export const IDEA_STATUSES = ['new', 'merged', 'parked', 'rejected', 'built'];
export const IDEA_RULES = { title: { min: 5, max: 100 }, description: { min: 20, max: 2000 }, why: { max: 600 }, perDay: 5, note: 1000 };
