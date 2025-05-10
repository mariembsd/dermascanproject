import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const BookAppointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form data for patient information
  const [patientInfo, setPatientInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    insuranceProvider: '',
    policyNumber: '',
    reasonForVisit: '',
    newPatient: 'yes',
    agreeToTerms: false
  });

  // Mock data for doctors
  const doctors = [
    { id: 'dr-johnson', name: 'Dr. Sarah Johnson', specialty: 'General Dermatology' },
    { id: 'dr-chen', name: 'Dr. Michael Chen', specialty: 'Pediatric Dermatology' },
    { id: 'dr-rivera', name: 'Dr. Jessica Rivera', specialty: 'Cosmetic Dermatology' },
    { id: 'dr-wilson', name: 'Dr. David Wilson', specialty: 'Surgical Dermatology' }
  ];

  // Mock data for appointment types
  const appointmentTypes = [
    { id: 'general-consultation', name: 'General Skin Consultation', duration: 30, price: 150, description: 'Initial evaluation of skin concerns and conditions.' },
    { id: 'follow-up', name: 'Follow-up Visit', duration: 15, price: 100, description: 'Brief check on treatment progress and adjustments.' },
    { id: 'acne-treatment', name: 'Acne Treatment', duration: 45, price: 200, description: 'Specialized treatment for acne and related conditions.' },
    { id: 'skin-cancer-screening', name: 'Skin Cancer Screening', duration: 30, price: 175, description: 'Thorough examination for skin cancer detection.' },
    { id: 'cosmetic-consultation', name: 'Cosmetic Consultation', duration: 60, price: 250, description: 'Discussion of cosmetic procedures and options.' }
  ];

  // Mock data for available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Format date as YYYY-MM-DD for the input value
      const formattedDate = date.toISOString().split('T')[0];
      
      // Skip weekends (Saturday=6, Sunday=0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(formattedDate);
      }
    }
    
    return dates;
  };

  // Mock data for time slots
  const getTimeSlots = () => {
    const slots = [];
    let id = 1;
    
    for (let hour = 9; hour < 17; hour++) {
      // Morning slots
      slots.push({ 
        id: id++, 
        time: `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`, 
        available: Math.random() > 0.3 // Randomly make some slots unavailable
      });
      
      slots.push({ 
        id: id++, 
        time: `${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`, 
        available: Math.random() > 0.3
      });
    }
    
    return slots;
  };

  const availableDates = getAvailableDates();
  const timeSlots = getTimeSlots();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotSelect = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setPatientInfo(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'radio') {
      setPatientInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPatientInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment details:', {
      doctor: selectedDoctor,
      appointmentType: selectedType,
      date: selectedDate,
      timeSlot: timeSlots.find(slot => slot.id === selectedSlot)?.time,
      patientInfo
    });
    
    setFormSubmitted(true);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Check if user can proceed to next step
  const canProceedToStep2 = selectedDoctor && selectedType;
  const canProceedToStep3 = selectedDate && selectedSlot !== null;

  return (
    <div className="book-appointment-page">
      
      <NavigationBar/>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container section-container">
          <div className="text-center fade-in">
            <h1 className="display-4 fw-bold mb-4">Book an Appointment</h1>
            <p className="lead mb-4">Schedule a consultation with one of our experienced dermatologists.</p>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-5">
        <div className="container section-container">
          {formSubmitted ? (
            <div className="card border-0 shadow text-center p-5 fade-in">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
              </div>
              <h2 className="mb-3">Appointment Confirmed!</h2>
              <p className="lead mb-4">Your appointment has been successfully scheduled.</p>
              <div className="card mb-4 bg-light">
                <div className="card-body">
                  <h5 className="mb-3">Appointment Details</h5>
                  <p className="mb-2"><strong>Doctor:</strong> {doctors.find(doc => doc.id === selectedDoctor)?.name}</p>
                  <p className="mb-2"><strong>Service:</strong> {appointmentTypes.find(type => type.id === selectedType)?.name}</p>
                  <p className="mb-2"><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="mb-2"><strong>Time:</strong> {timeSlots.find(slot => slot.id === selectedSlot)?.time}</p>
                </div>
              </div>
              <p className="mb-4">A confirmation email has been sent to {patientInfo.email} with all the details.</p>
              <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Return to Home</button>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                  <div className="position-relative mb-4">
                    <div className="progress" style={{ height: '4px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${(step / 3) * 100}%` }} 
                        aria-valuenow={(step / 3) * 100} 
                        aria-valuemin={0} 
                        aria-valuemax={100}>
                      </div>
                    </div>
                    <div className="position-absolute" style={{ top: '-10px', left: '0', width: '100%' }}>
                      <div className="d-flex justify-content-between">
                        <div className={`rounded-circle ${step >= 1 ? 'bg-primary' : 'bg-light'} text-white d-flex align-items-center justify-content-center`} style={{ width: '24px', height: '24px', border: '2px solid var(--primary-color)' }}>
                          {step > 1 ? <i className="bi bi-check"></i> : 1}
                        </div>
                        <div className={`rounded-circle ${step >= 2 ? 'bg-primary' : 'bg-light'} text-white d-flex align-items-center justify-content-center`} style={{ width: '24px', height: '24px', border: '2px solid var(--primary-color)' }}>
                          {step > 2 ? <i className="bi bi-check"></i> : 2}
                        </div>
                        <div className={`rounded-circle ${step >= 3 ? 'bg-primary' : 'bg-light'} text-white d-flex align-items-center justify-content-center`} style={{ width: '24px', height: '24px', border: '2px solid var(--primary-color)' }}>
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between text-center">
                    <div style={{ width: '33%' }}>
                      <p className="mb-0 small">Select Provider & Service</p>
                    </div>
                    <div style={{ width: '33%' }}>
                      <p className="mb-0 small">Choose Date & Time</p>
                    </div>
                    <div style={{ width: '33%' }}>
                      <p className="mb-0 small">Your Information</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card border-0 shadow">
                    <div className="card-body p-4 p-md-5">
                      
                      {/* Step 1: Select Provider & Service */}
                      {step === 1 && (
                        <div className="fade-in">
                          <h2 className="mb-4">Select Provider & Service</h2>
                          
                          {/* Select Doctor */}
                          <h5 className="mb-3">Choose a Dermatologist</h5>
                          <div className="row g-3 mb-4">
                            {doctors.map(doctor => (
                              <div key={doctor.id} className="col-md-6">
                                <div 
                                  className={`card cursor-pointer border ${selectedDoctor === doctor.id ? 'border-primary' : 'border-light'}`}
                                  onClick={() => setSelectedDoctor(doctor.id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div className="card-body p-3">
                                    <div className="form-check">
                                      <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="doctor" 
                                        id={doctor.id} 
                                        checked={selectedDoctor === doctor.id}
                                        onChange={() => setSelectedDoctor(doctor.id)}
                                      />
                                      <label className="form-check-label w-100" htmlFor={doctor.id}>
                                        <h6 className="mb-1">{doctor.name}</h6>
                                        <p className="mb-0 small text-muted">{doctor.specialty}</p>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Select Appointment Type */}
                          <h5 className="mb-3">Select Service Type</h5>
                          <div className="mb-4">
                            {appointmentTypes.map(type => (
                              <div 
                                key={type.id} 
                                className={`card mb-3 cursor-pointer border ${selectedType === type.id ? 'border-primary' : 'border-light'}`}
                                onClick={() => setSelectedType(type.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="card-body p-3">
                                  <div className="form-check">
                                    <input 
                                      className="form-check-input" 
                                      type="radio" 
                                      name="appointmentType" 
                                      id={type.id} 
                                      checked={selectedType === type.id}
                                      onChange={() => setSelectedType(type.id)}
                                    />
                                    <label className="form-check-label w-100" htmlFor={type.id}>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">{type.name}</h6>
                                        <div className="text-end">
                                          <span className="badge bg-light text-dark me-2">{type.duration} min</span>
                                          <span className="text-primary">${type.price}</span>
                                        </div>
                                      </div>
                                      <p className="mb-0 small text-muted mt-1">{type.description}</p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="d-flex justify-content-end">
                            <button 
                              className="btn btn-primary px-4" 
                              disabled={!canProceedToStep2}
                              onClick={nextStep}
                            >
                              Continue <i className="bi bi-arrow-right ms-1"></i>
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 2: Date and Time Selection */}
                      {step === 2 && (
                        <div className="fade-in">
                          <h2 className="mb-4">Choose Date & Time</h2>
                          
                          {/* Date Selection */}
                          <div className="mb-4">
                            <h5 className="mb-3">Select Date</h5>
                            <select 
                              className="form-select mb-3" 
                              value={selectedDate} 
                              onChange={handleDateChange}
                              required
                            >
                              <option value="">Select a date</option>
                              {availableDates.map((date, index) => (
                                <option key={index} value={date}>
                                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Time Slot Selection */}
                          {selectedDate && (
                            <div className="mb-4">
                              <h5 className="mb-3">Select Time</h5>
                              <div className="row g-2">
                                {timeSlots.map(slot => (
                                  <div key={slot.id} className="col-md-3 col-6">
                                    <button 
                                      className={`btn w-100 mb-2 ${selectedSlot === slot.id ? 'btn-primary' : 'btn-outline-secondary'} ${!slot.available ? 'disabled opacity-50' : ''}`}
                                      onClick={() => slot.available && handleSlotSelect(slot.id)}
                                      disabled={!slot.available}
                                    >
                                      {slot.time}
                                    </button>
                                  </div>
                                ))}
                              </div>
                              {!selectedSlot && <p className="text-muted small mt-2">Please select an available time slot</p>}
                            </div>
                          )}
                          
                          {/* Selection Summary */}
                          {selectedDate && selectedSlot && (
                            <div className="card bg-light mb-4">
                              <div className="card-body">
                                <h5 className="card-title">Appointment Summary</h5>
                                <p className="mb-1"><strong>Doctor:</strong> {doctors.find(doc => doc.id === selectedDoctor)?.name}</p>
                                <p className="mb-1"><strong>Service:</strong> {appointmentTypes.find(type => type.id === selectedType)?.name}</p>
                                <p className="mb-1"><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="mb-0"><strong>Time:</strong> {timeSlots.find(slot => slot.id === selectedSlot)?.time}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="d-flex justify-content-between">
                            <button className="btn btn-outline-secondary px-4" onClick={prevStep}>
                              <i className="bi bi-arrow-left me-1"></i> Back
                            </button>
                            <button 
                              className="btn btn-primary px-4" 
                              disabled={!canProceedToStep3}
                              onClick={nextStep}
                            >
                              Continue <i className="bi bi-arrow-right ms-1"></i>
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 3: Patient Information */}
                      {step === 3 && (
                        <div className="fade-in">
                          <h2 className="mb-4">Your Information</h2>
                          
                          <form onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <h5 className="mb-3">Personal Information</h5>
                            <div className="row g-3 mb-4">
                              <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name*</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="firstName" 
                                  name="firstName"
                                  value={patientInfo.firstName}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name*</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="lastName" 
                                  name="lastName"
                                  value={patientInfo.lastName}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email Address*</label>
                                <input 
                                  type="email" 
                                  className="form-control" 
                                  id="email" 
                                  name="email"
                                  value={patientInfo.email}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Phone Number*</label>
                                <input 
                                  type="tel" 
                                  className="form-control" 
                                  id="phone" 
                                  name="phone"
                                  value={patientInfo.phone}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="dateOfBirth" className="form-label">Date of Birth*</label>
                                <input 
                                  type="date" 
                                  className="form-control" 
                                  id="dateOfBirth" 
                                  name="dateOfBirth"
                                  value={patientInfo.dateOfBirth}
                                  onChange={handleInputChange}
                                  required 
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select 
                                  className="form-select" 
                                  id="gender" 
                                  name="gender"
                                  value={patientInfo.gender}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                  <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                              </div>
                            </div>
                            
                            {/* Address Information */}
                            <h5 className="mb-3">Address Information</h5>
                            <div className="row g-3 mb-4">
                              <div className="col-12">
                                <label htmlFor="address" className="form-label">Street Address</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="address" 
                                  name="address"
                                  value={patientInfo.address}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="city" className="form-label">City</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="city" 
                                  name="city"
                                  value={patientInfo.city}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-md-4">
                                <label htmlFor="state" className="form-label">State</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="state" 
                                  name="state"
                                  value={patientInfo.state}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-md-2">
                                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="zipCode" 
                                  name="zipCode"
                                  value={patientInfo.zipCode}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            
                            {/* Insurance Information */}
                            <h5 className="mb-3">Insurance Information (Optional)</h5>
                            <div className="row g-3 mb-4">
                              <div className="col-md-6">
                                <label htmlFor="insuranceProvider" className="form-label">Insurance Provider</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="insuranceProvider" 
                                  name="insuranceProvider"
                                  value={patientInfo.insuranceProvider}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="policyNumber" className="form-label">Policy Number</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="policyNumber" 
                                  name="policyNumber"
                                  value={patientInfo.policyNumber}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            
                            {/* Medical Information */}
                            <h5 className="mb-3">Appointment Information</h5>
                            <div className="row g-3 mb-4">
                              <div className="col-12">
                                <label htmlFor="reasonForVisit" className="form-label">Reason for Visit*</label>
                                <textarea 
                                  className="form-control" 
                                  id="reasonForVisit" 
                                  name="reasonForVisit"
                                  rows={3}
                                  value={patientInfo.reasonForVisit}
                                  onChange={handleInputChange}
                                  required
                                ></textarea>
                                <div className="form-text">Please provide a brief description of your skin concern or reason for the appointment.</div>
                              </div>
                              <div className="col-12">
                                <label className="form-label d-block">Are you a new patient?*</label>
                                <div className="form-check form-check-inline">
                                  <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="newPatient" 
                                    id="newPatientYes" 
                                    value="yes"
                                    checked={patientInfo.newPatient === 'yes'}
                                    onChange={handleInputChange}
                                  />
                                  <label className="form-check-label" htmlFor="newPatientYes">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="newPatient" 
                                    id="newPatientNo" 
                                    value="no"
                                    checked={patientInfo.newPatient === 'no'}
                                    onChange={handleInputChange}
                                  />
                                  <label className="form-check-label" htmlFor="newPatientNo">No</label>
                                </div>
                              </div>
                            </div>
                            
                            {/* Terms and Conditions */}
                            <div className="mb-4">
                              <div className="form-check">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  id="agreeToTerms" 
                                  name="agreeToTerms"
                                  checked={patientInfo.agreeToTerms}
                                  onChange={e => setPatientInfo(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                                  required
                                />
                                <label className="form-check-label" htmlFor="agreeToTerms">
                                  I agree to the <a href="#" className="text-decoration-none">terms and conditions</a> and <a href="#" className="text-decoration-none">privacy policy</a>.
                                </label>
                              </div>
                            </div>
                            
                            {/* Appointment Summary */}
                            <div className="card bg-light mb-4">
                              <div className="card-body">
                                <h5 className="card-title">Appointment Summary</h5>
                                <p className="mb-1"><strong>Doctor:</strong> {doctors.find(doc => doc.id === selectedDoctor)?.name}</p>
                                <p className="mb-1"><strong>Service:</strong> {appointmentTypes.find(type => type.id === selectedType)?.name}</p>
                                <p className="mb-1"><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="mb-1"><strong>Time:</strong> {timeSlots.find(slot => slot.id === selectedSlot)?.time}</p>
                                <p className="mb-0"><strong>Price:</strong> ${appointmentTypes.find(type => type.id === selectedType)?.price}</p>
                              </div>
                            </div>
                            
                            <div className="d-flex justify-content-between">
                              <button type="button" className="btn btn-outline-secondary px-4" onClick={prevStep}>
                                <i className="bi bi-arrow-left me-1"></i> Back
                              </button>
                              <button 
                                type="submit" 
                                className="btn btn-success px-4"
                                disabled={!patientInfo.agreeToTerms}
                              >
                                Confirm Booking <i className="bi bi-check-circle ms-1"></i>
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default BookAppointment;