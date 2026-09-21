import fs from 'fs';

const raw = fs.readFileSync('src/data/pujas.ts', 'utf8');

// We need to fix the pujas in Golapbag and Krishna Sayar
// They currently have lng ~87.877
// We will replace them with lat: 23.251, lng: 87.849 and lat: 23.244, lng: 87.847

let updated = raw.replace(/(area: 'Golapbag'[\s\S]*?lat: )23\.\d+, lng: 87\.\d+/g, (match, p1) => {
  return p1 + "23.2519, lng: 87.8498";
});

updated = updated.replace(/(area: 'Krishna Sayar'[\s\S]*?lat: )23\.\d+, lng: 87\.\d+/g, (match, p1) => {
  return p1 + "23.2448, lng: 87.8477";
});

fs.writeFileSync('src/data/pujas.ts', updated);

