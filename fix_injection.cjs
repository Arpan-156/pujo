const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Find the end of PujasPage
const target = "export function PujaDetail";
const targetIdx = code.indexOf(target);

if (targetIdx !== -1) {
  // We need to inject <MissingPandalNotice /> right before the `</>` of PujasPage.
  // The structure is:
  //         </section>
  //       </>
  //     );
  //   }
  //
  //   /* ------------------------------------------------------------------ *
  //    *  Single Puja
  //    * ------------------------------------------------------------------ */
  // export function PujaDetail
  
  // So we look backwards from targetIdx for `</>`
  const closingTagIdx = code.lastIndexOf('</>', targetIdx);
  if (closingTagIdx !== -1) {
    code = code.substring(0, closingTagIdx) + '<MissingPandalNotice />\n      ' + code.substring(closingTagIdx);
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Successfully injected <MissingPandalNotice />!");
  } else {
    console.log("Could not find </>");
  }
} else {
  console.log("Could not find PujaDetail");
}
