const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/const finalTimeDesc = `Total Tour Duration: ~\$\{timeStr\} \(includes \$\{travelMins\}m travel time and \$\{viewMins\}m viewing time\)`(;)/, "const finalTimeDesc = `Total Time: ~${timeStr} (Travel: ${travelMins}m by ${transStr} | Viewing Pandals: ${viewMins}m)`$1");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed time estimate string again');
