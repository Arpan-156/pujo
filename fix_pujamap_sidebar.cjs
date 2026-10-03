const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// 1. Add Search State and Input
code = code.replace(/const \[sel, setSel\] = useState<string \| null>\(null\);/, "const [sel, setSel] = useState<string | null>(null);\n  const [search, setSearch] = useState('');");

// Filter sortedPujas based on search
const regexSortedPujas = /const activePuja = sortedPujas\.find\(p => p\.slug === sel\);/
code = code.replace(regexSortedPujas, `const filteredPujas = sortedPujas.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.area.toLowerCase().includes(search.toLowerCase()));\n  const activePuja = sortedPujas.find(p => p.slug === sel);`);

// 2. Change Get Directions to <a> tag and style it beautifully
const getDirRegex = /<button[\s\S]*?onClick=\{\(e\) => \{ e\.stopPropagation\(\); handleDirections\(p\.map!\.lat!, p\.map!\.lng!\); \}\}[\s\S]*?>[\s\S]*?Get Directions[\s\S]*?<\/button>/;

const newGetDir = `<a 
                      href={(geo.lat && geo.lng) ? \`https://www.google.com/maps/dir/?api=1&origin=\${geo.lat},\${geo.lng}&destination=\${p.map!.lat},\${p.map!.lng}\` : \`https://www.google.com/maps/dir/?api=1&destination=\${p.map!.lat},\${p.map!.lng}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ background: 'var(--gold)', color: '#1a0b0c', padding: '8px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3)' }}
                    >
                      Get Directions
                    </a>`;

code = code.replace(getDirRegex, newGetDir);

// 3. Add search input UI to the sidebar
const sidebarTitleRegex = /<h3 style=\{\{ fontSize: '1\.2rem', color: '#eab308', margin: '0 0 16px 0' \}\}>Location Services<\/h3>/;

const newSidebarTop = `<h3 style={{ fontSize: '1.2rem', color: '#eab308', margin: '0 0 16px 0' }}>Location Services</h3>`;

// Let's add the search bar right before the sortedPujas mapping
const mapRegex = /\{sortedPujas\.map\(\(p\) => \{/g;
const newMapRender = `
              <div style={{ marginBottom: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Search Pandals..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                />
              </div>
              {filteredPujas.map((p) => {
`;
code = code.replace(mapRegex, newMapRender);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed PujaMap sidebar and search');
