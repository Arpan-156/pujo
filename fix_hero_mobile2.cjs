const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Replace the mobile block I just added with an even better one
const regex = /\/\* --- BEAUTIFUL MOBILE OPTIMIZATION --- \*\/[\s\S]*?(?=\`\}<\/style>)/;

const betterMobileCSS = `/* --- BEAUTIFUL MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
            .hero { padding: 0 !important; align-items: center !important; }
            .hero-in { padding: 0 20px; margin-top: 5vh; }
            
            .hero-bn-wrap { margin-bottom: 3vh; border-radius: 12px; }
            .hero-bn { font-size: 0.9rem; line-height: 1.6; padding: 12px 16px; text-align: center; white-space: normal; }
            
            .hero-title-wrap { margin-bottom: 2vh; }
            .t-main { font-size: clamp(2.8rem, 14vw, 3.5rem); letter-spacing: 0.05em; display: flex; flex-direction: column; gap: 5px; }
            .t-main span { font-size: clamp(3.2rem, 16vw, 4rem); margin-top: -5px; }
            
            .hero-sub { font-size: 0.75rem; letter-spacing: 3px; margin-top: 1vh; line-height: 1.5; }
            
            .hero-cta { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4vh; }
            
            .btn.elegant-primary { grid-column: 1 / -1; }
            
            .btn.elegant-primary, .btn.elegant-glass { 
                width: 100%; padding: 16px 10px; font-size: 0.75rem; letter-spacing: 1px; justify-content: center;
            }
            .btn.elegant-glass span.arrow { display: none; /* Hide arrows on small secondary buttons to save space */ }
            
            .hero-brand { margin-top: 4vh; padding-bottom: 80px; font-size: 0.65rem; }
        }
        `;

code = code.replace(regex, betterMobileCSS);
fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Applied advanced mobile grid layout.");
