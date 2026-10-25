import type { GalleryItem, Contributor, Landmark, ArtKind, Tone } from './types';

export const GALLERY_CATEGORIES = [
  'All', 'Maa Durga', 'Pandals', 'Street', 'Crowd'
];

const CREDIT = 'Burdwan Capturers Official';
type Row = [string, string, ArtKind, Tone, number, number, ('tall' | 'wide')?, string?, number?, string?];

export interface MagazineEdition {
  year: number;
  volume: string;
  issueTitle: string;
  englishTitle: string;
  tagline: string;
  editorNote: string;
  themeStory: string;
  coverImage: string;
  accentColor: string;
  spineColor: string;
  publishDate: string;
  curator: string;
}

export const MAGAZINE_EDITIONS: MagazineEdition[] = [
  {
    year: 2026,
    volume: "Vol. II",
    issueTitle: "শারদোৎসব ২০২৬",
    englishTitle: "Burdwan Pujo Annual 2026",
    tagline: "The Golden Chronicles & New Horizons",
    editorNote: "From monumental architectural tributes like Satyajit Ray's cinematic motifs and Balaji replicas to sacred clay sculpting, the 2026 volume documents Bardhaman's crowning festive creations.",
    themeStory: "As the beats of the dhak echoed through the historic lanes of Bardhaman, 2026 heralded an unprecedented surge of thematic innovation and heritage revival. Our photographic team traversed from Shalbagan to Chhotonilpur to capture the living devotion of the artisans.",
    coverImage: "/images/jagoroni-sangha.jpg",
    accentColor: "#e9b558",
    spineColor: "#3a1217",
    publishDate: "Sharadiya 2026",
    curator: "Burdwan Capturers Official"
  },
  {
    year: 2025,
    volume: "Vol. I",
    issueTitle: "শারদোৎসব ২০২৫",
    englishTitle: "Burdwan Pujo Annual 2025",
    tagline: "Timeless Heritage & Classic Maa Durga",
    editorNote: "The inaugural archival volume celebrating the serenity of Ekchala pratimas, shimmering daaker saaj, and the ageless grandeur of Burdwan's heritage Pujas.",
    themeStory: "In 2025, our cameras focused closely on the divine expressions of Maa Durga in the quiet hours before Mahasaptami Bodhon. From traditional rajbari courtyards to intricate terracotta arches, this collection preserves the authentic soul of Bengal's greatest festival.",
    coverImage: "/images/maa1.jpg",
    accentColor: "#d4af37",
    spineColor: "#1d1912",
    publishDate: "Sharadiya 2025",
    curator: "Burdwan Capturers Official"
  }
];

const ROWS: Row[] = [
  // --- 2026 EDITION (Club Names Only) ---
  ['Pandals', 'Jagoroni Sangha', 'pandal', 'night', 401, 45, 'tall', '/images/jagoroni-sangha-pandal.jpg', 2026],
  ['Maa Durga', 'Jagoroni Sangha', 'idol', 'night', 402, 45, 'wide', '/images/jagoroni-sangha.jpg', 2026],
  ['Maa Durga', 'Sarba Milan Sangha', 'idol', 'night', 403, 75, 'tall', '/images/sarba-milan-sangha.jpg', 2026],
  ['Maa Durga', 'Laltu Smriti Sangha', 'idol', 'night', 404, 120, 'tall', '/images/laltu-smriti-sangha.jpg', 2026],
  ['Maa Durga', 'Ichlabad Youth Club', 'idol', 'night', 405, 80, 'wide', '/images/ichlabad-youth-club.jpg', 2026],
  ['Pandals', 'Amadpur Zamindar Bari', 'temple', 'dusk', 406, 15, 'wide', '/images/zamindar.jpg', 2026],
  ['Maa Durga', 'Radha Ballav Jiu', 'temple', 'dusk', 407, 35, 'tall', '/images/radha-ballab.jpg', 2026],
  ['Maa Durga', 'Vivekananda Sevak Sangha', 'idol', 'dusk', 408, 140, 'tall', '/photos/idol-2.jpg', 2026],
  ['Street', 'Station Overbridge', 'bridge', 'night', 409, 20, 'wide', '/photos/overbridge.jpg', 2026],
  ['Pandals', '108 Shiva Temple', 'temple', 'dawn', 410, 24, 'tall', '/photos/108-shiva.jpg', 2026],

  // --- 2025 EDITION (Club Names Only) ---
  ['Maa Durga', 'Baranilpur Friends Club', 'idol', 'dusk', 301, 8, 'tall', '/images/maa1.jpg', 2025],
  ['Maa Durga', 'Ghordour Choti Sharbojonin', 'idol', 'night', 302, 20, undefined, '/images/maa2.jpg', 2025],
  ['Maa Durga', 'Alamganj Barowari', 'idol', 'night', 303, 350, 'tall', '/images/maa3.jpg', 2025],
  ['Maa Durga', 'Badamtala Khaluibil Math', 'idol', 'dusk', 304, 34, undefined, '/images/maa4.jpg', 2025],
  ['Maa Durga', 'Burirbagan Sarbojanin', 'idol', 'night', 305, 45, 'tall', '/images/maa5.jpg', 2025],
  ['Maa Durga', 'Keshabganj Choti Barowari', 'idol', 'dusk', 306, 50, 'tall', '/images/maa6.jpg', 2025],
  ['Maa Durga', 'Chowringhee Club', 'idol', 'night', 307, 60, undefined, '/images/maa7.jpg', 2025],
  ['Maa Durga', 'Kiran Sangha', 'idol', 'dusk', 308, 70, 'wide', '/images/maa8.jpg', 2025],
  ['Maa Durga', 'Nabin Sangha', 'idol', 'night', 309, 80, 'tall', '/images/maa9.jpg', 2025],
  ['Street', 'Curzon Gate', 'gate', 'night', 310, 14, 'wide', '/photos/curzon.jpg', 2025],
  ['Crowd', 'Burdwan Junction', 'station', 'night', 311, 20, 'wide', '/photos/station.jpg', 2025],
  ['Street', 'Damodar River', 'kash', 'dawn', 312, 28, 'tall', '/photos/kash.jpg', 2025],
];

export const GALLERY: GalleryItem[] = ROWS.map((r, i) => ({
  id: `g${i + 1}`,
  category: r[0],
  caption: r[1],
  credit: r[9] || CREDIT,
  visual: { art: r[2], tone: r[3], seed: r[4], hue: r[5], src: r[7] },
  tall: r[6] === 'tall',
  wide: r[6] === 'wide',
  year: r[8] ?? 2025,
}));

/** Placeholder people. Replace names, bios and links with the real team. */
export const CONTRIBUTORS: Contributor[] = [
  { name: 'Arjun Mukherjee', role: 'Founder', group: 'Leadership', bio: 'Started the page with one camera and a bicycle.', hue: 12, social: '#' },
  { name: 'Ritwika Sen', role: 'Admin', group: 'Leadership', bio: 'Keeps the calendar, the DMs and the volunteers in order.', hue: 350, social: '#' },
  { name: 'Subhojit Dey', role: 'Lead photographer', group: 'Photographers', bio: 'Long exposures, wet streets, the hour before Bodhon.', hue: 30, social: '#' },
  { name: 'Payel Ghosh', role: 'Photographer', group: 'Photographers', bio: 'Faces in the crowd and hands at work.', hue: 20, social: '#' },
  { name: 'Ankan Roy', role: 'Videographer', group: 'Videographers', bio: 'Drone at dawn, gimbal at midnight.', hue: 210, social: '#' },
  { name: 'Moumita Paul', role: 'Contributor', group: 'Contributors', bio: 'Writes the captions and checks every pandal\'s theme.', hue: 40, social: '#' },
  { name: 'Debasish Nandi', role: 'Voice-over artist', group: 'Voice', bio: 'The Bengali narration behind every reel.', hue: 280, social: '#' },
  { name: 'Sneha Bhattacharya', role: 'Volunteer lead', group: 'Volunteers', bio: 'Runs the ground team across pandal zones.', hue: 140, social: '#' },
];

export const LANDMARKS: Landmark[] = [
  { id: 'curzon', title: 'Curzon Gate', bn: 'কার্জন গেট', kind: 'Landmark',
    text: 'A triple-arched gateway raised in 1903 to mark a viceroy\'s visit. It is now the city\'s favourite meeting point and the backdrop of half of its photographs.',
    visual: { art: 'gate', seed: 0, src: '/photos/curzon.jpg' } },
  { id: 'station', title: 'Bardhaman Railway Station', bn: 'বর্ধমান জংশন', kind: 'Transit',
    text: 'One of the busiest junctions on the Howrah main line. During Puja the platforms hold a second festival of arrivals: families coming home with sweets and suitcases.',
    visual: { art: 'station', seed: 0, src: '/photos/station.jpg' } },
  { id: 'overbridge', title: 'The Railway Overbridge', bn: 'রেল ওভারব্রিজ', kind: 'Night view',
    text: 'From the top you can see the tracks below and the lit pandals beyond. At night it is the best free viewpoint in town.',
    visual: { art: 'bridge', seed: 0, src: '/photos/overbridge.jpg' } },
  { id: 'damodar', title: 'Damodar River', bn: 'দামোদর', kind: 'River',
    text: 'The river that shaped the district. Kash flowers open along its banks just before Mahalaya, and the Puja begins to feel real.',
    visual: { art: 'river', seed: 404, tone: 'dawn', hue: 28 } },
  { id: 'temples', title: 'The 108 Shiva Temples', bn: 'নবাবহাট মন্দির', kind: 'Historic temples',
    text: 'A ring of 108 small temples built in 1788, laid out in two concentric circles. Their terracotta and white-plaster forms turn up in pandal designs every year.',
    visual: { art: 'temple', seed: 0, src: '/photos/108-shiva.jpg' } },
  { id: 'food', title: 'Sitabhog and Mihidana', bn: 'সীতাভোগ ও মিহিদানা', kind: 'Food',
    text: 'The district\'s signature sweets. Buy a box at a station-side shop and eat it on the way to the next pandal.',
    visual: { art: 'food', seed: 0, src: '/photos/sitabhog.webp' } },
];
