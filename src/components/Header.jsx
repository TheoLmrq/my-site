import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import logoFitchen from '../assets/image/LOGO_FITCHEN-removebg-preview.png';
import '../styles/Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const location = useLocation();
  const loginPopupRef = useRef(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  // Fermer la popup si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginPopupRef.current && !loginPopupRef.current.contains(event.target)) {
        setIsLoginPopupOpen(false);
      }
    };

    if (isLoginPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginPopupOpen]);

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

        {/* User Actions - Panier & Compte */}
        <div className="user-actions">
          {/* Bouton Panier avec badge */}
          <Link to="/panier" className="icon-button cart-button" title="Panier">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Bouton Compte */}
          <div className="account-wrapper" ref={loginPopupRef}>
            <button 
              className="icon-button account-button" 
              onClick={toggleLoginPopup}
              title="Mon compte"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {/* Popup de connexion */}
            {isLoginPopupOpen && (
              <div className="login-popup">
                <h3 className="login-title">Connexion</h3>
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password" 
                      placeholder="Mot de passe" 
                      className="form-input"
                      required
                    />
                  </div>
                  <button type="submit" className="login-submit-btn">
                    Connexion
                  </button>
                  <Link to="/inscription" className="create-account-link">
                    Créer un compte
                  </Link>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
