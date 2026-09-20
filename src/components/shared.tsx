import { Children, isValidElement, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Puja } from '../data/types';
import { BRANDS, NAV } from '../data/site';
import { Link } from '../lib/router';
import { useReducedMotion } from '../lib/motion';
import { Photo } from './Art';
import { Alpana, BrandMark, DhakIcon, DurgaEye, LaalPaar, Magnetic, Reveal, RevealText, Rays, Particles } from './fx';
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
export function PageHead({ lines, bn, visual, lead, tall = false }: { lines: string[]; bn: string; visual: Visual; lead?: string; tall?: boolean }) {
  return (
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
  );
}

/* ---------- puja card ---------- */
export function PujaCard({ p }: { p: Puja }) {
  return (
    <article className="pcard" data-flip={p.slug}>
      <Link to={`/puja/${p.slug}`} className="pcard-img" data-cursor="View" aria-label={`Open ${p.name}`}>
        <Photo v={p.heroImage} alt={`${p.name} pandal`} />
        <span className="pcard-idol"><Photo v={p.idolImage} alt={`${p.name} idol`} /></span>
        {p.featured && <span className="tag-feat">Featured</span>}
        <span className="pcard-year">Since {p.established}</span>
      </Link>
      <div className="pcard-body">
        <p className="pcard-cats">{p.categories.join(' · ')}</p>
        <h3><Link to={`/puja/${p.slug}`}>{p.name}</Link></h3>
        <p className="pcard-loc">{p.location}</p>
        <p className="pcard-theme"><em>Theme:</em> “{p.theme}”</p>
        <p className="pcard-desc">{p.description}</p>
        <div className="pcard-actions">
          <Link to={`/puja/${p.slug}`} className="chip solid" data-cursor="Explore">Explore</Link>
          <Link to={`/puja/${p.slug}?view=pandal`} className="chip" data-cursor="View">View Pandal</Link>
          <Link to={`/pujas?theme=${p.themeId}`} className="chip" data-cursor="Filter">View Theme</Link>
        </div>
      </div>
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

/* ---------- footer ---------- */
export function Footer() {
  return (
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
        <p className="footer-copy">© 2026 Burdwan Capturers Official × Banglar Pujo Official</p>
      </div>
    </footer>
  );
}
