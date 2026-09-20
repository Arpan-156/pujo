import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { engine } from '../audio/engine';
import { TRACKS } from '../data/site';
import { ChevronDown, List, Music, Pause, Play, SkipBack, SkipForward, Volume, VolumeOff, X } from './Icons';

export const useMusic = () => useSyncExternalStore(engine.subscribe, engine.getState);

const Equalizer = ({ on }: { on: boolean }) => (
  <span className={`eq ${on ? 'on' : ''}`} aria-hidden="true">
    <i /><i /><i /><i />
  </span>
);

export function MusicPlayer({ visible }: { visible: boolean }) {
  const m = useMusic();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open || !m.playing) return;
    let raf = 0;
    const loop = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${engine.progress().toFixed(4)})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, m.playing]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const track = TRACKS[m.index];
  const showHint = m.blocked && !m.started;

  return (
    <div className={`music ${visible ? 'show' : ''} ${open ? 'open' : ''}`}>
      <div className="music-panel" role="dialog" aria-label="Music player" aria-hidden={!open}>
        <div className="music-head">
          <div>
            <p className="music-label">Now playing</p>
            <p className="music-title">{track.title}</p>
            <p className="music-mood">{track.mood}</p>
          </div>
          <button className="icon-btn" aria-label="Close player" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>
        <div className="music-progress" aria-hidden="true"><span ref={bar} /></div>
        <div className="music-ctrl">
          <button className="icon-btn" aria-label="Previous track" onClick={() => engine.prev()}><SkipBack size={20} /></button>
          <button className="play-btn" aria-label={m.playing ? 'Pause' : 'Play'} onClick={() => engine.toggle()}>
            {m.playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="icon-btn" aria-label="Next track" onClick={() => engine.next()}><SkipForward size={20} /></button>
        </div>
        <label className="music-vol">
          <button className="icon-btn" aria-label={m.volume === 0 ? 'Unmute' : 'Mute'} onClick={() => engine.setVolume(m.volume === 0 ? 0.6 : 0)}>
            {m.volume === 0 ? <VolumeOff size={18} /> : <Volume size={18} />}
          </button>
          <input type="range" min={0} max={1} step={0.01} value={m.volume} onChange={(e) => engine.setVolume(+e.target.value)} aria-label="Volume" />
        </label>
        <button className="music-list-toggle" aria-expanded={list} onClick={() => setList((v) => !v)}>
          <List size={16} /> Playlist <ChevronDown size={16} className={list ? 'flip' : ''} />
        </button>
        {list && (
          <ol className="music-list">
            {TRACKS.map((t, i) => (
              <li key={t.id}>
                <button className={i === m.index ? 'cur' : ''} onClick={() => engine.play(i)}>
                  <span>{t.title}</span>
                  {i === m.index && m.playing ? <Equalizer on /> : <small>{t.mood}</small>}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
      <button className={`music-fab ${m.playing ? 'playing' : ''}`} onClick={() => (m.started ? setOpen((o) => !o) : engine.play().then(() => setOpen(true)))} aria-label={m.playing ? 'Open music player' : 'Enable Puja music'} data-cursor={m.playing ? 'Music' : 'Play'}>
        {m.playing ? <Equalizer on /> : <Music size={18} />}
        <span className="music-fab-label">{m.playing ? track.title : showHint ? 'Enable Puja Music' : 'Music'}</span>
      </button>
    </div>
  );
}
