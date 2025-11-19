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
    // Mapping des sports spécifiques
    const sportSpecificNames = {
      // Endurance
      'running': 'Course à pied',
      'trail': 'Trail',
      'walking': 'Marche sportive',
      'cycling': 'Cyclisme / VTT',
      'swimming': 'Natation',
      'triathlon': 'Triathlon',
      // Musculation
      'bodybuilding': 'Musculation',
      'crossfit': 'CrossFit',
      'weightlifting': 'Haltérophilie',
      'hiit': 'HIIT / Circuit training',
      'gym': 'Fitness en salle',
      // Combat
      'boxing': 'Boxe anglaise',
      'muaythai': 'Boxe thaï / kickboxing',
      'mma': 'MMA',
      'bjj': 'Jiu-Jitsu Brésilien (JJB)',
      'judo': 'Judo',
      'karate': 'Karaté',
      // Collectif
      'football': 'Football',
      'basketball': 'Basketball',
      'handball': 'Handball',
      'rugby': 'Rugby',
      'volleyball': 'Volleyball',
      // Raquette
      'tennis': 'Tennis',
      'padel': 'Padel',
      'squash': 'Squash',
      'badminton': 'Badminton',
      // Glisse
      'ski': 'Ski',
      'snowboard': 'Snowboard',
      'surf': 'Surf',
      'skateboard': 'Skateboard',
      'roller': 'Roller',
      // Technique
      'golf': 'Golf',
      'archery': 'Tir à l\'arc',
      'fencing': 'Escrime',
      'tabletennis': 'Tennis de table',
      // Artistique
      'dance': 'Danse',
      'zumba': 'Fitness chorégraphié',
      'gymnastics': 'Gymnastique',
      'yoga': 'Yoga',
      'pilates': 'Pilates',
      // Mécanique
      'moto': 'Moto',
      'karting': 'Karting',
      'offroad': 'Véhicules off-road',
      // Aucun
      'Marche / Aucun sport': 'Marche / Aucun sport'
    };

    // Extraction des données
    const birthDate = data[1]?.split('/');
    const sex = data[2];
    const height = parseInt(data[3]);
    const weight = parseInt(data[4]);
    const objective = data[5];
    const activityData = data[6]; // Peut être un objet {activity, steps} ou une string
    const sportCategory = data[7];
    const sportSpecific = data[8];

    if (!birthDate || !sex || !height || !weight) {
      return;
    }

    // Extraction activité et pas
    let activity, steps;
    if (typeof activityData === 'object') {
      activity = activityData.activity;
      steps = activityData.steps;
    } else {
      activity = activityData;
      steps = 'Non renseigné';
    }

    // Calcul de l'âge
    const year = parseInt(birthDate[2]);
    const age = 2025 - year;

    // ÉTAPE 1.1 - BMR (Mifflin-St Jeor)
    let bmr;
    if (sex === 'homme') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // ÉTAPE 1.2 - Facteur activité quotidienne
    const activityFactors = {
      'sedentary': 0.00,
      'moderate': 0.10,
      'active': 0.20,
      'very-active': 0.30
    };
    const activityBonus = activityFactors[activity] || 0;

    // ÉTAPE 1.3 - Facteur lié au sport
    const sportFactors = {
      'endurance': 0.25,
      'musculation': 0.20,
      'combat': 0.25,
      'collectif': 0.25,
      'raquette': 0.15,
      'glisse': 0.10,
      'technique': 0.10,
      'artistique': 0.10,
      'mecanique': 0.00,
      'none': 0.00
    };
    const sportBonus = sportFactors[sportCategory] || 0;

    // Calcul TDEE base
    const tdeeBase = bmr * (1 + activityBonus + sportBonus);

    // ÉTAPE 1.4 - Ajustement selon objectif
    let calorieAdjustment = 1;
    let objectiveText = '';
    switch (objective) {
      case 'muscle':
        calorieAdjustment = 1.125; // +12.5%
        objectiveText = 'Prise de muscle';
        break;
      case 'lose':
        calorieAdjustment = 0.80; // -20%
        objectiveText = 'Perte de poids';
        break;
      case 'gain':
        calorieAdjustment = 1.125; // +12.5%
        objectiveText = 'Prise de poids';
        break;
      case 'maintain':
        calorieAdjustment = 1.0;
        objectiveText = 'Maintien du poids';
        break;
      default:
        calorieAdjustment = 1.0;
        objectiveText = 'Maintien du poids';
    }

    let targetCalories = Math.round(tdeeBase * calorieAdjustment);

    // ÉTAPE 1.5 - Anti-aberration calories
    const minCalories = sex === 'homme' ? 1600 : 1300;
    const maxCalories = 4500;
    targetCalories = Math.max(minCalories, Math.min(maxCalories, targetCalories));

    // ÉTAPE 2 & 3 & 4 - Calcul des macros selon sport + objectif
    let proteinPerKg, carbsPercent, fatPercent;

    // Déterminer protéines selon sport et objectif
    if (sportCategory === 'endurance') {
      proteinPerKg = objective === 'lose' ? 1.7 : 1.6;
      carbsPercent = objective === 'lose' ? 0.50 : 0.60;
      fatPercent = 0.20;
    } else if (sportCategory === 'musculation') {
      proteinPerKg = objective === 'muscle' ? 1.9 : (objective === 'lose' ? 2.0 : 1.8);
      carbsPercent = objective === 'lose' ? 0.35 : 0.50;
      fatPercent = objective === 'lose' ? 0.25 : 0.22;
    } else if (sportCategory === 'combat') {
      proteinPerKg = objective === 'lose' ? 2.0 : 1.8;
      carbsPercent = objective === 'lose' ? 0.35 : 0.50;
      fatPercent = 0.22;
    } else if (sportCategory === 'collectif') {
      proteinPerKg = objective === 'lose' ? 1.8 : 1.7;
      carbsPercent = objective === 'lose' ? 0.40 : 0.55;
      fatPercent = 0.23;
    } else if (sportCategory === 'raquette' || sportCategory === 'glisse') {
      proteinPerKg = objective === 'lose' ? 1.7 : 1.6;
      carbsPercent = objective === 'lose' ? 0.40 : 0.52;
      fatPercent = 0.24;
    } else if (sportCategory === 'technique' || sportCategory === 'artistique') {
      proteinPerKg = objective === 'lose' ? 1.6 : 1.5;
      carbsPercent = objective === 'lose' ? 0.35 : 0.48;
      fatPercent = 0.25;
    } else { // none ou mecanique
      proteinPerKg = objective === 'lose' ? 1.7 : 1.5;
      carbsPercent = objective === 'lose' ? 0.30 : 0.45;
      fatPercent = objective === 'lose' ? 0.30 : 0.28;
    }

    // Calcul des grammes
    let proteinGrams = Math.round(weight * proteinPerKg);
    const proteinCalories = proteinGrams * 4;
    
    const fatCalories = Math.round(targetCalories * fatPercent);
    let fatGrams = Math.round(fatCalories / 9);
    
    const carbsCalories = targetCalories - proteinCalories - fatCalories;
    let carbsGrams = Math.round(carbsCalories / 4);

    // ÉTAPE 5 - Anti-aberration macros
    const minProteinPerKg = 1.4;
    const maxProteinPerKg = 2.2;
    proteinGrams = Math.max(
      Math.round(weight * minProteinPerKg),
      Math.min(Math.round(weight * maxProteinPerKg), proteinGrams)
    );

    // Garantir lipides >= 20%
    const minFatCalories = targetCalories * 0.20;
    const minFatGrams = Math.round(minFatCalories / 9);
    fatGrams = Math.max(minFatGrams, fatGrams);

    // Recalculer glucides pour équilibrer à 100%
    const usedCalories = (proteinGrams * 4) + (fatGrams * 9);
    carbsGrams = Math.round((targetCalories - usedCalories) / 4);

    // Garantir glucides minimaux si sportif
    if (sportCategory !== 'none' && sportCategory !== 'mecanique') {
      const minCarbsGrams = Math.round(weight * 2);
      carbsGrams = Math.max(minCarbsGrams, carbsGrams);
    }

    // Recalcul final des pourcentages
    const totalCalories = (proteinGrams * 4) + (carbsGrams * 4) + (fatGrams * 9);
    const proteinPercent = Math.round((proteinGrams * 4 / totalCalories) * 100);
    const carbsPercentFinal = Math.round((carbsGrams * 4 / totalCalories) * 100);
    const fatPercentFinal = Math.round((fatGrams * 9 / totalCalories) * 100);

    // Noms des sports
    const sportCategoryNames = {
      'endurance': 'Endurance',
      'musculation': 'Musculation & Fitness',
      'combat': 'Sports de combat',
      'collectif': 'Sports collectifs',
      'raquette': 'Sports de raquette',
      'glisse': 'Sports de glisse',
      'technique': 'Sports techniques',
      'artistique': 'Sports artistiques',
      'mecanique': 'Sports mécaniques',
      'none': 'Aucun sport'
    };

    const activityNames = {
      'sedentary': 'Sédentaire',
      'moderate': 'Modérément actif',
      'active': 'Assez actif',
      'very-active': 'Très actif'
    };

    setResults({
      age,
      sex,
      height,
      weight,
      objective: objectiveText,
      activity: activityNames[activity] || activity,
      steps,
      sportCategory: sportCategoryNames[sportCategory] || sportCategory,
      sportSpecific: sportSpecificNames[sportSpecific] || sportSpecific,
      bmr: Math.round(bmr),
      tdee: Math.round(tdeeBase),
      targetCalories: Math.round(totalCalories),
      macros: {
        protein: { grams: proteinGrams, percent: proteinPercent, perKg: proteinPerKg },
        carbs: { grams: carbsGrams, percent: carbsPercentFinal },
        fat: { grams: fatGrams, percent: fatPercentFinal }
      },
      explanations: {
        calories: generateCalorieExplanation(objective, activity, sportCategory, calorieAdjustment),
        protein: generateProteinExplanation(objective, sportCategory, proteinPerKg),
        carbs: generateCarbsExplanation(objective, sportCategory, carbsPercentFinal),
        fat: generateFatExplanation(fatPercentFinal)
      }
    });
  };

  const generateCalorieExplanation = (objective, activity, sport, adjustment) => {
    const adjustText = adjustment > 1 ? `+${Math.round((adjustment - 1) * 100)}%` : 
                       adjustment < 1 ? `${Math.round((adjustment - 1) * 100)}%` : 
                       'maintien';
    return `Calories ajustées à ${adjustText} pour ${objective.toLowerCase()} avec une activité ${activity} et pratique de ${sport}.`;
  };

  const generateProteinExplanation = (objective, sport, perKg) => {
    if (sport === 'musculation' || sport === 'combat') {
      return `Protéines élevées (${perKg}g/kg) pour maximiser la récupération musculaire et la performance en ${sport}.`;
    } else if (sport === 'endurance') {
      return `Protéines modérées (${perKg}g/kg) pour soutenir l'endurance sans surcharger la digestion.`;
    } else if (objective === 'lose') {
      return `Protéines augmentées (${perKg}g/kg) pour préserver la masse musculaire pendant la perte de poids.`;
    }
    return `Protéines optimales (${perKg}g/kg) pour votre profil et vos objectifs.`;
  };

  const generateCarbsExplanation = (objective, sport, percent) => {
    if (sport === 'endurance') {
      return `Glucides élevés (${percent}%) pour fournir l'énergie nécessaire aux efforts prolongés.`;
    } else if (sport === 'musculation') {
      return `Glucides modérés-élevés (${percent}%) pour alimenter les entraînements intenses et la récupération.`;
    } else if (objective === 'lose') {
      return `Glucides réduits (${percent}%) pour favoriser l'utilisation des graisses comme source d'énergie.`;
    }
    return `Glucides équilibrés (${percent}%) adaptés à votre niveau d'activité.`;
  };

  const generateFatExplanation = (percent) => {
    return `Lipides à ${percent}% pour maintenir l'équilibre hormonal et l'absorption des vitamines.`;
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
              <span className="info-label">Sexe</span>
              <span className="info-value">{results.sex === 'homme' ? 'Homme' : 'Femme'}</span>
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
              <span className="info-value">{results.objectiveText}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Activité</span>
              <span className="info-value">{results.activity}</span>
            </div>
            {results.steps && results.steps !== 'Non renseigné' && results.steps > 0 && (
              <div className="info-item">
                <span className="info-label">Pas quotidiens</span>
                <span className="info-value">{results.steps.toLocaleString()}</span>
              </div>
            )}
            {results.sportCategory && results.sportCategory !== 'none' && (
              <>
                <div className="info-item">
                  <span className="info-label">Sport</span>
                  <span className="info-value">{results.sportCategory}</span>
                </div>
                {results.sportSpecific && (
                  <div className="info-item">
                    <span className="info-label">Discipline</span>
                    <span className="info-value">{results.sportSpecific}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Calories */}
        <div className="result-card calories-card">
          <div className="card-icon">🔥</div>
          <h3>Tes besoins caloriques</h3>
          <div className="calories-info">
            <div className="calorie-block">
              <div className="calorie-label">Métabolisme de base</div>
              <div className="calorie-value">{results.bmr} <span>kcal</span></div>
            </div>
            <div className="calorie-divider">→</div>
            <div className="calorie-block">
              <div className="calorie-label">Dépense totale</div>
              <div className="calorie-value">{results.tdee} <span>kcal</span></div>
            </div>
            <div className="calorie-divider">→</div>
            <div className="calorie-block highlight">
              <div className="calorie-label">Objectif</div>
              <div className="calorie-value main">{results.targetCalories} <span>kcal</span></div>
            </div>
          </div>
          {results.explanations && results.explanations.calories && (
            <div className="explanation-box">
              <div className="explanation-icon">🧠</div>
              <p className="explanation-text">{results.explanations.calories}</p>
            </div>
          )}
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
                    strokeDasharray={`${(results.macros.protein.percent / 100) * 283} 283`}
                  />
                </svg>
                <div className="macro-percentage">
                  {Math.round(results.macros.protein.percent)}%
                </div>
              </div>
              <div className="macro-icon">🍗</div>
              <div className="macro-label">Protéines</div>
              <div className="macro-value">{results.macros.protein.grams}g</div>
              <div className="macro-detail">{results.macros.protein.perKg.toFixed(1)}g/kg</div>
              {results.explanations && results.explanations.protein && (
                <div className="macro-explanation">
                  <p>{results.explanations.protein}</p>
                </div>
              )}
            </div>
            <div className="macro-item carbs">
              <div className="macro-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    strokeDasharray={`${(results.macros.carbs.percent / 100) * 283} 283`}
                  />
                </svg>
                <div className="macro-percentage">
                  {Math.round(results.macros.carbs.percent)}%
                </div>
              </div>
              <div className="macro-icon">🍚</div>
              <div className="macro-label">Glucides</div>
              <div className="macro-value">{results.macros.carbs.grams}g</div>
              {results.explanations && results.explanations.carbs && (
                <div className="macro-explanation">
                  <p>{results.explanations.carbs}</p>
                </div>
              )}
            </div>
            <div className="macro-item fat">
              <div className="macro-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    strokeDasharray={`${(results.macros.fat.percent / 100) * 283} 283`}
                  />
                </svg>
                <div className="macro-percentage">
                  {Math.round(results.macros.fat.percent)}%
                </div>
              </div>
              <div className="macro-icon">🥑</div>
              <div className="macro-label">Lipides</div>
              <div className="macro-value">{results.macros.fat.grams}g</div>
              {results.explanations && results.explanations.fat && (
                <div className="macro-explanation">
                  <p>{results.explanations.fat}</p>
                </div>
              )}
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
