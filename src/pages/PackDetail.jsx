import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PackDetail.css';

const packsData = {
  'pack-actifs-5': {
    name: 'Pack Actifs x5',
    subtitle: 'Pour une semaine',
    icon: '📦',
    price: '49.99€',
    description: 'Découvrez nos plats ou complétez vos repas de la semaine avec ce pack de 5 plats équilibrés.',
    features: [
      {
        title: 'Comment ça fonctionne ?',
        points: [
          '5 plats au choix parmi notre sélection',
          'Livrés frais directement chez vous',
          'Prêts en 3 minutes au micro-ondes',
          'Conservation jusqu\'à 7 jours au réfrigérateur'
        ]
      },
      {
        title: 'Idéal pour',
        points: [
          'Compléter vos repas de la semaine de travail',
          'Découvrir notre gamme de plats',
          'Les personnes actives et pressées',
          'Varier vos déjeuners sans cuisiner'
        ]
      },
      {
        title: 'Ce qui est inclus',
        points: [
          '5 plats protéinés au choix',
          'Informations nutritionnelles détaillées',
          'Emballage recyclable',
          'Livraison réfrigérée garantie'
        ]
      }
    ],
    nutritionInfo: {
      calories: '450-550 kcal par plat',
      protein: '35-45g de protéines',
      balanced: 'Équilibre parfait glucides/lipides'
    }
  },
  'pack-actifs-7': {
    name: 'Pack Actifs x7',
    subtitle: '1 repas par jour',
    icon: '📦',
    price: '64.99€',
    description: 'Un repas sain et équilibré pour chaque jour de la semaine. Parfait pour maintenir vos objectifs nutritionnels.',
    features: [
      {
        title: 'Comment ça fonctionne ?',
        points: [
          '7 plats au choix pour toute la semaine',
          'Un repas équilibré chaque jour',
          'Livraison hebdomadaire possible',
          'Réchauffage rapide en 3 minutes'
        ]
      },
      {
        title: 'Idéal pour',
        points: [
          'Structurer votre semaine alimentaire',
          'Atteindre vos objectifs fitness',
          'Gagner du temps sur la préparation des repas',
          'Contrôler vos apports nutritionnels'
        ]
      },
      {
        title: 'Ce qui est inclus',
        points: [
          '7 plats protéinés variés',
          'Planning nutritionnel hebdomadaire',
          'Traçabilité complète des ingrédients',
          'Support client dédié'
        ]
      }
    ],
    nutritionInfo: {
      calories: '450-550 kcal par plat',
      protein: '35-45g de protéines',
      balanced: 'Couvre 1/3 de vos besoins journaliers'
    }
  },
  'pack-full-day': {
    name: 'Pack Full Day',
    subtitle: '2 repas + 2 barres protéinées',
    icon: '📦',
    price: '89.99€',
    description: 'La solution complète pour une journée parfaitement équilibrée. Deux repas complets et deux collations protéinées.',
    features: [
      {
        title: 'Comment ça fonctionne ?',
        points: [
          '2 plats principaux au choix (déjeuner + dîner)',
          '2 barres protéinées pour vos collations',
          'Programme nutritionnel complet pour la journée',
          'Livraison et conservation optimales'
        ]
      },
      {
        title: 'Idéal pour',
        points: [
          'Une journée complètement organisée',
          'Les sportifs en préparation',
          'Optimiser votre nutrition quotidienne',
          'Éviter les écarts alimentaires'
        ]
      },
      {
        title: 'Ce qui est inclus',
        points: [
          '2 plats principaux équilibrés',
          '2 barres protéinées haute qualité',
          'Plan nutritionnel journalier',
          'Guide de consommation optimale'
        ]
      }
    ],
    nutritionInfo: {
      calories: '1800-2200 kcal total/jour',
      protein: '120-150g de protéines',
      balanced: 'Répartition optimale sur la journée'
    }
  }
};

function PackDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pack = packsData[slug];

  if (!pack) {
    return (
      <div className="pack-not-found">
        <h2>Pack non trouvé</h2>
        <button onClick={() => navigate('/nos-packs')} className="back-button">
          ← Retour aux packs
        </button>
      </div>
    );
  }

  return (
    <div className="pack-detail-container">
      <div className="pack-detail-wrapper">
        {/* Back button */}
        <button onClick={() => navigate('/nos-packs')} className="back-link">
          ← Retour aux packs
        </button>

        {/* Header Section */}
        <div className="pack-header">
          <div className="pack-icon">{pack.icon}</div>
          <h1 className="pack-title">{pack.name}</h1>
          <p className="pack-subtitle">{pack.subtitle}</p>
          <p className="pack-description">{pack.description}</p>
          <div className="pack-price">{pack.price}</div>
        </div>

        {/* Nutrition Info */}
        <div className="nutrition-highlight">
          <h3>Informations nutritionnelles</h3>
          <div className="nutrition-cards">
            <div className="nutrition-card">
              <span className="nutrition-label">Calories</span>
              <span className="nutrition-value">{pack.nutritionInfo.calories}</span>
            </div>
            <div className="nutrition-card">
              <span className="nutrition-label">Protéines</span>
              <span className="nutrition-value">{pack.nutritionInfo.protein}</span>
            </div>
            <div className="nutrition-card">
              <span className="nutrition-label">Équilibre</span>
              <span className="nutrition-value">{pack.nutritionInfo.balanced}</span>
            </div>
          </div>
        </div>

        {/* Features Sections */}
        <div className="features-grid">
          {pack.features.map((feature, index) => (
            <div key={index} className="feature-section">
              <h3 className="feature-title">{feature.title}</h3>
              <ul className="feature-list">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="feature-icon">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="pack-cta-section">
          <button className="cta-order-pack">
            Commander ce pack
          </button>
          <button className="cta-customize" onClick={() => navigate('/plats')}>
            Personnaliser mon pack
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackDetail;
