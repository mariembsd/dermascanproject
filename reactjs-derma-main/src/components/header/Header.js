import React from 'react';
import './Header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="header-section">
      <div className="header-content">
        <h1>Enjoy a Free Demo of DermaScan</h1>
        <p>Experience the future of dermatology with a personalized demo from one of our experts.</p>
        <div className="header-buttons">
        <a href="/contact" className="startbutton">Contact Us</a>
          {/* <a href="/appointment" className="startbutton">Start Now</a>
          <a href="/dermatologists" className="btn-secondary">Find a Dermatologist</a> */}
        </div>
      </div>
    </header>
  );
};

export default Header;