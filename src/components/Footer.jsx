import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <div className={styles.logo}>TILERSHUB</div>
          <p>Book vetted tilers for site visits, quotes, and full installations.</p>
        </div>

        <div className={styles.cols}>
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
      <div className={styles.copy}>© {new Date().getFullYear()} TILERSHUB. All rights reserved.</div>
    </footer>
  )
}
