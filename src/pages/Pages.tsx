import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { FILTERS } from '../data/pujas';
import { useData } from '../data/store';
import { Link, useRouter } from '../lib/router';
import { Photo } from '../components/Art';
import { Reveal, RevealText } from '../components/fx';
import { ArrowLeft, ArrowRight, Mail, Pin, Search, X } from '../components/Icons';
import { Btn, FlipGrid, PageHead, PujaCard } from '../components/shared';
import { FeaturedRail } from '../sections/FeaturedRail';
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
      <PageHead lines={['BARDHAMAN', 'ALL PUJA']} bn="বর্ধমানের সব পুজো" lead="Explore the Puja celebrations across Bardhaman." visual={{ src: '/images/all-puja-cover.jpg', art: 'crowd', seed: 0 }} />
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
              {list.map((p) => (
                <Link key={p.slug} to={`/puja/${p.slug}`} className="plist-row" data-cursor="View">
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
                  <div className="plist-arr-wrap">
                    {p.featured && <span className="badge-shiny">Featured</span>}
                    <div className="plist-arr"><ArrowRight size={20} /></div>
                  </div>
                </Link>
              ))}
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
    <PageHead lines={['FEATURED', 'PANDALS 2026']} bn="এ বছরের বাছাই মণ্ডপ" lead="The pandals Burdwan Capturers Official and Banglar Pujo Official are specially featuring this year." visual={{ art: 'gate', seed: 62, hue: 14, tone: 'dusk' }} />
    <FeaturedRail compact />
  </>
);

export const BardhamanPage = () => (
  <>
    <PageHead lines={['EXPLORE', 'BARDHAMAN']} bn="আমাদের বর্ধমান" lead="Gates, rivers, temples, sweets and the lanes that link them." visual={{ art: 'bridge', seed: 63, hue: 18, tone: 'night' }} />
    <ExploreBardhaman />
    <section className="cta-band"><div className="wrap"><RevealText lines={['NOW FIND', 'THE PANDALS']} className="display" /><Btn to="/map" cursor="Open">Open the Puja Map</Btn></div></section>
  </>
);

export const GalleryPage = () => (
  <>
    <PageHead lines={['THE', 'GALLERY']} bn="ছবিঘর" lead="Maa Durga, the pandals, the dhak and the crowd, in frames from the field." visual={{ art: 'camera', seed: 64, hue: 20, tone: 'dusk' }} />
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
    <PageHead lines={['ABOUT', 'US']} bn="আমাদের কথা" lead="Two communities. One celebration." visual={{ art: 'camera', seed: 67, hue: 350, tone: 'dusk' }} />
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
