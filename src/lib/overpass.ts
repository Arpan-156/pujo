export type POIType = 'police' | 'hospital' | 'pharmacy' | 'restaurant' | 'cafe' | 'toilets' | 'atm';

export interface POI {
  id: number;
  lat: number;
  lon: number;
  type: POIType;
  name: string;
}

export async function fetchPOIs(lat: number, lng: number, radiusMeters: number): Promise<POI[]> {
  const query = `
    [out:json];
    (
      node["amenity"="police"](around:${radiusMeters},${lat},${lng});
      node["amenity"="hospital"](around:${radiusMeters},${lat},${lng});
      node["amenity"="pharmacy"](around:${radiusMeters},${lat},${lng});
      node["amenity"="restaurant"](around:${radiusMeters},${lat},${lng});
      node["amenity"="cafe"](around:${radiusMeters},${lat},${lng});
      node["amenity"="toilets"](around:${radiusMeters},${lat},${lng});
      node["amenity"="atm"](around:${radiusMeters},${lat},${lng});
    );
    out body;
  `;
  
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    const data = await res.json();
    
    return data.elements.map((el: any) => ({
      id: el.id,
      lat: el.lat,
      lon: el.lon,
      type: el.tags.amenity as POIType,
      name: el.tags.name || el.tags.operator || el.tags.amenity
    }));
  } catch (err) {
    console.error('Overpass error', err);
    return [];
  }
}
