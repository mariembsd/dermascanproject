import React from "react";
import "./ConsultationForm.css"; // Import the CSS file

const ConsultationForm = () => {
  return (
    <div className="consultation-section">
      <div className="container py-5">
        <div className="text-center mb-4">
          <p className="sub-title">REQUEST FOR YOUR</p>
          <h2 className="main-title">Consultation</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <input type="text" className="form-control input-custom" placeholder="Name" />
              </div>
              <div className="col-md-4">
                <input type="email" className="form-control input-custom" placeholder="Email" />
              </div>
              <div className="col-md-4">
                <input type="date" className="form-control input-custom" />
              </div>
              <div className="col-md-6">
                <select className="form-select input-custom">
                  <option>Type of Service</option>
                  <option>Skin Treatment</option>
                  <option>Acne Consultation</option>
                  <option>General Checkup</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select input-custom">
                  <option>Name of Person</option>
                  <option>Dr. Smith</option>
                  <option>Dr. Johnson</option>
                  <option>Dr. Lee</option>
                </select>
              </div>
              <div className="col-md-12">
                <button className=" btn-custom1">BOOK APPOINTMENT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
