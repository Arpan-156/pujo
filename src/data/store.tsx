import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Contributor, FeaturedPandal, GalleryItem, Landmark, Puja, Theme } from './types';
import { FEATURED, PUJAS, THEMES } from './pujas';
import { CONTRIBUTORS, GALLERY, LANDMARKS } from './content';

export interface DataSet {
  pujas: Puja[];
  featured: FeaturedPandal[];
  themes: Theme[];
  gallery: GalleryItem[];
  contributors: Contributor[];
  landmarks: Landmark[];
}

const DEFAULTS: DataSet = { pujas: PUJAS, featured: FEATURED, themes: THEMES, gallery: GALLERY, contributors: CONTRIBUTORS, landmarks: LANDMARKS };

const Ctx = createContext<DataSet>(DEFAULTS);

/**
 * Wrap the app in <DataProvider pujas={rows} /> after fetching from Firebase, Supabase,
 * a CMS or your own API. Any collection you leave out falls back to the bundled sample data.
 */
export function DataProvider({ children, ...override }: Partial<DataSet> & { children: ReactNode }) {
  const value = useMemo(() => ({ ...DEFAULTS, ...override }), [override.pujas, override.featured, override.themes, override.gallery, override.contributors, override.landmarks]); // eslint-disable-line react-hooks/exhaustive-deps
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useData() {
  const d = useContext(Ctx);
  return useMemo(
    () => ({
      ...d,
      bySlug: (slug: string) => d.pujas.find((p) => p.slug === slug),
      themeCount: (id: string) => d.pujas.filter((p) => p.themeId === id).length,
      featuredPujas: d.featured.flatMap((f) => {
        const p = d.pujas.find((x) => x.slug === f.slug);
        return p ? [{ ...f, puja: p }] : [];
      }),
    }),
    [d],
  );
}
