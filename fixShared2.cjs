const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

c = c.replace(
`        )}
      </div>
    </footer>
    </>`,
`        ), document.body)}
      </div>
    </footer>
    </>`
);

fs.writeFileSync('src/components/shared.tsx', c);

