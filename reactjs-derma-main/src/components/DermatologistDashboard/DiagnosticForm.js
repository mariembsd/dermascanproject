import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Dropdown } from 'react-bootstrap';
import './DermCss.css';

const DiagnosePage = () => {
  const [medications, setMedications] = useState([
    { name: '', dosage: '', duration: '', frequency: '' }
  ]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [creationDate, setCreationDate] = useState(new Date().toISOString().split('T')[0]);
  const [expirationDate, setExpirationDate] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [disease, setDisease] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const dermatologist = JSON.parse(localStorage.getItem('user'));
    if (!dermatologist?.id) return;

    fetch(`http://localhost:5000/api/appointments/dermatologist/${dermatologist.id}/patients`)
      .then(res => res.json())
      .then(data => {
        const uniquePatients = data.filter(
          (patient, index, self) => index === self.findIndex(p => p.id === patient.id)
        );
        setPatients(uniquePatients);
      })
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedicationField = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', duration: '', frequency: '' }
    ]);
  };

  const handleSave = async () => {
    const dermatologist = JSON.parse(localStorage.getItem('user'));
    if (!dermatologist?.id || !selectedPatientId) {
      return alert('❌ Please select a patient.');
    }

    const payload = {
      dermatologistId: dermatologist.id,
      patientId: selectedPatientId,
      diseaseName: disease,
      description,
      severity,
      creationDate,
      expirationDate,
      medications,
    };

    try {
      const response = await fetch('http://localhost:5000/api/diagnoses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Diagnosis saved successfully');
      } else {
        alert(result.message || 'Error saving diagnosis');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Server error');
    }
  };

  return (
    <Card className="p-4 diagnostic-form">
      <h4>🩺 Diagnostic Form</h4>
      <Form>
        {/* Patient Dropdown */}
        <Form.Group className="mb-3 patient-select-container">
          <Form.Label>Select Patient</Form.Label>
          <Dropdown className="patient-dropdown">
            <Dropdown.Toggle variant="outline-secondary" className="patient-dropdown-toggle">
              {
                selectedPatientId
                  ? patients.find(p => p.id === selectedPatientId)?.fullName || 'Select a patient'
                  : 'Select a patient'
              }
            </Dropdown.Toggle>
            <Dropdown.Menu className="patient-dropdown-menu">
              {patients.map((patient) => (
                <Dropdown.Item
                  key={patient.id}
                  className="patient-dropdown-item"
                  onClick={() => {
                    console.log('Selected Patient ID:', patient.id);
                    setSelectedPatientId(patient.id);
                  }}
                  active={selectedPatientId === patient.id}
                >
                  {patient.fullName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        {/* Disease + Description */}
        <Form.Group className="mb-3">
          <Form.Label>Disease Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Acne"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter disease description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Severity */}
        <Form.Group className="mb-3 severity-level">
          <Form.Label>Severity Level</Form.Label>
          <div className="severity-options">
            {['mild', 'medium', 'severe', 'critical'].map(level => (
              <Form.Check
                inline
                key={level}
                id={`severity-${level}`}
                label={level.charAt(0).toUpperCase() + level.slice(1)}
                name="severity"
                type="radio"
                checked={severity === level}
                onChange={() => setSeverity(level)}
              />
            ))}
          </div>
        </Form.Group>

        {/* Prescription Dates */}
        <h5 className="mt-4">📝 Prescription</h5>
        <div className="prescription-dates-container d-flex gap-3">
          <Form.Group className="prescription-date-field">
            <Form.Label>Creation Date</Form.Label>
            <Form.Control
              type="date"
              value={creationDate}
              onChange={(e) => setCreationDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="prescription-date-field">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              min={creationDate}
            />
          </Form.Group>
        </div>

        {/* Medications List */}
        {medications.map((med, index) => (
          <div key={index} className="mb-3 border rounded p-3 medication-block medication-item">
            <div className="row g-3">
              {['name', 'dosage', 'frequency', 'duration'].map((field) => (
                <Form.Group className="col-md-3" key={`${field}-${index}`}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter ${field}`}
                    value={med[field]}
                    onChange={(e) => handleMedicationChange(index, field, e.target.value)}
                  />
                </Form.Group>
              ))}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="col-md-10 d-inline-flex gap-3">
          <div className="mt-3 col-md-4">
            <Button variant="secondary" onClick={addMedicationField}>➕ Add Medication</Button>
          </div>
          <div className="mt-3 col-md-3">
            <Button variant="primary" onClick={handleSave}>💾 Save</Button>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default DiagnosePage;
