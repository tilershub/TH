import React from 'react'

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
)
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 10h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9zM8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
)
const StarPill = ({ rating }) => (
  <div className="rating-pill">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" style={{marginRight:6}}>
      <path d="M12 2l3.1 6.3 7 .9-5.1 5 1.3 7-6.3-3.3L5.7 21l1.3-7-5.1-5 7-.9L12 2z"/>
    </svg>
    {Number(rating).toFixed(1)}
  </div>
)

export default function Card({
  name = 'Premium Tiles Lanka',
  city = 'Colombo',
  yearsExp = 8,
  startingFrom = 'LKR 800/sq ft',
  rating = 4.8,
  certified = true,
  cover = '/images/cover-1.jpg',
  avatar = '/images/avatar-1.jpg',
  profileHref = '#',
  estimateHref = '#',
}) {
  return (
    <article className="card tiler-card">
      {/* cover */}
      <div className="tiler-photo">
        <img className="tiler-img" src={cover} alt={`${name} cover`} loading="lazy" />
        <StarPill rating={rating} />
        <img className="tiler-avatar" src={avatar} alt={`${name} avatar`} loading="lazy" />
      </div>

      {/* body */}
      <div className="tiler-body">
        <div className="title-row">
          <h3 className="tiler-title">{name}</h3>
          {certified && <span className="cert-chip">✔&nbsp;Certified</span>}
        </div>

        <div className="meta-row">
          <span className="meta"><LocationIcon /> {city}</span>
          <span className="meta"><BriefcaseIcon /> {yearsExp} years exp</span>
        </div>

        <div className="price-row">
          Starting from <span className="price">{startingFrom}</span>
        </div>

        <div className="action-row">
          <a className="btn btn--outline" href={profileHref}>View Profile</a>
          <a className="btn btn--filled" href={estimateHref}>Get Estimate</a>
        </div>
      </div>
    </article>
  )
}