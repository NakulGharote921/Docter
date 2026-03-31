import React from "react";
import "./ContactMessage.css";
import LocationMap from "./LocationMap";
import MessageForm from "./MessageForm";

const ContactMessage = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="message-container">
          <div className="contact-info-panel">
            <p className="section-eyebrow">Contact & Support</p>
            <h2>Talk to our care team with confidence</h2>
            <p className="contact-copy">
              Reach out for appointment help, hospital information, or patient
              support. We’re here to make the process easier.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <i className="fa-solid fa-phone-volume"></i>
                <div>
                  <strong>Emergency Help</strong>
                  <span>+91 12345 67890</span>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <strong>Email Support</strong>
                  <span>help@techinfoyt.com</span>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <strong>Working Hours</strong>
                  <span>10:00 AM to 10:00 PM, every day</span>
                </div>
              </div>
            </div>

            <LocationMap />
          </div>

          <MessageForm />
        </div>
      </div>
    </section>
  );
};

export default ContactMessage;
