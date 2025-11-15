import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

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
    type: 'activity',
    question: 'Quel est ton niveau d\'activité physique ?',
    options: [
      { 
        value: 'sedentary', 
        label: 'Sédentaire', 
        icon: '🪑',
        description: 'Travail de bureau, peu ou pas d\'exercice'
      },
      { 
        value: 'moderate', 
        label: 'Modérément actif', 
        icon: '🚶',
        description: '1 à 2 séances de sport/semaine'
      },
      { 
        value: 'active', 
        label: 'Assez actif', 
        icon: '🏃',
        description: '3 à 4 séances de sport/semaine'
      },
      { 
        value: 'very-active', 
        label: 'Très actif', 
        icon: '⚡',
        description: '5 séances ou +/semaine, sport intense'
      }
    ]
  }
];

function Quiz() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [numberValue, setNumberValue] = useState('');
  const [dateValue, setDateValue] = useState({ day: '', month: '', year: '' });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = (value) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnswers({ ...answers, [currentQuestion.id]: value });

    // Save to localStorage
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    localStorage.setItem('fitchen_quiz_answers', JSON.stringify(updatedAnswers));

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setNumberValue('');
        setDateValue({ day: '', month: '', year: '' });
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
    }
  };

  const handleNumberSubmit = (e) => {
    e.preventDefault();
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
              disabled={!numberValue || numberValue < currentQuestion.min || numberValue > currentQuestion.max}
            >
              Suivant →
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
