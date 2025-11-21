import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dishes } from '../data/dishes';
import { useCart } from '../context/CartContext';
import '../styles/Plats.css';

function Plats() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (e, dish) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: dish.id,
      nom: dish.name,
      prix: dish.prix,
      image: dish.image,
      calories: dish.nutrition.calories,
      protein: dish.nutrition.protein
    });

    setAddedItems(prev => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  return (
    <div className="plats-container">
      <button onClick={() => navigate(-1)} className="back-button-plats">
        ← Retour
      </button>

      <h1 className="plats-title">NOS PLATS</h1>
      
      <div className="plats-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-card-plats">
            <Link to={`/plats/${dish.slug}`} className="dish-image-link">
              <div className="dish-image-container">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="dish-image-plats"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300/E32626/FFFFFF?text=Plat';
                  }}
                />
                {dish.badges && dish.badges.length > 0 && (
                  <div className="dish-badge-plats">
                    {dish.badges[0]}
                  </div>
                )}
              </div>
            </Link>
            
            <div className="dish-info-plats">
              <Link to={`/plats/${dish.slug}`} className="dish-name-link">
                <h3 className="dish-name-plats">{dish.name}</h3>
              </Link>

              <div className="dish-price-plats">
                {dish.prix.toFixed(2)}€
              </div>

              <div className="macros-inline">
                <div className="macro-item">
                  <span className="macro-value">{dish.nutrition.calories}</span>
                  <span className="macro-label">kcal</span>
                </div>
                <div className="macro-divider">|</div>
                <div className="macro-item">
                  <span className="macro-value">{dish.nutrition.protein}g</span>
                  <span className="macro-label">P</span>
                </div>
                <div className="macro-divider">|</div>
                <div className="macro-item">
                  <span className="macro-value">{dish.nutrition.carbs}g</span>
                  <span className="macro-label">G</span>
                </div>
                <div className="macro-divider">|</div>
                <div className="macro-item">
                  <span className="macro-value">{dish.nutrition.fat}g</span>
                  <span className="macro-label">L</span>
                </div>
              </div>

              <button 
                className={`btn-add-cart ${addedItems[dish.id] ? 'added' : ''}`}
                onClick={(e) => handleAddToCart(e, dish)}
              >
                {addedItems[dish.id] ? '✓ Ajouté !' : 'Ajouter au panier'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plats;
