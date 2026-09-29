const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { Reveal } from '../components/fx';

export function DailyShloka() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToday = async () => {
      try {
        // Fetch details from online for each date regularly
        const res = await fetch('/shlokas.json?t=' + Date.now()); // cache busting for regular updates
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
    
    // Set up regular interval to refetch in case date rolls over while page is open
    const timer = setInterval(fetchToday, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  if (loading || !data) return null;

  return (
    <section className="ds-wrap wrap" style={{ marginTop: '40px' }}>
      <style>{\`
        .ds-wrap { padding: 40px 20px; display: flex; justify-content: center; }
        .ds-card {
          width: 100%; max-width: 600px;
          background: rgba(15, 5, 6, 0.7);
          border: 1px solid rgba(233, 181, 88, 0.2);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          position: relative; overflow: hidden;
          text-align: center;
        }
        .ds-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(233,181,88,0.15), transparent 60%); pointer-events: none; }
        .ds-badge { display: inline-block; padding: 4px 12px; background: rgba(233,181,88,0.15); color: var(--gold); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; border-radius: 20px; margin-bottom: 20px; border: 1px solid rgba(233,181,88,0.3); }
        .ds-shloka { font-family: var(--f-bn); font-size: 1.6rem; color: var(--gold-2); line-height: 1.4; margin-bottom: 12px; font-weight: 500; }
        .ds-meaning { font-style: italic; color: var(--shankha); opacity: 0.9; font-size: 1rem; margin-bottom: 24px; }
        .ds-divider { width: 40px; height: 2px; background: var(--gold); margin: 0 auto 24px; opacity: 0.5; }
        .ds-fact { background: rgba(0,0,0,0.4); padding: 16px; border-radius: 12px; font-size: 0.95rem; color: var(--mute); line-height: 1.5; border: 1px solid rgba(255,255,255,0.05); text-align: left; }
      \`}</style>
      
      <Reveal className="ds-card">
        <div className="ds-glow" />
        <div className="ds-badge">Daily Insight &middot; {data.dayName}</div>
        <div className="ds-shloka">{data.shloka}</div>
        <div className="ds-meaning">"{data.meaning}"</div>
        <div className="ds-divider" />
        <div className="ds-fact">
          <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '6px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Historical Significance</strong>
          {data.fact}
        </div>
      </Reveal>
    </section>
  );
}
`;

fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
