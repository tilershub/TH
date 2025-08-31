import React from 'react'

export default function Card({
  name='Premium Tiles Lanka',
  city='Colombo',
  yearsExp=8,
  startingFrom='LKR 800/sq ft',
  rating=4.8,
  certified=true,
  cover='/images/tiler1.jpg',
  avatar='/images/avatar1.jpg',
  profileHref:'#',
  estimateHref:'#'
}){
  return (
    <article className="card tiler-card">
      <div className="tiler-photo">
        <img className="tiler-img" src={cover} alt={name + ' cover'} loading="lazy"/>
        <div className="rating-pill">★ {Number(rating).toFixed(1)}</div>
        <img className="tiler-avatar" src={avatar} alt={name + ' avatar'} loading="lazy"/>
      </div>
      <div className="tiler-body">
        <div className="title-row">
          <h3 className="tiler-title">{name}</h3>
          {certified && <span className="cert-chip">✔ Certified</span>}
        </div>
        <div className="meta-row">
          <span className="meta">📍 {city}</span>
          <span className="meta">💼 {yearsExp} years exp</span>
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
