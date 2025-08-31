import React from 'react'
import styles from './Card.module.css'

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
    <article className={styles.card}>
      <div className={styles.photo}>
        <img className={styles.img} src={cover} alt={`${name} cover`} loading="lazy" />
        <div className={styles.rating}><span className={styles.star}>★</span>{Number(rating).toFixed(1)}</div>
        <img className={styles.avatar} src={avatar} alt={`${name} avatar`} loading="lazy" />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{name}</h3>
          {certified && <span className={styles.cert}>✔ Certified</span>}
        </div>

        <div className={styles.metaRow}>
          <span className={styles.meta}>📍 {city}</span>
          <span className={styles.meta}>💼 {yearsExp} years exp</span>
        </div>

        <div className={styles.priceRow}>
          Starting from <span className={styles.price}>{startingFrom}</span>
        </div>

        <div className={styles.actions}>
          <a className={`${styles.btn} ${styles.outline}`} href={profileHref}>View Profile</a>
          <a className={`${styles.btn} ${styles.filled}`} href={estimateHref}>Get Estimate</a>
        </div>
      </div>
    </article>
  )
}
