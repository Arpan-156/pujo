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
        <pattern id="mgrid" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0H0V4" fill="none" stroke="#e9b558" strokeOpacity=".07" strokeWidth=".15" /></pattern>
      </defs>
      <rect width="100" height="100" fill="url(#mgrid)" />
      {/* Damodar */}
      <path className="map-river" d="M-2 88C18 82 30 96 52 90S82 80 102 88V102H-2z" fill="#1c3a4a" opacity=".55" />
      <path className="map-path" d="M-2 88C18 82 30 96 52 90S82 80 102 88" fill="none" stroke="#6ea6bd" strokeOpacity=".5" strokeWidth=".3" />
      {/* lake */}
      <ellipse cx="72" cy="42" rx="6" ry="3.4" fill="#1c3a4a" opacity=".6" />
      {/* main streets */}
      <g stroke="#e9b558" strokeOpacity=".22" strokeWidth=".35" fill="none" className="map-streets">
        <path d="M0 50C25 46 40 52 60 48S90 44 100 46" />
        <path d="M50 0C48 30 54 60 50 100" />
        <path d="M10 20C30 30 50 30 70 24S90 14 100 10" />
        <path d="M14 96C22 74 30 66 46 60" />
        <path d="M60 60C72 66 82 70 96 78" />
      </g>
      {/* railway */}
      <path className="map-train" d="M0 62C30 58 50 64 100 56" fill="none" stroke="#f6efe2" strokeOpacity=".45" strokeWidth=".55" strokeDasharray="1.6 1.2" />
      <g fill="#f6efe2" fillOpacity=".5" fontSize="2.3" fontFamily="Hanken Grotesk, sans-serif">
        <text x="3" y="94">Damodar</text>
        <text x="1.5" y="60">Railway line</text>
        <text x="67" y="37.500">Krishna Sayar</text>
      </g>
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
