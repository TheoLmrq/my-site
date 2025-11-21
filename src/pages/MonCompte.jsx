import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/MonCompte.css';

function MonCompte() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const loggedIn = localStorage.getItem('fitchen_logged_in');
    const userData = localStorage.getItem('fitchen_user');

    if (!loggedIn || !userData) {
      // Rediriger vers l'accueil si non connecté
      navigate('/');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('fitchen_logged_in');
    navigate('/');
  };

  if (!user) {
    return null; // Ou un loader
  }

  return (
    <div className="mon-compte-container">
      <div className="mon-compte-wrapper">
        <button onClick={() => navigate(-1)} className="back-button-compte">
          ← Retour
        </button>

        <div className="compte-header">
          <h1 className="compte-title">Mon Compte</h1>
          <button onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
        </div>

        <div className="compte-content">
          {/* Informations utilisateur */}
          <div className="compte-section">
            <h2 className="section-title">Mes informations</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Email :</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Membre depuis :</span>
                <span className="info-value">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>

          {/* Sections à venir */}
          <div className="compte-section">
            <h2 className="section-title">Mes commandes</h2>
            <div className="empty-section">
              <p>Aucune commande pour le moment</p>
            </div>
          </div>

          <div className="compte-section">
            <h2 className="section-title">Mes préférences</h2>
            <div className="empty-section">
              <p>Section en cours de développement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonCompte;
