import { useEffect, useRef } from 'react';
import '../styles/NotreHistoire.css';

function NotreHistoire() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="histoire-container">
      {/* Hero Section */}
      <section className="histoire-hero">
        <div className="hero-overlay"></div>
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
        
        <div className="hero-content-histoire">
          <h1 className="main-title fade-in">Notre Histoire</h1>
          <p className="subtitle fade-in">Par Théo, fondateur de Fitchen</p>
          <div className="quote fade-in">
            Je m'appelle Théo, et si j'ai créé Fitchen, c'est parce qu'avant d'aider les autres…<br/>
            <span className="highlight">j'ai dû m'aider moi-même.</span>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" ref={timelineRef}>
        {/* Chapter 1 */}
        <div className="timeline-block fade-in">
          <div className="timeline-icon shock">⚡</div>
          <div className="timeline-content">
            <h2 className="chapter-title">Quand tout a basculé</h2>
            <p className="chapter-intro">
              À 19 ans, j'ai réalisé quelque chose que je n'aurais jamais pensé possible :<br/>
              <strong className="text-red">j'étais devenu obèse.</strong>
            </p>
            <div className="story-text">
              <p>Enfant et adolescent, j'avais un métabolisme rapide. Je pouvais manger tout et n'importe quoi, sans jamais prendre un gramme.</p>
              <p>Mais après la croissance, la réalité m'a rattrapé :</p>
              <ul className="impact-list">
                <li>les études,</li>
                <li>les premiers jobs,</li>
                <li>moins de sport,</li>
                <li>les sorties,</li>
                <li>le stress,</li>
                <li>les repas pris sur le pouce...</li>
              </ul>
              <p className="weight-stat">En 2 ans, j'ai pris <span className="stat-number">25 kilos</span>, sans vraiment m'en rendre compte.</p>
            </div>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="timeline-block fade-in reverse">
          <div className="timeline-icon success">💪</div>
          <div className="timeline-content">
            <h2 className="chapter-title">La transformation</h2>
            <p className="chapter-intro">
              Le choc m'a poussé à m'intéresser sérieusement à la nutrition :
            </p>
            <div className="story-text">
              <ul className="action-list">
                <li>comprendre les macronutriments,</li>
                <li>tester différents régimes,</li>
                <li>analyser mes apports,</li>
                <li>reconstruire une routine sportive,</li>
                <li>apprendre ce que mon corps avait réellement besoin.</li>
              </ul>
              <div className="result-box">
                <p className="result-stat">J'ai décidé d'y mettre <span className="highlight-red">100 %</span> de ma concentration</p>
                <p className="result-achievement">En 3 mois, j'ai perdu <span className="stat-number">20 kilos</span></p>
              </div>
              <p className="transformation-text">
                Je redécouvrais totalement ma vie :<br/>
                je me sentais <strong>plus agile</strong>, <strong>plus fort</strong>, <strong>plus endurant</strong>, <strong>plus confiant</strong> — j'avais enfin l'impression de maîtriser mon quotidien.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 3 */}
        <div className="timeline-block fade-in">
          <div className="timeline-icon warning">⚠️</div>
          <div className="timeline-content">
            <h2 className="chapter-title">Le revers de la médaille</h2>
            <p className="chapter-intro">
              Mais cette réussite avait un prix :
            </p>
            <div className="story-text">
              <ul className="burden-list">
                <li>compter ses calories,</li>
                <li>suivre ses macros,</li>
                <li>cuisiner chaque soir,</li>
                <li>préparer ses tupperwares,</li>
                <li>planifier ses repas,</li>
                <li>éviter les pièges du quotidien…</li>
              </ul>
              <p className="burden-text">C'est une <span className="text-red">charge mentale énorme</span>.</p>
              <p>Et malgré mon assiduité au sport, la vie réelle a fini par reprendre le dessus :<br/>
              pression au travail, imprévus, événements sociaux, fatigue…</p>
              <p>Progressivement, j'ai perdu le fil et j'ai commencé à reprendre du poids.</p>
              <div className="truth-box">
                <p className="truth-statement">
                  La vérité, c'est que :<br/>
                  <span className="highlight-red">bien manger au quotidien est difficile</span> — même pour quelqu'un de motivé.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 4 */}
        <div className="timeline-block fade-in reverse">
          <div className="timeline-icon idea">💡</div>
          <div className="timeline-content">
            <h2 className="chapter-title">Pourquoi Fitchen existe</h2>
            <div className="story-text">
              <p>J'ai alors compris que le problème n'était pas la volonté,<br/>
              ni le manque de connaissances.</p>
              
              <div className="problem-box">
                <p className="problem-title">Le problème, c'est :</p>
                <div className="problem-grid">
                  <div className="problem-item">👉 le temps</div>
                  <div className="problem-item">👉 la logistique</div>
                  <div className="problem-item">👉 la charge mentale</div>
                </div>
              </div>

              <p className="solution-text">
                C'est pour cela que j'ai créé <span className="brand">Fitchen</span> :<br/>
                une solution <strong>simple</strong>, <strong>accessible</strong> et pensée pour les personnes actives, les sportifs, et tous ceux qui veulent prendre soin d'eux sans se prendre la tête.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section fade-in">
        <h2 className="section-title">Notre mission</h2>
        <p className="mission-statement">
          Fitchen t'aide à bien manger même quand la vie devient chaotique.
        </p>
        <div className="mission-promises">
          <div className="promise">Pas de calculs.</div>
          <div className="promise">Pas de préparations interminables.</div>
          <div className="promise">Pas de stress.</div>
        </div>

        <div className="concept-box fade-in">
          <h3 className="concept-title">🎯 Le concept est simple :</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Crée ton plan</h4>
              <p>selon tes besoins et ton sport</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Reçois tes plats</h4>
              <p>frais chaque semaine</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Réchauffe & profite</h4>
              <p>c'est prêt en 2 minutes</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h4>Perform</h4>
              <p>dans ta journée, ton entraînement, ta vie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="features-section fade-in">
        <h2 className="section-title">Ce qui rend nos plats uniques</h2>
        <p className="features-intro">Nos plats sont :</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h4>Frais, jamais surgelés</h4>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Calibrés pour l'énergie, l'effort et la récupération</h4>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🥩</div>
            <h4>Riches en protéines utiles, pas de superflu</h4>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h4>Équilibrés avec les bons glucides et de bonnes matières grasses</h4>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h4>Pensés pour éliminer la charge mentale alimentaire</h4>
          </div>
        </div>
        <p className="features-benefit">
          Ils durent plusieurs jours au réfrigérateur et t'évitent :<br/>
          le fast-food, les repas improvisés, les mauvais choix, ou la culpabilité.
        </p>
      </section>

      {/* For You Section */}
      <section className="foryou-section fade-in">
        <h2 className="section-title">Fitchen, c'est pour toi si…</h2>
        <div className="foryou-grid">
          <div className="foryou-item">✓ tu veux performer au sport</div>
          <div className="foryou-item">✓ tu veux reprendre le contrôle de ton alimentation</div>
          <div className="foryou-item">✓ tu veux perdre du poids, en prendre, ou simplement stabiliser</div>
          <div className="foryou-item">✓ tu n'as pas le temps de cuisiner</div>
          <div className="foryou-item">✓ tu veux arrêter de penser à « quoi manger ce soir »</div>
          <div className="foryou-item">✓ tu veux combiner santé, goût et praticité</div>
        </div>
      </section>

      {/* Final Message */}
      <section className="final-section fade-in">
        <div className="final-content">
          <h2 className="final-title">Fitchen, c'est ma solution… devenue la tienne.</h2>
          <p className="final-text">
            J'ai créé ce service parce que j'aurais aimé l'avoir quand j'en avais besoin.<br/>
            Aujourd'hui, mon histoire devient ton raccourci.<br/>
            Pour t'aider à <strong>mieux manger</strong>, <strong>mieux vivre</strong>, <strong>mieux performer</strong> — sans sacrifier ton quotidien.
          </p>
          <div className="final-cta">
            <h3 className="welcome-text">Bienvenue chez Fitchen.</h3>
            <p className="tagline">La nutrition, enfin simple.</p>
          </div>
        </div>
      </section>

      {/* Background Effects */}
      <div className="background-grid"></div>
    </div>
  );
}

export default NotreHistoire;

