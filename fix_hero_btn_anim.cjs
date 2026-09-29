const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Replace button CSS
const cssRegex = /\.btn\.elegant-primary \{[\s\S]*?\.btn\.elegant-glass:hover \{[\s\S]*?\}/;

const newButtonCss = `
        .btn.elegant-primary { 
            position: relative; overflow: hidden;
            background: #fff; color: #000; border: 1px solid #fff; 
            padding: 16px 44px; font-size: 0.85rem; font-family: 'Inter', system-ui, sans-serif;
            font-weight: 500; text-transform: uppercase; letter-spacing: 3px; border-radius: 100px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            animation: soft-breathe 4s ease-in-out infinite alternate;
        }
        
        @keyframes soft-breathe {
            0% { box-shadow: 0 10px 30px rgba(255,255,255,0.05); transform: scale(1); }
            100% { box-shadow: 0 15px 40px rgba(255,255,255,0.15); transform: scale(1.02); }
        }

        .btn.elegant-primary::before, .btn.elegant-glass::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
            transform: skewX(-20deg); transition: all 0.6s ease; z-index: 1;
        }
        .btn.elegant-primary:hover::before, .btn.elegant-glass:hover::before { left: 150%; }

        .btn.elegant-primary span.arrow, .btn.elegant-glass span.arrow {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: inline-block;
        }

        .btn.elegant-primary:hover { 
            background: #e9b558; border-color: #e9b558; color: #000; 
            box-shadow: 0 15px 40px rgba(233, 181, 88, 0.4); 
            animation-play-state: paused;
        }
        .btn.elegant-primary:hover span.arrow, .btn.elegant-glass:hover span.arrow {
            transform: translateX(6px);
        }

        .btn.elegant-glass { 
            position: relative; overflow: hidden;
            background: rgba(255,255,255,0.03); backdrop-filter: blur(15px); 
            border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.9); 
            padding: 16px 44px; font-size: 0.85rem; font-family: 'Inter', system-ui, sans-serif;
            font-weight: 500; text-transform: uppercase; letter-spacing: 3px; border-radius: 100px;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn.elegant-glass:hover { 
            background: rgba(255,255,255,0.1); border-color: #fff; color: #fff; 
            transform: translateY(-3px);
        }
`;

code = code.replace(cssRegex, newButtonCss.trim());

// Replace button HTML
code = code.replace(
  '<Link to="/pujas" className="btn elegant-primary" data-cursor="Explore">Explore Puja</Link>',
  '<Link to="/pujas" className="btn elegant-primary" data-cursor="Explore">Explore Puja <span className="arrow">?</span></Link>'
);
code = code.replace(
  '<Link to="/featured" className="btn elegant-glass" data-cursor="Open">Featured Pandals</Link>',
  '<Link to="/featured" className="btn elegant-glass" data-cursor="Open">Featured Pandals <span className="arrow">?</span></Link>'
);
code = code.replace(
  '<Link to="/map" className="btn elegant-glass" data-cursor="Open">Pandal Map</Link>',
  '<Link to="/map" className="btn elegant-glass" data-cursor="Open">Pandal Map <span className="arrow">?</span></Link>'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Applied button animations");
