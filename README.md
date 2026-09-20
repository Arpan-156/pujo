# Bardhaman Durga Puja 2026

React 19 + TypeScript + Vite project.

    npm install
    npm run dev            # develop
    npm run build          # production build (Vite)
    node build-single.mjs  # one self-contained dist/index.html (needs esbuild)

Where to edit
- src/data/pujas.ts      Puja directory, themes, featured list (sample data, marked `sample: true`)
- src/data/content.ts    gallery, team, Bardhaman landmarks
- src/data/site.ts       brand links, nav, music tracks, festival dates (PUJA_START, STAGES)
- src/data/store.tsx     <DataProvider>: pass fetched data from Firebase/Supabase/CMS
- Real photos: set `src` on any Visual. Real music: set `src` on a Track.
