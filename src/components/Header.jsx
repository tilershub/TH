import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './components/Header.module.css';

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (p) =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="row">
        {/* Left: Logo */}
        <Link className="logo" to="/" aria-label="TILERSHUB Home">
          <img src="/icons/favicon.png" alt="" height="24" width="24" />
          <span className="site-name">TILERSHUB</span>
        </Link>

        {/* Right: Hamburger */}
        <button
          className="toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Nav Menu */}
        <nav className={`menu ${open ? 'open' : ''}`}>
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