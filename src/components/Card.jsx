// src/components/Card.jsx
import React from 'react';

export default function Card({
  cover = '/images/tiler1.jpg',
  avatar = '/images/avatar1.jpg',
  name = 'Tiler Name',
  city = 'City',
  rating = 4.8,
  reviews = 120,
  profileHref = '#',
  estimateHref = '#',
}) {
  return (
    <div className="card">
      <a href={profileHref} className="cover">
        <img src={cover} alt={`${name} cover`} />
      </a>

      <div className="content">
        <img className="avatar" src={avatar} alt={`${name} avatar`} />

        <div className="meta">
          <a href={profileHref} className="name">{name}</a>
          <div className="sub">{city}</div>
          <div className="rating">
            <span>{rating}</span>
            <span> · </span>
            <span>{reviews} reviews</span>
          </div>
        </div>

        <div className="actions">
          <a href={profileHref} className="btn">View profile</a>
          <a href={estimateHref} className="btn btn-outline">Get estimate</a>
        </div>
      </div>
    </div>
  );
}