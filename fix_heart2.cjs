const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /<button className=\{\`t3-upvote[\s\S]*?<\/button>/;
while (code.match(target)) {
  code = code.replace(target, '');
}

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Removed heart icon loops.");
