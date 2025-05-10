import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testimonial1 from "../../assets/images/dermatologist.jpg"; // Update with actual images
import Testimonial2 from "../../assets/images/dermatologist.jpg"; // Add more images as needed
import Testimonial3 from "../../assets/images/dermatologist.jpg"; // Add more images as needed
import "./Testimonials.css";

// Importing Icons from React Icons
import { FaRegSmile, FaUserMd, FaCut, FaMale } from "react-icons/fa";
import { color } from "framer-motion";

const Testimonials = () => {
  // Testimonials Data
  const testimonials = [
    {
      quote: "Pellentesque ac lectus nec leo euismod ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit amet risus.",
      name: "John McHill",
      role: "Customer",
      imageClass: "testimonial-card-1", // Use a class for the background image
    },
    {
      quote: "Amazing service and great experience. I would highly recommend it to anyone!",
      name: "Jane Doe",
      role: "Client",
      imageClass: "testimonial-card-2",
    },
    {
      quote: "Fantastic results and very professional team!",
      name: "Emily Smith",
      role: "Patient",
      imageClass: "testimonial-card-3",
    },
  ];

  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="popular-services-testimonials">
      {/* Popular Services Section */}
      <div className="popular-services">
        <h4>FROM OUR BEST DERMATOLOGIST</h4>
        <h2>Popular Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <FaRegSmile className="service-icon" />
            <p>Face Treatment</p>
          </div>
          <div className="service-card">
            <FaUserMd className="service-icon" />
            <p>Body Treatment</p>
          </div>
          <div className="service-card">
            <FaCut className="service-icon" />
            <p>Hair Treatment</p>
          </div>
          <div className="service-card">
            <FaMale className="service-icon" />
            <p>Men’s Treatment</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>Client’s Testimonials</h2>
        <p>A BIT OF OUR TRUSTED REVIEWS</p>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`testimonial-card ${testimonial.imageClass}`}>
              <div className="overlay"></div>
              <div className="testimonial-content">
                <p>"{testimonial.quote}"</p>
                <h4 style={{color:"white"}}>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;