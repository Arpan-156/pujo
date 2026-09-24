import { createPortal } from 'react-dom';
import { Children, isValidElement, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Puja } from '../data/types';
import { BRANDS, NAV } from '../data/site';
import { Link, useRouter } from '../lib/router';
import { useReducedMotion } from '../lib/motion';
import { Photo } from './Art';
import { Alpana, BrandMark, DhakIcon, DurgaEye, LaalPaar, Magnetic, Reveal, RevealText, Rays, Particles, TuniLights } from './fx';
import { ArrowRight, Facebook, Instagram, Youtube } from './Icons';
import type { Visual } from '../data/types';

/* ---------- buttons ---------- */
export function Btn({ to, children, variant = 'solid', cursor = 'Open', onClick }: { to?: string; children: ReactNode; variant?: 'solid' | 'ghost' | 'gold'; cursor?: string; onClick?: () => void }) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight size={18} />
    </>
  );
  return (
    <Magnetic>
      {to ? (
        <Link to={to} className={`btn ${variant}`} data-cursor={cursor}>{inner}</Link>
      ) : (
        <button className={`btn ${variant}`} onClick={onClick} data-cursor={cursor}>{inner}</button>
      )}
    </Magnetic>
  );
}

/* ---------- page header with photograph ---------- */
export function PageHead({ lines, bn, visual, lead, tall = false, tuni = true }: { lines: string[]; bn: string; visual: Visual; lead?: string; tall?: boolean; tuni?: boolean }) {
  return (
    <>
      <section className={`page-head ${tall ? 'tall' : ''}`}>
      <div className="page-head-bg"><Photo v={visual} eager /></div>
      <Rays />
      <Particles kind="embers" count={26} />
      <div className="page-head-shade" />
      <div className="wrap page-head-in">
        <p className="bn-line" lang="bn">{bn}</p>
        <RevealText as="h1" lines={lines} className="display" live />
        {lead && <Reveal delay={400} live className="lead">{lead}</Reveal>}
      </div>
      <LaalPaar className="ph-paar" />
      </section>
      {tuni && (
        <div style={{ position: 'relative', width: '100%', height: '50px', zIndex: 10, marginTop: '-2px' }}>
          <TuniLights />
        </div>
      )}
    </>
  );
}

/* ---------- puja card ---------- */
export function PujaCard({ p }: { p: Puja }) {
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width).toFixed(3));
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height).toFixed(3));
  };
  const leave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--px', '0.5');
    e.currentTarget.style.setProperty('--py', '0.5');
  };

  const Wrapper: any = p.featured ? Link : 'div';
  const props = p.featured ? { to: `/puja/${p.slug}`, 'data-cursor': 'View' } : { style: { cursor: 'default' } };

  return (
    <article className="pcard" data-flip={p.slug} onPointerMove={move} onPointerLeave={leave} style={{ '--px': 0.5, '--py': 0.5 } as React.CSSProperties}>
      <Wrapper className="pcard-body" {...props}>
        <p className="pcard-cats">
          {p.featured && <span className="feat-tag">Featured • </span>}
          {p.categories.join(' • ')}
        </p>
        <h3 className="pcard-title">
          <span className="pcard-title-text">{p.name}</span>
          <span className="pcard-title-glow" aria-hidden="true">{p.name}</span>
        </h3>
        <p className="pcard-loc">{p.location}</p>
        <p className="pcard-theme"><em>Theme:</em> “{p.theme}”</p>
      </Wrapper>
    </article>
  );
}

/* ---------- FLIP layout animation for filtering ---------- */
export function FlipGrid({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(new Map<string, DOMRect>());
  const reduced = useReducedMotion();
  const keys = Children.toArray(children).map((c) => (isValidElement(c) ? String(c.key) : '')).join('|');

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const next = new Map<string, DOMRect>();
    const els = Array.from(root.children) as HTMLElement[];
    els.forEach((el) => next.set(el.dataset.key ?? '', el.getBoundingClientRect()));
    if (!reduced && prev.current.size) {
      els.forEach((el) => {
        const k = el.dataset.key ?? '';
        const a = prev.current.get(k), b = next.get(k)!;
        if (a) {
          const dx = a.left - b.left, dy = a.top - b.top;
          if (dx || dy) el.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
        } else {
          el.animate([{ opacity: 0, transform: 'translateY(24px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)', delay: 60 });
        }
      });
    }
    prev.current = next;
  }, [keys, reduced]);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (c) => (isValidElement(c) ? <div className="flip-item" data-key={String(c.key)}>{c}</div> : c))}
    </div>
  );
}

/* ---------- social ---------- */
export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
] as const;

/* ---------- kash field ---------- */
export function KashField() {
  return (
    <>
      <style>{`
        @keyframes sway {
          0% { transform: rotate(-12deg); }
          100% { transform: rotate(12deg); }
        }
        .kash-field {
          position: relative;
          height: 0;
          width: 100%;
          pointer-events: none;
          z-index: 50;
        }
        .kash-stalk {
          position: absolute;
          bottom: 0px;
          transform-origin: bottom center;
        }
      `}</style>
      <div className="kash-field" aria-hidden="true">
        {Array.from({ length: 50 }, (_, i) => {
          const x = Math.random() * 100;
          const s = 0.6 + Math.random() * 0.7;
          const delay = Math.random() * -5;
          const dur = 3 + Math.random() * 4;
          return (
            <div key={i} className="kash-stalk" style={{
              left: `${x}%`,
              transform: `scale(${s})`,
            }}>
              <div style={{
                transformOrigin: 'bottom center',
                animation: `sway ${dur}s ease-in-out ${delay}s infinite alternate`
              }}>
                <svg width="20" height="90" viewBox="0 0 20 90" overflow="visible">
                  <path d="M10 90 Q10 40 10 10" stroke="#a08a70" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <ellipse cx="10" cy="15" rx="5" ry="20" fill="#f8efe0" opacity="0.9" transform="rotate(-5 10 15)" />
                  <ellipse cx="10" cy="15" rx="2" ry="16" fill="#fff" opacity="0.7" transform="rotate(-5 10 15)" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------- footer ---------- */
export function Footer() { const [showCopyright, setShowCopyright] = useState(false);
    const { pathname } = useRouter();

  useLayoutEffect(() => {
    if (showCopyright) document.documentElement.classList.add('locked');
    else document.documentElement.classList.remove('locked');
    return () => document.documentElement.classList.remove('locked');
  }, [showCopyright]);


  return (
    <>
      
      {pathname === '/' && <KashField />}
      <footer className="footer">
        <LaalPaar />
        <Alpana size={900} className="footer-alpana" />
      <div className="wrap footer-in">
        <div className="footer-lockup">
          <div className="fl-a"><BrandMark brand="capturers" size={54} /><span>Burdwan Capturers Official</span></div>
          <b className="fl-x" aria-hidden="true">×</b>
          <div className="fl-a"><BrandMark brand="pujo" size={54} /><span>Banglar Pujo Official</span></div>
        </div>
        <div className="footer-grid">
          <div>
            <p className="footer-h">Explore</p>
            <ul>{NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
              <li><Link to="/map">Puja Map</Link></li><li><Link to="/timeline">The Five Days</Link></li></ul>
          </div>
          <div>
            <p className="footer-h">Burdwan Capturers</p>
            <div className="footer-soc">{SOCIALS.map(({ key, Icon, label }) => <a key={key} href={BRANDS.capturers.socials[key]} aria-label={`Burdwan Capturers on ${label}`} data-cursor="Follow"><Icon size={20} /></a>)}</div>
            <p className="footer-h" style={{ marginTop: 28 }}>Banglar Pujo</p>
            <div className="footer-soc">{SOCIALS.map(({ key, Icon, label }) => <a key={key} href={BRANDS.pujo.socials[key]} aria-label={`Banglar Pujo on ${label}`} data-cursor="Follow"><Icon size={20} /></a>)}</div>
          </div>
          <div className="footer-eggs">
            <DurgaEye />
            <DhakIcon size={40} />
            <p className="bn">মা আসছেন</p>
          </div>
        </div>
        <p className="footer-love">Made with love for Bardhaman &amp; Bengal.</p>
        <button className="footer-copy-btn" onClick={() => setShowCopyright(true)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--mute)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline', fontStyle: 'italic', opacity: 0.8, justifySelf: 'center', alignSelf: 'center' }}>all copyrights are reserved by Burdwan Captuers Official</button>
        {showCopyright && typeof document !== 'undefined' && createPortal((
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20, 8, 9, 0.92)', backdropFilter: 'blur(10px)' }} onClick={() => setShowCopyright(false)}>
            
            <div style={{ position: 'relative', background: 'var(--ink)', padding: '40px', borderRadius: '12px', border: '1px solid var(--gold)', maxWidth: '500px', textAlign: 'center', margin: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: 'var(--gold-2)', fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'var(--f-display)' }}>Copyright Notice</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, marginBottom: '30px', fontSize: '0.95rem' }}>All content, photographs, videos, and graphics on this website are the exclusive property of <strong>Burdwan Capturers Official</strong> and <strong>Banglar Pujo Official</strong>. Unauthorized use, reproduction, or distribution without prior written permission is strictly prohibited and may result in legal action.</p>
              <button onClick={() => setShowCopyright(false)} style={{ background: 'var(--gold)', color: 'var(--ink)', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        ), document.body)}
      </div>
    </footer>
    </>
  );
}
