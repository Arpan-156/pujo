const fs = require('fs');

let site = fs.readFileSync('src/data/site.ts', 'utf8');
const faqNavItem = "{ label: 'FAQ', bn: '\\u09B8\\u09BE\\u09A7\\u09BE\\u09B0\\u09A3 \\u09AA\\u09CD\\u09B0\\u09B6\\u09CD\\u09A8', to: '/faq' }";
// insert it before About
site = site.replace(
  "{ label: 'About', bn: '\\u0986\\u09AE\\u09BE\\u09A6\\u09C7\\u09B0 \\u0995\\u09A5\\u09BE', to: '/about' },",
  faqNavItem + ",\n  { label: 'About', bn: '\\u0986\\u09AE\\u09BE\\u09A6\\u09C7\\u09B0 \\u0995\\u09A5\\u09BE', to: '/about' },"
);
// fallback in case the bn text differs
if (!site.includes("label: 'FAQ'")) {
  site = site.replace(
    "{ label: 'About', bn: '+r_', to: '/about' },",
    "{ label: 'FAQ', bn: '\\u09AA\\u09CD\\u09B0\\u09B6\\u09CD\\u09A8\\u09CB\\u09A4\\u09CD\\u09A4\\u09B0', to: '/faq' },\n  { label: 'About', bn: '+r_', to: '/about' },"
  );
}
fs.writeFileSync('src/data/site.ts', site, 'utf8');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  'import { AboutPage, BardhamanPage, ContactPage, FeaturedPage, GalleryPage, MapPage, PujaDetail, PujasPage, ThemesPage, TimelinePage, RoutePlannerPage, SurvivalKitPage, Top3VoterPage } from \'./pages/Pages\';',
  'import { AboutPage, BardhamanPage, ContactPage, FeaturedPage, GalleryPage, MapPage, PujaDetail, PujasPage, ThemesPage, TimelinePage, RoutePlannerPage, SurvivalKitPage, Top3VoterPage, FaqPage } from \'./pages/Pages\';'
);
app = app.replace(
  'case \'/top3\': return <Top3VoterPage />;',
  'case \'/top3\': return <Top3VoterPage />;\n    case \'/faq\': return <FaqPage />;'
);
fs.writeFileSync('src/App.tsx', app, 'utf8');

let seo = fs.readFileSync('src/components/SEO.tsx', 'utf8');
seo = seo.replace(
  'case \'/survival\':',
  'case \'/faq\':\n        title = \'Burdwan Puja FAQ | Frequently Asked Questions\';\n        description = \'Find answers to frequently asked questions about Burdwan Durga Puja, pandal locations, routing, and voting.\';\n        break;\n      case \'/survival\':'
);
fs.writeFileSync('src/components/SEO.tsx', seo, 'utf8');

console.log('Updated App.tsx, site.ts, SEO.tsx for FAQ');
