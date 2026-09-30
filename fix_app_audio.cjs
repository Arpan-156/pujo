const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("import { engine } from './audio/engine';")) {
  code = code.replace(
    "import { DataProvider } from './data/store';",
    "import { DataProvider } from './data/store';\nimport { engine } from './audio/engine';"
  );
}

const unlockCode = `
    useEffect(() => {
      const unlockAudio = () => {
        engine.unlock();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    }, []);
`;

code = code.replace(
  "const { label, pathname } = useRouter();",
  "const { label, pathname } = useRouter();\n" + unlockCode
);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log("Added global audio unlocker to App.tsx");
