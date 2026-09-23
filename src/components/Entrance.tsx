import { useEffect, useRef, useState } from 'react';
import { engine } from '../audio/engine';
import { useReducedMotion } from '../lib/motion';
import { useRouter } from '../lib/router';
import { Alpana, Particles, Smoke } from './fx';

/* ============================================================ *
 *  1. Loader → 2. audio gate
 * ============================================================ */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [needsTap, setNeedsTap] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const t0 = performance.now();
    const dur = reduced ? 600 : 2600;
    let raf = 0;
    
    const fontsReady = (document.fonts?.ready ?? Promise.resolve()).catch(() => undefined);
    const loop = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(loop);
      else {
        Promise.all([fontsReady, new Promise((r) => setTimeout(r, 200))]).then(([ok]) => {
          if (done.current) return;
          setNeedsTap(true);
        });
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = async (music: boolean) => {
    if (done.current) return;
    done.current = true;
    if (music) { await engine.unlock(); engine.play(0); }
    onDone();
  };

  return (
    <div className={`loader ${needsTap ? 'tap' : ''}`} onClick={() => needsTap && enter(true)} role={needsTap ? 'button' : undefined} tabIndex={needsTap ? 0 : -1}
      onKeyDown={(e) => needsTap && (e.key === 'Enter' || e.key === ' ') && enter(true)} data-cursor={needsTap ? 'Enter' : undefined}>
      <Particles kind="dust" count={40} />
      <div className="loader-core">
        <Alpana size={150} className="loader-alpana" />
        <p className="loader-bn">পুজোর প্রস্তুতি চলছে</p>
        <p className="loader-en">Preparing the Puja</p>
        <div className="loader-bar" aria-hidden="true"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <p className="loader-pct">{pct}%</p>
      </div>
      <div className={`loader-tap ${needsTap ? 'in' : ''}`}>
        <p className="tap-main">Tap anywhere to enter the Puja</p>
        <p className="tap-sub">Sound on. The Puja has its own music.</p>
        <button className="tap-skip" onClick={(e) => { e.stopPropagation(); enter(false); }}>Continue without music</button>
      </div>
    </div>
  );
}

/* ============================================================ *
 *  3. Cinematic intro
 * ============================================================ */
const TITLE = ['BARDHAMAN', 'DURGA PUJA', '2026'];

export function Intro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const k = reduced ? 0.35 : 1;
    const ids = [
      setTimeout(() => setStep(1), 500 * k),
      setTimeout(() => setStep(2), 3000 * k),
      setTimeout(() => setStep(3), 5300 * k),
      setTimeout(() => setLeaving(true), 8600 * k),
      setTimeout(onDone, 9500 * k),
    ];
    return () => ids.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => { setLeaving(true); setTimeout(onDone, 500); };

  return (
    <div className={`intro s${step} ${leaving ? 'leaving' : ''}`}>
      <Smoke className="intro-smoke" />
      <Particles kind="embers" count={70} />
      <div className="intro-vignette" />
      <div className="intro-center">
        <p className={`intro-bn ${step >= 1 ? 'in' : ''}`}>শুভ দুর্গোৎসব</p>
        <h1 className={`intro-title ${step >= 2 ? 'in' : ''}`} aria-label="Bardhaman Durga Puja 2026">
          {TITLE.map((w, wi) => (
            <span className="intro-word" key={w} aria-hidden="true">
              {w.split('').map((ch, i) => <i key={i} style={{ ['--i' as string]: wi * 5 + i }}>{ch === ' ' ? '\u00A0' : ch}</i>)}
            </span>
          ))}
        </h1>
        <div className={`intro-presented ${step >= 3 ? 'in' : ''}`}>
          <span className="intro-line" />
          <p className="pre">Presented by</p>
          <p className="who"><span>Burdwan Capturers Official</span><b>×</b><span>Banglar Pujo Official</span></p>
        </div>
        <div className="intro-sweep" aria-hidden="true" />
      </div>
      <button className="intro-skip" onClick={skip}>Skip intro</button>
    </div>
  );
}

/* ============================================================ *
 *  4. Curtain reveal
 * ============================================================ */
export function Curtain({ onOpenStart, onDone }: { onOpenStart: () => void; onDone: () => void }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const ids = [
      setTimeout(() => { setOpen(true); onOpenStart(); }, reduced ? 300 : 2100),
      setTimeout(onDone, reduced ? 900 : 5200),
    ];
    return () => ids.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`curtain-stage ${open ? 'open' : ''}`} aria-hidden="true">
      <div className="curtain left"><div className="curtain-fringe" /></div>
      <div className="curtain right"><div className="curtain-fringe" /></div>
      <div className="valance" />
      <div className="curtain-emblem">
        <span className="ce-bn">স্বাগতম</span>
        <span className="ce-en">Welcome to the Puja</span>
      </div>
      <div className="curtain-sheen" />
    </div>
  );
}

/* ============================================================ *
 *  Page transition wipe
 * ============================================================ */
export function PageWipe() {
  const { phase, label } = useRouter();
  return (
    <div className={`wipe ${phase}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => <i key={i} style={{ ['--i' as string]: i }} />)}
      <div className="wipe-label">
        <span className="bn">{label.bn}</span>
        <span className="en">{label.en}</span>
      </div>
    </div>
  );
}
