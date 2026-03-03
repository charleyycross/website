import React from 'react';

const AboutApp: React.FC = () => {
  return (
    <div className="app-container">
      <h2>About Me</h2>
      
      <div className="about-content">
        <div className="about-section">
          <h3>Hello there! 👋</h3>
          <p>
            I'm a passionate web developer with a love for creating unique, interactive experiences.
            This retro pixel desktop is a fun project that combines my nostalgia for early computing
            with modern web technologies.
          </p>
        </div>
        
        <div className="about-section">
          <h3>My Philosophy</h3>
          <p>
            I believe in creating web experiences that are both functional and delightful.
            User interfaces should be intuitive, accessible, and bring a smile to users' faces.
            The best digital products combine solid engineering with thoughtful design.
          </p>
        </div>
        
        <div className="about-section">
          <h3>When I'm Not Coding</h3>
          <p>
            You can find me exploring pixel art, playing retro video games, hiking in nature,
            or experimenting with new recipes in the kitchen. I'm always learning and trying
            new things!
          </p>
        </div>
        
        <div className="about-section">
          <h3>Tech Stack Favorites</h3>
          <div className="tech-stack">
            <span className="tech-item">React</span>
            <span className="tech-item">TypeScript</span>
            <span className="tech-item">CSS Modules</span>
            <span className="tech-item">Vite</span>
            <span className="tech-item">Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;