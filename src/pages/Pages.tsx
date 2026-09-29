import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { FILTERS } from '../data/pujas';
import { useData } from '../data/store';
import { Link, useRouter } from '../lib/router';
import { Photo } from '../components/Art';
import { Reveal, RevealText, Alpana } from '../components/fx';
import { ArrowLeft, ArrowRight, Mail, Pin, Search, X } from '../components/Icons';
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
 *  All Puja
 * ------------------------------------------------------------------ */
export function PujasPage() {
  const { pujas, themes } = useData();
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
                <button key={f.id} className={`chip ${filter === f.id ? 'solid' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
            {theme && (
              <p className="dir-theme">Showing theme: <b>{theme.title}</b>
                <button className="chip" onClick={() => navigate('/pujas')}>Clear theme <X size={14} /></button>
              </p>
            )}
          </div>
          <p className="dir-count" aria-live="polite">{list.length} of {pujas.length} Puja</p>
          {list.length ? (
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
                    <h3 className="plist-name">{p.name}</h3>
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
                    <div className="plist-arr"><ArrowRight size={20} /></div>
                  </div>
                </Wrapper>
                );
              })}
            </FlipGrid>
          ) : (
            <div className="empty">
              <p className="bn" lang="bn">কিছু পাওয়া যায়নি</p>
              <h3>No Puja matches these filters.</h3>
              <p>Try a different area name, or clear the filters to see everything.</p>
              <button className="btn solid" onClick={reset}><span>Show all Puja</span></button>
            </div>
          )}
        </div>
      </section>
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
        <Btn to="/pujas">Back to All Puja</Btn>
      </section>
    );
  }

  const same = pujas.filter((x) => x.themeId === p.themeId && x.slug !== p.slug).slice(0, 3);
  const i = pujas.findIndex((x) => x.slug === p.slug);
  const prev = pujas[(i - 1 + pujas.length) % pujas.length], next = pujas[(i + 1) % pujas.length];
  const shots = [p.heroImage, p.idolImage, ...p.gallery];
  const items = shots.map((v, k) => ({ visual: v, caption: `${p.name}, view ${k + 1}`, credit: 'Burdwan Capturers (placeholder)' }));
  const facts: [string, string][] = [
    ['Theme', p.theme], ['Pandal concept', p.pandalConcept], ['Idol concept', p.idolConcept],
    ['Location', p.location], ['Established', String(p.established)], ['Puja type', p.categories.join(', ')],
  ];

  return (
    <>
      <section className="pd-hero">
        <div className="pd-hero-bg"><Photo v={p.heroImage} eager alt={`${p.name} pandal`} /></div>
        <div className="page-head-shade" />
        <div className="wrap pd-hero-in">
          <Link to="/pujas" className="back" data-cursor="Back"><ArrowLeft size={18} /> All Puja</Link>
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
              {p.location}. Map pin is stylised.
            </p>
          ) : (
            <p className="pd-body">{p.location}. Pin position is a placeholder until real coordinates are added.</p>
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

      <nav className="pd-pn wrap" aria-label="Previous and next Puja">
        <Link to={`/puja/${prev.slug}`} data-cursor="Previous"><ArrowLeft size={20} /><span><small>Previous</small>{prev.name}</span></Link>
        <Link to={`/puja/${next.slug}`} data-cursor="Next"><span><small>Next</small>{next.name}</span><ArrowRight size={20} /></Link>
      </nav>
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


export function CrowdEstimatorPage() {
  const [pandal, setPandal] = useState(40);
  const [day, setDay] = useState(100);
  const [time, setTime] = useState(100);
  const [weather, setWeather] = useState(1.0);
  const [displayScore, setDisplayScore] = useState(0);

  const rawScore = ((pandal + day + time) / 240) * 100;
  const score = Math.min(100, Math.max(0, Math.round(rawScore * weather)));

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200;
    const startValue = displayScore;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayScore(Math.floor(ease * (score - startValue) + startValue));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  let status: { title?: string, sub?: string, color?: string, tip?: string, glow?: string } = {};
  if (score <= 30) status = { title: "Gharer Para Vibe", sub: "(Low Crowd)", color: "#22c55e", tip: "Perfect time for leisurely pandal hopping!", glow: 'rgba(34, 197, 94, 0.15)' };
  else if (score <= 60) status = { title: "Besh Rongo", sub: "(Moderate Crowd)", color: "#eab308", tip: "A lively atmosphere! Expect slight queues.", glow: 'rgba(234, 179, 8, 0.15)' };
  else if (score <= 85) status = { title: "Durgam Chobol", sub: "(Heavy Crowd)", color: "#ef4444", tip: "Wear comfortable shoes. Be prepared to walk!", glow: 'rgba(239, 68, 68, 0.15)' };
  else status = { title: "Matha Noshto!", sub: "(Extremely Packed)", color: "#9f1239", tip: "Survival mode activated! Carry water, avoid driving.", glow: 'rgba(159, 18, 57, 0.25)' };
  
  if (weather === 0.4 && score > 60) status.tip = "Heavy rain is dispersing crowds, but expect immense traffic jams! Bring an umbrella.";
  else if (weather === 0.4 && score <= 60) status.tip = "Puddles everywhere! The rain ruined plans, meaning you get a VIP darshan.";

  const offset = 251.32 * (1 - (score / 100));

  return (
    <div className="page-head" style={{ minHeight: '100vh', height: 'auto', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 'calc(var(--safe-t, 0px) + 120px) 20px 120px', position: 'relative' }}>
      
      <div className="page-head-bg" style={{ position: 'absolute', inset: '-5%', zIndex: -3, opacity: 0.35, filter: 'blur(8px)' }}>
        <div style={{ width: '100%', height: '100%', opacity: 1 }}><Photo v={{ src: '/images/ashtami.jpg', art: 'pandal', seed: 0 }} eager alt="" className="full-photo" /></div>
      </div>
      <div className="page-head-shade" style={{ position: 'absolute', inset: 0, zIndex: -2, background: 'radial-gradient(circle at center, rgba(15,5,6,0.5) 0%, rgba(10,3,4,0.95) 100%)' }} />
      
      <div className="glow-orb" style={{ top: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(233,181,88,0.08)', animationDelay: '0s' }} />
      <div className="glow-orb" style={{ bottom: '20%', right: '5%', width: '500px', height: '500px', background: 'rgba(155,27,48,0.1)', animationDelay: '-5s' }} />

      <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: `radial-gradient(circle at 50% 50%, ${status.glow} 0%, transparent 70%)`, transition: 'background 2s ease' }} />

      <style>{`
        .full-photo img { width: 100%; height: 100%; object-fit: cover; }
        
        @keyframes floatGlow {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          100% { transform: translateY(-80px) scale(1.1); opacity: 1; }
        }
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: floatGlow 8s infinite ease-in-out alternate;
          pointer-events: none;
          z-index: -1;
        }

        .crowd-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          background: rgba(15, 5, 6, 0.4);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          padding: 30px 24px;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 50px 100px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.5);
          width: 100%;
          max-width: 1100px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 1s ease, border-color 1s ease;
        }
        @media (min-width: 820px) {
          .crowd-wrap {
            grid-template-columns: 1fr 1.2fr;
            gap: 70px;
            padding: 60px;
          }
        }
        
        .crowd-select {
          padding: 16px 20px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          border-radius: 12px;
          appearance: none;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s ease;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23E9B558' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }
        .crowd-select option { background-color: #1a0f14; color: #fff; }
        .crowd-select:hover, .crowd-select:focus {
          border-color: var(--gold);
          background-color: rgba(233, 181, 88, 0.05);
          box-shadow: 0 0 15px rgba(233, 181, 88, 0.15);
          outline: none;
        }
        
        .crowd-label {
          display: flex;
          flex-direction: column;
          gap: 12px;
          color: var(--gold-2);
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
        }
      `}</style>
      
      <div className="wrap crowd-wrap" style={{ borderColor: `${status.color}40`, boxShadow: `0 50px 100px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 40px ${status.color}20` }}>
        
        <div style={{ position: 'absolute', top: '50%', right: '-15%', transform: 'translateY(-50%)', opacity: 0.06, pointerEvents: 'none', zIndex: 0 }}>
           <Alpana size={800} spin={true} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--gold)', lineHeight: 0.9, marginBottom: '20px', textShadow: '0 4px 20px rgba(233,181,88,0.3)' }}><RevealText as="h1" lines={['Crowd', 'Estimator']} className="display" live /></div>
          <Reveal delay={100}><p style={{ color: 'var(--mute)', marginBottom: '40px', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '400px' }}>Plan your pandal hopping perfectly. Tweak the parameters below to predict the real-time rush in Burdwan.</p></Reveal>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Reveal delay={200}>
              <label className="crowd-label">
                Select Pandal/Zone
                <select className="crowd-select" value={pandal} onChange={e => setPandal(Number(e.target.value))}>
                  <option value={40}>Laltu Smriti Sangha & Alamganj</option>
                  <option value={35}>Ichlabad Kiran Sangha & Jagoroni</option>
                  <option value={25}>Subhash Athletic & Boro Nilpur</option>
                  <option value={10}>Local Para / Heritage Bari</option>
                </select>
              </label>
            </Reveal>
            <Reveal delay={300}>
              <label className="crowd-label">
                Select Festive Day
                <select className="crowd-select" value={day} onChange={e => setDay(Number(e.target.value))}>
                  <option value={20}>Mahalaya</option>
                  <option value={50}>Shasthi</option>
                  <option value={75}>Saptami</option>
                  <option value={100}>Ashtami</option>
                  <option value={100}>Navami</option>
                  <option value={50}>Dashami</option>
                </select>
              </label>
            </Reveal>
            <Reveal delay={400}>
              <label className="crowd-label">
                Select Time of Day
                <select className="crowd-select" value={time} onChange={e => setTime(Number(e.target.value))}>
                  <option value={20}>Morning (6 AM - 12 PM)</option>
                  <option value={45}>Afternoon (12 PM - 4 PM)</option>
                  <option value={80}>Evening (4 PM - 8 PM)</option>
                  <option value={100}>Peak Night (8 PM - 2 AM)</option>
                  <option value={50}>Late Night (2 AM - 6 AM)</option>
                </select>
              </label>
            </Reveal>
            <Reveal delay={500}>
              <label className="crowd-label">
                Weather Condition
                <select className="crowd-select" value={weather} onChange={e => setWeather(Number(e.target.value))}>
                  <option value={1.0}>Clear & Pleasant</option>
                  <option value={0.8}>Drizzling</option>
                  <option value={0.4}>Heavy Rain</option>
                </select>
              </label>
            </Reveal>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 2, padding: '20px 0' }}>
          
          <Reveal delay={600} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '2/1.1', marginBottom: '40px' }}>
              
              <svg viewBox="0 0 200 110" style={{ width: '100%', height: '100%', filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 25px ${status.color})`, transition: 'filter 1s ease' }}>
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" strokeLinecap="round" />
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={status.color} strokeWidth="16" strokeLinecap="round" style={{ strokeDasharray: 251.32, strokeDashoffset: offset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.8s ease' }} />
              </svg>
              
              <div style={{ position: 'absolute', bottom: '5px', left: '0', right: '0', fontSize: '5rem', fontWeight: 'bold', color: '#fff', lineHeight: 1, fontFamily: 'var(--f-display)', fontVariantNumeric: 'tabular-nums', textShadow: `0 0 40px ${status.color}`, transition: 'text-shadow 1s ease' }}>
                {displayScore}%
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={700}>
            <h2 style={{ fontSize: '3rem', color: status.color, marginBottom: '12px', transition: 'color 0.8s ease', fontFamily: 'var(--f-display)', textShadow: `0 0 30px ${status.color}80` }}>{status.title}</h2>
            <span style={{ display: 'inline-block', fontSize: '1rem', color: '#fff', backgroundColor: 'rgba(0,0,0,0.4)', padding: '6px 16px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>{status.sub}</span>
            <p style={{ color: 'var(--shankha)', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{status.tip}</p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
