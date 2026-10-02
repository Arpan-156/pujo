const fs = require('fs');
let code = `import { useState, useEffect, useCallback } from 'react';

export interface GeoState {
  active: boolean;
  lat: number | null;
  lng: number | null;
  error: string | null;
  area: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export function useGeo() {
  const [geo, setGeo] = useState<GeoState>({
    active: false,
    lat: null,
    lng: null,
    error: null,
    area: 'Unknown',
    status: 'idle'
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

  const requestPermission = useCallback(() => {
    if (!navigator.geolocation) {
      setGeo(g => ({ ...g, status: 'error', error: 'Geolocation not supported' }));
      return;
    }
    setGeo(g => ({ ...g, status: 'loading' }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGeo({
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: getNearestArea(latitude, longitude),
          status: 'success'
        });
      },
      (err) => {
        setGeo(g => ({ ...g, active: false, status: 'error', error: err.message }));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'granted') {
          requestPermission();
        }
      });
    }
  }, [requestPermission]);

  return { geo, requestPermission };
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
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed geo.ts');
