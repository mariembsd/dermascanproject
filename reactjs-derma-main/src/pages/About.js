import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "./About.css";
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import aboutHero from "../assets/images/dermatologist.jpg";
import teamImg from "../assets/images/skin.jpg";
import missionImg from "../assets/images/dermatologist.jpg";
import { FaClinicMedical, FaUserMd, FaRegCalendarAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { BsClipboard2Pulse } from 'react-icons/bs';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Acne Treatment Patient",
      rating: 5,
      content: "DermaConnect transformed my skin! After years of struggling with severe acne, their dermatologist created a personalized treatment plan that cleared my skin in just 3 months."
    },
    {
      name: "Michael Roberts",
      role: "Eczema Patient",
      rating: 5,
      content: "The convenience of virtual consultations saved me so much time. My dermatologist was incredibly knowledgeable and helped manage my chronic eczema effectively."
    },
    {
      name: "Jennifer Lee",
      role: "Skin Cancer Screening",
      rating: 4.5,
      content: "I was skeptical about online dermatology, but the thorough examination and follow-up care convinced me. They detected my early-stage melanoma just in time."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Emily Chen",
      specialty: "Medical Dermatology",
      bio: "Board-certified dermatologist with 15 years of experience in treating complex skin conditions."
    },
    {
      name: "Dr. James Rodriguez",
      specialty: "Cosmetic Dermatology",
      bio: "Expert in non-invasive cosmetic procedures and anti-aging treatments."
    },
    {
      name: "Dr. Aisha Johnson",
      specialty: "Pediatric Dermatology",
      bio: "Specializes in childhood skin conditions with a gentle, patient-centered approach."
    }
  ];

  return (
    <div className="dermaconnect-about">
      <NavigationBar/>

      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <h1>About DermaConnect</h1>
              <p className="lead">Your trusted partner in comprehensive skin care since 2015. We're revolutionizing dermatology by making expert skin care accessible to everyone, everywhere.</p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/book-appointment" variant="primary" size="lg" className="btn-pulse">
                  Book an Appointment
                </Button>
                <Button as={Link} to="/services" variant="outline-light" size="lg">
                  Our Services
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <img src={aboutHero} alt="Dermatologist examining patient" className="img-fluid rounded" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img src={missionImg} alt="Skin care products" className="img-fluid rounded shadow" />
            </Col>
            <Col md={6}>
              <h2>Our Mission</h2>
              <p>Founded in 2015, DermaConnect was born from a simple idea: everyone deserves access to quality dermatological care, regardless of location or circumstance.</p>
              <p>We've grown from a small local practice to a nationwide network of over 200 board-certified dermatologists, serving more than 50,000 patients annually.</p>
              <div className="stats-container">
                <div className="stat-item">
                  <h3>200+</h3>
                  <p>Certified Dermatologists</p>
                </div>
                <div className="stat-item">
                  <h3>50K+</h3>
                  <p>Patients Served Annually</p>
                </div>
                <div className="stat-item">
                  <h3>98%</h3>
                  <p>Patient Satisfaction Rate</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Team */}
      <section className="our-team">
        <Container>
          <div className="section-header">
            <h2>Meet Our Expert Dermatologists</h2>
            <p className="lead">Our team consists of board-certified dermatologists with specialized training in various aspects of skin health.</p>
          </div>
          <Row>
            {teamMembers.map((member, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="team-card h-100">
                  <Card.Body>
                    <div className="team-icon">
                      <FaUserMd />
                    </div>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-3">{member.specialty}</Card.Subtitle>
                    <Card.Text>{member.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Approach */}
      <section className="our-approach">
        <Container>
          <div className="section-header">
            <h2>Our Patient-Centered Approach</h2>
            <p className="lead">We combine medical expertise with compassionate care to deliver exceptional results.</p>
          </div>
          <Row>
            <Col md={4} className="approach-item">
              <div className="approach-icon">
                <FaClinicMedical />
              </div>
              <h3>Comprehensive Care</h3>
              <p>From acne to skin cancer, we address all skin conditions with evidence-based treatments.</p>
            </Col>
            <Col md={4} className="approach-item">
              <div className="approach-icon">
                <GiHealthNormal />
              </div>
              <h3>Preventive Focus</h3>
              <p>We emphasize early detection and prevention to maintain long-term skin health.</p>
            </Col>
            <Col md={4} className="approach-item">
              <div className="approach-icon">
                <BsClipboard2Pulse />
              </div>
              <h3>Personalized Plans</h3>
              <p>Every treatment plan is customized to your unique skin type and lifestyle.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <Container>
          <div className="section-header">
            <h2>Patient Experiences</h2>
            <p className="lead">Hear from people who've transformed their skin health with us</p>
          </div>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col lg={4} key={index} className="mb-4">
                <Card className="testimonial-card h-100">
                  <Card.Body>
                    <div className="rating mb-3">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(testimonial.rating) ? 
                        <FaStar key={i} className="star filled" /> : 
                        (i === Math.floor(testimonial.rating) && testimonial.rating % 1 !== 0 ?
                        <FaRegStar key={i} className="star half" /> :
                        <FaRegStar key={i} className="star" />)
                      ))}
                    </div>
                    <Card.Text className="testimonial-content">"{testimonial.content}"</Card.Text>
                    <div className="testimonial-author">
                      <h5>{testimonial.name}</h5>
                      <p>{testimonial.role}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2>Ready to Experience the DermaConnect Difference?</h2>
              <p className="lead mb-4">Join thousands of patients who've achieved healthier skin with our expert care.</p>
              <Button as={Link} to="/book-appointment" variant="light" size="lg" className="btn-pulse">
                Start Your Skin Journey Today
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer/>
    </div>
  );
};

export default About;