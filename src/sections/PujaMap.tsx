import type { PointerEvent } from 'react';
import { useState } from 'react';
import { useData } from '../data/store';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import { Pin, ArrowRight } from '../components/Icons';
import { useFinePointer } from '../lib/motion';

const toX = (lng: number) => ((lng - 87.8200) / 0.0800) * 100;
const toY = (lat: number) => ((23.2800 - lat) / 0.0600) * 100;

export const LANDMARKS = [
  { id: '108-shiv-mandir', name: '108 Shiv Mandir', lat: 23.2684, lng: 87.8325, icon: <path d="M12 2v20M5 22l7-10 7 10M3 22h18" /> },
  { id: 'railway-bridge', name: 'Railway Bridge', lat: 23.2499, lng: 87.8698, icon: <path d="M2 14c4-6 16-6 20 0M2 14v6M22 14v6M6 11v9M18 11v9" /> },
  { id: 'curzon-gate', name: 'Curzon Gate', lat: 23.2404, lng: 87.8675, icon: <path d="M4 22V10a8 8 0 0 1 16 0v12M4 14h16" /> },
  { id: 'clock-tower', name: 'Clock Tower', lat: 23.2350, lng: 87.8694, icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
  { id: 'ullas-more', name: 'Ullas More', lat: 23.2312, lng: 87.8927, icon: <path d="M12 2v20M2 12h20" /> },
];

/**
 * Stylised placeholder map based on real geographic coordinates of Bardhaman.
 * Bounding Box: Lng 87.82 - 87.90, Lat 23.22 - 23.28
 */
function MapBase({ pujas = [] }: { pujas?: any[] }) {
  // Generate capillary roads: connect each puja to its 2 nearest neighbors to form a dense web
  const connections = [];
  
  // Create a mesh of anchor points along GT Road and NH19 to pull the streets together
  const anchors = [
    { x: 15.6, y: 19.3 }, { x: 30, y: 35 }, { x: 50, y: 45 }, { x: 62.2, y: 50.1 }, 
    { x: 59.4, y: 66.0 }, { x: 61.7, y: 75.0 }, { x: 90.9, y: 81.3 },
    { x: 40, y: 10 }, { x: 70, y: 30 }, { x: 80, y: 50 } // NH19 curve points
  ];

  const pts = pujas.filter(p => p.map.lat && p.map.lng).map(p => ({
    x: toX(p.map.lng), y: toY(p.map.lat)
  }));
  
  // Add anchors to pts so the web connects to the main roads
  const allPts = [...pts, ...anchors];
  
  for (let i = 0; i < pts.length; i++) {
    // find distances to all other points (including anchors)
    const dists = allPts
      .map((p, j) => ({ j, d: Math.hypot(pts[i].x - p.x, pts[i].y - p.y) }))
      .filter(entry => entry.j !== i)
      .sort((a, b) => a.d - b.d);
      
    // connect to 2 closest
    for (let k = 0; k < Math.min(2, dists.length); k++) {
      const target = allPts[dists[k].j];
      connections.push(`M ${pts[i].x} ${pts[i].y} L ${target.x} ${target.y}`);
    }
  }

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
      
      {/* Rivers */}
      <g filter="url(#hud-glow)">
        <path className="map-river" d="M-2 88C20 84 40 92 60 88S85 82 102 88V102H-2z" fill="url(#river-grad)" opacity=".7" />
        <path className="map-path" d="M-2 88C20 84 40 92 60 88S85 82 102 88" fill="none" stroke="#6ea6bd" strokeOpacity=".8" strokeWidth=".4" />
      </g>

      {/* Krishna Sayar Lake (approx 34.6, 58.7) - Outside glow to prevent blurring */}
      <g>
        <ellipse cx="34.6" cy="58.7" rx="3.5" ry="2.2" fill="url(#river-grad)" opacity=".6" />
        <path d="M31.1 58.7C31.1 56.5 38.1 56.5 38.1 58.7S31.1 60.9 31.1 58.7" fill="none" stroke="#6ea6bd" strokeOpacity=".8" strokeWidth=".3" />
      </g>

      {/* Capillary Roads connecting Pujas */}
      {connections.length > 0 && (
        <path d={connections.join(' ')} fill="none" stroke="#e9b558" strokeOpacity=".15" strokeWidth=".15" className="map-streets" />
      )}

      {/* Main Geographic Roads */}
      <g stroke="#e9b558" strokeOpacity=".4" strokeWidth=".25" fill="none" className="map-streets">
        <path d="M 15.6 19.3 Q 65 0 90.9 81.3" filter="url(#hud-glow)" />
        <path d="M 15.6 19.3 Q 35 30 62.2 50.1 C 65 57 58 63 59.4 66.0 C 60 70 61 72 61.7 75.0 Q 75 80 90.9 81.3" filter="url(#hud-glow)" />
        <path d="M 35 63 Q 59.4 66.0 85 68" />
        <path d="M 25 50 Q 55 55 61.7 75.0" />
      </g>

      {/* Railway Line */}
      <path className="map-train" d="M 10 20 Q 62.2 50.1 95 65" fill="none" stroke="#ff4d4d" strokeOpacity=".6" strokeWidth=".4" strokeDasharray="1.2 1.2" filter="url(#hud-glow)" />
      
      {/* HUD Labels */}
      <g fill="#6ea6bd" fontSize="1.8" fontFamily="var(--f-body)" fontWeight="600" letterSpacing="0.1em" opacity="0.8">
        <text x="3" y="93">DAMODAR</text>
        <circle cx="1.5" cy="92.3" r="0.4" fill="#e9b558" />
        
        <text x="36.5" y="55">KRISHNA SAYAR</text>
        <circle cx="35" cy="54.3" r="0.4" fill="#e9b558" />

        <text x="75" y="15">NH19</text>
        <text x="35" y="40">GT ROAD</text>
        <text x="75" y="66">BC ROAD</text>
      </g>
      <text x="15" y="30" fill="#ff4d4d" fontSize="1.4" fontFamily="var(--f-body)" letterSpacing="0.15em" opacity="0.7">RAILWAY</text>
    </svg>
  );
}

export function PujaMap({ className = '' }: { className?: string }) {
  const { pujas } = useData();
  const [sel, setSel] = useState<string | null>(pujas[0]?.slug ?? null);
  const cur = pujas.find((p) => p.slug === sel) || pujas[0];

  const mapQuery = encodeURIComponent(`${cur.name} Durga Puja, ${cur.location}, Bardhaman`);

  return (
    <>
      <style>{`
        .pmap-new-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }
        @media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; }
          .pmap-new-list { max-height: 350px; }
          .pmap-new-iframe { height: 400px; }
          .pmap-new-bot { flex-direction: column; text-align: center; gap: 16px; }
        }
      `}</style>
      <section className={`pmap ${className}`}>
        <div className="wrap pmap-new-grid">
          
          <aside className="pmap-new-list" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '12px', scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}>
            {pujas.map((p) => {
              const active = sel === p.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => setSel(p.slug)}
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    background: active ? 'rgba(233,181,88,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--line)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: 'var(--gold)' }} />}
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: active ? 'var(--gold-2)' : '#fff', fontFamily: 'var(--f-display)', fontWeight: 500 }}>
                    {p.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--mute)' }}>{p.location}</p>
                  {p.featured && (
                    <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '0.75rem', color: '#111', background: 'linear-gradient(135deg, var(--gold), var(--gold-2))', padding: '3px 10px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>FEATURED</span>
                  )}
                </button>
              );
            })}
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="pmap-new-iframe" style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line-2)' }}>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade" 
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
            
            <div className="pmap-new-bot" style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontFamily: 'var(--f-display)', color: 'var(--gold-2)' }}>{cur.name}</h3>
                  <p style={{ margin: '0 0 0 0', color: 'var(--mute)', fontSize: '1rem' }}>{cur.location}</p>
                </div>
                <div>
                  {cur.featured ? (
                    <Link to={`/puja/${cur.slug}`} className="btn solid"><span>Explore Details</span></Link>
                  ) : (
                    <span style={{ color: 'var(--mute)', fontSize: '0.9rem' }}>Details not available.</span>
                  )}
                </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/** Small single-pin map for the detail page. */
export function MiniMap({ x, y, name, lat, lng }: { x: number; y: number; name: string; lat?: number; lng?: number }) {
  const finalX = lat && lng ? toX(lng) : x;
  const finalY = lat && lng ? toY(lat) : y;
  const { pujas: allPujas } = useData();
  const pujas = allPujas.filter(p => p.slug !== 'amadpur-zomidar-bari');
  
  return (
    <div className="pmap-canvas mini">
      <MapBase pujas={pujas} />
      
      {/* Render Landmarks in MiniMap */}
      {LANDMARKS.map(lm => (
        <div key={lm.id} className="pmap-landmark" style={{ left: `${toX(lm.lng)}%`, top: `${toY(lm.lat)}%` }} aria-label={lm.name}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>{lm.icon}</svg>
        </div>
      ))}

      <span className="pin on static" style={{ left: `${finalX}%`, top: `${finalY}%` }} role="img" aria-label={name}><i /></span>
    </div>
  );
}
