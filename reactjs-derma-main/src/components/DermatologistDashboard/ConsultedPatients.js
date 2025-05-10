import React, { useEffect, useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import './DermCss.css';

const ConsultedPatients = () => {
  const [open, setOpen] = useState(null);
  const [patients, setPatients] = useState([]);
  const [diagnoses, setDiagnoses] = useState({}); // Store diagnosis per patientId

  useEffect(() => {
    const dermatologist = JSON.parse(localStorage.getItem('user'));
    if (!dermatologist?.id) return;

    fetch(`http://localhost:5000/api/appointments/dermatologist/${dermatologist.id}/patients`)
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const handleToggle = async (index, patientId) => {
    setOpen(open === index ? null : index);

    // Only fetch diagnosis if not already loaded
    if (!diagnoses[patientId]) {
      try {
        const res = await fetch(`http://localhost:5000/api/diagnoses/latest/${patientId}`);
        const data = await res.json();
        setDiagnoses(prev => ({ ...prev, [patientId]: data }));
      } catch (err) {
        console.error('Error fetching latest diagnosis:', err);
      }
    }
  };

  return (
    <Card className="p-4">
      <h4>👥 Consulted Patients</h4>
      {patients.map((patient, index) => (
        <div key={patient._id || index} className="mb-3 border p-3">
          <h5>{patient.fullName}</h5>
          <p><strong>Medical Condition:</strong> {patient.medicalConditions || 'N/A'}</p>
          <p><strong>Skin Type:</strong> {patient.skinType}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <Button variant="info" onClick={() => handleToggle(index, patient.id)}>
            🔍 {open === index ? 'Hide Info' : 'View Info'}
          </Button>

          <Collapse in={open === index}>
            <div className="mt-3">
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
              <p><strong>Date of Birth:</strong> {new Date(patient.birthDate).toLocaleDateString()}</p>
              <p><strong>Last Visit:</strong> {new Date(patient.lastVisit).toLocaleDateString()}</p>

              {/* Diagnosis Section */}
              {diagnoses[patient.id] ? (
                <>
                  <h6 className="mt-4">🩺 Latest Diagnosis</h6>
                  <p><strong>Disease:</strong> {diagnoses[patient.id].diseaseName}</p>
                  <p><strong>Description:</strong> {diagnoses[patient.id].description}</p>
                  <p><strong>Severity:</strong> {diagnoses[patient.id].severity}</p>
                  <p><strong>Prescription Period:</strong> {diagnoses[patient.id].creationDate} → {diagnoses[patient.id].expirationDate}</p>

                  <p><strong>Medications:</strong></p>
                  <ul>
                    {diagnoses[patient.id].medications?.map((med, i) => (
                      <li key={i}>
                        💊 <strong>{med.name}</strong> - {med.dosage}, {med.frequency} for {med.duration}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-muted">No diagnosis available.</p>
              )}

              {/* Images */}
              {patient.images?.length > 0 && (
                <>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {patient.images.map((img, i) => (
                      <a
                        key={i}
                        href={`http://localhost:5000/uploads/${img}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://localhost:5000/uploads/${img}`}
                          alt={`patient-${i}`}
                          width="100"
                          height="100"
                          style={{ objectFit: 'cover', borderRadius: '6px' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      </a>
                    ))}
                  </div>
                </>
              )}

              {/* Documents */}
              {patient.documents?.length > 0 && (
                <>
                  <p className="mt-3"><strong>Documents:</strong></p>
                  <ul>
                    {patient.documents.map((doc, i) => (
                      <li key={i}>
                        <a href={`http://localhost:5000/uploads/${doc}`} target="_blank" rel="noreferrer">
                          {doc}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Collapse>
        </div>
      ))}
    </Card>
  );
};

export default ConsultedPatients;
