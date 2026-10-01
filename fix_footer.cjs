const fs = require('fs');

let css = fs.readFileSync('src/styles/chrome.css', 'utf8');
css = css.replace('grid-template-columns: 1.2fr 1fr 1fr;', 'grid-template-columns: 1.2fr 1fr 1.2fr 1fr;');
fs.writeFileSync('src/styles/chrome.css', css, 'utf8');

let code = fs.readFileSync('src/components/shared.tsx', 'utf8');
const oldEggs = `<div className="footer-eggs">`;
const newContact = `<div>
              <p className="footer-h">Contact Us</p>
              <div className="footer-contact">
                <a href="mailto:bwncapturers2019@gmail.com" className="fc-btn" data-cursor="Mail">
                  <span className="fc-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <div className="fc-text">
                    <span className="fc-label">Drop us a line</span>
                    <span className="fc-email">bwncapturers2019@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-eggs">`;

if(code.includes(oldEggs)) {
  code = code.replace(oldEggs, newContact);
  fs.writeFileSync('src/components/shared.tsx', code, 'utf8');
  console.log('Injected Contact Us in Footer!');
} else {
  console.log('Failed to find footer-eggs');
}

