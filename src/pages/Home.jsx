import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// TODO: move these to environment variables
const SUPABASE_URL = "https://todzlrbaovbqdwxdlcxs.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHpscmJhb3ZicWR3eGRsY3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzM1MjIsImV4cCI6MjA3MDc0OTUyMn0.zsE2fHxF8QUPpiOfYXKz4oe8wVccN76ewDd56u2F6FY"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const SafeImage = ({ src, alt, className }) => {
  const [ok, setOk] = useState(true)
  return (
    <img
      className={className}
      src={ok && src ? src : '/icons/placeholder-tile.png'}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
    />
  )
}

const Rating = ({ value }) => {
  const v = Math.max(0, Math.min(5, Math.round(value || 0)))
  return (
    <span className="stars" aria-label={`Rating ${v} out of 5`}>
      {'★'.repeat(v)}{'☆'.repeat(5 - v)}
    </span>
  )
}

const Card = ({ children, className = '' }) => (
  <article className={`card glass hover-lift ${className}`}>{children}</article>
)

const Skeleton = ({ lines = 3 }) => (
  <div className="skeleton">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="skeleton-line" />
    ))}
  </div>
)

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

  useEffect(() => {
    const ctrl = new AbortController()
    ;(async () => {
      try {
        // Load tilers (local JSON)
        const res = await fetch('/data/tilers.json', { signal: ctrl.signal, cache: 'no-store' })
        const tilersData = await res.json()

        // Featured + top-rated (dedup)
        const featured = tilersData.filter(t => t.featured)
        const topRated = tilersData
          .slice()
          .sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0))
        const seen = new Set()
        const merged = [...featured, ...topRated].filter(t => (seen.has(t.id) ? false : seen.add(t.id)))
        setTilers(merged.slice(0, 6))

        // Testimonials (Supabase)
        const { data: reviewsData, error: sbErr } = await supabase
          .from('reviews')
          .select('name, comment, quality, service, timeline, pricing, cleanliness, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(2)

        if (!sbErr && reviewsData) setTestimonials(reviewsData)
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

  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-badge">TILERSHUB CERTIFIED</div>
        <h1 id="hero-title" className="hero-title">
          Book trusted help<br />for home tiling tasks
        </h1>

        <form className="searchbar" onSubmit={(e) => e.preventDefault()} role="search" aria-label="Find services">
          <input id="home-search" type="search" placeholder="What do you need help with?" aria-label="Search services" />
          <button type="button" id="search-go" aria-label="Search"><Search size={20} /></button>
        </form>

        <nav className="chips" aria-label="Popular tiling services">
          {quickServices.map(({ path, icon, label }) => (
            <Link key={path} className="chip" to={path}>{icon} {label}</Link>
          ))}
        </nav>

        <p className="hero-note">
          Available for <strong>Site Visits</strong>, <strong>Quotation</strong>, and <strong>Full Installations</strong>. Book verified professionals near you.
        </p>
      </section>

      {/* Banner */}
      <section className="container banner-center">
        <Link to="/tilers" className="banner">
          <img src="/icons/find-certified-tiler.png" alt="Find Certified Tilers in Sri Lanka - TILERSHUB" />
        </Link>
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

        {loading ? (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}><Skeleton lines={5} /></Card>
            ))}
          </div>
        ) : (
          <div className="grid">
            {tilers.map((t) => (
              <Card key={t.id} className="project">
                <Link className="thumb-wrap" to={`/tilers/tiler/${t.id}`}>
                  <SafeImage className="thumb" src={t.image} alt={`${t.name} project image`} />
                  {t.featured && <span className="chip chip-primary featured">Featured</span>}
                </Link>

                <div className="tile-body">
                  <Link className="tile-title" to={`/tilers/tiler/${t.id}`}>{t.name}</Link>
                  <div className="tile-meta">Verified {t.city && <>• {t.city}</>}</div>
                  <div className="tile-rating">
                    <Rating value={t.rating} />
                    <span className="rating-num">({(t.rating || 0).toFixed(1)})</span>
                    <span className="revcount">· {t.reviewCount || 0} reviews</span>
                  </div>
                  <div className="tile-actions">
                    <Link className="btn btn-filled" to={`/tilers/tiler/${t.id}`}>Book Now</Link>
                    <Link className="btn btn-tonal" to={`/tilers/tiler/${t.id}`}>View Profile</Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title">See what happy customers are saying</h2>
          <div className="grid testimonials">
            {testimonials.map((r, i) => (
              <Card key={i}>
                <div className="testi-body">
                  <div className="who">
                    <span className="person">{r.name || 'Customer'}</span>
                    <Rating value={avgFromReview(r)} />
                  </div>
                  {r.comment && <p className="what">{r.comment}</p>}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="container" aria-labelledby="how-title">
        <h2 id="how-title">How it works</h2>
        <ol className="steps">
          <li><strong>Choose a Tiler</strong> by price, reviews, and availability.</li>
          <li><strong>Schedule</strong> a site visit or start date.</li>
          <li><strong>Chat, plan, and review</strong> all in one place.</li>
        </ol>
      </section>

      {/* Promise */}
      <section className="container promise" aria-labelledby="promise-title">
        <h2 id="promise-title">Your satisfaction, <span className="accent">guaranteed</span></h2>
        <ul className="list">
          <li><strong>TILERSHUB Pledge:</strong> We work with verified tilers only.</li>
          <li><strong>Vetted Pros:</strong> Background-checked, portfolio-reviewed.</li>
          <li><strong>Dedicated Support:</strong> Friendly help when you need it.</li>
        </ul>
        <Link className="btn" to="/about">Read the pledge</Link>
      </section>

      {/* Tags */}
      <section className="container" aria-labelledby="tags-title">
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