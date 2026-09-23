const fs = require('fs'); 
let c = fs.readFileSync('src/sections/FeaturedRail.tsx', 'utf8'); 

let bnMatch = c.match(/{!compact && <p lang="bn" className="bn">([^<]+)<\/p>}/);
let bnText = bnMatch ? bnMatch[1] : '';

c = c.replace(
  /<Reveal delay=\{200\} className="feat-lead">\s*([\s\S]*?)\s*<\/Reveal>/, 
  '<Reveal delay={200} className="feat-lead">\n            <p>$1</p>\n            <p lang="bn" className="bn" style={{ marginTop: "16px", fontSize: "1.2rem", color: "var(--gold-2)" }}>' + bnText + '</p>\n          </Reveal>'
); 

c = c.replace(
  /<div className="feat-lead-card" aria-hidden=\{!compact\}>[\s\S]*?<\/div>/, 
  '{compact && (\n          <div className="feat-lead-card" aria-hidden="false">\n            <RevealText lines={[\'FEATURED\', \'PANDALS 2026\']} className="display" />\n          </div>\n        )}'
); 

fs.writeFileSync('src/sections/FeaturedRail.tsx', c);
