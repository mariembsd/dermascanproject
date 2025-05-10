/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BookAppointment from './pages/Appointment';
import Dermatologists from './pages/Dermatologist';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DermatologistDashboardPage from './pages/DermatologistDashboardPage';
import PatientsList from './components/DermatologistDashboard/PatientsList';
import AppointmentSchedule from './components/DermatologistDashboard/AppointmentSchedule';
import PatientSignup from './components/auth/PatientSignup';
import DermatologistSignup from './components/auth/DermatologistSignup';
import DashboardOverview from './components/AdminDashboard/DashboardOverview';
import AdminToolsPage from './components/AdminDashboard/AdminToolsPage';
import AnalyticsPage from './components/AdminDashboard/AnalyticsPage';
import DashboardOverview from './components/AdminDashboard/DashboardOverview';
import MessagesList from './components/AdminDashboard/MessagesList';
import ReportsPage from './components/AdminDashboard/ReportsPage';
import SettingsPage from './components/AdminDashboard/SettingsPage';
// import SuccessPage from './components/auth/SuccessPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />  
        <Route path="/contact" element={<Contact />} />  
        <Route path="/blog" element={<Blog />} />  
        <Route path="/dermatologist" element={<Dermatologists />} />  
        <Route path="/services" element={<ServicesPage />} />  
        <Route path="/bookanappointment" element={<BookAppointment />} />  
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/dermatologist/dashboard" element={<DermatologistDashboardPage />} />
        <Route path="/dermatologist/patients" element={<PatientsList />} />
        <Route path="/x" element={<AppointmentSchedule />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/dermatologist-signup" element={<DermatologistSignup />} />
        <Route path="/signup" element={<SignUp />} />
      
          <Route index element={<DashboardOverview />} />
          <Route path="dermatologists" element={<DermatologistsList />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="messages" element={<MessagesList />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="tools" element={<AdminToolsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        

        <Route path="*" element={<div>404 Not Found</div>} />

        {/* <Route path="/success" element={<SuccessPage />} /> */
     /* </Routes>
    </Router>
  );
};

export default App;*/ 
import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SendMessagePage from './pages/SendMessagePage';
import About from './pages/About';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BookAppointment from './pages/Appointment';
import Dermatologists from './pages/Dermatologist';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PatientSignup from './components/auth/PatientSignup';
import DermatologistSignup from './components/auth/DermatologistSignup';

// Admin Dashboard Components
import DashboardOverview from './components/AdminDashboard/DashboardOverview';
import DermatologistsList from './components/AdminDashboard/DermatologistsList';
import PatientsAdminList from './components/AdminDashboard/PatientsList';
import AppointmentsList from './components/AdminDashboard/AppointmentsList';
import MessagesList from './components/AdminDashboard/MessagesList';
import AnalyticsPage from './components/AdminDashboard/AnalyticsPage';
import ReportsPage from './components/AdminDashboard/ReportsPage';
import AdminToolsPage from './components/AdminDashboard/AdminToolsPage';
import SettingsPage from './components/AdminDashboard/SettingsPage';
// import SuccessPage from './components/auth/SuccessPage';
import DashboardPatient from './pages/DashboardPatient';
import DermatologistDashboardPage from './pages/DermatologistDashboardPage';
import Profile from './components/DermatologistDashboard/Profile';
import Appointments from './components/DermatologistDashboard/Appointments';
import ConsultedPatients from './components/DermatologistDashboard/ConsultedPatients';
import Diagnostic from './components/DermatologistDashboard/DiagnosticForm';
import Calendar from './components/PatientDashboard/Calendar';
import DermatologistList from './components/PatientDashboard/DermatologistList';
import Sidebar from './components/DermatologistDashboard/Sidebar';
import Messagesd from './components/DermatologistDashboard/Messagesd';
import AppointmentConfirmation from './components/PatientDashboard/AppointmentConfirmation';
import AppointmentInfo from './components/PatientDashboard/AppointmentInfo';
import Messagesp from './components/PatientDashboard/Messagesp';
import AdminLogin from './components/auth/AdminLogin';
import ProfilePatient from './components/PatientDashboard/Profile';
import AppointmentsPatient from './components/PatientDashboard/AppointmentsPatient';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dermatologist" element={<Dermatologists />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book-an-appointment" element={<BookAppointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login-admin" element={<AdminLogin />} />

        
        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/dermatologist-signup" element={<DermatologistSignup />} />
        
        {/* <Route path="/success" element={<SuccessPage />} /> */}

        <Route path="/dermatologist/dashboard" element={<DermatologistDashboardPage />}>
  {/* Nested routes under Dermatologist Dashboard */}
  <Route index element={<Profile />} />
  <Route path="profile" element={<Profile />} />
  <Route path="appointments" element={<Appointments />} />
  <Route path="consulted-patients" element={<ConsultedPatients />} />
  <Route path="diagnostic" element={<Diagnostic />} />
  <Route path="messagesd" element={<Messagesd />} />
</Route>


        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboardPage />}>
          <Route index element={<DashboardOverview />} />
          <Route path="dermatologists" element={<DermatologistsList />} />
          <Route path="patients" element={<PatientsAdminList />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="messages" element={<MessagesList />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="tools" element={<AdminToolsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        {/* <Route path="/patient/dashboard" element={<DashboardPatient />} />
        <Route path="/send-message" element={<SendMessagePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        <Route path="/appointment-info" element={<AppointmentInfo />} /> */}

        <Route path="/patient/dashboard" element={<DashboardPatient />}>
          <Route index element={<ProfilePatient />} />  
          <Route path="profile" element={<ProfilePatient/>} />
          <Route path="dermatologists" element={<DermatologistList />} />
          <Route path="appointments" element={<AppointmentsPatient />} />
          <Route path="calendar" element={<Calendar />} />
          
          <Route path="/patient/dashboard/Messagesp" element={<Messagesp />} />

        </Route>
      

        



        {/* Fallback/404 Route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;