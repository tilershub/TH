import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

// Supabase (move to env in prod)
const SUPABASE_URL = "https://todzlrbaovbqdwxdlcxs.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHpscmJhb3ZicWR3eGRsY3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzM1MjIsImV4cCI6MjA3MDc0OTUyMn0.zsE2fHxF8QUPpiOfYXKz4oe8wVccN76ewDd56u2F6FY"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/* ---------- Utilities ---------- */
const SafeImage = ({ src, alt, className }) => {
  const [ok, setOk] = useState(true)
  return (
    <img
      className={className}
      src={ok && src ? src : '/icons/placeholder-tile.png'}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setOk(false)}
    />
  )
}

/* ---------- Banner Slider ---------- */
const AdSlider = ({ items = [], interval = 3500 }) => {
  const trackRef = useRef(null)
  const [idx, setIdx] = useState(0)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const w = el.clientWidth
      const newIdx = Math.round(el.scrollLeft / w)
      if (newIdx !== idx) setIdx(newIdx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [idx])

  useEffect(() => {
    if (pause || items.length <= 1) return
    const id = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const w = el.clientWidth
      const next = (idx + 1) % items.length
      el.scrollTo({ left: next * w, behavior: 'smooth' })
      setIdx(next)
    }, interval)
    return () => clearInterval(id)
  }, [idx, items.length, pause, interval])

  const goTo = (i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
    setIdx(i)
  }

  if (!items.length) return null

  return (
    <div
      className="ad-slider"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={() => setPause(true)}
      onTouchEnd={() => setPause(false)}
    >
      <div className="ad-track" ref={trackRef}>
        {items.map((b, i) => (
          <a
            key={i}
            className="ad-slide"
            href={b.href || '#'}
            target={b.href ? '_blank' : undefined}
            rel={b.href ? 'noopener noreferrer' : undefined}
            aria-label={b.alt || `banner ${i + 1}`}
          >
            <SafeImage className="ad-img" src={b.img} alt={b.alt || ''} />
          </a>
        ))}
      </div>

      <div className="ad-dots" role="tablist" aria-label="banner pagination">
        {items.map((_, i) => (
          <button
            key={i}
            className={`ad-dot ${i === idx ? 'is-active' : ''}`}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  const [tilers, setTilers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const quickServices = useMemo(() => ([
    { path: '/tilers?service=floor', icon: '🏠', label: 'Floor Tiling' },
    { path: '/tilers?service=bathroom', icon: '🛁', label: 'Bathroom Tiling' },
    { path: '/tilers?service=wall', icon: '🧱', label: 'Wall Tiling' },
    { path: '/tilers?service=pool', icon: '🏊', label: 'Pool Tiling' },
    { path: '/tilers?service=mosaic', icon: '🎨', label: 'Mosaic' },
    { path: '/tilers?service=repair', icon: '🛠️', label: 'Tile Repair' }
  ]), [])

  // Replace with your real images (ideally ~1600×400)
  const banners = useMemo(() => ([
    { img: '/banners/tilershub-offer-1.jpg', href: '/tilers',    alt: 'Find certified tilers' },
    { img: '/banners/tools-sale.jpg',        href: '/shop',      alt: 'Save on tiling tools' },
    { img: '/banners/estimator-promo.jpg',   href: '/estimator', alt: 'Get a quick estimate' },
  ]), [])

  useEffect(() => {
    const ctrl = new AbortController()
    ;(async () => {
      try {
        const res = await fetch('/data/tilers.json', { signal: ctrl.signal, cache: 'no-store' })
        const all = await res.json()
        const featured = all.filter(t => t.featured)
        const topRated = all.slice().sort((a, b) =>
          (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0)
        )
        const seen = new Set()
        const merged = [...featured, ...topRated].filter(t => (seen.has(t.id) ? false : seen.add(t.id)))
        setTilers(merged.slice(0, 6))

        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('name, comment, quality, service, timeline, pricing, cleanliness, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(2)
        if (reviewsData) setTestimonials(reviewsData)
      } catch (e) {
        if (e.name !== 'AbortError') setError('Could not load content. Please try again.')
      } finally {
        setLoading(false)
      }
    })()
    return () => ctrl.abort()
  }, [])

  const avgFromReview = (r) => {
    const vals = [r.quality, r.service, r.timeline, r.pricing, r.cleanliness].map(v => v || 0)
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }

  if (loading) {
    return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading…</div>
  }

  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-badge">TILERSHUB CERTIFIED</div>
        <h1 id="hero-title">Book trusted help<br/>for home tiling tasks</h1>

        {/* Horizontal rectangle banner carousel */}
        <AdSlider items={banners} />

        <div className="quick-cats" aria-label="Popular tiling services">
          {quickServices.map(({ path, icon, label }) => (
            <Link key={path} to={path} className="chip">{icon} {label}</Link>
          ))}
        </div>

        <p className="hero-note">
          Available for <strong>Site Visits</strong>, <strong>Quotation</strong>, and <strong>Full Installations</strong>. Book verified professionals near you.
        </p>
      </section>

      {/* Stats */}
      <section className="stats-band" aria-label="TILERSHUB stats">
        <div className="container stats-wrap">
          <div><strong>2.4M+</strong><span>sqft tiled</span></div>
          <div><strong>1.5M+</strong><span>quotes generated</span></div>
          <div><strong>100K+</strong><span>happy homeowners</span></div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="container" aria-labelledby="popular-projects-title">
        <div className="section-head">
          <h2 id="popular-projects-title">Popular Projects</h2>
          <Link className="link-quiet" to="/tilers">See all</Link>
        </div>

        {error && <div className="notice error">{error}</div>}

        <div className="cards-grid">
          {tilers.map((t) => (
            <article key={t.id} className="card tiler-card ripple">
              <Link to={`/tilers/tiler/${t.id}`} className="tiler-photo">
                <SafeImage className="tiler-img" src={t.image} alt={`${t.name} cover`} />
                <div className="rating-pill">★ {(t.rating || 0).toFixed(1)}</div>
                {(t.avatar || t.image) && (
                  <img
                    className="tiler-avatar"
                    src={t.avatar || t.image}
                    alt={`${t.name} avatar`}
                    onError={(e)=>{ e.currentTarget.style.visibility='hidden' }}
                  />
                )}
              </Link>

              <div className="tiler-body">
                <div className="title-row">
                  <Link to={`/tilers/tiler/${t.id}`} className="tiler-title">{t.name}</Link>
                  {t.certified && <span className="cert-chip">✔ Certified</span>}
                </div>

                <div className="meta-row">
                  {t.city && <span className="meta">📍 {t.city}</span>}
                  {(t.experience || t.yearsExp) && <span className="meta">💼 {t.experience || t.yearsExp} yrs exp</span>}
                </div>

                {(t.startingFrom || t.startPrice) && (
                  <div className="price-row">
                    Starting from <span className="price">LKR {t.startingFrom || t.startPrice}/sq ft</span>
                  </div>
                )}

                <div className="action-row">
                  <Link className="btn btn--outline" to={`/tilers/tiler/${t.id}`}>View Profile</Link>
                  <Link className="btn btn--filled" to={`/tilers/tiler/${t.id}`}>Get Estimate</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title">See what happy customers are saying</h2>
          <div className="testi-grid">
            {testimonials.map((r, i) => (
              <div key={i} className="card m-card m-elev-1 testi ripple">
                <div className="testi-body">
                  <div className="who">
                    {r.name || 'Customer'}
                    <span className="stars">
                      {'★'.repeat(Math.round(avgFromReview(r)))}{'☆'.repeat(5 - Math.round(avgFromReview(r)))}
                    </span>
                  </div>
                  {r.comment && <p className="what">{r.comment}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="container how-it-works" aria-labelledby="how-title">
        <h2 id="how-title">How it works</h2>
        <ol>
          <li><strong>Choose a Tiler</strong> by price, reviews, and availability.</li>
          <li><strong>Schedule</strong> a site visit or start date.</li>
          <li><strong>Chat, plan, and review</strong> all in one place.</li>
        </ol>
      </section>

      {/* Promise */}
      <section className="container promise" aria-labelledby="promise-title">
        <h2 id="promise-title">Your satisfaction, <span className="accent">guaranteed</span></h2>
        <ul className="promise-list">
          <li><strong>TILERSHUB Pledge:</strong> We work with verified tilers only.</li>
          <li><strong>Vetted Pros:</strong> Background-checked, portfolio-reviewed.</li>
          <li><strong>Dedicated Support:</strong> Friendly help when you need it.</li>
        </ul>
        <Link className="btn" to="/about">Read the pledge</Link>
      </section>

      {/* Tags */}
      <section className="container tags-cloud" aria-labelledby="tags-title">
        <h2 id="tags-title">Get help today</h2>
        <div className="tags">
          {['floor','bathroom','wall','pool','outdoor','steps','mosaic','repairs','grout','skirting'].map(s => (
            <Link key={s} to={`/tilers?service=${s}`}>{s.replace('-', ' ')}</Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home