import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://todzlrbaovbqdwxdlcxs.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHpscmJhb3ZicWR3eGRsY3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzM1MjIsImV4cCI6MjA3MDc0OTUyMn0.zsE2fHxF8QUPpiOfYXKz4oe8wVccN76ewDd56u2F6FY"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const Home = () => {
  const [tilers, setTilers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load tilers
      const tilersResponse = await fetch('/data/tilers.json')
      const tilersData = await tilersResponse.json()
      
      // Get featured and top-rated tilers
      const featured = tilersData.filter(t => t.featured)
      const topRated = tilersData
        .slice()
        .sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0))
      
      const seen = new Set()
      const merged = [...featured, ...topRated].filter(t => {
        if (seen.has(t.id)) return false
        seen.add(t.id)
        return true
      })
      
      setTilers(merged.slice(0, 6))

      // Load testimonials from Supabase
      try {
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('name, comment, quality, service, timeline, pricing, cleanliness, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(2)

        if (reviewsData) {
          setTestimonials(reviewsData)
        }
      } catch (error) {
        console.log('Testimonials not available:', error)
      }

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating) => {
    const stars = Math.round(rating || 0)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  const getTestimonialStars = (review) => {
    const avg = ((review.quality || 0) + (review.service || 0) + (review.timeline || 0) + (review.pricing || 0) + (review.cleanliness || 0)) / 5
    return renderStars(avg)
  }

  const quickServices = [
    { path: '/tilers?service=floor', icon: '🏠', label: 'Floor Tiling' },
    { path: '/tilers?service=bathroom', icon: '🛁', label: 'Bathroom Tiling' },
    { path: '/tilers?service=wall', icon: '🧱', label: 'Wall Tiling' },
    { path: '/tilers?service=pool', icon: '🏊', label: 'Pool Tiling' },
    { path: '/tilers?service=mosaic', icon: '🎨', label: 'Mosaic' },
    { path: '/tilers?service=repair', icon: '🛠️', label: 'Tile Repair' }
  ]

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-badge">TILERSHUB CERTIFIED</div>
        <h1 id="hero-title">Book trusted help<br/>for home tiling tasks</h1>

        {/* Search bar */}
        <form className="searchbar" onSubmit={(e) => e.preventDefault()} role="search" aria-label="Find services">
          <input 
            id="home-search" 
            type="search" 
            placeholder="What do you need help with?" 
            aria-label="Search services"
          />
          <button type="button" id="search-go" aria-label="Search">
            <Search size={20} />
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Quick categories */}
        <div className="quick-cats" aria-label="Popular tiling services">
          {quickServices.map(({ path, icon, label }) => (
            <Link key={path} to={path}>
              {icon} {label}
            </Link>
          ))}
        </div>

        <p className="hero-note">
          Available for <strong>Site Visits</strong>, <strong>Quotation</strong>, and <strong>Full Installations</strong>.
          Book verified professionals near you.
        </p>
      </section>

      {/* Banner */}
      <section className="container banner-center">
        <Link to="/tilers">
          <img src="/icons/find-certified-tiler.png" alt="Find Certified Tilers in Sri Lanka - TILERSHUB"/>
        </Link>
      </section>

      {/* Stats */}
      <section className="stats-band" aria-label="TILERSHUB stats">
        <div className="container stats-wrap">
          <div><strong>2.4 million+</strong><span>sqft tiled</span></div>
          <div><strong>1.5 million+</strong><span>quotes generated</span></div>
          <div><strong>100,000+</strong><span>happy homeowners</span></div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="container" aria-labelledby="popular-projects-title">
        <h2 id="popular-projects-title">Popular Projects</h2>
        <div className="cards-grid">
          {tilers.map((tiler) => (
            <article key={tiler.id} className="card m-card m-elev-1 project-tile ripple">
              <Link className="thumb-wrap" to={`/tilers/tiler/${tiler.id}`}>
                <img 
                  className="thumb" 
                  src={tiler.image || '/icons/placeholder-tile.png'} 
                  alt={`${tiler.name} project image`}
                  loading="lazy"
                />
                {tiler.featured && <span className="chip chip--primary featured">Featured</span>}
              </Link>
              
              <div className="tile-body">
                <Link className="tile-title" to={`/tilers/tiler/${tiler.id}`}>
                  {tiler.name}
                </Link>
                <div className="tile-meta">
                  Verified {tiler.city && `• ${tiler.city}`}
                </div>
                <div className="tile-rating">
                  <span className="stars" aria-hidden="true">{renderStars(tiler.rating)}</span>
                  <span className="rating-num">({(tiler.rating || 0).toFixed(1)})</span>
                  <span className="revcount">· {tiler.reviewCount || 0} reviews</span>
                </div>
                
                <div className="tile-actions">
                  <Link className="btn btn--filled ripple" to={`/tilers/tiler/${tiler.id}`}>
                    Book Now
                  </Link>
                  <Link className="btn btn--tonal ripple" to={`/tilers/tiler/${tiler.id}`}>
                    View Profile
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="view-more-wrap">
          <Link className="btn btn--filled" to="/tilers">See more projects</Link>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container testimonials" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title">See what happy customers are saying</h2>
          <div className="testi-grid">
            {testimonials.map((review, index) => (
              <div key={index} className="card m-card m-elev-1 testi ripple">
                <div className="testi-body">
                  <div className="who">
                    {review.name || 'Customer'}
                    <span className="stars" aria-hidden="true">{getTestimonialStars(review)}</span>
                  </div>
                  {review.comment && <p className="what">{review.comment}</p>}
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
          <Link to="/tilers?service=floor">Floor Tiling</Link>
          <Link to="/tilers?service=bathroom">Bathroom Tiling</Link>
          <Link to="/tilers?service=wall">Wall Tiling</Link>
          <Link to="/tilers?service=pool">Pool Tiling</Link>
          <Link to="/tilers?service=outdoor">Outdoor Tiling</Link>
          <Link to="/tilers?service=steps">Stairs & Nosing</Link>
          <Link to="/tilers?service=mosaic">Mosaic</Link>
          <Link to="/tilers?service=repairs">Repairs</Link>
          <Link to="/tilers?service=grout">Re-grouting</Link>
          <Link to="/tilers?service=skirting">Skirting</Link>
        </div>
      </section>
    </>
  )
}

export default Home