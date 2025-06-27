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
      question: "Combien de litres d'eau ont été indirectement consommés aujourd'hui à cause de l'utilisation intensive de l'IA pendant ce hackathon ? (Environ 100 étudiants utilisant des IA génératives en continu)",
      options: [
        "50 litres",
        "500 litres",
        "5 000 litres",
        "Plus de 50 000 litres"
      ],
      correct: 3,
      explanation: "Avec 100 étudiants utilisant des IA génératives en continu pendant un hackathon, la consommation d'eau indirecte peut dépasser 50 000 litres ! Cela inclut l'eau nécessaire au refroidissement des data centers et à la production d'électricité."
    },
    {
      id: 5,
      question: "Combien d'électricité consomme une seule requête à ChatGPT ?",
      options: [
        "Autant qu'une ampoule LED pendant 1 minute",
        "Autant qu'un smartphone en charge pendant 10 minutes",
        "Autant qu'un ordinateur portable pendant 1 heure",
        "Autant qu'un réfrigérateur pendant 2 heures"
      ],
      correct: 1,
      explanation: "Une seule requête à ChatGPT consomme environ 0,01 kWh, soit l'équivalent de la charge d'un smartphone pendant 10 minutes. Multiplié par des millions d'utilisateurs, l'impact devient énorme !"
    },
    {
      id: 6,
      question: "Quel est l'impact énergétique de la génération d'une image par IA ?",
      options: [
        "Équivalent à 1 minute d'éclairage LED",
        "Équivalent à 30 minutes d'éclairage LED",
        "Équivalent à 2 heures d'éclairage LED",
        "Équivalent à 1 jour d'éclairage LED"
      ],
      correct: 1,
      explanation: "Générer une image par IA consomme environ 0,005 kWh, soit l'équivalent d'une ampoule LED allumée pendant 30 minutes. C'est pourquoi il faut éviter les générations multiples inutiles !"
    },
    {
      id: 7,
      question: "Quel est le pourcentage d'émissions de CO₂ du secteur numérique dans le monde ?",
      options: [
        "Moins de 1%",
        "Entre 2% et 4%",
        "Entre 5% et 8%",
        "Plus de 10%"
      ],
      correct: 1,
      explanation: "Le secteur numérique représente environ 2-4% des émissions mondiales de CO₂, soit l'équivalent du secteur aérien. L'IA contribue de plus en plus à cette empreinte carbone."
    },
    {
      id: 8,
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
      id: 9,
      question: "Combien de temps faut-il pour compenser l'empreinte carbone d'un entraînement d'IA ?",
      options: [
        "Quelques jours",
        "Quelques mois",
        "Plusieurs années",
        "Plusieurs décennies"
      ],
      correct: 2,
      explanation: "L'empreinte carbone d'un entraînement d'IA peut prendre plusieurs années à être compensée par des arbres. C'est pourquoi il faut optimiser les modèles et éviter les entraînements inutiles."
    },
    {
      id: 10,
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