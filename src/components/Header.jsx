import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/tilers', label: 'Find Tiler' },
    { path: '/estimator', label: 'Estimators' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="appbar" role="banner">
      <div className="appbar-row">
        <Link className="logo-wrap ripple" to="/" aria-label="TILERSHUB Home">
          <img src="/icons/favicon.png" alt="" height="28" width="28"/>
          <span className="site-name">TILERSHUB</span>
        </Link>

        <button 
          className="nav-toggle icon-btn ripple" 
          aria-label="Open menu" 
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav 
        className={`nav-menu ${isMenuOpen ? 'active' : ''}`} 
        role="navigation" 
        aria-label="Primary"
      >
        {navItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={isActive(path) ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header