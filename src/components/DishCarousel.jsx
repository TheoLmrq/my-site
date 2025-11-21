import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DishCarousel.css';

// Import des nouvelles images
import boeufPoivronRiz from '../assets/image/BOEUF POIVRON RIZ.png';
import chickenCurryPetitPois from '../assets/image/CHICKEN CURRY PETIT POIDS.png';
import patesBolo from '../assets/image/PATES BOLO.png';
import curryVertThai from '../assets/image/CURRY VERT THAI.png';
import patesPouletBrocoli from '../assets/image/PATES POULET BROCCOLI.png';

const dishes = [
  {
    id: 1,
    name: 'Boeuf aux poivrons & riz basmati',
    slug: 'boeuf-poivrons-riz-basmati',
    image: boeufPoivronRiz,
    nutrition: {
      kcal: 545,
      proteins: 44,
      carbs: 55,
      fat: 11
    }
  },
  {
    id: 2,
    name: 'Poulet curry vert & petits pois',
    slug: 'poulet-curry-vert-petits-pois',
    image: chickenCurryPetitPois,
    nutrition: {
      kcal: 500,
      proteins: 39,
      carbs: 54,
      fat: 10
    }
  },
  {
    id: 3,
    name: 'Pâtes complètes à la bolognaise',
    slug: 'pates-bolognaise',
    image: patesBolo,
    nutrition: {
      kcal: 520,
      proteins: 45,
      carbs: 52,
      fat: 12
    }
  },
  {
    id: 4,
    name: 'Curry vert thaï au poulet',
    slug: 'poulet-curry-vert-petits-pois',
    image: curryVertThai,
    nutrition: {
      kcal: 485,
      proteins: 38,
      carbs: 48,
      fat: 13
    }
  },
  {
    id: 5,
    name: 'Pâtes poulet & crème de brocoli',
    slug: 'pates-poulet-brocoli',
    image: patesPouletBrocoli,
    nutrition: {
      kcal: 485,
      proteins: 40,
      carbs: 50,
      fat: 10
    }
  }
];

function DishCarousel() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="dish-carousel-section">
      <div 
        className="carousel-header"
        onClick={() => navigate('/plats')}
        style={{ cursor: 'pointer' }}
      >
        <h2 className="carousel-title">Nos plats</h2>
        <div className="title-underline"></div>
      </div>

      <div 
        className="carousel-container"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="carousel-track">
          {dishes.map((dish) => (
            <div 
              key={dish.id} 
              className="dish-card"
              onClick={() => {
                if (!isDragging) {
                  navigate(`/plats/${dish.slug}`);
                }
              }}
            >
              <div className="dish-image-wrapper">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="dish-image"
                  draggable="false"
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
