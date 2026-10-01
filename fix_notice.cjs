const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const oldLogic = `  useEffect(() => {
    if (sessionStorage.getItem('missing_pandal_closed')) {
      setClosed(true);
    }
  }, []);

  if (closed) return null;

  const handleClose = () => {
    setClosing(true);
    sessionStorage.setItem('missing_pandal_closed', 'true');
    setTimeout(() => setClosed(true), 800);
  };`;

const newLogic = `  if (closed) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setClosed(true), 800);
  };`;

if (code.includes(oldLogic)) {
  code = code.replace(oldLogic, newLogic);
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log("Fixed notice logic!");
} else {
  console.log("Could not find old logic.");
}
