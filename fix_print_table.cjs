const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /<FlipGrid className="plist">/;

const newCode = `
            {/* PRINT ONLY BCO TABLE */}
            <div className="print-only bco-print-wrapper">
              <div className="bco-header">
                <h2>BCO - Burdwan City Online</h2>
                <p>Durga Puja 2026 - Official Pandals & Themes Directory</p>
              </div>
              <table className="bco-table">
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>Address</th>
                    <th>Theme</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p.slug}>
                      <td><strong>{p.name}</strong>{p.featured ? ' (Featured)' : ''}</td>
                      <td>{p.location}</td>
                      <td>{p.theme || 'Traditional'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <FlipGrid className="plist">
`;

code = code.replace(target, newCode);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Added print table.");
