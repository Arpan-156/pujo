const fs = require('fs');

let geoTs = `import { useState, useEffect, useCallback } from 'react';

export interface GeoState {
  active: boolean;
  lat: number | null;
  lng: number | null;
  error: string | null;
  area: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  isManual: boolean;
}

export function useGeo() {
  const [geo, setGeo] = useState<GeoState>(() => {
    // Try to load from localStorage first
    try {
      const saved = localStorage.getItem('pujo_geo');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      active: false,
      lat: null,
      lng: null,
      error: null,
      area: 'Unknown',
      status: 'idle',
      isManual: false
    };
  });

  const AREAS = [
    { name: 'Kalibazar', lat: 23.2347, lng: 87.8768 },
    { name: 'Curzon Gate', lat: 23.2384, lng: 87.8631 },
    { name: 'Sripally', lat: 23.2300, lng: 87.8630 },
    { name: 'Rathtala', lat: 23.2397, lng: 87.8336 },
    { name: 'Natunganj', lat: 23.2378, lng: 87.8490 },
    { name: 'Khosbagan', lat: 23.2420, lng: 87.8650 },
    { name: 'Burdwan Station', lat: 23.2312, lng: 87.8710 },
  ];

  const saveState = (newState: GeoState) => {
    setGeo(newState);
    localStorage.setItem('pujo_geo', JSON.stringify(newState));
  };

  const getNearestArea = (lat: number, lng: number) => {
    let nearest = 'Burdwan';
    let minDist = Infinity;
    for (const a of AREAS) {
      const d = Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2);
      if (d < minDist) {
        minDist = d;
        nearest = a.name;
      }
    }
    return nearest;
  };

  const setManualLocation = (areaName: string) => {
    const area = AREAS.find(a => a.name === areaName);
    if (area) {
      saveState({
        active: true,
        lat: area.lat,
        lng: area.lng,
        error: null,
        area: area.name,
        status: 'success',
        isManual: true
      });
    }
  };

  const requestPermission = useCallback(() => {
    if (!navigator.geolocation) {
      setGeo(g => ({ ...g, status: 'error', error: 'Geolocation not supported' }));
      return;
    }
    setGeo(g => ({ ...g, status: 'loading', isManual: false }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        saveState({
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: getNearestArea(latitude, longitude),
          status: 'success',
          isManual: false
        });
      },
      (err) => {
        setGeo(g => ({ ...g, active: false, status: 'error', error: err.message, isManual: false }));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (navigator.permissions && geo.status === 'idle' && !geo.isManual) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'granted') {
          requestPermission();
        }
      });
    }
  }, [requestPermission, geo.status, geo.isManual]);

  return { geo, requestPermission, setManualLocation, AREAS };
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const p = Math.PI / 180;
  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + 
            Math.cos(lat1 * p) * Math.cos(lat2 * p) * 
            (1 - Math.cos((lon2 - lon1) * p)) / 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
`;

fs.writeFileSync('src/lib/geo.ts', geoTs, 'utf8');
console.log('Updated geo.ts for manual location');
