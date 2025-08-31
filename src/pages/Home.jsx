import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { Grid2X2, Bath, BrickWall, Waves, Hammer } from 'lucide-react'

const SUPABASE_URL = "https://todzlrbaovbqdwxdlcxs.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHpscmJhb3ZicWR3eGRsY3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzM1MjIsImV4cCI6MjA3MDc0OTUyMn0.zsE2fHxF8QUPpiOfYXKz4oe8wVccN76ewDd56u2F6FY"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/* Safe image with fallback */
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

/* ===== Banner slider with overlay CTA ===== */
const BannerSlider = ({ slides = [], interval = 3500 }) => {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const w = el.clientWidth
      const n = Math.round(el.scrollLeft / w)
      if (n !== idx) setIdx(n)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [idx])

  useEffect(() => {
    if (pause || slides.length <= 1) return
    const id = setInterval(() => {
      const el = ref.current
      if (!el) return
      const w = el.clientWidth
      const next = (idx + 1) % slides.length
      el.scrollTo({ left: next * w, behavior: 'smooth' })
      setIdx(next)
    }, interval)
    return () => clearInterval(id)
  }, [idx, slides.length, pause, interval])

  const goto = (i) => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
    setIdx(i)
  }

  if (!slides.length) return null

  return (
    <div
      className="banner-wrap"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={() => setPause(true)}
      onTouchEnd={() => setPause(false)}
    >
      <div className="banner-track" ref={ref}>
        {slides.map((s, i) => (
          <div className="banner-card" key={i}>
            <SafeImage className="banner-img" src={s.img} alt={s.alt || ''} />
            <div className="banner-overlay">
              <h3 className="banner-title">{s.title}</h3>
              <p className="banner-sub">{s.sub}</p>
              <Link to={s.href || '#'} className="btn btn--cta">Learn More</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="ad-dots" role="tablist" aria-label="banner pagination">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`ad-dot ${i === idx ? 'is-active' : ''}`}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => goto(i)}
          />
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  const [tilers, setTilers] = useState([])
  const [loading, setLoading] = useState(true)

  const slides = useMemo(() => ([
    {
      img: '/banners/tilershub-1.jpg',
      title: 'Professional Tiling Services',
      sub: 'Transform your space with expert craftsmanship',
      href: '/tilers', alt: 'Professional tiling'
    },
    {
      img: '/banners/tilershub-2.jpg',
      title: 'Certified, Vetted Pros',
      sub: 'Book site visits, quotes, and full installs',
      href: '/tilers', alt: 'Certified pros'
    },
    {
      img: '/banners/tilershub-3.jpg',
      title: 'Get a Quick Estimate',
      sub: 'Transparent pricing, no surprises',
      href: '/estimator', alt: 'Quick estimate'
    }
  ]), [])

  const categories = [
    { key: 'all', label: 'All', icon: Grid2X2 },
    { key: 'floor', label: 'Floor Tiling', icon: Grid2X2 },
    { key: 'bathroom', label: 'Bathroom', icon: Bath },
    { key: 'wall', label: 'Wall', icon: BrickWall },
    { key: 'pool', label: 'Pool', icon: Waves },
    { key: 'repairs', label: 'Repairs', icon: Hammer },
  ]

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/tilers.json', { cache: 'no-store' })
        const all = await res.json()
        const featured = all.filter(t => t.featured)
        const topRated = all.slice().sort((a, b) =>
          (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0)
        )
        const seen = new Set()
        const merged = [...featured, ...topRated].filter(t => (seen.has(t.id) ? false : seen.add(t.id)))
        setTilers(merged.slice(0, 5))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading…</div>
  }

  return (
    <>
      {/* Banner with overlay CTA */}
      <section className="container section-pad">
        <BannerSlider slides={slides} />
      </section>

      {/* Category pills row */}
      <section className="container cat-row">
        <div className="cat-scroller">
          {categories.map((c, i) => {
            const Icon = c.icon
            const selected = i === 0 // "All" active as in screenshot
            return (
              <Link
                key={c.key}
                to={c.key === 'all' ? '/tilers' : `/tilers?service=${c.key}`}
                className={`cat-pill ${selected ? 'is-active' : ''}`}
              >
                <Icon size={18} />
                <span>{c.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Tilers */}
      <section className="container">
        <div className="row-head">
          <h2>Featured Tilers</h2>
          <Link to="/tilers" className="link-accent">View All</Link>
        </div>

        <div className="cards-grid">
          {tilers.map((t) => (
            <article key={t.id} className="card tiler-card">
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
                {/* Floating CTA like screenshot */}
                <Link to={`/tilers/tiler/${t.id}`} className="floating-cta">
                  <span className="cta-icon">🧮</span> Quick Estimate
                </Link>
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home