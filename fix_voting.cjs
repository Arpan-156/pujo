const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Rename the component
code = code.replace(/export function Top3VoterPage\(\)/g, 'export function PublicVotingPage()');

// Replace "Top 3 Voter" with "Public Choice Awards"
code = code.replace(/Top 3 Voter/g, 'Public Choice Awards');

// Replace "Vote the best 3 pandals you explored this year and make them winner" 
code = code.replace(/Vote the best 3 pandals you explored this year and make them winner/g, 'Vote for the best pandals you explored this year to help them win!');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed Pages.tsx');
