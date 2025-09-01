import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (p) => (p === '/' ? location.pathname === '/' : location.pathname.startsWith(p));

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="header" role="banner">
      <div className="row">
        {/* Left: Logo / Brand */}
        <Link className="logo" to="/" aria-label="TILERSHUB Home">
          <img src="/icons/favicon.png" alt="" height="24" width="24" />
          <span className="site-name">TILERSHUB</span>
        </Link>

        {/* Right: Hamburger (mobile) */}
        <button
          className="toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-controls="primary-menu"
          aria-expanded={open ? 'true' : 'false'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Menu */}
        <nav id="primary-menu" className={`menu ${open ? 'open' : ''}`} aria-label="Primary">
          <Link className={`link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
          <Link className={`link ${isActive('/tilers') ? 'active' : ''}`} to="/tilers">Find Tiler</Link>
          <Link className={`link ${isActive('/estimator') ? 'active' : ''}`} to="/estimator">Estimator</Link>
          <Link className={`link ${isActive('/blog') ? 'active' : ''}`} to="/blog">Blog</Link>
          <Link className={`link ${isActive('/contact') ? 'active' : ''}`} to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}