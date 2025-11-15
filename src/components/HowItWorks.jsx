import { useState } from 'react';
import '../styles/HowItWorks.css';

const tabs = [
  {
    id: 1,
    icon: '⚡',
    title: 'Personnalisation avancée',
    description: 'On calcule tes besoins à partir de ton sport, ton objectif et ton métabolisme.',
    content: {
      title: 'Ton profil calculé',
      type: 'profile',
      data: {
        calories: 2450,
        progress: 75,
        macros: [
          { name: 'Protéines', value: 142, unit: 'g', color: '#E32626' },
          { name: 'Glucides', value: 285, unit: 'g', color: '#00B4FF' },
          { name: 'Lipides', value: 68, unit: 'g', color: '#FFD700' }
        ]
      }
    }
  },
  {
    id: 2,
    icon: '🚚',
    title: 'Des plats frais, livrés chez toi',
    description: 'Nos plats sont disponibles en 3 tailles (S, M, L), pour s\'adapter précisément à tes besoins énergétiques.',
    content: {
      title: 'Livraison hebdomadaire',
      type: 'list',
      items: [
        'Tu choisis selon ton objectif, ton appétit ou ton entraînement du jour',
        'On te livre des repas frais, prêts à déguster',
        'Plus besoin de peser, de cuisiner ou de réfléchir : tu n\'as qu\'à réchauffer, manger, performer'
      ]
    }
  },
  {
    id: 3,
    icon: '💪',
    title: 'Zéro stress, 100 % énergie',
    description: 'Plus de menus à planifier ni de macros à compter : tu suis ton plan, on s\'occupe du reste.',
    content: {
      title: 'Ta journée simplifiée',
      type: 'timeline',
      items: [
        { icon: '🧠', text: 'Moins de charge mentale, plus de régularité' },
        { icon: '⚡', text: 'Apport énergétique suffisant pour tenir ta journée' },
        { icon: '�️', text: 'Performance assurée à l\'entraînement' },
        { icon: '😴', text: 'Récupération optimale' }
      ]
    }
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'Flexible & évolutif',
    description: 'Tu peux ajuster ton objectif ou ton plan à tout moment.',
    content: {
      title: 'Ton dashboard',
      type: 'dashboard',
      items: [
        { label: 'Objectif actuel', value: 'Prise de masse musculaire', action: 'Modifier' },
        { label: 'Fréquence de livraison', value: '1x par semaine', action: 'Ajuster' },
        { label: 'Abonnement', value: 'Actif', action: 'Mettre en pause' }
      ]
    }
  }
];

function HowItWorks() {
  const [activeTab, setActiveTab] = useState(1);
  
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  const renderContent = () => {
    if (!activeContent) return null;

    switch (activeContent.type) {
      case 'profile':
        return (
          <div className="content-card profile-card">
            <div className="calories-section">
              <div className="calories-label">Calories / jour</div>
              <div className="calories-value">{activeContent.data.calories}</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${activeContent.data.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="macros-grid">
              {activeContent.data.macros.map((macro, index) => (
                <div key={index} className="macro-item">
                  <div 
                    className="macro-indicator" 
                    style={{ backgroundColor: macro.color }}
                  ></div>
                  <span className="macro-value">{macro.value} {macro.unit}</span>
                  <span className="macro-name">{macro.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="content-card list-card">
            <ul className="feature-list">
              {activeContent.items.map((item, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-bullet">→</span>
                  <span className="feature-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'timeline':
        return (
          <div className="content-card timeline-card">
            <div className="timeline-items">
              {activeContent.items.map((item, index) => (
                <div key={index} className="timeline-item">
                  <span className="timeline-icon">{item.icon}</span>
                  <span className="timeline-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="content-card dashboard-card">
            {activeContent.items.map((item, index) => (
              <div key={index} className="dashboard-row">
                <div className="dashboard-info">
                  <div className="dashboard-label">{item.label}</div>
                  <div className="dashboard-value">{item.value}</div>
                </div>
                <button className="dashboard-action">{item.action}</button>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle">
            Découvre tout ce que Fitchen peut faire pour toi
          </p>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Left Column - Tabs */}
          <div className="tabs-column">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-card ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon">{tab.icon}</div>
                <div className="tab-content">
                  <h3 className="tab-title">{tab.title}</h3>
                  <p className="tab-description">{tab.description}</p>
                </div>
                <div className="tab-arrow">→</div>
              </button>
            ))}
          </div>

          {/* Right Column - Dynamic Panel */}
          <div className="panel-column">
            <div className="panel-wrapper">
              <h3 className="panel-title">{activeContent?.title}</h3>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
