const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// The ? was injected by powershell because of the ? character
code = code.replace(/<span className="arrow">\?<\/span>/g, '<span className="arrow">&rarr;</span>');
// Just in case it was literally parsed as a question mark or something else
code = code.replace(/<span className="arrow">.*?<\/span>/g, '<span className="arrow">&rarr;</span>');

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed corrupted arrow character with HTML entity.");
