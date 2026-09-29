const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

const newTap = `<div className={\`loader-tap \${needsTap ? 'in' : ''}\`}>
        <div className="tap-ring-wrap">
          <div className="tap-ring"></div>
          <div className="tap-ring-inner">
             <svg viewBox="0 0 24 24" className="tap-play"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="tap-content">
          <h2 className="tap-main">Enter the Puja</h2>
          <p className="tap-sub">Immersive audio experience recommended</p>
        </div>
        <button className="tap-skip" onClick={(e) => { e.stopPropagation(); enter(false); }}>
          Enter quietly
        </button>
      </div>`;

code = code.replace(/<div className=\{\`loader-tap \$\{needsTap \? 'in' : ''\}\`\}>[\s\S]*?<\/div>/, newTap);
fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
