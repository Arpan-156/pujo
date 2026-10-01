const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// First, make sure the CSS is globally available by putting it in index.css, or just copying it to PujasPage.
// To keep things simple, I'll just copy the state and JSX into PujasPage.

const popupLogic = `
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);
`;

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

// Inject into PujasPage
pages = pages.replace(
  'export function PujasPage() {\n      const { pujas, themes } = useData();',
  'export function PujasPage() {\n      const { pujas, themes } = useData();\n' + popupLogic
);

// We need the CSS. It's already in Top3VoterPage, but if we navigate to PujasPage first, the CSS won't be loaded.
// So let's extract the CSS to a global place or duplicate it.
const popupCSS = `
  <style>{\`
    .t3-popup-overlay {
      position: fixed; inset: 0; background: rgba(10,4,5,0.85); backdrop-filter: blur(8px);
      z-index: 10000; display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.4s var(--ease);
    }
    .t3-popup-overlay.show { opacity: 1; pointer-events: auto; }
    .t3-popup {
      background: linear-gradient(135deg, rgba(20,5,8,0.95), rgba(122,18,32,0.8));
      border: 1px solid rgba(233,181,88,0.4); border-radius: 16px;
      padding: 40px; max-width: 90vw; width: 500px; text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
      transform: translateY(20px) scale(0.95); transition: transform 0.4s var(--ease);
    }
    .t3-popup-overlay.show .t3-popup { transform: translateY(0) scale(1); }
    .t3-popup h2 {
      font-family: var(--f-display); font-size: 2rem; margin-bottom: 16px;
      background: linear-gradient(to right, #fff, #e9b558); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .t3-popup p {
      color: var(--mute); font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;
    }
  \`}</style>
`;

// Inject JSX and CSS into PujasPage return
pages = pages.replace(
  '          </section>\n        )}\n  \n        \n      </>\n    );\n  }',
  '          </section>\n        )}\n  \n        ' + popupCSS + popupJSX + '\n      </>\n    );\n  }'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Added popup to PujasPage');
