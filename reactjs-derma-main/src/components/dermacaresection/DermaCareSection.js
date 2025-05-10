import React from "react";
import "./DermaCareSection.css";
import derma from "../../assets/images/dermatologist.jpg";

const DermaCareSection = () => {
  return (
    <section className="derma-care-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 image-container">
            <div className="image-wrapper">
              <img
                src={derma} // Use the imported image // Replace with actual image
                alt="Skin care treatment"
                className="derma-care-image"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="col-md-6 text-container">
            <p className="subheading">WELCOME TO DERMA CARE!</p>
            <h2 className="heading">Your Trusted Online Dermatology & Skincare Platform </h2>
            <p className="description">
            Book online consultations with expert dermatologists and get personalized skincare solutions from the comfort of your home.  
    Whether you need a diagnosis, treatment plan, or skincare advice, our platform connects you with professionals to help you achieve  
    healthier skin. Explore our advanced care services and take the first step toward radiant, confident skin today!
            </p>
            <button className="btn-custom3">MORE ABOUT US →</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DermaCareSection;
