const fs = require('fs');

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(' CrowdEstimatorPage,', '');
appContent = appContent.replace('case \'/crowd\': return <CrowdEstimatorPage />;\n', '');
appContent = appContent.replace('case \'/crowd\': return <CrowdEstimatorPage />;\r\n', '');
fs.writeFileSync('src/App.tsx', appContent);

// site.ts
let siteContent = fs.readFileSync('src/data/site.ts', 'utf8');
const regex = /\{\s*label:\s*'Crowd Estimator',\s*bn:\s*'.*?',\s*to:\s*'\/crowd'\s*\},\s*\n/;
siteContent = siteContent.replace(regex, '');
// if not matched due to formatting, just replace string
siteContent = siteContent.replace(`{ label: 'Crowd Estimator', bn: '????', to: '/crowd' },`, '');
fs.writeFileSync('src/data/site.ts', siteContent);

console.log("Removed Crowd Estimator routing.");
