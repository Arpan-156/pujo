export type POIType = 'police' | 'hospital' | 'pharmacy' | 'cafe' | 'toilets' | 'atm';

export interface POI {
  id: number;
  lat: number;
  lon: number;
  type: POIType;
  name: string;
}

const tagMap: Record<POIType, string> = {
  police: '"amenity"="police"',
  hospital: '"amenity"="hospital"',
  pharmacy: '"amenity"="pharmacy"',
  cafe: '"amenity"="cafe"',
  toilets: '"amenity"="toilets"',
  atm: '"amenity"="atm"'
};

export async function fetchPOIs(lat: number, lng: number, radiusMeters: number, types: POIType[] = ['hospital', 'police', 'atm', 'toilets']): Promise<POI[]> {
  const nodes = types.map(t => `nwr[${tagMap[t]}](around:${radiusMeters},${lat},${lng});`).join('\n      ');
  const query = `
    [out:json][timeout:15];
    (
      ${nodes}
    );
    out center;
  `;
  
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    
    if (!res.ok) { console.error('Overpass error', res.status); return []; }
    const data = await res.json();
    if (!data || !data.elements) return [];
      
    return data.elements.map((el: any) => {
      let resolvedType = 'unknown';
      if (el.tags.amenity) resolvedType = el.tags.amenity;
      

      return {
        id: el.id,
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        type: resolvedType as POIType,
        name: el.tags.name || el.tags.operator || resolvedType
      };
    });
  } catch (err) {
    console.error('Overpass error', err);
    return [];
  }
}
