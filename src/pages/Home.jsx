import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="cta-buttons">
        <Link to="/test" className="cta-button">
          Faire le test
        </Link>
        <Link to="/plats" className="cta-button">
          Découvrir nos plats
        </Link>
      </div>
    </div>
  );
}

export default Home;
