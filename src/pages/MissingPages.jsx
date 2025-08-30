import React, { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://todzlrbaovbqdwxdlcxs.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHpscmJhb3ZicWR3eGRsY3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzM1MjIsImV4cCI6MjA3MDc0OTUyMn0.zsE2fHxF8QUPpiOfYXKz4oe8wVccN76ewDd56u2F6FY"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Tilers Listing Page
export const TilersPage = () => {
  const [searchParams] = useSearchParams()
  const [tilers, setTilers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredTilers, setFilteredTilers] = useState([])
  
  const service = searchParams.get('service')

  useEffect(() => {
    loadTilers()
  }, [])

  useEffect(() => {
    if (service && tilers.length > 0) {
      // Filter by service if provided
      const filtered = tilers.filter(tiler => 
        tiler.highlights?.some(highlight => 
          highlight.toLowerCase().includes(service.toLowerCase())
        )
      )
      setFilteredTilers(filtered)
    } else {
      setFilteredTilers(tilers)
    }
  }, [service, tilers])

  const loadTilers = async () => {
    try {
      const response = await fetch('/data/tilers.json')
      const data = await response.json()
      setTilers(data)
      setFilteredTilers(data)
    } catch (error) {
      console.error('Error loading tilers:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating) => {
    const stars = Math.round(rating || 0)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div>Loading tilers...</div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1>Find Certified Tilers</h1>
      {service && (
        <p style={{ color: '#666', marginBottom: '32px' }}>
          Showing tilers for: <strong>{service}</strong>
        </p>
      )}
      
      <div className="cards-grid">
        {filteredTilers.map((tiler) => (
          <article key={tiler.id} className="card m-card m-elev-1 project-tile">
            <Link className="thumb-wrap" to={`/tilers/tiler/${tiler.id}`}>
              <img 
                className="thumb" 
                src={tiler.image || '/icons/placeholder-tile.png'} 
                alt={`${tiler.name} profile`}
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
                <span className="stars">{renderStars(tiler.rating)}</span>
                <span className="rating-num">({(tiler.rating || 0).toFixed(1)})</span>
                <span className="revcount">• {tiler.reviewCount || 0} reviews</span>
              </div>
              
              {tiler.highlights && (
                <div style={{ margin: '8px 0' }}>
                  {tiler.highlights.slice(0, 3).map(highlight => (
                    <span key={highlight} style={{
                      background: '#e3f2fd',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      marginRight: '4px',
                      color: '#0b57d0'
                    }}>
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="tile-actions">
                <Link className="btn btn--filled" to={`/tilers/tiler/${tiler.id}`}>
                  View Profile
                </Link>
                {tiler.whatsapp && (
                  <a 
                    className="btn btn--tonal" 
                    href={`https://wa.me/94${tiler.whatsapp.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredTilers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <p>No tilers found for "{service}". <Link to="/tilers">View all tilers</Link></p>
        </div>
      )}
    </div>
  )
}

// Tiler Profile Page
export const TilerProfile = () => {
  const { id } = useParams()
  const [tiler, setTiler] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    phone: '',
    email: '',
    quality: 5,
    service: 5,
    timeline: 5,
    pricing: 5,
    cleanliness: 5,
    comment: ''
  })

  useEffect(() => {
    loadTilerData()
  }, [id])

  const loadTilerData = async () => {
    try {
      // Load tiler info
      const response = await fetch('/data/tilers.json')
      const data = await response.json()
      const tilerData = data.find(t => t.id === id)
      
      if (!tilerData) {
        throw new Error('Tiler not found')
      }
      
      setTiler(tilerData)
      document.title = `${tilerData.name} | TILERSHUB`

      // Load reviews from Supabase
      try {
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*')
          .eq('tiler_id', id)
          .eq('approved', true)
          .order('created_at', { ascending: false })

        if (reviewsData) {
          setReviews(reviewsData)
        }
      } catch (error) {
        console.log('Reviews not available:', error)
      }

    } catch (error) {
      console.error('Error loading tiler:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          tiler_id: id,
          ...reviewForm
        }])

      if (error) throw error

      alert('Review submitted successfully!')
      setReviewForm({
        name: '',
        phone: '',
        email: '',
        quality: 5,
        service: 5,
        timeline: 5,
        pricing: 5,
        cleanliness: 5,
        comment: ''
      })
      
      // Reload reviews
      loadTilerData()

    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Error submitting review. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    })
  }

  const renderStars = (rating) => {
    const stars = Math.round(rating || 0)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => 
      acc + (review.quality + review.service + review.timeline + review.pricing + review.cleanliness) / 5, 0
    )
    return (sum / reviews.length).toFixed(1)
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div>Loading tiler profile...</div>
      </div>
    )
  }

  if (!tiler) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Tiler Not Found</h1>
        <p>The tiler profile you're looking for doesn't exist.</p>
        <Link to="/tilers" className="btn btn--filled">View All Tilers</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Cover Image */}
      <div 
        style={{
          height: '200px',
          backgroundImage: `url('${tiler.cover || '/images/default-cover.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Profile Info */}
      <div style={{ padding: '20px', textAlign: 'center', background: 'white' }}>
        <div 
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundImage: `url('${tiler.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: '-50px auto 20px',
            border: '4px solid white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
        <h1>{tiler.name}</h1>
        <p style={{ color: '#666' }}>Verified Tiler • {tiler.city}</p>
        <div className="stars" style={{ fontSize: '20px', margin: '10px 0' }}>
          {renderStars(parseFloat(getAverageRating()))}
        </div>
        <p>{tiler.bio}</p>

        {/* Highlights */}
        {tiler.highlights && (
          <div style={{ margin: '20px 0' }}>
            {tiler.highlights.map(highlight => (
              <span key={highlight} style={{
                background: '#e3f2fd',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                marginRight: '8px',
                marginBottom: '8px',
                display: 'inline-block',
                color: '#0b57d0'
              }}>
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Contact Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {tiler.whatsapp && (
            <a 
              href={`https://wa.me/94${tiler.whatsapp.replace(/^0/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--filled"
            >
              WhatsApp
            </a>
          )}
          {tiler.facebook && (
            <a 
              href={tiler.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--tonal"
            >
              Facebook
            </a>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        {/* Reviews Summary */}
        <div className="card">
          <h3>Review Summary</h3>
          {reviews.length > 0 ? (
            <div>
              <p><strong>Average Rating:</strong> {getAverageRating()}/5 ({reviews.length} reviews)</p>
            </div>
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Individual Reviews */}
        <div className="card">
          <h3>Customer Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{review.name || 'Anonymous'}</strong>
                <small>{new Date(review.created_at).toLocaleDateString()}</small>
              </div>
              <div className="stars" style={{ marginBottom: '8px' }}>
                {renderStars((review.quality + review.service + review.timeline + review.pricing + review.cleanliness) / 5)}
              </div>
              {review.comment && <p style={{ color: '#666' }}>{review.comment}</p>}
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="card">
          <h3>Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <input
                type="text"
                name="name"
                value={reviewForm.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
              />
              
              <input
                type="tel"
                name="phone"
                value={reviewForm.phone}
                onChange={handleInputChange}
                placeholder="Phone (optional)"
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
              />
              
              <input
                type="email"
                name="email"
                value={reviewForm.email}
                onChange={handleInputChange}
                placeholder="Email (optional)"
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label>Quality of Work</label>
                  <select
                    name="quality"
                    value={reviewForm.quality}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Very Poor</option>
                  </select>
                </div>

                <div>
                  <label>Customer Service</label>
                  <select
                    name="service"
                    value={reviewForm.service}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Very Poor</option>
                  </select>
                </div>

                <div>
                  <label>Timeline</label>
                  <select
                    name="timeline"
                    value={reviewForm.timeline}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  >
                    <option value="5">5 - On time</option>
                    <option value="4">4 - Slight delay</option>
                    <option value="3">3 - Delayed</option>
                    <option value="2">2 - Late</option>
                    <option value="1">1 - Very late</option>
                  </select>
                </div>

                <div>
                  <label>Pricing Fairness</label>
                  <select
                    name="pricing"
                    value={reviewForm.pricing}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  >
                    <option value="5">5 - Very fair</option>
                    <option value="4">4 - Fair</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Pricey</option>
                    <option value="1">1 - Overpriced</option>
                  </select>
                </div>

                <div>
                  <label>Cleanliness</label>
                  <select
                    name="cleanliness"
                    value={reviewForm.cleanliness}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Very Poor</option>
                  </select>
                </div>
              </div>

              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleInputChange}
                placeholder="Tell us about your experience (optional)"
                rows="3"
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px', resize: 'vertical' }}
              />

              <button
                type="submit"
                className="btn btn--filled"
                style={{ justifySelf: 'start' }}
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Admin Panel Page
export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pin, setPin] = useState('')
  const [settings, setSettings] = useState({
    cementPrice: 1900,
    sandPrice: 25000,
    adhesivePrice: 2200,
    clipsPrice: 1500,
    groutPrice: 300,
    ratioCement: 0.0125,
    ratioSand: 0.00125,
    ratioAdhesive: 0.025,
    ratioClips: 0.01,
    ratioGrout: 0.0057,
    tileWastageRatio: 0.05,
    ratioSkirtingFromArea: 0.2
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      loadSettings()
    }
  }, [isLoggedIn])

  const verifyPin = () => {
    if (pin === '1234') {
      setIsLoggedIn(true)
      setPin('')
    } else {
      alert('❌ Incorrect PIN')
    }
  }

  const loadSettings = () => {
    const savedSettings = { ...settings }
    Object.keys(settings).forEach(key => {
      const saved = localStorage.getItem(key)
      if (saved !== null) {
        savedSettings[key] = parseFloat(saved)
      }
    })
    setSettings(savedSettings)
  }

  const saveSettings = () => {
    Object.keys(settings).forEach(key => {
      localStorage.setItem(key, settings[key].toString())
    })
    setMessage('✅ Settings saved successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: parseFloat(value) || 0
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '32px', color: '#0b57d0' }}>
            🔐 Admin Login
          </h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN (e.g. 1234)"
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '6px' }}
            onKeyPress={(e) => e.key === 'Enter' && verifyPin()}
          />
          <button
            onClick={verifyPin}
            className="btn btn--filled"
            style={{ width: '100%' }}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '32px', color: '#0b57d0' }}>
          🛠 Update Material Prices & Ratios
        </h2>

        <div style={{ display: 'grid', gap: '24px' }}>
          <section>
            <h3 style={{ color: '#0b57d0', marginBottom: '16px' }}>💰 Material Prices (LKR)</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Cement (50kg)</label>
                <input
                  type="number"
                  value={settings.cementPrice}
                  onChange={(e) => handleSettingChange('cementPrice', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Sand (1 cube)</label>
                <input
                  type="number"
                  value={settings.sandPrice}
                  onChange={(e) => handleSettingChange('sandPrice', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Tile Adhesive (25kg)</label>
                <input
                  type="number"
                  value={settings.adhesivePrice}
                  onChange={(e) => handleSettingChange('adhesivePrice', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Leveling Clips (100 pcs)</label>
                <input
                  type="number"
                  value={settings.clipsPrice}
                  onChange={(e) => handleSettingChange('clipsPrice', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Grout (1kg)</label>
                <input
                  type="number"
                  value={settings.groutPrice}
                  onChange={(e) => handleSettingChange('groutPrice', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 style={{ color: '#0b57d0', marginBottom: '16px' }}>📐 Ratios (per sqft)</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Cement Bags (floor bed)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.ratioCement}
                  onChange={(e) => handleSettingChange('ratioCement', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Sand Cubes (floor bed)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.ratioSand}
                  onChange={(e) => handleSettingChange('ratioSand', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Adhesive Bags</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.ratioAdhesive}
                  onChange={(e) => handleSettingChange('ratioAdhesive', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Leveling Clips (packs)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.ratioClips}
                  onChange={(e) => handleSettingChange('ratioClips', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Grout (kg)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.ratioGrout}
                  onChange={(e) => handleSettingChange('ratioGrout', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Tile Wastage Ratio (e.g. 0.05 for 5%)</label>
                <input
                  type="number"
                  step="0.001"
                  value={settings.tileWastageRatio}
                  onChange={(e) => handleSettingChange('tileWastageRatio', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Skirting Length Ratio (e.g. 0.2 for 20%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.ratioSkirtingFromArea}
                  onChange={(e) => handleSettingChange('ratioSkirtingFromArea', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
                />
              </div>
            </div>
          </section>

          <button
            onClick={saveSettings}
            className="btn btn--filled"
            style={{ padding: '16px 32px', fontSize: '16px' }}
          >
            💾 Save Settings
          </button>

          {message && (
            <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}