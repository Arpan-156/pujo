const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace the mobile list styling to be a vertical scroll box
code = code.replace(
  /\.pmap-new-list \{[^}]+\}/,
  `.pmap-new-list { 
    height: 450px !important; 
    max-height: 50vh !important; 
    flex-direction: column !important; 
    overflow-y: auto !important; 
    overflow-x: hidden !important; 
    padding-bottom: 10px; 
    padding-right: 12px !important;
    border-top: 1px solid var(--line);
    padding-top: 16px;
  }`
);

// Also remove the .pmap-card-mob CSS that was forcing width
code = code.replace(/\.pmap-new-list > div \{[^}]+\}/, '');
code = code.replace(/\.pmap-card-mob \{[^}]+\}/, '');

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed mobile to vertical scroll box');
