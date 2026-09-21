import { useEffect, useMemo, useState } from 'react';
import { DataProvider } from './data/store';
import { EntranceCtx } from './lib/entrance';
import { RouterProvider, useRouter } from './lib/router';
import { Cursor } from './components/fx';
import { Curtain, Intro, Loader, PageWipe } from './components/Entrance';
import { Nav } from './components/Nav';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/shared';
import { Home } from './pages/Home';
import { AboutPage, BardhamanPage, ContactPage, FeaturedPage, GalleryPage, MapPage, PujaDetail, PujasPage, ThemesPage, TimelinePage } from './pages/Pages';

type Stage = 'loading' | 'intro' | 'curtain' | 'site';

function Routes() {
  const { pathname } = useRouter();
  if (pathname.startsWith('/puja/')) return <PujaDetail slug={decodeURIComponent(pathname.slice(6))} />;
  switch (pathname.replace(/\/$/, '') || '/') {
    case '/': return <Home />;
    case '/pujas': return <PujasPage />;
    // case '/themes': return <ThemesPage />;
    case '/featured': return <FeaturedPage />;
    case '/bardhaman': return <BardhamanPage />;
    case '/gallery': return <GalleryPage />;
    case '/map': return <MapPage />;
    case '/timeline': return <TimelinePage />;
    case '/about': return <AboutPage />;
    // case '/contact': return <ContactPage />;
    default: return <Home />;
  }
}

function GlobalBranding() {
  return (
    <>
      <style>{`
        @media (max-width: 800px) {
          .global-branding { display: none !important; }
        }
      `}</style>
      <div className="global-branding" aria-hidden="true" style={{
      position: 'fixed',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%) rotate(180deg)',
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
      zIndex: 100,
      pointerEvents: 'none',
      fontFamily: 'var(--f-body)',
      fontSize: '9px',
      letterSpacing: '0.25em',
      color: 'var(--gold)',
      opacity: 0.7,
      mixBlendMode: 'screen',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <span style={{ display: 'block', width: '1px', height: '30px', background: 'var(--gold)', opacity: 0.4 }} />
      <div style={{ textAlign: 'center', lineHeight: '1.8' }}>
        <span style={{ display: 'block', opacity: 0.8 }}>PHOTOGRAPHY & DESIGN BY</span>
        <b style={{ display: 'block', color: '#fff', fontWeight: 600 }}>BURDWAN CAPTURERS OFFICIAL</b>
      </div>
      <span style={{ display: 'block', width: '1px', height: '30px', background: 'var(--gold)', opacity: 0.4 }} />
    </div>
    </>
  );
}

function Shell() {
  const [stage, setStage] = useState<Stage>('loading');
  const [open, setOpen] = useState(false);
  const { label } = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle('locked', stage !== 'site');
  }, [stage]);
  useEffect(() => { document.title = `${label.en} — Bardhaman Durga Puja 2026`; }, [label]);

  const ctx = useMemo(() => ({ open }), [open]);

  return (
    <EntranceCtx.Provider value={ctx}>
      <Cursor />
      <a className="skip" href="#main">Skip to content</a>
      {stage === 'site' && (
        <>
          <GlobalBranding />
          <Nav visible={open} />
          <main id="main" className="page"><Routes /></main>
          <Footer />
          <PageWipe />
        </>
      )}
      <MusicPlayer visible={open} />
      {stage === 'loading' && <Loader onDone={() => setStage('intro')} />}
      {stage === 'intro' && <Intro onDone={() => { setOpen(true); setStage('site'); }} />}
    </EntranceCtx.Provider>
  );
}

export default function App() {
  return (
    <DataProvider>
      <RouterProvider>
        <Shell />
      </RouterProvider>
    </DataProvider>
  );
}
