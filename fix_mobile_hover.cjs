const fs = require('fs');
let css = fs.readFileSync('src/styles/sections.css', 'utf8');

// Find all .pcard:hover rules and wrap them
const hoverRules = [
  '.pcard:hover .pcard-img > .photo { transform: scale(1.07); }',
  '.pcard:hover .pcard-body { transform: scale(1.05) rotateY(calc((var(--px, 0.5) - 0.5) * 24deg)) rotateX(calc((var(--py, 0.5) - 0.5) * -24deg)); z-index: 10; }',
  '.pcard:hover .pcard-cats { transform: translateZ(20px); }',
  '.pcard:hover .pcard-title-text { color: transparent; -webkit-text-stroke: 1px var(--gold-2); transform: translateZ(40px); }',
  '.pcard:hover .pcard-title-glow { opacity: 0.6; transform: translateZ(20px); }',
  '.pcard:hover .pcard-loc { transform: translateZ(15px); color: var(--shankha); }',
  '.pcard:hover .pcard-theme { transform: translateZ(10px); }'
];

hoverRules.forEach(rule => {
  if (css.includes(rule)) {
    css = css.replace(rule, `@media (hover: hover) and (pointer: fine) {\n  ${rule}\n}`);
  } else {
    console.log("Could not find:", rule);
  }
});

fs.writeFileSync('src/styles/sections.css', css, 'utf8');
console.log("Hover effects restricted to PC");
