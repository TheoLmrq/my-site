import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Results.css';

function Results() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Récupérer les réponses du quiz
    const savedAnswers = localStorage.getItem('fitchen_quiz_answers');
    if (!savedAnswers) {
      navigate('/quiz');
      return;
    }

    const parsedAnswers = JSON.parse(savedAnswers);
    setAnswers(parsedAnswers);

    // Calculer les résultats
    calculateResults(parsedAnswers);
  }, [navigate]);

  const calculateResults = (data) => {
    // Extraction des données
    const birthDate = data[1]?.split('/');
    const sex = data[2];
    const height = parseInt(data[3]);
    const weight = parseInt(data[4]);
    const objective = data[5];
    const activity = data[6];

    if (!birthDate || !sex || !height || !weight) {
      return;
    }

    // Calcul de l'âge
    const year = parseInt(birthDate[2]);
    const age = 2025 - year;

    // Calcul du TMB (Taux Métabolique de Base) - Formule de Mifflin-St Jeor
    let tmb;
    if (sex === 'homme') {
      tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Facteur d'activité
    const activityFactors = {
      'sedentary': 1.2,
      'moderate': 1.375,
      'active': 1.55,
      'very-active': 1.725
    };

    const activityFactor = activityFactors[activity] || 1.2;
    const maintenanceCalories = Math.round(tmb * activityFactor);

    // Ajustement selon l'objectif
    let targetCalories;
    let proteinGrams;
    let carbsGrams;
    let fatGrams;
    let objectiveText;

    switch (objective) {
      case 'muscle':
        targetCalories = Math.round(maintenanceCalories * 1.1); // +10%
        proteinGrams = Math.round(weight * 2.2);
        fatGrams = Math.round(weight * 1);
        carbsGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
        objectiveText = 'Prise de muscle';
        break;
      case 'lose':
        targetCalories = Math.round(maintenanceCalories * 0.8); // -20%
        proteinGrams = Math.round(weight * 2);
        fatGrams = Math.round(weight * 0.8);
        carbsGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
        objectiveText = 'Perte de poids';
        break;
      case 'gain':
        targetCalories = Math.round(maintenanceCalories * 1.15); // +15%
        proteinGrams = Math.round(weight * 1.8);
        fatGrams = Math.round(weight * 1.2);
        carbsGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
        objectiveText = 'Prise de poids';
        break;
      case 'maintain':
        targetCalories = maintenanceCalories;
        proteinGrams = Math.round(weight * 1.6);
        fatGrams = Math.round(weight * 1);
        carbsGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
        objectiveText = 'Maintien du poids';
        break;
      default:
        targetCalories = maintenanceCalories;
        proteinGrams = Math.round(weight * 1.6);
        fatGrams = Math.round(weight * 1);
        carbsGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
        objectiveText = 'Maintien du poids';
    }

    setResults({
      age,
      sex,
      height,
      weight,
      objective: objectiveText,
      tmb: Math.round(tmb),
      maintenanceCalories,
      targetCalories,
      macros: {
        protein: proteinGrams,
        carbs: carbsGrams,
        fat: fatGrams
      }
    });
  };

  const handleRestart = () => {
    localStorage.removeItem('fitchen_quiz_answers');
    navigate('/quiz');
  };

  const handleOrder = () => {
    navigate('/commander');
  };

  if (!results) {
    return (
      <div className="results-container">
        <div className="loading">Calcul de tes résultats...</div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="results-title">Ton plan personnalisé</h1>
        <p className="results-subtitle">Basé sur ton profil et tes objectifs</p>
      </div>

      <div className="results-grid">
        {/* Profil */}
        <div className="result-card profile-card">
          <div className="card-icon">👤</div>
          <h3>Ton profil</h3>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Âge</span>
              <span className="info-value">{results.age} ans</span>
            </div>
            <div className="info-item">
              <span className="info-label">Taille</span>
              <span className="info-value">{results.height} cm</span>
            </div>
            <div className="info-item">
              <span className="info-label">Poids</span>
              <span className="info-value">{results.weight} kg</span>
            </div>
            <div className="info-item">
              <span className="info-label">Objectif</span>
              <span className="info-value">{results.objective}</span>
            </div>
          </div>
        </div>

        {/* Calories */}
        <div className="result-card calories-card">
          <div className="card-icon">🔥</div>
          <h3>Tes besoins caloriques</h3>
          <div className="calories-info">
            <div className="calorie-block">
              <div className="calorie-label">Métabolisme de base</div>
              <div className="calorie-value">{results.tmb} <span>kcal</span></div>
            </div>
            <div className="calorie-divider">→</div>
            <div className="calorie-block">
              <div className="calorie-label">Maintenance</div>
              <div className="calorie-value">{results.maintenanceCalories} <span>kcal</span></div>
            </div>
            <div className="calorie-divider">→</div>
            <div className="calorie-block highlight">
              <div className="calorie-label">Objectif</div>
              <div className="calorie-value main">{results.targetCalories} <span>kcal</span></div>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="result-card macros-card">
          <div className="card-icon">🥗</div>
          <h3>Répartition des macros</h3>
          <div className="macros-info">
            <div className="macro-item protein">
              <div className="macro-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    strokeDasharray={`${(results.macros.protein * 4 / results.targetCalories) * 283} 283`}
                  />
                </svg>
                <div className="macro-percentage">
                  {Math.round((results.macros.protein * 4 / results.targetCalories) * 100)}%
                </div>
              </div>
              <div className="macro-label">Protéines</div>
              <div className="macro-value">{results.macros.protein}g</div>
            </div>
            <div className="macro-item carbs">
              <div className="macro-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    strokeDasharray={`${(results.macros.carbs * 4 / results.targetCalories) * 283} 283`}
                  />
                </svg>
                <div className="macro-percentage">
                  {Math.round((results.macros.carbs * 4 / results.targetCalories) * 100)}%
                </div>
              </div>
              <div className="macro-label">Glucides</div>
              <div className="macro-value">{results.macros.carbs}g</div>
            </div>
            <div className="macro-item fat">
              <div className="macro-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    strokeDasharray={`${(results.macros.fat * 9 / results.targetCalories) * 283} 283`}
                  />
                </svg>
                <div className="macro-percentage">
                  {Math.round((results.macros.fat * 9 / results.targetCalories) * 100)}%
                </div>
              </div>
              <div className="macro-label">Lipides</div>
              <div className="macro-value">{results.macros.fat}g</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="results-cta">
        <button className="cta-primary" onClick={handleOrder}>
          Commander mes repas personnalisés
        </button>
        <button className="cta-secondary" onClick={handleRestart}>
          Refaire le test
        </button>
      </div>

      {/* Background */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
    </div>
  );
}

export default Results;
