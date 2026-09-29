const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /const fullStars = Math\.floor\(finalRating\);\s*const halfStar = finalRating - fullStars >= 0\.5 \? 1 : 0;\s*const emptyStars = 5 - fullStars - halfStar;\s*return \([\s\S]*?\{String\.fromCharCode\(11240\)\} : ''\}[\s\S]*?\{String\.fromCharCode\(9734\)\.repeat\(emptyStars\)\}/,
  `const displayStars = Math.round(finalRating);
                         return (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <div style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '2px' }}>
                               {String.fromCharCode(9733).repeat(displayStars)}
                               {String.fromCharCode(9734).repeat(5 - displayStars)}`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed half star logic.");
