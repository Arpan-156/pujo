const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

if (!code.includes('function getWalkTimeStr')) {
  code = code.replace(
    /export function PujasPage\(\) \{/,
    `export function getWalkTimeStr(distKm: number) {
  const timeInHours = distKm / 5;
  const hours = Math.floor(timeInHours);
  const mins = Math.round((timeInHours - hours) * 60);
  if (hours > 0) return \`\${hours}h \${mins}m walk\`;
  return \`\${mins} min walk\`;
}

export function PujasPage() {`
  );
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
}
console.log('Added getWalkTimeStr');
