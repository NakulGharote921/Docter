import React from "react";
import AllDoctorsData from "./DoctorsData.json";
import "./AllDoctors.css";

import { NavLink } from "react-router";
const AllDoctors = () => {
  return (
    <>
      <div className="container doc-container">
        <div className="doc-header text-center">
          <h4>Choose a specialist and book your appointment online</h4>
          <p>
            Trusted doctors, clearer profiles, and a faster booking experience.
          </p>
        </div>

        <div className="doctor-list">
          {AllDoctorsData.map((d) => (
            <NavLink to={`/doctors/${d.id}`} className="doctor-row" key={d.id}>
              <div className="doctor-photo-wrap">
                <img
                  src={d.pic}
                  alt={d.name}
                  width={150}
                  height={150}
                  className="doctor-photo"
                />
              </div>

              <div className="doctor-main">
                <div className="doctor-topline">
                  <div>
                    <h5>{d.name}</h5>
                    <p className="doctor-degree">{d.degree}</p>
                  </div>
                  <span
                    className={`doctor-status ${
                      d.available ? "available" : "unavailable"
                    }`}
                  >
                    {d.available ? "Available Today" : "Currently Unavailable"}
                  </span>
                </div>

                <div className="doctor-tags">
                  <span>
                    <i className={d.icon}></i> {d.speciality}
                  </span>
                  <span>
                    <i className="fa-solid fa-briefcase-medical"></i>{" "}
                    {d.experience}+ years experience
                  </span>
                  <span>
                    <i className="fa-solid fa-indian-rupee-sign"></i> {d.fee}{" "}
                    consultation
                  </span>
                </div>

                <p className="doctor-about">{d.about}</p>
              </div>

              <div className="doctor-action">
                <span>View Profile</span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;
