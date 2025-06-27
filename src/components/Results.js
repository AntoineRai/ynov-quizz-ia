import React, { useState } from 'react';
import './Results.css';

const Results = ({ score, totalQuestions, onRestart }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Déterminer le niveau et le message selon le score
  const getScoreInfo = () => {
    if (percentage >= 80) {
      return {
        level: "Expert Écologique",
        message: "Excellent ! Vous êtes très bien informé sur l'impact environnemental de l'IA.",
        emoji: "🌱",
        color: "excellent"
      };
    } else if (percentage >= 60) {
      return {
        level: "Aware",
        message: "Bien joué ! Vous avez une bonne compréhension des enjeux écologiques de l'IA.",
        emoji: "🌿",
        color: "good"
      };
    } else if (percentage >= 40) {
      return {
        level: "En Apprentissage",
        message: "Pas mal ! Continuez à vous informer sur l'impact environnemental de l'IA.",
        emoji: "🌱",
        color: "average"
      };
    } else {
      return {
        level: "Débutant",
        message: "Le quiz vous a permis de découvrir l'impact écologique de l'IA. Continuez à apprendre !",
        emoji: "🌍",
        color: "beginner"
      };
    }
  };

  const scoreInfo = getScoreInfo();

  const shareText = `J'ai obtenu ${score}/${totalQuestions} au quiz Eco-IA sur l'impact écologique de l'intelligence artificielle ! 🌱 Testez vos connaissances : `;
  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Eco-IA Quiz - Mon Score',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Erreur de partage:', error);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = `${shareText}${shareUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="results-title">Résultats du Quiz</h1>
        <p className="results-subtitle">Votre impact sur la sensibilisation écologique</p>
      </div>

      <div className="score-section">
        <div className={`score-circle ${scoreInfo.color}`}>
          <div className="score-emoji">{scoreInfo.emoji}</div>
          <div className="score-number">{score}</div>
          <div className="score-total">/ {totalQuestions}</div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        
        <div className="score-info">
          <h2 className="score-level">{scoreInfo.level}</h2>
          <p className="score-message">{scoreInfo.message}</p>
        </div>
      </div>

      <div className="stats-section">
        <h3>Impact Environnemental - Chiffres Clés</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-value">284</div>
            <div className="stat-label">tonnes de CO₂</div>
            <div className="stat-desc">pour entraîner GPT-3</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-value">700k</div>
            <div className="stat-label">litres d'eau</div>
            <div className="stat-desc">par data center/jour</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌍</div>
            <div className="stat-value">2%</div>
            <div className="stat-label">émissions globales</div>
            <div className="stat-desc">du secteur numérique</div>
          </div>
        </div>
      </div>

      <div className="eco-tips">
        <h3>Conseils pour réduire votre impact numérique</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <span className="tip-icon">💡</span>
            <span className="tip-text">Fermez les onglets inutiles</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🖼️</span>
            <span className="tip-text">Réduisez les générations d'images IA</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">☁️</span>
            <span className="tip-text">Privilégiez des outils sobres</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🤔</span>
            <span className="tip-text">Pensez avant de générer du contenu</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="share-button" onClick={handleShare}>
          <span className="button-icon">📤</span>
          Partager mon score
        </button>
        <button className="restart-button" onClick={onRestart}>
          <span className="button-icon">🔄</span>
          Recommencer le quiz
        </button>
      </div>

      {/* Modal de partage */}
      {showShareModal && (
        <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Partager votre score</h3>
              <button className="close-button" onClick={() => setShowShareModal(false)}>×</button>
            </div>
            <div className="share-modal-body">
              <p>Invitez vos amis à tester leurs connaissances sur l'impact écologique de l'IA !</p>
              <div className="share-text">
                <textarea 
                  value={`${shareText}${shareUrl}`}
                  readOnly
                  rows={4}
                />
              </div>
              <button 
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
              >
                {copied ? 'Copié !' : 'Copier le lien'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results; 