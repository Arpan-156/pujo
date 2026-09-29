const fs = require('fs');

// Pages.tsx
let pagesContent = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
pagesContent = pagesContent.replace(`export * from './SouvenirPage';\n`, '');
fs.writeFileSync('src/pages/Pages.tsx', pagesContent);

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  'Top3VoterPage, SouvenirPage } from \'./pages/Pages\';',
  'Top3VoterPage } from \'./pages/Pages\';'
);
appContent = appContent.replace(
  'case \'/top3\': return <Top3VoterPage />;\n    case \'/souvenir\': return <SouvenirPage />;',
  'case \'/top3\': return <Top3VoterPage />;'
);
fs.writeFileSync('src/App.tsx', appContent);

// site.ts
let siteContent = fs.readFileSync('src/data/site.ts', 'utf8');
siteContent = siteContent.replace(
  '{ label: \'Top 3 Voter\', bn: \'????? ?\', to: \'/top3\' },\n  { label: \'Souvenir Card\', bn: \'?????? ?????\', to: \'/souvenir\' },',
  '{ label: \'Top 3 Voter\', bn: \'????? ?\', to: \'/top3\' },'
);
fs.writeFileSync('src/data/site.ts', siteContent);

console.log("Removed Souvenir from codebase.");
