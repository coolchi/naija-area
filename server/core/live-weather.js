// Live Lagos weather from Open-Meteo (no key). Mapped onto the game's four states. A failed fetch leaves the last good reading, then the seasonal fallback.
import { cfg } from './weather.js';

const STATES = new Set(['clear', 'cloudy', 'rain', 'storm']);

/** WMO weather code → clear | cloudy | rain | storm. */
export function codeToState(code) {
  if (code === null || code === undefined || code === '') return null;
  const c = Number(code);
  if (!Number.isFinite(c)) return null;
  if (c >= 95) return 'storm';
  if ((c >= 51 && c <= 67) || (c >= 71 && c <= 82)) return 'rain';
  if (c <= 1) return 'clear';
  return 'cloudy';
}

const parseUtc = (s) => { if (!s) return NaN; const t = String(s); return Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(t) ? t : t + 'Z'); };

export async function refreshLiveWeather(app, fetchImpl = globalThis.fetch) {
  const C = cfg(app);
  if (!C.live || typeof fetchImpl !== 'function') return null;
  const lat = C.latitude ?? 6.5244, lon = C.longitude ?? 3.3792;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,precipitation&hourly=weather_code&forecast_hours=6&timezone=UTC`;
  const now = app.clock.now();
  const prev = app.runtime?.liveWeather;
  try {
    const r = await fetchImpl(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error('weather HTTP ' + r.status);
    const j = await r.json();
    const state = codeToState(j.current?.weather_code);
    if (!state || !STATES.has(state)) throw new Error('weather code missing');
    const hours = [];
    const times = j.hourly?.time || [], codes = j.hourly?.weather_code || [];
    for (let i = 0; i < times.length && hours.length < 4; i++) {
      const at = parseUtc(times[i]); const st = codeToState(codes[i]);
      if (Number.isFinite(at) && at > now && st) hours.push({ at, state: st });
    }
    const live = { state, code: Number(j.current.weather_code), at: now, until: now + (C.liveMinutes || 10) * 60000, place: 'Lagos', hours, error: null };
    (app.runtime ||= {}).liveWeather = live;
    return live;
  } catch (e) {
    const live = { ...(prev || {}), error: String(e.message || e), at: prev?.at || now, until: prev?.until && prev.until > now ? prev.until : now };
    (app.runtime ||= {}).liveWeather = live.state ? live : { error: live.error, at: now, until: now };
    return app.runtime.liveWeather;
  }
}
