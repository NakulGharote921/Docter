import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import toast from "react-hot-toast";
import { push, ref, set } from "firebase/database";
import { auth, db } from "../../firebase";
import DoctorData from "./DoctorsData.json";
import "./Appointments.css";
import "react-datepicker/dist/react-datepicker.css";

const Appointments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState({});
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const getDocInfo = async () => {
    const doctor = DoctorData.find((doc) => doc.id == id);
    setDocInfo(doctor || {});
  };

  const handleBookAppointment = async () => {
    try {
      if (!auth.currentUser) {
        toast.error("Please login to book an appointment");
        return navigate("/login");
      }

      const appointmentData = {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        doctorId: docInfo.id,
        doctorName: docInfo.name,
        doctorSpeciality: docInfo.speciality,
        doctorFee: docInfo.fee,
        appointmentDate: selectedDateTime.toISOString(),
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      const newApptRef = push(ref(db, `appointments/${auth.currentUser.uid}`));
      await set(newApptRef, appointmentData);
      toast.success("Appointment booked successfully");
      navigate("/user/appointments");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to book appointment");
    }
  };

  useEffect(() => {
    getDocInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container docinfo-container">
      <div className="doctor-detail-shell">
        <section className="doctor-hero-card">
          <div className="doctor-hero-photo-block">
            <img
              src={docInfo?.pic}
              alt={docInfo?.name || "Doctor"}
              className="doctor-hero-photo"
            />
            <span
              className={`doctor-availability-badge ${
                docInfo?.available ? "available" : "unavailable"
              }`}
            >
              {docInfo?.available ? "Available Today" : "Currently Unavailable"}
            </span>
          </div>

          <div className="doctor-hero-content">
            <p className="doctor-section-label">Doctor Overview</p>
            <h2>{docInfo?.name}</h2>
            <p className="doctor-hero-degree">{docInfo?.degree}</p>

            <div className="doctor-detail-tags">
              <span>
                <i className={docInfo?.icon}></i> {docInfo?.speciality}
              </span>
              <span>
                <i className="fa-solid fa-briefcase-medical"></i>{" "}
                {docInfo?.experience} years experience
              </span>
              <span>
                <i className="fa-solid fa-indian-rupee-sign"></i> Rs.{" "}
                {docInfo?.fee}
              </span>
            </div>

            <div className="doctor-about-card">
              <h6>About Doctor</h6>
              <p>{docInfo?.about}</p>
            </div>
          </div>
        </section>

        <section className="booking-panel">
          <div className="booking-panel-header">
            <p className="doctor-section-label">Appointment Booking</p>
            <h4>Choose your preferred slot</h4>
            <p>
              Review the consultation details and select a convenient date and
              time.
            </p>
          </div>

          <div className="booking-summary-grid">
            <div className="booking-summary-card">
              <span>Consultation Fee</span>
              <strong>Rs. {docInfo?.fee}</strong>
            </div>
            <div className="booking-summary-card">
              <span>Speciality</span>
              <strong>{docInfo?.speciality}</strong>
            </div>
            <div className="booking-summary-card">
              <span>Experience</span>
              <strong>{docInfo?.experience} years</strong>
            </div>
          </div>

          <div className="date-time">
            <h6>Select Your Booking Date and Time</h6>
            <DatePicker
              className="appointment-calendar"
              minDate={new Date()}
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={30}
              dateFormat="d-MMMM-yyyy h:mm aa"
              timeCaption="Time"
              minTime={new Date()}
              maxTime={setHours(setMinutes(new Date(), 2), 22)}
            />

            <div className="selected-slot-card">
              <span>Your Selected Booking</span>
              <strong>
                {selectedDateTime
                  ? selectedDateTime.toLocaleString()
                  : "Please select a date and time"}
              </strong>
            </div>
          </div>

          <button
            className="btn appointment-book-btn"
            disabled={!docInfo?.available}
            onClick={handleBookAppointment}
          >
            {docInfo?.available ? "Book Appointment Now" : "Doctor Not Available"}
          </button>

          <p className="booking-note">
            {docInfo?.available
              ? "You will be redirected to your appointments after confirmation."
              : "This doctor is currently unavailable for online booking."}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Appointments;
