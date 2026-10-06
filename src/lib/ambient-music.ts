// Soft synthesized Indian-style ambience: tanpura-like drone + gentle flute phrases.
// Generated live with Web Audio, so no audio file is needed.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let playing = false;

const SA = 261.63; // C4
// Raag Yaman-flavoured scale ratios (Sa Re Ga Ma# Pa Dha Ni Sa')
const SCALE = [1, 9 / 8, 5 / 4, 45 / 32, 3 / 2, 5 / 3, 15 / 8, 2];
const PHRASES = [
  [7, 6, 4, 5, 4, 2],
  [2, 3, 4, 6, 7, 6, 4],
  [4, 5, 6, 7, 6, 4, 2, 0],
  [0, 2, 4, 2, 1, 0],
];

function drone(c: AudioContext, out: AudioNode) {
  [0.5, 0.75, 1, 0.5].forEach((ratio, i) => {
    const t = c.currentTime + i * 0.9;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sawtooth";
    o.frequency.value = SA * ratio;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 700;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.035, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 3.4);
    o.connect(f).connect(g).connect(out);
    o.start(t);
    o.stop(t + 3.5);
  });
}

function flute(c: AudioContext, out: AudioNode, freq: number, start: number, dur: number) {
  const o = c.createOscillator();
  const vib = c.createOscillator();
  const vibGain = c.createGain();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.value = freq;
  vib.frequency.value = 5;
  vibGain.gain.value = freq * 0.006;
  vib.connect(vibGain).connect(o.frequency);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(0.09, start + 0.18);
  g.gain.setValueAtTime(0.08, start + dur * 0.7);
  g.gain.linearRampToValueAtTime(0, start + dur);
  o.connect(g).connect(out);
  o.start(start);
  vib.start(start);
  o.stop(start + dur + 0.05);
  vib.stop(start + dur + 0.05);
}

function cycle() {
  if (!ctx || !master || !playing) return;
  drone(ctx, master);
  if (Math.random() > 0.25) {
    const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    let t = ctx.currentTime + 0.4;
    phrase.forEach((step, i) => {
      const dur = i === phrase.length - 1 ? 1.4 : 0.42 + Math.random() * 0.25;
      flute(ctx!, master!, SA * 2 * SCALE[step], t, dur);
      t += dur * 0.92;
    });
  }
  timer = window.setTimeout(cycle, 3600);
}

export async function startMusic() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    const delay = ctx.createDelay();
    const fb = ctx.createGain();
    delay.delayTime.value = 0.38;
    fb.gain.value = 0.32;
    master.connect(ctx.destination);
    master.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(ctx.destination);
  }
  await ctx.resume();
  master!.gain.cancelScheduledValues(ctx.currentTime);
  master!.gain.setValueAtTime(0.0001, ctx.currentTime);
  master!.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 2);
  if (!playing) {
    playing = true;
    cycle();
  }
}

export function stopMusic() {
  playing = false;
  if (timer) window.clearTimeout(timer);
  if (ctx && master) {
    master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    window.setTimeout(() => ctx?.suspend(), 900);
  }
}
