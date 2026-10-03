export type POIType = 'police' | 'hospital' | 'pharmacy' | 'restaurant' | 'cafe' | 'toilets' | 'atm';

export interface POI {
  id: number;
  lat: number;
  lon: number;
  type: POIType;
  name: string;
}

export async function fetchPOIs(lat: number, lng: number, radiusMeters: number, types: POIType[] = ['hospital', 'police', 'atm', 'toilets']): Promise<POI[]> {
  const nodes = types.map(t => `node["amenity"="${t}"](around:${radiusMeters},${lat},${lng});`).join('\n      ');
  const query = `
    [out:json][timeout:10];
    (
      ${nodes}
    );
    out center; // out center calculates the center of ways/relations instantly
  `;
  
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    
      if (!res.ok) { console.error('Overpass error', res.status); return []; }
      const data = await res.json();
      if (!data || !data.elements) return [];
      
      return data.elements.map((el: any) => ({

      id: el.id,
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,
      type: el.tags.amenity as POIType,
      name: el.tags.name || el.tags.operator || el.tags.amenity
    }));
  } catch (err) {
    console.error('Overpass error', err);
    return [];
  }
}
