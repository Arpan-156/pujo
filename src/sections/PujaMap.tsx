import type { PointerEvent } from 'react';
import { useState } from 'react';
import { useData } from '../data/store';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import { Pin, ArrowRight } from '../components/Icons';
import { useFinePointer } from '../lib/motion';

/**
 * Stylised placeholder map. Pin positions come from `puja.map` (0?"100) and are NOT surveyed.
 * To go live, swap <MapBase /> for a Leaflet / MapLibre / Google map and project real lat/lng.
 */
function MapBase() {
  return (
    <svg className="map-base" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="mgrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M8 0H0V8" fill="none" stroke="rgba(233,181,88,0.12)" strokeWidth=".1" />
          <circle cx="0" cy="0" r="0.2" fill="rgba(233,181,88,0.3)" />
        </pattern>
        <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#193c47" />
          <stop offset="50%" stopColor="#255a6d" />
          <stop offset="100%" stopColor="#193c47" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#mgrid)" />
      
      {/* Rivers & Lakes */}
      <g filter="url(#hud-glow)">
        <path className="map-river" d="M-2 88C18 82 30 96 52 90S82 80 102 88V102H-2z" fill="url(#river-grad)" opacity=".7" />
        <path className="map-path" d="M-2 88C18 82 30 96 52 90S82 80 102 88" fill="none" stroke="#6ea6bd" strokeOpacity=".8" strokeWidth=".4" />
        <ellipse cx="72" cy="42" rx="6" ry="3.4" fill="url(#river-grad)" opacity=".8" />
        <path d="M66 42C66 38 78 38 78 42S66 46 66 42" fill="none" stroke="#6ea6bd" strokeOpacity=".8" strokeWidth=".3" />
      </g>

      {/* Main Streets */}
      <g stroke="#e9b558" strokeOpacity=".4" strokeWidth=".25" fill="none" className="map-streets">
        <path d="M0 50C25 46 40 52 60 48S90 44 100 46" filter="url(#hud-glow)" />
        <path d="M50 0C48 30 54 60 50 100" />
        <path d="M10 20C30 30 50 30 70 24S90 14 100 10" />
        <path d="M14 96C22 74 30 66 46 60" />
        <path d="M60 60C72 66 82 70 96 78" />
      </g>

      {/* Railway */}
      <path className="map-train" d="M0 62C30 58 50 64 100 56" fill="none" stroke="#ff4d4d" strokeOpacity=".6" strokeWidth=".4" strokeDasharray="1.2 1.2" filter="url(#hud-glow)" />
      
      {/* HUD Labels */}
      <g fill="#6ea6bd" fontSize="1.8" fontFamily="var(--f-sans)" fontWeight="600" letterSpacing="0.1em" opacity="0.8">
        <text x="3" y="93">DAMODAR</text>
        <circle cx="1.5" cy="92.3" r="0.4" fill="#e9b558" />
        
        <text x="63" y="37">KRISHNA SAYAR</text>
        <circle cx="61.5" cy="36.3" r="0.4" fill="#e9b558" />
      </g>
      <text x="2" y="60" fill="#ff4d4d" fontSize="1.4" fontFamily="var(--f-sans)" letterSpacing="0.15em" opacity="0.7">RAILWAY</text>
    </svg>
  );
}

export function PujaMap({ className = '' }: { className?: string }) {
  const { pujas } = useData();
  const [sel, setSel] = useState<string | null>(pujas[0]?.slug ?? null);
  const cur = pujas.find((p) => p.slug === sel);
  const fine = useFinePointer();

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width).toFixed(3));
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height).toFixed(3));
  };

  return (
    <section className={`pmap ${className}`}>
      <div className="wrap pmap-grid">
        <div className="pmap-canvas-wrap" onPointerMove={move} style={{ '--px': 0.5, '--py': 0.5 } as React.CSSProperties}>
          <div className="pmap-canvas" role="group" aria-label="Map of Puja locations">
            <div className="pmap-radar" aria-hidden="true" />
            <MapBase />
          {pujas.map((p) => (
            <button
              key={p.slug}
              className={`pin ${sel === p.slug ? 'on' : ''} ${p.featured ? 'feat' : ''}`}
              style={{ left: `${p.map.x}%`, top: `${p.map.y}%` }}
              onClick={() => setSel(p.slug)}
              aria-label={`${p.name}, ${p.area}`}
              aria-pressed={sel === p.slug}
              data-cursor="Open"
            ><i /></button>
          ))}
          <p className="pmap-note">Stylised map. Pin positions are placeholders until real coordinates are added.</p>
        </div>
        </div>
        <aside className="pmap-side" aria-live="polite">
          {cur ? (
            <div className="pmap-card" key={cur.slug}>
              <div className="pmap-img"><Photo v={cur.heroImage} alt={`${cur.name} pandal`} /></div>
              <p className="pmap-loc"><Pin size={16} /> {cur.location}</p>
              <h3>{cur.name}</h3>
              <p className="pmap-theme"><em>Theme:</em> &ldquo;{cur.theme}&rdquo;</p>
              <p>{cur.description}</p>
              <Link to={`/puja/${cur.slug}`} className="btn solid" data-cursor="Explore"><span>Explore</span><ArrowRight size={18} /></Link>
            </div>
          ) : <p>Select a pin to see the Puja.</p>}
        </aside>
      </div>
    </section>
  );
}

/** Small single-pin map for the detail page. */
export function MiniMap({ x, y, name }: { x: number; y: number; name: string }) {
  return (
    <div className="pmap-canvas mini">
      <MapBase />
      <span className="pin on static" style={{ left: `${x}%`, top: `${y}%` }} role="img" aria-label={name}><i /></span>
    </div>
  );
}
