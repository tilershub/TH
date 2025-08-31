import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const location = useLocation()
  const isActive = (p) => (p === '/' ? location.pathname === '/' : location.pathname.startsWith(p))

  return (
    <header className="appbar">
      <div className="appbar-row container">
        <Link className="logo-wrap" to="/" aria-label="TILERSHUB Home">
          <img src="/icons/favicon.png" alt="" height="24" width="24" />
          <span className="site-name">TILERSHUB</span>
        </Link>

        <nav className="nav-menu" aria-label="Primary">
          <Link className={isActive('/') ? 'active' : ''} to="/">Home</Link>
          <Link className={isActive('/tilers') ? 'active' : ''} to="/tilers">Find Tiler</Link>
          <Link className={isActive('/estimator') ? 'active' : ''} to="/estimator">Estimator</Link>
          <Link className={isActive('/blog') ? 'active' : ''} to="/blog">Blog</Link>
          <Link className={isActive('/contact') ? 'active' : ''} to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
