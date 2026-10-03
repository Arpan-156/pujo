const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(/lat: 23\.039375, lng: 87\.974222/, 'lat: 23.2464, lng: 87.8397'); // tikrahat
code = code.replace(/lat: 23\.39255, lng: 88\.504036/, 'lat: 23.2398, lng: 87.8337'); // rathtala
code = code.replace(/lat: 23\.184082, lng: 87\.963031/, 'lat: 23.1886, lng: 87.9701'); // barsul-yma
code = code.replace(/lat: 26\.535867, lng: 89\.533845/, 'lat: 23.183288, lng: 87.961787'); // barsul-jagarani

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Fixed coordinates');
