const fs = require('fs');
const code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const startIdx = code.indexOf('export function RoutePlannerPage() {');
const endIdx = code.indexOf('export function SurvivalKitPage() {');

if (startIdx !== -1 && endIdx !== -1) {
  const rpCode = code.substring(startIdx, endIdx);
  fs.writeFileSync('rp_code.txt', rpCode, 'utf8');
  console.log("Extracted!");
} else {
  console.log("Failed to find boundaries");
}
