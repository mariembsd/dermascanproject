import React from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/PatientDashboard/Sidebar';
import Profile from '../components/PatientDashboard/Profile';
import DermatologistList from '../components/PatientDashboard/DermatologistList';
import Appointments from '../components/PatientDashboard/AppointmentsPatient';
import Calendar from '../components/PatientDashboard/Calendar';
import DocMessages from '../components/PatientDashboard/Messagesp';

const DashboardPatient = () => {
  const navigate = useNavigate();
  const { view } = useParams();

  const setActiveView = (newView) => {
    navigate(`/patient/dashboard/${newView}`);
  };

  return (
    <div className="d-flex">
      <Sidebar setActiveView={setActiveView} />
      <div className="p-4 flex-grow-1" style={{ backgroundColor: '#f4f6fa', minHeight: '100vh' }}>
        {view === 'profile' && <Profile />}
        {view === 'dermatologists' && <DermatologistList />}
        {view === 'appointments' && <Appointments />}
        {view === 'calendar' && <Calendar />}
        {view === 'docMessages' && <DocMessages />}
        <Outlet />  {/* This renders the nested route components */}
      </div>
    </div>
  );
};

export default DashboardPatient;