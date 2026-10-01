const fs = require('fs');
let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const popupJSX = `
      <div className={\`t3-popup-overlay \${showPopup ? 'show' : ''}\`}>
        <div className="t3-popup">
          <h2>Top 3 Voter</h2>
          <p>Vote the best 3 pandals you explored this year and make them winner</p>
          <button className="btn solid" onClick={() => { setShowPopup(false); navigate('/top3'); }} style={{ width: '100%', justifyContent: 'center' }}>Start Voting</button>
          <button className="btn" onClick={() => setShowPopup(false)} style={{ width: '100%', justifyContent: 'center', marginTop: '12px', background: 'transparent', border: '1px solid var(--line-2)' }}>Maybe Later</button>
        </div>
      </div>
`;

// Insert it right before the closing tag of PujasPage
pages = pages.replace(
  '          <div className="pcards">{same.map((x) => <PujaCard key={x.slug} p={x} />)}</div>\n          </section>\n        )}\n  \n        \n      </>\n    );\n  }',
  '          <div className="pcards">{same.map((x) => <PujaCard key={x.slug} p={x} />)}</div>\n          </section>\n        )}\n' + popupJSX + '\n      </>\n    );\n  }'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Injected JSX into PujasPage');
