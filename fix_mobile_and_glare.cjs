const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Fix 1: Animation Glare Bug
code = code.replace(
  /@keyframes slideGlow \{\n\s*0% \{ transform: translateX\(-100%\) skewX\(-15deg\); \}\n\s*100% \{ transform: translateX\(200%\) skewX\(-15deg\); \}\n\s*\}/g,
  `@keyframes slideGlow {
            0% { left: -50%; }
            100% { left: 150%; }
          }`
);

// We also need to update the .surv-max-shimmer class to use left and skew
code = code.replace(
  /\.surv-max-shimmer \{\n\s*position: absolute; top: 0; left: 0; width: 300px; height: 100%;\n\s*background: linear-gradient\(90deg, transparent, rgba\(233,181,88,0\.15\), transparent\);\n\s*animation: slideGlow 5s infinite cubic-bezier\(0\.4, 0, 0\.2, 1\);\n\s*\}/g,
  `.surv-max-shimmer {
             position: absolute; top: 0; width: 300px; height: 100%; transform: skewX(-15deg);
             background: linear-gradient(90deg, transparent, rgba(233,181,88,0.15), transparent);
             animation: slideGlow 5s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }`
);

// Fix 2: Button blocked by grass on mobile
// We change `padding: 60px 20px;` to `padding: 60px 20px 100px;` to give room for the grass
code = code.replace(
  /\.surv-max-content \{\n\s*position: relative; max-width: 1200px; margin: 0 auto; padding: 60px 20px;/g,
  `.surv-max-content {
             position: relative; max-width: 1200px; margin: 0 auto; padding: 60px 20px 120px;`
);

// And update the desktop padding to also keep some bottom padding
code = code.replace(
  /\.surv-max-content \{ flex-direction: row; text-align: left; justify-content: space-between; padding: 80px 40px; \}/g,
  `.surv-max-content { flex-direction: row; text-align: left; justify-content: space-between; padding: 80px 40px 100px; }`
);

// Also add a higher z-index to the banner itself just in case it's fighting with the social container's click events.
code = code.replace(
  '<section className="surv-teaser" style={{ width: \'100vw\', marginLeft: \'calc(-50vw + 50%)\', position: \'relative\', overflow: \'hidden\', borderTop: \'1px solid rgba(233,181,88,0.3)\', borderBottom: \'1px solid rgba(233,181,88,0.3)\', background: \'#0a0304\' }}>',
  '<section className="surv-teaser" style={{ width: \'100vw\', marginLeft: \'calc(-50vw + 50%)\', position: \'relative\', zIndex: 10, overflow: \'hidden\', borderTop: \'1px solid rgba(233,181,88,0.3)\', borderBottom: \'1px solid rgba(233,181,88,0.3)\', background: \'#0a0304\' }}>'
);


fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log("Fixes applied!");
