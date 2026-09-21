import type { Track, Stage } from './types';

export const BRANDS = {
  capturers: {
    name: 'Burdwan Capturers Official',
    short: 'Burdwan Capturers',
    socials: { instagram: '#', facebook: '#', youtube: '#' },
  },
  pujo: {
    name: 'Banglar Pujo Official',
    short: 'Banglar Pujo',
    socials: { instagram: '#', facebook: '#', youtube: '#' },
  },
};

/** Shashthi morning, IST. Confirm against the local panjika and edit here. */
export const PUJA_START = new Date('2026-10-17T06:00:00+05:30');

export const NAV = [
  { label: 'Home', bn: 'বাড়ি', to: '/' },
  { label: 'All Puja', bn: 'সব পুজো', to: '/pujas' },
  // { label: 'Themes', bn: 'থিম', to: '/themes' },
  { label: 'Featured Pandals', bn: 'বাছাই মণ্ডপ', to: '/featured' },
  { label: 'Explore Bardhaman', bn: 'বর্ধমান', to: '/bardhaman' },
  { label: 'Gallery', bn: 'ছবিঘর', to: '/gallery' },
  { label: 'About', bn: 'আমরা', to: '/about' },
  // { label: 'Contact', bn: 'যোগাযোগ', to: '/contact' },
];

/** Plays through the built-in synthesiser. Add `src: '/audio/file.mp3'` to swap in a real recording. */
export const TRACKS: Track[] = [
  { id: 'pujo-theme', title: 'Pujo Theme', mood: 'Shehnai over a tanpura drone' },
  { id: 'dhaker-taal', title: 'Dhaker Taal', mood: 'Dhak and kansor, mid tempo' },
  { id: 'mahalaya', title: 'Mahalaya Atmosphere', mood: 'Conch, bells, pre-dawn hush' },
  { id: 'classical', title: 'Bengali Classical', mood: 'Plucked strings in raga Bhairav' },
  { id: 'dhunuchi', title: 'Dhunuchi Beats', mood: 'Fast dhak for the aarti' },
];

export const STAGES: Stage[] = [
  {
    id: 'mahalaya', name: 'Mahalaya', bn: 'মহালয়া', date: 'Sat 10 Oct', iso: '2026-10-10',
    ritual: 'Tarpan, and the voice on the radio',
    text: 'Before dawn, families offer tarpan to their ancestors and the old Mahishasura Mardini recital fills the house. The Goddess has been invited.',
    visual: { art: 'river', seed: 11, src: '/images/mahalaya.jpg' },
  },
  {
    id: 'shashthi', name: 'Shashthi', bn: 'ষষ্ঠী', date: 'Sat 17 Oct', iso: '2026-10-17',
    ritual: 'Bodhon: the face is unveiled',
    text: "At dusk the idol's face is revealed and the goddess is welcomed with conch shells and dhak. Pandals open their gates for the first night.",
    visual: { art: 'idol', seed: 12, src: '/images/shashthi.jpg' },
  },
  {
    id: 'saptami', name: 'Saptami', bn: 'সপ্তমী', date: 'Sun 18 Oct', iso: '2026-10-18',
    ritual: 'Nabapatrika snan',
    text: 'The banana plant wrapped in a red-bordered sari, Kola Bou, is bathed in the river at first light and carried to the pandal.',
    visual: { art: 'kash', seed: 13, src: '/images/saptami.jpg' },
  },
  {
    id: 'ashtami', name: 'Ashtami', bn: 'অষ্টমী', date: 'Mon 19 Oct', iso: '2026-10-19',
    ritual: 'Anjali and Sandhi Puja',
    text: 'The busiest day. Morning anjali with the whole neighbourhood, then Sandhi Puja at the hinge between Ashtami and Navami, lit by 108 lamps.',
    visual: { art: 'pandal', seed: 14, src: '/images/ashtami.jpg' },
  },
  {
    id: 'navami', name: 'Navami', bn: 'নবমী', date: 'Tue 20 Oct', iso: '2026-10-20',
    ritual: 'Maha aarti and dhunuchi naach',
    text: 'Smoke, coconut husk and dhak. Dancers balance dhunuchis on their hands, on their teeth, and around the idol.',
    visual: { art: 'dhunuchi', seed: 15, src: '/images/navami.jpg' },
  },
  {
    id: 'dashami', name: 'Dashami', bn: 'দশমী', date: 'Wed 21 Oct', iso: '2026-10-21',
    ritual: 'Sindoor khela and Bishorjon',
    text: 'Married women smear sindoor on the goddess and on each other. By evening the idols move toward the water, and the dhak slows.',
    visual: { art: 'sindoor', seed: 16, src: '/images/dashami.jpg' },
  },
];
