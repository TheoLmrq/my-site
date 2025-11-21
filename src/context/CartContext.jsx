import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Charger le panier depuis localStorage au démarrage
    const savedCart = localStorage.getItem('fitchen_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('fitchen_cart', JSON.stringify(cart));
  }, [cart]);

  // Ajouter un plat au panier
  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      
      if (existingItem) {
        // Si le plat existe déjà, augmenter la quantité
        return prevCart.map(item =>
          item.id === dish.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      } else {
        // Sinon, ajouter le nouveau plat
        return [...prevCart, { ...dish, quantite: 1 }];
      }
    });
  };

  // Retirer un plat du panier
  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== dishId));
  };

  // Mettre à jour la quantité d'un plat
  const updateQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === dishId
          ? { ...item, quantite: newQuantity }
          : item
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total du panier
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.prix * item.quantite), 0);
  };

  // Obtenir le nombre total d'articles
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantite, 0);
  };

  // Obtenir la quantité d'un article spécifique
  const getItemQuantity = (dishId) => {
    const item = cart.find(item => item.id === dishId);
    return item ? item.quantite : 0;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
