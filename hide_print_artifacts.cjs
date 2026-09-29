const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// For RoutePlanner:
if (code.includes('.page-head-bg, .page-head-shade, .print-hide, nav { display: none !important; }')) {
    code = code.replace(
        '.page-head-bg, .page-head-shade, .print-hide, nav { display: none !important; }',
        '@page { size: A4; margin: 0; }\n            .rp-wrap { padding: 1.2cm !important; }\n            .page-head-bg, .page-head-shade, .print-hide, nav, footer, .music, .passport-wrapper { display: none !important; }'
    );
}

// For SurvivalKit:
if (code.includes('@page { size: A4; margin: 1.2cm; }')) {
    code = code.replace(
        '@page { size: A4; margin: 1.2cm; }',
        '@page { size: A4; margin: 0; }'
    );
    
    // Add padding to the main container
    code = code.replace(
        '.page { padding: 0 !important; margin: 0 !important; }',
        '.page { padding: 1.2cm !important; margin: 0 !important; }'
    );
    
    // Hide passport wrapper and music player
    code = code.replace(
        '.global-branding, nav, footer, .surv-bg-glow, .surv-print-btn, .skip { display: none !important; }',
        '.global-branding, nav, footer, .surv-bg-glow, .surv-print-btn, .skip, .music, .passport-wrapper { display: none !important; }'
    );
}

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
