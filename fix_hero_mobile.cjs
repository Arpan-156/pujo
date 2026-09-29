const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// I will append a beautiful mobile media query to the style block.
// First, find where the style block ends.
const styleEndIndex = code.indexOf('`}</style>');

if (styleEndIndex !== -1) {
    const mobileCSS = `
        /* --- BEAUTIFUL MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
            .hero { padding: 80px 0 100px 0 !important; align-items: flex-start !important; }
            .hero-in { padding: 0 20px; margin-top: 12vh; }
            
            .hero-bn-wrap { margin-bottom: 3vh; border-radius: 16px; width: 100%; }
            .hero-bn { font-size: 0.95rem; line-height: 1.6; padding: 16px 20px; text-align: center; }
            
            .hero-title-wrap { margin-bottom: 3vh; }
            .t-main { font-size: clamp(3rem, 12vw, 4rem); letter-spacing: 0.05em; display: flex; flex-direction: column; gap: 10px; }
            .t-main span { font-size: clamp(3.2rem, 13vw, 4.5rem); margin-top: -10px; }
            
            .hero-sub { font-size: 0.85rem; letter-spacing: 3px; margin-top: 2vh; line-height: 1.5; padding: 0 10px; }
            
            .hero-cta { width: 100%; gap: 12px; margin-top: 5vh; display: grid; grid-template-columns: 1fr; }
            
            .btn.elegant-primary, .btn.elegant-glass { 
                width: 100%; padding: 18px 20px; font-size: 0.8rem; letter-spacing: 2px; 
            }
            
            .hero-brand { margin-top: 5vh; padding-bottom: 60px; font-size: 0.65rem; }
        }
    `;
    
    code = code.slice(0, styleEndIndex) + mobileCSS + code.slice(styleEndIndex);
    fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
    console.log("Injected mobile CSS.");
} else {
    console.log("Could not find style block.");
}
