const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Fix opacity bug
code = code.replace(
  '.surv-card {',
  '.surv-card {\n                opacity: 1 !important; visibility: visible !important; display: block !important;'
);

// Add print-only footer branding
if (!code.includes('className="print-only"')) {
    code = code.replace(
      '</div>\n    </div>\n  );\n}\n',
      `</div>\n      <div className="print-only" style={{ display: 'none', textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ccc', fontSize: '10pt', fontWeight: 'bold' }}>PHOTOGRAPHY & DESIGN BY BURDWAN CAPTURERS OFFICIAL & BANGLAR PUJO OFFICIAL</div>\n    </div>\n  );\n}\n`
    );
}

// Make sure print-only is visible in print
if (!code.includes('.print-only { display: block !important; }')) {
    code = code.replace(
        '.global-branding, nav, footer, .surv-bg-glow, .surv-print-btn, .skip { display: none !important; }',
        '.global-branding, nav, footer, .surv-bg-glow, .surv-print-btn, .skip { display: none !important; }\n            .print-only { display: block !important; }'
    );
}

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
