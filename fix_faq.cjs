const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const toRemove = [
  '{ q: "Can I edit my Top 3 votes after submitting?", a: "No, votes are final once submitted to the global blockchain/database to prevent spam. Take your time to explore before locking in your choices!" },',
  '{ q: "How is the app\'s walking distance calculated?", a: "We use direct geocoordinate calculations (Haversine formula) to estimate point-to-point distance, assuming a standard walking speed of 4.5 to 5 km/h." },',
  '{ q: "What is the Pandal Digital Passport?", a: "It\'s an upcoming gamified feature! You\'ll be able to \'check-in\' via GPS at each pandal you visit to earn digital stamps and badges." },'
];

toRemove.forEach(r => {
  code = code.replace(new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\n?', 'g'), '');
});

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Removed technical FAQs');
