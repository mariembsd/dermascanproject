import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About DermaCare Section */}
        <div className="footer-section">
          <h3>DermaCare</h3>
          <p>
            Your trusted partner in dermatology and skincare. We provide expert treatments to help you achieve healthy, glowing skin.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <FaEnvelope className="footer-icon" /> info@dermacare.com
            </li>
            <li>
              <FaPhone className="footer-icon" /> +123 456 7890
            </li>
            <li>
              <FaMapMarkerAlt className="footer-icon" /> 123 Skin Care St, City, Country
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com/dermacare" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://twitter.com/dermacare" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com/dermacare" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://linkedin.com/dermacare" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DermaCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;