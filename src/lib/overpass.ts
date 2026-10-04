export type POIType = 'police' | 'hospital' | 'pharmacy' | 'cafe' | 'toilets' | 'atm';

export interface POI {
  id: number;
  lat: number;
  lon: number;
  type: POIType;
  name: string;
}

// Hardcoded instantly-loading POIs for Burdwan to prevent slow API calls
const BURDWAN_POIS: POI[] = [
  // Hospitals
  { id: 101, lat: 23.2325, lon: 87.8542, type: 'hospital', name: 'Burdwan Medical College & Hospital' },
  { id: 102, lat: 23.2458, lon: 87.8683, type: 'hospital', name: 'Anamayan Hospital' },
  { id: 103, lat: 23.2389, lon: 87.8651, type: 'hospital', name: 'Burdwan Nursing Home' },
  { id: 104, lat: 23.2392, lon: 87.8593, type: 'hospital', name: 'KINS Hospital' },
  { id: 105, lat: 23.2501, lon: 87.8488, type: 'hospital', name: 'Sanjibani Hospital' },
  
  // Police
  { id: 201, lat: 23.2435, lon: 87.8643, type: 'police', name: 'Burdwan Police Station' },
  { id: 202, lat: 23.2301, lon: 87.8521, type: 'police', name: 'Sadar Ghat Police Station' },
  { id: 203, lat: 23.2562, lon: 87.8519, type: 'police', name: 'Golabagh Police Outpost' },
  
  // ATMs
  { id: 301, lat: 23.2394, lon: 87.8633, type: 'atm', name: 'SBI ATM (Curzon Gate)' },
  { id: 302, lat: 23.2481, lon: 87.8665, type: 'atm', name: 'HDFC Bank ATM (Station Rd)' },
  { id: 303, lat: 23.2355, lon: 87.8591, type: 'atm', name: 'Axis Bank ATM (GT Road)' },
  { id: 304, lat: 23.2520, lon: 87.8505, type: 'atm', name: 'PNB ATM (University Area)' },
  
  // Toilets (Public)
  { id: 401, lat: 23.2401, lon: 87.8625, type: 'toilets', name: 'Curzon Gate Public Toilet' },
  { id: 402, lat: 23.2475, lon: 87.8671, type: 'toilets', name: 'Railway Station Public Toilet' },
  { id: 403, lat: 23.2330, lon: 87.8533, type: 'toilets', name: 'BMCH Public Toilet' }
];

export async function fetchPOIs(lat: number, lng: number, radiusMeters: number, types: POIType[]): Promise<POI[]> {
  // Return instant hardcoded data filtered by requested types to eliminate load times
  return new Promise((resolve) => {
    const filtered = BURDWAN_POIS.filter(poi => types.includes(poi.type));
    
    // Simulate a tiny 50ms delay just so the UI transitions smoothly
    setTimeout(() => {
      resolve(filtered);
    }, 50);
  });
}
