import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const dermatologist = {
  id: 1,
  name: "Dr. Smith",
  specialty: "Dermatology",
  yearsExperience: 10,
  rating: 4.5,
  image: "image-url.jpg",
  biography: "Dr. Smith is a highly experienced dermatologist..."
};

const Dermatologists = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for dermatologists
  const dermatologistsList = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Dermatology",
      yearsExperience: 15,
      rating: 4.9,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+Sarah",
      biography: "Dr. Johnson specializes in general dermatology with particular expertise in acne, rosacea, and eczema. She completed her medical training at Harvard Medical School and has been practicing for 15 years."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatric Dermatology",
      yearsExperience: 12,
      rating: 4.8,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+Michael",
      biography: "Dr. Chen is a pediatric dermatologist who specializes in treating skin conditions in children and adolescents. He has extensive experience with childhood eczema, birthmarks, and inflammatory skin disorders."
    },
    {
      id: 3,
      name: "Dr. Jessica Rivera",
      specialty: "Cosmetic Dermatology",
      yearsExperience: 10,
      rating: 4.7,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+Jessica",
      biography: "Dr. Rivera focuses on cosmetic dermatology, offering services such as Botox, fillers, and laser treatments. She is known for her artistic approach and natural-looking results."
    },
    {
      id: 4,
      name: "Dr. David Wilson",
      specialty: "Surgical Dermatology",
      yearsExperience: 18,
      rating: 4.9,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+David",
      biography: "Dr. Wilson is a board-certified dermatologist specializing in Mohs surgery and other dermatological surgical procedures. He has performed over 10,000 successful skin cancer removals."
    },
    {
      id: 5,
      name: "Dr. Emily Patel",
      specialty: "General Dermatology",
      yearsExperience: 8,
      rating: 4.6,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+Emily",
      biography: "Dr. Patel practices general dermatology with a special interest in skin of color. She is dedicated to addressing the unique dermatological needs of diverse patient populations."
    },
    {
      id: 6,
      name: "Dr. Robert Thompson",
      specialty: "Cosmetic Dermatology",
      yearsExperience: 14,
      rating: 4.8,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+Robert",
      biography: "Dr. Thompson specializes in cosmetic dermatology and anti-aging treatments. He is an expert in the latest rejuvenation techniques and non-invasive procedures."
    },
    {
      id: 7,
      name: "Dr. Lisa Wong",
      specialty: "Pediatric Dermatology",
      yearsExperience: 11,
      rating: 4.9,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+Lisa",
      biography: "Dr. Wong is dedicated to pediatric dermatology, treating conditions from newborn skin issues to adolescent acne. She is known for her gentle approach with young patients."
    },
    {
      id: 8,
      name: "Dr. James Martinez",
      specialty: "Surgical Dermatology",
      yearsExperience: 16,
      rating: 4.7,
      image: "https://placehold.co/400x500/e0f2fe/333333.png?text=Dr.+James",
      biography: "Dr. Martinez specializes in surgical dermatology with expertise in skin cancer detection and treatment. He is committed to providing thorough skin examinations and preventive care."
    }
  ];

  // Filter dermatologists based on specialty and search term
  const filteredDermatologists = dermatologistsList.filter(derm => {
    const matchesFilter = filter === 'all' || derm.specialty === filter;
    const matchesSearch = derm.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          derm.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          derm.biography.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dermatologists-page">
      <NavigationBar/>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container section-container">
          <div className="text-center fade-in">
            <h1 className="display-4 fw-bold mb-4">Our Dermatologists</h1>
            <p className="lead mb-4">Connect with our board-certified dermatologists who are dedicated to providing exceptional skin care.</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4">
        <div className="container section-container">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by name, specialty, or keyword" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <select 
                className="form-select" 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Specialties</option>
                <option value="General Dermatology">General Dermatology</option>
                <option value="Pediatric Dermatology">Pediatric Dermatology</option>
                <option value="Cosmetic Dermatology">Cosmetic Dermatology</option>
                <option value="Surgical Dermatology">Surgical Dermatology</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Dermatologists Listing */}
      <section className="py-5">
        <div className="container section-container">
          <div className="row g-4">
            {filteredDermatologists.length > 0 ? (
              filteredDermatologists.map(derm => (
                <div key={derm.id} className="col-lg-3 col-md-6">
                  <div className="card h-100 border-0 shadow-sm hover-scale">
                    <img src={derm.image} className="card-img-top" alt={derm.name} />
                    <div className="card-body">
                      <h5 className="card-title">{derm.name}</h5>
                      <p className="text-primary mb-2">{derm.specialty}</p>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi ${i < Math.floor(derm.rating) ? 'bi-star-fill' : (i < derm.rating ? 'bi-star-half' : 'bi-star')} text-warning`}></i>
                          ))}
                        </div>
                        <span className="text-muted small">{derm.rating}</span>
                      </div>
                      <p className="card-text small">{derm.biography.substring(0, 100)}...</p>
                    </div>
                    <div className="card-footer bg-white border-0 pb-3">
                      <div className="d-grid">
                        <Link to="/book-appointment" className="btn btn-outline-primary">Book Appointment</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search fs-1 text-muted mb-3"></i>
                <h3>No dermatologists found</h3>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container section-container text-center">
          <h2 className="mb-4">Ready to transform your skin care journey?</h2>
          <p className="lead mb-4">Our dermatologists are ready to help you achieve healthy, beautiful skin.</p>
          <Link to="/book-appointment" className="btn btn-light btn-lg px-4 py-2">Book Your Appointment Today</Link>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Dermatologists;