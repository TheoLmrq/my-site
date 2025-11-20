import { Link } from 'react-router-dom';
import DishCarousel from '../components/DishCarousel';
import HowItWorks from '../components/HowItWorks';
import heroImage from '../assets/image/fond heroe.png';
import '../styles/Home.css';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="home-container" style={{backgroundImage: `url(${heroImage})`}}>
        {/* Background Overlay for text readability */}
        <div className="bg-overlay"></div>
        
        {/* Hero Content */}
        <div className="hero-content">
          {/* Left Column - Text & CTAs */}
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="title-line">PRÉPARÉ</span>
              <span className="title-line">POUR</span>
              <span className="title-line gradient-text">PERFORMER.</span>
            </h1>
            
            <p className="hero-subtitle">
              Vos plats sportifs, frais et préparés pour tous vos objectifs, livrés à domicile.
            </p>

            <div className="cta-buttons">
              <Link to="/quiz" className="cta-button cta-primary">
                <span className="button-text">FAIRE LE TEST</span>
              </Link>
              
              <Link to="/plats" className="cta-button cta-secondary">
                <span className="button-text">DÉCOUVRIR NOS PLATS</span>
              </Link>
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
