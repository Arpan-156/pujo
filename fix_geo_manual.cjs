const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /emit\(\{[\s\S]*?active: true,[\s\S]*?lat: area\.lat,[\s\S]*?lng: area\.lng,[\s\S]*?error: null,[\s\S]*?area: area\.name,[\s\S]*?status: 'success',[\s\S]*?isManual: true[\s\S]*?\}\);/m;

const newCode = `globalGeo = {
        active: true,
        lat: area.lat,
        lng: area.lng,
        error: null,
        area: area.name,
        status: 'success',
        isManual: true
      };
      localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
      emit(globalGeo);`;

code = code.replace(regex, newCode);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed setManualLocation mutation');
