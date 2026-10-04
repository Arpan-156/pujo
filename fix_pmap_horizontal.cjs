const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace the mobile list styling to be a beautiful horizontal slider
code = code.replace(
  /\.pmap-new-list \{ height: 400px !important; max-height: 50vh !important; overflow-y: auto !important; flex: none !important; border-top: 1px solid var\(--line\); border-bottom: 1px solid var\(--line\); padding-top: 10px; \}/,
  `.pmap-new-list { 
    height: auto !important; 
    max-height: none !important; 
    flex-direction: row !important; 
    overflow-x: auto !important; 
    overflow-y: hidden !important; 
    scroll-snap-type: x mandatory; 
    padding-bottom: 10px; 
    padding-right: 0 !important;
  }
  .pmap-new-list > div { 
    flex: 0 0 85%; 
    scroll-snap-align: center; 
  }`
);

// We also need to add a wrapper class to the pandal items to apply the flex sizing safely
code = code.replace(/<div\s+key=\{p\.slug\}\s+onClick=\{[^}]+\}\s+style=\{\{/g, '<div className="pmap-card-mob" key={p.slug} onClick={() => setSel(sel === p.slug ? null : p.slug)} style={{');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile to horizontal slider');
