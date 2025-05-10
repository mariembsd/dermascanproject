import React, { useState, useEffect } from 'react';
import './DermatologistsList.css';

const DermatologistsList = () => {
    const [dermatologists, setDermatologists] = useState([]);
    const [selectedDermatologist, setSelectedDermatologist] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/dermatologists')
            .then(res => res.json())
            .then(data => setDermatologists(data))
            .catch(err => console.error('Error fetching dermatologists:', err));
    }, []);

    const handleView = (derm) => {
        setSelectedDermatologist(derm);
        setIsEditing(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this dermatologist?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/dermatologists/delete/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setDermatologists(prev => prev.filter(d => d._id !== id));
                alert('Dermatologist deleted successfully');
            } else {
                const err = await res.json();
                alert(err.message || 'Failed to delete');
            }
        } catch (err) {
            console.error('Error deleting dermatologist:', err);
            alert('Server error');
        }
    };

    const handleClose = () => {
        setSelectedDermatologist(null);
        setIsEditing(false);
    };

    const handleSave = () => {
        // Save logic would go here
        handleClose();
    };

    const handleApprove = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admins/dermatologists/${id}/approve`, {
                method: 'PATCH'
            });

            if (res.ok) {
                const updated = await res.json();
                setDermatologists(prev =>
                    prev.map(d => d._id === id ? { ...d, status: 'approved' } : d)
                );
            } else {
                alert('Failed to approve dermatologist');
            }
        } catch (err) {
            console.error('Error approving dermatologist:', err);
        }
    };

    return (
        <div className="dashboard-section">
            <div className="section-header">
                <h3>Dermatologists List</h3>
            </div>
            <div className="dermatologists-table">
                <table>
                    <thead>
                        <tr>
                            <th>Dermatologist</th>
                            <th>Email</th>
                            <th>Experience</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dermatologists.map(dermatologist => (
                            <tr key={dermatologist._id}>
                                <td>{dermatologist.fullName}</td>
                                <td>{dermatologist.email}</td>
                                <td>{dermatologist.yearsOfExperience} years</td>
                                <td>
                                    <span className={`status-badge ${dermatologist.status}`}>
                                        {dermatologist.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn small view"
                                            onClick={() => handleView(dermatologist)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn small danger"
                                            onClick={() => handleDelete(dermatologist._id)}
                                        >
                                            Delete
                                        </button>
                                        {dermatologist.status === 'pending' && (
                                            <button
                                                className="btn small primary"
                                                onClick={() => handleApprove(dermatologist._id)}
                                            >
                                                Confirm
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {selectedDermatologist && !isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content white-bg">
                        <div className="modal-header">
                            <h3>Dermatologist Details</h3>
                            <button className="close-btn" onClick={handleClose}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-info">
                                <p><strong>Name:</strong> {selectedDermatologist.fullName}</p>
                                <p><strong>Email:</strong> {selectedDermatologist.email}</p>
                                <p><strong>Phone:</strong> {selectedDermatologist.phoneNumber}</p>
                                <p><strong>Address:</strong> {selectedDermatologist.address}</p>
                                <p><strong>Experience:</strong> {selectedDermatologist.yearsOfExperience} years</p>
                                <p><strong>Status:</strong> {selectedDermatologist.status}</p>
                                <p><strong>Available Days:</strong> {selectedDermatologist.availableDays?.join(', ')}</p>

                                {/* Diploma Files */}
                                <p><strong>Diplomas:</strong></p>
                                <ul>
                                    {selectedDermatologist.diploma?.map((file, i) => (
                                        <li key={i}>
                                            <a
                                                href={`http://localhost:5000/uploads/${file}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {file}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {/* CIN Card Files */}
                                <p className="mt-3"><strong>CIN Card:</strong></p>
                                <ul>
                                    {selectedDermatologist.cinCardPhoto?.map((file, i) => (
                                        <li key={i}>
                                            <a
                                                href={`http://localhost:5000/uploads/${file}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {file}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DermatologistsList;
