const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Replace corrupted "?? " with <Pin size={12} style={{ marginRight: '4px' }} />
code = code.replace(
  /\?\? \{distStr\}/g,
  '<Pin size={12} style={{ marginRight: "4px" }} /> {distStr}'
);

// Replace "Get Directions ?" with "Get Directions"
code = code.replace(
  /Get Directions \?/g,
  'Get Directions'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed encoding ? marks');
