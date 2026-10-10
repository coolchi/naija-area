// EMOTES (queue batch 1 item 8). Pure show-off: nothing here touches money, missions or the ledger. Durations and limits are ESTIMATES.
// `anim` is the body animation the client plays (client/src/emotes.js emotePose); emoji emotes have a speech bubble and no body animation.
export const EMOTES = {
  enabled: true,
  cooldownMs: 1500,            // one emote per player every 1.5 s
  perMinute: 20,               // and at most 20 a minute
  list: [
    { id: 'laugh', kind: 'emoji', icon: '😂', label: 'Laugh', ms: 4000 },
    { id: 'love', kind: 'emoji', icon: '😍', label: 'Love it', ms: 4000 },
    { id: 'thumbs', kind: 'emoji', icon: '👍', label: 'Thumbs up', ms: 4000 },
    { id: 'fire', kind: 'emoji', icon: '🔥', label: 'Fire', ms: 4000 },
    { id: 'pray', kind: 'emoji', icon: '🙏', label: 'Thank you', ms: 4000 },
    { id: 'cool', kind: 'emoji', icon: '😎', label: 'Cool', ms: 4000 },
    { id: 'sad', kind: 'emoji', icon: '😢', label: 'Sad', ms: 4000 },
    { id: 'party', kind: 'emoji', icon: '🎉', label: 'Party', ms: 4000 },
    { id: 'wave', kind: 'dance', anim: 'wave', icon: '👋', label: 'Wave', ms: 4000, bubble: '👋' },
    { id: 'clap', kind: 'dance', anim: 'clap', icon: '👏', label: 'Clap', ms: 4000, bubble: '👏' },
    { id: 'dance', kind: 'dance', anim: 'dance', icon: '🕺', label: 'Dance', ms: 6000, bubble: '🎶' },
    { id: 'spin', kind: 'dance', anim: 'spin', icon: '🌀', label: 'Spin', ms: 5000, bubble: '🌀' },
    { id: 'jump', kind: 'dance', anim: 'jump', icon: '🤸', label: 'Jump for joy', ms: 4000, bubble: '🙌' },
    { id: 'bow', kind: 'dance', anim: 'bow', icon: '🙇', label: 'Bow', ms: 2500, bubble: '' }
  ]
};
