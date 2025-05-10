import React from "react";
import "./TreatmentsServices.css"; // Import the CSS file

import hairImage from "../../assets/images/hair.jpg";
import molesImage from "../../assets/images/moles.jpg";
import skinImage from "../../assets/images/skin.jpg";
import ageImage from "../../assets/images/age1.jpg";

const treatments = [
  {
    id: 1,
    image: hairImage,
    category: "YOUR APPEARANCE",
    title: "Hair Transplantation",
    description: "Restore your natural hairline and regain confidence with advanced hair transplantation techniques.",
  },
  {
    id: 2,
    image: molesImage,
    category: "SKIN PROBLEMS",
    title: "Moles and Skin",
    description: "Expert removal and treatment of moles, blemishes, and other skin irregularities for a healthy and smooth complexion.",
  },
  {
    id: 3,
    image: skinImage,
    category: "SKIN, HAIR AND NAIL",
    title: "Medical",
    description: "Comprehensive dermatological care for various skin conditions, including acne, eczema, and other medical skin concerns.",
  },
  {
    id: 4,
    image: ageImage,
    category: "WRINKLES AND LINES",
    title: "Anti Aging",
    description: "Rejuvenate your skin with anti-aging treatments that reduce wrinkles and fine lines, restoring a youthful and radiant glow.",
  },
];

const TreatmentsServices = () => {
  return (
    <section className="treatments-section">
      <div className="container">
        <div className="text-center mb-5">
          <p className="section-subtitle">HEALTHY SKIN AND NATURAL</p>
          <h2 className="section-title">Treatments & Services</h2>
        </div>
        <div className="row">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="col-md-3 fade-in">
              <div className="treatment-card">
                <img src={treatment.image} alt={treatment.title} className="treatment-img" />
                <p className="category">{treatment.category}</p>
                <h3 className="title">{treatment.title}</h3>
                <p className="description">{treatment.description}</p>
                <button className="btn-custom2">
                  VIEW SERVICES <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsServices;
