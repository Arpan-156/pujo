const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Replace the useEffect for PujasPage
pages = pages.replace(
  'useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);',
  'useEffect(() => { setShowPopup(true); }, []);'
);

// Replace the useEffect for Top3VoterPage
// Since there might be two occurrences, let's use a global replace
pages = pages.replace(
  /useEffect\(\(\) => \{ const saved = localStorage\.getItem\("puja_votes_26"\); if \(\!saved \|\| Object\.keys\(JSON\.parse\(saved\)\)\.length === 0\) \{ setShowPopup\(true\); \} \}, \[\]\);/g,
  'useEffect(() => { setShowPopup(true); }, []);'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Popup will now show every single time');
