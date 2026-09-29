import { useSyncExternalStore } from 'react';

type PassportData = {
  saved: string[];
  visited: string[];
};

const KEY = 'pujo_passport_2026';

let data: PassportData = { saved: [], visited: [] };

try {
  const stored = localStorage.getItem(KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    data = {
      saved: Array.isArray(parsed?.saved) ? parsed.saved : [],
      visited: Array.isArray(parsed?.visited) ? parsed.visited : []
    };
  }
} catch (e) {}

const listeners = new Set<() => void>();

function notify() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  listeners.forEach(l => l());
}

export const passport = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot() {
    return data;
  },
  add(slug: string) {
    if (!data.saved.includes(slug)) {
      data = { ...data, saved: [...data.saved, slug] };
      notify();
    }
  },
  remove(slug: string) {
    data = { 
      saved: data.saved.filter(s => s !== slug), 
      visited: data.visited.filter(s => s !== slug) 
    };
    notify();
  },
  markVisited(slug: string) {
    if (!data.visited.includes(slug)) {
      data = { ...data, visited: [...data.visited, slug] };
      notify();
    }
  },
  clearVisited() {
    data = { 
      saved: data.saved.filter(s => !data.visited.includes(s)), 
      visited: [] 
    };
    notify();
  },
  unmarkVisited(slug: string) {
    data = { ...data, visited: data.visited.filter(s => s !== slug) };
    notify();
  }
};

export function usePassport() {
  return useSyncExternalStore(passport.subscribe, passport.getSnapshot);
}
