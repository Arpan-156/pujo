const fs = require('fs');
let code = fs.readFileSync('src/components/shared.tsx', 'utf8');

// Remove the inline border and padding
code = code.replace(
  `style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', borderLeft: '1px solid rgba(233,181,88,0.1)', paddingLeft: '40px' }}`,
  `className="fg-col footer-eggs"`
);

// Remove the inline flex stuff too, just rely on the CSS class
code = code.replace(
  `<div className="fg-col footer-eggs" className="fg-col footer-eggs">`,
  `<div className="fg-col footer-eggs">`
);

fs.writeFileSync('src/components/shared.tsx', code, 'utf8');

// Now update chrome.css
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

// Let's redefine footer-grid for the 4 column layout nicely
css = css.replace(
  '.footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1.2fr 1fr; gap: 40px; align-items: start; }',
  '.footer-grid { display: grid; grid-template-columns: 1fr 1fr 1.2fr 1fr; gap: 40px; align-items: start; }'
);

css = css.replace(
  '.footer-eggs { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }',
  '.footer-eggs { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; border-left: 1px solid rgba(233,181,88,0.1); padding-left: 40px; }'
);

// Fix it on mobile
css = css.replace(
  '@media (max-width: 820px) {\n  .footer-grid { grid-template-columns: 1fr; }',
  '@media (max-width: 820px) {\n  .footer-grid { grid-template-columns: 1fr; gap: 32px; }\n  .footer-eggs { border-left: none; padding-left: 0; align-items: flex-start; }'
);

fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
console.log('Fixed footer mobile responsiveness');
