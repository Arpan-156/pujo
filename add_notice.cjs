const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// 1. Update Icons import
code = code.replace(
  "import { ArrowLeft, ArrowRight, Mail, Pin, Search, X } from '../components/Icons';",
  "import { ArrowLeft, ArrowRight, Mail, Pin, Search, X, Instagram, Facebook } from '../components/Icons';"
);

// 2. Add MissingPandalNotice component before PujasPage
const noticeComponent = `
function MissingPandalNotice() {
  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('missing_pandal_closed')) {
      setClosed(true);
    }
  }, []);

  if (closed) return null;

  const handleClose = () => {
    setClosing(true);
    sessionStorage.setItem('missing_pandal_closed', 'true');
    setTimeout(() => setClosed(true), 800);
  };

  return (
    <div className={\`fn-wrap \${closing ? 'closing' : ''}\`}>
      <style>{\`
        .fn-wrap {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          background: rgba(15, 5, 6, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(233, 181, 88, 0.3);
          border-left: 4px solid var(--gold);
          border-radius: 16px;
          padding: 24px;
          width: calc(100% - 40px);
          max-width: 380px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(233,181,88,0.15);
          animation: notice-slide-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: bottom center;
        }
        
        .fn-wrap.closing {
          animation: notice-fly-away 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
        }

        @keyframes notice-slide-up {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes notice-fly-away {
          0% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; filter: blur(0px) drop-shadow(0 0 0px var(--gold)); }
          20% { transform: scale(1.05) translateY(10px) rotate(-2deg); filter: blur(0px) drop-shadow(0 0 20px var(--gold)); }
          100% { transform: scale(0.3) translateY(-300px) rotate(15deg); opacity: 0; filter: blur(8px) drop-shadow(0 0 50px var(--gold)); }
        }

        .fn-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: var(--mute);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .fn-close:hover {
          background: var(--maroon);
          color: var(--shankha);
          transform: rotate(90deg);
        }

        .fn-content {
          display: flex;
          gap: 16px;
        }
        .fn-icon {
          font-size: 2rem;
          line-height: 1;
          filter: drop-shadow(0 0 10px rgba(233,181,88,0.5));
          animation: float-icon 3s ease-in-out infinite;
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .fn-text h4 {
          margin: 0 0 8px 0;
          color: var(--gold);
          font-family: var(--f-display);
          font-size: 1.4rem;
          line-height: 1.1;
        }
        .fn-text p {
          margin: 0;
          color: var(--shankha);
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
        }
        .fn-socials {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .fn-social-btn {
          background: rgba(233,181,88,0.1);
          border: 1px solid rgba(233,181,88,0.3);
          color: var(--gold);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .fn-social-btn:hover {
          background: var(--gold);
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(233,181,88,0.4);
        }
      \`}</style>

      <button className="fn-close" onClick={handleClose} aria-label="Close notification"><X size={14} /></button>
      
      <div className="fn-content">
        <div className="fn-icon">?</div>
        <div className="fn-text">
          <h4>Missing a Pandal?</h4>
          <p>If you don't see your favorite pandal in this list, let us know!</p>
          <div className="fn-socials">
            <a href="https://www.instagram.com/burdwan_capturers/?hl=en" target="_blank" rel="noreferrer" className="fn-social-btn">
              <Instagram size={14} /> Instagram
            </a>
            <a href="https://www.facebook.com/burdwancapturer/" target="_blank" rel="noreferrer" className="fn-social-btn">
              <Facebook size={14} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const insertIndex = code.indexOf('export function PujasPage() {');
code = code.substring(0, insertIndex) + noticeComponent + '\n' + code.substring(insertIndex);

// 3. Inject it inside PujasPage return
// We will put it right before the </section> closes, or outside <section> but inside <>
code = code.replace(
  '        </section>\n      </>',
  '        </section>\n        <MissingPandalNotice />\n      </>'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Floating notice added!");
