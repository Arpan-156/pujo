import type { ReactNode, SVGProps } from 'react';

/**
 * Small inline icon set with the same call signature as lucide-react
 * (`<Menu size={20} />`), so `import { Menu } from 'lucide-react'` is a drop-in swap.
 */
type P = { size?: number } & Omit<SVGProps<SVGSVGElement>, 'children'>;

const make = (paths: ReactNode) =>
  function Icon({ size = 20, ...rest }: P) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
        {paths}
      </svg>
    );
  };

export const Menu = make(<><path d="M4 8h16" /><path d="M4 16h16" /></>);
export const X = make(<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>);
export const Play = make(<path d="M7 5l12 7-12 7z" fill="currentColor" />);
export const Pause = make(<><path d="M8 5v14" strokeWidth={3} /><path d="M16 5v14" strokeWidth={3} /></>);
export const SkipBack = make(<><path d="M18 5L8 12l10 7z" fill="currentColor" /><path d="M6 5v14" /></>);
export const SkipForward = make(<><path d="M6 5l10 7-10 7z" fill="currentColor" /><path d="M18 5v14" /></>);
export const Volume = make(<><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 010 7" /><path d="M19 6a8.5 8.5 0 010 12" /></>);
export const VolumeOff = make(<><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" /><path d="M17 9l4 6" /><path d="M21 9l-4 6" /></>);
export const Music = make(<><path d="M9 18V6l11-2v12" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></>);
export const Pin = make(<><path d="M12 21s-7-6.2-7-11.2A7 7 0 0119 9.8C19 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.5" /></>);
export const Search = make(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>);
export const ArrowRight = make(<><path d="M4 12h16" /><path d="M14 6l6 6-6 6" /></>);
export const ArrowLeft = make(<><path d="M20 12H4" /><path d="M10 6l-6 6 6 6" /></>);
export const ArrowUpRight = make(<><path d="M7 17L17 7" /><path d="M8 7h9v9" /></>);
export const ChevronLeft = make(<path d="M15 5l-7 7 7 7" />);
export const ChevronRight = make(<path d="M9 5l7 7-7 7" />);
export const ChevronDown = make(<path d="M5 9l7 7 7-7" />);
export const ZoomIn = make(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /><path d="M11 8v6" /><path d="M8 11h6" /></>);
export const ZoomOut = make(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /><path d="M8 11h6" /></>);
export const Camera = make(<><path d="M4 8h3l1.5-2h7L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>);
export const Phone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1.5 1.5 0 01-1.6 1.5C10 20 4 14 3.5 5.6A1.5 1.5 0 015 4z" />);
export const List = make(<><path d="M9 6h11" /><path d="M9 12h11" /><path d="M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></>);
export const Instagram = make(<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></>);
export const Facebook = make(<path d="M14 21v-8h3l.5-3.5H14V7.6c0-1 .4-1.6 1.7-1.6h1.8V3a20 20 0 00-2.7-.2C12.2 2.8 10.500 4.400 10.500 7v2.500H8V13h2.500v8z" />);
export const Youtube = make(<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.500v5l4.500-2.500z" fill="currentColor" /></>);
export const Send = make(<><path d="M21 3L10 14" /><path d="M21 3l-7 18-4-7-7-4z" /></>);
export const Grid = make(<><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></>);


