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
  { slug: 'vivekananda-sevak-sangha', name: 'Vivekananda Sevak Sangha', area: 'Vivekananda Pally', themeId: 'eco', themeName: 'Prakriti O Pran', cats: ['Traditional', 'Community Puja'], est: 1985, feat: true, art: 'eco', seed: 231, hue: 140, tone: 'day', x: 45, y: 65, lat: 23.22969, lng: 87.86378, desc: 'An eco-friendly celebration focusing on nature, using natural materials for a serene and pure environment.', story: 'For decades, Vivekananda Sevak Sangha has organized an authentic, traditional puja. This year, the focus is entirely on eco-consciousness. The pandal is woven from jute and bamboo, and the idol is sculpted from untouched river clay without synthetic paints, returning peacefully to nature on Dashami.' },
  { slug: 'natural-city', name: 'Natural City', area: 'Vivekananda College Road', town: true, themeId: 'heritage', themeName: 'Sabekiana / Traditional Bengal', cats: ['Community Puja', 'Traditional'], est: 1970, feat: false, art: 'pandal', seed: 100, hue: 0, tone: 'night', x: 52, y: 60, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'rathtala-barowari', name: 'Rathtala Barowari', area: 'Rathtala', town: true, themeId: 'mythology', themeName: 'Mahakal', cats: ['Community Puja', 'Theme Puja'], est: 1971, feat: false, art: 'pandal', seed: 101, hue: 10, tone: 'night', x: 58, y: 68, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'kiran-sangha', name: 'Kiran Sangha', area: 'Ichlabad', town: true, themeId: 'eco', themeName: 'Jol-i Jibon / Water is Life', cats: ['Community Puja', 'Theme Puja'], est: 1972, feat: false, art: 'pandal', seed: 102, hue: 20, tone: 'night', x: 65, y: 62, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'padmashree-sangha', name: 'Padmashree Sangha', area: 'Susopanna', town: true, themeId: 'heritage', themeName: 'Pushpanjali', cats: ['Community Puja', 'Traditional'], est: 1973, feat: false, art: 'pandal', seed: 103, hue: 30, tone: 'night', x: 48, y: 55, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'boro-nilpur', name: 'Boro Nilpur', area: 'Boro Nilpur', town: true, themeId: 'architecture', themeName: 'Dubai Swaminarayan Temple', cats: ['Community Puja', 'Theme Puja'], est: 1974, feat: false, art: 'pandal', seed: 104, hue: 40, tone: 'night', x: 62, y: 52, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'alamganj-barowari-kedarnath', name: 'Alamganj Barowari', area: 'Alamganj', town: true, themeId: 'architecture', themeName: 'Kedarnath', cats: ['Community Puja', 'Theme Puja'], est: 1975, feat: false, art: 'pandal', seed: 105, hue: 50, tone: 'night', x: 55, y: 75, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'laxmipur-math', name: 'Laxmipur Math', area: 'Laxmipur Math', town: true, themeId: 'contemporary', themeName: 'Domino Theme', cats: ['Community Puja', 'Theme Puja'], est: 1976, feat: false, art: 'pandal', seed: 106, hue: 60, tone: 'night', x: 68, y: 72, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'nabin-sangha', name: 'Nabin Sangha', area: 'Chhotonilpur', town: true, themeId: 'architecture', themeName: 'Hawa Mahal, Rajasthan', cats: ['Community Puja', 'Theme Puja'], est: 1977, feat: false, art: 'pandal', seed: 107, hue: 70, tone: 'night', x: 40, y: 60, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'ichlabad-kiran-sangha', name: 'Ichlabad Kiran Sangha', area: 'Ichlabad', town: true, themeId: 'mythology', themeName: 'Baahubali', cats: ['Community Puja', 'Theme Puja'], est: 1978, feat: true, art: 'pandal', seed: 108, hue: 80, tone: 'night', x: 35, y: 68, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'keshabganj-choti-barowari', name: 'Keshabganj Choti Barowari', area: 'Keshabganj', town: true, themeId: 'social', themeName: 'Ami Nari, Ami Mohiyoshi', cats: ['Community Puja', 'Theme Puja'], est: 1979, feat: false, art: 'pandal', seed: 109, hue: 90, tone: 'night', x: 42, y: 78, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'alamganj-barowari-bhubaneswari', name: 'Alamganj Barowari', area: 'Alamganj', town: true, themeId: 'architecture', themeName: 'Bhubaneswari Temple', cats: ['Community Puja', 'Theme Puja'], est: 1980, feat: false, art: 'pandal', seed: 110, hue: 100, tone: 'night', x: 75, y: 65, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'chowringhee-club', name: 'Chowringhee Club', area: 'Chhotonilpur', town: true, themeId: 'contemporary', themeName: 'In the Land of the Blue Fairy', cats: ['Community Puja', 'Theme Puja'], est: 1981, feat: false, art: 'pandal', seed: 111, hue: 110, tone: 'night', x: 72, y: 55, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'laltu-smriti-sangha', name: 'Laltu Smriti Sangha', area: 'Baranilpur', town: true, themeId: 'architecture', themeName: 'Tirupati Balaji Temple', cats: ['Community Puja', 'Theme Puja'], est: 1982, feat: true, art: 'pandal', seed: 112, hue: 120, tone: 'night', x: 80, y: 70, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'subhash-athletic-club', name: 'Subhash Athletic Club', area: 'Nutanpally', town: true, themeId: 'contemporary', themeName: 'A Piece of Kashmir - Vande Bharat', cats: ['Community Puja', 'Theme Puja'], est: 1983, feat: false, art: 'pandal', seed: 113, hue: 130, tone: 'night', x: 55, y: 45, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'badamtala-khaluibil-math', name: 'Badamtala Khaluibil Math', area: 'Katwa Road', town: true, themeId: 'social', themeName: 'Artanader Itikotha', cats: ['Community Puja', 'Theme Puja'], est: 1984, feat: false, art: 'pandal', seed: 114, hue: 140, tone: 'night', x: 65, y: 40, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'burirbagan-sarbojanin', name: 'Burirbagan Sarbojanin', area: 'Burir Bagan', town: true, themeId: 'social', themeName: 'Matririn', cats: ['Community Puja', 'Theme Puja'], est: 1985, feat: false, art: 'pandal', seed: 115, hue: 150, tone: 'night', x: 72, y: 42, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'barsul-yma', name: 'Barsul Young Mens Association', area: 'Barsul', town: false, themeId: 'architecture', themeName: 'Red Fort', cats: ['Community Puja', 'Theme Puja'], est: 1986, feat: false, art: 'pandal', seed: 116, hue: 160, tone: 'night', x: 80, y: 50, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'tikrahat-sarbojanin', name: 'Tikrahat Sarbojanin', area: 'Tikrahat', town: true, themeId: 'social', themeName: 'The Agony of 46', cats: ['Community Puja', 'Theme Puja'], est: 1987, feat: false, art: 'pandal', seed: 117, hue: 170, tone: 'night', x: 45, y: 40, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'barsul-jagarani', name: 'Barsul Jagarani', area: 'Barsul', town: false, themeId: 'contemporary', themeName: 'Rangamanch / Stage', cats: ['Community Puja', 'Theme Puja'], est: 1988, feat: false, art: 'pandal', seed: 118, hue: 180, tone: 'night', x: 35, y: 45, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'kalna-gate-bank-para', name: 'Kalna Gate Bank Para', area: 'Kalna Gate', town: true, themeId: 'mythology', themeName: 'Ardhanarishwar', cats: ['Community Puja', 'Theme Puja'], est: 1989, feat: false, art: 'pandal', seed: 119, hue: 190, tone: 'night', x: 25, y: 50, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'sripally-officers-colony', name: 'Sripally Officers Colony', area: 'Sripally', town: true, themeId: 'social', themeName: 'Yoga Shakti', cats: ['Community Puja', 'Theme Puja'], est: 1990, feat: false, art: 'pandal', seed: 120, hue: 200, tone: 'night', x: 28, y: 60, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'bandhab-sangha', name: 'Bandhab Sangha', area: 'Bardhaman', town: true, themeId: 'contemporary', themeName: 'Pinjore Pran Muktir Gaan', cats: ['Community Puja', 'Theme Puja'], est: 1991, feat: false, art: 'pandal', seed: 121, hue: 210, tone: 'night', x: 30, y: 75, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'shyamlal-sarbojanin', name: 'Shyamlal Sarbojanin', area: 'Khosbagan', town: true, themeId: 'mythology', themeName: 'Har Har Mahadev', cats: ['Community Puja', 'Theme Puja'], est: 1992, feat: false, art: 'pandal', seed: 122, hue: 220, tone: 'night', x: 50, y: 82, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'amadpur-zomidar-bari', name: 'Amadpur Zomidar Bari', area: 'Amadpur', town: false, themeId: 'heritage', themeName: 'A Timeless Legacy', cats: ['Family Puja', 'Heritage'], est: 1650, feat: true, art: 'pandal', seed: 123, hue: 15, tone: 'night', x: 85, y: 85, desc: 'Experience the grandeur of a heritage Durga Puja, preserving centuries of devotion and tradition at the historic Amadpur Zomidar Bari.' },
  { slug: 'jagoroni-sangha', name: 'Jagoroni Sangha', area: 'Chhotonilpur', town: true, themeId: 'mythology', themeName: 'Manaskamana', cats: ['Community Puja', 'Theme Puja'], est: 1980, feat: true, art: 'pandal', seed: 124, hue: 45, tone: 'night', x: 42, y: 58, desc: 'Celebrating Durga Puja with grand festivities and devotion.' }
];

export const PUJAS: Puja[] = ROWS.map(build);

export const FEATURED: FeaturedPandal[] = [
  { slug: 'amadpur-zomidar-bari', tagline: 'A timeless legacy preserving centuries of devotion.', note: 'Heritage' },
  { slug: 'vivekananda-sevak-sangha', tagline: 'A luminous presence in the heart of the city.', note: 'Traditional & Eco' },
  { slug: 'ichlabad-kiran-sangha', tagline: 'Epic grandeur brought to life.', note: 'Mythology' },
  { slug: 'laltu-smriti-sangha', tagline: 'Divine architecture recreated.', note: 'Architecture' },
  { slug: 'jagoroni-sangha', tagline: 'Fulfilling the deepest desires.', note: 'Theme Puja' }
];

export const FILTERS: { id: string; label: string; test: (p: Puja) => boolean }[] = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'town', label: 'Bardhaman Town', test: (p) => p.zone === 'Bardhaman Town' },
  { id: 'heritage', label: 'Heritage', test: (p) => p.categories.includes('Heritage') },
  { id: 'featured', label: 'Featured', test: (p) => p.featured },
];

export const bySlug = (slug: string) => PUJAS.find((p) => p.slug === slug);
export const themeCount = (id: string) => PUJAS.filter((p) => p.themeId === id).length;
