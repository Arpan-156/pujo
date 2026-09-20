import type { CSSProperties } from 'react';

/** Typed helper for setting CSS custom properties inline. */
export const vars = (o: Record<string, string | number>) => o as CSSProperties;

export const pad2 = (n: number) => String(n).padStart(2, '0');
