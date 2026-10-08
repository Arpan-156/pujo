
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from '../lib/router';
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


const BURDWAN_SPOTS = [
  { id: 't1', name: 'Curzon Gate', type: 'Monument', lat: 23.2393, lon: 87.8631, desc: 'Historical gateway built in 1903' },
  { id: 't2', name: '108 Shiva Temple', type: 'Temple', lat: 23.2355, lon: 87.8931, desc: 'Nawab Hat, 108 distinct Shiva lingas' },
  { id: 't3', name: 'Krishnasayar Park', type: 'Park / Lake', lat: 23.2504, lon: 87.8542, desc: 'Beautiful lake dug by King Krishnachandra' },
  { id: 't4', name: 'Sarbamangala Temple', type: 'Temple', lat: 23.2424, lon: 87.8639, desc: 'Ancient temple of goddess Sarbamangala' },
  { id: 't5', name: 'Meghnad Saha Planetarium', type: 'Science / Museum', lat: 23.2483, lon: 87.8576, desc: 'Built by University of Burdwan' },
  { id: 't6', name: 'Burdwan Rajbari', type: 'Palace', lat: 23.2541, lon: 87.8504, desc: 'Palace of the Bardhaman Maharaja' }
];

export function PujaMap({ className = '', isHome = false }: { className?: string, isHome?: boolean }) {
  const mobile = useIsMobile();
  const { pujas } = useData();
  const { geo, requestPermission } = useGeo();
  const [sel, setSel] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  const [activePoiTypes, setActivePoiTypes] = useState<Set<POIType>>(new Set());
  const [poiLoading, setPoiLoading] = useState(false);
  const [mapObj, setMapObj] = useState<L.Map | null>(null);
  const [showPandals, setShowPandals] = useState(true);
  const [pois, setPois] = useState<POI[]>([]);

  // Auto-fetch POIs when location is available
  useEffect(() => {
    if (geo.status === 'success' && geo.lat && geo.lng && pois.length === 0) {
      let isMounted = true;
      const fetchInitial = async () => {
        setPoiLoading(true);
        const types: POIType[] = ['hospital', 'police', 'atm', 'toilets'];
        const fetched = await fetchPOIs(geo.lat!, geo.lng!, 3000, types);
        if (isMounted) {
          setPois(fetched);
          setActivePoiTypes(new Set(types));
          setPoiLoading(false);
        }
      };
      fetchInitial();
      return () => { isMounted = false; };
    }
  }, [geo.status, geo.lat, geo.lng]);


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
      ? `https://maps.google.com/maps/dir/?api=1&origin=${geo.lat},${geo.lng}&destination=${lat},${lng}`
      : `https://maps.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
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
        const center = mapObj ? mapObj.getCenter() : { lat: mapCenter[0], lng: mapCenter[1] };
        const lat = center.lat;
        const lng = center.lng;
        const fetched = await fetchPOIs(lat, lng, 3000, [type]);
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
        const center = mapObj ? mapObj.getCenter() : { lat: mapCenter[0], lng: mapCenter[1] };
        const lat = center.lat;
        const lng = center.lng;
        const fetched = await fetchPOIs(lat, lng, 3000, ['hospital', 'police', 'atm', 'toilets']);
          setPois(fetched);
      }
    }
  };

return (
    <>
      <style>{`
        .pmap-new-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }
        .pmap-map-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); background: #eee; z-index: 1; display: flex; flex-direction: column; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0); } /* Added hardware acceleration for iOS */
        .leaflet-container { flex: 1; width: 100%; background: #eee; }
        
        .leaflet-popup-content-wrapper { background: #fff; color: #000; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .leaflet-popup-tip { background: #fff; }
        
        .poi-bar { display: flex; gap: 8px; padding: 12px; background: rgba(20,8,9,0.9); border-bottom: 1px solid var(--line); overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none; }
        .poi-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 99px; border: 1px solid var(--line); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.85rem; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .poi-btn.active { border-color: var(--gold); background: rgba(233,181,88,0.1); color: var(--gold); }
        .poi-btn-color { width: 8px; height: 8px; border-radius: 50%; }

        @media (max-width: 900px) {
          .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; display: flex; flex-direction: column-reverse; gap: 20px; padding-top: calc(var(--safe-t) + 90px) !important; }
          .pmap-new-list { 
    height: 450px !important; 
    max-height: 50vh !important; 
    flex-direction: column !important; 
    overflow-y: auto !important; 
    overflow-x: hidden !important; 
    padding-bottom: 10px; 
    padding-right: 12px !important;
    border-top: 1px solid var(--line);
    padding-top: 16px;
  }
  
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
            
            <div className="pmap-card-mob" style={{ padding: '16px', background: 'rgba(20,8,9,0.5)', borderRadius: '12px', border: '1px solid var(--line)', marginBottom: '10px' }}>
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

            <div className="pmap-card-mob" style={{ marginBottom: '16px' }}>
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
                
                
                
                <div className="pmap-card-mob" key={p.slug} onClick={() => setSel(sel === p.slug ? null : p.slug)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isActive ? 'rgba(233,181,88,0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    padding: '16px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '16px' }}>
                     <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 600 }}><Link to={`/puja/${p.slug}`} style={{ color: isActive ? 'var(--gold)' : '#fff', textDecoration: 'none' }}>
                       {p.name} {hasCoords ? '' : <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>(No map pin)</span>}</Link>
                     </h4>
                     <div style={{ fontSize: '0.85rem', color: 'var(--mute)' }}>
                       {p.location}
                     </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {p.distance !== undefined && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {p.distance.toFixed(1)} km
                      </div>
                    )}
                    
                    {hasCoords && (
                      <a 
                        href={(geo.lat && geo.lng) ? `https://maps.google.com/maps/dir/?api=1&origin=${geo.lat},${geo.lng}&destination=${p.map!.lat},${p.map!.lng}` : `https://maps.google.com/maps/dir/?api=1&destination=${p.map!.lat},${p.map!.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(233,181,88,0.15)', color: 'var(--gold)', display: 'grid', placeContent: 'center', flexShrink: 0, textDecoration: 'none' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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

            {mapCenter && (<>
                <MapContainer ref={setMapObj}
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

                <button 
                  onClick={() => {
                    if (geo.status !== 'success') requestPermission();
                    if (geo.lat && geo.lng && mapObj) {
                      mapObj.flyTo([geo.lat, geo.lng], 16, { duration: 1.5 });
                    }
                  }}
                  title="Recenter on my location"
                  style={{ position: 'absolute', bottom: '24px', right: '16px', zIndex: 400, width: '48px', height: '48px', borderRadius: '50%', background: '#fff', color: '#1d4ed8', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', display: 'grid', placeContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M12 4a8 8 0 0 0-8 8"></path><path d="M12 20a8 8 0 0 0 8-8"></path><path d="M20 12a8 8 0 0 0-8-8"></path><path d="M4 12a8 8 0 0 0 8 8"></path></svg>
                </button>
              </>)}
          </div>
        </div>

        
        <div className="wrap" style={{ marginTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ color: 'var(--gold)', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontFamily: 'var(--f-display)' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 Nearby Pandals
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.4) 0%, rgba(15, 10, 10, 0.6) 100%)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                {validPujas.slice(0, isHome ? 4 : 6).map((p, i) => (
                   <div key={p.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                      <div style={{ flex: 1, paddingRight: '16px' }}>
                         <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>{p.name}</h4>
                         <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>{p.location}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                         {p.distance !== undefined && <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.distance.toFixed(1)} km</div>}
                         {geo.lat && geo.lng && (
                           <a 
                             href={`https://maps.google.com/maps/dir/?api=1&origin=${geo.lat},${geo.lng}&destination=${p.map!.lat},${p.map!.lng}`}
                             target="_blank" rel="noopener noreferrer"
                             style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(233,181,88,0.15)', color: 'var(--gold)', display: 'grid', placeContent: 'center', flexShrink: 0, textDecoration: 'none' }}
                           >
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                           </a>
                         )}
                      </div>
                   </div>
                ))}
              </div>

            </div>

            {!isHome && (<>
            <div style={{ background: 'linear-gradient(145deg, rgba(30, 20, 20, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                  <h3 style={{ color: 'var(--gold)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                     Essential Services
                  </h3>
                  <p style={{ color: 'var(--mute)', fontSize: '0.85rem', marginBottom: '16px' }}>Toggle categories on the map to find specific places. Here are the closest results:</p>
                  {pois.length > 0 ? (
                    pois.slice(0, 5).map(poi => (
                      <div key={poi.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', color: '#fff', textTransform: 'capitalize' }}>{poi.type}: {poi.name || 'Unnamed Location'}</h4>
                        <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>
                          {geo.lat && geo.lng ? getDistance(geo.lat!, geo.lng!, poi.lat, poi.lon).toFixed(1) + ' km away' : 'Distance unknown'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontStyle: 'italic', padding: '20px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                      Select "Hospital", "Police", or "ATM" on the map to see closest results here.
                    </div>
                  )}
                </div>

                
                  <div style={{ background: 'linear-gradient(145deg, rgba(20, 30, 20, 0.8) 0%, rgba(10, 15, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ color: '#10B981', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                       Visiting Spots
                    </h3>
                    <p style={{ color: 'var(--mute)', fontSize: '0.85rem', marginBottom: '16px' }}>Top attractions and heritage sites around Burdwan:</p>
                    
                    {BURDWAN_SPOTS.map(spot => {
                      const dist = (geo.lat && geo.lng) ? getDistance(geo.lat, geo.lng, spot.lat, spot.lon) : undefined;
                      return (
                        <div key={spot.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#fff' }}>{spot.name}</h4>
                            <div style={{ color: 'var(--mute)', fontSize: '0.8rem' }}>{spot.type} &bull; {spot.desc}</div>
                          </div>
                          {dist !== undefined && (
                            <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                              {dist.toFixed(1)} km
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>


                  <div style={{ background: 'linear-gradient(145deg, rgba(40, 10, 10, 0.8) 0%, rgba(15, 5, 5, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 100, 100, 0.2), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}></div>
                  <h3 style={{ color: '#ef4444', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                     Emergency Helplines
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Police Station</div>
                      <a href="tel:100" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>100</a>
                      <span style={{ color: 'var(--mute)', margin: '0 8px' }}>|</span>
                      <a href="tel:03422662495" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2662495</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Fire Brigade</div>
                      <a href="tel:101" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>101</a>
                      <span style={{ color: 'var(--mute)', margin: '0 8px' }}>|</span>
                      <a href="tel:03422662244" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2662244</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Medical College (BMCH)</div>
                      <a href="tel:03422558641" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2558641</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Women's Helpline & Child Helpline</div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="tel:1091" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>1091</a>
                        <a href="tel:1098" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>1098</a>
                      </div>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Ambulance</div>
                      <a href="tel:102" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>102</a>
                    </li>
                    <li style={{ marginBottom: '16px' }}>
                      <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>WBSEDCL Electricity Emergency</div>
                      <a href="tel:19121" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>19121</a>
                    </li>
                  </ul>
                  </div>
                </>)}
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
    <div className="pmap-map-container" style={{ height: '400px', marginTop: '20px', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
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




