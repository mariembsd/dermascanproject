import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ServicesPage.css';
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

// Import service images
import consultationImg from '../assets/images/moles.jpg';
import analysisImg from '../assets/images/moles.jpg';
import treatmentImg from '../assets/images/moles.jpg';
import appointmentImg from '../assets/images/moles.jpg';
import historyImg from '../assets/images/moles.jpg';
import recommendationsImg from '../assets/images/moles.jpg';

const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const ServicesPage = () => {
  const services = [
    {
      title: "Online Dermatologist Consultation",
      description: "Connect with board-certified dermatologists through secure, HIPAA-compliant video calls or messaging. Get expert advice without leaving your home with our high-quality telemedicine platform.",
      icon: "fas fa-video",
      image: consultationImg,
      features: ["HD video calls", "Secure messaging", "Prescription delivery", "Follow-up reminders"]
    },
    {
      title: "Skin Condition Analysis",
      description: "Submit high-resolution photos of your skin concerns and receive professional analysis within 24 hours. Our dermatologists use advanced imaging tools to provide accurate assessments.",
      icon: "fas fa-camera-retro",
      image: analysisImg,
      features: ["Photo analysis", "Symptom tracking", "Priority cases flagged", "Multi-angle uploads"]
    },
    {
      title: "Personalized Treatment Plans",
      description: "Receive customized treatment protocols tailored to your specific skin type, conditions, and lifestyle. Our plans include medication, lifestyle recommendations, and progress tracking.",
      icon: "fas fa-prescription-bottle-alt",
      image: treatmentImg,
      features: ["Custom routines", "Progress tracking", "Medication management", "Lifestyle advice"]
    },
    {
      title: "Smart Appointment Scheduling",
      description: "Our intelligent scheduling system finds the perfect time for your consultation based on your preferences and the dermatologist's availability, with automatic reminders.",
      icon: "fas fa-calendar-alt",
      image: appointmentImg,
      features: ["Real-time availability", "Auto-reminders", "Rescheduling", "Waitlist options"]
    },
    {
      title: "Comprehensive Medical History",
      description: "Your complete dermatological history securely stored and easily accessible. Track progress over time with visual timelines and treatment outcome measurements.",
      icon: "fas fa-clipboard-list",
      image: historyImg,
      features: ["Secure storage", "Visual timelines", "Treatment outcomes", "Exportable records"]
    },
    {
      title: "AI-Powered Recommendations",
      description: "Our smart system suggests products and routines based on your skin profile, with options filtered by your budget, preferences, and specific skin concerns.",
      icon: "fas fa-spa",
      image: recommendationsImg,
      features: ["Product matching", "Budget filters", "Ingredient analysis", "Routine builder"]
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="services-page">
      <NavigationBar/>
      {/* Hero Section */}
      <div className="services-hero">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {/* <h1 className="hero-title">Advanced Dermatological Care</h1>
            <p className="hero-subtitle">Cutting-edge skin health solutions powered by technology and expert care</p> */}
          </motion.div>
        </Container>
      </div>

      {/* Services Grid */}
      <Container className="services-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-5"
        >
          <h2 className="section-title">Our Comprehensive Services</h2>
          <p className="section-subtitle">Every aspect of your skin health journey covered</p>
        </motion.div>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map((service, index) => (
            <Col key={index}>
              <AnimatedCard delay={index * 0.1}>
                <Card className="service-card h-100">
                  <div className="service-image-container">
                    <img src={service.image} alt={service.title} className="service-image" />
                    <div className="service-icon-circle">
                      <i className={`${service.icon} fa-lg`}></i>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="service-card-title">{service.title}</Card.Title>
                    <Card.Text className="service-card-text">
                      {service.description}
                    </Card.Text>
                    <div className="service-features">
                      <ul>
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </Card.Body>
                  <Card.Footer className="service-footer">
                    <Button variant="primary" className="service-button">
                      Learn More <i className="fas fa-chevron-right ms-2"></i>
                    </Button>
                  </Card.Footer>
                </Card>
              </AnimatedCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Value Proposition Section */}
      <section className="value-proposition">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="value-title">Why DermaScan Stands Out</h2>
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <h3>Military-Grade Security</h3>
                    <p>Your health data is protected with end-to-end encryption and HIPAA compliance.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div>
                    <h3>Rapid Response</h3>
                    <p>90% of cases receive initial feedback within 6 hours, emergency cases within 1 hour.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div>
                    <h3>Top 1% Specialists</h3>
                    <p>Our dermatologists are fellowship-trained and average 15+ years of experience.</p>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="value-image-container">
                  <img style={{width:"100%", objectFit:"cover" }} src={recommendationsImg} alt="Dermatologist using DermaScan" className="value-image" />
                  <div className="stats-overlay">
                    <div className="stat-item">
                      <div className="stat-number">98%</div>
                      <div className="stat-label">Accuracy Rate</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">24/7</div>
                      <div className="stat-label">Availability</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">10k+</div>
                      <div className="stat-label">Patients Served</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      {/* <section className="cta-section">
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-container"
          >
            <h2 className="cta-title">Ready for Healthier Skin?</h2>
            <p className="cta-text">Join thousands of patients experiencing better dermatological care</p>
            <div className="cta-buttons">
              <Button variant="primary" size="lg" className="me-3">
                Book a Consultation
              </Button>
              <Button variant="outline-light" size="lg">
                Learn How It Works
              </Button>
            </div>
          </motion.div>
        </Container>
      </section> */}
      <Footer/>
    </div>
  );
};

export default ServicesPage;