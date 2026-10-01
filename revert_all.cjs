const fs = require('fs');

// 1. Revert BrandMark in fx.tsx
let fx = fs.readFileSync('src/components/fx.tsx', 'utf8');
const brandMarkRegex = /export function BrandMark\(\{ brand, size = 44, className = '' \}: \{ brand: 'capturers' \| 'pujo'; size\?: number; className\?: string \}\) \{[\s\S]*?return <img src=\{src\}/;
const oldBrandMark = `export function BrandMark({ brand, size = 44, className = '' }: { brand: 'capturers' | 'pujo'; size?: number; className?: string }) {
  const src = brand === 'capturers' ? '/logos/capturers.jpg' : '/logos/pujo.jpg';
  return <img src={src}`;
fx = fx.replace(brandMarkRegex, oldBrandMark);
fs.writeFileSync('src/components/fx.tsx', fx, 'utf8');
console.log('Reverted fx.tsx');

// 2. Revert YouTube in shared.tsx
let shared = fs.readFileSync('src/components/shared.tsx', 'utf8');
if (!shared.includes("'youtube'")) {
  shared = shared.replace(
    /\{ key: 'facebook', label: 'Facebook', Icon: Facebook \},?/,
    `{ key: 'facebook', label: 'Facebook', Icon: Facebook },\n  { key: 'youtube', label: 'YouTube', Icon: Youtube },`
  );
  fs.writeFileSync('src/components/shared.tsx', shared, 'utf8');
  console.log('Reverted shared.tsx');
}

// 2b. Revert About.tsx
let about = fs.readFileSync('src/sections/About.tsx', 'utf8');
if (!about.includes("key === 'youtube'")) {
  about = about.replace(
    /\{SOCIALS\.map\(\(\{ key, label, Icon \}, i\) => \{\n\s*return \(/,
    `{SOCIALS.map(({ key, label, Icon }, i) => {\n                if (b === 'pujo' && key === 'youtube') return null; // Hidden for now\n                return (`
  );
  fs.writeFileSync('src/sections/About.tsx', about, 'utf8');
  console.log('Reverted About.tsx');
}

// 3. Revert chrome.css
let chrome = fs.readFileSync('src/styles/chrome.css', 'utf8');
chrome = chrome.replace(
  'align-items: start; position: relative; z-index: 999;',
  'align-items: start;'
);
chrome = chrome.replace(
  'rgba(233, 181, 88, 0.8)',
  'rgba(233, 181, 88, 0.4)'
);
fs.writeFileSync('src/styles/chrome.css', chrome, 'utf8');
console.log('Reverted chrome.css');
