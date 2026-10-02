import { useData } from '../data/store';
import { Link } from '../lib/router';
import { Photo } from '../components/Art';
import { ArrowRight, ChevronDown } from '../components/Icons';
import { PassportButton } from '../components/Passport';
import { pad2 } from '../lib/util';
import { Footer } from '../components/shared';
import { useEffect, useRef, useState } from 'react';

export function FeaturedShowcase() {
  const { featuredPujas } = useData();
  const [active, setActive] = useState(0);
  const total = featuredPujas.length + 2;
  const animating = useRef(false);

  useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animating.current) return;
      if (Math.abs(e.deltaY) < 30) return;
      
      const target = e.target as HTMLElement;
      const inFooter = target.closest('.fs-footer-wrap');
      if (inFooter) {
        if (e.deltaY > 0) return; // Allow scrolling down in footer
        if (inFooter.scrollTop > 0) return; // Allow scrolling up if not at top
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      
      setActive(curr => {
        const next = curr + dir;
        if (next >= 0 && next < total) {
          animating.current = true;
          setTimeout(() => { animating.current = false; }, 1000); // lock for 1s during animation
          return next;
        }
        return curr;
      });
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; touchProcessed = false; };
    let touchProcessed = false;
        const handleTouchMove = (e: TouchEvent) => {
      if (!e.target || !(e.target as HTMLElement).closest('.fs-footer-wrap')) e.preventDefault();
      if (animating.current) return;
      
      const target = e.target as HTMLElement;
      const inFooter = target.closest('.fs-footer-wrap');
      const dy = touchStartY - e.touches[0].clientY;
      
      if (inFooter) {
        if (dy > 0) return; // Allow swiping up (scrolling down) in footer
        if (inFooter.scrollTop > 0) return; // Allow swiping down if not at top
      }

      if (Math.abs(dy) > 50 && !touchProcessed) {
          touchProcessed = true;
        const dir = dy > 0 ? 1 : -1;
        setActive(curr => {
          const next = curr + dir;
          if (next >= 0 && next < total) {
            animating.current = true;
            setTimeout(() => { animating.current = false; }, 1000);
            return next;
          }
          return curr;
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [total]);

  return (
    <div className="fs-viewport">
      <div className="fs-track" style={{ transform: `translateY(-${active * 100}svh)` }}>
        {/* Slide 0: Intro */}
        <div className={`fs-slide ${active === 0 ? 'fs-active' : ''}`}>
          <div className="fs-bg">
              <Photo v={{ src: '/images/featured-cover.jpg', art: 'gate', seed: 62, hue: 14, tone: 'dusk' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(20,8,9,0.85) 100%)', zIndex: 1 }} />
            <div className="fs-ambient-glow" />
          </div>
          <div className="fs-content fs-intro-content">
            <h1 className="fs-title" style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 1, textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' , textShadow: '0 8px 40px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)'}}>
              Featured<br/><span style={{ color: 'var(--gold)' }}>Pandals 2026</span>
            </h1>
            <p className="fs-lead" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,0.9)', maxWidth: '600px', textAlign: 'center', lineHeight: 1.6, marginBottom: '60px' }}>
              The most highly anticipated pavilions, curated by Burdwan Capturers Official and Banglar Pujo Official.
            </p>
            <div className="fs-scroll-indicator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--gold-2)', opacity: 1, textShadow: '0 4px 15px rgba(0,0,0,0.9)', animation: 'bounce 2s infinite' }}>
              <span>Scroll to explore</span>
              <ChevronDown size={24} />
            </div>
          </div>
        </div>

        {/* Slides 1 to N: Pandals */}
        {featuredPujas.map((f, i) => {
          const slideIndex = i + 1;
          const isActive = active === slideIndex;
          return (
            <div key={f.slug} className={`fs-slide ${isActive ? 'fs-active' : ''}`}>
              <div className="fs-bg">
                <Photo v={f.puja.heroImage} alt={f.puja.name} />
                <div className="fs-overlay" />
              </div>
              <div className="fs-content">
                <div className="fs-glass">
                  <div className="fs-num">{pad2(i + 1)}</div>
                  <h2 className="fs-name">{f.puja.name}</h2>
                  <p className="fs-theme">{f.puja.theme}</p>
                  <p className="fs-tag">"{f.tagline}"</p>
                  <p className="fs-note">{f.note}</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <Link to={`/puja/${f.slug}`} className="fs-link" style={{ margin: 0 }}>
                      Explore Pandal <ArrowRight size={20} />
                    </Link>
                    {f.puja.map?.lat && f.puja.map?.lng && (
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(`https://www.google.com/maps/dir/?api=1&destination=${f.puja.map.lat},${f.puja.map.lng}`, '_blank', 'noopener,noreferrer'); }} className="fs-link" style={{ margin: 0, background: 'rgba(0,0,0,0.5)', borderColor: 'var(--gold)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                        Get Directions
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer Slide */}
        <div className={`fs-slide ${active === total - 1 ? 'fs-active' : ''}`} style={{ background: 'var(--ink)' }}>
          <div className="fs-footer-wrap" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
