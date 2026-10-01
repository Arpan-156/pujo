const fs = require('fs');

let pages = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// The code currently has: useEffect(() => { setShowPopup(true); }, []);
// I want to change it back to the proper logic: 
// useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);

pages = pages.replace(
  /useEffect\(\(\) => \{ setShowPopup\(true\); \}, \[\]\);/g,
  'useEffect(() => { const saved = localStorage.getItem("puja_votes_26"); if (!saved || Object.keys(JSON.parse(saved)).length === 0) { setShowPopup(true); } }, []);'
);

fs.writeFileSync('src/pages/Pages.tsx', pages, 'utf8');
console.log('Restored Top3 popup logic');
