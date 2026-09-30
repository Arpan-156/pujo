const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /<button className=\{\`t3-upvote \$\{s\.upvoted \? 'voted' : ''\}\`\} onClick=\{[^>]+\}>[\s\S]*?<\/button>/;
code = code.replace(target, '');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Removed the heart icon.");
