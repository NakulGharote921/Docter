import React from "react";
import { useNavigate } from "react-router";
import ImageHos from "../../../assets/images/hospital/hos.jpg";
import "./ShortIntro.css";

const ShortIntro = () => {
  const navigate = useNavigate();

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-container">
          <div className="img-container">
            <img src={ImageHos} alt="Hospital building" className="hos-image" />
          </div>

          <div className="info-container">
            <p className="section-eyebrow">About Our Hospital</p>
            <h2>Technology-backed care with compassion at every step</h2>
            <p>
              Techinfo YT Care is a super speciality hospital focused on making
              quality healthcare more accessible, organized, and patient-friendly.
            </p>
            <p>
              From everyday consultations to advanced procedures, our teams combine
              modern medical infrastructure with a calm, guided patient experience.
            </p>

            <div className="intro-highlights">
              <span>
                <i className="fa-solid fa-user-doctor"></i> Experienced specialists
              </span>
              <span>
                <i className="fa-solid fa-laptop-medical"></i> Digital appointment flow
              </span>
              <span>
                <i className="fa-solid fa-shield-heart"></i> Safer patient support
              </span>
            </div>

            <button
              className="intro-cta-btn"
              onClick={() => navigate("/doctors")}
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortIntro;
