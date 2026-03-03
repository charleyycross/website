import React, { useState } from 'react';

const ContactApp: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server
    console.log('Form submitted:', formState);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="app-container">
      <h2>Contact Me</h2>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-method">
            <h3>Email</h3>
            <p>hello@pixeldesktop.example</p>
          </div>
          
          <div className="contact-method">
            <h3>Social</h3>
            <div className="social-links">
              <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
              <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h3>Send a Message</h3>
          
          {submitted ? (
            <div className="success-message">
              Message sent! Thank you for reaching out.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactApp;