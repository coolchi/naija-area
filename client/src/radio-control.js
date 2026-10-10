// The car radio's brain (10 Oct 2026): decides, every tick, whether the real stream or the synthesiser (or nothing) should be making sound, and reacts to stream errors by falling
// through the chain: real station > next real station > the synthesised stations. No DOM here: the stream player and the synthesiser are passed in, so tests use mocks.
import { RadioState, STATIONS } from './radio.js';
import { carStations } from './radio-stations.js';

/** the global switch as the client sees it: the server config says `realRadio: false` to turn every real station off. Anything but an explicit false means on. */
export const realRadioOn = (cfg) => cfg?.realRadio !== false;
export class RadioController {
  /** @param {{ cfg, saveData, streamer, synth, now }} o  synth needs tick(state, serverMs, now) and stop(); streamer is a StreamPlayer */
  constructor({ cfg = {}, saveData = false, streamer, synth, now = () => 0, real } = {}) {
    this.real = realRadioOn(cfg); this.state = new RadioState({ saveData, stations: carStations(this.real, STATIONS, real) }); this.streamer = streamer; this.synth = synth; this.now = now; this.events = [];
    streamer.onError = (reason, url) => { this.events.push(`error:${reason}`); const before = this.state.current.id; this.state.streamFailed(this.now()); this.events.push(`${before}>${this.state.current.id}`); this.sync(); };
    streamer.onBlocked = () => { this.events.push('blocked'); this.state.playBlocked(); this.sync(); };
    streamer.onPlaying = () => { this.events.push('playing'); };
  }
  /** the first tap or key press anywhere: unlock audio and (if the radio is waiting to start in a car) start it */
  gesture(unlockSynth) { const first = !this.state.gesture || this.state.blocked; this.state.userGesture(); if (first) { this.streamer.prime?.(); unlockSynth?.(); } this.sync(); }
  enterCar() { this.state.enterCar(); this.sync(); }
  leaveCar() { this.state.leaveCar(); this.sync(); }
  power() { this.state.power(this.now()); this.sync(); } tune(d) { this.state.tune(d, this.now()); this.sync(); } mute() { this.state.toggleMute(); this.sync(); }
  volume(v) { this.state.setVolume(v); this.streamer.setVolume(this.state.gain); this.sync(); }
  /** make the sound match the state. Safe to call as often as you like. */
  sync() {
    const s = this.state;
    if (s.wantsStream) { this.synth.stop?.(); const st = s.current; if (!this.streamer.isPlaying && this.streamer.state !== 'loading' || this.streamer.url !== st.url) this.streamer.play(st.url, s.gain); else this.streamer.setVolume(s.gain); }
    else { if (this.streamer.state !== 'idle') this.streamer.stop(); if (!s.playing) this.synth.stop?.(); }
  }
  /** called about 10 times a second */
  tick(serverMs, now) { this.sync(); if (this.state.playing && this.state.current.kind !== 'real') return this.synth.tick(this.state, serverMs, now); return null; }
  /** what the dashboard should say */
  label() {
    const s = this.state, st = s.current; if (!s.inCar) return ''; if (s.blocked) return `${st.name} ${st.freq}: Tap to play`; if (!s.wantOn) return 'Radio off · press R';
    if (st.kind === 'real') return `${st.name} ${st.freq} · ${this.streamer.isPlaying ? 'live' : 'connecting…'}`; return null; // synthesised: radio-client builds the track label
  }
}
