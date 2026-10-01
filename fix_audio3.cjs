const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

code = code.replace(
  "{ id: 'classical', title: 'Bengali Classical', mood: 'Plucked strings in raga Bhairav' },",
  "{ id: 'bajlo-tomar', title: 'Bajlo Tomar Alor Benu', mood: 'Mahalaya Classics', src: '/audio/bajlo-tomar.mp3' },"
);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Updated classical track");
