const fs = require('fs');

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  'Top3VoterPage } from \'./pages/Pages\';',
  'Top3VoterPage, SouvenirPage } from \'./pages/Pages\';'
);
appContent = appContent.replace(
  'case \'/top3\': return <Top3VoterPage />;',
  'case \'/top3\': return <Top3VoterPage />;\n    case \'/souvenir\': return <SouvenirPage />;'
);
fs.writeFileSync('src/App.tsx', appContent);

// site.ts
let siteContent = fs.readFileSync('src/data/site.ts', 'utf8');
siteContent = siteContent.replace(
  '{ label: \'Top 3 Voter\', bn: \'????? ?\', to: \'/top3\' },',
  '{ label: \'Top 3 Voter\', bn: \'????? ?\', to: \'/top3\' },\n  { label: \'Souvenir Card\', bn: \'?????? ?????\', to: \'/souvenir\' },'
);
fs.writeFileSync('src/data/site.ts', siteContent);

console.log("Linked SouvenirPage to routing and nav");
