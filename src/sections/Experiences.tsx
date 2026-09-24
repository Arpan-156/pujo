import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { engine } from '../audio/engine';
import { useReducedMotion } from '../lib/motion';
import { Reveal, RevealText, TuniLights } from '../components/fx';

/* ------------------------------------------------------------------ *
 *  A small canvas that spawns particles where the pointer touches it.
 *  The loop only runs while particles are alive.
 * ------------------------------------------------------------------ */
type Mode = 'dhunuchi' | 'sindoor';
interface Pt { x: number; y: number; vx: number; vy: number; life: number; max: number; s: number; c: string }

function Burst({ mode, label }: { mode: Mode; label: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const pts = useRef<Pt[]>([]);
  const raf = useRef(0);
  const last = useRef({ x: 0, y: 0, t: 0 });
  const reduced = useReducedMotion();

  const run = () => {
    if (raf.current) return;
    let prev = performance.now();
    const loop = (now: number) => {
      const c = cv.current;
      const ctx = c?.getContext('2d');
      if (!c || !ctx) { raf.current = 0; return; }
      const dt = Math.min(0.04, (now - prev) / 1000); prev = now;
      const w = c.clientWidth, h = c.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const a = pts.current;
      for (let i = a.length - 1; i >= 0; i--) {
        const p = a[i];
        p.life += dt;
        if (p.life >= p.max) { a.splice(i, 1); continue; }
        const k = 1 - p.life / p.max;
        if (mode === 'dhunuchi') {
          p.vy -= 10 * dt; p.x += (p.vx + Math.sin(p.life * 5 + i) * 8) * dt; p.y += p.vy * dt;
          if (p.s > 3) { // smoke
            ctx.globalAlpha = k * 0.18; ctx.fillStyle = '#d8cfc4';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s * (2 - k), 0, 6.283); ctx.fill();
          } else { // ember
            ctx.globalAlpha = k; ctx.fillStyle = p.c;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill();
          }
        } else {
          p.vy += 60 * dt; p.vx *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt;
          ctx.globalAlpha = Math.min(1, k * 1.4) * 0.85; ctx.fillStyle = p.c;
          ctx.fillRect(p.x, p.y, p.s, p.s);
        }
      }
      ctx.globalAlpha = 1;
      raf.current = a.length ? requestAnimationFrame(loop) : 0;
    };
    raf.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const c = cv.current!;
    const fit = () => {
      const r = c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 1.5);
      c.width = r.width * d; c.height = r.height * d;
      c.getContext('2d')!.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); raf.current = 0; };
  }, []);

  const spawn = (x: number, y: number, n: number) => {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      if (pts.current.length > 260) break;
      if (mode === 'dhunuchi') {
        const smoke = Math.random() < 0.45;
        pts.current.push({ x: x + (Math.random() - 0.5) * 16, y, vx: (Math.random() - 0.5) * 22, vy: -(20 + Math.random() * 40), life: 0, max: smoke ? 2.4 + Math.random() : 1 + Math.random() * 1.2, s: smoke ? 6 + Math.random() * 8 : 1 + Math.random() * 1.8, c: Math.random() < 0.5 ? '#ffb347' : '#ff7a2f' });
      } else {
        const a = Math.random() * 6.283, sp = 30 + Math.random() * 150;
        pts.current.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60, life: 0, max: 1.2 + Math.random() * 1.2, s: 1.5 + Math.random() * 2.5, c: Math.random() < 0.8 ? '#d2261b' : '#ff5a2a' });
      }
    }
    run();
  };
  const at = (e: PointerEvent) => { const r = cv.current!.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] as const; };
  const onMove = (e: PointerEvent) => {
    const [x, y] = at(e), t = performance.now();
    if (t - last.current.t < 40) return;
    last.current = { x, y, t };
    spawn(x, y, mode === 'dhunuchi' ? 2 : e.buttons ? 8 : 0);
  };
  const onDown = (e: PointerEvent) => { const [x, y] = at(e); spawn(x, y, mode === 'sindoor' ? 90 : 14); if (mode === 'dhunuchi') engine.oneShot('bell'); };

  return <canvas ref={cv} className="burst" onPointerMove={onMove} onPointerDown={onDown} role="img" aria-label={label} />;
}

/* ------------------------------------------------------------------ */
const PAT = 'XtXtdtXtXtXtdtXt';

function DhakTile() {
  const [hit, setHit] = useState(0);
  const [step, setStep] = useState(-1);
  const [auto, setAuto] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!auto) { setStep(-1); return; }
    let i = 0;
    const id = setInterval(() => {
      const ch = PAT[i % 16];
      setStep(i % 16);
      if (ch !== 't' && !reduced) engine.oneShot('dhak');
      i++;
    }, 230);
    return () => clearInterval(id);
  }, [auto, reduced]);

  return (
    <div className="xp xp-dhak">
      <div className="xp-copy">
        <p className="bn" lang="bn">ঢাক</p>
        <h3>Dhak</h3>
        <p>The drum that tells the neighbourhood it is time. Tap it, or let the pattern run.</p>
        <button className={`chip ${auto ? 'solid' : ''}`} aria-pressed={auto} onClick={() => setAuto((a) => !a)} data-cursor={auto ? 'Stop' : 'Play'}>{auto ? 'Stop the pattern' : 'Play the pattern'}</button>
      </div>
      <button className={`dhak-drum ${hit ? 'hit' : ''}`} key={hit} onClick={() => { setHit((h) => h + 1); engine.oneShot('dhak'); }} aria-label="Strike the dhak" data-cursor="Strike">
        {hit > 0 && <><span className="ripple" /><span className="ripple r2" /></>}
        <svg viewBox="0 0 240 200" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id="dk" cx=".5" cy=".4"><stop offset="0" stopColor="#f6dfa8" /><stop offset="1" stopColor="#b9772f" /></radialGradient>
          </defs>
          <path d="M28 66C90 42 150 42 212 66l14 84c-62 34-150 34-212 0z" fill="#5b1216" stroke="#e9b558" strokeWidth="2" />
          {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${38 + i * 16} 60L${28 + i * 18.5} 158`} stroke="#e9b558" strokeOpacity=".55" strokeWidth="1.4" />)}
          <ellipse cx="120" cy="62" rx="94" ry="20" fill="url(#dk)" stroke="#e9b558" strokeWidth="2" />
          <ellipse cx="120" cy="62" rx="36" ry="7" fill="#7a3d12" opacity=".5" />
          <path d="M8 18l70 40M232 18l-70 40" stroke="#e9b558" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </button>
      <ol className="dhak-steps" aria-label="Rhythm pattern">
        {PAT.split('').map((c, i) => <li key={i} className={`${c === 't' ? 'soft' : c === 'd' ? 'mid' : 'hard'} ${step === i ? 'on' : ''}`} />)}
      </ol>
    </div>
  );
}

function ShankhaTile() {
  const [n, setN] = useState(0);
  return (
    <div className="xp xp-shankha">
      <div className="xp-copy">
        <p className="bn" lang="bn">শঙ্খ</p>
        <h3>Shankha</h3>
        <p>Married women blow the conch at every welcome. One long breath, held as long as you can.</p>
        <button className="chip solid" onClick={() => { setN((v) => v + 1); engine.oneShot('shankha'); }} data-cursor="Blow">Blow the shankha</button>
      </div>
      <div className="shankha-stage" key={n}>
        {n > 0 && [0, 1, 2, 3].map((i) => <span key={i} className="wave" style={{ animationDelay: `${i * 0.35}s` }} />)}
        <svg viewBox="0 0 200 160" fill="none" aria-hidden="true" className={n ? 'glow' : ''}>
          <path d="M30 100c0-42 32-74 82-74 30 0 52 16 52 40 0 22-18 36-40 36-14 0-26-8-26-20 0-10 8-16 18-16" stroke="#f6efe2" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 100c-8 10-6 30 14 36 34 10 82 0 100-30" stroke="#f6efe2" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${58 + i * 20} ${44 + i * 3}q10 ${18 - i * 2} ${-2} ${34 - i * 3}`} stroke="#f6efe2" strokeOpacity=".5" strokeWidth="1.6" />)}
          <path d="M20 108l14-8" stroke="#c8281e" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function Experiences() {
  return (
    <section className="exp" style={{ position: 'relative' }}>
      <TuniLights />
      <div className="wrap">
        <div className="exp-head">
          <RevealText lines={['BURDWAN PUJA,', 'UP CLOSE']} className="display" />
          <Reveal delay={200} className="lead">Four sounds and smells of the festival. Touch them.</Reveal>
        </div>
        <div className="exp-grid">
          <Reveal className="exp-a"><DhakTile /></Reveal>
          <Reveal delay={120} className="exp-b">
            <div className="xp xp-dhunuchi">
              <Burst mode="dhunuchi" label="Move your pointer across the dark to raise dhunuchi smoke and embers" />
              <div className="xp-copy on-canvas">
                <p className="bn" lang="bn">ধুনুচি</p>
                <h3>Dhunuchi</h3>
                <p>Coconut husk, camphor, a clay burner. Move through the smoke.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="exp-c">
            <div className="xp xp-sindoor">
              <Burst mode="sindoor" label="Press or drag to throw sindoor" />
              <div className="xp-copy on-canvas">
                <p className="bn" lang="bn">সিঁদুর খেলা</p>
                <h3>Sindoor Khela</h3>
                <p>Dashami afternoon. Press, or press and drag, to throw the red.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={280} className="exp-d"><ShankhaTile /></Reveal>
        </div>
      </div>
    </section>
  );
}
