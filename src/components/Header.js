import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">🌍</div>
          <h2 className="logo-text">Eco-IA Quiz</h2>
        </div>
        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-icon">⚡</span>
            <span>Impact Énergétique</span>
          </div>
          <div className="stat-chip">
            <span className="stat-icon">💧</span>
            <span>Consommation Eau</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 