import { createContext, useContext } from 'react';

/** `open` becomes true the moment the curtain starts to part. Hero animations key off it. */
export const EntranceCtx = createContext({ open: false });
export const useEntrance = () => useContext(EntranceCtx);
