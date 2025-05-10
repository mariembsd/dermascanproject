// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './SuccessPage.css';

// const SuccessPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isPatient = location.pathname.includes('patient');

//   return (
//     <div className="success-container">
//       <div className="success-icon">🎉</div>
//       <h2>Registration Successful!</h2>
//       <p>
//         {isPatient 
//           ? 'Your patient account has been created! You can now book appointments and access your dashboard.' 
//           : 'Your dermatologist profile has been submitted for review! We will notify you once approved.'}
//       </p>
//       <button onClick={() => navigate('/success')}>Return to Home</button>
//     </div>
//   );
// };

// export default SuccessPage;