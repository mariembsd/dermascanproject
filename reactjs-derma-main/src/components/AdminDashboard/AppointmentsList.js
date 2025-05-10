import React from 'react';
import './AppointmentsList.css';

const AppointmentsList = () => {
    const appointments = [
        { 
            id: 1, 
            patient: 'Sarah Johnson', 
            dermatologist: 'Dr. Smith', 
            date: 'Today, 10:30 AM', 
            status: 'confirmed',
            avatar: 'SJ',
            email: 's.johnson@email.com',
            phone: '(555) 123-4567',
            reason: 'Annual Skin Check',
            notes: 'Patient has history of mild eczema'
        },
        { 
            id: 2, 
            patient: 'Michael Brown', 
            dermatologist: 'Dr. Lee', 
            date: 'Today, 11:45 AM', 
            status: 'confirmed',
            avatar: 'MB',
            email: 'm.brown@email.com',
            phone: '(555) 987-6543',
            reason: 'Acne Follow-up',
            notes: 'Responding well to treatment'
        },
        { 
            id: 3, 
            patient: 'Emily Davis', 
            dermatologist: 'Dr. Wilson', 
            date: 'Tomorrow, 9:15 AM', 
            status: 'pending',
            avatar: 'ED',
            email: 'e.davis@email.com',
            phone: '(555) 456-7890',
            reason: 'New Patient Consultation',
            notes: 'Concern about mole on left shoulder'
        }
    ];

    const [selectedAppointment, setSelectedAppointment] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);

    const handleView = (appt) => {
        setSelectedAppointment(appt);
        setIsEditing(false);
    };

    const handleEdit = (appt) => {
        setSelectedAppointment(appt);
        setIsEditing(true);
    };

    const handleClose = () => {
        setSelectedAppointment(null);
        setIsEditing(false);
    };

    const handleSave = () => {
        // Save logic would go here
        handleClose();
    };

    return (
        <div className="dashboard-section">
            <div className="section-header">
                <h3>Appointments</h3>
                <button className="btn link">View All</button>
            </div>
            <div className="appointments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Dermatologist</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td>
                                    <div className="patient-info">
                                        <div className="patient-avatar">{appointment.avatar}</div>
                                        <div className="patient-name">{appointment.patient}</div>
                                    </div>
                                </td>
                                <td>{appointment.dermatologist}</td>
                                <td>{appointment.date}</td>
                                <td>
                                    <span className={`status-badge ${appointment.status}`}>
                                        {appointment.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="btn small view" 
                                            onClick={() => handleView(appointment)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className="btn small edit" 
                                            onClick={() => handleEdit(appointment)}
                                        >
                                            Edit
                                        </button>
                                        {appointment.status === 'pending' && (
                                            <button className="btn small primary">Confirm</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {selectedAppointment && !isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content white-bg">
                        <div className="modal-header">
                            <h3>Appointment Details</h3>
                            <button className="close-btn" onClick={handleClose}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row">
                                <div className="detail-avatar">{selectedAppointment.avatar}</div>
                                <div>
                                    <h4>{selectedAppointment.patient}</h4>
                                    <p className="text-muted">with {selectedAppointment.dermatologist}</p>
                                </div>
                            </div>
                            <div className="detail-info">
                                <div className="info-item">
                                    <span className="info-label">Date & Time:</span>
                                    <span>{selectedAppointment.date}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Reason:</span>
                                    <span>{selectedAppointment.reason}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email:</span>
                                    <span>{selectedAppointment.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Phone:</span>
                                    <span>{selectedAppointment.phone}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Notes:</span>
                                    <span>{selectedAppointment.notes}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Status:</span>
                                    <span className={`status-badge ${selectedAppointment.status}`}>
                                        {selectedAppointment.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {selectedAppointment && isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content white-bg">
                        <div className="modal-header">
                            <h3>Edit Appointment</h3>
                            <button className="close-btn" onClick={handleClose}>×</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Patient Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.patient} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dermatologist</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.dermatologist} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date & Time</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.date} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Reason</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.reason} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.email} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input 
                                        type="tel" 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.phone} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea 
                                        className="form-control" 
                                        defaultValue={selectedAppointment.notes}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select className="form-control" defaultValue={selectedAppointment.status}>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={handleClose}>Cancel</button>
                            <button className="btn primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsList;