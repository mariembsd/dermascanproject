import React, { useState } from "react";
import "./GenderToggle.css";
import maleImage from "../../assets/images/him.jpg";
import femaleImage from "../../assets/images/her.jpg";

const SkinTreatment = () => {
  const [selectedGender, setSelectedGender] = useState("male");

  return (
    <div className="treatment-container">
      <h3 className="subheading">WE PROVIDE FOR YOU</h3>
      <h1 className="heading">We Treat All Types of Skin</h1>
      <div className="button-group">
        <button
          className={selectedGender === "male" ? "active" : ""}
          onClick={() => setSelectedGender("male")}
        >
          FOR HIM
        </button>
        <button
          className={selectedGender === "female" ? "active" : ""}
          onClick={() => setSelectedGender("female")}
        >
          FOR HER
        </button>
      </div>
      <div className="image-container">
        <img
          src={selectedGender === "male" ? maleImage : femaleImage}
          alt="Skin Treatment"
          className="treatment-image"
        />
      </div>
    </div>
  );
};

export default SkinTreatment;
