import React from 'react';
import Header from '../components/header/Header';
import ConsultationForm from '../components/consultation/ConsultationForm';   
import TreatmentsServices from '../components/treatment/TreatmentsServices';
import DermaCareSection from '../components/dermacaresection/DermaCareSection';
import Testimonials from '../components/testimonials/Testimonials';
import HowItWorks from '../components/howitworks/HowItWorks';
import Chatbot from '../components/chatbott/chatbot';
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';


const HomePage = () => {
  return (
    <>
    <NavigationBar/>
      <Header />
      {/* <ConsultationForm/> */}
      <HowItWorks/>
      <Chatbot/>
      <TreatmentsServices/>
     <DermaCareSection/>
     <Testimonials/>
     <Footer/>
    
    
    </>
  );
};

export default HomePage;