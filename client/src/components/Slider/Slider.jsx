import React from "react";
import { NavLink } from "react-router";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner1 from "../../assets/images/banner1.png";
import Banner2 from "../../assets/images/banner2.png";
import Banner3 from "../../assets/images/banner3.png";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";

const slides = [
  {
    image: Banner1,
    eyebrow: "Patient-First Healthcare",
    title: "Book trusted specialists with a smoother digital experience",
    copy:
      "Find doctors faster, manage appointments online, and stay connected with better hospital support.",
  },
  {
    image: Banner2,
    eyebrow: "Modern Medical Access",
    title: "From consultation to follow-up, your care journey is now simpler",
    copy:
      "Discover specialist departments, timely scheduling, and a cleaner dashboard for every patient.",
  },
  {
    image: Banner3,
    eyebrow: "Care With Confidence",
    title: "Reliable doctors, faster bookings, and an experience built for patients",
    copy:
      "Plan appointments, review your account, and reach the right department without unnecessary friction.",
  },
];

const Slider = () => {
  return (
    <section className="hero-slider-shell">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="hero-slide">
              <img src={slide.image} alt={slide.title} className="hero-slide-image" />
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <p className="hero-eyebrow">{slide.eyebrow}</p>
                <h1>{slide.title}</h1>
                <p>{slide.copy}</p>
                <div className="hero-actions">
                  <NavLink to="/doctors" className="hero-primary-btn">
                    Book Appointment
                  </NavLink>
                  <NavLink to="/about" className="hero-secondary-btn">
                    Learn More
                  </NavLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
