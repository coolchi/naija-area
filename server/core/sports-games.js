// Registration data for the Sports and Games Hall games (ping pong, tennis): plugged into games.js GAMES. No imports from games.js (that would be a cycle).
// `prep` is called by games.js playMove for these kinds: a PERSON's timing comes from the server clock (the meter is a triangle wave of server time), never from the request;
// a bot (users.is_bot) supplies its own timing from its skill.
import * as pingpong from './games/pingpong.js';
import * as tennis from './games/tennis.js';
import { meterAt } from './games/rally.js';
export const prep = (app, st, mv, isBot) => (isBot ? mv : { ...mv, timing: meterAt(app.clock.now()) });
export const SPORTS_GAMES = { pingpong: { label: 'Ping pong', min: 2, max: 2, eng: pingpong, prep }, tennis: { label: 'Tennis', min: 2, max: 2, eng: tennis, prep } };
export const SPORT_KINDS = Object.keys(SPORTS_GAMES);
