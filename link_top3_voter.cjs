const fs = require('fs');

// Update App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  'SurvivalKitPage } from \'./pages/Pages\';',
  'SurvivalKitPage, Top3VoterPage } from \'./pages/Pages\';'
);
appContent = appContent.replace(
  'case \'/survival\': return <SurvivalKitPage />;',
  'case \'/survival\': return <SurvivalKitPage />;\n    case \'/top3\': return <Top3VoterPage />;'
);
fs.writeFileSync('src/App.tsx', appContent);

// Update site.ts
let siteContent = fs.readFileSync('src/data/site.ts', 'utf8');
siteContent = siteContent.replace(
  '{ label: \'Route Planner\', bn: \'??? ?????\', to: \'/planner\' },',
  '{ label: \'Route Planner\', bn: \'??? ?????\', to: \'/planner\' },\n  { label: \'Top 3 Voter\', bn: \'????? ?\', to: \'/top3\' },'
);
fs.writeFileSync('src/data/site.ts', siteContent);

console.log("Linked Top3VoterPage in App and Site");
