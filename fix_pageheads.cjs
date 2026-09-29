const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  "visual={{ art: 'mythology', seed: 61, hue: 8, tone: 'night' }}",
  "visual={{ src: 'https://images.unsplash.com/photo-1596700685934-e408ec2d88c2?auto=format&fit=crop&q=80&w=1200', art: 'mythology', seed: 61, hue: 8, tone: 'night' }}"
);
code = code.replace(
  "visual={{ art: 'street', seed: 65, hue: 24, tone: 'night' }}",
  "visual={{ src: 'https://images.unsplash.com/photo-1533227260814-1e0bb50d60d3?auto=format&fit=crop&q=80&w=1200', art: 'street', seed: 65, hue: 24, tone: 'night' }}"
);
code = code.replace(
  "visual={{ art: 'river', seed: 66, hue: 24, tone: 'dawn' }}",
  "visual={{ src: 'https://images.unsplash.com/photo-1570777196644-84d5dfaf3b4d?auto=format&fit=crop&q=80&w=1200', art: 'river', seed: 66, hue: 24, tone: 'dawn' }}"
);
code = code.replace(
  "visual={{ art: 'dhunuchi', seed: 68, hue: 22, tone: 'night' }}",
  "visual={{ src: 'https://images.unsplash.com/photo-1662890538600-b6ab743eb371?auto=format&fit=crop&q=80&w=1200', art: 'dhunuchi', seed: 68, hue: 22, tone: 'night' }}"
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Updated PageHeads with real images.");
