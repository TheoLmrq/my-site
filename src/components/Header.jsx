import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logoFitchen from '../assets/image/LOGO_FITCHEN-removebg-preview.png';
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
        <Link to="/" className="logo-link" onClick={() => setIsMobileMenuOpen(false)}>
          <img src={logoFitchen} alt="Fitchen" className="logo-image" />
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
            to="/plats" 
            className={`nav-link ${location.pathname === '/plats' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nos plats
          </Link>
          <Link 
            to="/nos-packs" 
            className={`nav-link ${location.pathname === '/nos-packs' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nos packs
          </Link>
          <Link 
            to="/quiz" 
            className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programme personnalisé
          </Link>
          <Link 
            to="/notre-histoire" 
            className={`nav-link ${location.pathname === '/notre-histoire' ? 'active' : ''}`}
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
