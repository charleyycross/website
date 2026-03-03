import React from 'react';

const ProjectsApp: React.FC = () => {
  return (
    <div className="app-container">
      <h2>Projects</h2>
      
      <div className="project-grid">
        <div className="project-card">
          <h3>Retro Desktop UI</h3>
          <p className="project-tech">React, TypeScript, CSS</p>
          <p>A nostalgic pixel-art desktop interface built as a web application.</p>
          <div className="project-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Demo</a>
            <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
          </div>
        </div>
        
        <div className="project-card">
          <h3>Pixel Art Creator</h3>
          <p className="project-tech">JavaScript, Canvas API</p>
          <p>Browser-based tool for creating and exporting pixel art.</p>
          <div className="project-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Demo</a>
            <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
          </div>
        </div>
        
        <div className="project-card">
          <h3>Weather Pixels</h3>
          <p className="project-tech">React, Weather API</p>
          <p>Weather forecast app with pixel art representations of conditions.</p>
          <div className="project-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Demo</a>
            <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
          </div>
        </div>
        
        <div className="project-card">
          <h3>Retro Game Collection</h3>
          <p className="project-tech">JavaScript, HTML5</p>
          <p>Collection of classic arcade games reimagined with pixel graphics.</p>
          <div className="project-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Demo</a>
            <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;