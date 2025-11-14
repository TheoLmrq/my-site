import { useRef, useEffect } from 'react';
import '../styles/DishCarousel.css';

// Import des images
import beefPastaBolognese from '../assets/image/BEEF PASTA - BOLOGNESE.png';
import beefRiceMassaman from '../assets/image/BEEF RICE - SAUCE MASSAMAN.png';
import chickenPastaCremeBrocoli from '../assets/image/CHICKEN PASTA - CREME BROCOLI.png';
import chickenPastaPestoBrocoli from '../assets/image/CHICKEN PASTA - CREMY PESTO BROCOLI.png';
import chickenPastaTomates from '../assets/image/CHICKEN PASTA - TOMATES SECHEES.png';
import riceBeefBrocoli from '../assets/image/RICE BEEF - BROCOLI POIVRON .png';
import riceChickenCurry from '../assets/image/RICE CHICKEN - CURRY PETIT POIS.png';

const dishes = [
  {
    id: 1,
    name: 'Beef Pasta – Bolognese',
    image: beefPastaBolognese,
    nutrition: {
      kcal: 520,
      proteins: 45,
      carbs: 52,
      fat: 12
    }
  },
  {
    id: 2,
    name: 'Beef Rice – Sauce Massaman',
    image: beefRiceMassaman,
    nutrition: {
      kcal: 580,
      proteins: 42,
      carbs: 58,
      fat: 15
    }
  },
  {
    id: 3,
    name: 'Chicken Pasta – Crème Brocoli',
    image: chickenPastaCremeBrocoli,
    nutrition: {
      kcal: 485,
      proteins: 40,
      carbs: 50,
      fat: 10
    }
  },
  {
    id: 4,
    name: 'Chicken Pasta – Crémy Pesto Brocoli',
    image: chickenPastaPestoBrocoli,
    nutrition: {
      kcal: 510,
      proteins: 38,
      carbs: 48,
      fat: 14
    }
  },
  {
    id: 5,
    name: 'Chicken Pasta – Tomates Séchées',
    image: chickenPastaTomates,
    nutrition: {
      kcal: 475,
      proteins: 41,
      carbs: 49,
      fat: 9
    }
  },
  {
    id: 6,
    name: 'Rice Beef – Brocoli Poivron',
    image: riceBeefBrocoli,
    nutrition: {
      kcal: 545,
      proteins: 44,
      carbs: 55,
      fat: 11
    }
  },
  {
    id: 7,
    name: 'Rice Chicken – Curry Petit Pois',
    image: riceChickenCurry,
    nutrition: {
      kcal: 500,
      proteins: 39,
      carbs: 54,
      fat: 10
    }
  }
];

function DishCarousel() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    let animationFrameId;

    const autoScroll = () => {
      scrollAmount += scrollSpeed;
      
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="dish-carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">Nos plats</h2>
        <div className="title-underline"></div>
      </div>

      <div className="carousel-container" ref={scrollContainerRef}>
        <div className="carousel-track">
          {/* Duplicate dishes for infinite scroll effect */}
          {[...dishes, ...dishes].map((dish, index) => (
            <div key={`${dish.id}-${index}`} className="dish-card">
              <div className="dish-image-wrapper">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="dish-image"
                />
                <div className="dish-overlay"></div>
              </div>
              
              <div className="dish-info">
                <h3 className="dish-name">{dish.name}</h3>
                
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-value">{dish.nutrition.kcal}</span>
                    <span className="nutrition-label">kcal</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{dish.nutrition.proteins}g</span>
                    <span className="nutrition-label">protéines</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{dish.nutrition.carbs}g</span>
                    <span className="nutrition-label">glucides</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{dish.nutrition.fat}g</span>
                    <span className="nutrition-label">lipides</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DishCarousel;
