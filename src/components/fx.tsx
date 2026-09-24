const dpr = Math.min(window.devicePixelRatio || 1, 1);import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useFinePointer, useInView, useIsMobile, useReducedMotion } from '../lib/motion';
import { engine } from '../audio/engine';

/* ============================================================ *
 *  Custom cursor
 * ============================================================ */
export function Cursor() {
  const fine = useFinePointer();
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');
    const el = root.current!;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; el.classList.add('on'); rx = x; ry = y; }
      const t = e.target as Element | null;
      const tag = t?.closest?.('[data-cursor]') as HTMLElement | null;
      const inter = t?.closest?.('a,button,input,[role="button"],select,label');
      const text = tag?.dataset.cursor || '';
      el.classList.toggle('big', !!text);
      el.classList.toggle('link', !text && !!inter);
      if (label.current && label.current.textContent !== text) label.current.textContent = text;
    };
    const leave = () => { shown = false; el.classList.remove('on'); };
    const down = () => el.classList.add('down');
    const up = () => el.classList.remove('down');
    const loop = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      el.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [fine]);
  if (!fine) return null;
  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div className="cursor-ring"><span ref={label} /></div>
      <div className="cursor-dot" />
    </div>
  );
}

/* ============================================================ *
 *  Particles: embers, shiuli petals, dust (one canvas, paused offscreen)
 * ============================================================ */
type PKind = 'embers' | 'petals' | 'dust';
interface P { x: number; y: number; vx: number; vy: number; s: number; a: number; ph: number; rot: number; vr: number; type?: number }

export function Particles({ kind = 'embers', count = 60, className = '' }: { kind?: PKind; count?: number; className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => {
    const c = cv.current;
    if (!c || reduced) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const n = Math.round(count * (mobile ? 0.25 : 0.5));
    let w = 0, h = 0, raf = 0, visible = true, last = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const size = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = Math.max(1, w * dpr); c.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const mk = (init: boolean): P => ({
      x: Math.random() * w,
      y: kind === 'petals' ? (init ? Math.random() * h : -20) : init ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * (kind === 'dust' ? 6 : 14),
      vy: kind === 'petals' ? 14 + Math.random() * 26 : -(kind === 'dust' ? 3 : 14) - Math.random() * (kind === 'dust' ? 6 : 34),
      s: kind === 'petals' ? 3 + Math.random() * 4 : 0.7 + Math.random() * 2,
      a: 0.3 + Math.random() * 0.7, ph: Math.random() * 6.28, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 2,
      type: kind === 'petals' ? Math.floor(Math.random() * 5) : 0
    });
    const ps = Array.from({ length: n }, () => mk(true));
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.ph += dt * 2; p.x += (p.vx + Math.sin(p.ph) * 10) * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
        if (p.y < -20 || p.y > h + 24 || p.x < -20 || p.x > w + 20) { ps[i] = mk(false); continue; }
        if (kind === 'petals') {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = p.a * 0.85;
          
          if (p.type === 1) { // Leaf
            ctx.fillStyle = '#4a7550'; ctx.beginPath(); ctx.ellipse(0, 0, p.s * 1.8, p.s * 0.8, 0, 0, 6.28); ctx.fill();
            ctx.strokeStyle = '#395c3e'; ctx.lineWidth = p.s * 0.2; ctx.beginPath(); ctx.moveTo(-p.s * 1.6, 0); ctx.lineTo(p.s * 1.6, 0); ctx.stroke();
          } else if (p.type === 2) { // Marigold (Genda)
            ctx.fillStyle = '#ff9900'; ctx.beginPath();
            for (let j = 0; j < 8; j++) { ctx.ellipse(Math.cos(j*0.78)*p.s*0.5, Math.sin(j*0.78)*p.s*0.5, p.s*0.8, p.s*0.8, 0, 0, 6.28); }
            ctx.fill();
            ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.arc(0, 0, p.s*0.4, 0, 6.28); ctx.fill();
          } else if (p.type === 3) { // Red Hibiscus (Jaba)
            ctx.fillStyle = '#d32f2f'; ctx.beginPath();
            for (let j = 0; j < 5; j++) { const a = j * 1.256; ctx.ellipse(Math.cos(a)*p.s*0.7, Math.sin(a)*p.s*0.7, p.s*1.1, p.s*0.6, a, 0, 6.28); }
            ctx.fill();
            ctx.strokeStyle = '#ffc107'; ctx.lineWidth = p.s*0.15; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(p.s*1.2, p.s*1.2); ctx.stroke();
          } else if (p.type === 4) { // Pink Lotus petal
            ctx.fillStyle = '#ec407a'; ctx.beginPath(); ctx.moveTo(-p.s, 0); ctx.quadraticCurveTo(0, -p.s*1.5, p.s, 0); ctx.quadraticCurveTo(0, p.s*1.5, -p.s, 0); ctx.fill();
          } else { // Shiuli
            ctx.fillStyle = '#fbf3e4'; ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * 0.45, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = '#f0a25a'; ctx.beginPath(); ctx.arc(p.s * 0.6, 0, p.s * 0.22, 0, 6.28); ctx.fill();
          }
          
          ctx.restore();
        } else {
          const f = kind === 'embers' ? 0.55 + 0.45 * Math.sin(p.ph * 3) : 1;
          ctx.globalAlpha = p.a * 0.16 * f; ctx.fillStyle = kind === 'embers' ? '#ff9a3c' : '#f6d58e';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 4, 0, 6.28); ctx.fill();
          ctx.globalAlpha = p.a * f; ctx.fillStyle = kind === 'embers' ? '#ffd07a' : '#fff1cf';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.28); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    const ro = new ResizeObserver(size);
    ro.observe(c);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [kind, count, reduced, mobile]);
  return <canvas ref={cv} className={`particles ${className}`} aria-hidden="true" />;
}

/* ============================================================ *
 *  Smoke and light rays (CSS only)
 * ============================================================ */
export function Smoke({ className = '' }: { className?: string }) {
  return (
    <div className={`smoke ${className}`} aria-hidden="true">
      <i /><i /><i /><i /><i />
    </div>
  );
}
export const Rays = ({ className = '' }: { className?: string }) => <div className={`rays ${className}`} aria-hidden="true" />;

/* ============================================================ *
 *  Reveal helpers
 * ============================================================ */
export function Reveal({
  as: Tag = 'div', variant = 'up', delay = 0, className = '', children, style, live,
}: { as?: ElementType; variant?: 'up' | 'fade' | 'zoom' | 'left' | 'right' | 'blur'; delay?: number; className?: string; children?: ReactNode; style?: CSSProperties; live?: boolean }) {
  const [ref, inView] = useInView<HTMLElement>();
  const on = live ?? inView;
  return (
    <Tag ref={ref} className={`rv rv-${variant} ${on ? 'in' : ''} ${className}`} style={{ ...style, ['--d' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** Headline where every line rises from behind a mask. */
export function RevealText({
  lines, as: Tag = 'h2', className = '', delay = 0, live, bn,
}: { lines: string[]; as?: ElementType; className?: string; delay?: number; live?: boolean; bn?: boolean }) {
  const [ref, inView] = useInView<HTMLElement>();
  const on = live ?? inView;
  return (
    <Tag ref={ref} className={`rt ${on ? 'in' : ''} ${bn ? 'bn' : ''} ${className}`}>
      {lines.map((l, i) => (
        <span className="rt-line" key={i}>
          <span style={{ ['--d' as string]: `${delay + i * 110}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Magnetic({ children, strength = 0.28, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  useEffect(() => {
    const el = ref.current;
    if (!el || !fine) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${dx * strength}px,${dy * strength}px,0)`;
    };
    const reset = () => (el.style.transform = '');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); };
  }, [fine, strength]);
  return <span ref={ref} className={`magnetic ${className}`}>{children}</span>;
}

/* ============================================================ *
 *  Bengali motifs
 * ============================================================ */
export const LaalPaar = ({ className = '' }: { className?: string }) => <div className={`laal-paar ${className}`} aria-hidden="true" />;

/** Rice-paste alpana: petal rings and dots, hover to stir it. */
export function Alpana({ size = 320, className = '', spin = true }: { size?: number; className?: string; spin?: boolean }) {
  const petals = (n: number, r: number, len: number, w: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * 360;
      return <path key={i} pathLength={1} transform={`rotate(${a} 100 100)`} d={`M100 ${100 - r}q${w} ${-len / 2} 0 ${-len}q${-w} ${len / 2} 0 ${len}z`} />;
    });
  return (
    <svg className={`alpana ${spin ? 'spin' : ''} ${className}`} width={size} height={size} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth=".7" aria-hidden="true">
      <g className="ring r1">{petals(16, 92, 26, 7)}</g>
      <g className="ring r2">{petals(12, 64, 26, 9)}</g>
      <g className="ring r3">{petals(8, 38, 22, 8)}</g>
      <circle cx="100" cy="100" r="98" strokeDasharray="1 4" />
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="14" />
      <g className="dots" fill="currentColor" stroke="none">
        {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={100 + Math.cos((i / 24) * 6.283) * 80} cy={100 + Math.sin((i / 24) * 6.283) * 80} r="1.3" style={{ ['--a' as string]: `${(i / 24) * 360}deg` }} />)}
      </g>
    </svg>
  );
}

/* ============================================================ *
 *  Logos (placeholders: replace with real artwork via `src`)
 * ============================================================ */
export function BrandMark({ brand, size = 44, className = '' }: { brand: 'capturers' | 'pujo'; size?: number; className?: string }) {
  const src = brand === 'capturers' ? '/logos/capturers.jpg' : '/logos/pujo.jpg';
  return <img src={src} width={size} height={size} alt={brand} className={`brand-mark ${className}`} style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
}

/* ============================================================ *
 *  Easter eggs
 * ============================================================ */
export function DhakIcon({ size = 30 }: { size?: number }) {
  const [hit, setHit] = useState(0);
  return (
    <button className={`egg-dhak ${hit ? 'hit' : ''}`} key={hit} aria-label="Play a dhak beat" data-cursor="Play"
      onClick={() => { setHit((h) => h + 1); engine.oneShot('dhak'); }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M7 10c6-3 12-3 18 0l3 12c-8 5-16 5-24 0z" /><ellipse cx="16" cy="10" rx="9" ry="2.200" />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${9 + i * 3.500} 11L${6 + i * 5} 24`} opacity=".55" />)}
        <path d="M3 4l7 8M29 4l-7 8" />
      </svg>
    </button>
  );
}

export function DurgaEye() {
  const [on, setOn] = useState(false);
  return (
    <button className={`egg-eye ${on ? 'on' : ''}`} aria-label="Chokkhu daan: open the eye" onClick={() => { setOn(true); setTimeout(() => setOn(false), 2600); engine.oneShot('bell'); }}>
      <svg viewBox="0 0 120 56" width="96" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M4 30C24 4 96 4 116 30 96 52 24 52 4 30z" /><path d="M4 30C24 22 96 22 116 30" opacity=".45" />
        <circle className="iris" cx="60" cy="30" r="12" /><circle className="pupil" cx="60" cy="30" r="5" fill="currentColor" />
      </svg>
    </button>
  );
}

/* ============================================================ *
 *  Tuni Lights (Decoration)
 * ============================================================ */
export function TuniLights({ className = '', count = 40 }: { className?: string; count?: number }) {
  return (
    <div className={`tuni-wrapper ${className}`} aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'space-around', pointerEvents: 'none', zIndex: 15 }}>
      <style>{`
        .tuni-bulb {
          width: 5px;
          height: 10px;
          border-radius: 50px 50px 30px 30px;
          position: relative;
          margin-top: 4px;
          animation: tuni-flash 1s infinite alternate;
        }
        .tuni-bulb::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 0.5px;
          width: 4px;
          height: 4px;
          background: #000;
          border-radius: 2px 2px 0 0;
        }
        .tuni-bulb::after {
          content: '';
          position: absolute;
          top: -3px;
          left: -5vw;
          width: 10vw;
          height: 1px;
          background: #000;
          z-index: -1;
        }
        .tuni-c0 { background: #ff3b3b; box-shadow: 0 4px 12px #ff3b3b; }
        .tuni-c1 { background: #3b82f6; box-shadow: 0 4px 12px #3b82f6; }
        .tuni-c2 { background: #10b981; box-shadow: 0 4px 12px #10b981; }
        .tuni-c3 { background: #f59e0b; box-shadow: 0 4px 12px #f59e0b; }
        .tuni-c4 { background: #ec4899; box-shadow: 0 4px 12px #ec4899; }
        @keyframes tuni-flash {
          0%, 20% { opacity: 0.1; filter: brightness(0.5); }
          80%, 100% { opacity: 1; filter: brightness(1.5); }
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => {
        const c = i % 5;
        const dur = 0.6 + Math.random() * 0.8;
        const del = Math.random() * 2;
        return (
          <div key={i} className={`tuni-bulb tuni-c${c}`} style={{ animationDuration: `${dur}s`, animationDelay: `${del}s` }} />
        );
      })}
    </div>
  );
}
