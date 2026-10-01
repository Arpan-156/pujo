const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

const newCSS = `
/* ---------- footer contact ---------- */
.footer-contact { margin-top: 10px; perspective: 1000px; }
.fc-btn {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: rgba(233, 181, 88, 0.05);
  border: 1px solid rgba(233, 181, 88, 0.2);
  padding: 12px 20px;
  border-radius: 16px;
  text-decoration: none;
  color: var(--shankha);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
.fc-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(233, 181, 88, 0) 0%, rgba(233, 181, 88, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.fc-btn:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(233, 181, 88, 0.6);
  box-shadow: 0 12px 24px rgba(233, 181, 88, 0.15), 0 0 0 2px rgba(233, 181, 88, 0.1);
}
.fc-btn:hover::before {
  opacity: 1;
}
.fc-icon {
  background: rgba(233, 181, 88, 0.1);
  color: var(--gold);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.fc-btn:hover .fc-icon {
  background: var(--gold);
  color: var(--ink);
  transform: rotate(10deg) scale(1.1);
}
.fc-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.fc-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gold-2);
  font-weight: 700;
  opacity: 0.8;
  transition: all 0.3s ease;
}
.fc-btn:hover .fc-label {
  opacity: 1;
  color: var(--gold);
}
.fc-email {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

`;

if (!css.includes('.footer-contact')) {
  css = css + newCSS;
  fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
  console.log('CSS added');
} else {
  console.log('CSS already exists');
}
