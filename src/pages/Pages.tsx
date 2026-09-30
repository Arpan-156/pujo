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
 *  Pandals & Themes
 * ------------------------------------------------------------------ */
export function PujasPage() {
    const { pujas, themes } = useData();
    const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
    useEffect(() => {
      try {
        const saved = localStorage.getItem('puja_votes_26');
        if (saved) setUserState(JSON.parse(saved));
      } catch (e) {}
    }, []);
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p className="dir-count" aria-live="polite" style={{ margin: 0 }}>{list.length} of {pujas.length} Pandals</p>
            <button className="btn solid" onClick={() => window.print()} style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '6px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download PDF
            </button>
          </div>
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
            </FlipGrid>
          ) : (
            <div className="empty">
              <p className="bn" lang="bn">কিছু পাওয়া যায়নি</p>
              <h3>No Puja matches these filters.</h3>
              <p>Try a different area name, or clear the filters to see everything.</p>
              <button className="btn solid" onClick={reset}><span>Show all Pandals</span></button>
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
        <div className="pd-hero-bg"><Photo v={p.heroImage} eager alt={`${p.name} pandal`} /></div>
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
  const [zone, setZone] = useState('central');
  const [time, setTime] = useState('quick');
  const [vibe, setVibe] = useState('accessible');
  const [route, setRoute] = useState<any>(null);

  const ROUTES = [
    {
        id: 'central-art',
        match: { zone: 'central', vibe: 'art' },
        title: 'The Masterpiece Trail',
        desc: 'Burdwan\'s biggest award-winning theme pujas packed into one visually stunning evening.',
        pandals: [
            { name: 'Laltu Smriti Sangha', zone: 'Baranilpur', theme: 'Tirupati Balaji Temple Replica', tip: 'Start here before 7 PM to beat the massive queue. Incredible lighting!', transit: 'Walk 10 mins to next' },
            { name: 'Boro Nilpur', zone: 'Boro Nilpur', theme: 'Dubai Swaminarayan Temple', tip: 'Grab some phuchka near the exit gate mela.', transit: 'Short toto ride (5 mins)' },
            { name: 'Chowringhee Club', zone: 'Chhotonilpur', theme: 'Land of the Blue Fairy', tip: 'The interior artwork is delicate, look at the ceiling.', transit: 'End of route' }
        ]
    },
    {
        id: 'central-carnival',
        match: { zone: 'central', vibe: 'carnival' },
        title: 'The Great Burdwan Mela',
        desc: 'Massive crowds, giant giant-wheels, and endless street food.',
        pandals: [
            { name: 'Jagoroni Sangha', zone: 'Chhotonilpur', theme: 'Manaskamana - Grand Palace', tip: 'Massive fairgrounds outside! The egg rolls here are legendary.', transit: 'Toto ride (10 mins)' },
            { name: 'Laxmipur Math', zone: 'Laxmipur', theme: 'Domino Theme', tip: 'Expect heavy dhak beats and massive crowds dancing.', transit: 'Walk 15 mins through the mela' },
            { name: 'Nabin Sangha', zone: 'Chhotonilpur', theme: 'Hawa Mahal, Rajasthan', tip: 'Perfect spot for selfies with the brightly lit exterior.', transit: 'End of route' }
        ]
    },
    {
        id: 'north-accessible',
        match: { zone: 'north', vibe: 'accessible' },
        title: 'The Royal Heritage Walk',
        desc: 'Easy to navigate, historically significant, and incredibly beautiful without the marathon walking.',
        pandals: [
            { name: 'Amadpur Zomidar Bari', zone: 'Amadpur', theme: 'A Timeless Legacy', tip: 'Drive up directly. Experience 400-year-old heritage and peaceful chanting.', transit: 'Car/Toto ride (15 mins)' },
            { name: 'Alamganj Barowari', zone: 'Alamganj', theme: 'Kedarnath Temple', tip: 'Very accessible entrance right off the main road.', transit: 'Walk 5 mins' },
            { name: 'Tikrahat Sarbojanin', zone: 'Tikrahat', theme: 'The Agony of 46', tip: 'Deeply emotional social theme. Very organized crowd flow.', transit: 'End of route' }
        ]
    },
    {
        id: 'south-all',
        match: { zone: 'south', vibe: 'any' },
        title: 'The Sripally Serenade',
        desc: 'A vibrant mix of themes and local flavor with very manageable crowds.',
        pandals: [
            { name: 'Sripally Officers Colony', zone: 'Sripally', theme: 'Yoga Shakti', tip: 'Very peaceful ambiance. Notice the intricate clay work.', transit: 'Walk 10 mins' },
            { name: 'Kiran Sangha', zone: 'Ichlabad', theme: 'Jol-i Jibon (Water is Life)', tip: 'Beautiful eco-friendly message. Great lighting over water.', transit: 'Toto ride (8 mins)' },
            { name: 'Subhash Athletic Club', zone: 'Nutanpally', theme: 'Vande Bharat (Kashmir)', tip: 'The train model is a huge hit with kids!', transit: 'End of route' }
        ]
    }
  ];

  const FALLBACK = { id: 'fallback', match: { zone: 'any', vibe: 'any' },
    title: 'Burdwan Classics Tour',
    desc: 'A robust mix of everything that makes Burdwan Durga Puja famous.',
    pandals: [
        { name: 'Laltu Smriti Sangha', zone: 'Baranilpur', theme: 'Grand Temple Architecture', tip: 'Arrive early, massive crowds expected!', transit: 'Toto ride (15 mins)' },
        { name: 'Alamganj Barowari', zone: 'Alamganj', theme: 'Spiritual Kedarnath', tip: 'Don\'t miss the detailed interior sanctum.', transit: 'Walk 10 mins' },
        { name: 'Shyamlal Sarbojanin', zone: 'Khosbagan', theme: 'Har Har Mahadev', tip: 'Epic idol display and high energy.', transit: 'End of route' }
    ]
  };

  const generate = () => {
    let r = ROUTES.find(r => r.match.zone === zone && (r.match.vibe === vibe || r.match.vibe === 'any'));
    if (!r) r = FALLBACK;
    
    let finalPandals = [...(r?.pandals || [])];
    let timeDesc = '';
    
    if (time === 'quick') {
        finalPandals = finalPandals.slice(0, 2);
        timeDesc = 'taking roughly 2 hours.';
    } else if (time === 'marathon') {
        finalPandals.push({ name: 'Ichlabad Kiran Sangha', zone: 'Ichlabad', theme: 'Baahubali', tip: 'The ultimate late-night grand finale!', transit: 'End of route' });
        finalPandals[finalPandals.length - 2].transit = 'Toto ride (20 mins)';
        timeDesc = 'keeping you up all night!';
    } else {
        timeDesc = 'taking roughly 4 hours.';
    }
    
    setRoute({ ...r, pandals: finalPandals, timeDesc });
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
        .rp-label:hover .rp-card { border-color: rgba(255,255,255,0.3); }
        .rp-label input:checked + .rp-card { border-color: var(--gold); background: rgba(233,181,88,0.1); box-shadow: 0 0 20px rgba(233,181,88,0.2); }
        
        .rp-btn { width: 100%; background: linear-gradient(to right, #880808, #b91c1c); color: #fff; border: none; padding: 20px; font-size: 1.25rem; font-weight: bold; border-radius: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(136,8,8,0.5); font-family: var(--f-body); }
        .rp-btn:hover { transform: scale(1.02); box-shadow: 0 15px 40px rgba(136,8,8,0.7); }
        
        .rp-timeline { position: relative; padding-left: 30px; margin-top: 40px; }
        .rp-timeline::before { content: ''; position: absolute; left: 0; top: 20px; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--gold) 0%, rgba(233,181,88,0.1) 100%); }
        
        .rp-node { position: relative; margin-bottom: 40px; }
        .rp-node-dot { position: absolute; left: -39px; top: 20px; width: 20px; height: 20px; background: #0a0304; border: 3px solid var(--gold); border-radius: 50%; box-shadow: 0 0 15px var(--gold); }
        .rp-pandal-card { background: rgba(15,5,6,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        
        @media print {
          body { background: white !important; color: black !important; }
          @page { size: A4; margin: 0; }
            .rp-wrap { padding: 1.2cm !important; }
            .page-head-bg, .page-head-shade, .print-hide, nav, footer, .music, .passport-wrapper { display: none !important; }
          .page-head { padding: 0 !important; min-height: 0 !important; }
          .rp-pandal-card { background: white !important; border: 1px solid #ccc !important; box-shadow: none !important; break-inside: avoid; color: black !important; }
          .rp-timeline::before { background: black !important; }
          .rp-node-dot { border-color: black !important; background: white !important; box-shadow: none !important; }
          h1, h2, h3, h4, p, span { color: black !important; text-shadow: none !important; }
        }
      `}</style>

      <div className="rp-wrap">
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.04, pointerEvents: 'none', zIndex: -1 }}>
           <Alpana size={800} spin={true} />
        </div>

        {!route ? (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--gold)', lineHeight: 0.9, marginBottom: '20px' }}><RevealText as="h1" lines={['Route', 'Planner']} className="display" live /></div>
              <p style={{ color: 'var(--mute)', fontSize: '1.2rem' }}>Choose your adventure constraints and let us map out the ultimate itinerary.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>1. Starting Point / Zone</h2>
                <div className="rp-radio-grid">
                  {[
                    { v: 'central', t: 'Central', d: 'Khosbagan & Baranilpur. Massive themes.' },
                    { v: 'north', t: 'North', d: 'Alamganj. Traditional heavy-hitters.' },
                    { v: 'south', t: 'South', d: 'Sripally. Creative & less chaotic.' }
                  ].map(o => (
                    <label key={o.v} className="rp-label">
                      <input type="radio" name="zone" value={o.v} checked={zone === o.v} onChange={() => setZone(o.v)} />
                      <div className="rp-card">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>2. Time Available</h2>
                <div className="rp-radio-grid">
                  {[
                    { v: 'quick', i: '\u23F1\uFE0F', t: 'Quick Express', d: '~2 Hours' },
                    { v: 'standard', i: '\u{1F6B6}', t: 'Standard Hop', d: '~4 Hours' },
                    { v: 'marathon', i: '\u{1F989}', t: 'Night Marathon', d: '8+ Hours' }
                  ].map(o => (
                    <label key={o.v} className="rp-label">
                      <input type="radio" name="time" value={o.v} checked={time === o.v} onChange={() => setTime(o.v)} />
                      <div className="rp-card" style={{ textAlign: 'center', padding: '30px 20px' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{o.i}</div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--shankha)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>3. Preferred Vibe</h2>
                <div className="rp-radio-grid">
                  {[
                    { v: 'accessible', t: 'Easy Walks', d: 'Clustered pandals with easy auto access.' },
                    { v: 'art', t: 'Art & Theme', d: 'Award-winning architecture and designs.' },
                    { v: 'carnival', t: 'Carnival & Food', d: 'Loud dhak, melas, and huge crowds.' }
                  ].map(o => (
                    <label key={o.v} className="rp-label">
                      <input type="radio" name="vibe" value={o.v} checked={vibe === o.v} onChange={() => setVibe(o.v)} />
                      <div className="rp-card">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--gold)' }}>{o.t}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>{o.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button className="rp-btn" onClick={generate}>{'Generate My Adventure Route \u{1F5FA}\uFE0F'}</button>
            </div>
          </div>
        ) : (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div className="print-hide" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <button onClick={() => setRoute(null)} style={{ background: 'transparent', color: 'var(--mute)', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>{'\u2190 Start Over'}</button>
              <button onClick={() => window.print()} style={{ background: 'rgba(233,181,88,0.2)', color: 'var(--gold)', border: '1px solid var(--gold)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold' }}>Save PDF / Print</button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>Your Customized Route</span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--f-display)', margin: '10px 0' }}>{route.title}</h1>
              <p style={{ color: 'var(--mute)', fontSize: '1.2rem' }}>{route.desc} {route.timeDesc}</p>
            </div>

            <div className="rp-timeline">
              {route.pandals.map((p: any, i: number) => {
                const isLast = i === route.pandals.length - 1;
                return (
                  <div key={i} className="rp-node">
                    <div className="rp-node-dot"></div>
                    <div className="rp-pandal-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                          <span style={{ background: 'rgba(136,8,8,0.2)', color: '#ff4d4d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>{p.zone}</span>
                          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--f-display)', color: 'var(--gold)', marginTop: '10px' }}>{p.name}</h2>
                        </div>
                        <span style={{ fontSize: '2rem', opacity: 0.5 }}>{'\u{1F3AA}'}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <span style={{ fontSize: '1.2rem' }}>{'\u2728'}</span>
                          <div>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Theme</div>
                            <div style={{ fontSize: '1.1rem', color: '#fff' }}>{p.theme}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <span style={{ fontSize: '1.2rem' }}>{'\u{1F4A1}'}</span>
                          <div>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Pro Tip</div>
                            <div style={{ fontSize: '1.1rem', color: 'var(--shankha)', fontStyle: 'italic' }}>{p.tip}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="print-hide" style={{ padding: '30px 0 30px 20px', color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--gold)', opacity: 0.5 }}>{'\u2193'}</span> {p.transit}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
  const [userState, setUserState] = useState<Record<string, { rating: number; upvoted: boolean }>>({});
  const [toast, setToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('puja_votes_26');
      if (saved) setUserState(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveState = (newState: Record<string, { rating: number; upvoted: boolean }>) => {
    setUserState(newState);
    localStorage.setItem('puja_votes_26', JSON.stringify(newState));
  };

  const { pujas } = useData();
  const PANDALS = pujas.map(p => {
    const stringVal = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      id: p.slug,
      name: p.name,
      zone: p.zone || 'Bardhaman',
      tagline: p.description || p.story || `Theme: ${p.theme}`,
      baseVotes: (stringVal * 12) + 1980
    };
  });

  const getScore = (p: any) => {
      const s = userState[p.id] || { rating: 0, upvoted: false };
      // Base votes heavily dominate to represent the "Global Community"
      // User's local vote just slightly nudges the community score
      return p.baseVotes + (s.rating * 10) + (s.upvoted ? 50 : 0);
    };

  const sorted = [...PANDALS].sort((a, b) => getScore(b) - getScore(a));
  const top3 = [sorted[0], sorted[1], sorted[2]];

  const visualOrder = [
    { p: top3[1], rank: 2, class: 't3-pod-2', color: '#c0c0c0', label: '2ND' },
    { p: top3[0], rank: 1, class: 't3-pod-1', color: '#e9b558', label: '1ST' },
    { p: top3[2], rank: 3, class: 't3-pod-3', color: '#cd7f32', label: '3RD' }
  ];

  const rate = (id: string, rating: number) => {
    saveState({ ...userState, [id]: { ...(userState[id] || { rating: 0, upvoted: false }), rating } });
  };

  const toggleUpvote = (id: string) => {
    const s = userState[id] || { rating: 0, upvoted: false };
    saveState({ ...userState, [id]: { ...s, upvoted: !s.upvoted } });
  };

  const shareBracket = () => {
    let text = `?? Burdwan Capturers Official - Community Top 3 Pandals:\n\n`;
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
        
        .t3-pod-slot { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100px; animation: floatTrophy 6s ease-in-out infinite; }
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
          <button className="t3-share" onClick={shareBracket}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Share My Bracket
          </button>
        </section>
        
        <section>
          <div className="t3-cat-head">
            <h2>Pandal Catalog</h2>
            <span>Rate to Rank</span>
          </div>
          <div className="t3-grid">
            {sorted.map((p, idx) => {
              const s = userState[p.id] || { rating: 0, upvoted: false };
              const isTop3 = idx < 3;
              return (
                <div key={p.id} className="t3-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {isTop3 && <div className="t3-top3-badge">Top 3</div>}
                  <div className="t3-card-top">
                    <div>
                      <span className="t3-zone">{p.zone}</span>
                      <h3 className="t3-name">{p.name}</h3>
                    </div>
                    <button className={`t3-upvote ${s.upvoted ? 'voted' : ''}`} onClick={() => toggleUpvote(p.id)} aria-label="Upvote">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill={s.upvoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
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
    </>
  );
}
