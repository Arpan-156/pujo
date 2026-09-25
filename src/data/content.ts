import type { GalleryItem, Contributor, Landmark, ArtKind, Tone } from './types';

export const GALLERY_CATEGORIES = [
  'All', 'Maa Durga', 'Pandals', 'Street', 'Crowd'
];

const CREDIT = 'Burdwan Capturers (placeholder)';
type Row = [string, string, ArtKind, Tone, number, number, ('tall' | 'wide')?, string?];

const ROWS: Row[] = [
  ['Maa Durga', 'Durga under the chalchitra arch, moments before Bodhon', 'idol', 'dusk', 301, 8, 'tall', '/images/maa1.jpg'],
  ['Maa Durga', 'Ekchala idol, painted by hand, unlit', 'idol', 'night', 302, 20, undefined, '/images/maa2.jpg'],
  ['Maa Durga', 'Ten arms, one lamp', 'idol', 'night', 303, 350, 'tall', '/images/maa3.jpg'],
  ['Maa Durga', 'Traditional daaker saaj and vibrant colors', 'idol', 'dusk', 304, 34, undefined, '/images/maa4.jpg'],
  ['Maa Durga', 'Divine aura, close up of the idol face', 'idol', 'night', 305, 45, 'tall', '/images/maa5.jpg'],
  ['Maa Durga', 'Majestic ten-armed idol in full glory', 'idol', 'dusk', 306, 50, 'tall', '/images/maa6.jpg'],
  ['Maa Durga', 'Traditional goddess form with mesmerizing eyes', 'idol', 'night', 307, 60, undefined, '/images/maa7.jpg'],
  ['Maa Durga', 'Idol set within a grand thematic arch', 'idol', 'dusk', 308, 70, 'wide', '/images/maa8.jpg'],
  ['Maa Durga', 'Detailed craftsmanship and radiant golden crown', 'idol', 'night', 309, 80, 'tall', '/images/maa9.jpg'],
];

export const GALLERY: GalleryItem[] = ROWS.map((r, i) => ({
  id: `g${i + 1}`,
  category: r[0],
  caption: r[1],
  credit: CREDIT,
  visual: { art: r[2], tone: r[3], seed: r[4], hue: r[5], src: r[7] },
  tall: r[6] === 'tall',
  wide: r[6] === 'wide',
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
    visual: { art: 'gate', seed: 401, tone: 'dusk', hue: 14 } },
  { id: 'station', title: 'Bardhaman Railway Station', bn: 'বর্ধমান জংশন', kind: 'Transit',
    text: 'One of the busiest junctions on the Howrah main line. During Puja the platforms hold a second festival of arrivals: families coming home with sweets and suitcases.',
    visual: { art: 'station', seed: 0, src: '/photos/station.jpg' } },
  { id: 'overbridge', title: 'The Railway Overbridge', bn: 'রেল ওভারব্রিজ', kind: 'Night view',
    text: 'From the top you can see the tracks below and the lit pandals beyond. At night it is the best free viewpoint in town.',
    visual: { art: 'bridge', seed: 403, tone: 'night', hue: 18 } },
  { id: 'damodar', title: 'Damodar River', bn: 'দামোদর', kind: 'River',
    text: 'The river that shaped the district. Kash flowers open along its banks just before Mahalaya, and the Puja begins to feel real.',
    visual: { art: 'river', seed: 404, tone: 'dawn', hue: 28 } },
  { id: 'temples', title: 'The 108 Shiva Temples', bn: 'নবাবহাট মন্দির', kind: 'Historic temples',
    text: 'A ring of 108 small temples built in 1788, laid out in two concentric circles. Their terracotta and white-plaster forms turn up in pandal designs every year.',
    visual: { art: 'temple', seed: 0, src: '/photos/108-shiva.jpg' } },
  { id: 'lake', title: 'Krishna Sayar', bn: 'কৃষ্ণসায়র', kind: 'Water and birds',
    text: 'A large old lake on the edge of town. Come in the morning, when mist lies on the water and the joggers have not arrived.',
    visual: { art: 'lake', seed: 406, tone: 'dawn', hue: 190 } },
  { id: 'streets', title: 'Local streets', bn: 'গলি', kind: 'Streets',
    text: 'Lanes strung with bunting, lamps and speakers. The best pandal is often the one you find by getting lost.',
    visual: { art: 'street', seed: 407, tone: 'night', hue: 24 } },
  { id: 'food', title: 'Sitabhog and Mihidana', bn: 'সীতাভোগ ও মিহিদানা', kind: 'Food',
    text: 'The district\'s signature sweets. Buy a box at a station-side shop and eat it on the way to the next pandal.',
    visual: { art: 'food', seed: 0, src: '/photos/sitabhog.webp' } },
  { id: 'market', title: 'Markets', bn: 'বাজার', kind: 'Markets',
    text: 'Cloth, bangles, alta and flowers. Puja shopping starts at Bijoya Dashami of the year before and picks up speed at Mahalaya.',
    visual: { art: 'market', seed: 409, tone: 'night', hue: 26 } },
  { id: 'zones', title: 'Puja zones', bn: 'পুজো এলাকা', kind: 'Pandal hopping',
    text: 'Golapbag, Station Bazar, Kanchannagar, Khosbagan and Badamtala make a natural walking route. Start early, finish late.',
    visual: { art: 'crowd', seed: 410, tone: 'night', hue: 14 } },
];
