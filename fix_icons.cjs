const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /DISTANCE FROM YOU <span style=\{\{ background: '#166534', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0\.65rem' \}\}>\? Live GPS<\/span>[\s\S]*?<h2 style=\{\{ fontSize: '1\.8rem', color: '#fff', margin: '0 0 4px 0' \}\}>You're \{distStr \|\| 'unknown distance'\}<\/h2>[\s\S]*?<p style=\{\{ color: 'var\(--mute\)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' \}\}>[\s\S]*?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9\.5a3\.5 3\.5 0 0 0 0 7h5a3\.5 3\.5 0 0 1 0 7H6"><\/path><\/svg>[\s\S]*?Approximately \{distStr \? getWalkTimeStr\(rawDistKm\) : 'calculating\.\.\.'\}/;

const newBlock = `DISTANCE FROM YOU <span style={{ background: '#166534', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Navigation size={10} /> Live GPS</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 4px 0' }}>You're {distStr || 'unknown distance'}</h2>
            <p style={{ color: 'var(--mute)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Footprints size={16} />
              Approximately {distStr ? getWalkTimeStr(rawDistKm) : 'calculating...'}`;

code = code.replace(regex, newBlock);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed icons');
