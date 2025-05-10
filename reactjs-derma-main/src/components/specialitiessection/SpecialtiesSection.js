import React, { useState } from 'react';
import { FaStethoscope, FaUserMd, FaAllergies, FaSmile, FaBaby, FaFlask, FaHeart, FaEye } from 'react-icons/fa'; // Import FontAwesome icons
import './SpecialtiesSection.css'; // Import the CSS for styling

const SpecialtiesSection = () => {
  const specialties = [
    {
      icon: <FaStethoscope className="icon" />,
      title: 'Acne Treatment',
      description: 'Diagnosis and treatment of acne, including topical and oral medications.',
    },
    {
      icon: <FaUserMd className="icon" />,
      title: 'Skin Cancer Screening',
      description: 'Early detection and treatment of skin cancer, including melanoma.',
    },
    {
      icon: <FaAllergies className="icon" />,
      title: 'Eczema and Psoriasis',
      description: 'Management of chronic skin conditions like eczema and psoriasis.',
    },
    {
      icon: <FaSmile className="icon" />,
      title: 'Cosmetic Dermatology',
      description: 'Procedures like Botox, fillers, and laser treatments for skin rejuvenation.',
    },
    {
      icon: <FaBaby className="icon" />,
      title: 'Pediatric Dermatology',
      description: 'Skin care for children, including rashes, birthmarks, and infections.',
    },
    {
      icon: <FaFlask className="icon" />,
      title: 'Hair and Scalp Disorders',
      description: 'Treatment for hair loss, dandruff, and scalp conditions.',
    },
    {
      icon: <FaHeart className="icon" />,
      title: 'Allergic Skin Reactions',
      description: 'Diagnosis and treatment of skin allergies and irritations.',
    },
    {
      icon: <FaEye className="icon" />,
      title: 'Wart and Mole Removal',
      description: 'Safe and effective removal of warts and moles.',
    },
    {
        icon: <FaEye className="icon" />,
        title: 'Wart and Mole Removal',
        description: 'Safe and effective removal of warts and moles.',
      },
  ];

  const [activeSet, setActiveSet] = useState(0);

  // Split specialties into sets of 3
  const specialtySets = [];
  for (let i = 0; i < specialties.length; i += 3) {
    specialtySets.push(specialties.slice(i, i + 3));
  }

  const handleDotClick = (index) => {
    setActiveSet(index);
  };

  return (
    <section className="specialties-section">
      <h2>Dermatologist Specialties</h2>
      <div className="specialties-grid">
        {specialtySets[activeSet].map((specialty, index) => (
          <div key={index} className="specialty-card">
            <div className="icon-circle">{specialty.icon}</div>
            <h3>{specialty.title}</h3>
            <p>{specialty.description}</p>
          </div>
        ))}
      </div>
      <div className="navigation-dots">
        {specialtySets.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeSet ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default SpecialtiesSection;