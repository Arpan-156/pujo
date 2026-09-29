const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
const regex = /export function CrowdEstimatorPage\(\) \{[\s\S]*?(?=export function)/;
if (code.match(regex)) {
    code = code.replace(regex, '');
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Removed CrowdEstimatorPage from Pages.tsx");
} else {
    console.log("Could not find CrowdEstimatorPage using regex.");
}
