import type { Puja, PujaCategory, Theme, FeaturedPandal, ArtKind, Tone, Visual } from './types';

/* ------------------------------------------------------------------ *
 *  THEMES
 * ------------------------------------------------------------------ */
export const THEMES: Theme[] = [
  { id: 'heritage', title: 'Heritage Bengal', bn: 'ঐতিহ্যের বাংলা',
    description: 'Terracotta panels, atchala roofs, zamindari courtyards. Pandals that rebuild the Bengal our grandparents remember.',
    visual: { art: 'temple', seed: 101, tone: 'dusk', hue: 18 } },
  { id: 'mythology', title: 'Mythology', bn: 'পুরাণকথা',
    description: 'The Devi Mahatmya told in light, paper and bamboo. Battle scenes, cosmic oceans, the ten mahavidyas.',
    visual: { art: 'mythology', seed: 102, tone: 'night', hue: 8 } },
  { id: 'contemporary', title: 'Contemporary Art', bn: 'সমকালীন শিল্প',
    description: 'Installations that borrow from galleries: suspended forms, mirrored surfaces, sculpture at street scale.',
    visual: { art: 'abstract', seed: 103, tone: 'night', hue: 330 } },
  { id: 'social', title: 'Social Awareness', bn: 'সমাজভাবনা',
    description: 'Pandals that carry a message: water, women, waste, health, the quiet workers of the city.',
    visual: { art: 'social', seed: 104, tone: 'dusk', hue: 40 } },
  { id: 'architecture', title: 'Architecture', bn: 'স্থাপত্য',
    description: 'Replicas of gates, stations and palaces, built at full size from bamboo, cloth and plywood in three weeks.',
    visual: { art: 'gate', seed: 105, tone: 'dusk', hue: 14 } },
  { id: 'rural', title: 'Rural Bengal', bn: 'গ্রামবাংলা',
    description: 'Mud walls, thatch, palm and paddy. The village as memory, rebuilt inside the town.',
    visual: { art: 'rural', seed: 106, tone: 'dawn', hue: 34 } },
  { id: 'international', title: 'International Concepts', bn: 'বিশ্বভাবনা',
    description: 'Cathedrals, canals and far-off temples reimagined around a Bengali goddess.',
    visual: { art: 'global', seed: 107, tone: 'night', hue: 210 } },
  { id: 'eco', title: 'Eco-friendly', bn: 'পরিবেশবান্ধব',
    description: 'Clay idols, jute, bamboo, dried leaves. Pandals designed to go back to the earth after Dashami.',
    visual: { art: 'eco', seed: 108, tone: 'day', hue: 110 } },
  { id: 'abstract', title: 'Abstract Art', bn: 'বিমূর্ত',
    description: 'Colour and form with no literal story. Stand inside it and decide what you see.',
    visual: { art: 'abstract', seed: 109, tone: 'dusk', hue: 280 } },
];

/* ------------------------------------------------------------------ *
 *  HELPERS
 * ------------------------------------------------------------------ */
const V = (art: ArtKind, seed: number, hue = 12, tone: Tone = 'night'): Visual => ({ art, seed, hue, tone });

const CONCEPT: Record<string, { pandal: string; idol: string; attractions: string[] }> = {
  heritage: { pandal: 'A terracotta-panelled facade with a curved atchala roof and a courtyard entrance.', idol: 'Ekchala idol in classic daker saaj, with a cloth-and-shola crown.', attractions: ['Terracotta panels', 'Courtyard aarti', 'Live dhaki'] },
  mythology: { pandal: 'A walk-through of the battle at Kailash, lit in layers from floor to ceiling.', idol: 'Durga mid-strike, painted in deep indigo and gold.', attractions: ['Lit mural corridor', 'Narrated walk-through', 'Night lighting'] },
  contemporary: { pandal: 'Suspended forms and mirrored panels that change as the crowd moves under them.', idol: 'A sculptural Durga in raw clay tones, without paint.', attractions: ['Suspended installation', 'Mirror maze', 'After-dark light show'] },
  social: { pandal: 'A single message told through hand-built scenes, from entry to exit.', idol: 'Durga as a working woman of the city, with tools instead of weapons.', attractions: ['Story panels', 'Community stage', 'Volunteer guides'] },
  architecture: { pandal: 'A full-scale replica of a landmark, cloth-stretched over a bamboo frame.', idol: 'Idol seated beneath a reproduced archway, in white and gold.', attractions: ['Scale replica', 'Facade lighting', 'Photo stops'] },
  rural: { pandal: 'Mud-plastered walls, thatched roof, a courtyard with clay lamps and a tulsi mancha.', idol: 'Clay-coloured idol in a simple red sari, with a rustic mukut.', attractions: ['Thatch and mud work', 'Folk music evenings', 'Paddy garland'] },
  international: { pandal: 'A cathedral-scale interior lit with stained-glass panels, made in bamboo and cloth.', idol: 'Durga framed by gothic arches, with lion and Mahishasura in pale stone tones.', attractions: ['Stained-glass lighting', 'Fog effects', 'Photo backdrops'] },
  eco: { pandal: 'Bamboo, jute and dried leaves only. Every part is compostable or reusable.', idol: 'Unpainted clay idol dressed in natural dye and cotton.', attractions: ['Zero-plastic rules', 'Seed-paper prasad', 'Compost demonstration'] },
  abstract: { pandal: 'Layers of coloured fabric and light that never form a literal shape.', idol: 'Stylised Durga in three colours, without a face detail.', attractions: ['Colour tunnel', 'Projection walls', 'Ambient soundscape'] },
};

interface Row {
  slug: string; name: string; area: string; town?: boolean; themeId: string; themeName: string;
  cats: PujaCategory[]; est: number; feat?: boolean; art: ArtKind; seed: number; hue: number; tone?: Tone;
  desc: string; x: number; y: number; lat?: number; lng?: number; story?: string;
}

const build = (r: Row): Puja => {
  const c = CONCEPT[r.themeId];
  const gallerySet: ArtKind[] = ['pandal', 'idol', 'crowd', 'street', 'dhak'];
  return {
    slug: r.slug, name: r.name, area: r.area, location: `${r.area}, Bardhaman`,
    zone: r.town === false ? 'Outskirts' : 'Bardhaman Town',
    theme: r.themeName, themeId: r.themeId, categories: r.cats,
    description: r.desc,
    story: r.story ?? `${r.desc} The committee has spent months on the design, with the pandal taking shape in the last three weeks before Shashthi. ${c.pandal} Replace this paragraph with the real story from the organisers.`,
    pandalConcept: c.pandal, idolConcept: c.idol, attractions: c.attractions,
    established: r.est, featured: !!r.feat,
    heroImage: V(r.art, r.seed, r.hue, r.tone ?? 'night'),
    idolImage: V('idol', r.seed + 40, r.hue, 'dusk'),
    gallery: gallerySet.map((k, i) => V(k, r.seed + i * 7, r.hue, i === 4 ? 'dusk' : 'night')),
    map: { x: r.x, y: r.y, lat: r.lat, lng: r.lng },
    sample: true,
  };
};

/* ------------------------------------------------------------------ *
 *  PUJA DIRECTORY
 *  All entries below are SAMPLE listings. Replace them with verified data,
 *  or load the same shape from Firebase / Supabase / a CMS and pass it to
 *  <PujaProvider>. Nothing else in the UI needs to change.
 * ------------------------------------------------------------------ */
const ROWS: Row[] = [
  { slug: 'vivekananda-sevak-sangha', name: 'Vivekananda Sevak Sangha', area: 'Vivekananda Pally', themeId: 'eco', themeName: 'Prakriti O Pran',
    cats: ['Traditional', 'Community Puja'], est: 1985, feat: true, art: 'eco', seed: 231, hue: 140, tone: 'day', x: 45, y: 35, lat: 23.2305, lng: 87.8624,
    desc: 'An eco-friendly celebration focusing on nature, using natural materials for a serene and pure environment.',
    story: 'For decades, Vivekananda Sevak Sangha has organized an authentic, traditional puja. This year, the focus is entirely on eco-consciousness. The pandal is woven from jute and bamboo, and the idol is sculpted from untouched river clay without synthetic paints, returning peacefully to nature on Dashami.' },
  { slug: 'curzon-gate-yuvak-sangha', name: 'Curzon Yuvak Sangha', area: 'Curzon Gate', themeId: 'architecture', themeName: 'The Gate Remembered',
    cats: ['Theme Puja', 'Large Pandal'], est: 1978, feat: true, art: 'gate', seed: 201, hue: 14, tone: 'dusk', x: 53, y: 44,
    desc: 'A full-scale rebuild of a triple-arched gateway, with the idol seated beneath its central arch.',
    story: 'Every Bardhaman child knows the gate by heart. This year the committee rebuilds it as a pandal: three arches, a carved cornice, and Durga seated under the middle one. Walk in through the left arch, out through the right, and the crowd becomes part of the architecture.' },
  { slug: 'station-bazar-milan-sangha', name: 'Station Bazar Milan Sangha', area: 'Station Bazar', themeId: 'social', themeName: 'The People Who Carry the City',
    cats: ['Theme Puja', 'Community Puja'], est: 1965, feat: true, art: 'station', seed: 202, hue: 30, tone: 'dusk', x: 30, y: 58,
    desc: 'Porters, tea-sellers and rail workers as the quiet strength behind the city, told through hand-built scenes.',
    story: 'The station never sleeps and neither do the people around it. This pandal follows one night shift, from the first porter to the last chai stall, and ends with Durga as one of them.' },
  { slug: 'kanchannagar-nabin-sangha', name: 'Kanchannagar Nabin Sangha', area: 'Kanchannagar', themeId: 'contemporary', themeName: 'Hanging Gardens of Light',
    cats: ['Theme Puja', 'Large Pandal'], est: 1991, feat: true, art: 'abstract', seed: 203, hue: 335, tone: 'night', x: 68, y: 30,
    desc: 'Thousands of suspended brass and glass forms that shift in the breeze and throw moving light.',
    story: 'A ceiling of suspended forms, hand-cut and hung one by one, turns the whole pandal into a slow, moving lantern. The idol is left unpainted so that the light is the colour.' },
  { slug: 'badamtala-bandhu-mahal', name: 'Badamtala Bandhu Mahal', area: 'Badamtala', themeId: 'rural', themeName: 'Amar Gram',
    cats: ['Theme Puja', 'Traditional'], est: 1959, feat: true, art: 'rural', seed: 204, hue: 34, tone: 'dawn', x: 20, y: 36,
    desc: 'A mud-walled village courtyard rebuilt in the middle of town, with clay lamps and a tulsi mancha.',
    story: 'Mud, thatch, cow-dung floors and marigold garlands. Amar Gram takes the crowd back to a Bengal that many only visit in memory, and the evening baul session in the courtyard does the rest.' },
  { slug: 'nawabhat-mandir-prangan', name: 'Nawabhat Mandir Prangan Pujo', area: 'Nawabhat', themeId: 'heritage', themeName: 'Terracotta Memory',
    cats: ['Heritage', 'Traditional'], est: 1902, feat: true, art: 'temple', seed: 205, hue: 18, tone: 'dusk', x: 78, y: 62,
    desc: 'A courtyard puja beside the old temple complex, with terracotta panels copied from the temples themselves.',
    story: 'Near the old Shiva temples, this puja keeps to the classical form: ekchala idol, daker saaj, a courtyard aarti at dusk. The new touch is the facade, reproduced panel by panel from the terracotta on the neighbouring temples.' },
  { slug: 'sadarghat-ekata-sangha', name: 'Sadarghat homo Ekata Sangha', area: 'Sadarghat', themeId: 'mythology', themeName: 'Mahishasura Mardini',
    cats: ['Theme Puja', 'Large Pandal'], est: 1984, feat: true, art: 'mythology', seed: 206, hue: 8, tone: 'night', x: 42, y: 72,
    desc: 'A lit walk-through of the great battle, narrated in Bengali verse and layered light.',
    story: 'The pandal is a corridor of painted panels that walks you through the nine nights of battle. A narrated verse plays as you move, and the last room opens onto the idol in full light.' },
  { slug: 'golapbag-sarbojanin', name: 'Golapbag Sarbojanin Durgotsab', area: 'Golapbag', themeId: 'heritage', themeName: 'Zamindar Bari',
    cats: ['Traditional', 'Community Puja', 'Large Pandal'], est: 1948, art: 'pandal', seed: 207, hue: 10, x: 58, y: 24,
    desc: 'A big neighbourhood puja with a classical thakur-dalan facade and daily bhog for hundreds.' },
  { slug: 'rajbati-prangan-pujo', name: 'Rajbati Prangan Pujo', area: 'Rajbati', themeId: 'heritage', themeName: 'The Old Courtyard',
    cats: ['Heritage', 'Family Puja', 'Traditional'], est: 1876, art: 'temple', seed: 208, hue: 22, tone: 'dusk', x: 46, y: 36,
    desc: 'A family courtyard puja kept in the old way, with hand-pressed sandesh and dhaki families who return every year.' },
  { slug: 'khosbagan-sarbojanin', name: 'Khosbagan Sarbojanin', area: 'Khosbagan', themeId: 'heritage', themeName: 'Daker Saaj',
    cats: ['Traditional', 'Community Puja'], est: 1962, art: 'pandal', seed: 209, hue: 16, x: 36, y: 46,
    desc: 'The classic form. Daker saaj silver-foil decoration and a bhog line that runs out the gate.' },
  { slug: 'barabazar-durgotsab-committee', name: 'Barabazar Durgotsab Committee', area: 'Barabazar', themeId: 'international', themeName: 'Cathedral of Light',
    cats: ['Theme Puja', 'Large Pandal', 'Community Puja'], est: 1988, art: 'global', seed: 210, hue: 215, x: 62, y: 54,
    desc: 'A gothic interior in bamboo and cloth, lit by stained-glass panels and slow fog.' },
  { slug: 'krishna-sayar-sabuj-sangha', name: 'Krishna Sayar Sabuj Sangha', area: 'Krishna Sayar', themeId: 'eco', themeName: 'Back to Earth',
    cats: ['Theme Puja', 'Community Puja'], est: 2004, art: 'eco', seed: 211, hue: 110, tone: 'day', x: 72, y: 42,
    desc: 'Only bamboo, jute and clay. Every piece is either composted or reused after Dashami.' },
  { slug: 'bhatchala-tarun-dal', name: 'Bhatchala Tarun Dal', area: 'Bhatchala', themeId: 'abstract', themeName: 'Rang',
    cats: ['Theme Puja'], est: 1999, art: 'abstract', seed: 212, hue: 280, x: 26, y: 70,
    desc: 'A tunnel of coloured fabric and projected light that never resolves into a shape.' },
  { slug: 'ghosh-bari-durga-puja', name: 'Ghosh Bari Durga Puja', area: 'Rajbati', themeId: 'heritage', themeName: 'Barir Pujo',
    cats: ['Family Puja', 'Heritage', 'Traditional'], est: 1854, art: 'temple', seed: 213, hue: 26, tone: 'dusk', x: 44, y: 32,
    desc: 'Generations of the same family, the same rituals, and the same thakur-dalan.' },
  { slug: 'mitra-bari-pujo', name: 'Mitra Bari Pujo', area: 'Golapbag', themeId: 'heritage', themeName: 'Sandhi Puja by Lamplight',
    cats: ['Family Puja', 'Heritage'], est: 1893, art: 'temple', seed: 214, hue: 20, tone: 'dusk', x: 55, y: 28,
    desc: 'Known locally for the 108-lamp Sandhi Puja held in the family courtyard.' },
  { slug: 'sen-bari-pujo', name: 'Sen Bari Pujo', area: 'Khosbagan', themeId: 'heritage', themeName: 'Ekchala Tradition',
    cats: ['Family Puja', 'Traditional'], est: 1921, art: 'pandal', seed: 215, hue: 14, x: 33, y: 42,
    desc: 'A small family puja with a traditional ekchala idol and hand-painted alpana on the floor.' },
  { slug: 'kalna-gate-pally-mangal', name: 'Kalna Gate Pally Mangal Samity', area: 'Kalna Gate', themeId: 'social', themeName: 'Jol Bachao',
    cats: ['Theme Puja', 'Community Puja'], est: 1972, art: 'social', seed: 216, hue: 200, tone: 'dusk', x: 16, y: 54,
    desc: 'A water-conservation pandal: stepwells, rain-catch models and a river told in blue cloth.' },
  { slug: 'sadarghat-damodar-tir-sangha', name: 'Damodar Tir Sangha', area: 'Sadarghat', themeId: 'eco', themeName: 'Nodir Kotha',
    cats: ['Theme Puja', 'Community Puja'], est: 2009, art: 'river', seed: 217, hue: 200, tone: 'dawn', x: 48, y: 80,
    desc: 'A riverside pandal built with river reed, kash and clay, mirroring the Damodar at dawn.' },
  { slug: 'station-road-notun-dal', name: 'Station Road Notun Dal', area: 'Station Bazar', themeId: 'contemporary', themeName: 'Mirror Hall',
    cats: ['Theme Puja', 'Large Pandal'], est: 2001, art: 'abstract', seed: 218, hue: 320, x: 34, y: 62,
    desc: 'A hall of mirrors and low lights. Every visitor becomes a part of the installation.' },
  { slug: 'khosbagan-bandhan', name: 'Khosbagan Bandhan', area: 'Khosbagan', themeId: 'mythology', themeName: 'Ten Mahavidyas',
    cats: ['Theme Puja'], est: 1996, art: 'mythology', seed: 219, hue: 350, x: 38, y: 50,
    desc: 'Ten painted doorways, one for each form of the Goddess, opening onto a single courtyard.' },
  { slug: 'badamtala-pally-sangha', name: 'Badamtala Pally Sangha', area: 'Badamtala', themeId: 'rural', themeName: 'Chalchitra',
    cats: ['Traditional', 'Community Puja'], est: 1955, art: 'pandal', seed: 220, hue: 12, x: 22, y: 40,
    desc: 'A classical chalchitra arch, painted by hand by a family of artists from a nearby village.' },
  { slug: 'palsit-lok-utsav', name: 'Palsit Lok Utsav Committee', area: 'Palsit', town: false, themeId: 'rural', themeName: 'Mati o Manush',
    cats: ['Community Puja', 'Traditional'], est: 1968, art: 'rural', seed: 221, hue: 32, tone: 'dawn', x: 86, y: 20,
    desc: 'A village-scale festival with folk music, jatra performances and a fair beside the pandal.' },
  { slug: 'shaktigarh-sarbojanin', name: 'Shaktigarh Sarbojanin', area: 'Shaktigarh', town: false, themeId: 'heritage', themeName: 'GT Road Puja',
    cats: ['Traditional', 'Community Puja'], est: 1950, art: 'pandal', seed: 222, hue: 10, x: 88, y: 76,
    desc: 'A roadside pandal known for its crowds, its langcha stalls and its late-night dhak.' },
  { slug: 'golapbag-nari-shakti', name: 'Golapbag Nari Shakti', area: 'Golapbag', themeId: 'social', themeName: 'Shakti',
    cats: ['Theme Puja', 'Community Puja'], est: 2012, art: 'social', seed: 223, hue: 350, x: 61, y: 20,
    desc: 'Organised, built and run entirely by women of the neighbourhood, from carpentry to aarti.' },
  { slug: 'rajbati-aloy-aloy', name: 'Rajbati Aloy Aloy', area: 'Rajbati', themeId: 'abstract', themeName: 'Light Studies',
    cats: ['Theme Puja'], est: 2015, art: 'abstract', seed: 224, hue: 45, x: 50, y: 40,
    desc: 'A room where the only material is light, a hundred bulbs and a few metres of gold thread.' },
];

export const PUJAS: Puja[] = ROWS.map(build);

export const FEATURED: FeaturedPandal[] = [
  { slug: 'vivekananda-sevak-sangha', tagline: 'A luminous presence in the heart of the city.', note: 'Traditional & Eco' },
  { slug: 'curzon-gate-yuvak-sangha', tagline: 'The city gate, rebuilt for the Goddess.', note: 'Architecture • Large pandal' },
  { slug: 'kanchannagar-nabin-sangha', tagline: 'A ceiling of a thousand moving lights.', note: 'Contemporary art' },
  { slug: 'badamtala-bandhu-mahal', tagline: 'A village courtyard inside the town.', note: 'Rural Bengal' },
  { slug: 'sadarghat-ekata-sangha', tagline: 'The battle, told room by room.', note: 'Mythology' },
  { slug: 'station-bazar-milan-sangha', tagline: 'For the people who never sleep.', note: 'Social awareness' },
  { slug: 'nawabhat-mandir-prangan', tagline: 'Terracotta, copied panel by panel.', note: 'Heritage' },
];

export const FILTERS: { id: string; label: string; test: (p: Puja) => boolean }[] = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'town', label: 'Bardhaman Town', test: (p) => p.zone === 'Bardhaman Town' },
  { id: 'traditional', label: 'Traditional', test: (p) => p.categories.includes('Traditional') },
  { id: 'theme', label: 'Theme Puja', test: (p) => p.categories.includes('Theme Puja') },
  { id: 'large', label: 'Large Pandals', test: (p) => p.categories.includes('Large Pandal') },
  { id: 'heritage', label: 'Heritage', test: (p) => p.categories.includes('Heritage') },
  { id: 'family', label: 'Family Puja', test: (p) => p.categories.includes('Family Puja') },
  { id: 'community', label: 'Community Puja', test: (p) => p.categories.includes('Community Puja') },
  { id: 'featured', label: 'Featured', test: (p) => p.featured },
];

export const bySlug = (slug: string) => PUJAS.find((p) => p.slug === slug);
export const themeCount = (id: string) => PUJAS.filter((p) => p.themeId === id).length;
