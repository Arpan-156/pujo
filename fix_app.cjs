const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/Top3VoterPage/g, 'PublicVotingPage');
code = code.replace(/case '\/top3':/g, "case '/vote':");

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Fixed App.tsx');
