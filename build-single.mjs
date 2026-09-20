// Bundles the app into one self-contained HTML file (JS + CSS inlined; only Google Fonts load remotely).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const out = await build({
  entryPoints: ['src/main.tsx'], bundle: true, minify: true, write: false, format: 'iife', target: 'es2020',
  jsx: 'automatic', outdir: 'dist', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'none',
});
const js = out.outputFiles.find((f) => f.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
const css = out.outputFiles.find((f) => f.path.endsWith('.css')).text;
const html = readFileSync('index.html', 'utf8')
  .replace('<script type="module" src="/src/main.tsx"></script>', '')
  .replace('</head>', () => `<style>${css}</style>\n</head>`)
  .replace('</body>', () => `<script>${js}</script>\n</body>`);
mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
console.log('built', (html.length / 1024).toFixed(0) + ' KB');
