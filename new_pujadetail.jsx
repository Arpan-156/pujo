      <section className="wrap" style={{ marginTop: '40px' }}>
        {/* Distance Banner */}
        <div style={{ border: '1px solid #4a1c1c', borderRadius: '12px', padding: '24px', background: 'rgba(10, 5, 5, 0.8)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              DISTANCE FROM YOU <span style={{ background: '#166534', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>? Live GPS</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 4px 0' }}>You're {distStr || 'unknown distance'}</h2>
            <p style={{ color: 'var(--mute)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Approximately {distStr ? getWalkTimeStr(parseFloat(distStr)) : 'calculating...'}
            </p>
          </div>
          <button onClick={() => { if(geo.status !== 'loading') window.location.reload(); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.44l5.36 5.36"/></svg>
            Refresh Location
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {/* About Pandal */}
          <div style={{ border: '1px solid rgba(233,181,88,0.2)', borderRadius: '12px', padding: '24px', background: 'rgba(20, 10, 10, 0.6)' }}>
            <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              ABOUT THE PANDAL
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 16px 0' }}>Cultural Heritage & Theme Concept</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>{p.story || p.name + ' represents a unique cultural heritage...'}</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', color: 'var(--mute)', fontSize: '0.85rem' }}>
              Geographic Coordinates: {p.map?.lat?.toFixed(4) || 'N/A'}° N, {p.map?.lng?.toFixed(4) || 'N/A'}° E
            </div>
          </div>

          {/* Visiting Rec */}
          <div style={{ border: '1px solid rgba(233,181,88,0.2)', borderRadius: '12px', padding: '24px', background: 'rgba(20, 10, 10, 0.6)' }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              VISITING RECOMMENDATION
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 16px 0' }}>Best Time to Visit</h3>
            <div style={{ display: 'inline-block', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Best time: Evening
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
              Crowds peak between 8 PM and 1 AM. Early morning offers peaceful rituals and photography without long queues.
            </p>
            <div style={{ border: '1px solid rgba(233,181,88,0.3)', borderRadius: '8px', padding: '16px', background: 'rgba(233,181,88,0.05)' }}>
              <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lightbulb size={14} /> Pandal Insider Tip:
              </div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {p.attractions[0] || 'Plan to walk the final stretch as local police often restrict vehicle access near the pandal after 4 PM.'}
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Pandals */}
        <div style={{ border: '1px solid #4a1c1c', borderRadius: '12px', padding: '24px', background: 'rgba(10, 5, 5, 0.8)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
                Nearby Pandals (Walkable Circuit)
              </h3>
              <p style={{ color: 'var(--mute)', margin: 0, fontSize: '0.9rem' }}>Visiting <strong>{p.name}</strong>? Hop directly to these neighboring pandals on foot without hailing a cab:</p>
            </div>
            <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600 }}>Within 2 km</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {(() => {
              if (!p.map?.lat || !p.map?.lng) return <p style={{ color: 'var(--mute)' }}>Location data unavailable.</p>;
              const nearby = pujas
                .filter(x => x.slug !== p.slug && x.map?.lat && x.map?.lng)
                .map(x => {
                  const d = getDistance(p.map.lat, p.map.lng, x.map.lat, x.map.lng);
                  return { ...x, dist: d };
                })
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 3);
              
              return nearby.map((n, i) => (
                <div key={n.slug} style={{ background: i === 1 ? '#e11d48' : 'rgba(20,8,9,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                  {i !== 1 ? (
                    <>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content', marginBottom: '12px' }}>
                        <Pin size={12} /> {(n.dist * 1000).toFixed(0)} m from here • {getWalkTimeStr(n.dist)}
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1.1rem' }}>{n.name}</h4>
                      <p style={{ margin: '0 0 16px 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                        <Pin size={12} style={{ flexShrink: 0, marginTop: '2px' }} /> {n.location}
                      </p>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Evening</span>
                        <Link to={`/puja/${n.slug}`} style={{ color: '#ef4444', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Hop to Pandal ?</Link>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
                        <Pin size={12} /> {(n.dist * 1000).toFixed(0)} m from here • {getWalkTimeStr(n.dist)}
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1.1rem' }}>{n.name}</h4>
                      <p style={{ margin: '0 0 24px 0', color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>{n.location}</p>
                      <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${n.map.lat},${n.map.lng}`)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                        Navigate to {n.name.split(' ')[0]}
                      </button>
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
