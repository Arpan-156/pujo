import { useState, useEffect } from 'react';
import { usePassport, passport } from '../lib/passport';
import { PUJAS } from '../data/pujas';
import { Link } from '../lib/router';
import { Check, X, Bookmark, BookmarkCheck } from './Icons';
import { Photo } from './Art';

export function PassportFab({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const data = usePassport();
  const savedPujas = PUJAS.filter(p => data.saved.includes(p.slug));
  const visitedCount = savedPujas.filter(p => data.visited.includes(p.slug)).length;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className={`passport-wrapper ${visible ? 'show' : ''} ${open ? 'open' : ''}`}>
      <div className="passport-panel" role="dialog" aria-hidden={!open}>
        <div className="passport-head">
          <div>
            <h2 className="passport-title">My Pujo Passport</h2>
            <p className="passport-status">{visitedCount} / {savedPujas.length} Visited</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
    {visitedCount > 0 && <button className="icon-btn" style={{ fontSize: '0.7rem', padding: '4px 8px', width: 'auto', height: 'auto', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }} onClick={() => passport.clearVisited()}>Clear Visited</button>}
    <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button>
  </div>
        </div>
        
        <div className="passport-body">
          {savedPujas.length === 0 ? (
            <div className="passport-empty">
              <div className="passport-empty-icon"><Bookmark size={40} /></div>
              <p>Your passport is empty.</p>
              <small>Click the bookmark icon on any pandal to add it to your itinerary.</small>
            </div>
          ) : (
            <div className="passport-list">
              {savedPujas.map(p => {
                const visited = data.visited.includes(p.slug);
                return (
                  <div key={p.slug} className={`passport-item ${visited ? 'visited' : ''}`}>
                    <div className="passport-item-img">
                      <Photo v={p.heroImage} />
                    </div>
                    <div className="passport-item-info">
                      <Link to={`/map?p=${p.slug}`} onClick={() => setOpen(false)}>
                        <h4>{p.name}</h4>
                      </Link>
                      <p>{p.area}</p>
                    </div>
                    <button 
                      className={`stamp-btn ${visited ? 'stamped' : ''}`}
                      onClick={() => visited ? passport.unmarkVisited(p.slug) : passport.markVisited(p.slug)}
                      aria-label={visited ? "Mark unvisited" : "Mark visited"}
                    >
                      {visited ? <Check size={20} /> : <div className="stamp-circle" />}
                      <span className="stamp-label">VISITED</span>
                    </button>
                    <button className="passport-remove" onClick={() => passport.remove(p.slug)} aria-label="Remove">
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <button 
        className="passport-fab" 
        onClick={() => setOpen(prev => !prev)} 
        aria-label="Open Passport"
      >
        {savedPujas.length > 0 && <span className="passport-badge">{savedPujas.length}</span>}
        <Bookmark size={22} />
      </button>
    </div>
  );
}

export function PassportButton({ slug }: { slug: string }) {
  const data = usePassport();
  const saved = data.saved.includes(slug);
  
  return (
    <button 
      className={`btn-passport ${saved ? 'saved' : ''}`} 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        saved ? passport.remove(slug) : passport.add(slug);
      }}
      aria-label={saved ? "Remove from Passport" : "Add to Passport"}
    >
      {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
