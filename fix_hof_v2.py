import codecs

content = """import React from 'react';

const Defs = () => (
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFE066" />
      <stop offset="50%" stopColor="#E9B558" />
      <stop offset="100%" stopColor="#9C7027" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
);

const LogoBiswaBangla = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.5" />
    <text x="50" y="52" fontFamily="Georgia, serif" fontStyle="italic" fontSize="55" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">B</text>
  </svg>
);

const LogoUltratech = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <ellipse cx="50" cy="40" rx="35" ry="25" fill="none" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.7" />
    <text x="50" y="44" fontFamily="Arial Black, sans-serif" fontSize="35" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">U</text>
    <text x="50" y="85" fontFamily="Arial, sans-serif" fontSize="12" fill="#fff" textAnchor="middle" letterSpacing="2" opacity="0.8">ULTRATECH</text>
  </svg>
);

const LogoABP = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <circle cx="50" cy="45" r="32" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <text x="50" y="48" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">abp</text>
    <text x="50" y="90" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#fff" textAnchor="middle" letterSpacing="3" opacity="0.8">ANANDA</text>
  </svg>
);

const LogoNews18 = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <rect x="10" y="25" width="80" height="35" rx="4" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="25" x2="50" y2="60" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <text x="30" y="45" fontFamily="Impact, sans-serif" fontSize="18" fill="#fff" textAnchor="middle" dominantBaseline="middle" opacity="0.9">NEWS</text>
    <text x="70" y="45" fontFamily="Impact, sans-serif" fontSize="24" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">18</text>
    <text x="50" y="85" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle" letterSpacing="3" opacity="0.8">BANGLA</text>
  </svg>
);

const LogoTV9 = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <text x="35" y="45" fontFamily="Arial Black, sans-serif" fontSize="28" fill="#fff" textAnchor="middle" dominantBaseline="middle" fontStyle="italic" opacity="0.9">TV</text>
    <text x="68" y="45" fontFamily="Arial Black, sans-serif" fontSize="40" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" fontStyle="italic" filter="url(#glow)">9</text>
    <text x="50" y="85" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle" letterSpacing="3" opacity="0.8">BANGLA</text>
  </svg>
);

const LogoZee = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <circle cx="50" cy="40" r="30" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <text x="50" y="43" fontFamily="Arial Black, sans-serif" fontSize="35" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">Z</text>
    <text x="50" y="85" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle" letterSpacing="3" opacity="0.8">24 GHANTA</text>
  </svg>
);

const LogoRepublic = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <rect x="20" y="15" width="60" height="55" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <text x="50" y="48" fontFamily="Georgia, serif" fontWeight="bold" fontSize="38" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">R.</text>
    <text x="50" y="90" fontFamily="Arial, sans-serif" fontSize="11" fill="#fff" textAnchor="middle" letterSpacing="3" opacity="0.8">BANGLA</text>
  </svg>
);

const LogoCN = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <rect x="18" y="15" width="64" height="55" rx="15" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <text x="50" y="46" fontFamily="Arial Black, sans-serif" fontSize="26" fill="url(#goldGrad)" textAnchor="middle" dominantBaseline="middle" filter="url(#glow)">CN</text>
    <text x="50" y="90" fontFamily="Arial, sans-serif" fontSize="10" fill="#fff" textAnchor="middle" letterSpacing="2" opacity="0.8">CALCUTTA NEWS</text>
  </svg>
);

const GenericLogo = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <Defs />
    <path d="M50 15 L65 40 L90 45 L70 65 L75 90 L50 75 L25 90 L30 65 L10 45 L35 40 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
    <circle cx="50" cy="50" r="10" fill="url(#goldGrad)" filter="url(#glow)"/>
  </svg>
);

export const HallOfFameV2 = ({ p }: { p: any }) => {
  if (!p || !p.featured) return null;

  let awards = [
    { title: 'Best Pandal', year: '2025', Icon: GenericLogo },
    { title: 'Public Choice', year: '2024', Icon: GenericLogo },
    { title: 'Eco Friendly', year: '2023', Icon: GenericLogo },
    { title: 'Best Theme', year: '2022', Icon: GenericLogo },
    { title: 'Heritage', year: '2021', Icon: GenericLogo },
    { title: 'Jury Special', year: '2020', Icon: GenericLogo },
  ];

  if (p.slug === 'vivekananda-sevak-sangha' || p.slug === 'kalibazar' || true) {
    awards = [
      { title: '\\u09AC\\u09BF\\u09B6\\u09CD\\u09AC\\u09AC\\u09BE\\u0982\\u09B2\\u09BE \\u09B6\\u09BE\\u09B0\\u09A6 \\u09B8\\u09AE\\u09CD\\u09AE\\u09BE\\u09A8', year: '5 Times Winner', Icon: LogoBiswaBangla },
      { title: 'Ultratech 7 Wonders', year: '3 Times Winner', Icon: LogoUltratech },
      { title: 'ABP Ananda', year: 'Award Winner', Icon: LogoABP },
      { title: 'News18 Bangla', year: 'Award Winner', Icon: LogoNews18 },
      { title: 'TV9 Bangla', year: 'Award Winner', Icon: LogoTV9 },
      { title: 'Zee 24 Ghanta', year: 'Award Winner', Icon: LogoZee },
      { title: 'Republic Bangla', year: 'Award Winner', Icon: LogoRepublic },
      { title: 'CN Calcutta News', year: 'Award Winner', Icon: LogoCN },
    ];
  }

  return (
    <section className="hall-of-fame wrap" style={{ position: 'relative', overflow: 'hidden', padding: '120px 20px', margin: '80px auto', borderRadius: '40px', background: '#050403', border: '1px solid rgba(233, 181, 88, 0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.9), inset 0 0 80px rgba(0,0,0,0.8)' }}>
      <style>{`
        .hof-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 600px) {
          .hof-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }
        }
        .hof-card {
          background: rgba(12, 10, 8, 0.6);
          border: 1px solid rgba(233, 181, 88, 0.1);
          border-radius: 16px;
          padding: 30px 16px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .hof-card:hover {
          transform: translateY(-5px);
          background: rgba(20, 16, 12, 0.8);
          border-color: rgba(233, 181, 88, 0.3);
          box-shadow: 0 15px 35px rgba(0,0,0,0.9), inset 0 0 20px rgba(233, 181, 88, 0.05);
        }
        .hof-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(233,181,88,0.3), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .hof-card:hover::before {
          opacity: 1;
        }
        .hof-icon-wrap {
          width: 60px;
          height: 60px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .hof-title {
          color: rgba(255,255,255,0.9);
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          line-height: 1.5;
          z-index: 2;
        }
        .hof-year {
          color: var(--gold, #e9b558);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid rgba(233, 181, 88, 0.2);
          padding: 6px 14px;
          border-radius: 4px;
          z-index: 2;
          transition: all 0.3s;
        }
        .hof-card:hover .hof-year {
          background: rgba(233, 181, 88, 0.1);
          border-color: rgba(233, 181, 88, 0.4);
        }
        
        /* Ambient Background */
        .hof-ambient {
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(233,181,88,0.02) 0%, transparent 60%);
          pointer-events: none;
        }
      `}</style>

      <div className="hof-ambient"></div>
      
      {/* Sleek accent lines at top/bottom */}
      <div style={{ position: 'absolute', top: 0, left: '30%', right: '30%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(233,181,88,0.3), transparent)' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(233,181,88,0.1), transparent)' }}></div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'var(--f-display), serif', fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#fff', margin: 0, lineHeight: 1, letterSpacing: '2px', textShadow: '0 10px 30px rgba(0,0,0,0.8)', background: 'linear-gradient(180deg, #ffffff 0%, #e9b558 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          HALL OF FAME
        </h2>
        <div style={{ width: '2px', height: '30px', background: 'var(--gold, #e9b558)', margin: '20px auto', opacity: 0.5 }}></div>
        <p style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '10px', textTransform: 'uppercase', fontSize: '0.75rem', marginTop: '0', fontWeight: 500 }}>
          Media Recognition
        </p>
      </div>
      
      <div className="hof-grid">
        {awards.map((award, i) => {
          const Icon = award.Icon;
          return (
            <div key={i} className="hof-card">
              <div className="hof-icon-wrap">
                <Icon />
              </div>
              <div className="hof-title">{award.title}</div>
              <div className="hof-year">{award.year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
"""

with codecs.open('src/components/HallOfFameV2.tsx', 'w', 'utf-8') as f:
    f.write(content)
