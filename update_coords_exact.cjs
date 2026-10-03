const fs = require('fs');

const updates = {
  'Laltu Smriti Sangha': [23.229232, 87.869135],
  'Jagoroni Sangha': [23.220459, 87.865717],
  'Natural City': [23.224648, 87.859631],
  'Rathtala Para Barowari': [23.392550, 88.504036],
  'Kiran Sangha': [23.228645, 87.881031],
  'Padmashree Sangha': [23.227816, 87.875306],
  'Alamganj Barowari': [23.232791, 87.849424],
  'Laxmipur Math': [23.255559, 87.863531],
  'Nabin Sangha': [23.226692, 87.865346],
  'Keshabganj Choti Barowari': [23.258469, 87.848110],
  'Chowringhee Club': [23.218459, 87.868430],
  'Subhash Athletic Club': [23.236069, 87.878219],
  'Burirbagan Sarbojanin': [23.246270, 87.864909],
  'Barsul Young Mens Association': [23.184082, 87.963031],
  'Tikrahat Sarbojanin': [23.039375, 87.974222],
  'Barsul Jagarani': [23.183059, 87.957238],
  'Sripally Officers Colony': [26.535867, 89.533845],
  'Ichlabad Youth Club': [23.228660, 87.879957],
  'Shyamlal Sarbojanin': [23.2325, 87.8634],
  'Amadpur Zomidar Bari': [23.2326, 88.0903]
};

let code = fs.readFileSync('src/data/pujas.ts', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const [name, coords] of Object.entries(updates)) {
    if (line.includes(`name: '${name}'`)) {
      const [lat, lng] = coords;
      lines[i] = line.replace(/lat: [\d.]+, lng: [\d.]+/, `lat: ${lat}, lng: ${lng}`);
    }
  }
}

code = lines.join('\n');
fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Coordinates injected');
