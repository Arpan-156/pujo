import { GeoBar } from '../components/GeoBar';
import { useGeo, getDistance } from '../lib/geo';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { FILTERS } from '../data/pujas';
import { useData } from '../data/store';
import { fetchGlobalLeaderboard, submitGlobalVote } from '../lib/api';
import { Link, useRouter } from '../lib/router';
import { Photo } from '../components/Art';
import { Reveal, RevealText, Alpana } from '../components/fx';
import {   ArrowLeft, ArrowRight, Mail, Pin, Search, X, Instagram, Facebook , Settings, Palette, Lightbulb , Navigation, CheckCircle } from '../components/Icons';
import { Btn, FlipGrid, PageHead, PujaCard } from '../components/shared';
import { PassportButton } from '../components/Passport';
import { FeaturedRail } from '../sections/FeaturedRail';
import { FeaturedShowcase } from '../sections/FeaturedShowcase';
import { ThemesGrid } from '../sections/ThemesGrid';
import { ExploreBardhaman } from '../sections/ExploreBardhaman';
import { GalleryBoard } from '../sections/GalleryBoard';
import { Lightbox } from '../sections/Lightbox';
import { MiniMap, PujaMap } from '../sections/PujaMap';
import { Timeline } from '../sections/Timeline';
import { Experiences } from '../sections/Experiences';
import { AboutBrands, Social, Team } from '../sections/About';

/* ------------------------------------------------------------------ *
 *  Pandals & Themes
 * ------------------------------------------------------------------ */

function MissingPandalNotice() {
  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);

  if (closed) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setClosed(true), 800);
  };

  return (
    <div className={`fn-wrap ${closing ? 'closing' : ''}`}>
      <style>{`
        .fn-wrap {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          background: rgba(15, 5, 6, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(233, 181, 88, 0.3);
          border-left: 4px solid var(--gold);
          border-radius: 16px;
          padding: 24px;
          width: calc(100% - 40px);
          max-width: 380px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(233,181,88,0.15);
          animation: notice-slide-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: bottom center;
        }
        
        .fn-wrap.closing {
          animation: notice-fly-away 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
        }

        @keyframes notice-slide-up {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes notice-fly-away {
          0% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; filter: blur(0px) drop-shadow(0 0 0px var(--gold)); }
          20% { transform: scale(1.05) translateY(10px) rotate(-2deg); filter: blur(0px) drop-shadow(0 0 20px var(--gold)); }
          100% { transform: scale(0.3) translateY(-300px) rotate(15deg); opacity: 0; filter: blur(8px) drop-shadow(0 0 50px var(--gold)); }
        }

        .fn-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: var(--mute);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .fn-close:hover {
          background: var(--maroon);
          color: var(--shankha);
          transform: rotate(90deg);
        }

        .fn-content {
          display: flex;
          gap: 16px;
        }
        .fn-icon {
          font-size: 2rem;
          line-height: 1;
          filter: drop-shadow(0 0 10px rgba(233,181,88,0.5));
          animation: float-icon 3s ease-in-out infinite;
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .fn-text h4 {
          margin: 0 0 8px 0;
          color: var(--gold);
          font-family: var(--f-display);
          font-size: 1.4rem;
          line-height: 1.1;
        }
        .fn-text p {
          margin: 0;
          color: var(--shankha);
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
        }
        .fn-socials {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .fn-social-btn {
          background: rgba(233,181,88,0.1);
          border: 1px solid rgba(233,181,88,0.3);
          color: var(--gold);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .fn-social-btn:hover {
          background: var(--gold);
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(233,181,88,0.4);
        }
      `}</style>

      <button className="fn-close" onClick={handleClose} aria-label="Close notification"><X size={14} /></button>
      
      <div className="fn-content">
        <div className="fn-icon"><Search size={24} /></div>
        <div className="fn-text">
          <h4>Missing a Pandal?</h4>
          <p>If you don't see your club / pandal in this list, let us know!</p>
          <div className="fn-socials">
            <a href="https://www.instagram.com/burdwan_capturers/?hl=en" target="_blank" rel="noreferrer" className="fn-social-btn">
              <Instagram size={14} /> Instagram
            </a>
            <a href="https://www.facebook.com/burdwancapturer/" target="_blank" rel="noreferrer" className="fn-social-btn">
              <Facebook size={14} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PujasPage() {
    const { pujas, themes } = useData();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);
    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => { try { const saved = localStorage.getItem("puja_votes_26"); if (saved) setUserState(JSON.parse(saved)); } catch (e) {} }, []);
    const { query, navigate } = useRouter();
  const themeId = query.get('theme');
  const theme = themes.find((t) => t.id === themeId);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter) ?? FILTERS[0];
    const needle = q.trim().toLowerCase();
    const res = pujas.filter((p) => f.test(p) && (!themeId || p.themeId === themeId) && (!needle || `${p.name} ${p.area} ${p.theme} ${p.location}`.toLowerCase().includes(needle)));
    res.sort((a, b) => Number(b.featured) - Number(a.featured));
    return res;
  }, [pujas, filter, q, themeId]);

  const reset = () => { setFilter('all'); setQ(''); if (themeId) navigate('/pujas'); };

  return (
    <>
      <PageHead lines={['BURDWAN DURGA PUJA', 'PANDAL LIST 2026']} bn="বর্ধমানের সব পুজো" lead="Explore the Puja celebrations across Bardhaman." visual={{ src: '/images/all-puja-cover.jpg', art: 'crowd', seed: 0 }} />
      <section className="directory">
        <div className="wrap">
          <div className="dir-bar">
            <label className="search">
              <Search size={20} />
              <span className="sr">Search Puja, club or area</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Puja, Club or Area..." />
              {q && <button type="button" className="icon-btn" aria-label="Clear search" onClick={() => setQ('')}><X size={16} /></button>}
            </label>
            <div className="chips" role="group" aria-label="Filter Puja">
              {FILTERS.map((f) => (
                <button key={f.id} className={`chip ${filter === f.id ? 'solid' : ''}`} aria-pressed={filter === f.id} onClick={() => f.id === 'all' ? reset() : setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
            {theme && (
              <p className="dir-theme">Showing theme: <b>{theme.title}</b>
                <button className="chip" onClick={() => navigate('/pujas')}>Clear theme <X size={14} /></button>
              </p>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p className="dir-count" aria-live="polite" style={{ margin: 0 }}>{list.length} of {pujas.length} Pandals</p>
            <button className="btn solid" onClick={() => window.print()} style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '6px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download PDF
            </button>
          </div>
          {list.length ? (
            
            <> {/* PRINT ONLY BCO TABLE */}
            <div className="print-only bco-print-wrapper">
              <div className="bco-header">
                <h2>BCO - Burdwan Capturers Official</h2>
                <p>Durga Puja 2026 - Official Pandals & Themes Directory</p>
              </div>
              <table className="bco-table">
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>Address</th>
                    <th>Theme</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p.slug}>
                      <td><strong>{p.name}</strong>{p.featured ? ' (Featured)' : ''}</td>
                      <td>{p.location}</td>
                      <td>{p.theme || 'Traditional'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <FlipGrid className="plist">

              {list.map((p) => {
                const Wrapper: any = p.featured ? Link : 'div';
                const props = p.featured ? { to: `/puja/${p.slug}`, 'data-cursor': 'View' } : { style: { cursor: 'default' } };
                return (
                <Wrapper key={p.slug} className="plist-row" {...props}>
                  <div className="plist-col">
                    <p className="plist-cats">
                      {p.featured && <span className="feat-tag">Featured • </span>}
                      {p.categories.join(' • ')}
                    </p>
                    <h3 className="plist-name" style={{ marginBottom: '8px' }}>{p.name}</h3>
                      {(() => {
                         let hash = 0;
                         for (let i = 0; i < p.slug.length; i++) hash = p.slug.charCodeAt(i) + ((hash << 5) - hash);
                         const baseRating = 3.8 + (Math.abs(hash) % 12) / 10; 
                         let baseVotes = 800 + (Math.abs(hash) % 3000);
                         
                         let finalRating = baseRating;
                         let userR = userState[p.slug]?.rating;
                         if (userR > 0) {
                            baseVotes += 1;
                            finalRating = ((baseRating * (baseVotes - 1)) + userR) / baseVotes;
                         }
                         
                         const displayStars = Math.round(finalRating);
                         
                         return (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                             <div style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '2px' }}>
                               {String.fromCharCode(9733).repeat(displayStars)}{String.fromCharCode(9734).repeat(5 - displayStars)}
                             </div>
                             <div style={{ color: 'var(--mute)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                               <span style={{ color: '#fff' }}>{finalRating.toFixed(1)}</span> ({baseVotes.toLocaleString()})
                               {userR > 0 && <span style={{ color: 'var(--gold)', marginLeft: '6px' }}>� You voted {userR}</span>}
                             </div>
                           </div>
                         );
                      })()}
                    </div>
                  <div className="plist-col">
                    <p className="plist-label">Address</p>
                    <p className="plist-loc">{p.location}</p>
                  </div>
                  <div className="plist-col">
                    <p className="plist-label">Theme</p>
                    <p className="plist-theme">"{p.theme}"</p>
                  </div>
                  <div className="plist-arr-wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <PassportButton slug={p.slug} />
                    {p.featured && <span className="badge-shiny">Featured</span>}
                    {p.featured && <div className="plist-arr"><ArrowRight size={20} /></div>}
                  </div>
                </Wrapper>
                );
              })}
            </FlipGrid></>) : (
            <div className="empty">
              <p className="bn" lang="bn">কিছু পাওয়া যায়নি</p>
              <h3>No Puja matches these filters.</h3>
              <p>Try a different area name, or clear the filters to see everything.</p>
              <button className="btn solid" onClick={reset}><span>Show all Pandals</span></button>
            </div>
          )}
        </div>
      </section>
    <MissingPandalNotice />
      </>
  );
}

/* ------------------------------------------------------------------ *
 *  Single Puja
 * ------------------------------------------------------------------ */
export function PujaDetail({ slug }: { slug: string }) {
  const { bySlug, pujas } = useData();
  const { query } = useRouter();
  const p = bySlug(slug);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    if (query.get('view') === 'pandal') {
      const id = setTimeout(() => document.getElementById('pandal')?.scrollIntoView({ behavior: 'smooth' }), 1000);
      return () => clearTimeout(id);
    }
  }, [query, slug]);

  if (!p) {
    return (
      <section className="notfound wrap">
        <p className="bn" lang="bn">এই পুজোটি খুঁজে পাওয়া যায়নি</p>
        <h1 className="display">We could not find that Puja.</h1>
        <Btn to="/pujas">Back to Pandals & Themes</Btn>
      </section>
    );
  }

  const same = pujas.filter((x) => x.themeId === p.themeId && x.slug !== p.slug).slice(0, 3);
  const i = pujas.findIndex((x) => x.slug === p.slug);
  const shots = [p.heroImage, p.idolImage, ...p.gallery];
  const items = shots.map((v, k) => ({ visual: v, caption: `${p.name}, view ${k + 1}`, credit: 'Burdwan Capturers (placeholder)' }));
  const facts: [string, string][] = [
    ['Theme', p.theme], ['Pandal concept', p.pandalConcept], ['Idol concept', p.idolConcept],
    ['Location', p.location], ['Established', String(p.established)], ['Puja type', p.categories.join(', ')],
  ];

  return (
    <>
      <section className="pd-hero">
        <div className="pd-hero-bg"><Photo v={p.heroImage} eager alt={`Durga Puja pandal of ${p.name} in Burdwan`} /></div>
        <div className="page-head-shade" />
        <div className="wrap pd-hero-in">
          <Link to="/pujas" className="back" data-cursor="Back"><ArrowLeft size={18} /> Pandals & Themes</Link>
          <RevealText as="h1" lines={[p.name]} className="display pd-h" live />
          <p className="pd-meta"><span><Pin size={16} /> {p.location}</span><span>Theme: “{p.theme}”</span>{p.featured && <span className="tag-feat static">Featured 2026</span>}</p>
            <div style={{ marginTop: '24px' }}>
              <PassportButton slug={p.slug} />
            </div>
        </div>
      </section>

      <section className="pd-info wrap">
        {p.sample && <p className="sample-note">Sample listing. Details will be confirmed with the organisers before the Puja.</p>}
        <dl className="pd-facts">
          {facts.map(([k, v], n) => <Reveal key={k} delay={n * 60} className="pd-fact"><dt>{k}</dt><dd>{v}</dd></Reveal>)}
        </dl>
        <Reveal className="pd-attr">
          <h2>Special attractions</h2>
          <ul>{p.attractions.map((a) => <li key={a}>{a}</li>)}</ul>
        </Reveal>
      </section>

      <section className="pd-story wrap">
        <Reveal className="pd-story-img"><Photo v={p.idolImage} alt={`${p.name} idol`} /></Reveal>
        <div>
          <RevealText lines={['THE STORY', 'OF THE THEME']} className="display" />
          <Reveal delay={150} as="p" className="pd-lead">“{p.theme}”</Reveal>
          <Reveal delay={250} as="p" className="pd-body">{p.story}</Reveal>
        </div>
      </section>

      <section className="pd-gallery wrap" id="pandal">
        <RevealText lines={['THE PANDAL,', 'FRAME BY FRAME']} className="display" />
        <div className="masonry m-small">
          {shots.map((v, k) => (
            <button key={k} className={`g-item ${k % 5 === 0 ? 'tall' : k % 5 === 3 ? 'wide' : ''}`} onClick={() => setLb(k)} data-cursor="View" aria-label={`Open photo ${k + 1}`}>
              <Photo v={v} alt={`${p.name}, view ${k + 1}`} />
            </button>
          ))}
        </div>
        <Lightbox items={items} index={lb} onIndex={setLb} onClose={() => setLb(null)} />
      </section>

      <section className="pd-loc wrap">
        <div>
          <RevealText lines={['FIND IT']} className="display" />
          {p.map.lat && p.map.lng ? (
            <p className="pd-body">
              <strong>Real Coordinates:</strong> {p.map.lat}&deg; N, {p.map.lng}&deg; E <br/>
              {p.location}. Open map for directions.
            </p>
          ) : (
            <p className="pd-body">{p.location}. Exact map pin will be verified soon.</p>
          )}
        </div>
        <MiniMap x={p.map.x} y={p.map.y} lat={p.map.lat} lng={p.map.lng} name={p.name} />
      </section>

      <section className="pd-more wrap">
        <RevealText lines={['MORE FROM', 'THIS PUJA']} className="display" />
        <div className="pd-strip">
          {p.gallery.slice(0, 3).map((v, k) => <div key={k} className="pd-strip-item"><Photo v={v} alt="" /></div>)}
          <div className="pd-strip-item video"><Photo v={p.heroImage} alt="" /><span>Video coming soon</span></div>
        </div>
      </section>

      {same.length > 0 && (
        <section className="pd-related wrap">
          <RevealText lines={['ALSO IN THIS', 'THEME FAMILY']} className="display" />
          <div className="pcards">{same.map((x) => <PujaCard key={x.slug} p={x} />)}</div>
        </section>
      )}

      
    </>
  );
}

/* ------------------------------------------------------------------ *
 *  Simple pages
 * ------------------------------------------------------------------ */
export const ThemesPage = () => (
  <>
    <PageHead lines={['PUJA', 'THEMES']} bn="থিমের পুজো" lead="Nine kinds of ideas, built at full size." visual={{ art: 'mythology', seed: 61, hue: 8, tone: 'night' }} />
    {/* <ThemesGrid withHead={false} /> */}
  </>
);

export const FeaturedPage = () => (
  <>
    <PageHead tuni={false} lines={['FEATURED', 'PANDALS 2026']} bn="এ বছরের বাছাই মণ্ডপ" lead="The pandals Burdwan Capturers Official and Banglar Pujo Official are specially featuring this year." visual={{ src: '/images/featured-cover.jpg', art: 'gate', seed: 62, hue: 14, tone: 'dusk' }} />
    <FeaturedShowcase />
  </>
);

export const BardhamanPage = () => (
  <>
    <PageHead lines={['EXPLORE', 'BARDHAMAN']} bn="আমাদের বর্ধমান" lead="Gates, rivers, temples, sweets and the lanes that link them." visual={{ src: '/images/burdwan-cover.jpg', art: 'bridge', seed: 63, hue: 18, tone: 'night' }} />
    <ExploreBardhaman />
    <section className="cta-band"><div className="wrap"><RevealText lines={['NOW FIND', 'THE PANDALS']} className="display" /><Btn to="/map" cursor="Open">Open the Puja Map</Btn></div></section>

      <section className="surv-teaser" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center', background: 'var(--ink)' }}>
        <style>{`
          @keyframes glowPulse {
            0% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0.5; }
          }
          .surv-t-card {
             width: 100%; max-width: 1000px;
             background: linear-gradient(135deg, rgba(20,5,8,0.9), rgba(122,18,32,0.6));
             border-radius: 20px; padding: 40px; text-align: center;
             border: 1px solid rgba(233,181,88,0.3);
             box-shadow: 0 20px 50px rgba(0,0,0,0.5);
             position: relative; overflow: hidden;
          }
          .surv-t-glow { 
             position: absolute; inset: -50%; background: radial-gradient(circle at center, rgba(233,181,88,0.2), transparent 60%); 
             pointer-events: none; animation: glowPulse 4s ease-in-out infinite; 
          }
          .surv-t-title { font-family: var(--f-display); font-size: clamp(2.5rem, 6vw, 4rem); color: var(--gold); margin: 0 0 16px; line-height: 1.1; text-shadow: 0 5px 20px rgba(233,181,88,0.5); }
          .surv-t-desc { color: var(--shankha); font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; margin: 0 auto 30px; max-width: 600px; line-height: 1.6; }
          .surv-t-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(90deg, var(--gold), #ffde82); color: #000; padding: 18px 40px; border-radius: 50px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 10px 30px rgba(233,181,88,0.4); }
          .surv-t-btn:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 15px 40px rgba(233,181,88,0.6); }
        `}</style>
        <div className="surv-t-card" style={{ animation: 'jawDrop 1s ease-out forwards' }}>
          <div className="surv-t-glow" />
          <h2 className="surv-t-title">Durga Puja Survival Kit</h2>
          <p className="surv-t-desc">Don't let the crowds overwhelm you. Download your essential offline cheat sheet for emergency contacts, <strong>bus and toto stands</strong>, and survival guides.</p>
          <Link to="/survival" className="surv-t-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Get the Kit
          </Link>
        </div>
      </section>

  </>
);

export const GalleryPage = () => (
  <>
    <PageHead lines={['THE', 'GALLERY']} bn="ছবিঘর" lead="Maa Durga, the pandals, the dhak and the crowd, in frames from the field." visual={{ src: '/images/gallery-cover.jpg', art: 'camera', seed: 64, hue: 20, tone: 'dusk' }} />
    <GalleryBoard />
  </>
);

export const MapPage = () => (
  <>
    <PageHead lines={['PUJA', 'MAP']} bn="পুজো মানচিত্র" lead="Every listed Puja, pinned." visual={{ art: 'street', seed: 65, hue: 24, tone: 'night' }} />
    <PujaMap />
  </>
);

export const TimelinePage = () => (
  <>
    <PageHead lines={['THE FIVE', 'DAYS']} bn="পাঁচ দিনের উৎসব" lead="From Mahalaya to Dashami: what happens, and when." visual={{ art: 'river', seed: 66, hue: 24, tone: 'dawn' }} />
    <Timeline />
    <Experiences />
  </>
);

export const AboutPage = () => (
  <>
    <PageHead lines={['ABOUT', 'US']} bn="আমাদের কথা" lead="Two communities. One celebration." visual={{ src: '/images/about-cover.jpg', art: 'camera', seed: 67, hue: 350, tone: 'dusk' }} />
    <AboutBrands />
    {/* <Team /> */}
    <Social />
  </>
);

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <>
      <PageHead lines={['SAY', 'HELLO']} bn="যোগাযোগ" lead="Add your Puja, share a photograph, or ask to collaborate." visual={{ art: 'dhunuchi', seed: 68, hue: 22, tone: 'night' }} />
      <section className="contact wrap">
        <div className="contact-side">
          <h2>Add your Puja</h2>
          <p>Committees, family pujas and photographers are welcome. Tell us the name, the area and the theme, and we will get in touch to verify the details before listing.</p>
          <p className="contact-mail"><Mail size={18} /> hello@example.com <small>(placeholder)</small></p>
        </div>
        {sent ? (
          <div className="contact-done" role="status">
            <p className="bn" lang="bn">ধন্যবাদ</p>
            <h3>Thanks, we have your note.</h3>
            <p>This demo form has no backend yet, so nothing was sent. Connect it to Firebase, Supabase or an email service to receive messages.</p>
            <button className="chip" onClick={() => setSent(false)}>Write another</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <label>Your name<input required name="name" autoComplete="name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" /></label>
            <label>What is this about?
              <select name="topic" defaultValue="add"><option value="add">Add a Puja to the directory</option><option value="photo">Share a photograph</option><option value="collab">Collaborate</option><option value="other">Something else</option></select>
            </label>
            <label>Message<textarea required name="message" rows={5} /></label>
            <button className="btn solid" type="submit"><span>Send message</span><ArrowRight size={18} /></button>
          </form>
        )}
      </section>
    </>
  );
}


export function RoutePlannerPage() {
  const [time, setTime] = useState('quick');
  const [vibe, setVibe] = useState('accessible');
  const [transport, setTransport] = useState('toto');
    const [selectedCustom, setSelectedCustom] = useState<string[]>([]);
    const [routeMode, setRouteMode] = useState<'specialized' | 'custom'>('specialized');
  const [route, setRoute] = useState<any>(null);
  const [radius, setRadius] = useState(5);
    
  const { pujas } = useData();
  const { geo } = useGeo();

  const nearbyPandals = useMemo(() => {
    if (!geo.active || !geo.lat || !geo.lng) return [];
    const lat = geo.lat; const lng = geo.lng;
    const withDist = pujas.filter(p => p.lat && p.lng).map(p => ({
      ...p,
      dist: getDistance(lat!, lng!, p.lat!, p.lng!)
    }));
    withDist.sort((a, b) => a.dist - b.dist);
    return withDist.slice(0, 4);
  }, [pujas, geo]);


  
    const sortNearestNeighbor = (pool: any[], startLat: number, startLng: number) => {
      let currentLat = startLat;
      let currentLng = startLng;
      let unvisited = [...pool];
      let sorted = [];
      
      while(unvisited.length > 0) {
        let closestIdx = 0;
        let minDist = 999999;
        for (let i=0; i<unvisited.length; i++) {
          const p = unvisited[i];
          if (!p.lat || !p.lng) {
            if (999 < minDist) { minDist = 999; closestIdx = i; }
            continue;
          }
          const d = getDistance(currentLat, currentLng, p.lat, p.lng);
          if (d < minDist) { minDist = d; closestIdx = i; }
        }
        const closest = unvisited.splice(closestIdx, 1)[0];
        sorted.push(closest);
        if (closest.lat && closest.lng) {
          currentLat = closest.lat; currentLng = closest.lng;
        }
      }
      return sorted;
    };

    const generate = () => {
    
      let finalPandals = [];
      let timeDesc = 'A fast-paced 2-hour tour of the highlights.';
      
      if (routeMode === 'custom' && selectedCustom.length > 0) {
        const customPool = pujas.filter(p => selectedCustom.includes(p.slug));
        const startLat = (geo.active && geo.lat) ? geo.lat : (customPool.find(p=>p.lat)?.lat || 23.2324);
        const startLng = (geo.active && geo.lng) ? geo.lng : (customPool.find(p=>p.lng)?.lng || 87.8615);
        finalPandals = sortNearestNeighbor(customPool, startLat, startLng);
        timeDesc = `Custom route optimized for shortest travel distance covering ${finalPandals.length} pandals.`;
      } else {
        let pool = [...pujas];
        if (geo.active && geo.lat && geo.lng) {
          pool = pool.filter(p => {
            if (!p.lat || !p.lng) return true;
            return getDistance(geo.lat!, geo.lng!, p.lat, p.lng) <= 50;
          });
        } else {
          pool = pool.filter(p => p.zone === 'Bardhaman Town');
        }
    
        let vibePujas = pool.filter(p => {
          if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
          if (vibe === 'carnival') return p.categories.includes('Community Puja');
          if (vibe === 'accessible') return p.categories.includes('Traditional');
          return true;
        });
        if (vibePujas.length === 0) vibePujas = pool;
    
        let count = 5;
        if (time === 'standard') { count = 8; timeDesc = 'A solid 4-5 hour hop covering the major attractions.'; }
        if (time === 'marathon') { count = 12; timeDesc = 'An all-night marathon covering maximum ground!'; }
    
        if (geo.active && geo.lat && geo.lng) {
          vibePujas.sort((a, b) => {
            const dA = (a.lat && a.lng) ? getDistance(geo.lat!, geo.lng!, a.lat, a.lng) : 999;
            const dB = (b.lat && b.lng) ? getDistance(geo.lat!, geo.lng!, b.lat, b.lng) : 999;
            return dA - dB;
          });
        }
        finalPandals = vibePujas.slice(0, count);
      }


    let totalDist = 0;
    let prevLat = (geo.active && geo.lat) ? geo.lat : null;
    let prevLng = (geo.active && geo.lng) ? geo.lng : null;

    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      
      if (p.lat && p.lng && prevLat && prevLng) {
        totalDist += getDistance(prevLat, prevLng, p.lat, p.lng);
      }
      if (p.lat && p.lng) {
        prevLat = p.lat;
        prevLng = p.lng;
      }

      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const nextP = finalPandals[i + 1];
        if (p.lat && p.lng && nextP.lat && nextP.lng) {
          const dist = getDistance(p.lat, p.lng, nextP.lat, nextP.lng);
          if (dist < 0.5) transit = 'Walk 5-10 mins';
          else if (dist < 1.5) transit = transport === 'walk' ? 'Walk 15-20 mins' : 'Toto 5-10 mins';
          else transit = transport === 'toto' ? 'Toto 15+ mins' : 'Drive/Auto 10 mins';
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        lat: p.lat,
        lng: p.lng,
        tip: p.featured ? 'Award Winner! Highly recommended.' : 'Expect crowds during peak hours.',
        transit
      };
    });

    let speed = 4.5;
    if (transport === 'toto') speed = 12;
    if (transport === 'car') speed = 18;
    
    const travelMins = Math.round((totalDist / speed) * 60);
    const viewMins = finalPandals.length * 15;
    const totalMins = travelMins + viewMins;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    const timeStr = h > 0 ? `${h} hr ${m} mins` : `${m} mins`;
    const transStr = transport.charAt(0).toUpperCase() + transport.slice(1);
    
    const finalTimeDesc = `Estimated: ~${timeStr} by ${transStr} (${totalDist.toFixed(1)} km total)`;

    setRoute({
      title: geo.active ? `Dynamic Route from ${geo.area}` : (routeMode === 'custom' ? 'Your Custom Puja Trail' : 'Specialized Route'),
      desc: geo.active ? `Optimized for your realtime location.` : 'A robust mix of everything that makes Burdwan Durga Puja famous.',
      pandals: mappedPandals,
      timeDesc: finalTimeDesc
    });
  };

  const openGoogleMaps = () => {
    if (!route || route.pandals.length === 0) return;
    const getQuery = (p: any) => p.lat && p.lng ? `${p.lat},${p.lng}` : encodeURIComponent(`${p.name}, Burdwan`);
    
    let originStr = '';
    if (geo.active && geo.lat && geo.lng) {
      originStr = `${geo.lat},${geo.lng}`;
    } else {
      originStr = getQuery(route.pandals[0]);
    }
    
    const destination = getQuery(route.pandals[route.pandals.length - 1]);
    
    let waypointsArr = route.pandals;
    if (!geo.active) waypointsArr = route.pandals.slice(1, -1);
    else waypointsArr = route.pandals.slice(0, -1);
    
    if (waypointsArr.length > 8) {
      const step = waypointsArr.length / 8;
      waypointsArr = Array.from({ length: 8 }, (_, i) => waypointsArr[Math.floor(i * step)]);
    }
    const waypoints = waypointsArr.map(getQuery).join('%7C'); // URL encoded pipe
    
    let mode = 'driving';
    if (transport === 'walk') mode = 'walking';
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destination}&waypoints=${waypoints}&travelmode=${mode}`;
    window.open(url, '_blank');
  };

  return (
    <div className="page-head" style={{ minHeight: '100vh', height: 'auto', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 'calc(var(--safe-t, 0px) + 120px) 20px 120px', position: 'relative' }}>
      <div className="page-head-bg" style={{ position: 'absolute', inset: '-5%', zIndex: -3, opacity: 0.25, filter: 'blur(8px)' }}>
        <div style={{ width: '100%', height: '100%', opacity: 1 }}><Photo v={{ src: '/images/saptami.jpg', art: 'pandal', seed: 0 }} eager alt="" className="full-photo" /></div>
      </div>
      <div className="page-head-shade" style={{ position: 'absolute', inset: 0, zIndex: -2, background: 'radial-gradient(circle at center, rgba(15,5,6,0.6) 0%, rgba(10,3,4,0.98) 100%)' }} />

      <style>{`
        .full-photo img { width: 100%; height: 100%; object-fit: cover; }
        .rp-wrap { width: 100%; max-width: 900px; position: relative; z-index: 2; display: flex; flex-direction: column; gap: 40px; }
        
        .rp-radio-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
        @media (min-width: 768px) { .rp-radio-grid { grid-template-columns: repeat(3, 1fr); } }
        
        .rp-label { display: block; cursor: pointer; position: relative; }
        .rp-label input { position: absolute; opacity: 0; width: 0; height: 0; }
        .rp-card { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; transition: all 0.3s ease; height: 100%; backdrop-filter: blur(10px); }
        .rp-label:hover .rp-card { border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
        .rp-label input:checked + .rp-card { border-color: var(--gold); background: rgba(233,181,88,0.1); box-shadow: 0 0 20px rgba(233,181,88,0.2); }
        
        .rp-btn { width: 100%; background: linear-gradient(135deg, var(--gold), #d49527); color: #0a0304; border: none; padding: 20px; font-size: 1.25rem; font-weight: bold; border-radius: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(233,181,88,0.3); font-family: var(--f-body); margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .rp-btn:hover { transform: scale(1.02); box-shadow: 0 15px 40px rgba(233,181,88,0.5); }
        
        .rp-timeline { position: relative; padding-left: 30px; margin-top: 40px; }
        .rp-timeline::before { content: ''; position: absolute; left: 0; top: 20px; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--gold) 0%, rgba(233,181,88,0.1) 100%); }
        
        .rp-node { position: relative; margin-bottom: 40px; }
        .rp-node-dot { position: absolute; left: -39px; top: 20px; width: 20px; height: 20px; background: #0a0304; border: 3px solid var(--gold); border-radius: 50%; box-shadow: 0 0 15px var(--gold); z-index: 2; transition: all 0.3s ease; }
        .rp-node:hover .rp-node-dot { transform: scale(1.2); box-shadow: 0 0 25px var(--gold); background: var(--gold); }
        .rp-pandal-card { background: rgba(15,5,6,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); transition: all 0.3s ease; }
        .rp-pandal-card:hover { border-color: rgba(233,181,88,0.3); transform: translateX(10px); }
        
        .map-btn { background: rgba(233,181,88,0.15); color: var(--gold); border: 1px solid var(--gold); border-radius: 12px; padding: 12px 24px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; font-family: 'Inter', system-ui, sans-serif; }
        .map-btn:hover { background: var(--gold); color: #0a0304; box-shadow: 0 0 20px rgba(233,181,88,0.4); }
      `}</style>

      <div className="rp-wrap">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(3rem, 8vw, 4.5rem)', margin: '0 0 10px', background: 'linear-gradient(to right, #fff, #e9b558)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Route Planner</h1>
          <p style={{ color: 'var(--mute)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Generate an optimized pandal hopping route based on your real-time location.</p>
        </div>

        
          {(!geo.active || geo.isManual) && (
            <div style={{ background: 'rgba(233,181,88,0.1)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(233,181,88,0.4)', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>For the best routing experience, we recommend enabling GPS. We will automatically prompt you for location access to calculate accurate distances!</span>
            </div>
          )}

          <GeoBar radius={radius} setRadius={setRadius} />

        {!route ? (
          <div style={{ animation: 'popIn 0.5s ease' }}>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', background: 'rgba(233,181,88,0.05)', padding: '6px', borderRadius: '16px' }}>
            <button onClick={() => setRouteMode('specialized')} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: routeMode === 'specialized' ? 'var(--gold)' : 'transparent', color: routeMode === 'specialized' ? '#000' : 'var(--gold)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', transition: 'all 0.3s ease' }}>Our Specialized Routes</button>
            <button onClick={() => setRouteMode('custom')} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: routeMode === 'custom' ? 'var(--gold)' : 'transparent', color: routeMode === 'custom' ? '#000' : 'var(--gold)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', transition: 'all 0.3s ease' }}>Build Custom Route</button>
          </div>


            {nearbyPandals.length > 0 && (
              <div style={{ marginBottom: '30px', background: 'rgba(233,181,88,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(233,181,88,0.2)' }}>
                <h3 style={{ color: 'var(--gold)', margin: '0 0 16px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Near You Right Now
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {nearbyPandals.map(p => (
                    <Link key={p.slug} to={`/puja/${p.slug}`} style={{ display: 'block', background: 'rgba(20,8,9,0.8)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
                      <h4 style={{ margin: '0 0 4px', color: '#fff', fontSize: '1rem' }}>{p.name}</h4>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{p.dist.toFixed(1)} km away � {p.theme || 'Traditional'}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {routeMode === 'specialized' && (<>
              <div style={{ marginBottom: '30px', marginTop: '20px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Time Available</h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>How long do you plan to hop?</p>
              <div className="rp-radio-grid">
                {[
                  { id: 'quick', title: 'Quick Sprint', desc: '~2 Hours / 5 Pandals', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
                  { id: 'standard', title: 'Standard', desc: '~4 Hours / 8 Pandals', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
                  { id: 'marathon', title: 'Marathon', desc: 'All Night / 12 Pandals', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h3l3-9 5 18 3-9h6"/></svg>' }
                ].map(opt => (
                  <label key={opt.id} className="rp-label">
                    <input type="radio" name="time" value={opt.id} checked={time === opt.id} onChange={(e) => setTime(e.target.value)} />
                    <div className="rp-card">
                      <div style={{ fontSize: '2rem', marginBottom: '12px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: opt.icon }}></div>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{opt.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Vibe / Preference</h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>What kind of pujas do you want to see?</p>
              <div className="rp-radio-grid">
                {[
                  { id: 'art', title: 'Theme & Art', desc: 'Award-winning installations', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
                  { id: 'carnival', title: 'Mela & Carnival', desc: 'Big crowds, food, fun', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>' },
                  { id: 'accessible', title: 'Traditional', desc: 'Classic, authentic vibes', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>' }
                ].map(opt => (
                  <label key={opt.id} className="rp-label">
                    <input type="radio" name="vibe" value={opt.id} checked={vibe === opt.id} onChange={(e) => setVibe(e.target.value)} />
                    <div className="rp-card">
                      <div style={{ fontSize: '2rem', marginBottom: '12px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: opt.icon }}></div>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{opt.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            </>)}

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Transport Mode</h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>How are you getting around?</p>
              <div className="rp-radio-grid">
                {[
                  { id: 'walk', title: 'Walking', desc: 'Best for tight lanes', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14 21l-3-6-3 6"/><path d="M11 15v-5l2-3-2 3H8l3-3"/><path d="M18 10l-4-1-1 4"/></svg>' },
                  { id: 'toto', title: 'Toto / E-Rickshaw', desc: 'The Burdwan way', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>' },
                  { id: 'car', title: 'Car / Bike', desc: 'Prepare for parking', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5.3a2 2 0 0 0-1.6.8L1 11l-.16.84A1 1 0 0 0 0 12.85V16h3m11 0a2 2 0 1 0-4 0m-11 0a2 2 0 1 0-4 0"/></svg>' }
                ].map(opt => (
                  <label key={opt.id} className="rp-label">
                    <input type="radio" name="transport" value={opt.id} checked={transport === opt.id} onChange={(e) => setTransport(e.target.value)} />
                    <div className="rp-card">
                      <div style={{ fontSize: '2rem', marginBottom: '12px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: opt.icon }}></div>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{opt.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            
            {routeMode === 'custom' && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Custom Pandal Selection</h3>
              <p style={{ color: 'var(--mute)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>Select specific pandals you want to visit, and we'll calculate the absolute shortest path for you.</p>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto', background: 'rgba(20,8,9,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {pujas.map(p => (
                  <label key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', background: selectedCustom.includes(p.slug) ? 'rgba(233,181,88,0.15)' : 'transparent', borderRadius: '4px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedCustom.includes(p.slug)} onChange={(e) => {
                      if (e.target.checked) setSelectedCustom([...selectedCustom, p.slug]);
                      else setSelectedCustom(selectedCustom.filter(s => s !== p.slug));
                    }} style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }} />
                    <div>
                      <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>{p.name}</h4>
                      <p style={{ margin: 0, color: 'var(--mute)', fontSize: '0.8rem' }}>{p.area}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            )}

            <button className="rp-btn" onClick={generate} disabled={routeMode === "custom" && selectedCustom.length === 0} style={{ opacity: (routeMode === "custom" && selectedCustom.length === 0) ? 0.5 : 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Generate Optimized Route
            </button>
          </div>
        ) : (
          <div style={{ animation: 'popIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', background: 'rgba(15,5,6,0.8)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(233,181,88,0.3)', backdropFilter: 'blur(20px)' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--f-display)', fontSize: '2.5rem', margin: '0 0 10px', color: 'var(--gold)' }}>{route.title}</h2>
                <p style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.1rem' }}>{route.desc}</p>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px', color: 'var(--gold)', fontSize: '0.9rem', marginTop: '10px' }}>
                  {route.timeDesc}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="map-btn" onClick={() => setRoute(null)} style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff', padding: '10px 24px', borderRadius: '8px' }}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{marginRight:"8px"}}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back
                </button>
                <button className="map-btn" onClick={openGoogleMaps}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                  Open in Maps
                </button>
              </div>
            </div>

            <div className="rp-timeline">
              {route.pandals.map((p: any, i: number) => (
                <div key={i} className="rp-node">
                  <div className="rp-node-dot"></div>
                  <div className="rp-pandal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <span style={{ background: 'var(--gold)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>{i + 1}</span>
                          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{p.zone}</span>
                        </div>
                        <h3 style={{ margin: '0 0 8px', fontSize: '1.8rem', color: '#fff', fontFamily: 'var(--f-display)' }}>{p.name}</h3>
                        <p style={{ margin: '0', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#d63384' }}></span>
                          {p.theme}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }}>
                      <p style={{ margin: 0, color: 'var(--gold)', fontSize: '0.95rem' }}><strong>Insider Tip:</strong> {p.tip}</p>
                    </div>
                  </div>
                  
                  {i < route.pandals.length - 1 && (
                    <div style={{ padding: '20px 0 0 10px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {p.transit} to next stop
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="rp-btn" onClick={openGoogleMaps} style={{ marginTop: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Start Navigating
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export function SurvivalKitPage() {
  const survivalData = [
    {
      type: "emergency",
      title: "Emergency Helplines",
      icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      items: [
        { name: "Police Control Room", value: "100", secondary: "0342-2664466" },
        { name: "Ambulance / Medical", value: "102", secondary: "Burdwan Medical: 0342-2665228" },
        { name: "Fire Services", value: "101", secondary: "Burdwan Fire: 0342-2557901" },
        { name: "Women's Safety (Sadar)", value: "1091", secondary: "0342-2669597" },
        { name: "Disaster Management", value: "1070", secondary: "Toll Free" }
      ]
    },
    {
      type: "transit",
      title: "Bus & Toto Stands",
      icon: "M15 6v12a3 3 0 1 1-6 0V6a3 3 0 1 1 6 0zM3 10v4M21 10v4M9 3h6",
      items: [
        { name: "Nababhat (Alisha) Bus Stand", value: "North Entry", secondary: "Closest: Alamganj, 108 Shiv Mandir" },
        { name: "Tinkonia Bus Stand", value: "Central Hub", secondary: "Closest: Khosbagan, Baranilpur" },
        { name: "Burdwan Railway Station", value: "Train Arrivals", secondary: "Closest: Chhotonilpur, Station Mela" },
        { name: "Curzon Gate Toto Stand", value: "Local Hops", secondary: "Heart of town, connects all zones" },
        { name: "Ullhas / Shaktigarh", value: "South Entry", secondary: "Closest: Sripally, Ichlabad" }
      ]
    },
    {
      type: "guide",
      title: "Lost & Found Guide",
      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      items: [
        { name: "Step 1: Stay Put", value: "Don't wander.", secondary: "Wait exactly where you realized you were separated for 10 minutes." },
        { name: "Step 2: Pandal Desk", value: "Find the mic.", secondary: "Approach the nearest Pandal's 'Help Desk' for a loud speaker announcement." },
        { name: "Step 3: Police Kiosk", value: "Seek uniform.", secondary: "Every mega-pandal has a temporary police camp. Report missing persons immediately." },
        { name: "Pro Tip for Kids", value: "Pocket chits.", secondary: "Put a slip of paper with your phone number in your child's pocket before leaving home." }
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', position: 'relative' }}>
      <style>{`
        @keyframes jawDrop {
          0% { opacity: 0; transform: translateY(50px) scale(0.92); filter: blur(15px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        
        .surv-bg-glow {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 15% 30%, rgba(233, 181, 88, 0.08) 0%, transparent 60%),
                        radial-gradient(circle at 85% 70%, rgba(122, 18, 32, 0.15) 0%, transparent 60%);
            z-index: -1;
            pointer-events: none;
        }

        .surv-card {
            background: linear-gradient(145deg, rgba(20,5,8,0.9), rgba(40,10,15,0.7));
            border: 1px solid rgba(233, 181, 88, 0.2);
            border-top: 2px solid rgba(233, 181, 88, 0.5);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6), inset 0 2px 20px rgba(233, 181, 88, 0.05);
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
            padding: 32px;
            display: flex;
            flex-direction: column;
            height: 100%;
            position: relative;
            overflow: hidden;
            opacity: 0;
            animation: jawDrop 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        .surv-card::after {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(circle at top right, rgba(233, 181, 88, 0.1), transparent 60%);
            pointer-events: none; opacity: 0; transition: opacity 0.4s ease;
        }
        
        .surv-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), inset 0 2px 20px rgba(233, 181, 88, 0.1);
            border-color: rgba(233, 181, 88, 0.4);
        }
        .surv-card:hover::after { opacity: 1; }

        .surv-gold-text {
            background: linear-gradient(135deg, #e9b558, #ffde82);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .surv-print-btn {
            background: linear-gradient(135deg, #e9b558, #d49a3a);
            color: #0f0506;
            box-shadow: 0 10px 25px rgba(233, 181, 88, 0.4);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 14px 28px;
            border-radius: 50px;
            font-weight: 800;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
            cursor: pointer;
            border: none;
            margin-top: 16px;
        }
        .surv-print-btn:hover { 
            transform: scale(1.05) translateY(-2px); 
            box-shadow: 0 15px 35px rgba(233, 181, 88, 0.6);
        }

        @media print {
            @page { size: A4; margin: 0; }
            body { background: #ffffff !important; color: #000000 !important; font-size: 10pt; }
            .global-branding, nav, footer, .surv-bg-glow, .surv-print-btn, .skip, .music, .passport-wrapper { display: none !important; }
            .print-only { display: block !important; }
            * {
                background: transparent !important;
                color: #000000 !important;
                box-shadow: none !important;
                text-shadow: none !important;
                -webkit-text-fill-color: #000000 !important;
                -webkit-background-clip: border-box !important;
                animation: none !important; opacity: 1 !important;
            }
            .page { padding: 1.2cm !important; margin: 0 !important; }
            .surv-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px !important; }
            .surv-header h1 { font-size: 24pt !important; margin-bottom: 5px !important; }
            .surv-header p { font-size: 12pt !important; }
            .surv-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; align-items: start; }
            .surv-card {
                border: 1px solid #999 !important; padding: 12px !important; border-radius: 4px !important;
                break-inside: avoid; page-break-inside: avoid; margin-bottom: 10px !important; height: auto !important;
            }
            .surv-card h2 { font-size: 14pt !important; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px !important; }
            svg { stroke: #000 !important; width: 14px !important; height: 14px !important; }
            a { text-decoration: none !important; }
        }
      `}</style>

      <div className="surv-bg-glow" />

      <header className="surv-header" style={{ textAlign: 'center', marginBottom: '64px', animation: 'jawDrop 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
        <span className="no-print" style={{ display: 'inline-block', padding: '4px 16px', border: '1px solid rgba(233,181,88,0.3)', borderRadius: '50px', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'rgba(233,181,88,0.1)', marginBottom: '24px' }}>Burdwan Edition 2026</span>
        <h1 className="surv-gold-text" style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(3rem, 8vw, 5rem)', margin: '0 0 16px', lineHeight: 1.1, textShadow: '0 5px 20px rgba(233,181,88,0.3)' }}>Durga Puja Survival Kit</h1>
        <p style={{ color: 'var(--mute)', fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', maxWidth: '650px', margin: '0 auto 24px', lineHeight: 1.6 }}>Your essential offline cheat sheet for emergency contacts, transit hubs, and survival guides during the festival.</p>
        
        {/* Button moved here, statically positioned inside the header! */}
        <button onClick={() => window.print()} className="surv-print-btn no-print">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Save PDF / Print
        </button>
      </header>

      <div className="surv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {survivalData.map((section, idx) => (
          <div key={idx} className="surv-card" style={{ ...(section.type === 'guide' ? { gridColumn: '1 / -1' } : {}), animationDelay: `${0.2 + idx * 0.15}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(233,181,88,0.2), rgba(233,181,88,0.05))', color: 'var(--gold)', boxShadow: '0 4px 15px rgba(233,181,88,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d={section.icon}/>
                </svg>
              </div>
              <h2 className="surv-gold-text" style={{ fontFamily: 'var(--f-display)', fontSize: '1.75rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{section.title}</h2>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
              {section.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.95 }}>{item.name}</span>
                    {section.type === 'emergency' ? (
                      <a href={`tel:${item.value}`} style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'var(--f-display)', whiteSpace: 'nowrap', textDecoration: 'none', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>{item.value}</a>
                    ) : (
                      <span style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--f-display)', whiteSpace: 'nowrap' }}>{item.value}</span>
                    )}
                  </div>
                  <div style={{ color: 'var(--mute)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.secondary}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}



export function Top3VoterPage() {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);

  const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
  const [globalState, setGlobalState] = useState<Record<string, { score: number, upvotes: number }>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    // 1. Load local votes
    try {
      const saved = localStorage.getItem('puja_votes_26');
      if (saved) setUserState(JSON.parse(saved));
    } catch (e) {}

    // 2. Fetch Global Leaderboard asynchronously
    setIsSyncing(true);
    fetchGlobalLeaderboard().then(data => {
      setGlobalState(data);
      setIsSyncing(false);
    });
  }, []);

  const saveState = async (id: string, newLocalData: { rating: number; upvoted: boolean }) => {
    // Calculate difference to push to global backend
    const old = userState[id] || { rating: 0, upvoted: false };
    const ratingDiff = newLocalData.rating - old.rating;
    const upvoteDiff = (newLocalData.upvoted ? 1 : 0) - (old.upvoted ? 1 : 0);

    const newState = { ...userState, [id]: newLocalData };
    setUserState(newState);
    localStorage.setItem('puja_votes_26', JSON.stringify(newState));

    // Async push to industry-level backend
    if (ratingDiff !== 0 || upvoteDiff !== 0) {
      setIsSyncing(true);
      await submitGlobalVote(id, ratingDiff, upvoteDiff);
      // Re-fetch to get live consensus
      const latestGlobal = await fetchGlobalLeaderboard();
      setGlobalState(latestGlobal);
      setIsSyncing(false);
    }
  };

  const { pujas } = useData();
  const PANDALS = pujas.map(p => {
    const stringVal = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      id: p.slug,
      name: p.name,
      zone: p.zone || 'Bardhaman',
      tagline: p.description || p.story || `Theme: ${p.theme}`,
      // Base is seeded so it looks realistic even before global votes roll in
      baseVotes: (stringVal * 12) + 1980
    };
  });

  const getScore = (p: typeof PANDALS[0]) => {
    const local = userState[p.id] || { rating: 0, upvoted: false };
    const global = globalState[p.id] || { score: 0, upvotes: 0 };
    // Mix static seed + live global + immediate local response
    return p.baseVotes + (local.rating * 10) + (local.upvoted ? 50 : 0) + (global.score * 10) + (global.upvotes * 50);
  };

  const sorted = [...PANDALS].sort((a, b) => getScore(b) - getScore(a));
  const top3 = [sorted[0], sorted[1], sorted[2]];

  const visualOrder = [
    { p: top3[1], rank: 2, class: 't3-pod-2', color: '#c0c0c0', label: '2ND' },
    { p: top3[0], rank: 1, class: 't3-pod-1', color: '#e9b558', label: '1ST' },
    { p: top3[2], rank: 3, class: 't3-pod-3', color: '#cd7f32', label: '3RD' }
  ];

  
  const votedClubIds = Object.keys(userState).filter(id => userState[id].rating > 0 || userState[id].upvoted);

  const rate = (id: string, rating: number) => {
    if (!votedClubIds.includes(id) && votedClubIds.length >= 3) {
      alert("You can only vote for up to 3 clubs! Please clear your votes to start over.");
      return;
    }
    saveState(id, { ...(userState[id] || { rating: 0, upvoted: false }), rating });
  };

  const toggleUpvote = (id: string) => {
    if (!votedClubIds.includes(id) && votedClubIds.length >= 3) {
      alert("You can only vote for up to 3 clubs! Please clear your votes to start over.");
      return;
    }
    const s = userState[id] || { rating: 0, upvoted: false };
    saveState(id, { ...s, upvoted: !s.upvoted });
  };

  const clearVotes = async () => {
    if (!confirm("Are you sure you want to clear your cast votes?")) return;
    setIsSyncing(true);
    for (const id of votedClubIds) {
      const s = userState[id];
      await submitGlobalVote(id, -s.rating, -(s.upvoted ? 1 : 0));
    }
    setUserState({});
    localStorage.removeItem('puja_votes_26');
    const latestGlobal = await fetchGlobalLeaderboard();
    setGlobalState(latestGlobal);
    setIsSyncing(false);
  };


  const shareBracket = () => {
    let text = `🏆 Burdwan Capturers Official - Community Top 3 Pandals:\n\n`;
    for(let i=0; i<3; i++) {
        text += `${i+1}. ${sorted[i].name}\n`;
    }
    text += `\nSent from the Official Burdwan Puja App. View the live leaderboard now!`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        setToast(true);
        setTimeout(() => setToast(false), 3000);
    });

    // Open Instagram Direct Message to Burdwan Capturers
    window.open('https://ig.me/m/burdwan_capturers', '_blank');
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatTrophy { 0%, 100% { transform: translateY(0); filter: drop-shadow(0 10px 20px rgba(233,181,88,0.2)); } 50% { transform: translateY(-15px); filter: drop-shadow(0 25px 30px rgba(233,181,88,0.6)); } }
        @keyframes cardReveal { from { opacity: 0; transform: scale(0.9) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        
        .t3-wrap { padding: clamp(80px, 15vh, 120px) 20px; max-width: 1200px; margin: 0 auto; color: #fff; perspective: 1000px; }
        .t3-head { text-align: center; margin-bottom: 60px; animation: fadeUp 0.6s ease-out forwards; }
        .t3-head h1 { font-family: var(--f-display); font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 16px; 
                      background: linear-gradient(135deg, #e9b558, #ffde82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .t3-head p { color: var(--mute); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .t3-podium-sec { text-align: center; margin-bottom: 80px; animation: fadeUp 0.6s ease-out 0.2s forwards; opacity: 0; }
        .t3-podium { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 260px; margin-bottom: 40px; }
        @media (min-width: 768px) { .t3-podium { gap: 24px; } }
        
        .t3-pod-slot { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; animation: floatTrophy 6s ease-in-out infinite; will-change: transform; filter: drop-shadow(0 15px 25px rgba(233,181,88,0.3)); }
        @media (min-width: 768px) { .t3-pod-slot { width: 160px; } }
        
        .t3-pod-info { text-align: center; margin-bottom: 16px; transition: transform 0.3s; }
        .t3-pod-slot:hover .t3-pod-info { transform: translateY(-8px); }
        .t3-pod-lbl { font-size: 0.75rem; font-weight: bold; letter-spacing: 2px; margin-bottom: 4px; }
        .t3-pod-name { font-family: var(--f-display); font-size: clamp(0.9rem, 2vw, 1.25rem); font-weight: bold; line-height: 1.2; padding: 0 4px; }
        .t3-pod-stars { color: var(--gold); font-size: 0.75rem; letter-spacing: 2px; margin-top: 4px; }
        
        .t3-pod-base { width: 100%; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 16px; backdrop-filter: blur(10px); border-radius: 8px 8px 0 0; }
        .t3-pod-base span { font-family: var(--f-display); font-size: 3rem; font-weight: 900; opacity: 0.2; }
        
        .t3-pod-1 { height: 180px; animation-delay: -1s; background: linear-gradient(180deg, rgba(233,181,88,0.2) 0%, transparent 100%); border-top: 4px solid #e9b558; }
        .t3-pod-2 { height: 130px; background: linear-gradient(180deg, rgba(192,192,192,0.15) 0%, transparent 100%); border-top: 4px solid #c0c0c0; }
        .t3-pod-3 { height: 100px; animation-delay: -3s; background: linear-gradient(180deg, rgba(205,127,50,0.15) 0%, transparent 100%); border-top: 4px solid #cd7f32; }
        
        .t3-share { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(45deg, #e9b558, #ffde82); color: #000; padding: 14px 32px; border: none; border-radius: 50px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 30px rgba(233,181,88,0.3); }
        .t3-share:hover { transform: scale(1.05); box-shadow: 0 15px 40px rgba(233,181,88,0.5); }
        
        .t3-cat-head { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 32px; }
        .t3-cat-head h2 { font-family: var(--f-display); font-size: 2rem; color: var(--gold); }
        .t3-cat-head span { color: var(--mute); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; }
        
        .t3-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .t3-card { animation: cardReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; background: linear-gradient(145deg, rgba(20,5,8,0.9), rgba(40,10,15,0.7)); border: 1px solid rgba(233,181,88,0.2); border-radius: 16px; padding: 24px; position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .t3-card:hover { transform: translateY(-6px); }
        .t3-top3-badge { position: absolute; top: 0; right: 0; background: var(--gold); color: #000; font-size: 0.7rem; font-weight: bold; padding: 4px 12px; border-radius: 0 0 0 8px; text-transform: uppercase; letter-spacing: 1px; }
        
        .t3-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .t3-zone { display: inline-block; font-size: 0.65rem; font-weight: bold; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; margin-bottom: 12px; }
        .t3-name { font-family: var(--f-display); font-size: 1.5rem; font-weight: bold; color: #fff; margin: 0; line-height: 1.2; }
        
        .t3-upvote { background: none; border: none; color: rgba(255,255,255,0.2); cursor: pointer; transition: all 0.3s; padding: 0; display: flex; align-items: center; justify-content: center; }
        .t3-upvote.voted { color: var(--gold); transform: scale(1.15); filter: drop-shadow(0 0 8px rgba(233,181,88,0.6)); }
        
        .t3-desc { color: var(--mute); font-size: 0.9rem; line-height: 1.6; margin-bottom: 24px; min-height: 45px; }
        
        .t3-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
        .t3-stars { display: flex; gap: 4px; }
        .t3-star { cursor: pointer; color: rgba(255,255,255,0.2); transition: transform 0.2s, color 0.2s; }
        .t3-star:hover, .t3-star.active { color: var(--gold); transform: scale(1.2); filter: drop-shadow(0 0 4px rgba(233,181,88,0.5)); }
        .t3-pts { font-size: 0.75rem; font-weight: bold; letter-spacing: 2px; color: rgba(255,255,255,0.4); }
        
        .t3-toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(233,181,88,0.3); color: #fff; padding: 12px 24px; border-radius: 50px; font-weight: bold; pointer-events: none; opacity: 0; transition: opacity 0.3s; z-index: 1000; }
        .t3-toast.show { opacity: 1; }
      `}</style>
      
      <div className="t3-wrap">
        <header className="t3-head">
          <h1>Community Top 3</h1>
            {isSyncing && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(233,181,88,0.2)', color: 'var(--gold)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginTop: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 1s infinite' }} />
              Syncing Global Votes...
            </div>}
          <p>Explore the Global Leaderboard. The top 3 pandals are curated live from all community votes across Burdwan. Your rating directly influences their rank.</p>
        </header>
        
        <section className="t3-podium-sec">
          <div className="t3-podium">
            {visualOrder.map((slot, i) => {
              const s = userState[slot.p.id] || { rating: 0 };
              return (
                <div key={i} className="t3-pod-slot">
                  <div className="t3-pod-info">
                    <div className="t3-pod-lbl" style={{ color: slot.color }}>{slot.label}</div>
                    <div className="t3-pod-name">{slot.p.name}</div>
                    <div className="t3-pod-stars">{String.fromCharCode(9733).repeat(s.rating)}{String.fromCharCode(9734).repeat(5-s.rating)}</div>
                  </div>
                  <div className={`t3-pod-base ${slot.class}`}>
                    <span style={{ color: slot.color }}>{slot.rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button className="t3-share" onClick={shareBracket}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                Share My Bracket
              </button>
              {votedClubIds.length > 0 && (
                <button className="t3-share" style={{ background: 'transparent', border: '2px solid #e9b558', color: '#e9b558', boxShadow: 'none' }} onClick={clearVotes}>
                  Clear My Votes
                </button>
              )}
            </div>
        </section>
        
        <section>
          <div className="t3-cat-head">
            <h2>Pandal Catalog</h2>
            <span>Rate to Rank</span>
          </div>
          <div className="t3-grid">
              {sorted.map((p, idx) => {
                const s = userState[p.id] || { rating: 0, upvoted: false };
                const isMaxedOut = !votedClubIds.includes(p.id) && votedClubIds.length >= 3;

              const isTop3 = idx < 3;
              return (
                <div key={p.id} className="t3-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {isTop3 && <div className="t3-top3-badge">Top 3</div>}
                  <div className="t3-card-top">
                    <div>
                      <span className="t3-zone">{p.zone}</span>
                      <h3 className="t3-name">{p.name}</h3>
                    </div>
                    
                  </div>
                  <p className="t3-desc">{p.tagline}</p>
                  <div className="t3-foot">
                    <div className="t3-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg key={star} onClick={() => rate(p.id, star)} className={`t3-star ${star <= s.rating ? 'active' : ''}`} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                    <div className="t3-pts">{getScore(p).toLocaleString()} PTS</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      
      <div className={`t3-toast ${toast ? 'show' : ''}`}>Copied! Paste it in the Instagram chat.</div>

<style>{`
  .t3-popup-overlay {
    position: fixed; inset: 0; background: rgba(10,4,5,0.85); backdrop-filter: blur(8px);
    z-index: 10000; display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity 0.4s var(--ease);
  }
  .t3-popup-overlay.show { opacity: 1; pointer-events: auto; }
  .t3-popup {
    background: linear-gradient(135deg, rgba(20,5,8,0.95), rgba(122,18,32,0.8));
    border: 1px solid rgba(233,181,88,0.4); border-radius: 16px;
    padding: 40px; max-width: 90vw; width: 500px; text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
    transform: translateY(20px) scale(0.95); transition: transform 0.4s var(--ease);
  }
  .t3-popup-overlay.show .t3-popup { transform: translateY(0) scale(1); }
  .t3-popup h2 {
    font-family: var(--f-display); font-size: 2rem; margin-bottom: 16px;
    background: linear-gradient(to right, #fff, #e9b558); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .t3-popup p {
    color: var(--mute); font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;
  }
`}</style>

      
  <style>{`
    .t3-popup-overlay {
      position: fixed; inset: 0; background: rgba(10,4,5,0.85); backdrop-filter: blur(8px);
      z-index: 10000; display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.4s var(--ease);
    }
    .t3-popup-overlay.show { opacity: 1; pointer-events: auto; }
    .t3-popup {
      background: linear-gradient(135deg, rgba(20,5,8,0.95), rgba(122,18,32,0.8));
      border: 1px solid rgba(233,181,88,0.4); border-radius: 16px;
      padding: 40px; max-width: 90vw; width: 500px; text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
      transform: translateY(20px) scale(0.95); transition: transform 0.4s var(--ease);
    }
    .t3-popup-overlay.show .t3-popup { transform: translateY(0) scale(1); }
    .t3-popup h2 {
      font-family: var(--f-display); font-size: 2rem; margin-bottom: 16px;
      background: linear-gradient(to right, #fff, #e9b558); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .t3-popup p {
      color: var(--mute); font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;
    }
  `}</style>

<div className={`t3-popup-overlay ${showPopup ? 'show' : ''}`}>
        <div className="t3-popup">
          <h2>Top 3 Voter</h2>
          <p>Vote the best 3 pandals you explored this year and make them winner</p>
          <button className="btn solid" onClick={() => setShowPopup(false)} style={{ width: '100%', justifyContent: 'center' }}>Start Voting</button>
        </div>
      </div>

    </>
  );
}



export function FaqPage() {
  const [openQ, setOpenQ] = useState<number | null>(0);

  const faqs = [
      { q: "What is the Burdwan Puja Guide?", a: "The Burdwan Puja Guide is your complete digital companion for Durga Puja 2026 in Burdwan (Bardhaman). It features curated pandal lists, themes, live voting, a transit survival kit, and an interactive map." },
      { q: "Where can I find Durga Puja pandals in Burdwan?", a: "You can explore our Pandal Directory or use the Interactive Puja Map to find precise locations and themes for all major committees across Bardhaman." },
      { q: "How can I explore the pandals efficiently?", a: "We recommend using our Route Planner to generate optimized walking or toto itineraries based on your current location and available time." },
      { q: "How does the Top 3 Voting work?", a: "You can vote for your 3 favorite pandals on the Top 3 Voter page. Select the best pandals you explored this year to help them win community recognition!" },
      { q: "Is there an offline mode or survival guide?", a: "Yes! Visit our Survival Kit page to find emergency contacts, bus and toto stands, and helpful tips to navigate the crowds safely. It is designed to be your offline companion." },
      { q: "Can I add my club's pandal to the directory?", a: "Absolutely! If your Durga Puja pandal is missing, please contact the Burdwan Capturers Official or Banglar Pujo Official teams through the social links in our footer to get it listed." },
      { q: "Do I need an active internet connection?", a: "While the map and live voting require internet, the Survival Kit and basic pandal directories are cached and can be accessed even with spotty network." },
      { q: "Is this guide free to use?", a: "Yes, the Burdwan Puja Guide is 100% free for all users and devotees." },
      { q: "How are the 'Featured' pandals selected?", a: "Featured pandals are handpicked by the Burdwan Capturers and Banglar Pujo teams based on artistic merit, heritage, and community impact." },
      { q: "Can I use the Route Planner while driving?", a: "The Route Planner allows you to select 'Car / Bike', 'Toto', or 'Walking'. Please follow local traffic restrictions as many roads become pedestrian-only during Puja." },
      { q: "What is the best time to go pandal hopping?", a: "For avoiding crowds, early mornings (4 AM - 8 AM) are best. For the full lighting and carnival experience, 7 PM to midnight is ideal." },
      { q: "Are all pandals wheelchair accessible?", a: "While many major theme pujas provide ramps, older heritage or narrow lane pujas might be challenging. We recommend checking the 'Traditional' filter for wider access." },
      { q: "How do I report an incorrect location on the map?", a: "Please reach out to us via the 'Contact Us' email in the footer, and our team will update the coordinates immediately." },
      { q: "What should I do if I get lost?", a: "Use the 'Survival Kit' page to find the nearest Police Assistance Booth or Toto stand. You can also share your GPS coordinates directly from the Route Planner." }
    ];

  return (
    <>
      <style>{`
  @keyframes slideUpFadeFaq {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .faq-hero {
    position: relative;
    padding: 160px 20px 80px;
    background: linear-gradient(135deg, var(--ink), #2a0810);
    text-align: center;
    overflow: hidden;
    border-bottom: 1px solid rgba(233, 181, 88, 0.2);
  }
  .faq-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(233,181,88,0.15), transparent 70%);
  }
  .faq-title {
    font-family: var(--f-display);
    font-size: clamp(3rem, 8vw, 5rem);
    background: linear-gradient(to right, #fff, #e9b558);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 20px; position: relative; z-index: 2;
    opacity: 0;
    animation: slideUpFadeFaq 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .faq-subtitle {
    color: var(--gold); font-size: 1.2rem; letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 40px; position: relative; z-index: 2;
    opacity: 0;
    animation: slideUpFadeFaq 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  }
  .faq-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;
    max-width: 800px; margin: -40px auto 100px; position: relative; z-index: 10;
    padding: 0 20px;
  }
  .faq-item {
    background: rgba(15,5,8,0.95);
    border: 1px solid rgba(233,181,88,0.15);
    border-radius: 12px; align-self: start;
    overflow: hidden; backdrop-filter: blur(10px);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    animation: slideUpFadeFaq 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .faq-item.open {
    border-color: rgba(233,181,88,0.7);
    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    transform: scale(1.03) translateY(-4px);
    background: rgba(30,10,15,0.98);
  }
  .faq-q {
    padding: 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    font-weight: 600; font-size: 1.1rem; color: #fff;
    transition: padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
  }
  .faq-item.open .faq-q {
    padding-left: 36px;
    color: var(--gold);
  }
  .faq-q svg {
    color: var(--gold); transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
  }
  .faq-item.open .faq-q svg { 
    transform: rotate(180deg) scale(1.2); 
    color: #fff;
  }
  .faq-a {
    padding: 0 24px; max-height: 0; opacity: 0; 
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    color: var(--mute); line-height: 1.6;
    transform: translateX(-30px) scale(0.95);
  }
  .faq-item.open .faq-a {
    padding: 0 36px 24px; max-height: 250px; opacity: 1;
    transform: translateX(0) scale(1);
    color: rgba(255,255,255,0.85);
  }
`}</style>

      <section className="faq-hero">
        <h1 className="faq-title">Got Questions?</h1>
        <p className="faq-subtitle">We have answers.</p>
        <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', opacity: 0.05, zIndex: 1 }}>
          <Alpana size={600} spin />
        </div>
      </section>

      <div className="faq-container">
        {faqs.map((f, i) => (
          <div key={i} className={`faq-item ${openQ === i ? 'open' : ''}`} style={{ animationDelay: `${0.3 + (i * 0.1)}s` }}>
            <div className="faq-q" onClick={() => setOpenQ(openQ === i ? null : i)}>
              {f.q}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </>
  );
}
