
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
  status: 'idle' | 'loading' | 'success' | 'error';
  isManual: boolean;
}

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

// --- GLOBAL STATE ---
let globalGeo: GeoState = {
  active: false,
  lat: null,
  lng: null,
  error: null,
  area: 'Burdwan',
  status: 'idle',
  isManual: false
};

try {
  const saved = localStorage.getItem('pujo_geo');
  if (saved) globalGeo = JSON.parse(saved);
} catch(e) {}

const listeners = new Set<(s: GeoState) => void>();
let watcherId: number | null = null;

function emit(newState: GeoState) {
  globalGeo = newState;
  localStorage.setItem('pujo_geo', JSON.stringify(newState));
  listeners.forEach(l => l(newState));
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
      emit({
        active: true,
        lat: area.lat,
        lng: area.lng,
        error: null,
        area: area.name,
        status: 'success',
        isManual: true
      });
    }
  }, []);

  const requestPermission = useCallback(() => {
    if (!navigator.geolocation) {
      emit({ ...globalGeo, status: 'error', error: 'Geolocation not supported' });
      return;
    }
    
    emit({ ...globalGeo, status: 'loading', isManual: false });
    
    if (watcherId !== null) navigator.geolocation.clearWatch(watcherId);
    
    let lastEmitTime = 0;
    watcherId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = Date.now();
        
        
        if (globalGeo.status === 'loading') {
          emit({ ...globalGeo, status: 'success' });
        }


        // Throttle updates to UI components to prevent lag
        if (now - lastEmitTime < 2000 && globalGeo.lat && globalGeo.lng) {
           const dist = getDistance(globalGeo.lat, globalGeo.lng, latitude, longitude);
           if (dist < 0.002) {
             // Just update status to success without triggering a massive coordinate change
             emit({ ...globalGeo, active: true, status: 'success', isManual: false, error: null });
             return;
           }
        }
        
        lastEmitTime = now;
        emit({
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
        emit({ ...globalGeo, active: false, status: 'error', error: err.message, isManual: false });
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
  return 2 * R * Math.asin(Math.sqrt(a));
}
