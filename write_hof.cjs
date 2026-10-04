const fs = require('fs');
const content = import React from 'react';
import { RevealText } from './fx';

export const HallOfFame = ({ p }: { p: any }) => {
  if (!p || !p.featured) return null;

  let awards = [
    { title: 'Best Pandal', year: '2025', icon: '🏆' },
    { title: 'Public Choice', year: '2024', icon: '🏅' },
    { title: 'Eco Friendly', year: '2023', icon: '🌿' },
    { title: 'Best Theme', year: '2022', icon: '🎨' },
    { title: 'Heritage', year: '2021', icon: '🏛️' },
    { title: 'Jury Special', year: '2020', icon: '⭐' },
  ];

  if (p.slug === 'vivekananda-sevak-sangha') {
    awards = [
      { title: 'বিশ্ববাংলা শারদ সম্মান', year: '5 Times Winner', icon: '🏆' },
      { title: 'Ultratech 7 Wonders', year: '3 Times Winner', icon: '⭐' },
      { title: 'ABP Ananda', year: 'Award Winner', icon: '📺' },
      { title: 'News18 Bangla', year: 'Award Winner', icon: '🎥' },
      { title: 'TV9 Bangla', year: 'Award Winner', icon: '🎬' },
      { title: 'Zee24 Ghanta', year: 'Award Winner', icon: '📡' },
      { title: 'Republic Bangla', year: 'Award Winner', icon: '🎙️' },
      { title: 'CN Calcutta News', year: 'Award Winner', icon: '📰' },
    ];
  }

  return (
    <section className=\\"hall-of-fame wrap\\" style={{ position: 'relative', overflow: 'hidden', padding: '100px 20px', margin: '80px auto', borderRadius: '40px', background: 'radial-gradient(ellipse at bottom, rgba(30, 20, 10, 1) 0%, rgba(5, 5, 5, 1) 100%)', border: '1px solid rgba(233, 181, 88, 0.15)', boxShadow: '0 40px 100px rgba(0,0,0,0.9), inset 0 2px 20px rgba(255,255,255,0.05)' }}>
      <style>{\
        @keyframes spotlightSweepLeft {
          0% { transform: rotate(15deg); opacity: 0.6; }
          50% { transform: rotate(25deg); opacity: 0.9; }
          100% { transform: rotate(15deg); opacity: 0.6; }
        }
        @keyframes spotlightSweepRight {
          0% { transform: rotate(-15deg); opacity: 0.6; }
          50% { transform: rotate(-25deg); opacity: 0.9; }
          100% { transform: rotate(-15deg); opacity: 0.6; }
        }
        @keyframes floatIcon {
          0% { transform: translateY(0); filter: drop-shadow(0 5px 15px rgba(233,181,88,0.4)); }
          50% { transform: translateY(-8px); filter: drop-shadow(0 15px 25px rgba(233,181,88,0.8)); }
          100% { transform: translateY(0); filter: drop-shadow(0 5px 15px rgba(233,181,88,0.4)); }
        }
        .hof-award-card:hover .hof-icon {
          animation: floatIcon 2s ease-in-out infinite;
        }
        .hof-award-card:hover .hof-top-glow {
          opacity: 1 !important;
        }
      \}</style>

      {/* Spotlights */}
      <div style={{ position: 'absolute', top: '-10%', left: '5%', width: '200px', height: '140%', background: 'linear-gradient(180deg, rgba(233, 181, 88, 0.4) 0%, transparent 80%)', transformOrigin: 'top center', filter: 'blur(40px)', pointerEvents: 'none', animation: 'spotlightSweepLeft 8s ease-in-out infinite' }}></div>
      <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '200px', height: '140%', background: 'linear-gradient(180deg, rgba(233, 181, 88, 0.4) 0%, transparent 80%)', transformOrigin: 'top center', filter: 'blur(40px)', pointerEvents: 'none', animation: 'spotlightSweepRight 8s ease-in-out infinite' }}></div>

      {/* Core light beam */}
      <div style={{ position: 'absolute', top: '0', left: '15%', width: '2px', height: '100%', background: 'rgba(255,255,255,0.4)', transformOrigin: 'top center', filter: 'blur(2px)', pointerEvents: 'none', animation: 'spotlightSweepLeft 8s ease-in-out infinite' }}></div>
      <div style={{ position: 'absolute', top: '0', right: '15%', width: '2px', height: '100%', background: 'rgba(255,255,255,0.4)', transformOrigin: 'top center', filter: 'blur(2px)', pointerEvents: 'none', animation: 'spotlightSweepRight 8s ease-in-out infinite' }}></div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'var(--f-display), serif', fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#fff', margin: 0, lineHeight: 1, textShadow: '0 10px 40px rgba(233,181,88,0.6)', background: 'linear-gradient(to bottom, #ffffff, #e9b558)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HALL OF FAME</h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--gold, #e9b558)', margin: '20px auto', borderRadius: '3px', boxShadow: '0 0 15px var(--gold)' }}></div>
        <p style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '6px', textTransform: 'uppercase', fontSize: '1rem', marginTop: '0', fontWeight: 600 }}>A Legacy of Excellence</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {awards.map((award, i) => (
          <div key={i} className=\\"hof-award-card\\" style={{ 
            background: 'linear-gradient(160deg, rgba(40, 30, 15, 0.8) 0%, rgba(10, 8, 5, 0.9) 100%)', 
            border: '1px solid rgba(233, 181, 88, 0.3)',
            borderRadius: '24px',
            padding: '35px 20px',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.6), inset 0 2px 15px rgba(233, 181, 88, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            cursor: 'default',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => { 
            e.currentTarget.style.transform = 'translateY(-20px) scale(1.03)'; 
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(233, 181, 88, 0.2), inset 0 2px 20px rgba(233, 181, 88, 0.3)'; 
            e.currentTarget.style.borderColor = 'rgba(233, 181, 88, 0.8)';
          }}
          onMouseOut={(e) => { 
            e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6), inset 0 2px 15px rgba(233, 181, 88, 0.1)'; 
            e.currentTarget.style.borderColor = 'rgba(233, 181, 88, 0.3)';
          }}
          >
            <div className=\\"hof-top-glow\\" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, var(--gold, #e9b558), transparent)', opacity: 0, transition: 'opacity 0.3s ease' }}></div>
            <div className=\\"hof-icon\\" style={{ fontSize: '3.5rem', marginBottom: '20px', filter: 'drop-shadow(0 5px 15px rgba(233,181,88,0.4))', transition: 'all 0.3s ease' }}>{award.icon}</div>
            <div style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', lineHeight: 1.3 }}>{award.title}</div>
            <div style={{ color: 'var(--gold, #e9b558)', fontSize: '1rem', fontWeight: 700, fontFamily: 'monospace', background: 'rgba(233, 181, 88, 0.1)', padding: '4px 12px', borderRadius: '99px' }}>{award.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
;
fs.writeFileSync('src/components/HallOfFame.tsx', content, { encoding: 'utf8' });
console.log('Successfully wrote src/components/HallOfFame.tsx with UTF-8 encoding');
