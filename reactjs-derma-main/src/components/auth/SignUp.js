import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom'; 
const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="derma-portal">
      <div className="derma-portal__container">
        <div className="derma-portal__header">
          <h1 className="derma-portal__title"> Hello Skin Enthusiast!</h1>
          <p className="derma-portal__subtitle">Are you here as a patient or dermatologist?</p>
          <div className="derma-portal__emoji"></div>
        </div>
        
        <div className="derma-portal__buttons">
          <button 
            className="derma-portal__btn derma-portal__btn--patient"
            onClick={() => navigate('/patient-signup')}
          >
            <span className="derma-portal__btn-icon"></span>
            <span>I'm a Patient</span>
          </button>
          
          <button 
            className="derma-portal__btn derma-portal__btn--dermatologist"
            onClick={() => navigate('/dermatologist-signup')}
          >
            <span className="derma-portal__btn-icon"></span>
            <span>I'm a Dermatologist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;