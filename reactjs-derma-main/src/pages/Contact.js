import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './Contact.css';
import contact from '../assets/images/skin.jpg'; // Imported image

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <NavigationBar />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container section-container">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-in">
              <h1 className="hero-title">Contact Us</h1>
              <p className="hero-subtitle">We’re here to help! Reach out with any questions or concerns.</p>
            </div>
            <div className="col-lg-6 slide-in">
              {/* Replacing image src with the imported contact image */}
              <img src={contact} alt="Contact" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-5">
        <div className="container section-container">
          <div className="row g-4 text-center">
            {[{
              icon: "bi-geo-alt",
              title: "Visit Us",
              content: "123 Derma Street, Medical District, New York, NY 10001"
            },
            {
              icon: "bi-telephone",
              title: "Call Us",
              content: "Customer Support:\n(555) 123-4567\nMon-Fri: 8AM-6PM EST"
            },
            {
              icon: "bi-envelope",
              title: "Email Us",
              content: "info@dermaconnect.com\nsupport@dermaconnect.com"
            }].map(({ icon, title, content }, index) => (
              <div key={index} className="col-md-4">
                <div className="card contact-card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="contact-icon mb-3"><i className={`bi ${icon}`}></i></div>
                    <h4>{title}</h4>
                    <p className="mb-0 white-space-pre-line">{content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container section-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow">
                <div className="card-body p-4 p-md-5">
                  <h2 className="text-center mb-4">Send Us a Message</h2>
                  {formSubmitted ? (
                    <div className="alert alert-success fade-in" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      Thank you for your message! We'll get back to you shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        {[{
                          id: "name", label: "Full Name", type: "text"
                        },
                        {
                          id: "email", label: "Email Address", type: "email"
                        },
                        {
                          id: "phone", label: "Phone Number", type: "tel"
                        }].map(({ id, label, type }, index) => (
                          <div className="col-md-6" key={index}>
                            <label htmlFor={id} className="form-label">{label}</label>
                            <input
                              type={type}
                              className="form-control"
                              id={id}
                              name={id}
                              value={formData[id]}
                              onChange={handleChange}
                              required={id !== "phone"}
                            />
                          </div>
                        ))}
                        <div className="col-md-6">
                          <label htmlFor="subject" className="form-label">Subject</label>
                          <select
                            className="form-select"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Appointment Question">Appointment Question</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Billing Question">Billing Question</option>
                            <option value="Partnership Opportunity">Partnership Opportunity</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="message" className="form-label">Message</label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <div className="col-12 text-center">
                          <button type="submit" className="btn btn-contact btn-lg px-5 mt-3">Send Message</button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
