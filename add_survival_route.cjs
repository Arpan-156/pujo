const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update import
if (!code.includes('SurvivalKitPage')) {
    code = code.replace(
        `RoutePlannerPage } from './pages/Pages';`,
        `RoutePlannerPage, SurvivalKitPage } from './pages/Pages';`
    );
}

// Add route
if (!code.includes("case '/survival'")) {
    code = code.replace(
        `case '/planner': return <RoutePlannerPage />;`,
        `case '/planner': return <RoutePlannerPage />;\n    case '/survival': return <SurvivalKitPage />;`
    );
}

fs.writeFileSync('src/App.tsx', code, 'utf8');
