import React from "react";
import FacilityData from "./FacilityData.json";
import "./Facility.css";

const Facility = () => {
  return (
    <section className="facility-section">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-eyebrow">Specialities</p>
          <h2>Comprehensive departments for everyday and advanced care</h2>
        </div>

        <div className="facility-container">
          {FacilityData.map((d, i) => (
            <div className="facility-card" key={`${d.title}-${i}`}>
              <span className="facility-icon">
                <i className={d.icon}></i>
              </span>
              <h5>{d.title}</h5>
              <p>Experienced teams, modern support, and faster patient access.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facility;
