import { Link } from 'react-router-dom';
import DishCarousel from '../components/DishCarousel';
import HowItWorks from '../components/HowItWorks';
import lot1Image from '../assets/image/LOT 1.png';
import '../styles/Home.css';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="home-container">
        {/* Animated Background */}
        <div className="bg-overlay"></div>
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}></div>
          ))}
        </div>
        
        {/* Light Streaks */}
        <div className="light-streaks">
          <div className="streak streak-1"></div>
          <div className="streak streak-2"></div>
          <div className="streak streak-3"></div>
        </div>

        {/* Hero Content - Two Columns */}
        <div className="hero-content">
          {/* Left Column - Text & CTAs */}
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="title-line">PUSH YOUR</span>
              <span className="title-line gradient-text">LIMITS</span>
            </h1>
            
            <p className="hero-subtitle">
              Découvrez votre potentiel. Optimisez vos performances.
            </p>

            <p className="hero-description">
              Des repas adaptés à ton métabolisme et tes objectifs.
            </p>

            <div className="cta-buttons">
              <Link to="/quiz" className="cta-button cta-primary">
                <span className="button-glow"></span>
                <span className="button-text">Faire le test</span>
              </Link>
              
              <Link to="/plats" className="cta-button cta-secondary">
                <span className="button-text">Découvrir nos plats</span>
              </Link>
            </div>
          </div>

          {/* Right Column - LOT 1 Image */}
          <div className="hero-right">
            <div className="hero-image-container">
              <img 
                src={lot1Image} 
                alt="LOT 1 Fitchen" 
                className="hero-image"
              />
            </div>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="grid-overlay"></div>
      </div>
      
      {/* Dish Carousel Section */}
      <DishCarousel />
      
      {/* How It Works Section */}
      <HowItWorks />
    </>
  );
}

export default Home;
