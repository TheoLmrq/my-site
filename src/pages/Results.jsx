import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResultsPremium.css';

function Results() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(null);
  const [results, setResults] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    bmr: 0,
    tdee: 0,
    targetCalories: 0,
    proteinGrams: 0,
    carbsGrams: 0,
    fatGrams: 0
  });
  const cardsRef = useRef([]);

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

  // Animation count-up pour les nombres
  useEffect(() => {
    if (!results) return;

    const duration = 2000; // 2 secondes
    const fps = 60;
    const frames = (duration / 1000) * fps;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        bmr: Math.round(results.bmr * easeOutQuart),
        tdee: Math.round(results.tdee * easeOutQuart),
        targetCalories: Math.round(results.targetCalories * easeOutQuart),
        proteinGrams: Math.round(results.macros.protein.grams * easeOutQuart),
        carbsGrams: Math.round(results.macros.carbs.grams * easeOutQuart),
        fatGrams: Math.round(results.macros.fat.grams * easeOutQuart)
      });

      if (frame >= frames) {
        clearInterval(interval);
        setAnimatedValues({
          bmr: results.bmr,
          tdee: results.tdee,
          targetCalories: results.targetCalories,
          proteinGrams: results.macros.protein.grams,
          carbsGrams: results.macros.carbs.grams,
          fatGrams: results.macros.fat.grams
        });
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [results]);

  // Apparition des cartes au scroll
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [results]);

  // Génération de l'explication personnalisée "Pourquoi ces macros"
  const generateWhyMacros = () => {
    if (!results) return '';

    const { objective, sportCategory, activity, weight } = results;
    let text = '';

    // Intro personnalisée selon objectif
    if (objective === 'Perte de poids') {
      text = `Pour **perdre du poids efficacement** tout en préservant ta masse musculaire, `;
    } else if (objective === 'Prise de muscle') {
      text = `Pour **construire du muscle** et optimiser ta progression, `;
    } else if (objective === 'Prise de poids') {
      text = `Pour **prendre du poids sainement** et développer ta masse, `;
    } else {
      text = `Pour **maintenir ton poids** et rester en forme, `;
    }

    // Partie protéines selon sport
    if (sportCategory === 'Musculation & Fitness') {
      text += `nous avons maximisé tes **protéines** (${results.macros.protein.perKg.toFixed(1)}g/kg) car la musculation demande une reconstruction musculaire intense après chaque séance. `;
    } else if (sportCategory === 'Sports de combat') {
      text += `tes **protéines** sont élevées (${results.macros.protein.perKg.toFixed(1)}g/kg) pour supporter les impacts et la récupération rapide nécessaires aux sports de combat. `;
    } else if (sportCategory === 'Endurance') {
      text += `tes **protéines** (${results.macros.protein.perKg.toFixed(1)}g/kg) sont équilibrées pour soutenir tes efforts prolongés sans alourdir ta digestion. `;
    } else {
      text += `tes **protéines** (${results.macros.protein.perKg.toFixed(1)}g/kg) sont optimisées pour ton niveau d'activité. `;
    }

    // Partie glucides selon activité et sport
    if (sportCategory === 'Endurance') {
      text += `Tes **glucides** (${Math.round(results.macros.carbs.percent)}%) sont la priorité : ils alimentent tes longues sorties et reconstituent tes réserves de glycogène. `;
    } else if (sportCategory === 'Musculation & Fitness') {
      text += `Les **glucides** (${Math.round(results.macros.carbs.percent)}%) t'apportent l'énergie explosive pour tes séries intenses et favorisent la récupération post-entraînement. `;
    } else if (objective === 'Perte de poids') {
      text += `Tes **glucides** sont modérés (${Math.round(results.macros.carbs.percent)}%) pour encourager ton corps à puiser dans ses réserves de graisse. `;
    } else {
      text += `Les **glucides** (${Math.round(results.macros.carbs.percent)}%) te fournissent l'énergie quotidienne nécessaire à ton rythme de vie. `;
    }

    // Partie lipides
    text += `Enfin, les **lipides** (${Math.round(results.macros.fat.percent)}%) sont essentiels pour tes hormones, ton cerveau et l'absorption des vitamines. `;

    // Conclusion personnalisée
    if (activity === 'Très actif' || activity === 'Assez actif') {
      text += `Avec ton niveau d'activité **${activity.toLowerCase()}**, ces macros vont maximiser tes performances et ta récupération. 💪`;
    } else {
      text += `Ces proportions sont parfaitement adaptées à ton mode de vie et te permettront d'atteindre tes objectifs durablement. 🎯`;
    }

    return text;
  };

  if (!results) {
    return (
      <div className="results-container-premium">
        <div className="loading">Calcul de tes résultats...</div>
      </div>
    );
  }

  return (
    <div className="results-container-premium">
      {/* Background Effects */}
      <div className="results-bg-grid"></div>
      
      {/* Header */}
      <div className="results-header">
        <h1 className="results-title">Ton Plan Personnalisé</h1>
        <p className="results-subtitle">Basé sur ton profil et tes objectifs</p>
      </div>

      {/* Main Grid */}
      <div className="results-main-grid">
        
        {/* 1. Profil Card */}
        <div 
          ref={(el) => cardsRef.current[0] = el}
          className="premium-card"
        >
          <div className="card-header">
            <span className="card-icon">👤</span>
            <h2 className="card-title">Ton Profil</h2>
          </div>
          
          <div className="profile-grid">
            <div className="profile-item">
              <div className="profile-label">Âge</div>
              <div className="profile-value">{results.age} ans</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Sexe</div>
              <div className="profile-value">{results.sex === 'homme' ? 'Homme' : 'Femme'}</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Taille</div>
              <div className="profile-value">{results.height} cm</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Poids</div>
              <div className="profile-value">{results.weight} kg</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Objectif</div>
              <div className="profile-value">{results.objective}</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Activité</div>
              <div className="profile-value">{results.activity}</div>
            </div>
            {results.steps && results.steps !== 'Non renseigné' && results.steps > 0 && (
              <div className="profile-item">
                <div className="profile-label">Pas quotidiens</div>
                <div className="profile-value">{results.steps.toLocaleString()}</div>
              </div>
            )}
            {results.sportCategory && results.sportCategory !== 'Aucun sport' && (
              <div className="profile-item">
                <div className="profile-label">Catégorie de sport</div>
                <div className="profile-value">{results.sportCategory}</div>
              </div>
            )}
            {results.sportSpecific && results.sportCategory !== 'Aucun sport' && (
              <div className="profile-item">
                <div className="profile-label">Sport</div>
                <div className="profile-value">{results.sportSpecific}</div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Calories Card avec Timeline */}
        <div 
          ref={(el) => cardsRef.current[1] = el}
          className="premium-card"
        >
          <div className="card-header">
            <span className="card-icon">🔥</span>
            <h2 className="card-title">Tes Besoins Caloriques</h2>
          </div>

          <div className="calories-timeline">
            <div className="calorie-stage">
              <div className="calorie-label">Métabolisme de base</div>
              <div className="calorie-number">
                {animatedValues.bmr}
                <span className="calorie-unit">kcal</span>
              </div>
            </div>

            <div className="calorie-stage">
              <div className="calorie-label">Dépense totale</div>
              <div className="calorie-number">
                {animatedValues.tdee}
                <span className="calorie-unit">kcal</span>
              </div>
            </div>

            <div className="calorie-stage">
              <div className="calorie-label">🎯 Ton objectif</div>
              <div className="calorie-number highlight">
                {animatedValues.targetCalories}
                <span className="calorie-unit">kcal</span>
              </div>
            </div>
          </div>

          {results.explanations && results.explanations.calories && (
            <div className="explanation-box">
              <div className="explanation-title">
                <span>💡</span>
                Pourquoi ces calories ?
              </div>
              <p className="explanation-text">{results.explanations.calories}</p>
            </div>
          )}
        </div>

        {/* 3. Macros Card avec Donut Charts */}
        <div 
          ref={(el) => cardsRef.current[2] = el}
          className="premium-card"
        >
          <div className="card-header">
            <span className="card-icon">🥗</span>
            <h2 className="card-title">Répartition des Macros</h2>
          </div>

          <div className="macros-grid">
            {/* Protéines */}
            <div className="macro-card protein">
              <div className="macro-donut">
                <svg width="150" height="150">
                  <circle 
                    className="bg-circle"
                    cx="75" 
                    cy="75" 
                    r="45"
                  />
                  <circle 
                    className="progress-circle"
                    cx="75" 
                    cy="75" 
                    r="45"
                    style={{
                      strokeDashoffset: 283 - (283 * (results.macros.protein.percent / 100))
                    }}
                  />
                </svg>
                <div className="macro-percent">{Math.round(results.macros.protein.percent)}%</div>
              </div>
              <div className="macro-icon-text">🍗</div>
              <div className="macro-name">Protéines</div>
              <div className="macro-grams">{animatedValues.proteinGrams}g</div>
              <div className="macro-detail">{results.macros.protein.perKg.toFixed(1)}g/kg</div>
              
              {results.explanations && results.explanations.protein && (
                <div className="macro-explanation">
                  <p>{results.explanations.protein}</p>
                </div>
              )}
            </div>

            {/* Glucides */}
            <div className="macro-card carbs">
              <div className="macro-donut">
                <svg width="150" height="150">
                  <circle 
                    className="bg-circle"
                    cx="75" 
                    cy="75" 
                    r="45"
                  />
                  <circle 
                    className="progress-circle"
                    cx="75" 
                    cy="75" 
                    r="45"
                    style={{
                      strokeDashoffset: 283 - (283 * (results.macros.carbs.percent / 100))
                    }}
                  />
                </svg>
                <div className="macro-percent">{Math.round(results.macros.carbs.percent)}%</div>
              </div>
              <div className="macro-icon-text">🍚</div>
              <div className="macro-name">Glucides</div>
              <div className="macro-grams">{animatedValues.carbsGrams}g</div>
              <div className="macro-detail">Énergie principale</div>
              
              {results.explanations && results.explanations.carbs && (
                <div className="macro-explanation">
                  <p>{results.explanations.carbs}</p>
                </div>
              )}
            </div>

            {/* Lipides */}
            <div className="macro-card fat">
              <div className="macro-donut">
                <svg width="150" height="150">
                  <circle 
                    className="bg-circle"
                    cx="75" 
                    cy="75" 
                    r="45"
                  />
                  <circle 
                    className="progress-circle"
                    cx="75" 
                    cy="75" 
                    r="45"
                    style={{
                      strokeDashoffset: 283 - (283 * (results.macros.fat.percent / 100))
                    }}
                  />
                </svg>
                <div className="macro-percent">{Math.round(results.macros.fat.percent)}%</div>
              </div>
              <div className="macro-icon-text">🥑</div>
              <div className="macro-name">Lipides</div>
              <div className="macro-grams">{animatedValues.fatGrams}g</div>
              <div className="macro-detail">Équilibre hormonal</div>
              
              {results.explanations && results.explanations.fat && (
                <div className="macro-explanation">
                  <p>{results.explanations.fat}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Section "Pourquoi ces macros" */}
        <div 
          ref={(el) => cardsRef.current[3] = el}
          className="premium-card why-section"
        >
          <h2 className="why-title">Pourquoi ces macros sont parfaitement adaptées à toi ?</h2>
          <div className="why-content">
            {generateWhyMacros().split('**').map((part, index) => 
              index % 2 === 1 ? <strong key={index}>{part}</strong> : part
            )}
          </div>
        </div>

        {/* 5. Résumé visuel "Ton plan en un coup d'œil" */}
        <div 
          ref={(el) => cardsRef.current[4] = el}
          className="premium-card"
        >
          <div className="card-header">
            <span className="card-icon">📊</span>
            <h2 className="card-title">Ton Plan en un Coup d'Œil</h2>
          </div>

          <div className="quick-view">
            <div className="quick-item">
              <div className="quick-icon">🎯</div>
              <div className="quick-label">Calories/jour</div>
              <div className="quick-value">{results.targetCalories} kcal</div>
            </div>
            <div className="quick-item">
              <div className="quick-icon">🍗</div>
              <div className="quick-label">Protéines</div>
              <div className="quick-value">{results.macros.protein.grams}g</div>
            </div>
            <div className="quick-item">
              <div className="quick-icon">🍚</div>
              <div className="quick-label">Glucides</div>
              <div className="quick-value">{results.macros.carbs.grams}g</div>
            </div>
            <div className="quick-item">
              <div className="quick-icon">🥑</div>
              <div className="quick-label">Lipides</div>
              <div className="quick-value">{results.macros.fat.grams}g</div>
            </div>
          </div>
        </div>

      </div>

      {/* CTA Section */}
      <div className="results-cta">
        <button className="cta-primary-results" onClick={handleOrder}>
          <span className="cta-icon">🚀</span>
          Commander mes repas personnalisés
        </button>
        <a href="#" className="cta-secondary-results" onClick={(e) => { e.preventDefault(); handleRestart(); }}>
          Refaire le test
        </a>
      </div>
    </div>
  );
}

export default Results;
