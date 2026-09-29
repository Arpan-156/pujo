const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// 1. Remove LaalPaar and Procession from the bottom
code = code.replace(
  "<Procession />\n      <LaalPaar className=\"hero-paar\" />",
  ""
);

// 2. Remove .hero-paar from CSS
code = code.replace(
  "        .hero-paar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; opacity: 0.85; }",
  ""
);

// 3. Fix the mobile layout so it's naturally centered and doesn't leave a huge gap
const mobileRegex = /\/\* --- BEAUTIFUL MOBILE OPTIMIZATION --- \*\/[\s\S]*?(?=\`\}<\/style>)/;
const beautifulMobile = `/* --- BEAUTIFUL MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
            .hero { padding: 0 !important; align-items: center !important; }
            
            /* Center the entire content block naturally */
            .hero-in { padding: 0 20px; min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }
            
            .hero-bn-wrap { margin-bottom: 4vh; border-radius: 12px; }
            .hero-bn { font-size: 0.9rem; line-height: 1.6; padding: 12px 16px; text-align: center; white-space: normal; }
            
            .hero-title-wrap { margin-bottom: 2vh; }
            .t-main { font-size: clamp(2.8rem, 14vw, 3.5rem); letter-spacing: 0.05em; display: flex; flex-direction: column; gap: 5px; }
            .t-main span { font-size: clamp(3.2rem, 16vw, 4rem); margin-top: -5px; }
            
            .hero-sub { font-size: 0.75rem; letter-spacing: 3px; margin-top: 2vh; line-height: 1.5; margin-bottom: 6vh; }
            
            .hero-cta { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 0; }
            
            .btn.elegant-primary { grid-column: 1 / -1; }
            
            .btn.elegant-primary, .btn.elegant-glass { 
                width: 100%; padding: 16px 10px; font-size: 0.75rem; letter-spacing: 1px; justify-content: center;
            }
            .btn.elegant-glass span.arrow { display: none; }
            
            /* Give it ample padding at the bottom so it clears the floating icons naturally */
            .hero-brand { margin-top: 6vh; padding-bottom: 80px; font-size: 0.65rem; text-align: center; }
        }
        `;
        
code = code.replace(mobileRegex, beautifulMobile);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed bottom mobile layout.");
