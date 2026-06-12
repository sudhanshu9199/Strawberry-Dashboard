import React from 'react';
import './MascotWelcome.scss';

export default function MascotWelcome() {
  return (
    <div className="mascot-welcome">
      <div className="welcome-text-container">
        <span className="welcome-badge">🍓 Strawberry Activity Portal</span>
        <h1 className="welcome-title">Learn & Play with Strawberry!</h1>
        <p className="welcome-subtitle">
          Explore fun activities, interactive games, and cool projects made just for you! Filter by your grade and jump right in!
        </p>
        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">🎮</span>
            <span>Fun Interactive Games</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span>Safe & Kids Friendly</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⭐</span>
            <span>Track by Grade & Chapter</span>
          </div>
        </div>
      </div>
      
      <div className="video-container">
        <div className="tablet-frame">
          <div className="tablet-camera"></div>
          <video 
            className="mascot-video"
            src="/Strawberry_mascot_welcomes_kids_202606121936.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="tablet-home"></div>
        </div>
        <div className="video-decorations">
          <div className="decor-leaf leaf-1">🍃</div>
          <div className="decor-leaf leaf-2">🍃</div>
          <div className="decor-strawberry strawberry-1">🍓</div>
        </div>
      </div>
    </div>
  );
}
