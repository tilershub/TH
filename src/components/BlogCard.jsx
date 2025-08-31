import React from 'react'
import styles from './BlogCard.module.css'

export default function BlogCard({ title, meta = '3 min read', excerpt = '' }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {meta && <div className={styles.meta}>{meta}</div>}
      {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
    </article>
  )
}
