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
export function TuniLights({ className = '' }: { className?: string }) {
  const scallops = 15;
  const w = 240;
  const h = 40;
  const ts = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  
  return (
    <div className={`tuni-wrapper ${className}`} aria-hidden="true" style={{ position: 'absolute', top: -2, left: 0, width: '100%', height: '80px', overflow: 'hidden', pointerEvents: 'none', zIndex: 15 }}>
      <style>{`
        .tuni-bulb-svg {
          animation: tuni-flash 1s infinite alternate;
        }
        .tuni-c0 { fill: #ff3b3b; filter: drop-shadow(0 4px 6px #ff3b3b); }
        .tuni-c1 { fill: #3b82f6; filter: drop-shadow(0 4px 6px #3b82f6); }
        .tuni-c2 { fill: #10b981; filter: drop-shadow(0 4px 6px #10b981); }
        .tuni-c3 { fill: #f59e0b; filter: drop-shadow(0 4px 6px #f59e0b); }
        .tuni-c4 { fill: #ec4899; filter: drop-shadow(0 4px 6px #ec4899); }
        @keyframes tuni-flash {
          0%, 20% { opacity: 0.15; filter: brightness(0.5); }
          80%, 100% { opacity: 1; filter: brightness(1.5); }
        }
      `}</style>
      <svg width={scallops * w} height="80" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
        {Array.from({ length: scallops }).map((_, i) => (
          <g key={i} transform={`translate(${i * w}, 0)`}>
            <path d={`M0,0 Q${w/2},${h*2} ${w},0`} fill="none" stroke="#000" strokeWidth="2" />
            
            {ts.map((t, bi) => {
              const bx = t * w;
              const by = 2 * (h * 2) * t * (1 - t);
              
              const slope = (2 * (h * 2) * (1 - 2 * t)) / w;
              const angle = Math.atan(slope) * (180 / Math.PI);
              
              const c = (i * ts.length + bi) % 5;
              const dur = 0.6 + Math.random() * 0.8;
              const del = Math.random() * 2;
              
              return (
                <g key={bi} transform={`translate(${bx}, ${by}) rotate(${-angle})`}>
                  <rect x="-2.5" y="-1" width="5" height="4" fill="#000" rx="1" />
                  <rect x="-3" y="3" width="6" height="12" rx="3" className={`tuni-bulb-svg tuni-c${c}`} style={{ animationDuration: `${dur}s`, animationDelay: `${del}s` }} />
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================ *
 *  Puja Scenario (Illustration)
 * ============================================================ */
export function PujaScenario({ className = '' }: { className?: string }) {
  return (
    <div className={`puja-scenario ${className}`} aria-hidden="true" style={{ position: 'absolute', bottom: '180px', right: '2%', width: 'clamp(250px, 30vw, 350px)', height: '300px', pointerEvents: 'none', zIndex: 5, color: 'var(--gold)', opacity: 0.85 }}>
      <svg viewBox="0 0 350 300" width="100%" height="100%" fill="currentColor">
        {/* Bamboo Pandal Structure */}
        <g opacity="0.15">
          <rect x="20" y="50" width="10" height="250" />
          <rect x="320" y="20" width="10" height="280" />
          <rect x="0" y="60" width="350" height="8" />
          <rect x="0" y="100" width="350" height="8" />
          <line x1="20" y1="100" x2="320" y2="20" stroke="currentColor" strokeWidth="6" />
          <line x1="20" y1="120" x2="320" y2="40" stroke="currentColor" strokeWidth="6" />
        </g>
        
        {/* Banana Tree (Kola Bou) */}
        <g transform="translate(280, 120)">
          {/* trunk */}
          <path d="M12,180 Q18,100 15,20 Q10,100 5,180 Z" />
          {/* leaves */}
          <path d="M15,30 Q60,10 70,50 Q40,40 15,30 Z" />
          <path d="M15,40 Q80,20 85,70 Q50,60 15,40 Z" />
          <path d="M5,30 Q-40,10 -50,50 Q-20,40 5,30 Z" />
          <path d="M5,40 Q-60,20 -65,70 Q-30,60 5,40 Z" />
          {/* Saree drape */}
          <path d="M3,60 Q30,100 25,180 L-5,180 Q-15,100 3,60 Z" fill="#b02626" opacity="0.9" />
        </g>

        {/* Kalsi (Kalash) */}
        <g transform="translate(200, 230)">
          {/* Pot */}
          <path d="M-15,40 C-35,60 -25,80 0,80 C25,80 35,60 15,40 C10,30 5,20 0,20 C-5,20 -10,30 -15,40 Z" />
          {/* Leaves */}
          <path d="M0,20 Q-15,5 -25,-5 Q-5,5 0,20 Z" />
          <path d="M0,20 Q15,5 25,-5 Q5,5 0,20 Z" />
          <path d="M0,20 Q0,5 -5,-10 Q5,0 0,20 Z" />
          {/* Coconut */}
          <circle cx="0" cy="5" r="12" />
        </g>

        {/* Pandit (Priest) sitting */}
        <g transform="translate(80, 200)">
          {/* Head */}
          <circle cx="35" cy="15" r="14" />
          {/* Torso leaning forward */}
          <path d="M30,25 Q50,60 30,80 L-5,80 Q5,50 20,25 Z" />
          {/* Legs crossed */}
          <path d="M-20,80 Q20,100 60,80 Q30,65 10,75 Z" />
          {/* Arm holding bell */}
          <path d="M35,35 Q70,45 80,65" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          {/* Bell */}
          <path d="M75,65 L85,65 L82,80 L78,80 Z" />
          {/* Dhuti */}
          <path d="M-20,80 Q20,95 60,80 L30,65 Z" fill="#b02626" opacity="0.5" />
        </g>

        {/* Offerings / Diya */}
        <g transform="translate(150, 270)">
          <path d="M0,0 L30,0 L25,10 L5,10 Z" />
          {/* Flame */}
          <path d="M15,-5 Q22,-12 15,-20 Q8,-12 15,-5 Z" fill="#f59e0b" />
          <circle cx="15" cy="-10" r="4" fill="#fff" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
