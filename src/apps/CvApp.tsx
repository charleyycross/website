import React from 'react';

const CvApp: React.FC = () => {
  return (
    <div className="app-container">
      <h2>Curriculum Vitae</h2>
      
      <section className="cv-section">
        <h3>Experience</h3>
        <div className="cv-item">
          <h4>Senior Developer</h4>
          <p className="cv-meta">Pixel Perfect Inc. | 2023 - Present</p>
          <p>Led development of retro-styled web applications with modern technologies.</p>
        </div>
        <div className="cv-item">
          <h4>Web Developer</h4>
          <p className="cv-meta">Digital Dreams | 2020 - 2023</p>
          <p>Created responsive websites and interactive user interfaces.</p>
        </div>
      </section>
      
      <section className="cv-section">
        <h3>Education</h3>
        <div className="cv-item">
          <h4>BSc Computer Science</h4>
          <p className="cv-meta">Tech University | 2016 - 2020</p>
          <p>Specialized in web technologies and user interface design.</p>
        </div>
      </section>
      
      <section className="cv-section">
        <h3>Skills</h3>
        <ul className="skills-list">
          <li>React</li>
          <li>TypeScript</li>
          <li>CSS/SCSS</li>
          <li>UI/UX Design</li>
          <li>Responsive Design</li>
          <li>Git</li>
        </ul>
      </section>
    </div>
  );
};

export default CvApp;