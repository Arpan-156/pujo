const fs = require('fs');

const code = `import { useData } from '../data/store';
import { useGeo } from '../lib/geo';
import { GeoBar } from '../components/GeoBar';
import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchPOIs, POI, POIType } from '../lib/overpass';

// Define colors and SVGs for each type
const TYPES: Record<string, { color: string, label: string, svg: string }> = {
  you: { color: '#3b82f6', label: 'You', svg: '<circle cx="12" cy="12" r="6" fill="#fff"/>' },
  pandal: { color: '#ef4444', label: 'Pandal', svg: '<path d="M12 2L2 22h20L12 2zm0 5l5 13H7l5-13z" fill="#fff"/>' },
  police: { color: '#2563eb', label: 'Police', svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#fff"/>' },
  atm: { color: '#10b981', label: 'ATM', svg: '<rect x="2" y="6" width="20" height="12" rx="2" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#10b981"/>' },
  hospital: { color: '#f43f5e', label: 'Hospital', svg: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="#fff"/>' },
  pharmacy: { color: '#8b5cf6', label: 'Pharmacy', svg: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM13 13h2v2h-2v2h-2v-2H9v-2h2v-2h2v2z" fill="#fff"/>' },
  restaurant: { color: '#ea580c', label: 'Restaurant', svg: '<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" fill="#fff"/>' },
  cafe: { color: '#f59e0b', label: 'Cafe', svg: '<path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" fill="#fff"/>' },
  toilets: { color: '#14b8a6', label: 'Toilet', svg: '<path d="M14 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3 8v8h-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8H3v-8c0-2.21 1.79-4 4-4h.5l.5-2.5c.2-.95.96-1.5 1.83-1.5h1.34c.87 0 1.63.55 1.83 1.5l.5 2.5H14c2.21 0 4 1.79 4 4v8h-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8h-2v-8c0-1.1-.9-2-2-2z" fill="#fff"/>' }
};

const createIcon = (type: string) => {
  const conf = TYPES[type] || TYPES.pandal;
  return L.divIcon({
    className: 'custom-poi-icon',
    html: \`<div style="background: \${conf.color}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><svg width="16" height="16" viewBox="0 0 24 24">\${conf.svg}</svg></div>\`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function PujaMap({ className = '' }: { className?: string }) {
  const { pujas } = useData();
  const [q, setQ] = useState('');
  const [radius, setRadius] = useState(5);
  const { geo } = useGeo();
  
  const [pois, setPois] = useState<POI[]>([]);
  const [loadingPois, setLoadingPois] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['pandal', 'police', 'hospital', 'pharmacy', 'restaurant', 'cafe', 'toilets', 'atm']));

  const baseLat = geo.lat || 23.2348;
  const baseLng = geo.lng || 87.8767;

  useEffect(() => {
    if (geo.status === 'success') {
      setLoadingPois(true);
      fetchPOIs(baseLat, baseLng, radius * 1000).then(data => {
        setPois(data);
        setLoadingPois(false);
      });
    }
  }, [geo.status, baseLat, baseLng, radius]);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const isAll = activeFilters.size === Object.keys(TYPES).length - 1;
  const toggleAll = () => {
    if (isAll) setActiveFilters(new Set(['pandal']));
    else setActiveFilters(new Set(Object.keys(TYPES).filter(t => t !== 'you')));
  };

  const filteredPujas = pujas.filter(p => p.lat && p.lng && activeFilters.has('pandal'));
  const filteredPOIs = pois.filter(p => activeFilters.has(p.type));

  const totalNearby = filteredPujas.length + pois.length; // Total fetched, not just active

  return (
    <section className={\`pmap \${className}\`} style={{ position: 'relative', overflow: 'hidden', paddingBottom: '40px' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 10, paddingTop: '20px' }}>
        <GeoBar radius={radius} setRadius={setRadius} searchQuery={q} setSearchQuery={setQ} />
        
        {/* Category Filter Bar */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none' }}>
          <button onClick={toggleAll} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: isAll ? '#ef4444' : 'rgba(255,255,255,0.05)', color: '#fff', border: \`1px solid \${isAll ? '#ef4444' : 'rgba(255,255,255,0.1)'}\`, borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600 }}>
            All Nearby <span style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{totalNearby}</span>
          </button>
          
          <FilterBtn type="pandal" label="Pandals" count={filteredPujas.length} active={activeFilters.has('pandal')} onClick={() => toggleFilter('pandal')} />
          <FilterBtn type="police" label="Police" count={pois.filter(p => p.type === 'police').length} active={activeFilters.has('police')} onClick={() => toggleFilter('police')} />
          <FilterBtn type="atm" label="ATMs" count={pois.filter(p => p.type === 'atm').length} active={activeFilters.has('atm')} onClick={() => toggleFilter('atm')} />
          <FilterBtn type="hospital" label="Hospitals" count={pois.filter(p => p.type === 'hospital').length} active={activeFilters.has('hospital')} onClick={() => toggleFilter('hospital')} />
          <FilterBtn type="pharmacy" label="Pharmacies" count={pois.filter(p => p.type === 'pharmacy').length} active={activeFilters.has('pharmacy')} onClick={() => toggleFilter('pharmacy')} />
          <FilterBtn type="restaurant" label="Restaurants" count={pois.filter(p => p.type === 'restaurant').length} active={activeFilters.has('restaurant')} onClick={() => toggleFilter('restaurant')} />
          <FilterBtn type="cafe" label="Cafes" count={pois.filter(p => p.type === 'cafe').length} active={activeFilters.has('cafe')} onClick={() => toggleFilter('cafe')} />
          <FilterBtn type="toilets" label="Toilets" count={pois.filter(p => p.type === 'toilets').length} active={activeFilters.has('toilets')} onClick={() => toggleFilter('toilets')} />
        </div>
      </div>

      <div className="wrap">
        <div style={{ width: '100%', height: '65vh', minHeight: '500px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)', background: '#111', position: 'relative' }}>
          {typeof window !== 'undefined' && (
            <MapContainer center={[baseLat, baseLng]} zoom={14} style={{ width: '100%', height: '100%' }} zoomControl={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <MapUpdater center={[baseLat, baseLng]} zoom={14} />
              
              {/* User Location */}
              {geo.status === 'success' && geo.lat && geo.lng && (
                <Marker position={[geo.lat, geo.lng]} icon={createIcon('you')}>
                  <Popup><strong>You are here</strong><br/>{geo.area}</Popup>
                </Marker>
              )}

              {/* Pandals */}
              {filteredPujas.map(p => (
                <Marker key={p.slug} position={[p.lat!, p.lng!]} icon={createIcon('pandal')}>
                  <Popup>
                    <strong>{p.name}</strong><br/>
                    <small>{p.location}</small>
                  </Popup>
                </Marker>
              ))}

              {/* POIs */}
              {filteredPOIs.map(p => (
                <Marker key={p.id} position={[p.lat, p.lon]} icon={createIcon(p.type)}>
                  <Popup>
                    <strong>{p.name}</strong><br/>
                    <small style={{ textTransform: 'capitalize' }}>{p.type}</small>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}

          {/* Legend Overlay */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, background: 'rgba(255,255,255,0.95)', padding: '8px 12px', borderRadius: '8px', display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '80%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {Object.entries(TYPES).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#333' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: v.color }}></div>
                {v.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterBtn({ type, label, count, active, onClick }: any) {
  const color = TYPES[type]?.color || '#fff';
  return (
    <button onClick={onClick} style={{ 
      display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', 
      background: active ? 'rgba(255,255,255,0.05)' : 'transparent', 
      color: active ? '#fff' : 'rgba(255,255,255,0.5)', 
      border: \`1px solid \${active ? color : 'rgba(255,255,255,0.1)'}\`, 
      borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" style={{ opacity: active ? 1 : 0.5 }}><g fill={color} dangerouslySetInnerHTML={{ __html: TYPES[type]?.svg }} /></svg>
      {label} <span style={{ background: active ? color : 'rgba(255,255,255,0.1)', color: active ? '#fff' : '#888', padding: '2px 6px', borderRadius: '12px', fontSize: '0.75rem' }}>{count}</span>
    </button>
  );
}

export function MiniMap({ name, lat, lng }: { x: number; y: number; name: string; lat?: number; lng?: number }) {
  const mapQuery = lat && lng ? \`\${lat},\${lng}\` : encodeURIComponent(\`\${name} Durga Puja, Bardhaman\`);

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        loading="lazy" 
        allowFullScreen 
        referrerPolicy="no-referrer-when-downgrade" 
        src={\`https://maps.google.com/maps?q=\${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed\`}
      ></iframe>
    </div>
  );
}
`;

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Rewrote PujaMap.tsx');
