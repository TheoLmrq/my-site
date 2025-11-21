import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Panier.css';

function Panier() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();

  const handleQuantityChange = (itemId, change) => {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantite + change);
    }
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide');
      return;
    }
    // Redirection vers la page de commande
    navigate('/commander');
  };

  return (
    <div className="panier-container">
      <div className="panier-wrapper">
        {/* Bouton retour */}
        <button onClick={() => navigate('/plats')} className="back-link">
          ← Retour aux plats
        </button>

        {/* Header */}
        <div className="panier-header">
          <h1 className="panier-title">Mon Panier</h1>
          <p className="panier-count">
            {getCartCount()} article{getCartCount() > 1 ? 's' : ''}
          </p>
        </div>

        {cart.length === 0 ? (
          /* Panier vide */
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos plats et commencez à composer votre panier</p>
            <button onClick={() => navigate('/plats')} className="btn-browse">
              Découvrir nos plats
            </button>
          </div>
        ) : (
          /* Panier avec articles */
          <div className="cart-content">
            {/* Liste des articles */}
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.image} 
                      alt={item.nom}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x120/E32626/FFFFFF?text=Plat';
                      }}
                    />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.nom}</h3>
                    <div className="item-info">
                      {item.calories && <span>{item.calories} kcal</span>}
                      {item.protein && <span> • {item.protein}g protéines</span>}
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantite}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    {item.prix ? `${(item.prix * item.quantite).toFixed(2)}€` : 'Prix à définir'}
                  </div>

                  <button 
                    className="item-remove"
                    onClick={() => removeFromCart(item.id)}
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé de la commande */}
            <div className="cart-summary">
              <h3 className="summary-title">Résumé de la commande</h3>
              
              <div className="summary-line">
                <span>Sous-total</span>
                <span>{getCartTotal().toFixed(2)}€</span>
              </div>

              <div className="summary-line">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">{getCartTotal().toFixed(2)}€</span>
              </div>

              <button className="btn-order" onClick={handleOrder}>
                Commander
              </button>

              <button className="btn-clear" onClick={clearCart}>
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panier;
