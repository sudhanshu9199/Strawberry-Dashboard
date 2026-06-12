import React, { useState, useMemo } from 'react';
import './App.scss';
import ProjectCard from './components/ProjectCard';
import MascotWelcome from './components/MascotWelcome';
import projectsData from './data/projects.json';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get list of unique grades for filter buttons
  const grades = useMemo(() => {
    const uniqueGrades = new Set(projectsData.map(p => p.grade));
    return ['All', ...Array.from(uniqueGrades).sort((a, b) => a - b)];
  }, []);

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesGrade = selectedGrade === 'All' || project.grade === Number(selectedGrade);
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGrade && matchesSearch;
    });
  }, [selectedGrade, searchQuery]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-logo">
          <span className="logo-emoji">🍓</span>
          <span className="logo-text">Strawberry<span className="logo-highlight">Kidz</span></span>
        </div>
        
        <div className="search-bar-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search activities (e.g. Detective, Math)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Hero Welcome banner */}
      <MascotWelcome />

      {/* Filters Section */}
      <section className="controls-section">
        <div className="filter-label">Filter by Grade:</div>
        <div className="filter-buttons">
          {grades.map(grade => (
            <button
              key={grade}
              className={`filter-btn ${selectedGrade === grade ? 'active' : ''}`}
              onClick={() => setSelectedGrade(grade)}
            >
              {grade === 'All' ? 'All Grades 🎒' : `Grade ${grade} 📚`}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Projects */}
      <main className="projects-section">
        <div className="section-header">
          <h2 className="section-title">
            {selectedGrade === 'All' ? 'All Activities' : `Grade ${selectedGrade} Activities`}
            <span className="count-badge">{filteredProjects.length}</span>
          </h2>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-emoji">😢</div>
            <h3>No activities found!</h3>
            <p>Try searching for something else or clearing the grade filter.</p>
            <button className="reset-filters-btn" onClick={() => { setSelectedGrade('All'); setSearchQuery(''); }}>
              Reset Filters 🔄
            </button>
          </div>
        )}
      </main>

      {/* Cute Strawberry Leaf Footer */}
      <footer className="portal-footer">
        <div className="footer-content">
          <p>© 2026 Strawberry Kidz School Activity Portal. All rights reserved. 🍓✨</p>
          <p className="footer-sub">Interactive learning made awesome!</p>
        </div>
        <div className="footer-decorations">
          <span className="leaf-decor">🍃</span>
          <span className="strawberry-decor">🍓</span>
          <span className="leaf-decor">🍃</span>
        </div>
      </footer>
    </div>
  );
}
