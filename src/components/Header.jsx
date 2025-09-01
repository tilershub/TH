import React, { useState } from ‘react’;
import { Link } from ‘react-router-dom’;
import styles from ‘./Header.module.css’;

const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
setIsMenuOpen(!isMenuOpen);
};

const closeMenu = () => {
setIsMenuOpen(false);
};

return (
<header className={styles.header}>
<div className={styles.container}>
{/* Brand Logo */}
<div className={styles.brand}>
<Link to="/" className={styles.brandLink} onClick={closeMenu}>
TILERSHUB
</Link>
</div>

```
    {/* Desktop Navigation */}
    <nav className={styles.desktopNav}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/find-tiler" className={styles.navLink}>Find Tiler</Link>
      <Link to="/estimator" className={styles.navLink}>Estimator</Link>
      <Link to="/blog" className={styles.navLink}>Blog</Link>
      <Link to="/contact" className={styles.navLink}>Contact</Link>
    </nav>

    {/* Hamburger Menu Button */}
    <button 
      className={styles.hamburger}
      onClick={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
    </button>
  </div>

  {/* Mobile Navigation Menu */}
  <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
    <div className={styles.mobileNavContent}>
      <Link to="/" className={styles.mobileNavLink} onClick={closeMenu}>
        Home
      </Link>
      <Link to="/find-tiler" className={styles.mobileNavLink} onClick={closeMenu}>
        Find Tiler
      </Link>
      <Link to="/estimator" className={styles.mobileNavLink} onClick={closeMenu}>
        Estimator
      </Link>
      <Link to="/blog" className={styles.mobileNavLink} onClick={closeMenu}>
        Blog
      </Link>
      <Link to="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
        Contact
      </Link>
    </div>
  </nav>
</header>
```

);
};

export default Header;