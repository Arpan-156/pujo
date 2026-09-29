const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /\/\*\* Small single-pin map for the detail page\. \*\/[\s\S]*?\}\)/;

const newMiniMap = `/** Small single-pin map for the detail page. */
export function MiniMap({ x, y, name, lat, lng }: { x: number; y: number; name: string; lat?: number; lng?: number }) {
  // Determine the map query based on exact lat/lng if available, otherwise name + location
  const mapQuery = lat && lng ? \`\${lat},\${lng}\` : encodeURIComponent(\`\${name} Durga Puja, Bardhaman\`);

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        loading="lazy" 
        allowFullScreen 
        referrerPolicy="no-referrer-when-downgrade" 
        src={\`https://maps.google.com/maps?q=\${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed\`}
      ></iframe>
    </div>
  );
}`;

if (code.match(regex)) {
    code = code.replace(regex, newMiniMap);
    fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
    console.log("MiniMap updated to Google Maps iframe.");
} else {
    console.log("Regex didn't match.");
}
