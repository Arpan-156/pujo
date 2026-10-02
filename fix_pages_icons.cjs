const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// The icons
const ICONS = {
  quick: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  standard: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  marathon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h3l3-9 5 18 3-9h6"/></svg>',
  
  art: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', // Palette
  carnival: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>', // Ticket
  accessible: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>', // Traditional / Temple
  
  walk: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14 21l-3-6-3 6"/><path d="M11 15v-5l2-3-2 3H8l3-3"/><path d="M18 10l-4-1-1 4"/></svg>',
  toto: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  car: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5.3a2 2 0 0 0-1.6.8L1 11l-.16.84A1 1 0 0 0 0 12.85V16h3m11 0a2 2 0 1 0-4 0m-11 0a2 2 0 1 0-4 0"/></svg>'
};

// Replace literal '??' in the icon fields
code = code.replace(
  "{ id: 'quick', title: 'Quick Sprint', desc: '~2 Hours / 5 Pandals', icon: '??' }",
  `{ id: 'quick', title: 'Quick Sprint', desc: '~2 Hours / 5 Pandals', icon: '${ICONS.quick}' }`
);
code = code.replace(
  "{ id: 'standard', title: 'Standard', desc: '~4 Hours / 8 Pandals', icon: '??' }",
  `{ id: 'standard', title: 'Standard', desc: '~4 Hours / 8 Pandals', icon: '${ICONS.standard}' }`
);
code = code.replace(
  "{ id: 'marathon', title: 'Marathon', desc: 'All Night / 12 Pandals', icon: '??' }",
  `{ id: 'marathon', title: 'Marathon', desc: 'All Night / 12 Pandals', icon: '${ICONS.marathon}' }`
);

code = code.replace(
  "{ id: 'art', title: 'Theme & Art', desc: 'Award-winning installations', icon: '??' }",
  `{ id: 'art', title: 'Theme & Art', desc: 'Award-winning installations', icon: '${ICONS.art}' }`
);
code = code.replace(
  "{ id: 'carnival', title: 'Mela & Carnival', desc: 'Big crowds, food, fun', icon: '??' }",
  `{ id: 'carnival', title: 'Mela & Carnival', desc: 'Big crowds, food, fun', icon: '${ICONS.carnival}' }`
);
code = code.replace(
  "{ id: 'accessible', title: 'Traditional', desc: 'Classic, authentic vibes', icon: '??' }",
  `{ id: 'accessible', title: 'Traditional', desc: 'Classic, authentic vibes', icon: '${ICONS.accessible}' }`
);

code = code.replace(
  "{ id: 'walk', title: 'Walking', desc: 'Best for tight lanes', icon: '??' }",
  `{ id: 'walk', title: 'Walking', desc: 'Best for tight lanes', icon: '${ICONS.walk}' }`
);
code = code.replace(
  "{ id: 'toto', title: 'Toto / E-Rickshaw', desc: 'The Burdwan way', icon: '??' }",
  `{ id: 'toto', title: 'Toto / E-Rickshaw', desc: 'The Burdwan way', icon: '${ICONS.toto}' }`
);
code = code.replace(
  "{ id: 'car', title: 'Car / Bike', desc: 'Prepare for parking', icon: '??' }",
  `{ id: 'car', title: 'Car / Bike', desc: 'Prepare for parking', icon: '${ICONS.car}' }`
);

// Fix the render to use dangerouslySetInnerHTML
code = code.replace(
  '<span style={{ fontSize: \'2rem\' }}>{f.icon}</span>',
  '<span style={{ fontSize: \'2rem\', width: \'32px\', height: \'32px\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }} dangerouslySetInnerHTML={{ __html: f.icon }}></span>'
);

// Also remove `??` in route result text
code = code.replace(
  '?? {route.timeDesc}',
  '{route.timeDesc}'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed Icons in Pages.tsx');
