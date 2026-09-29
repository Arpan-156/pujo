const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { Reveal } from '../components/fx';

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
          setData(json['fallback']);
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
          background: linear-gradient(90deg, rgba(15, 5, 6, 0.9), rgba(25, 5, 10, 0.7));
          border-top: 1px solid rgba(233, 181, 88, 0.3);
          border-bottom: 1px solid rgba(233, 181, 88, 0.3);
          border-left: 4px solid var(--gold);
          border-right: 1px solid rgba(233, 181, 88, 0.1);
          border-radius: 8px;
          padding: 20px 30px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
          backdrop-filter: blur(15px);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: 20px;
        }
        
        .ds-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at 10% 50%, rgba(233,181,88,0.12), transparent 50%); pointer-events: none; }
        
        .ds-top { display: flex; align-items: center; gap: 12px; }
        .ds-badge { display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; background: var(--gold); color: #000; font-size: 0.7rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px; }
        .ds-badge span { opacity: 0.7; }
        
        .ds-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        
        .ds-left { display: flex; flex-direction: column; gap: 10px; justify-content: center; }
        .ds-shloka { font-family: var(--f-bn); font-size: clamp(1.4rem, 4vw, 2rem); color: var(--gold-2); line-height: 1.3; font-weight: 500; text-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        
        .ds-right { display: flex; flex-direction: column; gap: 12px; justify-content: center; border-left: 1px dashed rgba(255,255,255,0.15); padding-left: 20px; }
        .ds-meaning { font-style: italic; color: var(--shankha); opacity: 0.95; font-size: 1rem; line-height: 1.5; }
        .ds-fact { background: rgba(0,0,0,0.4); padding: 12px 16px; border-radius: 6px; font-size: 0.9rem; color: var(--mute); line-height: 1.5; }
        
        @media (min-width: 900px) {
          .ds-card { padding: 30px 40px; }
          .ds-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .ds-right { padding-left: 40px; }
        }
      \`}</style>
      
      <Reveal className="ds-card">
        <div className="ds-glow" />
        
        <div className="ds-top">
          <div className="ds-badge">Daily Insight <span>|</span> {data.dayName}</div>
        </div>
        
        <div className="ds-grid">
          <div className="ds-left">
            <div className="ds-shloka">{data.shloka}</div>
          </div>
          
          <div className="ds-right">
            <div className="ds-meaning">"{data.meaning}"</div>
            <div className="ds-fact">
              <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Historical Significance</strong>
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
