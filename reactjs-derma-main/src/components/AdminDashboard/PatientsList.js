import React, { useState, useEffect } from 'react';
import './PatientsList.css';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        patient: '',
        age: '',
        condition: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error('Error fetching patients:', err));
    }, []);

    const handleView = (patient) => {
        setSelectedPatient(patient);
        setIsEditing(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this patient?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/patients/delete/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setPatients(prev => prev.filter(p => p._id !== id));
                alert('Patient deleted successfully');
            } else {
                const err = await res.json();
                alert(err.message || 'Failed to delete');
            }
        } catch (err) {
            console.error('Error deleting patient:', err);
            alert('Server error');
        }
    };

    const handleCloseDetails = () => {
        setSelectedPatient(null);
        setIsEditing(false);
    };

    return (
        <div className="dashboard-section">
            <div className="section-header">
                <h3>Patients List</h3>
            </div>
            <div className="patients-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Skin Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient._id}>
                                <td>{patient.fullName}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>{patient.skinType}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn small view"
                                            onClick={() => handleView(patient)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn small danger"
                                            onClick={() => handleDelete(patient._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedPatient && (
                <div className="patient-details-modal">
                    <div className="modal-overlay" onClick={handleCloseDetails}></div>
                    <div className="modal-content-enhanced">
                        <button className="close-btn" onClick={handleCloseDetails}>×</button>
                        <h3>Patient Details</h3>

                        <div className="details-view-enhanced">
                            <p><strong>Name:</strong> {selectedPatient.fullName}</p>
                            <p><strong>Email:</strong> {selectedPatient.email}</p>
                            <p><strong>Phone:</strong> {selectedPatient.phoneNumber}</p>
                            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                            <p><strong>Skin Type:</strong> {selectedPatient.skinType}</p>
                            <p><strong>Medical Conditions:</strong> {selectedPatient.medicalConditions}</p>
                        </div>

                        <div className="form-actions-enhanced">
                            <button className="btn secondary" onClick={handleCloseDetails}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientsList;
