import React from 'react';
import './ProjectCard.scss';

export default function ProjectCard({ project }) {
  const handleClick = () => {
    if (project.url && project.url !== '#') {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`The activity "${project.title}" is currently a demo and will be available soon! 🍓✨`);
    }
  };

  return (
    <div className={`project-card ${project.isReal ? 'real-project' : 'demo-project'}`} onClick={handleClick}>
      <div className="card-image-container">
        <img src={project.image} alt={project.title} className="card-image" />
        <div className="card-badge-overlay">
          <span className="badge-grade">Grade {project.grade}</span>
          <span className="badge-chapter">Chapter {project.chapter}</span>
        </div>
        {!project.isReal && <div className="demo-tag">Coming Soon 🍓</div>}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        
        <div className="card-footer">
          <div className="card-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
          <button className="play-button" aria-label={`Play ${project.title}`}>
            {project.isReal ? 'Play 🎮' : 'Preview 👀'}
          </button>
        </div>
      </div>
    </div>
  );
}
