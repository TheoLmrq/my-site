import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getDishBySlug } from '../data/dishes';
import { useCart } from '../context/CartContext';
import '../styles/DishProduct.css';

function DishProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dish = getDishBySlug(slug);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (dish) {
      addToCart({
        id: dish.id,
        nom: dish.name,
        prix: dish.prix,
        image: dish.image,
        calories: dish.nutrition.calories,
        protein: dish.nutrition.protein
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (!dish) {
    return (
      <div className="dish-not-found">
        <h2>Plat non trouvé</h2>
        <button onClick={() => navigate('/plats')} className="back-button">
          ← Retour aux plats
        </button>
      </div>
    );
  }

  const getSpiceLevelIcon = (level) => {
    switch(level) {
      case 'Doux': return '🌶️';
      case 'Moyen': return '🌶️🌶️';
      case 'Fort': return '🌶️🌶️🌶️';
      default: return '';
    }
  };

  return (
    <div className="dish-product-container">
      <div className="dish-product-wrapper">
        {/* Back button */}
        <button onClick={() => navigate('/plats')} className="back-link">
          ← Retour aux recettes
        </button>

        {/* Product Grid */}
        <div className="product-grid">
          {/* Left: Image */}
          <div className="product-image-section">
            <div className="product-image-wrapper">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600/E32626/FFFFFF?text=Plat+Fitchen';
                }}
              />
              {dish.badges && dish.badges.length > 0 && (
                <div className="product-badge">
                  {dish.badges[0]}
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="product-details-section">
            <h1 className="product-name">{dish.name}</h1>
            <p className="product-subtitle">{dish.subtitle}</p>

            {/* Nutrition Grid */}
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <div className="nutrition-value">{dish.nutrition.calories}</div>
                <div className="nutrition-label">KCAL</div>
              </div>
              <div className="nutrition-card">
                <div className="nutrition-value">{dish.nutrition.protein}g</div>
                <div className="nutrition-label">Protéines</div>
              </div>
              <div className="nutrition-card">
                <div className="nutrition-value">{dish.nutrition.carbs}g</div>
                <div className="nutrition-label">Glucides</div>
              </div>
              <div className="nutrition-card">
                <div className="nutrition-value">{dish.nutrition.fat}g</div>
                <div className="nutrition-label">Lipides</div>
              </div>
              <div className="nutrition-card">
                <div className="nutrition-value">{dish.weight}g</div>
                <div className="nutrition-label">Poids</div>
              </div>
            </div>

            {/* Description */}
            <div className="product-description">
              <h3>Description</h3>
              <p>{dish.description}</p>
            </div>

            {/* Badges */}
            {dish.badges && dish.badges.length > 0 && (
              <div className="product-badges">
                {dish.badges.map((badge, index) => (
                  <span key={index} className="badge-pill">{badge}</span>
                ))}
                {dish.spiceLevel && (
                  <span className="badge-pill spice-badge">
                    {getSpiceLevelIcon(dish.spiceLevel)} {dish.spiceLevel}
                  </span>
                )}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="product-actions">
              <button 
                className={`cta-add-cart ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? '✓ Ajouté !' : 'Ajouter au panier'}
              </button>
              <button className="cta-order" onClick={() => navigate('/panier')}>
                Voir le panier
              </button>
            </div>

            {/* Prix */}
            {dish.prix && (
              <div className="product-price">
                {dish.prix.toFixed(2)}€
              </div>
            )}

            {/* Additional Info */}
            <div className="product-info-footer">
              <p>✓ Préparé avec des ingrédients frais</p>
              <p>✓ Livraison à domicile</p>
              <p>✓ Adapté à vos objectifs sportifs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishProduct;
