import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="f-col">
          <Link to="/" className="logo-wrap" aria-label="TILERSHUB home">
            <span className="site-name">TILERSHUB</span>
          </Link>
          <p className="f-blurb">
            Book vetted tilers for site visits, quotes, and full installations. Simple, fast, reliable.
          </p>
          <div className="f-social">
            <a href="https://facebook.com" aria-label="Facebook"><Facebook size={18}/></a>
            <a href="https://instagram.com" aria-label="Instagram"><Instagram size={18}/></a>
            <a href="https://youtube.com" aria-label="YouTube"><Youtube size={18}/></a>
          </div>
        </div>

        <div className="f-col">
          <h4>Explore</h4>
          <ul className="f-links">
            <li><Link to="/tilers">Find Tiler</Link></li>
            <li><Link to="/estimator">Estimators</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="f-col">
          <h4>Services</h4>
          <ul className="f-tags">
            {['Floor Tiling','Bathroom Tiling','Wall Tiling','Pool Tiling','Mosaic','Repairs'].map(s => (
              <li key={s}><Link to={`/tilers?service=${s.toLowerCase().replace(/\s+/g,'-')}`}>{s}</Link></li>
            ))}
          </ul>
        </div>

        <div className="f-col">
          <h4>Contact</h4>
          <ul className="f-contact">
            <li><MapPin size={16}/> Colombo, Sri Lanka</li>
            <li><Phone size={16}/> +94 77 123 4567</li>
            <li><Mail size={16}/> <a href="mailto:hello@tilershub.com">hello@tilershub.com</a></li>
          </ul>
          <div className="f-legal">
            <Link to="/terms">Terms</Link> · <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} TILERSHUB. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer