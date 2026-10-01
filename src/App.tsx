import { useEffect, useMemo, useState } from 'react';
import { DataProvider } from './data/store';
import { engine } from './audio/engine';
import { EntranceCtx } from './lib/entrance';
import { RouterProvider, useRouter } from './lib/router';
import { SEO } from './components/SEO';
import { Cursor } from './components/fx';
import { Curtain, Intro, Loader, PageWipe } from './components/Entrance';
import { Nav } from './components/Nav';
import { MusicPlayer } from './components/MusicPlayer';
import { PassportFab } from './components/Passport';


import { Footer } from './components/shared';
import { Home } from './pages/Home';
import { AboutPage, BardhamanPage, ContactPage, FeaturedPage, GalleryPage, MapPage, PujaDetail, PujasPage, ThemesPage, TimelinePage, RoutePlannerPage, SurvivalKitPage, Top3VoterPage, FaqPage } from './pages/Pages';

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
        case '/planner': return <RoutePlannerPage />;
    case '/survival': return <SurvivalKitPage />;
    case '/top3': return <Top3VoterPage />;
    case '/faq': return <FaqPage />;
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
  const { label, pathname } = useRouter();

    useEffect(() => {
      const unlockAudio = () => {
        engine.unlock();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    }, []);


  useEffect(() => {
    document.documentElement.classList.toggle('locked', stage !== 'site');
  }, [stage]);
  // Title is now managed by SEO component

  const ctx = useMemo(() => ({ open }), [open]);

  return (
    <EntranceCtx.Provider value={ctx}>
      <Cursor />
      <SEO />
      <a className="skip" href="#main">Skip to content</a>
      {stage === 'site' && (
        <>
          <GlobalBranding />
          <Nav visible={open} />
          <main id="main" className="page"><Routes /></main>
          {(pathname.replace(/\/$/, '') || '/') !== '/featured' && <Footer />}
          
        </>
      )}
      <MusicPlayer visible={open} />
      <PassportFab visible={open} />
      
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
