const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { Reveal, Alpana } from '../components/fx';

export function DailyShloka() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const res = await fetch('/shlokas.json?t=' + Date.now());
        const json = await res.json();
        
        const d = new Date();
        const today = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`;
        
        if (json[today]) {
          setData(json[today]);
        } else {
          // If not a specific Puja date, rotate through the available shlokas based on the day of the year
          const keys = Object.keys(json).filter(k => k !== 'fallback');
          
          // Calculate day of year
          const start = new Date(d.getFullYear(), 0, 0);
          const diff = (d.getTime() - start.getTime()) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = Math.floor(diff / oneDay);
          
          const index = dayOfYear % keys.length;
          const rotatedData = json[keys[index]];
          
          setData({
             ...rotatedData,
             dayName: \`Pre-Puja Focus: \${rotatedData.dayName}\`
          });
        }
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchToday();
    const timer = setInterval(fetchToday, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  if (loading || !data) return null;

  return (
    <section className="ds-wrap wrap">
      <style>{\`
        .ds-wrap { padding: 0 20px; display: flex; justify-content: center; margin-bottom: 60px; }
        .ds-card {
          width: 100%; max-width: 1200px;
          background: linear-gradient(135deg, rgba(20, 5, 8, 0.95) 0%, rgba(35, 10, 15, 0.8) 100%);
          border-top: 1px solid rgba(233, 181, 88, 0.4);
          border-bottom: 1px solid rgba(233, 181, 88, 0.4);
          border-left: 5px solid var(--gold);
          border-right: 1px solid rgba(233, 181, 88, 0.2);
          border-radius: 12px;
          padding: 20px 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(233,181,88,0.05);
          backdrop-filter: blur(15px);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: 20px;
        }
        
        .ds-glow { position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(233,181,88,0.15), transparent 60%); pointer-events: none; }
        .ds-alpana-bg { position: absolute; right: -50px; top: -50px; opacity: 0.08; pointer-events: none; }
        
        .ds-top { display: flex; align-items: center; gap: 12px; position: relative; z-index: 2; }
        .ds-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: linear-gradient(90deg, var(--gold), #d4af37); color: #220b10; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border-radius: 6px; box-shadow: 0 4px 15px rgba(233,181,88,0.3); }
        .ds-badge span { opacity: 0.6; }
        
        .ds-grid { display: grid; grid-template-columns: 1fr; gap: 20px; position: relative; z-index: 2; }
        
        .ds-left { display: flex; flex-direction: column; gap: 15px; justify-content: center; position: relative; }
        
        /* Trisul / Durga element decorative */
        .ds-deco { width: 40px; height: 40px; color: var(--gold); opacity: 0.8; margin-bottom: 5px; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5)); }
        
        .ds-shloka { font-family: var(--f-bn); font-size: clamp(1.6rem, 4vw, 2.4rem); color: var(--gold-2); line-height: 1.35; font-weight: 500; text-shadow: 0 5px 20px rgba(233,181,88,0.3); letter-spacing: 1px; }
        
        .ds-right { display: flex; flex-direction: column; gap: 15px; justify-content: center; border-left: 2px dashed rgba(233,181,88,0.2); padding-left: 20px; }
        .ds-meaning { font-style: italic; color: var(--shankha); opacity: 0.95; font-size: 1.05rem; line-height: 1.6; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
        
        .ds-fact { background: rgba(0,0,0,0.5); padding: 16px 20px; border-radius: 8px; font-size: 0.95rem; color: var(--mute); line-height: 1.6; border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 2px 10px rgba(0,0,0,0.3); }
        
        @media (min-width: 900px) {
          .ds-card { padding: 40px 50px; }
          .ds-grid { grid-template-columns: 1.2fr 1fr; gap: 50px; }
          .ds-right { padding-left: 50px; }
        }
      \`}</style>
      
      <Reveal className="ds-card">
        <div className="ds-glow" />
        <div className="ds-alpana-bg">
           <Alpana size={300} spin={true} />
        </div>
        
        <div className="ds-top">
          <div className="ds-badge">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
             Daily Insight <span>|</span> {data.dayName}
          </div>
        </div>
        
        <div className="ds-grid">
          <div className="ds-left">
            {/* Durga Maa Eyes SVG */}
            <svg className="ds-deco" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20 Q 25 5 45 20 Q 25 35 10 20 Z" stroke="currentColor" strokeWidth="2" fill="rgba(233,181,88,0.2)"/>
              <circle cx="28" cy="20" r="5" fill="currentColor"/>
              <path d="M55 20 Q 75 5 90 20 Q 75 35 55 20 Z" stroke="currentColor" strokeWidth="2" fill="rgba(233,181,88,0.2)"/>
              <circle cx="72" cy="20" r="5" fill="currentColor"/>
              <circle cx="50" cy="10" r="2" fill="red"/>
            </svg>
            <div className="ds-shloka">{data.shloka}</div>
          </div>
          
          <div className="ds-right">
            <div className="ds-meaning">"{data.meaning}"</div>
            <div className="ds-fact">
              <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '6px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Historical Significance</strong>
              {data.fact}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
`;

fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
