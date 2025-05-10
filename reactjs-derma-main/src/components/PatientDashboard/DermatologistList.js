import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import DermatologistDetails from './DermatologistDetails';
import './Css.css';

const DermatologistList = () => {
  const [dermatologists, setDermatologists] = useState([]);
  const [selectedDerm, setSelectedDerm] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/dermatologists')
      .then((res) => res.json())
      .then((data) => setDermatologists(data))
      .catch((err) => console.error('Error fetching dermatologists:', err));
  }, []);

  return (
    <div>
      <h4>👩‍⚕️ Dermatologist List</h4>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Years of Experience</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dermatologists.map((derm) => (
            <tr key={derm._id}>
              <td>{derm.fullName}</td>
              <td>{derm.yearsOfExperience} years</td>
              <td>{derm.phoneNumber}</td>
              <td>{derm.address}</td>
              <td>
                <Button variant="info" onClick={() => setSelectedDerm(derm)}>
                  Consulter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedDerm && <DermatologistDetails dermatologist={selectedDerm} />}
    </div>
  );
};

export default DermatologistList;
