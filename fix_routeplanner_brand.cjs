const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const targetStr = `                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
`;

const newStr = `                  );
                })}
              </div>
              
              <div className="print-only" style={{ display: 'none', textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ccc', fontSize: '10pt', fontWeight: 'bold' }}>PHOTOGRAPHY & DESIGN BY BURDWAN CAPTURERS OFFICIAL & BANGLAR PUJO OFFICIAL</div>

            </div>
          )}
        </div>
      </div>
    );
  }
`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, newStr);
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
}
