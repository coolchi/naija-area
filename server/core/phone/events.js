// Phone system (phase 3, PHONE_V2): JSDoc contract for the websocket events and HTTP payloads. STUBS ONLY: nothing imports this file yet and no behaviour
// changes. Spec: /workspace/game_project/15_phone_system_spec.md section 7. Plain JS (no TypeScript); editors still get hints from the JSDoc.

/** Feature flag. Off by default; flipping it will gate every phone route, event and client module. Not wired anywhere yet. */
export const PHONE_V2 = process.env.PHONE_V2 === 'true';

/** Server -> client messages on the existing /ws socket (JSON). Event names are namespaced `phone.` so they cannot clash with today's types. */
export const S2C = Object.freeze({
  FRIEND_REQUEST: 'phone.friend.request', FRIEND_UPDATE: 'phone.friend.update', PRESENCE: 'phone.presence',
  MESSAGE: 'phone.message', MESSAGE_READ: 'phone.message.read',
  CALL_INCOMING: 'phone.call.incoming', CALL_STATE: 'phone.call.state', CALL_SIGNAL: 'phone.call.signal', CALL_ENDED: 'phone.call.ended',
});
/** Client -> server messages (sent over HTTP POST today; the same shapes may later be accepted on the socket for lower latency). */
export const C2S = Object.freeze({ CALL_SIGNAL: 'phone.call.signal' });

/** @typedef {{ id:number, from:string, at:number }} FriendRequestEvt  type: S2C.FRIEND_REQUEST */
/** @typedef {{ username:string, status:'accepted'|'declined'|'removed' }} FriendUpdateEvt  type: S2C.FRIEND_UPDATE */
/** @typedef {{ username:string, state:'offline'|'online'|'home'|'in_call'|'dnd' }} PresenceEvt  type: S2C.PRESENCE (friends only, only if they allow it) */
/** @typedef {{ threadId:number, id:number, from:string, kind:'text'|'voice'|'system', text?:string, voice?:{id:number, durationMs:number, waveform?:number[]}, at:number }} MessageEvt  type: S2C.MESSAGE */
/** @typedef {{ callId:number, from:string, ringUntil:number, iceServers:RTCIceServerLike[] }} CallIncomingEvt  type: S2C.CALL_INCOMING; server stamps ringUntil, caller never sets it */
/** @typedef {{ callId:number, state:'ringing'|'active'|'ended', reason?:'completed'|'declined'|'missed'|'cancelled'|'busy'|'dnd'|'blocked'|'failed'|'timeout', at:number }} CallStateEvt  type: S2C.CALL_STATE / CALL_ENDED */
/** @typedef {{ callId:number, kind:'offer'|'answer'|'ice', sdp?:string, candidate?:object }} CallSignalEvt  type: S2C.CALL_SIGNAL: opaque to the server beyond size/rate checks and "is this user in this call" */
/** @typedef {{ urls:string|string[], username?:string, credential?:string }} RTCIceServerLike  TURN credentials are short-lived and minted per call by the server */

/**
 * HTTP surface (all POST/GET under /api/phone/..., auth required, 18+ already enforced at signup). See spec section 7.1 for the full table.
 * @typedef {Object} PhoneApi
 * @property {() => Promise<{friends:Array<{username:string,state:string}>, incoming:Array<{id:number,from:string}>}>} friends        GET  /api/phone/friends
 * @property {(username:string) => Promise<{ok:true}>} friendRequest                                                                  POST /api/phone/friends/request
 * @property {(id:number, accept:boolean) => Promise<{ok:true}>} friendRespond                                                        POST /api/phone/friends/respond
 * @property {() => Promise<{threads:Array<{id:number,with:string,last?:object,unread:number}>}>} threads                             GET  /api/phone/threads
 * @property {(to:string, text:string) => Promise<MessageEvt>} sendText                                                              POST /api/phone/messages
 * @property {(to:string, audio:Blob, durationMs:number) => Promise<MessageEvt>} sendVoice                                           POST /api/phone/voice  (raw audio body)
 * @property {(to:string) => Promise<{callId:number, iceServers:RTCIceServerLike[]}>} callStart                                       POST /api/phone/call/start
 * @property {(callId:number, action:'answer'|'decline'|'cancel'|'hangup') => Promise<CallStateEvt>} callAct                         POST /api/phone/call/act
 */
export {};
