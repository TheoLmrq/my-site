import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

const sportCategories = {
  'endurance': {
    label: 'Endurance',
    icon: '🏃',
    sports: [
      { value: 'running', label: 'Course à pied' },
      { value: 'trail', label: 'Trail' },
      { value: 'walking', label: 'Marche sportive' },
      { value: 'cycling', label: 'Cyclisme / VTT' },
      { value: 'swimming', label: 'Natation' },
      { value: 'triathlon', label: 'Triathlon' }
    ]
  },
  'musculation': {
    label: 'Musculation & Fitness',
    icon: '💪',
    sports: [
      { value: 'bodybuilding', label: 'Musculation' },
      { value: 'crossfit', label: 'CrossFit' },
      { value: 'weightlifting', label: 'Haltérophilie' },
      { value: 'hiit', label: 'HIIT / Circuit training' },
      { value: 'gym', label: 'Fitness en salle' }
    ]
  },
  'combat': {
    label: 'Sports de combat',
    icon: '🥊',
    sports: [
      { value: 'boxing', label: 'Boxe anglaise' },
      { value: 'muaythai', label: 'Boxe thaï / kickboxing' },
      { value: 'mma', label: 'MMA' },
      { value: 'bjj', label: 'Jiu-Jitsu Brésilien (JJB)' },
      { value: 'judo', label: 'Judo' },
      { value: 'karate', label: 'Karaté' }
    ]
  },
  'collectif': {
    label: 'Sports collectifs',
    icon: '⚽',
    sports: [
      { value: 'football', label: 'Football' },
      { value: 'basketball', label: 'Basketball' },
      { value: 'handball', label: 'Handball' },
      { value: 'rugby', label: 'Rugby' },
      { value: 'volleyball', label: 'Volleyball' }
    ]
  },
  'raquette': {
    label: 'Sports de raquette',
    icon: '🎾',
    sports: [
      { value: 'tennis', label: 'Tennis' },
      { value: 'padel', label: 'Padel' },
      { value: 'squash', label: 'Squash' },
      { value: 'badminton', label: 'Badminton' }
    ]
  },
  'glisse': {
    label: 'Sports de glisse',
    icon: '🏂',
    sports: [
      { value: 'ski', label: 'Ski' },
      { value: 'snowboard', label: 'Snowboard' },
      { value: 'surf', label: 'Surf' },
      { value: 'skateboard', label: 'Skateboard' },
      { value: 'roller', label: 'Roller' }
    ]
  },
  'technique': {
    label: 'Sports techniques / précision',
    icon: '🎯',
    sports: [
      { value: 'golf', label: 'Golf' },
      { value: 'archery', label: 'Tir à l\'arc' },
      { value: 'fencing', label: 'Escrime' },
      { value: 'tabletennis', label: 'Tennis de table' }
    ]
  },
  'artistique': {
    label: 'Sports artistiques & bien-être',
    icon: '🧘',
    sports: [
      { value: 'dance', label: 'Danse' },
      { value: 'zumba', label: 'Fitness chorégraphié' },
      { value: 'gymnastics', label: 'Gymnastique' },
      { value: 'yoga', label: 'Yoga' },
      { value: 'pilates', label: 'Pilates' }
    ]
  },
  'mecanique': {
    label: 'Sports mécaniques',
    icon: '🏍️',
    sports: [
      { value: 'moto', label: 'Moto' },
      { value: 'karting', label: 'Karting' },
      { value: 'offroad', label: 'Véhicules off-road' },
      { value: 'quad', label: 'Quad' }
    ]
  },
  'none': {
    label: 'Je ne fais pas de sport (juste de la marche)',
    icon: '🚶',
    sports: []
  }
};

const questions = [
  {
    id: 1,
    type: 'date',
    question: 'Quelle est ta date de naissance ?',
    placeholder: { day: 'Jour', month: 'Mois', year: 'Année' }
  },
  {
    id: 2,
    type: 'choice',
    question: 'Quel est ton sexe ?',
    options: [
      { value: 'homme', label: 'Homme', icon: '👨' },
      { value: 'femme', label: 'Femme', icon: '👩' }
    ]
  },
  {
    id: 3,
    type: 'number',
    question: 'Quelle est ta taille ?',
    placeholder: 'En centimètres',
    unit: 'cm',
    min: 100,
    max: 250
  },
  {
    id: 4,
    type: 'number',
    question: 'Quel est ton poids ?',
    placeholder: 'En kilogrammes',
    unit: 'kg',
    min: 30,
    max: 200
  },
  {
    id: 5,
    type: 'objective',
    question: 'Quel est ton objectif principal ?',
    options: [
      { 
        value: 'muscle', 
        label: 'Prendre du muscle', 
        icon: '💪',
        description: 'Prise de masse maigre, surplus calorique'
      },
      { 
        value: 'lose', 
        label: 'Perdre du poids', 
        icon: '🔥',
        description: 'Déficit calorique adapté à ton activité'
      },
      { 
        value: 'gain', 
        label: 'Prendre du poids', 
        icon: '📈',
        description: 'Plan progressif avec excédent calorique'
      },
      { 
        value: 'maintain', 
        label: 'Maintenir mon poids', 
        icon: '⚖️',
        description: 'Stabilisation, calories d\'entretien'
      }
    ]
  },
  {
    id: 6,
    type: 'activity-with-steps',
    question: 'Quel est ton niveau d\'activité physique ?',
    options: [
      { 
        value: 'sedentary', 
        label: 'Sédentaire', 
        icon: '🪑',
        description: 'Travail de bureau, assis la plupart du temps'
      },
      { 
        value: 'moderate', 
        label: 'Modérément actif', 
        icon: '🚶',
        description: 'Travail avec déplacements réguliers, debout souvent'
      },
      { 
        value: 'active', 
        label: 'Assez actif', 
        icon: '🏃',
        description: 'Travail physique ou en mouvement constant'
      },
      { 
        value: 'very-active', 
        label: 'Très actif', 
        icon: '⚡',
        description: 'Travail très physique ou athlète professionnel'
      }
    ],
    stepsQuestion: {
      label: 'Nombre de pas quotidien moyen (optionnel)',
      subtitle: 'Si vous le connaissez (application Santé, montre connectée, etc.)',
      placeholder: 'Nombre de pas par jour',
      unit: 'pas',
      min: 0,
      max: 50000
    }
  },
  {
    id: 7,
    type: 'sport-category',
    question: 'Quel sport pratiques-tu ?',
    subtitle: 'Étape 1/2 : Choisis ta catégorie'
  },
  {
    id: 8,
    type: 'sport-specific',
    question: 'Quel sport pratiques-tu ?',
    subtitle: 'Étape 2/2 : Choisis ton sport spécifique'
  }
];

function Quiz() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [numberValue, setNumberValue] = useState('');
  const [dateValue, setDateValue] = useState({ day: '', month: '', year: '' });
  const [selectedSportCategory, setSelectedSportCategory] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [stepsValue, setStepsValue] = useState('');

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = (value) => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    // Special handling for sport category
    if (currentQuestion.type === 'sport-category') {
      setSelectedSportCategory(value);
      setAnswers({ ...answers, [currentQuestion.id]: value });
      
      // If "none" selected, skip sport-specific question
      if (value === 'none') {
        const updatedAnswers = { 
          ...answers, 
          [currentQuestion.id]: value,
          [currentQuestion.id + 1]: 'Marche / Aucun sport'
        };
        localStorage.setItem('fitchen_quiz_answers', JSON.stringify(updatedAnswers));
        
        setTimeout(() => {
          // Skip next question (sport-specific)
          if (currentStep < questions.length - 2) {
            setCurrentStep(currentStep + 2);
            setIsAnimating(false);
          } else {
            navigate('/results');
          }
        }, 400);
        return;
      }
    }

    setAnswers({ ...answers, [currentQuestion.id]: value });

    // Save to localStorage
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    localStorage.setItem('fitchen_quiz_answers', JSON.stringify(updatedAnswers));

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setNumberValue('');
        setDateValue({ day: '', month: '', year: '' });
        setSelectedActivity('');
        setStepsValue('');
        setIsAnimating(false);
      } else {
        // Quiz completed
        navigate('/results');
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setNumberValue('');
      setDateValue({ day: '', month: '', year: '' });
      setSelectedActivity('');
      setStepsValue('');
    }
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    // Allow optional fields to be skipped
    if (currentQuestion.optional && !numberValue) {
      handleNext('Non renseigné');
      return;
    }
    if (numberValue && numberValue >= currentQuestion.min && numberValue <= currentQuestion.max) {
      handleNext(numberValue);
    }
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (dateValue.day && dateValue.month && dateValue.year) {
      handleNext(`${dateValue.day}/${dateValue.month}/${dateValue.year}`);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'date':
        return (
          <form onSubmit={handleDateSubmit} className="quiz-form">
            <div className="date-inputs">
              <input
                type="number"
                placeholder={currentQuestion.placeholder.day}
                value={dateValue.day}
                onChange={(e) => setDateValue({ ...dateValue, day: e.target.value })}
                min="1"
                max="31"
                className="date-input"
                autoFocus
              />
              <input
                type="number"
                placeholder={currentQuestion.placeholder.month}
                value={dateValue.month}
                onChange={(e) => setDateValue({ ...dateValue, month: e.target.value })}
                min="1"
                max="12"
                className="date-input"
              />
              <input
                type="number"
                placeholder={currentQuestion.placeholder.year}
                value={dateValue.year}
                onChange={(e) => setDateValue({ ...dateValue, year: e.target.value })}
                min="1900"
                max="2010"
                className="date-input"
              />
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={!dateValue.day || !dateValue.month || !dateValue.year}
            >
              Suivant →
            </button>
          </form>
        );

      case 'number':
      case 'steps':
        return (
          <form onSubmit={handleNumberSubmit} className="quiz-form">
            <div className="number-input-wrapper">
              <input
                type="number"
                placeholder={currentQuestion.placeholder}
                value={numberValue}
                onChange={(e) => setNumberValue(e.target.value)}
                min={currentQuestion.min}
                max={currentQuestion.max}
                className="number-input"
                autoFocus
              />
              <span className="unit">{currentQuestion.unit}</span>
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={!currentQuestion.optional && (!numberValue || numberValue < currentQuestion.min || numberValue > currentQuestion.max)}
            >
              {currentQuestion.optional && !numberValue ? 'Passer →' : 'Suivant →'}
            </button>
          </form>
        );

      case 'choice':
      case 'objective':
      case 'activity':
        return (
          <div className="options-grid">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className={`option-button ${currentQuestion.type === 'choice' ? 'choice' : 'detailed'}`}
                onClick={() => handleNext(option.value)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
                {option.description && (
                  <span className="option-description">{option.description}</span>
                )}
              </button>
            ))}
          </div>
        );

      case 'activity-with-steps':
        return (
          <div className="activity-steps-container">
            {/* Activity Level Selection */}
            {!selectedActivity && (
              <div className="options-grid">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    className="option-button detailed"
                    onClick={() => setSelectedActivity(option.value)}
                  >
                    <span className="option-icon">{option.icon}</span>
                    <span className="option-label">{option.label}</span>
                    <span className="option-description">{option.description}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Steps Input (shown after selecting activity) */}
            {selectedActivity && (
              <div className="steps-section">
                <div className="selected-activity-badge">
                  <span className="badge-icon">
                    {currentQuestion.options.find(opt => opt.value === selectedActivity)?.icon}
                  </span>
                  <span className="badge-label">
                    {currentQuestion.options.find(opt => opt.value === selectedActivity)?.label}
                  </span>
                  <button 
                    className="change-button"
                    onClick={() => setSelectedActivity('')}
                  >
                    Modifier
                  </button>
                </div>

                <div className="steps-input-section">
                  <label className="steps-label">
                    {currentQuestion.stepsQuestion.label}
                  </label>
                  <p className="steps-subtitle">{currentQuestion.stepsQuestion.subtitle}</p>
                  
                  <div className="number-input-wrapper">
                    <input
                      type="number"
                      placeholder={currentQuestion.stepsQuestion.placeholder}
                      value={stepsValue}
                      onChange={(e) => setStepsValue(e.target.value)}
                      min={currentQuestion.stepsQuestion.min}
                      max={currentQuestion.stepsQuestion.max}
                      className="number-input"
                      autoFocus
                    />
                    <span className="unit">{currentQuestion.stepsQuestion.unit}</span>
                  </div>

                  <button
                    className="submit-button"
                    onClick={() => {
                      const steps = stepsValue || 'Non renseigné';
                      handleNext({ activity: selectedActivity, steps });
                    }}
                  >
                    {stepsValue ? 'Suivant →' : 'Passer →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'sport-category':
        return (
          <div className="options-grid sport-grid">
            {Object.entries(sportCategories).map(([key, category]) => (
              <button
                key={key}
                className="option-button sport-category"
                onClick={() => handleNext(key)}
              >
                <span className="option-icon">{category.icon}</span>
                <span className="option-label">{category.label}</span>
              </button>
            ))}
          </div>
        );

      case 'sport-specific':
        const selectedCategory = sportCategories[selectedSportCategory];
        if (!selectedCategory || selectedCategory.sports.length === 0) {
          return null;
        }
        return (
          <div className="options-grid sport-specific-grid">
            {selectedCategory.sports.map((sport) => (
              <button
                key={sport.value}
                className="option-button sport-specific"
                onClick={() => handleNext(sport.value)}
              >
                <span className="option-label">{sport.label}</span>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="quiz-container">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Progress Text */}
      <div className="progress-text">
        Question {currentStep + 1} / {questions.length}
      </div>

      {/* Back Button */}
      {currentStep > 0 && (
        <button className="back-button" onClick={handleBack}>
          ← Retour
        </button>
      )}

      {/* Question Bubble */}
      <div className={`question-bubble ${isAnimating ? 'slide-out' : 'slide-in'}`}>
        <h2 className="question-title">{currentQuestion.question}</h2>
        {currentQuestion.subtitle && (
          <p className="question-subtitle">{currentQuestion.subtitle}</p>
        )}
        {renderQuestion()}
      </div>

      {/* Background Animation */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default Quiz;
