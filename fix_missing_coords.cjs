const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const coords = {
  'natural-city': 'lat: 23.2380, lng: 87.8590',
  'kiran-sangha': 'lat: 23.2395, lng: 87.8720',
  'padmashree-sangha': 'lat: 23.2450, lng: 87.8600',
  'alamganj-barowari-kedarnath': 'lat: 23.2310, lng: 87.8500',
  'laxmipur-math': 'lat: 23.2500, lng: 87.8650',
  'nabin-sangha': 'lat: 23.2200, lng: 87.8650',
  'ichlabad-youth-club': 'lat: 23.2405, lng: 87.8730',
  'keshabganj-choti-barowari': 'lat: 23.2350, lng: 87.8800',
  'chowringhee-club': 'lat: 23.2410, lng: 87.8680',
  'laltu-smriti-sangha': 'lat: 23.2250, lng: 87.8750',
  'subhash-athletic-club': 'lat: 23.2330, lng: 87.8700',
  'badamtala-khaluibil-math': 'lat: 23.2480, lng: 87.8580',
  'burirbagan-sarbojanin': 'lat: 23.2280, lng: 87.8550',
  'barsul-yma': 'lat: 23.2100, lng: 87.9400',
  'tikrahat-sarbojanin': 'lat: 23.2300, lng: 87.8200',
  'barsul-jagarani': 'lat: 23.2120, lng: 87.9420',
  'sripally-officers-colony': 'lat: 23.2320, lng: 87.8600',
  'shyamlal-sarbojanin': 'lat: 23.2400, lng: 87.8550',
  'amadpur-zomidar-bari': 'lat: 23.1900, lng: 88.0400',
  'jagoroni-sangha': 'lat: 23.2280, lng: 87.8680'
};

for (const [slug, coord] of Object.entries(coords)) {
  const regex = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?)(desc:\\s*')`, 'g');
  code = code.replace(regex, `$1${coord}, $2`);
}

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Coordinates injected');
