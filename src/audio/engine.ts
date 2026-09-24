import { TRACKS } from '../data/site';

/**
 * Procedural music for the site: no audio files needed.
 * Every track is a small score (drone, melody, dhak pattern, bells) played by Web Audio voices.
 * A track with `src` in data/site.ts plays that file through <audio> instead.
 */

interface Spec {
  bpm: number;
  bars: number;
  drone?: number;
  melody?: { voice: 'shehnai' | 'pluck'; notes: [number, number][]; oct?: number; gain?: number };
  rhythm?: { pat: string; kansor?: number[]; tabla?: boolean; gain?: number };
  bells?: boolean;
  conch?: 'first' | 'each';
}

const SA = 146.83; // D3
const hz = (semi: number, oct = 0) => SA * Math.pow(2, (semi + oct * 12) / 12);

const PUJO_THEME: [number, number][] = [
  [0, 2], [1, 1], [4, 1], [5, 2], [4, 1], [1, 1], [0, 2], [4, 1], [5, 1], [7, 3], [5, 1],
  [8, 1], [7, 1], [5, 1], [4, 1], [5, 1], [4, 1], [1, 1], [0, 1], [4, 2], [1, 1], [0, 1], [0, 4],
];
const CLASSICAL: [number, number][] = [
  [0, .5], [1, .5], [4, .5], [5, .5], [4, 1], [1, .5], [0, .5],
  [0, .5], [4, .5], [5, .5], [7, .5], [8, 1], [7, .5], [5, .5],
  [7, .5], [8, .5], [11, .5], [12, .5], [11, 1], [8, .5], [7, .5],
  [5, .5], [4, .5], [5, .5], [7, .5], [5, 1], [4, .5], [1, .5],
  [12, 1], [11, .5], [8, .5], [7, 1], [5, .5], [4, .5], [5, .5], [4, .5], [1, .5], [0, .5], [0, 4],
];

const SPECS: Record<string, Spec> = {
  'pujo-theme': {
    bpm: 72, bars: 8, drone: 0.09, conch: 'first',
    melody: { voice: 'shehnai', notes: PUJO_THEME, oct: 1, gain: 0.05 },
    rhythm: { pat: 'X...t...d...t...', kansor: [8], gain: 0.55 },
  },
  'dhaker-taal': {
    bpm: 100, bars: 8, drone: 0.05,
    rhythm: { pat: 'X.t.tdt.X.t.tdtt', kansor: [4, 12], gain: 1 },
  },
  mahalaya: { bpm: 48, bars: 8, drone: 0.11, bells: true, conch: 'each' },
  classical: {
    bpm: 84, bars: 8, drone: 0.08,
    melody: { voice: 'pluck', notes: CLASSICAL, oct: 1, gain: 0.12 },
    rhythm: { pat: 'D...n.t.D.t.n...', tabla: true, gain: 0.5 },
  },
  dhunuchi: {
    bpm: 132, bars: 8, drone: 0.04,
    rhythm: { pat: 'XtXtdtXtXtXtdtXt', kansor: [2, 6, 10, 14], gain: 1 },
  },
};

export interface MusicState {
  playing: boolean;
  index: number;
  volume: number;
  blocked: boolean; // audio context could not start without a gesture
  started: boolean; // has ever started
}

type L = () => void;

class Engine {
  private ctx: AudioContext | null = null;
  private out!: GainNode;
  private bus!: GainNode;
  private fx!: GainNode;
  private wet!: GainNode;
  private noise!: AudioBuffer;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;
  private startAt = 0;
  private events = new Map<number, [number, number]>();
  private spec: Spec | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private listeners = new Set<L>();
  private gen = 0;

  private s: MusicState = { playing: false, index: 0, volume: 0.6, blocked: true, started: false };

  subscribe = (l: L) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
  getState = () => this.s;
  private set(p: Partial<MusicState>) {
    this.s = { ...this.s, ...p };
    this.listeners.forEach((l) => l());
  }

  /* ---------- context ---------- */
  private ensure(): AudioContext {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 4;
    this.out = ctx.createGain();
    this.out.gain.value = this.s.volume;
    this.out.connect(comp).connect(ctx.destination);
    this.bus = ctx.createGain();
    this.bus.gain.value = 0;
    this.fx = ctx.createGain();
    this.fx.gain.value = 1;
    this.bus.connect(this.out);
    this.fx.connect(this.out);
    // reverb
    const len = ctx.sampleRate * 2.4;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    this.wet = ctx.createGain();
    this.wet.gain.value = 0.3;
    conv.connect(this.wet).connect(this.out);
    this.bus.connect(conv);
    this.fx.connect(conv);
    // noise
    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = this.noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    ctx.addEventListener('statechange', () => this.set({ blocked: ctx.state !== 'running' }));
    return ctx;
  }

  /** Try to start with sound. Resolves true when the browser allowed it. */
  async tryAutoplay(): Promise<boolean> {
    try {
      const ctx = this.ensure();
      await Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 350))]);
      if (ctx.state === 'running') {
        this.set({ blocked: false });
        await this.play();
        return true;
      }
    } catch { /* ignore */ }
    this.set({ blocked: true });
    return false;
  }

  /* ---------- transport ---------- */
  async play(index = this.s.index) {
    const ctx = this.ensure();
    const track = TRACKS[index];
    if (track.src) {
      const a = (this.audioEl ??= new Audio());
      if (!a.src.includes(track.src)) a.src = track.src;
      a.loop = true;
      a.volume = this.s.volume;
      a.play().catch(() => this.set({ blocked: true }));
    }
    try { await ctx.resume(); } catch { /* ignore */ }
    this.stopVoices();
    const g = ++this.gen;
    this.set({ index, playing: true, started: true, blocked: ctx.state !== 'running' });
    const t = ctx.currentTime;
    this.bus.gain.cancelScheduledValues(t);
    this.bus.gain.setValueAtTime(this.bus.gain.value, t);
    this.bus.gain.linearRampToValueAtTime(1, t + 1.2);
    if (track.src) return;
    const spec = SPECS[track.id] ?? SPECS['pujo-theme'];
    this.spec = spec;
    this.events.clear();
    if (spec.melody) {
      let beat = 0;
      spec.melody.notes.forEach(([semi, d]) => {
        this.events.set(Math.round(beat * 4), [semi, d]);
        beat += d;
      });
    }
    this.step = 0;
    this.nextTime = ctx.currentTime + 0.12;
    this.startAt = this.nextTime;
    this.timer = window.setInterval(() => g === this.gen && this.tick(), 30);
  }

  pause() {
    if (!this.ctx) return;
    this.gen++;
    const t = this.ctx.currentTime;
    this.bus.gain.cancelScheduledValues(t);
    this.bus.gain.setValueAtTime(this.bus.gain.value, t);
    this.bus.gain.linearRampToValueAtTime(0, t + 0.5);
    this.audioEl?.pause();
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.set({ playing: false });
  }
  toggle() { return this.s.playing ? this.pause() : this.play(); }
  next() { return this.play((this.s.index + 1) % TRACKS.length); }
  prev() { return this.play((this.s.index - 1 + TRACKS.length) % TRACKS.length); }
  setVolume(v: number) {
    this.set({ volume: v });
    if (this.ctx) this.out.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
    if (this.audioEl) this.audioEl.volume = v;
  }
  /** unlock audio from any gesture */
  async unlock() {
    const ctx = this.ensure();
    try { await ctx.resume(); } catch { /* ignore */ }
    this.set({ blocked: ctx.state !== 'running' });
  }
  progress(): number {
    if (!this.ctx || !this.s.playing) return 0;
    const spec = this.spec;
    if (this.audioEl && !this.spec) return this.audioEl.duration ? this.audioEl.currentTime / this.audioEl.duration : 0;
    if (!spec) return 0;
    const loop = (spec.bars * 16 * 60) / spec.bpm / 4;
    return (((this.ctx.currentTime - this.startAt) % loop) + loop) % loop / loop;
  }

  private stopVoices() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.audioEl?.pause();
    this.spec = null;
  }

  /* ---------- scheduler ---------- */
  private tick() {
    const ctx = this.ctx, spec = this.spec;
    if (!ctx || !spec) return;
    const stepDur = 60 / spec.bpm / 4;
    const total = spec.bars * 16;
    while (this.nextTime < ctx.currentTime + 0.25) {
      this.schedule(this.step % total, this.nextTime, stepDur, Math.floor(this.step / total));
      this.step++;
      this.nextTime += stepDur;
    }
  }

  private schedule(i: number, t: number, sd: number, loop: number) {
    const spec = this.spec!;
    const barStep = i % 16;
    // drone: tanpura cycle Pa Sa Sa Sa(low), one pluck every 6 steps
    if (spec.drone && i % 6 === 0) {
      const k = (i / 6) % 4;
      const f = [hz(7, -1), hz(0), hz(0), hz(0, -1)][k];
      this.tanpura(t, f, spec.drone);
    }
    if (spec.melody) {
      const ev = this.events.get(i);
      if (ev) {
        const [semi, beats] = ev;
        const f = hz(semi, spec.melody.oct ?? 0);
        const dur = beats * sd * 4;
        if (spec.melody.voice === 'shehnai') this.shehnai(t, f, dur, spec.melody.gain ?? 0.05);
        else this.pluck(t, f, Math.min(dur * 1.4, 1.6), spec.melody.gain ?? 0.1);
      }
    }
    if (spec.rhythm) {
      const c = spec.rhythm.pat[barStep];
      const g = spec.rhythm.gain ?? 1;
      if (spec.rhythm.tabla) {
        if (c === 'D') this.tabla(t, 0.9 * g, true);
        if (c === 'n' || c === 't') this.tabla(t, 0.5 * g, false);
      } else {
        if (c === 'X') this.dhak(t, 1 * g, true);
        else if (c === 't') this.dhak(t, 0.55 * g, false);
        else if (c === 'd') this.dhak(t, 0.4 * g, true, true);
      }
      if (spec.rhythm.kansor?.includes(barStep)) this.kansor(t, 0.05 * g);
    }
    if (spec.bells && i % 16 === 0 && (i / 16) % 2 === 1) {
      const pool = [7, 8, 11, 12, 4];
      this.bell(t, hz(pool[Math.floor(Math.random() * pool.length)], 2), 0.07);
    }
    if (spec.bells && i % 16 === 8 && Math.random() > 0.4) this.bell(t, hz(0, 3), 0.045);
    if (spec.conch && i === 0 && (spec.conch === 'each' || loop === 0)) this.shankha(t, this.bus);
  }

  /* ---------- voices ---------- */
  private env(g: GainNode, t: number, peak: number, a: number, d: number, dest?: AudioNode) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    g.connect(dest ?? this.bus);
  }
  private tanpura(t: number, f: number, gain: number) {
    const ctx = this.ctx!;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400;
    const g = ctx.createGain();
    [0, 3].forEach((c) => {
      const o = ctx.createOscillator(); o.type = c ? 'triangle' : 'sawtooth'; o.frequency.value = f; o.detune.value = c * 4;
      const og = ctx.createGain(); og.gain.value = c ? 0.6 : 0.35;
      o.connect(og).connect(lp); o.start(t); o.stop(t + 5.5);
    });
    lp.connect(g);
    this.env(g, t, gain, 0.05, 5);
  }
  private shehnai(t: number, f: number, dur: number, gain: number) {
    const ctx = this.ctx!;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 4.2; bp.Q.value = 0.9;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
    const g = ctx.createGain();
    const vib = ctx.createOscillator(); vib.frequency.value = 5.4;
    const vg = ctx.createGain(); vg.gain.value = 9;
    vib.connect(vg);
    [-6, 6].forEach((d) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = d;
      vg.connect(o.detune); o.connect(bp); o.start(t); o.stop(t + dur + 0.5);
    });
    vib.start(t); vib.stop(t + dur + 0.5);
    bp.connect(lp).connect(g);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.07);
    g.gain.setValueAtTime(gain, t + Math.max(0.08, dur - 0.05));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.4);
    g.connect(this.bus);
  }
  private pluck(t: number, f: number, dur: number, gain: number) {
    const ctx = this.ctx!;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 3;
    lp.frequency.setValueAtTime(4200, t); lp.frequency.exponentialRampToValueAtTime(500, t + dur);
    const g = ctx.createGain();
    [['sawtooth', 1], ['triangle', 2]].forEach(([type, m]) => {
      const o = ctx.createOscillator(); o.type = type as OscillatorType;
      o.frequency.setValueAtTime(f * (m as number) * 1.012, t); o.frequency.exponentialRampToValueAtTime(f * (m as number), t + 0.06);
      const og = ctx.createGain(); og.gain.value = m === 1 ? 0.6 : 0.25;
      o.connect(og).connect(lp); o.start(t); o.stop(t + dur + 0.1);
    });
    lp.connect(g);
    this.env(g, t, gain, 0.004, dur);
  }
  private bell(t: number, f: number, gain: number) {
    const ctx = this.ctx!;
    [1, 2.76, 5.4].forEach((m, k) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f * m;
      const g = ctx.createGain(); o.connect(g);
      this.env(g, t, gain / (k + 1), 0.005, 4 / (k + 1));
      o.start(t); o.stop(t + 4.2);
    });
  }
  private kansor(t: number, gain: number) {
    const ctx = this.ctx!;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1100;
    const g = ctx.createGain();
    [1210, 1810, 2530].forEach((f) => {
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
      const og = ctx.createGain(); og.gain.value = 0.3;
      o.connect(og).connect(hp); o.start(t); o.stop(t + 0.3);
    });
    hp.connect(g);
    this.env(g, t, gain, 0.002, 0.24);
  }
  private dhak(t: number, amp: number, thump: boolean, soft = false, dest?: AudioNode) {
    const ctx = this.ctx!;
    if (thump) {
      const o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(soft ? 110 : 150, t); o.frequency.exponentialRampToValueAtTime(52, t + 0.2);
      const g = ctx.createGain(); o.connect(g);
      this.env(g, t, 0.55 * amp, 0.004, 0.32, dest);
      o.start(t); o.stop(t + 0.4);
    }
    if (!soft) {
      const src = ctx.createBufferSource(); src.buffer = this.noise; src.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 1.1;
      const g = ctx.createGain(); src.connect(bp).connect(g);
      this.env(g, t, 0.3 * amp, 0.002, 0.09, dest);
      src.start(t); src.stop(t + 0.15);
    }
  }
  private tabla(t: number, amp: number, bayan: boolean) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(bayan ? 130 : 330, t); o.frequency.exponentialRampToValueAtTime(bayan ? 88 : 250, t + 0.12);
    const g = ctx.createGain(); o.connect(g);
    this.env(g, t, 0.34 * amp, 0.003, bayan ? 0.4 : 0.2);
    o.start(t); o.stop(t + 0.5);
  }
  private shankha(t: number, dest: AudioNode) {
    const ctx = this.ctx!;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1500;
    const g = ctx.createGain();
    [[233, 0.5], [349, 0.2], [466, 0.12]].forEach(([f, a]) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f * 0.97, t); o.frequency.linearRampToValueAtTime(f, t + 0.5);
      const og = ctx.createGain(); og.gain.value = a; o.connect(og).connect(lp); o.start(t); o.stop(t + 3.6);
    });
    const n = ctx.createBufferSource(); n.buffer = this.noise; n.loop = true;
    const nb = ctx.createBiquadFilter(); nb.type = 'bandpass'; nb.frequency.value = 700; nb.Q.value = 2;
    const ng = ctx.createGain(); ng.gain.value = 0.16; n.connect(nb).connect(ng).connect(lp); n.start(t); n.stop(t + 3.6);
    lp.connect(g);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.13, t + 0.7);
    g.gain.setValueAtTime(0.13, t + 2.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);
    g.connect(dest);
  }

  /* ---------- one-shot sounds for the experiences section ---------- */
  async oneShot(kind: 'dhak' | 'shankha' | 'bell') {
    const ctx = this.ensure();
    try { await ctx.resume(); } catch { /* ignore */ }
    if (ctx.state !== 'running') return;
    const t = ctx.currentTime + 0.01;
    if (kind === 'dhak') {
      this.dhak(t, 1, true, false, this.fx);
      this.dhak(t + 0.09, 0.5, false, false, this.fx);
      this.dhak(t + 0.18, 0.55, false, false, this.fx);
    } else if (kind === 'shankha') this.shankha(t, this.fx);
    else this.bell(t, hz(7, 2), 0.09);
  }
}

export const engine = new Engine();
