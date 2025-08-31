import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { Grid2x2, Bath, BrickWall, Waves, Hammer } from 'lucide-react'

const SUPABASE_URL = "https://todzlrbaovbqdwxdlcxs.supabase.co"
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY" // replace with env variable ideally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const categories = [
  { key: 'all', label: 'All', icon: Grid2x2 },
  { key: 'floor', label: 'Floor Tiling', icon: BrickWall },
  { key: 'bathroom', label: 'Bathroom', icon: Bath },
  { key: 'pool', label: 'Swimming Pool', icon: Waves },
  { key: 'renovation', label: 'Renovation', icon: Hammer }
]

const Home = () => {
  const [tilers, setTilers] = useState([])

  useEffect(() => {
    const fetchTilers = async () => {
      const { data, error } = await supabase.from('tilers').select('*').limit(5)
      if (error) {
        console.error("Error fetching tilers:", error)
      } else {
        setTilers(data || [])
      }
    }
    fetchTilers()
  }, [])

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-content">
          <h1>Professional Tiling Services</h1>
          <p>Transform your space with expert craftsmanship</p>
          <Link to="/estimator" className="btn-primary">Quick Estimate</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="category-list">
          {categories.map(({ key, label, icon: Icon }) => (
            <button key={key} className="category-btn">
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Tilers */}
      <section className="featured-tilers">
        <div className="section-header">
          <h2>Featured Tilers</h2>
          <Link to="/tilers" className="view-all">View All</Link>
        </div>
        <div className="tiler-cards">
          {tilers.map(tiler => (
            <div key={tiler.id} className="tiler-card">
              <img src={tiler.profile_image || '/images/default-avatar.png'} alt={tiler.name} />
              <div className="tiler-info">
                <h3>{tiler.name}</h3>
                <p>{tiler.city}</p>
                <span className="rating">⭐ {tiler.rating || "4.5"}</span>
              </div>
              <Link to={`/tilers/tiler/${tiler.id}`} className="btn-secondary">View Profile</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home