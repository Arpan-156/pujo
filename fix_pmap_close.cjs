const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// The end of PujaMap is:
//                   </ul>
//                 </div>
//             </div>
//           </div>
//             )}
//       </section>
//     </>
//   );
// }

code = code.replace(
  /<\/ul>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/section>/,
  "</ul>\n                  </div>\n                </>)}\n            </div>\n          </div>\n      </section>"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed closing tags for !isHome');
