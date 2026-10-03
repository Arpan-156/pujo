import { PUJAS } from '../data/pujas';

import { useState, useEffect, useCallback } from 'react';

export const AREAS = [
  { name: 'Kalibazar', lat: 23.235, lng: 87.855 },
  { name: 'Sripally', lat: 23.232, lng: 87.861 },
  { name: 'Nutanpally', lat: 23.238, lng: 87.864 },
  { name: 'Ichlabad', lat: 23.239, lng: 87.872 },
  { name: 'Baranilpur', lat: 23.225, lng: 87.875 },
  { name: 'Sadarghat', lat: 23.220, lng: 87.865 },
  { name: 'Borehat', lat: 23.242, lng: 87.848 },
  { name: 'Khosbagan', lat: 23.240, lng: 87.852 },
  { name: 'Town Hall', lat: 23.245, lng: 87.859 },
  { name: 'Police Line', lat: 23.250, lng: 87.861 },
  { name: 'Mehedibagan', lat: 23.255, lng: 87.865 }
];

export interface GeoState {
  active: boolean;
  lat: number | null;
  lng: number | null;
  error: string | null;
  area: string;
    distances?: Record<string, number>;
    status: 'idle' | 'loading' | 'success' | 'error';
  isManual: boolean;
}

// Synchronous fallback for instant UI
const getNearestArea = (lat: number, lng: number) => {
  let nearest = 'Burdwan';
  let minDist = Infinity;
  for (const a of AREAS) {
    const d = getDistance(lat, lng, a.lat, a.lng);
    if (d < minDist) {
      minDist = d;
      nearest = a.name;
    }
  }
  if (minDist > 15) {
    return 'Your Location';
  }
  return nearest;
};

// Async reverse geocoding to get actual city/suburb worldwide
async function fetchExactLocationName(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.address?.neighbourhood || data.address?.suburb || data.address?.village || data.address?.town || data.address?.city || data.address?.county || null;
  } catch(e) {
    return null;
  }
};

// --- GLOBAL STATE ---
let globalGeo: GeoState = {
  active: false,
  lat: null,
  lng: null,
  error: null,
  area: 'Burdwan',
  status: 'idle',
    distances: {},
    isManual: false
  };

try {
  const saved = localStorage.getItem('pujo_geo');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.isManual) {
      globalGeo = parsed;
    } else {
      // Don't use stale GPS coordinates from a previous session!
      globalGeo = { ...globalGeo, isManual: false, status: 'idle', active: false, lat: null, lng: null };
    }
  }
} catch(e) {}

const listeners = new Set<(s: GeoState) => void>();
let watcherId: number | null = null;

function emit(newState: GeoState) {
  globalGeo = newState;
  localStorage.setItem('pujo_geo', JSON.stringify(newState));
  listeners.forEach(l => l(newState));
}


// OSRM Matrix API for real-world road distances
let matrixLock = false;
async function fetchDistanceMatrix(lat: number, lng: number) {
  if (matrixLock) return;
  matrixLock = true;
  try {
    const validPujas = PUJAS || [];
    if (validPujas.length === 0) return;
    
    // OSRM accepts: lon,lat;lon,lat;...
    let coords = `${lng},${lat}`;
    const slugs = [];
    
    for (const p of validPujas) {
      if (p.map?.lat && p.map?.lng) {
        coords += `;${p.map.lng},${p.map.lat}`;
        slugs.push(p.slug);
      }
    }
    
    const res = await fetch(`https://router.project-osrm.org/table/v1/walking/${coords}?sources=0`);
    if (!res.ok) return;
    const data = await res.json();
    
    if (data.distances && data.distances[0]) {
      const dists: Record<string, number> = {};
      const sourceToAll = data.distances[0]; 
      for (let i = 0; i < slugs.length; i++) {
        if (sourceToAll[i + 1] !== null) {
          dists[slugs[i]] = sourceToAll[i + 1] / 1000; // convert meters to km
        }
      }
      globalGeo = { ...globalGeo, distances: dists };
      emit(globalGeo);
    }
  } catch(e) {
    console.error('OSRM Matrix failed', e);
  } finally {
    matrixLock = false;
  }
}

export function useGeo() {
  const [geo, setGeo] = useState<GeoState>(globalGeo);

  useEffect(() => {
    listeners.add(setGeo);
    
    // Automatically ask for location access on mount
    if (globalGeo.status === 'idle' && !globalGeo.isManual) {
      requestPermission();
    }
    
    return () => { listeners.delete(setGeo); };
  }, []);

  const setManualLocation = useCallback((areaName: string) => {
    const area = AREAS.find(a => a.name === areaName);
    if (area) {
      if (watcherId !== null) { navigator.geolocation.clearWatch(watcherId); watcherId = null; }
      globalGeo = {
        active: true,
        lat: area.lat,
        lng: area.lng,
        error: null,
        area: area.name,
        status: 'success',
        isManual: true
      };
      localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
      emit(globalGeo);
    }
  }, []);

  const requestPermission = useCallback(() => {
    if (!navigator.geolocation) {
      globalGeo = { ...globalGeo, status: 'error', error: 'Geolocation not supported' };
      emit(globalGeo);
      return;
    }
    
    globalGeo = { ...globalGeo, status: 'loading', isManual: false };
      emit(globalGeo);
    
    if (watcherId !== null) navigator.geolocation.clearWatch(watcherId);
    
    let lastEmitTime = 0;
    watcherId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const now = Date.now();
        
        // If we already have a lock, ignore very coarse cell-tower jumps
        if (globalGeo.status === 'success' && accuracy && accuracy > 2000) {
          return; 
        }

        const isInitialLock = globalGeo.status !== 'success';
        
        // Throttle updates strictly to prevent React re-render lag (unless it's the very first lock)
        if (!isInitialLock && now - lastEmitTime < 2000) {
          return;
        }
        
        lastEmitTime = now;
        
        const syncArea = getNearestArea(latitude, longitude);

        // Keep existing globalGeo area if it was already fetched via Nominatim, otherwise use syncArea
        const newArea = (globalGeo.area && globalGeo.area !== 'Your Location' && globalGeo.area !== 'Outside Burdwan' && globalGeo.area !== 'Burdwan' && !AREAS.some(a => a.name === globalGeo.area)) ? globalGeo.area : syncArea;
        
        globalGeo = {
          ...globalGeo,
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: newArea,
          status: 'success',
          isManual: false
        };
        
        localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
        emit(globalGeo);

        // Always fetch exact real-world location name lazily for maximum accuracy
        fetchDistanceMatrix(latitude, longitude);
        fetchExactLocationName(latitude, longitude).then(realName => {
          if (realName && globalGeo.lat === latitude && globalGeo.lng === longitude && globalGeo.area !== realName) {
            globalGeo = { ...globalGeo, area: realName };
            localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
            emit(globalGeo);
          }
        });
      },
      (err) => {
        globalGeo = { ...globalGeo, active: false, status: 'error', error: err.message, isManual: false };
        emit(globalGeo);
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    );
  }, []);

  return { geo, requestPermission, setManualLocation, AREAS };
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const p = Math.PI / 180;
  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + 
            Math.cos(lat1 * p) * Math.cos(lat2 * p) * 
            (1 - Math.cos((lon2 - lon1) * p)) / 2;
  const straightLineDist = 2 * R * Math.asin(Math.sqrt(a));
    // Multiply by a tortuosity factor (1.4) to approximate actual walking/road distance rather than straight-line (crow-flies)
    return straightLineDist * 1.4;
}
