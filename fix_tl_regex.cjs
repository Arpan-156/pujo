const fs = require('fs');
let tsx = fs.readFileSync('src/sections/Timeline.tsx', 'utf8');

const regex = /export function Timeline\(\) \{[\s\S]*?\}, \[\]\);\n\s*const ref = useRef<HTMLElement>\(null\);\n\s*useScrollVar\(ref\);/m;

// wait, let's just find the start and end of the function body up to the return statement.
tsx = tsx.replace(/export function Timeline\(\) \{[\s\S]*?return \(/m, 
`export function Timeline() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref);
  return (`);

tsx = tsx.replace(/<div className="tl-scroll" ref=\{scrollRef\}[\s\S]*?\}\}>/m, 
`<div className="tl-scroll" tabIndex={0} role="region" aria-label="Festival timeline, scroll sideways" style={{ position: 'relative', zIndex: 2 }}>`);

tsx = tsx.replace(/<div className="tl-line" aria-hidden="true" style=\{\{ left: '30px', right: '30px' \}\}><span \/><\/div>/, 
`<div className="tl-line" aria-hidden="true"><span /></div>`);

fs.writeFileSync('src/sections/Timeline.tsx', tsx, 'utf8');
console.log("Regex replaced timeline.");
