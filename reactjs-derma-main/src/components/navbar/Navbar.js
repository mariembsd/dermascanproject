import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";  // Import Link for routing
import "./Navbar.css";

const NavigationBar = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className={`top-bar ${darkMode ? "dark-top-bar" : ""}`}>
        <Container>
          <span>Call Us - (00) 123 456 7891</span>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar expand="lg" className={`custom-navbar ${darkMode ? "dark-navbar" : ""} shadow-sm`}>
        <Container>
          {/* Brand Logo (Linked to Home) */}
          <Navbar.Brand as={Link} to="/" className="brand">DermaCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className=" nav-nav">
              {/* Navigation Links */}
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
                { name: "Blog", path: "/blog" },
                { name: "Book an Appointment", path: "/bookanappointment" }
              ].map((item, index) => (
                <Nav.Link as={Link} key={index} to={item.path} className="nav-link-custom">
                  {item.name}
                </Nav.Link>
              ))}

              

              {/* Dark Mode Toggle */}
              {/* <Button
                variant={darkMode ? "light" : "dark"}
                className="ms-3 toggle-button"
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle Dark Mode"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </Button> */}
            </Nav>
            {/* Authentication Buttons */}
            <div className="auth-btn">
                {[
                  { text: "Login", variant: darkMode ? "outline-light" : "outline-dark", to: "/login" },
                  { text: "Sign Up", variant: darkMode ? "light" : "dark", to: "/signup" }
                ].map((btn, index) => (
                  <Nav.Link as={Link} key={index} to={btn.to}>
                    <Button variant={btn.variant} className="nav-button">{btn.text}</Button>
                  </Nav.Link>
                ))}
              </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;