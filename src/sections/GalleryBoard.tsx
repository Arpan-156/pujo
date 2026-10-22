import { useMemo, useState, useEffect, useRef } from 'react';
import { useData } from '../data/store';
import { GALLERY_CATEGORIES, MAGAZINE_EDITIONS } from '../data/content';
import type { MagazineEdition } from '../data/content';
import { Photo } from '../components/Art';
import { FlipGrid } from '../components/shared';
import { Lightbox } from './Lightbox';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Grid } from '../components/Icons';

export function GalleryBoard() {
  const { gallery } = useData();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [bookMode, setBookMode] = useState<'spread' | 'grid'>('spread');
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [cat, setCat] = useState<string>('All');
  const [idx, setIdx] = useState<number | null>(null);
  const [flipDir, setFlipDir] = useState<'next' | 'prev' | null>(null);
  const [showPreface, setShowPreface] = useState<boolean>(false);

  // Active edition if a year is chosen
  const activeEdition: MagazineEdition | undefined = useMemo(() => {
    if (!selectedYear) return undefined;
    return MAGAZINE_EDITIONS.find(e => e.year === selectedYear) || {
      year: selectedYear,
      volume: `Vol. ${selectedYear - 2024}`,
      issueTitle: `শারদোৎসব ${selectedYear}`,
      englishTitle: `Burdwan Pujo Annual ${selectedYear}`,
      tagline: 'Annual Photographic Archive',
      editorNote: `A curated collection capturing the festival moments of ${selectedYear}.`,
      themeStory: 'Every frame in this volume reflects the shared heritage and artistry of Burdwan.',
      coverImage: '/images/gallery-cover.jpg',
      accentColor: '#e9b558',
      spineColor: '#2a0b10',
      publishDate: `Sharadiya ${selectedYear}`,
      curator: 'Burdwan Capturers Official'
    };
  }, [selectedYear]);

  // Photos belonging to the opened year
  const yearItems = useMemo(() => {
    if (!selectedYear) return [];
    return gallery.filter(g => (g.year || 2025) === selectedYear);
  }, [gallery, selectedYear]);

  // Category counts for the opened year
  const counts = useMemo(() => {
    return Object.fromEntries(
      GALLERY_CATEGORIES.map((c) => [
        c,
        c === 'All' ? yearItems.length : yearItems.filter((g) => g.category === c).length
      ])
    );
  }, [yearItems]);

  // Filtered list according to selected category
  const filteredList = useMemo(() => {
    return cat === 'All' ? yearItems : yearItems.filter((g) => g.category === cat);
  }, [yearItems, cat]);

  // Reset spread and category when year changes
  useEffect(() => {
    setCurrentSpread(0);
    setCat('All');
  }, [selectedYear]);

  // Spreads for the book view: 2 photos per spread
  const totalSpreads = useMemo(() => {
    return Math.max(1, Math.ceil(filteredList.length / 2));
  }, [filteredList.length]);

  const handlePrev = () => {
    setFlipDir('prev');
    setCurrentSpread(prev => (prev - 1 + totalSpreads) % totalSpreads);
    setTimeout(() => setFlipDir(null), 350);
  };

  const handleNext = () => {
    setFlipDir('next');
    setCurrentSpread(prev => (prev + 1) % totalSpreads);
    setTimeout(() => setFlipDir(null), 350);
  };

  // Touch gesture support for mobile swiping
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
  };

  // Keyboard navigation for turning book pages (only when Lightbox is closed)
  useEffect(() => {
    if (selectedYear === null || bookMode !== 'spread' || idx !== null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedYear(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedYear, bookMode, idx, totalSpreads]);

  // Helper to get total count per year for the library shelf cards
  const getYearTotalCount = (year: number) => {
    return gallery.filter(g => (g.year || 2025) === year).length;
  };

  return (
    <section className="gallery">
      <div className="wrap">
        {/* =========================================================
            STATE 1: LIBRARY ROOM / MAGAZINE ARCHIVES SHELF
           ========================================================= */}
        {selectedYear === null ? (
          <div className="mag-library-wrap">
            <div className="mag-library-header">
              <div className="mag-library-badge">
                <span>✦</span> The Sharadiya Archives • বার্ষিকী শারদ সংগ্রহ <span>✦</span>
              </div>
              <h2 className="mag-library-title">ANNUAL PUJO MAGAZINES</h2>
              <p className="mag-library-desc">
                Step into our archival library. Each year, Burdwan Capturers Official curates an exclusive annual photo book 
                celebrating the monumental pandals, authentic idols, and timeless spirit of Bardhaman Durga Puja. 
                Click any year's magazine to open it like a physical volume.
              </p>
            </div>

            {/* Bookshelf Stage */}
            <div className="mag-shelf-stage">
              <div className="mag-rack">
                {MAGAZINE_EDITIONS.map((ed) => {
                  const photoCount = getYearTotalCount(ed.year);
                  return (
                    <div
                      key={ed.year}
                      className="mag-card"
                      onClick={() => setSelectedYear(ed.year)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedYear(ed.year); } }}
                      aria-label={`Open ${ed.year} Magazine Edition: ${ed.englishTitle}`}
                      style={{ borderLeftColor: ed.spineColor }}
                    >
                      {/* Ribbon Bookmark */}
                      <div className="mag-ribbon" aria-hidden="true" />

                      {/* Cover Photo */}
                      <div className="mag-cover-media">
                        <img src={ed.coverImage} alt={`${ed.year} Cover`} loading="lazy" />
                        <div className="mag-cover-shade" />
                        <div className="mag-cover-border" />
                        <div className="mag-year-tag">
                          <span className="mag-year-num">{ed.year}</span>
                          <span className="mag-vol-badge">{ed.volume}</span>
                        </div>
                      </div>

                      {/* Magazine Body */}
                      <div className="mag-card-body">
                        <div>
                          <h3 className="mag-card-issue-bn">{ed.issueTitle}</h3>
                          <h4 className="mag-card-issue-en">{ed.englishTitle}</h4>
                          <p className="mag-card-tagline">"{ed.tagline}"</p>
                        </div>
                        <div className="mag-card-footer">
                          <span className="mag-plate-count">
                            <BookOpen size={14} /> {photoCount} Curated Plates
                          </span>
                          <span className="mag-open-btn">
                            Open Edition <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Wooden Shelf Base & Depth Shadow */}
              <div className="mag-shelf-base" aria-hidden="true" />
              <div className="mag-shelf-shadow" aria-hidden="true" />
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', color: 'var(--mute)', fontSize: '0.9rem' }}>
              <p>📖 Click any magazine above to open and flip through high-resolution photo plates.</p>
            </div>
          </div>
        ) : (
          /* =========================================================
             STATE 2: OPEN BOOK / MAGAZINE EXPERIENCE
             ========================================================= */
          <div className="mag-reader-wrap">
            {/* Top Reader Navigation Bar */}
            <div className="mag-nav-bar">
              <button
                className="mag-back-btn"
                onClick={() => setSelectedYear(null)}
                aria-label="Return to Library Shelf"
              >
                <ArrowLeft size={16} />
                <span>Return to Library</span>
              </button>

              <div className="mag-nav-center">
                <h3 className="mag-nav-title">
                  {activeEdition?.issueTitle} • {activeEdition?.volume}
                </h3>
                <p className="mag-nav-subtitle">
                  {activeEdition?.englishTitle} • {filteredList.length} Photographs
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* View Mode Toggle */}
                <div className="mag-view-toggle" role="group" aria-label="Magazine View Mode">
                  <button
                    className={`mag-toggle-btn ${bookMode === 'spread' ? 'active' : ''}`}
                    onClick={() => setBookMode('spread')}
                    title="Two-Page Book Spread Mode"
                  >
                    <BookOpen size={15} /> Book View
                  </button>
                  <button
                    className={`mag-toggle-btn ${bookMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setBookMode('grid')}
                    title="All Plates Grid Mode"
                  >
                    <Grid size={15} /> All Plates
                  </button>
                  <button
                    className={`mag-toggle-btn ${showPreface ? 'active' : ''}`}
                    onClick={() => setShowPreface(p => !p)}
                    title="Volume Cover & Editorial Preface"
                  >
                    <span>📜 Preface</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Curators' Preface Modal / Slideover */}
            {showPreface && (
              <div className="mag-preface-overlay" role="dialog" aria-modal="true" aria-label="Edition Preface">
                <div className="mag-preface-modal">
                  <div className="mag-preface-header">
                    <div>
                      <span className="mag-vol-badge">{activeEdition?.volume} • {activeEdition?.year}</span>
                      <h3 style={{ fontFamily: 'var(--f-display)', color: 'var(--gold)', margin: '8px 0 2px', fontSize: '1.8rem' }}>
                        {activeEdition?.issueTitle}
                      </h3>
                      <p style={{ margin: 0, color: 'var(--mute)', fontSize: '0.85rem' }}>{activeEdition?.englishTitle}</p>
                    </div>
                    <button className="icon-btn" onClick={() => setShowPreface(false)} aria-label="Close Preface">
                      <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>×</span>
                    </button>
                  </div>
                  <div className="mag-preface-body">
                    <p style={{ fontStyle: 'italic', borderLeft: '2px solid var(--gold)', paddingLeft: '14px', color: 'var(--gold-2)', lineHeight: 1.7 }}>
                      "{activeEdition?.editorNote}"
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                      {activeEdition?.themeStory}
                    </p>
                    <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(233,181,88,0.06)', borderRadius: '8px', border: '1px solid rgba(233,181,88,0.2)' }}>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#fff' }}>
                        Curated & archived by <strong>{activeEdition?.curator}</strong> • {filteredList.length} Photographs catalogued.
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: '24px', textAlign: 'right' }}>
                    <button className="mag-tracker-nav-btn" onClick={() => setShowPreface(false)}>
                      Close & Read Photo Plates →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Category Filter Chips for the current edition */}
            <div className="chips sticky-chips" role="tablist" aria-label="Edition categories">
              {GALLERY_CATEGORIES.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  className={`chip ${cat === c ? 'solid' : ''}`}
                  onClick={() => {
                    setCat(c);
                    setCurrentSpread(0);
                  }}
                >
                  {c} <small>{counts[c] || 0}</small>
                </button>
              ))}
            </div>

            {/* -----------------------------------------------------
                VIEW A: THE TWO-PAGE OPEN BOOK SPREAD
               ----------------------------------------------------- */}
            {bookMode === 'spread' && (
              <div className="mag-spread-stage">
                <div
                  className={`mag-book-spread ${flipDir ? `flip-${flipDir}` : ''}`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Central Spine Shadow */}
                  <div className="mag-spine-crease" aria-hidden="true" />

                  {(() => {
                    const photoIndexLeft = currentSpread * 2;
                    const photoIndexRight = currentSpread * 2 + 1;
                    const itemLeft = filteredList[photoIndexLeft];
                    const itemRight = filteredList[photoIndexRight];

                    const pageLeftNumber = photoIndexLeft + 1;
                    const pageRightNumber = photoIndexRight + 1;

                    return (
                      <>
                        {/* Left Page */}
                        <div className="mag-page left">
                          <div className="mag-page-header">
                            <span>PLATE {String(pageLeftNumber).padStart(2, '0')} OF {filteredList.length}</span>
                            {itemLeft && <span className="mag-photo-cat-pill">{itemLeft.category}</span>}
                          </div>

                          {itemLeft ? (
                            <div
                              className="mag-page-photo-frame"
                              onClick={() => setIdx(yearItems.findIndex(x => x.id === itemLeft.id))}
                              title="Click photo to inspect full-screen in Lightbox"
                              data-cursor="View"
                            >
                              <div className="mag-page-img-box">
                                <Photo v={itemLeft.visual} alt={itemLeft.caption} />
                              </div>
                              <h4 className="mag-photo-caption">{itemLeft.caption}</h4>
                              <div className="mag-photo-credit">
                                <span>✦ {itemLeft.credit}</span>
                                <span>• Click photo to view high-res</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mag-editorial-cover" style={{ border: 'none' }}>
                              <p style={{ color: 'var(--mute)' }}>No plates found in this category.</p>
                            </div>
                          )}

                          <div className="mag-page-footer">
                            <button
                              className="mag-page-flip-link"
                              onClick={handlePrev}
                              data-cursor="Prev"
                              title="Turn to Previous Page Spread"
                            >
                              <ArrowLeft size={13} /> Prev Spread
                            </button>
                            <span className="mag-page-num">PAGE {String(pageLeftNumber).padStart(2, '0')}</span>
                          </div>
                        </div>

                        {/* Right Page */}
                        <div className="mag-page right">
                          <div className="mag-page-header">
                            <span>{itemRight ? `PLATE ${String(pageRightNumber).padStart(2, '0')} OF ${filteredList.length}` : 'COLOPHON'}</span>
                            {itemRight && <span className="mag-photo-cat-pill">{itemRight.category}</span>}
                          </div>

                          {itemRight ? (
                            <div
                              className="mag-page-photo-frame"
                              onClick={() => setIdx(yearItems.findIndex(x => x.id === itemRight.id))}
                              title="Click photo to inspect full-screen in Lightbox"
                              data-cursor="View"
                            >
                              <div className="mag-page-img-box">
                                <Photo v={itemRight.visual} alt={itemRight.caption} />
                              </div>
                              <h4 className="mag-photo-caption">{itemRight.caption}</h4>
                              <div className="mag-photo-credit">
                                <span>✦ {itemRight.credit}</span>
                                <span>• Click photo to view high-res</span>
                              </div>
                            </div>
                          ) : (
                            /* Closing Colophon Page for Odd Counts */
                            <div className="mag-editorial-cover" style={{ border: 'none' }}>
                              <div className="mag-editorial-seal">✦</div>
                              <h3 style={{ fontFamily: 'var(--f-display)', color: 'var(--gold)', margin: '0 0 10px', fontSize: '1.8rem' }}>
                                End of Volume
                              </h3>
                              <p style={{ color: 'var(--mute)', fontSize: '0.92rem', maxWidth: '320px', lineHeight: 1.6 }}>
                                You have viewed all {filteredList.length} plates in the {activeEdition?.year} Sharadiya edition.
                              </p>
                              <div style={{ display: 'flex', gap: '12px', marginTop: '22px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <button
                                  className="mag-tracker-nav-btn"
                                  onClick={() => setCurrentSpread(0)}
                                  data-cursor="First"
                                >
                                  Return to Plate 01
                                </button>
                                <button
                                  className="mag-tracker-nav-btn"
                                  onClick={() => setSelectedYear(null)}
                                  data-cursor="Shelf"
                                >
                                  Return to Shelf
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="mag-page-footer">
                            <span className="mag-page-num">{itemRight ? `PAGE ${String(pageRightNumber).padStart(2, '0')}` : 'FOLIO END'}</span>
                            <button
                              className="mag-page-flip-link"
                              onClick={handleNext}
                              data-cursor="Next"
                              title="Turn to Next Page Spread"
                            >
                              Next Spread <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Floating Spread Navigation Buttons */}
                <button
                  className="mag-spread-nav-btn prev"
                  onClick={handlePrev}
                  data-cursor="Prev"
                  aria-label="Previous Page Spread"
                  title="Previous Page Spread (Left Arrow)"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  className="mag-spread-nav-btn next"
                  onClick={handleNext}
                  data-cursor="Next"
                  aria-label="Next Page Spread"
                  title="Next Page Spread (Right Arrow)"
                >
                  <ChevronRight size={30} />
                </button>

                {/* Bottom Spread Tracker Bar */}
                <div className="mag-spread-tracker">
                  <button
                    className="mag-tracker-nav-btn"
                    onClick={handlePrev}
                    data-cursor="Prev"
                    aria-label="Previous Page Spread"
                  >
                    <ChevronLeft size={16} />
                    <span>Prev Spread</span>
                  </button>

                  <div className="mag-tracker-info">
                    <span className="mag-spread-count-label">
                      Spread {currentSpread + 1} of {totalSpreads} • Plates {currentSpread * 2 + 1}{filteredList[currentSpread * 2 + 1] ? ` & ${currentSpread * 2 + 2}` : ''} of {filteredList.length}
                    </span>
                    <div className="mag-spread-dots" role="tablist" aria-label="Spread pagination">
                      {Array.from({ length: totalSpreads }).map((_, s) => (
                        <button
                          key={s}
                          className={`mag-dot ${currentSpread === s ? 'active' : ''}`}
                          onClick={() => setCurrentSpread(s)}
                          title={`Spread ${s + 1} (Plates ${s * 2 + 1} & ${Math.min(s * 2 + 2, filteredList.length)})`}
                          aria-label={`Jump to Spread ${s + 1}`}
                          data-cursor={`Spread ${s + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    className="mag-tracker-nav-btn"
                    onClick={handleNext}
                    data-cursor="Next"
                    aria-label="Next Page Spread"
                  >
                    <span>Next Spread</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* -----------------------------------------------------
                VIEW B: ALL PLATES MASONRY GRID VIEW
               ----------------------------------------------------- */}
            {bookMode === 'grid' && (
              <div style={{ marginTop: '20px' }}>
                {filteredList.length > 0 ? (
                  <FlipGrid className="masonry">
                    {filteredList.map((g) => (
                      <button
                        key={g.id}
                        className={`g-item ${g.tall ? 'tall' : ''} ${g.wide ? 'wide' : ''}`}
                        onClick={() => setIdx(yearItems.findIndex(x => x.id === g.id))}
                        data-cursor="View"
                        aria-label={`Open photo: ${g.caption}`}
                      >
                        <Photo v={g.visual} alt={g.caption} />
                        <span className="g-cap">
                          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '4px' }}>
                            {g.category}
                          </span>
                          {g.caption}
                        </span>
                      </button>
                    ))}
                  </FlipGrid>
                ) : (
                  <div className="empty-state" style={{ minHeight: '40svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.8rem', color: '#fff' }}>No images in this category</h3>
                    <p style={{ color: 'var(--mute)' }}>Switch to another category or select 'All'.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox for High-Resolution Full-Screen Viewing */}
      <Lightbox
        items={yearItems.length > 0 ? yearItems : gallery}
        index={idx}
        onIndex={setIdx}
        onClose={() => setIdx(null)}
      />
    </section>
  );
}
