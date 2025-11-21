import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import logoFitchen from '../assets/image/LOGO_FITCHEN-removebg-preview.png';
import '../styles/Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const loginPopupRef = useRef(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const loggedIn = localStorage.getItem('fitchen_logged_in');
    setIsLoggedIn(!!loggedIn);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLoginPopup = () => {
    if (isLoggedIn) {
      // Si connecté, rediriger vers Mon Compte
      navigate('/mon-compte');
    } else {
      // Sinon, afficher la popup
      setIsLoginPopupOpen(!isLoginPopupOpen);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Récupérer les données utilisateur
    const userData = localStorage.getItem('fitchen_user');
    
    if (userData) {
      const user = JSON.parse(userData);
      
      // Vérifier les identifiants
      if (user.email === loginData.email && user.password === loginData.password) {
        localStorage.setItem('fitchen_logged_in', 'true');
        setIsLoggedIn(true);
        setIsLoginPopupOpen(false);
        navigate('/mon-compte');
      } else {
        alert('Email ou mot de passe incorrect');
      }
    } else {
      alert('Aucun compte trouvé. Veuillez créer un compte.');
    }
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
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
            {isLoginPopupOpen && !isLoggedIn && (
              <div className="login-popup">
                <h3 className="login-title">Connexion</h3>
                <form className="login-form" onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email" 
                      className="form-input"
                      value={loginData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password"
                      name="password" 
                      placeholder="Mot de passe" 
                      className="form-input"
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="login-submit-btn">
                    Connexion
                  </button>
                  <Link 
                    to="/inscription" 
                    className="create-account-link"
                    onClick={() => setIsLoginPopupOpen(false)}
                  >
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
