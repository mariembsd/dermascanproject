import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How it works</h2>
      <p className="subtitle">A simple three-step process to take care of your skin</p>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Sign up</h3>
          <p>Sign up in a few minutes and complete your health profile.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Choose a dermatologist</h3>
          <p>Browse through our specialists and choose the one that suits you.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Consult and track</h3>
          <p>Participate in your online consultation and track your progress over time.</p>
        </div>
      </div>
      {/* <button className="cta-button">Start Now !</button> */}
    </section>
  );
};

export default HowItWorks;