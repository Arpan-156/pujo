const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const newHelplines = `<ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Police Station</div>
                      <a href="tel:100" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>100</a>
                      <span style={{ color: 'var(--mute)', margin: '0 8px' }}>|</span>
                      <a href="tel:03422662495" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2662495</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Fire Brigade</div>
                      <a href="tel:101" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>101</a>
                      <span style={{ color: 'var(--mute)', margin: '0 8px' }}>|</span>
                      <a href="tel:03422662244" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2662244</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Medical College (BMCH)</div>
                      <a href="tel:03422558641" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2558641</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Women's Helpline & Child Helpline</div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="tel:1091" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>1091</a>
                        <a href="tel:1098" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>1098</a>
                      </div>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Ambulance</div>
                      <a href="tel:102" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>102</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>WBSEDCL Electricity Emergency</div>
                      <a href="tel:19121" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>19121</a>
                    </li>
                  </ul>`;

const regex = /<ul style=\{\{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' \}\}>[\s\S]*?<\/ul>/;

code = code.replace(regex, newHelplines);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added more emergency helplines');
