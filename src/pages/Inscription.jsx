import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Inscription.css';

function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Créer le compte dans localStorage
      const userData = {
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('fitchen_user', JSON.stringify(userData));
      localStorage.setItem('fitchen_logged_in', 'true');
      
      // Rediriger vers la page Mon Compte
      navigate('/mon-compte');
    }
  };

  return (
    <div className="inscription-container">
      <div className="inscription-card">
        <button onClick={() => navigate(-1)} className="back-button-inscription">
          ← Retour
        </button>

        <h1 className="inscription-title">Créer un compte</h1>
        <p className="inscription-subtitle">
          Rejoignez Fitchen et commencez votre parcours nutrition
        </p>

        <form onSubmit={handleSubmit} className="inscription-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="votre@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirmation mot de passe */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="btn-submit-inscription">
            Créer mon compte
          </button>
        </form>

        <div className="login-link">
          Vous avez déjà un compte ?{' '}
          <span onClick={() => navigate('/')} className="link-text">
            Se connecter
          </span>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
