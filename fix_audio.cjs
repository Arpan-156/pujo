const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

const replacement = `export const TRACKS: Track[] = [
  { id: 'jago-durga', title: 'Jago Durga', mood: 'Mahalaya', src: '/audio/jago-durga.m4a' },
  { id: 'pujo-theme', title: 'Pujo Theme', mood: 'Dugga Elo', src: '/audio/pujo-theme.mp3' },
  { id: 'dhaker-taal', title: 'Dhaker Taal', mood: 'Real Dhak beats', src: '/audio/dhak.mp3' },
  { id: 'mahalaya', title: 'Mahalaya Atmosphere', mood: 'Conch, bells, pre-dawn hush' },
  { id: 'classical', title: 'Bengali Classical', mood: 'Plucked strings in raga Bhairav' },
  { id: 'dhunuchi', title: 'Dhunuchi Beats', mood: 'Fast dhak for the aarti' },
];`;

code = code.replace(/export const TRACKS: Track\[\] = \[[\s\S]*?\];/, replacement);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Updated playlist");
