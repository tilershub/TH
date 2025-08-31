import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo">TILERSHUB</div>
          <p>Book vetted tilers for site visits, quotes, and full installations.</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/tilers">Find Tiler</Link></li>
              <li><Link to="/estimator">Estimators</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Colombo, Sri Lanka</li>
              <li><a href="tel:+94771234567">+94 77 123 4567</a></li>
              <li><a href="mailto:hello@tilershub.com">hello@tilershub.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} TILERSHUB. All rights reserved.</div>
    </footer>
  )
}
