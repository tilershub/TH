import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/estimator', label: 'Estimator' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.row} container`}>
        <Link to="/" className={styles.logo} aria-label="TILERSHUB Home">
          <img src="/icons/favicon.png" alt="" width="24" height="24" />
          <span>TILERSHUB</span>
        </Link>

        <button
          className={styles.toggle}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <nav className={`${styles.menu} ${open ? styles.open : ''}`} aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`${styles.link} ${isActive(n.to) ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
