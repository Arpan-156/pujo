import { useGeo } from '../lib/geo';
import { RefreshCw, Navigation, MapPin } from './Icons';
import { useState } from 'react';

export function GeoBar({ radius, setRadius, searchQuery, setSearchQuery, onRefresh }: any) {
  const { geo, requestPermission, setManualLocation, AREAS } = useGeo();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    requestPermission(); // Always fetch real GPS when refresh clicked!
    setTimeout(() => setLoading(false), 800);
    if (onRefresh) await onRefresh();
  };

  return (
    <div className="geo-bar">
      <style>{`
        .geo-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(10, 4, 5, 0.7);
          border: 1px solid rgba(233, 181, 88, 0.2);
          border-radius: 12px;
          padding: 12px 20px;
          backdrop-filter: blur(12px);
          flex-wrap: wrap;
          gap: 16px;
        }
        .geo-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .geo-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .geo-text h4 {
          margin: 0 0 4px 0;
          font-size: 0.85rem;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .geo-text h4 span {
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
          font-weight: normal;
        }
        .geo-text p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--mute);
        }
        .geo-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .geo-search {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          font-family: inherit;
          width: 220px;
          outline: none;
        }
        .geo-search:focus {
          border-color: rgba(233, 181, 88, 0.5);
        }
        .geo-select {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 12px;
          border-radius: 8px;
          color: #fff;
          font-family: inherit;
          cursor: pointer;
          outline: none;
        }
        .geo-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .geo-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        .geo-btn.spin svg {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .geo-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(16, 185, 129, 0.5);
          padding: 4px 12px;
          border-radius: 99px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          transition: all 0.2s;
        }
        .geo-pill:hover {
          background: rgba(16, 185, 129, 0.1);
        }
        .geo-dot {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
      `}</style>
      
      <div className="geo-info">
        <div className="geo-icon-box" style={{ borderColor: geo.status === 'error' ? 'rgba(239, 68, 68, 0.4)' : geo.status !== 'success' ? 'rgba(255,255,255,0.2)' : 'rgba(16, 185, 129, 0.2)' }}>
          {geo.isManual ? <MapPin size={20} style={{ color: '#10b981' }} /> : <Navigation size={20} style={{ color: geo.status === 'error' ? '#ef4444' : geo.status !== 'success' ? '#fff' : '#10b981' }} />}
        </div>
        <div className="geo-text">
          {geo.status === 'success' ? (
            <>
              <h4>{geo.isManual ? 'Manual Location' : 'GPS Active'} {geo.lat && <span>({geo.lat.toFixed(4)}&deg; N, {geo.lng?.toFixed(4)}&deg; E)</span>}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>From </p>
                <strong style={{ color: '#10b981' }}>{geo.area}</strong>
                {geo.isManual && (
                  <button onClick={requestPermission} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>
                    (Use GPS)
                  </button>
                )}
              </div>
            </>
          ) : geo.status === 'loading' ? (
            <h4>Locating...</h4>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div>
                <h4 style={{ color: geo.status === 'error' ? '#ef4444' : '#fff' }}>
                  {geo.status === 'error' ? 'Permission Denied' : 'Set Your Location'}
                </h4>
                <p>Use GPS or select manually.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="geo-pill" onClick={requestPermission} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 14px', fontSize: '0.85rem' }}>
                  Enable GPS
                </button>
                <select 
                  className="geo-pill"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 14px', fontSize: '0.85rem', outline: 'none' }}
                  onChange={(e) => setManualLocation(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Or Pick Area...</option>
                  {AREAS.map(a => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="geo-controls">
        
        
        <button className={`geo-btn ${loading ? 'spin' : ''}`} onClick={handleRefresh}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>
    </div>
  );
}

export function GeoPill() {
  const { geo, requestPermission } = useGeo();
  const [loading, setLoading] = useState(false);

  return (
    <button className="geo-pill" onClick={() => {
        setLoading(true);
        requestPermission();
        setTimeout(() => setLoading(false), 800);
      }} style={{ background: 'transparent', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, padding: '4px 12px', borderRadius: '99px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)', animation: loading ? 'pulse 1s infinite' : 'none' }}></div>
        {geo.status === 'success' ? geo.area : geo.status === 'loading' ? 'Locating...' : 'Enable GPS'}
      </button>
  );
}
