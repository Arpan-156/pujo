
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
        map.flyTo(center, zoom, { duration: 1.5, animate: true });
      }
    }, [center?.[0], center?.[1], zoom, map]);

  return null;
}


const RecenterControl = ({ center, userCoords }: { center: [number, number], userCoords: [number, number] | null }) => {
  const map = useMap();
  return (
    <div className="leaflet-top leaflet-right" style={{ zIndex: 1000, pointerEvents: 'none' }}>
      <div className="leaflet-control leaflet-bar" style={{ margin: '10px', pointerEvents: 'auto' }}>
        <button 
          onClick={(e) => { e.preventDefault(); map.flyTo(userCoords || center, 15, { animate: true, duration: 1.5 }); }}
          style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: 'none', cursor: 'pointer', color: '#000', borderRadius: '4px', boxShadow: '0 1px 5px rgba(0,0,0,0.65)' }}
          title="Recenter Map"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
        </button>
      </div>
    </div>
  );
};

export function PujaMap({ className = '' }: { className?: string }) {
  const mobile = useIsMobile();
  const { pujas } = useData();
  const { geo, requestPermission } = useGeo();
  const [sel, setSel] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
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

  const filteredPujas = sortedPujas.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.area.toLowerCase().includes(search.toLowerCase()));
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
      setPois(prev => prev.filter(p => p.type !== type));
    } else {
      next.add(type);
      setActivePoiTypes(next);
      if (mapCenter) {
        const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 5000, [type]);
          setPois(prev => [...prev, ...fetched]);
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
        const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 5000, ['hospital', 'police', 'atm', 'toilets']);
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
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column-reverse; gap: 20px; padding-top: calc(var(--safe-t) + 90px) !important; }
          .pmap-new-list { height: auto !important; max-height: none !important; overflow-y: visible !important; flex: none !important; }
          /* Fixed pixel height prevents aggressive layout shifting (jumping) when mobile browser address bar hides/shows */
          .pmap-map-container { height: 420px; flex-shrink: 0; }
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

            <div style={{ marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder="Search Pandals..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              />
            </div>

            {filteredPujas.map((p) => {
              const isActive = sel === p.slug;
              const hasCoords = p.map?.lat != null;
              
              return (
                <div
                  key={p.slug}
                  onClick={() => setSel(sel === p.slug ? null : p.slug)}
                  style={{
                    background: isActive ? 'rgba(233,181,88,0.1)' : 'transparent',
                    border: isActive ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                    padding: '16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: isActive ? 'var(--gold)' : '#fff' }}>
                    {p.name} {hasCoords ? '' : <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>(No map pin)</span>}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--mute)', marginBottom: '12px' }}>
                    {p.location}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {p.distance !== undefined && (
                      <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                        {(p.distance * 1000).toFixed(0)}m away
                      </div>
                    )}
                    
                    {hasCoords && (
                      <a 
                        href={(geo.lat && geo.lng) ? `https://www.google.com/maps/dir/?api=1&origin=${geo.lat},${geo.lng}&destination=${p.map!.lat},${p.map!.lng}` : `https://www.google.com/maps/dir/?api=1&destination=${p.map!.lat},${p.map!.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: 'var(--gold)', color: '#1a0b0c', padding: '8px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3)' }}
                      >
                        Get Directions
                      </a>
                    )}
                  </div>
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
                  attribution='&copy; Google Maps'
                  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
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
                    eventHandlers={{ click: () => setSel(sel === p.slug ? null : p.slug) }}
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
          attribution='&copy; Google Maps'
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
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
