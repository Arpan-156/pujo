const fs = require('fs');

let code = fs.readFileSync('src/data/site.ts', 'utf8');

const navReplacement = `export const NAV = [
  { label: 'Home', bn: '???', to: '/' },
  { label: 'Pandals & Themes', bn: '????? ? ???', to: '/pujas' },
  // { label: 'Themes', bn: '????', to: '/themes' },
  { label: 'Featured Pandals', bn: '???? ?????', to: '/featured' },
  { label: 'Explore Bardhaman', bn: '??????? ?????', to: '/bardhaman' },
  { label: 'Gallery', bn: '????????', to: '/gallery' },
      { label: 'Route Planner', bn: '??? ?????????', to: '/planner' },
  { label: 'Top 3 Voter', bn: '???? ? ????????', to: '/top3' },
  { label: 'About', bn: '?????? ????????', to: '/about' },
  // { label: 'Contact', bn: '???????', to: '/contact' },
];`;

const stagesReplacement = `export const STAGES: Stage[] = [
  {
    id: 'mahalaya', name: 'Mahalaya', bn: '???????', date: 'Sat 10 Oct', iso: '2026-10-10',
    ritual: 'Tarpan, and the voice on the radio',
  },
  {
    id: 'panchami', name: 'Panchami', bn: '??????', date: 'Fri 16 Oct', iso: '2026-10-16',
    ritual: 'Final touches and early hopping',
  },
  {
    id: 'shashthi', name: 'Shashthi', bn: '?????', date: 'Sat 17 Oct', iso: '2026-10-17',
    ritual: 'Bodhon: the face is unveiled',
  },
  {
    id: 'saptami', name: 'Saptami', bn: '??????', date: 'Sun 18 Oct', iso: '2026-10-18',
    ritual: 'Nabapatrika snan',
  },
  {
    id: 'ashtami', name: 'Ashtami', bn: '??????', date: 'Mon 19 Oct', iso: '2026-10-19',
    ritual: 'Anjali and Sandhi Puja',
  },
  {
    id: 'navami', name: 'Navami', bn: '????', date: 'Tue 20 Oct', iso: '2026-10-20',
    ritual: 'Maha aarti and dhunuchi naach',
  },
  {
    id: 'dashami', name: 'Dashami', bn: '????', date: 'Wed 21 Oct', iso: '2026-10-21',
    ritual: 'Sindoor khela and Bishorjon',
  }
];`;

code = code.replace(/export const NAV = \[[\s\S]*?\];/, navReplacement);
code = code.replace(/export const STAGES: Stage\[\] = \[[\s\S]*?\];/, stagesReplacement);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Fixed Bengali encoding in site.ts!");
