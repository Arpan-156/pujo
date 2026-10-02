const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// We will overwrite the entire file with a robust React implementation
const newContent = `
import { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useData } from '../data/store';
import { useGeo, getDistance } from '../lib/geo';
import { Particles, Alpana, PujaScenario } from '../components/fx';
import { fetchPOIs, POI, POIType } from '../lib/overpass';

// Custom icons
const createPujaIcon = (isActive: boolean) => L.divIcon({
  className: 'custom-puja-marker',
  html: \`<div style="
    background: \${isActive ? 'var(--gold)' : '#fff'};
    width: \${isActive ? '24px' : '16px'};
    height: \${isActive ? '24px' : '16px'};
    border-radius: 50%;
    border: 3px solid \${isActive ? '#111' : 'var(--gold)'};
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
  "></div>\`,
  iconSize: isActive ? [24, 24] : [16, 16],
  iconAnchor: isActive ? [12, 12] : [8, 8]
});

const userIcon = L.divIcon({
  className: 'user-gps-marker',
  html: \`<div style="
    background: #3B82F6;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  "></div>\`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const poiIcon = (color: string) => L.divIcon({
  className: 'poi-marker',
  html: \`<div style="
    background: \${color};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  "></div>\`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const POI_COLORS: Record<POIType, string> = {
  police: '#2563EB',
  hospital: '#E11D48',
  pharmacy: '#7C3AED',
  restaurant: '#EA580C',
  cafe: '#B45309',
  toilets: '#0D9488',
  atm: '#059669'
};

function MapController({ center, zoom, userCoords }: { center: [number, number] | null; zoom: number; userCoords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);

  return null;
}

export function PujaMap({ className = '' }: { className?: string }) {
  const { pujas } = useData();
  const { geo, requestPermission } = useGeo();
  const [sel, setSel] = useState<string | null>(pujas[0]?.slug ?? null);
  
  const [activePoiTypes, setActivePoiTypes] = useState<Set<POIType>>(new Set());
  const [pois, setPois] = useState<POI[]>([]);

  // Calculate distances and sort all pujas
  const sortedPujas = useMemo(() => {
    return [...pujas].map(p => {
      let distance = Infinity;
      if (geo.lat && geo.lng && p.map?.lat && p.map?.lng) {
        distance = getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);
      }
      return { ...p, distance };
    }).sort((a, b) => {
      // Valid coordinates first
      const aValid = a.map?.lat != null;
      const bValid = b.map?.lat != null;
      if (aValid && !bValid) return -1;
      if (!aValid && bValid) return 1;
      // Then by distance
      return a.distance - b.distance;
    });
  }, [pujas, geo.lat, geo.lng]);

  const activePuja = sortedPujas.find(p => p.slug === sel) || sortedPujas[0];
  const validPujas = sortedPujas.filter(p => p.map?.lat != null);
  const mapCenter: [number, number] | null = activePuja?.map?.lat && activePuja?.map?.lng ? [activePuja.map.lat, activePuja.map.lng] : (validPujas[0]?.map?.lat && validPujas[0]?.map?.lng ? [validPujas[0].map.lat, validPujas[0].map.lng] : [23.2324, 87.8615]);

  const handleDirections = (lat: number, lng: number) => {
    const url = \`https://www.google.com/maps/dir/?api=1&destination=\${lat},\${lng}\`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const togglePoi = async (type: POIType) => {
    const next = new Set(activePoiTypes);
    if (next.has(type)) {
      next.delete(type);
      setActivePoiTypes(next);
      setPois(pois.filter(p => p.type !== type));
    } else {
      next.add(type);
      setActivePoiTypes(next);
      if (mapCenter) {
        const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 3000);
        const filtered = fetched.filter(p => p.type === type);
        setPois(prev => [...prev, ...filtered]);
      }
    }
  };

  return (
    <>
      <style>{\`
        .pmap-new-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }
        .pmap-map-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #111; z-index: 1; display: flex; flex-direction: column; }
        .leaflet-container { flex: 1; width: 100%; background: #111; }
        .leaflet-tile-pane { filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }
        .leaflet-popup-content-wrapper { background: #1a1a1a; color: #fff; border: 1px solid var(--line); border-radius: 8px; }
        .leaflet-popup-tip { background: #1a1a1a; }
        
        .poi-bar { display: flex; gap: 8px; padding: 12px; background: rgba(20,8,9,0.9); border-bottom: 1px solid var(--line); overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none; }
        .poi-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 99px; border: 1px solid var(--line); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.85rem; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .poi-btn.active { border-color: var(--gold); background: rgba(233,181,88,0.1); color: var(--gold); }
        .poi-btn-color { width: 8px; height: 8px; border-radius: 50%; }

        @media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column-reverse; }
          .pmap-new-list { max-height: 400px; overflow-y: auto; }
          .pmap-map-container { height: 500px; flex-shrink: 0; }
        }
      \`}</style>
      <section className={\`pmap \${className}\`} style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles kind="embers" count={45} />
        <div style={{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0.15, pointerEvents: 'none' }}><Alpana size={800} spin /></div>
        <PujaScenario />
        
        <div className="wrap pmap-new-grid" style={{ paddingTop: '20px', position: 'relative', zIndex: 10 }}>
          <aside className="pmap-new-list" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '12px', scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}>
            
            <div style={{ padding: '16px', background: 'rgba(20,8,9,0.5)', borderRadius: '12px', border: '1px solid var(--line)', marginBottom: '10px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: 'var(--gold-2)' }}>Location Services</h3>
              {geo.status === 'success' ? (
                <div style={{ color: '#4ADE80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80' }}></div>
                  GPS Active (Found {validPujas.length} valid locations)
                </div>
              ) : geo.status === 'error' ? (
                <div style={{ color: '#F87171', fontSize: '0.9rem', marginBottom: '10px' }}>
                  Location access denied or unavailable. ({geo.error})
                </div>
              ) : (
                <button onClick={requestPermission} style={{ background: 'var(--gold)', color: '#111', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                  {geo.status === 'loading' ? 'Locating...' : 'Use My Location'}
                </button>
              )}
            </div>
            
            {sortedPujas.map((p) => {
              const active = sel === p.slug;
              const hasCoords = p.map?.lat != null;
              let distStr = '';
              if (hasCoords && p.distance !== Infinity) {
                distStr = p.distance < 1 ? \`\${(p.distance * 1000).toFixed(0)}m away\` : \`\${p.distance.toFixed(1)}km away\`;
              }

              return (
                <div
                  key={p.slug}
                  onClick={() => setSel(p.slug)}
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    background: active ? 'rgba(233,181,88,0.12)' : 'rgba(255,255,255,0.02)',
                    border: \`1px solid \${active ? 'var(--gold)' : 'var(--line)'}\`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'visible',
                    opacity: hasCoords ? 1 : 0.6
                  }}
                >
                  {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: 'var(--gold)' }} />}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: active ? 'var(--gold-2)' : '#fff', fontFamily: 'var(--f-display)', fontWeight: 500, lineHeight: 1.5, paddingBottom: '8px' }}>
                      {p.name}
                    </h4>
                    {hasCoords ? (
                      distStr && <span style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(233,181,88,0.1)', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap', fontWeight: 600 }}>{distStr}</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--mute)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap' }}>Location Pending</span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.4 }}>{p.location}</p>
                  
                  {active && hasCoords && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDirections(p.map!.lat!, p.map!.lng!); }}
                      style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      Get Directions ?
                    </button>
                  )}
                </div>
              );
            })}
          </aside>
          
          <div className="pmap-map-container">
            <div className="poi-bar">
              <span style={{ fontSize: '0.85rem', color: 'var(--mute)', paddingRight: '8px', alignSelf: 'center' }}>Find Nearby:</span>
              {(['hospital', 'toilets', 'police', 'atm', 'restaurant'] as POIType[]).map(type => (
                <button 
                  key={type} 
                  className={\`poi-btn \${activePoiTypes.has(type) ? 'active' : ''}\`}
                  onClick={() => togglePoi(type)}
                >
                  <div className="poi-btn-color" style={{ background: POI_COLORS[type] }}></div>
                  <span style={{ textTransform: 'capitalize' }}>{type}</span>
                </button>
              ))}
            </div>

            {mapCenter && (
              <MapContainer 
                center={mapCenter} 
                zoom={14} 
                scrollWheelZoom={true} 
                style={{ flex: 1, width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController center={sel && activePuja?.map?.lat ? mapCenter : null} zoom={16} userCoords={geo.lat && geo.lng ? [geo.lat, geo.lng] : null} />
                
                {geo.status === 'success' && geo.lat && geo.lng && (
                  <Marker position={[geo.lat, geo.lng]} icon={userIcon}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {pois.map(poi => (
                  <Marker key={\`\${poi.type}-\${poi.id}\`} position={[poi.lat, poi.lon]} icon={poiIcon(POI_COLORS[poi.type])}>
                    <Popup>
                      <strong style={{ textTransform: 'capitalize', color: POI_COLORS[poi.type] }}>{poi.type}</strong><br/>
                      {poi.name}
                    </Popup>
                  </Marker>
                ))}

                {validPujas.map(p => (
                  <Marker 
                    key={p.slug} 
                    position={[p.map!.lat!, p.map!.lng!]} 
                    icon={createPujaIcon(sel === p.slug)}
                    eventHandlers={{ click: () => setSel(p.slug) }}
                  >
                    <Popup>
                      <strong style={{ color: 'var(--gold-2)' }}>{p.name}</strong><br/>
                      {p.location}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function MiniMap({ name, lat, lng }: { x: number; y: number; name: string; lat?: number; lng?: number }) {
  if (!lat || !lng) {
    const mapQuery = encodeURIComponent(\`\${name} Durga Puja, Bardhaman\`);
    return (
      <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
        <iframe width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)' }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={\`https://maps.google.com/maps?q=\${mapQuery}&t=m&z=16&output=embed&iwloc=near\`} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 }}>
      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={L.divIcon({ className: 'custom-puja-marker', html: \`<div style="background: var(--gold); width: 20px; height: 20px; border-radius: 50%; border: 3px solid #111;"></div>\`, iconSize: [20, 20] })} />
      </MapContainer>
    </div>
  );
}
`;
fs.writeFileSync('src/sections/PujaMap.tsx', newContent, 'utf8');
