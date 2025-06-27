import React, { useState } from 'react';
import './Quiz.css';
import Modal from './Modal';

const Quiz = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Combien d'énergie peut consommer l'entraînement d'un gros modèle d'IA comme GPT-3 ?",
      options: [
        "Autant qu'un radiateur pendant un mois",
        "Autant qu'un quartier entier pendant plusieurs semaines",
        "Autant qu'une console de jeu",
        "Moins qu'une voiture électrique en 1 an"
      ],
      correct: 1,
      explanation: "L'entraînement de GPT-3 a consommé environ 1,287 MWh, soit l'équivalent de la consommation électrique de 120 foyers américains pendant un an !"
    },
    {
      id: 2,
      question: "Pourquoi les data centers consomment-ils beaucoup d'eau ?",
      options: [
        "Pour alimenter les serveurs",
        "Pour refroidir les machines",
        "Pour nettoyer les composants",
        "Ce n'est pas vrai, ils ne consomment pas d'eau"
      ],
      correct: 1,
      explanation: "Les data centers utilisent d'énormes quantités d'eau pour refroidir les serveurs qui chauffent énormément. Un data center peut consommer jusqu'à 700 000 litres d'eau par jour !"
    },
    {
      id: 3,
      question: "Quelle ressource est extraite pour fabriquer les puces des IA ?",
      options: [
        "Le sable",
        "Le lithium",
        "Les métaux rares",
        "Le charbon"
      ],
      correct: 2,
      explanation: "Les puces électroniques nécessitent des métaux rares comme le cobalt, le lithium, et les terres rares. L'extraction de ces matériaux est très polluante et énergivore."
    },
    {
      id: 4,
      question: "Quel geste n'est pas utile pour réduire son impact numérique ?",
      options: [
        "Fermer les onglets inutiles",
        "Multiplier les générations d'images IA pour le fun",
        "Privilégier des outils sobres",
        "Réduire l'usage du cloud"
      ],
      correct: 1,
      explanation: "Générer des images IA juste pour s'amuser multiplie inutilement la consommation d'énergie. Chaque génération d'image peut consommer autant qu'une ampoule allumée pendant 30 minutes."
    },
    {
      id: 5,
      question: "Quel slogan résume le mieux le message ?",
      options: [
        "Ce n'est pas parce que c'est virtuel que ce n'est pas polluant.",
        "L'IA, c'est magique et propre",
        "Tant qu'on ne voit rien, tout va bien",
        "Plus de requêtes, moins de réflexion"
      ],
      correct: 0,
      explanation: "L'impact environnemental de l'IA est bien réel, même s'il est invisible. Chaque requête, chaque génération de contenu a un coût énergétique et environnemental."
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return; // Empêcher de changer de réponse après validation
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    // Afficher la pop-up après un court délai
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  const handleNextQuestion = () => {
    setShowModal(false); // Fermer la modal
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    } else {
      // Passer le score final au composant parent (score déjà mis à jour)
      onFinish(score);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQ.correct;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <>
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="question-counter">
            Question {currentQuestion + 1} sur {questions.length}
          </div>
        </div>

        <div className="question-section">
          <h2 className="question-text">{currentQ.question}</h2>
          
          <div className="options-container">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === index
                    ? index === currentQ.correct
                      ? 'correct'
                      : 'incorrect'
                    : showAnswer && index === currentQ.correct
                    ? 'correct'
                    : ''
                } ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <div className="score-display">
            Score: {score}/{questions.length}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
        icon={isCorrect ? "✅" : "❌"}
        actionButton={
          <button className="next-button" onClick={handleNextQuestion}>
            {isLastQuestion ? 'Voir les résultats' : 'Question suivante'}
          </button>
        }
      >
        <p>{currentQ.explanation}</p>
        <div className="explanation-details">
          <h4>Impact environnemental</h4>
          <ul>
            <li>Chaque requête IA a un coût énergétique réel</li>
            <li>Les data centers consomment énormément d'eau et d'électricité</li>
            <li>L'extraction des métaux rares pollue l'environnement</li>
            <li>Adopter des pratiques responsables est essentiel</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Quiz; 