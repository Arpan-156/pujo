import { useState, useEffect } from 'react';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsStandalone(true);
      return;
    }

    // Android/Chrome logic
    // First check if we already caught it in main.tsx
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPWAInstallPrompt = e;
    };
    
    // Custom event dispatched from main.tsx if it fires after this component mounts but we want to be safe
    const handleCustomPrompt = (e: any) => {
      setDeferredPrompt(e.detail);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-ready', handleCustomPrompt);

    // iOS detection
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isMaciPad = navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
    
    if (isIOSDevice || isMaciPad) {
      setIsIOS(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-ready', handleCustomPrompt);
    };
  }, []);

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSPrompt(true);
    } else {
      alert('App installation is either not supported by your browser or it is already installed. Try opening from Chrome or Safari on mobile.');
    }
  };

  if (isStandalone) return null;

  return (
    <>
      <style>{`
        .install-nav-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(233, 181, 88, 0.15); border: 1px solid rgba(233, 181, 88, 0.4);
          color: var(--gold); padding: 6px 12px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
          cursor: pointer; transition: all 0.2s; backdrop-filter: blur(8px);
        }
        .install-nav-btn:hover { background: rgba(233, 181, 88, 0.25); transform: scale(1.05); }
        @media (max-width: 600px) {
          .install-nav-text { display: none; }
          .install-nav-btn { padding: 8px; border-radius: 50%; }
        }
      `}</style>
      <button onClick={handleInstallClick} className="install-nav-btn" aria-label="Install App" title="Install App">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span className="install-nav-text">Install</span>
      </button>

      {showIOSPrompt && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', padding: '20px', backdropFilter: 'blur(5px)' }} onClick={() => setShowIOSPrompt(false)}>
          <div style={{ background: '#111', border: '1px solid #e9b558', borderRadius: '16px', padding: '30px', maxWidth: '340px', width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#e9b558', margin: '0 0 20px 0', fontSize: '1.5rem', fontFamily: 'var(--f-display)' }}>Install on iOS</h3>
            <p style={{ color: '#fff', margin: '0 0 24px 0', lineHeight: 1.6, fontSize: '0.95rem' }}>
              To install the Pujo Guide app on your iPhone or iPad:<br/><br/>
              1. <strong>Open this site in Safari</strong> (if you are using Chrome or another browser).<br/><br/>
              2. Tap the <strong>Share</strong> button <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'sub', margin: '0 4px', stroke: '#3b82f6' }}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> at the bottom.<br/><br/>
              3. Scroll down and tap <strong>Add to Home Screen</strong> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'sub', margin: '0 4px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>.
            </p>
            <button onClick={() => setShowIOSPrompt(false)} style={{ background: 'linear-gradient(45deg, #e9b558, #d49a3a)', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 'bold', width: '100%', fontSize: '1rem', cursor: 'pointer' }}>Got it</button>
          </div>
        </div>
      )}
    </>
  );
}
