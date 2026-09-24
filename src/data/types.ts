export type ArtKind =
  | 'pandal' | 'idol' | 'gate' | 'station' | 'bridge' | 'river' | 'temple' | 'street'
  | 'dhak' | 'crowd' | 'market' | 'food' | 'dhunuchi' | 'sindoor' | 'kash' | 'morning'
  | 'abstract' | 'rural' | 'eco' | 'global' | 'social' | 'shankha' | 'lake' | 'camera' | 'mythology';

export type Tone = 'night' | 'dusk' | 'dawn' | 'day';

/** Anything visual. Set `src` to a real photograph and the generated placeholder disappears. */
export interface Visual {
  art: ArtKind;
  seed: number;
  hue?: number;
  tone?: Tone;
  src?: string;
}

export type PujaCategory =
  | 'Traditional' | 'Theme Puja' | 'Large Pandal' | 'Heritage' | 'Family Puja' | 'Community Puja';

export interface Puja {
  lat?: number;
  lng?: number;
  x?: number;
  y?: number;
  slug: string;
  name: string;
  location: string;
  area: string;
  zone: 'Bardhaman Town' | 'Outskirts';
  theme: string;
  themeId: string;
  categories: PujaCategory[];
  description: string;
  story: string;
  pandalConcept: string;
  idolConcept: string;
  attractions: string[];
  established: number;
  featured: boolean;
  heroImage: Visual;
  idolImage: Visual;
  gallery: Visual[];
  /** position on the stylised map, 0-100 */
  map: { x: number; y: number; lat?: number; lng?: number };
  /** true until the entry has been verified with the organisers */
  sample?: boolean;
}

export interface FeaturedPandal {
  slug: string;
  tagline: string;
  note: string;
}

export interface Theme {
  id: string;
  title: string;
  bn: string;
  description: string;
  visual: Visual;
}

export interface GalleryItem {
  id: string;
  category: string;
  caption: string;
  credit: string;
  visual: Visual;
  tall?: boolean;
  wide?: boolean;
}

export interface Contributor {
  name: string;
  role: string;
  group: string;
  bio: string;
  hue: number;
  social: string;
}

export interface Landmark {
  id: string;
  title: string;
  bn: string;
  kind: string;
  text: string;
  visual: Visual;
}

export interface Track {
  id: string;
  title: string;
  mood: string;
  /** Optional real audio file. Without it the built-in synthesiser plays. */
  src?: string;
}

export interface Stage {
  id: string;
  name: string;
  bn: string;
  date: string;
  iso: string;
  ritual: string;
  text: string;
  visual: Visual;
}
