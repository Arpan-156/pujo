const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

if (!c.includes('import { createPortal }')) {
  c = c.replace("import { Children,", "import { createPortal } from 'react-dom';\nimport { Children,");
}

c = c.replace('export function Footer() { const [showCopyright, setShowCopyright] = useState(false);', 
  'export function Footer() { const [showCopyright, setShowCopyright] = useState(false);');

// Replace the return block to add KashField and wrap modal in createPortal
c = c.replace(
`  return (
    <>
      
      <footer className="footer">`,
`  return (
    <>
      {pathname === '/' && <KashField />}
      <footer className="footer">`
);

// Find the modal block
const modalStart = `{showCopyright && (`
const modalEnd = `)}
      </div>
    </footer>
    </>
  );`
  
const portalModalStart = `{showCopyright && typeof document !== 'undefined' && createPortal((`
const portalModalEnd = `), document.body)}
      </div>
    </footer>
    </>
  );`

c = c.replace(modalStart, portalModalStart);
c = c.replace(modalEnd, portalModalEnd);

fs.writeFileSync('src/components/shared.tsx', c);

