const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const finalTimeDesc = `Estimated: ~\$\{timeStr\} by \$\{transStr\} \(\$\{totalDist\.toFixed\(1\)\} km total\)`;/;

const newString = 'const finalTimeDesc = `Total Tour Duration: ~${timeStr} (includes ${travelMins}m travel time and ${viewMins}m viewing time)`;';

code = code.replace(regex, newString);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed time estimate string');
