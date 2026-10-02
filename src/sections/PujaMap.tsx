
import { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useData } from '../data/store';
import { useGeo, getDistance } from '../lib/geo';
import { Particles, Alpana, PujaScenario } from '../components/fx';
import { useIsMobile } from '../lib/motion';
import { fetchPOIs, POI, POIType } from '../lib/overpass';

// Custom icons
const activePujaIcon = L.divIcon({
  className: 'custom-puja-marker',
  html: `<div style="background: #facc15; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #111; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: all 0.3s ease;"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const inactivePujaIcon = L.divIcon({
  className: 'custom-puja-marker',
  html: `<div style="background: #eab308; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #ca8a04; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: all 0.3s ease;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const userIcon = L.divIcon({
  className: 'user-gps-marker',
  html: `<div style="
    background: #3B82F6;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const poiIconCache: Record<string, L.DivIcon> = {};
const getPoiIcon = (color: string) => {
  if (!poiIconCache[color]) {
    poiIconCache[color] = L.divIcon({
      className: 'poi-marker',
      html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }
  return poiIconCache[color];
};

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
  const mobile = useIsMobile();
  const { pujas } = useData();
  const { geo, requestPermission } = useGeo();
  const [sel, setSel] = useState<string | null>(null);
  
  const [activePoiTypes, setActivePoiTypes] = useState<Set<POIType>>(new Set());
  const [showPandals, setShowPandals] = useState(true);
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

  const activePuja = sortedPujas.find(p => p.slug === sel);
  const validPujas = sortedPujas.filter(p => p.map?.lat != null);
  const mapCenter: [number, number] = activePuja?.map?.lat && activePuja?.map?.lng ? [activePuja.map.lat, activePuja.map.lng] : [23.2324, 87.8615];

  const handleDirections = (lat: number, lng: number) => {
    const url = geo.lat && geo.lng 
      ? `https://www.google.com/maps/dir/?api=1&origin=${geo.lat},${geo.lng}&destination=${lat},${lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
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

    const toggleAll = async () => {
    if (activePoiTypes.size === 4 && showPandals) {
      setActivePoiTypes(new Set());
      setShowPandals(false);
      setPois([]);
    } else {
      setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm']));
      setShowPandals(true);
      if (mapCenter) {
        const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 3000);
        setPois(fetched);
      }
    }
  };

return (
    <>
      <style>{`
        .pmap-new-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }
        .pmap-map-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #eee; z-index: 1; display: flex; flex-direction: column; }
        .leaflet-container { flex: 1; width: 100%; background: #eee; }
        
        .leaflet-popup-content-wrapper { background: #fff; color: #000; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .leaflet-popup-tip { background: #fff; }
        
        .poi-bar { display: flex; gap: 8px; padding: 12px; background: rgba(20,8,9,0.9); border-bottom: 1px solid var(--line); overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none; }
        .poi-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 99px; border: 1px solid var(--line); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.85rem; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .poi-btn.active { border-color: var(--gold); background: rgba(233,181,88,0.1); color: var(--gold); }
        .poi-btn-color { width: 8px; height: 8px; border-radius: 50%; }

        @media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column-reverse; }
          .pmap-new-list { height: 450px !important; max-height: 50vh !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch; flex: none !important; }
          .pmap-map-container { height: 500px; flex-shrink: 0; }
        }
      `}</style>
      <section className={`pmap ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
        {!mobile && (
          <>
            <Particles kind="embers" count={45} />
            <div style={{ position: 'absolute', right: '-20%', top: '-10%', opacity: 0.15, pointerEvents: 'none' }}><Alpana size={800} spin /></div>
            <PujaScenario />
          </>
        )}
        
        <div className="wrap pmap-new-grid" style={{ paddingTop: '20px', position: 'relative', zIndex: 10 }}>
          <aside className="pmap-new-list" style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', WebkitOverflowScrolling: 'touch', flexDirection: 'column', gap: '10px', paddingRight: '12px', scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}>
            
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
                <button onClick={requestPermission} style={{ background: "#e11d48", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "999px", cursor: "pointer", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "1.05rem", fontFamily: "inherit" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {geo.status === 'loading' ? 'Locating...' : 'Use My Location'}
                </button>
              )}
            </div>
            
            {sortedPujas.map((p) => {
              const active = sel === p.slug;
              const hasCoords = p.map?.lat != null;
              let distStr = '';
              if (hasCoords && p.distance !== Infinity) {
                distStr = p.distance < 1 ? `${(p.distance * 1000).toFixed(0)}m away` : `${p.distance.toFixed(1)}km away`;
              }

              return (
                <div
                  key={p.slug}
                  onClick={() => setSel(p.slug)}
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    background: active ? 'rgba(233,181,88,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--line)'}`,
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
                      Get Directions
                    </button>
                  )}
                </div>
              );
            })}
          </aside>
          
          <div className="pmap-map-container">
            <div className="poi-bar">
              <span style={{ fontSize: '0.85rem', color: 'var(--mute)', paddingRight: '8px', alignSelf: 'center' }}>Find Nearby:</span>
              <button className={`poi-btn ${activePoiTypes.size === 4 && showPandals ? 'active' : ''}`} onClick={toggleAll}>All</button>
              <button className={`poi-btn ${showPandals ? 'active' : ''}`} onClick={() => setShowPandals(!showPandals)}><div className="poi-btn-color" style={{ background: '#eab308' }}></div>Pandals</button>
              {(['hospital', 'toilets', 'police', 'atm'] as POIType[]).map(type => (
                <button 
                  key={type} 
                  className={`poi-btn ${activePoiTypes.has(type) ? 'active' : ''}`}
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
                <MapController center={mapCenter} zoom={sel ? 16 : 14} userCoords={geo.lat && geo.lng ? [geo.lat, geo.lng] : null} />
                
                {geo.status === 'success' && geo.lat && geo.lng && (
                  <Marker position={[geo.lat, geo.lng]} icon={userIcon}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {pois.map(poi => (
                  <Marker key={`${poi.type}-${poi.id}`} position={[poi.lat, poi.lon]} icon={getPoiIcon(POI_COLORS[poi.type])}>
                    <Popup>
                      <strong style={{ textTransform: 'capitalize', color: POI_COLORS[poi.type] }}>{poi.type}</strong><br/>
                      {poi.name}
                    </Popup>
                  </Marker>
                ))}

                {showPandals && validPujas.map(p => (
                  <Marker 
                    key={p.slug} 
                    position={[p.map!.lat!, p.map!.lng!]} 
                    icon={sel === p.slug ? activePujaIcon : inactivePujaIcon}
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

export function MiniMap({ name, lat, lng }: { x?: number; y?: number; name: string; lat?: number; lng?: number }) {
  const mapQuery = lat && lng ? `${lat},${lng}` : encodeURIComponent(`${name} Durga Puja, Bardhaman`);

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        loading="lazy" 
        allowFullScreen 
        referrerPolicy="no-referrer-when-downgrade" 
        src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
    </div>
  );
}


export function RouteMap({ route }: { route: any }) {
  if (!route || !route.pandals || route.pandals.length === 0) return null;
  const mapCenter = [route.pandals[0].lat, route.pandals[0].lng] as [number, number];
  return (
    <div className="pmap-map-container" style={{ height: '400px', marginTop: '20px' }}>
      <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%', background: '#eee' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route.pandals.map((p: any, i: number) => {
          if (!p.lat || !p.lng) return null;
          return (
            <Marker key={i} position={[p.lat, p.lng]} icon={activePujaIcon}>
              <Popup>
                <strong>{p.name}</strong><br/>
                {i + 1}. {p.transit}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
