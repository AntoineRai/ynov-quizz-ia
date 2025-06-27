import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Header from './components/Header';

function App() {
  const [currentStep, setCurrentStep] = useState('intro');

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleFinishQuiz = () => {
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {currentStep === 'intro' && (
          <div className="intro-section">
            <h1 className="main-title">L'IA a un coût pour la planète</h1>
            <p className="intro-text">
              Découvrez l'impact environnemental caché de l'intelligence artificielle 
              et apprenez à adopter des pratiques plus responsables.
            </p>
            <div className="stats-preview">
              <div className="stat-item">
                <span className="stat-number">284</span>
                <span className="stat-label">tonnes de CO₂</span>
                <span className="stat-desc">pour entraîner GPT-3</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">700k</span>
                <span className="stat-label">litres d'eau</span>
                <span className="stat-desc">pour refroidir les serveurs</span>
              </div>
            </div>
            <button className="start-button" onClick={handleStartQuiz}>
              Commencer le quiz
            </button>
          </div>
        )}
        
        {currentStep === 'quiz' && (
          <Quiz onFinish={handleFinishQuiz} />
        )}
        
        {currentStep === 'results' && (
          <div className="results-section">
            <h2 className="results-title">Merci d'avoir participé !</h2>
            <p className="results-text">
              L'impact écologique de l'IA est réel et mérite notre attention. 
              Chaque petit geste compte pour réduire notre empreinte numérique.
            </p>
            <div className="eco-tips">
              <h3>Conseils pour réduire votre impact :</h3>
              <ul>
                <li>Fermez les onglets inutiles</li>
                <li>Réduisez les générations d'images IA</li>
                <li>Privilégiez des outils sobres</li>
                <li>Pensez avant de générer du contenu</li>
              </ul>
            </div>
            <button className="restart-button" onClick={handleRestart}>
              Recommencer le quiz
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
