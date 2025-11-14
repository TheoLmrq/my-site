import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
          FITCHEN
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/recettes" 
            className={`nav-link ${location.pathname === '/recettes' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nos recettes
          </Link>
          <Link 
            to="/packs" 
            className={`nav-link ${location.pathname === '/packs' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nos packs
          </Link>
          <Link 
            to="/histoire" 
            className={`nav-link ${location.pathname === '/histoire' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Notre histoire
          </Link>
        </nav>

        {/* CTA Button */}
        <Link 
          to="/commander" 
          className="cta-button-nav"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Commander
        </Link>
      </div>
    </header>
  );
}

export default Header;
