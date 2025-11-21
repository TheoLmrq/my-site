import { Link, useNavigate } from 'react-router-dom';
import { dishes } from '../data/dishes';
import { useCart } from '../context/CartContext';
import '../styles/Plats.css';

function Plats() {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

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
  };

  const handleIncrease = (e, dishId) => {
    e.preventDefault();
    e.stopPropagation();
    const currentQty = getItemQuantity(dishId);
    updateQuantity(dishId, currentQty + 1);
  };

  const handleDecrease = (e, dish) => {
    e.preventDefault();
    e.stopPropagation();
    const currentQty = getItemQuantity(dish.id);
    
    if (currentQty > 1) {
      updateQuantity(dish.id, currentQty - 1);
    } else {
      // Si quantité = 0, on retire du panier
      updateQuantity(dish.id, 0);
    }
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

              {getItemQuantity(dish.id) === 0 ? (
                <button 
                  className="btn-add-cart"
                  onClick={(e) => handleAddToCart(e, dish)}
                >
                  Ajouter au panier
                </button>
              ) : (
                <div className="quantity-control-bandeau">
                  <button 
                    className="qty-btn-minus"
                    onClick={(e) => handleDecrease(e, dish)}
                  >
                    −
                  </button>
                  <span className="qty-display">
                    {getItemQuantity(dish.id)}
                  </span>
                  <button 
                    className="qty-btn-plus"
                    onClick={(e) => handleIncrease(e, dish.id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plats;
