const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The replacement was `<section className="wrap" style={{ padding: '60px 0' }}>...`
// I need to replace that entire section with the original `map-head` and `<PujaMap isHome />`
const newCode = `      <div className="wrap map-head">
        <RevealText lines={['PUJA MAP']} className="display" />
        <Reveal delay={150}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px' }}>
            <p className="lead" style={{ margin: 0, maxWidth: '40ch' }}>
              Glowing pin to see the exact location of the Pandals - Click on the " Get Directions " button to get the exact directions from where you are.
            </p>
            <Btn to="/map" cursor="Open">Open the full map</Btn>
          </div>
        </Reveal>
      </div>
      <PujaMap isHome />`;

code = code.replace(/\{\/\* Sleek Nearby Pandals Widget for Home Page \*\/\}[\s\S]*?<\/section>/, newCode);

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Reverted Home.tsx');
