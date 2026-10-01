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



export const MessageCircle = make(<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />);

export const Bookmark = make(<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />);
export const BookmarkCheck = make(<><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" /><path d="m9 10 2 2 4-4" /></>);
export const Check = make(<path d="M20 6L9 17l-5-5" />);
export const Settings = make(<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>);
export const Palette = make(<><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></>);
export const Lightbulb = make(<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>);

export const Navigation = make(<path d="m3 11 19-9-9 19-2-8-8-2z" />);
export const CheckCircle = make(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>);
