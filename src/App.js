import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Results from './components/Results';

function App() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions] = useState(6);

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleFinishQuiz = (score) => {
    setFinalScore(score);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setFinalScore(0);
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
          <Results 
            score={finalScore}
            totalQuestions={totalQuestions}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
