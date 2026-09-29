const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const survivalCode = `
export function SurvivalKitPage() {
  const survivalData = [
    {
      type: "emergency",
      title: "Emergency Helplines",
      icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      items: [
        { name: "Police Control Room", value: "100", secondary: "0342-2664466" },
        { name: "Ambulance / Medical", value: "102", secondary: "Burdwan Medical: 0342-2665228" },
        { name: "Fire Services", value: "101", secondary: "Burdwan Fire: 0342-2557901" },
        { name: "Women's Safety (Sadar)", value: "1091", secondary: "0342-2669597" },
        { name: "Disaster Management", value: "1070", secondary: "Toll Free" }
      ]
    },
    {
      type: "transit",
      title: "Major Transit Hubs",
      icon: "M15 6v12a3 3 0 1 1-6 0V6a3 3 0 1 1 6 0zM3 10v4M21 10v4M9 3h6",
      items: [
        { name: "Nababhat (Alisha) Bus Stand", value: "North Entry", secondary: "Closest: Alamganj, 108 Shiv Mandir" },
        { name: "Tinkonia Bus Stand", value: "Central Hub", secondary: "Closest: Khosbagan, Baranilpur" },
        { name: "Burdwan Railway Station", value: "Train Arrivals", secondary: "Closest: Chhotonilpur, Station Mela" },
        { name: "Curzon Gate Toto Stand", value: "Local Hops", secondary: "Heart of town, connects all zones" },
        { name: "Ullhas / Shaktigarh", value: "South Entry", secondary: "Closest: Sripally, Ichlabad" }
      ]
    },
    {
      type: "guide",
      title: "Lost & Found Guide",
      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      items: [
        { name: "Step 1: Stay Put", value: "Don't wander.", secondary: "Wait exactly where you realized you were separated for 10 minutes." },
        { name: "Step 2: Pandal Desk", value: "Find the mic.", secondary: "Approach the nearest Pandal's 'Help Desk' for a loud speaker announcement." },
        { name: "Step 3: Police Kiosk", value: "Seek uniform.", secondary: "Every mega-pandal has a temporary police camp. Report missing persons immediately." },
        { name: "Pro Tip for Kids", value: "Pocket chits.", secondary: "Put a slip of paper with your phone number in your child's pocket before leaving home." }
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <style>{\`
        .surv-bg-glow {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 50% -20%, rgba(122, 18, 32, 0.4) 0%, transparent 70%),
                        radial-gradient(circle at 100% 100%, rgba(233, 181, 88, 0.1) 0%, transparent 50%);
            z-index: -1;
            pointer-events: none;
        }

        .surv-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(233, 181, 88, 0.15);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            transition: transform 0.3s ease, border-color 0.3s ease;
            padding: 24px;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .surv-card:hover {
            border-color: rgba(233, 181, 88, 0.4);
            transform: translateY(-2px);
        }

        .surv-gold-text {
            background: linear-gradient(135deg, #e9b558, #ffde82);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .surv-print-btn {
            background: linear-gradient(135deg, #e9b558, #d49a3a);
            color: #0f0506;
            box-shadow: 0 10px 25px rgba(233, 181, 88, 0.4);
            position: fixed;
            bottom: 32px;
            right: 32px;
            z-index: 50;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            border-radius: 50px;
            font-weight: bold;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: transform 0.2s;
            cursor: pointer;
            border: none;
        }
        .surv-print-btn:hover { transform: scale(1.05); }

        @media print {
            @page { size: A4; margin: 1.2cm; }
            body { background: #ffffff !important; color: #000000 !important; font-size: 10pt; }
            .global-branding, nav, footer, .surv-bg-glow, .surv-print-btn, .skip { display: none !important; }
            * {
                background: transparent !important;
                color: #000000 !important;
                box-shadow: none !important;
                text-shadow: none !important;
                -webkit-text-fill-color: #000000 !important;
                -webkit-background-clip: border-box !important;
            }
            .page { padding: 0 !important; margin: 0 !important; }
            .surv-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px !important; }
            .surv-header h1 { font-size: 24pt !important; margin-bottom: 5px !important; }
            .surv-header p { font-size: 12pt !important; }
            .surv-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; align-items: start; }
            .surv-card {
                border: 1px solid #999 !important; padding: 12px !important; border-radius: 4px !important;
                break-inside: avoid; page-break-inside: avoid; margin-bottom: 10px !important; height: auto !important;
            }
            .surv-card h2 { font-size: 14pt !important; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px !important; }
            svg { stroke: #000 !important; width: 14px !important; height: 14px !important; }
            a { text-decoration: none !important; }
        }
      \`}</style>

      <div className="surv-bg-glow" />

      <header className="surv-header" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="no-print" style={{ display: 'inline-block', padding: '4px 16px', border: '1px solid rgba(233,181,88,0.3)', borderRadius: '50px', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'rgba(233,181,88,0.1)', marginBottom: '24px' }}>Burdwan Edition 2026</span>
        <h1 className="surv-gold-text" style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', margin: '0 0 16px', lineHeight: 1.1 }}>Durga Puja Survival Kit</h1>
        <p style={{ color: 'var(--mute)', fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Your essential offline cheat sheet for emergency contacts, transit hubs, and survival guides during the festival.</p>
      </header>

      <button onClick={() => window.print()} className="surv-print-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        Save PDF / Print
      </button>

      <div className="surv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {survivalData.map((section, idx) => (
          <div key={idx} className="surv-card" style={section.type === 'guide' ? { gridColumn: '1 / -1' } : {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(233,181,88,0.1)', color: 'var(--gold)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d={section.icon}/>
                </svg>
              </div>
              <h2 className="surv-gold-text" style={{ fontFamily: 'var(--f-display)', fontSize: '1.5rem', margin: 0 }}>{section.title}</h2>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
              {section.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>{item.name}</span>
                    {section.type === 'emergency' ? (
                      <a href={\`tel:\${item.value}\`} style={{ color: 'var(--gold)', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'var(--f-display)', whiteSpace: 'nowrap', textDecoration: 'none' }}>{item.value}</a>
                    ) : (
                      <span style={{ color: 'var(--gold)', fontSize: '1.125rem', fontWeight: 'bold', fontFamily: 'var(--f-display)', whiteSpace: 'nowrap' }}>{item.value}</span>
                    )}
                  </div>
                  <div style={{ color: 'var(--mute)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.secondary}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

if (!code.includes('export function SurvivalKitPage')) {
    code += '\n' + survivalCode;
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
}
