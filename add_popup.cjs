const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

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

const popupJSX = `
      <div className={\`t3-popup-overlay \${showPopup ? 'show' : ''}\`}>
        <div className="t3-popup">
          <h2>Top 3 Voter</h2>
          <p>Vote the best 3 pandals you explored this year and make them winner</p>
          <button className="btn solid" onClick={() => setShowPopup(false)} style={{ width: '100%', justifyContent: 'center' }}>Start Voting</button>
        </div>
      </div>
`;

// Insert the state and effect inside Top3VoterPage
pages = pages.replace(
  'export function Top3VoterPage() {',
  'export function Top3VoterPage() {\n  const [showPopup, setShowPopup] = useState(false);\n  useEffect(() => { const hasSeen = sessionStorage.getItem("t3_popup"); if (!hasSeen) { setShowPopup(true); sessionStorage.setItem("t3_popup", "1"); } }, []);\n'
);

// Insert the popup at the end of the return statement of Top3VoterPage.
// We need to find where Top3VoterPage ends.
// Let's replace the last `</div>\n    </>\n  );\n}` before the FAQ page, or just find it.
// Alternatively, let's inject it right after `<div className={\`t3-toast \${toast ? 'show' : ''}\`}>Copied! Paste it in the Instagram chat.</div>`
pages = pages.replace(
  /<div className=\{\`t3-toast \$\{toast \? 'show' : ''\}\`\}>Copied! Paste it in the Instagram chat.<\/div>/g,
  '<div className={`t3-toast ${toast ? \'show\' : \'\'}`}>Copied! Paste it in the Instagram chat.</div>\n' + popupCSS + popupJSX
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Added popup to Top3VoterPage properly');
