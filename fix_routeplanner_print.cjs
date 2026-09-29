const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const rpFooter = `</div>
              <div className="print-only" style={{ display: 'none', textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ccc', fontSize: '10pt', fontWeight: 'bold' }}>PHOTOGRAPHY & DESIGN BY BURDWAN CAPTURERS OFFICIAL & BANGLAR PUJO OFFICIAL</div>
            </div>
          )}
        </div>
      </div>`;

if (!code.includes('PHOTOGRAPHY & DESIGN BY BURDWAN CAPTURERS OFFICIAL & BANGLAR PUJO OFFICIAL</div>\n            </div>\n          )}\n        </div>')) {
    code = code.replace(
        /<\/div>\n            <\/div>\n          \)}\n        <\/div>\n      <\/div>\n    <\/div>\n  \);/,
        rpFooter + '\n    </div>\n  );'
    );
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
}
